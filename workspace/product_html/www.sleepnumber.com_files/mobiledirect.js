mm={};mm.tools={};mm.redirection={};mm.tools.hasValue=function(n){return n!==null&&n!==undefined&&n!==""};mm.tools.trim=function(n){return n.replace(/^\s+|\s+$/,"")};mm.tools.removeQuerystringValues=function(n){var i=n.indexOf("?"),t=n;return i>=0&&(t=t.substring(0,i)),t};mm.tools.getQuerystringValue=function(n,t){var u,f,i,r;return t=t.toLowerCase(),n=n.toLowerCase(),u="",f=t+"=",n.length>0&&(i=n.indexOf(f),i!==-1&&(i+=f.length,r=n.indexOf("&",i),r===-1&&(r=n.length),u=n.substring(i,r))),u};mm.tools.setBlockingCookie=function(n){var i=(new Date).getTime()+6e5,t="mobile=no;";t+="expires="+new Date(i).toGMTString()+";";t+="path=/;";t+=mm.tools.hasValue(n)?"domain="+n+";":"";document.cookie=t};mm.tools.hasBlockingCookie=function(){for(var i,r,t=document.cookie.split(";"),n=0;n<t.length;n++)if(i=t[n],r=i.split("="),mm.tools.trim(r[0].toLowerCase())=="mobile")return mm.tools.setBlockingCookie(location.hostname),!0;return!1};mm.tools.setHasVisitedCookie=function(n){var i=(new Date).getTime()+6e5,t="visited=yes;";t+="expires="+new Date(i).toGMTString()+";";t+="path=/;";t+=mm.tools.hasValue(n)?"domain="+n+";":"";document.cookie=t;return};mm.tools.hasVisitedCookie=function(){for(var i,r,t=document.cookie.split(";"),n=0;n<t.length;n++)if(i=t[n],r=i.split("="),mm.tools.trim(r[0].toLowerCase())=="visited")return!0;return!1};mm.tools.randomForPercentageRedirection=function(){return Math.floor(Math.random()*100)+1};mm.redirection.isUrlMatch=function(n,t){var i=t.match(n);return i!==null};mm.redirection.QuerystringRoute=function(n,t,i){var u=n!==undefined?n:"",f=t!==undefined?t:"",r=i!==undefined?i:"";this.checkForRedirection=function(n){return mm.redirection.isUrlMatch(u,n)};this.getRoute=function(n){var i="",u,t,e,o;if(mm.tools.hasValue(r))for(i=r,u=r.match(/\{(.*?)\}/gi),t=0;t<u.length;t++)e=u[t].replace(/\{/,"").replace(/\}/,""),o=mm.tools.getQuerystringValue(n,e),i=i.replace(u[t],o);return f+i}};mm.redirection.SeoRoute=function(n,t,i){var r=n!==undefined?n:"",u=t!==undefined?t:"",f=i!==undefined?i:function(){};this.checkForRedirection=function(n){return mm.redirection.isUrlMatch(r,n)};this.getRoute=function(n){return f(n,r,u)}};mm.redirection.Controller=function(){function i(t){for(var i,f,u="",r=0;r<n.pageByPageRoutes.length;r++)if(i=n.pageByPageRoutes[r],f=i.checkForRedirection(t),f){i=i.getRoute(t);u=i===!1?!1:n.baseMobileUrl+i;break}return u}function r(){return navigator.userAgent.match(/iPad/i)!==null}function t(){var t=navigator.userAgent,o=navigator.accept,i;if(t!==null){i="";i=n.allowedUserAgentPattern===""?/up.browser|up.link|iphone|android|blackberry|windows phone|wphone/ig:n.allowedUserAgentPattern;var r=new RegExp(i),u=n.userAgentWhiteList?t.match(n.userAgentWhiteList):"",f=screen.height>1200||screen.width>1200,e=n.blockLargeScreenMobileDevice;if(e&&f)return r.test(t)&&!u?!0:!1;if(r.test(t))return!0}return!1}function u(t){var r=new RegExp(n.blockMobileSiteUseQuerystringValue,"i"),i=r.test(t),u=n.isTestMode;return i&&(u&&typeof console!="undefined"&&(console.log("--------------------Redirect blocked by mobile=no:------------------"),console.log(t),console.log("----------------------Redirect Cookie Set-----------------------\n")),mm.tools.setBlockingCookie(n.clientDomainForBlockingCookie)),i}function f(t){var u=!0,i=n.redirectExclusionsByKeyword,o=n.isTestMode,r,f,e;if(i!==undefined&&i!==null)for(r=0;r<i.length;r++)f=t.indexOf(i[r])>-1,e=new RegExp(i[r],"i"),(f||t.match(e))&&(o&&typeof console!="undefined"&&(console.log("--------------------Redirect blocked by exclusion:------------------"),console.log(t),console.log("----------------------Redirect Cookie Not Set-----------------------\n")),u=!1);return u}var n,e=location.hostname.split(".");this.init=function(t){t===undefined&&(t={});n={iPadABTesting:t.iPadABTesting!==undefined?t.iPadABTesting:!1,iPadRedirectPercentage:t.iPadRedirectPercentage!==undefined?t.iPadRedirectPercentage:50,isTestMode:t.isTestMode!==undefined?t.isTestMode:!1,baseMobileUrl:t.baseMobileUrl!==undefined?t.baseMobileUrl:"",redirectExclusionsByKeyword:t.redirectExclusionsByKeyword!==undefined?t.redirectExclusionsByKeyword:[],pageByPageRoutes:t.pageByPageRoutes!==undefined?t.pageByPageRoutes:[],blockMobileSiteUseQuerystringValue:t.blockMobileSiteUseQuerystringValue!==undefined?t.blockMobileSiteUseQuerystringValue:"mobile=no",clientDomainForBlockingCookie:typeof t.clientDomainForBlockingCookie!="undefined"?t.clientDomainForBlockingCookie:location.hostname,blockLargeScreenMobileDevice:t.blockLargeScreenMobileDevice!==undefined?t.blockLargeScreenMobileDevice:!0,percentageOfRedirection:t.percentageOfRedirection!==undefined?t.percentageOfRedirection:100,allowedUserAgentPattern:t.allowedUserAgentPattern!==undefined?t.allowedUserAgentPattern:"",userAgentWhiteList:t.userAgentWhiteList!==undefined?t.userAgentWhiteList:""};this.setPercentageRedirectCookie(location)};this.setPercentageRedirectCookie=function(){var t=mm.tools.randomForPercentageRedirection();mm.tools.hasBlockingCookie()?n.isTestMode&&typeof console!="undefined"&&console.log("------------Percentage Redirect Blocked By Cookie------------------\n"):t>n.percentageOfRedirection?(mm.tools.setBlockingCookie(),n.isTestMode&&typeof console!="undefined"&&(console.log("--------------------Visitor Blocked By Percentage------------------"),console.log(t+" <= "+n.percentageOfRedirection),console.log("--------------------Redirect Blocking Cookie Set-------------------\n"))):n.isTestMode&&typeof console!="undefined"&&(console.log("--------------------Visitor Allowed By Percentage------------------"),console.log(t+" <= "+n.percentageOfRedirection),console.log("----------------------Redirect Blocking Not Set--------------------\n"))};this.testMode=function(t){n.isTestMode=t};this.redirect=function(e){var s=e.toString(),h,o;if(!t()&&!n.isTestMode||u(s))return!1;if(r()&&n.iPadABTesting&&!mm.tools.hasVisitedCookie()&&(h=mm.tools.randomForPercentageRedirection(),h>n.iPadRedirectPercentage&&mm.tools.setBlockingCookie(),mm.tools.setHasVisitedCookie()),mm.tools.hasBlockingCookie())return n.isTestMode&&typeof console!="undefined"&&(console.log("----------------------Redirect Blocked By Cookie-------------------"),console.log(s),console.log("-------------------------------------------------------------------\n")),!1;if(!f(s))return!1;if(o=i(s),o===!1)return n.isTestMode&&typeof console!="undefined"&&(console.log("----------------------Redirect Blocked By SeoRoute method that returned false-------------------"),console.log(s),console.log("----------------------------------------------------------------------------------------------\n")),!1;if(mm.tools.hasValue(o)||(o=n.baseMobileUrl),o=o.replace("http://",""),o=o.replace("//","/"),o="http://"+o,n.isTestMode||s.indexOf("localhost")>-1)return typeof console!="undefined"&&(!t()&&n.isTestMode&&(console.log("You are not on a mobile device and would not redirect."),console.log("-------------------------------- Desktop URL -------------------------------------"),console.log(s),console.log("---------------------------------------------------------------------------------\n")),t()&&n.isTestMode&&(console.log("--------------------------------Redirect-------------------------------------"),console.log("Desktop URL:"),console.log(s),console.log("Redirected To:"),console.log(o),console.log("------------------------------End Redirect-----------------------------------\n"))),o;window.location=o}};mm.redirection.seoRouteLogicForStaticPages=function(n,t,i){return i};mm.redirection.seoRouteLogicForSimpleRedirect=function(n){return n.replace(/https*:\/\/.*sleepnumber\.com/,"").replace("categories/sleep-numberpillows-bedding","all/SleepNumberPillowsBedding")};mm.redirection.seoRouteLogicForStaticPages=function(n,t,i){return i};var redirectionController=function(){var n=new mm.redirection.Controller;return n.init({iPadABTesting:!1,baseMobileUrl:"http://m.sleepnumber.com",clientDomainForBlockingCookie:".sleepnumber.com",blockLargeScreenMobileDevice:!1,redirectExclusionsByKeyword:["sleepnumber.com/bedding-planner","sleepnumber.com/testimonial/search","sleepnumber.com/testimonial/write","eng/sleepNumber/know-better-sleep.cfm","x12","sleepnumber.com/eng/Articles/smart-naps.cfm","sleepnumber.com/eng/Articles/holiday-stress.cfm","sleepnumber.com/eng/Articles/reduce-allergens.cfm","sleepnumber.com/eng/products/specialty-beds/specialty_beds?QVC","sleepnumber.com/eng/myAccount/referrals-landing.cfm","sleepnumber.com/eng/sleepNumber/military-2012.cfm","sleepnumber.com/eng/Articles/sleep-well-sneeze-less.cfm","sleepnumber.com/eng/Articles/gravity-signals-season-change.cfm","sleepnumber.com/2012memoryfoamsweeps","sleepnumber.com/eng/contests/redirect.cfm","sleepnumber.com/eng/customerService/financingPaymentPage.cfm","sleepnumber.com/eng/myAccount/insiderbenefits.cfm","sleepnumber.com/eng/loginPage/redirect.cfm?sectionID=b2c/myAccount/userProfile_userLogin.cfm","sleepnumber.com/eng/myAccount/joininnercircle.cfm","sleepnumber.com/eng/storeSection/financing.cfm","sleepnumber.com/eng/mattress-reviews-testimonials.cfm","sleepnumber.com/eng/testimonials/redirect.cfm?sectionID=b2c/testimonials/frmTestimonial.cfm","sleepnumber.com/eng/sleepNumber/c2landing.cfm","sleepnumber.com/eng/myAccount/InnerCircleFlexFit.cfm","sleepnumber.com/eng/specialoffers/FreeBedding.cfm","sleepnumber.com/eng/specialoffers/SpringSpecials.cfm","sleepnumber.com/eng/sleepNumber/SleepExerciseImportance.cfm","sleepnumber.com/eng/Articles/tips-for-good-sleep.cfm","sleepnumber.com/eng/whySleepNumber/individualizedComfort.cfm","sleepnumber.com/eng/customerservice/privacypolicy.cfm","sleepnumber.com/eng/whySleepNumber/yourTotalSleepSolution.cfm","sleepnumber.com/eng/whySleepNumber/ourStoreExperience.cfm","sleepnumber.com/eng/Articles/5reasonssleepbetter.cfm","sleepnumber.com/eng/customerService/warrantyPage.cfm","sleepnumber.com/eng/customerService/returns.cfm","sleepnumber.com/eng/GrandOpening","sleepnumber.com/eng/sleepNumber/36-month-financing.cfm","sleepnumber.com/eng/products/sleep-numberpillows-bedding/sheets?inbalanceshts","sleepnumber.com/eng/categories/sleep-number-pillows-bedding","sleepnumber.com/eng/sleepNumber/allies-infographic.cfm","sleepnumber.com/eng/sleepNumber/infographic.cfm","sleepnumber.com/eng/sleepNumber/fitted-sheet-fold.cfm","sleepnumber.com/media/IC-Catalog-Holiday12/catalogue/index.htm","sleepnumber.com/media/giftguide-12/catalogue/index.htm","sleepnumber.com/eng/myAccount/redirect.cfm?sectionID=b2c/myAccount/orderStatus/orderStatusSearchForm.cfm","sleepnumber.com/eng/sleepNumber/sleep-number-mobile.cfm","sleepnumber.com/eng/customerService/privacyPolicy.cfm","sleepnumber.com/eng/individualNeeds/sleepTemperature.cfm","sleepnumber.com/eng/Articles/sleep-hot-cold.cfm","sleepnumber.com/eng/Articles/healthy-better-sleep.cfm","sleepnumber.com/eng/Articles/sleeptips.cfm","sleepnumber.com/eng/Articles/staycool.cfm","sleepnumber.com/eng/Articles/sleepstyles-relationships.cfm","sleepnumber.com/eng/categories/sleep-number-pillows-bedding?charac=Shop%20by%20Solution&characValue=All%20Natural","sleepnumber.com/eng/categories/sleep-number-pillows-bedding?charac=Shop%20by%20Solution&characValue=Natural%20Allergy%20Defense","sleepnumber.com/eng/categories/sleep-number-pillows-bedding?charac=Shop%20by%20Solution&characValue=Personalized%20Bedding","sleepnumber.com/eng/categories/sleep-number-pillows-bedding?charac=Shop%20by%20Solution&characValue=Temperature%20Balancing","sleepnumber.com/eng/myaccount/redirect.cfm?sectionID=b2c/myAccount/myAccountHomePage.cfm&var=d&ckey=US","sleepnumber.com/eng/myaccount/redirect.cfm?sectionID=b2c/myAccount/*","sleepnumber.com/eng/Articles/sleeptips.cfm","sleepnumber.com/eng/Articles/staycool.cfm","sleepnumber.com/eng/Articles/sleepstyles-relationships.cfm","sleepnumber.com/eng/categories/sleep-number-pillows-bedding?charac=Shop%20by%20Solution&characValue=All%20Natural","sleepnumber.com/eng/categories/sleep-number-pillows-bedding?charac=Shop%20by%20Solution&characValue=Natural%20Allergy%20Defense","sleepnumber.com/eng/categories/sleep-number-pillows-bedding?charac=Shop%20by%20Solution&characValue=Personalized%20Bedding","sleepnumber.com/eng/categories/sleep-number-pillows-bedding?charac=Shop%20by%20Solution&characValue=Performance%20Bedding","sleepnumber.com/eng/categories/sleep-number-pillows-bedding?charac=Shop%20by%20Solution&characValue=Temperature%20Balancing","sleepnumber.com/eng/myaccount/redirect.cfm?sectionID=b2c/myAccount/userProfile/insertUpdateProfile.cfm&var=d&ckey=US","sleepnumber.com/eng/Articles/sleep-competitive-advantage.cfm","sleepnumber.com/eng/Articles/new-years-resolutions.cfm","sleepnumber.com/eng/Articles/monday-blues.cfm","sleepnumber.com/sn/en/my-savings","sleepnumber.com/sn/en/inner-circle","sleepnumber.com/sn/en/register","sleepnumber.com/sn/en/refer-friend","sleepnumber.com/my-savings","sleepnumber.com/inner-circle","sleepnumber.com/register","sleepnumber.com/refer-friend","sleepnumber.com/web50","sleepnumber.com/pillow-finder","sleepnumber.com/totowa","sleepnumber.com/cummingga","sleepnumber.com/gainesvilleva","sleepnumber.com/aventurablvd","sleepnumber.com/vacavillenuttree","sleepnumber.com/greensborovillage","sleepnumber.com/jordancreek","sleepnumber.com/northridge","sleepnumber.com/duluth","sleepnumber.com/cambridge","sleepnumber.com/jacksontn","sleepnumber.com/rapidcity","sleepnumber.com/capitalcitymall","sleepnumber.com/columbiatwonotchrd","sleepnumber.com/florenceky","sleepnumber.com/sandimas","sleepnumber.com/overlandpark","sleepnumber.com/westfieldsouthshore","sleepnumber.com/coastalgrand","sleepnumber.com/antelopevalleymall","sleepnumber.com/deerbrookmall","sleepnumber.com/emeraldsquare","sleepnumber.com/abilene","sleepnumber.com/sandystate","sleepnumber.com/mallofnewhampshire","sleepnumber.com/rockford","sleepnumber.com/woodfieldmall","sleepnumber.com/ridgedalecenter","sleepnumber.com/evansville","sleepnumber.com/lubbocktx","sleepnumber.com/broadwaysquaremall","sleepnumber.com/deerparkcenter","sleepnumber.com/dothan","sleepnumber.com/northglennco","sleepnumber.com/clackamastown","sleepnumber.com/dullestowncenter","sleepnumber.com/westroadsmall","sleepnumber.com/gastonia","sleepnumber.com/birmingham280","sleepnumber.com/santaanita","sleepnumber.com/westcounty","sleepnumber.com/southcountylindbergh","sleepnumber.com/newhartford","sleepnumber.com/westwichita","sleepnumber.com/millburyshoppes","sleepnumber.com/woodlandmall","sleepnumber.com/crosscreekmall","sleepnumber.com/fortmyers","sleepnumber.com/coloradosprsacademy","sleepnumber.com/bartoncreek","sleepnumber.com/midlandtx","sleepnumber.com/elpaso","sleepnumber.com/siouxfalls","sleepnumber.com/meridian","sleepnumber.com/burlingtonvt","sleepnumber.com/peachtreecorners","sleepnumber.com/mallatbarnescrossing","sleepnumber.com/austincedarpark","sleepnumber.com/memorialcity","sleepnumber.com/lafayettela","sleepnumber.com/kendall","sleepnumber.com/pittsburghross","sleepnumber.com/spartanburg","sleepnumber.com/westfieldbrandon","sleepnumber.com/frontiermall","sleepnumber.com/tysonscorner","sleepnumber.com/chandlerfashion","sleepnumber.com/lynnhavenmall","sleepnumber.com/santamonicablvd","sleepnumber.com/summerlinnv","sleepnumber.com/boyntonbeach","sleepnumber.com/dullestowncenter","sleepnumber.com/palmdesert","sleepnumber.com/peoria","sleepnumber.com/lancasterpa","sleepnumber.com/florenceky","sleepnumber.com/topeka","sleepnumber.com/sanantonione","sleepnumber.com/springfieldtowncenter","sleepnumber.com/arrowheadtc","sleepnumber.com/towsontowncenter","sleepnumber.com/westbury","sleepnumber.com/springfieldtowncenter","sleepnumber.com/fresnomarketplace","sleepnumber.com/medfordor","sleepnumber.com/orlandpark","sleepnumber.com/daviefl","sleepnumber.com/longviewtx","sleepnumber.com/lynnwood","sleepnumber.com/dullestowncenter","sleepnumber.com/dullestowncenter","sleepnumber.com/dullestowncenter","sleepnumber.com/sterlingheights","sleepnumber.com/puyallup","sleepnumber.com/whiteplains","sleepnumber.com/siq","sleepnumber.com/lp/cypc"],pageByPageRoutes:[new mm.redirection.SeoRoute("/eng/categories/Sleep-Number-Beds/Classic-Series","/eng/categories/Sleep-Number-Beds/Classic-Series",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/sleepnumber/flexfit.cfm","/lp/flexfit",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/sleepNumber/whysleepnumber.cfm","/eng/whySleepNumber",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/sleepNumber/warranty.cfm","/eng/customerService/warrantyPage.cfm",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/sleepNumber/nighttrial.cfm","/eng/customerService/returns.cfm",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/mattress-store","/find-a-store",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/categories/Sleep-Number-Beds/performance-series","/eng/categories/Sleep-Number-Beds/performance-series",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/categories/sleep-number-beds","/menu/beds",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/categories/sleep-number-pillows-bedding","/menu/other",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/sleepNumber/performance-bedding.cfm","/lp/performancebedding",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/sleepNumber/airfitpillow.cfm","/lp/airfit",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/sleepNumber/ellen-show.cfm","/lp/ellen",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/ellen","/lp/ellen",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/pillowfit","/lp/pillowfit",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/sleepNumber/pillowFit.cfm","/lp/pillowfit",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/sleepNumber/AirFitGMA.cfm","/lp/GMA_airfit",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/GMA","/lp/GMA_airfit",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/sleepnumber/dualtemp.cfm.*","/lp/dualtemp",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/dualtemp.*","/lp/dualtemp",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/50","/eng/aboutUs/redirect.cfm?sectionID=b2c/leads/form.cfm",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber50.com","/eng/aboutUs/redirect.cfm?sectionID=b2c/leads/form.cfm",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/dualtemp.*","/lp/dualtemp",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/sleepNumber/dualtemp_in.cfm","/lp/dualtemp_insiders",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/insidersdualtemp","/lp/dualtemp_insiders",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/sleepnumber/dualairtechnology.cfm","/lp/dualair",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber.com/eng/sleepNumber/adjustable-mattress-benefits.cfm","/lp/sleepnumber",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/products/specialty-beds/specialty_beds?m7co","/eng/products/specialty-beds/specialty_beds?m7co",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/products/specialty-beds/specialty_beds?m9co","/eng/products/specialty-beds/specialty_beds?m9co",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/products/specialty-beds/specialty_beds?i8co","/eng/products/specialty-beds/specialty_beds?i8co",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/products/specialty-beds/specialty_beds?i10co","/eng/products/specialty-beds/specialty_beds?i10co",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/products/specialty-beds/specialty_beds?mle","/eng/products/specialty-beds/specialty_beds?mle",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/sleepNumber/livechat.cfm","/livechat",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/livechat","/livechat",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/sleepNumber/dualtemp_in.cfm","/lp/dualtemp_insiders",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/sleepnumber/dualair-pseries.cfm","/lp/dualair-pseries",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/sleepNumber/military-2013.cfm","/lp/military",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/sleepNumber/flexfit-pre-sale.cfm","/lp/flexfit_123",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/sleepNumber/c-series-pre-sale.cfm","/lp/classicseries",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/eng/search/EntireSite-smart_classics","/lp/smartclassics",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/hypoallergenic-bedding","/lp/hypoallergenicbedding",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/b/beds","/lp/beds",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/why-sleep-number/individual-comfort","/its-that-simple",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("/military","/lp/military",mm.redirection.seoRouteLogicForStaticPages),new mm.redirection.SeoRoute("sleepnumber[.]com.*","",mm.redirection.seoRouteLogicForSimpleRedirect)]}),n.redirect(window.location),n}();
/*
//# sourceMappingURL=sleepnumber.yui.min.js.map
*/