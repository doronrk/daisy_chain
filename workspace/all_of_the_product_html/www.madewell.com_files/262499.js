//***********************************************
// What site is it?
var site = 'madewell';

// Should we start to display the cutoff messaging? Yes = true; No = false
var economyUS48CutoffStarted = true;
var standardUS48CutoffStarted = true;
var expeditedUS48CutoffStarted = true;
var overnightUS48CutoffStarted = true;

var standardAlaskaHawaiiCutoffStarted = true;
var overnightAlaskaHawaiiCutoffStarted = true;

var economyPOBoxCutoffStarted = true;

var standardUSTerritoriesCutoffStarted = true;

var standardAPOFPOCutoffStarted = true;

var standardCanadaCutoffStarted = true; // same cutoff for Standard and Express

var borderfreeUKCutoffStarted = true;
var borderfreePrimaryCutoffStarted = true;
var borderfreeSecondaryCutoffStarted = true;
var borderfreeRestOfWorld1CutoffStarted = true;
var borderfreeRestOfWorld2CutoffStarted = true;

var standardJapanMWCutoffStarted = true;

// Is it the last day? Yes = true; No = false
var monogramUS48CutoffLastDay = false;
var physicalGiftCardUS48CutoffLastDay = false;
var economyUS48CutoffLastDay = false;
var overnightUS48CutoffLastDay = false;

var monogramCanadaCutoffLastDay = true;
var physicalGiftCardCanadaCutoffLastDay = false;
var standardCanadaCutoffLastDay = false;

var borderfreeUKCutoffLastDay = false;
var borderfreePrimaryCutoffLastDay = false;

// Are we before the cutoff? Yes = true; No = false
var monogramUS48CutoffBefore = true;
var physicalGiftCardUS48CutoffBefore = true;
var economyUS48CutoffBefore = true;
var standardUS48CutoffBefore = true;
var expeditedUS48CutoffBefore = true;
var overnightUS48CutoffBefore = true;

var monogramAlaskaHawaiiCutoffBefore = true;
var physicalGiftCardAlaskaHawaiiCutoffBefore = true;
var standardAlaskaHawaiiCutoffBefore = true;
var overnightAlaskaHawaiiCutoffBefore = true;

var monogramPOBoxCutoffBefore = true;
var physicalGiftCardPOBoxCutoffBefore = true;
var economyPOBoxCutoffBefore = true;

var monogramUSTerritoriesCutoffBefore = true;
var physicalGiftCardUSTerritoriesCutoffBefore = true;
var standardUSTerritoriesCutoffBefore = true;

var monogramAPOFPOCutoffBefore = false;
var physicalGiftCardAPOFPOCutoffBefore = false;
var standardAPOFPOCutoffBefore = true;

var monogramCanadaCutoffBefore = true;
var physicalGiftCardCanadaCutoffBefore = true;
var standardCanadaCutoffBefore = true; // same cutoff for Standard and Express

var borderfreeUKCutoffBefore = true;
var borderfreePrimaryCutoffBefore = true;
var borderfreeSecondaryCutoffBefore = true;
var borderfreeRestOfWorld1CutoffBefore = true;
var borderfreeRestOfWorld2CutoffBefore = false;

var monogramJapanMWCutoffBefore = true;
var physicalGiftCardJapanMWCutoffBefore = true;
var standardJapanMWCutoffBefore = true;

// Cutoff Before Messages
// For PDP
var monogramUS48CutoffBeforeHeadline = 'Get it {MONOGRAMMED} by 12/24';
var monogramUS48CutoffBeforeDek = 'All {MONOGRAMMED} items must be ordered by 12/13 at 9pm ET.'

var monogramUS48CutoffLastDayHeadline = 'Last chance for holiday {MONOGRAMMING}';
var monogramUS48CutoffLastDayDek = 'All {MONOGRAMMED} items must be ordered by 12/13 at 9pm ET to be delivered by 12/24.'

var monogramCanadaCutoffBeforeHeadline = 'Get it {MONOGRAMMED} by 12/24';
var monogramCanadaCutoffBeforeDek = 'All {MONOGRAMMED} items must be ordered by 12/4 at 9pm ET.'

var monogramCanadaCutoffLastDayHeadline = 'Last chance for holiday {MONOGRAMMING}';
var monogramCanadaCutoffLastDayDek = 'All {MONOGRAMMED} items must be ordered by 12/4 at 9pm ET to be delivered by 12/24.'

var monogramJapanMWCutoffBeforeHeadline = 'Get it personalized by 12/24';
var monogramJapanMWCutoffBeforeDek = 'All personalized items must be ordered by 12/4 at 9pm ET.';

// For gift card
var physicalGiftCardUS48CutoffBeforeHeadline = 'Get it there by 12/24';
var physicalGiftCardUS48CutoffBeforeDek = 'All Gift Cards must be ordered by 12/21 at 11:59pm ET.';

var physicalGiftCardUS48CutoffLastDayHeadline = 'Last chance to order holiday Gift Cards';
var physicalGiftCardUS48CutoffLastDayDek = 'All Gift Cards must be ordered by 12/21 at 11:59pm ET to be delivered by 12/24.';

var physicalGiftCardCanadaCutoffBeforeHeadline = 'Get it there by 12/24';
var physicalGiftCardCanadaCutoffBeforeDek = 'All gift cards must be ordered by 12/16 at 12pm/noon ET.';

var physicalGiftCardCanadaCutoffLastDayHeadline = 'Last chance to order holiday Gift Cards';
var physicalGiftCardCanadaCutoffLastDayDek = 'All Gift Cards must be ordered by 12/16 at 12pm/noon ET to be delivered by 12/24.';

var physicalGiftCardJapanMWCutoffBeforeHeadline = 'Get it there by 12/24';
var physicalGiftCardJapanMWCutoffBeforeDek = 'All gift cards must be ordered by 12/10 at 9pm ET.';

var physicalGiftCardDek2 = 'E-Gift Cards are available at any time.';

// For shopping bag
var economyUS48CutoffBeforeMessageShoppingBagHeadline = 'Get it there by 12/24';
var economyUS48CutoffBeforeMessageShoppingBagDek = 'Orders must be placed by 12/21 at 11:59pm ET.';

var economyUS48CutoffLastDayMessageShoppingBagHeadline = 'Last day for standard holiday shipping';
var economyUS48CutoffLastDayMessageShoppingBagDek = 'Place your order tonight by 11:59pm ET to get it there by 12/24.';

var overnightUS48CutoffBeforeMessageShoppingBagHeadline = 'Get it there by 12/24';
var overnightUS48CutoffBeforeMessageShoppingBagDek = 'Overnight shipping orders must be placed by 12/23 at 12pm/noon ET.';

var overnightUS48CutoffLastDayMessageShoppingBagHeadline = 'Last chance for overnight holiday shipping';
var overnightUS48CutoffLastDayMessageShoppingBagDek = 'Place your order by 12/23 at 12pm/noon ET to get it there by 12/24.';

var US48CutoffShoppingBagDetails = '<a href="javascript:void(0)" onclick="javascript:getPopup(\'/checkout/popup_shipping_rates.jsp#US\');return false;" class="item-link">Click here for details.</a>'

var standardCanadaCutoffBeforeMessageShoppingBagHeadline = 'Get it there by 12/24';
var standardCanadaCutoffBeforeMessageShoppingBagDek = 'Orders must be placed by 12/16 at 12pm/noon ET.';

var standardCanadaCutoffLastDayMessageShoppingBagHeadline = 'Last chance for holiday shipping';
var standardCanadaCutoffLastDayMessageShoppingBagDek = 'Place your order by 12/16 at 12pm/noon ET to get it there by 12/24.';

var canadaCutoffShoppingBagDetails = '<a href="javascript:void(0)" onclick="javascript:getPopup(\'/checkout/popup_shipping_rates.jsp#CA\');return false;" class="item-link">Click here for details.</a>';

var borderfreeUKCutoffBeforeMessageShoppingBagHeadline = 'Get it there by 12/24';
var borderfreeUKCutoffBeforeMessageShoppingBagDek = 'Orders must be placed by 12/18 at 12pm/noon ET.';

var borderfreeUKCutoffLastDayMessageShoppingBagHeadline = 'Last chance for holiday shipping';
var borderfreeUKCutoffLastDayMessageShoppingBagDek = 'Place your order by 12/18 at 12pm/noon ET to get it there by 12/24.';

var borderfreePrimaryCutoffBeforeMessageShoppingBagHeadline = 'Get it there by 12/24';
var borderfreePrimaryCutoffBeforeMessageShoppingBagDek = 'Orders must be placed by 12/16 at 12pm/noon ET.';

var borderfreePrimaryCutoffLastDayMessageShoppingBagHeadline = 'Last chance for holiday shipping';
var borderfreePrimaryCutoffLastDayMessageShoppingBagDek = 'Place your order by 12/16 at 12pm/noon ET to get it there by 12/24.';

var borderfreeSecondaryCutoffBeforeMessageShoppingBagHeadline = 'Get it there by 12/24';
var borderfreeSecondaryCutoffBeforeMessageShoppingBagDek = 'Orders must be placed by 12/12 at 11:59pm ET.';

var borderfreeRestOfWorld1CutoffBeforeMessageShoppingBagHeadline = 'Get it there by 12/24';
var borderfreeRestOfWorld1CutoffBeforeMessageShoppingBagDek = 'Orders must be placed by 12/8 at 11:59pm ET.';

var borderfreeRestOfWorld2CutoffBeforeMessageShoppingBagHeadline = 'Get it there by 12/24';
var borderfreeRestOfWorld2CutoffBeforeMessageShoppingBagDek = 'Orders must be placed by 11/28 at 11:59pm ET.';

var borderfreeCutoffShoppingBagDetails = '<a href="javascript:void(0)" onclick="javascript:getPopup(\'/checkout/popup_shipping_rates.jsp#INTL51\');return false;" class="item-link">Click here for details.</a>';

var standardJapanMWCutoffBeforeMessageShoppingBagHeadline = 'Get it there by 12/24';
var standardJapanMWCutoffBeforeMessageShoppingBagDek = 'Orders must be placed by 12/10 at 9pm ET to get it there by 12/24.';
var standardJapanMWCutoffShoppingBagDetails = '<a href="javascript:void(0)" onclick="javascript:getPopup(\'/checkout/popup_shipping_rates.jsp#JP\');return false;" class="item-link">Click here for details.</a>';

// For shipping method and order review pages
var economyUS48CutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/21 at 11:59pm ET.';
var standardUS48CutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/21 at 11:59pm ET.';
var expeditedUS48CutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/21 at 11:59pm ET.';
var overnightUS48CutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/23 at 12pm/noon ET.';
var standardAlaskaHawaiiCutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/20 at 9pm ET.';
var overnightAlaskaHawaiiCutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/23 at 12pm/noon ET.';
var economyPOBoxCutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/13 at 9pm ET.';
var standardAPOFPOCutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/10 at 9pm ET.';
var standardUSTerritoriesCutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/13 at 9pm ET.';

var standardCanadaCutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/16 at 12pm/noon ET.';

var borderfreeUKCutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/18 at 12pm/noon ET.';
var borderfreePrimaryCutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/16 at 12pm/noon ET.';
var borderfreeSecondaryCutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/12 at 11:59pm ET.';
var borderfreeRestOfWorld1CutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/8 at 11:59pm ET.';
var borderfreeRestOfWorld2CutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 11/28 at 11:59pm ET.';

var standardJapanMWCutoffBeforeMessage = 'For guaranteed delivery by 12/24, your order must be placed by 12/10 at 9pm ET.'

// Cutoff After Messages
var shippingCutoffAfterMessage = 'Unfortunately, your order will not arrive by 12/24.';
var monogramCutoffAfterMessage = 'Unfortunately, the {MONOGRAMMED} items in your order {ADDRESS} will not arrive by 12/24.';
var physicalGiftCardACutoffAfterMessage = 'Unfortunately, the gift cards in your order {ADDRESS} will not arrive by 12/24.';

var monogramCutoffAfterMessagePDPHeadline = 'Want to send a {MONOGRAMMED} gift?';
var monogramCutoffAfterMessagePDPDek = 'Unfortunately, {MONOGRAMMED} items will not arrive by 12/24.';

var physicalGiftCardCutoffAfterMessageHeadline = 'Want to send a gift card by 12/24?';
var physicalGiftCardCutoffAfterMessageDek1 = 'Our cutoff for Gift Cards has passed.';

var monetateHolidayController = (function () {

    function getCountry() {
   
        // get the country from the countryCookie cookie. no cookie = US
        var country = getCookie(countryCookie);
        if (country == null) {
            country = 'US';
        }
        return country;
    }

    function isUnitedStates() {
        return (getCountry() == 'US');
    }

    function isCanada() {
        return (getCountry() == 'CA');
    }

    function isUnitedKingdom() {
    	return (getCountry() == 'GB');
    }

    function isJapan() {
        return (getCountry() == 'JP');
    }
    
    function isBorderfreePrimaryMarket() {
    	var primaryMarkets = {
    		'AU':'',
    		'DE':'',
    		'IT':'',
    		'FR':'',
    		'GG':'',
    		'JE':'',
    		'CH':'',
    		'HK':'',
    		'JP':'',
    		'NZ':'',
    		'SG':''
    	};
    	return (primaryMarkets[getCountry()] == '');
    }
    
    function isBorderfreeSecondaryMarket() {
    	// largest list of countries; easiest to say not the other countries
    	return (!isBorderfreePrimaryMarket() && !isBorderfreeRestOfWorld1() && !isBorderfreeRestOfWorld2());
    }
    
     function isBorderfreeRestOfWorld1() {
    	var restOfWorld1 = {
    		'BZ':'',
    		'DM':'',
    		'JM':'',
    		'TC':'',
    		'BO':'',
    		'PT':'',
    		'SK':''
    	};
    	return (restOfWorld1[getCountry()] == '');
    }
    
    function isBorderfreeRestOfWorld2() {
    	var restOfWorld2 = {
    		'RU':'',
    		'CL':'',
    		'TR':'',
    		'GR':'',
    		'BG':'',
    		'CN':'',
    		'HR':'',
    		'IN':'',
    		'PY':''
    	};
    	return (restOfWorld2[getCountry()] == '');
    }
    
    function isFactory() {
    	return (site == 'factory');
    }
    
    function isMadewell() {
        return (site == 'madewell');
    }

    function hasMonogrammingOnPDP() {
        //return ($('section#monogram').length > 0);
        return ($('section#monogram0').length > 0);
    }

    function hasMonogrammingInBag(orderListing) {
        return ($(orderListing).find('.item-personalization').length > 0);
    }

    function hasPhysicalGiftCardInBag(orderListing) {
        return ($(orderListing).find('.item-gc').not('.item-egc').length > 0);
    }

    function isAPO_FPO_DPO(address) {
        var pattern = /(APO|FPO|DPO), (AA|AE|AP)/g;
        return pattern.test(address);
    }
    
    function isUSTerritory(address) {
        var pattern = /, (AS|GU|MP|PR|PW|UM|VI)/g;
        return pattern.test(address);
    }
    
    function isPOBox(address) {
        // strip all non alpha numeric characters and whitespace
        address = address.replace(/\W/g, '');
        var pattern = /(pobox|box)/gi;
        return pattern.test(address);
    }
    
    function isAlaskaHawaii(address) {
        var pattern = /, (AK|HI)/g;
        return pattern.test(address);
    }
    
    function getEconomyUS48(shipMethodContainer) {
    	return $(shipMethodContainer).find('[id^=method_UPS_ECONOMY]');
    }

    function hasEconomyUS48(shipMethodContainer) {
        return getEconomyUS48(shipMethodContainer).length;
    }
    
    function getEconomyPOBox(shipMethodContainer) {
    	return $(shipMethodContainer).find('[id^=method_USPS_DELIVERY]');
    }
    
    function hasEconomyPOBox(shipMethodContainer) {
        return getEconomyPOBox(shipMethodContainer).length;
    }
    
    function getStandardUS48(shipMethodContainer) {
       	return $(shipMethodContainer).find('[id^=method_UPS_GRND]');
    }

    function hasStandardUS48(shipMethodContainer) {
        return getStandardUS48(shipMethodContainer).length;
    }

	function getStandardAlaskaHawaii(shipMethodContainer) {
       	return $(shipMethodContainer).find('[id^=method_UPS_STANDARD]');
	}

    function hasStandardAlaskaHawaii(shipMethodContainer) {
        return getStandardAlaskaHawaii(shipMethodContainer).length;
    }
    
    function getStandardUSTerritories(shipMethodContainer) {
       	return $(shipMethodContainer).find('[id^=method_USPS_1ST]');
    }

    function hasStandardUSTerritories(shipMethodContainer) {
        return getStandardUSTerritories(shipMethodContainer).length;
    }
    
    function getExpeditedUS48(shipMethodContainer) {
       	return $(shipMethodContainer).find('[id^=method_UPS_EXP2]');
    }

    function hasExpeditedUS48(shipMethodContainer) {
        return getExpeditedUS48(shipMethodContainer).length; 
    }
    
    function getOvernight(shipMethodContainer) {
       	return $(shipMethodContainer).find('[id^=method_UPS_NEXTDAYAIR]');
    }

    function hasOvernight(shipMethodContainer) {
        return getOvernight(shipMethodContainer).length; 
    }
    
    function getUSPS(shipMethodContainer) {
       	return $(shipMethodContainer).find('[id^=method_USPS]');
    }
    
    function hasUSPS(shipMethodContainer) {
        return getUSPS(shipMethodContainer).length;
    }
    
    function getStandardDDP(shipMethodContainer) {
       	return $(shipMethodContainer).find('[id^=method_STANDARD_DDP]');
    }
        
    function hasStandardDDP(shipMethodContainer) {
    	return getStandardDDP(shipMethodContainer).length;
    }

    function getExpressDDP(shipMethodContainer) {
       	return $(shipMethodContainer).find('[id^=method_EXPRESS_DDP]');
    }
    
    function hasExpressDDP(shipMethodContainer) {
       	return getExpressDDP(shipMethodContainer).length;
    }

    function insertShippingCutoffMessageShoppingBag(cutoffMessageHeadline, cutoffMessageDek, cutoffMessageDetails) {
        var html = '';
        html += '<div id="shippingCutoffOutsideContainer" class="shippingCutoffShoppingBag">';
        html += '<div id="shippingCutoffContainer">';
        html += '<div class="shippingCutoffHeadline">' + cutoffMessageHeadline + '</div>';
        if (cutoffMessageDek != '') {
            html += '<div class="shippingCutoffDek">'
            html += cutoffMessageDek
            if (cutoffMessageDetails != '') {
                html += ' <span class="shippingCutoffDetails">' + cutoffMessageDetails + '</span>';
            }
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';
        $('#checkout').prepend(html);
    }

    function insertShippingCutoffMessageMethod(methodGroup, cutoffStarted, cutoffMessage, cssClass) {
        if (methodGroup != null && cutoffStarted) {
            if ($(methodGroup).find('.method-text').length) {
                $(methodGroup).find('.method-text').prepend('<div class="' + cssClass + '">' + cutoffMessage + '</div>');
            } else {
                $(methodGroup).find('.method-price').after('<span class="method-text ' + cssClass + '">' + cutoffMessage + '</span>');
            }
        }
    }

    function replaceMonogrammingToken(message, site) {

      if (isMadewell()) {
        message = message.replace('{MONOGRAMMING}', 'personalization');
        message = message.replace('{MONOGRAMMED}', 'personalized');
      } else {
        message = message.replace('{MONOGRAMMING}', 'monogramming');
        message = message.replace('{MONOGRAMMED}', 'monogrammed');
      }
      return message;
    }

    function insertMonogramCutoffMessagePDP(cutoffMessageHeadline, cutoffMessageDek) {

        cutoffMessageHeadline = replaceMonogrammingToken(cutoffMessageHeadline, site);
        cutoffMessageDek = replaceMonogrammingToken(cutoffMessageDek, site);

        var html = '';
        html += '<div class="clear"></div>';
        html += '<div class="monogramCutoffContainer">';

        html += '<div class="monogramCutoffHeadline">' + cutoffMessageHeadline + '</div>';
        html += '<div class="monogramCutoffDek">' + cutoffMessageDek + '</div>';

        html += '</div>';

        //$('#monogram').append(html);
        $('#monogram0').append(html);
    }

    function insertMonogramCutoffMessageMethod(cutoffBefore, isMultiShip, addressIndex, cutoffMessage) {
        // only insert messaging if we are after the cutoff
        if (cutoffBefore) {
            return;
        }
        var hasMonogramming = false;
        cutoffMessage = replaceMonogrammingToken(cutoffMessage, site);
        // Do they have monogramming items for this address?
        if (isMultiShip) {
            hasMonogramming = hasMonogrammingInBag($('.order-multilisting').eq(addressIndex));
            cutoffMessage = cutoffMessage.replace('{ADDRESS}', 'shipping to address ' + (addressIndex + 1));
        } else {
            hasMonogramming = hasMonogrammingInBag($('#order-listing'));
            cutoffMessage = cutoffMessage.replace('{ADDRESS}', '');
        }
        if (!hasMonogramming) {
            return;
        }
        // insert the cutoff message
        if ($('#errors').length == 0) {
            $('#breadCrumbs').after('<div id="errors" class="clearfix"></div>');
        }
        $('#errors').append('<div class="error-msg">' + cutoffMessage + '</div>');
    }

    function insertPhysicalGiftCardCutoffMessageGC(cutoffMessageHeadline, cutoffMessageDek1, cutoffMessageDek2) {
        var html = '';
        html += '<div id="physicalGiftCardCutoffContainer">';
        html += '<div class="physicalGiftCardCutoffHeadline">' + cutoffMessageHeadline + '</div>';
        if (cutoffMessageDek1 != '') {
            html += '<div class="physicalGiftCardCutoffDek">';
            html += cutoffMessageDek1;
            if (cutoffMessageDek2 != '') {
              html += '<br />';
              html += cutoffMessageDek2;
            }
            html += '</div>';
        }
        html += '</div>';
        $('#errorMsg').before(html);
    }

    function insertPhysicalGiftCardCutoffMessageMethod(cutoffBefore, isMultiShip, addressIndex, cutoffMessage) {
        // only insert messaging if we are after the cutoff
        if (cutoffBefore) {
            return;
        }
        var hasPhysicalGiftCard = false;
        // Do they have physical gift card items for this address?
        if (isMultiShip) {
            hasPhysicalGiftCard = hasPhysicalGiftCardInBag($('.order-multilisting').eq(addressIndex));
            cutoffMessage = cutoffMessage.replace('{ADDRESS}', 'shipping to address ' + (addressIndex + 1));
        } else {
            hasPhysicalGiftCard = hasPhysicalGiftCardInBag($('#order-listing'));
            cutoffMessage = cutoffMessage.replace('{ADDRESS}', '');
        }
        if (!hasPhysicalGiftCard) {
            return;
        }
        // insert the cutoff message
        if ($('#errors').length == 0) {
            $('#breadCrumbs').after('<div id="errors" class="clearfix"></div>');
        }
        $('#errors').append('<div class="error-msg">' + cutoffMessage + '</div>');
    }

    // variables scoped to monetateHolidayController
    var countryCookie = 'jcrew_country';

	if (isFactory()) {
		countryCookie = 'factory_country';
    } else if (isMadewell()) {
        countryCookie = 'madewell_country';
	}

    var monogramMessageInserted = false;

    return {
        init: function (pageType) {        
        
            // set the cutoff messages based on before/after cutoff
            var economyUS48CutoffMessage = economyUS48CutoffBefore ? economyUS48CutoffBeforeMessage : shippingCutoffAfterMessage;
            var standardUS48CutoffMessage = standardUS48CutoffBefore ? standardUS48CutoffBeforeMessage : shippingCutoffAfterMessage;
            var expeditedUS48CutoffMessage = expeditedUS48CutoffBefore ? expeditedUS48CutoffBeforeMessage : shippingCutoffAfterMessage;
            var overnightUS48CutoffMessage = overnightUS48CutoffBefore ? overnightUS48CutoffBeforeMessage : shippingCutoffAfterMessage;
            var standardAlaskaHawaiiCutoffMessage = standardAlaskaHawaiiCutoffBefore ? standardAlaskaHawaiiCutoffBeforeMessage : shippingCutoffAfterMessage;
            var overnightAlaskaHawaiiCutoffMessage = overnightAlaskaHawaiiCutoffBefore ? overnightAlaskaHawaiiCutoffBeforeMessage : shippingCutoffAfterMessage;
            var economyPOBoxCutoffMessage = economyPOBoxCutoffBefore ? economyPOBoxCutoffBeforeMessage : shippingCutoffAfterMessage;
            var standardAPOFPOCutoffMessage = standardAPOFPOCutoffBefore ? standardAPOFPOCutoffBeforeMessage : shippingCutoffAfterMessage;
            var standardUSTerritoriesCutoffMessage = standardUSTerritoriesCutoffBefore ? standardUSTerritoriesCutoffBeforeMessage : shippingCutoffAfterMessage;
            var standardCanadaCutoffMessage = standardCanadaCutoffBefore ? standardCanadaCutoffBeforeMessage : shippingCutoffAfterMessage;
            
            var borderfreeUKCutoffMessage = borderfreeUKCutoffBefore ? borderfreeUKCutoffBeforeMessage : shippingCutoffAfterMessage;
            var borderfreePrimaryCutoffMessage = borderfreePrimaryCutoffBefore ? borderfreePrimaryCutoffBeforeMessage : shippingCutoffAfterMessage;
            var borderfreeSecondaryCutoffMessage = borderfreeSecondaryCutoffBefore ? borderfreeSecondaryCutoffBeforeMessage : shippingCutoffAfterMessage;
            var borderfreeRestOfWorld1CutoffMessage = borderfreeRestOfWorld1CutoffBefore ? borderfreeRestOfWorld1CutoffBeforeMessage : shippingCutoffAfterMessage;
            var borderfreeRestOfWorld2CutoffMessage = borderfreeRestOfWorld2CutoffBefore ? borderfreeRestOfWorld2CutoffBeforeMessage : shippingCutoffAfterMessage;
            
            var standardJapanMWCutoffMessage = standardJapanMWCutoffBefore ? standardJapanMWCutoffBeforeMessage : shippingCutoffAfterMessage;

            // set the CSS classes based on before/after cutoff
            var economyUS48CSSClass = economyUS48CutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var standardUS48CSSClass = standardUS48CutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var expeditedUS48CSSClass = expeditedUS48CutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var overnightUS48CSSClass = overnightUS48CutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var standardAlaskaHawaiiCSSClass = standardAlaskaHawaiiCutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var overnightAlaskaHawaiiCSSClass = overnightAlaskaHawaiiCutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var economyPOBoxCSSClass = economyPOBoxCutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var standardAPOFPOCSSClass = standardAPOFPOCutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var standardUSTerritoriesCSSClass = standardUSTerritoriesCutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var standardCanadaCutoffCSSClass = standardCanadaCutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            
            var borderfreeUKCutoffCSSClass = borderfreeUKCutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var borderfreePrimaryCutoffCSSClass = borderfreePrimaryCutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var borderfreeSecondaryCutoffCSSClass = borderfreeSecondaryCutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var borderfreeRestOfWorld1CSSClass = borderfreeRestOfWorld1CutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            var borderfreeRestOfWorld2CSSClass = borderfreeRestOfWorld2CutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';
            
            var standardJapanMWCutoffCSSClass = standardJapanMWCutoffBefore ? 'shippingCutoffBefore' : 'shippingCutoffAfter';

			// if we are on madewell add a madewell class to the body if it doesn't exist
			// so that we can target with different css styles
			if (isMadewell()) {
			    if (!$('body').hasClass('madewell')) {
			      $('body').addClass('madewell');
			    }
			}

            if (pageType == 'singlePDP') {
                if (isUnitedStates()) {
                    if (hasMonogrammingOnPDP() && !monogramMessageInserted) {
                        if (economyUS48CutoffStarted && monogramUS48CutoffBefore && !monogramUS48CutoffLastDay) {
                            insertMonogramCutoffMessagePDP(monogramUS48CutoffBeforeHeadline, monogramUS48CutoffBeforeDek);
                        } else if (economyUS48CutoffStarted && monogramUS48CutoffBefore && monogramUS48CutoffLastDay) {
                            insertMonogramCutoffMessagePDP(monogramUS48CutoffLastDayHeadline, monogramUS48CutoffLastDayDek);
                        } else if (economyUS48CutoffStarted && !monogramUS48CutoffBefore) {
                            insertMonogramCutoffMessagePDP(monogramCutoffAfterMessagePDPHeadline, monogramCutoffAfterMessagePDPDek);
                        }
                        monogramMessageInserted = true;
                    }
                } else if (isCanada()) {
                    if (hasMonogrammingOnPDP() && !monogramMessageInserted) {
                        if (standardCanadaCutoffStarted && monogramCanadaCutoffBefore && !monogramCanadaCutoffLastDay) {
                            insertMonogramCutoffMessagePDP(monogramCanadaCutoffBeforeHeadline, monogramCanadaCutoffBeforeDek);
                        } else if (standardCanadaCutoffStarted && monogramCanadaCutoffBefore && monogramCanadaCutoffLastDay) {
                            insertMonogramCutoffMessagePDP(monogramCanadaCutoffLastDayHeadline, monogramCanadaCutoffLastDayDek);
                        } else if (standardCanadaCutoffStarted && !monogramCanadaCutoffBefore) {
                            insertMonogramCutoffMessagePDP(monogramCutoffAfterMessagePDPHeadline, monogramCutoffAfterMessagePDPDek);
                        }
                        monogramMessageInserted = true;                
                    }
                } else if (isJapan() && isMadewell()) {
                    if (hasMonogrammingOnPDP() && !monogramMessageInserted) {
                        if (standardJapanMWCutoffStarted && monogramJapanMWCutoffBefore) {
                            insertMonogramCutoffMessagePDP(monogramJapanMWCutoffBeforeHeadline, monogramJapanMWCutoffBeforeDek);
                        } else if (standardJapanMWCutoffStarted && ! monogramJapanMWCutoffBefore) {
                            insertMonogramCutoffMessagePDP(monogramCutoffAfterMessagePDPHeadline, monogramCutoffAfterMessagePDPDek);
                        }
                        monogramMessageInserted = true;
                    }
                }
            } else if (pageType == 'giftCard') {
                if (isUnitedStates()) {
                    if (economyUS48CutoffStarted && physicalGiftCardUS48CutoffBefore && !physicalGiftCardUS48CutoffLastDay) {
                        insertPhysicalGiftCardCutoffMessageGC(physicalGiftCardUS48CutoffBeforeHeadline, physicalGiftCardUS48CutoffBeforeDek, physicalGiftCardDek2);
                    } else if (economyUS48CutoffStarted && physicalGiftCardUS48CutoffBefore && physicalGiftCardUS48CutoffLastDay) {
                        insertPhysicalGiftCardCutoffMessageGC(physicalGiftCardUS48CutoffLastDayHeadline, physicalGiftCardUS48CutoffLastDayDek, physicalGiftCardDek2);
                    } else if (economyUS48CutoffStarted && !physicalGiftCardUS48CutoffBefore) {
                        insertPhysicalGiftCardCutoffMessageGC(physicalGiftCardCutoffAfterMessageHeadline, physicalGiftCardCutoffAfterMessageDek1, physicalGiftCardDek2);
                    }
                } else if (isCanada()) {
                    if (standardCanadaCutoffStarted && physicalGiftCardCanadaCutoffBefore && !physicalGiftCardCanadaCutoffLastDay) {
                        insertPhysicalGiftCardCutoffMessageGC(physicalGiftCardCanadaCutoffBeforeHeadline, physicalGiftCardCanadaCutoffBeforeDek, physicalGiftCardDek2);
                    } else if (standardCanadaCutoffStarted && physicalGiftCardCanadaCutoffBefore && physicalGiftCardCanadaCutoffLastDay) {
                        insertPhysicalGiftCardCutoffMessageGC(physicalGiftCardCanadaCutoffLastDayHeadline, physicalGiftCardCanadaCutoffLastDayDek, physicalGiftCardDek2);
                    } else if (standardCanadaCutoffStarted && !physicalGiftCardCanadaCutoffBefore) {
                        insertPhysicalGiftCardCutoffMessageGC(physicalGiftCardCutoffAfterMessageHeadline, physicalGiftCardCutoffAfterMessageDek1, physicalGiftCardDek2);
                    }
                } else if (isJapan() && isMadewell()) {
                    if (standardJapanMWCutoffStarted && physicalGiftCardJapanMWCutoffBefore) {
                        insertPhysicalGiftCardCutoffMessageGC(physicalGiftCardJapanMWCutoffBeforeHeadline, physicalGiftCardJapanMWCutoffBeforeDek, physicalGiftCardDek2);
                    } else if (standardJapanMWCutoffStarted && !physicalGiftCardJapanMWCutoffBefore) {
                        insertPhysicalGiftCardCutoffMessageGC(physicalGiftCardCutoffAfterMessageHeadline, physicalGiftCardCutoffAfterMessageDek1, physicalGiftCardDek2);
                    }
                }
            } else if (pageType == 'shoppingBag') {
                if (isUnitedStates()) {
                    if (economyUS48CutoffStarted && economyUS48CutoffBefore && !economyUS48CutoffLastDay) {
                        insertShippingCutoffMessageShoppingBag(economyUS48CutoffBeforeMessageShoppingBagHeadline, economyUS48CutoffBeforeMessageShoppingBagDek, US48CutoffShoppingBagDetails);
                    } else if (economyUS48CutoffStarted && economyUS48CutoffBefore && economyUS48CutoffLastDay) {
                        insertShippingCutoffMessageShoppingBag(economyUS48CutoffLastDayMessageShoppingBagHeadline, economyUS48CutoffLastDayMessageShoppingBagDek, US48CutoffShoppingBagDetails);
                    } else if (overnightUS48CutoffStarted && overnightUS48CutoffBefore && !overnightUS48CutoffLastDay && !economyUS48CutoffBefore) {
                        insertShippingCutoffMessageShoppingBag(overnightUS48CutoffBeforeMessageShoppingBagHeadline, overnightUS48CutoffBeforeMessageShoppingBagDek, US48CutoffShoppingBagDetails);
                    } else if (overnightUS48CutoffStarted && overnightUS48CutoffBefore && overnightUS48CutoffLastDay && !economyUS48CutoffBefore) {
                        insertShippingCutoffMessageShoppingBag(overnightUS48CutoffLastDayMessageShoppingBagHeadline, overnightUS48CutoffLastDayMessageShoppingBagDek, US48CutoffShoppingBagDetails);
                    } 
                } else if (isCanada()) {
                    if (standardCanadaCutoffStarted && standardCanadaCutoffBefore && !standardCanadaCutoffLastDay) {
                        insertShippingCutoffMessageShoppingBag(standardCanadaCutoffBeforeMessageShoppingBagHeadline, standardCanadaCutoffBeforeMessageShoppingBagDek, canadaCutoffShoppingBagDetails);
                    } else if (standardCanadaCutoffStarted && standardCanadaCutoffBefore && standardCanadaCutoffLastDay) {
                        insertShippingCutoffMessageShoppingBag(standardCanadaCutoffLastDayMessageShoppingBagHeadline, standardCanadaCutoffLastDayMessageShoppingBagDek, canadaCutoffShoppingBagDetails);
                    }
                } else if (isJapan() && isMadewell()) {
                    if (standardJapanMWCutoffStarted && standardJapanMWCutoffBefore) {
                        insertShippingCutoffMessageShoppingBag(standardJapanMWCutoffBeforeMessageShoppingBagHeadline, standardJapanMWCutoffBeforeMessageShoppingBagDek, standardJapanMWCutoffShoppingBagDetails);
                    } 
                } else if (isUnitedKingdom()) {
                    if (borderfreeUKCutoffStarted && borderfreeUKCutoffBefore && !borderfreeUKCutoffLastDay) {
                        insertShippingCutoffMessageShoppingBag(borderfreeUKCutoffBeforeMessageShoppingBagHeadline, borderfreeUKCutoffBeforeMessageShoppingBagDek, borderfreeCutoffShoppingBagDetails);
                    } else if (borderfreeUKCutoffStarted && borderfreeUKCutoffBefore && borderfreeUKCutoffLastDay) {
                        insertShippingCutoffMessageShoppingBag(borderfreeUKCutoffLastDayMessageShoppingBagHeadline, borderfreeUKCutoffLastDayMessageShoppingBagDek, borderfreeCutoffShoppingBagDetails);
                    }    
                } else if (isBorderfreePrimaryMarket()) {
                    if (borderfreePrimaryCutoffStarted && borderfreePrimaryCutoffBefore && !borderfreePrimaryCutoffLastDay) {
                        insertShippingCutoffMessageShoppingBag(borderfreePrimaryCutoffBeforeMessageShoppingBagHeadline, borderfreePrimaryCutoffBeforeMessageShoppingBagDek, borderfreeCutoffShoppingBagDetails);
                    } else if (borderfreePrimaryCutoffStarted && borderfreePrimaryCutoffBefore && borderfreePrimaryCutoffLastDay) {
                       insertShippingCutoffMessageShoppingBag(borderfreePrimaryCutoffLastDayMessageShoppingBagHeadline, borderfreePrimaryCutoffLastDayMessageShoppingBagDek, borderfreeCutoffShoppingBagDetails);
                    }
                } else if (isBorderfreeSecondaryMarket()) {
					if (borderfreeSecondaryCutoffStarted && borderfreeSecondaryCutoffBefore) {
                        insertShippingCutoffMessageShoppingBag(borderfreeSecondaryCutoffBeforeMessageShoppingBagHeadline, borderfreeSecondaryCutoffBeforeMessageShoppingBagDek, borderfreeCutoffShoppingBagDetails);
                    }
                } else if (isBorderfreeRestOfWorld1()) {
					if (borderfreeRestOfWorld1CutoffStarted && borderfreeRestOfWorld1CutoffBefore) {
                        insertShippingCutoffMessageShoppingBag(borderfreeRestOfWorld1CutoffBeforeMessageShoppingBagHeadline, borderfreeRestOfWorld1CutoffBeforeMessageShoppingBagDek, borderfreeCutoffShoppingBagDetails);
                    } 
                } else if (isBorderfreeRestOfWorld2()) {
					if (borderfreeRestOfWorld2CutoffStarted && borderfreeRestOfWorld2CutoffBefore) {
                        insertShippingCutoffMessageShoppingBag(borderfreeRestOfWorld2CutoffBeforeMessageShoppingBagHeadline, borderfreeRestOfWorld2CutoffBeforeMessageShoppingBagDek, borderfreeCutoffShoppingBagDetails);
                    }      
                }
            } else if (pageType == 'shippingMethod' || pageType == 'orderReview') {
                var isMultiShip = ($('#order-listing.multi').length > 0);
                var i = 0;

                if (isUnitedStates()) {
                    // loop through each shipping method container, see what shipping methods exists, and apply a message based on the cutoff rules
                    // if there are no shipping method options we can still loop through and apply the generic US48 rules
                    $('.shippingmethod-container .form-section-address').add('.shipping-method').each(function () {
                        if (hasEconomyUS48($(this))) { // US48
                            insertShippingCutoffMessageMethod(getEconomyUS48($(this)), economyUS48CutoffStarted, economyUS48CutoffMessage, economyUS48CSSClass);
                            insertShippingCutoffMessageMethod(getStandardUS48($(this)), standardUS48CutoffStarted, standardUS48CutoffMessage, standardUS48CSSClass);
                            insertShippingCutoffMessageMethod(getExpeditedUS48($(this)), expeditedUS48CutoffStarted, expeditedUS48CutoffMessage, expeditedUS48CSSClass);
                            insertShippingCutoffMessageMethod(getOvernight($(this)), overnightUS48CutoffStarted, overnightUS48CutoffMessage, overnightUS48CSSClass);
                            insertMonogramCutoffMessageMethod(monogramUS48CutoffBefore, isMultiShip, i, monogramCutoffAfterMessage);
                            insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardUS48CutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
                        } else if (hasStandardAlaskaHawaii($(this))) { // Alaska/Hawaii
                            insertShippingCutoffMessageMethod(getStandardAlaskaHawaii($(this)), standardAlaskaHawaiiCutoffStarted, standardAlaskaHawaiiCutoffMessage, standardAlaskaHawaiiCSSClass);
                            insertShippingCutoffMessageMethod(getOvernight($(this)), overnightAlaskaHawaiiCutoffStarted, overnightAlaskaHawaiiCutoffMessage, overnightAlaskaHawaiiCSSClass);
                            insertMonogramCutoffMessageMethod(monogramAlaskaHawaiiCutoffBefore, isMultiShip, i, monogramCutoffAfterMessage);
                            insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardAlaskaHawaiiCutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
                        } else if (hasEconomyPOBox($(this))) { // PO Box
                            insertShippingCutoffMessageMethod(getEconomyPOBox($(this)), economyPOBoxCutoffStarted, economyPOBoxCutoffMessage, economyPOBoxCSSClass);
                            insertMonogramCutoffMessageMethod(monogramPOBoxCutoffBefore, isMultiShip, i, monogramCutoffAfterMessage);
                            insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardPOBoxCutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
                        } else if (hasStandardUSTerritories($(this))) { // US Territories, APO/FPO/DPO
                            if (isAPO_FPO_DPO($('#shipping-details .shipping-address').eq(i).text())) { // APO/FPO/DPO
                                insertShippingCutoffMessageMethod(getStandardUSTerritories($(this)), standardAPOFPOCutoffStarted, standardAPOFPOCutoffMessage, standardAPOFPOCSSClass);
                                insertMonogramCutoffMessageMethod(monogramAPOFPOCutoffBefore, isMultiShip, i, monogramCutoffAfterMessage);
                                insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardAPOFPOCutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
                            } else { // US Territories
                                insertShippingCutoffMessageMethod(getStandardUSTerritories($(this)), standardUSTerritoriesCutoffStarted, standardUSTerritoriesCutoffMessage, standardUSTerritoriesCSSClass);
                                insertMonogramCutoffMessageMethod(monogramUSTerritoriesCutoffBefore, isMultiShip, i, monogramCutoffAfterMessage);
                                insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardUSTerritoriesCutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
                            }
                        } else if (hasUSPS($(this))) {
                            var address = $('#shipping-details .shipping-address').eq(i).text();
					        if (isAPO_FPO_DPO(address)) {
					            if (!physicalGiftCardAPOFPOCutoffBefore) {
                                    insertShippingCutoffMessageMethod(getUSPS($(this)), true, shippingCutoffAfterMessage, 'shippingCutoffAfter');
					            }
                                insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardAPOFPOCutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
					        } else if (isUSTerritory(address)) {
					            if (!physicalGiftCardUSTerritoriesCutoffBefore) {                                  
					                insertShippingCutoffMessageMethod(getUSPS($(this)), true, shippingCutoffAfterMessage, 'shippingCutoffAfter');
					            }
                                insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardUSTerritoriesCutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
					        } else if (isPOBox(address)) {
					            if (!physicalGiftCardPOBoxCutoffBefore) {
					                insertShippingCutoffMessageMethod(getUSPS($(this)), true, shippingCutoffAfterMessage, 'shippingCutoffAfter');
								}
                                insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardPOBoxCutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
					        } else if (isAlaskaHawaii(address)) {
					            if (!physicalGiftCardAlaskaHawaiiCutoffBefore) {
                                  insertShippingCutoffMessageMethod(getUSPS($(this)), true, shippingCutoffAfterMessage, 'shippingCutoffAfter');
					            }
                                insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardAlaskaHawaiiCutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
					        } else {
                                if (!physicalGiftCardUS48CutoffBefore) {
                                    insertShippingCutoffMessageMethod(getUSPS($(this)), true, shippingCutoffAfterMessage, 'shippingCutoffAfter');
                                }
                                insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardUS48CutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
					        }
                        } else { // No shipping method options
                            insertMonogramCutoffMessageMethod(monogramUS48CutoffBefore, isMultiShip, i, monogramCutoffAfterMessage);
                            insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardUS48CutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
                        }
                        i++;
                    });
                } else if (isCanada()) {
                    // loop through each shipping method container and apply a message based on the cutoff rules
                    $('.shippingmethod-container .form-section-address').add('.shipping-method').each(function () {
                        $(this).find('.form-shipmethod .method-group').each(function () {
                            insertShippingCutoffMessageMethod($(this), standardCanadaCutoffStarted, standardCanadaCutoffMessage, standardCanadaCutoffCSSClass);
                        });
                        insertMonogramCutoffMessageMethod(monogramCanadaCutoffBefore, isMultiShip, i, monogramCutoffAfterMessage);
                        insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardCanadaCutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
                        i++;
                    });
                } else if (isJapan() && isMadewell()) {
                    // loop through each shipping method container and apply a message based on the cutoff rules
                    $('.shippingmethod-container .form-section-address').add('.shipping-method').each(function () {
                        $(this).find('.form-shipmethod .method-group').each(function () {
                            insertShippingCutoffMessageMethod($(this), standardJapanMWCutoffStarted, standardJapanMWCutoffMessage, standardJapanMWCutoffCSSClass);
                        });
                        insertMonogramCutoffMessageMethod(monogramJapanMWCutoffBefore, isMultiShip, i, monogramCutoffAfterMessage);
                        insertPhysicalGiftCardCutoffMessageMethod(physicalGiftCardJapanMWCutoffBefore, isMultiShip, i, physicalGiftCardACutoffAfterMessage);
                        i++;
                    });
                } else if (isUnitedKingdom()) {
             		$('.method-group').each(function () {
            			insertShippingCutoffMessageMethod($(this), borderfreeUKCutoffStarted, borderfreeUKCutoffMessage, borderfreeUKCutoffCSSClass);
					});                 
                } else if (isBorderfreePrimaryMarket()) {
             		$('.method-group').each(function () {
            			insertShippingCutoffMessageMethod($(this), borderfreePrimaryCutoffStarted, borderfreePrimaryCutoffMessage, borderfreePrimaryCutoffCSSClass);
					});               
                } else if (isBorderfreeSecondaryMarket()) {
           			$('.method-group').each(function () {
            			insertShippingCutoffMessageMethod($(this), borderfreeSecondaryCutoffStarted, borderfreeSecondaryCutoffMessage, borderfreeSecondaryCutoffCSSClass);
					});       
                } else if (isBorderfreeRestOfWorld1()) {
           			$('.method-group').each(function () {
            			insertShippingCutoffMessageMethod($(this), borderfreeRestOfWorld1CutoffStarted, borderfreeRestOfWorld1CutoffMessage, borderfreeRestOfWorld1CSSClass);
					});                
                } else if (isBorderfreeRestOfWorld2()) {
            		$('.method-group').each(function () {
            			insertShippingCutoffMessageMethod($(this), borderfreeRestOfWorld2CutoffStarted, borderfreeRestOfWorld2CutoffMessage, borderfreeRestOfWorld2CSSClass);
					});
                }
            }
        }
    }
})();

$(function () {

    if ($('#singlePDP').length) {
        monetateHolidayController.init('singlePDP');
    } else if ($('#giftCard #classicGiftCard').length) {
        monetateHolidayController.init('giftCard');
    } else if ($('body#shoppingBag').length) {
        monetateHolidayController.init('shoppingBag');
    } else if ($('body#method').length) {
        monetateHolidayController.init('shippingMethod');
    } else if ($('body#review').length) {
        monetateHolidayController.init('orderReview');
    }
});