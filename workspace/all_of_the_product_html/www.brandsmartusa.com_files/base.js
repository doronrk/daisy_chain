$(document).ready(function() {
	documentReadyFunction("ready"); // ready/reload
});

function documentReadyFunction(state) {
	$('body').removeClass('nojs').addClass('js');
	$("ul.hover-delay>li, span.hover-delay, li.hover-delay").hoverIntent({
		interval: 100, // milliseconds delay before onMouseOver
		over: hoverOn,
		timeout: 300, // milliseconds delay before onMouseOut
		out: hoverOff
	});
	$("ul.hover>li, span.hover, li.hover, .account-additional>ul>li").hover(hoverOn, hoverOff);
	$('li.header-nav-shop a.header-nav-label, li.header-nav-services a.header-nav-label, li.header-nav-locate a.header-nav-label, ul.shop-subnav a.shop-subnav-label, a.more').find('span.arrow').remove();;
	$('li.header-nav-shop a.header-nav-label, li.header-nav-services a.header-nav-label, li.header-nav-locate a.header-nav-label, ul.shop-subnav a.shop-subnav-label, a.more').append('<span class="arrow">&nbsp;</span>');
	$('ul.checklist>li, .check').prepend('<span class="bullet">');

	// browser things

	if ($.browser.msie) {

		// workaround for IE radio and checkbox onchange events
		$(function() {
			$('input:radio, input:checkbox').click(function() {
				this.blur();
				this.focus();
			});
		});

		$('body').addClass('ie');

		if ($.browser.version.substr(0, 1) == 6) {
			$('').supersleight();
			$('body').addClass('ie6');
		}
		if ($.browser.version.substr(0, 1) == 7) {
			$('body').addClass('ie7');
		}
	} else if ($.browser.mozilla) {
		$('body').addClass('ff');
	} else if ($.browser.webkit) {
		$('body').addClass('wk');
	}


	if (state == "ready") {
		// clear inputs
		$("input[type=text], input[type=email], input[type=password]").focus(
			function() {
				if (this.value == this.defaultValue) {
					this.value = "";
				}
			}).blur(function() {
				if (!this.value.length) {
					this.value = this.defaultValue;
				}
			});
	}

	$(".form-phone").mask("(999) 999-9999");
	$('.datepicker').datepicker();
	$(".form-date").mask("99/99/9999");
//	$('.form-date').datepicker({
//		changeMonth: false,
//		changeYear: false,
//		minDate: '+0M +0D',
//		maxDate: '+0M +10D',
//		dateFormat: 'mm/dd/yy',
//		showOn: "button",
//		buttonImageOnly: true,
//		buttonImage: "/img/icon-calendar.gif"
//	});



	$("table.stripe tr:nth-child(2n)").addClass('alt');

	// feature slideshow

	if ($('.slideshow')[0]) {
		$('.slideshow ul')
			.after('<div class="slideshow-nav">')
			.cycle({
				fx: 'fade',
				timeout: 5000,
				pause: 1,
				pager:  '.slideshow-nav'
			});
	}

	// accordion

	if ($('.accordion')[0]) {
		$("ul.accordion").accordion({
			active: false,
			alwaysOpen: true,
			collapsible: true,
			autoHeight: false,
			navigation: true,
			animated: false,
			header: '.subnav-header'
		});
		$(".facets-header a").click(function() {
			window.location = $(this).attr('href');
			return false;
		});
	}

	// expand/contract

	$("ul.expand ul").hide();
	$("ul.expand .facets-header").append('<span class="ui-icon">&nbsp;</span>');

	$("ul.expand .active ul").show();
	$("ul.expand .active .facets-header").addClass('ui-state-active');

	$("ul.expand .facets-header").click(function (e) {
		if ($(this).hasClass('ui-state-active')) {
			$(this).removeClass('ui-state-active');
			$(this).siblings('ul').hide();
		} else {
			$(this).addClass('ui-state-active');
			$(this).siblings('ul').show();
		}
	});
		
	// truncate
	
	// $('.item-title').dotdotdot();


	// facets

	$('ul.facets>li>a').addClass('facets-header');
	$('ul.facets a.facets-header').append('<span class="ui-icon">&nbsp;</span>');

	// actions

	$('ul.actions li a').prepend('<span class="icon">&nbsp;</span>');

	// modals

	$('.modal-warranty').click(function (e) {
		//obsolete modal?
		loadModal('modal-warranty.html', 620, 360);
		return false;
	});

	$('.modal-xsell').click(function (e) {
//		$.modal('<iframe src="' + this.href + '" height="600" width="780" scrolling="yes">', {
//			overlayClose:true
//		});
		loadModal(this.href, 780, 600);
		return false;
	});

	$('.modal-checkout').click(function (e) {
		//obsolete modal?
		loadModal('modal-checkout.html', 860, 320);
		return false;
	});

	$('.modal-list').click(function (e) {
//		$.modal('<iframe src="modal-list.html" height="400" width="620" scrolling="yes">', {
//			overlayClose:true
//		});
		loadModal('modal-list.html', 620, 400);
		return false;
	});

	$('.modal-address').click(function (e) {
//		$.modal('<iframe id="shippingModalAddressFrame" src="' + this.href + '" height="320" width="620" scrolling="no">', {
//			overlayClose:true
//		});
		loadModal(this.href, 620, 320);
		return false;
	});

	$('.modal-rating').click(function (e) {
		loadModal(this.href, 620, 540);
		return false;
	});

	$('.modal-text').click(function (e) {
//		$.modal('<iframe src="' + this.href + '" height="500" width="620" scrolling="yes">', {
//			overlayClose:true
//		});
		//not used?
		loadModal(this.href, 620, 500);
		return false;
	});

	$('.modal-short').click(function (e) {
		loadModal(this.href, 520, 360);
		return false;
	});

	$('.modal-wishlist-share').click(function (e) {
		loadModal(this.href, 700, 360);
		return false;
	});

	$('.modal-myzip').click(function (e) {
//		$.modal('<iframe id="myZipFrame" src="' + this.href + '" width="520" height="240" scrolling="no">', {
//			overlayClose:true
//		});
		loadModal(this.href, 520, 240);
		return false;
	});

	$('.modal-attach').click(function (e) {
		loadModal(this.href, 450, 230);
		return false;
	});
	
	setDefaultImages();
}


// search

$(function() {
	$("input#global-search-input").autocomplete({
		source: function(request,response) {
			$.ajax({
				url: "/global/gadgets/typeAhead.jsp",
				dataType: "json",
				data: {
					Dy: "1",
					Nty: "1",
					Ntt: $.trim(request.term)+"*"
				},
				success: function(data) {
					response(data);
				}
			});
		},
		minLength: 3,
		delay : 100
	});
});

function prepareInputs() {
	$("input[type=text], input[type=email], input[type=password]").focus(
			function() {
				if (this.value == this.defaultValue) {
					this.value = "";
				}
			}).blur(function() {
				if (!this.value.length) {
					this.value = this.defaultValue;
				}
			});
	$(".form-phone").mask("(999) 999-9999");
	$('.datepicker').datepicker();
	$(".form-date").mask("99/99/9999");
}

function loadWarrantyModal(params) {
	var width = 620;
	var height = 360;
	var resizeFunction = function() {
		reheightModal();
		reheightModal();
		setTimeout(reheightModal, 500);
	};
	var modalParam = (params.indexOf('?') == -1) ? '?modal=true' : '&modal=true';
	$('div.modal-container').first().load("/global/modals/modal-pdp-warranty.jsp" + params + modalParam).modal({
					overlayClose:false,
					minHeight: height,
					minWidth: width,
					maxWidth: width,
					onShow: resizeFunction,
					close: false
				});
}

// hover states

function hoverOn() {
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
}
function hoverOff() {
	$(this).removeClass("active");
}

function linkToUrl(url) {
	window.location.href = url;
}

function modalLinkToUrl(url) {
	parent.document.location.href = url;
	closeModalDialog();
}

function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	c_value = c_value + "; path=/";
	document.cookie = c_name + "=" + c_value;
}

//// workaround for IE radio and checkbox onchange events
//if ($.browser.msie) {
//	$(function() {
//		$('input:radio, input:checkbox').click(function() {
//			this.blur();
//			this.focus();
//		});
//	});
//}

function closeErrorMessage() {
	$(".error").removeClass("error");
	hideErrors();
}

function openErrorMessage(message) {
	openErrorMessageTarget(message, "error");
}

function openErrorMessageEdit(message) {
	openErrorMessageTarget(message, "errorEdit");
}

function hideErrors() {
	$("#error").hide();
}

function hideErrorsEdit() {
	$("#errorEdit").hide();
}

function openErrorMessageTarget(message, target) {
	$("#" + target).html(message);
	$("#" + target).show();
}

function openErrorMessageModal(message) {
	openErrorMessageTarget(message, 'simplemodal-container #error');
}

function openErrorMessageFrame(message, frame) {
	var errorOnFrame = $("#error", $("#" + frame).contents());
	errorOnFrame.html(message);
	errorOnFrame.show();
}

function validateDefault() {
	closeErrorMessage();
	return true;
}

function showErrors(data, isModal) {
	var errorMessage = "";
	var propertiesArray = new Array();
	var errorssArray = new Array();
	for (var i = 0; i < data.errors.length; i++) {
		if (indexOf(errorssArray, data.errors[i]) == -1) {
			errorssArray.push(data.errors[i]);
			if (errorMessage == "") {
				errorMessage = data.errors[i];
			} else {
				errorMessage = errorMessage + "<br />" + data.errors[i];
			}
		}
	}
	if (errorMessage != "") {
		if (isModal === true) {
			openErrorMessageModal(errorMessage);
		} else {
			openErrorMessage(errorMessage);
		}
		for (var i = 0; i < data.properties.length; i++) {
			if (data.properties[i] != undefined && data.properties[i].length > 0) {
				var properties = data.properties[i].split(":");
				for (var j = 0; j < properties.length; j++) {
					propertiesArray.push(properties[j]);
				}
			}
		}
		$(".error").removeClass("error");
		var prefix = "#";
		if (isModal === true) {
			prefix = "#simplemodal-container #";
		}
		for (i = 0; i < propertiesArray.length; i++) {
			$(prefix + propertiesArray[i]).addClass("error");
		}
	}
}

function showErrorsEdit(data) {
	var errorMessage = "";
	var propertiesArray = new Array();
	var errorssArray = new Array();
	for (var i = 0; i < data.errors.length; i++) {
		if (indexOf(errorssArray, data.errors[i]) == -1) {
			errorssArray.push(data.errors[i]);
			if (errorMessage == "") {
				errorMessage = data.errors[i];
			} else {
				errorMessage = errorMessage + "<br />" + data.errors[i];
			}
		}
	}
	if (errorMessage != "") {
		openErrorMessageEdit(errorMessage);
		for (var i = 0; i < data.properties.length; i++) {
			propertiesArray.push(data.properties[i]);
		}
		$(".error").removeClass("error");
		for (i = 0; i < propertiesArray.length; i++) {
			$("#" + propertiesArray[i] + "Edit").addClass("error");
		}
	}
}

function showErrorsEditExt(data) {
	var errorMessage = "";
	var propertiesArray = new Array();
	var errorssArray = new Array();

	if (data.errors.length == 1) {
		errorMessage = errorMessage + "<font color='red'>" + data.errors[0] + "</font><br /> ";
	} else {
		errorMessage = errorMessage + "<font color='red'>Please enter all required information and try again.</font><br/>";
	}
	if (errorMessage != "") {
		openErrorMessage(errorMessage);
		for (var i = 0; i < data.properties.length; i++) {
			propertiesArray.push(data.properties[i]);
		}
		$(".error").removeClass("error");
		for (i = 0; i < propertiesArray.length; i++) {
			$("#" + propertiesArray[i] + "Edit").addClass("error");
		}
	}
}

function showErrorsExt(data, isModal) {
	var errorMessage = "";
	var propertiesArray = new Array();
	var errorCount = 0;

	for (var i = 0; i < data.errors.length; i++) {
		if (data.errors[i] != "") {
			errorCount ++;
			errorMessage = errorMessage + "<font color='red'>" + data.errors[i] + "</font><br /> ";
			if (errorCount > 1) {
				errorMessage = "<font color='red'>Please enter all required information and try again.</font><br/>";
				break;
			}
		}
	}

	if (errorMessage != "") {
		if (isModal === true) {
			openErrorMessageModal(errorMessage);
		} else {
			openErrorMessage(errorMessage);
		}
		for (var i = 0; i < data.properties.length; i++) {
			if (data.properties[i] != undefined && data.properties[i].length > 0) {
				var properties = data.properties[i].split(":");
				for (var j = 0; j < properties.length; j++) {
					propertiesArray.push(properties[j]);
				}
			}
		}
		$(".error").removeClass("error");
		var prefix = "#";
		if (isModal === true) {
			prefix = "#simplemodal-container #";
		}
		for (i = 0; i < propertiesArray.length; i++) {
			$(prefix + propertiesArray[i]).addClass("error");
		}
	}
}

function showErrorsOnSignUp(data) {
	var errorMessage = "";
	var propertiesArray = new Array();
	var errorCount = 0;

	for (var i = 0; i < data.errors.length; i++) {
		if (data.errors[i] != "") {
			errorCount++;
			errorMessage = errorMessage + "<font color='red'>" + data.errors[i] + "</font><br /> ";
			if (errorCount > 1) {
				errorMessage = "<font color='red'>Please enter all required information and try again.</font><br/>";
				break;
			}
		}
	}

	if (errorMessage != "") {
		$("#errorSignUp").html(errorMessage);
		$("#errorSignUp").show();

		for (var i = 0; i < data.properties.length; i++) {
			propertiesArray.push(data.properties[i]);
		}
		$(".error").removeClass("error");
		for (i = 0; i < propertiesArray.length; i++) {
			$("#" + propertiesArray[i]).addClass("error");
		}
	}
}

function showErrorsList(data) {
	var errorMessage = "";
	var propertiesArray = new Array();
	var errorssArray = new Array();
	for (var i = 0; i < data.errors.length; i++) {
		if (indexOf(errorssArray, data.errors[i]) == -1) {
			errorssArray.push(data.errors[i]);
			if (errorMessage == "") {
				errorMessage = data.errors[i];
			} else {
				errorMessage = errorMessage + "<br />" + data.errors[i];
			}
		}
	}
	if (errorMessage != "") {
		openErrorMessage(errorMessage);
		for (var i = 0; i < data.properties.length; i++) {
			propertiesArray.push(data.properties[i]);
		}
		$(".error").removeClass("error");
		for (i = 0; i < propertiesArray.length; i++) {
			$("#" + propertiesArray[i]).addClass("form-error");
		}
	}
}

function showErrorsTarget(data, target) {
	var errorMessage = "";
	var propertiesArray = new Array();
	var errorssArray = new Array();
	for (var i = 0; i < data.errors.length; i++) {
		if (indexOf(errorssArray, data.errors[i]) == -1) {
			errorssArray.push(data.errors[i]);
			if (errorMessage == "") {
				errorMessage = data.errors[i];
			} else {
				errorMessage = errorMessage + "<br />" + data.errors[i];
			}
		}
	}
	if (errorMessage != "") {
		openErrorMessageTarget(errorMessage, target);
		for (var i = 0; i < data.properties.length; i++) {
			propertiesArray.push(data.properties[i]);
		}
		$(".error").removeClass("error");
		for (i = 0; i < propertiesArray.length; i++) {
			$("#" + propertiesArray[i]).addClass("error");
		}
	}
}

function showErrorsOnFrame(data, frame) {
	var errorMessage = "";
	var propertiesArray = new Array();
	var errorssArray = new Array();
	for (var i = 0; i < data.errors.length; i++) {
		if (indexOf(errorssArray, data.errors[i]) == -1) {
			errorssArray.push(data.errors[i]);
			if (errorMessage == "") {
				errorMessage = data.errors[i];
			} else {
				errorMessage = errorMessage + "<br />" + data.errors[i];
			}
		}
	}
	if (errorMessage != "") {
		openErrorMessageFrame(errorMessage, frame);
		for (var i = 0; i < data.properties.length; i++) {
			propertiesArray.push(data.properties[i]);
		}
		$(".error", $("#" + frame).contents()).removeClass("error");
		for (i = 0; i < propertiesArray.length; i++) {
			$("#" + propertiesArray[i], $("#" + frame).contents()).addClass("error");
		}
	}
}

function indexOf(array, element) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == element) {
			return i;
		}
	}
	return -1;
}

function showCart() {
	loadModal('/global/modals/modal-cart.jsp', 840, 500);
}

function getCookie(c_name) {
	var i,x,y,ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name) {
			return unescape(y);
		}
	}
	return undefined;
}

function getCookieBmUser() {
	return getCookie('bm-user-first-name');
}

function setCookieBmUser(value) {
	setCookie('bm-user-first-name', value, 365);
}

function resetCookieBmUser() {
	setCookie('bm-user-first-name', '', 0);
}

/**
 * Refreshes Captcha without reloading page
 */
function refreshCaptcha() {
	d = new Date();
	$("#captchaimg").attr("src", "/global/gadgets/captcha/simpleCaptcha.png?" + d.getTime());
}

function myzipSubmitUpdate(requestURI, page) {
	$("#showUpdateZipError").hide();
	$("#updateZipErrorMessage").html("");
	$("#updateZipErrorMessage").hide();
	$("#myzip").removeClass("form-error");

	var dataString = $("#zip-form").serialize();

	$.ajax({ type: "POST",
		url:getContextPath()+"/global/modals/modal-zip.jsp",
		data: dataString,
		dataType: "json",
		success: function(data) {
			var error_messages = "";
			var duplicate_message = "";
			if (data.error == "false") {
				if(requestURI == "/catalog/catalog-product.jsp"
					|| requestURI == "/index.jsp"
					|| (requestURI == "/cartridges/PageSlot/PageSlot.jsp")){
					closeModalDialog();
					parent.window.location.reload();
				} else {
					// parent.myZipCodeReload();
					parent.reloadMyzip(page);
					closeModalDialog();
				}
				if(page != "undefined" && page == "checkout-cart") {
					parent.$("#cartItemsContainer").load("/checkout/checkout-cart.jsp #cartItemsContainer",
						{ownerId:"shoppingCart", cleanUpOrderOff:"true"},
						function() {
							parent.checkoutCartUpdateItems();
						}
					);
				}
			}
			if (data.error == "true") {
				processErrors(data, $("#updateZipErrorMessage"), $("#showUpdateZipError"));
				//var iframe = parent.document.getElementById("myZipFrame");
				//iframe.height = "290px";
			}
		}
	});

	//var iframe = parent.document.getElementById("myZipFrame");
	//iframe.height = "240px";
}

function reloadMyzip() {
	reloadMyzip(null);
}

function reloadMyzip(page) {
	$("#myZipCode").empty();
	var url = "/global/gadgets/myzip.jsp?modal=true";
	if(page!=null) {
		url += "&page="+page;
	}
	$.ajax({
		url: url,
		cache: false
	}).done(function(html) {
			$("#myZipCode").html(html);
		}
	);
}

function closeModalDialog() {
	parent.$.modal.close();
}

function reloadMinicartCount() {
	$("#minicartCount").empty();
	$.ajax({
		url: "/global/gadgets/minicart-items-count.jsp?modal=true",
		cache: false
	}).done(function(html) {
		$("#minicartCount").html(html);
	});
}

function reloadWishlistCount() {
	$("#sidebar-wishListItemCount").empty();
	$.ajax({
		url: "/account/gadgets/sidebar-wishlist.jsp",
		cache: false
	}).done(function(html) {
			$("#sidebar-wishListItemCount").html(html);
		});
}

function increaseValue(val, addVal) {
	if (val == "")
		val = addVal;
	else
		val += "," + addVal;
	return val;
}

/*
function increaseValueAddAll(val, addVal) {
	if (val == null)
		val = addVal;
	else
		val += "," + addVal;
	return val;
}
*/

function reheightModal() {
	var modalHeight = $('#simplemodal-container #simplemodal-data').height();
	var containerHeight = $('#simplemodal-container').height();
	//var bodyHeight = $('#simplemodal-container #body').height();
	//console.log('before: cont=' + containerHeight + ', data=' + modalHeight + ', body=' + bodyHeight);
	$('#simplemodal-container').height(modalHeight);
	//modalHeight = $('#simplemodal-container #simplemodal-data').height();
	//containerHeight = $('#simplemodal-container').height();
	//bodyHeight = $('#simplemodal-container #body').height();
	//console.log('after: cont=' + containerHeight + ', data=' + modalHeight + ', body=' + bodyHeight);
}

function emailSignUpFormSubmit() {
	$("#errorSignUp").hide();
	$("#global-email").removeClass("error");

	var email = $("#global-email").val();
	var options = {
		success:
		function(data) {
			if (null != data && typeof data.errors != "undefined" && data.error == "true") {
				showErrorsOnSignUp(data);
			} else {
				$("#global-email").val("");
//				$.modal('<iframe id="emailSignUpForm" src="/global/modals/modal-signup.jsp?email='+email + '" height="240" width="620" scrolling="no">', {
//					overlayClose:true
//				});
				//loadModal('/global/modals/modal-signup.jsp?email='+email, 620, 240);
				$('div.modal-container').first().load('/global/modals/modal-signup.jsp?modal=true',
						function() {
							$('div.modal-container').first().modal({
								overlayClose:true,
								minHeight: 240,
								minWidth: 620,
								maxWidth: 620
							});
							$('#infoMsg').html(data.responseMessage);
							$('#contentInfoMsgDiv').show();
						}
					);
			}
		},
		error:
		function(data) {
			if (null != data && typeof data.errors != "undefined" && data.error == "true") {
				showErrorsOnSignUp(data);
			}
		},
		type: "POST",
		dataType : 'json'
	};
	var form = $("#mailSignUp");
	form.ajaxForm(options);
	form.submit();
	
	// 2)
//	$.get("http://lists.brandsmartusa.com/subscribe/subscribe.tml", form.serialize(), function (data) {
//			alert(data);
//		});
	// 3)
//	$.post("http://lists.brandsmartusa.com/subscribe/subscribe.tml", form.serialize(), function (data) {
//		alert(data);
//	});
	// 4)
//	$.ajax({
//		type: "POST",
//		url: "http://lists.brandsmartusa.com/subscribe/subscribe.tml",
//		data: form.serialize(),
//		success: function (data) {
//			alert(data);
//			},
//		error : function (data, f, g) {
//			alert(data);
//			}
//		});
}
function subscribeToLyrisFormSubmit() {
	$("#errorSignUp").hide();
	$("#global-email").removeClass("error");
	var form = $("#mailSignUp");
	
	var options = {
			success: showJSONResponseFromSubscribeToLyrisForm,
			error: showJSONResponseFromSubscribeToLyrisForm,
			type: "POST",
			dataType : 'json'
		};
		var form = $("#mailSignUp");
		form.ajaxForm(options);
		form.submit();
}

function showJSONResponseFromSubscribeToLyrisForm(data) {
	if (null != data && typeof data.errors != "undefined" && data.error == "true") {
		showErrorsOnSignUp(data);
	} else {
		$('div.modal-container').first().load('/global/modals/modal-signup.jsp?modal=true',
		function() {
			$('div.modal-container').first().modal({
				overlayClose:true,
				//minHeight: 240,
				minWidth: 620,
				maxWidth: 620//,
				//onShow: reheightModal
			});
			$('#singUpInfoMsg').html(data.responseMessage);
			$('#contentInfoMsgDiv').show();
		}
	);
		//alert(data.responseMessage);
	}
}

function emailSignUpModalSubmit() {
	$("#errorSignUp").hide();
	$(".error").removeClass("error");

	var options = {
		success:
		function(data) {
			var frame = parent.document.getElementById("emailSignUpForm");
			if (null != data && typeof data.errors != "undefined" && data.error == "true") {
				showErrorsOnSignUp(data);
				frame.height = "290px";
			} else {
				$("#contentInput").hide();
				$("#contentInfo").show();
				$("#contentInfoMsgDiv").show();
				$("#infoMsg").html(data.responseMessage);
/*
				if(data.responseMessage != "") {
					$("#contentInfoMsgDiv").show();
					$("#infoMsg").html(data.responseMessage);
				}
*/
			}
		},
		type: "POST",
		dataType : 'json'
	};
	var form = $("#mailSignUpExt");
	form.ajaxForm(options);
	form.submit();

	return false;
}

function leaveOnlyNumeric(element) {
	var str = $(element).val();
	str += '';
	var rgx = /^\d|\.|-$/;
	var out = '';
	for( var i = 0; i < str.length; i++ ) {
	if( rgx.test( str.charAt(i) ) ){
		if( !( ( str.charAt(i) == '.' && out.indexOf( '.' ) != -1 ) ||
		  ( str.charAt(i) == '-' && out.length != 0 ) ) ){
			out += str.charAt(i);
		  }
		}
	}
/*
	if (out.length == 0){
	  out = 1;
	}
*/
	$(element).val(out);
}

function showIFrameModal(href, width, height) {
	//do not use iframe, no access to parent window
	$.modal('<iframe src="' + href + '" height="'+ height +'" width="'+ width +'" scrolling="no">', {
		overlayClose:true
	});
	//loadModal(href, width, height);
	return false;
}
function showSimpleModal(id) {
	$.modal($('#'+id), {overlayClose:true});
	return false;
}

function closeMessageTarget(targetId, errorClass, messageClass) {
	var target = $("#" + targetId);
	target.hide();
	target.html("");
	target.removeClass(errorClass);
	target.removeClass(messageClass);
}

function openMessageTarget(message, targetId, className) {
	var target = $("#" + targetId);
	target.html(message);
	target.addClass(className);
	target.show();
}

function makeErrorMessage(data) {
	var errorMessage = "";
	var errorssArray = new Array();
	for (var i = 0; i < data.errors.length; i++) {
		if (indexOf(errorssArray, data.errors[i]) == -1) {
			errorssArray.push(data.errors[i]);
			if (errorMessage == "") {
				errorMessage = data.errors[i];
			} else {
				errorMessage = errorMessage + "<br />" + data.errors[i];
			}
		}
	}
	return errorMessage;
}

function showDataTarget(data, targetId, errorClass, messageClass) {
	$(".error").removeClass("error");
	closeMessageTarget(targetId, errorClass, messageClass);
	if (null != data) {
		if (data.error == "true") {
			if (data.errors != "undefined") {
				var errorMessage = makeErrorMessage(data);
				if (errorMessage != "") {
					openMessageTarget(errorMessage, targetId, errorClass);
					if (data.properties != "undefined") {
						for (var i = 0; i < data.properties.length; i++) {
							$("#" + data.properties[i]).addClass("error");
						}
					}
				}
			}
		} else {
			if (data.ok != "undefined" && data.ok != "") {
				openMessageTarget(data.ok, targetId, messageClass);
			}
		}
	}
}

function checkForQuestion() {
	var question = $('#global-search-input');
	if (question.val() == question.prop('defaultValue')) {
	 //question.val('');
	 return false;
	}
	$('#global-search').val(question.val()+"*");
	return true;
}

function checkError(data) {
	var errorMessage = "";
	for (var i = 0; i < data.errors.length; i++) {
		if (data.errors[i] != "") {
			errorMessage = errorMessage + data.errors[i] + "\n";
		}
	}

	showErrorsOnAddToCart(data.errors, 'add-item-error-message');
	window.scrollTo(0, 0);
	// alert(errorMessage);
	// showErrorsExt(data, "error"+productId);
}

function compareSubmitProductRemoveResponse(data) {
	var productId = data.productId;
	if (null != data && typeof data.errors != "undefined" && data.error == "true") {
		checkError(data);
		$("#compare"+productId).attr("checked", true);
		$("#compareAction"+productId).val("remove");
	} else {
		$("#compareAction"+productId).val("add");
	}
}

function compareSubmitProductAddResponse(data) {
	var productId = data.productId;
	if (data != null && typeof data.message != "undefined") {
		$("#add-item-error-message").html(data.message);
		$("#add-item-error-message").show();
		$('input[name="compareCheck"]').attr("checked", false);
		$("#compare"+productId).attr("checked", true);
	}
	if (null != data && typeof data.errors != "undefined" && data.error == "true") {
		checkError(data);
		$("#compare"+productId).attr("checked", false);
		$("#compareAction"+productId).val("add");
	} else {
		$("#compareAction"+productId).val("remove");
	}
}

function compareSubmitProduct(prodId) {
	$("#add-item-error-message").hide();
	var actionAdd = false;
	if($("#compare"+prodId).attr("checked") == 'checked') {
		actionAdd = true;
		$("#compareAction"+prodId).val("add");
	} else {
		$("#compareAction"+prodId).val("remove");
	}
	var dataString = $("#compareProductForm"+prodId).serialize();
	$.ajax({
		type: "POST",
		data: dataString,
		dataType: "json",
		success: actionAdd? compareSubmitProductAddResponse : compareSubmitProductRemoveResponse,
		error: actionAdd? compareSubmitProductAddResponse : compareSubmitProductRemoveResponse
	});
}

function compareSubmitForm(prodId) {
	$("#add-item-error-message").hide();
	var actionAdd = false;
	$("#compareAction"+prodId).val("show");
	var dataString = $("#compareProductForm"+prodId).serialize();
	$.ajax({
		type: "POST",
		data: dataString,
		dataType: "json",
		success: compareSubmitFormResponse,
		error:compareSubmitFormResponse
	});
}

function compareSubmitFormResponse(data) {
	if (null != data && typeof data.errors != "undefined" && data.error == "true") {
		checkError(data);
	} else {
		linkToUrl("/catalog/catalog-compare.jsp");
	}
}

function setDefaultImages() {
	$('img.img60').error(function() {this.src='/img/photoComingSoon_60.jpg';});
	$('img.img140').error(function() {this.src='/img/photoComingSoon_140.jpg';});
	$('img.img220').error(function() {this.src='/img/photoComingSoon_380.jpg';});
	$('img.img380').error(function() {this.src='/img/photoComingSoon_380.jpg';});
}

function submitOnEnter(e, callback) {
	e = e || window.event;
	if (e.keyCode == 13) {
		callback();
		e.preventDefault();
	}
}

function setPageTitle( pageTitle ) {
	document.title = 'BrandsMart USA - '+pageTitle;
}

function loadModal(href, width, height, resize) {
	var resizeFunction = null;
	if (resize === true) {
		resizeFunction = function(){
				reheightModal();
				reheightModal();
				setTimeout(reheightModal, 500);
			};
	}
	var modalParam = (href.indexOf('?') == -1) ? '?modal=true' : '&modal=true';
	$('div.modal-container').first().load(href + modalParam).modal({
					overlayClose:true,
					minHeight: height,
					minWidth: width,
					maxWidth: width,
					onShow: resizeFunction
				});
	
//	$('div.modal-container').first().modal({
//		overlayClose:true,
//		minHeight: height,
//		minWidth: width,
//		maxWidth: width//,
//		//onShow: resizeFunction
//	});
//	$('div.modal-container').first().load(href + modalParam, resizeFunction);
}