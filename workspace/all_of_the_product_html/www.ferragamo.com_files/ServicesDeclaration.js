/**
 * @author Lorenzo Cavina (l.cavina@tecla.it)
 * @class 
 */
ServicesDeclaration = {
	langId: "-1", /* language of the  store */
	storeId: "", /*numeric unique identifier of the store */
	catalogId: "", /*catalog of the store that is currently in use */
	logger: new Logger('ServicesDeclaration', Level.TRACE), /* logging utility */

	/**
	 * Sets common parameters used by the services
	 * @param (int) langId The language of the store.
	 * @param (int) storeId The store currently in use.
	 * @param (int) catalogId The catalog of the store currently in use.
	 */
	setCommonParameters:function(langId,storeId,catalogId){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
	}
}

	/**
	* Adds an item to to the wishlist and remove the same item from the shopping
	* cart.
	* @constructor
	 */
	wc.service.declare({
		id: "AjaxGetConfigAsJson",
		actionId: "AjaxGetConfigAsJson",
		url: getAbsoluteURL() + "AjaxGetConfigAsJson",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			//Now delete from cart..
			MessageHelper.hideAndClearMessage();
			requestSubmitted = false;
			CheckoutHelperJS.deleteFromCart(serviceResponse.orderItemId,true);
			MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_ADDED"]);
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

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

	})
	
	/**
	 * Gift Flag Management for JP Store
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxSaveGiftStatusCmd",
		actionId: "AjaxSaveGiftStatusCmd",
		url: "AjaxSaveGiftStatusCmd",
		formId: ""

     /**
     * display a success or an error message evaluating the response set in the command
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
	
	}
	
     /**
     * unused
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			
			
		}

	})
	
	
	
	
	/**
	 * Sends mail for contact form
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxSendMail",
		actionId: "AjaxContactCmd",
		url: "AjaxContactCmd",
		formId: ""

     /**
     * display a success or an error message evaluating the response set in the command
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			var result = serviceResponse.success;
			var locale = serviceResponse.locale;
			
			if(result=='true')
			{	
				if (serviceResponse.formName) {
					$jq("#"+serviceResponse.formName).each(function(){  
					    this.reset();
					 });
				}
				
				var msgTitle = serviceResponse.msgTitleOK;
				MessageHelper.frgDisplayErrorMessage(MessageHelper.messages['CONTACT_OK'],null,'undefined',msgTitle);
				
			}
			else
			{
				var msgTitle = serviceResponse.msgTitle;
				var msgSubTitle = serviceResponse.msgSubTitle;
				var name = serviceResponse.name;
				var surname = serviceResponse.surname;
				var email = serviceResponse.email;
				var message = serviceResponse.message;
				var emailw = serviceResponse.emailw;
				var country = serviceResponse.country;
				var enquire = serviceResponse.enquire;
				var captcha = serviceResponse.captcha_code;
				var nameMsg = "";
				var surnameMsg = "";
				var emailMsg = "";
				var messageMsg = "";
				var emailwMsg = "";
				var outputMsg = msgSubTitle+"<br/><br/>";
				var countryMsg = "";
				var enquireMsg = "";
				var captchaMsg = "";
				
				// Checks for Japan store
				var lastNameReading = "";
				var firstNameReading = "";
				var phonew = "";
				var lastNameReadingMsg = "";
				var firstNameReadingMsg = "";
				var phonewMsg = "";
				
				if (locale == 'ja_JP'){
					lastNameReading = serviceResponse.lastNameReading;
					firstNameReading = serviceResponse.firstNameReading;
					phonew = serviceResponse.phonew;
				}
				
				if(name=='empty')
				{
					nameMsg = MessageHelper.messages['CONTACT_NAME_EMPTY'];
					outputMsg+=nameMsg;
				}
				if(enquire=='empty')
				{
					enquireMsg = MessageHelper.messages['CONTACT_ENQUIRE_EMPTY'];
					outputMsg+="<br/>"+enquireMsg;
				}
				if(surname=='empty')
				{
					surnameMsg = MessageHelper.messages['CONTACT_SURNAME_EMPTY'];
					outputMsg+="<br/>"+surnameMsg;
				}
				
				if(email=='empty')
				{
					emailMsg = MessageHelper.messages['CONTACT_MAIL_EMPTY'];
					outputMsg+="<br/>"+emailMsg;
				}
				if(message=='empty')
				{
					messageMsg = MessageHelper.messages['CONTACT_MSG_EMPTY'];
					outputMsg+="<br/>"+messageMsg;
				}
				if(emailw=='wrong')
				{
					emailwMsg = MessageHelper.messages['CONTACT_MAIL_WRONG'];
					outputMsg+="<br/>"+emailwMsg;
				}
				if(country=='empty')
				{
					countryMsg = MessageHelper.messages['CONTACT_COUNTRY_EMPTY'];
					outputMsg+="<br/>"+countryMsg;
				}
				if(captcha=='wrong')
				{
					captchaMsg = MessageHelper.messages['FRG_CONTACT_CAPTCHA_WRONG'];
					outputMsg+="<br/>"+captchaMsg;
				}
				if(captcha=='empty')
				{
					captchaMsg = MessageHelper.messages['FRG_CONTACT_CAPTCHA_EMPTY'];
					outputMsg+="<br/>"+captchaMsg;
				}
				
				// Checks for Japan store
				if (locale == 'ja_JP'){
					if (lastNameReading=='empty'){
						lastNameReadingMsg = MessageHelper.messages['CONTACT_LAST_NAME_READING_EMPTY'];
						outputMsg+="<br/>"+lastNameReadingMsg;
					}
					if (firstNameReading=='empty'){
						firstNameReadingMsg = MessageHelper.messages['CONTACT_FIRST_NAME_READING_EMPTY'];
						outputMsg+="<br/>"+firstNameReadingMsg;
					}
					if(phonew=='wrong'){
						phonewMsg = MessageHelper.messages['CONTACT_PHONE_WRONG'];
						outputMsg+="<br/>"+phonewMsg;
					}
				}
				
				MessageHelper.frgDisplayErrorMessage(outputMsg,null,'undefined',msgTitle);
			}	
	
	}
	
     /**
     * unused
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			MessageHelper.displayErrorMessage("ERRORE" + serviceResponse);
			
			
		}

	})
    wc.service.declare({
        id: "ControlCheckoutOrderType",
        actionId: "ControlCheckoutOrderType",
        url: "ControlCheckoutOrderType",
        formId: "",
    
        successHandler: function(serviceResponse){
            var result = serviceResponse.result;
        
            if(result)
            	CheckoutPayments.validateAddress();
        },
        failureHandler: function(serviceResponse){
        	if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(MessageHelper.messages[serviceResponse.errorMessageKey]);
				 }
			}
			cursor_clear();
        }
    });