dojo.require("wc.service.common");

CCServicesDeclarationJS = {
		
}

	wc.service.declare({
		id: "CCManageOrderLock",
		actionId: "CCManageOrderLock",
		url: "ccAjaxManageOrderLock",
		formId: ""
		
		/**
		 * hides all the messages and the progress bar
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			console.log("CCManageOrderLock Success");
			if (serviceResponse.lockAction == 'R') {
				$('#callCenterDialog p#message').html('Cart is now unlocked');
				$('#callCenterDialog').foundation('reveal','open');
				//alert ("Successfully released lock on the current order");
			} else {
				$('#callCenterDialog p#message').html('Cart is now locked');
				$('#callCenterDialog').foundation('reveal','open');
				//alert ("Successfully acquired lock on the current order");
			}
			//MessageHelper.displayStatusMessage("Action Completed Successfully");
			cursor_clear();
		}
		
		/**
		 * Displays the error message returned with the service response and hides the progress bar.
		 *
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			console.log("CCManageOrderLock Failed :: " + serviceResponse.errorMessage);
			if (serviceResponse.errorMessage) {
			//	MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			//	alert (serviceResponse.errorMessage);
				$('#callCenterDialog p#message').html(serviceResponse.errorMessage);
				$('#callCenterDialog').foundation('reveal','open');
			} else {
				if (serviceResponse.errorMessageKey) {
					$('#callCenterDialog p#message').html(serviceResponse.errorMessageKey);
					$('#callCenterDialog').foundation('reveal','open');
					//alert (serviceResponse.errorMessageKey);
					//MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}

	}),
	
	wc.service.declare({
		id: "CCOrderLockHelper",
		actionId: "CCOrderLockHelper",
		url: "ccAjaxOrderLockHelper",
		formId: ""
		
		/**
		 * hides all the messages and the progress bar
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			//MessageHelper.hideAndClearMessage();
			cursor_clear();
			console.log("CCOrderLockHelper Success :: " + serviceResponse.continueFlow);
			if (serviceResponse.continueFlow == 'N') {
				document.location.href="AjaxOrderItemDisplayView?storeId="+serviceResponse.storeId+"&errType="+serviceResponse.errType;
			}
		}
		
		/**
		 * Displays the error message returned with the service response and hides the progress bar.
		 *
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			console.log("CCOrderLockHelper Failed");
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}

	}),
	
	wc.service.declare({
		id: "CCManageLVOFlag",
		actionId: "CCManageLVOFlag",
		url: "ccAjaxManageLVOFlag",
		formId: ""
		
		/**
		 * hides all the messages and the progress bar
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			//alert ("Action Completed Successfully");
			//MessageHelper.displayStatusMessage("Action Completed Successfully");
			cursor_clear();
		}
		
		/**
		 * Displays the error message returned with the service response and hides the progress bar.
		 *
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
			//	MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				alert (serviceResponse.errorMessage);
			} else {
				if (serviceResponse.errorMessageKey) {
					alert (serviceResponse.errorMessageKey);
					//MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}
	
	}),
	
	/**
	 * This service submits the order comments in DB. Upon success, the AjaxPrepareOrderForSubmit
	 * is called.
	 */
	wc.service.declare({
		id: "AjaxSubmitOrderComments",
		actionId: "AjaxSubmitOrderComments",
		url: "ccAjaxSubmitOrderComments",
		formId: ""
	    /**
	     * On success, just log in the console.
	     * @param (object) serviceResponse The service response object, which is the
	     * JSON object returned by the service invocation
	     */
		,successHandler: function(serviceResponse) {			
			console.debug(" Successfully inserted the order comments");
		}
	    /**
	     * Log the failure in console log.
	     * @param (object) serviceResponse The service response object, which is the
	     * JSON object returned by the service invocation
	     */
		,failureHandler: function(serviceResponse) {
			console.debug("Failed to insert order comments ");
			cursor_clear();
		}

	})
