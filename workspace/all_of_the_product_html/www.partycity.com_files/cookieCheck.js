function createCookie(name,value,days)
/*
(C) Copyright MarketLive. 2006. All rights reserved.
MarketLive is a trademark of MarketLive, Inc.
Warning: This computer program is protected by copyright law and international treaties.
Unauthorized reproduction or distribution of this program, or any portion of it, may result
in severe civil and criminal penalties, and will be prosecuted to the maximum extent
possible under the law.
*/

{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) {
			//alert("cookie " + c.substring(nameEQ.length,c.length));
			return c.substring(nameEQ.length,c.length);
		}
	}
	return null;
}

function eraseCookie(name)
{
	createCookie(name,"",-1);
}
// create a cookie and try it to read it back
createCookie('mlCkTst', 'present', 1);
if (readCookie('mlCkTst') != null) {
    // do nothing
    eraseCookie('mlCkTst');
} else {
    // don't redirect if displaying the templated page
    if (location.href.indexOf('ErrorCookies') == -1) {
	    location.href="/jump.do?itemType=ErrorCookies";
	}
}
