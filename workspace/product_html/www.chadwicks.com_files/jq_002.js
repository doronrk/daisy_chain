$(document).ready(function(){$("#btnEmailSignUp_disabled").click(function(){$email=$("#txtSignUpEmail").val();if($email){var emailReg=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;if(emailReg.test($email)){var retData,status;$formdata=$("#frmEmailSignUp").serialize();var jqxhr=$.post("/ajaxed/email.signup.asp",$formdata,function(data){retData=data}).success(function(){status="success"}).error(function(){status="error"}).complete(function(){});jqxhr.complete(function(){if(status=="success"){var url="/Thank_You";$(location).attr("href",url)}})}else{alert("Your email is invalid. Please verify and try again!")}}});$("#txtSignUpEmail").focus(function(){$default_value=document.getElementById("txtSignUpEmail").defaultValue;$enter_value=$(this).val();if($enter_value==$default_value){$(this).val("")}}).blur(function(){$default_value=document.getElementById("txtSignUpEmail").defaultValue;$enter_value=$(this).val();if($enter_value==""){$(this).val($default_value)}})});$(document).ready(function(){$("#btnEmailSignUp2").click(function(){$email=$("#txtSignUpEmail2").val();var emailReg=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;if($email){if(emailReg.test($email)){var retData,status;$formdata=$("#frmEmailSignUp2").serialize();var jqxhr=$.post("/ajaxed/email.signup.asp",$formdata,function(data){retData=data}).success(function(){status="success"}).error(function(){status="error"}).complete(function(){});jqxhr.complete(function(){if(status=="success"){var url="/Thank_You2";$(location).attr("href",url)}})}else{alert("Your email is invalid. Please verify and try again!")}}});$("#txtSignUpEmail2").focus(function(){$default_value=document.getElementById("txtSignUpEmail2").defaultValue;$enter_value=$(this).val();if($enter_value==$default_value){$(this).val("")}}).blur(function(){$default_value=document.getElementById("txtSignUpEmail2").defaultValue;$enter_value=$(this).val();if($enter_value==""){$(this).val($default_value)}})});