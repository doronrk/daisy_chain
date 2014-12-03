//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2006, 2009 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/** 
 * @fileOverview This javascript is used by AddressBookForm.jsp,AjaxAddressBookForm.jsp and UnregisteredCheckout.jsp.
 * @version 1.0
 */

 /* Import dojo classes */
dojo.require("wc.render.RefreshController");
dojo.require("wc.render.Context");
dojo.require("wc.widget.RefreshArea");

dojo.addOnLoad(function(){
	/* Make sure there is always a render context. */
	if(!wc.render.getContextById("default")){
		wc.render.declareContext("default", {}, "");
	}
	
	/*Declare all the refresh controllers required for address book. */
	AddressBookFormJS.declareRefreshController("addressDisplayAreaController",  "addressDisplayAreaAction", "AjaxAddressBookForm");
	AddressBookFormJS.declareRefreshController("addressFormAreaController", "addressFormAreaAction", "AjaxAccountAddressForm");
	AddressBookFormJS.declareRefreshController("billing_statesDisplayAreaController", "statesDisplayAreaAction", "AjaxAddressStatesDisplay");
	AddressBookFormJS.declareRefreshController("shipping_statesDisplayAreaController", "statesDisplayAreaAction", "AjaxAddressStatesDisplay");
});

/**
 *  The functions defined in this class enable the customer to maintain an address book. 
 *	@class The AddressBookFormJS class defines all the functions and variables to update an address book. The customer can add or
 *  remove an address form the address book. The fields that can be entered while creating an address are first name, last name, 
 *  street address, city, country/region, state/province, ZIP/postal code, phone number, e-mail address.
 */

AddressBookFormJS = {
	/* The common parameters used in service calls. */
		langId: "-1",
		storeId: "",
		catalogId: "",
	/* flag set on address delete which is used to display the success message. */ 
		addressDeleted: "false",
	/* flag set on creation of new address which is used to display the success message. */ 
		addressNew: "false",
	/* variable set on address update which is used to display the success message. */  
		pageVar: "",
		formName:"",
		fieldName:"",
		addressType: "",
		
	
	/**
	 * This function initializes common parameters used in all service calls.
	 * @param {int} langId The language id to use.
	 * @param {int} storeId The store id to use.
	 * @param {int} catalogId The catalog id to use.
	 */

		setCommonParameters:function(langId,storeId,catalogId){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
		},
		
		setFormName:function(formName,fieldName){
			//alert("formName"+formName);
			this.formName = formName;
			this.fieldName = fieldName;
			
		},
		
	/**
	 * This function returns the handler for the refresh controller corresponding to the action.
	 * @param {string} handlerKey The key of the handler.
	 * @param {string} actionName The name of the action to be performed.
	 * 
	 * @return function handler.
	 */
	getControllerActionHandler: function(handlerKey, actionName){
		console.debug("entering getControllerActionHandler(controller, handlerKey, actionName): "+actionName);
		var handler = AddressBookFormJS[actionName+'s'][handlerKey];
		if(handler){
			return function(message, widget, controller){
				handler(message, widget, controller);	
				
			}
		}else{
			return function(message, widget, controller){
				console.debug("empty handler. This is a no-op");	
			}	
		}	
	}, 
	
	/**
	 *  This function declares a refresh area controller that has the given controller ID, and optionally a url.
	 *  This function will declare a refreshArea controller if and only no controller with the same controller ID exits yet.
	 *	The declared controller is designed to handle address specific tasks. If user passes a "url" parameter when updating context, 
	 *  it will replace the value of its own "url" parameter to the one given by the user. It also calls functions based on the value of the given
	 *	property actionName. For example, if the given actionName is "action", it will look up a function registered in AddressBookFormJS.actions using
	 *  the value of the property "action" in render context as the key.
	 *	@param {string} controllerId The ID of the controller that is going to be declared.
	 *	@param {string} actionName The name that identifies this controller's behaviors. It is best described by an example. Say, we declare a controller 
	 *  whose actionName is AddressFormAreaAction, then the handler of renderContextChanged event of this declared controller will look up the value 
     * 	that is corresponding to AddressFormAreaAction in the render context. Once the value is found, the controller will use the value to look up the registered function in 
	 *	the associative array AddressBookFormJS.AddressFormAreaActions (note plural is used for the associative array). If a function is found, the found function 
	 *	will be called. The signature of found function should be function(message, widget, controller), where message and widget is as defined for the controller's 
	 *	rendercontextChangedHandler, and controller is the declared context. We normally implement the logic of updating refreshed area in the found functions. 
	 *  param {string} defaultURL The url this controller used for getting data from server. It will be set to controller.url.
	 */
	declareRefreshController: function(controllerId, actionName, defaultURL){
		 
		console.debug("entering AddressBookFormJS.declareRefreshController with action name = "+actionName+" and controller id = "+controllerId);
		if(wc.render.getRefreshControllerById(controllerId)){
			console.debug("controller with id = "+controllerId+" already exists. No declaration will be done");
			return;
		}
		wc.render.declareRefreshController({
			id: controllerId, 
			renderContext: wc.render.getContextById("default"),
			url: defaultURL,
			renderContextChangedHandler: function(message, widget) {
				console.debug("entering renderContextChangedHandler for "+controllerId);
			
				var controller = this;
				var renderContext = this.renderContext;
				
				if(!Common.getRenderContextProperty(renderContext, actionName)){
					console.debug("no "+actionName+" is specified. This handler will not be called. Exiting...");
					return;	
				}
				
				if(Common.getRenderContextProperty(renderContext, "url")){
					controller.url = Common.getRenderContextProperty(renderContext, "url");
				}
				
				AddressBookFormJS.getControllerActionHandler(Common.getRenderContextProperty(renderContext, actionName), actionName)(message, widget, controller);
				
				
				delete renderContext.properties[actionName];
				delete renderContext.properties["url"];
			}, 
			
			modelChangedHandler: function(message, widget){
				
				AddressBookFormJS.getControllerActionHandler("handleModelChange", actionName)(message, widget, this);
				
				cursor_clear();
			}
		});
	}, 
	
	/**
	 *  This defines function registries for handling address forms. We register functions that handle different operations
	 *	on address forms. The key of each function will be the value of the property "addressFormAreaAction" in render context. 
	 *  Each function takes three parameters: message, widget, and controller. The parameters message and widget are the same as those for
	 *	a controller's renderContextChangedHandler(). The parameter controller is the controller that will call this function.
	 */
	addressFormAreaActions: { 
		/* The function that loads an empty address for for creating new address. */
		create: function(message, widget, controller){
			widget.refresh(controller.renderContext.properties);
			controller.renderContext.properties['addressFormAreaState'] = 'create';
		}, 	
		
		/* The function that loads an address form that contains the information of currently displayed address, so that the
		 * address can be edited.
		 */
		edit: function(message, widget, controller){
			console.debug("starting to getting editing area");
			widget.refresh(controller.renderContext.properties);
			controller.renderContext.properties['addressFormAreaState'] = 'edit';
		}, 

		/* Destroy the address forms that are handled by this controller. */
		clean: function(message, widget, controller){
			widget.setInnerHTML("");	
			controller.renderContext.properties['addressFormAreaState'] = 'clean';
		},

		/* This function behaves same as {@link clean} function. */ 
		handleModelChange: function(message, widget, controller){
			widget.setInnerHTML("");
			controller.renderContext.properties['addressFormAreaState'] = 'clean';
		}
			
	}, 
	
	/*
	 * This defines function registries handling address display.The registered functions handle operations on 
     * the refresh area that displays user addresses.Each function takes three parameters: message, widget, and controller.
	 *
	 * @see AddressBookFormJS.addressFormAreaActions
	 */
	addressDisplayAreaActions: {
		
		/* This function reloads the refresh areas that display user addresses. */
		reload: function(message, widget, controller){
			console.debug("reloading "+widget);
			widget.refresh(controller.renderContext.properties);
		},
		
		/* This function behaves similar to {@link reload} function. */
		handleModelChange: function(message, widget, controller){
			console.debug("reloading "+widget);
			widget.refresh(controller.renderContext.properties);
		}
	}, 
	
	/*
	 * This defines function registries for handling the display of states and province. The registered functions displays states upon changes made 
	 * in address country. Each function takes three parameters: message, widget, and controller.
	 */
	statesDisplayAreaActions: {
		 
		/* This function  refreshes the area that displays states/provinces corresponding to the updated country */
		countryUpdated: function(message, widget, controller){
			console.debug("IN countryUpdated handler: message = "+message);
			
			var paramPrefix = controller.renderContext.properties['paramPrefix'];
			if(widget.widgetId.match(paramPrefix)){
				console.debug("matchin paramPrefix: "+paramPrefix+" refreshing "+widget.widgetId);
				
				widget.refresh(controller.renderContext.properties);	
			}else{
				console.debug("no maching paramPrefix "+paramPrefix);
			}
			
		}
		
	}, 
	
	/**
	 *  This function displays the address that has the selected address Id, and hides all the other addresses.
	 *  This function is supposed to be called when an addressId is selected from an HTML form selection control. 
	 *	This function makes a few assumptions. It assumes each ddress is displayed in the same way. Each chunk 
	 *	of address information has the same class, tableClass. It also assumes the area that displays
	 *	an address has an ID in the form of <tableIdPrefix><addressId>.
	 *  @param {DomNode} selection The DomNode of a form selection. This node contains selected addressId.
	 *  @param {string} tableClass The class of the table that contains an address.
	 *  @param {string} tableIdPrefix The prefix of the Id of each address table.
	 */
	toggleAddressDisplay: function(selection, tableClass, tableIdPrefix){
		console.debug('toggle address display');
		var selectedAddressId = selection.options[selection.selectedIndex].value;
			dojo.forEach(dojo.query("."+tableClass), function(div){
			var tableId = tableIdPrefix+selectedAddressId;
			if(div.id == tableId && selectedAddressId != "MyBillingAddress"){
				div.style.display="block";	
			}else{
				div.style.display="none";
			}
		});
	}, 
	
	/**
	 * This function behaves as a wrapper that updates the default render context with the given parameters.
	 * @param {array} params The parameters passed to update the default render context.
	 */

	updateAddressArea: function(params){ 
		console.debug("to update with params: "+params);
		wc.render.updateContext("default", params);
		console.debug("updateArea done");
	}, 

	
	/**
	 * This function updates an address in the address book when 'AjaxMyAccount' option is enabled in the change flow option for the store.
	 * This function takes a form containing the address information and invokes 'updateAddressBook' service. 
	 * After the address is updated, this function will refresh the address
	 * display area using the given URL.
     * @param {string} formName The name of the form containing the address information. 
	 * @param {string} addressDisplayURL The url used to refresh address display.
	 */
	updateAddress: function(formName,addressDisplayURL){

		var form = document.forms[formName];
		
		for (var i=0; i<form.sbAddress.length; i++)  {
			if (form.sbAddress[i].checked)  {
				form.addressType.value=form.sbAddress[i].value;
			} 

		}
		if(form.addressType.value == "")
		{
			MessageHelper.displayErrorMessage(MessageHelper.messages["AB_SELECT_ADDRTYPE"]);
			return;
		}
		/* Validate the form input fields. */
		if (this.validateForm(form)) {
			console.debug("creating with form id = "+formName+" and  address display url is: "+addressDisplayURL);
			dojo.require("wc.service.common");
			wc.service.declare({
				id: "updateAddressBook",
				actionId: "updateAddressBook",
				url: "AjaxPersonChangeServiceAddressAdd",
				formId: formName,
				successHandler: function(serviceResponse) {
					AddressBookFormJS.pageVar='addressbook';
					cursor_clear();					
				},
				failureHandler: function(serviceResponse) {
					if (serviceResponse.errorMessage) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
					} 
					else {
						 if (serviceResponse.errorMessageKey) {
							MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						 }
					}
					cursor_clear();
				}
	
			});
			
			/*For Handling multiple clicks. */
			if(!submitRequest()){
				return;
			}   			
			cursor_wait();			
			wc.service.invoke("updateAddressBook");
		}
	}, 

	/*
	 * This function creates a new address in the address book when 'AjaxMyAccount' option is enabled in the change flow option for the store.
	 * This function takes a form containing the address information and invokes 'updateAddress' service.
	 * After the address is created, this function will refresh the address display area using the given URL.
	 * @param {string} formName The name of the form containing the address information. 
	 * @param {string} addressDisplayURL The url used to refresh address display.
	 */

	newUpdateAddressBook: function(formName,addressDisplayURL){
		
		var form = document.forms[formName];
		
		for (var i=0; i<form.sbAddress.length; i++)  {
			if (form.sbAddress[i].checked)  {
				form.addressType.value=form.sbAddress[i].value;
			} 

		}
		if(form.addressType.value == "")
		{
			MessageHelper.displayErrorMessage(MessageHelper.messages["AB_SELECT_ADDRTYPE"]);
			return;
		}
		/*Validate the form input fields. */
		if (this.validateForm(form)) {
			console.debug("creating with form id = "+formName+" and  address display url is: "+addressDisplayURL);
			dojo.require("wc.service.common");
			wc.service.declare({
				id: "updateAddress",
				actionId: "updateAddress",
				url: "AjaxPersonChangeServiceAddressAdd",
				formId: formName,
				successHandler: function(serviceResponse) {
					AddressBookFormJS.addressNew='true';
					cursor_clear();					
				},
				failureHandler: function(serviceResponse) {
					if (serviceResponse.errorMessage) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
					} 
					else {
						 if (serviceResponse.errorMessageKey) {
							MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						 }
					}
					cursor_clear();
				}
	
			});
			
			/*For Handling multiple clicks. */
			if(!submitRequest()){
				return;
			}   			
			cursor_wait();			
			wc.service.invoke("updateAddress");
		}
	},
    
	/* 
	 * This function displays the footer for the AddNew address page. The Update button in the footer calls the function 
     * to create new address.
	 */
	showFooterNew: function(){ 
		
		hideElementById("content_footer");
		showElementById("addnew_content_footer");
	},
	
	/*
	 * This function displays the footer for the address book page. The Update button in the footer calls the function 
	 * to update the selected address.
	 */
	showFooter: function(){

		showElementById("content_footer");
		hideElementById("addnew_content_footer");
	},
    
	/*
	 * This function deletes an address from the addressbook when 'AjaxMyAccount' option is enabled in the change flow option for the store.
	 * This function deletes an address currently selected and refreshes the address display area using the specified url.
	 * @param {string} selectionName The id of the address dropdown box.
	 * @param {string} addressDeleteUrl The url used to delete the address.
	 * @param {string} addressUrl The url used to refresh the address display area.
	 */

	newDeleteAddress: function(selectionName,addressDeleteUrl,addressUrl){
		
		var addressBox = document.getElementById(selectionName);
		if(addressBox.value == addressBox.options[0].value)
		{
			MessageHelper.formErrorHandleClient(selectionName,MessageHelper.messages["ERROR_DEFAULTADDRESS"]); 
			return;
		}
		if(addressBox.value == "")
		{
			MessageHelper.formErrorHandleClient(selectionName,MessageHelper.messages["ERROR_SELECTADDRESS"]);
			return;
		}
		var params = [];
		params.storeId = this.storeId;
		params.catalogId = this.catalogId;
		params.addressId = addressBox.value;
		params.URL = addressUrl;
		dojo.require("wc.service.common");
		wc.service.declare({
			id: "AddressDelete",
			actionId: "AddressDelete",
			url: addressDeleteUrl,
			successHandler: function(serviceResponse) { 
				AddressBookFormJS.addressDeleted = "true";
				wc.render.getRefreshControllerById("MyAccountCenterLinkDisplay_Controller").url = addressUrl;
				cursor_clear();
			},
			failureHandler: function(serviceResponse) {
				if (serviceResponse.errorMessage) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				} 
				else {
						 if (serviceResponse.errorMessageKey) {
							MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						 }
				}
				cursor_clear();
			}

		});
		
		/*For Handling multiple clicks. */
		if(!submitRequest()){
			return;
		}   			
		cursor_wait();		
		wc.service.invoke("AddressDelete",params);
	}, 

	
	
	/*
	 * This function is used to load the details corresponding to an address selection. When the customer
	 * selects an address from the dropdown, this function displays the stored address details 
	 * corresponding to the selection.
	 * @param {string} selection The id of the address dropdown box.
	 * @param {array} addresses Array of address objects.
	 * @param {object} form The actual HTML form object containing address information.
	 */
	populateTextFields: function(selection, addresses, form){
	
		if(document.getElementById("adding").style.display=='block')
		{
			var hidediv = document.getElementById("adding");
			hideElementById(hidediv);
			var div = document.getElementById("normal");
			div.style.display = "block";
		}
		var selectedAddressId = selection.options[selection.selectedIndex].value;
		
		var addressType = addresses[selectedAddressId].addressType;
		if (addressType == 'ShippingAndBilling' || addressType == 'Billing') {
			form.sbAddress.checked = true;
			dojo.addClass("checkboxforBillingAddress", "checked");	// this is for label css class for visual check
			// Added for defect 1380 -- START
			
			if(selectedAddressId != userprofileaddr){
				dijit.byId("email1").attr("disabled",false);
			}
			else{
				dijit.byId("email1").attr("disabled",true);
			}
			
			//dijit.byId("verifyemail1").attr("disabled",false);
			form.email1.value = addresses[selectedAddressId].email1;	
			//form.verifyemail1.value = form.email1.value;
			document.getElementById("myaccountEmail").style.display = "block";
			//document.getElementById("myaccountverifyEmail").style.display = "block";
			var mandfields = (document.forms["AddressForm"])["AddressForm_FieldsOrderByLocale"];
			if(mandfields != null && mandfields != undefined){
				(document.forms["AddressForm"])["AddressForm_FieldsOrderByLocale"].value = "NICK_NAME,FIRST_NAME,LAST_NAME,ADDRESS,CITY,COUNTRY/REGION,STATE/PROVINCE,PHONE1,EMAIL1,ZIPPOSTAL"; 
			}
			// Added for defect 1380 -- END
		} else {	
			form.sbAddress.checked = false;
			dojo.removeClass("checkboxforBillingAddress", "checked");	// this is for label css class for visual check
			// Added for defect 1380 -- START
			dijit.byId("email1").attr("disabled",true);
			//dijit.byId("verifyemail1").attr("disabled",true);
		
			if(selectedAddressId == userprofileaddr){
				form.email1.value = addresses[selectedAddressId].email1;
			}else{
				form.email1.value = "-";
			}
			//form.verifyemail1.value = "";
			document.getElementById("myaccountEmail").style.display = "none";
			//document.getElementById("myaccountverifyEmail").style.display = "none";
			var mandfields = (document.forms["AddressForm"])["AddressForm_FieldsOrderByLocale"];
			if(mandfields != null && mandfields != undefined){
				(document.forms["AddressForm"])["AddressForm_FieldsOrderByLocale"].value = "NICK_NAME,FIRST_NAME,LAST_NAME,ADDRESS,CITY,COUNTRY/REGION,STATE/PROVINCE,PHONE1,ZIPPOSTAL"; 
			}
			// Added for defect 1380 -- END
		}

		form.nickName.value = addresses[selectedAddressId].nickName;	
		form.firstName.value = addresses[selectedAddressId].firstName;
		form.lastName.value = addresses[selectedAddressId].lastName;	
		form.address1.value = addresses[selectedAddressId].address1;
		form.address2.value = addresses[selectedAddressId].address2;		
		form.country.value = addresses[selectedAddressId].country;	
		form.zipCode.value = addresses[selectedAddressId].zipCode;	
		form.city.value = addresses[selectedAddressId].city;	
		AddressHelper.loadStatesUI('AddressForm','','stateDiv','state');
		form.state.value = addresses[selectedAddressId].state;
		if(form.pphone1 == undefined || form.phoneSingle1 == undefined){
			form.phone1.value = addresses[selectedAddressId].phone1;
		}else{
			var phone=addresses[selectedAddressId].phone1;
			this.populatePhoneInAccountAddressBook(form, phone);
		}
		if(form.middleName)
			form.middleName.value = addresses[selectedAddressId].middleName;
		// Dnot need to display user the nickname field...
		//document.getElementById("addr_title").innerHTML="<h2 class='status_msg'>"+addresses[selectedAddressId].nickName+"</h2>";
		//Fix for defect # 2031 - START
		if(form.country.value == "GB"){
			dijit.byId("phoneSingle1").attr("disabled",false);
		}
		//Fix for defect # 2031 - END
	},
	
	populatePhoneInAccountAddressBook: function(form, phone){
		if(form.country.value == "GB"){
			form.phoneSingle1.value=phone;
			
			var phone1 = dijit.byId(form.pphone1.name);
			if(phone1 != null && phone1 != undefined){
				phone1.attr("disabled",true);
			}
			var phone2 = dijit.byId(form.pphone2.name);
			if(phone2 != null && phone2 != undefined){
				phone2.attr("disabled",true);
			}
			var phone3 = dijit.byId(form.pphone3.name);
			if(phone3 != null && phone3 != undefined){
				phone3.attr("disabled",true);
			}
		}else {
			if(phone != null && phone != "" ){
				var phoneNumber=phone;
				form.phoneext.value="";
				if(phone.length <= 10){
					form.pphone1.value=phoneNumber.substring(0,3);
					form.pphone2.value=phoneNumber.substring(3,6);
					form.pphone3.value=phoneNumber.substring(6,10);
				}else{
					form.pphone1.value=phoneNumber.substring(0,3);
					form.pphone2.value=phoneNumber.substring(3,6);
					form.pphone3.value=phoneNumber.substring(6,10);
					form.phoneext.value=phoneNumber.substring(11,phone.length);				
				}
			}else{
				form.pphone1.value="";
				form.pphone2.value="";
				form.pphone3.value="";
				form.phoneext.value="";				
			}
		}		
	},
	
	
	/*
	 * This function displays the default customer address on load of the address book page.
	 * @param {string} selection The id of the address dropdown box.
	 * @param {array} addresses Array of address objects.
	 * @param {object} form The actual HTML form object containing address information.
	 */

	populateTextFieldsOnLoad: function(selection, addresses, form){

		var selectedAddressId = selection.options[selection.selectedIndex].value;
		
		var radioButton = form.sbAddress;
		for (var i=0; i<radioButton.length; i++)  
		{
			if (radioButton[i].value == addresses[selectedAddressId].addressType)  
			{
				radioButton[i].checked = "checked";
			} 
		}
		form.nickName.value = addresses[selectedAddressId].nickName;	
		form.firstName.value = addresses[selectedAddressId].firstName;	
		form.lastName.value = addresses[selectedAddressId].lastName;	
		form.address1.value = addresses[selectedAddressId].address1;
		form.address2.value = addresses[selectedAddressId].address2;
		form.country.value = addresses[selectedAddressId].country;	
		form.zipCode.value = addresses[selectedAddressId].zipCode;	
		form.city.value = addresses[selectedAddressId].city;
		AddressHelper.loadStatesUI('AddressForm','','stateDiv','state');
		form.state.value = addresses[selectedAddressId].state;	
		/* Fix for 307  - Begins here */
		if(form.state.value == '.'){form.state.value=''};
		/* Fix for 307 - Ends here */
		
		
		form.email1.value = addresses[selectedAddressId].email1;	
		//form.verifyemail.value = addresses[selectedAddressId].email1;
		if(form.phone1 != undefined){
			form.phone1.value = addresses[selectedAddressId].phone1;	
		}			
		
		if(form.middleName)
			form.middleName.value = addresses[selectedAddressId].middleName;
		//AddressHelper.loadStatesUI('addressBookForm','','stateDiv','state', true);
		//document.getElementById("addr_title").innerHTML="<h2 class='status_msg'>"+addresses[selectedAddressId].nickName+"</h2>";
	},
	
	/**
	 *  This function is used to clear the values of all the form input fields in the address book.
	 *  The function obtains each form field by id and clears its value. This is usually done after form submit.
	 */

	clearTextFields: function(form){
		form.nickName.value="";
		form.firstName.value="";
		form.lastName.value="";
		form.address1.value="";
		form.address2.value="";
		form.city.value="";
		form.state.value="";
		//form.country.value="";
		form.zipCode.value="";
		form.email1.value="";
		//form.verifyemail.value = "";
		if(form.phone1 != undefined){
			form.phone1.value = "";			
		}
		if (form.phoneSingle1 != undefined){
			form.phoneSingle1.value="";
		}
		if(form.pphone1 != undefined || form.pphone2 != undefined || form.pphone3 != undefined || form.phoneext != undefined){
			form.pphone1.value="";
			form.pphone2.value="";
			form.pphone3.value="";
			form.phoneext.value="";
		}	
		if(form.middleName) {
			form.middleName.value="";
		}
	},
	
	/**
	 *  This function creates or updates an address when 'AjaxMyAccount' option is disabled in the change flow option for the store.
	 *  @param {object} form The actual HTML form object containing address information.
	 *  @param {boolean} suffix If the flag is set to 0,then the address is updated.If the flag is set to 1,then new address is created.
	 */
	submitForm: function(form,suffix) {
		 if (form.sbAddress.checked)  { 			
 			if(form.sbAddress.value == 'ShippingAndBilling')
 				form.addressType.value='ShippingAndBilling';
 		} 
         else{
        	 form.addressType.value='Shipping';
         }
		 
		 // Added if condition to fix defect 1213 - Getting generic error during address updation
		 if(form.name != "AddressForm"){
			 // Nicknames not displayed anymore to user, must ensure nicknames are unique - using timestamp.
			 //  This is consistent with AddressHelper.js saveUnregisteredCheckoutAddress function
			 form.nickName.value=(new Date()).getTime();			 
		 }
		
		/*for (var i=0; i<form.sbAddress.length; i++)  {
		if (form.sbAddress[].checked)  {
			if(form.sbAddress[i].value == 'Shipping')
				form.addressType.value='Shipping';
			if(form.sbAddress[i].value == 'Billing')
				form.addressType.value='Billing';
			if(form.sbAddress[i].value == 'ShippingAndBilling')
				form.addressType.value='ShippingAndBilling';
		} 
		}
		
		/*if(!HBC.formVilidate("AddressForm1","allbutton")){
			return false;
		
		
	}*/
        
		if(form.addressType.value == "")
		{
			MessageHelper.displayErrorMessage(MessageHelper.messages["AB_SELECT_ADDRTYPE"]);
			return;
		}

		if(suffix){AddressHelper.setStateDivName("stateDiv1");}
		/*validate all form input fields. */

		if(this.validateForm(form)){
		if(!suffix)
		form.addressId.value = document.getElementById("addressId").value;
		

		/* For Handling multiple clicks. */
		if(!submitRequest()){
			return;
		}
		
		form.submit();
		form.nickName.value="";
		form.firstName.value="";
		form.lastName.value="";
		form.address1.value="";
		form.address2.value="";
		form.city.value="";
		form.state.value="";
		form.country.value="";
		form.zipCode.value="";
		form.email1.value="";
		//form.verifyemail.value = "";
		form.phone1.value = "";	
		if(form.middleName)
			form.middleName.value="";
		}
	},
	
	/**
	 *  This function loads the address form when addnew button is clicked. This loads the form with all the input fields cleared. 
	 */
	showAdd: function(){
		//Added for defect 3474 Start
		var form = document.forms["AddressForm1"];
		//Added for defect 3474 End
		var hidediv = document.getElementById("normal");
		hideElementById(hidediv);
		var div = document.getElementById("adding");
		if(div != null && div != undefined){
			AddressHelper.loadStatesUI('AddressForm1','','stateDiv1','state1');
			if(dijit.byId("phoneSingle11") != null){
				dijit.byId("phoneSingle11").attr("disabled",true);
			}
			if(dijit.byId("pphone11") != null &&  dijit.byId("pphone21") != null && dijit.byId("pphone31") != null){
				dijit.byId("pphone11").attr("disabled",false);
				dijit.byId("pphone21").attr("disabled",false);
				dijit.byId("pphone31").attr("disabled",false);
			}
			div.style.display = "block";	
		}
		//Changed for defect 3474 Start
		if(document.getElementById("idForState1") != undefined && document.getElementById("idForZipCode1") != undefined){
			if(form.country.value == "US"){
				document.getElementById("idForState1").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_STATE"];
				document.getElementById("idForZipCode1").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_ZIPCODE"];
			}else{
				document.getElementById("idForState1").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_PROVINCE"];
				document.getElementById("idForZipCode1").innerHTML=MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"] + MessageHelper.messages["EMAIL_SUBSCRIPTION_POSTALCODE"];
			}
		}
		//Changed for defect 3474 End
		if(document.getElementById("phonefornonUK1") != undefined && document.getElementById("phoneforUK1") != undefined){
			document.getElementById("phoneforUK1").style.display = "none";
			document.getElementById("phonefornonUK1").style.display = "block";
		}
		if(document.getElementById("WC_AccountForm_sbAddress_3") != undefined && document.getElementById("WC_AccountForm_sbAddress_3") != undefined){
			document.getElementById("WC_AccountForm_sbAddress_3").checked == "false";
			var isChecked = document.getElementById("WC_AccountForm_sbAddress_3").checked;
			
			 
			if(isChecked == "true"){
				alert("is checked"+isChecked);
				dojo.byId("labl_forBillingAddress").setAttribute("class", "checkbox checked");
				dijit.byId("email11").attr("disabled",false);
				//dijit.byId("verifyemail11").attr("disabled",false);
				// Updated to fix defect 1380 -- START
				document.getElementById("myaccountEmail1").style.display = "block";
				//document.getElementById("myaccountverifyEmail1").style.display = "block";
				// Updated to fix defect 1380 -- END
			}else{
				dojo.byId("labl_forBillingAddress").setAttribute("class", "checkbox unchecked");
				dijit.byId("email11").attr("disabled",true);
				//dijit.byId("verifyemail11").attr("disabled",true);
				// Updated to fix defect 1380 -- START
				document.getElementById("myaccountEmail1").style.display = "none";
				//document.getElementById("myaccountverifyEmail1").style.display = "none";
				// Updated to fix defect 1380 -- END
			}
		}
	},
	
	/**
	 * This function deletes an address from the addressbook when 'AjaxMyAccount' option is disabled in the change flow option for the store.
	 * This function takes the address selection as input and submits the form for removal of the selected address.
	 * @param {string} formName The name of the form containing the address information. 
	 * @param {string} addressSelectBoxName The id of the address dropdown box. 
	 */
	removeAddress:function(formName,addressSelectBoxName){
		
		var addressBox = document.getElementById(addressSelectBoxName);
		if(addressBox.value == addressBox.options[0].value)
		{
			MessageHelper.formErrorHandleClient(addressSelectBoxName,MessageHelper.messages["ERROR_DEFAULTADDRESS"]); 
			return;
		}

		var form = document.forms[formName];
		form.addressId.value = addressBox.value;
		
		/* handle the selected address after remove action */
		var selectedIndex = addressBox.selectedIndex;
		var addrLength = addressBox.options.length ;
		var addrIdAfterRemove ;

		if((selectedIndex + 1) == addrLength){
			   addrIdAfterRemove = addressBox.options[selectedIndex - 1].value;
		}else{
			   addrIdAfterRemove = addressBox.options[selectedIndex + 1].value ;
		}
		
		if(form.selectedAddress){
			form.selectedAddress.value = addrIdAfterRemove;
		}
		
		/* For Handling multiple clicks. */
		if(!submitRequest()){
			return;
		}
		
		form.submit();
	},
	
	/**
	 * This function validates the form input fields.
	 * @param {object} form The actual HTML form object containing address information.
	 *
	 * @return {boolean} If validation is successful, then returns true, else returns false.
	 */

	validateForm: function(form){

		/** Uses the common validation function defined in AddressHelper class for validating first name, 
		 *  last name, street address, city, country/region, state/province, ZIP/postal code, e-mail address and phone number. 
		 */
		return(AddressHelper.validateAddressForm(form));
	},

	
	/**
	 * This function is used during Unregistered checkout and makes the Shipping address same as the Billing address.
	 * This function takes shipping and billing forms as input and copies the billing address information to the shipping address.
	 * @param {string} bform The name of the Billing address form.
	 * @param {string} sform The name of the Shipping address form.
	 */
	copyBillingFormNew: function(fromName,toName){
			var bform = document.forms[fromName];
			var sform = document.forms[toName];
			var sameaddress = document.getElementById("SameShippingAndBillingAddress");
			if (sameaddress.checked){
				hideElementById("shipping-address-form");
				sform.firstName.value = bform.firstName.value;
				sform.lastName.value = bform.lastName.value;
				sform.address1.value = bform.address1.value;
				sform.address2.value = bform.address2.value;
				sform.city.value = bform.city.value;
				if(dojo.isIE){(document.getElementById("stateDiv2").firstChild).value = (document.getElementById("stateDiv1").firstChild).value;}
				else {sform.state.value = bform.state.value;}
				sform.country.value = bform.country.value;
				var bscountry=sform.country.value;
				if(bscountry == "US"){
					sform.zipCode.value = bform.zipCode1.value;
				}else{
					sform.zipCode.value = bform.zipCode2.value;
				}
				if(bscountry != "GB"){
				sform.sphone5.value = bform.bphone5.value;
				sform.sphone6.value = bform.bphone6.value;
				sform.sphone7.value = bform.bphone7.value;
				sform.sphone8.value = bform.bphone8.value;
				sform.phone1.value =trim(sform.sphone5.value+""+sform.sphone6.value+""+sform.sphone7.value+"X"+sform.sphone8.value);
				}
				else{
					sform.phone1.value=bform.ukphone.value;
			}
				
			}

//			if (!sameaddress.checked){
//				alert("111");
//				HBC.shippingAddressInitOnload();
//				//showElementById("shipping_address_form1");
//				showElementById("shipping-address-form");
//				
//				sform.firstName.value = "";
//				sform.lastName.value = "";
//				sform.address1.value = "";
//				sform.address2.value = "";
//				sform.city.value = "";
//				if(dojo.isIE){(document.getElementById("stateDiv2").firstChild).value= "";}
//				else{sform.state.value = "";}
//				sform.zipCode.value = "";
//				sform.phone1.value = "";
//				//sform.email1.value = "";
//				if(sform.middleName)
//					sform.middleName.value = "";
//			}	
		}
};
