function popup(href,width,height,scroll)
	{
	CMSPopup = window.open(href,'CMSPopup','resizable=no,toolbar=no,left=200,top=200,status=no,location=no,height=' + height + ',width=' + width + ',scrollbars=' + scroll);
	};
function NamedPopup(name,href,width,height,scroll)
	{
	name = window.open(href,name,'resizable=no,toolbar=no,left=200,top=200,status=no,location=no,height=' + height + ',width=' + width + ',scrollbars=' + scroll);
	};
function isEmail(str)
	{
	// are regular expressions supported?
	var supported = 0;
	if (window.RegExp)
		{
		var tempStr = "a";
		var tempReg = new RegExp(tempStr);
		if (tempReg.test(tempStr))
			{
			var supported = 1;
			}
		}
	if (supported == 1)
		{
		var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
		var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
		return (!r1.test(str) && r2.test(str));
		}
	else
		{
		return (str.indexOf(".") > 2) && (str.indexOf("@") > 0) && (str.indexOf("@") < 2);
		}
	};

function checkRadio(formfield)
	{
	var i;
	for (i=0;i < formfield.length; ++i)
		{
		if (formfield[i].checked)
			{ 
			return formfield[i].value;
			}
		}
	return (false);
	};
	
function radioCheck(theField,theForm)
	{
	var i;
	formfield = eval(theForm.name + '.' + theField);
	for (i=0;i < formfield.length; ++i)
		{
		if (formfield[i].checked)
			{ 
			return formfield[i].value;
			}
		}
	return (false);
	};
	
function roundOff(value, precision)
	{
        value = "" + value //convert value to string
        precision = parseInt(precision);

        var whole = "" + Math.round(value * Math.pow(10, precision));

        var decPoint = whole.length - precision;

        if(decPoint != 0)
        {
                result = whole.substring(0, decPoint);
                result += ".";
                result += whole.substring(decPoint, whole.length);
        }
        else
        {
                result = whole;
        }
        return result;
	};

function SetCFCookie (name, value)
	{
	var name = name.toUpperCase();
	var path = "/";
	document.cookie = name + "=" + escape (value) +"; path=" + path + ";";
	};
	
function GetCFCookie(name)
	{ 
	var cname = name.toUpperCase() + "="; //the cookie name is given an equal signs after it and assigned as cname
	var dc = document.cookie; //the main document.cookie code that will follow is assigned to dc
	var bl = "";
	if (dc.length > 0)
		{ //here the length of the cookie is checked, if it is above 0 the function continues and if not then it returns null
		begin = dc.indexOf(cname); //here the indexOf() method is used to find the location of the cookie's name and it is assigned to begin
		if (begin != -1)
			{ //if the cookie's name is not found in dc then begin is given a value of -1
			begin += cname.length; //if the name is found begin is increased by the length of the cname
			end = dc.indexOf(";", begin); //the indexOf() method now searches for a semicolon to be given to the variable end
			if (end == -1) end = dc.length; 
			return unescape(dc.substring(begin, end)); //here is where is made sure that the value of the cookie is extracted and returned using the substring() method on dc
			} 
		}
	return bl; 
	};
	
function GetCookie(name)
	{ 
	var cname = name + "="; //the cookie name is given an equal signs after it and assigned as cname
	var dc = document.cookie; //the main document.cookie code that will follow is assigned to dc
	var bl = "";
	if (dc.length > 0)
		{ //here the length of the cookie is checked, if it is above 0 the function continues and if not then it returns null
		begin = dc.indexOf(cname); //here the indexOf() method is used to find the location of the cookie's name and it is assigned to begin
		if (begin != -1)
			{ //if the cookie's name is not found in dc then begin is given a value of -1
			begin += cname.length; //if the name is found begin is increased by the length of the cname
			end = dc.indexOf(";", begin); //the indexOf() method now searches for a semicolon to be given to the variable end
			if (end == -1) end = dc.length; 
			return unescape(dc.substring(begin, end)); //here is where is made sure that the value of the cookie is extracted and returned using the substring() method on dc
			} 
		}
	return bl; 
	}

// Find and replace characters within a string
function Switch(item,OldChar,NewChar)
	{
	var _ONE=0;
	var _ret="";
	var _flag=0;
	var _item=item.split("");
	for(var i=0;i<_item.length;i++)
		{
		if(!_flag&&_item[i]==OldChar)
			{
			_item[i]=NewChar;
			_flag=_ONE;
			}
		_ret+=_item[i];
		}
	return(_ret);
	}

//function newwindow(href)
//	{
//	window.open(href,'newwindow','resizable=yes,toolbar=yes,left=200,top=200,status=yes,location=yes,scrollbars=yes');
//	}

function newwindow(href,winname)
	{
	var re = /[^A-Za-z0-9]/g
	if (!winname)
	{
		var winname = href.replace(re,"");
	}
	else
	{
		winname = winname.replace(re,"");
	}
	window.open(href,winname,'resizable=yes,toolbar=yes,left=200,top=200,status=yes,location=yes,scrollbars=yes');
	}
	
function getCookieVal (offset)
	{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
	endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
	};


function SetCookie (name, value)
	{
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var expires = (2 < argc) ? argv[2] : null;
	var path = (3 < argc) ? argv[3] : null;
	var path = "/";
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;
	document.cookie = name + "=" + escape (value);
	//((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	//((path == null) ? "" : ("; path=" + path)) +
	//((domain == null) ? "" : ("; domain=" + domain)) +
	//((secure == true) ? "; secure" : "");
	};
function checkpop(myurl,width,height)
	{
	var pagelisting=GetCookie("poplist").split(",");
	var popwindow = true;
	for(var i=0;i < pagelisting.length;i++)
		{
		var mypage = pagelisting[i];
		if(myurl == mypage)
			{
			var popwindow = false;
			}
		}
	if(popwindow == true)
		{
		if(GetCookie("poplist").length == 0)
			{
			var setit = myurl;	
			}
		else
			{
			var setit = GetCookie("poplist") + "," + myurl;	
			}
		// set the cookie
		SetCookie("poplist",setit);
		// pop the window
		twin=window.open(myurl,'twin','resizable=no,toolbar=no,status=no,location=no,height='+height+',width='+width+',scrollbars=no');
		}
	}


var version4 = (navigator.appVersion.charAt(0) == "4");
var popupHandle;
function closePopup() {
if(popupHandle != null && !popupHandle.closed) popupHandle.close()
}

// Date Validation scripts
// Declaring valid date character, minimum year and maximum year
	var dtCh= "/";
	var minYear=1899;
	var maxYear=2100;
	
	function isInteger(s){
		var i;
	    for (i = 0; i < s.length; i++){   
	        // Check that current character is number.
	        var c = s.charAt(i);
	        if (((c < "0") || (c > "9"))) return false;
	    }
	    // All characters are numbers.
	    return true;
	}
	
	function stripCharsInBag(s, bag){
		var i;
	    var returnString = "";
	    // Search through string's characters one by one.
	    // If character is not in bag, append to returnString.
	    for (i = 0; i < s.length; i++){   
	        var c = s.charAt(i);
	        if (bag.indexOf(c) == -1) returnString += c;
	    }
	    return returnString;
	}
	
	function daysInFebruary (year){
		// February has 29 days in any year evenly divisible by four,
	    // EXCEPT for centurial years which are not also divisible by 400.
	    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
	}
	function DaysArray(n) {
		for (var i = 1; i <= n; i++) {
			this[i] = 31
			if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
			if (i==2) {this[i] = 29}
	   } 
	   return this
	}
	
	function isDate(dtStr){
		var daysInMonth = DaysArray(12)
		var pos1=dtStr.indexOf(dtCh)
		var pos2=dtStr.indexOf(dtCh,pos1+1)
		var strMonth=dtStr.substring(0,pos1)
		var strDay=dtStr.substring(pos1+1,pos2)
		var strYear=dtStr.substring(pos2+1)
		strYr=strYear
		if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
		if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
		for (var i = 1; i <= 3; i++) {
			if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
		}
		month=parseInt(strMonth)
		day=parseInt(strDay)
		year=parseInt(strYr)
		if (pos1==-1 || pos2==-1){
			return false
		}
		if (strMonth.length<1 || month<1 || month>12){
			return false
		}
		if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
			return false
		}
		if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
			return false
		}
		if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
			return false
		}
	return true
	}
	
// Show the I-Sites Info in the footer
	function showISites()
		{
		OutPutString = '<p class="isites">Developed by Interactive Sites, Inc&trade;. Powered by Hands-On&trade; CMS.</p>';
		document.write(OutPutString);
		};
	function showISitesNOCMS()
		{
		OutPutString = '<p class="isites">Developed by Interactive Sites, Inc&trade;</p>';
		document.write(OutPutString);
		};