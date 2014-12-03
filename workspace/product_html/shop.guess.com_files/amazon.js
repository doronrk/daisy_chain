	
Amazon.setAccessToken = function(accessToken) {
	var expirationDate = new Date();
	expirationDate = new Date(expirationDate.setMinutes(expirationDate.getMinutes() + 60));
	$.cookie('guess.amz.accessToken', accessToken, { path: '/', expires: expirationDate });
};

Amazon.getAccessToken = function() {
	return $.cookie('guess.amz.accessToken');
};

Amazon.clearAccessToken = function() {
	$.cookie('guess.amz.accessToken', null, { path: '/' });
}
	
Amazon.setOrderReferenceNo = function(orderReferenceNo) {
	var expirationDate = new Date();
	expirationDate = new Date(expirationDate.setMinutes(expirationDate.getMinutes() + 60));
	$.cookie('guess.amz.orderReferenceNo', orderReferenceNo,{ path: '/', expires: expirationDate });
};

Amazon.getOrderReferenceNo = function() {
	return $.cookie('guess.amz.orderReferenceNo');
};

Amazon.clearOrderReferenceNo = function () {
	$.cookie('guess.amz.orderReferenceNo', null, { path: '/' });
}

function amazonSelectAddress() {
	$('.activeStepContainer').block({ message: null });
	var shippingMethodCode = $('#ShippingOptions ul input[name=ShippingMethod]:checked').val();

	$.ajax(appUrl('amazon/address'), { type: 'POST', data: { orderReferenceId: Amazon.getOrderReferenceNo() } })
		.done(function(response) {
			$('#ShippingOptions ul').empty();
			if (response.success) {
				if (response.options.length > 0) {
					$.each(response.options, function(index, value) {
						$('#ShippingOptions ul').append(
							$(document.createElement("li")).append(
								$(document.createElement("input")).attr({ type: 'radio', name: 'ShippingMethod', id: 'option_' + value.code, value: value.code }),
								$(document.createElement("label")).attr({ 'for': 'option_' + value.code }).text(value.name)
							)
						);
					});
					if (shippingMethodCode && shippingMethodCode.length > 0)
						$('#ShippingOptions ul input[value=' + shippingMethodCode + ']').attr('checked', 'checked');
					else
						$('#ShippingOptions ul input:first').attr('checked', 'checked');

					$('.activeStepContainer').unblock();
				} else {

					$('#ShippingOptions ul').append(
						$(document.createElement("li")).append(
							$(document.createElement("span")).attr('style', 'color:red').text('No shipping options available for selected address.')));

					$('.activeStepContainer').unblock();
				}
			} else {
				var errorMessage = response.errorMessage;
				if (errorMessage === undefined) {
					errorMessage = 'No shipping options available for selected address.';
				}
				$('#ShippingOptions ul').append(
					$(document.createElement("li")).append(
						$(document.createElement("span")).attr('style', 'color:red').text(errorMessage)));

				$('.activeStepContainer').unblock();
			}
		});
}

function amazonLoginExistingNonAssociatedCustomer(accessToken, email) {
		var d = $('<div/>').load(rootUrl('scripts/templates/amazonLogin.htm'), function() {
			$.unblockUI();

			d.dialog({
				height: 300,
				width: 400,
				modal: true,
				resizable: false,
			});

			d.find('input[name=UserName]')
				.attr('readonly','readonly')
				.val(email);

			d.find('.lnk-close a').click(function(e) {
				e.preventDefault();
				amazonLogoff();
				d.dialog('destroy');
				return false;
			});

			$('#amazonLogin a.btn').click(function(e) {
				e.preventDefault();

				d.block();

				var form = d.find('form');

				$.post(appUrl('Account/JsonLogon'), form.serialize(), function(logonData) {
					d.unblock();
					if (logonData.success) {
						d.dialog('destroy');
						amazonLogin(accessToken);
					} else {
						alert('error');
					}
				});

				return false;
			});

		});
	}

	function amazonLogin(accessToken, expiresIn) {
		Amazon.setAccessToken(accessToken);
		Amazon.setOrderReferenceNo(null);

		$.blockUI();

		$.ajax(appUrl('amazon/login/'), {
			type: 'POST',
			data: { accessToken: accessToken}
		}).done(function(result) {
			if (result.success) {
				window.location.href = appUrl("checkout/");
			} else if (result.loginRequired) {
				amazonLoginExistingNonAssociatedCustomer(accessToken, result.email);
			} else {
				$.unblockUI();
				alert("this guess account associated with another amazon account. " + result.errorMessage);
			}
		});
	}

	function amazonLogoff() {
		if (Amazon.getAccessToken() != null) {
			Amazon.clearAccessToken();
			Amazon.clearOrderReferenceNo();
			amazon.Login.logout();
		}
	}

$(function() {
	$('a#signin-status-link.lnk-logoff').click(function() {
		amazonLogoff();
	});
});