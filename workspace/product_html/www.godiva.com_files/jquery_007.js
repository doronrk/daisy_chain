/*
* jQuery creditcard2 extension for the jQuery Validation plugin (http://plugins.jquery.com/project/validate).
* Ported from http://www.braemoor.co.uk/software/creditcard.shtml by John Gardner, with some enhancements.
*
* Author: Jack Killpatrick
* Copyright (c) 2010 iHwy, Inc.
*
* Version 1.0.1 (1/12/2010)
* Tested with jquery 1.2.6, but will probably work with earlier versions.
*
* History:
* 1.0.0 - released 2008-11-17
* 1.0.1 - released 2010-01-12 -> updated card prefixes based on data at: http://en.wikipedia.org/wiki/Credit_card_number and added support for LaserCard
*
* Visit http://www.ihwy.com/labs/jquery-validate-credit-card-extension.aspx for usage information
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

jQuery.validator.addMethod("creditcard2", function(value, element, param) {
	
	var cardName = param ,enableCard = false;
	var cards = new Array();
	cards[0] = { cardName: "Visa", lengths: "13,16", prefixes: "4", checkdigit: true ,cardexp:"4[0-9]{12}(?:[0-9]{3})"};
	cards[1] = { cardName: "MasterCard", lengths: "16", prefixes: "51,52,53,54,55", checkdigit: true ,cardexp:"5[1-5][0-9]{5,}"};
	cards[1] = { cardName: "Master", lengths: "16", prefixes: "51,52,53,54,55", checkdigit: true }; // Added for Godiva
	cards[2] = { cardName: "DinersClub", lengths: "14,16", prefixes: "305,36,38,54,55", checkdigit: true ,cardexp:"3(?:0[0-5]|[68][0-9])[0-9]{4,}"};
	cards[3] = { cardName: "CarteBlanche", lengths: "14", prefixes: "300,301,302,303,304,305", checkdigit: true };
	cards[4] = { cardName: "Amex", lengths: "15", prefixes: "34,37", checkdigit: true ,cardexp: "3[47][0-9]{5,}"};
	cards[5] = { cardName: "Discover", lengths: "16", prefixes: "6011,622,64,65", checkdigit: true ,cardexp:"6(?:011|5[0-9]{2})[0-9]{3,}"};
	cards[6] = { cardName: "JCB", lengths: "16", prefixes: "35", checkdigit: true ,cardexp:"(?:2131|1800|35[0-9]{3})[0-9]{3,}"};
	cards[7] = { cardName: "enRoute", lengths: "15", prefixes: "2014,2149", checkdigit: true };
	cards[8] = { cardName: "Solo", lengths: "16,18,19", prefixes: "6334, 6767", checkdigit: true };
	cards[9] = { cardName: "Switch", lengths: "16,18,19", prefixes: "4903,4905,4911,4936,564182,633110,6333,6759", checkdigit: true };
	cards[10] = { cardName: "Maestro", lengths: "12,13,14,15,16,18,19", prefixes: "5018,5020,5038,6304,6759,6761", checkdigit: true };
	cards[11] = { cardName: "VisaElectron", lengths: "16", prefixes: "417500,4917,4913,4508,4844", checkdigit: true };
	cards[12] = { cardName: "LaserCard", lengths: "16,17,18,19", prefixes: "6304,6706,6771,6709", checkdigit: true };
	
	var re = {
	        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
	        mastercard: /^5[1-5][0-9]{14}$/,
	        amex: /^3[47][0-9]{13}$/,
	        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
	        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
	        jcb: /^(?:2131|1800|35\d{3})\d{11}$/
	    };
	enableCard = false;
	
	var cardNm;

	var cardNo = value;
	if (re.visa.test(cardNo)) {
		cardNm = "Visa";
		cardName = "Visa";
		enableCard = true;
	} else if (re.mastercard.test(cardNo)) {
		cardNm = "Master";
		cardName = "Master";
		enableCard = true;
	} else if (re.amex.test(cardNo)) {
		cardNm = "Amex";
		cardName = "Amex";
		enableCard = true;
	} else if (re.diners.test(cardNo)) {
		cardNm = "DinersClub";
		cardName = "DinersClub";
	} else if (re.discover.test(cardNo)) {
		cardNm = "Discover";
		cardName = "Discover";
		enableCard = true;
	} else if (re.jcb.test(cardNo)) {
		cardNm = "JCB";
		cardName = "JCB";
	}
	if(cardNm != null && cardNm != '') {
		$('#dwfrm_billing_paymentMethods_creditCard_selectedCardType').val(cardNm);
	}
	
	var setCardTypeUrl = app.urls.setCardTypeUrl;

	$(".cardTypes span").removeClass('removeOpacity');
	var cardType = -1;
	for (var i = 0; i < cards.length; i++) {
		if (cardName.toLowerCase() == cards[i].cardName.toLowerCase()) {
			cardType = i;
			break;
		}
	}
	if (cardType == -1) { return false; } // card type not found

	value = value.replace(/[\s-]/g, ""); // remove spaces and dashes
	$(".cardWrapper input").on('blur',function(){
		var cardValue = $(this).val().replace(/[\s-]/g, "");
		if(!cardValue)
			$(".cardTypes span").removeClass('removeOpacity');	
	});
	
	if (value.length <12) { return false; } // no length

	
	var maskedRegex = /^(\**)([0-9]{3,5})$/;
	if (maskedRegex.exec(cardNo)) { return true; } // allow masked numbers 
	
	
	var cardexp = /^[0-9]{13,19}$/;
	if (!cardexp.exec(cardNo)) { return false; } // has chars or wrong length
	

	cardNo = cardNo.replace(/\D/g, ""); // strip down to digits
	
	
	if (cards[cardType].checkdigit) {
		var checksum = 0;
		var mychar = "";
		var j = 1;

		var calc;
		for (i = cardNo.length - 1; i >= 0; i--) {
			calc = Number(cardNo.charAt(i)) * j;
			if (calc > 9) {
				checksum = checksum + 1;
				calc = calc - 10;
			}
			checksum = checksum + calc;
			if (j == 1) { j = 2 } else { j = 1 };
		}

		if (checksum % 10 != 0) { return false; } // not mod10
	}
	
	//To validate the card and identify the card type on billing page
	

		
	
	if(enableCard)
		$("." +cardNm).addClass('removeOpacity');
		
	
	//var cardType = -1;
	for (var i = 0; i < cards.length; i++) {
		if(cards[i].cardName==cardNm)
			{
			return true;
			//var cardType=i;
			}
	}
	
	//To validate the card and identify the card type on billing page
	
	

	var lengthValid = false;
	var prefixValid = false;
	var prefix = new Array();
	var lengths = new Array();

	prefix = cards[cardType].prefixes.split(",");
	for (i = 0; i < prefix.length; i++) {
		var exp = new RegExp("^" + prefix[i]);
		if (exp.test(cardNo)) prefixValid = true;
	}
	if (!prefixValid) { return false; } // invalid prefix

	lengths = cards[cardType].lengths.split(",");
	for (j = 0; j < lengths.length; j++) {
		if (cardNo.length == lengths[j]) lengthValid = true;
	}
	if (!lengthValid) { return false; } // wrong length

	return true;
}, jQuery.validator.messages.creditcard);