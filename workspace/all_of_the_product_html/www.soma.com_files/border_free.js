//--------------------------------------------------------------------------------------------------------
//this js file is used to store all functions related to international border free
//--------------------------------------------------------------------------------------------------------

	/** getParams --- get the querystring parameters from the URL */
	function getParams() {
		var params = {},
			pairs = document.URL.split('?')
				.pop()
				.split('&');
		for (var i = 0, p; i < pairs.length; i++) {
			p = pairs[i].split('=');
			params[ p[0] ] =  p[1];
		}
		return params;
	} // end function 

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
	                        return unescape(document.cookie.substring(c_start, c_end));
	                }
	        }
	        return "";
	}

  // borderfree generic error modal include
  $('<div class="modalWindow" id="borderfreeError"><table border="0" cellspacing="0" cellpadding="0"><tr class="modalControls"><td class="modalCaption">International Shipping Error</td><td align="right"><a class="modalClose"></a></td></tr><tr><td colspan="2"><div class="ModalContent"></div></td></tr></table></div>').appendTo("body");   

  // borderfree price change modal include
  $('<div class="modalWindow" id="borderfreePriceChange"><table border="0" cellspacing="0" cellpadding="0"><tr class="modalControls"><td class="modalCaption">International Shipping Error</td><td align="right"><a class="modalClose"></a></td></tr><tr><td colspan="2"><div class="ModalContent"></div></td></tr></table></div>').appendTo("body");   

  // borderfree restricted SKU error modal include
  $('<div class="modalWindow" id="borderfreeSKUError"><table border="0" cellspacing="0" cellpadding="0"><tr class="modalControls"><td class="modalCaption">International Shipping - Restricted Items</td><td align="right"><a class="modalClose"></a></td></tr><tr><td colspan="2"><div class="ModalContent"></div></td></tr></table></div>').appendTo("body");   

  // context selector modal include
  $('<div class="modalWindow" id="contextSelector"><table border="0" cellspacing="0" cellpadding="0"><tr class="modalControls"><td class="modalCaption">Context Selector</td><td align="right"><a class="modalClose"></a></td></tr><tr><td colspan="2"><div class="ModalContent"></div></td></tr></table></div>').appendTo("body");


 $(function() {
	//Border Free International Country Detect. If country is not United States the class is-intlCountry is added to body
	(String($.cookie('userCountry')) !='USA')?$('body').addClass('is-intlCountry'):$('body').removeClass('is-intlCountry');
    
	// Borderfree Generic Error Modal Initialization
    $('#borderfreeError').jqm({
    	target:$('div#borderfreeError div.ModalContent'),
    	ajax: '/web_assets/ibf/ibf-error-modal.html',
    	defaultWidth:440,
	defaultHeight:180,
    	modal: true,
        onHide: function () {
            window.location.href = "/store/checkout/cart.jsp";
        } 
    });	 

    // Borderfree Price Change Modal Initialization
    $('#borderfreePriceChange').jqm({
    	target:$('div#borderfreePriceChange div.ModalContent'),
    	ajax: '/web_assets/ibf/ibf-price-change-modal.html',
    	defaultWidth:440,
	defaultHeight:180,
    	modal: true,
        onHide: function () {
            window.location.href = "/store/checkout/cart.jsp";
        } 
    });	 

// Borderfree Restricted SKU Error Modal Initialization 
$('#borderfreeSKUError').jqm({ 
    target:$('div#borderfreeSKUError div.ModalContent'),
    ajax: '/store/common/checkout/fragments/modalRestrictedItems.jsp',
    defaultWidth:600,
    defaultHeight:240,
	overlayClass:'borderfreeSKUErrorModal',
    modal: true,
    onHide: function (h) {
        h.w.hide();if(h.o)h.o.remove();if(h.c.modalClass)h.w.removeClass(h.c.modalClass);$(h.c.target).empty();
    }
});	

    // Context Chooser Modal Initialization
    $('#contextSelector').jqm({
    	target:$('div#contextSelector div.ModalContent'),
    	trigger: 'a#contextSelectorLink',
    	ajax: '/store/context_selector.jsp',
    	defaultWidth:645,
	defaultHeight:320,
    	modal: true,
	onLoad: function(h) {
		h.w.show();
	       var country = $('#context-selector-country-select').val();
		changeSelected(country);
		},
	onHide: function(h) {
	       h.w.hide();
	       h.o.remove();
		//DTC-1561: Default Country Select to USA
        $('#shipEdit_country').find('option[value=USA]').attr('selected',true).change();
		}

    });	 

	$("select#shipEdit_country").live("click", function() {
    	          $("select#shipEdit_country").change(function() {
                       if($(this).val() == 'changeCountry') {
                           $('div.modalWindow.jqmID14.modal').hide();
                           $('div.modalWindow.jqmID15.modal').hide();
                           $('#contextSelector').jqmShow();
                       }
                  });
         });
	
	$("select#billingForm_country").live("click", function() {
    	          $("select#billingForm_country").change(function() {
                       if($(this).val() == 'changeCountry') {
                           $('#contextSelector').jqmShow();
                       }
                  });
        });	

	// If the user is coming from the "select a different country" from the borderfree welcome mat, then show the context chooser
	try {  var qs = getParams() || "NOQUERYSTRING";  } catch (err) { console.log("Possible error detected in border_free.js - NOQUERYSTRING =*USA*= ",err.message); }
	try {  var fromWelcomeMat = qs["wm"] || "NOFROMWELCOMEMAT"; } catch (err) { console.log("Possible error detected in borderfree.js - NOFROMWELCOMEMAT"); }
	try {  var reqId = qs["_requestid"] || "NOREQUESTID"; } catch (err) { console.log("Possible error detected in borderfree.js - NOREQUESTID"); }
	if((fromWelcomeMat == "T") && (reqId == "NOREQUESTID") ) {
		$('#contextSelector').jqmShow();
	}

    // PRICE CHANGE LOGIC 
	//set initial userCountry cookie (USA) if no cookie exists
	var hero = readCookie("userCountry");
    if((typeof hero == "undefined") || (hero == null)) {
	    document.cookie="userCountry=USA";
	}
	//checkout process - check countryChanged cookie
	var ibfPageURL = document.URL || "NOURL";
	var ibfIsCheckoutPage = ibfPageURL.indexOf("checkout");
	if(ibfIsCheckoutPage > 1) {
		var Reagan40 = readCookie("countryChanged");
		if((typeof Reagan40 != "undefined") && (Reagan40 != null) && (Reagan40 == "true")) {
		  document.cookie="countryChanged=false";
		  $('#borderfreePriceChange').jqmShow();          		  
		}
	} else {
	//not checkout process - check number of items in cart and countryChanged cookie	
		$(window).bind("cartDataReady", function() {
			var itemsInCart = window.cartData.bagCount;	
			//get countryChanged cookie
			var Reagan40 = readCookie("countryChanged");
			// the big reveal
			if((typeof Reagan40 != "undefined") && (Reagan40 != null) && (Reagan40 == "true") && (typeof itemsInCart != "undefined") && (itemsInCart != null) && (itemsInCart > 0)) {
				document.cookie="countryChanged=false";
				$('#borderfreePriceChange').jqmShow();
			} else {
				document.cookie="countryChanged=false";		      
			} 		  
		});
	} 
	// END PRICE CHANGE LOGIC  
    
  });

var RestrictedItems = {};

RestrictedItems.init = function() {
    this.restrictedItemsContextChooser = $('<div class="modalWindow" id="restrictedItemsContextChoose"><table border="0" cellspacing="0" cellpadding="0"><tr class="modalControls"><td class="modalCaption">Context Selector</td><td align="right"><a class="modalClose"></a></td></tr><tr><td colspan="2"><div class="ModalContent"></div></td></tr></table></div>');
    this.restrictedItemsContextChooser.appendTo('body');
    this.restrictedItemsContextChooser.jqm({
        target:$('div#restrictedItemsContextChoose div.ModalContent'),
        ajax: '/store/context_selector.jsp',
        defaultWidth:645,
        defaultHeight:320,
        modal: true,
        onHide: function(h){
            RestrictedItems.show();
            h.w.hide();if(h.o)h.o.remove();if(h.c.modalClass)h.w.removeClass(h.c.modalClass);$(h.c.target).empty();
        }
    });
    this.show();
    this.bind();
};

RestrictedItems.show = function() {
    RestrictedItems.restrictedItemsContextChooser.hide();
    $('#borderfreeSKUError').show();
    $('#borderfreeSKUError').jqmShow();
    $('#borderfreeSKUError div.ModalContent').css('width', 'auto');
    $('#borderfreeSKUError div.ModalContent').css('height', 'auto');
};

RestrictedItems.hide = function() {
    $('#borderfreeSKUError').hide();
};

RestrictedItems.launchContextChooser = function() {
    RestrictedItems.restrictedItemsContextChooser.show();
    RestrictedItems.restrictedItemsContextChooser.jqmShow();
    RestrictedItems.hide();
    return false;
};


RestrictedItems.bind = function() {
    $('#restricted-item-open-welcome-mat').live('click', this.launchContextChooser);
};
  $(window).bind('ctoReady', function() {

   if((typeof window.cartData.restrictedSkus != "undefined") && (window.cartData.restrictedSkus.length > 0)) {
        RestrictedItems.init();
}

	    var BFErrorFlag = $('body').attr('BFError');

	    if (BFErrorFlag == "is-BF-Error") {

                $('#borderfreeError').jqmShow();   // looks like an error has occurred
                 
                console.log("*********************************************************************************************************************");               
                console.log("************* THE    FasGetQuoteDroplet   IN   checkout2.jsp   IS REPORTING AN ERROR. ******************");
                console.log("*********************************************************************************************************************");
	    }	    
  });
  
  function changeSelected(country) {
	  console.log("The country is " + country + ". Finding currency now ... ");
          var theSelectedCountry = country; 
          // create currency code variable
          var sCurrCode = '';
          
	  // get country currency code
	  switch(country) {
	  	case "USA": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "USA-MIL": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "ATG": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "ABW": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "AUS": 
	  		sCurrCode = "AUD"; 
	  		break;
	  	case "AUT": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "BHR": 
	  		sCurrCode = "BHD"; 
	  		break;
	  	case "BGD": 
	  		sCurrCode = "BDT"; 
	  		break;
	  	case "BRB": 
	  		sCurrCode = "BBD"; 
	  		break;
	  	case "BEL": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "BLZ": 
	  		sCurrCode = "BZD"; 
	  		break;
	  	case "BMU": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "BOL": 
	  		sCurrCode = "BOB"; 
	  		break;
	  	case "BRA": 
	  		sCurrCode = "BRL"; 
	  		break;
	  	case "BRN": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "BGR": 
	  		sCurrCode = "BGN"; 
	  		break;
	  	case "KHM": 
	  		sCurrCode = "KHR"; 
	  		break;
	  	case "CAN": 
	  		sCurrCode = "CAD"; 
	  		break;
	  	case "CYM": 
	  		sCurrCode = "KYD"; 
	  		break;
	  	case "CHL": 
	  		sCurrCode = "CLP"; 
	  		break;
	  	case "CHN": 
	  		sCurrCode = "CNY"; 
	  		break;
	  	case "COL": 
	  		sCurrCode = "COP"; 
	  		break;
	  	case "CRI": 
	  		sCurrCode = "CRC"; 
	  		break;
	  	case "CYP": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "CZE": 
	  		sCurrCode = "CZK"; 
	  		break;
	  	case "DNK": 
	  		sCurrCode = "DKK"; 
	  		break;
	  	case "DMA": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "DOM": 
	  		sCurrCode = "DOP"; 
	  		break;
	  	case "ECU": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "EGY": 
	  		sCurrCode = "EGP"; 
	  		break;
	  	case "SLV": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "EST": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "FIN": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "FRA": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "GUF": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "DEU": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "GIB": 
	  		sCurrCode = "GBP"; 
	  		break;
	  	case "GRC": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "GRD": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "GLP": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "GTM": 
	  		sCurrCode = "GTQ"; 
	  		break;
	  	case "GGY": 
	  		sCurrCode = "GBP"; 
	  		break;
	  	case "HND": 
	  		sCurrCode = "HNL"; 
	  		break;
	  	case "HKG": 
	  		sCurrCode = "HKD"; 
	  		break;
	  	case "HUN": 
	  		sCurrCode = "HUF"; 
	  		break;
	  	case "ISL": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "IND": 
	  		sCurrCode = "INR"; 
	  		break;
	  	case "IDN": 
	  		sCurrCode = "IDR"; 
	  		break;
	  	case "IRL": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "ISR": 
	  		sCurrCode = "ILS"; 
	  		break;
	  	case "ITA": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "JAM": 
	  		sCurrCode = "JMD"; 
	  		break;
	  	case "JPN": 
	  		sCurrCode = "JPY"; 
	  		break;
	  	case "JEY": 
	  		sCurrCode = "GBP"; 
	  		break;
	  	case "JOR": 
	  		sCurrCode = "JOD"; 
	  		break;
	  	case "KWT": 
	  		sCurrCode = "KWD"; 
	  		break;
	  	case "LVA": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "LIE": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "LTU": 
	  		sCurrCode = "LTL"; 
	  		break;
	  	case "LUX": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "MAC": 
	  		sCurrCode = "HKD"; 
	  		break;
	  	case "MDV": 
	  		sCurrCode = "MVR"; 
	  		break;
	  	case "MLT": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "MTQ": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "MEX": 
	  		sCurrCode = "MXN"; 
	  		break;
	  	case "MCO": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "MSR": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "NLD": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "NZL": 
	  		sCurrCode = "NZD"; 
	  		break;
	  	case "NIC": 
	  		sCurrCode = "NIO"; 
	  		break;
	  	case "NOR": 
	  		sCurrCode = "NOK"; 
	  		break;
	  	case "OMN": 
	  		sCurrCode = "OMR"; 
	  		break;
	  	case "PAK": 
	  		sCurrCode = "PKR"; 
	  		break;
	  	case "PAN": 
	  		sCurrCode = "PAB"; 
	  		break;
	  	case "PRY": 
	  		sCurrCode = "PYG"; 
	  		break;
	  	case "PER": 
	  		sCurrCode = "PEN"; 
	  		break;
	  	case "PHL": 
	  		sCurrCode = "PHP"; 
	  		break;
	  	case "POL": 
	  		sCurrCode = "PLN"; 
	  		break;
	  	case "PRT": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "QAT": 
	  		sCurrCode = "QAR"; 
	  		break;
	  	case "REU": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "ROU": 
	  		sCurrCode = "RON"; 
	  		break;
	  	case "RUS": 
	  		sCurrCode = "RUB"; 
	  		break;
	  	case "KNA": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "LCA": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "SAU": 
	  		sCurrCode = "SAR"; 
	  		break;
	  	case "SGP": 
	  		sCurrCode = "SGD"; 
	  		break;
	  	case "SVK": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "SVN": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "ZAF": 
	  		sCurrCode = "ZAR"; 
	  		break;
	  	case "KOR": 
	  		sCurrCode = "KRW"; 
	  		break;
	  	case "ESP": 
	  		sCurrCode = "EUR"; 
	  		break;
	  	case "LKA": 
	  		sCurrCode = "LKR"; 
	  		break;
	  	case "SWE": 
	  		sCurrCode = "SEK"; 
	  		break;
	  	case "CHE": 
	  		sCurrCode = "CHF"; 
	  		break;
	  	case "TWN": 
	  		sCurrCode = "TWD"; 
	  		break;
	  	case "THA": 
	  		sCurrCode = "THB"; 
	  		break;
	  	case "TTO": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "TUR": 
	  		sCurrCode = "TRY"; 
	  		break;
	  	case "TCA": 
	  		sCurrCode = "USD"; 
	  		break;
	  	case "ARE": 
	  		sCurrCode = "AED"; 
	  		break;
	  	case "GBR": 
	  		sCurrCode = "GBP"; 
	  		break;
	  	default:  
	  		sCurrCode = "USD";
	  } 	  

          //console.log("The currency code is: " + sCurrCode);

          // Determine the currently selected option
          var currencySelect = document.getElementById("context-selector-currency-select");
          var theSelectedCurrencyOptionValue = currencySelect.options[currencySelect.selectedIndex].value;
          //console.log("The currently selected currency option value is: " + theSelectedCurrencyOptionValue);

	  // change currency selected 
          if(country == "USA"){ 
              for (var i=0; i<currencySelect.length; i++) {
                    var op = currencySelect.getElementsByTagName("option");
                   if(op[i].value == "USD") {
                       currencySelect.selectedIndex = i;
                   } else {
                       op[i].disabled = true;
                   }
              }
          } else if(country == "USA-MIL"){ 
              for (var i=0; i<currencySelect.length; i++) {
                    var op = currencySelect.getElementsByTagName("option");
                   if(op[i].value == "USD") {
                       currencySelect.selectedIndex = i;
                   } else {
                       op[i].disabled = true;
                   }
              }
          }else if(country == "UMI"){ 
              for (var i=0; i<currencySelect.length; i++) {
                    var op = currencySelect.getElementsByTagName("option");
                   if(op[i].value == "USD") {
                       currencySelect.selectedIndex = i;
                   } else {
                       op[i].disabled = true;
                   }
              }
          } else {
              for (var i=0; i<currencySelect.length; i++) {
                  currencySelect.options[i].disabled = false;
                  var cycledCurrencyValue = currencySelect.options[i].value;
                  
                  //match, set currency select
                  if(cycledCurrencyValue === sCurrCode) {
                      currencySelect.selectedIndex = i;    
                  }
              } 
          }

	//PRICE CHANGE BIND TO CONTEXT SELECTOR SUBMIT BUTTON
	$( ".context-selector-call-to-action input" ).each(function() { 
		if($(this).val() == "SAVE & CONTINUE") {
		  $(this).bind("click", function() {
			  document.cookie="countryChanged=true";
			  console.log("The bind to the context selector submit button should be to " + country + " .");
			  document.cookie="userCountry="+country;
		  });
		}
	});
	//END PRICE CHANGE BIND TO CONTEXT SELECTOR SUBMIT BUTTON	
  }

    