MpElDs =
{
	"es.lenscrafters.com": "es",
	"www.lenscrafters.com": "en",
	"lenscrafters.com": "en",
	"fr.lenscrafters.ca": "fr",
	"www.lenscrafters.ca": "en",
	"lenscrafters.ca": "en"
};
if (!RegExp("MP_LANG=" + MpElDs[location.host]).test(document.cookie))
{
	if (location.host.toString().indexOf('lenscrafters.com') != -1) {
       MpElD = "//es.lenscrafters.com";
    } 
	if (location.host.toString().indexOf('lenscrafters.ca') != -1)  {
       MpElD = "//fr.lenscrafters.ca";
    }
	MpL = navigator.browserLanguage;
	if (!MpL) MpL = navigator.language;
	document.write(decodeURIComponent("%3Cscript src='") + MpElD + "/mpel.js?href=" + encodeURIComponent(location.href) + "&ref=" + encodeURIComponent(document.referrer) + "&lang=" + MpL + "' type='text/javascript'" + decodeURIComponent("%3E%3C/script%3E"))
};