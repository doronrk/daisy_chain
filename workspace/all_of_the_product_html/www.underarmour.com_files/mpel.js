MpElDs = {
    "fr.underarmour.com": "fr",
    "underarmour.com": "en",
	"www.underarmour.com": "en"
};
if(MP.getCookie('PRD_E4X')=='CA|CAD'){
if (!RegExp("MP_LANG=" + MpElDs[location.host]).test(document.cookie)) {
    MpElD = "//fr.underarmour.com";
    MpL = navigator.browserLanguage;
    if (!MpL) MpL = navigator.language;
	 var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = MpElD + '/mpel.js?href='+encodeURIComponent(location.href)
                           + '&ref='+encodeURIComponent(document.referrer)
                           + '&lang='+MpL;
                var target = document.getElementsByTagName('script')[0];
                target.parentNode.insertBefore(script, target);
   /* document.write(decodeURIComponent("%3Cscript src='") + MpElD + "/mpel.js?href=" + encodeURIComponent(location.href) + "&ref=" + encodeURIComponent(document.referrer) + "&lang=" + MpL + "' type='text/javascript'" + decodeURIComponent("%3E%3C/script%3E"))*/
};
}