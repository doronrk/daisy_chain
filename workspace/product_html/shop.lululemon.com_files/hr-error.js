function fireCallback(modal, callback) {
	var hoverContainer = modal;

	if (jQuery.browser.msie && jQuery.browser.version < 7) {
		jQuery("select").css("visibility", "hidden");
	}

	if (callback == "homePage") {
		jQuery('body').live('callback', function() {
			window.location = "/index.jsp";
		});
	}

	else if (callback == "refreshCart") {
		jQuery('body').live('callback', function() {
			reloadShoppingCart();
		});
	}

	else if (callback == "shoppingCart") {
		jQuery('body').live('callback', function() {
			window.location = "/shop/shopping-bag.jsp";
		});
	}

	else if (callback == "resetPassword") {
		jQuery(document).ready(function() {
			var emailLogin = jQuery('#emailLogin').attr('value');

			jQuery('body').live('callback', function() {
				window.location = "/secure/account/forgotpassword.jsp?email=" + emailLogin;
			});
		});
	}

	else if (callback.match(/paypalCanadaPostMessage/gi)) {
		var shippingInfo = (callback.split(";")[1] == null) ? "" : callback.split(";")[1];
		paypalSuccess(shippingInfo);
		reloadShoppingCart();
		$.fancybox.close();
	}

	else if (callback == "billingInfoForm") {
		jQuery('body').live('callback', function() {
			jQuery('#step2Header .editLink').click();
		});
	}
	else if (callback == "shippingInfoForm") {
		jQuery('body').live('callback', function() {
			jQuery('#step1Header .editLink').click();
		});
	}


	jQuery.fancybox({
		'padding' : 0,
		'transitionIn' : 'none',
		'transitionOut' : 'none',
		'scrolling' : 'no',
		'autoDimensions' : true,
		//'width' : 437,
		'content' : hoverContainer,
		'overlayShow' : true,
		'onComplete' : function() {
			//jQuery("#fancybox-close").css("right","-27px");
			setTimeout("jQuery('#fancybox-overlay').show()", 300);
		}
	});
}

function hoverDecision(msg, title, callback) {
	var type = '';

	var errorWrapper = $('<div/>',{ "class":"errorMessage" });

	errorWrapper.append(
		$('<h2/>',{ "class":"containerTitle", "text":title }),
		$('<p/>',{ "html":msg }),
		$('<div/>',{ "class":"errorConfirmDeny wide" }).append(
			$('<span/>',{ "class":"btn" }).append(
				$('<input/>',{ "class":"btn closeAlert", "type":"button", "value":"ok" })
			),
			$('<div/>', { "class":"errorCloseContainer" }).append(
				$('<span/>',{ "class":"btn" }).append(
					$('<input/>',{ "class":"btn cancelAlert", "type":"button", "value":"close" })
				)
			),
			$('<div/>',{ "class":"clear"})
		)
	);

	var errorModal = $('<div/>', { "id":"pageContent", "class":"errorModal" });

	errorModal.append(
		$('<div/>',{ "id":"container" }).append(
			$('<div/>', { "id":"subContainer" }).append(
				$('<div/>', { "class":"modalOuter" }).append(
					$('<div/>', { "class":"modalContent" }).append(
						$('<div/>', { "class":"t" }),
						errorWrapper
					),
					$('<div/>', { "class":"b" }).append(
						$('<div/>')
					)
				)
			)
		)
	);
	fireCallback(errorModal, callback);
}

function hoverDecisionCancelOrder(msg, title, callback) {
	var type = '';

	var errorWrapper = $('<div/>',{ "class":"errorMessage" });

	errorWrapper.append(
		$('<h2/>',{ "class":"containerTitle", "text":title }),
		$('<p/>',{ "html":msg }),
		$('<div/>',{ "class":"errorConfirmDeny wide" }).append(
			$('<span/>',{ "class":"btn" }).append(
				$('<input/>',{ "class":"btn closeAlert", "type":"button", "value":"ok" })
			),
			$('<div/>', { "class":"errorCloseContainer" }).append(
				$('<span/>',{ "class":"btn" }).append(
					$('<input/>',{ "class":"btn cancelAlert", "type":"button", "value":"close" })
				)
			),
			$('<div/>',{ "class":"clear"})
		)
	);

	var errorModal = $('<div/>', { "id":"pageContent", "class":"errorModal" });

	errorModal.append(
		$('<div/>',{ "id":"container" }).append(
			$('<div/>', { "id":"subContainer" }).append(
				$('<div/>', { "class":"modalOuter" }).append(
					$('<div/>', { "class":"modalContent" }).append(
						$('<div/>', { "class":"t" }),
						errorWrapper
					),
					$('<div/>', { "class":"b" }).append(
						$('<div/>')
					)
				)
			)
		)
	);
	fireCallback(errorModal, callback);
}

function errorDecision(msg, callback) {
	var type = '';
	var errorWrapper = $('<div/>').attr("class","errorMessage");
	var defaultTitle = "<h2 class=&34;errorTitleHidden&34; >breathe deeply... and try again.</h2>";
	var indexOfTitle = msg.indexOf("errorTitleHidden");
	if(indexOfTitle > 25 || indexOfTitle == -1){
		msg =defaultTitle+msg;
	}
	errorWrapper.append(
		/*$('<h2/>').attr("class","containerTitle").append("breathe deeply... and try again."+""),*/
		$('<p/>').html(msg.replace(/&#39;/g, "'").replace(/&#34;/g, "\"").replace(/&amp;#39;/g, "'").replace(/&amp;#34;/g, "\"")),
		$('<div/>').attr( "class","errorConfirmDeny").append(
			$('<span/>').attr("class","btn").append(
				$('<input/>').attr("class","btn closeAlert").attr("type","button").attr("value","ok")
			),
			$('<div/>').attr("class","clear")
		)
	);
	var content="";
	$(errorWrapper).find(".errorTitleHidden").addClass("showTitleContent");
	/*$(errorWrapper).find(".errorTitleHidden").each(function() {
	    content += $(this).html() + " ";
	});
	$(errorWrapper).find(".containerTitle").html(content);*/

	var errorModal = $('<div/>').attr("id","pageContent").attr("class","errorModal");

	errorModal.append(
		$('<div/>').attr('id','container').append(
			$('<div/>').attr("id","subContainer").append(
				$('<div/>').attr("class","modalOuter").append(
					$('<div/>').attr("class","modalContent").append(
						$('<div/>').attr("class","t"),
						errorWrapper
					),
					$('<div/>').attr("class","b").append(
						$('<div/>')
					)
				)
			)
		)
	);

	fireCallback(errorModal, callback);
}

function errorDecisionModal(msg, callback){
	var type = '';
	var defaultTitle = "<h2 class=&34;errorTitleHidden&34; >breathe deeply... and try again.</h2>";
	var indexOfTitle = msg.indexOf("errorTitleHidden");
	if(indexOfTitle > 25 || indexOfTitle == -1){
		msg = defaultTitle+msg;
	}
	var errorWrapper = $('<div/>').attr("class","errorMessage");
	var errorContent = $('<span/>').attr("class","errorContent");
	
	errorContent.append(msg.replace(/&#39;/g, "'").replace(/&#34;/g, "\"").replace(/&amp;#39;/g, "'").replace(/&amp;#34;/g, "\""));

	errorWrapper.append(
		/*$('<h2/>').attr("class","containerTitle").append("breathe deeply... and try again."+""),*/
		$('<p/>').html($(errorContent).text().replace(/\\/g, '')),
		$('<div/>').attr( "class","errorConfirmDeny").append(
			$('<span/>').attr("class","btn").append(
				$('<input/>').attr("class","btn closeAlert").attr("type","button").attr("value","ok")
			),
			$('<div/>').attr("class","clear")
		)
	);
	var content="";
	$(errorWrapper).find(".errorTitleHidden").addClass("showTitleContent");
	/*$(errorWrapper).find(".errorTitleHidden").each(function() {
	    content += $(this).html() + " ";
	});
	$(errorWrapper).find(".containerTitle").html(content);*/

	var errorModal = $('<div/>').attr("id","pageContent").attr("class","errorModal");

	errorModal.append(
		$('<div/>').attr('id','container').append(
			$('<div/>').attr("id","subContainer").append(
				$('<div/>').attr("class","modalOuter").append(
					$('<div/>').attr("class","modalContent").append(
						$('<div/>').attr("class","t"),
						errorWrapper
					),
					$('<div/>').attr("class","b").append(
						$('<div/>')
					)
				)
			)
		)
	);

	fireCallback(errorModal, callback);
}

jQuery(document).ready(function() {

	var ua = navigator.userAgent,
    event = (ua.match(/iPad/i)) ? "touchstart" : "click";

	jQuery('#pageContent.errorModal .closeContainer a, #pageContent.errorModal .errorCloseContainer input.cancelAlert').live(event, function() {
		jQuery.fancybox.close();
		return false;
	});

	jQuery('.#pageContent.errorModal input.closeAlert').live(event, function() {
		jQuery.fancybox.close();
		$('body').trigger('callback');
		$('body').die('callback');
		if(getParameterByName('callId') != '' &&  jQuery('#vmeTxType').length && jQuery('#vmeTxType').val()=='triggerBilling'){
			jQuery('#vmeTxType').val('shortChk');
			jQuery('#billingFormSubmit').trigger('click');
			jQuery('#billingInfoFields').show();
		}
		return false;
	});

	jQuery('#pageContent.errorModal input.closeAlert').live(event, function() {
		jQuery.fancybox.close();
		$('body').trigger('callback');
		$('body').die('callback');
		return false;
	});
});