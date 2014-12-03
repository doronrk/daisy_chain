/*jslint browser: true, unparam: true, indent: 2 */
/*global $: false, dojo: false, FB: false, popup: false, button: false, setEqualHeight: false, endsWith: false, initLeftNavigation: false */

/*********************************************************************************************************************/
/* Popups                                                                                                            */
/*********************************************************************************************************************/

dojo.addOnLoad(function () {
  "use strict";
  popup.loadPopups([
    { id: 'BOUNCEBACK',          title: 'Offer Details'                                                    },
    { id: 'B2BGIFT',             title: 'Offer Details'                                                    },
    { id: 'CHEER2014',           title: 'Offer Details'                                                    },
    { id: 'CUTOFFS',             title: 'Holiday Shipping Cut-Off Dates'                                   },
    { id: 'DOTOMIFSS',           title: 'Offer Details'                                                    },
    { id: 'DOTOMIFSS49',         title: 'Offer Details'                                                    },
    { id: 'DOTOMITIERED',        title: 'Offer Details'                                                    },
    { id: 'DuoGift',             title: 'Chocolate Duo Gift'                                               },
    { id: 'EIGHTYYEARS',       	 title: 'Offer Details: 80YEARS'					                       },
    { id: 'CYOFRUIT',            title: 'Discounts'                                                        },
    { id: 'ENOUNCE',             title: 'Gift E-Nouncement&reg; Service'                                   },
    { id: 'evite',               title: 'Offer Details'                                                    },
    { id: 'festive-wine-covers', title: 'Festive Wine Covers', name: 'FestiveWineCovers'                   },
    { id: 'FOMCFRUITS',          title: 'Fruit of the Month Club&reg;'                                     },
    { id: 'FOMCFRUITS',          title: 'Fruit of the Month Club&reg;'                                     },
    { id: 'FLAT2',               title: 'Offer Details for Coupon Code: FLAT'                              },
    { id: 'FLATRATE',            title: 'Shipping Details'												   },
    { id: 'FlatRateShipping',    title: 'Shipping Details'												   },
    { id: 'FLORALOVERNIGHT',     title: 'Overnight Shipping Details'                                       },
    { id: 'FOREIGN',             title: 'Foreign Countries We Ship To'                                     },
    { id: 'FOODWINE',            title: 'Terms &amp; Conditions'                                           },
    { id: 'FREESHIPSELECT',      title: 'Free Shipping - Details'                                          },
    { id: 'FSSNOMIN',            title: 'Terms &amp; Conditions'                                           },
    { id: 'GC-Terms',            title: 'Gift Card Terms &amp; Conditions', name: 'GC_Terms'               },
    { id: 'GUAR',                title: 'Our Guarantee'                                                    },
    { id: 'HOLIDAY1',            title: 'Offer Details'                                 },
    { id: 'HOLIDAY2',            title: 'Offer Details'                                 },
    { id: 'HOLIDAY3',            title: 'Offer Details'                                 },
    { id: 'HOLIDAY4',            title: 'Offer Details'                                 },
    { id: 'HOLIDAY5',            title: 'Offer Details'                                 },
    { id: 'HOLIDAY6',            title: 'Offer Details'                                 },
    { id: 'HOLIDAYCPN',          title: 'Offer Details for Coupon: holiday'                                },
    { id: 'HOLIDAYTIER',         title: 'Terms &amp; Conditions'                                           },
    { id: 'HOLLY2014',           title: 'Offer Details'                                                    },
    { id: 'HOME2014',           title: 'Offer Details'                                                    },
    { id: 'MERRY2014',           title: 'Offer Details'                                                    },
    { id: 'merrycpn',            title: 'Offer Details for Coupon: merry'                                  },
    { id: 'MOMSBOUNCEBACK',      title: 'Offer Details'                                                    },
    { id: 'PERFECT',             title: 'Offer Details for Coupon: perfect'                                },
    { id: 'SAVE15',              title: 'Save 15 Terms &amp; Conditions'                                   },
    { id: 'SHIPTO',              title: 'Countries we ship to:'                                            },
    { id: 'SPOOKY',            	 title: 'Offer Details for Coupon: spooky'                                 },
    { id: 'SPOOKY2',             title: 'Offer Details for Coupon: spooky'                                 },
    { id: 'STGIVEAWAY',          title: 'Harry &amp; David Skinnytaste Cookbook Giveaway'				   },
    { id: 'THANKS1',             title: 'Coupon Code: THANKS'                                              },
    { id: 'TENHD',               title: 'Coupon Code: 10HD'                                                },
    { id: 'TWENTYCLUB',          title: 'Terms &amp; Conditions'				                           },
    { id: 'TWENTYHD',            title: 'Offer Details'				                        			   },
    { id: 'TWENTYHD1',           title: 'Offer Details'				                           			   },
    { id: 'WINESHIP',            title: 'Wine Shipping Details'                                            },
    { id: 'DISCOUNT18F',         title: 'Offer Details'                                                    },
    { id: 'b2b',       type: 'functional' },
    { id: 'ALOVELYLILY', type: 'coupon' },
    { id: 'BDAY',      type: 'coupon' },
    { id: 'BDAYGIFTS', type: 'coupon' },
    { id: 'CAKES',     type: 'coupon' },
    { id: 'CITRUSSHIPPING', type: 'coupon' },
    { id: 'CLUBS20',   type: 'coupon' },
    { id: 'CUPID',     type: 'coupon' },
    { id: 'CODE20',    type: 'coupon' },
    { id: 'CORP',      type: 'coupon' },
    { id: 'DAD11',     type: 'coupon' },
    { id: 'EASTER9',   type: 'coupon' },
    { id: 'EASTER10',  type: 'coupon' },
    { id: 'EGGHUNT',   type: 'coupon' },
    { id: 'FATHER',    type: 'coupon' },
    { id: 'FALL15',    type: 'coupon' },
    { id: 'FALL2014',  type: 'coupon' },
    { id: 'FALL49',    type: 'coupon' },
    { id: 'FALL4FREE', type: 'coupon' },
    { id: 'FF13',      type: 'coupon' },
    { id: 'FFR',       type: 'coupon' },
    { id: 'FLAT',	   type: 'coupon' },
    { id: 'FLOWERS',   type: 'coupon' },
    { id: 'FREEDELIVERY', type: 'coupon' },
    { id: 'FREEFSD',   type: 'coupon' },
    { id: 'FREESHIP27',type: 'coupon' },
    { id: 'FRIEND',    type: 'coupon' },
    { id: 'FRIENDS',   type: 'coupon' },
    { id: 'GIFT',      type: 'coupon' },
    { id: 'GIFT4U',    type: 'coupon' },
    { id: 'GIFTING',   type: 'coupon' },
    { id: 'HERO',      type: 'coupon' },
    { id: 'HOLLY',     type: 'coupon' },
    { id: 'HOLLY7',    type: 'coupon' },
    { id: 'JOY2014',   type: 'coupon' },
    { id: 'JUNE',      type: 'coupon' },
    { id: 'LOVEMOM',   type: 'coupon' },
    { id: 'MOM10',     type: 'coupon' },
    { id: 'MOM11',     type: 'coupon' },
    { id: 'PEACHY',    type: 'coupon' },
    { id: 'PEARFREE',  type: 'coupon' },
    { id: 'PINTEREST', type: 'coupon' },
    { id: 'POPS',      type: 'coupon' },
    { id: 'SAVEMORE',  type: 'coupon' },
    { id: 'SAVE20',    type: 'coupon' },
    { id: 'SHARE',     type: 'coupon' },
    { id: 'SHIPPINGPEARS', type: 'coupon' },
    { id: 'SHIPPINGFREE',   type: 'coupon' },
    { id: 'SHIPSFREE', type: 'coupon' },
    { id: 'STARS',     type: 'coupon' },
    { id: 'SUNNY',     type: 'coupon' },
    { id: 'TAKE10',    type: 'coupon' },
    { id: 'THANKS',    type: 'coupon' },
    { id: 'THANKYOU',  type: 'coupon' },
    { id: 'WED',       type: 'coupon' },
    { id: 'WEDGIFTS',  type: 'coupon' },
    { id: 'WELOVEEASTER',  type: 'coupon' },
	{ id: 'EMAIL', title: 'Email Sign-up', callback: function () {
      var $email, starting;
      $email   = $('#dialog-EMAIL input:text');
      starting = 'Enter Your Email';

      button.enhanceAll();
      $email
        .bind('focus', function () { if ($email.val() === starting) { $email.val(''); } $email.select(); })
        .bind('blur',  function () { if ($email.val() === '') { $email.val(starting); } });
    } }
  ]);
});

/*********************************************************************************************************************/
/* Home Page                                                                                                         */
/*********************************************************************************************************************/

$(function () {
  "use strict";

  var homeFeature, body, clear, nav, homeCat, top, bottom;
  
  homeFeature = $('#content .homeFeature');
  if (homeFeature.length !== 0) {
    homeCat = $('#content .homeCat');
    nav     = $('#content .homeFeature .nav');

    body    = $('body');
    if ((body.hasClass('ie_7') || body.hasClass('ie_8'))) {
      // Remove all the comments that annoy IE
      clear   = homeCat.add(nav);
      clear.contents().filter(function (index, element) { return element.nodeType === 8; }).remove();
      clear.children().not('.caption').hide().show();

      // Add a first and last for the nav
      nav.children(':first').addClass('first');
      nav.children(':last').addClass('last');
    }

    // name the navigation caps
    nav.children('a:first').addClass('first');
    nav.children('a:last').addClass('last');

    // name the home category spots
    homeCat.children('a').each(function (index, element) {
      $(element).addClass('homeCat-' + index);
    });

    // match the community banners heights.
    top    = $('#content .homeCommunity .top a');
    bottom = $('#content .homeCommunity .bottom a');
    if (top.length !== 0) { setEqualHeight(top); }
    if (bottom.length !== 0) { setEqualHeight(bottom); }
  }
});

/*********************************************************************************************************************/
/* Facebook                                                                                                          */
/*********************************************************************************************************************/

window.fbAsyncInit = function() {
  "use strict";
  FB.init({
    status    : true, // check the login status upon init?
    cookie    : true, // set sessions cookies to allow your server to access the session?
    xfbml     : true, // parse XFBML tags on this page?
    channelUrl: document.location.protocol + '//' + document.location.hostname + '/content/common/include/channel.html'
  });
};

$(window).load(function () {
  "use strict";
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s);
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});

/*********************************************************************************************************************/
/* Business Gifts                                                                                                    */
/*********************************************************************************************************************/

$(function () {
  "use strict";
  var current, found, categories, navigation, business;
  current    = document.location.pathname;
  found      = false;
  categories = [
    '/h/business-gifts',
    '/h/business-gifts/business-fruit-gifts',
    '/h/business-gifts/business-gift-baskets-towers',
    '/h/business-gifts/business-bakery-chocolate-gifts',
    '/h/business-gifts/business-client-office-gifts',
    '/h/business-gifts/business-holiday-gifts',
    '/h/business-gifts/business-personalized-gifts',
    '/h/business-gifts/business-thank-you-gifts',
    '/h/business-gifts/business-gifts-now-shipping',
    '/h/business-gifts/business-gourmet-food-wine',
    '/h/business-gifts/business-flowers-plants'
  ];

  try {
    $.each(categories, function (ignore, category) {
      if (endsWith(current, category)) {
        found = true;
        return false;
      }
    });
    if (found) {
   
        
      business   = $('<div class="navigation-business"></div>');
      navigation = $('.left-nav-menu');
      navigation.find('.filters:last').nextAll().remove();
      navigation.after(business);
      $.get("/content/Hand/include/business-menu-2.html", function (data) {
        business.append(data);
        initLeftNavigation({ target: '.navigation-business' });
      }).done(function () {
        $.get("/h/view/business-mini-contact-form?dispHeadFoot=false", function (data) {
          data = $($.parseHTML(data, document, true));
          preMiniContactForm();
          data.children().appendTo(business);
          postMiniContactForm();
        });
      });
    }
  } catch (ignore) {}
  
  function preMiniContactForm() {
    dojo.require("dojo.parser");
    dojo.require("dijit.form.Form");
    dojo.require("dijit.form.ValidationTextBox");
    dojo.require("dijit.form.TextBox");
    dojo.require("bec.user.B2BContactUs");
    window.b2bContactUs = new bec.user.B2BContactUs();
  }
  function postMiniContactForm() {
    //dojoParseButtons();
    dojo.parser.instantiate([dojo.byId("b2b-mini-contact-form")], {dojoType: "dijit.form.Form"});
    dojo.parser.instantiate([dojo.byId("b2b-mini-contact-form-name")], {dojoType: "dijit.form.ValidationTextBox"});
    dojo.parser.instantiate([dojo.byId("b2b-mini-contact-form-email")], {dojoType:"dijit.form.ValidationTextBox"});
  }
});

//-------------------------------------------------------------------------------------------------------
// main navigation right align fix for last 3 children drop-downs because IE8 fails nth-child in CSS
//-------------------------------------------------------------------------------------------------------
$(function(){
    $('#main-navigation > li:nth-child(1n+6) > ul')
        .css({
            'left':'inherit',
            'right':'-1px'
        })
    $('#superNav li:last-child').css('{ border : 0 , padding-right : 5px}');
});

