
/**********************************begin checkout *********************************************/
function checkoutWithOmniture() {
	try {
		OmnitureCenter.sccheckOutEvent();
	} catch(e) {
		//alert(e);
	}
	setExpressVar('no', 'beginCheckoutForm');
}

function checkoutWithOmnitureExpress() {
	try {
		OmnitureCenter.sccheckOutEvent();
	} catch(e) {
		//alert(e);
	}
	setExpressVar('no', 'expressCheckoutForm');
}

function checkoutWithOmniturePPExpress() {
	setExpressVar('yes', 'beginCheckoutFormPPExpress');
}

function loginWithOmniture() {
	try {
		OmnitureCenter.loginSuccess();
	} catch(e) {
		//alert(e);
	}
	$('#loginForm').submit();
}

function setExpressVar(val, formId) {
	var url = "/cart/checkoutLoginPPExpress.jsp";
	$.ajax({
		type: "POST",
		url: url,
		cache: false,
		data: "setVar=" + val,
		dataType: "json",
		success: function(data) {
			if (typeof(formId) != 'undefined' && formId.length > 0) {
				$('#' + formId).submit();
			}
		},
		error: function(data) {
			// console.log('error');
		}
	});
}
