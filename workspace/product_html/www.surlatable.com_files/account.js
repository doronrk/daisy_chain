/**
 * profile management javascript codes.
 *
 * @author foy
 */
function popupOndocReady(modal,showDivId) {
	// onShow : show+make the window translucent
	// callback function for jqmodal
	var myOpenPNG = function(hash) {
		var maskWidth = $(window).width();
		var maskHeight = $(document).height();

		hash.o.css({
			position: 'absolute',
			height: maskHeight + 'px',
			width: maskWidth + 'px'
		});
		hash.o.fadeIn(5);
		hash.w.positionCenter().show();
		hash.w.bgiframe({ opacity: false });
	};

	// onClose : remove/hide the windows
	// callback function for jqmodal
	var myClosePNG = function(hash) {
		hash.w.hide();

		hash.o.fadeOut('1000');
		hash.o.remove();
	};

	// onShow : show+make the window translucent
	// callback function for jqmodal
	var myOpenGIF = function(hash) {
		var maskWidth = $(window).width();
		var maskHeight = $(document).height();

		hash.o.css({
			position: 'absolute',
			height: maskHeight + 'px',
			width: maskWidth + 'px',
			backgroundColor: '#f1f1f1'
		});
		hash.o.fadeIn('1000');
		hash.w.positionCenter().fadeIn('1000');
		hash.w.bgiframe({ opacity: true });
	};

	// onClose : remove/hide the windows
	// callback function for jqmodal
	var myCloseGIF = function(hash) {
		hash.w.fadeOut('1000');
		hash.o.fadeOut('1000');
		hash.o.remove();
	};

	$(showDivId).jqm({
		overlay: 50,
		closeClass: 'popupclose',
		width: 495,
		height: 300,
		modal: modal,
		onShow: myOpenGIF,
		onHide: myCloseGIF
	});
	$('.jqmOverlay').remove();
	$(showDivId).jqmShow();
}

function loadPage(url) {
	url=contextPath+'/account/include/'+url;
	$.get(url,function(data) {
		$('#xyz').html(data);
	});
}

function loadPageFullPath(url,param) {
	$.get(url,param,function(data) {
		$('#xyz').html(data);
	});
}

function loadUpdatePage(url,id) {
	url=contextPath+'/account/include/'+url;
	$.get(url,{id:id},function(data) {
		$('#xyz').html(data);
	});
}

function ajaxSubmit(form) {
	if (form == 'editCreditCard') {
		var options={
				success:function (data) {
					//console.log(data.indexOf('haserror') > 0);
					if (data.indexOf('haserror') > 0) {
						$('#xyz').html(data);
					} else {
						document.location.reload(true);
					}
				}
			};
	} else {
		var options={
				success:function (data) {
					$('#xyz').html(data);
				}
			};
	}
	$("#"+form).ajaxSubmit(options);
}

//for edit attendee in cooking class page
function loadWaitlistPage(url,classSkuId,orderId,isWaitlist,isAcctHome) {
	url=contextPath+'/account/include/'+url;
	$.get(url,{
		classId:classSkuId,
		orderId:orderId,
		isWaitlist:isWaitlist,
		isAcctHome:isAcctHome
	},function(data) {
		$('#xyz').html(data);
	});
}
//for edit attendee in cooking class page
function loadWaitlistPage1(url,classSkuId,orderId,isWaitlist,isAcctHome,isPaymentDue) {
	url=contextPath+'/account/include/'+url;
	$.get(url,{
		classId:classSkuId,
		orderId:orderId,
		isWaitlist:isWaitlist,
		isAcctHome:isAcctHome,
		isPaymentDue:isPaymentDue
	},function(data) {
		$('#xyz').html(data);
	});
}

function loadEditWaitlistPage(url,classSkuId,orderId,isWaitlist,isAcctHome,itemIds) {
	url=contextPath+'/account/include/'+url;
	$.get(url,{
		classId:classSkuId,
		orderId:orderId,
		isWaitlist:isWaitlist,
		isAcctHome:isAcctHome,
		itemIds:itemIds
	},function(data) {
		$('#xyz').html(data);
	});
}

// for canceling waitlist in cooking class page
function loadCancleWaitlistPage(url,waitlistId,firstName,lastName,isAcctHome) {
	url=contextPath+'/account/include/'+url;
	$.get(url,{
		waitlistId:waitlistId,
		firstName:firstName,
		lastName:lastName,
		isAcctHome:isAcctHome
	},function(data) {
		$('#xyz').html(data);
	});
}

function enterHandlerForAjaxSubmit(event,formName) {
	var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if (keyCode == 13) {
		event.returnValue=false;
		ajaxSubmit(formName);
	}
}

/* moved enterHandler to main_global */

//this method enable a form to be submitted by hitting carriage return
function carriageReturnSubmit(formId, submitBtnId) {
	var formObj = $('#'+formId);
	var submitBtnObj = $('#'+submitBtnId);
	if(formObj.length == 0||submitBtnObj.length == 0) {
		//return if the DOM can not be found using the passed IDs
		return;
	}
	$("input", formObj).keypress(function(e) {
		if(e.which == 13) {
			formObj.blur();
			submitBtnObj.focus().click();
		}
	});
}