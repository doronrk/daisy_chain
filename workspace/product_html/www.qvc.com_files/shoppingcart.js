/*
Script: shoppingcart.js
version: v1.0.0
*/
// Fix for defect#19684
var crmFlowSwitch = false;

/**
This function is used to validate the inputs for page shopping cart gift wrap options page.
When the other radio buttons rather than "None" checked, "To", "Message" and "From" inputs 
can't be empty
*/
function validateGiftWrapOptionsMessage(){
	
	var retValue = true;	
	var isFocusSetFlag = false;
	var valPageError = ERRCONSOLEMESSAGE_PERSONALIZATION;
	var valMessage_Required_Valid_Gift_Wrap_Options_To = ERR_REQUIRED_VALID_GIFT_WRAP_OPTIONS_TO;
	var valMessage_Required_Valid_Gift_Wrap_Options_Message = ERR_REQUIRED_VALID_GIFT_WRAP_OPTIONS_MESSAGE;
	var valMessage_Required_Valid_Gift_Wrap_Options_From = ERR_REQUIRED_VALID_GIFT_WRAP_OPTIONS_FROM;
		
	resetLabelInput();

	if (document.getElementById("rbGiftWrapPackingSlipMessage").checked == true || document.getElementById("rbGiftWrapGiftWrap").checked == true) {

		var txtGiftWrapOptionsTo = document.getElementById("txtGiftWrapOptionsTo");
		if ( txtGiftWrapOptionsTo != null && trimAll(txtGiftWrapOptionsTo.value) == ""){
			if (!isFocusSetFlag){
			  txtGiftWrapOptionsTo.focus();
			  isFocusSetFlag = true;
			}
			displayMessage('error',"errGiftWrapOptionsTo",valPageError,valMessage_Required_Valid_Gift_Wrap_Options_To,"lblGiftWrapOptionsTo","txtGiftWrapOptionsTo");
			retValue = false;
		}
		
		var txtGiftWrapOptionsMessage = document.getElementById("txtGiftWrapOptionsMessage");
		if ( txtGiftWrapOptionsMessage != null && trimAll(txtGiftWrapOptionsMessage.value) == ""){
			if (!isFocusSetFlag){
			  txtGiftWrapOptionsMessage.focus();
			  isFocusSetFlag = true;
			}
			displayMessage('error',"errGiftWrapOptionsMessage",valPageError,valMessage_Required_Valid_Gift_Wrap_Options_Message,"lblGiftWrapOptionsMessage","txtGiftWrapOptionsMessage");
			retValue = false;
		}
		
		var txtGiftWrapOptionsFrom = document.getElementById("txtGiftWrapOptionsFrom");
		if ( txtGiftWrapOptionsFrom != null && trimAll(txtGiftWrapOptionsFrom.value) == ""){
			if (!isFocusSetFlag){
			  txtGiftWrapOptionsFrom.focus();
			  isFocusSetFlag = true;
			}
			displayMessage('error',"errGiftWrapOptionsFrom",valPageError,valMessage_Required_Valid_Gift_Wrap_Options_From,"lblGiftWrapOptionsFrom","txtGiftWrapOptionsFrom");
			retValue = false;
		}
	}
	
	if ( !retValue ){
		window.scroll(0,0);
	}

	return retValue;	

}

/**
This function is used to validate the inputs for page shopping cart personalization information.
1. Personalized Message can't be empty
2. First line can't be empty, only letters and numbers
3. Second lien can't be empty only letters and numbers
4, First initial can't be empty, only 1 letter
5, Middle initial is optional, if there is input, only 1 letter
6, Last initial can't be empty, only 1 letter
*/
function validatePersonalizationInformation(){
	
	var retValue = true;	
	var isFocusSetFlag = false;
	var valPageError = ERRCONSOLEMESSAGE;
	var valMessage_Required_Valid_Personalized_Message = ERR_REQUIRED_VALID_PERSONALIZED_MESSAGE;
	var valMessage_Required_Valid_First_Line = ERR_REQUIRED_VALID_FIRST_LINE;
	var valMessage_Required_Valid_Second_Line = ERR_REQUIRED_VALID_SECOND_LINE;
	var valMessage_Required_Valid_First_Initial = ERR_REQUIRED_VALID_FIRST_INITIAL;
	var valMessage_Required_Valid_Second_Initial = ERR_REQUIRED_VALID_SECOND_INITIAL;
	var valMessage_Required_Valid_Last_Initial = ERR_REQUIRED_VALID_LAST_INITIAL;

	resetLabelInput();
	
	var txtPersonalizedMessage = document.getElementById("txtPersonalizedMessage");
	if ( txtPersonalizedMessage != null && trimAll(txtPersonalizedMessage.value) == ""){
		if (!isFocusSetFlag){
		  txtPersonalizedMessage.focus();
		  isFocusSetFlag = true;
		}
		displayMessage('error',"errPersonalizedMessage",valPageError,valMessage_Required_Valid_Personalized_Message,"lblPersonalizedMessage","txtPersonalizedMessage");
		retValue = false;
	}
	
	var txtPersonalizedMessageFirstLine = document.getElementById("txtPersonalizedMessageFirstLine");
	if ( txtPersonalizedMessageFirstLine != null && (!(new RegExp(/^\w{1,5}$/)).test(trimAll(txtPersonalizedMessageFirstLine.value)))){
		if (!isFocusSetFlag){
		  txtPersonalizedMessageFirstLine.focus();
		  isFocusSetFlag = true;
		}
		displayMessage('error',"errPersonalizedMessageFirstLine",valPageError,valMessage_Required_Valid_First_Line,"lblPersonalizedMessageFirstLine","txtPersonalizedMessageFirstLine");
		retValue = false;
	}
	
	var txtPersonalizedMessageSecondLine = document.getElementById("txtPersonalizedMessageSecondLine");
	if ( txtPersonalizedMessageSecondLine != null && (!(new RegExp(/^\w{1,17}$/)).test(trimAll(txtPersonalizedMessageSecondLine.value)))){
		if (!isFocusSetFlag){
		  txtPersonalizedMessageSecondLine.focus();
		  isFocusSetFlag = true;
		}
		displayMessage('error',"errPersonalizedMessageSecondLine",valPageError,valMessage_Required_Valid_Second_Line,"lblPersonalizedMessageSecondLine","txtPersonalizedMessageSecondLine");
		retValue = false;
	}
	
	var txtPersonalizedMessageFirstInitial = document.getElementById("txtPersonalizedMessageFirstInitial");
	if ( txtPersonalizedMessageFirstInitial != null && (!(new RegExp(/^[a-zA-Z]{1}$/)).test(trimAll(txtPersonalizedMessageFirstInitial.value)))){
		if (!isFocusSetFlag){
		  txtPersonalizedMessageFirstInitial.focus();
		  isFocusSetFlag = true;
		}
		displayMessage('error',"errPersonalizedMessageFirstInitial",valPageError,valMessage_Required_Valid_First_Initial,"lblPersonalizedMessageFirstInitial","txtPersonalizedMessageFirstInitial");
		retValue = false;
	}
	
	var txtPersonalizedMessageSecondInitial = document.getElementById("txtPersonalizedMessageSecondInitial");
	if ( txtPersonalizedMessageSecondInitial != null && trimAll(txtPersonalizedMessageSecondInitial.value) != ""
		&& (!(new RegExp(/^[a-zA-Z]{1}$/)).test(trimAll(txtPersonalizedMessageSecondInitial.value)))){
		if (!isFocusSetFlag){
		  txtPersonalizedMessageSecondInitial.focus();
		  isFocusSetFlag = true;
		}
		displayMessage('error',"errPersonalizedMessageSecondInitial",valPageError,valMessage_Required_Valid_Second_Initial,"lblPersonalizedMessageSecondInitial","txtPersonalizedMessageSecondInitial");
		retValue = false;
	}
	
	var txtPersonalizedMessageLastInitial = document.getElementById("txtPersonalizedMessageLastInitial");
	if ( txtPersonalizedMessageLastInitial != null && (!(new RegExp(/^[a-zA-Z]{1}$/)).test(trimAll(txtPersonalizedMessageLastInitial.value)))){
		if (!isFocusSetFlag){
		  txtPersonalizedMessageLastInitial.focus();
		  isFocusSetFlag = true;
		}
		displayMessage('error',"errPersonalizedMessageLastInitial",valPageError,valMessage_Required_Valid_Last_Initial,"lblPersonalizedMessageLastInitial","txtPersonalizedMessageLastInitial");
		retValue = false;
	}
	
	if ( !retValue ){
		window.scroll(0,0);
	}
	return retValue;	

}

// This javascript function is used by the 'Remove from Shopping cart' button to set appropriate values before the form is submitted
var busy = false;
function RemoveOrderItem(url)
{
   if (!busy) {
   //alert("RemoveOrderItem= " + url);
   busy = true;
   document.getElementById("URLForm").action = url;
   document.getElementById("URLForm").submit();
	return true;
   }
   return false;
}

function RemoveOrderItemFromCart(url){
	if(!busy){
		document.getElementById("URLForm").action=url;
		TB_show('','#TB_inline?height=110&amp;width=400&inlineId=divRemoveOrderItem', false);
	}
}

function EmptyShoppingCart(url){
	if(!busy){
		document.getElementById("URLForm").action=url;
		TB_show('','#TB_inline?height=110&amp;width=400&inlineId=divEmptyShoppingCart', false);
	}
}

function EmptySavedList(url){
	if(!busy){
		document.getElementById("URLForm").action=url;
		TB_show('','#TB_inline?height=179&amp;width=400&inlineId=divEmptySavedList', false);
	}
}

// This javascript function is used by the 'EmptyCart all the items in the shopping cart' button to set appropriate values before the form is submitted

function EmptyCart(url)
{
   if (!busy) {
    //alert("EmptyCart= " + url);
    busy = true;
 	document.getElementById("URLForm").action = url;
	document.getElementById("URLForm").submit();
	return true;
   }
   return false;
}

// This javascript function is used by the 'PopupEmptyCart all the items in the shopping cart' button to set appropriate values before the form is submitted

function PopupEmptyCart(url)
{
   if (!busy) {
    //alert("PopupEmptyCart= " + url);
    busy = true;
 	document.getElementById("popupEmptyCart").action = url;
	document.getElementById("popupEmptyCart").submit();
	return true;
   }
   return false;
}

// DECRM - 17153 - Load Indicator Changes
function loadIndicator(){
	// Fix for defect#19684
	if (crmFlowSwitch){
		jQuery('.olsLayer').fadeTo(500, 0.8);
		jQuery('.olsDialog').fadeIn(500);
	}
}

// This javascript function is used by the 'SpeedBuy' button to set appropriate values before the form is submitted

function SpeedBuy(url)
{
   if (!busy) {
	    //alert("SpeedBuy= " + url);
	    busy = true;
	 	document.getElementById("URLForm").action = url;
		document.getElementById("URLForm").submit();
          
 		return true;
   }
   return false;
  
}

// This javascript function is used by the 'CheckOut' button to set appropriate values before the form is submitted

function CheckOutCart(url)
{
   if (!busy) {
	    //alert("CheckOutCart= " + url);
	    busy = true;
	 	document.getElementById("URLForm").action = url;
		document.getElementById("URLForm").submit();
 		return true;
   }
   return false;
  
}


function Add2ReqList(url)
{
   if (!busy) {
	    //alert("Add2ReqList= " + url);
	    busy = true;
	 	document.getElementById("URLForm").action = url;
		document.getElementById("URLForm").submit();
		return true;
   }
   return false;
          
}

function SingleOrderItemAdd(url)
{
  if (!busy) {
	    //alert("SingleOrderItemAdd= " + url);
	    busy = true;
	 	document.getElementById("URLForm").action = url;
		document.getElementById("URLForm").submit();
		return true;
   }
   return false;
}

function InterestItemAddURL(url)
{
  if (!busy) {
	    //alert("InterestItemAddURL= " + url);
	    busy = true;
	 	document.getElementById("URLForm").action = url;
		document.getElementById("URLForm").submit();
		return true;
   }
   return false;
}


function RequisitionItemRemove(url)
{
  if (!busy) {
	    //alert("RequisitionItemRemoveURL= " + url);
	    busy = true;
	 	document.getElementById("URLForm").action = url;
		document.getElementById("URLForm").submit();
		return true;
   }
   return false;
}


function ReSubmitCrrentCartForm(form){
 if (!busy) {

	 //alert("ReSubmitCrrentCartForm= " + document.getElementById("ShopCartForm").action);
	 busy = true;
	 document.getElementById("ShopCartForm").submit();
	 return true;
   }
   return false;
}

/* called from Auto delivery overlay  */
function AutoDeliveryOverlaySubmit(form, elem, value)
{
  if (!busy) {
         busy = true;  
         document.getElementById(elem).value= value;
         TB_formSubmitToDiv(form.id,"TB_ajaxContent");
         busy = false;
		 return true;
   }
   return false;
}

/* called from Auto delivery overlay single delivery item */
function ADSingleShotOverlaySubmit(destUrl)
{
  
  window.location.href =destUrl;
   return true;
}

function QPayReSubmitCrrentShopCartForm(form,QpayChangePosition){
 if (!busy) {
	
	 busy = true;
	 document.getElementById("QpayChangeIndicator").value = "true";
	 document.getElementById("QpayChangePosition").value = QpayChangePosition;	 
	 document.getElementById("ShopCartForm").submit();
	 return true;
   }
   return false;
}


function AutoDeliverySubmit(form, elem, value)
{
  if (!busy) {
         busy = true;  
         document.getElementById(elem).value= value;
         form.submit();
		 return true;
   }
   return false;
}


function AutoDeliveryCancel(url)
{
  if (!busy) {
	    //alert("AutoDeliveryCancelURL= " + url);
	    busy = true;
	 	document.getElementById("frmIntermediateConfirmation").action = url;
		document.getElementById("frmIntermediateConfirmation").submit();
		return true;
   }
   return false;
}
 
       
// This javascript function is used by the 'Multi Wait List Submit' hyper links to set appropriate values before the form is submitted
function WaitListMultiSubmit(form)
{
  //alert("his is Wait List Multi Continue");
  if (!busy) {
             busy = true;  
	 	 	document.getElementById("frmIntermediateConfirmation").action = 'AddToCart';
			document.getElementById("frmIntermediateConfirmation").submit();
		     return true;
   }
   return false;
}

		
// This javascript function is used by the 'Multi Wait List Cancel' hyper links to set appropriate values before the form is submitted
function WaitListMultiCancel(url)
{
 
   if (!busy) {
	    //alert("WaitListMultiCancelURL= " + url);
	    busy = true;
	 	document.getElementById("frmIntermediateConfirmation").action = url;
		document.getElementById("frmIntermediateConfirmation").submit();
		return true;
   }
   return false;
}

// This javascript function is used by the 'Item Wait List Submit' hyper links to set appropriate values before the form is submitted
function WaitListItemSubmit(form)
{
  if (!busy) {
  		 //alert("his is Wait List Item Continue");
         busy = true;  
         form.action='AddToCart';
         form.submit();
  } 
}
		
// This javascript function is used by the 'Item Wait List Submit' hyper links to set appropriate values before the form is submitted
function WaitListItemSubmit(form, productId)
{
  if (!busy) {
  		 busy = true;  
  		 if(form.ipValue && form.ipValue.value == 'RS'){
  		 	form.action="ReviewSelectionUpdate";
  		 }else{
			form.action='AddToCart';
  		 }
  		 if(form.URL){
	  		 form.URL.value='OrderItemDisplay?updatePrices=1&calculationUsageId=-1&orderId=.&productId='+productId+'&catEntryId='+productId;
  		 }
         form.submit();
  } 
}	

	
// This javascript function is used by the 'Item Wait List Cancel' hyper links to set appropriate values before the form is submitted
function WaitListItemCancel(url)
{
  if (!busy) {
	    //alert("Wait List Item CancelURL= " + url);
	    busy = true;
	 	document.getElementById("frmIntermediateConfirmation").action = url;
		document.getElementById("frmIntermediateConfirmation").submit();
		return true;
   }
   return false;
}
		
//Kaushik: function added to fix defect 11347
// This javascript function is used by the 'Two Man Handling Cancel' hyper links to set appropriate values before the form is submitted
function TwoManHandlingCancel(url)
{
  if (!busy) {
	    //alert("Wait List Item CancelURL= " + url);
	    busy = true;
	 	document.getElementById("frmIntermediateConfirmation").action = url;
		document.getElementById("frmIntermediateConfirmation").submit();
		return true;
   }
   return false;
}

		
// This javascript function is used by the 'Review Product Order Submit' hyper links to set appropriate values before the form is submitted
function ReviewProductOrderSubmit(form)
{
  if (!busy) {
  		 //alert("his is Review Product Order Submit");
         busy = true;  
         form.action='AddToCart';
         form.submit();
	 	return true;
   }
   return false;
}	


// This javascript function is used by the 'Mult GWPS  Submit' hyper links to set appropriate values before the form is submitted
function MultGWPSubmit(form, elem, value)
{
  if (!busy) {
         busy = true;  
         document.getElementById(elem).value= value;
         form.submit();
		 return true;
   }
   return false;
}	

/**
* This javascript function is used by the 'Ship To From Address Book Submit' 
* hyper links to set appropriate values before the form is submitted
*/ 
function ShipToFromAddressBookSubmit(form) {
	  var retValue=false;
	  if (!busy)  {
	     //always do dom scripting 
	     var obj = document.getElementsByName("addressIdRad");
	     //if not null
	     if ( null != obj ) {
			 for (var i=0; i < obj.length; i++)
			   {
			     if (obj[i].checked)
			      {
			         retValue=true;
			      	 busy = true; 
			      	 document.getElementById("addrBookAddressId").value=obj[i].value;
			      	 break;
			      }
			   }
		 }
	  }
      return retValue;
}	

// This javascript function is used by the 'Ship To From Address Book Submit' hyper links to set appropriate values before the form is submitted
function EditCurrPerShipToAddSubmitUS(form)
{
  if (!busy) {
  		 //alert("This is Edit Curr Per Ship To Address Submit");
         busy = true;  
         //form.action='QVCShipInfoAdd';
         form.submit();
		 return true;
   }
   return false;
}

// This javascript function is used by the 'Ship To From Address Book Submit' hyper links to set appropriate values before the form is submitted
function EditCurrPerShipToAddSubmit(form)
{
 	//Manishree :Defect-12246 :validate and Error Message formation for 2Mh-Telefonenumber field
 	var retValue = false;
	var valPageError = ERRCONSOLEMESSAGE;
	var valMessage_Required_Phone = ERR_REQUIRED_PHONENUMBER;
  if (!busy) {
  		 //alert("This is Edit Curr Per Ship To Address Submit");
         busy = true;
         //Manishree :Defect-12246 :validate and Error Message formation for 2Mh-Telefonenumber field
         //TBD: Current validation of phone number is from commons.js. If we have specific validation for
         //DE we will have to fix that.   
         
	 if(document.getElementById("is2ManHandling") && 
         document.getElementById("txtDeliveryTelephoneNumber")){ 
	         var phoneNumber = document.getElementById("txtDeliveryTelephoneNumber").value;
		 	 var is2Manhandling = document.getElementById("is2ManHandling").value;
			 if(is2Manhandling =='1')
			 {
				 if(phoneNumber == null || trimAll(phoneNumber) == "" || !validate2MHPhoneNumber(phoneNumber))
				 {
					busy = false;
					displayMessage('error',"errDeliveryTelephoneNumber",valPageError,valMessage_Required_Phone,"lblDeliveryTelephoneNumber","txtDeliveryTelephoneNumber");
					return false;			
				 }
			 }
		 }
         //form.action='QVCShipInfoAdd';
         //form.submit();
		 return true;
   }
   return false;
}

function validate2MHPhoneNumber(phoneNumber){

	var inputPhoneNumber;
	//alert(phoneNumber);
	if (phoneNumber == null){
		return false;
	}else {
		inputPhoneNumber = phoneNumber.replace(/\s+/g, '');
		
		if((inputPhoneNumber.replace(/[^0-9]+/g,'')).length < 3){
				return false;
		} 
		inputPhoneNumber = inputPhoneNumber.replace(/[^+ 0-9]+/g,'');
		document.getElementById("txtDeliveryTelephoneNumber").value = inputPhoneNumber;
	}
	return true;
}


// This javascript function is used by the 'Ship Option Submit' hyper links to set appropriate values before the form is submitted
function ShipOptionSubmit(form)
{
  if (!busy) {
  		 //alert("This is Ship Option Continue Checkout");
         busy = true;  
         form.action='ShipInfoUpdate';
         form.submit();
		 return true;
   }
   return false;
}	
// This javascript function is used by the 'Ship Option Change' hyper links to set appropriate values before the form is submitted
function ShipOptionChange(form)
{
  if (!busy) {
  		 //alert("This is Ship Option Change");
         busy = true; 
         var destinationURLPrefix = ''; 
         form.action='OrderItemUpdate';
         if(form.npo){
         	destinationURLPrefix = (form.npo.value=='y' ? 'NPO' : '');
         }
         form.URL.value=destinationURLPrefix+'MultipleShippingMethodView';
         form.submit();
		 return true;
   }
   return false;
}	
// This javascript function is used by the 'Ship Option Cancel Order' hyper links to set appropriate values before the form is submitted
function ShipOptionCancel(form)
{
  if (!busy) {
  		 //alert("This is Ship Option Cancel Order");
         busy = true;  
         form.action='OrderCancelConfirmationForm';
         form.URL.value='MultipleShippingMethodView';
         form.submit();
		 return true;
   }
   return false;
}	

function NPOShipOptionCancel(form)
{
  if (!busy) {
  		 //alert("This is Ship Option Cancel Order");
         busy = true;  
         form.action='OrderCancelConfirmationForm';
         form.URL.value='NPOMultipleShippingMethodView';
         form.submit();
		 return true;
   }
   return false;
}	

// This javascript function is used by the 'Ship Option Cancel Order' hyper links to set appropriate values before the form is submitted
function ShipOptionDeleteItemUS(url,suffix,destURL)
{
  if (!busy) {
  		 //alert("This is Ship Option delete Order Item = " + url);
         busy = true;  
         elems = document.getElementsByName('quantity_' + suffix);
		 var option = elems[0].options[elems[0].selectedIndex];
         option.value = "0";
         document.getElementById("ShipOptionFrm").action = url;
	 	 document.getElementById("ShipOptionFrm").URL.value = destURL;
		 document.getElementById("ShipOptionFrm").submit();
		 return true;
   }
   return false;
}

// This javascript function is used by the 'Ship Option Cancel Order' hyper links to set appropriate values before the form is submitted
function ShipOptionDeleteItem(url,suffix,destURL)
{
  if (!busy) {
  		 //alert("This is Ship Option delete Order Item = " + url);
         busy = true;  
         elems = document.getElementsByName('quantity_' + suffix);
         if (elems[0].type == 'hidden') {
         	elems[0].value = "0";
         } else { // assumes drop-down
         	var option = elems[0].options[elems[0].selectedIndex];
         	option.value = "0";
         }

         document.getElementById("frmShippingOptions").action = url;
	 	 document.getElementById("frmShippingOptions").URL.value = destURL;
		 document.getElementById("frmShippingOptions").submit();
		 return true;
   }
   return false;
}	
// This javascript function is used by the 'CheckOut Email Submit' hyper links to set appropriate values before the form is submitted

function ChkOutEmailSubmitUS(form)
{
  if (!busy) {
	 //alert("This is CheckOut Email Submit");
         busy = true;  
	 var retValue = true;
	 var isFocusSetFlag = false;
	 var valPageError = ERRCONSOLEMESSAGE;
	 resetLabelInput();

	 retValue = validateConfirmEmail(isFocusSetFlag, "EmailAddress");
	 //alert("retValue: "+ retValue);
	 
	 if ( !retValue ){
		window.scroll(0,0);
	 } else {
		 form.action = 'UpdateEmailPassword';
	         form.submit();
	 }
	 busy = false;
	 return retValue;
	
   }
   return false;
}
function ChkOutEmailSubmit(form)
{
	//defect:14735,issue 4
  if (get.id('EmailOnly_email_tip_header') != null){
		get.id('EmailOnly_email_tip_header').style.display = "none";
	}
  if (get.id('EmailOnly_email_tip_body') != null){
		get.id('EmailOnly_email_tip_body').style.display = "none";
	}
	$("#emailOnly_email_main_body").removeClass("err");
	$("#divPromptForEmailAddress").removeClass("divPromptForEmailAddressClass");
	//end
  if (!busy) {
  		 //alert("This is CheckOut Email Submit");
         busy = true;  
		 var retValue = true;
		 var isFocusSetFlag = false;
		 var valPageError = ERRCONSOLEMESSAGE;
		 resetLabelInput();
		 
		 retValue = validateConfirmEmail(isFocusSetFlag, "EmailAddress");
		 
		 if ( !retValue ){
			window.scroll(0,0);
			busy = false;					// Lets reset flag to allow other javascript error messages to process; B/E is not busy
			return retValue;				// Do not continue with form post; Allow user to correct email inputs
		 }
		 
		 form.action = 'UpdateEmailPasswordDE' + form.elements["baseQueryUrl"].value;
		 
         form.submit();
		 busy = false;
		 return retValue;
	
   }
   return false;
}	



function SpeedBuyThankYou(form)
{
  if (!busy) {
         busy = true;  
         form.action=form.destination.value;
         form.submit();
 		 return true;
   }
   return false;
 }
// This javascript function is used by the 'Email Submit' hyper links to set appropriate values before the form is submitted

function PersonalizeEmailSubmit(form)
{
  if (!busy) {

         busy = true;  
		 var retValue = true;
		 var isFocusSetFlag = false;
		 var valPageError = ERRCONSOLEMESSAGE;
		 resetLabelInput();
		 retValue = validateConfirmEmail(isFocusSetFlag, "EmailAddress");
		 if ( !retValue ){
			window.scroll(0,0);
			busy = false;
			return retValue;
			
		 }
		 resetLabelInput();
		 retValue = validateConfirmEmail(isFocusSetFlag, "EmailAddressConfirmation");
		 if ( !retValue ){
			window.scroll(0,0);
			busy = false;
			return retValue;
			
		 }
		 retValue = validateConfirmEmail(isFocusSetFlag, "EmailAddress");
		 if ( !retValue ){
			window.scroll(0,0);
			busy = false;
			return retValue ;
		 }
		 
		 form.action = 'AddToCart';
         	 form.submit();
		 busy = false;
		 return retValue;
	
   }
   return false;
}	



// This javascript function is used by the 'Email Submit' hyper links to set appropriate values before the form is submitted

function PersonalizeEmailSubmit(form)
{
  if (!busy) {
         busy = true;  
		 var retValue = true;
		 var isFocusSetFlag = false;
		 var valPageError = ERRCONSOLEMESSAGE;
		 resetLabelInput();
		 retValue = validateConfirmEmail(isFocusSetFlag, "EmailAddress");
		 if ( !retValue ){
			window.scroll(0,0);
			busy = false;
			return retValue;
			
		 }
		 resetLabelInput();
		 retValue = validateConfirmEmail(isFocusSetFlag, "EmailAddressConfirmation");
		 if ( !retValue ){
			window.scroll(0,0);
			busy = false;
			return retValue;
			
		 }
		 retValue = validateConfirmEmail(isFocusSetFlag, "EmailAddress");
		 if ( !retValue ){
			window.scroll(0,0);
			busy = false;
			return retValue ;
		 }
		 
		 form.action = 'AddToCart';
         form.submit();
		 busy = false;
		 return retValue;
	
   }
   return false;
}	



function ShopCartSubmitForm(form){
	 if (!busy) {
	   		//alert(form.PersonalInfo.value);
		 busy = true;
	     form.submit();
		 return true;
	   }
	   return false;
}

/**
 * Validate the CVV 
 */
function validateCVV ( eleId, cardType ) {
	var ret = 0;
	var len = 3;
	if ( 'AX' == cardType) {
	 	len=4;
	}
	var secId = document.getElementById(eleId).value;
    if ( null != secId && trimAll(secId) != "" ) {
	    if ( isNaN(secId)){
	    	ret=2;
	    }else if ( secId.length < len || secId.length > len ) {
	    	ret=3;
	    }
    }else {
    	ret=1;
    }
    return ret;
}

function getCVVInvalidateMsg(ret) {

 var msgText = '';
 //Fix for Defect 16135
 if ( ret == 1) {
  	//msgText = "Security Code is a required field." ;
  	msgText = SECURITY_CODE_REQ;
  }else if ( ret == 2) {
   	//msgText = "Security Code must be numeric."; 
   	msgText = SECURITY_CODE_NUMERIC;
   }else {
    //msgText = "Security Code is not valid ";
    msgText = SECURITY_CODE_NOT_VALID;
   }
   return msgText;
}

function closeCartOverlay(url){
								
		var fm =get.id('frmCheckout');	
		
		if(fm!=null){
			fm.setAttribute('target','_parent');
			fm.submit();
		}
			  	
}
function CheckOutOverlayCart(url){  	
{
   	  if (!busy) {	
  	  	var fm =get.id('URLForm');			
			if(fm!=null){
				 busy = true;
				document.getElementById("URLForm").action = url;
				document.getElementById("URLForm").submit();				
			}	 	  	
  	  	}
      }        
}

function isOverlaySBRequired(){
	var required=false;
	var opt=document.getElementById('overlaySBRequired');
	if(opt !=null && (opt.value=='Y' || opt.value=='y')){
		required=true;
	}
	return required;
}

function SpeedBuyOverlay(url)
{
   if (!busy) {
   		if(!isOverlaySBRequired()){
   			window.location=url;
   		}
   		else{
			if(parent.get.id('TB_ajaxContent')!=null && parent.get.id('TB_window')!=null){    
				var overlayHeight = parseInt(450 + 20); // Adding 20px for the Close button on Speed Buy Overlay as there are problems with cross protocol java script function calls for closing the overlay.
				var borderWidth =  parseInt(parent.get.id('TB_window').css('border-top-width'));	   			 								 	 				 									 		 											                                	                                 
				
				if(typeof parent.TB_HEIGHT != 'undefined'){ 										 							
						parent.TB_HEIGHT = parseInt(overlayHeight)-7;      
						parent.TB_WIDTH = 536;								  	
				} 	          
											     
				var cartOverlayPos = parent.getCartOverlayPos();
				 
				parent.$('#TB_title').css({ 												
					"padding-bottom": '0px'
				});																									 
				parent.$('#TB_window').animate({												
					height:(overlayHeight-2*borderWidth)+'px',
					width: 536 + 'px',
					top: cartOverlayPos.top + 'px',
					left: cartOverlayPos.left + 'px'	
				}, 75);	
									   									     						                   	      					 								 					 	 
				parent.$('#TB_ajaxContent').css({   
						height:(overlayHeight-2*borderWidth-20)+'px',									
						"padding-left": '0px',
						"padding-right": '0px',	
						 width: '536px',      				
						 overflow: 'hidden'								
				}); 																																		
																							 
				 parent.TB_load_position();  
				 parent.TB_overlaySize();
		
				parent.$('#TB_window').css({ 												
					"padding-bottom": '0px'
				});				                   	 										    	 								 																		
		  }	    
		    busy = true;
		 	document.getElementById("URLForm").action = url;
			//document.getElementById("URLForm").target = "_self"; 	 	 	
			//document.getElementById("URLForm").submit();  
			$('#URLForm').fireEvent('submit');
			TB_formSubmitToDivContent( document.getElementById("URLForm"),"TB_ajaxContent");
			
	 		return true;
		}
 		
	}
   return false;
  
}
/**
 * Update shopCatid cookie added for defect 13974
 */
function updateShopCatCookie(orderItemId){
	var scCookie = page.getCookie('shopCatIds');
	var updatedValue = '';
	var scValues = '';
	if(scCookie){
		scValues = scCookie.split("_");
	}
	for(var i=0; i<scValues.length; i++){
		if(scValues[i].indexOf(orderItemId) == -1){
			if(i != scValues.length - 1)
				updatedValue += scValues[i] + "_";
			else
				updatedValue += scValues[i];
		}
	}
	page.setCookie('shopCatIds',updatedValue, {path: '/'});
}

function ShipToAddSubmit()
{
 	var retValue = false;
	var valPageError = ERRCONSOLEMESSAGE;
	var valMessage_Required_Phone = ERR_REQUIRED_PHONENUMBER;
	
    if(document.getElementById("is2ManHandling") && 
       document.getElementById("txtDeliveryTelephoneNumber")){
		 var phoneNumber = document.getElementById("txtDeliveryTelephoneNumber").value;
	 	 var is2Manhandling = document.getElementById("is2ManHandling").value;
		 if(is2Manhandling =='1'){
			 if(phoneNumber == null || trimAll(phoneNumber) == "" || !validate2MHPhoneNumber(phoneNumber)){
				displayMessage('error',"errDeliveryTelephoneNumber",valPageError,valMessage_Required_Phone,"lblDeliveryTelephoneNumber","txtDeliveryTelephoneNumber");
				return retValue;			
			 }
		 }
 	}
	
  	if (!busy) {
	  var obj = document.getElementsByName("addressIdRad");
      if ( null != obj ) {
		 for (var i=0; i < obj.length; i++){
		     if (obj[i].checked){
		         retValue=true;
		      	 busy = true; 
		      	 document.getElementById("addrBookAddressId").value=obj[i].value;
		      	 break;
		     }
		 }
	  }
	 return retValue;
   }
   return retValue;
}
