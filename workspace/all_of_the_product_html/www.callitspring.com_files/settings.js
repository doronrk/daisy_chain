//_cfFunctionsLocation = "/cfajax/core/ajaxFunctions.cfm";
_cfGenericFunctionsLocation = "/cfajax/core/generic.cfm";
_cfBannersFunctionsLocation = "/cfajax/core/marketing/banner.cfm";
_cfShoppingCartFunctionsLocation = siteUrl + "/frontEndComponents/specificComponents/b2c/servlet/shoppingCart/addTocartAjax.cfm";
_cfEmailFriendFunctionsLocation = siteUrl + "/frontEndComponents/specificComponents/b2c/style/sendProductToFriendAjax.cfm";
_cfEmailContactUsFunctionsLocation = siteUrl + "/frontEndComponents/specificComponents/b2c/style/sendContactUsEmailAjax.cfm";
_cfNewsLetterLocation = siteUrl + "/frontEndComponents/specificComponents/b2c/newsletter/newslettersignUpAjax.cfm";
_cfUserProfileFunctionsLocation = siteUrl + "/frontEndComponents/specificComponents/b2c/myaccount/userProfile/userProfileAjax.cfm";

_cfLeftNav = siteUrl + "/cfLib/leftNavigationAjax.cfm";
_cfCatLevelsLocation = siteUrl + "/cfLib/ajaxCalls.cfm";
_cfCheckOut = siteUrl + "/cfLib/checkOutajaxCalls.cfm";
_cfAdminFunctions = "/cfajax/core/adminAjax.cfm";
_cfFactoryFunctions = "/cfajax/core/factoryAjax.cfm";
_cfInTheMediaFunctions = "/cfajax/core/mediaFunctions.cfm";
_pdaFunctions = siteUrl + '/cfLib/global.cfm';
_cfcalendarLocation = siteUrl + '/calendar.cfm';
_cfParametersFunctions = siteUrl+"/cfajax/core/parameterAjax.cfm";
_cfPaymentsFunctions = siteUrl + "/cfLib/paymentsAjaxCalls.cfm";
_cfShoppingCartFunctions = siteUrl + "/cfLib/shoppingCartAjaxCalls.cfm";
_cfShoppingCartFunctionsSharedPages = siteUrl + "/sharedpages/cfLib/shoppingCartAjaxCalls.cfm";
_cfInstoreFunctions = siteUrl + "/cfLib/inStoreAjaxCalls.cfm";
_cfAdminSalesFunctions = siteUrl + "/cfLib/adminSalesAjaxCalls.cfm";
_cfGiftcardFunctions = siteUrl + "admin/content/specificComponents/salesSubComponents/GiftCardAjaxCalls.cfm";
_cfAdminEmailFunctions = siteUrl + "/cfLib/adminEmailAjaxCalls.cfm";

_cfVTS6_AjaxCalls = siteUrl + "/cfLib/genericAjaxCalls.cfm";
_cfFormGenerator = siteUrl + "/cfLib/administration/ajax_formGenerator.cfm";
_cfEmails = siteUrl + "/admin/administration/ajax_emails.cfm";
_cfUserRights = siteUrl + "/cfLib/administration/ajax_userRights.cfm";
_cfRunwayAjax = siteUrl + "/cflib/runwayAjaxFunctions.cfm";

_cfBannerModuleV2 = siteUrl + "/cfajax/core/bannersV7_ajax.cfm";
_cfBannerModuleV8 = "/sharedPages/com/b2c/banners/banners_ajax.cfm";
_cfQuickView = siteUrl + "/frontEndComponents/specificComponents/b2c/style/showQuickView.cfm";

_cfRefreshSessionFunctionsLocation =  "/frontEndComponents/specificComponents/refreshSessionAjax.cfm";
function errorHandler(message)
{
	//$('disabledZone').style.visibility = 'hidden';
    if (typeof message == "object" && message.name == "Error" && message.description)
    {
        alert("Error: " + message.description);
    }
    else
    {
        alert(message);
    }
};
