$(document).ready(function(){window.fbAsyncInit=function(){fbappID=$("#getAppIdForm").find("#getAppId").val();FB.init({appId:fbappID,status:true,cookie:true,xfbml:true,oauth:true,})};(function(){var b=document.createElement("script");b.async=true;b.src=document.location.protocol+"//connect.facebook.net/en_US/all.js";document.getElementById("fb-root").appendChild(b)}());function a(c,f,g,e,d,i){var c=c;var l=$("#getthisURL").html().trim();var h=$("#getthisfbURL").html().trim();var n=l+e;var j;if(i=="electronicShippingGroup"){j=contextURL+d}else{j=contextURL+"/browse/productDetailColorSizePicker.jsp?productId="+productId}var b=f;var k=g;var m=f;FB.ui({method:"feed",name:"Product Purchased:"+b,link:linlbakurl,picture:n,caption:"Product Caption:"+m,description:k},function(o){if(o&&o.post_id){}else{alert("Post was not published.")}})}});function fblogin(){FB.login(function(a){if(a.authResponse){console.log("Welcome!  Fetching your information.... ");access_token=a.authResponse.accessToken;user_id=a.authResponse.userID;FB.api("/me",function(d){var f=d.email;var e=d.name;var i=d.id;var h=d.username;var b="facebook";var c=d.last_name;var g=d.first_name;if(f!=null){$.ajax({type:"GET",url:"/nyco/myaccount/gadgets/settingSessionInfo.jsp",data:{email:f,name:e,username:h,id:i,socialMediaType:b,lname:c,fname:g},success:function(j){}});omnitureFacebookLoginClick();setTimeout("myfunc()",1000)}})}else{console.log("User cancelled login or did not fully authorize.")}},{scope:"email, publish_stream,user_birthday,status_update,xmpp_login"},true)}function OnLoginRedirection(){FB.getLoginStatus(function(a){if(a.status==="connected"){FB.api("/me",function(d){var f=d.email;var e=d.name;var i=d.id;var h=d.username;var b="facebook";var c=d.last_name;var g=d.first_name;if(f!=null){$.ajax({type:"GET",url:"/nyco/myaccount/gadgets/settingSessionInfo.jsp",data:{email:f,name:e,username:h,id:i,socialMediaType:b,lname:c,fname:g},success:function(j){}});setTimeout("myfunc()",5000)}})}else{if(a.status==="not_authorized"){}else{}}})}function myfunc(){var a=$("#getAppIdForm").find("#getAppURL").val();window.location.assign(a)};