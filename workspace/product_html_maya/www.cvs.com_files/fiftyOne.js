//<%--   /*
//* COPYRIGHT NOTICE
//*
//* This software is the copyrighted work of Dillard's, Inc.  The software is
//* made available solely for use for the benefit of and as authorized by Dillard's, Inc.
//* Use of the software for any other purpose, and any reproduction or
//* redistribution of the software (or any portion thereof) in any form to any other person, firm or entity,
//* are expressly prohibited, and may result in severe civil and criminal penalties. Violators will be
//* prosecuted to the maximum extent possible.
//* WITHOUT LIMITING THE FOREGOING, COPYING OR REPRODUCTION OF THE SOFTWARE FOR FURTHER REPRODUCTION
//* OR REDISTRIBUTION EXPRESSLY PROHIBITED.
//*
//*Copyright C Dillard's, Inc., 1600 Cantrell Rd., Little Rock, AR 72201 U.S.A. All rights reserved.
//*
//* Revision History
//-----------------------------------------------------------------------------
//* Date		Change #	Author		Description
//* 07/02/12  			woodse		New. Builds fiftyOne.js file (PROD)
//--%>



//Start dynamic section
 
//Start insert currencyRates

	var countryCodeArray = new Array();
		countryCodeArray[0]="Antigua and Barbuda|AG|USD|1.1750000000|23570";
		countryCodeArray[1]="Aruba|AW|USD|1.1750000000|23570";
		countryCodeArray[2]="Australia|AU|AUD|1.1750000000|23570";
		countryCodeArray[3]="Austria|AT|EUR|1.1750000000|23570";
		countryCodeArray[4]="Bahrain|BH|BHD|1.1750000000|23570";
		countryCodeArray[5]="Bangladesh|BD|BDT|1.1750000000|23570";
		countryCodeArray[6]="Barbados|BB|BBD|1.1750000000|23570";
		countryCodeArray[7]="Belgium|BE|EUR|1.1750000000|23570";
		countryCodeArray[8]="Belize|BZ|BZD|1.1750000000|23570";
		countryCodeArray[9]="Bermuda|BM|USD|1.1750000000|23570";
		countryCodeArray[10]="Bolivia|BO|BOB|1.1750000000|23570";
		countryCodeArray[11]="Brazil|BR|USD|1.1750000000|23570";
		countryCodeArray[12]="Brunei Darussalam|BN|USD|1.1750000000|23570";
		countryCodeArray[13]="Bulgaria|BG|BGN|1.1750000000|23570";
		countryCodeArray[14]="Cambodia|KH|KHR|1.1750000000|23570";
		countryCodeArray[15]="Canada|CA|CAD|1.1750000000|23570";
		countryCodeArray[16]="Cayman Islands|KY|KYD|1.1750000000|23570";
		countryCodeArray[17]="Chile|CL|CLP|1.1750000000|23570";
		countryCodeArray[18]="China|CN|CNY|1.1750000000|23570";
		countryCodeArray[19]="Colombia|CO|COP|1.1750000000|23570";
		countryCodeArray[20]="Costa Rica|CR|CRC|1.1750000000|23570";
		countryCodeArray[21]="Croatia|HR|HRK|1|0";
		countryCodeArray[22]="Cyprus|CY|EUR|1.1750000000|23570";
		countryCodeArray[23]="Czech Republic|CZ|CZK|1.1750000000|23570";
		countryCodeArray[24]="Denmark|DK|DKK|1.1750000000|23570";
		countryCodeArray[25]="Dominica|DM|USD|1.1750000000|23570";
		countryCodeArray[26]="Dominican Republic|DO|DOP|1.1750000000|23570";
		countryCodeArray[27]="Ecuador|EC|USD|1.1750000000|23570";
		countryCodeArray[28]="Egypt|EG|EGP|1.1750000000|23570";
		countryCodeArray[29]="El Salvador|SV|USD|1.1750000000|23570";
		countryCodeArray[30]="Estonia|EE|EUR|1.1750000000|23570";
		countryCodeArray[31]="Finland|FI|EUR|1.1750000000|23570";
		countryCodeArray[32]="France|FR|EUR|1.1750000000|23570";
		countryCodeArray[33]="French Guiana|GF|EUR|1.1750000000|23570";
		countryCodeArray[34]="Germany|DE|EUR|1.1750000000|23570";
		countryCodeArray[35]="Gibraltar|GI|GBP|1.1750000000|23570";
		countryCodeArray[36]="Greece|GR|EUR|1.1750000000|23570";
		countryCodeArray[37]="Grenada|GD|USD|1.1750000000|23570";
		countryCodeArray[38]="Guadeloupe|GP|EUR|1.1750000000|23570";
		countryCodeArray[39]="Guatemala|GT|GTQ|1.1750000000|23570";
		countryCodeArray[40]="Guernsey|GG|GBP|1.1750000000|23570";
		countryCodeArray[41]="Honduras|HN|HNL|1.1750000000|23570";
		countryCodeArray[42]="Hong Kong|HK|HKD|1.1750000000|23570";
		countryCodeArray[43]="Hungary|HU|HUF|1.1750000000|23570";
		countryCodeArray[44]="Iceland|IS|EUR|1.1750000000|23570";
		countryCodeArray[45]="India|IN|INR|1.1750000000|23570";
		countryCodeArray[46]="Indonesia|ID|IDR|1.1750000000|23570";
		countryCodeArray[47]="Ireland|IE|EUR|1.1750000000|23570";
		countryCodeArray[48]="Israel|IL|ILS|1.1750000000|23570";
		countryCodeArray[49]="Italy|IT|EUR|1.1750000000|23570";
		countryCodeArray[50]="Jamaica|JM|JMD|1.1750000000|23570";
		countryCodeArray[51]="Japan|JP|JPY|1.1750000000|23570";
		countryCodeArray[52]="Jersey|JE|GBP|1.1750000000|23570";
		countryCodeArray[53]="Jordan|JO|JOD|1.1750000000|23570";
		countryCodeArray[54]="Korea, Republic of|KR|KRW|1.1750000000|23570";
		countryCodeArray[55]="Kuwait|KW|KWD|1.1750000000|23570";
		countryCodeArray[56]="Latvia|LV|EUR|1.1750000000|23570";
		countryCodeArray[57]="Liechtenstein|LI|CHF|1.1750000000|23570";
		countryCodeArray[58]="Lithuania|LT|LTL|1.1750000000|23570";
		countryCodeArray[59]="Luxembourg|LU|EUR|1.1750000000|23570";
		countryCodeArray[60]="Macao|MO|HKD|1.1750000000|23570";
		countryCodeArray[61]="Maldives|MV|MVR|1.1750000000|23570";
		countryCodeArray[62]="Malta|MT|EUR|1.1750000000|23570";
		countryCodeArray[63]="Martinique|MQ|EUR|1.1750000000|23570";
		countryCodeArray[64]="Mexico|MX|MXN|1.1750000000|23570";
		countryCodeArray[65]="Monaco|MC|EUR|1.1750000000|23570";
		countryCodeArray[66]="Montserrat|MS|USD|1.1750000000|23570";
		countryCodeArray[67]="Netherlands|NL|EUR|1.1750000000|23570";
		countryCodeArray[68]="New Zealand|NZ|NZD|1.1750000000|23570";
		countryCodeArray[69]="Nicaragua|NI|NIO|1.1750000000|23570";
		countryCodeArray[70]="Norway|NO|NOK|1.1750000000|23570";
		countryCodeArray[71]="Oman|OM|OMR|1.1750000000|23570";
		countryCodeArray[72]="Pakistan|PK|PKR|1.1750000000|23570";
		countryCodeArray[73]="Panama|PA|PAB|1.1750000000|23570";
		countryCodeArray[74]="Paraguay|PY|PYG|1.1750000000|23570";
		countryCodeArray[75]="Peru|PE|PEN|1.1750000000|23570";
		countryCodeArray[76]="Philippines|PH|PHP|1.1750000000|23570";
		countryCodeArray[77]="Poland|PL|PLN|1.1750000000|23570";
		countryCodeArray[78]="Portugal|PT|EUR|1.1750000000|23570";
		countryCodeArray[79]="Qatar|QA|QAR|1.1750000000|23570";
		countryCodeArray[80]="Romania|RO|RON|1.1750000000|23570";
		countryCodeArray[81]="Russian Federation|RU|RUB|1.1750000000|23570";
		countryCodeArray[82]="Réunion|RE|EUR|1.1750000000|23570";
		countryCodeArray[83]="Saint Kitts and Nevis|KN|USD|1.1750000000|23570";
		countryCodeArray[84]="Saint Lucia|LC|USD|1.1750000000|23570";
		countryCodeArray[85]="Saudi Arabia|SA|SAR|1.1750000000|23570";
		countryCodeArray[86]="Singapore|SG|SGD|1.1750000000|23570";
		countryCodeArray[87]="Slovakia|SK|EUR|1.1750000000|23570";
		countryCodeArray[88]="Slovenia|SI|EUR|1.1750000000|23570";
		countryCodeArray[89]="South Africa|ZA|ZAR|1.1750000000|23570";
		countryCodeArray[90]="Spain|ES|EUR|1.1750000000|23570";
		countryCodeArray[91]="Sri Lanka|LK|LKR|1.1750000000|23570";
		countryCodeArray[92]="Sweden|SE|SEK|1.1750000000|23570";
		countryCodeArray[93]="Switzerland|CH|CHF|1.1750000000|23570";
		countryCodeArray[94]="Taiwan|TW|TWD|1.1750000000|23570";
		countryCodeArray[95]="Thailand|TH|THB|1.1750000000|23570";
		countryCodeArray[96]="Trinidad and Tobago|TT|USD|1.1750000000|23570";
		countryCodeArray[97]="Turkey|TR|TRY|1.1750000000|23570";
		countryCodeArray[98]="Turks and Caicos Islands|TC|USD|1.1750000000|23570";
		countryCodeArray[99]="United Arab Emirates|AE|AED|1.1750000000|23570";
		countryCodeArray[100]="United Kingdom|GB|GBP|1.1750000000|23570";
		countryCodeArray[101]="UNITED STATES|US|USD|1|0";

	var currencyCodeArray = new Array();
		currencyCodeArray[0]="United Arab Emirates Dirham|AED|3.9504200000|2|39050981";
		currencyCodeArray[1]="Australian Dollar|AUD|1.2541700000|1|39050983";
		currencyCodeArray[2]="Barbados Dollar|BBD|2.1472200000|2|39050984";
		currencyCodeArray[3]="Taka|BDT|83.2946000000|2|39050985";
		currencyCodeArray[4]="Bulgarian Lev|BGN|1.6899300000|2|39050986";
		currencyCodeArray[5]="Bahraini Dinar|BHD|0.4054740000|2|39050987";
		currencyCodeArray[6]="Boliviano|BOB|7.4854800000|2|39050988";
		currencyCodeArray[7]="Belize Dollar|BZD|2.1292900000|2|39050990";
		currencyCodeArray[8]="Canadian Dollar|CAD|1.1904100000|2|39050991";
		currencyCodeArray[9]="Swiss Franc|CHF|1.0405500000|1|39050992";
		currencyCodeArray[10]="Chilean Peso|CLP|660.6270000000|-1|39050993";
		currencyCodeArray[11]="Yuan Renminbi|CNY|6.1606000000|2|39050994";
		currencyCodeArray[12]="Colombian Peso|COP|2437.1200000000|-2|39050995";
		currencyCodeArray[13]="Costa Rican Colon|CRC|585.7840000000|2|39050996";
		currencyCodeArray[14]="Czech Koruna|CZK|23.8417000000|0|39050997";
		currencyCodeArray[15]="Danish Krone|DKK|6.4288000000|0|39050998";
		currencyCodeArray[16]="Dominican Peso|DOP|47.4625000000|2|39050999";
		currencyCodeArray[17]="Egyptian Pound|EGP|7.6898400000|1|39051000";
		currencyCodeArray[18]="Euro|EUR|0.8518640000|2|39051001";
		currencyCodeArray[19]="British Pound|GBP|0.6756720000|2|39051002";
		currencyCodeArray[20]="Quetzal|GTQ|8.2300300000|2|39051003";
		currencyCodeArray[21]="Hong Kong Dollar|HKD|8.3411500000|2|39051004";
		currencyCodeArray[22]="Lempira|HNL|22.7860000000|2|39051005";
		currencyCodeArray[23]="Croatian Kuna|HRK|6.6339700000|2|39051006";
		currencyCodeArray[24]="Hungarian Forint|HUF|265.0320000000|0|39051007";
		currencyCodeArray[25]="Indonesian Rupiah|IDR|13201.2000000000|-2|39051008";
		currencyCodeArray[26]="Israeli Shekel|ILS|4.2584400000|1|39051009";
		currencyCodeArray[27]="Indian Rupee|INR|66.5614000000|0|39051010";
		currencyCodeArray[28]="Jamaican Dollar|JMD|122.2160000000|2|39051011";
		currencyCodeArray[29]="Jordanian Dinar|JOD|0.7584430000|2|39051012";
		currencyCodeArray[30]="Japanese Yen|JPY|126.1770000000|0|39051013";
		currencyCodeArray[31]="Riel|KHR|4371.9500000000|2|39051014";
		currencyCodeArray[32]="Korean Won|KRW|1195.2100000000|0|39051015";
		currencyCodeArray[33]="Kuwaiti Dinar|KWD|0.3132920000|2|39051016";
		currencyCodeArray[34]="Cayman Islands Dollar|KYD|0.8926790000|2|39051017";
		currencyCodeArray[35]="Sri Lanka Rupee|LKR|141.1050000000|2|39051018";
		currencyCodeArray[36]="Lithuanian Litas|LTL|2.9829000000|2|39051019";
		currencyCodeArray[37]="Rufiyaa|MVR|16.7890000000|2|39051022";
		currencyCodeArray[38]="Mexican Peso|MXN|15.0385000000|0|39051023";
		currencyCodeArray[39]="Cordoba Oro|NIO|28.1987000000|2|39051024";
		currencyCodeArray[40]="Norwegian Krone|NOK|7.5206500000|0|39051025";
		currencyCodeArray[41]="New Zealand Dollar|NZD|1.3718100000|1|39051027";
		currencyCodeArray[42]="Omani Rial|OMR|0.4140770000|2|39051028";
		currencyCodeArray[43]="Balboa|PAB|1.0755000000|2|39051029";
		currencyCodeArray[44]="Peruvian Nuevo Sol|PEN|3.1548800000|1|39051030";
		currencyCodeArray[45]="Philippine Peso|PHP|48.1877000000|0|39051031";
		currencyCodeArray[46]="Pakistan Rupee|PKR|109.2990000000|2|39051032";
		currencyCodeArray[47]="Polish Zloty|PLN|3.5969900000|2|39051033";
		currencyCodeArray[48]="Guarani|PYG|4976.8700000000|0|39051034";
		currencyCodeArray[49]="Qatari Riyal|QAR|3.9167700000|2|39051035";
		currencyCodeArray[50]="New Romanian Leu|RON|3.8275400000|2|39051036";
		currencyCodeArray[51]="Russian Ruble|RUB|56.6053000000|2|39051037";
		currencyCodeArray[52]="Saudi Riyal|SAR|4.0371000000|1|39051038";
		currencyCodeArray[53]="Swedish Krona|SEK|8.0110800000|0|39051039";
		currencyCodeArray[54]="Singapore Dollar|SGD|1.4053600000|1|39051040";
		currencyCodeArray[55]="Thai Baht|THB|35.3516000000|0|39051042";
		currencyCodeArray[56]="Turkish Lira|TRY|2.3889400000|1|39051043";
		currencyCodeArray[57]="Taiwan Dollar|TWD|33.4183000000|0|39051044";
		currencyCodeArray[58]="US Dollar|USD|1.0000000000|2|39051046";
		currencyCodeArray[59]="South African Rand|ZAR|11.8646000000|1|39051047";

//End insert currencyRates

//Start insert welcomeMat

	function launchWelcomeMat(countryCode){
		var supportCountry = isSupportedCountry(countryCode);
		// If first page view per session, launch the Welcome Mat
		if (!isWelcome() && supportCountry == 'Y') {
			var urlString = "https://embassy.fiftyone.com/welcome/welcome.srv";
			wlcme51func(urlString + "?merchId=3706&countryId=" +countryCode + "&setCookie=Y");
		}
	}

//End insert welcomeMat

//Start insert trackingURL	

	var trackingUrlString = "https://services.fiftyone.com/tracking.srv";

//End insert trackingURL
	
//End dynamic section

	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
		
	function setCookies(cookieName,codeValue){
		$.cookie(cookieName, codeValue,{ path: '/', domain: '.dillards.com' });
	}
	function getCookieValues(cookieName){
		return $.cookie(cookieName);
	}
	function calculateNewPrice(price,exchangeRate,FLC,roundMethod,qty){
		//If the Round_Method digit is a positive value, the rounding is to the right of the decimal point
		//("1" for tenths, "2" for hundredths, "3" for thousandths, etc).
		//If the Round_Method digit is zero, round to the nearest whole number.
		//If the Round_Method digit is a negative value, the rounding is to the left of the decimal point
		//("-1" for tens, "-2" for hundreds, "-3" for thousands, etc).
		if(!FLC) var FLC= 1;
		if(!qty) var qty= 1;
		var amt = parseFloat(price * exchangeRate * FLC);
		var calcPrice =  round(amt,roundMethod);
		var newPrice = calcPrice * qty;
		return newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	function round(price,roundMethod) {
		var multiple = Math.pow(10, roundMethod);
		var rndedNum = Math.round(price * multiple) / multiple;
		return rndedNum;
	}
	function calculateCartSubTotal(roundMethod){
		var cartTotal = 0;
		$("div").each(function (index) {
			if ($(this).is("#cart-area")) {
				$("table").each(function (index) {
					if ($(this).is("#cart-table")) {
						$(this).children(this).children('tr').each(function () {
							if($(this).find('.big-price')){
								var itemPrice = $(this).find('.big-price').text().replace('$','').replace(',','');
								if(itemPrice != ""){
									cartTotal = parseFloat(itemPrice.substring(4).replace(',','')) + parseFloat(cartTotal);
								}
							}
						});
					}
				});
			}
		}); 
		return round(cartTotal,roundMethod).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	function calculateCartDiscounts(roundMethod){
		var cartDiscount = 0;
		$("div").each(function (index) {
			if ($(this).is("#cart-area")) {
				$("table").each(function (index) {
					if ($(this).is("#cart-table")) {
						$(this).children(this).children(this).each(function () {
							if($(this).is('.noborder')){
								if($(this).find('.discount')){
									var itemPrice = $(this).find('.discount').text().replace('$','').replace(',','');
									if(itemPrice != ""){
										cartDiscount = parseFloat(itemPrice.substring(4).replace(',','')) + parseFloat(cartDiscount);
									}
								}
							}
						});
					}
				});
			}
		}); 
		return round(cartDiscount,roundMethod).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	function calculateCartTotal(roundMethod){
		var subtotal = 0;
		$("div").each(function (index) {
			if ($(this).is("#cart-area")) {
				$("table").each(function (index) {
					if ($(this).is("#cart-table")) {
						$(this).children(this).children('tr').each(function () {
							if($(this).find('.big-price')){
								var itemPrice = $(this).find('.big-price').text().replace('$','').replace(',','');
								if(itemPrice != ""){
									subtotal = parseFloat(itemPrice.substring(4).replace(',','')) + parseFloat(subtotal);
								}
							}
						});
					}
				});
			}
		}); 

		var cartDiscount = 0;
		$("div").each(function (index) {
			if ($(this).is("#cart-area")) {
				$("table").each(function (index) {
					if ($(this).is("#cart-table")) {
						$(this).children(this).children(this).each(function () {
							if($(this).is('.noborder')){
								if($(this).find('.discount')){
									var itemPrice = $(this).find('.discount').text().replace('$','').replace(',','');
									if(itemPrice != ""){
										cartDiscount = parseFloat(itemPrice.substring(4).replace(',','')) + parseFloat(cartDiscount);
									}
								}
							}
						});
					}
				});
			}
		}); 

		var totalWithDiscounts = subtotal +  cartDiscount;
		return round(totalWithDiscounts,roundMethod).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	//---------------------------------------------------------//
	// FiftyOne International Visitor Welcome Mat | Nov. 2010
	//---------------------------------------------------------//
	// Write Dynamic JavaScript
	function wlcme51func(url) {
		var wlcme51 = document.createElement("script");
		wlcme51.src = url;
		wlcme51.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(wlcme51);
	}
	// Drop / Check for cookie to ensure visitor only sees Welcome Mat once per session
	function isWelcome() {
		var c_name = 'wlcme';
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				//alert (document.cookie.substring(c_start, c_end));
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	}
	function isSupportedCountry(countryCode){
		var supported = 'N';
		if(countryCode != null || countryCode != "")
		{
			for (var i = 0; i < countryCodeArray.length; i++)
			{
				var ccArrayValueSplit = countryCodeArray[i].split('|');
				if(ccArrayValueSplit[1] == countryCode){
					supported = 'Y';
					break;
				}
			}
		}
		return supported;
	}
	function localizeHeaderFooter(countryCode,exchangeRate,FLC,roundMethod,currencyCode){
		$("#imgFlagCode").append('<img src="/images/flags/'+countryCode+'.gif" alt= "" border="0" height="16" width="25"/>');
		if(countryCode == 'US' || countryCode == '' || countryCode == null){
			$("div").each(function (index) {
				//Start:MyDillards
				if ($(this).is("#myDillardsBar")) {
					$(this).children('div').children('span').children('span').each(function () {
						if($(this).is("#imgFlagCode")){
							$(this).append('<img src="/images/flags/'+countryCode+'.gif" alt= "" border="0" height="16" width="25"/>');
						}
					});
				}
				//End:MyDillards
				//Start: Kana
				if ($(this).is(".us-content")) {
					$(this).show();
				}
				//End: Kana
				//Start: Header Cart Total
				if ($(this).is("#utility-nav")) {
					if ($(this).find('.fiftyOne-cartTotal')) {
						$(this).find('.fiftyOne-cartTotal').show();
						$(this).find('.fiftyOne-cartTotalDollarSign').show();
					}
					$(this).show();
				}
				if($(this).is("#fiftyOneContext")){
					if($(this).children('span').children('a').is('#context-chooser-us')){
						$(this).children('span').children('a').show();
					}
				}
				//End: Header Cart Total
				if ($(this).is("#utility-nav")) {
					$(this).children('ul').children('li').each(function () {
						if($(this).is(".us-nav")){
							$(this).show();
						}
					});
				}
				//header supers
				if ($(this).is(".us-nav")) {
					$(this).show();
				}
				//saved-search
				if ($(this).is("#saved-search")) {
					$(this).show();
				}
				//promo link (orderitemdisplay.jsp)
				if ($(this).is("#promo-codes-info")) {
					$(this).show();
				}
				if ($(this).is("#poplinks")) {
					$(this).show();
				}
			});
			$('a').each(function () {
				
				if ($(this).is("#add-wishlist")) {
					$(this).show();
				}
				if ($(this).is("#add-registry")) {
					$(this).show();
				}
				if ($(this).is("#find-store")) {
					$(this).show();
				}
				if ($(this).is(".add-wishlist")) {
					$(this).show();
				}
			});

		}
		else{
			$('title').each(function () {
				if($(this).text().indexOf("$") != -1){
					$(this).empty();
					$(this).append("Dillard's International - Official Site of Dillard's Department Stores - Dillards.com | The Style of Your Life");
				}
			})
			//fix to hide links (remove once display:none's on bundleDisplay)
			$('a').each(function () {
				if ($(this).is("#add-wishlist")) {
					$(this).css("display","none");
				}
				if ($(this).is(".add-wishlist")) {
					$(this).css("display","none");
				}
				if ($(this).is("#add-registry")) {
					$(this).css("display","none");
				}
				if ($(this).is("#find-store")) {
					$(this).css("display","none");
				}
			});
 			//unbinds saved search and typeahead
			$('#search-input').unbind();
			$('#search-filter').unbind();
			$('#error-search-filter').unbind();
			$('div').each(function (index) {
				//Start:Stores in search result list
				if ($(this).is(".cat-search-wrap-fixed")) {
					$(this).children('div').children('div').children('div').each(function () {
						if ($(this).is(".banner.stores")) {
							$(this).css("display","none");
						}
					});
				}
				if ($(this).is(".cat-search-wrap")) {
					$(this).children('div').children('div').children('div').children('div').children('ul').children('li').children('div').each(function () {
						if ($(this).is(".storeDetails")) {
							$(this).css("display","none");
						}
					});
				}
				//End:Stores in search result list
				//Start:MyDillards
				if ($(this).is("#myDillardsBar")) {
					$(this).children('div').children('span').children('span').each(function () {
						if($(this).is("#imgFlagCode")){
							$(this).append('<img src="/images/flags/'+countryCode+'.gif" alt= "" border="0" height="16" width="25"/>');
						}
					});
				}
				//End:MyDillards
				//Start: Kana
				if ($(this).is(".fiftyOne-content")) {
					$(this).show();
				}
				//End: Kana

				if ($(this).is("#fiftyOne-poplinks")) {
					$(this).show();
				}
				if ($(this).is(".continue-checkout")) {
					$(this).children('button').each(function () {
					$(this).unbind();
					$(this).bind("click", function (e) {
					fiftyOneEncodeXML(document.ShopCartForm);
					});
					$(this).removeAttr("onClick");
					$(this).removeAttr("id");

					});
				}
				if($(this).children('span').children('a').is('#context-chooser-us')){
					$(this).children('span').children('a').css("display","none");
				}
				if($(this).children('span').children('a').is('#APOFPO-link')){
					$(this).find('#APOFPO-link').bind("click", function (e) {$("#APOFPO-info-modal").modal({
						onOpen: function (d) {
						d.overlay.fadeIn(function() {
						d.container.fadeIn();
						d.data.fadeIn();
						});
						},onClose:function (d) {
						d.data.fadeOut('fast');
						d.container.fadeOut('fast',function() {
						d.overlay.fadeOut('fast', function () {
						$.modal.close();
						});
						});
						},closeHTML:'<a href="javascript:void(0);">CLOSE [X]</a>'
					});
					});
				}
				//Start: Header Cart Total
				if ($(this).is("#utility-nav")) {
					$(this).children('ul').children('li').each(function () {
						if($(this).is(".fiftyOne-nav")){
							$(this).show();
							$(this).children('div').children('span').children('a').each(function () {
								if($(this).is('#track-inter-order')){
									$(this).removeAttr("href");
									$(this).attr("href", trackingUrlString);
								}
							});
						}
						if($(this).is(".us-nav")){
							$(this).css("display","none");
						}
					});
					if ($(this).find('.fiftyOne-cartTotal')) {
						var itemPrice = $(this).find('.fiftyOne-cartTotal').text();
						var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
						$(this).find('.fiftyOne-cartTotal').text(newPrice);
						$(this).find('.fiftyOne-cartTotal').css("display","none");
						$(this).find('.fiftyOne-cartTotalDollarSign').css("display","none");
						$(this).find('.fiftyOne-cartTotal').prepend(currencyCode + "&nbsp;");
					}
					$(this).show();
				}
				//End: Header Cart Total
				//header
				if ($(this).is(".fiftyOne-nav")) {
					$(this).show();
				}
				if ($(this).is(".us-nav")) {
					$(this).css("display","none");
				}
				// top footer links
				if ($(this).is("#bottom-nav-container")) {
					$(this).children('div').children('div').children('ul').children('li').children('div').children('span').each(function () {
						if($(this).is("#imgFlagCode")){
							$(this).append('<img src="/images/flags/'+countryCode+'.gif" alt= "" border="0" height="16" width="25"/>');
						}
					});
					$(this).children('div').children('div').children('ul').children('li').children('a').each(function () {
						if($(this).is('#track-inter-order')){
							$(this).removeAttr("href");
							$(this).attr("href", trackingUrlString);
						}
					});
				}
			});

		}
	}
	function loadDefaultPrices(){
		$("div").each(function(index){
		//Start:Breadcrumbs.jsp
		if ($(this).is(".cat-search-wrap")) {
			$(this).children('span').children('h1').each(function () {
				if ($(this).is("#breadcrumb")) {
					$(this).show();
				}
			});
			$(this).find("#related-searches").show();
		}
		if ($(this).is(".cat-search-wrap-fixed")) {
			$(this).children('span').children('h1').each(function () {
				if ($(this).is("#breadcrumb")) {
					$(this).show();
				}
			});
		}
		//End:Breadcrumbs.jsp
		// Start: (GuidedNavigationDropDown.jsp)
		if ($(this).is(".facet-wrap")) {
			$(this).children('div').each(function () {
				if ($(this).is('.facet')) {
					if ($(this).children(this).is('.fiftyOne-nav-price-hdr')) {
						$(this).show();
					}
				}
				$(this).children('div').children('ul').children('li').children('a').each(function () {
					if ($(this).is(".fiftyOne-nav-price-a")) {
						$(this).show();
					}
					if ($(this).is(".fiftyOne-nav-category-a")) {
						$(this).show();
					}
				});
				if($(this).is('.selected')){
					$(this).find('.fiftyOne-filtered-price').show();
					if($(this).find('.fiftyOne-filtered-category')){
						var text = $(this).find('.fiftyOne-filtered-category').text();
						var holdRightString = text.split("[");
						var text1 = holdRightString[0];
						var navQty = holdRightString[1];
						var resetURL = $(this).find('.fiftyOne-filtered-category a:first').prop('href');
						$(this).find('.fiftyOne-filtered-category').empty();
						$(this).find('.fiftyOne-filtered-category').replaceWith(text1 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
					}
				}
				if ($(this).is('#fiftyOne-nav-brand-facet')) {
					$(this).show();
				}
			});
			$('#fiftyOne-nav-brand-facet-name').show();
		}
		// Finish: (GuidedNavigationDropDown.jsp)
		// Start: (Product.jsp) 
		if ($(this).is(".productInfo")) {
			if ($(this).find('.price')) {
				$(this).find('.price').show();
			}
		}
		if ($(this).is(".info")) {
			if ($(this).find('.sale')) {
				$(this).find('.sale').show();
			}
		}
		// Finish: (Product.jsp)
		// Start: (HeroProductDisplay.jsp)
		if ($(this).is(".product")) {
			$(this).children('a').children('span').each(function () {
				if ($(this).is('.price')) {
					$(this).show();
			}
			});
		}
		//Finish: (HeroProductDisplay.jsp)
		// Start: (All Product Display Pages Header Price)
		if ($(this).is("#promotion_copy")) {
			$(this).show();
		}
		if ($(this).is("#promo-section")) {
			$(this).show();
		}
		if ($(this).is("#top-info")) {
			if ($(this).find('#price')) { 
				$(this).find('#price').show();
			}
		}
		if ($(this).is("#info-section")) {
			if ($(this).find('#price')) { 
				$(this).find('#price').show();
			}
		}
		// Finish: (All Product Display Pages Header Price) 
		// : (ProductItemDisplay)
		if ($(this).is(".info")) {
			$(this).children('div').children('div').each(function () {
				if ($(this).is(".price")) {
					$(this).show();
				}
			});
		}
		// Finish: (ProductItemDisplay)
		if ($(this).is("#cart-area")) {
			$("table").each(function (index) {
				//Start: ShoppingCart.jspf
				if ($(this).is("#cart-table")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('.avail')){
							if($(this).find('.move-wl')){
								$(this).find('.move-wl').show();
							}
							if($(this).find('.remove')){
								$(this).find('.remove').show();
							}
						}
						if($(this).is('.qty')){
							$(this).show();
						}
						if($(this).is('.price')){
							if($(this).find('.fiftyOne-lil-price')){
								$(this).find('.fiftyOne-lil-price').show();
							}
						}
						if($(this).is('.subttl')){
							if($(this).find('.big-price')){
								$(this).find('.big-price').show();
							}
						}
					});
					$(this).children(this).children(this).each(function () {
						if($(this).is('.noborder')){
							if($(this).find('.discount')){
								$(this).find('.discount').show();
							}
						}
					});
				}
				//End: ShoppingCart.jspf
				//Start: RegistryShoppingCart.jspf
				if ($(this).is("#registry-cart-table")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('.qty')){
							$(this).show();
						}
						if($(this).is('.price')){
							if($(this).find('.big-price')){
								$(this).find('.big-price').show();
							}
						}
						if($(this).is('.subttl')){
							if($(this).find('.big-price')){
								$(this).find('.big-price').show();
							}
						}
					});
					$(this).children(this).children(this).each(function () {
						if($(this).is('.noborder')){
							if($(this).find('.discount')){
								$(this).find('.discount').show();
							}
						}
					});
				}
				//End: RegistryShoppingCart.jspf
				//Start: OrderItemDisplay.jsp
				if ($(this).is(".fiftyOne-cartTotals")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('#subtotal')){
							if($(this).children().is('.fiftyOne-subTotal')){
								$(this).children().show();
							}
						}
						if($(this).is('#orderDiscountTotal')){
							if($(this).children().is('.fiftyOne-orderDiscountTotal')){
								$(this).children().show();
							}
						}
						if($(this).is('#shippingTotal')){
							if($(this).children().is('.fiftyOne-shippingTotals')){
								$(this).children().show();
							}
						}
						if($(this).is('.total')){
							if($(this).children().is('.fiftyOne-orderTotal')){
								$(this).children().show();
							}
						}
					});
				}
				//End: OrderItemDisplay.jsp
			});
		}
		//Start horizontal seo RR 
		if ($(this).is("#rr-product-seo")) {
			$(this).show();
			$("table").each(function (index) {
				if ($(this).is(".rr_h_seo")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('.rr_itemLoop_h_seo')){
							$(this).children('div').each(function () {
								if($(this).is(".rr_item_h_seo")){
									$(this).children('span').children('a').children('b').each(function (){
										$(this).show();
									});
								}
							});
						}
					});
				}
			});
		}
		//End horizontal seo RR
		//Start vertical RR
		if ($(this).is("#rr-product-vertical")) {
			$(this).show();
		}
		if ($(this).is("#side-rr")) {
			$(this).removeClass("hideFor51");
		}
		if ($(this).is("#rr-display")) {
			$(this).show();
		}
		if ($(this).is("#rr-search-category")) {
			$(this).show();
		}
		if ($(this).is("#rr-brand")) {
			$(this).show();
		}
		if ($(this).is(".rr_vertical")) {
			$(this).show();
			$("table").each(function (index) {
				if ($(this).is(".rr_itemLoop_vertical")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('.rr_item_vertical')){
							$(this).children('div').each(function () {
								if($(this).is(".rr_itemPrice_vertical")){
									$(this).children('a').children('b').each(function (){
										$(this).show();
									});
								}
							});
						}
					});
				}
			});
		}
		//End  vertical RR
		//Start horizontal RR 
		if ($(this).is("#rr-wrapper")) {
			$(this).show();
			$("table").each(function (index) {
				if ($(this).is(".rr_h")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('.rr_itemLoop_h')){
							$(this).children('div').each(function () {
								if($(this).is(".rr_item_h")){
									$(this).children('span').children('a').children('b').each(function (){
										$(this).show();
									});
								}
							});
						}
					});
				}
			});
		}
		//End horizontal RR
		});
	}
	function loadInternationalPrices(exchangeRate,FLC,roundMethod,currencyCode){
		var priceHdrSet = "N";
		var filteredPriceHdrSet = "N";
		$("div").each(function (index) {
			//Start:Breadcrumbs.jsp
			if ($(this).is(".cat-search-wrap")) {
				$(this).children('span').children('h1').each(function () {
					if ($(this).is("#breadcrumb")) {
						$(this).children('div').each(function () {
							if($(this).is(".parent")){
								if($(this).text().indexOf("$") != -1){
									if($(this).text().indexOf("-") != -1){
										var navPriceString = $(this).text().split("$"); 
										var navLeftStringPortion = navPriceString[0]; 
										var navPrice1 = navPriceString[1].replace('$','').replace('-',''); 
										var navRightStringPortion = navPriceString[2]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
										var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
										$(this).empty();
										$(this).append(navLeftStringPortion + " " + "(" + currencyCode + ")"  + "&nbsp;" +newPrice1+ " - " + newPrice2);
									}
									else{ 
										var navPriceString = $(this).text().split("$"); 
										var navLeftStringPortion = navPriceString[0]; 
										var navRightStringPortion = navPriceString[1]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
										var navQty = holdRightString[1]; 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1);
										$(this).empty();
										$(this).text(navLeftStringPortion + " " + "(" + currencyCode + ")"  + " " + newPrice1 + " ");
									}
								}
							}
							if($(this).is(".current")){
								if($(this).text().indexOf("$") != -1){
									if($(this).text().indexOf("-") != -1){
										var navPriceString = $(this).text().split("$"); 
										var navLeftStringPortion = navPriceString[0];
										var navPrice1 = navPriceString[1].replace('$','').replace('-',''); 
										var navRightStringPortion = navPriceString[2]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
										var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
										$(this).empty();
										$(this).append("<span itemprop=\"title\">" + navLeftStringPortion + " " + "(" + currencyCode + ")"  + "&nbsp;" +newPrice1+ " - " + newPrice2 + "</span>");
									}
									else{ 
										var navPriceString = $(this).text().split("$"); 
										var navLeftStringPortion = navPriceString[0]; 
										var navRightStringPortion = navPriceString[1]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
										var navQty = holdRightString[1]; 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1);
										$(this).empty();
										$(this).append("<span itemprop=\"title\">" +  navLeftStringPortion + " " + "(" + currencyCode + ")"  + " " + newPrice1 + " " + "</span>");
									}
								}
							}
						});
						$(this).show();
					}
				});
			}
			//End:Breadcrumbs.jsp
			// Start: (GuidedNavigationDropDown.jsp)
			if ($(this).is(".facet-wrap")) {
				$(this).children('div').each(function () {
					if ($(this).is('.facet')) {
						if ($(this).children(this).is('.fiftyOne-nav-price-hdr')) {
							if(priceHdrSet == "N"){
								$(this).find('.fiftyOne-nav-price-hdr').append("&nbsp;(" + currencyCode + ")");
								priceHdrSet = "Y";
							}
						}
						$(this).children('div').children('ul').children('li').children('a').each(function () {
							if ($(this).is(".fiftyOne-nav-price-a")) {
								if($(this).text().indexOf("-") != -1){
									var navPriceString = $(this).text().split("-"); 
									var navPrice1 = navPriceString[0].replace('$','').replace(',',''); 
									var navRightStringPortion = navPriceString[1]; 
									var holdRightString = navRightStringPortion.split("(");
									var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
									var navQty = holdRightString[1]; 
									var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
									var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
									$(this).empty();
									$(this).append(newPrice1+ " - " + newPrice2 + "&nbsp;" + "<b>(" + navQty + "</b>");
								}
								else if($(this).text().toLowerCase().indexOf("under") != -1){
									var navPriceString = $(this).text().toLowerCase().split("under"); 
									var navRightStringPortion = navPriceString[1]; 
									var holdRightString = navRightStringPortion.split("(");
									var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
									var navQty = holdRightString[1]; 
									var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1);
									$(this).empty();
									$(this).append("Under" + "&nbsp;" + newPrice1 + "&nbsp;" + "<b>(" + navQty + "</b>");
								}
								else if($(this).text().toLowerCase().indexOf("over") != -1){
									var navPriceString = $(this).text().toLowerCase().split("over"); 
									var navRightStringPortion = navPriceString[1]; 
									var holdRightString = navRightStringPortion.split("(");
									var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
									var navQty = holdRightString[1]; 
									var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1);
									$(this).empty();
									$(this).append("Over" + "&nbsp;" + newPrice1 + "&nbsp;" + "<b>(" + navQty + "</b>");
								}
								$(this).show();
							}
							if ($(this).is(".fiftyOne-nav-category-a")) {
								if($(this).text().indexOf("$") != -1){
									if($(this).text().indexOf("-") != -1){
										var navPriceString = $(this).text().split("$"); 
										var navPrice1 = navPriceString[1].replace('$','').replace('-',''); 
										var navLeftStringPortion = navPriceString[0]; 
										var navRightStringPortion = navPriceString[2]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
										var navQty = holdRightString[1]; 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
										var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
										$(this).empty();
										$(this).append(navLeftStringPortion + "&nbsp;" + "(" + currencyCode + ")"  + "&nbsp;" +newPrice1+ " - " + newPrice2 + "&nbsp;" + "<b>(" + navQty + "</b>");
									}
									else{ 
										var navPriceString = $(this).text().split("$"); 
										var navLeftStringPortion = navPriceString[0]; 
										var navRightStringPortion = navPriceString[1]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
										var navQty = holdRightString[1]; 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1);
										$(this).empty();
										$(this).append(navLeftStringPortion + "&nbsp;" + "(" + currencyCode + ")"  + "&nbsp;" + newPrice1 + "&nbsp;" + "<b>(" + navQty + "</b>");
									}
								}
								$(this).show();
							}
						});
					}
					if($(this).is('.facet-name')){
						if($(this).text().toLowerCase().indexOf("price") != -1){
							if(filteredPriceHdrSet == "N"){
								if($(this).text().toLowerCase().indexOf(":") != -1){
									var hdrText = $(this).text().split(":"); 
									$(this).html(hdrText[0] + "&nbsp;(" + currencyCode + ")&nbsp;:");
								}
								else{
									$(this).append("&nbsp;(" + currencyCode + ")&nbsp;");
								}
								filteredPriceHdrSet = "Y";
							}
						}
					}
					if($(this).is('.selected')){
						if($(this).find('.fiftyOne-filtered-price').text().toLowerCase().indexOf("under") != -1){
							var navPriceString = $(this).text().toLowerCase().split("under"); 
							var navRightStringPortion = navPriceString[1]; 
							var holdRightString = navRightStringPortion.split("[");
							var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
							var navQty = holdRightString[1]; 
							var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
							var resetURL = $(this).find('a:first').prop('href');
							$(this).empty();
							$(this).append("Under" + "&nbsp;" + newPrice1 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
						}
						else if($(this).find('.fiftyOne-filtered-price').text().indexOf("$") != -1){
							var selectedPrice = $(this).text();
							if(selectedPrice.indexOf("-") != -1){
								var navPriceString = $(this).text().split("-"); 
								var navPrice1 = navPriceString[0].replace('$','').replace(',',''); 
								var navRightStringPortion = navPriceString[1]; 
								var holdRightString = navRightStringPortion.split("[");
								var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
								var navQty = holdRightString[1]; 
								var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
								var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
								var resetURL = $(this).find('a:first').prop('href');
								$(this).empty();
								$(this).append(newPrice1+ "&nbsp;-&nbsp;" + newPrice2 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
							}
						}
						else if($(this).find('.fiftyOne-filtered-price').text().toLowerCase().indexOf("over") != -1){
							var navPriceString = $(this).text().toLowerCase().split("over"); 
							var navRightStringPortion = navPriceString[1]; 
							var holdRightString = navRightStringPortion.split("[");
							var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
							var navQty = holdRightString[1]; 
							var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
							var resetURL = $(this).find('a:first').prop('href');
							$(this).empty();
							$(this).append("Over" + "&nbsp;" + newPrice1 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
						}
						if($(this).find('.fiftyOne-filtered-category').text().indexOf("$") != -1){
							if($(this).text().indexOf("$") != -1){
								if($(this).text().indexOf("-") != -1){
									var navPriceString = $(this).text().split("$"); 
									var navLeftStringPortion = navPriceString[0];
									var navPrice1 = navPriceString[1].replace('$','').replace('-',''); 
									var navRightStringPortion = navPriceString[2]; 
									var holdRightString = navRightStringPortion.split("[");
									var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
									var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
									var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
									var resetURL = $(this).find('a:first').prop('href');
									$(this).empty();
									$(this).append(navLeftStringPortion + "&nbsp;" + "(" + currencyCode + ")"  + "&nbsp;" +newPrice1+ " - " + newPrice2 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
								}
								else{ 
									var navPriceString = $(this).text().split("$");
									var navLeftStringPortion = navPriceString[0];
									var navRightStringPortion = navPriceString[1];
									var holdRightString = navRightStringPortion.split("[");
									var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
									var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
									var resetURL = $(this).find('a:first').prop('href');
									$(this).empty();
									$(this).append(navLeftStringPortion + "&nbsp;" + "(" + currencyCode + ")" + "&nbsp;" + newPrice1 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
								}
							}
						}
						else if($(this).find('.fiftyOne-filtered-category')){
							var text = $(this).find('.fiftyOne-filtered-category').text();
							var holdRightString = text.split("[");
							var text1 = holdRightString[0];
							var navQty = holdRightString[1];
							var resetURL = $(this).find('.fiftyOne-filtered-category a:first').prop('href');
							$(this).find('.fiftyOne-filtered-category').empty();
							$(this).find('.fiftyOne-filtered-category').replaceWith(text1 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
						}
					}
				});
			}
			// Finish: (GuidedNavigationDropDown.jsp)
			// Start: (Product.jsp)
			if ($(this).is(".productInfo")) {
  				if ($(this).find('.price')) {
					var pricesFound = "N";
					$(this).find('.price').children('div').each(function () {
			 			//reg, was, now classes
						if ($(this).is('.reg') || $(this).is('.was') || $(this).is('.now') ) { 
  	 						var itemPrice = "";
							var classText="";
							if($(this).hasClass("reg")){
 				 				if($(this).text().toLowerCase().indexOf("orig.")!= -1){
									itemPrice = $(this).text().split("Orig.");
 									classText = "Orig. ";
 									pricesFound = "Y";
								}
 	 							else if($(this).text().toLowerCase().indexOf("reg.")!= -1){
	 								itemPrice = $(this).text().split("Reg.");
	 								classText = "Reg. ";
	 								pricesFound = "Y";
 	 							}
							}
							else if($(this).hasClass("was")){ 
				 				if($(this).text().toLowerCase().indexOf("was")!= -1){
									itemPrice = $(this).text().split("Was");
									classText = "Was ";
									pricesFound = "Y";
								}
								
							}
							else if($(this).hasClass("now")){
				 				if($(this).text().toLowerCase().indexOf("now")!= -1){
									itemPrice = $(this).text().split("Now");
									classText = "Now ";
									pricesFound = "Y";
								}
							}
 	 						if(itemPrice != ""){
	 			 				if(itemPrice[1].indexOf("-") != -1){
 		 							var itemPrice = itemPrice[1].split("-"); 
   									var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
 									var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
 									var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
 									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
 									$(this).text(classText + currencyCode + " " +  newPrice1 + " - " + newPrice2);
 								}
  								else{
		 							var itemPrice = itemPrice[1].replace('$','').replace(',','');
		 			 				var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
									$(this).text(classText + currencyCode + " " +  newPrice);
 								}
 							}
						}
 					});
 
 
					if (pricesFound == "N") {
						if($(this).find('.price').text().indexOf("-") != -1){
							var itemPrice = $(this).find('.price').text().split("-"); 
							var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
							var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
							var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1);
							var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
							$(this).find('.price').text(newPrice1 + " - " + newPrice2);
						}
						else{
							var itemPrice = $(this).find('.price').text().replace('$','').replace(',','');
							var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
							$(this).find('.price').text(newPrice);
						}
						$(this).find('.price').prepend(currencyCode + "&nbsp;");
	 				}
					
					
					$(this).find('.price').show();
				}
			}
			// End: (Product.jsp)
			// Start: (All Product Display Pages Header Price)
			if ($(this).is("#top-info")) {
				$(this).children('div').each(function () {
					if ($(this).is('#price')) { 
	 					var pricesFound = "N";
						$(this).children('div').each(function () {
							//reg, was, now classes
							if ($(this).is('.reg') || $(this).is('.was') || $(this).is('.now') ) { 
	  							
								var itemPrice = "";
								var classText="";
								if($(this).hasClass("reg")){
					 				if($(this).text().toLowerCase().indexOf("orig.")!= -1){
										itemPrice = $(this).text().split("Orig.");
										classText = "Orig. ";
										pricesFound = "Y";
									}
	 	 							else if($(this).text().toLowerCase().indexOf("reg.")!= -1){
		 								itemPrice = $(this).text().split("Reg.");
		 								classText = "Reg. ";
										pricesFound = "Y";
 	 	 							}
								}
								else if($(this).hasClass("was")){
					 				if($(this).text().toLowerCase().indexOf("was")!= -1){
										itemPrice = $(this).text().split("Was");
										classText = "Was ";
										pricesFound = "Y";
 									}
									
								}
								else if($(this).hasClass("now")){
					 				if($(this).text().toLowerCase().indexOf("now")!= -1){
										itemPrice = $(this).text().split("Now");
										classText = "Now ";
										pricesFound = "Y";
 									}
 								}
	 	 						if(itemPrice != ""){
		 			 				if(itemPrice[1].indexOf("-") != -1){
	 		 							var itemPrice = itemPrice[1].split("-"); 
	   									var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
	 									var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
	 									var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
	 									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
	 									$(this).text(classText + currencyCode + " " +  newPrice1 + "-" + newPrice2);
	 								}
	  								else{
			 							var itemPrice = itemPrice[1].replace('$','').replace(',','');
										var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
										$(this).text(classText + currencyCode + " " +  newPrice);
	 								}
	 							}
  							}
 
 						});
					
			 			if(pricesFound == "N"){
							if($(this).text().indexOf("-") != -1){
 								var itemPrice = $(this).text().split("-"); 
								var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
								var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
								var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
								var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
								$(this).text(currencyCode + " " + newPrice1 + " - " + newPrice2);
							}
							else{
 								var itemPrice = $(this).text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
								$(this).text(currencyCode + " " + newPrice);
							}
						}
 						$(this).show();
					}
				}); 
			}
			if ($(this).is("#info-section")) {
				$(this).children('div').each(function () {
					if ($(this).is('#price')) { 
						var pricesFound = "N";
						$(this).children('div').each(function () {
							//reg, was, now classes
							if ($(this).is('.reg') || $(this).is('.was') || $(this).is('.now') ) { 
 								
								var itemPrice = "";
								var classText="";
								if($(this).hasClass("reg")){
					 				if($(this).text().toLowerCase().indexOf("orig.")!= -1){
										itemPrice = $(this).text().split("Orig.");
										classText = "Orig. ";
										pricesFound = "Y";
									}
	 	 							else if($(this).text().toLowerCase().indexOf("reg.")!= -1){
		 								itemPrice = $(this).text().split("Reg.");
		 								classText = "Reg. ";
										pricesFound = "Y";
 	 	 							}
								}
								else if($(this).hasClass("was")){
					 				if($(this).text().toLowerCase().indexOf("was")!= -1){
										itemPrice = $(this).text().split("Was");
										classText = "Was ";
										pricesFound = "Y";
 									}
									
								}
								else if($(this).hasClass("now")){
					 				if($(this).text().toLowerCase().indexOf("now")!= -1){
										itemPrice = $(this).text().split("Now");
										classText = "Now ";
										pricesFound = "Y";
 									}
 								}
	 	 						if(itemPrice != ""){
		 			 				if(itemPrice[1].indexOf("-") != -1){
	 		 							var itemPrice = itemPrice[1].split("-"); 
	   									var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
	 									var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
	 									var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
	 									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
	 									$(this).text(classText + currencyCode + " " +  newPrice1 + "-" + newPrice2);
	 								}
	  								else{
			 							var itemPrice = $(this).text().replace('$','').replace(',','');
										var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
										$(this).text(classText + currencyCode + " " +  newPrice);
	 								}
	 							}
  							}
 
 						});
					
						
						
		 				if(pricesFound == "N"){
							if($(this).text().indexOf("-") != -1){
 								var itemPrice = $(this).text().split("-"); 
								var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
								var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
								var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
								var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
								$(this).text(currencyCode+ " " + newPrice1 + " - " + newPrice2);
							}
							else{
 								var itemPrice = $(this).text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
								$(this).text(currencyCode+ " " + newPrice);
							}
						}
 						$(this).show();
					}
				}); 
			}
			// Finish: (All Product Display Pages Header Price)
			//Start: (HeroProductDisplay.jsp)
			if ($(this).is(".product")) {
				$(this).children('a').children('span').each(function () {
					if ($(this).is('.price')) {
						if($(this).text().indexOf("-") != -1){
							var itemPrice = $(this).text().split("-");
							var itemPrice1 = itemPrice[0].replace('$','').replace(',','');
							var itemPrice2 = itemPrice[1].replace('$','').replace(',','');
							var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1);
							var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
							$(this).text(newPrice1 + " - " + newPrice2);
						}
						else{
							var itemPrice = $(this).text().replace('$','').replace(',','');
							var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1);
							$(this).text(newPrice);
						}
						$(this).prepend(currencyCode + "&nbsp;");
						$(this).show();
					}
				});
			}
			//Finish: (HeroProductDisplay.jsp)
			// Start: (ProductItemDisplay)
			if ($(this).is(".info")) {
				$(this).children('div').children('div').each(function () {
					if ($(this).is(".price")) {
						var pricesFound = "N";
						$(this).children('div').each(function () {
							//reg, was, now classes
							if ($(this).is('.reg') || $(this).is('.was') || $(this).is('.now') ) { 
		 						
								var itemPrice = "";
								var classText="";
								if($(this).hasClass("reg")){
					 				if($(this).text().toLowerCase().indexOf("orig.")!= -1){
										itemPrice = $(this).text().split("Orig.");
 										classText = "Orig. ";
 										pricesFound = "Y";
 								 	}
	 	 							else if($(this).text().toLowerCase().indexOf("reg.")!= -1){
		 								itemPrice = $(this).text().split("Reg.");
		 								classText = "Reg. ";
 										pricesFound = "Y";
 	 	 							}
								}
								else if($(this).hasClass("was")){
					 				if($(this).text().toLowerCase().indexOf("was")!= -1){
										itemPrice = $(this).text().split("Was");
										classText = "Was ";
 										pricesFound = "Y";
 									}
									
								}
								else if($(this).hasClass("now")){
					 				if($(this).text().toLowerCase().indexOf("now")!= -1){
										itemPrice = $(this).text().split("Now");
										classText = "Now ";
 										pricesFound = "Y";
 									}
 								}
	 	 						if(itemPrice != ""){
		 			 				if(itemPrice[1].indexOf("-") != -1){
	 		 							var itemPrice = itemPrice[1].split("-"); 
	   									var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
	 									var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
	 									var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
	 									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
	 									$(this).text(classText + currencyCode + " " +  newPrice1 + "-" + newPrice2);
	 								}
	  								else{
			 							var itemPrice = itemPrice[1].replace('$','').replace(',','');
										var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
										$(this).text(classText + currencyCode + " " +  newPrice);
	 								}
	 							}
  							}
 
 						});
					
						
						
		 				if(pricesFound == "N"){
							if($(this).text().indexOf("-") != -1){
 								var itemPrice = $(this).text().split("-"); 
								var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
								var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
								var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
								var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
								$(this).text(currencyCode+ " " + newPrice1 + " - " + newPrice2);
							}
							else{
 								var itemPrice = $(this).text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
								$(this).text(currencyCode+ " " + newPrice);
							}
						}
 						$(this).show();					}
				});
			}
			// Finish: (ProductItemDisplay)
			if ($(this).is("#cart-area")) {
				$("table").each(function (index) {
					//Start: RegistryShoppingCart.jspf
					if ($(this).is("#registry-cart-table")) {
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('.avail')){
								if($(this).find('.remove')){
									$(this).find('.remove').children(this).each(function () {
										$(this).html("<img alt=\"\" src=\"/images/delete.gif\">Remove to proceed");
									});

								}
							}
						});
						$(this).children(this).children(this).each(function () {
							if($(this).is('.noborder')){
								$(this).hide();
								if($(this).find('.discount')){
									$(this).find('.discount').css("display","none;");
								}
							}
						});
						$(".fiftyOne-cartTotals").hide();
						$(".continue-checkout").hide();
						$("#international-registry-error").DillardsModalOpen();
					}
					//End: RegistryShoppingCart.jspf
					//Start: ShoppingCart.jspf
					if ($(this).is("#cart-table")) {
						var itemQty;
						$(this).children(this).children('tr').each(function () {
							var itemPrice;
							if($(this).find('.remove')){
								$(this).find('.remove').show();
							}
							if($(this).find('.qty')){
							$(this).find('.qty').show();
								$(this).children(this).children('select').each(function () {
									itemQty = $(this).val();
								});
							}
							if($(this).find('.fiftyOne-lil-price')){
								var itemPrice = $(this).find('.fiftyOne-lil-price').text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1);
								$(this).find('.fiftyOne-lil-price').text(newPrice);
								$(this).find('.fiftyOne-lil-price').prepend(currencyCode + "&nbsp;");
								$(this).find('.fiftyOne-lil-price').show();
							}
							if($(this).find('.big-price')){
								var itemPrice = $(this).find('.big-price').text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice/itemQty,exchangeRate,FLC,roundMethod,itemQty);
								$(this).find('.big-price').text(newPrice);
								$(this).find('.big-price').prepend(currencyCode + "&nbsp;");
								$(this).find('.big-price').show();
							}
							if($(this).is('.noborder')){
								if($(this).find('.discount')){
									var itemPrice = $(this).find('.discount').text().replace('$','').replace(',','');
									var newPrice = calculateNewPrice(itemPrice/itemQty,exchangeRate,FLC,roundMethod,itemQty);
									$(this).find('.discount').text(newPrice);
									$(this).find('.discount').prepend(currencyCode + "&nbsp;");
									$(this).find('.discount').show();
								}
							}
						});
					}
					//End: ShoppingCart.jspf
					//Start: OrderItemDisplay.jsp
					if ($(this).is(".fiftyOne-cartTotals")) {
						var subTotal = calculateCartSubTotal(roundMethod);
						var discount = calculateCartDiscounts(roundMethod);
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('#subtotal')){
								if($(this).children().is('.fiftyOne-subTotal')){
									$(this).children().text(subTotal);
									$(this).children().prepend(currencyCode + "&nbsp;");
									$(this).children().show();
								}
							}
							if($(this).is('#orderDiscountTotal')){
								if($(this).children().is('.fiftyOne-orderDiscountTotal')){
									$(this).children().text(discount);
									$(this).children().prepend(currencyCode + "&nbsp;");
									$(this).children().show();
								}
							}
							if($(this).is('#shippingTotal')){
								if($(this).children().is('.fiftyOne-shippingTotals')){
									var newPrice = calculateNewPrice(0,exchangeRate,FLC,roundMethod,1); 
									$(this).children().text(newPrice);
									$(this).children().prepend(currencyCode + "&nbsp;");
									$(this).children().show();
								}
							}
							if($(this).is('.total')){
								if($(this).children().is('.fiftyOne-orderTotal')){
									var total = calculateCartTotal(roundMethod);
									$(this).children().text(total);
									$(this).children().prepend(currencyCode + "&nbsp;");
									$(this).children().show();
								}
							}
						});
					}
					//End: OrderItemDisplay.jsp
				});
			}
			//Start horizontal seo RR 
			if ($(this).is("#rr-product-seo")) {
				$("table").each(function (index) {
					if ($(this).is(".rr_h_seo")) {
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('.rr_itemLoop_h_seo')){
								$(this).children('div').each(function () {
									if($(this).is(".rr_item_h_seo")){
										$(this).children('span').children('a').children('b').each(function (){
											if($(this).text().indexOf("-") != -1){
												var rrDispPrice = $(this).text().split("-");
												var rrPrice1 = rrDispPrice[0].replace('$','').replace(',','');
												var rrPrice2 = rrDispPrice[1].replace('$','').replace(',','');
												var newRRPrice1 = calculateNewPrice(rrPrice1,exchangeRate,FLC,roundMethod,1); 
												var newRRPrice2 = calculateNewPrice(rrPrice2,exchangeRate,FLC,roundMethod,1); 
												$(this).text(newRRPrice1 + " - " + newRRPrice2);
												$(this).prepend(currencyCode + "&nbsp;");
											}
											else if($(this).text().indexOf("$") != -1){
												var rrPrice = $(this).text().replace('$','').replace(',','');
												var newRRPrice = calculateNewPrice(rrPrice,exchangeRate,FLC,roundMethod,1);
												$(this).text(newRRPrice);
												$(this).prepend(currencyCode + "&nbsp;");
											}
										});
									}
								});
							}
						});
					}
				});
			}
			//End horizontal seo RR
			//Start side RR
			if ($(this).is("#side-rr")) {
				$("table").each(function (index) {
					if ($(this).is(".rr_itemLoop_vertical")) {
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('.rr_item_vertical')){
								$(this).children('div').each(function () {
									if($(this).is(".rr_itemPrice_vertical")){
										$(this).children('a').children('b').each(function (){
											if($(this).text().indexOf("-") != -1){
												var rrDispPrice = $(this).text().split("-"); 
												var rrPrice1 = rrDispPrice[0].replace('$','').replace(',',''); 
												var rrPrice2 = rrDispPrice[1].replace('$','').replace(',',''); 
												var newRRPrice1 = calculateNewPrice(rrPrice1,exchangeRate,FLC,roundMethod,1); 
												var newRRPrice2 = calculateNewPrice(rrPrice2,exchangeRate,FLC,roundMethod,1); 
												$(this).text(newRRPrice1 + " - " + newRRPrice2);
												$(this).prepend(currencyCode + "&nbsp;");
											}
											else if($(this).text().indexOf("$") != -1){
												var rrPrice = $(this).text().replace('$','').replace(',','');
												var newRRPrice = calculateNewPrice(rrPrice,exchangeRate,FLC,roundMethod,1);
												$(this).text(newRRPrice);   
												$(this).prepend(currencyCode + "&nbsp;");
											}
										});
									}
								});
							}
						});
					}
				});
			}
			//End  side RR
			//Start vertical RR
			if ($(this).is(".rr_vertical")) {
				$("table").each(function (index) {
					if ($(this).is(".rr_itemLoop_vertical")) {
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('.rr_item_vertical')){
								$(this).children('div').each(function () {
									if($(this).is(".rr_itemPrice_vertical")){
										$(this).children('a').children('b').each(function (){
											if($(this).text().indexOf("-") != -1){
												var rrDispPrice = $(this).text().split("-"); 
												var rrPrice1 = rrDispPrice[0].replace('$','').replace(',',''); 
												var rrPrice2 = rrDispPrice[1].replace('$','').replace(',',''); 
												var newRRPrice1 = calculateNewPrice(rrPrice1,exchangeRate,FLC,roundMethod,1); 
												var newRRPrice2 = calculateNewPrice(rrPrice2,exchangeRate,FLC,roundMethod,1); 
												$(this).text(newRRPrice1 + " - " + newRRPrice2);
												$(this).prepend(currencyCode + "&nbsp;");
											}
											else if($(this).text().indexOf("$") != -1){
												var rrPrice = $(this).text().replace('$','').replace(',','');
												var newRRPrice = calculateNewPrice(rrPrice,exchangeRate,FLC,roundMethod,1);
												$(this).text(newRRPrice);   
												$(this).prepend(currencyCode + "&nbsp;");
											}
										});
									}
								});
							}
						});
					}
				});
			}
			//End  vertical RR
			//Start horizontal RR 
			if ($(this).is("#rr-wrapper")) {
				$("table").each(function (index) {
					if ($(this).is(".rr_h")) {
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('.rr_itemLoop_h')){
								$(this).children('div').each(function () {
									if($(this).is(".rr_item_h")){
										$(this).children('span').children('a').children('b').each(function (){
											if($(this).text().indexOf("-") != -1){
												var rrDispPrice = $(this).text().split("-");
												var rrPrice1 = rrDispPrice[0].replace('$','').replace(',','');
												var rrPrice2 = rrDispPrice[1].replace('$','').replace(',','');
												var newRRPrice1 = calculateNewPrice(rrPrice1,exchangeRate,FLC,roundMethod,1);
												var newRRPrice2 = calculateNewPrice(rrPrice2,exchangeRate,FLC,roundMethod,1);
												$(this).text(newRRPrice1 + " - " + newRRPrice2);
												$(this).prepend(currencyCode + "&nbsp;");
											}
											else if($(this).text().indexOf("$") != -1){
												var rrPrice = $(this).text().replace('$','').replace(',','');
												var newRRPrice = calculateNewPrice(rrPrice,exchangeRate,FLC,roundMethod,1);
												$(this).text(newRRPrice);
												$(this).prepend(currencyCode + "&nbsp;");
											}
										});
									}
								});
							}
						});
					}
				});
			}
		//End horizontal RR
		}); 
	}
	function loadDefaultSwatchPrices(){
		$("div").each(function (index) {
			// Start: (All Product Display Pages containing swatches)
			if ($(this).is("#swatches")) {
				if ($(this).find('.price')) {
				$(this).find('.price').show();
				}
			}
			// Finish: (All Product Display Pages containing swatches) 
		});
	}
	function loadInternationalSwatchPrices(exchangeRate,FLC,roundMethod,currencyCode){
		$("div").each(function (index) {
			// Start: (All Product Display Pages containing swatches)
				if ($(this).is(".props")) {
					$(this).children('div').children('div').children('ul').children('li').each(function () {
						if($(this).children(this).text().indexOf("$") != -1){
							var ddDisplayPrice = $(this).children(this).text().split("$");
							if (typeof ddDisplayPrice[1] != "undefined") {
								var desc = ddDisplayPrice[0];
								var price = ddDisplayPrice[1].replace('$','').replace(',','');
								var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
								$(this).children(this).text(desc+"$"+newPrice);
							}
							else{
								var price = ddDisplayPrice[0].replace('$','').replace(',','');
								var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
								$(this).children(this).text("$"+newPrice);
							}
						}
					});
				}
 				if ($(this).is(".attrs")) {
					$(this).children('div').children('div').children('ul').children('li').each(function () {
						if($(this).children(this).text().indexOf("$") != -1){
							var ddDisplayPrice = $(this).children(this).text().split("$");
							if (typeof ddDisplayPrice[1] != "undefined") {
								var desc = ddDisplayPrice[0];
								var price = ddDisplayPrice[1].replace('$','').replace(',','');
								var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
								$(this).children(this).text(desc+"$"+newPrice);
							}
							else{
								var price = ddDisplayPrice[0].replace('$','').replace(',','');
								var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
								$(this).children(this).text("$"+newPrice);
							}
						}
					});
				}

				if ($(this).is(".prop-section")) {
					$(this).children('div').children('div').children('ul').children('li').each(function () {
						if($(this).children(this).text().indexOf("$") != -1){
							var ddDisplayPrice = $(this).children(this).text().split("$");
							if (typeof ddDisplayPrice[1] != "undefined") {
								var desc = ddDisplayPrice[0];
								var price = ddDisplayPrice[1].replace('$','').replace(',','');
								var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
								$(this).children(this).text(desc+"$"+newPrice);
							}
							else{
								var price = ddDisplayPrice[0].replace('$','').replace(',','');
								var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
								$(this).children(this).text("$"+newPrice);
							}
						}
					});
				}
 				if ($(this).is(".attr-section")) {
  					$(this).children('div').children('div').children('div').children('ul').each(function () {
  						$(this).children('div').each(function () {
 							if ($(this).is(".price")) {
 								var pricesFound = "N";
 								$(this).children('div').each(function () {
 						 			//reg, was, now classes
 									if ($(this).is('.reg') || $(this).is('.was') || $(this).is('.now') ) { 
 			  							
 										var itemPrice = "";
 										var classText="";
 										if($(this).hasClass("reg")){
 							 				if($(this).text().toLowerCase().indexOf("orig.")!= -1){
 												itemPrice = $(this).text().split("Orig.");
 			 									classText = "Orig. ";
 			 									pricesFound = "Y";
 											}
 			 	 							else if($(this).text().toLowerCase().indexOf("reg.")!= -1){
 				 								itemPrice = $(this).text().split("Reg.");
 				 								classText = "Reg. ";
 				 								pricesFound = "Y";
 			 	 							}
 										}
 										else if($(this).hasClass("was")){
 							 				if($(this).text().toLowerCase().indexOf("was")!= -1){
 												itemPrice = $(this).text().split("Was");
 												classText = "Was ";
 												pricesFound = "Y";
 											}
 											
 										}
 										else if($(this).hasClass("now")){
 							 				if($(this).text().toLowerCase().indexOf("now")!= -1){
 												itemPrice = $(this).text().split("Now");
 												classText = "Now ";
 												pricesFound = "Y";
 											}
 										}
 			 	 						if(itemPrice != ""){
 				 			 				if(itemPrice[1].indexOf("-") != -1){
 			 		 							var itemPrice = itemPrice[1].split("-"); 
 			   									var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
 			 									var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
 			 									var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
 			 									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
 			 									$(this).text(classText + currencyCode + " " +  newPrice1 + " - " + newPrice2);
 			 								}
 			  								else{
 					 							var itemPrice = itemPrice[1].replace('$','').replace(',','');
 					 			 				var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
 												$(this).text(classText + currencyCode + " " +  newPrice);
 			 								}
 			 							}
 									}
 			 					});
 			 
 	 							if (pricesFound == "N") {
 									if($(this).text().indexOf("-") != -1){
 										var itemPrice = $(this).text().split("-"); 
 										var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
 										var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
 										var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1);
 										var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
 										$(this).text(newPrice1 + " - " + newPrice2);
 									}
 									else{
 										var itemPrice = $(this).text().replace('$','').replace(',','');
 										var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
 										$(this).text(newPrice);
 									}
 									$(this).prepend(currencyCode + "&nbsp;");
 				 				}
 								
 	 							$(this).show();
 	 						}
 						});
 					});
  					$(this).children('div').children('div').children('ul').each(function () {
 						$(this).children('li').each(function () {
 							if($(this).children(this).text().indexOf("$") != -1){
								var ddDisplayPrice = $(this).children(this).text().split("$");
		 						if (typeof ddDisplayPrice[1] != "undefined") {
									var desc = ddDisplayPrice[0];
									var price = ddDisplayPrice[1].replace('$','').replace(',','');
									var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
									$(this).children(this).text(desc+"$"+newPrice);
								}
								else{
									var price = ddDisplayPrice[0].replace('$','').replace(',','');
									var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
									$(this).children(this).text("$"+newPrice);
								}
							}
 						});

 						
 						//$(this).children('div').each(function () {
 						//	if ($(this).is(".price")) {
 						//		var pricesFound = "N";
 						//		$(this).children('div').each(function () {
 						// 			//reg, was, now classes
 						//			if ($(this).is('.reg') || $(this).is('.was') || $(this).is('.now') ) { 
 			  			//				
 						//				var itemPrice = "";
 						//				var classText="";
 						//				if($(this).hasClass("reg")){
 						//	 				if($(this).text().toLowerCase().indexOf("orig.")!= -1){
 						//						itemPrice = $(this).text().split("Orig.");
 			 			//						classText = "Orig. ";
 			 			//						pricesFound = "Y";
 						//					}
 			 	 		//					else if($(this).text().toLowerCase().indexOf("reg.")!= -1){
 				 		//						itemPrice = $(this).text().split("Reg.");
 				 		//						classText = "Reg. ";
 				 		//						pricesFound = "Y";
 			 	 		//					}
 						//				}
 						//				else if($(this).hasClass("was")){
 						//	 				if($(this).text().toLowerCase().indexOf("was")!= -1){
 						//						itemPrice = $(this).text().split("Was");
 						//						classText = "Was ";
 						//						pricesFound = "Y";
 						//					}
 						//					
 						//				}
 						//				else if($(this).hasClass("now")){
 						//	 				if($(this).text().toLowerCase().indexOf("now")!= -1){
 						//						itemPrice = $(this).text().split("Now");
 						//						classText = "Now ";
 						//						pricesFound = "Y";
 						//					}
 						//				}
 			 	 		//				if(itemPrice != ""){
 				 		//	 				if(itemPrice[1].indexOf("-") != -1){
 			 		 	//						var itemPrice = itemPrice[1].split("-"); 
 			   			//						var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
 			 			//						var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
 			 			//						var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
 			 			//						var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
 			 			//						$(this).text(classText + currencyCode + " " +  newPrice1 + " - " + newPrice2);
 			 			//					}
 			  			//					else{
 					 	//						var itemPrice = itemPrice[1].replace('$','').replace(',','');
 					 	//		 				var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
 						//						$(this).text(classText + currencyCode + " " +  newPrice);
 			 			//					}
 			 			//				}
 						//			}
 			 			//		});
 			 
 	 					//		if (pricesFound == "N") {
 						//			if($(this).text().indexOf("-") != -1){
 						//				var itemPrice = $(this).text().split("-"); 
 						//				var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
 						//				var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
 						//				var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1);
 						//				var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
 						//				$(this).text(newPrice1 + " - " + newPrice2);
 						//			}
 						//			else{
 						//				var itemPrice = $(this).text().replace('$','').replace(',','');
 						//				var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
 						//				$(this).text(newPrice);
 						//			}
 						//			$(this).prepend(currencyCode + "&nbsp;");
 				 		//		}
 								
 	 					//		$(this).show();
 	 					//	}
 						//});
 					});
				}
				if ($(this).is("#swatches")) {
					$(this).children('div').each(function () {
						if ($(this).is(".price")) {
							var pricesFound = "N";
							$(this).children('div').each(function () {
					 			//reg, was, now classes
								if ($(this).is('.reg') || $(this).is('.was') || $(this).is('.now') ) { 
		  							
									var itemPrice = "";
									var classText="";
									if($(this).hasClass("reg")){
						 				if($(this).text().toLowerCase().indexOf("orig.")!= -1){
											itemPrice = $(this).text().split("Orig.");
		 									classText = "Orig. ";
		 									pricesFound = "Y";
										}
		 	 							else if($(this).text().toLowerCase().indexOf("reg.")!= -1){
			 								itemPrice = $(this).text().split("Reg.");
			 								classText = "Reg. ";
			 								pricesFound = "Y";
		 	 							}
									}
									else if($(this).hasClass("was")){
						 				if($(this).text().toLowerCase().indexOf("was")!= -1){
											itemPrice = $(this).text().split("Was");
											classText = "Was ";
											pricesFound = "Y";
										}
										
									}
									else if($(this).hasClass("now")){
						 				if($(this).text().toLowerCase().indexOf("now")!= -1){
											itemPrice = $(this).text().split("Now");
											classText = "Now ";
											pricesFound = "Y";
										}
									}
 		 	 						if(itemPrice != ""){
			 			 				if(itemPrice[1].indexOf("-") != -1){
		 		 							var itemPrice = itemPrice[1].split("-"); 
		   									var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
		 									var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
		 									var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
		 									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
		 									$(this).text(classText + currencyCode + " " +  newPrice1 + " - " + newPrice2);
		 								}
		  								else{
				 							var itemPrice = itemPrice[1].replace('$','').replace(',','');
				 			 				var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
											$(this).text(classText + currencyCode + " " +  newPrice);
		 								}
		 							}
								}
		 					});
		 
 							if (pricesFound == "N") {
								if($(this).text().indexOf("-") != -1){
									var itemPrice = $(this).text().split("-"); 
									var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
									var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
									var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1);
									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
									$(this).text(newPrice1 + " - " + newPrice2);
								}
								else{
									var itemPrice = $(this).text().replace('$','').replace(',','');
 	 								var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
									$(this).text(newPrice);
								}
								$(this).prepend(currencyCode + "&nbsp;");
			 				}
							
 							$(this).show();
 						}
					});
					$(this).children('div').children('div').each(function () {
 						if ($(this).is(".price")) {
 							var pricesFound = "N";
							$(this).children('div').each(function () {
					 			//reg, was, now classes
						 		if ($(this).is('.reg') || $(this).is('.was') || $(this).is('.now') ) { 
 									var itemPrice = "";
									var classText="";
									if($(this).hasClass("reg")){
						 				if($(this).text().toLowerCase().indexOf("orig.")!= -1){
											itemPrice = $(this).text().split("Orig.");
		 									classText = "Orig. ";
		 									pricesFound = "Y";
										}
		 	 							else if($(this).text().toLowerCase().indexOf("reg.")!= -1){
			 								itemPrice = $(this).text().split("Reg.");
			 								classText = "Reg. ";
			 								pricesFound = "Y";
		 	 							}
									}
									else if($(this).hasClass("was")){
										 if($(this).text().toLowerCase().indexOf("was")!= -1){
											itemPrice = $(this).text().split("Was");
											classText = "Was ";
											pricesFound = "Y";
										}
										
									}
									else if($(this).hasClass("now")){										
						 				if($(this).text().toLowerCase().indexOf("now")!= -1){
											itemPrice = $(this).text().split("Now");
											classText = "Now ";
											pricesFound = "Y";
										}
									}
		 	 						if(itemPrice != ""){
			 			 				if(itemPrice[1].indexOf("-") != -1){
		 		 							var itemPrice = itemPrice[1].split("-"); 
		   									var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
		 									var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
		 									var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
		 									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
		 									$(this).text(classText + currencyCode + " " +  newPrice1 + " - " + newPrice2);
		 								}
		  								else{
				 							var itemPrice = itemPrice[1].replace('$','').replace(',','');
				 			 				var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
											$(this).text(classText + currencyCode + " " +  newPrice);
		 								}
		 							}
								}
		 					});
		 
		 
							if (pricesFound == "N") {
								if($(this).text().indexOf("-") != -1){
									var itemPrice = $(this).text().split("-"); 
									var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
									var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
									var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1);
									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
									$(this).text(newPrice1 + " - " + newPrice2);
								}
								else{
									var itemPrice = $(this).text().replace('$','').replace(',','');
 									var saleEndText = "";
									if(itemPrice.indexOf("Size") != -1){
										var itemPriceSplit = itemPrice.split("Size");
										itemPrice = itemPriceSplit[0];
										saleEndText = itemPriceSplit[1];
									}
		 							var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
									if(saleEndText != ""){
										$(this).html(newPrice +"<div class=\"sizeText-message\">Size" +saleEndText +"</div>");	
									}
									else{		
										$(this).text(newPrice);
									}
								}
								$(this).prepend(currencyCode + "&nbsp;");
			 				}
							
							
							$(this).show();
						}
					});
					$(this).children('div').children('ul').each(function () {
 						if($(this).prop("title").indexOf("$") != -1){
							var itemPrice =$(this).prop("title").replace('$','').replace(',','');
							 
							var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1);
							$(this).prop("title", "$" + newPrice);
							
						
							$(this).children('div').each(function () {
								if ($(this).is(".price")) {
									var pricesFound = "N";
									$(this).children('div').each(function () {
							 			//reg, was, now classes
								 		if ($(this).is('.reg') || $(this).is('.was') || $(this).is('.now') ) { 
											var itemPrice = "";
											var classText="";
											if($(this).hasClass("reg")){
								 				if($(this).text().toLowerCase().indexOf("orig.")!= -1){
													itemPrice = $(this).text().split("Orig.");
				 									classText = "Orig. ";
				 									pricesFound = "Y";
												}
				 	 							else if($(this).text().toLowerCase().indexOf("reg.")!= -1){
					 								itemPrice = $(this).text().split("Reg.");
					 								classText = "Reg. ";
					 								pricesFound = "Y";
				 	 							}
											}
											else if($(this).hasClass("was")){
												 if($(this).text().toLowerCase().indexOf("was")!= -1){
													itemPrice = $(this).text().split("Was");
													classText = "Was ";
													pricesFound = "Y";
												}
																	
											}
											else if($(this).hasClass("now")){										
								 				if($(this).text().toLowerCase().indexOf("now")!= -1){
													itemPrice = $(this).text().split("Now");
													classText = "Now ";
													pricesFound = "Y";
												}
											}
				 	 						if(itemPrice != ""){
					 			 				if(itemPrice[1].indexOf("-") != -1){
				 		 							var itemPrice = itemPrice[1].split("-"); 
				   									var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
				 									var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
				 									var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
				 									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
				 									$(this).text(classText + currencyCode + " " +  newPrice1 + " - " + newPrice2);
				 								}
				  								else{
													var itemPrice = itemPrice[1].replace('$','').replace(',','');
									 				var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
													$(this).text(classText + currencyCode + " " +  newPrice);
												}
											}
										}
									 });
									 
									 if (pricesFound == "N") {
										if($(this).text().indexOf("-") != -1){
											var itemPrice = $(this).text().split("-"); 
											var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
											var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
											var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1);
											var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
											$(this).text(newPrice1 + " - " + newPrice2);
										}
										else{
											var itemPrice = $(this).text().replace('$','').replace(',','');
							 				var saleEndText = "";
											if(itemPrice.indexOf("Size") != -1){
												var itemPriceSplit = itemPrice.split("Size");
												itemPrice = itemPriceSplit[0];
												saleEndText = itemPriceSplit[1];
											}
									 		var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
											if(saleEndText != ""){
												$(this).html(newPrice +"<div class=\"sizeText-message\">Size" +saleEndText +"</div>");	
											}
											else{		
												$(this).text(newPrice);
											}
										}
										$(this).prepend(currencyCode + "&nbsp;");
									}
														
											
									$(this).show();
								}
							});
		 					
							
							$(this).children('li').each(function () {
								if($(this).prop("id").indexOf("$") != -1){
									var id = $(this).prop("id").split("$");
									var idText1 = id[0];
									var idText2 = id[1];
									var idPrice = 0;
									if (typeof id[2] != "undefined") {
										idPrice = id[2].replace('$','').replace(',','');
										var newTextPrice = calculateNewPrice(idPrice,exchangeRate,FLC,roundMethod,1);
										$(this).prop("id",idText1+idText2+"$"+newTextPrice);
									}
									else{
										idPrice = id[1].replace('$','').replace(',','');
										var newTextPrice = calculateNewPrice(idPrice,exchangeRate,FLC,roundMethod,1);
										$(this).prop("id",idText1+"$"+newTextPrice);
									}
								}
								if($(this).prop("title").indexOf("$") != -1){
									var title = $(this).prop("title").split("$");
									if (typeof title[1] != "undefined") {
										var titleText = title[0];
										var titlePrice = title[1].replace('$','').replace(',','');
										var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
										$(this).prop("title",titleText+"$"+newPrice);
									}
									else{
										var titlePrice = title[0].replace('$','').replace(',','');
										var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
										$(this).prop("title","$"+newPrice);
									}
								}
								$(this).children('img').each(function () {
									if($(this).prop("title").indexOf("$") != -1){
										var title = $(this).prop("title").split("$");
										if (typeof title[1] != "undefined") {
											var titleText = title[0];
											var titlePrice = title[1].replace('$','').replace(',','');
											var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
											$(this).prop("title",titleText+"$"+newPrice);
										}
										else{
											var titlePrice = title[0].replace('$','').replace(',','');
											var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
											$(this).prop("title","$"+newPrice);
										}
									}
								});
							});
						}
						else if ($(this).is(".swatches-all")) {
							$(this).children('li').each(function () {
							if($(this).prop("id").indexOf("$") != -1){
								var id = $(this).prop("id").split("$");
								var idText1 = id[0];
								var idText2 = id[1].replace('$','').replace(',','');
								var newTextPrice = calculateNewPrice(idText2,exchangeRate,FLC,roundMethod,1);
								$(this).prop("id",idText1+"$"+newTextPrice);
							}
							if($(this).prop("title").indexOf("$") != -1){
								var title = $(this).prop("title").split("$");
								if (typeof title[1] != "undefined") {
									var titleText = title[0];
									var titlePrice = title[1].replace('$','').replace(',','');
									var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
									$(this).prop("title",titleText+"$"+newPrice);
								}
								else{
									var titlePrice = title[0].replace('$','').replace(',','');
									var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
									$(this).prop("title","$"+newPrice);
								}
							}
							$(this).children('img').each(function () {
								if($(this).prop("title").indexOf("$") != -1){
									var title = $(this).prop("title").split("$");
									if (typeof title[1] != "undefined") {
										var titleText = title[0];
										var titlePrice = title[1].replace('$','').replace(',','');
										var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
										$(this).prop("title",titleText+"$"+newPrice);
									}
									else{
										var titlePrice = title[0].replace('$','').replace(',','');
										var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
										$(this).prop("title","$"+newPrice);
									}
								}
							});
						});
					}
				});
			}
			// End: (All Product Display Pages containing swatches)
		});
	}
	var countryCode = getCookieValues("country");
	var currencyCode = getCookieValues("currency");
	var googleShop = getParameterByName("googleShop");
	var supportCountry = isSupportedCountry(countryCode)
	if(countryCode != null && countryCode != "" && countryCode != "US"){
		if(supportCountry == 'N' || googleShop == "Y"){
			countryCode = 'US';
			setCookies("country","US");
			setCookies("currency","USD");
		}
	
	}
	var exchangeRate;
	var FLC;
	var roundMethod;
	var quoteId;
	var lcpRuleId;
	$(document).ready(function(){
		if(countryCode != null && countryCode != "" && countryCode != "US"){
			if(countryCode != 'US'){
				currencyCode = getCookieValues("currency");
 				//if no currency cookie is set then get country default currency info
				if(currencyCode == null || currencyCode == ""){
					for (var i = 0; i < countryCodeArray.length; i++){
						var ccArrayValueSplit = countryCodeArray[i].split('|');
						if(ccArrayValueSplit[1] == countryCode){
							currencyCode = ccArrayValueSplit[2];
							setCookies("currency",currencyCode);
							FLC = ccArrayValueSplit[3];
							lcpRuleId = ccArrayValueSplit[4];
							setCookies("lcpRuleId",lcpRuleId);
							break;
						}
					}
					for (var i = 0; i < currencyCodeArray.length; i++){
						var ccArrayValueSplit = currencyCodeArray[i].split('|');
						if(ccArrayValueSplit[1] == currencyCode){
							exchangeRate = ccArrayValueSplit[2];
							roundMethod = ccArrayValueSplit[3];
							quoteId = ccArrayValueSplit[4];
							setCookies("quoteId",quoteId);
							break;
						}
					}
				}
				else{
					for (var i = 0; i < countryCodeArray.length; i++){
						var ccArrayValueSplit = countryCodeArray[i].split('|');
						if(ccArrayValueSplit[1] == countryCode){
							FLC = ccArrayValueSplit[3];
							lcpRuleId = ccArrayValueSplit[4];
							setCookies("lcpRuleId",lcpRuleId);
							break; 
						}
					}
					for (var i = 0; i < currencyCodeArray.length; i++){
						var ccArrayValueSplit = currencyCodeArray[i].split('|');
						if(ccArrayValueSplit[1] == currencyCode){
							exchangeRate = ccArrayValueSplit[2];
							roundMethod = ccArrayValueSplit[3];
							quoteId = ccArrayValueSplit[4];
							setCookies("quoteId",quoteId);
							break;
						}
					}
				}
				localizeHeaderFooter(countryCode,exchangeRate,FLC,roundMethod,currencyCode);
				launchWelcomeMat(countryCode); 
				setTimeout(function() {loadInternationalPrices(exchangeRate,FLC,roundMethod,currencyCode);},0);
				var executed = "N";
				$('#attributes').ajaxComplete(function(e, xhr, settings) {
					if(settings.url.indexOf("/webapp/wcs/stores/servlet/SizeColorAndQtyView") != -1){
						loadInternationalSwatchPrices(exchangeRate,FLC,roundMethod,currencyCode);
						executed = "Y";
					}
					if(typeof sizeBundleBoxes !== "undefined"){
							sizeBundleBoxes();
					}
				});
				if(executed == "N"){
					loadInternationalSwatchPrices(exchangeRate,FLC,roundMethod,currencyCode);
				}
			}
			else{
				localizeHeaderFooter(countryCode,exchangeRate,FLC,roundMethod,currencyCode);
				loadDefaultPrices();
				var executed = "N";
				$('#attributes').ajaxComplete(function(e, xhr, settings) {
					if(settings.url.indexOf("/webapp/wcs/stores/servlet/SizeColorAndQtyView") != -1){
						loadDefaultSwatchPrices();
						executed = "Y";
					}
					if(typeof sizeBundleBoxes !== "undefined"){
							sizeBundleBoxes();
					}
				});
				if(executed == "N"){
					loadDefaultSwatchPrices();
				}
			}
		}
		else{
			if(countryCode == null || countryCode == "" || googleShop == "Y"){ 
				countryCode = 'US';
				setCookies("country",countryCode);
			}
			// check for currency cookie and set if not there
			var currencyCode = getCookieValues("currency"); 
			if(currencyCode == null || currencyCode == ""){
				for (var i = 0; i < countryCodeArray.length; i++){
					var ccArrayValueSplit = countryCodeArray[i].split('|');
					if(ccArrayValueSplit[1] == countryCode){
						currencyCode = ccArrayValueSplit[2];
						setCookies("currency",currencyCode);
						break;
					}
				}
			}
			localizeHeaderFooter(countryCode);
			loadDefaultPrices();
			var executed = "N";
			$('#attributes').ajaxComplete(function(e, xhr, settings) {
				if(settings.url.indexOf("/webapp/wcs/stores/servlet/SizeColorAndQtyView") != -1){
					loadDefaultSwatchPrices();
					executed = "Y";
				}
			});
			if(executed == "N"){
				loadDefaultSwatchPrices();
			}
		}
	});
