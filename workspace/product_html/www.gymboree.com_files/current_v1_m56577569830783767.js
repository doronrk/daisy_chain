///////////////////////////////////////////////////////////////////

function OpenNamedWin(url, winname, width, height, scroll) {
	var features = 'toolbar=no,location=no,directories=no,status=no,menubar=no,marginwidth=0,marginheight=0,resizable=yes,scrollbars=' + scroll + ',width=' + width + ',height=' + height;
	popup_win(url, winname, features);
}

function OpenWin(url, width, height, scroll) {
	//scroll bar value should be 1 or 0. not true or false.
	if(scroll == 'true') scroll = 1; 
	var features = 'toolbar=no,location=no,directories=no,status=no,menubar=no,marginwidth=0,marginheight=0,resizable=yes,scrollbars=' + scroll + ',width=' + width + ',height=' + height;
	popup_win(url, '', features);
}
	
function dept_band_popup_link(url, popupFeatures) {
	popup_link(url, popupFeatures);
} 

function popup_link(url, popupFeatures) {
	var features = 'toolbar=no,location=no,directories=no,status=no,menubar=no,marginwidth=0,marginheight=0,resizable=yes,' + popupFeatures;
	popup_win(url, '', features);
}

function popup_win(url, name, popupFeatures) {
	var winId = window.open(url, name, 'screenX=0,screenY=0,left=0,top=0,' + popupFeatures);
}
	
//----------------------------------------------------------
// resizeFix()
// Fixes the infamous Netscape 4 resize bug
// call it within <HEAD>   
function resizeFix(){  
	
	if(document.resizeFix.initWidth!=window.innerWidth || document.resizeFix.initHeight!=window.innerHeight) 
		document.location=document.location;  
}  

function netscapeFix(){  
	if(document.layers){  
		if(typeof document.resizeFix=="undefined"){  
			document.resizeFix=new Object();  
			document.resizeFix.initWidth=window.innerWidth;  
			document.resizeFix.initHeight=window.innerHeight;  
		}  
	window.onresize=resizeFix();  
	}  
}

//----------------------------------------------------------
// call netscapeFix();
netscapeFix();

function confirmAndSubmit(field1, field2, form)
{
	var isError = false;

	if((field1.value == null || field1.value.length == 0)
	|| (field2.value == null || field2.value.length == 0))
	{
		alert("Please make sure that the value is entered in " + field1.name + " & " + field2.name);
		isError = true;
	}

	if ((!isError) && (field1.value != field2.value))
	{
		alert (field1.name + " & " + field2.name + " are not same.");
		isError = true;
	}
	else
	{
		form.submit();
	}
	return isError;
}

function checkEmailFormat(strEmail)
{
    var boolValid = false;
    var intAtIndex = -1;
    var intDotIndex = -1;
       
    if(strEmail != null && strEmail !=  "")
    {
       if((intAtIndex = strEmail.indexOf("@")) > -1)
       {
         if((intDotIndex = strEmail.indexOf(".")) > -1) {
               boolValid = true;
		 if (strEmail.lastIndexOf(".") == strEmail.length-1)
			boolValid = false;
         }
       }
    }       
    return boolValid;
}            

function checkDate(inDay, inMon, inYr)
{
	var toDate = new Date();
	var isDayEntered = false;
	var checkDate;
	
	if(inDay == 0)
	{
		checkDate = new Date(inYr, inMon, toDate.getDate());
	}
	else
	{
		checkDate = new Date(inYr, inMon, inDay);
		isDayEntered = true;
	}
	
	if(isDayEntered)
	{
		var diff = (toDate - checkDate);
		if(diff>=0)
		{
			alert("please enter valid date" + checkDate);
			return false;
		}
	}
	else
	{
		var chYear = checkDate.getUTCFullYear();
		var toYear = toDate.getUTCFullYear();
		var sameYear = false;
		
		if(chYear-toYear < 0)
		{
			alert("please enter valid date" + checkDate);
			return false;
		}
		else if(chYear-toYear == 0)
			sameYear = true;
			
		var chMon = checkDate.getUTCMonth();
		var toMon = toDate.getUTCMonth();
	
		if(sameYear && (chMon-toMon<0))
		{
			alert("please enter valid date " + checkDate);
			return false;
		}
	}

	return true;
}

function MM_showHideLayers() { //v3.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function trim(inString) {
	var i=0;
	var len=inString.length;
	for(i=0;i<len;i++) {
		if(inString.charAt(i)==" ")	{
			inString=inString.substring(1,(len-i));
		} else {
			break;
		}
	}
	return inString;
}

function checkName(theName){
	var badChar ="0";
    for (var i = 0; i < theName.length; i++) {
		ch = theName.substring(i, i + 1);
        if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z") || (ch >= "0" && ch <= "9") || (ch == "'") || (ch == ".") || (ch == " ") || (ch == "-")){
			badChar = "0";
		} else {
			return false;
		}
    }
    return true;
}

function checkAddr(theAddr){
	var badAddr ="0";
    for (var i = 0; i < theAddr.length; i++) {
		ch = theAddr.substring(i, i + 1)
		if ((ch == '<') || (ch == '&') || (ch=='\\')){
			badAddr ="1";
			break;
		}
	// Bug # 1262 -START
	if(theAddr.charCodeAt(i)<32 || theAddr.charCodeAt(i)>122 ){
		badAddr = "1";
		break;
	}
	// Bug # 1262 -END
    }
    if (badAddr == "1"){
        return false;
    }
    else{
        return true;
    }
}

function CheckForNumber(beg,end,string){
    for (var i = beg; i < end; i++){
        var c = string.charAt(i)
        c = parseInt(c);
        if (isNaN(c)){
            return false;
        }
    }
    return true;
}

/**
 * Tokenizes the string based on delimiter specified.
 * Returns array of strings
 */ 
function tokenizeString(str, delim) {
	strArr = new Array();
	var n = 0;
	var startIndex = 0;

	while( (endIndex=str.indexOf(delim, startIndex) ) > 0 ) {
		subStr = str.substring(startIndex, endIndex);
		startIndex = endIndex + 1;
		strArr.push(subStr);
		n++;
	}
	subStr = str.substring(startIndex);
	strArr.push(subStr);
	return strArr;
}

function isAlpha(ch) {
	if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')) return true;
	return false;
}

function isDigit(ch) {
	if (ch >= '0' && ch <= '9') return true;
	return false;
}

function checkForSymbol(val){
    for (var i = 0; i < val.length; i++) {
		var c = val.charAt(i);
		if (c == "|" || c == "!" || c == "&"){
			return false;	
		}
	}
	return true;
}

function checkMaxLength(obj, maxLen) {
	if (obj.value.length > maxLen) {
		alert('Please limit your personal message to ' + maxLen + ' characters.');
		obj.focus();
		return false;
	}
	return true;
}

// this is a generic function thats used to replace the given character in the form field
// with another character

function removeChar(field, char1, char2) {		
	var fieldVal = eval("document."+field).value;	
	var fieldNewVal = fieldVal.replace(char1, char2);		
	eval("document."+field).value=fieldNewVal;
	return true;
}

function removeSpaces(field, char1, char2) {
	var fieldVal = eval(field).value;
	var fieldNewVal = fieldVal.replace(char1, char2);
	eval(field).value=fieldNewVal;
	return true;
}

function validateRegEx(fieldArray, checkEmpty, regExprStr){	
	for(var j=0; j < fieldArray.length; j++){	
		if(checkEmpty &&  (fieldArray[j].value == "" || fieldArray[j].value.length == 0) ){
			return j;
		} 
		if( fieldArray[j].value != "" && regExprStr.test(fieldArray[j].value) ) {					
			return j;
		}
	}	
	return -1;
}

function trimSearchSpaces(str) {
	var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	
	for (var i = 0; i < str.length; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(i);
			break;
		}
	}
	
	for (i = str.length - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

function isIOS(){
    var i = 0,
	iOS = false,
	iDevice = ['iPad', 'iPhone', 'iPod'];
	for ( ; i < iDevice.length ; i++ ) {
		if( navigator.platform === iDevice[i] ){ 
			return true; 
		}
	}
	return false;
}
