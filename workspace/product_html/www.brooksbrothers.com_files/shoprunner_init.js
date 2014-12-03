var _shoprunner_com = new Object();
(function(){
    /* -----------------------------------------
         * SR Configuration
        ----------------------------------------- */

    _shoprunner_com.version = 2.2;
    _shoprunner_com.enabled = true;
    _shoprunner_com.retailerID = 'BROOKS';
    _shoprunner_com.loginValidationURL = '';

    var envID = app.shopRunnerEnvironmentID;
    if(!app.shopRunnerEnvironmentID || 0 === app.shopRunnerEnvironmentID.length){
    	if(app.constants.INSTANCE_TYPE==0){		
    		envID=2;
    	}
    	if(app.constants.INSTANCE_TYPE==2){
    		envID=0;
    	}
    }
    if(app.constants.INSTANCE_TYPE==0){		
		envID=2;
	}
    /*
         * 0 - Development
         * 1 - Staging
         * 2 - Production
         */
    _shoprunner_com.environmentID = envID;
    _shoprunner_com.sendOrderConfirm = true;
    _shoprunner_com.onLoadCallCustomFunction = "";

    /* ----------------------------------------
         * PayRunner Configuration - Change these values only if your site is PayRunner enabled. If you are not sure, leave them as they are.
        ---------------------------------------- */
    _shoprunner_com.checkout = new Object();
    _shoprunner_com.checkout.enabled = false;
    _shoprunner_com.checkout.singleProductBuyNowEnabled = false;
    _shoprunner_com.checkout.cartBuyNowEnabled = false;
    _shoprunner_com.checkout.partnerAPIEndPoint = '';

    /* -------------------------------------- */
    /* DO NOT MODIFY ANYTHING BELOW THIS LINE */
    /* -------------------------------------- */
_shoprunner_com.prefix=window.parent.document.location.protocol+"//";var sr_browser$={};sr_browser$.getBrowser=new function(){var e=["iPhone","iPod","Android","BlackBerry","Windows Mobile","Symbian","webOS","Kindle"],b;var c=function(l){for(var h=0;h<l.length;h++){var j=l[h].string;var k=l[h].prop;b=l[h].versionSearch||l[h].identity;if(j){if(j.indexOf(l[h].subString)!=-1){return l[h].identity}}else{if(k){return l[h].identity}}}};var a=function(i){var h=i.indexOf(b);if(h==-1){return}return parseFloat(i.substring(h+b.length+1))};var g=[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Android",identity:"Android"},{string:navigator.userAgent,subString:"Kindle",identity:"Kindle"},{string:navigator.userAgent,subString:"BlackBerry",identity:"BlackBerry"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"}];var f=[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone"},{string:navigator.userAgent,subString:"iPad",identity:"iPad"},{string:navigator.userAgent,subString:"iPod",identity:"iPod"},{string:navigator.userAgent,subString:"Android",identity:"Android"},{string:navigator.userAgent,subString:"Windows Phone OS",identity:"Windows Mobile"},{string:navigator.userAgent,subString:"Windows CE",identity:"Windows Mobile"},{string:navigator.userAgent,subString:"Symbian OS",identity:"Symbian"},{string:navigator.userAgent,subString:"webOS",identity:"webOS"},{string:navigator.userAgent,subString:"BlackBerry",identity:"BlackBerry"},{string:navigator.userAgent,subString:"Kindle",identity:"Kindle"},{string:navigator.platform,subString:"Linux",identity:"Linux"}];this.browser=c(g)||"An unknown browser";this.version=a(navigator.userAgent)||a(navigator.appVersion)||"an unknown version";this.OS=c(f)||"an unknown OS";for(var d=0;d<e.length;d++){if(e[d]==this.OS){this.isMobile=true;break}else{this.isMobile=false}}if(typeof(window.ontouchstart)!=="undefined"){this.hasTouch=true}else{this.hasTouch=false}};if(_shoprunner_com.enabled){switch(_shoprunner_com.environmentID){case 1:_shoprunner_com.sr_jsContentURL=_shoprunner_com.prefix+((sr_browser$.getBrowser.isMobile)?"staging-content.shoprunner.com/staging/mobile":"staging-content.shoprunner.com/staging");break;case 2:_shoprunner_com.sr_jsContentURL=_shoprunner_com.prefix+((sr_browser$.getBrowser.isMobile)?"content.shoprunner.com/mobile":"content.shoprunner.com");break;default:_shoprunner_com.sr_jsContentURL=_shoprunner_com.prefix+((sr_browser$.getBrowser.isMobile)?"staging-content.shoprunner.com/staging/mobile":"staging-content.shoprunner.com/staging");break}if(_shoprunner_com.prefix=="https://"){var sr_CSS_URL=_shoprunner_com.sr_jsContentURL+"/Secure"+_shoprunner_com.retailerID+".css"}else{var sr_CSS_URL=_shoprunner_com.sr_jsContentURL+"/"+_shoprunner_com.retailerID+".css"}var sr_js_content_el_URL=_shoprunner_com.sr_jsContentURL+"/"+_shoprunner_com.retailerID+".js";setTimeout(function(){var d=document.createElement("link");d.href=sr_CSS_URL;d.type="text/css";d.rel="stylesheet";document.getElementsByTagName("head")[0].appendChild(d);var c=document.createElement("script");c.src=sr_js_content_el_URL;c.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(c)},1)}_shoprunner_com.docReady=false;function dom_loaded(){_shoprunner_com.docReady=true;if(typeof(sr_$)!=="undefined"){sr_$.run()}}if(document.addEventListener){document.addEventListener("DOMContentLoaded",dom_loaded,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",dom_loaded)}}if(window.addEventListener){window.addEventListener("load",dom_loaded,false)}else{if(window.attachEvent){var r=window.attachEvent("onload",dom_loaded)}};
}())
