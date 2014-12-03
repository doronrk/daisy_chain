( function(window, document, $, undefined) {
	'use strict';
	var STAPLES = ( function(STAPLES) {

		STAPLES.EDDIE = ( function() {
			//global variables
			var eddiePromotions = {},
			eddieUserCookies = {},
			currentSkuPromos = [],
			currentSkuCoverage = [],
			currentSKU,
			eddiePO,
			eddiePS,
			switchValues = {
					ON : 'ON',
					OFF : 'OFF'
			},
			promoTypes = {
					FLAT_DISCOUNT : "FLAT_DISCOUNT",
					QUICK_SHIP : "QUICK_SHIP",
					SHIPPING_ESTIMATE : "SHIPPING_ESTIMATE"
			},
			callPromoDisplayed,
			skufilterbrowse,
			analyticPOItems = new Array(),
			DOMready = false,
			windowLoaded = false;

			function setEddiePromotions(eddiePromos) {
				eddiePromotions = eddiePromos;
			}
			function setEddieCookies(eddieCookies) {
				eddieUserCookies = eddieCookies;
			}
			function setCurrentSKU(sku) {
				currentSKU = sku;
			}
			function setEddiePO(switchValue) {
				eddiePO = switchValue;
			}
			function setEddiePS(switchValue) {
				eddiePS = switchValue;
			}
			function filterPromosforCurrentSKU(){
				currentSkuPromos = $.grep(eddiePromotions.promo,function(promo,index){
					return promo.sku == currentSKU;
				});
			}
			function filterCoverageforCurrentSKU(){
				currentSkuCoverage = $.grep(eddiePromotions.productCoverage,function(coverage,index){
					return coverage.coveragesku == currentSKU;
				});
			}
			function setCallPromoDisplayed(promoCall) {
				callPromoDisplayed = promoCall;
			}
			function getskufilterbrowse() {
				if(null == skufilterbrowse || "" == skufilterbrowse){
					skufilterbrowse = document.getElementById("skufilterbrowse").innerHTML;
				}
				return skufilterbrowse;
			}
			function updateProductCoverage(offer,ship){
				$('#productCoveragePerfectOffer_'+currentSKU).val(offer);
				$('#productCoveragePerfectShipping_'+currentSKU).val(ship);
			}
			function objLength(obj){
				var size = 0, key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)) size++;
				}
				return size;
			}
			function formatCurrency(enUSCurrency,langId){
				enUSCurrency = enUSCurrency.toString();

				if (enUSCurrency == null || enUSCurrency == undefined || enUSCurrency == ""){
					return "";
				} 
				if(langId == "2"){
					if (enUSCurrency.length <= 6){
						return enUSCurrency.replace(/\./, ",") + " $";
					}else{
						var dollars = enUSCurrency.split(".")[0];
						var cents = enUSCurrency.split(".")[1];
						dollars = dollars.split("").reverse().join("");
						var frCACurrency = "";
						var count = 0;
						for (var i = 0; i < dollars.length; i++){
							count++;
							if (count == 3){
								frCACurrency += dollars[i] + " ";
								count = 0;
							}else{
								frCACurrency += dollars[i];
							}
						}
						return frCACurrency.split("").reverse().join("") + "," + cents + " $";
					}
				}else{
					return "$"+enUSCurrency;
				}
			}
			function hidePOPSForOOS(){
				var hidePOPS = false;
				if(typeof(iv) != 'undefined' && iv != undefined){
					if(eval('iv[\''+currentSKU+'\']') != undefined && eval('iv[\''+currentSKU+'\'].iv') != '1'){
						hidePOPS = true;
					}
				}
				try{
					var skufilterbrowse = $.parseXML(getskufilterbrowse());
					if($(skufilterbrowse).find('productcatalog product[snum="'+currentSKU+'"]').attr('prdtypeid') == '6'){
						hidePOPS = true;
					}
					// for handling coming soon
					if($(skufilterbrowse).find('productcatalog product[snum="'+currentSKU+'"]').attr('comingsoonflag') == "1"){
						hidePOPS = true;
					}
				}catch(e){
					hidePOPS = true;
				}
				if(hidePOPS){
					hideEddieDivs();
				}
			}
			function promoDisplayed(promos){

				var promoRequest = {};
				promoRequest.userToken = unescape($('#userToken').val());
				promoRequest.common = {};
				promoRequest.common.eddieApiVersion = $('#eddieVersion').val();
				promoRequest.common.requestId = $('#requestId').val();
				promoRequest.common.envInfo = $('#envInfo').val();
				var URL = $('#eddieUrl').val();
				promoRequest.displayedPromos = promos;
				if(objLength(promos) > 0){
					var jsonString = JSON.stringify(promoRequest);
					var url = URL + "promo/update";
					if(window.XDomainRequest){
						// For the IE8 cross-domain calls
						var xmlhttp =  new window.XDomainRequest();
						xmlhttp.open("POST", url);
						xmlhttp.send(""+jsonString);
					}else{	
						$.support.cors = true; // This setting is required for IE for any cross domain POST
						$.ajax( {
							type: "post",
							url: url,
							data: jsonString,
							dataType: "json",
							processData: false,
							crossDomain: true,
							cache: false
						});
					} 
				}
			}
			function displayEddiePromos() {
				filterPromosforCurrentSKU();
				hideEddieDivs();
				var promos = new Object();
				if(null == callPromoDisplayed || !callPromoDisplayed){
					callPromoDisplayed = $('.skuSelectControl , #skuSelectControl').length > 0 ? true : false;
				}
				if(null != currentSkuPromos && currentSkuPromos.length > 0){
					$.each(currentSkuPromos,function(count,promo){
						var promoId = promo.promoIds;
						if(null != eddiePO && switchValues.ON == eddiePO && promoTypes.FLAT_DISCOUNT == promo.promoType && null != promo.promoDiscount){
							var discPerc = parseFloat(promo.promoDiscount);
							try{
								var skufilterbrowse = $.parseXML(getskufilterbrowse());
								var productPrice = $(skufilterbrowse).find('productcatalog product[snum="'+currentSKU+'"]').attr('price');
								var isMapPrice = $(skufilterbrowse).find('productcatalog product[snum="'+currentSKU+'"]').attr('priceincart') != null ? true:false; 
								var promoPrice = eval(productPrice * (100 - discPerc)/100).toFixed(2);
								$('#eddie_discount').html(discPerc+'% ');
								if(!isMapPrice){
									$('#eddie_price').text(formatCurrency(promoPrice,$.trim($('#eddieLangId').val()))+' ');
									$('#eddie_price').show();
									$('#eddieInCart').show();
								}else{
									$('#eddie_price').hide();
									$('#eddieInCart').hide();
								}
								$('#eddiePromo').show();
							}catch(e){
								
							}					

						}
						if(null != eddiePS && switchValues.ON == eddiePS && promoTypes.SHIPPING_ESTIMATE == promo.promoType && null != promo.PSDisplayDate){
							var displayDate = promo.PSDisplayDate;

							if(null != displayDate && "" != $.trim(displayDate)){
								$('#eddieQSTextBlue').html(" "+displayDate+" ");
								$('.eddieQSMain').show();
								$('#eddieQSText').show();
								if(DOMready){
									$('.expectdel').addClass("hide");
								}else{
									STAPLES.Onload.addLoadEvent(function(){
										$('.expectdel').addClass("hide");
									});
								}
							}
						}
						if(null != promoId && null != callPromoDisplayed && callPromoDisplayed && null != promo.promoDisplayArr && promo.promoDisplayArr){
							promos[promoId] = true;
						}
					});
				}
				$('[id^=productCoveragePerfectOffer] , [id^=productCoveragePerfectShipping]').val('');
				filterCoverageforCurrentSKU();
				if(currentSkuCoverage.length == 1 && currentSKU == currentSkuCoverage[0].coveragesku){
					$('[id^=productCoveragePerfectOffer]').attr('id','productCoveragePerfectOffer_'+currentSKU);
					$('[id^=productCoveragePerfectShipping]').attr('id','productCoveragePerfectShipping_'+currentSKU);
					updateProductCoverage(currentSkuCoverage[0].coveragePO,currentSkuCoverage[0].coveragePS);
				}
				if(DOMready){
					hidePOPSForOOS();
				}else{
					STAPLES.Onload.addLoadEvent(function(){
						hidePOPSForOOS();
					});
				}
				if(objLength(promos) > 0 && null != callPromoDisplayed && callPromoDisplayed){
					promoDisplayed(promos);
				}
			}
			function eddiePopup(){
				var params = 'left=640, top=311, width=630, height=486, toolbar=0, resizable=0';
				var name = 'eddieWin';
				var url = propertyValues.CONTENT_PATH + '/help/using/runa_policy_popup.html';

				window.open( url, name, params );

				return false;
			}
			function init() {
				STAPLES.Onload.addLoadEvent(function(){
					DOMready = true;
				});

				STAPLES.Onload.addWindowEvent(function(){
					windowLoaded = true;
				});
			}
			function hideEddieDivs() {
				$('#eddiePromo').hide();
				$('.eddieQSMain').hide();
				$('#eddieQSText').hide();
			}
			function updateDealBarData(){
				if(typeof dealBarSwitch != 'undefined' && 'ON' == dealBarSwitch && null != eddiePromotions && null != eddiePromotions.promo && eddiePromotions.promo.length > 0){
					var dealCount = 0;
					$.each(eddiePromotions.promo,function(count,promo){
						if(promoTypes.FLAT_DISCOUNT == promo.promoType && null != promo.promoDisplayArr && !promo.promoDisplayArr){
							var promoPercentage = parseFloat(promo.promoDiscount);
							var sku = promo.sku;
							if($('#eddieDealBar_').length == 1){
								$('#eddie_carousel').find('#eddieDealBar_').attr('id','eddieDealBar_'+sku);
							}else{
								var tempCarousel = $('#eddie_carousel').clone();
								$(tempCarousel).find('[id^=eddieDealBar_]').attr('id','eddieDealBar_'+sku);
								$('#eddie-offers-list').append(tempCarousel);
							}
							var dealBarCurrSku = $('#eddieDealBar_'+sku).parents('.pre-abandonment');
							$(dealBarCurrSku).find('[id^=promoPercentage_]').attr('id','promoPercentage_'+sku).html(promoPercentage+'%');
							$(dealBarCurrSku).siblings('[id^=productCovPerfectOffer_]').attr('id','productCovPerfectOffer_'+sku);
							$(dealBarCurrSku).siblings('[id^=productCovPerfectShipping_]').attr('id','productCovPerfectShipping_'+sku);
							++dealCount;

						}
					});
					if(0 != dealCount){
						var textForSummary = eval(dealCount) > 1 ? summary_text[1] : summary_text[0];
						$('#promoCount').text(dealCount+" " + textForSummary);
						$('#treatmentGroupPerfectOfferDealBar').val($('#treatmentGroupPerfectOffer').val());
						$('#treatmentGroupPerfectShippingDealBar').val($('#treatmentGroupPerfectShipping').val());
						$('#eddie-meerkat-wrap').show();
						$('.oo_feedback_float').css('bottom', '36px');
					}
				}
			}
			function updatePromoForSearchClass(){
				$.each(eddiePromotions.promo,function(count,promo){
					if(promoTypes.FLAT_DISCOUNT == promo.promoType && null != promo.promoDiscount){
						var promoPercentage = parseFloat(promo.promoDiscount);
						var sku = promo.sku;
						var productPrice = promo.salePrice;
						updatePrice(sku,productPrice,promoPercentage,description);
						var description = $('#eddie_${sku} #header-text').text();
						promoAddAnalytic(sku,productPrice,promoPercentage,description);
					}
				});
				$.each(eddiePromotions.productCoverage,function(count,coverage){
					STAPLES.EDDIE.setCurrentSKU(coverage.coveragesku);
					updateProductCoverage(coverage.coveragePO,coverage.coveragePS)
				});
				try {
					(function (Analytics) {
						Analytics.runaContentLoaded = false;
						Analytics.items = analyticPOItems;
						Analytics.runaContentLoaded = true;
					})(window.Analytics = typeof window.Analytics !== 'undefined' ? window.Analytics : {});
				} catch (e) {
					if (typeof console !== 'undefined' && typeof console.log === 'function') {
						console.log('Caught exception executing Analytics script', e);
					}
				}

			}
			function classSkuSetpromo(eddieSkuSetDetails,$skuNum){
				var mainSku = $('#'+$skuNum+' .eddie_add_to_cart').attr('id').split('_').length == 2 ? $('#'+$skuNum+' .eddie_add_to_cart').attr('id').split('_')[1]:$skuNum;

				var sku = '';
				if(null != eddieSkuSetDetails){
					$.each(eddieSkuSetDetails.promo,function(count,promo){
						if(promoTypes.FLAT_DISCOUNT == promo.promoType && null != promo.promoDiscount){
							var promoPercentage = parseFloat(promo.promoDiscount);
							sku = promo.sku;
							var productPrice = promo.salePrice;
							updatePrice(mainSku,productPrice,promoPercentage,description);
							var description = $('#'+$skuNum+' .name a').text();
							promoAddAnalytic(sku,productPrice,promoPercentage,description);
						}
					});
					if(eddieSkuSetDetails.productCoverage && eddieSkuSetDetails.productCoverage.length == 1){
						STAPLES.EDDIE.setCurrentSKU(mainSku);
						updateProductCoverage(eddieSkuSetDetails.productCoverage[0].coveragePO,eddieSkuSetDetails.productCoverage[0].coveragePS);
					}
						
				}		
			}
			function promoAddAnalytic(sku,productPrice,promoPercentage,description){
				var diffPrice = eval(productPrice - (productPrice * (100 - promoPercentage)/100)).toFixed(2);
				var item = {};
				item.sku = sku;
				item.nowprice = "";
				item.regprice = productPrice;
				item.finalprice = productPrice - diffPrice;
				item.promos = new Array();
				var promo = {};
				promo.code = "perfectofferv2";
				promo.type = "runa";
				promo.description = description;  
				promo.total = diffPrice;
				item.promos.push(promo);
				analyticPOItems.push(item);
			}
			function updatePrice(sku,productPrice,promoPercentage){
				var finalDiscount = '';
				var diffPrice = '';
				if( $( '#' + sku + ' #seepriceincart' ).length > 0 
						|| $( '#pricecont_' + sku + ' #seepriceincart' ).length > 0 ){
					finalDiscount = parseFloat(promoPercentage) + '%';
				}else{
					diffPrice = eval(productPrice - (productPrice * (100 - promoPercentage)/100)).toFixed(2);
					finalDiscount = formatCurrency(diffPrice, propertyValues.DEF_LANG_ID);
				}
				$('#eddie_' + sku  +  ' #eddie_discount').html(finalDiscount + ' ');
				$('[id=eddie_' + sku+']').removeClass('hideit');
				$('[id=eddie_' + sku+']').addClass('showit');
			}
			function updateEddieCookies(){
				if(null != eddieUserCookies){
					var usrToken = STAPLES.Cookies.getCookie(eddieUserCookies.cookieName);
					if(!eddieUserCookies.isInvalidToken && !eddieUserCookies.botDetected){
						if ( null == usrToken || "" == usrToken){
						 	if( eddieUserCookies.reqUserToken != '' && eddieUserCookies.reqUserToken != 'null' ){
						 		STAPLES.Cookies.setCookie(eddieUserCookies.cookieName,eddieUserCookies.reqUserToken,''); // cookie name, value, years valid -- empty for session cookie
						 		$("#userToken").val(eddieUserCookies.reqUserToken);
							}
						 	if( eddieUserCookies.eddieDeviceId != '' && eddieUserCookies.eddieDeviceId != 'null' ){
						 		var eddieDetailsCookie = {};
								if(null != STAPLES.Cookies.getCookie("EDDIE_COOKIE_DETAILS")){
									try{
										eddieDetailsCookie = JSON.parse(STAPLES.Cookies.getCookie("EDDIE_COOKIE_DETAILS"));
									}catch(e){
									}
								}
								eddieDetailsCookie.EDDIE_DEVICE_TOKEN = eddieUserCookies.eddieDeviceId;
						 		STAPLES.Cookies.setCookie("EDDIE_COOKIE_DETAILS",JSON.stringify(eddieDetailsCookie),'20');// cookie name, value, years valid
							}
						}else if ( usrToken != 'null' ) {
							$("#userToken").val(usrToken);
						}
					
					}else if(eddieUserCookies.botDetected){
						$("#userToken").val(eddieUserCookies.botCookieValue);
						STAPLES.Cookies.setCookie(eddieUserCookies.cookieName,eddieUserCookies.botCookieValue,'');// cookie name, value, years valid -- empty for session cookie
						var eddieDetailsCookie = {};
						if(null != STAPLES.Cookies.getCookie("EDDIE_COOKIE_DETAILS")){
							try{
								eddieDetailsCookie = JSON.parse(STAPLES.Cookies.getCookie("EDDIE_COOKIE_DETAILS"));
							}catch(e){
								
							}
						}
						eddieDetailsCookie.EDDIE_DEVICE_TOKEN = eddieUserCookies.botDeviceCookieValue;
				 		STAPLES.Cookies.setCookie("EDDIE_COOKIE_DETAILS",JSON.stringify(eddieDetailsCookie),'20'); // cookie name, value, years valid
					}else{
						STAPLES.Cookies.setCookie(eddieUserCookies.cookieName,'','');
						$("#userToken").val('');
					}
					STAPLES.Cookies.updateCookies();
				}
			}
			return {
				init : init,
				setCurrentSKU : setCurrentSKU,
				setEddiePO : setEddiePO,
				setEddiePS : setEddiePS,
				objLength : objLength,
				eddiePopup : eddiePopup,
				setCallPromoDisplayed : setCallPromoDisplayed,
				setEddiePromotions : setEddiePromotions,
				displayEddiePromos : displayEddiePromos,
				updateDealBarData : updateDealBarData,
				updatePromoForSearchClass : updatePromoForSearchClass,
				classSkuSetpromo : classSkuSetpromo,
				setEddieCookies : setEddieCookies,
				updateEddieCookies : updateEddieCookies
			};
		})();
		return STAPLES;
	}(window.STAPLES || {}));

	//update the Global STAPLES name space with new functionality and variables
	window.STAPLES = STAPLES;
	STAPLES.EDDIE.init();
}(window, document, jQuery));