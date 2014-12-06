//********************************************************************
//*-------------------------------------------------------------------
//* Licensed Materials - Property of IBM
//*
//* WebSphere Commerce
//*
//* (c) Copyright International Business Machines Corporation. 2003
//*     All rights reserved.
//*
//* US Government Users Restricted Rights - Use, duplication or
//* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
//*
//*-------------------------------------------------------------------
//*

function disableLinkRedirect(url, idname) {
	document.getElementById(idname).disabled = "true";
	document.getElementById(idname).onclick = "";
	document.getElementById(idname).href = "#";	
	window.location = url;
}

function disableLink(idname) {
	document.getElementById(idname).disabled = "true";
	document.getElementById(idname).onclick = "";
	document.getElementById(idname).href = "#";	
}

function disableButton (idname) {
	document.getElementById(idname).disabled = "true";
}

function disableButtonReturn (idname) {
	document.getElementById(idname).disabled = "true";
	return true;
}

function disableButtonRedirect (url, idname) {
	document.getElementById(idname).disabled = "true";
	window.location = url;
}

function simpleSubmit (form, buttonName) {
	disableButton(buttonName);
	form.submit();
}

function simpleSubmitReturn (form, buttonName) {
	disableButton(buttonName);
	return true;
}

function validateForgotPassword(form, button){
    var email =  form.logonId.value;
    if(email=="")
    {
	    alert("Please enter your email address");
	    return false;
    }else{
    	disableButton(button);
    	return true;
    }
}

//////////////////////////////////////////////////////////
// Checks whether a string contains a double byte character
// target = the string to be checked
//
// Return true if target contains a double byte char; false otherwise
//////////////////////////////////////////////////////////
function containsDoubleByte (target) {
     var str = new String(target);
     var oneByteMax = 0x007F;

     for (var i=0; i < str.length; i++){
        chr = str.charCodeAt(i);
        if (chr > oneByteMax) {return true;}
     }
     return false;
}

//////////////////////////////////////////////////////////
// A simple function to validate an email address
// It does not allow double byte characters
// strEmail = the email address string to be validated
//
// Return true if the email address is valid; false otherwise
//////////////////////////////////////////////////////////
function isValidEmail(strEmail){
	// check if email contains dbcs chars
	if (containsDoubleByte(strEmail)){
		return false;
	}
	/**
	if(strEmail.length == 0) {
		return true;
	} else if (strEmail.length < 5) {
             return false;
       	}else{
           	if (strEmail.indexOf(" ") > 0){
                      	return false;
               	}else{
                  	if (strEmail.indexOf("@") < 1) {
                            	return false;
                     	}else{
                           	if (strEmail.lastIndexOf(".") < (strEmail.indexOf("@") + 2)){
                                     	return false;
                                }else{
                                        if (strEmail.lastIndexOf(".") >= strEmail.length-2){
                                        	return false;
                                        }
                              	}
                       	}
              	}
       	}
      	return true;
      	*/
	
		var at="@"
		var dot="."
		var lat=strEmail.indexOf(at)
		var lstr=strEmail.length
		var ldot=strEmail.indexOf(dot)
		if (strEmail.indexOf(at)==-1){
		    return false
		}

		if (strEmail.indexOf(at)==-1 || strEmail.indexOf(at)==0 || strEmail.indexOf(at)==lstr){
		   return false
		}

		if (strEmail.indexOf(dot)==-1 || strEmail.indexOf(dot)==0 || strEmail.indexOf(dot)==lstr){
		   return false
		}

		if (strEmail.indexOf(at,(lat+1))!=-1){
		   return false
		}

		if (strEmail.substring(lat-1,lat)==dot || strEmail.substring(lat+1,lat+2)==dot){
		   return false
		}

		if (strEmail.indexOf(dot,(lat+2))==-1){
		   return false
		}
		
		if (strEmail.indexOf(" ")!=-1){
		    return false
		}

 		 return true	
	
}



//////////////////////////////////////////////////////////
// This function will count the number of bytes
// represented in a UTF-8 string
//
// arg1 = the UTF-16 string
// arg2 = the maximum number of bytes allowed in your input field
// Return false is this input string is larger then arg2
// Otherwise return true...
//////////////////////////////////////////////////////////
function isValidUTF8length(UTF16String, maxlength) {
    if (utf8StringByteLength(UTF16String) > maxlength) return false;
    else return true;
}

//////////////////////////////////////////////////////////
// This function will count the number of bytes
// represented in a UTF-8 string
//
// arg1 = the UTF-16 string you want a byte count of...
// Return the integer number of bytes represented in a UTF-8 string
//////////////////////////////////////////////////////////
function utf8StringByteLength(UTF16String) {
  if (UTF16String === null) return 0;
  var str = String(UTF16String);
  var oneByteMax = 0x007F;
  var twoByteMax = 0x07FF;
  var byteSize = str.length;

  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    if (chr > oneByteMax) byteSize = byteSize + 1;
    if (chr > twoByteMax) byteSize = byteSize + 1;
  }  
  return byteSize;
}

// clear field value function: removes the default value onfocus, and adds back if nothing entered 
function fieldClear(obj) {
	if(obj.Val) {
		if (obj.value == '') { 
			obj.value = obj.Val;
			obj.Val = null;
			obj.first = null;
		} 
		else {
			obj.Val = null;
		}
	} else if (!obj.first) { 
		obj.Val = obj.value;
		obj.value = ''; 
		obj.first = 'true';
	} 
}

function trimMe(field) {
	var value = field.value ;
	value = value.replace(/^\s+|\s+$/g,"");
	field.value = value;
}

// function to convert the field to lower case
function convertToLowerCase(field){
	var value = field.value;
	value = value.toLowerCase();
	field.value = value;
}

//var busy = false;
//function Add2ShopCart(form)
//
//{      //alert("catentryId="+form.catEntryId.value);
//	 var color = document.getElementById("colorSelect").value;   
//     var size =  document.getElementById("sizeSelect").value;
//     if(size=="")
//      {
//                 alert("Please select a Size");
//                 //return;
//      }
//     
//  		if (!busy && size!="") {
//              busy = true;
//              form.action="OrderItemAdd";
//              //form.catEntryId.value = catEntryId;
//              //form.quantity.value = catEntryQuantity;
//              form.URL.value='OrderCalculate?updatePrices=1&calculationUsageId=-1&dummaryparam=1&URL=OrderItemDisplay';
//              form.submit();
//       }
//}
//// This javascript function is used by the 'Add to Wish List' button to set appropriate values before the form is submitted
//function Add2WishList(form)
//{
//	var color = document.getElementById("colorSelect").value;   
//    var size =  document.getElementById("sizeSelect").value;
//    if(size=="")
//     {
//        alert("Please select a Size");
//        //return;
//     }
//    
//	if (!busy && size!="") {
//          busy = true;
//          form.action="InterestItemAdd";
//         // form.catEntryId.value = catEntryId;
//         
//          form.URL.value='InterestItemDisplay';
//          form.submit();
//       }
//}

// This javascript display the value of the 'keyName' stored in 'cookieName'. If value is null then display "0".
// This script is used to display Items for cookie CVMINICART & balancePoints for CVREWRDPOINTS cookies
function displayIntegerValue(cookieName, keyName)
{
	//alert("IN displayCartItems method");
	var str = "0";
	str = getUserCookieValue(cookieName, keyName);
	if(str == null)
		str = "0";
	document.write(str);
}

// This javascript display the value of the 'keyName' stored in 'cookieName'. If value is null then display "0.00". 
// If value is integer then it appends the .00 after the integer value.
// This script is used to display Items amount total for cookie CVMINICART & balanceAmount for CVREWRDPOINTS cookies
function displayAmountValue(cookieName, keyName)
{
	//alert("IN displayCartItems method");
	var str = "0.00";
	str = getUserCookieValue(cookieName, keyName);
	if (str != null)
	{
		var iDotIndex = str.indexOf(".");
		if (str.length - iDotIndex > 3)
			str = str.substring(0, iDotIndex + 3);
		else if (iDotIndex != -1 && str.length - iDotIndex == 2)
			str = str + "0";
		else if (iDotIndex == -1)
			str = str + ".00";
	}
	else
	{
		str = "0.00";
	}
	
	document.write(str);
}

function getUserCookieValue(cookieName, keyName)
{
 //alert("in getUserCookieValue");
 var cookieValue = getCookie(cookieName);
 //alert("cookieValue="+cookieValue);
  if ( cookieValue == null )
 	return null;
 var  nameDelimiter = "@" ;
 var pairDelimiter = "~~~" ;
 var matchPattern = keyName + pairDelimiter + '(.*?)(' + nameDelimiter +')';	 	
 //alert("match partern = "+matchPattern);
 var results = cookieValue.match ( matchPattern);
 //alert("resutls="+results);
  if ( results )
    return ( unescape ( results[1] ) );
  else
    return null;
}

function getCookie ( cookieName )
{
  var results = document.cookie.match ( cookieName + '=(.*?)(;|$)' );
  if ( results )
    return ( unescape ( results[1] ) );
  else
    return null;
}

function getCurrentMonthYear()
{
	 var dtNow=new Date();
	 var expire_month = document.getElementById("expire_month");
	 var month = dtNow.getMonth();
	 //Fix for HBI-1040
	 expire_month.options[0].selected = true;
}

function setFutureMonthYear()
{
   
   var dtNow=new Date();
   var expire_month = document.getElementById("expire_month");
   var expire_year = document.getElementById("expire_year");
   var currmonth = dtNow.getMonth();
   var curryear = dtNow.getFullYear();
   var monthArr = new Array("01","02","03","04","05","06","07","08","09","10","11","12");
   var monthSelected = 0;
   monthSelected = expire_month.value;
   
    while (expire_month.options.length > 0) {
	   expire_month.options[0] = null;
	}
    
    for (var i=0; i < monthArr.length;++i){

	   addOption(expire_month, monthArr[i], monthArr[i]);
    }
	   	   
   
   //Fix for HBI-1040
  
   if(expire_year.value > curryear && expire_month.options[monthSelected-1] != null && expire_month.options[monthSelected-1] != undefined ){
	    expire_month.options[monthSelected-1].selected = true;
   }else{
	   var tmpSelMonth = monthSelected-1-currmonth;
	   if(tmpSelMonth >= 0 && expire_month.options[tmpSelMonth] != null && expire_month.options[tmpSelMonth] != undefined ){
		   expire_month.options[tmpSelMonth].selected = true;
	   }else{
		   expire_month.options[0].selected = true; 
	   }	   
   }
   
}
function addOption(selectbox,text,value )
{
var optn = document.createElement("OPTION");
optn.text = text;
optn.value = value;
selectbox.options.add(optn);
}



function pageScroll()
{
var timerID = setInterval(function() {
    window.scrollBy(0, -20);

    if( window.pageYOffset <= 20 )
        clearInterval(timerID);
}, 1);

}
