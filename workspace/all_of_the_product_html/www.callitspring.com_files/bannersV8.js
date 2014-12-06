
var today = new Date();
var zero_date = new Date(0,0,0);
today.setTime(today.getTime() - zero_date.getTime());
var cookie_expire_date = new Date(today.getTime() + (8 * 7 * 86400000));

function Set_Cookie(cookieName,value,expires,path,domain,secure) {

	document.cookie = _bannerCookieName + ' = ' + passvalue + '; path = /';

	/*
	var cookieString = _bannerCookieName + "=" +escape(value) +
	( (expires) ? ";expires=" + expires.toGMTString() : "") +
	( (path) ? ";path=" + path : "") +
	( (domain) ? ";domain=" + domain : "") +
	( (secure) ? ";secure" : "");
	document.cookie = cookieString;
	* */
}

function Get_Cookie(cookieName) {
	var start = document.cookie.indexOf(cookieName +"=");
	var len = start+ cookieName.length+1;
	if ((!start) && (cookieName != document.cookie.substring(0, cookieName.length))) return null;
	if (start == -1) return null;
	var end = document.cookie.indexOf(";",len);
	if (end == -1) end = document.cookie.length;
	return unescape(document.cookie.substring(len,end));
}


function Append_Value(theCookieName,bannerId,actionType)
{
	setValue = new Array();
	setValue[0]	= _storeId;
	setValue[1] = bannerId;
	setValue[2] = getActualDateTime();
	setValue[3] = actionType;

	if(document.cookie.indexOf(theCookieName+'=')>=0)
	{
		tempVal = Get_Cookie(theCookieName.toUpperCase());
		splitValues = (tempVal == '')?'':'_';
		passvalue = tempVal + splitValues + setValue.join(".");
	}
	else
	{
		passvalue = setValue.join(".");
	}

	Set_Cookie({cookieName:theCookieName, value:passvalue, expires:cookie_expire_date,path:'/'});
}

function getActualDateTime()
{
	return parseInt(new Date().getTime().toString().substring(0, 10)) - 18000;
}

function resetCookieValue(cookieName)
{
	Set_Cookie({cookieName:cookieName, value:'', expires:cookie_expire_date,path:'/'});
}

function checkCookieExpiration()
{
	myCookie = Get_Cookie(_bannerCookieName);

	if(myCookie != null && myCookie != '')
	{
		splitCookie = myCookie.split("_");
		firstCookie = splitCookie[0];

		splitFirstCookie = firstCookie.split(".");

		firstStoreId = splitFirstCookie[0];
		firstCookieId = splitFirstCookie[1];
		firstCookieTimestamp = splitFirstCookie[2];
		firstCookieType = splitFirstCookie[3];

		now = getActualDateTime();

		if((now - firstCookieTimestamp) > _sendToDatabaseTime)
		{
			DWREngine._execute(_cfBannerModuleV2, null, 'dumpCookieToDatabase', myCookie, _bannerCookieName, checkCookieForDatabaseInsert_return);
		}
	}
}

function checkCookieForDatabaseInsert_return(result){}


function onBannerClick(bannerId,url,target,trackingType)
{
	target = (!target)?"":target;
	trackingType = (!trackingType)?'noTrack':trackingType;

	if(trackingType == 'cookie')
	{
		Append_Value(_bannerCookieName,bannerId,"C");
		checkCookieExpiration();
	}
	else if(trackingType == 'db')
	{
		trackBannerDb(bannerId,"C");
	}

	if(target == "")
	{
		window.location.href = url;
	}
	else
	{
		window.open(url);
	}
}

function null_Return(){};

function trackBannerDb(bid,type)
{
	DWREngine._execute(_cfBannerModuleV8, null, 'trackBannerDb', bid, type, null_Return);
}
