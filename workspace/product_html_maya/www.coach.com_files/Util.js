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
function isValidEmail_old(strEmail){
	// check if email contains dbcs chars
	if (containsDoubleByte(strEmail)){
		return false;
	}
	
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
}
function isValidEmail(strEmail){
	var errorEmail = '';
	if (strEmail == null || strEmail == '') {
  		errorEmail = '11000';
		return errorEmail;
	}
		
	var str = strEmail;
  	var reg1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)|(^\#)|(^\*)|(^\@)|(^\&)|(^\^)|(%)/; //not valid 
  	var reg2 = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{1,3}|[0-9]{1,3})(\]?)$/; // valid
	var reg3 = /^www/;//not valid
	//var reg4 = /[^0-9](aol|yahoo|msn|hotmail)/;
	var reg4 = /^[0-9][a-zA-Z0-9\-\.]+\@(aol|yahoo|msn|hotmail)/;//not valid
	//As people generally know about some basic admin email addresses, they are not allowed.
	var reg5 = /^webmaster@|^administrator@|^support@|^admin@/; //not valid
	//Regular domain level checks & Country level domain checks
	var reg6 = /(\.aero|\.biz|\.cat|\.com|\.coop|\.edu|\.gov|\.info|\.int|\.jobs|\.mil|\.mobi|\.museum|\.name|\.net|\.org|\.pro|\.tel|\.travel|\.ac|\.ad|\.ae|\.af|\.ag|\.ai|\.al|\.am|\.an|\.ao|\.aq|\.ar|\.as|\.at|\.au|\.aw|\.ax|\.az|\.ba|\.bb|\.bd|\.be|\.bf|\.bg|\.bh|\.bi|\.bj|\.bm|\.bn|\.bo|\.br|\.bs|\.bt|\.bv|\.bw|\.by|\.bz|\.ca|\.cc|\.cd|\.cf|\.cg|\.ch|\.ci|\.ck|\.cl|\.cm|\.cn|\.co|\.cr|\.cu|\.cv|\.cx|\.cy|\.cz|\.de|\.dj|\.dk|\.dm|\.do|\.dz|\.ec|\.ee|\.eg|\.er|\.es|\.et|\.eu|\.fi|\.fj|\.fk|\.fm|\.fo|\.fr|\.ga|\.gb|\.gd|\.ge|\.gf|\.gg|\.gh|\.gi|\.gl|\.gm|\.gn|\.gp|\.gq|\.gr|\.gs|\.gt|\.gu|\.gw|\.gy|\.hk|\.hm|\.hn|\.hr|\.ht|\.hu|\.id|\.ie|\.il|\.im|\.in|\.io|\.iq|\.ir|\.is|\.it|\.je|\.jm|\.jo|\.jp|\.ke|\.kg|\.kh|\.ki|\.km|\.kn|\.kr|\.kw|\.ky|\.kz|\.la|\.lb|\.lc|\.li|\.lk|\.lr|\.ls|\.lt|\.lu|\.lv|\.ly|\.ma|\.mc|\.md|\.mg|\.mh|\.mk|\.ml|\.mm|\.mn|\.mo|\.mp|\.mq|\.mr|\.ms|\.mt|\.mu|\.mv|\.mw|\.mx|\.my|\.mz|\.na|\.nc|\.ne|\.nf|\.ng|\.ni|\.nl|\.no|\.np|\.nr|\.nu|\.nz|\.om|\.pa|\.pe|\.pf|\.pg|\.ph|\.pk|\.pl|\.pm|\.pn|\.pr|\.ps|\.pt|\.pw|\.py|\.qa|\.re|\.ro|\.ru|\.rw|\.sa|\.sb|\.sc|\.sd|\.se|\.sg|\.sh|\.si|\.sj|\.sk|\.sl|\.sm|\.sn|\.so|\.sr|\.st|\.su|\.sv|\.sy|\.sz|\.tc|\.td|\.tf|\.tg|\.th|\.tj|\.tk|\.tl|\.tm|\.tn|\.to|\.tp|\.tr|\.tt|\.tv|\.tw|\.tz|\.ua|\.ug|\.uk|\.um|\.us|\.uy|\.uz|\.va|\.vc|\.ve|\.vg|\.vi|\.vn|\.vu|\.wf|\.ws|\.ye|\.yt|\.yu|\.za|\.zm|\.zw)$/; //valid

  if (!reg1.test(str) && reg2.test(str) &&  !reg3.test(str) && !reg4.test(str.toLowerCase()) && !reg5.test(str.toLowerCase()) && reg6.test(str.toLowerCase())) { 
  		errorEmail = 'true';
    	return errorEmail;
 	} else {
 		errorEmail = '11000';
 		if (reg5.test(str.toLowerCase()))
 			errorEmail = '11010';
 		else if (!reg6.test(str.toLowerCase()))
 			errorEmail = '11011';
		return errorEmail;
	}
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

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function callCretio(pageType, productId, unitCount, unitPrice) {
	
	var scriptVar = 	document.createElement("script");
		scriptVar.type  = "text/javascript";
		
	if(pageType != undefined && pageType == 'PDP') {
		//scriptVar.text  = "var gtm_product_id = '"+productId[0]+"';";		
		gtm_product_id = productId[0];
			//alert("gtm_product_id: "+gtm_product_id);
	(window,document,'script','dataLayer','GTM-55CD');
	
	} else if(pageType == 'CART') {
		gtm_product_id_all = new Array();
		gtm_unit_count_all = new Array();
		gtm_unit_price_all = new Array();
		
		for(var ii=0;ii<productId.length;ii++) {
			gtm_product_id_all.push(productId[ii]);
			gtm_unit_count_all.push(unitCount[ii]);
			gtm_unit_price_all.push(unitPrice[ii]);
		}    
		(window,document,'script','dataLayer','GTM-55CD');
		/*
		scriptVar.text  = "var gtm_product_id_all = ['"+productId.join("','")+"'];";		
		scriptVar.text  += "var gtm_unit_count_all = ["+unitCount.join(",")+"];";
		scriptVar.text  += "var gtm_unit_price_all = ["+unitPrice.join(",")+"];";
		*/
			//alert("gtm_product_id_all: "+gtm_product_id_all);		
	}
	//$('head').append(scriptVar);		
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function createRegisterRefererCookie() {
	createRegisterRefererCookie(window.location); 
}

function createRegisterRefererCookie(value) {
	value = value + '';
	if (value != null && value.match('OrderItemDisplay') != null) {
		var indexValue = value.indexOf('?');
		value = value.substring(0, indexValue);
		//value = "https://localhost/online/store/OrderItemDisplay";
	}
	if (value != null 
		&& value.match('LogonForm') == null 
		&& value.match('UserRegistrationForm') == null 
		&& value.match('BRForgotUserNameView') == null 
		&& value.match('BRForgotPasswordView') == null
		&& value.match('StoreForgotUserNameCmd') == null 
		&& value.match('ResetPassword') == null){
		createCookie('borders.registerReferer', value, 1);
	}
}

function readRegisterRefererCookie() {
	return readCookie('borders.registerReferer');
}

//dreamweaver's never fail find object snippet
function findObj(theObj, theDoc){
	var p, i, foundObj;
	
	if(!theDoc) theDoc = document;
	if( (p = theObj.indexOf("?")) > 0 && parent.frames.length){
		theDoc = parent.frames[theObj.substring(p+1)].document;
		theObj = theObj.substring(0,p);
	}

	if(!(foundObj = theDoc[theObj]) && theDoc.all) foundObj = theDoc.all[theObj];

	for (i=0; !foundObj && i < theDoc.forms.length; i++) 
		foundObj = theDoc.forms[i][theObj];

	for(i=0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++) 
		foundObj = findObj(theObj,theDoc.layers[i].document);

	if(!foundObj && document.getElementById) foundObj = document.getElementById(theObj);

	return foundObj;
}

function openWindowSized(url, width, height)
{
	op = window.open(url,"window","toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resize=0,width="+width+",height="+height);
}

function openWindow(url)
{
	op = window.open(url,"window","toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resize=0,width=516,height=550");
}

function isInt(event)
{
  var Key = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
  if(Key==8  || Key==0 || (Key >= 48 && Key <=57)) return true;
  else return false;
}

function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}

	//Function used in borders rewards to trim the blanks in the begining and the end of strings
	function Trim(str)
	{ 
	    while(str.charAt(0) == (" ") )
		  {  str = str.substring(1);
		  }
		while(str.charAt(str.length-1) == " " )
		  {  str = str.substring(0,str.length-1);
		  }
		return str;
	}

	
//Function used to clear children of an object
function clearChildren(obj){
	while(obj.hasChildNodes()){obj.removeChild(obj.lastChild);}
	return obj;
}


//Function used to check max length and display message.
//Used as of 10/2/07 on sharePage.jsp and shareWishlist.jsp
function checkMaxLength(obj, maxLength, errorDivName, message){
	var errorsDiv = findObj(errorDivName);

	if(obj.value.length > maxLength){
		//remove previous children if any
		errorsDiv = clearChildren(errorsDiv);

		var ulTag = document.createElement("ul");
		var liTag = document.createElement("li");
		liTag.innerHTML = message;
		ulTag.appendChild(liTag);
		errorsDiv.appendChild(ulTag);
		return false;
	}
	errorsDiv.innerHTML = '';
	return true;
}
	
//////////////////////////////////////////////////////////
// Error Handling functions in JSP
//////////////////////////////////////////////////////////
	
function showError(errorText, errorTextId)
{
	var element = getErrorElement(errorTextId);
	if (element)
	{
		element.innerHTML = errorText;
	}
	showHideErrorText("visible", errorTextId);
}

function clearError(errorText, errorTextId)
{
	showHideErrorText("hidden", errorTextId);
}

function showHideErrorText(visibility, errorTextId)
{

	var element = getErrorElement(errorTextId);
	if (element) {
		element.style.visibility = visibility; //'visible';

	}
}

function getErrorElement(errorTextId)
{
	var element;
	var elementId;
	if(typeof(errorTextId)=='undefined') {
		elementId = 'error_display_text';
	} else {
		elementId = errorTextId;
	}
	if (document.getElementById) {
	// IE 5.5+, NS6+, Opera 6+
		element = document.getElementById(elementId);
	} else if (document.layers) {
	// NS4
		element = document.layers[elementId];
	} else if (document.all) {
	// IE < 5.5, Opera 5(?)
		element = document.all(elementId);
	}
	return element;
}

//////////////////////////////////////////////////////////
// This function is used to check if the CC number is valid
// according to the rules for each type.
//////////////////////////////////////////////////////////
function isValidCreditCard(type, ccnum) {
   if (type == "AMEX") {
      // American Express: length 15, prefix 34 or 37.
      var re = /^3[4,7]\d{13}$/;
   } else if (type == "DISCOVER") {
      // Discover: length 16, prefix 6011.
      var re = /^6011\d{12}$/;
   } else if (type == "MASTER") {
      // Mastercard: length 16, prefix 51-55.
      var re = /^5[1-5]\d{14}$/;
   } else if (type == "VISA") {
      // Visa: length 13 or 16, prefix 4.
      var re = /^4(\d{12}|\d{15})$/;
   } else {
      return true;
   }
 
   if (re.test(ccnum)){
    return true;
   } else {
    return false;}
 
}

///////////////////////////////////////////////////////////////////////////////
// This function is used to check if the CVV count is valid for a given CC type 
// e.g. "AMEX" is 4, "DISCOVER" is 3, "MASTER" is 3 and "VISA" is 3
///////////////////////////////////////////////////////////////////////////////
function isValidCVVCode(ccType, cvvCount) {
	if ((ccType == "AMEX" && cvvCount == 4) || ((ccType == "DISCOVER" || ccType == "MASTER" || ccType == "VISA") && (cvvCount == 3)) ) {
		return true;
	} else {
		return false;
	}
}

//Changes start-WCS 304
    function getUrl(url)
    {
    	var splitUrl='';
		var len = 500;
		if(url!=null){
			len = url.length;
		}
    	for (i=0;i<=len;i++)
    	{
    		splitUrl=splitUrl+url.charAt(i);
    		//if(i==40 || i==80 || i==120 || i==160 || i==200 || i==235|| i=275)
    		if(i>0 && i%40 == 0)
    		{
    			splitUrl=splitUrl+"<br>";
    		}
    		
    	}
    	return splitUrl;
    	
    }
//Changes end -WCS 304

//Changes start-WCS 935
function isPdcOpen()
{
	//if(document.getElementById('draggablePopUpID'))
	//{
		//document.getElementById('closeImg').click();
	//}
}
//Changes end -WCS 935

//Changes start-WCS 1171
function changeURL(productID)
{

    var onlyDigits       = /^\s*\d+\s*$/;
	if(location.hash !='' && String(location.hash.substring(1)).search (onlyDigits) == -1)
	{
	 if(location.hash.indexOf('&pdc=')!=-1)
	     location.hash =location.hash.substring(0,location.hash.indexOf('&pdc='));
	     location.hash = location.hash+"&pdc="+ productID;     
	}
	else
	{
	  location.hash = productID;
	}
}
//Changes end -WCS 1171

//Changes start-WCS 2098
function getTitle()
{
	return document.title;
}

function setTitle(pageTitleNoHash)
{
	parent.window.focus();// set the focus from PDC to parent window in IE
	parent.window.document.title = pageTitleNoHash;
}
//Changes end -WCS 2098

// Center a popup DIV in the middle of browser viewport
(function($){
     $.fn.extend({
          center: function (options) {
               var options =  $.extend({ // Default values
                    inside:window, // element, center into window
                    transition: 0, // millisecond, transition time
                    minX:142, // pixel, minimum left element value. Left nav width is included
                    minY:0, // pixel, minimum top element value
                    withScrolling:true, // booleen, take care of the scrollbar (scrollTop)
                    vertical:true, // booleen, center vertical
                    horizontal:true // booleen, center horizontal
               }, options);
               return this.each(function() {
                    var props = {position:'absolute'};
                    if (options.vertical) {
                         var top = ($(options.inside).height() - $(this).outerHeight()) / 2;
                         if (options.withScrolling) top += $(options.inside).scrollTop() || 0;
                         top = (top > options.minY ? top : options.minY);
						 if ($('#topNavBar') != null) top -= 100; // Top header height is substracted
                         $.extend(props, {top: top+'px'});
                    }
                    if (options.horizontal) {
                          var left = ($(options.inside).width() - $(this).outerWidth()) / 2;
                          if (options.withScrolling) left += $(options.inside).scrollLeft() || 0;
                          left = (left > options.minX ? left : options.minX);
                          $.extend(props, {left: left+'px'});
                    }
                    if (options.transition > 0) $(this).animate(props, options.transition);
                    else $(this).css(props);
                    return $(this);
               });
          }
     });
})(jQuery);

function isFlashPluginInstalled()
{
	var MM_FlashCanPlay = false;
	if (swfobject.hasFlashPlayerVersion("6.0.0")) {
		//alert("You have the minimum required flash version (or newer)");
		MM_FlashCanPlay = true;
	}
	return 	MM_FlashCanPlay;
}
// Clear the promo error message from paymentInfoPanel
function clearPromoErrorMsg()
{
	var fMsgLabel = $('.paymentPromoMessageError');
	var promoMessageErrorElement = $('.promoMessageError');
	var errorText;
	if (jQuery.browser.msie)
	{
		errorText = promoMessageErrorElement[0].innerText;
	}
	else
	{
		errorText = promoMessageErrorElement[0].textContent;
	}
	if (errorText == "" && fMsgLabel != null) {	
		fMsgLabel.empty();
	}
}

// WCS-1474 Begin
var productJSONObjects = new Object();
function ignoreProductLinks()
{
	return false;
}
// WCS-1474 End

// WCS-2109 & WCS-2350 Begin - Close thickbox/mens popup on Esc/clicking.
//WCS-4189 drop is getting closed when product is added from My Account page
jQuery(function($){
  $('body').click(function(e){
    var clickedOn = $(e.target);
	if ($('#topNavBar').length > 0 && !clickedOn.andSelf().is('a')){
				closeDivLayer('divCon');
	}
	else if ($("#add-to-bag-overlay").dialog("isOpen") &&
			!clickedOn.parents().andSelf().is('#add-to-bag-overlay') &&
			!clickedOn.parents().andSelf().is('div.prdRemoveBtn') &&
			!clickedOn.parents().andSelf().is('#pdpAddToCartLink') &&
			!clickedOn.parents().andSelf().is('.wishlistAddToShoppingBag')){
		$("#add-to-bag-overlay").dialog("close");
	}
	else{
		if ($('#TB_window').length > 0 && !clickedOn.parents().is('table.myOrdersGrid')
		&& !((clickedOn[0] != $('div.checkGCBalance')[0]) || (clickedOn[0] != $('div.checkGCBalance')[1]) )&& !clickedOn.parents().andSelf().is('#modalWrapper')
		&& !clickedOn.parents().andSelf().is('img[src*=http://maps.gstatic.com/mapfiles/mv/imgs8.png]')
		&& !clickedOn.parents().is('div.checkoutError')
		&& !clickedOn.parents().is('#order_confirm_padding')){
			tb_remove();
		}
    }
});
});
$(document).keypress(function(e){
    // Enable esc
    if (e.keyCode == 27) {
		if ($('#topNavBar').length > 0){
			closeDivLayer('divCon');
		}
		else{
			tb_remove();
		}
    }
});
// WCS-2109 & WCS-2350 End

//Added for WCS - 4544
function formatPrice(number) {
		//	var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
		var DecimalSeparator = '.';
		var AmountWithCommas = number.toLocaleString();
		var arParts = String(AmountWithCommas).split(DecimalSeparator);
		var intPart = arParts[0];

		return  intPart;
	}


function showToolTip(productDescription ,price, productId, fPDCCount, theEvent,relatedTarget, currencySymbol ){

			if($(".popup_messaging_wrapper_swatch"))
				$(".popup_messaging_wrapper_swatch").remove();
				
			var pos ;
			var pos = $('#crossSell_'+fPDCCount+'_'+productId).offset();

			var xOffset = 15;
			var yOffset = 25;
			
			var top = pos.top;
			var left = pos.left;

			var productDescription = productDescription;
			var shortPrice = price*.01;
			shortPrice = formatPrice(shortPrice);
			var price = currencySymbol+shortPrice;
		//	var price = currencySymbol+price*.01;
			
			
			
	    	$("body").append("<div class='popup_messaging_wrapper_swatch'><div class='popupContent'><div class='content_btm'><div class='content_top'><div class='content'><span class='productName'>"+productDescription+"</span><span class='productSpacer'>  </span><span class='productPrice'>"+price+"</span></div></div></div></div></div>");
			$(".popup_messaging_wrapper_swatch")
			.css("top",(top - yOffset) + "px")
			.css("left",(left + xOffset) + "px")
			.css("position","absolute")	
			.css("z-index","10002")
			.css("display","block");			

			$('#crossSell_'+fPDCCount+'_'+productId).mousemove(function(e){
				$(".popup_messaging_wrapper_swatch")
				.css("top",(e.pageY - xOffset) + "px")
				.css("left",(e.pageX + yOffset) + "px");
				
			});	
			
			$('#crossSell_'+fPDCCount+'_'+productId).mouseout(function(event){
				if(event.relatedTarget.innerHTML){
					var htmlCode = event.relatedTarget.innerHTML;
					if (!(htmlCode.indexOf("productPrice") > -1 || htmlCode.indexOf("content") > -1  || htmlCode == '' || htmlCode.indexOf("productName") > -1 || htmlCode.indexOf(productDescription) == 0 || htmlCode == productDescription )){
							$(".popup_messaging_wrapper_swatch").remove();
						}
					}
			});	
			
			$(".popup_messaging_wrapper_swatch").mouseout(function(e){
				$(".popup_messaging_wrapper_swatch").remove();
			});
			
			$(".popup_messaging_wrapper_swatch").click(function(event) {
  					$(".popup_messaging_wrapper_swatch").remove();
			});
						
}

function removeToolTip()
{ 
      $(".popup_messaging_wrapper_swatch").remove();
}

function closeToolTip(event)
{ 
      
       /*if(event.nativeEvent.relatedTarget){
       		var htmlCode = event.nativeEvent.relatedTarget.outerHTML;
	        if (!(htmlCode.indexOf("content") > -1  || htmlCode == '' || htmlCode.indexOf("productName") > -1)){
	        	$(".popup_messaging_wrapper_swatch").remove();
		    }
       }*/
       
}
function addFlyout(id) {
	if("ontouchstart" in document.documentElement) {
		if ($("#"+id).length > 0) {
			var flyout = new s7js.flyout.AdvancedFlyout();
			flyout.setTargetId(id);
			flyout.createStaticImage();
			var url = "";
			$("body").find("#"+id).each(function () {
				flyout.staticImageContainer = $(this)[0];
				url = $(this).find("img").attr("src");
				if(null != url && "" != url) {
					flyout.createFlyoutView();
					flyout.flyoutView.setImageUrl(url);
					flyout.createFlyoutFrame();
				}
				$(this).bind('mouseenter touchstart', function() {
					flyout.flyoutView.setImageUrl('/wcsstore/Coach_US/images/Coach-Empty.gif');
					url = $(this).find("img").attr("src");
					if(null != url && "" != url) {
						flyout.flyoutView.setImageUrl(url);
					}
				});
			});
		}
	}
}
 
function stringify(obj) {         
	if (window.JSON) {
		return JSON.stringify(obj);
	}

	var t = typeof (obj);
	if (t != "object" || obj === null) {
		// simple data type
		if (t == "string") obj = '"' + obj + '"';

		return String(obj);
	} else {
		// recurse array or object
		var n, v, json = [], arr = (obj && obj.constructor == Array);

		for (n in obj) {
			v = obj[n];
			t = typeof(v);
			if (obj.hasOwnProperty(n)) {
				if (t == "string") {
					v = '"' + v + '"';
				} else if (t == "object" && v !== null){
					v = jQuery.stringify(v);
				}

				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
		}

		return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	}
}

function replaceStringPattern(stringTemplate,index,valueToReplace)
{
	var pattern = "\\{" + index + "\\}";
	var re = new RegExp(pattern, "g");
	return	stringTemplate.replace(re, valueToReplace);
}

//Redirect links to Product Details page.
function redirectToPDP(url)
{
	document.location.assign(url);
}

//Redirect links to Product Details page.
function redirectToCheckout()
{
    //added omniture for wcs-6379
    var s = window.s;
      s.linkTrackVars="events";
      s.events="scView";
      s.pageName="Cart View";
      s.prop18="UN2";
      s.t();
    
    
	var baseURL = "http://" + location.host + "/online/handbags/OrderCalculate?storeId="+storeId+"&catalogId="+catalogId+"&langId=-1&calculationUsageId=-1&calculationUsageId=-7&orderId=.&URL=CheckoutView";
	document.location.assign(baseURL);
}

function  isAlphaNumeric( stringVal){
    if( /[^a-zA-Z0-9]/.test( stringVal ) ) {
       return false;
    }
    return true;
}

function  isCharacterEntered( event){
  var Key = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
  if ( isGenericChar(Key))
	return true;
  if(Key==8  || Key==0 || (Key >= 65 && Key <=90) || (Key >= 112 && Key <=122)) 
		return true;
  else 
		return false;

}

function isGenericChar(key)
{
	if ( key == 18 || key == 8 || key == 17 || key == 46 || key == 40 || key == 35 || key == 13 || key == 27 || key == 36 || 
			key == 37 || key == 34  || key == 39  || key == 16  || key == 9  || key == 38   )
		return true;
	return false;
}

function getQueryParamValue( name ){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( window.location.href ); 
	 if( results == null )    
	 	return "";  
	else    
		return results[1];
}

function clearCookie(name){
    var domain = domain || document.domain;
    var path = path || "/";
    document.cookie = name + "=; expires=" + +new Date + ";" ;
};

function changeSearchBoxBG( value )
{
      if(value == true)
      {
            $('.searchPanelHeader .searchPanelHeaderContent .searchContent').css('background','none repeat scroll 0 0 #FFF');
            $('.searchPanelHeader .searchPanelHeaderContent .searchContent').css('border','1px solid #000');
            $('.searchPanelHeader .searchPanelHeaderContent .searchContent input').css('color','#000');
            $('.searchPanelHeader .searchPanelHeaderContent .searchContent input').css('background-color','#FFF');
	    $('.searchPanelButton').css('background','url("/wcsstore/Coach_US/images/nav-icons.png") no-repeat scroll -59px 53% transparent');
 	    $('.searchPanelHeader').css('background-color','#FFF');

      }
      else
      {
            $('.searchPanelHeader .searchPanelHeaderContent .searchContent').css('background','none repeat scroll 0 0 #000');
            $('.searchPanelHeader .searchPanelHeaderContent .searchContent').css('border','1px solid #FFF');
            $('.searchPanelHeader .searchPanelHeaderContent .searchContent input').css('color','#FFF');
            $('.searchPanelHeader .searchPanelHeaderContent .searchContent input').css('background-color','#000');
	    $('.searchPanelButton').css('background','url("/wcsstore/Coach_US/images/nav-icons.png") no-repeat scroll -80px 53% transparent');
      	    $('.searchPanelHeader').css('background-color','#000');
      }
}
function convertURIKeyword(value) {
	if (value == null) {
		return "";
	}
	var re = new RegExp('[\']', "g");
	value = value.replace(re, '');
	value = $.trim(value);
	re = new RegExp('[^a-zA-Z0-9_]', "g");
	value = value.replace(re, '_').toLowerCase();
	//while ( value.indexOf("__") !=  -1)
	value = value.replace(/__/g,"_");
	if(value.lastIndexOf("_") == value.length-1){
		value = value.substring(0,value.length-1);
	}
    return value;
}

function callChromeSelectToUpperCase()
{
	$(".searchPanel .popupContent .modalContent .searchCategories > option").each(function() {
	$(this).text($(this).text().toUpperCase());
	});

	$(".searchPanel .popupContent .modalContent .searchColors > option").each(function() {
	$(this).text($(this).text().toUpperCase());
	});

	$(".searchPanel .popupContent .modalContent .searchPrices > option").each(function() {
	$(this).text($(this).text().toUpperCase());
	});
	
}

function disableCopyPaste(disableCP) {
    $('.'+disableCP).bind('copy paste autocomplete', function (e) {
       e.preventDefault();
    });
    $('.'+disableCP).attr('autocomplete', 'off');
  }

 //Footer resize for IE8 and below 
 function footerResize() {  
 //if ($.browser.msie && $.browser.version<9){     
		if ( $(window).width() < 1500 ) {  
			$('#footer_social_wrapper').addClass('ie8_footer');  

		}  
		else {  
			$('#footer_social_wrapper').removeClass('ie8_footer');  
		} 
		if(navigator.userAgent.indexOf("MSIE 8.0") != -1){
			if($(window).width()<=768)
				{

				$("#shipping_free").css("max-width","200px");
				$("#shipping_free").css("margin-bottom","5px");
				//$("#shipping_free").css("margin-top","5px");
				} 
			else
				{
				$("#shipping_free").css("max-width","512px");
				$("#shipping_free").css("margin-top","11px");
				$("#shipping_free").css("margin-bottom","0px");
				}
		}

    //}  
}
function updateErrMessage(id) {
	$('#'+id).removeClass('wishListCartSizeErrMsgDisabled');
	$('#'+id).addClass('wishListCartSizeErrMsgEnabled');	
}  
function getCartItemsCount() {
	//alert("mcart.vars.mCartQty: "+retrieveLineItems());
	return retrieveLineItems();
}
function addCartLimitErrorMessage() {
	
	if($('#storePickup').css('display') == 'block' && $('#pdpSavePick').length > 0) {
		//alert('111');
		$('#wspCartSizeErrMsgId').removeClass('wspCartSizeErrMsgDisabled');
		$('#wspCartSizeErrMsgId').addClass('wspCartSizeErrMsgEnabled');	
	} else if($('#pdpAddToCartLink').length > 0 || $('#add_to_bag_id').length > 0) {
		//alert('2222');
		$('#pdpCartSizeErrMsgId').removeClass('pdpCartSizeErrMsgDisabled');
		$('#pdpCartSizeErrMsgId').addClass('pdpCartSizeErrMsgEnabled');	
	}
	
	disablePdpButton();
}
function removeCartLimitErrorMessage() {
	if ($('#pdpCartSizeErrMsgId').hasClass('pdpCartSizeErrMsgEnabled')) {
		$('#pdpCartSizeErrMsgId').removeClass('pdpCartSizeErrMsgEnabled');
		$('#pdpCartSizeErrMsgId').addClass('pdpCartSizeErrMsgDisabled');
	} else if ($('#wspCartSizeErrMsgId').hasClass('wspCartSizeErrMsgEnabled')) {
		$('#wspCartSizeErrMsgId').removeClass('wspCartSizeErrMsgEnabled');
		$('#wspCartSizeErrMsgId').addClass('wspCartSizeErrMsgDisabled');	
	}
}

function disablePdpButton() {
	if($('#storePickup').css('display') == 'block' && $('#pdpSavePick').length > 0) {
		$('#pdpSavePick').removeClass('pdpDarkButton');
		$('#pdpSavePick').addClass('pdpDisableButton');	
	}else if($('#pdpAddToCartLink').length > 0) { // checking presence of add to cart button on PDP page
		$('#pdpAddToCartLink').removeClass('pdpDarkButton');
		$('#pdpAddToCartLink').addClass('pdpDisableButton');
	} else if($('#add_to_bag_id').length > 0) {
		$("#add_to_bag_id").attr("src","/wcsstore/Coach_US/images/my_account/wishlist/btn_add_to_shopping_bag_grey.gif");
	} 
}

function enablePdpButton() {
	if($('#storePickup').css('display') == 'block' && $('#pdpSavePick').length > 0) {
		if ($('#pdpSavePick').hasClass('pdpDisableButton')) {
			$('#pdpSavePick').removeClass('pdpDisableButton');
			$('#pdpSavePick').addClass('pdpDarkButton');
		}
		if ($('#pdpAddToCartLink').hasClass('pdpDisableButton')) {
			$('#pdpAddToCartLink').removeClass('pdpDisableButton');
			$('#pdpAddToCartLink').addClass('pdpDarkButton');
		}
	} else if($('#pdpAddToCartLink').length > 0) { // checking presence of add to cart button on PDP page
		if ($('#pdpAddToCartLink').hasClass('pdpDisableButton')) {
			$('#pdpAddToCartLink').removeClass('pdpDisableButton');
			$('#pdpAddToCartLink').addClass('pdpDarkButton');
		}
		if ($('#pdpSavePick').hasClass('pdpDisableButton')) {
			$('#pdpSavePick').removeClass('pdpDisableButton');
			$('#pdpSavePick').addClass('pdpDarkButton');
		}
	} else if($('#add_to_bag_id').length > 0) {
		$("#add_to_bag_id").attr("src","/wcsstore/Coach_US/images/buttons/btn_add_to_shopping_bag.gif");
	}
}
function giftTextAreaWrap(cols,rows,element,paste) {
	var lines = $(element).val().split("\n");
	 if(paste=="key"){ 
        var code = this.charCode || this.keyCode; 
        }   

	if( document.selection ){// Check for IE to find selection of selected line text
		// The current selection
		var range = document.selection.createRange();
		// We'll use this as a 'dummy'
		var stored_range = range.duplicate();
		// Select all text
		stored_range.moveToElementText( element );
		// Now move 'dummy' end point to end point of original range
		stored_range.setEndPoint( 'EndToEnd', range );
		// Now we can calculate start and end points
		element.selectionStart = stored_range.text.length - range.text.length;
		//element.selectionEnd = element.selectionStart + range.text.length;
	}

	var lineIndex = element.value.substr(0, element.selectionStart).split("\n").length - 1;

	for (var i = 0; i < lines.length; i++) {
		if (lines[i].length <= cols) continue;
		var j = 0; space = cols;
		while (j++ <= cols) {
			if (lines[i].charAt(j) === " ") space = j;
		}
		lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || "");
		lines[i] = lines[i].substring(0, space);
	}
	//console.log(element.value.split("\n")[lineIndex]);
	if(paste=="key"){ 
	if ((element.value.split("\n")[lineIndex].length > cols && code != 8
		&& code != 33 && code != 34 && code != 35 && code != 36 && code != 37
		&& code != 38 && code != 39 && code != 40 ) || code == 13) {//IE Bug fixed
		$(element).val(lines.slice(0, rows).join("\n"));
	}
	}
	else if(paste=="mouse"){ 
        $(element).val(lines.slice(0, rows).join("\n")); 
    } 
	
}

$(window).resize(footerResize);

// Custom List Box control for Shipping drop down
function setListBox(eType, eId) {
	if (eType == "onLoad" && eId == "shipListBoxID") {
		$('#shipListBoxID').selectric({
			onChange: function(){
				if ($.browser.msie) {
					var shipId = $('#shipListBoxID').find('option:selected').attr('value');
					processShipValidation(shipId);//GWT call to validate shipping.
				}
			}
		});
	} else {
		if (eType == "fireEvent" || (eType == "onChange"
			&& (eId == "addressBookListBoxID" || eId == "stateListBoxID"
			|| eId == "countryListBoxID"))) {
				$('#shipListBoxID').selectric('refresh');
		}
	}
}