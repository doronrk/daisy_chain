$(document).ready(function() {	
	$("#submitButton").css("display", "none");
	$("#unsubscribeButton").css("display", "none");
	$("#emailsignup").click(function() {
		$("#msgBar").html("");
		$("#errorMsg1").html("");
		$("#errorMsg2").html("");
		$("#errorMsg3").html("");
		var email = $("#signup_email").val();
		$("#signupEmail").val("");
		if ($.trim(email) != "Email address here") {
			$("#signupEmail").val(email);
		}
		$("#confirmEmail").val("");
		$("#zipCode").val("");
		$("#introDiv").show();
		$("#formDiv").show();
		$("#signMeUp").show();
		$("#closePopupButton").hide();
	  if ($.trim(email) != "Email address here") { // fix bug 13422
			clearEmail() ;
		}
	});
	
	$("#emailoptout").click(function() {
		$("#msgBaroptout").html("");
		$("#msgBarSuccess").html("");
		$("#unsubscribeEmail").val("");
		$("#unsubscribeBtn").css("display", "block");
		$("#unsubscribeWaiting").css("display", "none");
	});	

	$("#signMeUp").click(function() {
		$("#msgBar").html("");
		$("#signupBtn").css("display", "none");
		$("#signupWaiting").css("display", "block");
		$("#signupSubmit").click();
	});
	
	$("#unsubscribe").click(function() {
		$("#msgBaroptout").html("");
		$("#unsubscribeBtn").css("display", "none");
		$("#unsubscribeWaiting").css("display", "block");
		$("#unsubscribeSubmit").click();
	});
	$("#unsubscribeEmail").bind('keydown',function(event){ 
        if(event.keyCode==13){ 
        	$("#unsubscribe").click();
	        return false;
	    } 
	   });
});
function clearEmail() {
	$("#signup_email").val("Email address here");
	$("#signup_email").attr("class", "text watermark inactive");
	$("#signup_email").attr("title", "Enter your email address.");
};
function signUp() {
	var options = {
		url : contextPath + "/includes/ajax/signEmailResults.jsp",
		type : "POST",
		success : function(data) {
			$("#signupBtn").css("display", "block");
			$("#signupWaiting").css("display", "none");
			var errorMsg1 = $($.trim(data)).find("#errorMessage1").html();
			var errorMsg2 = $($.trim(data)).find("#errorMessage2").html();
			var errorMsg3 = $($.trim(data)).find("#errorMessage3").html();
			var errorMsg4 = $($.trim(data)).find("#errorMessage4").html();
			if ((errorMsg1!=null)||(errorMsg2!=null)||(errorMsg3!=null)) {
				$("#errorMsg1").html(errorMsg1);
				$("#errorMsg2").html(errorMsg2);
				$("#errorMsg3").html(errorMsg3);
			} else if (errorMsg4!=null){	
				$("#introDiv").hide();
				$("#formDiv").hide();
				var t1 = "<div style='text-align: center; padding-bottom: 10px'>"+errorMsg4+"</div>";
				$("#msgBar").html(t1);
				$("#signMeUp").hide();
				$("#closePopupButton").show();
			}else{
				$("#introDiv").hide();
				$("#formDiv").hide();
				var email = window.document.getElementById("signupEmail").value;
				var t1 = "<div style='text-align: center; padding-bottom: 10px'>Sign up successful.</div>";
				var axel = Math.random() + '';
				var a = axel * 10000000000000;
				var t2 = "<iframe src='http://fls.doubleclick.net/activityi;src=3325067;type=count935;cat=email605;u9=" + email + ";ord=1;num=" + a + "?' width='1' height='1' frameborder='0' style='display:none'></iframe>";				
				$("#msgBar").html(t1+t2);
				$("#signMeUp").hide();
				$("#closePopupButton").show();
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$("#signupBtn").css("display", "block");
			$("#signupWaiting").css("display", "none");
			$("#msgBar").html("<p class='message haserror'>Http request failed, please try again later.</p>");
		}
	};
	$("#singupForm").ajaxSubmit(options);
}
function unsubscribe(){
	var options = {
			url : contextPath + "/includes/ajax/signEmailResults.jsp",
			type : "POST",
			success : function(data) {
				$("#unsubscribeWaiting").css("display", "none");
				var errorInfo = $($.trim(data)).find("#errorMessage1").html();
				if (errorInfo != null) {
					$("#msgBarSuccess").html("");
					$("#msgBaroptout").html(errorInfo);
					$("#unsubscribeBtn").css("display", "block");
				}else{
					$("#unsubscribeEmail").val("");
					$("#msgBarSuccess").html("<font color='red'>Unsubscribe successful.</font>");
					$("#unsubscribeBtn").css("display", "block");
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$("#unsubscribeBtn").css("display", "block");
				$("#unsubscribeWaiting").css("display", "none");
				$("#msgBaroptout").html("<font color='red'>Http request failed, please try again later.</font>");
			}
		};
		$("#unsubscribeForm").ajaxSubmit(options);
}
