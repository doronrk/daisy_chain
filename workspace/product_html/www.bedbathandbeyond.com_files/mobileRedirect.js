"undefined"===typeof BBB&&(BBB={});
BBB.Redirect=function(){String.prototype.contains||(String.prototype.contains=function(b){return-1!==this.indexOf(b)});var h=location.pathname.toLowerCase(),k=location.pathname,f=location.search,g=0<f.length;return{init:function(){this.checkStop();this.stopMobileRedirect||(this.checkDevice(),this.deviceRedirects&&this.checkRedirect())},getURL:function(b,a,c,e){b.contains("/cart/cart.jsp")&&(a=c+"/m/cart");b.contains("/account/login")&&(a=c+"/m/loginPage");b.contains("/account/trackorder")&&(a=c+"/m/trackOrder");
b.contains("/account/create_account")&&(a=c+"/m/loginPage");b.contains("/account/view_credit_card")&&(a=c+"/m/creditCard");b.contains("/account/edit_credit_cards")&&(a=c+"/m/creditCard");b.contains("/account/address_book")&&(a=c+"/m/addressBook");b.contains("/account/coupons")&&(a=c+"/m/couponsPage");b.contains("/account/order_summary")&&(a=c+"/m/orderHistory");b.contains("/account/myaccount")&&(a=c+"/m/myAccount");b.contains("/account/check_giftcard_bal")&&(a=c+"/m/gcBalance");b.contains("/search.jsp")&&
(a=c+"/m/performSearch");b.contains("/process_pie_redirect.jsp")&&(a=c+"/m/pieRedirect");b.contains("/kickstarters")&&(a=c+"/m/kickStarters");b.contains("/wish_list")&&(a=c+"/m/wishList");b.contains("/my_registries")&&(a=c+"/m/myregistries");b.contains("/registry_search_guest")&&(a=c+"/m/registryLanding");b.contains("/view_registry_guest")&&(a=c+"/m/giftRegistry");b.contains("/page/registry")&&(a=c+"/m/registryLanding");b.contains("/page/babyregistry")&&(a=c+"/m/registryLanding");b.contains("/registry/movingsolution")&&
(a=c+"/m/static/content/ShopHerePickup");b.contains("/registry/apartmentchecklist")&&(a=c+"/m/static/content/apartmentchecklist");b.contains("/giftcardhomepage")&&(a=c+"/m/static/content/gifts");b.contains("/privacypolicy")&&(a=c+"/m/static/content/privacyPolicy");b.contains("/termsofuse")&&(a=c+"/m/static/content/privacyPolicy");b.contains("/easyreturns")&&(a=c+"/m/static/content/easyReturns");b.contains("/shippingpolicies")&&(a=c+"/m/shippingInfo");b.contains("/giftcardpolicy")&&(a=c+"/m/static/content/giftCards");
b.contains("/safetyandrecalls")&&(a=c+"/m/static/content/safetyRecalls");b.contains("/corporatesalesreport")&&(a=c+"/m/static/content/corpSales");b.contains("/static/tcp")&&(a=c+"/m/static/content/tcp");b.contains("/static/hgtvhome")&&(a=c+"/m/static/content/hgtvhome");b.contains("/selfservice/findstore")&&(a=c+"/m/storeLocator");b.contains("/find_store")&&(a=c+"/m/storeLocator");b.contains("/selfservice/contactus")&&(a=c+"/m/contactUs");b.contains("/selfservice/contact_us")&&(a=c+"/m/contactUs");
b.contains("/selfservice/canadastoreloc")&&(a=c+"/m/storeLocator");b.contains("/selfservice/findcollege")&&(a=c+"/m/findCollege");b.contains("/page/college")&&(a=c+"/m/static/content/college");b.contains("/veteransday2013")&&(a=c+"/m/static/content/veteransday2013");b.contains("/rememberanceday2013")&&(a=c+"/m/static/content/rememberanceday2013");1==this.concept&&(b.contains("/registry/campuschecklist")&&(a=c+"/m/static/content/campuschecklist"),b.contains("/catalogs")&&(a=c+"/m/static/content/circular"),
b.contains("/bedbathonlineofferoct2013")&&(a=c+"/m/static/content/bedBathOnlineOffer2"),b.contains("/bedbathonlineoffernov2013")&&(a=c+"/m/static/content/bedBathOnlineOfferNov2013"),b.contains("/bedbathonlineofferdec2013")&&(a=c+"/m/static/content/bedBathOnlineOfferDec2013"),b.contains("/bedbathonlineofferjan2014")&&(a=c+"/m/static/content/bedBathOnlineOfferJan2014"),b.contains("/bedbathonlineofferfeb2014")&&(a=c+"/m/static/content/bedBathOnlineOfferFeb2014"),b.contains("/bedbathonlineofferfeb2013")&&
(a=c+"/m/static/content/oopus/?icid=homepage_herocarousel2-homepage"),b.contains("/bedbathonlineoffer3")&&(a=c+"/m/static/content/bedBathOnlineOffer3"),b.contains("/bedbathonlineoffer4")&&(a=c+"/m/static/content/bedBathOnlineOffer4"),b.contains("/bedbathonlineoffer5")&&(a=c+"/m/static/content/bedBathOnlineOffer5"),b.contains("/bedbathonlineoffer6")&&(a=c+"/m/static/content/bedBathOnlineOffer6"),b.contains("/bedbathonlineoffer7")&&(a=c+"/m/static/content/bedBathOnlineOffer7"),b.contains("/bedbathonlineoffer8")&&
(a=c+"/m/static/content/bedBathOnlineOffer8"),b.contains("/bridal_book_how_to_book")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/Bridal Howbook_US_Mobile 2.0"),b.contains("/decembercircular")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/December Circular_US_Desktop and Mobile"),
b.contains("/novembercircular")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/November Circular_US Mobile 2.0"),b.contains("/holidayhelpbook")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/Holiday Helpbook_US_Mobile 2.0"),
b.contains("/coastalbook")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/Coastal_US_Mobile 2.0"),b.contains("/jewelrylookbook")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/Jewelry_US_Mobile 2.0"),
b.contains("/coffeebook")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/Coffee_US_Mobile 2.0"),b.contains("/designerbeddingcollection")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/Nov Better Bedding Blow-In_US Mobile"),
b.contains("/holidayhome")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/December Blow-In_US_Desktop and Mobile"),b.contains("/giftsgalore")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/December Event_Blow-In Static Page_US Only"),
b.contains("/decemberevent")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/December Event_US_Desktop and Mobile"),b.contains("/marchcircular")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/Marchcatalog_US"),
b.contains("/setyourtable")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/march_blowin_desktopandmobile"),b.contains("/personalizedinvitations")&&(a="http://invitations.bedbathandbeyond.com/index.jsp"));2==this.concept&&(b.contains("/registry/hospitalbagchecklist")&&
(a=c+"/m/static/content/hospitalbagchecklist"),b.contains("/registry/firstfewweekschecklist")&&(a=c+"/m/static/content/firstfewweekschecklist"),b.contains("/registry/babysafetychecklist")&&(a=c+"/m/static/content/babysafetychecklist"),b.contains("/enfamiloffer")&&(a=c+"/m/static/content/EnfamilOffer"),b.contains("/babyonlineofferdestination")&&(a=c+"/m/static/content/BabyOnlineOfferDestinationMaternity"),b.contains("/babyonlineoffer1")&&(a=c+"/m/static/content/BabyOnlineOffer1"),b.contains("/babyonlineoffer2")&&
(a=c+"/m/static/content/BabyOnlineOffer2"),b.contains("/babyonlineoffer3")&&(a=c+"/m/static/content/BabyOnlineOffer3"),b.contains("/babyonlineoffer4")&&(a=c+"/m/static/content/BabyOnlineOffer4"),b.contains("/babyonlineoffer5")&&(a=c+"/m/static/content/BabyOnlineOffer5"),b.contains("/babyonlineoffer6")&&(a=c+"/m/static/content/BabyOnlineOffer6"),b.contains("/babyonlineoffer7")&&(a=c+"/m/static/content/BabyOnlineOffer7"),b.contains("/babyonlineoffer8")&&(a=c+"/m/static/content/BabyOnlineOffer8"),b.contains("/babyonlineoffer9")&&
(a=c+"/m/static/content/BabyOnlineOffer9"),b.contains("/babyonlineoffer10")&&(a=c+"/m/static/content/BabyOnlineOffer10"));3==this.concept&&(b.contains("/registry/collegechecklistpage")&&(a=c+"/m/static/content/campuschecklist"),b.contains("/catalogs")&&(a=c+"/m/static/content/circularCanada"),b.contains("/decembercircular")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/December Circular_Canada_Desktop and Mobile"),
b.contains("/holidayhelpbook")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/Holiday Helpbook_Canada_Mobile 2.0"),b.contains("/decemberevent")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/December Event_Canada_Desktop and Mobile"),
b.contains("bridal_book_how_to_book")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/Bridal Howbook_Canada_Mobile 2.0"),b.contains("/marchcircular")&&(a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/march_canadacatalog"));
b=b.replace("/store/","/m/");b.contains("/product/")&&(a=c+b);b.contains("/category/")&&(a=/\/[A-Za-z0-9 _-]*\/[1-3][0-9][0-9][0-9][0-9]\//,a=a.exec(b),a=c+"/m/category"+a,g=!1);a==c+"/m/"&&b.contains("circular")&&(b=b.substr(b.lastIndexOf("/")+1),a="http://s7d9.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://s7d9.scene7.com/s7/emailFriend&serverUrl=http://s7d9.scene7.com/is/image/&config=BedBathandBeyond/Universal_HTML5_eCatalog_revised&contenturl=http://s7d9.scene7.com/skins/&config2=companypreset&asset=BedBathandBeyond/"+
b);a==c+"/m/"&&b.contains("/static/")&&(b=b.replace("/static/","/static/content/"),a=c+b);f=f.replace("Keyword","keyword");f.contains("keyword")&&(f=f.replace(/\+/g," "));if(b.contains("/s/")){a=/\/[s]\/[A-Za-z0-9_\W]*/;a=a.exec(b)[0].split("/");var d="keyword="+a[2];a[3]&&(a[3].split("-")[2]?d=d+"&CatalogId="+a[3].replace(/-/g,"+"):2==a[3].split("-").length&&(d=d+"&pagNum="+a[3].split("-")[0]));a[4]&&2==a[4].split("-").length&&(d=d+"&pagNum="+a[4].split("-")[0]);a=c+"/m/performSearch?"+d;g=!1}b.contains("/brand/")&&
(a=/\/brand\/[A-Za-z0-9 /_-]*/,a=a.exec(b)[0].split("/"),d=a[2]+"/"+a[3],a.shift(),a[3]&&(a[3].split("-")[2]?d=d+"?CatalogId="+a[3].replace(/-/g,"+"):2==a[3].split("-").length&&(d=d+"?pagNum="+a[3].split("-")[0])),a[4]&&2==a[4].split("-").length&&(d=d+"&pagNum="+a[4].split("-")[0]),a=c+"/m/brand/"+d,g=!1);b.contains("/topconsultant")&&(a=/\/topconsultant\/([A-Za-z0-9]*)\/([A-Za-z0-9]*)\/([A-Za-z0-9%]*)\/([A-Za-z0-9]*)([/]?)/,a=a.exec(e),null!=a?(a=a[0].split("/"),6==a.length&&(d=a[2]+"/"+a[4]+"_"+
a[5]+"?registryId="+a[3])):(a=/\/topconsultant\/([A-Za-z0-9]*)\/([A-Za-z0-9]*)\/([A-Za-z0-9%]*)([/]?)/,a=a.exec(e),null!=a?(a=a[0].split("/"),5==a.length&&(d=a[2]+"/"+a[4]+"?registryId="+a[3])):(a=/\/topconsultant\/([A-Za-z0-9]*)\/([A-Za-z0-9]*)([/]?)/,a=a.exec(e),null!=a?(a=a[0].split("/"),4==a.length&&(d=a[2]+"/"+a[3])):(a=/\/topconsultant\/([A-Za-z0-9]*)([/]?)/,a=a.exec(e),null!=a&&(a=a[0].split("/"),3==a.length&&(d=a[2]))))),a=c+"/m/topConsultant/"+d,g=!1);b.contains("/shopthislook")&&(a=/\/shopthislook\/([A-Za-z0-9]*)\/([A-Za-z0-9]*)\/([A-Za-z0-9%]*)\/([A-Za-z0-9]*)([/]?)/,
a=a.exec(e),null!=a?(a=a[0].split("/"),6==a.length&&(d=a[2]+"/"+a[4]+"_"+a[5]+"?registryId="+a[3])):(a=/\/shopthislook\/([A-Za-z0-9]*)\/([A-Za-z0-9]*)\/([A-Za-z0-9%]*)([/]?)/,a=a.exec(e),null!=a?(a=a[0].split("/"),5==a.length&&(d=a[2]+"/"+a[4]+"?registryId="+a[3])):(a=/\/shopthislook\/([A-Za-z0-9]*)\/([A-Za-z0-9]*)([/]?)/,a=a.exec(e),null!=a?(a=a[0].split("/"),4==a.length&&(d=a[2]+"/"+a[3])):(a=/\/shopthislook\/([A-Za-z0-9]*)([/]?)/,a=a.exec(e),null!=a&&(a=a[0].split("/"),3==a.length&&(d=a[2]))))),
a=c+"/m/shopThisLook/"+d,g=!1);g&&(a+=f);return a},checkRedirect:function(){var b=location.hostname;b.contains("buybuybaby.com")&&(this.concept=2);b.contains("bedbathandbeyond.ca")&&(this.concept=3);var a="https://m.bedbathandbeyond.com",b="https://m.bedbathandbeyond.com/m/";2==this.concept&&(a="https://m.buybuybaby.com",b="https://m.buybuybaby.com/m/");3==this.concept&&(a="https://m.bedbathandbeyond.ca",b="https://m.bedbathandbeyond.ca/m/");b=this.getURL(h,b,a,k);if(h.contains("/category/")||h.contains("/brand/")){a=
window.location.search;if(a.contains("view"))var c=a.indexOf("&view"),a=a.substring(0,c);window.location=b+(a?a:"/")}else window.location=b},checkDevice:function(){var b=navigator.userAgent.toLowerCase(),a=navigator.platform.toLowerCase(),c,e,d,f;c=/ip(hone|od)/.test(a);/ipad/.test(a);a=/bb10/.test(b);e=/iemobile/.test(b);/silk/.test(b)||/kindle/.test(b);d=/android/.test(b);f=/mobile/.test(b)&&d;/mobile/.test(b);this.deviceRedirects=f||c||a||e},checkStop:function(){var b=this.getCookie("stop_mobi"),
a=-1<f.toLowerCase().indexOf("stop_mobi=yes");if(a||"yes"==b)this.stopMobileRedirect=!0,(""==b||null==b)&&this.setCookie("stop_mobi","yes",0.5)},setCookie:function(b,a,c){if(c){var e=new Date;e.setTime(e.getTime()+36E5*c);c="; expires="+e.toGMTString()}else c=";";document.cookie=b+"="+a+c+"; path=/"},getCookie:function(b){b+="=";for(var a=document.cookie.split(";"),c=0;c<a.length;c++){for(var e=a[c];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(b))return e.substring(b.length,e.length)}return null},
queryStringParm:function(b){b=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");b=RegExp("[\\?&]"+b+"=([^&#]*)").exec(location.search);return null==b?"":decodeURIComponent(b[1].replace(/\+/g," "))},stopMobileRedirect:!1,deviceRedirects:!1,concept:1,eof:!0}}();BBB.Redirect.init();
