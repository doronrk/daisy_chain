/* Script imported from http://www.kay.com/js/emailForm.js */
$("#emailMask").click(function(){$(this).hide();$(".wishlist-share-container").hide();});$(".wishlist-share-container .pop-up-box .close").click(function(){$("#emailForm")[0].reset();$("#emailForm .input-error").removeClass("input-error");$("#errorMain #errorSub").text("");$("#emailMask").hide();$(".wishlist-share-container").hide();});function reloadCaptcha(element){Recaptcha.create(publicKey,element,{theme:"red",callback:Recaptcha.focus_response_field});}function isMultiEmail(emailInput){var retVal=false;if(emailInput.indexOf(",",0)>-1||emailInput.indexOf(";",0)>-1||emailInput.split("@").length!=2){retVal=true;}return retVal;}function isValidMultiEmail(emailInput){var email=emailInput.split(",");for(var i=0;i<email.length;i++){if(!IsValidEmail(email[i])){return false;}}return true;}$("#send").click(function(){var isToEmailValid=true;var isFromEmailValid=true;var toEmail=$("input#to").val();var fromEmail=$("input#from").val();var subject=$("input#subject").val();var message=$("textarea#message").val();var captchaText=$("input#recaptcha_response_field").val();var recaptcha_challenge_field=$("#recaptcha_challenge_field").val();var canSendLinkAsEmail=$("input#sendLinkAsEmail").val();var isToEmailValid=false;var isFromEmailValid=false;var isCaptchaValid=false;var canValidateFurther=true;var canValidateFurtherFurther=true;var multiemailresult=false;var isSingleToEmail=true;$("#errorSub").show();if(toEmail==""&&fromEmail==""&&captchaText==""){isToEmailValid=false;isFromEmailValid=false;isCaptchaValid=false;canValidateFurther=false;canValidateFurtherFurther=false;$("#to").addClass("input-error");$("#from").addClass("input-error");$("#recaptcha_response_field").addClass("input-error");$("#errorMain #errorSub").text(emptyFields);$("input#from").focus();}if(canValidateFurther){var isToEmailInvalid=false;var isFromEmailInValid=false;var isCaptchaInValid=false;var isToEmailNotEmpty=false;var isFromEmailNotEmpty=false;var isCaptchaNotEmpty=false;if(toEmail==""){isToEmailInvalid=true;$("#to").addClass("input-error");}else{$("#to").removeClass("input-error");isToEmailNotEmpty=true;}if(fromEmail==""){isFromEmailInValid=true;$("#from").addClass("input-error");}else{$("#from").removeClass("input-error");isFromEmailNotEmpty=true;}if(captchaText==""){isCaptchaInValid=true;$("#recaptcha_response_field").addClass("input-error");}else{$("#recaptcha_response_field").removeClass("input-error");isCaptchaNotEmpty=true;}if((isToEmailInvalid&&isFromEmailInValid)||(isFromEmailInValid&&isCaptchaInValid)||(isToEmailInvalid&&isCaptchaInValid)){$("#errorMain #errorSub").text(emptyFields);canValidateFurtherFurther=false;}else{canValidateFurtherFurther=false;if(isToEmailInvalid){$("#errorMain #errorSub").text(toEmailEmpty);canValidateToEmail=false;}else{if(isFromEmailInValid){$("#errorMain #errorSub").text(fromEmailEmpty);canValidateFromEmail=false;}else{if(isCaptchaInValid){$("#errorMain #errorSub").text(captchaEmpty);canValidateCaptcha=false;}}}}}if(isToEmailNotEmpty&&isFromEmailNotEmpty&&isCaptchaNotEmpty){canValidateFurtherFurther=true;}if(canValidateFurtherFurther){if(fromEmail==""){$("#errorMain #errorSub").text(fromEmailEmpty);$("#from").addClass("input-error");$("input#from").focus();}else{if(IsValidEmail(fromEmail)){$("#from").removeClass("input-error");isFromEmailValid=true;}else{$("#errorMain #errorSub").text(fromEmailInvalid);$("#from").addClass("input-error");$("input#from").focus();isFromEmailValid=false;}}if(isFromEmailValid){if(toEmail==""){$("#errorMain #errorSub").text(toEmailEmpty);$("#to").addClass("input-error");$("input#to").focus();}else{if(toEmail.indexOf(",",0)>0){isSingleToEmail=false;multiemailresult=isValidMultiEmail(toEmail);if(multiemailresult){$("#to").removeClass("input-error");isToEmailValid=true;}}if(isSingleToEmail){if(IsValidEmail(toEmail)){$("#to").removeClass("input-error");isToEmailValid=true;}}if(!isToEmailValid){$("#errorMain #errorSub").text(toEmailInvalid);$("#to").addClass("input-error");$("input#to").focus();isToEmailValid=false;}}}if(isToEmailValid&&isFromEmailValid){var userType=document.getElementById("userType").value;if(captchaText==""){$("#errorMain #errorSub").text(captchaEmpty);$("#recaptcha_response_field").addClass("input-error");$("input#recaptcha_response_field").focus();}else{var dataString;if(document.formEmail.pageName!=null&&document.formEmail.pageName.value=="PIP"){var productId=document.getElementById("productId").value;var catalogId=document.getElementById("catalogId").value;var storeId=document.getElementById("storeId").value;var partnumber=document.getElementById("partnumber").value;var itemId=document.getElementById("itemId").value;dataString="to="+toEmail+"&from="+fromEmail+"&subject="+encodeURIComponent(subject)+"&message="+message+"&recaptcha_response_field="+captchaText+"&recaptcha_challenge_field="+recaptcha_challenge_field+"&productId="+productId+"&catalogId="+catalogId+"&storeId="+storeId+"&partnumber="+partnumber;if(itemId!=null&&itemId.length>0){dataString="itemId="+itemId+"&"+dataString;}request="ProductDisplayEmailCmd";}else{if(document.formEmail.pageName!=null&&document.formEmail.pageName.value=="shoppingBag"){var orderId=document.getElementById("orderId").value;var catalogId=document.getElementById("catalogId").value;var storeId=document.getElementById("storeId").value;dataString="to="+toEmail+"&from="+fromEmail+"&subject="+subject+"&message="+message+"&recaptcha_response_field="+captchaText+"&recaptcha_challenge_field="+recaptcha_challenge_field+"&productId="+productId+"&catalogId="+catalogId+"&storeId="+storeId+"&orderId="+orderId;request="EmailShoppingBag";}else{if(document.formEmail.pageName!=null&&document.formEmail.pageName.value=="CompareProductsDisplay"){var productId=document.getElementById("productId").value;var catalogId=document.getElementById("catalogId").value;var storeId=document.getElementById("storeId").value;dataString="to="+toEmail+"&from="+fromEmail+"&subject="+subject+"&message="+message+"&recaptcha_response_field="+captchaText+"&recaptcha_challenge_field="+recaptcha_challenge_field+"&catalogId="+catalogId+"&storeId="+storeId;request="ProductComparisonEmailCmd";}else{if(document.formEmail.pageName!=null&&document.formEmail.pageName.value=="ContentView"){var pageLink=window.location.href;var favStoreDir=document.getElementById("favStoreDir").value;dataString="to="+toEmail+"&from="+fromEmail+"&subject="+subject+"&message="+message+"&sendFrom="+fromEmail+"&favStoreDir="+favStoreDir+"&canSendLinkAsEmail=Y"+"&recaptcha_response_field="+captchaText+"&recaptcha_challenge_field="+recaptcha_challenge_field+"&listId="+listId+"&sendLinkvalue="+encodeURIComponent(pageLink);request="SendDynaEmail";}else{if(document.formEmail.pageName!=null&&document.formEmail.pageName.value=="ThirdParty"){var pageLink=document.getElementById("sendLinkvalue").value;if(pageLink==""){pageLink=window.location.href;if(pageLink.lastIndexOf("#")!=-1){pageLink=pageLink.substring(0,pageLink.lastIndexOf("#"));}}var favStoreDir=document.getElementById("favStoreDir").value;dataString="to="+toEmail+"&from="+fromEmail+"&subject="+subject+"&message="+message+"&sendFrom="+fromEmail+"&favStoreDir="+favStoreDir+"&canSendLinkAsEmail=Y"+"&recaptcha_response_field="+captchaText+"&recaptcha_challenge_field="+recaptcha_challenge_field+"&listId="+listId+"&sendLinkvalue="+encodeURIComponent(pageLink);request="SendDynaEmail";}else{if(document.formEmail.pageName!=null&&document.formEmail.pageName.value=="FindAStore"){var storeLink=document.getElementById("storeLink").value;if(storeLink==null||storeLink=="undefined"||storeLink==""){storeLink=window.location.href;}var favStoreDir=document.getElementById("favStoreDir").value;dataString="to="+toEmail+"&from="+fromEmail+"&subject="+subject+"&message="+message+"&sendFrom="+fromEmail+"&favStoreDir="+favStoreDir+"&canSendLinkAsEmail=Y"+"&recaptcha_response_field="+captchaText+"&recaptcha_challenge_field="+recaptcha_challenge_field+"&listId="+listId+"&sendLinkvalue="+encodeURIComponent(storeLink);request="SendDynaEmail";}else{if(canSendLinkAsEmail=="Y"){var pageLink=window.location.href;var favStoreDir=document.getElementById("favStoreDir").value;dataString="to="+toEmail+"&from="+fromEmail+"&subject="+encodeURIComponent(subject)+"&message="+message+"&sendFrom="+fromEmail+"&favStoreDir="+favStoreDir+"&canSendLinkAsEmail=Y"+"&recaptcha_response_field="+captchaText+"&recaptcha_challenge_field="+recaptcha_challenge_field+"&listId="+listId+"&sendLinkvalue="+encodeURIComponent(pageLink);request="/SendDynaEmail";}else{if(document.getElementById("listIdValue")!=null){if(document.getElementById("listIdValue").value!=null&&document.getElementById("listIdValue").value!=""&&userType=="G"){var listId=document.getElementById("listIdValue").value;var wishLstURL=document.getElementById("sendLinkvalue").value;var title=document.getElementById("sendTitle").value;var favStoreDir=document.getElementById("favStoreDir").value;dataString="to="+toEmail+"&from="+fromEmail+"&subject="+subject+"&message="+message+"&sendLinkvalue="+wishLstURL+"&sendFrom="+fromEmail+"&favStoreDir="+favStoreDir+"&recaptcha_response_field="+captchaText+"&recaptcha_challenge_field="+recaptcha_challenge_field+"&listId="+listId;request="SendDynaEmail";}else{if(document.getElementById("listIdValue").value!=null&&document.getElementById("listIdValue").value!=""){var listId=document.getElementById("listIdValue").value;var wishLstURL=document.getElementById("sendLinkvalue").value;var title=document.getElementById("sendTitle").value;var firstName=document.getElementById("firstName").value;var lastName=document.getElementById("lastName").value;var favStoreDir=document.getElementById("favStoreDir").value;dataString="to="+toEmail+"&from="+fromEmail+"&subject="+subject+"&message="+message+"&sendLinkvalue="+wishLstURL+"&sendTitle="+title+"&sendFrom="+fromEmail+"&recaptcha_response_field="+captchaText+"&recaptcha_challenge_field="+recaptcha_challenge_field+"&firstName="+firstName+"&lastName="+lastName+"&favStoreDir="+favStoreDir+"&listId="+listId;request="SendDynaEmail";}}}else{var wishLstURL=document.getElementById("sendLinkvalue").value;var title=document.getElementById("sendTitle").value;var favStoreDir=document.getElementById("favStoreDir").value;var partnumber=document.getElementById("partnumber").value;dataString="to="+toEmail+"&from="+fromEmail+"&subject="+subject+"&message="+message+"&sendLinkvalue="+wishLstURL+"&sendFrom="+fromEmail+"&favStoreDir="+favStoreDir+"&recaptcha_response_field="+captchaText+"&recaptcha_challenge_field="+recaptcha_challenge_field+"&listId="+listId+"&partnumber"+partnumber;request="SendDynaEmail";}}}}}}}}$.ajax({url:request,dataType:"json",data:dataString,type:"POST",complete:function(response){response=$.parseJSON(response.responseText);if(response["success"]=="true"){isCaptchaValid=true;$("#emailForm")[0].reset();$("#emailForm .input-error").removeClass("input-error");$("#errorMain #errorSub").text("");var modal=$("#success-modal").clone();modal.dialog({modal:true,width:500,close:function(){$("#emailMask").hide();},open:function(){modal.find(".closeme").click(function(e){e.preventDefault();modal.dialog("close");});$(".wishlist-share-container").hide();$("#emailMask").hide();$("#success-message").html();$("#success-modal .closeme").click(function(){$("#success-modal").dialog("close");$("#emailMask").hide();});}});}else{if(response["exception"]=="true"){$("#errorMain #errorSub").text(emailFailed);isCaptchaValid=true;Recaptcha.reload();}else{isCaptchaValid=false;$("#errorMain #errorSub").text(captchaInvalid);$("input#recaptcha_response_field").focus();Recaptcha.reload();}}}});}}if(IsValidEmail(toEmail)){$("#to").removeClass("input-error");}if(isFromEmailValid){$("#from").removeClass("input-error");}}return false;});