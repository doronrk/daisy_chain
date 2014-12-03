function doSubmitOrderTracking(form)
{
	var bErrorFound = 'false';

	if (form.orderId.value == null || form.orderId.value == '') {
	
		Common.formErrorHandleClient("orderId",Common.errorMessages["REQUIRED_FIELD"],'MainOrderTrackingForm','div-ord-track-1');bErrorFound = 'true';
	} else if (form.emailAddress.value == null || form.emailAddress.value == '') {
		Common.formErrorHandleClient("emailAddress",Common.errorMessages["REQUIRED_FIELD"],'MainOrderTrackingForm','div-ord-track-1');bErrorFound = 'true';
	}else if(isValidEmail(form.emailAddress.value) == false){
	
		Common.formErrorHandleClient("emailAddress",Common.errorMessages["INVALID_SIGNUP_EMAIL"],'MainOrderTrackingForm','div-ord-track-1');bErrorFound = 'true';
	}
	
	if(bErrorFound == 'false'){
		form.emailAddress.value = form.emailAddress.value.toLowerCase();
		form.submit();
	}
	
}

function doSubmitOrderTrackingDiv(form)
{

	var bErrorFound = 'false';

	if (form.orderId.value == null || form.orderId.value == '') {
	
		Common.formErrorHandleClient("orderId",Common.errorMessages["REQUIRED_FIELD"],'OrderTrackingForm','div-foot1-3');bErrorFound = 'true';
	} else if (form.emailAddress.value == null || form.emailAddress.value == '') {
		Common.formErrorHandleClient("emailAddress",Common.errorMessages["REQUIRED_FIELD"],'OrderTrackingForm','div-foot1-3');bErrorFound = 'true';
	}else if(isValidEmail(form.emailAddress.value) == false){
	
		Common.formErrorHandleClient("emailAddress",Common.errorMessages["INVALID_SIGNUP_EMAIL"],'OrderTrackingForm','div-foot1-3');bErrorFound = 'true';
	}
	
	if(bErrorFound == 'false'){
		form.emailAddress.value = form.emailAddress.value.toLowerCase();
		form.submit();
	}
	
}