// VDED10188 at 01/12/2014 11:26:29

var veTagData = (function () {
    var _journeycode = 'F8180E84-A2CB-4AE8-B7C0-BDC614490979';
    var _captureConfigUrl = 'cdsusa.veinteractive.com/CaptureConfigService.asmx/CaptureConfig';
    var _chatServicesUrl = 'cdsusa.veinteractive.com/ConversationService.asmx/';
    var _veHostDomain = "//configusa.veinteractive.com";

    var tag = document.getElementById('veConnect');
    if (!tag) {
        var ve = document.createElement('script');
        ve.id = 'veConnect';
        ve.type = 'text/javascript';
        ve.async = true;
        ve.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'configusa.veinteractive.com/scripts/2.2/capture-apps-2.2.1.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ve, s);
    }

    return {

        journeycode: _journeycode,
        captureConfigUrl: _captureConfigUrl,
        chatServicesUrl: _chatServicesUrl,
        veHostDomain: _veHostDomain,
        captureConfig: {
  CaptureUrl: "cdsusa.veinteractive.com/CaptureConfigService.asmx/CaptureConfig",
  customerid: 1002405,
  datareceiverurl: "cdsusa.veinteractive.com/DataReceiverService.asmx/DataReceiver",
  Forms: [
    {
      ChatAgentId: 579,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".login:eq(0)",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31243,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true
        },
        {
          ClientFieldName: ".js-nav-qty",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 32215,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "vePromoCode",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 33863,
          HtmlAttributeTag: "Value",
          HtmlType: ":hidden",
          IdentifyAbandonment: false,
          isEmail: false
        }
      ],
      FormId: 15703,
      FormTypeId: 1,
      FormURLs: [
        "francescas.com/checkout/login.do",
        "francescas.com/account/login.do"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: 579,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: "#loginEmail",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31244,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true
        },
        {
          ClientFieldName: ".firstname",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31247,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".lastname",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31248,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "#email input",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31250,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true
        },
        {
          ClientFieldName: "input#sourceCode",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31251,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".registerLogin .default b",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 31259,
          HtmlAttributeTag: "Value",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "input#customerEmail.login",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31260,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true
        },
        {
          ClientFieldName: "span.amount:first",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 31273,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".js-nav-qty",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 32213,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "vePromoCode",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 33862,
          HtmlAttributeTag: "Value",
          HtmlType: ":hidden",
          IdentifyAbandonment: false,
          isEmail: false
        }
      ],
      FormId: 15704,
      FormTypeId: 1,
      FormURLs: [
        "francescas.com/checkout/accordioncheckout_v2.do"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: 579,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".js-nav-qty",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 31252,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".js-nav-total",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 32326,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "vePromoCode",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 33855,
          HtmlAttributeTag: "Value",
          HtmlType: ":hidden",
          IdentifyAbandonment: false,
          isEmail: false
        }
      ],
      FormId: 15707,
      FormTypeId: 1,
      FormURLs: [
        "francescas.com/product/*.do",
        "francescas.com/category/*/*.do",
        "francescas.com/category/*.do",
        "francescas.com/addToBasket.do",
        "francescas.com/store-locator/*.do",
        "francescas.com/account/gateway.do",
        "francescas.com/search.do",
        "francescas.com/ancillary/*.do",
        "francescas.com/account/addressbook.do",
        "francescas.com/wishlist/*.do",
        "francescas.com/account/orderhistory.do",
        "francescas.com/account/accountinfo.do"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: 579,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".product-thumbnail img:even",
          DomEvent: "OnLoad",
          FieldTypeName: "RawSeries",
          FormMappingId: 31253,
          HtmlAttributeTag: "src",
          HtmlType: "img",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".product-name a:even",
          DomEvent: "OnLoad",
          FieldTypeName: "RawSeries",
          FormMappingId: 31255,
          HtmlAttributeTag: "Value",
          HtmlType: "a",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".choices select.cart-high-qty option:selected",
          DomEvent: "DynamicActivity",
          FieldTypeName: "RawSeries",
          FormMappingId: 31256,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "ul.product-info li.big-price",
          DomEvent: "OnLoad",
          FieldTypeName: "RawSeries",
          FormMappingId: 31257,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "sourceCode",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 31258,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "subtotal-large-price",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Class",
          FormMappingId: 32184,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "vePromoCode",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 33860,
          HtmlAttributeTag: "Value",
          HtmlType: ":hidden",
          IdentifyAbandonment: false,
          isEmail: false
        }
      ],
      FormId: 15708,
      FormTypeId: 1,
      FormURLs: [
        "francescas.com/basket.do"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".default b:first",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 31264,
          HtmlAttributeTag: "Value",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".default b:last",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 31265,
          HtmlAttributeTag: "Value",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: true
        }
      ],
      FormId: 15711,
      FormTypeId: 2,
      FormURLs: [
        "francescas.com/checkout/accordionaccountsetup_v2.do"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: 579,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".firstname",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31271,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".lastname",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31272,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".js-nav-qty",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 32214,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "vePromoCode",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 33859,
          HtmlAttributeTag: "Value",
          HtmlType: ":hidden",
          IdentifyAbandonment: false,
          isEmail: false
        }
      ],
      FormId: 15713,
      FormTypeId: 1,
      FormURLs: [
        "francescas.com/account/registeraddress.do"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".default b:first",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 31274,
          HtmlAttributeTag: "Value",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false
        }
      ],
      FormId: 15714,
      FormTypeId: 2,
      FormURLs: [
        "francescas.com/checkout/accordionthankyou.do"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: 579,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: "#customerEmail\t",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31275,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true
        },
        {
          ClientFieldName: "input.firstname\t",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31276,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "input.lastname",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 31277,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".js-nav-qty",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 32216,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "vePromoCode",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 33857,
          HtmlAttributeTag: "Value",
          HtmlType: ":hidden",
          IdentifyAbandonment: false,
          isEmail: false
        }
      ],
      FormId: 15716,
      FormTypeId: 1,
      FormURLs: [
        "francescas.com/account/registerusername.do"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    }
  ],
  IdentifyAbandonmentOr: true,
  JourneyCode: "F8180E84-A2CB-4AE8-B7C0-BDC614490979",
  JourneyId: 3642,
  JourneyTimeOut: 1800,
  NumberIdentifiedFields: 0,
  OptOutField: 0
},

        /*
            The custom settings are based on the standard defined on Settings.js.
        */
        settings: { domainsToIgnore: ['francescas.com' ], unsupportedBrowsersVersionPlatform: { 'ie' : ['6','7','8'] }, consoleMessagesEnabled: true,
 elementsToIgnore : ['#btnSubmitOrder'],
 inputSearchAutocomplete : [ ]
}
,

        /*
            Custom events that allow custom behavior per journey. The standard is defined on CustomEvents.js.
        */
        customEvents: {
	onFormIdentified: function(formId) {
			function getFormByFormId(formId) {
				var i = 0,
					formArray = veTagData.captureConfig.Forms;
	
				if (formId > 0) {
					for (i; i < formArray.length; i++) {
						if (formArray[i].FormId === formId) {
							return formArray[i];
						}
					}
				}
				return false;
			}
			if(document.referrer.length === 0){
					getFormByFormId(formId).ChatAgentId = null
			}
			if(formId){
				if(!document.getElementById('vePromoCode')){
					var vePromoCode = document.createElement('input');
					vePromoCode.id = "vePromoCode";
					vePromoCode.style.display = 'none';
					document.body.appendChild(vePromoCode);
    			}
			}
    return formId;
	},
	conversionTracking: function() {
		if(document.getElementById('vePromoCode')){
			document.getElementById('vePromoCode').value = 'vePromo000001'; // add promo to hidden field
			VeAPI.Chat.convertClick('ChatLinkCTA');
		}
	}	
}

    };

})();