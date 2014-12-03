/**
 * Licensed Materials - Property of IBM
 * WebSphere Commerce
 * (C) Copyright IBM Corp. 2008, 2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

ValidatorJS={
	
	/**
	 * This function validates and sets the focus on the fields whose values are mandatory.
	 */
	validateHBCAddress: function(form, HBCReqAddressFields){
		if(form != null && HBCReqAddressFields != null){
			var fields="";
			fields = HBCReqAddressFields.split(",");
			var empty = false;
			for(var i=0; i<fields.length; i++){
				var field = fields[i];
				if(form[field] != null && form[field].value == ""){
					UtilitiesJS.elementFocusById(form[field]);
					//return false;
					empty = true;
				}
			}
			if(empty) {
				UtilitiesJS.elementFocusById(form[fields[0]]);
				return false;
			}
			else{
				return true;				
			}
		}
		return false;
	},
	
	/**
	 * This function validates the Email field.
	 * @param {string} value of the email field.
	 */
	validateEmail: function(value, constraints){
		if(!this.focused){
				var regExp = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
				var vemail = null;
				if(this.name == 'semail'){
					vemail = dijit.byId('svemail');
				}
				else if(this.name == 'regemail'){
					vemail = dijit.byId('regvemail');
				}
				else if(this.name == 'email1'){
					vemail = dijit.byId('verifyemail');
				}
				
				if(vemail == null || vemail == undefined){
					vemail = dijit.byId('verifyemail1');
				}
				
				if(this.required){
					if(value.length == 0){
						this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILREQUIRED"];
						return false;
					}	
				}
				
				if(value.length > 40){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILTOOLONG"];
	    			return false;
	    		}
				else if(value.length > 0 && (value.search(regExp) == null ||	value.search(regExp) == -1)){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILNOTVALID"];
					return false;
				}
				else if(vemail != null && vemail != undefined && vemail.value != ""){
					if(value != vemail.value){
						vemail.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILVERIFYNOTSAME"];
					}
					vemail.focus();
					return true;
				}
				return true;
		}
		return true;
	},
	
	/**
	 * This function validates the Email field for Unsubscribe.
	 */
	validateUnSubscribeEmail: function(value, constraints){
		if(!this.focused){
				var regExp = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
				var vemail = null;
				if(this.required){
					if(value.length == 0){
						this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILREQUIRED1"];
						return false;
					}	
				}
				
				if(value.length > 40){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILTOOLONG"];
	    			return false;
	    		}
				else if(value.length > 0 && (value.search(regExp) == null ||	value.search(regExp) == -1)){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILNOTVALID"];
					return false;
				}
				return true;
		}
		return true;
	},
	
	/**
	 * This function validates the Email field for Wishlist.
	 */
	validateWishlistEmail: function(value, constraints){
		if(!this.focused){
				var regExp = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
				var vemail = null;
				if(this.required){
					if(value.length == 0){
						this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_WISHLIST"];
						return false;
					}	
				}
				
				if(value.length > 40){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILTOOLONG"];
	    			return false;
	    		}
				else if(value.length > 0 && (value.search(regExp) == null ||	value.search(regExp) == -1)){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILNOTVALID"];
					return false;
				}
				return true;
		}
		return true;
	},
	
	/**
	 * This function validates the Sender and Recipent Name.
	 */
	validateWishListSenderName: function(value, constraints){
		if(!this.focused){
			if(this.required){
				var regExp = /[a-zA-Z]/;
				var regExp1=/[0-9]/;
				var name = null;
								
				if(value.length == 0 ){
	    			this.invalidMessage = MessageHelper.messages["Err_msg_Sender_Name"];
	    			return false;
	    		} else if((value.search(regExp1) == null ||	value.search(regExp1) != -1) ){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_SNDRNAMENOTVALID"];
					return false;
				} 
			
				
			}
		}
		return true;
	},
	
	validateGiftCardEmail: function(value, constraints){
		if(!this.focused){
				var regExp = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
				var vemail = null;
				if(this.name == 'remail'){
					vemail = dijit.byId('confremail');
				}
				if(this.required){
					if(value.length == 0){
						this.invalidMessage = MessageHelper.messages["ERR_MSG_GIFT"];
						return false;
					}	
				}
				
				if(value.length > 40){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILTOOLONG"];
	    			return false;
	    		}
				else if(value.length > 0 && (value.search(regExp) == null ||	value.search(regExp) == -1)){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILNOTVALID"];
					return false;
				}
				else if(vemail != null && vemail.value != ""){
					if(value != vemail.value){
						vemail.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILVERIFYNOTSAME"];
					}
					vemail.focus();
					return true;
				}
				return true;
		}
		return true;
	},
	
	validateVerifyGiftCardEmail: function(value, constraints){
		if(!this.focused){
			if(this.required){
				var regExp = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
				var email = null;
				if(this.name == 'confremail'){
					email = dijit.byId('remail');
				}
				
				if(value.length == 0){
					this.invalidMessage = MessageHelper.messages["Err_Msg_Confirm_Recipient_Email"];
					return false;
				}
				else if(value.length > 40){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_VEMAILTOOLONG"];
	    			return false;
	    		}
				else if(value.search(regExp) == null ||	value.search(regExp) == -1){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_VEMAILNOTVALID"];
					return false;
				}
				else if(email != null && email.value != "" && value != email.value){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILVERIFYNOTSAME"];
					return false;
				}
			}
		}
		return true;
	},

	/**
	 * This function validates the Sender and Recipent Name.
	 */
	validateSenderRecipentName: function(value, constraints){
		if(!this.focused){
			if(this.required){
				var regExp = /[a-zA-Z]/;
				var regExp1=/[0-9]/;
				var name = null;
				if(this.name == 'sdername'){
					name = dijit.byId('sdername');
				}
				if(this.name == 'rname'){
					name = dijit.byId('rname');
				}
				
				if(value.length == 0 &&  this.name == 'sdername'){
	    			this.invalidMessage = MessageHelper.messages["Err_msg_Sender_Name"];
	    			return false;
	    		} else if((value.search(regExp1) == null ||	value.search(regExp1) != -1) && this.name == 'sdername'){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_SNDRNAMENOTVALID"];
					return false;
				} else 	if(value.length > 30 && this.name == 'sdername' ){
					this.invalidMessage = MessageHelper.messages["Err_msg_Sender_tooLong"];
					return false;
				} 
			
				if(value.length == 0 && this.name == 'rname'){
	    			this.invalidMessage = MessageHelper.messages["Err_msg_Recipient_Name"];
	    			return false;
	    		} else if((value.search(regExp1) == null ||	value.search(regExp1) != -1) && this.name == 'rname'){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_RECPNAMENOTVALID"];
					return false;
				} else if(value.length > 30 && this.name == 'rname' ){
					this.invalidMessage = MessageHelper.messages["Err_msg_Recipient_tooLong"];
					return false;
				}	
			}
		}
		return true;
	},
	/**
	 * This function validates the Verify Email field.
	 * @param {string} value of the Verify email field.
	 */
	validateVerifyEmail: function(value, constraints){
		if(!this.focused){
			if(this.required){
				var regExp = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
				var email = null;
				if(this.name == 'svemail'){
					email = dijit.byId('semail');
				}
				else if(this.name == 'regvemail'){
					email = dijit.byId('regemail');
				}
				else if(this.name == 'verifyemail'){
					email = dijit.byId('email1');
				}
				
				if(value.length == 0){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_VEMAILREQUIRED"];
					return false;
				}
				else if(value.length > 40){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_VEMAILTOOLONG"];
	    			return false;
	    		}
				else if(value.search(regExp) == null ||	value.search(regExp) == -1){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_VEMAILNOTVALID"];
					return false;
				}
				else if(email != null && email.value != "" && value.toLowerCase() != email.value){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILVERIFYNOTSAME"];
					return false;
				}
			}
		}
		return true;
	},
	
		validateVerifyEmail1: function(value, constraints){
			if(!this.focused){
				var validatorForm = AddressBookFormJS.formName;
		    	var form = document.forms[validatorForm];
			    if(validatorForm != null && validatorForm != 'undefined' && validatorForm != ""){
					var email = form.email1;
					//console.log("emailVal"+emailVal);
					var regExp = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
					var fieldName = AddressBookFormJS.fieldName;
		    		var verifyEmailVal = form[fieldName].value;

		    		if(this.required){
			    		if(verifyEmailVal.length == 0){
			    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_VEMAILREQUIRED"];
			    			return false;
			    		}
		    		}
		    		if(verifyEmailVal.length > 40){
		    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_VEMAILTOOLONG"];
		    			return false;
		    		}
		    		else if(verifyEmailVal.search(regExp) == null || verifyEmailVal.search(regExp) == -1){
		    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_VEMAILNOTVALID"];
		    			return false;
		    		}
		    		else if(email != null && email.value != "" && verifyEmailVal != email.value){
		    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILVERIFYNOTSAME"];
		    			return false;
		    		}
		    		return true;
			    }
			    return true;
			}
			return true;
		},
	/**
	 * This function validates the Giftcard field.
	 * @param {string} value of the Giftcard field.
	 */
	validateGCCard: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
   		    	
   		    	var regExp = /[0-9]/;
   		    	value = trim(value);
   		    	if(document.getElementById("PaybyGiftCard").checked)
   		    	{
   		    	
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_GIFTCARDREQUIRED"];
	    			return false;
	    		}
	    		else if(value.length < 10){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_GIFTCARDREQUIRED"];
	    			return false;
	    		}
	    		else if((value - 0) != value)
	    		{
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_DIGIT"];
					return false;
	    		}
	    	}
    	}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Giftcard PIN field.
	 * @param {string} value of the Giftcard PIN field.
	 */
	validateGCPin: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
   		    	var regExp = /[0-9]/;
   		    	value = trim(value);
   		    	if(document.getElementById("PaybyGiftCard").checked)
   		    	{
   		    	
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_GIFTCARDPINREQUIRED"];
	    			return false;
	    		}
	    		else if(value.length < 4){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_GIFTCARDPINREQUIRED"];
	    			return false;
	    		}
	    		else if((value - 0) != value){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PIN"];
					return false;
	    		}
	    	}
    	}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Giftcard PIN field.
	 * @param {string} value of the Giftcard PIN field.
	 */
    
   /* validatePaymentType: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
	    		if(value== ""){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_CARDTYPE"];
	    			return false;
	    		}
    	}
    	}
   		return true;
    },
    */
    
    /**
	 * This function validates the Giftcard PIN field.
	 * @param {string} value of the Giftcard PIN field.
	 */
	validateXPMonth: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
   		    	var regExp = /[0-9]/;
   		    	value = trim(value);
   		    	if(document.getElementById("PaybyCreditCard").checked)
   		    	{
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_EXPMONTH_REQUIRED"];
	    			return false;
	    		}
	    		else if(value.length < 2){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_EXPMONTH_NOTVALID"];
	    			return false;
	    		}
	    		else if(value>12){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_EXPMONTH_NOTVALID"];
	    			return false;
	    		}
	    		else if(value<1){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_EXPMONTH_NOTVALID"];
					return false;
	    		}
	    		else if((value - 0) != value){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_EXPMONTH_DIGIT"];
					return false;
	    		}
	    		else 
	    			{
	    			if(document.getElementById("expYear").value!=null ||document.getElementById("expYear").value!="" )
	    				{
	    				var expYear=document.getElementById("expYear").value;
	    				var currentTime = new Date();
	   		    		var year = currentTime.getFullYear();
	   		    		var month = currentTime.getMonth()+1;
	    				if(expYear==year && value< month)
	    					{
	    					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_EXPMONTH_NOTVALID"];
	    					return false;
	    					}
	    				}
	    			}
	    		
	    	}
    	}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Giftcard PIN field.
	 * @param {string} value of the Giftcard PIN field.
	 */
	validateXPYear: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
   		    	var regExp = /[0-9]/;
   		    	value = trim(value);
   		    	if(document.getElementById("PaybyCreditCard").checked)
   		    	{
   		    		var currentTime = new Date();
   		    		var year = currentTime.getFullYear();
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_EXPYEAR_REQUIRED"];
	    			return false;
	    		}
	    		else if(value.length < 4){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_EXPYEAR_NOTVALID"];
	    			return false;
	    		}
	    		else if((value - 0) != value){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_EXPYEAR_DIGIT"];
					return false;
	    		}
	    		else if(value<year){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_EXPYEAR_NOTVALID"];
					return false;
	    		}
	    		else if(value>2099){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_EXPYEAR_NOTVALID"];
					return false;
	    		}
	    	}
    	}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Giftcard PIN field.
	 * @param {string} value of the Giftcard PIN field.
	 */
    validateCCCard: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
   		    	var regExp = /[0-9]/;	
   		    	value = trim(value);
   		    
   		    	if(document.getElementById("PaybyCreditCard").checked)
   		    	{
   		    		if(value.length == 0){
		    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CREDITCARDREQUIRED"];
		    			return false;
		    		}
	    		else if((value - 0) != value){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CREDIT"];
					return false;
	    		}
	    		else if((document.getElementById('payMethodId_1').value!="LT")&&(document.getElementById('payMethodId_1').value!="AMEX"))
   		    			{
	    		if(value.length < 16){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CREDITCARDINVALID"];
	    		return false;
	    		}
   		    			}
	    		else if((document.getElementById('payMethodId_1').value!="LT"))
	    			{
	    			if(value.length != 15){
	    	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CREDITCARDINVALID"];
	    	    		return false;
	    	    		}
	    			}
   		    		/* Code changes made as part of defect# 3249 Starts */
	    		else if((document.getElementById('payMethodId_1').value=="LT"))
    			{
    			if(value.length < 2 || value.length > 11 ){
    	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CREDITCARDINVALID_LT"];
    	    		return false;
    	    		}
    			}
		    		/* fixed as part of defect# 3249 Ends */
   		    	else if(value.length >11)
	    				{
	    				this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CREDITCARDINVALID"];
	    	    		return false;
	    				}
	    			
   		    			
	    		
   		    }
    	}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Giftcard PIN field.
	 * @param {string} value of the Giftcard PIN field.
	 */
	validateCCPin: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
   		    	var regExp = /[0-9]/; 	
   		    	value = trim(value);
   		    	if(document.getElementById("PaybyCreditCard").checked)
   		    	{
   		    		if(document.getElementById('payMethodId_1').value =="empty")
   	    			{
   	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CC_CARDTYPE"];
   					return false;
   	    			}
   		    		else if((document.getElementById('payMethodId_1').value!="HBC"))
   		    			{
   		    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CREDITCARDPINREQUIRED"];
	    			return false;
   		    		}
   		    		else if((document.getElementById('payMethodId_1').value!="LT"))
		    		{
		    		if(value.length == 0){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CREDITCARDPINREQUIRED"];
    			return false;
		    		}
		    		// Amex card 4 digits , others 3 digits 
		    		
		    		if((value.length > 3) && document.getElementById('payMethodId_1').value != "AMEX"){
		    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_INVALID"];
		    			return false;
		    		}
		    		if((value.length < 3) && document.getElementById('payMethodId_1').value != "AMEX"){
		    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_INVALID"];
		    			return false;
		    		}
		    		else if((value.length > 4) && document.getElementById('payMethodId_1').value == "AMEX"){
		    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_INVALID"];
		    			return false;
		    		}
		    		else if((value.length < 4) && document.getElementById('payMethodId_1').value == "AMEX"){
		    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_INVALID"];
		    			return false;
		    		}
		    		else if((value - 0) != value){
					this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CODE"];
					return false;
		    		}
		    		
	    		}
	    		
	    	}
    	}
   		    }
    	}
    	return true;
    },

	/**
	 * This function validates the FirstName field.
	 * @param {string} value of the FirstName field.
	 */
	validateFirstname: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
   		    	/*var regExp=/[A-Za-z]/;*/
   		    	var regExp=/^[a-zA-Z\s]*$/;
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_FIRSTNAMEREQUIRED"];
	    			return false;
	    		}
	    		else if(value.length > 64){
	    			 this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_FIRSTNAMETOOLONG"];
	    			 return false;
	    		}
	    		else if(value.search(regExp) == null || value.search(regExp) == -1){
		    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_FIRSTNAMENOTVALID"];
		    			return false;
	    		}
	    	}
    	}
   		return true;
    },
    
    /**
	 * This function validates the LastName field.
	 * @param {string} value of the LastName field.
	 */
    validateLastname: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
   		    /*	var regExp=/[A-Za-z]/;  */
   		    	var regExp=/^[a-zA-Z\s]*$/;
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_LASTNAMEREQUIRED"];
	    			return false;
	    		}
	    		else if(value.length > 64){
	    			 this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_LASTNAMETOOLONG"];
	    			 return false;
	    		}
	    		else if(value.search(regExp) == null || value.search(regExp) == -1){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_LASTNAMENOTVALID"];
	    			return false;
	    		}
	    	}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Phone field which requires 3 digits.
	 * @param {string} value of the Phone3 field.
	 */
    validatePhone3: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"];
	    			return false;
	    		}
	    	}
	    	if((value.length > 0 && (value.length != 3 || !MessageHelper.IsNumeric(value)))){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"];
	    		return false;
   		    }
    	}
   		return true;
    },
    
    /**
	 * This function validates the Phone field which requires 3 digits in MyAccount AddressBook .
	 * @param {string} value of the Phone3 field.
	 */
    validatePhone3address: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4REQUIRED"];
	    			return false;
	    		}
	    	}
	    	if(value.length > 0 && (value.length != 3 || !MessageHelper.IsNumeric(value))){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"];
	    		return false;
   		    }
    	}
   		return true;
    },
   
    /**
	 * This function validates the Optional Phone field which requires 3 digits.
	 * @param {string} value of the Phone3 field.
	 */
    
    optValidatePhone3: function(value, constraints){
    	
    	if(!this.focused){
    		if(value.length > 0 && (value.length != 3 || !MessageHelper.IsNumeric(value))){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"];
	    		return false;
   		    }
    	}
   		return true;
    },
    
    /**
	 * This function validates Mobile Phone field which requires 3 digits in My Profile form
	 */ 
    myProfileValidateMobilePhone3: function(value, constraints){
    	if(!this.focused){
    		if(document.getElementById('ErrorMessage_mobilephone1')) {
    			var ErrorMessage_mobilephone1 = document.getElementById("ErrorMessage_mobilephone1").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_mobilephone2')) {
    			var ErrorMessage_mobilephone2 = document.getElementById("ErrorMessage_mobilephone2").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_mobilephone3')) {
    			var ErrorMessage_mobilephone3 = document.getElementById("ErrorMessage_mobilephone3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		if ((ErrorMessage_mobilephone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"]) ||
    			(ErrorMessage_mobilephone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])||
    			(ErrorMessage_mobilephone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}
    			
    		var isERRMSG_PHONE3NOTVALID = 0;
    		
    		if ((ErrorMessage_mobilephone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"]) ||
    			(ErrorMessage_mobilephone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])||
    			(ErrorMessage_mobilephone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])
    			){
    			isERRMSG_PHONE3NOTVALID = 1;
    		}
    	
   		    if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"];
	    			return false;
	    		}
	    	}
	    	if((value.length > 0 && (value.length != 3 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE3NOTVALID == 0)){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"];
	    		return false;
   		    }
    	}
   		return true;
    },
    
    /*myProfileValidatePhone3: function(value, constraints){
    	if(!this.focused){
    		var errorDivs = dojo.query('div[id^="ErrorMessage_pphone1"]');
    		alert (errorDivs[0]);
    		if(document.getElementById('ErrorMessage_pphone1')) {
    			var ErrorMessage_pphone1 = document.getElementById("ErrorMessage_pphone1").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_pphone2')) {
    			var ErrorMessage_pphone2 = document.getElementById("ErrorMessage_pphone2").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_pphone3')) {
    			var ErrorMessage_pphone3 = document.getElementById("ErrorMessage_pphone3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		if ((ErrorMessage_pphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"]) ||
    			(ErrorMessage_pphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])||
    			(ErrorMessage_pphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}
    			
    		var isERRMSG_PHONE3NOTVALID = 0;
    		
    		if ((ErrorMessage_pphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"]) ||
    			(ErrorMessage_pphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])||
    			(ErrorMessage_pphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])
    			){
    			isERRMSG_PHONE3NOTVALID = 1;
    		}
    	
   		    if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"];
	    			return false;
	    		}
	    	}
	    	if((value.length > 0 && (value.length != 3 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE3NOTVALID == 0)){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"];
	    		return false;
   		    }
    	}
   		return true;
    },
    */
    
    /*myProfileValidatePhone3: function(value, constraints){
	if(!this.focused){
		var errorDivs = dojo.query('div[id^="ErrorMessage_pphone1"]');
		alert (errorDivs[0]);
		if(document.getElementById('ErrorMessage_pphone1')) {
			var ErrorMessage_pphone1 = document.getElementById("ErrorMessage_pphone1").innerHTML; 
		}
		
		if(document.getElementById('ErrorMessage_pphone2')) {
			var ErrorMessage_pphone2 = document.getElementById("ErrorMessage_pphone2").innerHTML; 
		}
		
		if(document.getElementById('ErrorMessage_pphone3')) {
			var ErrorMessage_pphone3 = document.getElementById("ErrorMessage_pphone3").innerHTML; 
		}
		
		var isERRMSG_PHONE3REQUIRED = 0;
		
		if ((ErrorMessage_pphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"]) ||
			(ErrorMessage_pphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])||
			(ErrorMessage_pphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])
			){
			isERRMSG_PHONE3REQUIRED = 1;
		}
			
		var isERRMSG_PHONE3NOTVALID = 0;
		
		if ((ErrorMessage_pphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"]) ||
			(ErrorMessage_pphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])||
			(ErrorMessage_pphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])
			){
			isERRMSG_PHONE3NOTVALID = 1;
		}
	
		    if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
    		if(value.length == 0){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"];
    			return false;
    		}
    	}
    	if((value.length > 0 && (value.length != 3 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE3NOTVALID == 0)){
    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"];
    		return false;
		    }
	}
		return true;
},*/
    myProfileValidatePhone3: function(value, constraints){
    	if(!this.focused){
    		var isERRMSG_PHONE3REQUIRED = 0;
    		var isERRMSG_PHONE3NOTVALID = 0;
    		var errorDivs = dojo.query('div[id^="ErrorMessage_pphone1"]');
    		if (errorDivs.length > 0){
    			for (var i=0;i<errorDivs.length;i++){
    				if (errorDivs[i].innerHTML==MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])
    					isERRMSG_PHONE3REQUIRED = 1;
    				if (errorDivs[i].innerHTML==MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])
    					isERRMSG_PHONE3NOTVALID = 1;
    			}
    		}
   
    		if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
        		if(value.length == 0){
        			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"];
        			return false;
        		}
        	}
        	if((value.length > 0 && (value.length != 3 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE3NOTVALID == 0)){
        		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"];
        		return false;
    		    }
    	}
    		return true;
    },


    /**
	 * This function validates Phone field which requires 3 digits (Billing address page)
	 */ 
    bValidatePhone3: function(value, constraints){
    	if(!this.focused){	
    		var invMsg = this.invalidMessage;
    		if(document.getElementById('ErrorMessage_bphone1')) {
    			var ErrorMessage_bphone1 = document.getElementById("ErrorMessage_bphone1").innerHTML; 
    		}
    		if(document.getElementById('ErrorMessage_bphone2')) {
    			var ErrorMessage_bphone2 = document.getElementById("ErrorMessage_bphone2").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_bphone3')) {
    			var ErrorMessage_bphone3 = document.getElementById("ErrorMessage_bphone3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		if ((ErrorMessage_bphone1 == invMsg) ||
    			(ErrorMessage_bphone2 == invMsg)||
    			(ErrorMessage_bphone3 == invMsg)
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}
    		
    		var isERRMSG_PHONE3NOTVALID = 0;
    		
    		if ((ErrorMessage_bphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"]) ||
    			(ErrorMessage_bphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])||
    			(ErrorMessage_bphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])
    			){
    			isERRMSG_PHONE3NOTVALID = 1;
    		}
    		
    		if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = invMsg;
	    			return false;
	    		}
	    	}
    		
    		if((value.length > 0 && (value.length != 3 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE3NOTVALID == 0)){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"];
	    		return false;
   		    }
    		
    	}
    	return true;
    },
    
    /**
	 * This function validates Phone field which requires 3 digits (Subscription page)
	 */ 
    subValidatePhone3: function(value, constraints){
    	if(!this.focused){	
    		var invMsg = this.invalidMessage;
    		if(document.getElementById('ErrorMessage_subphone1')) {
    			var ErrorMessage_subphone1 = document.getElementById("ErrorMessage_subphone1").innerHTML; 
    		}
    		if(document.getElementById('ErrorMessage_subphone2')) {
    			var ErrorMessage_subphone2 = document.getElementById("ErrorMessage_subphone2").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_bphone3')) {
    			var ErrorMessage_subphone3 = document.getElementById("ErrorMessage_subphone3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		if ((ErrorMessage_subphone1 == invMsg) ||
    			(ErrorMessage_subphone2 == invMsg)||
    			(ErrorMessage_subphone3 == invMsg)
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}
    		
    		var isERRMSG_PHONE3NOTVALID = 0;
    		
    		if ((ErrorMessage_subphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"]) ||
    			(ErrorMessage_subphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])||
    			(ErrorMessage_subphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])
    			){
    			isERRMSG_PHONE3NOTVALID = 1;
    		}
    		
    		if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = invMsg;
	    			return false;
	    		}
	    	}
    		
    		if((value.length > 0 && (value.length != 3 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE3NOTVALID == 0)){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"];
	    		return false;
   		    }
    		
    	}
    	return true;
    },
    
    /**
	 * This function validates Phone field which requires 3 digits (registration page)
	 */ 
    regValidateMobilePhone3: function(value, constraints){
    	if(!this.focused){	
    		var invMsg = this.invalidMessage;
    		/*if(document.getElementById('ErrorMessage_usMobilePhone1p1')) {
    			var ErrorMessage_mobilePhone1p1 = document.getElementById("ErrorMessage_usMobilePhone1p1").innerHTML; 
    		}*/
    		
    		if(document.getElementById('ErrorMessage_usMobilePhone1p2')) {
    			var ErrorMessage_mobilePhone1p2 = document.getElementById("ErrorMessage_usMobilePhone1p2").innerHTML;
    			
    		}
    		
    		if(document.getElementById('ErrorMessage_mobilePhone1p3')) {
    			var ErrorMessage_mobilePhone1p3 = document.getElementById("ErrorMessage_mobilePhone1p3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		/*if ((ErrorMessage_mobilePhone1p1 == invMsg) ||
    			(ErrorMessage_mobilePhone1p2 == invMsg)||
    			(ErrorMessage_mobilePhone1p3 == invMsg)
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}*/
    		
    		var isERRMSG_PHONE3NOTVALID = 0;
    		
    		/*if ((ErrorMessage_mobilePhone1p1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"]) ||
    			(ErrorMessage_mobilePhone1p2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])||
    			(ErrorMessage_mobilePhone1p3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])
    			){
    			isERRMSG_PHONE3NOTVALID = 1;
    		}*/
    		
    		if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = invMsg;
	    			return false;
	    		}
	    	}
    		
    		if((value.length > 0 && (value.length != 3 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE3NOTVALID == 0)){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"];
	    		return false;
   		    }
    		
    	}
    	return true;
    },
    /**
	 * This function validates Phone field which requires 4 digits (Billing address page)
	 */ 
    regValidateMobilePhone4: function(value, constraints){
    	if(!this.focused){	
    		var invMsg = this.invalidMessage;
    		if(document.getElementById('ErrorMessage_usMobilePhone1p1')) {
    			var ErrorMessage_mobilePhone1p1 = document.getElementById("ErrorMessage_usMobilePhone1p1").innerHTML; 
    		}
    		if(document.getElementById('ErrorMessage_mobilePhone1p2')) {
    			var ErrorMessage_mobilePhone1p2 = document.getElementById("ErrorMessage_mobilePhone1p2").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_mobilePhone1p3')) {
    			var ErrorMessage_mobilePhone1p3 = document.getElementById("ErrorMessage_mobilePhone1p3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		if ((ErrorMessage_mobilePhone1p1 == invMsg) ||
    			(ErrorMessage_mobilePhone1p2 == invMsg)||
    			(ErrorMessage_mobilePhone1p3 == invMsg)
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}
    		
    		var isERRMSG_PHONE4NOTVALID = 0;
    		
    		if ((ErrorMessage_mobilePhone1p1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"]) ||
    			(ErrorMessage_mobilePhone1p2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])||
    			(ErrorMessage_mobilePhone1p3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])
    			){
    			isERRMSG_PHONE4NOTVALID = 1;
    		}
    		
    		if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = invMsg;
	    			return false;
	    		}
	    	}
    		
    		if((value.length > 0 && (value.length != 4 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE4NOTVALID == 0)){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"];
	    		return false;
   		    }
    		
    	}
    	return true;
    },
    
    /**
	 * This function validates Phone field which requires 4 digits (Billing address page)
	 */ 
    bValidatePhone4: function(value, constraints){
    	if(!this.focused){	
    		var invMsg = this.invalidMessage;
    		if(document.getElementById('ErrorMessage_bphone1')) {
    			var ErrorMessage_bphone1 = document.getElementById("ErrorMessage_bphone1").innerHTML; 
    		}
    		if(document.getElementById('ErrorMessage_bphone2')) {
    			var ErrorMessage_bphone2 = document.getElementById("ErrorMessage_bphone2").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_bphone3')) {
    			var ErrorMessage_bphone3 = document.getElementById("ErrorMessage_bphone3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		if ((ErrorMessage_bphone1 == invMsg) ||
    			(ErrorMessage_bphone2 == invMsg)||
    			(ErrorMessage_bphone3 == invMsg)
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}
    		
    		var isERRMSG_PHONE4NOTVALID = 0;
    		
    		if ((ErrorMessage_bphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"]) ||
    			(ErrorMessage_bphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])||
    			(ErrorMessage_bphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])
    			){
    			isERRMSG_PHONE4NOTVALID = 1;
    		}
    		
    		if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = invMsg;
	    			return false;
	    		}
	    	}
    		
    		if((value.length > 0 && (value.length != 4 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE4NOTVALID == 0)){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"];
	    		return false;
   		    }
    		
    	}
    	return true;
    },
    
    subValidatePhone4: function(value, constraints){
    	if(!this.focused){	
    		var invMsg = this.invalidMessage;
    		if(document.getElementById('ErrorMessage_subphone1')) {
    			var ErrorMessage_subphone1 = document.getElementById("ErrorMessage_subphone1").innerHTML; 
    		}
    		if(document.getElementById('ErrorMessage_subphone2')) {
    			var ErrorMessage_subphone2 = document.getElementById("ErrorMessage_subphone2").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_subphone3')) {
    			var ErrorMessage_subphone3 = document.getElementById("ErrorMessage_subphone3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		if ((ErrorMessage_subphone1 == invMsg) ||
    			(ErrorMessage_subphone2 == invMsg)||
    			(ErrorMessage_subphone3 == invMsg)
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}
    		
    		var isERRMSG_PHONE4NOTVALID = 0;
    		
    		if ((ErrorMessage_subphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"]) ||
    			(ErrorMessage_subphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])||
    			(ErrorMessage_subphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])
    			){
    			isERRMSG_PHONE4NOTVALID = 1;
    		}
    		
    		if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = invMsg;
	    			return false;
	    		}
	    	}
    		
    		if((value.length > 0 && (value.length != 4 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE4NOTVALID == 0)){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"];
	    		return false;
   		    }
    		
    	}
    	return true;
    },
    
    /**
	 * This function validates Phone field which requires 3 digits (Shipping address page)
	 */ 
    sValidatePhone3: function(value, constraints){
    	if(!this.focused){	
    		var invMsg = this.invalidMessage;
    		if(document.getElementById('ErrorMessage_sphone')) {
    			var ErrorMessage_sphone1 = document.getElementById("ErrorMessage_sphone").innerHTML; 
    		}
    		if(document.getElementById('ErrorMessage_sphone2')) {
    			var ErrorMessage_sphone2 = document.getElementById("ErrorMessage_sphone2").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_sphone3')) {
    			var ErrorMessage_sphone3 = document.getElementById("ErrorMessage_sphone3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		if ((ErrorMessage_sphone1 == invMsg) ||
    			(ErrorMessage_sphone2 == invMsg)||
    			(ErrorMessage_sphone3 == invMsg)
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}
    		
    		var isERRMSG_PHONE3NOTVALID = 0;
    		
    		if ((ErrorMessage_sphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"]) ||
    			(ErrorMessage_sphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])||
    			(ErrorMessage_sphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"])
    			){
    			isERRMSG_PHONE3NOTVALID = 1;
    		}
    		
    		if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = invMsg;
	    			return false;
	    		}
	    	}
    		
    		if((value.length > 0 && (value.length != 3 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE3NOTVALID == 0)){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3NOTVALID"];
	    		return false;
   		    }
    		
    	}
    	return true;
    },
    
    /**
	 * This function validates Phone field which requires 4 digits (Shipping address page)
	 */ 
    sValidatePhone4: function(value, constraints){
    	if(!this.focused){	
    		var invMsg = this.invalidMessage;
    		if(document.getElementById('ErrorMessage_sphone')) {
    			var ErrorMessage_sphone1 = document.getElementById("ErrorMessage_sphone").innerHTML; 
    		}
    		if(document.getElementById('ErrorMessage_sphone2')) {
    			var ErrorMessage_sphone2 = document.getElementById("ErrorMessage_sphone2").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_sphone3')) {
    			var ErrorMessage_sphone3 = document.getElementById("ErrorMessage_sphone3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		if ((ErrorMessage_sphone1 == invMsg) ||
    			(ErrorMessage_sphone2 == invMsg)||
    			(ErrorMessage_sphone3 == invMsg)
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}
    		
    		var isERRMSG_PHONE4NOTVALID = 0;
    		
    		if ((ErrorMessage_sphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"]) ||
    			(ErrorMessage_sphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])||
    			(ErrorMessage_sphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])
    			){
    			isERRMSG_PHONE4NOTVALID = 1;
    		}
    		
    		if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = invMsg;
	    			return false;
	    		}
	    	}
    		
    		if((value.length > 0 && (value.length != 4 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE4NOTVALID == 0)){
	    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"];
	    		return false;
   		    }
    		
    	}
    	return true;
    },
    
    /**
	 * This function validates the Optional Phone field which requires 4 digits.
	 * @param {string} value of the Phone4 field.
	 */
    
    optValidatePhone4: function(value, constraints){
    	if(!this.focused){
    		if(value.length > 0 && (value.length != 4 || !MessageHelper.IsNumeric(value))){
   		    	this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"];
   		    	return false;
   		 	}
    	}
   		return true;
    },
    
    
    /**
	 * This function validates the Phone field which requires 4 digits.
	 * @param {string} value of the Phone4 field.
	 */
    validatePhone4: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"];
	    			return false;
	    		}
	    	}
   		    if((value.length > 0 && (value.length != 4 || !MessageHelper.IsNumeric(value)))){
   		    	this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"];
   		    	return false;
   		 	}
    	}
   		return true;
    },
    
    
    /**
	 * This function validates the Phone field which requires 4 digits in the My Profile form.
	 */
    /*myProfileValidatePhone4: function(value, constraints){
    	if(!this.focused){
    		
    		if(document.getElementById('ErrorMessage_pphone1')) {
    			var ErrorMessage_pphone1 = document.getElementById("ErrorMessage_pphone1").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_pphone2')) {
    			var ErrorMessage_pphone2 = document.getElementById("ErrorMessage_pphone2").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_pphone3')) {
    			var ErrorMessage_pphone3 = document.getElementById("ErrorMessage_pphone3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		if ((ErrorMessage_pphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"]) ||
    			(ErrorMessage_pphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])||
    			(ErrorMessage_pphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}
    		
    		var isERRMSG_PHONE4NOTVALID = 0;
    		
    		if ((ErrorMessage_pphone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"]) ||
    			(ErrorMessage_pphone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])||
    			(ErrorMessage_pphone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])
    			){
    			isERRMSG_PHONE4NOTVALID = 1;
    		}
    		
   		    if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"];
	    			return false;
	    		}
	    	}
   		    if((value.length > 0 && (value.length != 4 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE4NOTVALID == 0)){
   		    	this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"];
   		    	return false;
   		 	}
    	}
   		return true;
    },
    */
    
    myProfileValidatePhone4: function(value, constraints){
    	if(!this.focused){
    		var isERRMSG_PHONE4REQUIRED = 0;
    		var isERRMSG_PHONE4NOTVALID = 0;
    		var errorDivs = dojo.query('div[id^="ErrorMessage_pphone1"]');
    		if (errorDivs.length > 0){
    			for (var i=0;i<errorDivs.length;i++){
    				if (errorDivs[i].innerHTML==MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])
    					isERRMSG_PHONE4REQUIRED = 1;
    				if (errorDivs[i].innerHTML==MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])
    					isERRMSG_PHONE4NOTVALID = 1;
    			}
    		}
   
    		if(this.required && (isERRMSG_PHONE4REQUIRED == 0)){
        		if(value.length == 0){
        			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"];
        			return false;
        		}
        	}
        	if((value.length > 0 && (value.length != 4 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE4NOTVALID == 0)){
        		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"];
        		return false;
    		    }
    	}
    		return true;
    },
    

    /**
	 * This function validates the Mobile Phone field which requires 4 digits in the My Profile form.
	 */
    myProfileValidateMobilePhone4: function(value, constraints){
    	if(!this.focused){
    		
    		if(document.getElementById('ErrorMessage_mobilephone1')) {
    			var ErrorMessage_mobilephone1 = document.getElementById("ErrorMessage_mobilephone1").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_mobilephone2')) {
    			var ErrorMessage_mobilephone2 = document.getElementById("ErrorMessage_mobilephone2").innerHTML; 
    		}
    		
    		if(document.getElementById('ErrorMessage_mobilephone3')) {
    			var ErrorMessage_mobilephone3 = document.getElementById("ErrorMessage_mobilephone3").innerHTML; 
    		}
    		
    		var isERRMSG_PHONE3REQUIRED = 0;
    		
    		if ((ErrorMessage_mobilephone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"]) ||
    			(ErrorMessage_mobilephone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])||
    			(ErrorMessage_mobilephone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"])
    			){
    			isERRMSG_PHONE3REQUIRED = 1;
    		}
    		
    		var isERRMSG_PHONE4NOTVALID = 0;
    		
    		if ((ErrorMessage_mobilephone1 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"]) ||
    			(ErrorMessage_mobilephone2 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])||
    			(ErrorMessage_mobilephone3 == MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"])
    			){
    			isERRMSG_PHONE4NOTVALID = 1;
    		}
    		
   		    if(this.required && (isERRMSG_PHONE3REQUIRED == 0)){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE3REQUIRED"];
	    			return false;
	    		}
	    	}
   		    if((value.length > 0 && (value.length != 4 || !MessageHelper.IsNumeric(value))) && (isERRMSG_PHONE4NOTVALID == 0)){
   		    	this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"];
   		    	return false;
   		 	}
    	}
   		return true;
    },
    

    /**
	 * This function validates the Phone field which requires 4 digits in MyAccount AddressBook.
	 * @param {string} value of the Phone4 field.
	 */
    validatePhone4address: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4REQUIRED"];
	    			return false;
	    		}
	    	}
   		    if(value.length > 0 && (value.length != 4 || !MessageHelper.IsNumeric(value))){
   		    	this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONE4NOTVALID"];
   		    	return false;
   		 	}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Phone field which requires continuous single number.
	 * @param {string} value of the Phone Single field, updated for defect 2851
	 */
    validatePhoneSingle: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONESINGLEREQUIRED"];
	    			return false;
	    		}
	    	}
   		    if(value.length > 0){
	    		var prefixVal = value.substr(0,3);
  		    	if(prefixVal != '+44'){
   		    		this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONESINGLENOTVALID"];
   		   			return false;
   		   		}
  		    	else{
	   		    	var nxtPhone = value.substr(3,value.length);
  		    		if(!ValidatorJS.isValidPhoneForUK(nxtPhone)){
  		    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONESINGLENOTVALID"];
	   	   		    	return false;
  		    		}
  		    	}
   		    }
   		    return true;
    	}
   		return true;
    },
    
    /**
	 * This function validates the Phone extension field
	 * @param {string} value of the Phone Extension field.
	 */
    validatePhoneExt: function(value, constraints){
    	if(!this.focused){
   		    if(value.length > 0 && !MessageHelper.IsNumeric(value)){
   		    	this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PHONENUMEXTNOTVALID"];
	   		    return false;
   		 	}
    	}
   		return true;
    },
    
    /**
	 * This function validates the order number field
	 */
    validateOrderNumber: function(value, constraints){
    	if(!this.focused){
   		    if(value.length > 0 && !MessageHelper.IsNumeric(value)){
   		    	this.invalidMessage = MessageHelper.messages["MY_ACCOUNT_ORDNUM"];
	   		    return false;
   		 	}
    	}
   		return true;
    },
    
    /**
     * This function will check for a valid Phone Number
     * @param (string) phone The string to check
     * @return (boolean) true if text is a phone number, ie if each character of
     * input is one of "0123456789()", updated for defect 2851
     */
	isValidPhoneForUK : function (phone)
	{
		var validDigits = "0123456789";
		var validChars = "()0123456789";

		var digitsCount = 0;
		var isValid = true;
		var Char;
		for (i = 0; i < phone.length && isValid; i++) 
		{ 
			Char = phone.charAt(i); 
			if(validChars.indexOf(Char) == -1) 
			{
				isValid = false;
			}
			if(validDigits.indexOf(Char) != -1){
				digitsCount++;
			}
		}
		if(!(digitsCount >= 9 && digitsCount <= 10)){
			isValid = false;
		}
		return isValid;   
	},
    
    /**
	 * This function validates the Password field.
	 * @param {string} value of the Password field.
	 */
    validatePassword: function(value, constraints){
		if(!this.focused){
    		var vpassword = null;
    		var email = null;
			if(this.name == 'regpassword'){
				vpassword = dijit.byId('regvpassword');
			}
			else if(this.name == 'logonPassword'){
				vpassword = dijit.byId('verifypassword');
				email = dijit.byId('email1');
			}
			else if(this.name == 'logonPassword_old'){
				vpassword = dijit.byId('logonPasswordVerify_old');
			}
			if(this.required){
				if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PASSWORDREQUIRED"];
	    			return false;
	    		}	
			}
    		if (value.length > 11 && this.name != 'logonPassword'){
				this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EXCEEDEDLENGTH"];
    			return false;
			}
    		else 
    		if (email != null && email != "" && value == email.value){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EMAILPASSWORDMATCH"];
    			return false;
    		}
    		else
    		if(vpassword != null && vpassword.value != ""){
    			if(value != vpassword.value){
    				vpassword.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PASSWORDVERIFYNOTSAME"];
    				vpassword.focus();
    			}
				return true;
			}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Password field for Password update.
	 * @param {string} value of the Password field.
	 */
    TempPassword: function(value, constraints){
    	if(!this.focused){
    		var tpassword = null;
			if(this.name == 'logonPassword'){
				tpassword = dijit.byId('vpassword');
			}
			
			if(this.required){
				if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["PMT_MSG_CURRENT"];
	    			return false;
	    		}	
			}
    		if (value.length > 11){
				this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_LENGTH"];
    			return false;
			}
    		else if(tpassword != null && tpassword.value != ""){
    			if(value != tpassword.value){
    				tpassword.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PASSWORDVERIFYNOTSAME"];
    				tpassword.focus();
    			}
				return true;
    		}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Verify Password field for update password.
	 * @param {string} value of the Verify Password field.
	 */
    TempVerifyPassword: function(value, constraints){
    	if(!this.focused){
    		var tvpassword = null;
			if(this.name == 'logonPasswordVerify'){
				tvpassword = dijit.byId('password');
			}
			
   		    if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_VPASSWORDREQUIRED"];
	    			return false;
	    		}
   		    }
   		    if(value.length >11){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EXCEEDEDLENGTH"];
    			return false;
    		}
    		
    		else if(tvpassword != null && tvpassword.value != "" && value != tvpassword.value){
				this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PASSWORDVERIFYNOTSAME"];
				return false;
			}
    	}
   		return true;
    },
    
    
    /**
	 * This function validates the Verify Password field.
	 * @param {string} value of the Verify Password field.
	 */
    validateVerifyPassword: function(value, constraints){
    	if(!this.focused){
    		var password = null;
			if(this.name == 'regvpassword'){
				password = dijit.byId('regpassword');
			}
			else if(this.name == 'logonPasswordVerify'){
				password = dijit.byId('Password');
			}
			else if(this.name == 'logonPasswordVerify_old'){
				password = dijit.byId('logonPassword_old');
			}
   		    if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_VPASSWORDREQUIRED"];
	    			return false;
	    		}
   		    }
   		    if(value.length > 11 && this.name != 'logonPasswordVerify'){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_EXCEEDEDLENGTH"];
    			return false;
    		}
    		
    		else 
   		    if(password != null && password.value != "" && value != password.value){
				this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PASSWORDVERIFYNOTSAME"];
				return false;
			}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Preferred Language field.
	 * @param {string} value of the Preferred Language field.
	 */
    validatePrefLanguage: function(value, constraints){
    	if(!this.focused){
   		    if(this.required){
	    		if(value.length == 0 && value != 'select'){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_PREFLANGREQUIRED"];
	    			return false;
	    		}
	    	}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Street Address 1 field.
	 * @param {string} value of the Street Address 1 field.
	 */
    validateStreetAddress1: function(value, constraints){
    	if(!this.focused){
    		if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_ADDRESS1REQUIRED"];
	    			return false;
	    		}
	    	}
    		if(value.length > 70){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_ADDRESS1TOOLONG"];
    			return false;
    		}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Street Address 2 field.
	 * @param {string} value of the Street Address 2 field.
	 */
    validateStreetAddress2: function(value, constraints){
    	if(!this.focused){
    		if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_ADDRESS2REQUIRED"];
	    			return false;
	    		}
	    	}
    		if(value.length > 50){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_ADDRESS2TOOLONG"];
    			return false;
    		}
    	}
   		return true;
    },
    
    /**
	 * This function validates the City field.
	 * @param {string} value of the City field.
	 */
    validateCity: function(value, constraints){
    	if(!this.focused){
    	/*	var regExp=/[A-Za-z]/;   */
    		var regExp=/[@!#$%&*(){}<>;:"+=|^~?0-9]/;
    		if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CITYREQUIRED"];
	    			return false;
	    		}
	    	}
    		if(value.length > 0){
    			if(value.length > 35){
        			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CITYTOOLONG"];
        			return false;
        		}
        		else if(value.search(regExp) == null || value.search(regExp) != -1){
        			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_CITYNOTVALID"];
        			return false;
        		}    			
    		}
    	}
   		return true;
    },
    
    
    validateZipcode: function(value, constraints){
    	if(!this.focused){
    		var regExp=/[A-Za-z]/;   
    		/*	var regExp=/[0-9]/;  */
    		if(value.search(regExp) == null || value.search(regExp) != -1){
        			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODE"];
        			return false;
        		}    			
    		}
    	
   		return true;
    },
    validatePostalcode: function(value, constraints){
    	if(!this.focused){
    		//var regExp=/[A-Za-z0-9]/;   
    		/*	var regExp=/[0-9]/;  */
    		if(document.getElementById("_country_1").value=="CA")
    			{
    		var postalCodeRegex = /^([a-zA-Z][0-9][a-zA-Z])\s*([0-9][a-zA-Z][0-9])$/;
    		//Hassane - added a test if required - defect 3259
    		if(this.required && value == ''){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_POSTALCODEREQUIRED"];
    			return false;
    		}
    		//Hassane - added a test if value not empty - defect 3259
    		else if(value != '' && !postalCodeRegex.test(value)){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_POSTALCODE"];
    			return false;
    		}
    		    			
    		}
    	
    	else if(document.getElementById("_country_1").value=="GB")
    		{
    		postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
    		if(value == ''){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_POSTALCODEREQUIRED"];
    			return false;
    		}
    		else if(!postalCodeRegex.test(value)){
    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_POSTALCODE"];
    			return false;
    		}
    		}
    	}
   		return true;
    },
    
    /**
     * This function validates the zip code/ postal code based on the country selected
     * @param {string} value of the zipcode/postalcode field for BILLING ADDRESS only
     */    
    
validateZipPostalCode1: function(value, constraints){
    if(!this.focused){
    	var validatorForm = AddressHelper.formName;
    	var currentCountry;
    	var form = document.forms[validatorForm];
    	
    	if(validatorForm != null && validatorForm != 'undefined' && validatorForm != ""){
    		if(validatorForm != "shipping_address_form1" ){
	    	if(validatorForm == "notificationSignUp"){
	    		currentCountry = "US";
	    		if(value.length == 0){
	    			return true;
	    		}	    		
	    		
	    		var tst = document.getElementById("defaultCountry").value;
	    		if(tst != null && tst != undefined ){
	    			currentCountry = tst;
	    		}
	    	}
	    	else{
		    	currentCountry = form.country.value;
		    	//Commented for defect 3474
		    	/*var tst = document.getElementById("defaultCountry").value;
	    		if(tst != null && tst != undefined ){
	    			currentCountry = tst;
	    		}*/
	    	}
	    	console.log("currentCountry"+currentCountry);
	    	
	    	switch (currentCountry) {
	    	case "US":
	    		var fieldName = AddressHelper.fieldName;
	    		var zipCodeVal = form[fieldName].value;
	    		console.log("zipCodeVal"+currentCountry);
	    		postalCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
	    		if(zipCodeVal == ''){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODEREQUIRED"];
	    		} 
	    		else if(zipCodeVal.length <5){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODE_DIGITS"];
	    		}else if(zipCodeVal.length > 5){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODETOOLONG"];
	    		}
	    		if(!MessageHelper.IsNumeric(zipCodeVal)){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODE_NUMERIC"];;
	    		}
	    	break;
	    	case "CA":
	    		var fieldName = AddressHelper.fieldName;
	    		var zipCodeVal = form[fieldName].value;
	    		postalCodeRegex = /^([a-zA-Z][0-9][a-zA-Z])\s*([0-9][a-zA-Z][0-9])$/;
	    		if(zipCodeVal == ''){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_POSTALCODEREQUIRED"];
	    		}
	    		else if(!postalCodeRegex.test(zipCodeVal)){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_POSTALCODE"];
	    		}
	    	break;
	    	default:
	    		var fieldName = AddressHelper.fieldName;
	    		var zipCodeVal = form[fieldName].value;
	    		postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
	    		if(zipCodeVal == ''){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_POSTALCODEREQUIRED"];
	    		}
	    		else if(!postalCodeRegex.test(zipCodeVal)){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_POSTALCODE"];
	    		}
	    	}
	    	console.log("postalCodeRegex"+postalCodeRegex.test(zipCodeVal));
	    	return postalCodeRegex.test(zipCodeVal);
	    	
    	}
    }
    	return true;
    }
    return true;
},

/**
 * This function validates the zip code/ postal code based on the country selected
 * @param {string} value of the zipcode/postalcode field for SHIPPING ADDRESS only
 */

validateZipPostalCode2: function(value, constraints){
	if(!this.focused){
	var validatorForm = AddressHelper.formName;
	var currentCountry;
	var form = document.forms[validatorForm];
	if(validatorForm != null && validatorForm != 'undefined' && validatorForm != ""){
		if(validatorForm != "billing_address_form"){
	    	if(validatorForm == "notificationSignUp"){
	    		currentCountry = "US";
	    		if(value.length == 0){
	    			return true;
	    		}	    		
	    		
	    		var tst = document.getElementById("defaultCountry").value;
	    		if(tst != null && tst != undefined ){
	    			currentCountry = tst;
	    		}
	    	}
	    	else{
	    		// For Shipping Address, currentCountry is US for L&T and CA for TheBay. shipCountryLabel is fetched from UnregisteredCheckout.jsp
	    		currentCountry = shipCountryLabel;
	    	}
	    	console.log("currentCountry"+currentCountry);
	    	
	    	switch (currentCountry) {
	    	case "US":
	    		var fieldName = AddressHelper.fieldName;
	    		var zipCodeVal = form[fieldName].value;
	    		console.log("zipCodeVal"+currentCountry);
	    		postalCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
	    	break;
	    	case "CA":
	    		var fieldName = AddressHelper.fieldName;
	    		var zipCodeVal = form[fieldName].value;
	    	postalCodeRegex = /^([a-zA-Z][0-9][a-zA-Z])\s*([0-9][a-zA-Z][0-9])$/
	    	break;
	    	default:
	    		var fieldName = AddressHelper.fieldName;
	    		var zipCodeVal = form[fieldName].value;
	    	postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
	    	}
	    	console.log("postalCodeRegex"+postalCodeRegex.test(zipCodeVal));
	    	return postalCodeRegex.test(zipCodeVal);
		}
	}
	return true;
	}
	return true;
},

    
    
    validateZipPostalCode: function(value, constraints){
    	if(!this.focused){
    		var paramPrefix = "";
			if(this.name == 'spostalcode'){
				paramPrefix = "s"; 
			}
			else if(this.name == 'regpostalcode'){
				paramPrefix = "reg"; 
			}
			var currentCountryCode = "";
			var selcountry = dijit.byId(paramPrefix + "country");
			if(selcountry != null && selcountry != undefined){
				currentCountryCode = selcountry.get("value");	
			}
			
			var reqErrorMsg = "";
			var tooLongErrorMsg = ""
			var invalidErrorMsg = "";
			if(currentCountryCode == "US"){
				reqErrorMsg = MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODEREQUIRED"];
				tooLongErrorMsg = MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODETOOLONG"];
				invalidErrorMsg = MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODENOTVALID1"];
			}
			else{
				reqErrorMsg = MessageHelper.messages["VALIDATION_ERRMSG_POSTALCODEREQUIRED"];
				invalidErrorMsg = MessageHelper.messages["VALIDATION_ERRMSG_POSTALCODENOTVALID1"];
			}
			
    		if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = reqErrorMsg;
	    			return false;
	    		}
	    	}
    		if(currentCountryCode == "US" && value.length > 0){
    			if(value.length > 5){
    				this.invalidMessage = tooLongErrorMsg;
	    			return false;
    			}
    			if(value.length != 5 || !MessageHelper.IsNumeric(value)){
    				this.invalidMessage = invalidErrorMsg;
	    			return false;
    			}
    		}
    	}
   		return true;
    },
    
    /**
	 * This function validates the Country field.
	 * @param {string} value of the Country field.
	 */
    validateCountry: function(value, constraints){
    	if(!this.focused){
    		console.debug('Validate country Entry');
    		if(this.required){
	    		if(value.length == 0){
	    			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_COUNTRYREQUIRED"];
	    			return false;
	    		}
	    	}
    		console.debug('Validate country Exit');
    	}
   		return true;
    },
    
    /**
	 * This function validates the OtherText field in Email Unubscription view.
	 * @param {string} value of the OtherText field.
	 */
    validateOtherText: function(){
    	var otherText = document.getElementById("otherText");
    	if(otherText != null && otherText != undefined){
    		var otherReason = trim(otherText.value);
    		if(otherReason.length == 0){
    			var errorLabel = dojo.byId("othertxtErrorMsg");
    			if(errorLabel != null && errorLabel != undefined){
    				errorLabel.innerHTML = MessageHelper.messages["UNSUBSCRIBRE_ERR_OTHERTEXTREQUIRED"];
    				UtilitiesJS.toggleErrorMsg(errorLabel, "block");
    				return false;
    			}
    		}
    	}
    	return true;
    },
    
    /**
	 * This function validates the HBC Reward field.
	 * @param {string} value of the HBC Reward field.
	 */
    validateHBCRewardPoints: function(value, constraints){
    	
    	if(!this.focused){
    	/*	if(value.length == 6 && value.substr(0,6) == MessageHelper.messages["VALIDATION_REWARDPOINTSSTARTSWITH"]){
    			return true;
    		}
    		else if(value.length > 0){
    			var regExp=/[0-9]{15}/;
        		if(value.length > 15){
        			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_REWARDPOINTSTOOLONG"];
        			return false;
        		}
        		else if(value.search(regExp) == null || value.search(regExp) == -1){
        			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_REWARDPOINTSNOTVALID"];
        			return false;
        		}
        		else if(value.substr(0,6) != MessageHelper.messages["VALIDATION_REWARDPOINTSSTARTSWITH"]){
        			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_REWARDPOINTSSTARTNOTVALID"];
        			return false;
        		}    			
    		}
    		else{
    			return true;
    		}
    	}
   		return true;*/
    		
    		
    		if(value.length == 0){
    			return true;
    		}
    		else if(value.length > 0){
    			var regExp=/[0-9]{9}/;
        		if(value.search(regExp) == null || value.search(regExp) == -1){
        			this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_REWARDPOINTSNOTVALID"];
        			return false;
        		}
    		}
    	}
   		return true;
    },
    
    /**
	 * This function validates the comma separated fields based on its types.
	 * @param {string} comma separated fields.
	 * @param {string} comma separated field types.
	 * @return {boolean} return true if all field passes the validation, otherwise returns false.
	 */
    validateOnSubmit: function(regAddressFields, addressFieldTypes){
    	if(regAddressFields != null && addressFieldTypes != null){
			var fields = regAddressFields.split(",");
			var types = addressFieldTypes.split(",");
			var regExpEmail = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
			var regExpPhone3 = /[0-9]{3}/;
			var regExpPhone4 = /[0-9]{4}/;
			var regExpHbcReward = /[0-9]{15}/;
			
			var id = null;
			var value = null;
			var type = null;
			var email = null;
			var password = null;
			
			for(var i=0; i<fields.length; i++){
				id = dijit.byId(fields[i]);
				if(id != null && id != undefined && !id.disabled){
					value = id.value;
					type = types[i];
					if(type == 'email'){
						email = id;
						if(value != null && (value.length == 0 || value.length > 40 || 
								value.search(regExpEmail) == null || value.search(regExpEmail) == -1)){
							id.focus();
							return false;
						}						
					}
					else if(type == 'vemail'){
						if(value != null && ((value.length == 0 || value.length > 40 ||
								value.search(regExpEmail) == null || value.search(regExpEmail) == -1) ||
								(email != null && email.value != "" && value != email.value))){
							id.focus();
							return false;
						}
					}
					else if(type == 'password'){
						password = id;
						if(value != null && value.length == 0){
							id.focus();
							return false;
						}						
					}
					else if(type == 'vpassword'){
						if(value != null && (value.length == 0 || (password != null && password.value != "" && value != password.value))){
							id.focus();
							return false;
						}
					}
					else if(type == 'firstName'){
						if(value != null && (value.length == 0 || value.length > 16)){
							id.focus();
							return false;
						}
					}
					else if(type == 'lastName'){
						if(value != null && (value.length == 0 || value.length > 14)){
							id.focus();
							return false;
						}
					}
					else if(type == 'phone3'){
						if(value != null && (value.length == 0 || value.length != 3 || value.search(regExpPhone3) == null || 
								value.search(regExpPhone3) == -1)){
							id.focus();
							return false;
						}
					}
					else if(type == 'phone4'){
						if(value != null && (value.length == 0 || value.length != 4 || value.search(regExpPhone4) == null || 
								value.search(regExpPhone4) == -1)){
							id.focus();
							return false;
						}
					}
					else if(type == 'hbcReward'){
						if(value != null && value.length > 0 && (value.length != 15 || value.search(regExpHbcReward) == null || 
								value.search(regExpHbcReward) == -1 || value.substr(0,6) != MessageHelper.messages["VALIDATION_REWARDPOINTSSTARTSWITH"])){
							id.focus();
							return false;
						}
					}
					else if(type == 'unsubEmail'){
						if(value != null){
							for(var j=0; j<document.unsubscribe.reasonCode.length; j++){
								var reason = document.unsubscribe.reasonCode[j];
								if(reason != null && reason != undefined && reason.checked && 
										(reason.value == MessageHelper.messages["UNSUBSCRIBE_PAGE_REASONCODE05"])){
									id.focus();
									return false;			
								}
							}
						}
					}
					else if(type == 'otherText'){
						if(value != null && value.length == 0){
							for(var k=0; k<document.unsubscribe.reasonCode.length; k++){
								var reason = document.unsubscribe.reasonCode[k];
								if(reason.checked && reason.value == MessageHelper.messages["UNSUBSCRIBE_REASONCODE99"]){
									id.focus();
									return false;
								}
							}
						}
					}
					else if(type == 'phoneSingle'){
						var prefixVal = value.substr(0,3);
		  		    	if(prefixVal != '+44'){
		  		    		id.focus();
							return false;
		   		   		}
		  		    	else{
			   		    	var nxtPhone = value.substr(3,value.length);
		  		    		if(!ValidatorJS.isValidPhoneForUK(nxtPhone)){
		  		    			id.focus();
								return false;
		  		    		}
		  		    	}
					}
				}
			}
    	}
    	return true;
    },
    
    /**
	 * This function will clears the password field if dummy password is used for display in My Profile Edit
	 * @param {string} id of the password field.
	 * @param {string} defaultpasswd dummy password used for displaying user password field.
	 * 
	 * Brian B, 8Sep2012: per defect 1377, this logic is not intuitve to the user.  Setting
	 *    the password to highlight instead.
     */
    togglePassword: function(id, defaultpasswd){
    	var password = dojo.byId(id);
    	if(password != null && password != undefined){
    		/*
    		var value = password.value;
   			if(value == defaultpasswd){
       			password.value = '';
       		} else
       		*/
       			password.select();
       	}
    },
    
    /**
     * Added for defect 1381
 	 * This function validates the zip code/ postal code based on the country selected
     * @param {string} zipCodeVal, value of the zipcode/postalcode field
     * @param {string} currentCountry, value of the country selected  
     */
    validateZipPostalCodeOnSubmit: function(formname, zipCode, zipCodeVal, currentCountry){
    	
    	AddressHelper.setFormName(formname,zipCode.name);
    	
    	var validZipPostal = true;
    	switch (currentCountry) {
    	case "US":
    		postalCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    	break;
    	case "CA":
    		postalCodeRegex = /^([a-zA-Z][0-9][a-zA-Z])\s*([0-9][a-zA-Z][0-9])$/;
    	break;
    	default:
    		postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
    	}
    	validZipPostal = postalCodeRegex.test(zipCodeVal);
    	if(!validZipPostal){
    		zipCode.focus();    		
    	}
    	console.log("postalCodeRegex:: " + validZipPostal);
    	return validZipPostal;   	
    },
    
    /**
     * Added for defect 3436
     * Validates the Zip code entered in Shopping bag page 
     */
    validateZipCodeOnShopCart : function(){
    	if(!this.focused){
    		var formName = CheckoutHelperJS.formName;
    		var fieldName = CheckoutHelperJS.fieldName;
    		var form = document.forms[formName];
        	if(form != null && form != 'undefined' && form != ""){
        		
        		var promoCodeErrorLabel = document.getElementById("promoCode_errorlabel");
				if(promoCodeErrorLabel != null  && promoCodeErrorLabel != undefined){
					UtilitiesJS.toggleErrorMsg(promoCodeErrorLabel, "none");
				}
        		
        		var zipCodeVal = form[fieldName].value;
        		console.log("my postalCodeRegex:: " + zipCodeVal);
        		var postalCodeRegex = /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/ ;
        		var errorLabel = dojo.byId("label-applyPostalCode");
        		
        		if(errorLabel != null && errorLabel != undefined){
        			errorLabel.style.display = "none";
        		}
        		if(!postalCodeRegex.test(zipCodeVal)){
            		if(errorLabel != null && errorLabel != undefined && (dojo.byId("ErrorMessage_postalCode") == null || dojo.byId("ErrorMessage_postalCode") == undefined )){
        				errorLabel.innerHTML = '';
        				errorLabel.innerHTML = MessageHelper.messages["SHOPPINGBAG_PAGE_ZIP_CODE_ERROR_MSG"];
        				UtilitiesJS.toggleErrorMsg(errorLabel, "block");
        				return false;
        			}else if(errorLabel != null && errorLabel != undefined){
            			errorLabel.style.display = "none";
            			return false;
            		}
            	}
        		return true;
        	}
    	}
    	return true;
    }
}