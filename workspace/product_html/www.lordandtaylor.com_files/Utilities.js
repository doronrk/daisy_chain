/**
 * Licensed Materials - Property of IBM
 * WebSphere Commerce
 * (C) Copyright IBM Corp. 2008, 2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
dojo.require("dojo.cookie");
dojo.require("dojo.io.script");
dojo.require("wc.service.common");
/**
 * Utilities javascript added for HBC customization
 */
UtilitiesJS={
		
		redirection:null,
	
	/**
	 * 
	 * 
	 * This function checks whether the user is Guest user. 
	 */
		data:"",
		country : new Object(),
		rounding:new Object(),
		isCntryChanged: false,
		fnSetCountry: function (cntry) {
			UtilitiesJS.country = cntry;
		},
		fnSetRounding:function(CurrRounding){
			
			UtilitiesJS.rounding=CurrRounding;
		},
		/***************************************
	     *  UC-7 International Shipping Module. 
	     *  This function set the selected country's currency name and currency code as default currency name and code.
	     ****************************************/
		 showDeffCurency: function (countryCode) {
	        var currCodeName = '';
	        currCodeName = UtilitiesJS.country[countryCode.value].toString();
	        var currCodeNameArr = currCodeName.split("|");
	        var currName = '';
	        var currCode = '';
	        var round_method = '';
	        currName = currCodeNameArr[0];
	        currCode = currCodeNameArr[1];
	        round_method = currCodeNameArr[2];
	        dojo.byId('defaultCurrency_id').value = currName;
	        dojo.byId('defaultCurrencyCode_id').value = currCode;
	        dojo.byId('round_method_id').value = round_method;
	        $("#newCountryPopUpErr").hide();
        	$("#newCurrencyPopUpErr").hide();
	    },
	    /***************************************
	     *  UC-7 International Shipping Module. 
	     *  Function helps to set the correct rounding
	     *  as per customer selected currency.
	     ****************************************/
	    
	    setRoundingMethod: function(currency){
	    	  var round_method = '';
	    	  roundingData = UtilitiesJS.rounding[currency.value].toString();
		       var roundingDataArr = roundingData.split("|");
		        round_method = roundingDataArr[1];
		        dojo.byId('round_method_id').value = round_method;
	    },
	    
	    /***************************************
	     *  UC-7 International Shipping Module. 
	     *  Function helps to display selected country's flag.
	     ****************************************/
	    displayCountryFlag: function () {
	    	if(window.internationalFlowFlag){
		        var currentCountry = UtilitiesJS.getCookie("INTL");
		        currentCountry = currentCountry.split('%7C');
		        $('#countryFlagDiv').html('<img src="/wcsstore/HBCStorefrontAssetStore/images/flagIcons/'+currentCountry[1]+'.png" onload="UtilitiesJS.modifyPageAfterCheckingIntlCookie();"  style="width: 16px; height: 16px;">');
	    	}
	    },
	    /***************************************
	     *  UC-7 International Shipping Module. 
	     *  function helps to remove all selected Promo Codes.
	     ****************************************/
	    removePromoCodesForIntl: function(promoCount,promotionId){
			if($(promotionId).length!=0){
				if($(promotionId).siblings('.salea_pup').length!=0){
					promoCode=$(promotionId).siblings('.salea_pup').text();
				}else {
					promoCode=$(promotionId).val();
				}
				setCurrentId(promotionId);
				//CheckoutHelperJS
				this.removePromotionCode("applyPromoCode",promoCode,"");
				promoCount=promoCount+1;
				promotionId='#promotion_'+promoCount;
				if($(promotionId).length!=0){
					UtilitiesJS.removePromoCodesForIntl(promoCount,promotionId);
				}
				return false;
			}else{
				// call xorder update if no promotions codes are applied by user
				this.updateXorderAndRefresh();
			}
		},
		/*************************************************************
		 * UC-7 International Shipping Module. 
	     * function helps to remove all selected Promo Codes.
	     * Ajax call to update XORDERS details
	     *****************************************/
		updateXorderAndRefresh:function(){	        
	        	var dataParam = [];
		        dataParam.storeId = '10151';
		        dataParam.isIntlFlow = 'Y';
		        dataParam.bopisEligiblity = 'N';
		        dataParam.INTL = UtilitiesJS.getCookie("INTL");
		        wc.service.invoke("HBCAjaxUpdateXordersCmd", dataParam);
		},
		/*************************************************************
		 * UC-7 International Shipping Module. 
	     * function helps to remove all selected Promo Codes.
		 * This function is used to remove a promotion code from the order.		 *
		 *
		 * @param {String} formName	The name of the promotion code entry form.
		 * @param {String} promoCode	The promotion code to remove.
		 * @param {String} returnView	The name of the view that the server should redirect the browser to after a promotion code is applied.
		 */
		removePromotionCode:function(formName, promoCode,returnView) {
			var form = document.forms[formName];
			form.taskType.value='R';
			form.promoCode.value=promoCode.toUpperCase();			
			var service = wc.service.getServiceById('AjaxPromotionCodeManageIntl');
			service.formId = formName;
			cursor_wait();
			wc.service.invoke('AjaxPromotionCodeManageIntl');			
		},
		
	    /***************************************
	     *  UC-7 International Shipping Module. 
	     *  function helps to change the country selected for shipping.
	     ****************************************/
	    fnnewcountrySelect: function () {
	    	if(window.internationalFlowFlag){
	    		$('<div class="loadingCurtain"></div>').appendTo('body');
	        newcountry = dojo.byId('grant_type_id').value;
	        newcurrency = dojo.byId('defaultCurrencyCode_id').value;
	        $("#newCountryPopUpErr").hide();
        	$("#newCurrencyPopUpErr").hide();
	        if(!(newcountry=="") && !(newcurrency=="")){
		        round_method = dojo.byId('round_method_id').value;
		        UtilitiesJS.closeCountryChooserPopUp();
		        var LcpId = "";
		        if (newcountry === "US") {
		            //fetch it frm txt file(Only cc and ccurr)
		          UtilitiesJS.setCookie("INTL","N|US|USD");
		        	
		        }
		        try {
	
		            var currJSON = intlShip.currency;
		            var exchangeRate = currJSON[newcurrency].ExchangeRate;
		            var quoteId = currJSON[newcurrency].QuoteId;
		        } catch (err) {
	
		            newcountry = "US";
		            newcurrency = "USD";
		            //exchangeRate = currJSON[USD].ExchangeRate;
		            //quoteId = currJSON[USD].QuoteId;
	
		        }
		        if (newcountry !== 'US') {
				// call the FetchlcpId function
					LcpId = UtilitiesJS.fetchlcpId(newcountry);
					var cntryPMID = UtilitiesJS. fetchPMID(newcountry);
					
				}
		        try {
	
		            if (exchangeRate > 0 && UtilitiesJS.isDecimal(exchangeRate) &&newcountry !== 'US'&& cntryPMID != "" ) {
		            	UtilitiesJS.setCookie("INTL", "N|" +newcountry + "|" + newcurrency + "|" + exchangeRate + "|" + quoteId + "|" + round_method + "|" +LcpId+ "|" +cntryPMID);
		            }else if(exchangeRate > 0 && UtilitiesJS.isDecimal(exchangeRate) &&newcountry !== 'US'&& cntryPMID == ""){
		            	UtilitiesJS.setCookie("INTL", "N|" +newcountry + "|" + newcurrency + "|" + exchangeRate + "|" + quoteId + "|" + round_method + "|" +LcpId);
		            }else {
		                // default redirect to US
		            	UtilitiesJS.setCookie("INTL", "N|US|USD");
		            }
		        } catch (err) {
		        	UtilitiesJS.setCookie("INTL", "N|US|USD");
		        }
		      //Code added for removal of promo codes
		        if (newcountry !== 'US') {
		        	var promoCount=1;
		        	var promotionId='#promotion_'+promoCount;
		        	UtilitiesJS.removePromoCodesForIntl(promoCount,promotionId);
		        }
		        
		        UtilitiesJS.displayCountryFlag();
		        // Calling xorder update if new country selected is US
		        if (newcountry === 'US') {
		        	this.updateXorderAndRefresh();		        	
		        }
	       
	        }else{
	        	if(newcountry == ""){
	        		$("#newCountryPopUpErr").show();
	        	}
	        	if(newcurrency == ""){
	        		$("#newCurrencyPopUpErr").show();
	        	}
	        }
	      } 
	    },
	    orderCalculateOnChangeCountry: function() {
	    /*************************
         * Calling OrderCalculate.
         ************************/
        var params = [];
		params.orderId='.';
		params.storeId='10151';
		params.catalogId='10102';
		params.langId='-1';
		if(UtilitiesJS.isIntlFlowRequired()){
			wc.service.invoke("AjaxChangeCountryOrderCalculate", params);
		}else{
			params.calculationUsage = "-1,-2,-5,-6,-7";
			wc.service.invoke("AjaxSelectDefualtCountry", params);	
		}
	    },
        
	    isDecimal: function (sText) {
	        var ValidChars = "0123456789.";
	        var IsNumber = true;
	        var Char, i;
	        for (i = 0; i < sText.length && IsNumber == true; i++) {
	            Char = sText.charAt(i);
	            if (ValidChars.indexOf(Char) == -1) {
	                IsNumber = false;
	            }
	        }
	        return IsNumber;
	    },

	    /***************************************
	     *  UC-7 International Shipping Module. 
	     *  fetching lcpid which is to be set in cookie.
	     ****************************************/
	    fetchlcpId: function (cntry) {
	        var countryJson = null;
	        var cntryPMID = "";
	        var lcpMultiplier = 1;
	        var countryJson = UtilitiesJS.countryJsonCheck();
	        if (cntry != null && cntry != "") {
	            try {
	                lcpMultiplier = countryJson[cntry].Rate;
	            } catch (err) {
	                lcpMultiplier = 1;
	            }
	            if (UtilitiesJS.isDecimal(lcpMultiplier) && lcpMultiplier > 1 && lcpMultiplier != "") {
	                try {
	                    cntryPMID = countryJson[cntry].PMID;
	                } catch (err) {
	                    // If the newcountry doesn't have a PMID multiplier defined in the Excha.txt
	                    // then set the PMID value as empty string
	                    cntryPMID = "";
	                }
	            }
	        }
	        return lcpMultiplier;
	    },
	    
	    
	    /***************************************
	     *  UC-7 International shipping changes. 
	     *  fetching country pmid which is to be set in cookie.
	     ****************************************/
	    fetchPMID: function (cntry) {
	        var countryJson = null;
	        var cntryPMID = "";
	        var lcpMultiplier = 1;
	        var countryJson = UtilitiesJS.countryJsonCheck();
	        if (cntry != null && cntry != "") {
	            try {
	                lcpMultiplier = countryJson[cntry].Rate;
	            } catch (err) {
	                lcpMultiplier = 1;
	            }
	            if (UtilitiesJS.isDecimal(lcpMultiplier) && lcpMultiplier != "") {
	                try {
	                    cntryPMID = countryJson[cntry].PMID;
	                } catch (err) {
	                    // If the newcountry doesn't have a PMID multiplier defined in the Excha.txt
	                    // then set the PMID value as empty string
	                    cntryPMID = "";
	                }
	            }
	        }
	        return cntryPMID;
	    },
	    
	    
	    /***************************************
	     *  UC-7 International Shipping Module. 
	     *  fetching country details.
	     ****************************************/
	    countryJsonCheck: function () {
	      if(window.internationalFlowFlag){
	        var countryJson = null;
	        if (typeof intlShip != "undefined") {
	            if (typeof intlShip.country != "undefined" && intlShip.country != null) {
	                countryJson = intlShip.country;
	            }
	        }
	        return countryJson;
	      }
	    },
	    /***************************************
	     *  UC-7 International Shipping Module. 
	     *  closing country selector popup.
	     ****************************************/
	    closePopUp: function () {
	     if(window.internationalFlowFlag){
	        if (document.getElementById('lt-country-popup').style.display == 'block') {
	            document.getElementById('lt-country-popup').style.display = 'none';
	        }
	      } 
	    },
	    
	 /***************************************
	 *  UC-7 International Shipping Module. 
	 *  For international flow showing welcome mat to non-US customer.
	 ****************************************/
	  loadInternational:function(jspImgDir){
		if(UtilitiesJS.isIntlFlowRequired()){
			//dojo.io.script.get({url : jspImgDir +'StaticContent/international/ExchangeRates.txt'});
		    //dojo.io.script.get({url : jspImgDir +'javascript/international/HBCLocalizationUtil.js'});
			var wcURL = '';
			if(welcomeMatURL != null && typeof welcomeMatURL != 'undefined'){
				wcURL = welcomeMatURL;
			}
			 if (!UtilitiesJS.isWelcome()) {
				    var intlCookie=dojo.cookie("INTL");
				    var url=wcURL;
				    var intlCountryCode=intlCookie.split('|');
				    url=url+'&countryId='+intlCountryCode[1];
				    UtilitiesJS.wlcme51func(url);
			}
					
			}
		},
	wlcme51func:function(url) {
			    var wlcme51 = document.createElement("script");
			    wlcme51.src = url;
			    wlcme51.type = "text/javascript";
			    document.getElementsByTagName("head")[0].appendChild(wlcme51);
	},

	isWelcome:function() {
			    var c_name = 'wlcme';
			    if (document.cookie.length > 0) {
			        c_start = document.cookie.indexOf(c_name + "=");
			        if (c_start != -1) {
			            c_start = c_start + c_name.length + 1;
			            c_end = document.cookie.indexOf(";", c_start);
			            if (c_end == -1) c_end = document.cookie.length;
			            return unescape(document.cookie.substring(c_start, c_end));
			        }
			    }
			    return "";
	},

	/**************************************************
	 * UC-7 International Shipping Module. 
	 * Checking for international flow if yes return true
	 **************************************************/
	isIntlFlowRequired:function(){
		if(storeId!=10151){
		return false;
		}
		else{
			if( window.internationalFlowFlag && dojo.cookie("INTL") != null && !(dojo.cookie("INTL").indexOf("US|")!= -1)){
			return true;
		}
		else{
			return false;
		}
		}
	},
	/**************************************************
	 * UC-7 International Shipping Module. 
	 * Checking for international flow if yes return true
	 **************************************************/
	isLTINTLFlowRequired:function(){
		if(storeId!=10151){
		return false;
		}
		else{
			if( window.internationalFlowFlag && dojo.cookie("INTL") != null){
			return true;
		}
		else{
			return false;
		}
		}
	},
	
	/************************************************************************************************************
	* UC-7 International Shipping Module. This function hide and show div's which are not required and required 
	* for international flow respectively. 
	*************************************************************************************************************/
	modifyPageAfterCheckingIntlCookie:function(){
		if(UtilitiesJS.isIntlFlowRequired()){
			$(".intlShipShow").show();
			$(".intlShipHide").hide();
			//hiding shoprunner eligibility image item-level
			$(".checkout-eligible").hide();
			// store locator- removal of shop runner promotions
			if($("#stores_map").length!=0){
				//$("#stores_map").empty();
				$("#stores_map").hide();
			}
	}else{
			$(".intlShipShow").hide();
			$(".intlShipHide").show();
	}
		//Setting the top border for account text to match with lower border of header tools list.
		var lowerBorderOffset = $('#header_top_tool').position().top+$('#header_top_tool').outerHeight(true);
		$('div#account_text').css('margin-top', lowerBorderOffset-1);

	},
	
	/**************************************************************************************************************
	* UC-7 International Shipping Module. This function checks the presence of 'USShopCart=true' parameter in url
	* if it is present the value of INTL cookie is updated to "US|USD".
	***************************************************************************************************************/
	checkForUSshopCartParam:function(){
		if (window.location.search.indexOf('USShopCart=true') != -1) {
    		UtilitiesJS.setCookie("INTL","N|US|USD");
    		HBCLocalizationUtilJS.fnShowPromo();
		} 
	},
	
	/*********************************************
	* UC-7 International Shipping Module.
	* Country selector popup function to change country for international flow.
	**********************************************/
	intlCountrySelectorPopup: function (defaultState) {
		if(window.internationalFlowFlag){
		var countryVal = $('#grant_type_id').val();
		
        if (!$('#intlCountryChooser_popup').length && !UtilitiesJS.isCntryChanged) {
            isCntryChanged = true;
            var params = [];
		    params.storeId = "10151";
		    wc.service.invoke("AjaxIntlCountryChooser", params);
        }
	  }
    },
	isGuestUser: function(){
		/*var isGuest = document.cookie.indexOf("WC_GENERIC_ACTIVITYDATA");
		if(isGuest != null && isGuest != -1)
		{
			return true;
		}
		else
		{
			return false;
		}*/
	
		var welCookie = UtilitiesJS.getCookie("HBC_WELC"); 
		
		if(welCookie == null || welCookie == "" || (welCookie != null && UtilitiesJS.getFirstName() == '0%guest%0'))
		{
			return true;
		}
		else
		{
			return false;
		}
	},
	
	/**
	 * This function checks whether the user is Registered user. 
	 */
	isRememberedUser: function(){
		var isRemUser = document.cookie.indexOf("WC_PERSISTENT");
		if(isRemUser != null && isRemUser != -1)
		{
			return true;
			
		}
		else
		{
			return false;
		}
	},

	/**
	 * This function displays Sign In or Sign Out link and WelcomeSection using isGuestUser() and isRememberedUser()
	 */
	displayBasedOnUserType: function(){

		var headerSignInOut = document.getElementById("WC_LogonLogoffLink_header");
		
		
		if(headerSignInOut != null){
			if(UtilitiesJS.isGuestUser()){
				this.redirection='logon';
				headerSignInOut.href = logonFormURL;
				headerSignInOut.innerHTML = msgSignIn;
				document.getElementById('fromContextDat').value='0';
				$('#fromContextDat').addClass('ssaket');
				
				
			}
			else if(UtilitiesJS.isRememberedUser()){
				this.redirection='wedding';
				headerSignInOut.href = logoffURL;
				headerSignInOut.innerHTML = msgSignOut;
				$('#fromContextDat').addClass('idoy');
				UtilitiesJS.displayWelcomeSection();
			}
			
		}
		
		UtilitiesJS.displayBagItems();
		
	},

	displayInNavBasedOnUserType: function(){

		var headerSignOut = document.getElementById("logout");
		
		
		if(headerSignOut != null){
			
		 if(UtilitiesJS.isRememberedUser()){
				
				headerSignOut.href = logoffURL;
				
			}
			
		}
		
		
		
	},
	setCookie: function(cookieKey, cookieValue){
		dojo.cookie(cookieKey, cookieValue, {path: '/'});
	},
	
	changeLanguage:function(url){
		
		var x = url.search("langId=-24");
		var y = url.search("langId=-25");
		var seoX = url.search("/en/");
		var seoY = url.search("/fr/");
		var seoXY = url.search("langId%3D-24");
		var seoYZ = url.search("langId%3D-25");
		var newURL = url;
		try{
			var labaie = document.getElementById('LABAIEDOMAIN').value;
			var thebay = document.getElementById('THEBAYDOMAIN').value;
		}catch(e)
		{}
		
		var isLabaie = newURL.search(labaie);
		var isThebay = newURL.search(thebay);
		try{
			if (document.getElementById('page_specific_langSwitch_URL').value == "true"){
				
				if (y!=-1){
					newURL = newURL.replace("urlLangId=-25","urlLangId=-24");
					newURL = newURL.replace("langId=-25","langId=-24");
					if(isLabaie!=-1){
						newURL = newURL.replace(labaie,thebay);
					}
						
				}
				
				if (x!=-1){
					newURL = newURL.replace("urlLangId=-24","urlLangId=-25");
					newURL = newURL.replace("langId=-24","langId=-25");
					if(isThebay!=-1){
						newURL = newURL.replace(thebay,labaie);
					}
				}
				
				if (seoX!=-1){
					newURL = newURL.replace("/en/","/fr/");
					if(isThebay!=-1){
						newURL = newURL.replace(thebay,labaie);
						newURL = newURL.replace("thebay","labaie");	
					}
					if (seoXY!=-1){
						newURL = newURL.replace("langId%3D-24","langId%3D-25");
					}
				}
				
				if (seoY!=-1){
					newURL = newURL.replace("/fr/","/en/");
					if(isLabaie!=-1){
						newURL = newURL.replace(labaie,thebay);
						newURL = newURL.replace("labaie","thebay");
					}
					if (seoYZ!=-1){
						newURL = newURL.replace("langId%3D-25","langId%3D-24");
					}
				}
				
				
				return newURL;
			}
			}catch(e)
			{
			var homePageURL = document.getElementById('homePageURL').value;
			var a = homePageURL.search("langId=-24");
			var b = homePageURL.search("langId=-25");
			var seoA = homePageURL.search("/en/");
			var seoB = homePageURL.search("/fr/");
			
			if (a !=-1){
				homePageURL = homePageURL.replace("langId=-24","langId=-25");
				homePageURL = homePageURL.replace("urlLangId=-24","urlLangId=-25");
				if(isThebay!=-1){
					homePageURL = homePageURL.replace(thebay,labaie);
				}
			}
			
			if ( b!=-1 ){
				homePageURL = homePageURL.replace("langId=-25","langId=-24");
				homePageURL = homePageURL.replace("urlLangId=-25","urlLangId=-24");
				if(isLabaie!=-1){
					homePageURL= homePageURL.replace(labaie,thebay);
				}
			}
			
			if (seoA!=-1){
				homePageURL = homePageURL.replace("/en/","/fr/");
				if(isThebay!=-1){
					homePageURL = homePageURL.replace(thebay,labaie);
					homePageURL = homePageURL.replace("thebay","labaie");
				}
			}
			
			if (seoB!=-1){
				homePageURL = homePageURL.replace("/fr/","/en/");
				if(isLabaie!=-1){
					homePageURL= homePageURL.replace(labaie,thebay);
					homePageURL= homePageURL.replace("labaie","thebay");
				}
			}
			
			return homePageURL;
			}
	},
	
	/**
	 * This function fetches the value of the specified cookie
	 * @param name = cookie name
	 * @return the value of the cookie
	 */
	getCookie: function(cookieKey) {

		var cookies = document.cookie.split(';');
		var cookieValue = "";

		for ( var i=0; i < cookies.length; i++ ) {
			var cookie = cookies[i];

			while ( cookie.charAt(0) == ' ' ) {
				cookie = cookie.substring(1, cookie.length );
			}

			if ( cookie.indexOf(cookieKey + "=") == 0 ) {
				cookieValue = cookie.substring(cookieKey.length+1, cookie.length);
				//cookieValue = UtilitiesJS.escapeString(cookieValue);
				//cookieValue = unescape(cookieValue);
			}
		}
		return cookieValue;
	},

	
	/**
	 * This function displays HBC Welcome section with FirstName and HBC Rewards Points for Registered User
	 */
	displayWelcomeSection: function(){
		var headerWelcomeSec = document.getElementById("account_text_subwarp");
		var headerWelcSec = document.getElementById("welcome");
		
		var hbcFirstName = UtilitiesJS.getFirstName();
		var hbcRewardPoints = UtilitiesJS.getPointsBalance();
		
		if(headerWelcomeSec != null){
			headerWelcomeSec.style.display = "block";
			if(msgHBCWelcome != null && msgHBCRewardPoints != null){
				if(hbcRewardPoints != null && hbcRewardPoints != '' && hbcRewardPoints != 0){
					headerWelcomeSec.innerHTML = msgHBCWelcome.replace("{0}",hbcFirstName) + "<br>" + msgHBCRewardPoints.replace("{0}",hbcRewardPoints);
				}
				else{
					headerWelcomeSec.innerHTML = msgHBCWelcome.replace("{0}",hbcFirstName)
				}
			}
		}
		else if(headerWelcSec != null){
			headerWelcSec.style.display = "block";
			headerWelcSec.innerHTML = msgHBCWelcome.replace("{0}",hbcFirstName)
		}
		
	},
	
	/**
	 * This function retrieves the FirstName of the logged in user from the cookie "HBC_WELC" which is in the format "FirstName, HBCRewardPoints"
	 */
	getFirstName: function(){
		var firstName = "";
		var hbcWelcome = UtilitiesJS.getCookie("HBC_WELC");
		/*True fit changes UC-6 begin */
		//Delimiter is changed to pipe instead of comma for truefit
		if(hbcWelcome != ""){
			if(hbcWelcome.indexOf("%7C")!=-1){
				firstName = hbcWelcome.split("%7C")[0];
			}
			else if(hbcWelcome.indexOf("|")!=-1){
				firstName = hbcWelcome.split("|")[0];
			}
		}
		/*True fit changes UC-6 ends */
		return firstName;
	},
	
	/**
	 * This function retrieves the HBCRewardPoints of the logged in user from the cookie "HBC_WELC" which is in the format "FirstName, HBCRewardPoints"
	 */
	getPointsBalance: function(){
		var hbcRewardPoints = 0;
		var hbcWelcome = UtilitiesJS.getCookie("HBC_WELC");
		/* True fit changes UC-6 begin */
		//Delimiter is changed to pipe instead of comma for truefit
		if(hbcWelcome != ""){
			if(hbcWelcome.indexOf("%7C")!=-1){
				hbcRewardPoints = hbcWelcome.split("%7C")[1];
			}
			else if(hbcWelcome.indexOf("|")!=-1){
				hbcRewardPoints = hbcWelcome.split("|")[1];
			}
		}
		/* True fit changes UC-6 ends */
		return hbcRewardPoints;
	},
	
	/**
	 * This function display the no of items in Shopping Bag
	 */
	displayBagItems: function(){
		var bagItemId = document.getElementById("bagItems");
		
		var bagItems = UtilitiesJS.getCookie("HBC_QUANT");
		if(bagItems == null || bagItems == ""){
			bagItems = 0;
		}
		
		if(bagItemId != null){
			//Fix for defect # 1987 - START
			if(bagItems == 1){
				var msg = shopBag.replace("{0}", bagItems);
				bagItemId.innerHTML = msg.replace("Items","Item");
			}else{
				bagItemId.innerHTML = shopBag.replace("{0}", bagItems);
			}
			// Fix for defect # 1987 - END
		}
	},
	
	/**
	 * This function sets the focus on the element based on its Id.
	 */
	elementFocusById: function(id){
		var ele = dojo.byId(id);
		if(ele != null && ele != undefined){
			ele.focus();
		}
	},
	
	/**
	 * This function validates and sets the focus on the fields whose values are mandatory.
	 */
	validateHBCAddress: function(form, HBCReqAddressFields){
		if(form != null && HBCReqAddressFields != null){
			var fields="";
			fields = HBCReqAddressFields.split(",");
			var empty = false;
			for(var i=0; i<fields.length; i++){
				var field = fields[i];
				if(form[field] != null && form[field].value == ""){
					UtilitiesJS.elementFocusById(form[field]);
					//return false;
					empty = true;
				}
			}
			if(empty) {
				UtilitiesJS.elementFocusById(form[fields[0]]);
				return false;
			}
			else{
				return true;				
			}
		}
		return false;
	},
	
	/**
	 * This function sets the display style for the specified field. 
     * @param {string} dojo id for which style to be changed.
     * @param {string} displayStyle, value can be either "none" or "block".
	 */
	toggleErrorMsg: function(id, displayStyle){
		if(id != null){
			id.style.display = displayStyle;
		}
	},
	
	/**
	 * This function load the states in drop down or creates an input text field for state, based on the country selected. 
     * @param {string} formName, name of the form.
	 * @param {string} currentCountryCode The country code of the selected country.
	 */
	loadStatesBasedOnCountry:function(formName, paramPrefix, userStateOrProvince){
		var countries = AddressHelper.getCountryArray();
		var form = document.forms[formName];
		if(paramPrefix == null || paramPrefix == 'undefined'){
			paramPrefix = "";
		}
		var currentCountryCode = form[paramPrefix + "country"].value;
		if(currentCountryCode == null || currentCountryCode == undefined){
			var selcountry = dijit.byId(paramPrefix + "country");
			if(selcountry != null && selcountry != undefined){
				currentCountryCode = selcountry.get("value");	
			}
		}
		var stateDivObj = document.getElementById(paramPrefix + "stateDiv");
		if(stateDivObj != null && stateDivObj != undefined){
			while(stateDivObj.hasChildNodes()) {
				stateDivObj.removeChild(stateDivObj.firstChild);
			}
			var states = "state";
			if (countries[currentCountryCode] != null && countries[currentCountryCode].states != null && 
					countries[currentCountryCode].states != undefined){
				stateDivObj.appendChild(this.createSelectStateWithOptions(paramPrefix, countries, currentCountryCode, states, userStateOrProvince));
			} else {
				stateDivObj.appendChild(this.createInputState(paramPrefix, states, userStateOrProvince));
			}
		}
		this.changeLabelForState(formName, paramPrefix, currentCountryCode);			
		this.changeLabelForZipCode(formName, paramPrefix, currentCountryCode);
		this.changeMaxLengthForZipCode(formName, paramPrefix, currentCountryCode);
		this.togglePhoneNumber(paramPrefix, currentCountryCode);
	},
	
	/**
	 * This function changes the label to State/Province, based on the country selected. 
     * @param {string} paramPrefix, prefix of the form address fields.
	 * @param {string} currentCountryCode The country code of the selected country.
	 */
	changeLabelForState: function(formName, paramPrefix, currentCountryCode){
		var stateDivLabel = document.getElementById(paramPrefix + "stateDivLabel");
		if(stateDivLabel != null && stateDivLabel != undefined){
			if(formName == 'myAcctChngProfile'){
				stateDivLabel.innerHTML = MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"];
			}
			else{
				stateDivLabel.innerHTML = '';
			}
			if(currentCountryCode == "US"){
				stateDivLabel.innerHTML = stateDivLabel.innerHTML + MessageHelper.messages["EMAIL_SUBSCRIPTION_STATE"];	
			}
			else{
				stateDivLabel.innerHTML = stateDivLabel.innerHTML + MessageHelper.messages["EMAIL_SUBSCRIPTION_PROVINCE"];
			}
		}
	},
	
	/**
	 * This function changes the label to ZipCode/Postal Code, based on the country selected. 
     * @param {string} paramPrefix, prefix of the form address fields.
	 * @param {string} currentCountryCode The country code of the selected country.
	 */
	changeLabelForZipCode: function(formName, paramPrefix, currentCountryCode){
		var zipDivLabel = document.getElementById(paramPrefix + "postalcodeLabel");
		if(zipDivLabel != null && zipDivLabel != undefined){
			if(formName == 'myAcctChngProfile'){
				zipDivLabel.innerHTML = MessageHelper.messages["EMAIL_SUBSCRIPTION_REQSYMBL"];
			}
			else{
				zipDivLabel.innerHTML = '';
			}
			if(currentCountryCode == "US"){
				zipDivLabel.innerHTML = zipDivLabel.innerHTML + MessageHelper.messages["EMAIL_SUBSCRIPTION_ZIPCODE"];	
			}
			else{
				zipDivLabel.innerHTML = zipDivLabel.innerHTML + MessageHelper.messages["EMAIL_SUBSCRIPTION_POSTALCODE"];
			}
		}
	},
	
	/**
	 * Changes maxlength based on country
	 */
	changeMaxLengthForZipCode: function(formName, paramPrefix, currentCountryCode){
		var zipCodeId = (formName == 'myAcctChngProfile') ? 'zipCode' :
						((formName == 'subRegistrationPopUp') ? 'regpostalcode' : null); 

		if (zipCodeId != null) {
			if (currentCountryCode == "US") {
				dojo.attr(dojo.byId(zipCodeId),"maxlength","5");
			} else if (currentCountryCode == "CA") {
				dojo.attr(dojo.byId(zipCodeId),"maxlength","7");
			} else {
				// includes GB (United Kingdom)
				dojo.attr(dojo.byId(zipCodeId),"maxlength","9");
			}
		}
	},	
	
	/**
	 * This function checks whether the id exists and defined using document.getElementById(). 
     * @param {string} dojo id.
	 */
	findByElementId: function(id){
		if(document.getElementById(id) != null && document.getElementById(id) != undefined){
			return true;
		}
		return false;
	},
	
	/**
	 * This function checks whether the id exists and defined using dojo.byId(). 
     * @param {string} dojo id.
	 */
	findByDojoId: function(id){
		if(dojo.byId(id) != null && dojo.byId(id) != undefined){
			return true;
		}
		return false;
	},
	
	/**
	 * 
	 * Enabling/ Disabling the phone number fields based on the country selected
	 * @param {string} paramPrefix, prefix of the form address fields.
	 * @param {string} phoneType, type of the phone number
	 * @param {string} displayStyle, value can be either true or false.
	 */
	togglePhoneFields: function(paramPrefix, phoneType, displayStyle){
		if(phoneType == 'phonesingle'){
			var phoneSingle1 = dijit.byId(paramPrefix + "phoneSingle1");
			if(phoneSingle1 != null && phoneSingle1 != undefined){
				phoneSingle1.attr("disabled",displayStyle);
			}
		}
		else if(phoneType == 'phonemultiple'){
			var pphoneId = dijit.byId(paramPrefix + "pphone1");
			if(pphoneId != null && pphoneId != undefined){
				pphoneId.attr("disabled",displayStyle);
			}
			pphoneId = dijit.byId(paramPrefix + "pphone2");
			if(pphoneId != null && pphoneId != undefined){
				pphoneId.attr("disabled",displayStyle);
			}
			pphoneId = dijit.byId(paramPrefix + "pphone3");
			if(pphoneId != null && pphoneId != undefined){
				pphoneId.attr("disabled",displayStyle);
			}
			pphoneId = dojo.byId(paramPrefix + "phoneext");
			if(pphoneId != null && pphoneId != undefined){
				if(!displayStyle){
					//pphoneId.value = "";
				}
			}
		}
		else if(phoneType == 'mobilephonesingle'){
			var phoneSingle1 = dijit.byId(paramPrefix + "mobilephoneSingle");
			if(phoneSingle1 != null && phoneSingle1 != undefined){
				phoneSingle1.attr("disabled",displayStyle);
			}
		}
		else if(phoneType == 'mobilephonemultiple'){
			var pphoneId = dijit.byId(paramPrefix + "mobilephone1");
			if(pphoneId != null && pphoneId != undefined){
				pphoneId.attr("disabled",displayStyle);
			}
			pphoneId = dijit.byId(paramPrefix + "mobilephone2");
			if(pphoneId != null && pphoneId != undefined){
				pphoneId.attr("disabled",displayStyle);
			}
			pphoneId = dijit.byId(paramPrefix + "mobilephone3");
			if(pphoneId != null && pphoneId != undefined){
				pphoneId.attr("disabled",displayStyle);
			}
		}
	},
	
	/**
	 * This function populates the phone number with extension or single phone number field based on the country selected. 
     * @param {string} paramPrefix, prefix of the form address fields.
	 * @param {string} currentCountryCode The country code of the selected country.
	 */
	togglePhoneNumber: function(paramPrefix, currentCountryCode){
		if(currentCountryCode == "GB" || currentCountryCode == MessageHelper.messages["EMAIL_SUBSCRIPTION_COUNTRYDEFAULTVALUE"] 
		                  || currentCountryCode == ""){
			if(this.findByElementId(paramPrefix + "phoneforUK")){
				document.getElementById(paramPrefix + "phoneforUK").style.display = "block";
				this.togglePhoneFields(paramPrefix, "phonesingle", false);
			}
			if(this.findByElementId(paramPrefix + "phonefornonUK")){
				document.getElementById(paramPrefix + "phonefornonUK").style.display = "none";
				this.togglePhoneFields(paramPrefix, "phonemultiple", true);
			}
			if(this.findByElementId(paramPrefix + "mobilephoneforUK")){
				document.getElementById(paramPrefix + "mobilephoneforUK").style.display = "block";
				this.togglePhoneFields(paramPrefix, "mobilephonesingle", true);
			}
			if(this.findByElementId(paramPrefix + "mobilephonefornonUK")){
				document.getElementById(paramPrefix + "mobilephonefornonUK").style.display = "none";
				this.togglePhoneFields(paramPrefix, "mobilephonemultiple", true);
			}
			if(this.findByDojoId(paramPrefix + "marketingSMS")){
				dojo.byId(paramPrefix + "marketingSMS").checked = false;
				dojo.byId(paramPrefix + "label-marketingSMS").setAttribute("class", "checkbox");
				//HBC.toggleRegSendSMS(paramPrefix);
			}
		}
		else{
			if(this.findByElementId(paramPrefix + "phoneforUK")){
				document.getElementById(paramPrefix + "phoneforUK").style.display = "none";
				this.togglePhoneFields(paramPrefix, "phonesingle", true);
			}
			if(this.findByElementId(paramPrefix + "phonefornonUK")){
				document.getElementById(paramPrefix + "phonefornonUK").style.display = "block";
				this.togglePhoneFields(paramPrefix, "phonemultiple", false);
			}
			if(this.findByElementId(paramPrefix + "mobilephoneforUK")){
				document.getElementById(paramPrefix + "mobilephoneforUK").style.display = "none";
				this.togglePhoneFields(paramPrefix, "mobilephonesingle", true);
			}
			if(this.findByElementId(paramPrefix + "mobilephonefornonUK")){
				document.getElementById(paramPrefix + "mobilephonefornonUK").style.display = "block";
				this.togglePhoneFields(paramPrefix, "mobilephonemultiple", true);
			}
			if(this.findByDojoId(paramPrefix + "marketingSMSSingle")){
				dojo.byId(paramPrefix + "marketingSMSSingle").checked = false;
				dojo.byId(paramPrefix + "label-marketingSMSSingle").setAttribute("class", "checkbox");
				//HBC.toggleRegSendSMSSingle(paramPrefix);
			}
		}
	},
	
	/**
	 * This function creates a <select> element to represent the state field and loads it with the 
	 * states corresponding to the country field.
     * @param {string} paramPrefix, prefix of the form address fields.
     * @param {string} countries The list of applicable countries.
	 * @param {string} currentCountryCode The country code of the selected country.
	 * @param {string} id The id of the state field.
	 */
	createSelectStateWithOptions:function(paramPrefix, countries, currentCountryCode, id, userStateOrProvince){
		var stateSelect = document.createElement("select");
		stateSelect.setAttribute("id", paramPrefix + id);
		stateSelect.setAttribute("name", paramPrefix + id);
		stateSelect.setAttribute("class","drop_down_country");
		stateSelect.setAttribute("className","drop_down_country");
		/*clear old options. */
		stateSelect.options.length = 0;
		aOption = document.createElement("option");
		stateSelect.options[stateSelect.length] = aOption;
		aOption.text = MessageHelper.messages["EMAIL_SUBSCRIPTION_DEFAULTVALUEINDROPBOX"];
		aOption.value = "";
		
		/* add all states. */
		for (state_code in countries[currentCountryCode].states) {
			aOption = document.createElement("option");
			stateSelect.options[stateSelect.length] = aOption;
			aOption.text = countries[currentCountryCode].states[state_code];
			aOption.value = state_code;
			if(userStateOrProvince == state_code){
				aOption.selected = "selected";
			}
		}
		return stateSelect;
	},
	
	/**
	 *	This function creates an input element to represent the state.
	 *  @param {string} paramPrefix, prefix of the form address fields.
	 *  @param {string} id The id of the state field.
	 */
	createInputState:function(paramPrefix, id, userStateOrProvince){
		
		var stateInput = document.createElement("input");
		stateInput.setAttribute("id", paramPrefix + id);
		stateInput.setAttribute("name", paramPrefix + id);
		stateInput.setAttribute("class", "form_input");
		stateInput.setAttribute("className", "form_input");
		stateInput.setAttribute("maxlength", "35");
		/*stateInput.setAttribute("dojoType", "dijit.form.ValidationTextBox");
		stateInput.setAttribute("required", "required");
		stateInput.setAttribute("invalidMessage", MessageHelper.messages["VALIDATION_ERRMSG_PROVINCEREQUIRED"]);*/
		if(userStateOrProvince != null && userStateOrProvince != undefined){
			stateInput.setAttribute("value", userStateOrProvince);
		}
		return stateInput;
	},
	
	/**
	 *	This function displays or hides the address dropdown combo and create link in Shipping & Payment page.
	 *  @param {string} id The id of the div tag.
	 */
	toggleDisplayAddressDropdown: function(id){
		if(id != null && id != undefined){
			if(this.isGuestUser()){
				id.style.display = "none";
			}
			else{
				id.style.display = "block";
			}
		}
	},
	
	/**
	 *  This function sets the invalid error message for the specified id  
	 *  @param {string} id The id of the element.
	 *  @param {string} errorMessage The error message to be displayed above the specified id as error label.
	 */
	showErrorMessage: function(errorLabel, errorMessage){
		if(errorLabel != null && errorLabel != undefined){
			errorLabel.innerHTML = errorMessage;
			this.toggleErrorMsg(errorLabel, "block");
			errorLabel.focus();
		}
	},
	
	/**
	 *	This function sets the My Account links present in footer 
	 */
	populateFooterLinks: function(){
		var footerMyProfileId = document.getElementById("WC_MyProfileLink_footer");
		if(footerMyProfileId != null && footerMyProfileId != undefined){
			footerMyProfileId.href = myAccountMyProfileUrl;
		}
		
		/* View mobile site - changes begin */
		
		//Checks for no_mobile browser cookie value and populates and displays the view mobile site link
		var no_mobile =  UtilitiesJS.getCookie("no_mobile");
		if(no_mobile == 'true'){
			var viewMobileSiteId = document.getElementById("view_mobile_site");
			if(viewMobileSiteId != null && viewMobileSiteId != undefined){
				viewMobileSiteId.href = BypassMobileSiteURL;
				viewMobileSiteId.style.display = 'block';
			}
			//Call to check if the server side cookie is expired. BypassMobileSite.jsp will be executed.
			var URLvalue = BypassMobileSiteAjaxURL+'&browser_cookie='+no_mobile;
			var request = new XMLHttpRequest();
			request.open("GET", URLvalue, true);
			request.send();
		}
			
		/* View mobile site - changes end */
		
		//myAccountGuestOrderStatusUrl
		var footerOrderStatusId = document.getElementById("WC_MyOrdersStatusLink_footer");
		if(footerOrderStatusId != null && footerOrderStatusId != undefined){
			if(this.isGuestUser()){
				footerOrderStatusId.href = guestOrderStatusUrl;
			}
			else if(this.isRememberedUser()){
				footerOrderStatusId.href = myAccountMyOrdersUrl;
			}
		}
		var footerMyOrdersHistoryId = document.getElementById("WC_MyOrdersHistoryLink_footer");
		if(footerMyOrdersHistoryId != null && footerMyOrdersHistoryId != undefined){
			footerMyOrdersHistoryId.href = myAccountMyOrdersUrl;
		}
		var footerStoreLocatorId = document.getElementById("WC_StoreLocator_footer");
		if(footerStoreLocatorId != null && footerStoreLocatorId != undefined){
			footerStoreLocatorId.href = StoreLocatorUrl;
		}
		var footerMyWishListId = document.getElementById("WC_MyWishListLink_footer");
		if(footerMyWishListId != null && footerMyWishListId != undefined){
			footerMyWishListId.href = myAccountMyWishListUrl;
		}
		var footerMyGiftCard = document.getElementById("WC_MyGiftCardLink_footer");
		if(footerMyGiftCard != null && footerMyGiftCard != undefined){
			footerMyGiftCard.href = GiftCardUrl;
		}
		var footerSignInOut = document.getElementById("WC_LogonLogoffLink_footer");
		if(footerSignInOut != null && footerSignInOut != undefined){
			if(this.isGuestUser()){
				footerSignInOut.href = logonFormURL;
				footerSignInOut.innerHTML = msgSignIn;
			}
			else if(this.isRememberedUser()){
				footerSignInOut.href = logoffURL;
				footerSignInOut.innerHTML = msgSignOut;
				this.displayWelcomeSection();
			}
		}
	},
	
	/**
	 * displayBasedOnEditable(), display the specific field based on noneditable, retain and newvalue parameters
	 * @param {id} The field handle.
	 * @param {noneditable} The flag stating to disable/enable the specified field.
	 * @param {retain} The flag stating whether to retain the current value of specified field as is.
	 * @param {newvalue} The new value to be populated to id value.
	 */
	displayBasedOnEditable: function(id, noneditable, retain, newvalue){
		if(id != null && id != undefined){
			var curvalue = id.getValue();
			if(noneditable){
				id.attr("disabled",true);
			}
			else{
				id.attr("disabled",false);
			}
			if(newvalue != null && newvalue != undefined){
				id.setValue(newvalue);
			}
			else if(retain){
				id.setValue(curvalue);
			}
		}
	},
	
	closeCountryChooserPopUp: function(){
		if(document.getElementById('lt-country-popup').style.display=='block') {
	          document.getElementById('lt-country-popup').style.display='none';
	    }
	},
	/**
	 * Added for Defect 2958
	 * loadZipCode(), Populates the form specified field with the value stored in Cookie "zipCode"
	 * @param {formName}
	 * @param {field}, the name of the field where zipCode should be populated
	 */
	loadZipCode: function(formName, field){
		var form = document.forms[formName];
		if(form != null && form != undefined){
			if(field != '' && form[field] != null && form[field] != undefined){
				form[field].value = UtilitiesJS.getCookie("zipCode");	
			}
		}
	},
	/**
	 * Added for Checkout Stabilization - Edit Addresses functionality
	 * loadZipCode(), Populates the form specified field with the value stored in stored address zipCode for edit address functionality.
	 * @param {formName}
	 * @param {field}, the name of the field where zipCode should be populated
	 */
	loadZipCode: function(formName, field, zipCodeValue){
		var form = document.forms[formName];
		if(form != null && form != undefined){
			if(field != '' && form[field] != null && form[field] != undefined){
				if(zipCodeValue != null && zipCodeValue !='' ){
					form[field].value = zipCodeValue;
				}else{
					form[field].value = UtilitiesJS.getCookie("zipCode");
				}
			}
		}
	},
	windowCloseEvent: function(window){
		
		alert('windowCloseEvent '+window);
		
		 window.onbeforeunload = function() {
		      alert('Close !!');
		 }
	},
	getUserIdIntl: function(storeId){		
		var theCookies = document.cookie.split(';');
		var cookieName = '';
		var cookieValue = '';
		var userId = '';
		var returnVal=new Array();
		for (var i = 1 ; i <= theCookies.length; i++) {
		    cookieName = theCookies[i];
		    if(typeof(cookieName) != "undefined"){
			    if(cookieName.indexOf("WC_USERACTIVITY")!=-1){
			    	cookieValue=cookieName.split("WC_USERACTIVITY_")[1];
				    userId = cookieValue.split("=")[0];
				    var userActivityValue=UtilitiesJS.getCookie("WC_USERACTIVITY_"+userId);
				    //In case of multiple WC_USERACTIVITY cookie, get the WC_USERACTIVITY corresponding to the store and set userId.
					    if(userActivityValue.indexOf(storeId)!=-1){
					    	userId = cookieValue.split("=")[0];
					    	return userId;
					    }
					}
			     }
			}
		return userId;
	}
	

}