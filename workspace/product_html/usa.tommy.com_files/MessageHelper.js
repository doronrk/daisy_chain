//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2007, 2010 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 *@fileOverview This javascript file defines all the javascript functions used to display
 *and handle the information messages, error messages.
 */

if(typeof(MessageHelper) == "undefined" || !MessageHelper || !MessageHelper.topicNamespace){

/**
 * @class The MessageHelper class contains variables and functions that are used
 * to initialize, display and handle informational and error message.
 */
	MessageHelper = {
		/**A variable that contains all the messages to be displayed*/
		messages: {},

		/**
     * internal variable to keep track of the current element id that has
     * an error tooltip assigned to it */
		identifier: "",
		
	/** 
	 * variable to decide if error messages should be cleared or not */
	 clearMessageFlag: true,

    /**
     * returns the current year
     * @return (int) the current year
     */
		getCurrentYear: function(){
			return new Date().getFullYear();
		},

     /**
     * returns the current month. January is 1, and December is 12.
     * @return (int) the current month
     */
		getCurrentMonth: function(){
       return new Date().getMonth()+1;
		},

     /**
     * returns the current day of the current month, starting from 1.
     * @return (int) the current day
     */
		getCurrentDay: function(){
       return new Date().getDate();
		},

    /**
     *
     *summary: retrieves the value of the property from a render context
		 *description: This function retrieves the value of the property whose name is propertName
		 *from the given context.
     *
     * @param (wc.render.Content) content The context in which the properties
     * belong to.
     * @param (string) propertyName The property to be retrieved
		 * @return (string) null if the context is null. undefined if the property is not found.
		 * otherwise, the value of the property int he given context.
     */
		getRenderContextProperty : function(/*wc.render.Context*/context, /*String*/propertyName){

			console.debug("enter getRenderContextProperty with propertyName = "+propertyName);
			if(context == null){
				console.debug("context is null. Return null...");
				return null;
			}

			var result = context.properties[propertyName]
			console.debug("the found property value is: "+result);

			return result;
		},

		/**
     * This function is used to initialize the messages object with all the
     * required messages. It is used to setup a JS object with any key/value.
     * @param (string) key The key used to access this message.
     * @param (string) msg The message in the correct language.
     *
     */
		setMessage:function(key, msg) {
			MessageHelper.messages[key] = msg;
		},

    /**
     * This function is used to display the error messages to the user.
     * @param (string) msg The error/information message to be displayed
     * @param (int) topOffset how far from the top the message display area will be displayed.
     * @param (boolean) showType whether or not the message type should be appended to the actual message
     *
     * @return (element) a HTML element that contains the error message.
     *
     */
		displayErrorMessage:function(msg, topOffset,showType){

			var element = dojo.byId('pageLevelMessage');
			if(THOverlay.isOpen()){
				element = dojo.byId('overLayMessage');				
			}
			var errorMessage = '';
			if(element) {

				if (msg instanceof Array && msg.length == 1) {
					errorMessage = msg[0];
					errorMessage = $('<div/>').html(errorMessage).text();
					element.innerHTML = '<b>Error: </b>' + errorMessage;
				} else {
					element.innerHTML = '<b>Error: </b>' + msg;
				}

				if(dojo.hasClass(element, 'pageSuccessMessage'))
					dojo.removeClass(element.id, 'pageSuccessMessage');

				dojo.addClass(element.id, 'pageErrorMessage');
				element.style.display = "block";
				
				if(THOverlay.isOpen()){
					THOverlay.scrollTo(0)
				} else {
					THUtil.scrollTo(0,0);
				}
			}
			console.debug('error message');
		},

    /**
     * This function is used to display the informative messages to the user.
     * @param (string) msg The status message to be displayed.
     * @param (int) topOffset how far from the top of the browser the message will be displayed.
     * @return (element) a HTML element that contains the status message.
     */
		displayStatusMessage:function(msg,topOffset){

			var element = dojo.byId('pageLevelMessage');
			if(element) {
				element.innerHTML = msg;

				if(dojo.hasClass(element, 'pageErrorMessage'))
					dojo.removeClass(element.id, 'pageErrorMessage');

				dojo.addClass(element.id, 'pageSuccessMessage');
				element.style.display = "block";
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			}
			console.debug('status message');

		},

    /**
     * This function is used to hide and clear the message display area in
     * the page.
     */
		hideAndClearMessage:function(){
			MessageHelper.clearAllErrorMessages();
		},

	 /**
     * This function is used to hide and clear all error messages
     *
     */
		clearAllErrorMessages:function(){

			MessageHelper.clearFieldLevelErrorMessage();
			MessageHelper.clearPageLevelErrorMessage();
		},

    /**
     * This function is used to hide and clear field level error messages
     *
     */
		clearFieldLevelErrorMessage:function(){

			/* remove field level error messages if present */
			dojo.query(".fieldErrorMessage").orphan();

			/* Remove any error highlight already present */
			dojo.query('.errorTxtBox', document).forEach(function(tag) {
				dojo.removeClass(tag.id, 'errorTxtBox');
			});

			dojo.query('.orderItemErrorMsg', document).forEach(function(tag) {
				dojo.byId(tag.id).innerHTML = "";
			});
		},
		
    /**
     * This function is used to hide and clear page level error messages
     *
     */
		clearPageLevelErrorMessage:function(){

			var element = dojo.byId('pageLevelMessage');
			if(element)
				element.style.display = "none";
			
			element = dojo.byId('overLayMessage');
			if(element)
				element.style.display = "none";
		},
		
		clearMessage:function(messageId){
			
			var element = dojo.byId(messageId);
			if(element)
				element.style.display = "none";
		},	

    /**
     * This function will show the an error message tooltip
     * around the input field with the problem.
     *
     * The function assumes the "serviceResponse" is the
     * JSON object from a WebSphere Commerce exception. The error
     * field is in the serviceResponse.errorMessageParam and the
     * error message is in the serviceResponse.errorMessage.
     *
     * @see MessageHelper.formErrorHandleClient
     * @param (object) serviceResponse The JSON object with the error data.
     * @param (string) formName The name of the form where the error field is.
     *
     */
		formErrorHandle:function(serviceResponse,formName){

			MessageHelper.formErrorHandleClient(serviceResponse.errorMessageParam, serviceResponse.errorMessage);

	  	},

	  	/**
	     * defect 7769 : This function will show the an error message in
	     * an alert box when input has invalid parameters.
	     *
	     * This function will check for the emptiness of the required
	     * filed and displays the "errorMessage" related to that field as a popup.
	     *
	     * @param (string) id The identifier for the filed in the form.
	     * @param (string) errorMessage The message that should be displayed to the user.
	     */

		/**
		*
		* Checks the email format before submitting the newsletter signup form
		*
		**/
		signupForNewsletter: function (form, id){
			var signUpEmail = document.getElementById(id);

			if(!MessageHelper.isValidEmail(signUpEmail.value)){
		  		alert("Please enter a valid email address (name@host)");
				return false;
			}
		},

	     /**
     * This function will show the an error message tooltip
     * around the input field with the problem.
     *
     * This function will check for the emptiness of the required
     * filed and displays the "errorMessage" related to that field as a tooltip.
     * The tooltip will be closed on focus lost.
     *
     * @param (string) id The identifier for the filed in the form.
     * @param (string) errorMessage The message that should be displayed to the user.
     */
		formErrorHandleClient:function(id,errorMessage){

	  		var element = dojo.byId(id);
			if (errorMessage == null){
				console.debug("formErrorHandleClient: The error message is null.");
				return;
			}

			if (element){

				/* Remove any error highlight already present */
				dojo.query('.errorTxtBox', document).forEach(function(tag) {
					dojo.removeClass(tag.id, 'errorTxtBox');
				});

				/* Add highlight to the current element */
				/* override for add to cart action */
				if(element.id == 'addToCartLinkAjax' || element.id == 'replaceCartItemAjax') {
					/* do not set border*/
				} else {
					dojo.addClass(id, 'errorTxtBox');
				}

				/* set focus */
				if(element.id != 'addToCartLinkAjax' && element.id != 'pdpAdd2CartButton')
					element.focus();

				/* Remove existing error message if present */
				dojo.query(".fieldErrorMessage").orphan();

				var paddingLeft = false;

				dojo.require("dojo.NodeList-traverse");
				dojo.query(element).prev().forEach(function(nod, index, arr){
					/* Address Book form has labels inside the input elements div but its on top of element compared
					 * to My Information page */
					if(nod.nodeType == 1 && nod.tagName == 'LABEL') {
						id = nod.parentNode.id;
					} else {
						id = nod.id;
						if(dojo.hasClass(nod, "column_label")){
							paddingLeft = true;
						}
					}
				});

				var parentID = element.parentNode;
				dojo.require("dojo.NodeList-traverse");
				dojo.query(parentID).prev().forEach(function(nod, index, arr){

					if( dojo.hasClass(nod, "label_spacer") || dojo.hasClass(nod, "formLabel") ||
						dojo.hasClass(nod, "column_label") || dojo.hasClass(nod, "wishlist_label")
						|| dojo.hasClass(nod, "column_label2") ){

						id = nod.id;

						/* Fix for payment method dropdown */
						if(dojo.hasClass(nod, "label_spacer") && element.id == 'pay_expire_month') {
							id = parentID.parentNode.parentNode.id;
						}

					}
					/* Fix for issue with state drop down in user registration page */
					if(dojo.hasClass(nod, "column_label")) {
						paddingLeft = true;
					}
				});

				/* Fix for birthday dropdowns in user registration */
				if(dojo.hasClass(parentID, "birthdayColumn")){
					id = parentID.parentNode.parentNode.id;
					paddingLeft = true;
				}

				/* override for add to cart action */
 				if((element.id == 'addToCartLinkAjax' && dojo.byId('sizeContainer')) || (element.id == 'pdpAdd2CartButton' && dojo.byId('sizeContainer'))) {
					id = 'sizeContainer';
				} else if ((element.id == 'addToCartLinkAjax' || element.id == 'replaceCartItemAjax') && dojo.byId('sizeInfoContain')){
					id = 'sizeInfoContain';
				}

				/* override for Credit card section */
				if( element.id == 'account1_1'){
					id = parentID.parentNode.parentNode.parentNode.id;;
				} else if( element.id == 'cc_cvc_1' ){
					id = element.parentNode.parentNode.parentNode.id;;
				} else if(element.id == 'expire_month_1' || element.id == 'expire_year_1') {
					id = element.parentNode.parentNode.id;;
				} else if(element.id == 'PasswordResetForm_FormInput_logonId_In') {
					id = 'strongtext';
				} else if(element.id == 'WC__ShoppingCartAddressEntryForm_shippingAddressCreateEditFormDiv_1_state_1') {
					id = 'WC_shippingAddressCreateEditFormDiv_1_state_div_20';
				} else if(element.id == 'WC__ShoppingCartAddressEntryForm_billingAddressCreateEditFormDiv_1_state_1') {
					id = 'WC_billingAddressCreateEditFormDiv_1_state_div_20';
				} else if (element.id == 'WC_GuestUserRegForm_FormInput_email1_In_Register_1' || element.id=='WC_GuestUserRegForm_FormInput_logonPassword_In_Register_1' || element.id=='WC_GuestUserRegForm_FormInput_logonPasswordVerify_In_Register_1') {
					id = element.parentNode.parentNode.id;
				}
				
				/* override for Gift boxing */
				if(element.id=='messageFromInput' || element.id=='messageToInput' || element.id=='giftMessageInput') id='giftBoxingErrorMessage';

				/* added messaging for bundle page*/
				if((element.id).indexOf("sizeContainer_") > -1)
					id = element.id;
				
				/* Place the error message before the element */
				if(paddingLeft) {
					dojo.place("<div id='fieldErrorMessage' class='fieldErrorMessage' style='padding-left:200px;' >"+errorMessage+"</div>",id, 'before');
				} else {
					dojo.place("<div id='fieldErrorMessage' class='fieldErrorMessage'>"+errorMessage+"</div>",id, 'before');
				}

			}
		},


		/**
     * This function clears the internal variable that has the element id
     * with the error tooltip.
     *
     */
		clearCurrentIdentifier:function(){

			MessageHelper.identifier = "";
	  },

     /**
      * This function is used to override any of the default functions
      * associated with the events. Ex: Tooltip widget tracks onMouseOver event
      * and display the tooltip. To remove this association,
      * tooltip widgets onMouseOver function will be overridden by this empty
      * function.
      *
      * It is an empty implementation which does nothing.
      *
      * @param (string) event  The event which triggers this function.
      */
	  emptyFunc:function(event){

	  },



    /**
     * Checks whether a string contains a double byte character.
     *
     * @param (string) target the string to be checked
     * @return (boolean) true if target contains a double byte char;
     * false otherwise
     */
		containsDoubleByte:function (target) {

				var str = new String(target);
				var oneByteMax = 0x007F;

				for (var i=0; i < str.length; i++){
					chr = str.charCodeAt(i);
					if (chr > oneByteMax) {
						return true;
					}
				}
				return false;
		},

	/**
	 * Validates the input email using w3 regex 
	 *
	 * @param (string) email the string to be checked
	 * @return (boolean) true if the email is valid;
	 * false otherwise
	 */
		checkEmailWithW3RegExp:function (email) {

			var w3RegExpEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			return w3RegExpEmail.test(email);
		},
		
		
	/**
     * This function validate email address. It does not allow double byte
     * characters in the email address.
     *
     * @return (boolean) true if the email address is valid; false otherwise
     *
     * @param (string) strEmail the email address string to be validated
     */
		isValidEmail:function(strEmail){

			if (MessageHelper.containsDoubleByte(strEmail)){
				return false;
			}
			if (!MessageHelper.checkEmailWithW3RegExp(strEmail)){
				return false;
			}
				if (strEmail.length < 5) {
					 return false;
				}else{
					if (strEmail.indexOf(" ") > 0){
								return false;
						}else{
							if (strEmail.indexOf("@") < 1) {
										return false;
								}else{
									if (strEmail.lastIndexOf(".") < (strEmail.indexOf("@") + 2)){
												return false;
										}else{
												if (strEmail.lastIndexOf(".") >= strEmail.length-2){
													return false;
												}
										}
								}
						}
				}
				return true;
		},

		/**
     * This function will check if the number of bytes of the string
     * is within the maxlength specified.
     *
     * @param (string) UTF16String the UTF-16 string
     * @param (int) maxlength the maximum number of bytes allowed in your input
     *
     * @return (boolean) false is this input string is larger than maxlength
		 */
		isValidUTF8length: function(UTF16String, maxlength) {
			if (MessageHelper.utf8StringByteLength(UTF16String) > maxlength) return false;
			else return true;
		},

    /**
     * This function will count the number of bytes represented in a UTF-8
     * string.
     *
     * @param (string) UTF16String the UTF-16 string you want a byte count of
     * @return (int) the integer number of bytes represented in a UTF-8 string
     */
		utf8StringByteLength: function(UTF16String) {

			if (UTF16String === null) return 0;

			var str = String(UTF16String);
			var oneByteMax = 0x007F;
			var twoByteMax = 0x07FF;
			var byteSize = str.length;

			for (i = 0; i < str.length; i++) {
				chr = str.charCodeAt(i);
				if (chr > oneByteMax) byteSize = byteSize + 1;
				if (chr > twoByteMax) byteSize = byteSize + 1;
			}
			return byteSize;
		},

    /**
     * this function will check whether the text is a numeric or not.
     *
     * @param allowDot is a boolean wich specifies whether to consider
     * the '.' or not.
     *
     * @return (boolean) true if text is numeric
     */
		IsNumeric : function (text,allowDot)
		{
			if(allowDot) var ValidChars = "0123456789.";
			else var ValidChars = "0123456789";

			var IsNumber=true;
			var Char;


			for (i = 0; i < text.length && IsNumber == true; i++)
			{
				Char = text.charAt(i);
				if (ValidChars.indexOf(Char) == -1)
				{
					IsNumber = false;
				}
			}
			return IsNumber;
		},

    /**
     *
     *This function will check for a valid Phone Number
     *
     *@param (string) text The string to check
     *
     *@return (boolean) true if text is a phone number, ie if each character of
     *input is one of 0123456789() -+
     */
		IsValidPhone : function (text)
		{

			var ValidChars = "0123456789()-+ ";

			var IsValid=true;
			var Char;

			for (i = 0; i < text.length && IsValid == true; i++)
			{
				Char = text.charAt(i);
				if (ValidChars.indexOf(Char) == -1)
				{
					IsValid = false;
				}
			}
			return IsValid;
		},


		displaySuccessMessage:function(msg,topOffset){

			var element = dojo.byId('pageLevelMessage');
			if(element) {
				element.innerHTML = msg;

				if(dojo.hasClass(element, 'pageErrorMessage'))
					dojo.removeClass(element.id, 'pageErrorMessage');

				dojo.addClass(element.id, 'pageSuccessMessage');
				element.style.display = "block";
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			}
			console.debug('success message');
		},

		displayCartMessage:function(errorMessageParam){

			if(errorMessageParam.length > 1) {
				MessageHelper.displayCartErrorMessage(errorMessageParam[1]);
			}

		},

		displayCartErrorMessage:function(orderItemIdsString){


			var lineItems = orderItemIdsString.split(":");
			for (var i=0; i<lineItems.length; i++) {
				var lineItemArr = lineItems[i].split("_");

				if(dojo.byId('orderItemMessage_'+lineItemArr[0])) {
					dojo.byId('orderItemMessage_'+lineItemArr[0]).innerHTML = MessageHelper.messages["ITEM_LEVEL_OOS_MSG"];
				}

				var ordItemStatusElement = dojo.byId('orderItemStatusMsg_'+lineItemArr[0]);
				if(ordItemStatusElement) {

					if(lineItemArr[1] == 'IS') {
						ordItemStatusElement.innerHTML = MessageHelper.messages["SHIP_IN_STOCK"];
						if(dojo.hasClass(ordItemStatusElement, "cartItemError")){
							dojo.removeClass(ordItemStatusElement.id, 'cartItemError');
						}
					} else {
						ordItemStatusElement.innerHTML = MessageHelper.messages["SHIP_OUT_OF_STOCK"];
						if(!dojo.hasClass(ordItemStatusElement, "cartItemError")){
							dojo.addClass(ordItemStatusElement.id, 'cartItemError');
						}
					}
				}
			}
			console.debug('displayCartMessage');
		}
	}
}
