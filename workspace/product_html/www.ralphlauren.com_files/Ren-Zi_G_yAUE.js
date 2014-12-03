/* Script imported from http://www.ralphlauren.com/js/siteOptimization/lib/mdetect.js */
/* *******************************************
// Copyright 2010-2013, Anthony Hand
//
// BETA NOTICE
// Previous versions of the JavaScript code for MobileESP were 'regular' 
// JavaScript. The strength of it was that it was really easy to code and use.
// Unfortunately, regular JavaScript means that all variables and functions
// are in the global namespace. There can be collisions with other code libraries
// which may have similar variable or function names. Collisions cause bugs as each
// library changes a variable's definition or functionality unexpectedly.
// As a result, we thought it wise to switch to an "object oriented" style of code.
// This 'literal notation' technique keeps all MobileESP variables and functions fully self-contained.
// It avoids potential for collisions with other JavaScript libraries.
// This technique allows the developer continued access to any desired function or property.
//
// Please send feedback to project founder Anthony Hand: anthony.hand@gmail.com
//
//
// File version 2013.07.13 (July 13, 2013)
//      Updates:
//      - Added support for Tizen: variable and DetectTizen().
//      - Added support for Meego: variable and DetectMeego().
//      - Added support for Windows Phone 8: variable and DetectWindowsPhone8().
//      - Added a generic Windows Phone method: DetectWindowsPhone().
//      - Added support for BlackBerry 10 OS: variable and DetectBlackBerry10Phone().
//      - Added support for PlayStation Vita handheld: variable and DetectGamingHandheld().
//      - Updated DetectTierIphone(). Added Tizen; updated the Windows Phone, BB10, and PS Vita support.
//      - Updated DetectWindowsMobile(). Uses generic DetectWindowsPhone() method rather than WP7.
//      - Updated DetectSmartphone(). Uses the IsTierIphone variable.
//      - Updated DetectSonyMylo() with more efficient code.
//      - Removed DetectGarminNuvifone() from DetectTierIphone(). How many are left in market in 2013? It is detected as a RichCSS Tier device.
//      - Removed the deviceXoom variable. It was unused.
//      - Added detection support for the OpenWeb transcoding engine to DetectMobileQuick().
//
// File version 2012.07.22  (July 22, 2012)
//      - Switched to an Object-Oriented programming model using the literal notation technique.  
//      - NOTE: The literal notation technique allows only 1 instance of this object per web page.  
//      - Named the JavaScript object "MobileEsp" rather than the old "mDetect."
//      - Applied many small tweaks and a few refactorings. The most notable ones are listed here...
//      - Added a variable for Obigo, an embedded browser. Added a lookup for Obigo to DetectMobileQuick().
//      - Added global variables for quick access to these very useful Boolean values:
//              - isWebkit, isMobilePhone, isIphone, isAndroid, isAndroidPhone, isTierTablet, isTierIphone, isTierRichCss, isTierGenericMobile
//      - Updated & simplified DetectSonyMylo(). Updated the variable mylocom2's value to handle both versions. 
//      - Removed the variable qtembedded, which was only used in Mylo and unnecessary.  
//      - Simplified OperaMobile().  
//      - Reorganized DetectMobileQuick().
//      - Moved the following from DetectMobileQuick() to DetectMobileLong():
//              - DetectDangerHiptop(), DetectMaemoTablet(), DetectGarminNuvifone(), devicePda  
//      - Added DetectBada(). Added it to DetectSmartphone & iPhone Tier, too.
//      - Updated DetectSymbian() to support Opera Mobile 10.
//      - Removed variable for OpenWeb. Removed its detection from DetectMobileQuick().
//              It's not clear whether Sprint is still using the OpenWeb transcoding service from OpenWave.
//
//
//
// LICENSE INFORMATION
// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at 
//        http://www.apache.org/licenses/LICENSE-2.0 
// Unless required by applicable law or agreed to in writing, 
// software distributed under the License is distributed on an 
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied. See the License for the specific 
// language governing permissions and limitations under the License. 
//
//
// ABOUT THIS PROJECT
//   Project Owner: Anthony Hand
//   Email: anthony.hand@gmail.com
//   Web Site: http://www.mobileesp.com
//   Source Files: http://code.google.com/p/mobileesp/
//   
//   Versions of this code are available for:
//      PHP, JavaScript, Java, ASP.NET (C#), Ruby and others
//
//
// WARNING: 
//   These JavaScript-based device detection features may ONLY work 
//   for the newest generation of smartphones, such as the iPhone, 
//   Android and Palm WebOS devices.
//   These device detection features may NOT work for older smartphones 
//   which had poor support for JavaScript, including 
//   older BlackBerry, PalmOS, and Windows Mobile devices. 
//   Additionally, because JavaScript support is extremely poor among 
//   'feature phones', these features may not work at all on such devices.
//   For better results, consider using a server-based version of this code, 
//   such as Java, APS.NET, PHP, or Ruby.
//
// *******************************************
*/
var MobileEsp={initCompleted:false,isWebkit:false,isMobilePhone:false,isIphone:false,isAndroid:false,isAndroidPhone:false,isTierTablet:false,isTierIphone:false,isTierRichCss:false,isTierGenericMobile:false,engineWebKit:"webkit",deviceIphone:"iphone",deviceIpod:"ipod",deviceIpad:"ipad",deviceMacPpc:"macintosh",deviceAndroid:"android",deviceGoogleTV:"googletv",deviceHtcFlyer:"htc_flyer",deviceWinPhone7:"windows phone os 7",deviceWinPhone8:"windows phone 8",deviceWinMob:"windows ce",deviceWindows:"windows",deviceIeMob:"iemobile",devicePpc:"ppc",enginePie:"wm5 pie",deviceBB:"blackberry",deviceBB10:"bb10",vndRIM:"vnd.rim",deviceBBStorm:"blackberry95",deviceBBBold:"blackberry97",deviceBBBoldTouch:"blackberry 99",deviceBBTour:"blackberry96",deviceBBCurve:"blackberry89",deviceBBCurveTouch:"blackberry 938",deviceBBTorch:"blackberry 98",deviceBBPlaybook:"playbook",deviceSymbian:"symbian",deviceSymbos:"symbos",deviceS60:"series60",deviceS70:"series70",deviceS80:"series80",deviceS90:"series90",devicePalm:"palm",deviceWebOS:"webos",deviceWebOShp:"hpwos",engineBlazer:"blazer",engineXiino:"xiino",deviceNuvifone:"nuvifone",deviceBada:"bada",deviceTizen:"tizen",deviceMeego:"meego",deviceKindle:"kindle",engineSilk:"silk-accelerated",vndwap:"vnd.wap",wml:"wml",deviceTablet:"tablet",deviceBrew:"brew",deviceDanger:"danger",deviceHiptop:"hiptop",devicePlaystation:"playstation",devicePlaystationVita:"vita",deviceNintendoDs:"nitro",deviceNintendo:"nintendo",deviceWii:"wii",deviceXbox:"xbox",deviceArchos:"archos",engineOpera:"opera",engineNetfront:"netfront",engineUpBrowser:"up.browser",engineOpenWeb:"openweb",deviceMidp:"midp",uplink:"up.link",engineTelecaQ:"teleca q",engineObigo:"obigo",devicePda:"pda",mini:"mini",mobile:"mobile",mobi:"mobi",maemo:"maemo",linux:"linux",mylocom2:"sony/com",manuSonyEricsson:"sonyericsson",manuericsson:"ericsson",manuSamsung1:"sec-sgh",manuSony:"sony",manuHtc:"htc",svcDocomo:"docomo",svcKddi:"kddi",svcVodafone:"vodafone",disUpdate:"update",uagent:"",InitDeviceScan:function(){this.initCompleted=false;if(navigator&&navigator.userAgent){this.uagent=navigator.userAgent.toLowerCase();}this.isWebkit=this.DetectWebkit();this.isIphone=this.DetectIphone();this.isAndroid=this.DetectAndroid();this.isAndroidPhone=this.DetectAndroidPhone();this.isMobilePhone=this.DetectMobileQuick();this.isTierIphone=this.DetectTierIphone();this.isTierTablet=this.DetectTierTablet();this.isTierRichCss=this.DetectTierRichCss();this.isTierGenericMobile=this.DetectTierOtherPhones();this.initCompleted=true;},DetectIphone:function(){if(this.initCompleted||this.isIphone){return this.isIphone;}if(this.uagent.search(this.deviceIphone)>-1){if(this.DetectIpad()||this.DetectIpod()){return false;}else{return true;}}else{return false;}},DetectIpod:function(){if(this.uagent.search(this.deviceIpod)>-1){return true;}else{return false;}},DetectIphoneOrIpod:function(){if(this.DetectIphone()||this.DetectIpod()){return true;}else{return false;}},DetectIpad:function(){if(this.uagent.search(this.deviceIpad)>-1&&this.DetectWebkit()){return true;}else{return false;}},DetectIos:function(){if(this.DetectIphoneOrIpod()||this.DetectIpad()){return true;}else{return false;}},DetectAndroid:function(){if(this.initCompleted||this.isAndroid){return this.isAndroid;}if((this.uagent.search(this.deviceAndroid)>-1)||this.DetectGoogleTV()){return true;}if(this.uagent.search(this.deviceHtcFlyer)>-1){return true;}else{return false;}},DetectAndroidPhone:function(){if(this.initCompleted||this.isAndroidPhone){return this.isAndroidPhone;}if(this.DetectAndroid()&&(this.uagent.search(this.mobile)>-1)){return true;}if(this.DetectOperaAndroidPhone()){return true;}if(this.uagent.search(this.deviceHtcFlyer)>-1){return true;}else{return false;}},DetectAndroidTablet:function(){if(!this.DetectAndroid()){return false;}if(this.DetectOperaMobile()){return false;}if(this.uagent.search(this.deviceHtcFlyer)>-1){return false;}if(this.uagent.search(this.mobile)>-1){return false;}else{return true;}},DetectAndroidWebKit:function(){if(this.DetectAndroid()&&this.DetectWebkit()){return true;}else{return false;}},DetectGoogleTV:function(){if(this.uagent.search(this.deviceGoogleTV)>-1){return true;}else{return false;}},DetectWebkit:function(){if(this.initCompleted||this.isWebkit){return this.isWebkit;}if(this.uagent.search(this.engineWebKit)>-1){return true;}else{return false;}},DetectWindowsPhone:function(){if(this.DetectWindowsPhone7()||this.DetectWindowsPhone8()){return true;}else{return false;}},DetectWindowsPhone7:function(){if(this.uagent.search(this.deviceWinPhone7)>-1){return true;}else{return false;}},DetectWindowsPhone8:function(){if(this.uagent.search(this.deviceWinPhone8)>-1){return true;}else{return false;}},DetectWindowsMobile:function(){if(this.DetectWindowsPhone()){return false;}if(this.uagent.search(this.deviceWinMob)>-1||this.uagent.search(this.deviceIeMob)>-1||this.uagent.search(this.enginePie)>-1){return true;}if((this.uagent.search(this.devicePpc)>-1)&&!(this.uagent.search(this.deviceMacPpc)>-1)){return true;}if(this.uagent.search(this.manuHtc)>-1&&this.uagent.search(this.deviceWindows)>-1){return true;}else{return false;}},DetectBlackBerry:function(){if((this.uagent.search(this.deviceBB)>-1)||(this.uagent.search(this.vndRIM)>-1)){return true;}if(this.DetectBlackBerry10Phone()){return true;}else{return false;}},DetectBlackBerry10Phone:function(){if((this.uagent.search(this.deviceBB10)>-1)&&(this.uagent.search(this.mobile)>-1)){return true;}else{return false;}},DetectBlackBerryTablet:function(){if(this.uagent.search(this.deviceBBPlaybook)>-1){return true;}else{return false;}},DetectBlackBerryWebKit:function(){if(this.DetectBlackBerry()&&this.uagent.search(this.engineWebKit)>-1){return true;}else{return false;}},DetectBlackBerryTouch:function(){if(this.DetectBlackBerry()&&((this.uagent.search(this.deviceBBStorm)>-1)||(this.uagent.search(this.deviceBBTorch)>-1)||(this.uagent.search(this.deviceBBBoldTouch)>-1)||(this.uagent.search(this.deviceBBCurveTouch)>-1))){return true;}else{return false;}},DetectBlackBerryHigh:function(){if(this.DetectBlackBerryWebKit()){return false;}if((this.DetectBlackBerry())&&(this.DetectBlackBerryTouch()||this.uagent.search(this.deviceBBBold)>-1||this.uagent.search(this.deviceBBTour)>-1||this.uagent.search(this.deviceBBCurve)>-1)){return true;}else{return false;}},DetectBlackBerryLow:function(){if(this.DetectBlackBerry()){if(this.DetectBlackBerryHigh()||this.DetectBlackBerryWebKit()){return false;}else{return true;}}else{return false;}},DetectS60OssBrowser:function(){if(this.DetectWebkit()){if((this.uagent.search(this.deviceS60)>-1||this.uagent.search(this.deviceSymbian)>-1)){return true;}else{return false;}}else{return false;}},DetectSymbianOS:function(){if(this.uagent.search(this.deviceSymbian)>-1||this.uagent.search(this.deviceS60)>-1||((this.uagent.search(this.deviceSymbos)>-1)&&(this.DetectOperaMobile))||this.uagent.search(this.deviceS70)>-1||this.uagent.search(this.deviceS80)>-1||this.uagent.search(this.deviceS90)>-1){return true;}else{return false;}},DetectPalmOS:function(){if(this.DetectPalmWebOS()){return false;}if(this.uagent.search(this.devicePalm)>-1||this.uagent.search(this.engineBlazer)>-1||this.uagent.search(this.engineXiino)>-1){return true;}else{return false;}},DetectPalmWebOS:function(){if(this.uagent.search(this.deviceWebOS)>-1){return true;}else{return false;}},DetectWebOSTablet:function(){if(this.uagent.search(this.deviceWebOShp)>-1&&this.uagent.search(this.deviceTablet)>-1){return true;}else{return false;}},DetectOperaMobile:function(){if((this.uagent.search(this.engineOpera)>-1)&&((this.uagent.search(this.mini)>-1||this.uagent.search(this.mobi)>-1))){return true;}else{return false;}},DetectOperaAndroidPhone:function(){if((this.uagent.search(this.engineOpera)>-1)&&(this.uagent.search(this.deviceAndroid)>-1)&&(this.uagent.search(this.mobi)>-1)){return true;}else{return false;}},DetectOperaAndroidTablet:function(){if((this.uagent.search(this.engineOpera)>-1)&&(this.uagent.search(this.deviceAndroid)>-1)&&(this.uagent.search(this.deviceTablet)>-1)){return true;}else{return false;}},DetectKindle:function(){if(this.uagent.search(this.deviceKindle)>-1&&!this.DetectAndroid()){return true;}else{return false;}},DetectAmazonSilk:function(){if(this.uagent.search(this.engineSilk)>-1){return true;}else{return false;}},DetectGarminNuvifone:function(){if(this.uagent.search(this.deviceNuvifone)>-1){return true;}else{return false;}},DetectBada:function(){if(this.uagent.search(this.deviceBada)>-1){return true;}else{return false;}},DetectTizen:function(){if(this.uagent.search(this.deviceTizen)>-1){return true;}else{return false;}},DetectMeego:function(){if(this.uagent.search(this.deviceMeego)>-1){return true;}else{return false;}},DetectDangerHiptop:function(){if(this.uagent.search(this.deviceDanger)>-1||this.uagent.search(this.deviceHiptop)>-1){return true;}else{return false;}},DetectSonyMylo:function(){if((this.uagent.search(this.manuSony)>-1)&&((this.uagent.search(this.qtembedded)>-1)||(this.uagent.search(this.mylocom2)>-1))){return true;}else{return false;}},DetectMaemoTablet:function(){if(this.uagent.search(this.maemo)>-1){return true;}if((this.uagent.search(this.linux)>-1)&&(this.uagent.search(this.deviceTablet)>-1)&&!this.DetectWebOSTablet()&&!this.DetectAndroid()){return true;}else{return false;}},DetectArchos:function(){if(this.uagent.search(this.deviceArchos)>-1){return true;}else{return false;}},DetectGameConsole:function(){if(this.DetectSonyPlaystation()||this.DetectNintendo()||this.DetectXbox()){return true;}else{return false;}},DetectSonyPlaystation:function(){if(this.uagent.search(this.devicePlaystation)>-1){return true;}else{return false;}},DetectGamingHandheld:function(){if((this.uagent.search(this.devicePlaystation)>-1)&&(this.uagent.search(this.devicePlaystationVita)>-1)){return true;}else{return false;}},DetectNintendo:function(){if(this.uagent.search(this.deviceNintendo)>-1||this.uagent.search(this.deviceWii)>-1||this.uagent.search(this.deviceNintendoDs)>-1){return true;}else{return false;}},DetectXbox:function(){if(this.uagent.search(this.deviceXbox)>-1){return true;}else{return false;}},DetectBrewDevice:function(){if(this.uagent.search(this.deviceBrew)>-1){return true;}else{return false;}},DetectSmartphone:function(){if(this.DetectTierIphone()||this.DetectS60OssBrowser()||this.DetectSymbianOS()||this.DetectWindowsMobile()||this.DetectBlackBerry()||this.DetectPalmOS()){return true;}return false;},DetectMobileQuick:function(){if(this.initCompleted||this.isMobilePhone){return this.isMobilePhone;}if(this.DetectTierTablet()){return false;}if(this.DetectSmartphone()){return true;}if(this.uagent.search(this.mobile)>-1){return true;}if(this.DetectKindle()||this.DetectAmazonSilk()){return true;}if(this.uagent.search(this.deviceMidp)>-1||this.DetectBrewDevice()){return true;}if(this.DetectOperaMobile()||this.DetectArchos()){return true;}if((this.uagent.search(this.engineObigo)>-1)||(this.uagent.search(this.engineNetfront)>-1)||(this.uagent.search(this.engineUpBrowser)>-1)||(this.uagent.search(this.engineOpenWeb)>-1)){return true;}return false;},DetectMobileLong:function(){if(this.DetectMobileQuick()){return true;}if(this.DetectGameConsole()){return true;}if(this.DetectDangerHiptop()||this.DetectMaemoTablet()||this.DetectSonyMylo()||this.DetectGarminNuvifone()){return true;}if((this.uagent.search(this.devicePda)>-1)&&!(this.uagent.search(this.disUpdate)>-1)){return true;}if(this.uagent.search(this.manuSamsung1)>-1||this.uagent.search(this.manuSonyEricsson)>-1||this.uagent.search(this.manuericsson)>-1){return true;}if((this.uagent.search(this.svcDocomo)>-1)||(this.uagent.search(this.svcKddi)>-1)||(this.uagent.search(this.svcVodafone)>-1)){return true;}return false;},DetectTierTablet:function(){if(this.initCompleted||this.isTierTablet){return this.isTierTablet;}if(this.DetectIpad()||this.DetectAndroidTablet()||this.DetectBlackBerryTablet()||this.DetectWebOSTablet()){return true;}else{return false;}},DetectTierIphone:function(){if(this.initCompleted||this.isTierIphone){return this.isTierIphone;}if(this.DetectIphoneOrIpod()||this.DetectAndroidPhone()||this.DetectWindowsPhone()||this.DetectBlackBerry10Phone()||this.DetectPalmWebOS()||this.DetectBada()||this.DetectTizen()||this.DetectGamingHandheld()){return true;}if(this.DetectBlackBerryWebKit()&&this.DetectBlackBerryTouch()){return true;}else{return false;}},DetectTierRichCss:function(){if(this.initCompleted||this.isTierRichCss){return this.isTierRichCss;}if(this.DetectTierIphone()||this.DetectKindle()||this.DetectTierTablet()){return false;}if(!this.DetectMobileQuick()){return false;}if(this.DetectWebkit()){return true;}if(this.DetectS60OssBrowser()||this.DetectBlackBerryHigh()||this.DetectWindowsMobile()||(this.uagent.search(this.engineTelecaQ)>-1)){return true;}else{return false;}},DetectTierOtherPhones:function(){if(this.initCompleted||this.isTierGenericMobile){return this.isTierGenericMobile;}if(this.DetectTierIphone()||this.DetectTierRichCss()||this.DetectTierTablet()){return false;}if(this.DetectMobileLong()){return true;}else{return false;}}};MobileEsp.InitDeviceScan();