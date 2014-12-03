function GetFragmentReq(){}
GetFragmentReq.prototype.objectType=function(){return "GetFragmentReq";}
var GetFragmentReq_url = "url";

function ContextChooserReq(){}
ContextChooserReq.prototype.objectType=function(){return "ContextChooserReq";}
var ContextChooserReq_country = "country";
var ContextChooserReq_currency = "currency";
var ContextChooserReq_language= "language";

/* NMG_INTL_ UI Change for new CLC Flow */
function RestrictedItemsVerfierReq(){}
RestrictedItemsVerfierReq.prototype.objectType=function(){return "RestrictedItemsVerfierReq";}

function ShoppingBagItemsVerifierResponse(){}
ShoppingBagItemsVerifierResponse.prototype.objectType=function(){return "ShoppingBagItemsVerifierResponse";}

/* Language Selection */
function LanguageDisplayReq(){}
LanguageDisplayReq.prototype.objectType=function(){return "LanguageDisplayReq";}

function LanguageDisplayResponse(){}
LanguageDisplayResponse.prototype.objectType=function(){return "LanguageDisplayResponse";}

/* INT-623 language selection */
function ContextChooserResponse(){}
ContextChooserResponse.prototype.objectType=function(){return "ContextChooserResponse";}

function EmailLookUpReq(){}
EmailLookUpReq.prototype.objectType=function(){return "EmailLookUpReq";}
var emailLookUpReq_email = "email";

function EmailLookUpResp(){}
EmailLookUpResp.prototype.objectType=function(){return "EmailLookUpResp";}
var nm = window.nm || {};
/* Boxhop Address processing request */
function BoxHopAddressReq(){}
BoxHopAddressReq.prototype.objectType=function(){return "BoxHopAddressReq";}
var BoxHopAddressReq_firstName="firstName";
var BoxHopAddressReq_lastName="lastName";
var BoxHopAddressReq_address1="addressLine1";
var BoxHopAddressReq_address2="addressLine2";
var BoxHopAddressReq_city="city";
var BoxHopAddressReq_state="state";
var BoxHopAddressReq_zip="zip";
var BoxHopAddressReq_country="country";
var BoxHopAddressReq_phone="dayTelephone";
var BoxHopAddressReq_email="emailAddress";
var BoxHopAddressReq_shippingPage="shippingPage";
var isBoxhopResponsePage=false;

function BoxHopAddressResp(){}
BoxHopAddressResp.prototype.objectType=function(){return "BoxHopAddressResp";}
/* Callback method for Boxhop Continue Shopping button on Modal  */
function merchantCallbackFunction(){
	if(pageDefId !=undefined && pageDefId == 'Shipping'){
		redirectUrl = nm.util.rewriteUrlWithLocaleDir('/checkout/shipping.jsp');
		window.location = redirectUrl;
	}
}
/* Callback method for Boxhop Close button on Modal  */
function onCloseEvent(){
	if((pageDefId !=undefined && pageDefId == 'Shipping') && isBoxhopResponsePage == true){
		redirectUrl = nm.util.rewriteUrlWithLocaleDir('/checkout/shipping.jsp');
		window.location = redirectUrl;
	}
}
nm.headerScript = (function($) {
	
	function init() {
		
		$('body').delegate('#contextChooserCountry','change', function(ev){
			var selectCountry = $(this).val();
			if(selectCountry == "CN" || selectCountry == "BH" || selectCountry == "SA" || selectCountry == "QA" || selectCountry == "KW" ||  selectCountry == "AE")  {
				var abtest = $("#abTest"+selectCountry).val();
				if(abtest != 'controlGroup' && abtest != '') {
					$(".contextChooserLanguageSeletor").removeClass('hide');
				}
				else{
					$(".contextChooserLanguageSeletor").addClass('hide');
				}
			}
			
		});
		
		$('body').delegate('#assistanceHeaderLink','click', function(ev){
			var $assistDD = $('#assistDD');
			$assistDD.toggleClass('active');
		});

		$('#assistDD').delegate('#assistanceClose','click', function(ev){
			var $assistDD = $('#assistDD');
			$assistDD.removeClass('active');
		});
		
		$('body').click(function(ev){
			var $assistDD = $('#assistDD');
			if(!$assistDD.is(ev.target)  && $assistDD.has(ev.target).length === 0){
				$assistDD.removeClass('active');
			}
		});
		
		$('body').delegate('#changeCountryLink','click', function(ev){
			ev.preventDefault();  /*this prevents the raiseShield() function (in the nm.endeca.filter.ajax.js file) from being called*/
			var getFragmentReq = new GetFragmentReq();
			getFragmentReq[GetFragmentReq_url] = '/page/service/contextChooser.jsp';
			defaultGateway.ajaxService(getFragmentReq, viewContextChooser, onError, null, this);
		});
		
		$('body').delegate('#welcome','click', function(ev){
			var getFragmentReq = new GetFragmentReq();
			getFragmentReq[GetFragmentReq_url] = '/welcomeMatTest.jsp';
			defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
		});
		
		/*	 Header Language toggle for China Experience Start Here */
		$('body').delegate('.languagetoggle','click', function(){
			var languageDisplayReq = new LanguageDisplayReq();
			languageDisplayReq.language= $("#profileLang").val();
			defaultGateway.ajaxService(languageDisplayReq, translateContent, onError, "setLangPreference", this);
		});	
		/*	 Header Language toggle for China Experience End Here */
		
			/* INT 1201 - Form field display in User registration Billing address*/
		$('body').delegate('#registrationForm #registration_country','change', function(){
				/*show State/ Province field based on the country selected*/
				if($('#registrationForm #registration_country').length !=0 && $('#brandCode').val() == 'WN') 
				nm.localizationUtil.localizeForm($(this).val(),"registrationForm",false);			
				
			}).ready(function(){ 
				var country = $('#registrationForm #registration_country').val();
				if(country == ''){
					country = $('#intl-countrycode').val();
				}
				if($('#registrationForm #registration_country').length !=0 && $('#brandCode').val() == 'WN') 
				nm.localizationUtil.localizeForm(country,"registrationForm",false);
			});
			/* INT 556 1201 - New User Registration Page JS Code - Start Here */
			/* Pinyin to Latin conversion Handling Function Start Here - New User Registration Page */
			$('#registrationForm, body.account.login').delegate('input[type="text"], input[type="email"], input[type="password"]','focusout',function(event)
			{ 
				if($('#intl-countrycode').val()!='US'){ 
					var inputboxId = $(this).attr("id");
					if(!nm.localizationUtil.convertPinyinToLatinText($('#'+inputboxId).val(),inputboxId))
						nm.localizationUtil.showPinyinErrorMsgInline(inputboxId);
				}
			});
			
			/* If there any Pinyin Error message */
			$('body').delegate('#registrationForm input[type="submit"]', 'click', function()
			{
				var isInternational = ($('#isInternationalUser').val() != undefined) && ($('#isInternationalUser').val() == "true");
				if(isInternational) {
					/* ZipCode validation for Canada - Starts */
					var isValidCAProvince = nm.localizationUtil.hasValidCAProvince( $('#registration_province'), 
																$('#registration_postalcode'), 
																$('#registration_country').val(), 
																$('#intl-countrycode').val(), 
																"h6", 
																"errorMsg" 
															  );
					/* ZipCode validation for Canada - Ends*/
					if(!isValidCAProvince)
						return false;
				}

				if($('.pinyinErrorMsg').length !=0)
					return false; 
				
				if($('#registrationForm #registration_country').val()=='US')
					$('#registrationForm #registration_province').val('');
				
				return true;
			});
			/* Pinyin to Latin conversion Handling Function End Here*/
			
			$('.billingPrompt a').click(function(){
				$('.billingPrompt, .billingInfo').addClass('enter');
				if($('#isInternationalUser').val() == 'true') {
					$('#registration_country').val($('#intl-countrycode').val());
				}
				$('#hasBilling').val('true');
			});
		/* New User Registration Page JS Code - End Here */	
			
			/* Omniture tracking code to capture country and alert msg in registration page
			$('#saveRegBtn').click(function(){
				omnitureHandler.captureCountry($('#registration_country').val());
				alertTrack($.trim($('.userMgs').text()));
			});*/
			
			/* Omniture tracking code to capture alert msg in password reset page*/
			$('#loginContainer .btn').click(function(){
				alertTrack($.trim($('#pwdMsg').text()));
			});
			
			/* Email Pattern Added through JS For Email field */
			$('.emailAddField').attr("pattern", "[^@]+@[^@]+\.[a-zA-Z]{2,6}");	
			
			
			
	}
	
	function translateContent(response){
			var newURL = nm.localizationUtil.urlRewrite(response.languagePreference,response.countryPreference);
			window.location.href =newURL;
		}
	
	function highlightCurrentSilo(currentSiloId) {
		$('#siloheader').find('[id^=silo]').filter(function() {
			var siloId = '';
			var href = $(this).attr('href');
			
			if (href) {
				siloId = getUrlParam('siloId', href);
			} else {
				siloId = $(this).data('category-id');
			}
			
			/*filter down to silo that matches any of the current catIds*/
			return siloId && siloId == currentSiloId;
			
		}).addClass('current');
	}
	
	function loadContextChooserForFiftyOne()
	{
		var getFragmentReq = new GetFragmentReq();
		getFragmentReq[GetFragmentReq_url] = '/page/service/contextChooser.jsp';
		defaultGateway.ajaxService(getFragmentReq, viewContextChooser, onError, null, this);
	}
	function invokeChinaRedirectWelcomeMat(ev){
		var getFragmentReq = new GetFragmentReq();
		getFragmentReq[GetFragmentReq_url] = '/chinaRedirectWelcomeMat.jsp';
		defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
	}
	function invokeNMWelcomeMat(ev){
		var getFragmentReq = new GetFragmentReq();
		getFragmentReq[GetFragmentReq_url] = '/NMWelcomeMat.jsp';
		defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
	}
	
	//Alipay changes Start here
	function invokeCustomWelcomeMat(ev){
		var getFragmentReq = new GetFragmentReq();
		getFragmentReq[GetFragmentReq_url] = '/NMWelcomeMat.jsp?srApEnabled='+ev;
		defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
	}
	//Alipay changes end here
	
	//BoxHop Changes Start Here
	function isBoxHopSupportedCountry() {
		 $.ajax({
				url:boxHopCountrySupportedURL,
		    	type: 'GET',
				dataType: "json",
			    success:function(data) {
					if(data!=null && data.status==="OK"){
						invokeBoxHopModal();
					}
					if(data!=null && data.status==="error"){
						//invokeBoxHopModal();
					}
		    	},
				error: function (xhr, ajaxOptions, thrownError) {
						//invokeBoxHopModal();
				}
		  });
	}
	
	function displayBoxHopModal(){
		omnitureHandler.captureBoxHopLearnMoreModal();
		var vendorID = $('#vendorID').val();
		boxHopPartnerOverlay.init(vendorID);
		closeBoxHopModal();
		boxHopPartnerOverlay.isAccountCreated()
		.done(function(data) {
		
		var boxHopAddressReq = new BoxHopAddressReq();
		var boxhopStreet=data.streetAddress;
		var boxhopSuitId=data.suiteID;
		var boxhopCity=data.city;
		var boxhopZipCode=data.zip;
		boxHopAddressReq[BoxHopAddressReq_firstName] =  data.bh_firstName;
		boxHopAddressReq[BoxHopAddressReq_lastName] = data.bh_lastName;
		boxHopAddressReq[BoxHopAddressReq_address1] = boxhopStreet;
		boxHopAddressReq[BoxHopAddressReq_address2] = "Suite # "+boxhopSuitId;
		boxHopAddressReq[BoxHopAddressReq_city] = boxhopCity;
		boxHopAddressReq[BoxHopAddressReq_state] = data.state;
		boxHopAddressReq[BoxHopAddressReq_zip] = boxhopZipCode;
		boxHopAddressReq[BoxHopAddressReq_country] = data.country;
		var formattedPhone= data.csr;		
		if (formattedPhone!=null) {
			formattedPhone = formattedPhone.replace(/[^\d]/g,"");
			formattedPhone = formattedPhone.substr(-10);
		}
		boxHopAddressReq[BoxHopAddressReq_phone] = formattedPhone;
		boxHopAddressReq[BoxHopAddressReq_email] = data.email;	
		if(pageDefId !=undefined && pageDefId == 'Shipping'){
			boxHopAddressReq[BoxHopAddressReq_shippingPage] = true;
		}
		if(boxhopStreet != null && boxhopSuitId != null && boxhopCity != null && boxhopZipCode != null ){
			var BoxHopAddress = data.bh_firstName + "," + data.bh_lastName + "," + data.streetAddress + "," + "Suite # "+ data.suiteID + "," + data.city + "," + data.state + "," + data.zip + "," + data.country + "," + formattedPhone;
			nm.cookie.set("boxhopaddr",BoxHopAddress,'365','/');
		}
		isBoxhopResponsePage=true;
		checkoutGateway.ajaxService(
			    {
			      obj : boxHopAddressReq, 
			      success : redirecToShipping,
			      service : 'createAddressForBoxhop'
			    });
		})
		.fail(function (data) {
			console.log('***** Registration Failed :('+data+')');
			
		});
		
	}
	function redirecToShipping(){}
	function invokeBoxHopModal(){
		omnitureHandler.captureBoxHopInitialModal();
		var getFragmentReq = new GetFragmentReq();	
		getFragmentReq[GetFragmentReq_url] = '/page/promo/newcustomer/boxhop.jsp';
		defaultGateway.ajaxService(getFragmentReq, showBoxHopModal, onError, null, this);
		$('#bh-closebtn').live('click', closeBoxHopModal);
		$('html').bind('click', handleBoxHopModalClose);
	}
	
    function showBoxHopModal(content) {
		lightboxWindow.Populate(content.string);
		if($.browser.msie && parseFloat($.browser.version) > 7){
			$('.jqmOverlay').addClass('bh-overlayie');
			$('.bh-overlayie').removeClass('jqmOverlay');
		}else{
			$('.jqmOverlay').addClass('bh-overlay');
		}
		if(pageDefId !=undefined && pageDefId == 'Shipping'){
			var x=$("#contentbody .main").offset().left-262;
			var width=$("#contentbody .main").width();
			var y=$("#contentbody .main").offset().top;
			$('#lightboxContent').offset({ top: y+10, left: x+width });
		}
		if(pageDefId !=undefined && pageDefId == 'Cart'){
			$('.bh-popover').addClass('bh-cart-ceter');
		}
		
	}
    function closeBoxHopModal() {
    	$('.bh-popover').removeClass('bh-cart-ceter');
    	if($.browser.msie && parseFloat($.browser.version) > 7){
			$('.bh-overlayie').addClass('jqmOverlay');
			$('.jqmOverlay').removeClass('bh-overlayie');
		}else{
			$('.jqmOverlay').removeClass('bh-overlay');
		}
	    $('html').unbind('click', handleBoxHopModalClose);
	    lightboxWindow.Close();
	}
    function handleBoxHopModalClose(e) {
    	var bhPopup = $('.bh-popover').find(e.target);
    	if(bhPopup.size()==0 && !$(e.target).hasClass('bh-popover')){
    		closeBoxHopModal();
    	}
	}
  	//BoxHop Changes End Here
	
	function invokeFiftyOneWelcomeMat(ev){
		var getFragmentReq = new GetFragmentReq();
/*		getFragmentReq[GetFragmentReq_url] = ev;*/
		getFragmentReq[GetFragmentReq_url] = 'https://sandbox.fiftyone.com/welcome/welcome.srv?merchId=3646&countryId=IN&setCookie=Y';
		defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
	}
	
	function invokeRestrictionModal(ev){
		ev = ev.replace(/&#039;+/g,"\'");
		var url = "/page/service/shoppingBagRestrictionPage.jsp?shoppingBagErrorMessage=" + ev;
			var getFragmentReq = new GetFragmentReq();
			getFragmentReq[GetFragmentReq_url] = url;
			defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
		}
	
	/*  To Show context chooser with Language dropdown */
	function viewContextChooser(content){
		showFragLightbox(content);
		omnitureHandler.contextChooserLoad();
		$('#lightboxContent').ready(function(){ 
			
			if($('#contextChooserCountry').val() == 'US')
				   $('#contextChooserCurrency').attr('disabled', 'true');
			
			$('#contextChooserCountry').focus(function(event){
				setCurrency(event);
			});
			
			$('#contextChooserCountry').change(function(event){
				setCurrency(event);
			});
			
			$('.contextChooser').delegate('.submit', 'click', function(e){
				setCountryAndCurrencyPrefs($('#ccProfileCountryName').val());
			});	
			
			$('.contextChooser').delegate('.cancel', 'click', function(e){
				clickInteraction('Cancel');
				lightboxWindow.Close();
			});
			
			var localizedCountryList = $('#localizedCountryList').val();
			if(localizedCountryList.indexOf($('#intl-countrycode').val()) != -1){
				var languageDisplayReq = new LanguageDisplayReq();
				languageDisplayReq.country= $('#intl-countrycode').val();
				defaultGateway.ajaxService(languageDisplayReq, languageDisplayResponse, onError, "getLangPreference", this);
			}
		});
	}
	
	function showFragLightbox(content) {
		lightboxWindow.Populate(content.string);
	}
	
	function highlightCurrentSilo(currentSiloId) {
		$('#siloheader').find('[id^=silo]').filter(function() {
			var siloId = '';
			var href = $(this).attr('href');
			
			if (href) {
				siloId = getUrlParam('siloId', href);
			} else {
				siloId = $(this).data('category-id');
			}
			
			/* filter down to silo that matches any of the current catIds*/
			return siloId && siloId == currentSiloId;
			
		}).addClass('current');
	}

	function onError(error) {
		alert('There was an error processing your request.');
	}
	
	/* NMG_INTL_ UI Change for new CLC - starts*/
	var selectedCountry = 'US';
	var selectedCountryName = 'United States';
	var selectedCurrency = 'USD';
	var currentProfileCountryName = 'United States';
	var selectedLanguage='en';
	
	function setCountryAndCurrencyPrefs(previouslySelectedCountry) {
		currentProfileCountryName = previouslySelectedCountry;
		selectedCountry = document.getElementById("contextChooserCountry").value;
		selectedCountryName = $("#contextChooserCountry>option:selected").html();
		selectedCurrency = document.getElementById("contextChooserCurrency").value;
		if( !$('.contextChooserLanguageSeletor').hasClass('hide') && $('.contextChooserLanguageSeletor').val()!=undefined){
			selectedLanguage= document.getElementById("contextChooserLanguage").value;
		}
		else{
			selectedLanguage='en';
		}
		verifyShoppingBagRestrictedItems();
	}
	
	var restrCountry;
	function verifyShoppingBagRestrictedItems() {
		var restrictedItemsVerifier = new RestrictedItemsVerfierReq();
		restrictedItemsVerifier.country=document.getElementById("contextChooserCountry").value;
		restrCountry=restrictedItemsVerifier.country;
		defaultGateway.ajaxService({
			obj:restrictedItemsVerifier,success:onRestrictedItemsVerifierSuccess,error:onError, callObj:this,service:null
		});
	}
	
	function onRestrictedItemsVerifierSuccess(response) {
		 lightboxWindow.Close();
		   if(response.hasRestrictedItems) {
			var getFragmentReq = new GetFragmentReq();
			getFragmentReq[GetFragmentReq_url] = '/page/service/shoppingBagUpdate.jsp?restrCountry='+restrCountry;
			defaultGateway.ajaxService({
				obj:getFragmentReq, success:showShoppingBagUpdateOverlay, error:onError, callObj:this,service:null
			});
			/*NMG_ INTL UI_Change */
			$('.intlShoppingBagUpdate .submit').die('click').live('click', function(ev){
				/* Omniture: Capturing Item Code, Quantity and Price */
				var restrProducts = new Array();
				var restrQuantities = new Array();
				var restrPrices = new Array();
				jQuery('.shoppingBagUpdateItems .shoppingBagUpdateProduct .shoppingBagUpdateItemDetail').each(function(idx,element) {
					restrProducts.push($(element).find('.code').text().substring(12).replace(/\s/g, ''));
					restrQuantities.push($(element).find('.itemQty').val());
					restrPrices.push($(element).find('.itemRawPrice').val());
				});
				omnitureHandler.productsRemovedFromSBUOverlay(restrProducts, restrPrices, restrQuantities,$('.intlShoppingBagUpdate .submit').val(),selectedCountry,selectedLanguage);
				/* Omniture: Capturing Item Code, Quantity and Price */
				$('.intlShoppingBagUpdate .country').val(selectedCountry);
				$('.intlShoppingBagUpdate .currency').val(selectedCurrency);
				$('.intlShoppingBagUpdate .language').val(selectedLanguage);
			});
			
			$('.intlShoppingBagUpdate .cancel').die('click').live('click', function(ev){
				/*clickInteraction('Cancel');*/
				 /* Omniture: Firing Event 22 */
				 omnitureHandler.ShoppingBagUpdateCanel('Cancel');
				 
				lightboxWindow.Close();
				
			});
			/*NMG_ INTL UI_Change Ends */
		}
		else {
			confirmCountryAndCurrencyPrefs();
		}
	}
	
	function showShoppingBagUpdateOverlay(content) {
		var currCountry=$('#intl-countrycode').val();
		omnitureHandler.contextChooser($('#contextChooserCountry').val(),$('#contextChooserLanguage').val(),$('#contextChooserCurrency').val(),currCountry);
		lightboxWindow.Populate(content.string);
		omnitureHandler.restrictedShoppingBagUpdate(selectedCountry,selectedLanguage,selectedCurrency);
		
		$('.intlShoppingBagUpdate .shoppingBagUpdateShipToCountryTxt').text(selectedCountryName);
		$('.intlShoppingBagUpdate .shoppingBagUpdateCountryTxt').text(currentProfileCountryName);
	}
	
	function confirmShoppingBagUpdateItems() {
		confirmCountryAndCurrencyPrefs();
	}
	
	function confirmCountryAndCurrencyPrefs() {
		var currCountry=$('#intl-countrycode').val();		
		omnitureHandler.contextChooser(selectedCountry,selectedLanguage,selectedCurrency,currCountry);
		var ccr = new ContextChooserReq();
		ccr.country = selectedCountry;
		ccr.currency = selectedCurrency;
		ccr.language = selectedLanguage;
		defaultGateway.ajaxService({
			obj:ccr,success:closeContextChooser,error:onError,callObj:this,service:null
		});
	}
	/* NMG_INTL_ UI Change for new CLC - ends*/
	
	function shipToUS() {
		var contextChooserReq = new ContextChooserReq();		
		contextChooserReq[ContextChooserReq_country] = 'US';
		contextChooserReq[ContextChooserReq_currency] = 'USD';
		defaultGateway.ajaxService(contextChooserReq, closeContextChooser, onError, null, this);
	}

	function closeContextChooser(response) { 
		lightboxWindow.Close();
		var newURL = nm.localizationUtil.urlRewriteWithExclusion(response);
		if (newURL.indexOf("showContextChooser") > 0){
			newURL = newURL.replace("showContextChooser", "hideContextChooser");
		}
		location.href=newURL;
	}
	
	/*
	 * Currently, the function is called when the onchange and onfocus events fire.
	 * The event is passed as a parameter.
	 * The currency that corresponds to the selected country should
	 * only be changed when the onchange event fires and when the country is not Canada,
	 * which defaults to the US Dollars because this functionality is not supported via FiftyOne, 
	 * but by the current online implementation, which only supports the US Dollars.
	 * When the onfocus event fires(when the modal initially opens), the currency will be defaulted
	 * to the currency preference stored in the customer's profile.
	 */
	function setCurrency(e) {
		var selectCountry = document.getElementById("contextChooserCountry");
		var selectCurrency = document.getElementById("contextChooserCurrency");
		var selectCurrencyLength = selectCurrency.length;
		
		for (i = 0; i < selectCurrencyLength; i++) {
			/* the selectCountry id contains the currency code, the selectCountry value contains the country code*/
			if (selectCurrency.options[i].value == selectCountry.options[selectCountry.selectedIndex].id) {
				/* change the currency that corresponds to the selected country only when the onchange event fires*/
				if (e.type == 'change') {
					
					if (selectCountry.options[selectCountry.selectedIndex].value == 'CA' || selectCountry.options[selectCountry.selectedIndex].value == 'RU') {							
					
						selectCurrency.options[selectCurrency.selectedIndex].value = 'USD';
						selectCurrency.options[selectCurrency.selectedIndex].text = 'US Dollar';
					} else {
						
							var localizedCountryList = $('#localizedCountryList').val();
						/*  Enable Language Drop Down for China Code Start Here */
						if(localizedCountryList.indexOf(selectCountry.options[selectCountry.selectedIndex].value) !=-1)
							{
								var languageDisplayReq = new LanguageDisplayReq();
								languageDisplayReq.country= selectCountry.options[selectCountry.selectedIndex].value;
								defaultGateway.ajaxService(languageDisplayReq, languageDisplayResponse, onError, "getLangPreference", this);
							}
						else
							$('.contextChooserLanguageSeletor').addClass('hide');
						/* Enable Language Drop Down for China Code End Here */
						selectCurrency.selectedIndex = i;
					}	
				}	
			} 
		}
		
		/* disable the selectCurrency drop-down for the United States and Canada since on the US Dollar is supported*/ 
		if (selectCountry.options[selectCountry.selectedIndex].value == 'US' ||
			 (selectCountry.options[selectCountry.selectedIndex].value == 'CA' && !nmFityOneEnabled) ) {
			selectCurrency.disabled = "disabled";
		} else {
			selectCurrency.disabled = "";
		}
	}
	
	/*  Show Language DropDwon in CLC */
	function languageDisplayResponse(response){
		var data= response.languageCodeValueMap.entry;
		var selectCountry = $("#contextChooserCountry").val();
		var option="";
		if(data.length!=0){
			$.each(data,function(i){
				option+="<option value='" + data[i].string[0] +"'>" + data[i].string[1] + "</option>";
				});
				
				$("#contextChooserLanguage").html(option);
				var localizedCountryList = $('#localizedCountryList').val();
				if(localizedCountryList.indexOf($('#intl-countrycode').val()) != -1){
					$("#contextChooserLanguage").val(response.languagePreference);
				}
				else
					$("#contextChooserLanguage").val('zh');
				$(".contextChooserLanguageSeletor").removeClass('hide');
				if(selectCountry == "CN" || selectCountry == "BH" || selectCountry == "SA" || selectCountry == "QA" || selectCountry == "KW" ||  selectCountry == "AE")  {
					
					var abtest = $("#abTest"+selectCountry).val();
					if(abtest != 'controlGroup') {
						$(".contextChooserLanguageSeletor").removeClass('hide');
					}
					else{
						$(".contextChooserLanguageSeletor").addClass('hide');
					}
				}
				
			}
		}
	
	return {
		init: init,
		confirmCountryAndCurrencyPrefs: confirmCountryAndCurrencyPrefs, /* NMG INTL_UI Change for new CLC */
		highlightCurrentSilo: highlightCurrentSilo,
		setCountryAndCurrencyPrefs: setCountryAndCurrencyPrefs,
		setCurrency: setCurrency,
		shipToUS: shipToUS,
		highlightCurrentSilo: highlightCurrentSilo,
		invokeNMWelcomeMat: invokeNMWelcomeMat,
		invokeCustomWelcomeMat : invokeCustomWelcomeMat,
		invokeFiftyOneWelcomeMat : invokeFiftyOneWelcomeMat,
		loadContextChooserForFiftyOne: loadContextChooserForFiftyOne,
		invokeRestrictionModal:invokeRestrictionModal,
		invokeChinaRedirectWelcomeMat:invokeChinaRedirectWelcomeMat,
		isBoxHopSupportedCountry:isBoxHopSupportedCountry,
		displayBoxHopModal:displayBoxHopModal
	}
})(jQuery.noConflict());

jQuery(nm.headerScript.init);
