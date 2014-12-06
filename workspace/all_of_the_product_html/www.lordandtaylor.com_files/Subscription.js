/**
 * Licensed Materials - Property of IBM
 * WebSphere Commerce
 * (C) Copyright IBM Corp. 2008, 2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/**
 * This is the Javascript used for Email Subscription and Registration modal pop up.
 * Design doc: TechnicalDesign - EMailSubscription - v0.3.doc
 */
SubscriptionJS={
		
	/**
	 * This function displays the Email Subscription modal window on click of [Sign Up For Email] button from Header.
	 * @param {string} email represents the emailId of the user which need to be subscribed
	 */
	showSubscriptionPopup: function(email){
		if (window.location.protocol != 'https:' && UtilitiesJS.isGuestUser()) {
			var urlParams = '';
			if(window.location.search != ''){
				urlParams = window.location.search + "&openSubscription=true";
			}
			else{
				urlParams = "?openSubscription=true";
			}
			window.location = 'https://' + window.location.hostname + window.location.pathname +  urlParams;
		}
		else{
			if(UtilitiesJS.isGuestUser()){
				if(dijit.byId('subscription_popup') != null){
					closeAllDialogs(); // close all dijit.dialogs first
					dijit.byId('subscription_popup').reset();
					dijit.byId('subscription_popup').show();
					if(email != null && email != undefined){
						document.notificationSignUp.semail.value = email;
					}
				}
			}
			else{
				/*
				 * Changed for Defect 253: R1-Idev: If user not Opt-In for SMS Subscription,when user click on 'Sign Up for Email' on 
				 * Page Header is not working
				 * For logged-in user, On click on [Sign Up For Email] should redirect to My Account -> Notification Preferences page
				 */
				document.location.href = myAcctNotiPrefFormURL;
			}			
		}
		/*var nodeClose = dojo.query("span.closeText");
		if (nodeClose){
			for (var i=0; i<nodeClose.length;i++){
				if (langId=='-25') nodeClose[i].innerHTML = "FERMER X";
				else nodeClose[i].innerHTML = "CLOSE X";	
			}
		}*/
	},
	
	/**
	 * This function closes the specific modal window based on it "id".
	 * @param {string} id of the modal which need to be closed
	 * @param {string} event represents keyboard activity
	 */
	closePopup: function(id,event){
		if(event!=null && event.type=="keypress" && event.keyCode!="27")
		{
			return;
		}
		else
		{		
			var popup = dijit.byId(id);
			if(popup != null){
				popup.hide();
			}
		}
		/*
		 * When Guest user closes the Subscription/ Registration modal window, then it is required to clear the WCParam.openSubscription
		 * We need to load the page again retaining the url and removing param openSubscription from the URL.
		 * Added the below conditions to avoid the issue:: If we close the Subscription/ Registration modal window, 
		 * the page url will be retained with param openSubscription. And on manual Refresh/F5, the Subscription modal window gets populated. 
		 */
		if(UtilitiesJS.isGuestUser() && window.location.search.indexOf('openSubscription') != -1){
			var urlParams = '';
			if(window.location.search != ''){
				if(window.location.search.indexOf('&openSubscription=true') != -1){
					urlParams = window.location.search.replace('&openSubscription=true','');
				}
				else if(window.location.search.indexOf('?openSubscription=true') != -1){
					urlParams = window.location.search.replace('?openSubscription=true','');
				}
				else if(window.location.search.indexOf('openSubscription=true') != -1){
					urlParams = window.location.search.replace('openSubscription=true','');
				}
				
			}
			if (window.location.protocol == 'https:') {
				window.location = 'https://' + window.location.hostname + window.location.pathname + urlParams;
			}
			else{
				window.location = 'http://' + window.location.hostname + window.location.pathname + urlParams;
			}			
		}
	},
	
	/**
	 * This function does address validation before submitting the form
	 */
	subscriptionValAddress: function(){
    	var valAddrAddr1 = document.getElementById("regaddress1").value;
    	var valAddrCity = document.getElementById("regcity").value;
    	var valAddrPo = document.getElementById("regpostalcode").value;
    	if( (valAddrAddr1!=null && valAddrAddr1!="")
    		|| (valAddrCity!=null && valAddrCity!="")
    		|| (valAddrPo!=null && valAddrPo!="") ) {
			
			var addresses = [
						["regaddress1","regaddress2","emptyaddress3","regcity","regstate","regpostalcode"]
			];
			var countries = ["regcountry"];
			
			var postProcessing = function(){
				SubscriptionJS.submitUserRegistration(document.subRegistrationPopUp); return false;
			}
			
			QAS_setAddressFields(addresses);
			QAS_setCountryFields(countries);
		
			QAS_Verify(postProcessing);
			return false;
	    	
	    }
    	else {
    		SubscriptionJS.submitUserRegistration(document.subRegistrationPopUp); return false;
		}
	},
	/**
	 * This functions does the input validation and prepares the parameters while submitting Email subscription information.
	 * entered by user in Email Subscription popup
	 * @param {Form handler} subscription info form to be submitted
	 */
	submitUserSubscription: function(form){
		
		// Validate the form by calling HBC.formVilidate
		if(!HBC.formVilidate("notificationSignUp","subsubmitButton")){
			return false;
		}
		
		var marketingEmailorSMS = false; 
		var subMFields = null;
		var subFieldTypes = null;
		var selOptions = "";
		
		var params = [];
		/*params.demographicField1 = "N";*/
		
		// Added for defect 3149 [PROD: Guest user store id set to zero when creating a guest user from the home page]
		params.storeId = form.storeId.value;
		
		params.demographicField3 = "N";
		params.demographicField5 = "";
		params.userField1 = "";
		
		// Updated for Defect 1201
		params.gender = "N";
		
		params.preferredLanguage = "-1";
		
		if(form.smarketingEmail != null && form.smarketingEmail.checked){
			marketingEmailorSMS = true;
			params.demographicField3 = "Y";
			subMFields = "semail,svemail,sfname,slname";
			subFieldTypes = "email,vemail,firstName,lastName";
			if(!ValidatorJS.validateOnSubmit(subMFields, subFieldTypes)){
				return false;
			}
		}
		
		/*if(form.smarketingSMS != null && form.smarketingSMS.checked){
			marketingEmailorSMS = true;
			params.demographicField1 = "Y";
			subMFields = "subphone1,subphone2,subphone3";
			subFieldTypes = "phone3,phone3,phone4";
			if(!ValidatorJS.validateOnSubmit(subMFields, subFieldTypes)){
				return false;
			}
		}*/

		/*subMFields = "shbcreward";
		subFieldTypes = "hbcReward";*/
		if(!ValidatorJS.validateOnSubmit(subMFields, subFieldTypes)){
			return false;
		}
		
		var errorLabel = dojo.byId("label-marketingEmailorSMS");
		if(!marketingEmailorSMS){
			UtilitiesJS.toggleErrorMsg(errorLabel, "block");
			return false;
		}
		else{
			UtilitiesJS.toggleErrorMsg(errorLabel, "none");
		}
		
		if(form.categoryOptions != null){
			for(var i=0; i<form.categoryOptions.length; i++){
				if(form.categoryOptions[i].checked){
					selOptions = selOptions + form.categoryOptions[i].value + ",";					
				}
			}	
		}
		if(selOptions != ""){
			params.demographicField5 = selOptions.slice(0,-1);
		}
		
		if(form.sgender != null){
			for(var i=0; i<form.sgender.length; i++){
				if(form.sgender[i].checked){
					params.gender = form.sgender[i].value;					
				}
			}	
		}
		params.email1 = form.semail.value;
		params.firstName = form.sfname.value;
		params.lastName = form.slname.value;
		/*setting the fromPage value from usersubscriptionModal.jspf to params, which will be passed to HBCSubscriptionAddCmdImpl(CheetahMail Real time API Integration CR-Bug86 ) */
		params.fromPage = form.fromPage.value;
		
		/*params.mobilePhone1 = form.subphone1.value + form.subphone2.value + form.subphone3.value;*/
		if(form.shbcreward != null){
			/*var demoField = form.shbcreward.value;
			params.userField1 = demoField.substring(6,demoField.length);*/
			params.userField1 = form.shbcreward.value;
		}
		
		params.zipCode = form.spostalcode.value;
		params.challengeQuestion = "-";
		params.challengeAnswer = "-";
		wc.service.invoke("AjaxHBCSubscriptionAdd", params);
	},
	
	/**
	 * This function populates the Registration modal window with some entries pre populated which are entered in email subscription modal, 
	 * after successfully storing the email subscription information entered by the guest user.
	 * @param {JSON} subscription serviceResponse as a JSON
	 */
	showRegistrationPopup: function(serviceResponse){
		// First load jquery ui - must be done here because jquery gets loaded after form loads
		var headID = document.getElementsByTagName("head")[0]; 
		var fileref=document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", "/wcsstore/HBCStorefrontAssetStore/js/jquery-ui-1.8.6.custom.min.js");
		headID.appendChild(fileref);		

		if(dijit.byId('subregistration_popup') != null){
			//SubscriptionJS.closePopup('subscription_popup');
			dijit.byId('subscription_popup').hide();
			closeAllDialogs(); // close all dijit.dialogs first
			dijit.byId('subregistration_popup').reset();
			document.subRegistrationPopUp.regfname.value = serviceResponse.firstName;
			document.subRegistrationPopUp.reglname.value = serviceResponse.lastName;
			document.subRegistrationPopUp.regemail.value = serviceResponse.email1;
			document.subRegistrationPopUp.regpostalcode.value = serviceResponse.zipCode;
			if(document.subRegistrationPopUp.reghbcreward != null && document.subRegistrationPopUp.reghbcreward != undefined){
				/*document.subRegistrationPopUp.reghbcreward.value = "600294"+serviceResponse.userField1;*/
				document.subRegistrationPopUp.reghbcreward.value = serviceResponse.userField1;
			}
			
			// Added if condition for Defect 1201 -- START
			if(serviceResponse.gender == 'N'){
				document.subRegistrationPopUp.gender.value = "Unspecified";	
			}
			else if(serviceResponse.gender == 'M'){
				document.subRegistrationPopUp.gender.value = "Male";
			}
			else if(serviceResponse.gender == 'F'){
				document.subRegistrationPopUp.gender.value = "Female";
			}
			// Added if condition for Defect 1201 -- END
			
			/*document.subRegistrationPopUp.demographicField1.value = serviceResponse.demographicField1;*/
			document.subRegistrationPopUp.demographicField3.value = serviceResponse.demographicField3;
			document.subRegistrationPopUp.demographicField5.value = serviceResponse.demographicField5;
			document.subRegistrationPopUp.userField1.value = serviceResponse.userField1;
			//document.subRegistrationPopUp.subRegistrationPopUp_fromPage.value = serviceResponse.fromPage;
			var prefix = "reg";
			/*if(serviceResponse.mobilePhone1 != null && serviceResponse.mobilePhone1 != ""){
				if(serviceResponse.demographicField1 == 'Y'){
					var currentCountryCode = document.subRegistrationPopUp.regcountry.value;
					UtilitiesJS.togglePhoneNumber(prefix, currentCountryCode);
					if(currentCountryCode == "GB"  || currentCountryCode == MessageHelper.messages["EMAIL_SUBSCRIPTION_COUNTRYDEFAULTVALUE"]
					                   || currentCountryCode == "" ){
						dojo.byId(prefix + "marketingSMSSingle").checked = true;
						dojo.byId(prefix + "label-marketingSMSSingle").setAttribute("class", "checkbox checked");
						UtilitiesJS.togglePhoneFields(prefix, "mobilephonesingle", false);
						UtilitiesJS.togglePhoneFields(prefix, "mobilephonemultiple", true);
						//HBC.toggleRegSendSMSSingle("reg");
						document.subRegistrationPopUp.regmobilephoneSingle.value = serviceResponse.mobilePhone1;
					}
					else{
						dojo.byId(prefix + "marketingSMS").checked = true;
						dojo.byId(prefix + "label-marketingSMS").setAttribute("class", "checkbox checked");
						UtilitiesJS.togglePhoneFields(prefix, "mobilephonemultiple", false);
						UtilitiesJS.togglePhoneFields(prefix, "mobilephonesingle", true);
						//HBC.toggleRegSendSMS("reg");
						document.subRegistrationPopUp.regmobilephone1.value = serviceResponse.mobilePhone1.substring(0,3);
						document.subRegistrationPopUp.regmobilephone2.value = serviceResponse.mobilePhone1.substring(3,6);
						document.subRegistrationPopUp.regmobilephone3.value = serviceResponse.mobilePhone1.substring(6,10);
					}
				}
			}
			else{
				dojo.byId(prefix + "marketingSMS").checked = false;
				dojo.byId(prefix + "label-marketingSMS").setAttribute("class", "checkbox");
				UtilitiesJS.togglePhoneFields(prefix, "mobilephonemultiple", true);
				UtilitiesJS.togglePhoneFields(prefix, "mobilephonesingle", true);
			}*/
			dijit.byId('subregistration_popup').show();
		}
		
	},
	
	/**
	 * This functions does the input validation and prepares for submitting registration information entered in 
	 * email registration modal window.
	 * @param {Form handler} registration form to be submitted
	 */
	submitUserRegistration: function(form){
				
		// Validate the form by calling HBC.formVilidate
		if(!HBC.formVilidate("subRegistrationPopUp","regsubmitButton")){
			return false;
		}
		
		var subMFields = null;
		var subFieldTypes = null;

		subMFields = "regfname,reglname,regemail,regvemail,regpassword,regvpassword";
		subFieldTypes = "firstName,lastName,email,vemail,password,vpassword";
		if(!ValidatorJS.validateOnSubmit(subMFields, subFieldTypes)){
			return false;
		}
		var errorLabel = dojo.byId("prefLanguageErrMsg");
		if(form.regpreferredLanguage.value == null || form.regpreferredLanguage.value == ""){
			UtilitiesJS.toggleErrorMsg(errorLabel, "block");
			return false;
		}
		else{
			UtilitiesJS.toggleErrorMsg(errorLabel, "none");
		}
		var params = [];
		
		// Added for defect 3149 [PROD: Guest user store id set to zero when creating a guest user from the home page]
		params.storeId = form.storeId.value;
		
		// Added for Defect 1201
		params.gender = form.gender.value; 
		
		params.URL = myAccountURL;
		params.mobilePhone1Country = 'US';
		params.preferredLanguage = form.regpreferredLanguage.value;
		
	/*	params.demographicField1 = form.demographicField1.value;*/
		params.demographicField3 = form.demographicField3.value;
		params.demographicField5 = form.demographicField5.value;
		params.userField1 = form.userField1.value;
		
		params.firstName = form.regfname.value;
		params.lastName = form.reglname.value;
		params.logonId = form.regemail.value;
		params.logonPassword = form.regpassword.value;
		params.logonPasswordVerify = form.regvpassword.value;
		params.email1 = form.regemail.value;
		if(params.reghbcreward != null){
			/*var demoField7 = form.reghbcreward.value;
			params.userField1 = demoField7.substring(6,demoField.length);
			*/
			params.userField1 = form.reghbcreward.value;
		}
		
		params.address1 = form.regaddress1.value;
		params.address2 = form.regaddress2.value;
		params.city = form.regcity.value;
		params.zipCode = form.regpostalcode.value;
		var state = form.regstate.value;
		if(state != dropDownDefault && state != ""){
			params.state = state;			
		}
		var country = form.regcountry.value;
		if(country != dropDownDefault && country != ""){
			params.country = country;
			params.mobilePhone1Country = country;
		}
		params.demographicField1 = "N";
		if(country == "GB" || country == dropDownDefault || country == ""){
			params.phone1 = form.regphoneSingle1.value;
			params.mobilePhone1 = form.regmobilephoneSingle.value;
			if(form.regmarketingSMSSingle != null && form.regmarketingSMSSingle.checked){
				params.demographicField1 = "Y";
			}
		}
		else{
			params.phone1 = form.regphone1.value + form.regphone2.value + form.regphone3.value;
			if(form.regphoneext.value != ""){
				params.phone1 = params.phone1 + "X" + form.regphoneext.value; 
			}
			/*params.mobilePhone1 = form.regmobilephone1.value + form.regmobilephone2.value + form.regmobilephone3.value;
			if(form.regmarketingSMS != null && form.regmarketingSMS.checked){
				params.demographicField1 = "Y";
			}*/
		}
		params.receiveEmail='true';
		params.challengeQuestion="-";
		params.challengeAnswer="-";
		params.langId=form.langId.value;
		/*setting the fromPage value to userField2 parameter of Person object, from userregistrationModal.jspf to params, which will be passed to HBCUserRegistrationExtAddCmdImpl(CheetahMail Real time API Integration CR-Bug86 ) */
		params.userField2 = form.userField2.value;
		wc.service.invoke("HBCAjaxPersonProcessServicePersonRegister", params);
	},
	
	/**
	 * This function will display the error messages (server application exceptions) in Registration modal window.
	 * @param {string} errMsg to be displayed.
	 */
	showRegModalError: function(errMsg){
		var errorLabel = dojo.byId("UserRegModalErrorMessage");
		if(errorLabel != null && errorLabel != undefined){
			errorLabel.innerHTML = errMsg;
			UtilitiesJS.toggleErrorMsg(errorLabel, "block");			
		}
	},
	
	/**
	 * This function will display the error message for Preferred Language in Registration modal window.
	 * @param {Form handler} registration form to be submitted
	 */
	showPrefLanguageError: function(form){
		var errorLabel = dojo.byId("prefLanguageErrMsg");
		if(form.regpreferredLanguage.value == null || form.regpreferredLanguage.value == ""){
			UtilitiesJS.toggleErrorMsg(errorLabel, "block");
			return false;
		}
		else{
			UtilitiesJS.toggleErrorMsg(errorLabel, "none");
		}
	}
}