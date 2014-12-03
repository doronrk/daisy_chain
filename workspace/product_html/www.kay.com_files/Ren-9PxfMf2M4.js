/* Script imported from http://www.kay.com/js/CommonFunctions.js */
var bOldBrowser=false;var strAdditionalMessage="";var firstNameWhitelist=" '";var lastNameWhitelist=" '";var addressWhitelist="#.,'-/ ";var cityWhitelist=" '";var sb;sb=0;if(!document.layers&&!document.all){sb=1;}if(!sb){if(navigator.platform.indexOf("Mac")>-1){if(navigator.appName.indexOf("Microsoft")>-1){bp="iemac";}else{bp="nsmac";if(is_major<=4){bOldBrowser=true;}}}else{if(navigator.appName.indexOf("Microsoft")>-1){bp="iewin";}else{bp="nswin";var is_major=parseInt(navigator.appVersion);if(is_major<=4){bOldBrowser=true;}}}}function SetSelectedOption(oFormObj,szKey){var iLoopCount;var szValue;for(iLoopCount=0;iLoopCount<=oFormObj.length;iLoopCount++){szValue=oFormObj[iLoopCount].value;if(szValue==szKey){oFormObj.selectedIndex=iLoopCount;break;}}}function IsValidAddressLine1(oFieldValue,szInputFieldName,szErrorColor){var bValidAddress=true;if(oFieldValue.length<3){bValidAddress=false;}else{if(!isAlphaNumeric(oFieldValue,"#.,' ")){bValidAddress=false;}var re=new RegExp("[a-zA-Z]");if(!oFieldValue.match(re)){bValidAddress=false;}}if(!bValidAddress){changeFieldColor(szInputFieldName,szErrorColor);}return bValidAddress;}function IsValidCity(oFieldValue,szInputFieldName,szErrorColor){var bValidAddress=true;if(oFieldValue.length<2||!isAlpha(oFieldValue," '")){bValidAddress=false;changeFieldColor(szInputFieldName,szErrorColor);}return bValidAddress;}function IsValidEmail(oFieldValue,szInputFieldName,errorMessage){validEmailRegExp=/[A-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?/g;var bValidEmail=true;if(oFieldValue==undefined||oFieldValue==null){return false;}if(oFieldValue.match(validEmailRegExp)!=oFieldValue){bValidEmail=false;}if(!bValidEmail&&szInputFieldName!=null&&errorMessage!=null){document.getElementById(szInputFieldName).className="error-color-input";document.getElementById("errorMessagesJavaScript").innerHTML="<p class='register-error-alert pull_1'>ATTENTION! : "+errorMessage+"</p>";document.getElementById("errorMessagesJavaScript").display="block";}return(bValidEmail);}function IsValidEmail(oFieldValue){validEmailRegExp=/[A-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?/g;var bValidEmail=true;if(oFieldValue==undefined||oFieldValue==null){return false;}if(oFieldValue.match(validEmailRegExp)!=oFieldValue){bValidEmail=false;}return(bValidEmail);}function IsValidPhone(szPhoneNumber,szInputFieldName,szErrorColor){var bValidPhone=true;if(szPhoneNumber!=null&&szPhoneNumber!=""){if(validateDigit(szPhoneNumber)==false){bValidPhone=false;}else{if(szPhoneNumber.length<10){bValidPhone=false;}else{if(szPhoneNumber.substring(0,3)=="900"){bValidPhone=false;}else{if(parseInt(szPhoneNumber.substring(0,1))<2){bValidPhone=false;}else{if(parseInt(szPhoneNumber.substring(3,4))<2){bValidPhone=false;}}}}}if(!bValidPhone){changeFieldColor(szInputFieldName,szErrorColor);}}return(bValidPhone);}function IsValidPhone(szPhoneNumber){var bValidPhone=true;if(szPhoneNumber!=null&&szPhoneNumber!=""){if(validateDigit(szPhoneNumber)==false){bValidPhone=false;}else{if(szPhoneNumber.length<10){bValidPhone=false;}else{if(szPhoneNumber.substring(0,3)=="900"){bValidPhone=false;}else{if(parseInt(szPhoneNumber.substring(0,1))<2){bValidPhone=false;}else{if(parseInt(szPhoneNumber.substring(3,4))<2){bValidPhone=false;}}}}}}return(bValidPhone);}function IsValidZipCode(szZipCode,szInputFieldName,className,errorMessage){var bValidZipCode=true;if(szZipCode!=null&&szZipCode!=""){if(validateDigit(szZipCode)==false){bValidZipCode=false;}if(szZipCode.length!=5&&szZipCode.length!=9){bValidZipCode=false;}if(!bValidZipCode){document.getElementById(szInputFieldName).className=className;document.getElementById("errorMessagesJavaScript").innerHTML="<p class='register-error-alert pull_1'>ATTENTION! : "+errorMessage+"</p>";document.getElementById("errorMessagesJavaScript").style.display="block";}}return(bValidZipCode);}function IsValidZipCode(szZipCode,szInputFieldName,szErrorColor){var bValidZipCode=true;if(szZipCode!=null&&szZipCode!=""){if(validateDigit(szZipCode)==false){bValidZipCode=false;}if(szZipCode.length!=5&&szZipCode.length!=9){bValidZipCode=false;}if(!bValidZipCode){changeFieldColor(szInputFieldName,szErrorColor);}}return(bValidZipCode);}function IsValidZipCode(szZipCode){var bValidZipCode=true;if(szZipCode!=null&&szZipCode!=""){if(validateDigit(szZipCode)==false){bValidZipCode=false;}if(szZipCode.length!=5&&szZipCode.length!=9){bValidZipCode=false;}}return(bValidZipCode);}function isAlphaNumeric(strInput,strWhitelist){var re=/[^A-z*0-9*\s*\.*\-*\/*]/g;if(strInput.match(re)){return false;}return true;}function isAlpha(strInput,strWhitelist){var re=/[^A-z*\.*\s*\-*\/*\'*]/g;if(strInput.match(re)){return false;}return true;}function IsValidSSN(szSSN,szInputFieldName,szErrorColor){var bValidSSN=true;var invalid=new Array("111111111","222222222","333333333","444444444","555555555","666666666","777777777","888888888","999999999","012345678","123456789","010101010","101010101","040555555","112233445","111223333","121212121","123123123","145555555","144444444","145555555","212121212","302446639","398888888","399999999","555121212","555125555");if(szSSN!=null&&szSSN!=""){if(validateDigit(szSSN)==false){bValidSSN=false;}else{if(szSSN.length!=9){bValidSSN=false;}else{if(!szSSN=="0000000000"){if(szSSN.substring(0,3)=="000"){bValidSSN=false;}else{if(szSSN.substring(3,5)=="00"){bValidSSN=false;}else{if(szSSN.substring(5,9)=="0000"){bValidSSN=false;}}}}}}for(i in invalid){if(szSSN==invalid[i]){bValidSSN=false;}}if(!bValidSSN){changeFieldColor(szInputFieldName,szErrorColor);}}return(bValidSSN);}function IsDateValid(szMonth,szDay,szYear){var bValidDate=true;var iValuesProvided=0;if(szMonth!=null&&szMonth!=""&&szMonth!="MM"){iValuesProvided++;if(validateDigit(szMonth)==false){bValidDate=false;}else{if(parseInt(szMonth,10)<=0||parseInt(szMonth,10)>12){bValidDate=false;}else{if(szMonth.length<2){bValidDate=false;}}}}if(szDay!=null&&szDay!=""&&szDay!="DD"){iValuesProvided++;if(validateDigit(szDay)==false){bValidDate=false;}else{if(parseInt(szDay,10)<=0||parseInt(szDay,10)>31){bValidDate=false;}else{if(szDay.length<2){bValidDate=false;}}}}if(szYear!=null&&szYear!=""&&szYear!="YYYY"){iValuesProvided++;if(validateDigit(szYear)==false){bValidDate=false;}else{if(szYear.length<4){bValidDate=false;}}}if(iValuesProvided>0&&iValuesProvided<3){bValidDate=false;}return(bValidDate);}function IsValidDateInCreditApp(szMonth,szDay,szYear,szInputFieldName,szErrorColor){var bValidDate=true;var iValuesProvided=0;if(szMonth!=null&&szMonth!=""){iValuesProvided++;if(validateDigit(szMonth)==false){bValidDate=false;}else{if(parseInt(szMonth,10)<=0||parseInt(szMonth,10)>12){bValidDate=false;}else{if(szMonth.length<2){bValidDate=false;}}}}if(szDay!=null&&szDay!=""){iValuesProvided++;if(validateDigit(szDay)==false){bValidDate=false;}else{if(parseInt(szDay,10)<=0||parseInt(szDay,10)>31){bValidDate=false;}else{if(szDay.length<2){bValidDate=false;}}}}if(szYear!=null&&szYear!=""){iValuesProvided++;if(validateDigit(szYear)==false){bValidDate=false;}else{if(szYear.length<4){bValidDate=false;}}}if(iValuesProvided>0&&iValuesProvided<3){bValidDate=false;}if(!bValidDate){changeFieldColor(szInputFieldName,szErrorColor);}return(bValidDate);}function IsValidDate(szMonth,szDay,szYear,errorClassName){var bValidDate=true;var iValuesProvided=0;var szMonthId=szMonth.id;var szDayId=szDay.id;var szYearId=szYear.id;var szMonthValue=szMonth.value;var szDayValue=szDay.value;var szYearValue=szYear.value;if(szMonthValue!=null&&szMonthValue!=""&&szMonthValue!="MM"){iValuesProvided++;if(validateDigit(szMonthValue)==false){bValidDate=false;}else{if(parseInt(szMonthValue,10)<=0||parseInt(szMonthValue,10)>12){bValidDate=false;}else{if(szMonthValue.length<2){bValidDate=false;}}}}if(szDayValue!=null&&szDayValue!=""&&szDayValue!="DD"){iValuesProvided++;if(validateDigit(szDayValue)==false){bValidDate=false;}else{if(parseInt(szDayValue,10)<=0||parseInt(szDayValue,10)>31){bValidDate=false;}else{if(szDayValue.length<2){bValidDate=false;}}}}if(szYearValue!=null&&szYearValue!=""&&szYearValue!="YYYY"){iValuesProvided++;if(validateDigit(szYearValue)==false){bValidDate=false;}else{if(szYearValue.length<4){bValidDate=false;}}}if(iValuesProvided>0&&iValuesProvided<3){bValidDate=false;}if(!bValidDate){document.getElementById(szMonthId).className=errorClassName;document.getElementById(szDayId).className=errorClassName;document.getElementById(szYearId).className=errorClassName;}return(bValidDate);}function FormatLeadingChar(szValue,iMaxLength,szLeadChar){var iDiff=0;var szFinalVal="";if(szValue!=null&&szValue!=""){if(szValue.length<iMaxLength){iDiff=iMaxLength-szValue.length;for(i=0;i<iDiff;i++){szFinalVal=szFinalVal+szLeadChar;}szFinalVal=szFinalVal+szValue;}else{szFinalVal=szValue;}}return(szFinalVal);}function changeFieldColor(szFieldName,szColor,fontWeight){var weight="normal";if(fontWeight!=null){weight=fontWeight;}if(szColor.toLowerCase()=="red"){weight="bold";}if(bOldBrowser){if(szColor.toLowerCase()=="red"){var szAltFieldName;szAltFieldName=szFieldName;weight="bold";if(szAltFieldName.substring(0,4)=="RQD_"){szAltFieldName=szAltFieldName.substring(4,parseInt(szAltFieldName.length));}if(szAltFieldName.substring(0,3)=="RQD"){szAltFieldName=szAltFieldName.substring(3,parseInt(szAltFieldName.length));}if(szAltFieldName.indexOf("Span")>-1){szAltFieldName=szAltFieldName.substring(0,szAltFieldName.indexOf("Span"));}var i;var strWords=szAltFieldName.split("_");var strCap;szAltFieldName="";for(i=0;i<=strWords.length-1;i++){if(i>0){szAltFieldName=szAltFieldName+" ";}strCap=strWords[i];strCap=strCap.substr(0,1).toUpperCase()+strCap.substr(1,strCap.length-1);szAltFieldName=szAltFieldName+strCap;}if(strAdditionalMessage.indexOf(szAltFieldName)==-1){if(strAdditionalMessage.length>0){strAdditionalMessage=strAdditionalMessage+", ";}strAdditionalMessage=strAdditionalMessage+szAltFieldName;}}else{strAdditionalMessage="";}return;}if(document.getElementById){if(document.getElementById(szFieldName)!=null){document.getElementById(szFieldName).style.color=szColor;document.getElementById(szFieldName).style.fontWeight=weight;}}else{if(document.layers){document[szFieldName].bgColor=szColor;document[szFieldName].style.fontWeight=weight;}else{if(document.all){document.all[szFieldName].style.color=szColor;document.all[szFieldName].style.fontWeight=weight;}}}}function changeFieldText(szFieldName,szText){if(bOldBrowser){alert(szText+"\n\n"+strAdditionalMessage);}else{if(document.getElementById){document.getElementById(szFieldName).innerHTML=szText;}else{if(document.all){document.all[szFieldName].innerHTML=szText;}else{if(document.layers){document.layers[szFieldName].document.open();document.layers[szFieldName].document.write(szText);document.layers[szFieldName].document.close();}}}}}function validateDigit(oFieldValue){var bIsDigit=true;for(i=0;i<=oFieldValue.length-1;i++){if(oFieldValue.charAt(i)>="0"&&oFieldValue.charAt(i)<="9"){}else{bIsDigit=false;break;}}return(bIsDigit);}function isTextEmpty(oTextField){var szFieldValue=oTextField.value;while(""+szFieldValue.charAt(0)==" "){szFieldValue=szFieldValue.substring(1,szFieldValue.length);}if(szFieldValue==""){return true;}return false;}function isSelEmpty(oFormField){var iIndex=oFormField.selectedIndex;var szValue=oFormField[iIndex].value;if((iIndex==0)||(szValue=="")){return true;}return false;}function RQDFieldCheck(theForm){var oFormObj;var iFailCount=0;var oFieldArray=new Array();if(document.images){for(i=0;i<theForm.length;i++){oFormObj=theForm.elements[i];if(oFormObj.getAttribute("id")&&oFormObj.id.substring(0,3)=="RQD"){if(oFormObj.type=="text"||oFormObj.type=="textarea"||oFormObj.type=="password"){if(isTextEmpty(oFormObj)){oFieldArray[iFailCount]=oFormObj.name;iFailCount++;}}else{if(oFormObj.type.toString().charAt(0)=="s"){if(isSelEmpty(oFormObj)){oFieldArray[iFailCount]=oFormObj.name;iFailCount++;}}}}}}return(oFieldArray);}function StripNum(Val){var RefString="-.0123456789";var TempChar;var OutString="";Val=""+Val;if(Val.length==0){return("");}for(var i=0;i<Val.length;i++){TempChar=Val.substring(i,i+1);if(RefString.indexOf(TempChar,0)!=-1){OutString=OutString+TempChar;}}return(OutString);}function isMoneyFmt(FormObj){var Val=FormObj.value;if(Val.length==0){return(true);}Val=parseFloat(Val);if(isNaN(Val)){return(false);}FormObj.value=roundto(0.01,Val);return true;}function roundto(Factor,Num){if(Factor==0){return(0);}Num=Factor*(Math.floor(0.5+(Num/Factor)));return(Num);}function LimitText(oField,iMaxChars){var iDiff=iMaxChars-oField.value.length;if(iDiff<0){oField.value=oField.value.substring(0,iMaxChars);}}function getHello(){var text=parseInt("4700123");return(text);}function removeErrorColor(form){changeFieldColor("RQD_fnameSpan","#666666");changeFieldColor("miSpan","#666666");changeFieldColor("RQD_lnameSpan","#666666");changeFieldColor("add1Span","#666666");changeFieldColor("add2Span","#666666");changeFieldColor("citySpan","#666666");changeFieldColor("stateSpan","#666666");changeFieldColor("zipSpan","#666666");if(form.day_areacode){changeFieldColor("day_phoneSpan","#666666");}if(form.eve_areacode){changeFieldColor("eve_phoneSpan","#666666");}changeFieldColor("emailSpan","#666666");if(form.acct){changeFieldColor("acctSpan","#666666");}changeFieldColor("RQD_contactSpan","#666666");changeFieldColor("commentsSpan","#666666");}function removeErrorColorNew(form){for(var i=0;i<form.elements.length;i++){szFieldName=form.elements[i].id;if(szFieldName!=""){document.getElementById(szFieldName).className="register-form input";}}}function RQD_Validations(oFieldArray,errorClassName,correctClassName){var szFieldName="";var iFieldLength=0;var bSuccess=true;for(i=0;i<oFieldArray.length;i++){szFieldName=oFieldArray[i];document.getElementById(szFieldName).className=errorClassName;bSuccess=false;}return bSuccess;}function changeFieldClass(element,errorClassName){document.getElementById(element).className=errorClassName;}function RQDMarkErrors(oFieldArray,szErrorColor){var szFieldName="";var iFieldLength=0;var bSuccess=true;for(i=0;i<oFieldArray.length;i++){szFieldName=oFieldArray[i];if(szFieldName.substring(0,7)=="RQD_ssn"){szFieldName="RQD_ssn";}if(szFieldName.substring(0,14)=="RQD_confirmSSN"){szFieldName="RQD_ssnConfirm";}if(szFieldName.substring(0,3)=="eve"){szFieldName="eve_phone";}if(szFieldName.substring(0,3)=="day"){szFieldName="day_phone";}if(szFieldName.substring(0,7)=="RQD_dob"){szFieldName="RQD_dob";}if(szFieldName.substring(0,9)=="RQD_phone"){szFieldName="RQD_phone";}if(szFieldName.substring(0,10)=="RQD_billed"){szFieldName="RQD_phoneBilledName";}if(szFieldName.substring(0,12)=="RQD_refPhone"){szFieldName="RQD_ref_phone";}szFieldName=szFieldName+"Span";changeFieldColor(szFieldName,szErrorColor);bSuccess=false;}return(bSuccess);}function skipToNextField(fieldName,destination){if(fieldName.value.length>=fieldName.maxLength){destination.focus();}}function skipToNextFieldTabs(fieldName,destination,keyCode){if(keyCode!=9&&keyCode!=16){if(fieldName.value.length>=fieldName.maxLength){destination.focus();}}}function trim(str){str=""+str;var left=0;var right=str.length-1;while(left<str.length&&str.charAt(left)==" "){left++;}while(right>left&&str.charAt(right)==" "){right--;}return str.substring(left,right+1);}function escapeCarriageReturnsFromField(inputField,replaceWith){inputField.value=escape(inputField.value);for(i=0;i<inputField.value.length;i++){if(inputField.value.indexOf("%0D%0A")>-1){inputField.value=inputField.value.replace("%0D%0A",replaceWith);}else{if(inputField.value.indexOf("%0A")>-1){inputField.value=inputField.value.replace("%0A",replaceWith);}else{if(inputField.value.indexOf("%0D")>-1){inputField.value=inputField.value.replace("%0D",replaceWith);}}}}inputField.value=unescape(inputField.value);}function multiEmail(email_field){var email=email_field.split(",");for(var i=0;i<email.length;i++){if(!validateEmail(email[i])){return false;}}return true;}function validateEmail(addr){var comma=",";var dot=".";var laddr=addr.length;var lcomma=addr.indexOf(",",0);var multiemailresult=false;if(addr.indexOf(",",0)>0){multiemailresult=multiEmail(addr);return multiemailresult;}addr=trim(addr);var invalidChars="/'\\\";:?!()[]{}^|";for(var i=0;i<invalidChars.length;i++){if(addr.indexOf(invalidChars.charAt(i),0)>-1){alert("Email address contains invalid characters");return false;}}for(var i=0;i<addr.length;i++){if(addr.charCodeAt(i)>127){alert("Email address contains non ascii characters");return false;}}var atPos=addr.indexOf("@",0);if(atPos==-1){alert("Email address must contain an @");return false;}if(atPos==0){alert("Email address must not start with @");return false;}if(addr.indexOf("@@",0)!=-1){alert("two @ must not be adjacent");return false;}if(addr.indexOf(".",atPos)==-1){alert("Email address must contain a period in the domain name");return false;}if(addr.indexOf("@.",0)!=-1){alert("Email address period must not immediately follow @");return false;}if(addr.indexOf(".@",0)!=-1){alert("Email address period must not immediately precede @");return false;}if(addr.indexOf("..",0)!=-1){alert("In the email address two periods must not be adjacent");return false;}return true;}function ValidateForm(){var emailTo=document.formEmail.to;var emailBcc=document.formEmail.bcc;var emailFrom=document.formEmail.from;if((emailTo.value==null)||(emailTo.value=="")){alert("Please enter the Recipient Email Address");emailTo.focus();return false;}if(validateEmail(emailTo.value)==false){emailTo.focus();return false;}if((emailFrom.value==null)||(emailFrom.value=="")){alert("Please enter the Sender's Email Address");emailFrom.focus();return false;}if(emailFrom.value.indexOf(",",0)>0){alert("Sender's Email can't contain multiple email addresses");emailFrom.focus();return false;}if(validateEmail(emailFrom.value)==false){emailFrom.focus();return false;}if((emailBcc.value==null)||(emailBcc.value=="")){return true;}if(validateEmail(emailBcc.value)==false){emailBcc.focus();return false;}return true;}function IsValidZipCode(szZipCode){var bValidZipCode=true;if(szZipCode!=null&&szZipCode!=""){if(validateDigit(szZipCode)==false){bValidZipCode=false;}if(szZipCode.length!=5&&szZipCode.length!=9){bValidZipCode=false;}}return(bValidZipCode);}