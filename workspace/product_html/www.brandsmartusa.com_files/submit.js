var contextPath = "";

function faqSearchSubmit() {
	closeErrorMessage();//
	var $questionInput = $("#faqSearchForm input:text");
	if ($questionInput.val() == $questionInput.prop("defaultValue")) {
		$questionInput.val("");
	}
	
	var options = {
			success: faqSearchSuccess,
			dataType : 'json'
	};
	var qform = $("#faqSearchForm");
	qform.ajaxSubmit(options);
	
	if ($("#faqSearchForm input:text").val()) {
		$("#clearFaqQuestion").show();
	} else {
		$("#clearFaqQuestion").hide();
	}
};

function faqSearchSuccess(data) {
	var $contentDiv = $("#content");
	var $faqSections = $("#faqSections");
	$faqSections.empty();
	$contentDiv.children("div").remove();
	
	if (typeof data.empty=="undefined"){
		$faqSections.html(data.sections);
		$contentDiv.append(data.content);
	} else {
		//$contentDiv.append('<div>'+data.empty+'</div>');
		openErrorMessage(data.empty);
	}
};


function clearFaqQuestion() {
	closeErrorMessage();//
	$("#faqSearchForm input:text").val("");
	faqSearchSubmit();
}

function checkFaqSearchSubmit(e) {
	if(e && e.keyCode == 13){
		e.preventDefault();
		faqSearchSubmit();
		return false;
	}
}

function showJsonResponseSendInqModalSubmit(data) {
	if (typeof data.errors=="undefined"){
		parent.location.reload();
	} else {
		showErrors(data);
		var iframe = parent.document.getElementById("sendInqFrame");
		iframe.height = "410px";
	}
};

function sendInqModalSubmit() {
	if (validateDefault()) {
		var options = {
				success: showJsonResponseSendInqModalSubmit,
				dataType : 'json'
		};
		var fel = $("#form-sendinq");
		fel.ajaxForm(options);
		fel.submit();
	}
};

function showJsonResponseSearchClearanceSubmit(data) {
	if (typeof data.errors=="undefined"){
		//parent.location.reload();
	} else {
		showErrors(data);
	}
};

function searchClearanceSubmit() {
	if (validateDefault()) {
		var options = {
				success: showJsonResponseSearchClearanceSubmit,
				dataType : 'json'
		};
		var fel = $("#storeClearanceForm");
		fel.ajaxForm(options);
		fel.submit();
	}
};

function checkSubmit(e, func) {
	if (e && e.keyCode == 13) {
		func.call();
		return false;
	}
	return true;
};

function submitGetOrderStatusFrom() {
	closeErrorMessage();
	$('#msg').hide();
	var options = {
		success: showJsonResponseGetOrderStatusFrom,
		dataType : 'json'
	};
	var fel = $("#getOrderStatusForm");
	fel.ajaxForm(options);
	fel.submit();
}

function showJsonResponseGetOrderStatusFrom(data) {
	if (typeof data == "undefined" || data.error == 'false'){
		/*if (data.ok) {
			openErrorMessageTarget(data.ok, 'msg');
		}*/
		$("#msg").html("");
		$("#msg").load(contextPath + '/service/gadgets/shg-statuses.jsp');
		$("#msg").show();
		//linkToUrl("/account/orders-detail.jsp");
	} else {
		showErrors(data);
	}
}

function showJsonResponsePaginationClearanceSubmit(data) {
	if (typeof data.errors=="undefined"){
		$("#paginationPage").load( contextPath + '/storelocator/gadgets/clearance-pagination.jsp', function() {
			$("#itemsPage").load( contextPath + '/storelocator/gadgets/clearance-items.jsp');
		});
	} else {
		showErrors(data);
	}
};

function paginationClearanceSubmit(pPageInq) {
	var locationId = $("#locationId").val();
	var pageNum = parseInt($("#pageNum").val());
	if (pageNum == "" || isNaN(pageNum)) {
		pageNum = 1;

	}
	if (typeof pPageInq == "undefined") {
		
	} else {
		if (typeof pageNum == "undefined") {
			pageNum = 1;
		}
		pageNum = pageNum + pPageInq;
	}
	var sortType = $("#itemsSorting").val();
	var itemsPerPage = $("#itemsPerPage").val();
	$("#itemsPage").load(contextPath + '/storelocator/gadgets/clearance-items.jsp?pageNum=' + pageNum + '&sortType=' + sortType + '&itemsPerPage=' + itemsPerPage + '&locationId=' + locationId,
			setDefaultImages);

};

function setNums(num1,num2) {
	$("#pageNum").val(num1);
	$("#hTotalItems").text(num2);
};

function submitSaveGuestProfile() {
	closeErrorMessage();
	//var options = {
	//	success: showJsonResponseSaveGuestProfile,
	//	dataType : 'json'
	//};
	var fel = $("#saveGuestProfile");
	//fel.ajaxForm(options);
	fel.submit();
}

function showJsonResponseSaveGuestProfile(data) {
	if (typeof data == "undefined" || data.error == 'false'){
		if (data.cookies) {
			setResponseCookies(data);
		}
		parent.window.location.reload();
	} else {
		showErrors(data);
	}
}

function setResponseCookies(data) {
	for (var i = 0; i < data.cookies.length; i++) {
		var ck = data.cookies[i];
		updateCookie(ck.name, ck.value, ck.expires, ck.path, ck.domain);
	}
}


function plpComparisonAction(prodId) {
	$("#add-item-error-message").html("");
	$("#add-item-error-message").hide();
	if($("#compare"+jqSelector(prodId)).is(":checked")){
	
		$.ajax({  
			type: "POST", 
			url: "/catalog/gadgets/compare/addToCompareList.jsp?productId="+escape(prodId),  
			data: "",
			dataType: "json",  
			success: function(data) {  
				var added = '';
				var error = '';
				for (property in data) {
					if ( property == "added" ) {
						added = data[property];
					}
					
					if ( property == "error" ) {
						error = data[property];
					}
				}
				if ( added == "false" ) {
					var msg="";
					if(error =="sizeError"){
						msg= "You may only compare 4 items at the time.";
						//$("#addCompare_"+jqSelector(prodId)+"").css("padding-bottom", "30px");
						$("#compare"+jqSelector(prodId)+"").attr("checked", false); 
					}
					if(error=="error"){
						msg = "unable to add item to compare list";
					}
					if(error =="catError"){
						msg= "You may only compare items from same category.";
						//$("#addCompare_"+jqSelector(prodId)+"").css("padding-bottom", "30px");
						$("#compare"+jqSelector(prodId)+"").attr("checked", false); 
					}
					//$("#add-item-error-message").html(msg);
					//$("#add-item-error-message").show();
				}
			},
		      error: function (xhr, ajaxOptions, thrownError) {
//		          alert(xhr.status);
//		          alert(thrownError);
		        }   
		});
	} else {
		removeCompareItem(prodId);
	}
} 

/**
* removes item from compare list
*/
function removeCompareItem(prodId){
	$.ajax({  
		type: "POST", 
		url: "/catalog/gadgets/compare/addToCompareList.jsp?productId="+escape(prodId)+"&remove=true",  
		data: "",
		dataType: "json",  
		success: function(data) {  
			var added = '';
			var error = '';
			for (property in data) {
				if ( property == "added" ) {
					added = data[property];
				}
			
				if ( property == "error" ) {
					error = data[property];
				}
			}

			if ( added == "false" ) {
				var msg="";
				if(obj.error=="error"){
					msg = "unable to remove item";
				}
				//$("#addCompare_"+jqSelector(prodId)+"").css("padding-bottom", "30px");
				//$("#addCompare_"+jqSelector(prodId)+"").html(msg);
				//$("#addCompare_"+jqSelector(prodId)+"").show();
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
//			alert(xhr.status);
//			alert(thrownError);
		}   
	});
}

function jqSelector(str){
	return str.replace(/([;&,\.\+\*\~'//:"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
}