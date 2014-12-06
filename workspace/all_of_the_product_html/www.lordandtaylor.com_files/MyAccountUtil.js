/**
 * Licensed Materials - Property of IBM
 * WebSphere Commerce
 * (C) Copyright IBM Corp. 2012 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/**
 * This is the Javascript used for My Account functions.
 * Design doc: Technical Design - My Account Page V0.3.doc
 */
MyAccountUtilJS={
	
	/**
	 * This functions does the input validation and prepares for submitting updated profile information 
	 * entered in My Account - My Profile page.
	 * @param {Form handler} profile form to be submitted
	 */
	submitUserProfileEdit: function(form, defaultpasswd){
		
		// Validate the form by calling HBC.formVilidate
		if(!HBC.formVilidate("myAcctChngProfile","profsubmitButton")){
			return false;
		}
		
		// Check whether the values in email and verify email fields match, if so, update the email 
		/*if (form.email1.value.length != 0 && form.verifyemail.value.length !=0 )
		{
			if(form.email1.value != form.verifyemail.value)
			{
				//MessageHelper.formErrorHandleClient(form.logonPasswordVerify_old.id,MessageHelper.messages["PWDREENTER_DO_NOT_MATCH"]);
				var vemail = dijit.byId('verifyemail');
				if(vemail != null && vemail != undefined){
					vemail.focus();					
				}
				return false; 
			}
		}*/
		
		// Password and Verify Password reset logic during profile updation through My Account -> My Profile page
		if(form.logonPassword_old.name == "logonPassword")
		{
			form.logonPassword_old.name = "logonPassword_old";
			form.logonPasswordVerify_old.name = "logonPasswordVerify_old";
		}
		
		// Check whether the values in password and verify password fields match, if so, update the password 
		if (form.logonPassword_old.value.length != 0 && form.logonPassword_old.value != defaultpasswd)
		{
			if(form.logonPassword_old.value!= form.logonPasswordVerify_old.value)
			{
				//MessageHelper.formErrorHandleClient(form.logonPasswordVerify_old.id,MessageHelper.messages["PWDREENTER_DO_NOT_MATCH"]);
				var vpassword = dijit.byId('logonPasswordVerify_old');
				if(vpassword != null && vpassword != undefined){
					vpassword.focus();					
				}
				return false; 
			}
			form.logonPassword_old.name = "logonPassword";
			form.logonPasswordVerify_old.name = "logonPasswordVerify";
		}

		if (!this.validateBirthday(form)) {
			return;
		}
	
		var currentCountryCode = "";
		var selcountry = dojo.byId("_country");
		if(selcountry != null && selcountry != undefined){
		//	currentCountryCode = selcountry.get("value");
			currentCountryCode = selcountry.value;
			// Added to fix the issue: MobilePhone not getting populated in My Account Profile page
			if(currentCountryCode != dropDownDefault){
				form.mobilePhone1Country.value = currentCountryCode;				
			}
		}
		var subMFields = null;
		var subFieldTypes = null;
		if(currentCountryCode == "GB" || currentCountryCode == dropDownDefault){
			subMFields = "phoneSingle1";
			subFieldTypes = "phoneSingle";
			if(!ValidatorJS.validateOnSubmit(subMFields, subFieldTypes)){
				return false;
			}
			form.phone1.value = form.phoneSingle1.value;
			form.mobilePhone1.value = form.mobilephoneSingle.value;
			if(dojo.byId("marketingSMSSingle") != null && dojo.byId("marketingSMSSingle") != undefined){
				form.demographicField1.value = dojo.byId("marketingSMSSingle").checked?'Y':'N';				
			}
		}
		else{
			subMFields = "pphone1,pphone2,pphone3";
			subFieldTypes = "phone3,phone3,phone4";
			if(!ValidatorJS.validateOnSubmit(subMFields, subFieldTypes)){
				return false;
			}
			form.phone1.value = form.pphone1.value + form.pphone2.value + form.pphone3.value;
			if(form.phoneext.value != ""){
				form.phone1.value = form.phone1.value + "X" + form.phoneext.value; 
			}
			var mobileExists = form.mobilePhone1;
			if(mobileExists){
			  form.mobilePhone1.value = form.mobilephone1.value + form.mobilephone2.value + form.mobilephone3.value;
			  if(dojo.byId("marketingSMS") != null && dojo.byId("marketingSMS") != undefined){
				form.demographicField1.value = dojo.byId("marketingSMS").checked?'Y':'N';				
			  }
			}
		}
		if(form["userField1"] != null && form["userField1"] != ""){
			/*var demoField = form["userField1"].value;
			form.userField1.value = demoField.substring(6,demoField.length);*/
			form.userField1.value = form["userField1"].value;
		}
		form.submit();
	},

	/**
	 * This functions loads the phone number with extension and mobile number to the respective fields for the specified form 
	 * Added for My Account - My Profile Edit.
	 * @param {string} formName Name of the form
	 * @param {string} paramPrefix, Prefix for the phone fields
	 * @param {string} currentCountryCode, The country code of the selected country.
	 * @param {string} phone, The phone number with extension to be populated to respective phone fields.
	 * @param {string} mobilePhone, The mobile number to be populated to respective mobile number fields.
	 */
	loadPhoneNumbers: function(formName, paramPrefix, currentCountryCode, phone, mobilePhone){
		var form = document.forms[formName];
		var phoneSingle1 = form[paramPrefix + "phoneSingle1"];
		var mobilephoneSingle = form[paramPrefix + "mobilephoneSingle"];
		var Phone1 = form[paramPrefix + "pphone1"];
		var Phone2 = form[paramPrefix + "pphone2"];
		var Phone3 = form[paramPrefix + "pphone3"];
		var phoneext = form[paramPrefix + "phoneext"];
		var mobilephone1 = form[paramPrefix + "mobilephone1"];
		var mobilephone2 = form[paramPrefix + "mobilephone2"];
		var mobilephone3 = form[paramPrefix + "mobilephone3"];
		if(currentCountryCode == "GB" || currentCountryCode == MessageHelper.messages["MY_ACCOUNT_COUNTRYDEFAULTVALUE"]
		                                                     || currentCountryCode == ''){
			if(phone != null && phone != ''){
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonesingle", false);
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonemultiple", true);
				phoneSingle1.value = phone;
			}			
			if(mobilePhone != null && mobilePhone != ''){
				//HBC.toggleRegSendSMSSingle('');
				UtilitiesJS.togglePhoneFields(paramPrefix, "mobilephonesingle", false);
				UtilitiesJS.togglePhoneFields(paramPrefix, "mobilephonemultiple", true);
				if(dojo.byId("marketingSMSSingle")) {
					dojo.byId("marketingSMSSingle").checked = true;	
				}
				if(dojo.byId("label-marketingSMSSingle")) {
					dojo.byId("label-marketingSMSSingle").setAttribute("class", "checkbox checked");	
				}
				if(mobilephoneSingle != null && mobilephoneSingle != undefined){
					mobilephoneSingle.value = mobilePhone;					
				}
				else{
					mobilephoneSingle = dojo.byId(paramPrefix + "mobilephoneSingle");
					if(mobilephoneSingle != null && mobilephoneSingle != undefined){
						mobilephoneSingle.value = mobilePhone;
					}
				}
			}
			else{
				UtilitiesJS.togglePhoneFields(paramPrefix, "mobilephonesingle", true);
				UtilitiesJS.togglePhoneFields(paramPrefix, "mobilephonemultiple", true);
				if(dojo.byId("marketingSMSSingle")) {
					dojo.byId("marketingSMSSingle").checked = false;	
				}
				if(dojo.byId("label-marketingSMSSingle")) {
					dojo.byId("label-marketingSMSSingle").setAttribute("class", "checkbox");					
				}
			}
		}
		else{
			if(phone != null && phone != ''){
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonemultiple", false);
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonesingle", true);
				Phone1.value = phone.substring(0,3);
				Phone2.value = phone.substring(3,6);
				Phone3.value = phone.substring(6,10);
				phoneext.value = phone.substring(11,phone.length);
			}
			if(mobilePhone != null && mobilePhone != ''){
				//HBC.toggleRegSendSMS('');
				UtilitiesJS.togglePhoneFields(paramPrefix, "mobilephonemultiple", false);
				UtilitiesJS.togglePhoneFields(paramPrefix, "mobilephonesingle", true);
				if(dojo.byId("marketingSMS")) {
					dojo.byId("marketingSMS").checked = true;
				}
				if(dojo.byId("label-marketingSMS")){
					dojo.byId("label-marketingSMS").setAttribute("class", "checkbox checked");
				}
				if(mobilephone1 != null && mobilephone1 != undefined){
					mobilephone1.value = mobilePhone.substring(0,3);	
				}
				else{
					mobilephone1 = dojo.byId(paramPrefix + "mobilephone1");
					if(mobilephone1 != null && mobilephone1 != undefined){
						mobilephone1.value = mobilePhone.substring(0,3);	
					}
				}
				if(mobilephone2 != null && mobilephone2 != undefined){
					mobilephone2.value = mobilePhone.substring(3,6);	
				}
				else{
					mobilephone2 = dojo.byId(paramPrefix + "mobilephone2");
					if(mobilephone2 != null && mobilephone2 != undefined){
						mobilephone2.value = mobilePhone.substring(3,6);	
					}
				}
				if(mobilephone3 != null && mobilephone3 != undefined){
					mobilephone3.value = mobilePhone.substring(6,10);					
				}
				else{
					mobilephone3 = dojo.byId(paramPrefix + "mobilephone3");
					if(mobilephone3 != null && mobilephone3 != undefined){
						mobilephone3.value = mobilePhone.substring(6,10);	
					}
				}
			}
			else if (dojo.byId("marketingSMS") != null && dojo.byId("marketingSMS") != undefined) {
				UtilitiesJS.togglePhoneFields(paramPrefix,"mobilephonemultiple", true);
				UtilitiesJS.togglePhoneFields(paramPrefix,"mobilephonesingle",true);
				dojo.byId("marketingSMS").checked = false;
				dojo.byId("label-marketingSMS").setAttribute("class","checkbox");
			}
		}
	},
	
	loadPhoneNumbers2: function(formName, paramPrefix, currentCountryCode, phone){
		var form = document.forms[formName];
		var phoneSingle1 = form[paramPrefix + "phoneSingle1"];
		var mobilephoneSingle = form[paramPrefix + "mobilephoneSingle"];
		var Phone1 = form[paramPrefix + "pphone1"];
		var Phone2 = form[paramPrefix + "pphone2"];
		var Phone3 = form[paramPrefix + "pphone3"];
		var phoneext = form[paramPrefix + "phoneext"];

		if(currentCountryCode == "GB" || currentCountryCode == MessageHelper.messages["MY_ACCOUNT_COUNTRYDEFAULTVALUE"]
		                                                     || currentCountryCode == ''){
			if(phone != null && phone != ''){
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonesingle", false);
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonemultiple", true);
				phoneSingle1.value = phone;
			}			
		}
		else{
			if(phone != null && phone != ''){
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonemultiple", false);
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonesingle", true);
				Phone1.value = phone.substring(0,3);
				Phone2.value = phone.substring(3,6);
				Phone3.value = phone.substring(6,10);
				phoneext.value = phone.substring(11,phone.length);
			}
		}
	},
	
	enableDisablePhone: function(formName,currentCountry,phoneValue){
		var form = document.forms[formName];
		var currentCountryCode;
		var paramPrefix = "";
		if(currentCountry != 'GB'){
			currentCountryCode =form["country"].value;
		}else{
			 currentCountryCode = 'GB';
		}
		if(currentCountryCode == 'GB'){
			if(dijit.byId("phoneSingle1") != undefined && dijit.byId("phoneSingle1") !=null){
				dijit.byId("phoneSingle1").attr("disabled",false);
				form.phoneSingle1.value = phoneValue;
				
				if(dijit.byId("pphone1") != null &&  dijit.byId("pphone2") != null && dijit.byId("pphone3") != null){
					dijit.byId("pphone1").attr("disabled",true);
					dijit.byId("pphone2").attr("disabled",true);
					dijit.byId("pphone3").attr("disabled",true);
				}
			}
			if(dijit.byId("phoneSingle11") != undefined && dijit.byId("phoneSingle11") !=null){
				dijit.byId("phoneSingle11").attr("disabled",false);
				if(dijit.byId("pphone11") != null &&  dijit.byId("pphone21") != null && dijit.byId("pphone31") != null){
					dijit.byId("pphone11").attr("disabled",true);
					dijit.byId("pphone21").attr("disabled",true);
					dijit.byId("pphone31").attr("disabled",true);
				}
		}
			if(document.getElementById("phonefornonUK") != undefined || document.getElementById("phoneforUK") != undefined){
				document.getElementById("phonefornonUK").style.display = "none";
				document.getElementById("phoneforUK").style.display = "block";
			}
		}else{
			if(dijit.byId("phoneSingle1") != undefined && dijit.byId("phoneSingle11") !=null){
				dijit.byId("phoneSingle1").attr("disabled",true);
			}
			if(dijit.byId("pphone11") != null &&  dijit.byId("pphone21") != null && dijit.byId("pphone31") != null){
				dijit.byId("pphone11").attr("disabled",false);
				dijit.byId("pphone21").attr("disabled",false);
				dijit.byId("pphone31").attr("disabled",false);
			}
			UtilitiesJS.togglePhoneFields(paramPrefix, "phonemultiple", false);
			if(document.getElementById("phonefornonUK") != undefined || document.getElementById("phoneforUK") != undefined){
				document.getElementById("phonefornonUK").style.display = "block";
				document.getElementById("phoneforUK").style.display = "none";
			}
		}
	},
	/**
	 * This functions loads the phone number with extension and mobile number to the respective fields for the specified form 
	 * Added for My Account - notification prefrence.
	 * @param {string} formName Name of the form
	 * @param {string} currentCountryCode, The country code of the selected country.
	 * @param {string} mobilePhone, The mobile number to be populated to respective mobile number fields.
	 */
	
	LoadMobileNo: function(formName, paramPrefix, currentCountryCode, mobilePhone){
		var form = document.forms[formName];
		var mobilephoneSingle = form[paramPrefix + "nonUsMobilePhone1p1"];
		var mobilephone1 = form[paramPrefix + "usMobilePhone1p1"];
		var mobilephone2 = form[paramPrefix + "mobilePhone1p2"];
		var mobilephone3 = form[paramPrefix + "mobilePhone1p3"];
		if(currentCountryCode == "GB" || currentCountryCode == MessageHelper.messages["MY_ACCOUNT_COUNTRYDEFAULTVALUE"]){
				if(mobilePhone1 != null && mobilePhone1 != ''){
				dojo.byId("sendMeSMSNotification").checked = true;
				dojo.byId("label-sms").setAttribute("class", "checkbox checked");
				mobilephoneSingle.value = mobilePhone;
				//HBC.toggleRegSendSMSSingle('');
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonefornonUS", false);
				UtilitiesJS.togglePhoneFields(paramPrefix, "phoneforUS", true);
			}
			else{
				dojo.byId("sendMeSMSNotification").checked = false;
				dojo.byId("label-sms").setAttribute("class", "checkbox");
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonefornonUS", true);
				UtilitiesJS.togglePhoneFields(paramPrefix, "phoneforUS", true);
			}
		}
		else{
			
			if(mobilePhone != null && mobilePhone != ''){
				dojo.byId("sendMeSMSNotification").checked = true;
				dojo.byId("label-sms").setAttribute("class", "checkbox checked");
				mobilephone1.value = mobilePhone.substring(0,3);
				mobilephone2.value = mobilePhone.substring(3,6);
				mobilephone3.value = mobilePhone.substring(6,10);
				//HBC.toggleRegSendSMS('');
				UtilitiesJS.togglePhoneFields(paramPrefix, "phoneforUS", false);
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonefornonUS", true);
			}
			else if (dojo.byId("sendMeSMSNotification") != null
					&& dojo.byId("sendMeSMSNotification") != undefined) {
				dojo.byId("sendMeSMSNotification").checked = false;
				dojo.byId("label-sms").setAttribute("class",
						"checkbox");
				UtilitiesJS.togglePhoneFields(paramPrefix,
						"phoneforUS", true);
				UtilitiesJS.togglePhoneFields(paramPrefix, "phonefornonUS",
						true);
			}
		}
	},
	
	/**
	 * This function validates the customer's input for birthday, i.e. whether the year/month/date combination is correct.
	 * @param {string} form The name of the form containing personal information of the customer.
	 * 
	 * @return {boolean} This indicates whether the birthday entered is valid or not.
	 */
	validateBirthday: function(form){
		var birth_year_value = 0;
		var birth_month_value = 0;
		var birth_date_value = 0;
		
		var bdayYear = dojo.byId("birth_year");
		if(bdayYear != null && bdayYear != undefined){
			birth_year_value = parseInt(bdayYear.value);	
		}
		var bdayMonth = dojo.byId("birth_month");
		if(bdayMonth != null && bdayMonth != undefined){
			birth_month_value = parseInt(bdayMonth.value);	
		}
		var bdayDate = dojo.byId("birth_date");
		if(bdayDate != null && bdayDate != undefined){
			birth_date_value = parseInt(bdayDate.value);	
		}
		var bdayErrorLabel = dojo.byId("bday_errorlabel");
		
		if(bdayYear != null && bdayMonth != null && bdayDate != null){
			//If both Month & Date are 0, birthday becomes non mandatory, removed birth_year_value != 0 condition from below if condition
			if(birth_month_value != 0 || birth_date_value != 0){
				// if any of the year/month/date fields contains non-empty information, validate.
				if(birth_month_value == 0){
					UtilitiesJS.showErrorMessage(bdayErrorLabel, MessageHelper.messages["VALIDATION_ERRMSG_BIRTHMONTHNOTVALID"]);
					return false;
				}
				if(birth_date_value == 0){
					UtilitiesJS.showErrorMessage(bdayErrorLabel, MessageHelper.messages["VALIDATION_ERRMSG_BIRTHDATENOTVALID"]);
					return false;
				}
				// set the number of days in February for validation.
				var febDays = 29;
				if(birth_year_value != 0 && ((birth_year_value % 4) != 0)){
					febDays = 28;
				}
				var months = ["4","6","9","11"]; // these months only have 30 days in total.
				var monthFound = false;
				for(var i=0; i<months.length; i++){
					if(months[i] == birth_month_value){
						monthFound = true;
						break;
					}
				}
				if(monthFound && (birth_date_value > 30)){
					// if month entered is April/June/Sept/Nov, check if the date is larger than 30
					UtilitiesJS.showErrorMessage(bdayErrorLabel, MessageHelper.messages["VALIDATION_ERRMSG_BIRTHINVALIDDATE1"]);
					return false;
				}
				
				if((birth_month_value == 2) && (birth_date_value > febDays)){
					// in the case if the month entered is February, validate the date against febDays.
					UtilitiesJS.showErrorMessage(bdayErrorLabel, MessageHelper.messages["VALIDATION_ERRMSG_BIRTHINVALIDDATE1"]);
					return false;
				}
				if(form.curr_year != null && form.curr_month != null && form.curr_date != null){
					var birth_year = parseInt(birth_year_value);
					var birth_month = parseInt(birth_month_value);
					var birth_date = parseInt(birth_date_value);
					
					var curr_year = parseInt(form.curr_year.value);
					var curr_month = parseInt(form.curr_month.value);
					var curr_date = parseInt(form.curr_date.value);
					
					if(birth_year > curr_year){
						// if birth year entered is in the future.
						UtilitiesJS.showErrorMessage(bdayErrorLabel, MessageHelper.messages["VALIDATION_ERRMSG_BIRTHINVALIDDATE2"]);
						return false;
					}else if((birth_year == curr_year) && (birth_month > curr_month)){
						// if birth year entered is the same as the current year, then check the month entered.
						UtilitiesJS.showErrorMessage(bdayErrorLabel, MessageHelper.messages["VALIDATION_ERRMSG_BIRTHINVALIDDATE2"]);
						return false;
					}else if((birth_year == curr_year) && (birth_month == curr_month) && (birth_date > curr_date)){
						// if birth year and month entered are the same as the current year and month, then check the date entered.
						UtilitiesJS.showErrorMessage(bdayErrorLabel, MessageHelper.messages["VALIDATION_ERRMSG_BIRTHINVALIDDATE2"]);
						return false;
					}else{
						// the date of birth provided is valid, now verify if the user is under age.
						if(form.dateOfBirthTemp != null){
							if(birth_month_value != 0 && birth_date_value != 0){
								var final_birth_year = birth_year;
								var final_birth_month = birth_month;
								var final_birth_date = birth_date;
								if(birth_year == 0){
									// If the user does not specify the year in his/her date of birth, set the year to 1896.
									final_birth_year = 1896;
								}
								if(birth_month < 10){
									final_birth_month = '0' + birth_month;
								}
								if(birth_date < 10){
									final_birth_date = '0' + birth_date;
								}
								form.dateOfBirthTemp.value = final_birth_year + '-' + final_birth_month + '-' + final_birth_date;
								document.getElementById('WC_PersonalInfoExtension_HiddenField_5').name = 'dateOfBirth';
							}else{
								form.dateOfBirthTemp.value = null;
							}
						}
					}
				}
				return true;
			}else{
				if(form.dateOfBirthTemp != null){
					form.dateOfBirthTemp.value = "";
					if(document.getElementById('WC_PersonalInfoExtension_HiddenField_5') != null){
						document.getElementById('WC_PersonalInfoExtension_HiddenField_5').name = 'dateOfBirth';
					}
				}
				return true;
			}
		}
		return true;
	},

	/**
	 * This function validates the customer's input for age. If the user is
	 * under age, pop up a message to ask the user to review the store policy.
	 * 
	 * @param {string}
	 *            The name of the form containing personal information of the
	 *            customer.
	 */
	validateAge : function(form) {
		
		var bdayErrorLabel = dojo.byId("bday_errorlabel");
		if(bdayErrorLabel != null && bdayErrorLabel != undefined){
			bdayErrorLabel.innerHTML = "";
			UtilitiesJS.toggleErrorMsg(bdayErrorLabel, "none");			
		}
		
		var birth_year = 0;
		var birth_month = 0;
		var birth_date = 0;
		
		var bdayYear = dojo.byId("birth_year");
		if(bdayYear != null && bdayYear != undefined){
			birth_year = parseInt(bdayYear.value);	
		}
		var bdayMonth = dojo.byId("birth_month");
		if(bdayMonth != null && bdayMonth != undefined){
			birth_month = parseInt(bdayMonth.value);	
		}
		var bdayDate = dojo.byId("birth_date");
		if(bdayDate != null && bdayDate != undefined){
			birth_date = parseInt(bdayDate.value);	
		}

		/*var birth_year = parseInt(form.birth_year.value);
		var birth_month = parseInt(form.birth_month.value);
		var birth_date = parseInt(form.birth_date.value);*/

		if (birth_year == 0 || birth_month == 0 || birth_date == 0) {
			return;
		}

		var curr_year = parseInt(form.curr_year.value);
		var curr_month = parseInt(form.curr_month.value);
		var curr_date = parseInt(form.curr_date.value);

		/*
		 * Check whether age is less than 13, if so, pop up a message to ask the
		 * user to review the store policy.
		 */
		if ((curr_year - birth_year) < 13) {
			UtilitiesJS.showErrorMessage(bdayErrorLabel, MessageHelper.messages["VALIDATION_ERRMSG_BIRTHUNDERAGED"]);
		} else if ((curr_year - birth_year) == 13) {
			if (curr_month < birth_month) {
				UtilitiesJS.showErrorMessage(bdayErrorLabel, MessageHelper.messages["VALIDATION_ERRMSG_BIRTHUNDERAGED"]);
			} else if ((curr_month == birth_month) && (curr_date < birth_date)) {
				UtilitiesJS.showErrorMessage(bdayErrorLabel, MessageHelper.messages["VALIDATION_ERRMSG_BIRTHUNDERAGED"]);
			}
		}
	},
	
	/**
	 * Added function for Defect 551
	 * This functions loads the phone number with extension and mobile number to the respective fields for the specified form 
	 * Added for My Account - notification prefrence.
	 * @param {string} currentCountryCode, The country code of the selected country.
	 * @param {string} display, flag which decides whether to disable SMS checkbox or not 
	 */
	toggleSMSCheckForNotificationPref: function(currentCountryCode,display,paramPrefix){
		if(display == 'Y'){
			if(currentCountryCode == "GB" || currentCountryCode == MessageHelper.messages["MY_ACCOUNT_COUNTRYDEFAULTVALUE"]
			                      || currentCountryCode == ''){
				var marSMSlabel = dojo.byId(paramPrefix + "label-marketingSMSSingle");
				var marSMSCheckbox = dojo.byId(paramPrefix + "marketingSMSSingle");
				if(marSMSlabel != null && marSMSlabel != undefined){
					marSMSlabel.setAttribute("class", "checkbox checked disabled");						
				}
				if(marSMSCheckbox != null && marSMSCheckbox != undefined){
					marSMSCheckbox.disabled = true;
				}
			}
			else{
				var marSMSlabel = dojo.byId(paramPrefix + "label-marketingSMS");
				var marSMSCheckbox = dojo.byId(paramPrefix + "marketingSMS");
				if(marSMSlabel != null && marSMSlabel != undefined){
					marSMSlabel.setAttribute("class", "checkbox checked disabled");
					marSMSlabel.disabled = true;
				}
				if(marSMSCheckbox != null && marSMSCheckbox != undefined){
					marSMSCheckbox.disabled = true;
				}
			}
		}
	},
	enableDisablePreference: function(){
		var n = document.getElementsByName('notiPref');
		var l = 0;
		if(n != undefined && n != null){
			l = n.length;
		}
		for(var i=0; i<l; i++) {
			var childNodes = n[i].getElementsByTagName('*');
			var cl = 0;
			if(childNodes != undefined && childNodes != null){
				cl = childNodes.length;
			}
			for (var j=0; j<cl; j++) {
				if(childNodes[j].tagName.toLowerCase()=='label'
				&& childNodes[j].className.indexOf('disableduncheck') != -1
				){
					childNodes[j].className = 'checkbox';
				}else if(childNodes[j].tagName.toLowerCase()=='label'
				&& childNodes[j].className.indexOf('disableduncheck') == -1
				){
					childNodes[j].className = 'disableduncheck checkbox';
					childNodes[j-1].checked = false;
				}
			}
		}
	}
}