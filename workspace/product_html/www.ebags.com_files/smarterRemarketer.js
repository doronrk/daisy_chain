define("smarterRemarketer/smarterRemarketer",["jquery","get!core/eBags"],function(n,t){t.subscribe("/sku/change",function(n){window.dataLayer.push({event:"ProductColorChange",pageType:"product",productId:n})});t.subscribe("/sku/select",function(n){window.dataLayer.push({event:"ProductColorChange",pageType:"product",productId:n.SkuId})});n(document).on("click","#quicksignup input[type=submit]",function(){window.dataLayer.push({event:"Email",email:n("#quicksignup #txtEmailAddress").val(),emailType:"marketing"});n("#quicksignup #chkSubscribeToStealsOfTheDay").is(":checked")&&window.dataLayer.push({event:"Email",email:n("#quicksignup #txtEmailAddress").val(),emailType:"alert"})});n(document).on("change","#SignInCustomer_CustomerEmail",function(){var t="account";n("#memberSignin").length==0&&(t="account");window.dataLayer.push({event:"Email",email:n("#SignInCustomer_CustomerEmail").val(),emailType:t,optIn:null})});n(document).on("change","#SignInGuest_GuestEmail",function(){n("#SignInGuest_SignUpForEmail").is(":checked")?window.dataLayer.push({event:"Email",email:n("#SignInGuest_GuestEmail").val(),emailType:"transact",optIn:!0}):window.dataLayer.push({event:"Email",email:n("#SignInGuest_GuestEmail").val(),emailType:"transact",optIn:!1})});n(document).on("click","#SignInGuest_SignUpForEmail",function(){n("#SignInGuest_SignUpForEmail").is(":checked")?window.dataLayer.push({event:"Email",email:n("#SignInGuest_GuestEmail").val(),emailType:"transact",optIn:!0}):window.dataLayer.push({event:"Email",email:n("#SignInGuest_GuestEmail").val(),emailType:"transact",optIn:!1})});n(document).on("click","#emailAcquisitionLightboxLightSubmit",function(){window.dataLayer.push({event:"Email",email:n("#emailAcquisitionLightboxLightBoxEmail").val(),emailType:"marketing"});n("#emailAcquisitionLightboxLightBoxSignUp").is(":checked")&&window.dataLayer.push({event:"Email",email:n("#emailAcquisitionLightboxLightBoxEmail").val(),emailType:"alert"})});n(document).on("change","#brandAlertsForm",function(){window.dataLayer.push({event:"Email",email:n("#brandAlertsEmail").val(),emailType:"alert"})});n(document).on("change","#stealOfTheDayPopupEmail",function(){window.dataLayer.push({event:"Email",email:n("#stealOfTheDayPopupEmail").val(),emailType:"alert"});window.dataLayer.push({event:"Email",email:n("#stealOfTheDayPopupEmail").val(),emailType:"marketing"})});n(document).on("change","#frmRegisterResponsive #CustomerEmailResponsive",function(){window.dataLayer.push({event:"Email",email:n("#CustomerEmailResponsive").val(),emailType:"marketing",optIn:!0});n("#SubscribeToStealsOfTheDay").is(":checked")&&window.dataLayer.push({event:"Email",email:n("#CustomerEmailResponsive").val(),emailType:"alert",optIn:!0})});n(document).on("change","#frmRegisterResponsive #SubscribeToStealsOfTheDay",function(){var t=!1;n("#SubscribeToStealsOfTheDay").is(":checked")&&(t=!0);window.dataLayer.push({event:"Email",email:n("#CustomerEmailResponsive").val(),emailType:"alert",optIn:t})});n(document).on("click","form#frmRegisterRewardsGuestAjax button#submitRewardsRegister, form#frmCompleteAccountAjax button#submitCompleteAccountAjaxModal",function(){window.dataLayer.push({event:"Email",email:n(this).closest("form").find("#CustomerEmail").val(),emailType:"marketing",optIn:!0});n(this).closest("form").find("#SubscribeToStealOfTheDay").is(":checked")&&window.dataLayer.push({event:"Email",email:n(this).closest("form").find("#CustomerEmail").val(),emailType:"alert",optIn:!0})});t.subscribe("/rewardsmember/register",function(){n("div#rewards-message").each(function(){var t=n(this),i=t.find("#CustomerEmailResponsive").val(),r=t.find("#SubscribeToStealsOfTheDay").is(":checked");window.dataLayer.push({event:"Email",email:i,emailType:"marketing",optIn:!0});r&&window.dataLayer.push({event:"Email",email:i,emailType:"alert",optIn:!0})})});n(document).on("change",".radioBtn.dclItem.NonShopRunnerShippingOption",function(){var t=n(this).val(),i="other";t==1?i="standard":t==2||t==4||t==5?i="twoday":(t==3||t==6)&&(i="nextday");window.dataLayer.push({event:"ShipType",smrShippingType:i})});n(document).on("click","#SelectedPaymentTypeCreditCard",function(){window.dataLayer.push({event:"PaymentType",smrPaymentType:"cc"})});n(document).on("click","#SelectedPaymentTypePayPal",function(){window.dataLayer.push({event:"PaymentType",smrPaymentType:"pp"})});n(document).on("click","#SelectedPaymentTypeBillMeLater",function(){window.dataLayer.push({event:"PaymentType",smrPaymentType:"bml"})});n(document).on("change","#GiftCertPaymentViewModel_GiftCertCode",function(){window.dataLayer.push({event:"PaymentType",smrPaymentType:"gc"})});n(document).on("change","#enterMeCode",function(){window.dataLayer.push({event:"Promo",promoCode:escape(n(this).val())})})})