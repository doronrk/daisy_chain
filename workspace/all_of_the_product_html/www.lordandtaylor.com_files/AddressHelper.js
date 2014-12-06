//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2006, 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/** 
 * @fileOverview This javascript is used by the store jsp's related to address creation and maintenance.
 * @version 1.0
 */

/**
 * The functions defined in this class enable address creation across the store.
 * @class The functions and variables defined in this class validate the form input field values entered by 
 * the customer. Another set of functions help in loading the UI for the state field when there is a change
 * in the country field. Another set of functions enable creating an address in the shopcart page and
 * guest user checkout page.
 */

AddressHelper = {
	/* The name of the state field div. */
	stateDivName : "stateDiv",
	formName:"",
	fieldName:"",
	/* styling class for the state field. */
	stateClass   : null,
	 
	/**
	 * This function sets the name for the state field.
	 * @param {string} stateDivName The name to be set for the state field.  
	 */
	setStateDivName:function(stateDivName){
		this.stateDivName = stateDivName; 
	 },
	
	 /**
	  * This function sets the styling class for the state field. 
	  * @param {string} stateClass The name of the styling class to be set for the state field. 
	  */
	setStateClass:function(stateClass){
		this.stateClass = stateClass;
	},
	
	
	/** 
	 * This function return an array of countries from a global variable called countries.
	 * If that variable does not already exist then it will be created and populated from a JSON of country objects which should
	 * have been loaded into a div on the page prior to calling this function.
	 *
	 * @returns {Array} countries An array of countries.
	 **/
	 getCountryArray:function()
	{
		
		//If the countries array does not already exist then create it.
		
			if (document["countries"] == null)
			{
				countries = new Array();
				var theDiv = document.getElementById("countryListSelectionHelper");
		
				if (typeof theDiv == 'undefined') return null;
				var divJSON = eval('('+ theDiv.innerHTML +')');
				var countriesObject = divJSON.countries;
				
				for (var i = 0; i < countriesObject.length; i++)
				{
					var countryObject = countriesObject[i];
					countries[countryObject.code] = new Object();
					countries[countryObject.code].name = countryObject.displayName;
					countries[countryObject.code].countryCallingCode = countryObject.callingCode;
					
					if (countryObject.states.length > 0)
					{
						countries[countryObject.code].states = new Object();
						for (var j = 0; j < countryObject.states.length; j++)
						{
							var state = countryObject.states[j];
							countries[countryObject.code].states[state.code] = state.displayName;
						}
					}
				}
			}

			return countries;
			 
	},
	
	/** Depending on the country value the functions will display the 
	 * appropriate Div.
	 */
	displayforUK:function(){
		    document.getElementById("po1").maxLength =15;
			document.getElementById("bphone1").value='';
			document.getElementById("bphone2").value='';
		    document.getElementById("bphone3").value='';
		    document.getElementById("bphone4").value='';
		    
			document.getElementById("forUK").style.display = "block";
		    document.getElementById("fornonUK").style.display = "none";
		},
	displayfornonUK:function(){
		document.getElementById("ukphone").value='';
		document.getElementById("forUK").style.display = "none";
		document.getElementById("fornonUK").style.display = "block";
	},
	displayforUS:function(){
			document.getElementById("po1").value='';
			document.getElementById("forUS").style.display = "block";
			document.getElementById("nonUS").style.display = "none";
			document.getElementById("forUS1").style.display = "block";
			document.getElementById("nonUS1").style.display = "none";
			if(shipCountryLabel == "US"){
				if(document.getElementById("forUS2") != null && document.getElementById("forUS3") != null){
					document.getElementById("po2").value='';
					document.getElementById("forUS2").style.display = "block";
					document.getElementById("nonUS2").style.display = "none";
					document.getElementById("forUS3").style.display = "block";
					document.getElementById("nonUS3").style.display = "none";
				}
				
			}
			else{
				if(document.getElementById("nonUS2") != null && document.getElementById("nonUS3") != null){
					document.getElementById("po3").value='';
					document.getElementById("nonUS2").style.display = "block";
					document.getElementById("forUS2").style.display = "none";
					document.getElementById("nonUS3").style.display = "block";
					document.getElementById("forUS3").style.display = "none";
				}
				
			}
		
	},
	displayfornonUS:function(){
			document.getElementById("po").value='';
			document.getElementById("forUS").style.display = "none";
			document.getElementById("nonUS").style.display = "block";
			document.getElementById("forUS1").style.display = "none";
			document.getElementById("nonUS1").style.display = "block";
			if(shipCountryLabel == "CA"){
				if(document.getElementById("nonUS2") != null && document.getElementById("nonUS3") != null){
					document.getElementById("po3").value='';
					document.getElementById("nonUS2").style.display = "block";
					document.getElementById("forUS2").style.display = "none";
					document.getElementById("nonUS3").style.display = "block";
					document.getElementById("forUS3").style.display = "none";
				}
	
			}
			else{
				if(document.getElementById("forUS2") != null && document.getElementById("forUS3") != null){
					document.getElementById("po2").value='';
					document.getElementById("forUS2").style.display = "block";
					document.getElementById("nonUS2").style.display = "none";
					document.getElementById("forUS3").style.display = "block";
					document.getElementById("nonUS3").style.display = "none";
				}
				
			}
			
	},
	displayMobileNumberforUS:function(){
		document.getElementById("phoneforUS").style.display = "block";
		document.getElementById("phonefornonUS").style.display = "none";
	},
	
	displayMobileNumberfornonUS:function(){
		document.getElementById("phoneforUS").style.display = "none";
		document.getElementById("phonefornonUS").style.display = "block";
	},
	
	
	/**
	 * (BOPIS)This function will load the state field depending on the country selection.
	 * @param {string} formName  The name of the address form containing the state field and country field.
	 * @param {string} stateDiv  The name of the state field.
	 * @param {string} id The id of the state field to be created.
	 * @param {boolean} keepCurrentState A true or false value used to determine whether to keep the current value in the state field or to remove it.
	 * @param {string} copyValue The value to be copied to the newly generated state field.
	 */
	loadStatesUI:function(formName,paramPrefix,stateDiv,id, keepCurrentState, copyValue){
		//alert("loadStatesUI");
		this.getCountryArray();
		var form = document.getElementById(formName);
		if(paramPrefix == null || paramPrefix == 'undefined' || paramPrefix == ""){
			paramPrefix = "";
		}
		var newid = paramPrefix + id;
		var currentState;

		if (keepCurrentState != null && keepCurrentState != 'undefined' && keepCurrentState == true)
		{
			if(formName =='register-account' && form.state != null && form.state!= undefined){
				currentState = form.state.value;
			}
			else{
				currentState = document.getElementById(newid).value;
			}
		}
		else
		{
			currentState = "";
		}
		
		if(copyValue != null && copyValue != 'undefined' && copyValue != '')
		{
			currentState = copyValue;
		}
		if(id=="_state1"){
		this.setStateClass("form_input");
		var currentCountryCode =form[paramPrefix + "_country"].value;}
		else{
		var currentCountryCode =form[paramPrefix + "country"].value;
		var isDisplay;
		var isMobileDisplay;
		
		if(document.getElementById("forUK") !=null || document.getElementById("fornonUK") !=null || document.getElementById("forUS") !=null || document.getElementById("nonUS") !=null || document.getElementById("forUS1") !=null || document.getElementById("nonUS1") !=null || document.getElementById("forUS2") !=null || document.getElementById("nonUS2") !=null){
			 isDisplay = true;
		}else{
			isDisplay = false;
		}
		
		if(document.getElementById("phoneforUS") !=null || document.getElementById("phonefornonUS") !=null){
			isDisplayforMobile = true;
		}else{
			isDisplayforMobile = false;
		}

		var sameasb= document.getElementById("SameShippingAndBillingAddress");
		// gift registry
		var grShipto = document.getElementById("ShipTo");
		var isGRFlow="false";
		if (document.getElementById('isGiftRegistryFlow') != null)
		{
			isGRFlow = document.getElementById('isGiftRegistryFlow').value;
		}
		
		if(currentCountryCode == "US" || currentCountryCode=="CA"){
			if(isDisplay && currentCountryCode == "US"){
				this.displayforUS();
			}
			else if(isDisplay){
				this.displayfornonUS();
			}
			if(sameasb !=null  && (shipCountryLabel == currentCountryCode)){
				/* for disabling the checkbox */
				sameasb.disabled = false;
				// gift registry
				if(grShipto)
				{
					grShipto.disabled = false;
				}
				if(isGRFlow == "true"){
					grShipto.checked= true;
				    dojo.byId("lable-ShipTo").setAttribute("class", "checkbox checked");
				}else{
					var billingForm = document.getElementById('billing_address_form');
					var shippingForm = document.getElementById('shipping_address_form1');
					var billAddressId ="";
					if(billingForm.billingAddrId != null && billingForm.billingAddrId != 'undefined')
					{
						billAddressId = billingForm.billingAddrId.value;
					}
					var shipAddressId = "";
					if(shippingForm.shippingAddrId != null && shippingForm.shippingAddrId != 'undefined')
					{
						shipAddressId = shippingForm.shippingAddrId.value;
					}

					if(shipAddressId == billAddressId){
						sameasb.checked= true;
						dojo.byId("lable-SameShippingAndBillingAddress").setAttribute("class", "checkbox checked");
					}else{
						sameasb.checked= false;
						sameasb.disabled = true;
						sameasb.style.display = "none";
						dojo.byId("lable-SameShippingAndBillingAddress").setAttribute("style", "display: none");
					}					
				}
			}
			else if(sameasb !=null){
				sameasb.checked= false;
				/* for enabling the checkbox */
				sameasb.disabled = true;
				dojo.byId("lable-SameShippingAndBillingAddress").setAttribute("class", "checkbox unchecked");
			}
			if(isDisplay){
				this.displayfornonUK();
			}
			
	/* Depending on the  country and checkbox value shippingAddressInitOnload function will disabled all the 
	 * shipping Address form Fields 
	*/
			if(sameasb !=null && (shipCountryLabel == currentCountryCode)){
				HBC.shippingAddressInitOnload();
				//hideElementById("shipping-address-form");
				
			}
			else if(sameasb !=null && grShipto!= null && grShipto.checked == true){
				HBC.shippingAddressInitOnload();
				hideElementById("shipping-address-form");
			}else if(sameasb !=null){
				HBC.shippingAddressInitOnload();
				showElementById("shipping-address-form");
			}
			if(document.getElementById("addressTypeId") != null){
				document.getElementById('addressTypeId').value = 'ShippingAndBilling';
			}
			
		} else
			{		
					if(currentCountryCode == "GB"){
						if(isDisplay){
							this.displayforUK();
						}
					}else{
						if(isDisplay){
							this.displayfornonUK();
						}
					}
					if(isDisplay){
						this.displayfornonUS();
					}
					if(sameasb !=null){
						sameasb.checked= false;
						/* for enabling the checkbox */
						sameasb.disabled = true;
						dojo.byId("lable-SameShippingAndBillingAddress").setAttribute("class", "checkbox unchecked");
		/* Depending on the country and checkbox value shippingAddressInitOnload function will enabled all the 
		 * shipping Address form Fields 
		*/				
						if(sameasb !=null && grShipto!= null && grShipto.checked == true){
							HBC.shippingAddressInitOnload();
							hideElementById("shipping-address-form");
						}else{
							HBC.shippingAddressInitOnload();
							showElementById("shipping-address-form");
						}
					}
					if(document.getElementById("addressTypeId") != null){
						document.getElementById('addressTypeId').value = 'Billing';
					}
					
			}
		} 
		if(sameasb == null){
			if(currentCountryCode == "GB"){
				if(isDisplayforMobile){
					this.displayMobileNumberfornonUS();
				}
			}else {
					if(isDisplayforMobile){
						this.displayMobileNumberforUS();
					 }
			}
		}
		var stateDivObj = document.getElementById(stateDiv);
		/* For IE */
		if(dojo.isIE){
		if(document.getElementById(newid) != null){
		var stateClass = document.getElementById(newid).getAttribute("class");
		}
	}
		else {
			if(document.getElementById(newid) != null){
				var stateClass=document.getElementById(newid).getAttribute("class");				
			}
		}

		if(stateClass!="drop_down_country")
		this.setStateClass(stateClass);
		 while(stateDivObj.hasChildNodes()) {
			stateDivObj.removeChild(stateDivObj.firstChild);
		}
if(currentCountryCode){
		 if (countries[currentCountryCode].states) {
			
				/* switch to state list. */
					HBC.ukStateEnableDisable(form);
					if(document.getElementById("forstates") != null || document.getElementById("ukstate") !=null){
						document.getElementById("forstates").style.display = "block";
						document.getElementById("ukstate").style.display = "none";
					}
					if(formName == 'billingAddressFormUpdate' || formName == 'addressFormUpdate'){
						//("keepCurrentState"+keepCurrentState);
						currentState = keepCurrentState;
						//("currentState ..hhh"+currentState);
					}
					stateDivObj.appendChild(this.createStateWithOptions(paramPrefix, currentCountryCode, currentState,id));
			} else {
				/* switch to state text input. */
					HBC.ukStateEnableDisable(form);
					if(document.getElementById("forstates") != null || document.getElementById("ukstate") !=null){
						document.getElementById("ukstate").style.display = "block";
						document.getElementById("forstates").style.display = "none";
						if(formName =='register-account' && form.state != null && form.state!= undefined){
							form.state.value = currentState;
						}
					} else {
						console.log("here in else");
						var stateInput = document.createElement("input");
						stateInput.setAttribute("id",paramPrefix + id);
						if(id=="_state1"){
						stateInput.setAttribute("name", paramPrefix + "_state");}
						else{
						stateInput.setAttribute("name", paramPrefix + "state");}
						stateInput.setAttribute("class", this.stateClass);
						stateInput.setAttribute("className",this.stateClass);
						stateInput.setAttribute("size", "35");
						stateInput.setAttribute("maxlength", "49");
							stateInput.setAttribute("value", "");
					    		
							stateDivObj.appendChild(stateInput);
					}
					
				}		 
		
		 this.changeLabelsForStateAndZipCode(currentCountryCode);
		 this.changeMaxLengthOfZipCode(currentCountryCode);
		 
			if(form.country.value == "GB"){
				if(document.getElementById("phonefornonUK") != undefined || document.getElementById("phoneforUK") != undefined){
					document.getElementById("phonefornonUK").style.display = "none";
					document.getElementById("phoneforUK").style.display = "block";
					if(document.getElementById("phonefornonUK1") != undefined || document.getElementById("phoneforUK1") != undefined){
						document.getElementById("phonefornonUK1").style.display = "none";
						document.getElementById("phoneforUK1").style.display = "block";
					}
				}
				
			}else{
				if(document.getElementById("phonefornonUK") != undefined || document.getElementById("phoneforUK") != undefined	){
					document.getElementById("phoneforUK").style.display = "none";
					document.getElementById("phonefornonUK").style.display = "block";
					if(document.getElementById("phonefornonUK1") != undefined || document.getElementById("phoneforUK1") != undefined	){
						document.getElementById("phoneforUK1").style.display = "none";
						document.getElementById("phonefornonUK1").style.display = "block";
					}
				}
			}
			
			
	}
			if(!currentCountryCode){
				if(dijit.byId("WC__ShoppingCartAddressEntryForm_billing_address_form_state_1") != null){
					dijit.byId("WC__ShoppingCartAddressEntryForm_billing_address_form_state_1").attr("disabled",false);
				}
				if(document.getElementById("forstates") !=null){
					document.getElementById("forstates").style.display = "none";
				}
				if(document.getElementById("ukstate") !=null){
					document.getElementById("ukstate").style.display = "block";
				}
				
			}
	},

	/**
	 * This function will load the state field depending on the country selection.
	 * @param {string} formName  The name of the address form containing the state field and country field.
	 * @param {string} stateDiv  The name of the state field.
	 * @param {string} id The id of the state field to be created.
	 * @param {boolean} keepCurrentState A true or false value used to determine whether to keep the current value in the state field or to remove it.
	 * @param {string} copyValue The value to be copied to the newly generated state field.
	 */
	loadStatesUIForStorePickUp:function(formName,paramPrefix,stateDiv,id, keepCurrentState, copyValue){
		
		     
		this.getCountryArray();
		var form = document.getElementById(formName);
		if(paramPrefix == null || paramPrefix == 'undefined' || paramPrefix == ""){
			paramPrefix = "";
		}

		var newid = paramPrefix + id;
		var currentState;

		if (keepCurrentState != null && keepCurrentState != 'undefined' && keepCurrentState == true)
		{

			if(formName =='register-account' && form.state != null && form.state!= undefined){
				currentState = form.state.value;
			}
			else{
				currentState = document.getElementById(newid).value;
			}
		}
		else
		{
			currentState = "";


		}
		
		if(copyValue != null && copyValue != 'undefined' && copyValue != '')
		{
			currentState = copyValue;
		}
		if(id=="_state1"){
		this.setStateClass("form_input");
		var currentCountryCode =form[paramPrefix + "_country"].value;}
		else{
		var currentCountryCode =form[paramPrefix + "country"].value;
		var isDisplay;
		var isMobileDisplay;
		
		if(document.getElementById("forUK") !=null || document.getElementById("fornonUK") !=null || document.getElementById("forUS") !=null || document.getElementById("nonUS") !=null || document.getElementById("forUS1") !=null || document.getElementById("nonUS1") !=null || document.getElementById("forUS2") !=null || document.getElementById("nonUS2") !=null){
			 isDisplay = true;
		}else{
			isDisplay = false;
		}
		
		if(document.getElementById("phoneforUS") !=null || document.getElementById("phonefornonUS") !=null){
			isDisplayforMobile = true;
		}else{
			isDisplayforMobile = false;
		}
		
		if(currentCountryCode == "US" || currentCountryCode=="CA"){
			if(isDisplay && currentCountryCode == "US"){
				document.getElementById("po1").value='';
				document.getElementById("forUS").style.display = "block";
				document.getElementById("nonUS").style.display = "none";
				document.getElementById("forUS1").style.display = "block";
				document.getElementById("nonUS1").style.display = "none";
			}
			else if(isDisplay){


				document.getElementById("po").value='';
				document.getElementById("forUS").style.display = "none";
				document.getElementById("nonUS").style.display = "block";
				document.getElementById("forUS1").style.display = "none";
				document.getElementById("nonUS1").style.display = "block";
			}			
			if(isDisplay){
				document.getElementById("ukphone").value='';
				document.getElementById("forUK").style.display = "none";
				document.getElementById("fornonUK").style.display = "block";
			}	
			
		} else
		{		
			if(currentCountryCode == "GB"){


				if(isDisplay){

					   
					    document.getElementById("po1").maxLength =15;
						document.getElementById("bphone1").value='';
						document.getElementById("bphone2").value='';
					    document.getElementById("bphone3").value='';
					    document.getElementById("bphone4").value='';					    
						document.getElementById("forUK").style.display = "block";
					    document.getElementById("fornonUK").style.display = "none";


				}
				else if(isDisplayforMobile){
					
					this.displayMobileNumberfornonUS();
					
				}
			 }else{
					if(isDisplay){
						this.displayfornonUK();
					}
					else if(isDisplayforMobile){
						this.displayMobileNumberforUS();
					 }
			 }
							
					
		}			
	 }
		/*if(document.getElementById("addressTypeId") != null){
			document.getElementById('addressTypeId').value = 'Billing';
		}*/
		
		var stateDivObj = document.getElementById(stateDiv);
		/* For IE */
		if(dojo.isIE){
		if(document.getElementById(newid) != null){
		var stateClass = document.getElementById(newid).getAttribute("class");
		}
	}
		else {
			if(document.getElementById(newid) != null){
				var stateClass=document.getElementById(newid).getAttribute("class");				
			}
		}

		if(stateClass!="drop_down_country")
		this.setStateClass(stateClass);
		 while(stateDivObj.hasChildNodes()) {
			stateDivObj.removeChild(stateDivObj.firstChild);
		}

	
		 		 
if(currentCountryCode){
		 if (countries[currentCountryCode].states) {
			
				/* switch to state list. */
					HBC.ukStateEnableDisable(form);
					if(document.getElementById("forstates") != null || document.getElementById("ukstate") !=null){
						document.getElementById("forstates").style.display = "block";
						document.getElementById("ukstate").style.display = "none";
					}
					if(formName == 'billingAddressFormUpdate' || formName == 'addressFormUpdate'){
						//("keepCurrentState"+keepCurrentState);
						currentState = keepCurrentState;
						//("currentState ..hhh"+currentState);
					}
					stateDivObj.appendChild(this.createStateWithOptions(paramPrefix, currentCountryCode, currentState,id));
			} else {
				/* switch to state text input. */
					HBC.ukStateEnableDisable(form);
					if(document.getElementById("forstates") != null || document.getElementById("ukstate") !=null){
						document.getElementById("ukstate").style.display = "block";
						document.getElementById("forstates").style.display = "none";
						if(formName =='register-account' && form.state != null && form.state!= undefined){
							form.state.value = currentState;
						}
					} else {
						console.log("here in else");
						var stateInput = document.createElement("input");
						stateInput.setAttribute("id",paramPrefix + id);
						if(id=="_state1"){
						stateInput.setAttribute("name", paramPrefix + "_state");}
						else{
						stateInput.setAttribute("name", paramPrefix + "state");}
						stateInput.setAttribute("class", this.stateClass);
						stateInput.setAttribute("className",this.stateClass);
						stateInput.setAttribute("size", "35");
						stateInput.setAttribute("maxlength", "49");
							stateInput.setAttribute("value", "");
					    		
							stateDivObj.appendChild(stateInput);
					}
					
				}		 
		
		 this.changeLabelsForStateAndZipCode(currentCountryCode);
		 this.changeMaxLengthOfZipCode(currentCountryCode);
		 
			if(form.country.value == "GB"){
				if(document.getElementById("phonefornonUK") != undefined || document.getElementById("phoneforUK") != undefined){
					document.getElementById("phonefornonUK").style.display = "none";
					document.getElementById("phoneforUK").style.display = "block";
					if(document.getElementById("phonefornonUK1") != undefined || document.getElementById("phoneforUK1") != undefined){
						document.getElementById("phonefornonUK1").style.display = "none";
						document.getElementById("phoneforUK1").style.display = "block";
					}
				}
				
			}else{
				if(document.getElementById("phonefornonUK") != undefined || document.getElementById("phoneforUK") != undefined	){
					document.getElementById("phoneforUK").style.display = "none";
					document.getElementById("phonefornonUK").style.display = "block";
					if(document.getElementById("phonefornonUK1") != undefined || document.getElementById("phoneforUK1") != undefined	){
						document.getElementById("phoneforUK1").style.display = "none";
						document.getElementById("phonefornonUK1").style.display = "block";
					}
				}
			}
			
			
	}
			if(!currentCountryCode){
				if(dijit.byId("WC__ShoppingCartAddressEntryForm_billing_address_form_state_1") != null){
					dijit.byId("WC__ShoppingCartAddressEntryForm_billing_address_form_state_1").attr("disabled",false);
				}
				if(document.getElementById("forstates") !=null){
					document.getElementById("forstates").style.display = "none";
				}
				if(document.getElementById("ukstate") !=null){
					document.getElementById("ukstate").style.display = "block";
				}
				
			}
	},

	/**
	 * This function changes the label to State/Province and ZIP code based on the country selected. 
     * @param currentCountryCode
	 */
	changeLabelsForStateAndZipCode:function(currentCountryCode){
		if(currentCountryCode == "US"){
			if(document.getElementById("idForState") != null || document.getElementById("idForState") != undefined){
				document.getElementById("idForState").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_STATE"];
				document.getElementById("idForZipCode").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_ZIPCODE"];
				if(document.getElementById("idForState1") != null || document.getElementById("idForState1") != undefined){
					document.getElementById("idForState1").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_STATE"];
					document.getElementById("idForZipCode1").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_ZIPCODE"];
				}
			}			
		}else if(currentCountryCode == "CA"){
			if(document.getElementById("idForState") != null && document.getElementById("idForState") != undefined){
				document.getElementById("idForState").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_PROVINCE"];
				document.getElementById("idForZipCode").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_POSTALCODE"];
				if(document.getElementById("idForState1") != null && document.getElementById("idForState1") != undefined){
					document.getElementById("idForState1").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_PROVINCE"];
					document.getElementById("idForZipCode1").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_POSTALCODE"];
				}
			}
		}else if(currentCountryCode == "GB"){
			if(document.getElementById("idForState") != null && document.getElementById("idForState") != undefined){
				//Fix for defect # 307 -- Begins here
				//document.getElementById("idForState").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_PROVINCE"];
				document.getElementById("idForState").innerHTML='County/'+MessageHelper.messages["EMAIL_SUBSCRIPTION_PROVINCE"];
				//Fix for defect # 307 -- Ends here
				document.getElementById("idForZipCode").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_POSTALCODE"];
				if(document.getElementById("idForState1") != null && document.getElementById("idForState") != undefined){
					document.getElementById("idForState1").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_PROVINCE"];
					document.getElementById("idForZipCode1").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_POSTALCODE"];
				}
			}
		}
	},
	
	/**
	 *	This function creates an input element to represent the state.
	 *  @param {string} paramPrefix The value can be shipping, billing or blank.
	 *  @param {string} currentState The value in the state field.
	 *  @param {string} id The id of the state field.
	 */
	createState:function(paramPrefix,currentState,id){
		var stateInput = document.createElement("input");
		stateInput.setAttribute("id",paramPrefix + id);
		if(id=="_state1"){
		stateInput.setAttribute("name", paramPrefix + "_state");}
		else{
		stateInput.setAttribute("name", paramPrefix + "state");}
		stateInput.setAttribute("class", this.stateClass);
		stateInput.setAttribute("className",this.stateClass);
		stateInput.setAttribute("size", "35");
		stateInput.setAttribute("maxlength", "49");
		if (currentState != null && currentState != 'undefined')
		{
			stateInput.setAttribute("value", currentState);
		}
		return stateInput;
	},
	
	/**
	 * This function creates a <select> element to represent the state field and loads it with the 
	 * states corresponding to the country field.
     * @param {string} paramPrefix The value can be shipping, billing or blank.
	 * @param {string} currentCountryCode The country code of the selected country.
	 * @param {string} currentState The value in the state field.
	 * @param {string} id The id of the state field.
	 */
	createStateWithOptions:function(paramPrefix, currentCountryCode, currentState,id){
		this.getCountryArray();
		var stateSelect = document.createElement("select");
		stateSelect.setAttribute("id", paramPrefix + id);
		if(id=="_state1"){
		stateSelect.setAttribute("name", paramPrefix + "_state");}
		else{
		stateSelect.setAttribute("name", paramPrefix + "state");}
		stateSelect.setAttribute("class","drop_down_country");
		stateSelect.setAttribute("className","drop_down_country");
		/*clear old options. */
		stateSelect.options.length = 0;
		
		/* Adding Select as an option - For Defect 4058 */
		aOption = document.createElement("option");
		stateSelect.options[stateSelect.length] = aOption;
		aOption.text = MessageHelper.messages["EMAIL_SUBSCRIPTION_DEFAULTVALUEINDROPBOX"];
		aOption.value = "";
		
		/* add all states. */
		for (state_code in countries[currentCountryCode].states) {
			
			aOption = document.createElement("option");
			stateSelect.options[stateSelect.length] = aOption;
			aOption.text = countries[currentCountryCode].states[state_code];
			aOption.value = state_code;

			if (state_code == currentState || countries[currentCountryCode].states[state_code] == currentState) {
				aOption.selected = true;
			}
		}
		
		return stateSelect;
	},
	
	/**
	 * This function creates a <option> element with name as 'Select' and value as null
	 * This is currently used in user registration page (Defect 4173).
	 * @param {string} id The id of the state field.
	 */
	addSelectOption:function(id){
		
		var stateSelect = document.getElementById(id);
		
		aOption = document.createElement("option");
		stateSelect.options[stateSelect.length] = aOption;
		aOption.text = 'Select';
		aOption.value = '';
		aOption.selected = true;
				
		return true;
	},
	
	/**
	 * This function validates the address form independently from the order of the fields displayed on the form, i.e. independent from the locale.
	 * A hidden field named "fields" must be set in the jsp/jspf file that calls this method. The purpose of this hidden field is 
	 * to set all the mandatory input fields and the order of these fields displayed on each locale-specific address entry page, so that
	 * this method knows which input fields to validate and in which order it should validate them.
	 *
	 * assumptions:1. Mandatory fields use UPPER CASE, non-mandatory fields use lower case.
	 *	     	   2. The error messages used in this method are declared in the jsp/jspf files that call this method. 
	 * @param {string} form The name of the address form obtained from the page containing address input fields.
	 * @param {string} prefix The value is set to shipping or billing.
	 * 
	 * @return {boolean} return true if no error was found, or the hidden field "fields" were not set in the jsp/jspf file that calls this method,
	 * return false if form could not be found, or if there was an error validating a particular field.
	 */

	validateAddressForm: function(form,prefix){
		reWhiteSpace = new RegExp(/^\s+$/);
		if(prefix == null){prefix = ""};
		if(prefix){this.setStateDivName(prefix + "stateDiv")};
		if(form != null){
			var fields="";
			if(form["AddressForm_FieldsOrderByLocale"] != null && form["AddressForm_FieldsOrderByLocale"].value != null && form["AddressForm_FieldsOrderByLocale"].value != ""){
				fields = form["AddressForm_FieldsOrderByLocale"].value.split(",");
			}
			else if(document.getElementById("AddressForm_FieldsOrderByLocale").value!= null && document.getElementById("AddressForm_FieldsOrderByLocale").value!= ""){
				fields=document.getElementById("AddressForm_FieldsOrderByLocale").value.split(",");
			}
			var nickName = prefix + "nickName";
			var lastName = prefix + "lastName";
			var firstName = prefix + "firstName";
			var middleName = prefix + "middleName";
			var address1 = prefix + "address1";
			var address2 = prefix + "address2";
			var city = prefix + "city";
			var state = prefix + "state";
			var country = prefix + "country";
			var zipCode = prefix + "zipCode";
			var email1 = prefix + "email1";
			var phone1 = prefix + "phone1";
			
			var pphone1 = prefix + "pphone1";
			var pphone2 = prefix + "pphone2";
			var pphone3 = prefix + "pphone3";
			var phoneext = prefix + "phoneext";
			var phoneSingle1 = prefix + "phoneSingle1";
			
			//Brazil's form fields to validate
			var pay_CPFNumber,taxPayerId,companyName,organizationName;
			if ( typeof(isBrazilStore) != 'undefined' && isBrazilStore) {
				pay_CPFNumber = "pay_CPFNumber";
				taxPayerId = prefix + "taxPayerId"
				companyName = prefix + "companyName";
				organizationName = prefix + "organizationName"; //company's short name
			}
			for(var i=0; i<fields.length; i++){
				var field = fields[i];
				if(field == "NICK_NAME" || field == "nick_name"){
					form[nickName].value = trim(form[nickName].value);
					if(field == "NICK_NAME" && (form[nickName].value == "" || reWhiteSpace.test(form[nickName].value))){
						MessageHelper.formErrorHandleClient(form[nickName].id, MessageHelper.messages["ERROR_RecipientEmpty"]);
						return false;
					}
					if(!MessageHelper.isValidUTF8length(form[nickName].value, 254)){ 
						MessageHelper.formErrorHandleClient(form.nickName.id, MessageHelper.messages["ERROR_RecipientTooLong"]); 
						return false;
					}
				}else if(field == "FIRST_NAME" || field == "first_name"){
					form[firstName].value = trim(form[firstName].value);
					if(field == "FIRST_NAME" && (form[firstName].value == "" || reWhiteSpace.test(form[firstName].value))){ 
						MessageHelper.formErrorHandleClient(form[firstName].id, MessageHelper.messages["ERROR_FirstNameEmpty"]);
						return false;
					}
					if(!MessageHelper.isValidUTF8length(form[firstName].value, 128)){ 
						MessageHelper.formErrorHandleClient(form[firstName].id, MessageHelper.messages["ERROR_FirstNameTooLong"]); 
						return false;
					}
				}
				
				else if(field == "LAST_NAME" || field == "last_name"){
					form[lastName].value = trim(form[lastName].value);
					if(field == "LAST_NAME" && (form[lastName].value == "" || reWhiteSpace.test(form[lastName].value))){ 
						MessageHelper.formErrorHandleClient(form[lastName].id, MessageHelper.messages["ERROR_LastNameEmpty"]);
						return false;
					}
					if(!MessageHelper.isValidUTF8length(form[lastName].value, 128)){ 
						MessageHelper.formErrorHandleClient(form[lastName].id, MessageHelper.messages["ERROR_LastNameTooLong"]);
						return false;
					}
				}else if(field == "MIDDLE_NAME" || field == "middle_name"){
					form[middleName].value = trim(form[middleName].value);
					if(field == "MIDDLE_NAME" && (form[middleName].value == "" || reWhiteSpace.test(form[middleName].value))){ 
						MessageHelper.formErrorHandleClient(form[middleName].id, MessageHelper.messages["ERROR_MiddleNameEmpty"]);
						return false;
					}
					if(!MessageHelper.isValidUTF8length(form[middleName].value, 128)){ 
						MessageHelper.formErrorHandleClient(form[middleName].id, MessageHelper.messages["ERROR_MiddleNameTooLong"]); 
						return false;
					}
				}else if(field == "ADDRESS" || field == "address"){
					form[address1].value = trim(form[address1].value);
					form[address2].value = trim(form[address2].value);
					if(field == "ADDRESS" && ((form[address1].value == "" || reWhiteSpace.test(form[address1].value)) && (form[address2].value=="" || reWhiteSpace.test(form[address2].value)))){ 
						MessageHelper.formErrorHandleClient(form[address1].id, MessageHelper.messages["ERROR_AddressEmpty"]);
						return false;
					}
					if(!MessageHelper.isValidUTF8length(form[address1].value, 100)){ 
						MessageHelper.formErrorHandleClient(form[address1].id, MessageHelper.messages["ERROR_AddressTooLong"]); 
						return false;
					}
					if(!MessageHelper.isValidUTF8length(form[address2].value, 50)){ 
						MessageHelper.formErrorHandleClient(form[address2].id, MessageHelper.messages["ERROR_AddressTooLong"]);
						return false;
					}
				}else if(field == "CITY" || field == "city"){
					form[city].value = trim(form[city].value);
					if(field == "CITY" && (form[city].value == "" || reWhiteSpace.test(form[city].value))){ 
						MessageHelper.formErrorHandleClient(form[city].id, MessageHelper.messages["ERROR_CityEmpty"]);
						return false;
					}
					if(!MessageHelper.isValidUTF8length(form[city].value, 128)){
						MessageHelper.formErrorHandleClient(form[city].id, MessageHelper.messages["ERROR_CityTooLong"]);
						return false;
					}
				}else if(field == "STATE/PROVINCE" || field == "state/province"){
					var state = form[state];
					if(state == null || state == ""){
						state = document.getElementById(this.stateDivName).firstChild;
					}
					state.value = trim(state.value);
					/* Fix for 307  - Begins here */
					/* Defect description :Not allowing to update Address if County/ Province field is kept as blank for UK country in Address Book page.*/
					if( null!= form[country].value){
						var selectedCountry=trim(form[country].value);
						if(selectedCountry == 'GB' && state.value == "")state.value=".";
					}	
					/* Fix for 307 - Ends here */
					if(field == "STATE/PROVINCE" && (state.value == null || state.value == "" || reWhiteSpace.test(state.value))){
						MessageHelper.formErrorHandleClient(state.id, MessageHelper.messages["ERROR_StateEmpty"]);
						return false;
					}
					if(!MessageHelper.isValidUTF8length(state.value, 128)){
						MessageHelper.formErrorHandleClient(state.id, MessageHelper.messages["ERROR_StateTooLong"]);
						return false;
					}
				}else if(field == "COUNTRY/REGION" || field == "country/region"){
					form[country].value = trim(form[country].value);
					if(field == "COUNTRY/REGION" && (form[country].value == "" || reWhiteSpace.test(form[country].value))){ 
						MessageHelper.formErrorHandleClient(form[country].id, MessageHelper.messages["ERROR_CountryEmpty"]);
						return false;
					}
					if(!MessageHelper.isValidUTF8length(form[country].value, 128)){ 
						MessageHelper.formErrorHandleClient(form[country].id, MessageHelper.messages["ERROR_CountryTooLong"]);
						return false;
					}
				}else if(field == "ZIP" || field == "zip"){
					form[zipCode].value = trim(form[zipCode].value);
                    //check Brazil store CEP code ( like zip code ) for validation
					if ( typeof(isBrazilStore) != 'undefined' && isBrazilStore) {
						//see if CEP# is empty
						if(field == "ZIP" && (form[zipCode].value=="" || reWhiteSpace.test(form[zipCode].value))){ 
							MessageHelper.formErrorHandleClient(form[zipCode].id, MessageHelper.messages["ERROR_CEPNumberEmpty"]);
							return false;
						}
						//see if CEP# is longer than 9 characters
						if(!MessageHelper.isValidUTF8length(form[zipCode].value, 9)){ 
							MessageHelper.formErrorHandleClient(form[zipCode].id, MessageHelper.messages["ERROR_CEPNumberTooLong"]);
							return false;
						}
						//see if CEP# is between 8 - 9 characters
						if((MessageHelper.utf8StringByteLength(form[zipCode].value) != 8) &&
						   (MessageHelper.utf8StringByteLength(form[zipCode].value) != 9) ){ 
							MessageHelper.formErrorHandleClient(form[zipCode].id, MessageHelper.messages["ERROR_CEPNumberInvalid"]); 
							return false;
						}
					}else{
	                    //check Madisons zip code for validation
						if(field == "ZIP" && (form[zipCode].value=="" || reWhiteSpace.test(form[zipCode].value))){ 
							MessageHelper.formErrorHandleClient(form[zipCode].id, MessageHelper.messages["ERROR_ZipCodeEmpty"]);
							return false;
						}
						if(!MessageHelper.isValidUTF8length(form[zipCode].value, 40)){ 
							MessageHelper.formErrorHandleClient(form[zipCode].id, MessageHelper.messages["ERROR_ZipCodeTooLong"]);
							return false;
						}
					};			
                       //check Brazil's Consumer or Business fields for validation
				}else if((typeof(isBrazilStore) != 'undefined' && isBrazilStore) && (field == "CPF_NUMBER" || field == "cpf_number")){
					if (form["consumerRegistration"] != null && form["consumerRegistration"].checked){//consumer registration, check CPF#
						form[pay_CPFNumber].value = trim(form[pay_CPFNumber].value);
						if(field == "CPF_NUMBER" && (form[pay_CPFNumber].value == "" || reWhiteSpace.test(form[pay_CPFNumber].value))){ 
							MessageHelper.formErrorHandleClient(form[pay_CPFNumber].id, MessageHelper.messages["ERROR_CPFNumberEmpty"]);
							return false;
						}
						if((MessageHelper.utf8StringByteLength(form[pay_CPFNumber].value) != 11) ||
							!MyBrazilAccountDisplay.isValidCpf(form[pay_CPFNumber].value)){ 
							MessageHelper.formErrorHandleClient(form[pay_CPFNumber].id, MessageHelper.messages["ERROR_CPFNumberInvalid"]); 
							return false;
						}
					}else{//Business registration, check CNPJ#, companyname and CompanyShort name
                        //note:CPF field is shared with CNPJ#, only label is different on UI, same input field						
						form[pay_CPFNumber].value = trim(form[pay_CPFNumber].value);
						//validate CNPJ /CGC #
						if(field == "CPF_NUMBER" && (form[pay_CPFNumber].value == "" || reWhiteSpace.test(form[pay_CPFNumber].value))){ 
							MessageHelper.formErrorHandleClient(form[pay_CPFNumber].id, MessageHelper.messages["ERROR_CNPJNumberEmpty"]);
							return false;
						}
						if(MessageHelper.utf8StringByteLength(form[pay_CPFNumber].value) > 14){ //longer number, 14
							MessageHelper.formErrorHandleClient(form[pay_CPFNumber].id, MessageHelper.messages["ERROR_CNPJNumberToLong"]); 
							return false;
						}
						if((MessageHelper.utf8StringByteLength(form[pay_CPFNumber].value) != 14) ||
						   !MyBrazilAccountDisplay.isValidCnpj(form[pay_CPFNumber].value)){ 
							MessageHelper.formErrorHandleClient(form[pay_CPFNumber].id, MessageHelper.messages["ERROR_CNPJNumberInvalid"]); 
							return false;
						}
						//validate company name, can't be blank
						form[companyName].value = trim(form[companyName].value);
						if(form[companyName].value == "" || reWhiteSpace.test(form[companyName].value)){ 
							MessageHelper.formErrorHandleClient(form[companyName].id, MessageHelper.messages["ERROR_CompanyNameEmpty"]);
							return false;
						}
						if(!MessageHelper.isValidUTF8length(form[companyName].value, 80)){
							MessageHelper.formErrorHandleClient(form[companyName].id, MessageHelper.messages["ERROR_CompanyNameTooLong"]); 
							return false;
						}
						//validate company's short name, can't be blank
						form[organizationName].value = trim(form[organizationName].value);
						if(form[organizationName].value == "" || reWhiteSpace.test(form[organizationName].value)){ 
							MessageHelper.formErrorHandleClient(form[organizationName].id, MessageHelper.messages["ERROR_CompanyShortNameEmpty"]);
							return false;
						}
					}					
				
				}else if(field == "EMAIL1" || field == "email1"){
					form[email1].value = trim(form[email1].value);
					if(field == "EMAIL1" && (form[email1].value == "" || reWhiteSpace.test(form[email1].value))){
						MessageHelper.formErrorHandleClient(form[email1].id, MessageHelper.messages["ERROR_EmailEmpty"]);
						return false;
					}
					if(!MessageHelper.isValidUTF8length(form[email1].value, 256)){ 
						MessageHelper.formErrorHandleClient(form[email1].id, MessageHelper.messages["ERROR_EmailTooLong"]);
						return false;
					}
					if(!MessageHelper.isValidEmail(form[email1].value)){
						MessageHelper.formErrorHandleClient(form[email1].id, MessageHelper.messages["ERROR_INVALIDEMAILFORMAT"]);
						return false;
					}
				}
				else if(field == "PHONE1" || field == "phone1"){
					form[pphone1].value = trim(form[pphone1].value);
					form[pphone2].value = trim(form[pphone2].value);
					form[pphone3].value = trim(form[pphone3].value); 
					
					if(form[country].value != "GB"){
						if(field == "PHONE1" && (form[pphone1].value == "" || reWhiteSpace.test(form[pphone1].value))){
							MessageHelper.formErrorHandleClient(form[pphone1].id, MessageHelper.messages["VALIDATION_ERRMSG_PHONE4REQUIRED"]);
							return false;
						}
						else if(!MessageHelper.isValidUTF8length(form[pphone1].value != 3)){ 
							MessageHelper.formErrorHandleClient(form[pphone1].id, MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"]);
							return false;
						}
						else if(!MessageHelper.IsNumeric(form[pphone1].value)){ 
							MessageHelper.formErrorHandleClient(form[pphone1].id, MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"]);
							return false;
						}
						if(field == "PHONE1" && (form[pphone2].value == "" || reWhiteSpace.test(form[pphone2].value))){
							MessageHelper.formErrorHandleClient(form[pphone2].id, MessageHelper.messages["VALIDATION_ERRMSG_PHONE4REQUIRED"]);
							return false;
						}
						else if(!MessageHelper.isValidUTF8length(form[pphone2].value != 3)){ 
							MessageHelper.formErrorHandleClient(form[pphone2].id, MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"]);
							return false;
						}
						else if(!MessageHelper.IsNumeric(form[pphone2].value)){ 
							MessageHelper.formErrorHandleClient(form[pphone2].id, MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"]);
							return false;
						}
						if(field == "PHONE1" && (form[pphone3].value == "" || reWhiteSpace.test(form[pphone3].value))){
							MessageHelper.formErrorHandleClient(form[pphone3].id, MessageHelper.messages["VALIDATION_ERRMSG_PHONE4REQUIRED"]);
							return false;
						}
						else if(!MessageHelper.isValidUTF8length(form[pphone3].value != 4)){ 
							MessageHelper.formErrorHandleClient(form[pphone3].id, MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"]);
							return false;
						}
						else if(!MessageHelper.IsNumeric(form[pphone3].value)){ 
							MessageHelper.formErrorHandleClient(form[pphone3].id, MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"]);
							return false;
						}	
					}
					
					if(form.pphone1 != undefined || form.phoneSingle1 != undefined){
						
						if(form[country].value != "GB"){
							if(form[phoneext].value == null || form[phoneext].value == "" || reWhiteSpace.test(form[phoneext].value)){
								form[phone1].value = trim(form[pphone1].value+""+form[pphone2].value+""+form[pphone3].value);								
							}else{
								form[phone1].value = trim(form[pphone1].value+""+form[pphone2].value+""+form[pphone3].value+"X"+form[phoneext].value);
							}
						}else{
							form[phone1].value=form[phoneSingle1].value;
						}
					}else{
						form[phone1].value = trim(form[phone1].value);
						if(field == "PHONE1" && (form[phone1].value == "" || reWhiteSpace.test(form[phone1].value))){
							MessageHelper.formErrorHandleClient(form[phone1].id, MessageHelper.messages["ERROR_PhonenumberEmpty"]);
							return false;
						}
						if(!MessageHelper.isValidUTF8length(form[phone1].value, 32)){ 
							MessageHelper.formErrorHandleClient(form[phone1].id, MessageHelper.messages["ERROR_PhoneTooLong"]);
							return false;
						}
						if(!MessageHelper.IsValidPhone(form[phone1].value)){
							MessageHelper.formErrorHandleClient(form[phone1].id, MessageHelper.messages["ERROR_INVALIDPHONE"]);
							return false;
						}						
					}
				}
				// Added for defect 1381 -- START
				else if(field == "ZIPPOSTAL"){
					if(form[zipCode] != undefined){
						form[zipCode].value = trim(form[zipCode].value);
						if(!ValidatorJS.validateZipPostalCodeOnSubmit(form.name,form[zipCode],form[zipCode].value,form[country].value)){
							return false;
						}						
					}
				}
				
				// Added for defect 1381 -- END
				
				else{
					console.debug("error: mandatory field name " + mandatoryField + " is not recognized.");
					return false;
				}
			}
			if (form[address1].value == "" && form[address2].value != "") {
		
			form[address1].value = form[address2].value;
			form[address2].value = "";
			}
			if(typeof(isBrazilStore) != 'undefined' && isBrazilStore){
				if (form["consumerRegistration"] != null && form["consumerRegistration"].checked){ 
				//registered as a consumer, clear out the Business fields
				form[companyName].value = "";
				form[organizationName].value = "";
				form[taxPayerId].value = "";
				}
			}
			return true;  
		}
		return false; 
	},
	
	/**
	 * (BOPIS)This function saves the address entry form when a registered customer wants to edit/add a new address 
	 * during checkout from  his/her shopping cart.
	 * @param {string} The id of the service that was invoked, e.g. AjaxUpdateAddressForPerson, AjaxAddAddressForPerson, etc.
	 * @param {string} The name of the form containing address information.
	 */
	
	saveShopCartAddress: function(serviceId, formName){		
		//alert("saveShopCartAddress");
		//("serviceId"+serviceId);
		//("formName"+formName);

		// Defect 1180: block page until all ajax calls complete.  Needed to add some pause so that 
		//  add/edit address dialog fully closes, before ajaxblock dialog is shown
		setTimeout( "ajaxblock.init();", 500);
		
		var form = document.forms[formName];
		reWhiteSpace = new RegExp(/^\s+$/);
		if(formName == "addressFormUpdate" || formName == "billingAddressFormUpdate"){
			if(true){
				var bscountry =form.country.value;
				
				if(bscountry == "US"){
					form.zipCode.value = form.zipCode1.value;
					
				}else{
					form.zipCode.value = form.zipCode2.value;
				}
				if(bscountry != "GB"){
					if(form.bphone8.value == null || form.bphone8.value == "" || reWhiteSpace.test(form.bphone8.value)){
							form.phone1.value = trim(form.bphone5.value+""+form.bphone6.value+""+form.bphone7.value);
							
					}else{
						form.phone1.value = trim(form.bphone5.value+""+form.bphone6.value+""+form.bphone7.value+"X"+form.bphone8.value);
					}
				}else{
					form.phone1.value=form.ukphone.value;
				}
			} 
		
		}

		// This if clause is entered if user had clicked create new billing address, or edit billing address
		if (form.addressType != null && (form.addressType.value == 'ShippingAndBilling' || form.addressType.value == 'Billing')) {
			// This forces a refresh on the billing address display on the page
			// AndyK - Defect 1292 fix - this logic set here (moved from CheckoutPayments.js - saveBillingAddressDropDownBoxContextProperties function)
			wc.render.getContextById("billingAddressDropDownBoxContext").properties["billingAddress1"] = "-1";
			
			// This id is used for logic pertaining to creating/editing billing addresses.  This includes
			//  specific logic against this id, to indicate refreshing the shippping address dropdown (see
			//  shippingAddressSelectBoxAreaController definition in  ShippingAndBillingControllersDeclaration.js
			serviceId = 'AjaxAddShippingAndBillingAddressForPersonDuringCheckout';
		}
		if(true){
			this.saveAddress(serviceId, formName);
		}
	},
/**
* (BOPIS)This function saves the pick up  form  during checkout from  his/her shopping cart.
* @param {string} The id of the service that was invoked, e.g. AjaxUpdateAddressForPerson, AjaxAddAddressForPerson, etc.
* @param {string} The name of the form containing address information.
*/
	saveGuestShopperAddress: function(serviceId, formName){
		
		var form1 = document.forms[formName];	
		var address3 = document.getElementById("address3_guest").value;
		form1.address1.value=document.getElementById("address_guest").value;
		if(address3!= null){
		form1.address2.value=address3;	
		}
		form1.city.value=document.getElementById("city_guest").value;	
		//form1.state.value=document.getElementById("state").value;	
		//form1.country.value="US";
		form1.zipCode.value=document.getElementById("zipCode_guest").value;		
		var storePhone = trim(document.getElementById("storePhone1").value);			
		form1.phone1.value= storePhone;			
		
		form1.addressType.value='Shipping';
		var flag= false;
		if(this.validateGuestShopperAddress(form1)){			
			this.saveAddress(serviceId, formName);
			flag = true;
		}
		return flag;
	},

/**
* This function validates the pick up address form independently from the order of the fields displayed on the form, i.e. independent from the locale.
* A hidden field named "fields" must be set in the jsp/jspf file that calls this method. The purpose of this hidden field is 
* to set all the mandatory input fields and the order of these fields displayed on each locale-specific address entry page, so that
* this method knows which input fields to validate and in which order it should validate them.
*
* assumptions:1. Mandatory fields use UPPER CASE, non-mandatory fields use lower case.
*	     	   2. The error messages used in this method are declared in the jsp/jspf files that call this method. 
* @param {string} form The name of the address form obtained from the page containing address input fields.
* @param {string} prefix The value is set to  billing.
* 
* @return {boolean} return true if no error was found, or the hidden field "fields" were not set in the jsp/jspf file that calls this method,
* return false if form could not be found, or if there was an error validating a particular field.
*/

	validateGuestShopperAddress: function(form,prefix){
		var regExp = /^[a-zA-Z\s]*$/;

		reWhiteSpace = new RegExp(/^\s+$/);

		if(form != null){
			var fields="";
			if(form["AddressForm_FieldsOrderByLocale"] != null && form["AddressForm_FieldsOrderByLocale"].value != null && form["AddressForm_FieldsOrderByLocale"].value != ""){
				fields = form["AddressForm_FieldsOrderByLocale"].value.split(",");
			}
			else if(document.getElementById("AddressForm_FieldsOrderByLocale").value!= null && document.getElementById("AddressForm_FieldsOrderByLocale").value!= ""){
				fields=document.getElementById("AddressForm_FieldsOrderByLocale").value.split(",");
			}

			var firstName = "firstName";
			var lastName = "lastName";
			var email2 =  "email2";
			var verifyemail= "verifyemail";


			flag =true;
			for(var i=0; i<(fields.length); i++)
			{
				var field = fields[i];

				if(field == "FIRST_NAME" || field == "first_name")
				{
					var fname = form[firstName].value;
					form[firstName].value = trim(form[firstName].value);					
					if(form[firstName].value == null || form[firstName].value ==""|| reWhiteSpace.test(form[firstName].value)){ 						
						this.displayGuestShopperAddressError(form[firstName].id,MessageHelper.messages["ERROR_FirstNameEmpty"]);						
						flag =false;
					}
					if(!MessageHelper.isValidUTF8length(form[firstName].value, 128)&& flag){ 
						this.displayGuestShopperAddressError(form[firstName].id, MessageHelper.messages["ERROR_FirstNameTooLong"]);
						flag =false;
					}					
					if((fname.search(regExp) == null || fname.search(regExp) == -1 )&& flag){ 
						
						this.displayGuestShopperAddressError(form[firstName].id, MessageHelper.messages["VALIDATION_ERRMSG_FIRSTNAMENOTVALID"]);
						flag =false;
					}	
				}
				else if((field == "LAST_NAME" || field == "last_name") && flag){		
					var lname = form[lastName].value ;
					form[lastName].value = trim(form[lastName].value);
					if(form[lastName].value == null || form[lastName].value ==""|| reWhiteSpace.test(form[lastName].value)){
						this.displayGuestShopperAddressError(form[lastName].id, MessageHelper.messages["ERROR_LastNameEmpty"]);
						flag =false;
					}
					if(!MessageHelper.isValidUTF8length(form[lastName].value, 128)&& flag){ 
						this.displayGuestShopperAddressError(form[lastName].id, MessageHelper.messages["ERROR_LastNameTooLong"]); 
						flag =false;
					}
					if((lname.search(regExp) == null || lname.search(regExp) == -1 )&& flag){ 
					
						this.displayGuestShopperAddressError(form[lastName].id, MessageHelper.messages["VALIDATION_ERRMSG_LASTNAMENOTVALID"]);
						flag =false;
					}	
				}else if((field == "EMAIL2" || field == "email2") && flag){
					form[email2].value = trim(form[email2].value);						
					if(form[email2].value == null || form[email2].value ==""|| reWhiteSpace.test(form[email2].value)){
						this.displayGuestShopperAddressError(form[email2].id, MessageHelper.messages["ERROR_EmailEmpty"]);
						flag =false;
					}
					if(!MessageHelper.isValidUTF8length(form[email2].value, 256)&& flag){ 
						this.displayGuestShopperAddressError(form[email2].id, MessageHelper.messages["ERROR_EmailTooLong"]);
						flag =false;
					}
					if(!MessageHelper.isValidEmail(form[email2].value)&& flag){
						this.displayGuestShopperAddressError(form[email2].id, MessageHelper.messages["ERROR_INVALIDEMAILFORMAT"]);
						flag =false;				
					}

				}else if((field == "verifyemail" || field == "VERIFYEMAIL" )&& flag){						
					form[verifyemail].value = trim(form[verifyemail].value);
					var checkemail2=form[email2].value;
					var checkverifyemail=form[verifyemail].value;					
					if(form[verifyemail].value == null || form[verifyemail].value ==""||reWhiteSpace.test(form[verifyemail].value)){
						this.displayGuestShopperAddressError(form[verifyemail].id, MessageHelper.messages["ERROR_EmailEmpty"]);
						flag =false;
					}
					if(!MessageHelper.isConfirmEmail(checkemail2,checkverifyemail)&& flag){
						this.displayGuestShopperAddressError(form[verifyemail].id, MessageHelper.messages["ERROR_EMAILNOTMATCH"]);
						flag =false;				
					}

				}

			}

		} 
		//defect 25 start
		var errorElement = dojo.byId("ErrorMessage_TaxSystem");
		if(errorElement!=null && errorElement.style.display=='block' ){
			if(errorElement.innerHTML!="" && errorElement.innerHTML.trim().length > 0){
				
				var msgSection = document.getElementById('errorMessageSection');
				msgSection.style.display = "block";
			}
			
		}
		//defect 25 start end
		return flag; 

	},
	
	/**
	 * This function display Error Messages .
	 * @param {string} Id The name of the Guest Shopper Field.
	 * @param {string} errorMessage Error message to be displayed.	 * 
	 */
	displayGuestShopperAddressError: function(id,errorMessage){
		
		var element = dojo.byId(id);
		if(element){
			var errorElement = dojo.byId("ErrorMessage_TaxSystem");
			errorElement.style.display="block";
			errorElement.parentNode.style.display='block';
			errorElement.innerHTML = errorMessage;
			element.focus();
			dojo.connect(element,"onblur",function(){
				errorElement.style.display="none";
				errorElement.parentNode.style.display='none';
			})
			 
		}
		
	},
	/**
	 * This function saves the address entry form on an unregistered user's checkout page.
	 * @param {string} formName1 The name of the billing address form.
	 * @param {string} formName2 The name of the shipping address form.
	 * @param {string} stateDivName1 The name of the state field in the billing address form.
	 * @param {string} stateDivName2 The name of the state field in the shipping address form.
	 */
	//DGN JavaScript function to save billing/shipping address
	saveUnregisteredCheckoutAddress: function(formName1, formName2, stateDivName1, stateDivName2)
	{
		
		reWhiteSpace = new RegExp(/^\s+$/);
		var billingForm = document.forms[formName1];
		var storeId =  billingForm.storeId.value;  
		var bfirstName=billingForm.firstName.value; 
		var blastName=billingForm.lastName.value; 
		var billingNicknameTimestamp = (new Date()).getTime();
		var shippingNicknameTimestamp = (new Date()).getTime() + 1;

		billingForm.nickName.value = billingNicknameTimestamp;
		var bscountry =billingForm.country.value;
		
		/*if(!HBC.formVilidate("billing_address_form","submitButton")){
			return false;
		}
		*/
		if(bscountry == "US"){
			billingForm.zipCode.value = billingForm.zipCode1.value;
		}else{
			billingForm.zipCode.value = billingForm.zipCode2.value;
		}
		if(bscountry != "GB"){
			if(billingForm.bphone8.value == null || billingForm.bphone8.value == "" || reWhiteSpace.test(billingForm.bphone8.value)){
					billingForm.phone1.value = trim(billingForm.bphone5.value+""+billingForm.bphone6.value+""+billingForm.bphone7.value);
			}else{
				billingForm.phone1.value = trim(billingForm.bphone5.value+""+billingForm.bphone6.value+""+billingForm.bphone7.value+"X"+billingForm.bphone8.value);
			}
		}else{
			billingForm.phone1.value=billingForm.ukphone.value;
		}
		this.setStateDivName(stateDivName1);
		
		//save guest user email receive option to field1
		var receiveBox = document.getElementById("ifreceive");
		if(receiveBox ){
			if(receiveBox.checked){
				if(document.getElementById("fax2")){
					document.getElementById("fax2").value = "1" ;
				}else{
					document.getElementById("fax2").value = "0" ;
				}
			}
		}
		
		
		/**  
		 * For HBC REWARD CARD as part of Defect 3572
		 * 
		 **/
		
		var aaaaa = document.forms[formName1];
		if(aaaaa["userField1"] != null && aaaaa["userField1"] != ""){
			/*
			var demoField = aaaaa["userField1"].value;
			aaaaa["userField1"].value = demoField.substring(6,demoField.length);*/
			aaaaa["userField1"].value = aaaaa["userField1"].value;
		}
		
		//DGN Modified
		//if(this.validateAddressForm(billingForm))
		if(true)	
		{ 
			//DGN: Change the id of the same billing/shipping checkbox 
			var sameaddress = document.getElementById("SameShippingAndBillingAddress");
			//Gift registry changes begin
			var isGRFlow="false";
			if(document.getElementById('isGiftRegistryFlow') != null)
			{
				isGRFlow = document.getElementById('isGiftRegistryFlow').value;
			}
            if(isGRFlow == "true" && $("#lable-ShipTo").hasClass("checked")){
			 	//alert("hi");
			 	billingForm.addressType.value='ShippingAndBilling';
			    this.saveAddress('AddShippingAddress', 'billing_address_form');
			}
          //Gift registry changes ends
            else if (!sameaddress.checked)
			{
				var shippingForm = document.forms[formName2];
				var sfirstName=shippingForm.firstName.value; 
				var slastName=shippingForm.lastName.value; 
				shippingForm.nickName.value = shippingNicknameTimestamp;
				shippingForm.phone1.value =trim(shippingForm.sphone5.value+""+shippingForm.sphone6.value+""+shippingForm.sphone7.value+"X"+shippingForm.sphone8.value);
				this.setStateDivName(stateDivName2);
				/*Added for Defect 3833 Starts */
				var sscountry =shippingForm.country.value;			
				if(sscountry == "US"){
					document.getElementById("_zipCode_1").value = shippingForm.zipCode4.value;
				}else{
					document.getElementById("_zipCode_1").value = shippingForm.zipCode3.value;
				}
				/*Added for Defect 3833 Ends */
				/*Validate form input fields */				
				billingForm.addressType.value='Billing';
				this.saveAddress('AddBillingAddress', 'billing_address_form');									
			}
			else
			{
				billingForm.addressType.value='ShippingAndBilling';
				this.saveAddress('AddShippingAddress', 'billing_address_form');
			}
		}
	},
	
	/**
	 * This function saves the address entry form for store pickup
	 * @param {string} formName1 The name of the billing address form.
	 * @param {string} stateDivName1 The name of the state field in the billing address form.
	 */
	saveUnregisteredCheckoutAddressForStorePickup: function(formName1,stateDivName1)
	{
		reWhiteSpace = new RegExp(/^\s+$/);
		var billingForm = document.forms[formName1];
		var storeId =  billingForm.storeId.value;  
		var bfirstName=billingForm.firstName.value; 
		var blastName=billingForm.lastName.value; 
		var billingNicknameTimestamp = (new Date()).getTime();
		var shippingNicknameTimestamp = (new Date()).getTime() + 1;
        
		billingForm.nickName.value = billingNicknameTimestamp;
		var bscountry =billingForm.country.value;
		
		
		if(bscountry == "US"){
			billingForm.zipCode.value = billingForm.zipCode1.value;
	}else{
			billingForm.zipCode.value = billingForm.zipCode2.value;
	}
		if(bscountry != "GB"){
			if(billingForm.bphone8.value == null || billingForm.bphone8.value == "" || reWhiteSpace.test(billingForm.bphone8.value)){
					billingForm.phone1.value = trim(billingForm.bphone5.value+""+billingForm.bphone6.value+""+billingForm.bphone7.value);
					
			}else{
				billingForm.phone1.value = trim(billingForm.bphone5.value+""+billingForm.bphone6.value+""+billingForm.bphone7.value+"X"+billingForm.bphone8.value);
			}
		}else{
			billingForm.phone1.value=billingForm.ukphone.value;
		}
		this.setStateDivName(stateDivName1);
		
		//save guest user email receive option to field1
		var receiveBox = document.getElementById("ifreceive");
		if(receiveBox ){
			if(receiveBox.checked){
				if(document.getElementById("fax2")){
					document.getElementById("fax2").value = "1" ;
				}else{
					document.getElementById("fax2").value = "0" ;
				}
			}
		}
         		
		/*populating the store address details*/
		var shippingForm = document.forms["store_address_form"];

		shippingForm.nickName.value = shippingNicknameTimestamp;
		var shipCountry = shippingForm.country.value;
		if(null==shipCountry || shipCountry == "")
			{
			shippingForm.country.value = "US";
			}		
		billingForm.addressType.value='Billing';
		this.saveAddress('AddDOMBillingAddressInCheckOut', 'billing_address_form');
			
	},
	/**
	 * This function saves an address entry form to the associated service.
	 * @param {string} serviceId The id of the service that was invoked, e.g. AjaxUpdateAddressForPerson, AjaxAddAddressForPerson, etc. 
	 * @param {string} formName The name of the form containing address information.
	 */
	
	saveAddress:function(serviceId, formName) {
		var form = document.forms[formName];
		
		if (form.address1.value == "" && form.address2.value != "") {
			form.address1.value = form.address2.value;
			form.address2.value = "";
		}
		var addressService = wc.service.getServiceById(serviceId);
	 	addressService.formId = formName;
	 	
	 	//DGN Temporarily removed
		/* For Handling multiple clicks */
		//if(!submitRequest()){
		//	return;
		//}   	 	
	 	//cursor_wait();
	 	////("invoke");
	 	wc.service.invoke(serviceId);
	},
	
	/**
	 * This function calls UpdateOrderItem/AjaxUpdateOrderItem service to update order calculation
	 */
	
	updateOrderAfterAddressUpdate:function() {
		var params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.orderId = ".";
			
	 	cursor_wait();
	 	wc.service.invoke("AjaxUpdateOrderAfterAddressUpdate", params);
	},

	/**
	 *  This function populates the country code to mobile phone based on the selected country.
	 *  @param {string} countryDropDownId The id of the mobile country drop down list
	 *  @param {string} countryCallingCodeId The id of the mobile country calling code text box.
	 */
	
	loadCountryCode:function(countryDropDownId,countryCallingCodeId){
	this.getCountryArray();
	var countryCode = document.getElementById(countryDropDownId).value;
	document.getElementById(countryCallingCodeId).value = countries[countryCode].countryCallingCode;
	},
	
	/**
	 *  This function checks for an entry in the Mobile Phone Number field. 
	 *  If a Mobile Phone number has been entered, it enables the SMS Notifications/Promotions checkbox,
	 *  else it disables the SMS Notifications/Promotions checkbox.
	 *  @param {string} form The name of the form containing the Mobile Phone Number entry field.
	 */
	enableSMSNotifications:function(form){
	var form = document.forms[form];
	if(form.mobilePhone1.value != ""){
		form.sendMeSMSNotification.disabled = false;
		//form.sendMeSMSPreference.disabled = false;
	 }
	 else{
		 form.sendMeSMSNotification.disabled = true;
		// form.sendMeSMSPreference.disabled = true;
		 form.sendMeSMSNotification.checked = false;
		// form.sendMeSMSPreference.checked = false;
	 }
  },
  setFormName:function(formName,fieldName){
		this.formName = formName;
		this.fieldName = fieldName;
		
	},
	/**
	 * Sets the address type when a user wants to add a new address of type shipping and billing during order check out.
	 * @param {Object} checkbox The HTML checkbox input object.
	 * @param {Object} form The form that contains the new address information.
	 */
	setAddressTypeInCreatingNewAddressDuringCheckout: function(checkbox, form){
		if(form.addressType != null && form.originalAddressType != null){
			if(checkbox.checked){
				form.addressType.value = 'ShippingAndBilling';
			}else{
				form.addressType.value = form.originalAddressType.value;
			}
		}
	},
	/**
	 * This function changes the ZipCode/PostalCode maxLength to 5/6 based on the country selected.
	 * @param currentCountryCode
     * Added for Defect 3474
	 */
	changeMaxLengthOfZipCode: function(currentCountryCode){
		if(document.getElementById("idForZipCode") != null && document.getElementById("idForZipCode") != undefined){
			if(currentCountryCode == "US"){
				field = document.getElementById('zipCode');
				field.maxLength = 5;
			}
			else if(currentCountryCode == "CA"){
				field = document.getElementById('zipCode');
				field.maxLength = 7;
			}
			else if(currentCountryCode == "GB"){
				field = document.getElementById('zipCode');
				field.maxLength = 7;
			}
			if(document.getElementById("idForZipCode1") != null && document.getElementById("idForZipCode1") != undefined){
				if(currentCountryCode == "US"){
					field1 = document.getElementById('zipCode1');
					field1.maxLength = 5;
				}
				else if(currentCountryCode == "CA"){
					field1 = document.getElementById('zipCode1');
					field1.maxLength = 7;
				}
				else if(currentCountryCode == "GB"){
					field1 = document.getElementById('zipCode1');
					field1.maxLength = 7;
				}
			}
		}
	},
	
	/**
	 * This function will return the error message and displays it when State/Province field is not selected.
	 * This is currently used in Unregistered Checkout page (Defect 4058).
	 * @param {string} formName The name of the form containing address information.
	 * @param {string} id The id of the state field.
	 * @param {string} errorLabel The id of the span where the error message will be displayed.
	 * @param {string} paramPrefix The value can be shipping, billing or blank.
	 */
	showStateErrorMsg: function(formName,id,errorLabel,paramPrefix){
		var form = document.getElementById(formName);
		if(paramPrefix == null || paramPrefix == 'undefined' || paramPrefix == ""){
			paramPrefix = "";
		}
		if(id=="_state1"){
			var currentCountryCode =form[paramPrefix + "_country"].value;}
		else{
			var currentCountryCode =form[paramPrefix + "country"].value;
		}
		if(currentCountryCode == "US"){
			var errMsg = MessageHelper.messages["ERR_MSG_STATE"];
			
		}
		else{
			var errMsg = MessageHelper.messages["ERR_MSG_PROVINCE_CA"];
		}
		if(errorLabel != null && errorLabel != undefined){
			errorLabel.innerHTML = errMsg;
		}
	},
	
	/**
	 * (BOPIS)This function is added for MapIt Link on Address Page for Storepickup.
	 */
	displayStoreOnGMap : function (latitude,longitude,Address){
	
		 var latlng = new google.maps.LatLng(latitude,longitude);
		   var storemapid = document.getElementById("stores_map");
		       if(storemapid.style.display == 'block')
		          storemapid.style.display = 'none';
		       else
		          storemapid.style.display = 'block';
					var options = {
					  zoom:16,
					  center: latlng,
					  navigationControlOptions: {
						style: google.maps.NavigationControlStyle.SMALL
					  },
					  mapTypeId: google.maps.MapTypeId.ROADMAP,
					  streetViewControl: true
					};
					var map = new google.maps.Map(document.getElementById('stores_map'), options);
					this.displayresult(latitude,longitude,map,Address);
	},
	
	/**
	 * This function is added for MapIt Link on Address Page for Storepickup.
	 */
	displayresult : function(latitude,longitude,map,Address){

		var markers=[];
		if (markers.length > 0) {
				for (i in h.storelocator.markers) {		
					markers[i].setMap(null);
				}
				markers.length = 0;
		}
				var markerURL = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld=%|ff776b|000000';
				var index = markerURL.indexOf('%');
				var entryId =1;
				var entryName =Address;
				markerURL = markerURL.substr(0, index) + entryId + markerURL.substr(index + 1);

				var customIcon = new google.maps.MarkerImage(markerURL, null, null, new google.maps.Point(11, 37));
				var entryPoint = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));

							var mapMarker = new google.maps.Marker({
								position: entryPoint,
								map: map,
								title:entryName ,
								icon: customIcon
							});

							markers.push(mapMarker);
		                     
							var interact = function(evt){
								var listitems = d.query('li', list);
								listitems.removeClass('active');
								query(listitems[i]).addClass('active');
								var infowindow = new google.maps.InfoWindow({ maxWidth: 384, pixelOffset: new google.maps.Size(-10,0) });

								infowindow.setContent(entry.info);
								infowindow.open(h.storelocator.map, mapMarker);

								window.scrollTo(0,200);
							};

							google.maps.event.addListener(mapMarker, 'click', interact);
		},
		/**
		 * This function is added for validating phone number on Address Page for Storepickup.
		 */
		isPhoneNumberValid :function (){
	         
			if(document.getElementById("_country_1").value!="GB"){
  			var phone1 = dojo.byId("bphone1");
  			var phone2 = dojo.byId("bphone2");
  			var phone3 = dojo.byId("bphone3");
  			var phoneExt = dojo.byId("bphone4");
  			if (phone1.value.length==0 ||phone2.value.length==0 ||phone3.value.length==0){
	    		return false;
   		    }
    		else if((phone1.value.length > 0 && (phone1.value.length != 3 || !MessageHelper.IsNumeric(phone1.value)))
    		 	||(phone2.value.length > 0 && (phone2.value.length != 3 || !MessageHelper.IsNumeric(phone2.value)))
    		 	||(phone3.value.length > 0 && (phone3.value.length != 4 || !MessageHelper.IsNumeric(phone3.value)))
    		 	||(phoneExt.value.length > 0 && (phoneExt.value.length > 6 || !MessageHelper.IsNumeric(phoneExt.value)))){
	    		return false;
   		    }
   		    else {
	    		return true;
   		    }
   		    }
   		    else {
	    		return true;
   		    }
	}


}
