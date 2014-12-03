


(function(app){
app.isMobileUserAgent = false;
app.zoomViewerEnabled = true;
app.constants = {"AVAIL_STATUS_IN_STOCK":"IN_STOCK","AVAIL_STATUS_PREORDER":"PREORDER","AVAIL_STATUS_BACKORDER":"BACKORDER","AVAIL_STATUS_NOT_AVAILABLE":"NOT_AVAILABLE","PI_METHOD_GIFT_CERTIFICATE":"GIFT_CERTIFICATE","COMMISIONJUNCTION_EMAIL_SIGNUP_SOURCE":"https://www.emjcd.com/tags/c?containerTagId=5633&ITEM1=Signup&AMT1=0&QTY1=1&CID=1528662&TYPE=364047&CURRENCY=USD&OID=","COMMISIONJUNCTION_TAG_ENABLED":true,"LightningBolt_MediaCom":"thank-you-page-click","LightningBolt_Enabled":true,"PWP_MODAL_TITLE":""};
app.resources = {"SHIP_QualifiesFor":"This shipment qualifies for","CC_LOAD_ERROR":"Couldn't load credit card!","REG_ADDR_ERROR":"Couldn't Load Address","BONUS_PRODUCT":"Bonus Product","BONUS_PRODUCTS":"Bonus Product(s)","SELECT_BONUS_PRODUCTS":"Select {0} Bonus Product(s)","SELECT_BONUS_PRODUCT":"Select","BONUS_PRODUCT_MAX":"The maximum number of bonus products have been selected.  Please remove one in order to add additional bonus products.","SIMPLE_SEARCH":"Search","SUBSCRIBE_EMAIL_DEFAULT":"Enter Your Email Address","CURRENCY_SYMBOL":"$","MISSINGVAL":"Please enter a value for {0}","SERVER_ERROR":"Server connection failed!","MISSING_LIB":"jQuery is undefined.","BAD_RESPONSE":"Bad response, Parser error","INVALID_PHONE":"Please specify a valid phone number.","INVALID_EMAIL":"The email address is invalid.","REMOVE":"remove","QTY":"Qty:","EMPTY_IMG_ALT":"remove","COMPARE_BUTTON_LABEL":"Compare Item(s)","COMPARE_CONFIRMATION":"This will remove the first product added to compare.  Is that OK?","COMPARE_REMOVE_FAIL":"Unable to remove item from list","COMPARE_ADD_FAIL":"Unable to add item to list","ADD_TO_CART_FAIL":"Unable to add item '{0}' to bag ","REGISTRY_SEARCH_ADVANCED_CLOSE":"Close Advanced Search","GIFT_CERT_INVALID":"Gift card is invalid or has zero balance ","GIFT_CERT_BALANCE":"Your current gift certificate balance is ","GIFT_CERT_AMOUNT_INVALID":"Gift Certificate can only be purchased with a minimum of $5 and maximum of $5000","GIFT_CERT_MISSING":"Please enter a gift certificate code.","GIFT_CERT_PIN_MISSING":"Please enter the gift certificate pin.","GIFT_CERT_NOT_APPLIED":"Please apply your gift card with the apply button or clear the field","GIFT_CERT_CONNECTION_FAILURE":"Gift Certification not applied due to profit point connection failure","COUPON_CODE_MISSING":"Please Enter a Coupon Code","COOKIES_DISABLED":"Your browser currently is not set to accept Cookies. Please turn it on or check if you have another program set to block cookies.","BML_AGREE_TO_TERMS":"You must agree to the terms and conditions","CHAR_LIMIT_MSG":"You have {0} characters left out of {1}","CONFIRM_DELETE":"Do you want to remove this {0}?","TITLE_GIFTREGISTRY":"gift registry","TITLE_ADDRESS":"address","TITLE_CREDITCARD":"credit card","SERVER_CONNECTION_ERROR":"Server connection failed!","IN_STOCK_DATE":"Available for delivery on {0}","MISSING_FIRSTNAME":"Please enter a First Name","MISSING_LASTNAME":"Please enter a Last Name","MISSING_EMAIL":"Please enter a valid email address.","MISSING_EMAILCONFIRM":"Please confirm your address.","MISSING_PASSWORD":"Please enter a password","MISSING_PASSWORDCONFIRM":"Confirm Password","MISSING_PHONE":"Please enter a Phone Number","MISSING_ADDRESS1":"Please enter an Address","MISSING_CITY":"Please enter a City","MISSING_ZIP":"Please enter a Zip Code","MISSING_STATE":"Please select a State","MISSING_COUNTRY":"Please select a Country","MISSING_CATALOGSUBSCRIBE":"You must check here to receive catalogs","MISSING_CATALOGOPTIN":"You must check here to receive catalogs","MISSING_OPTOUT":"You must check here to stop receiving catalogs","CONDITIONAL_LOGIN":"Must enter either an email and password or Godiva Rewards number and email.","CONDITIONAL_LOGIN_EMAIL":"Please enter email address","CONDITIONAL_LOGIN_PASSWORD":"Please enter password","CONDITIONAL_LOGIN_REWARDS":"Please enter rewards club number","GIFT_CERTIFICATE_MASKED":"XXXX-XXXX-XXXX- ","GIFT_CERTIFICATE_APPLIED":"applied.","QUANTITY_EXCEEDED":"Maximum of 5 units per order allowed. For bulk personalized ribbon orders call 1-877-267-7847 (+1-877-CORPVIP) or <a href = \"http://www.godiva.com/business-gifts/PersonalizedGiftsArticle.html\" target=\"_blank\" class=\"bulkOrders\">Learn More</a>.","QUANTITY_EXCEEDED_CART":"Maximum of 5 units allowed.","POSTAL_CODE_ERROR":"Please enter a valid postal code.","PR_ERROR_MESSAGE":"Sorry, we do not ship to Puerto Rico Addresses. Please select a different address.","IN_STOCK":"In Stock","QTY_IN_STOCK":"{0} Item(s) In Stock","PREORDER":"Pre-Order","QTY_PREORDER":"{0} item(s) are available for pre-order.","REMAIN_PREORDER":"The remaining items are available for pre-order.","BACKORDER":"Back Order","QTY_BACKORDER":"Back Order {0} item(s)","REMAIN_BACKORDER":"The remaining items are available on back order.","NOT_AVAILABLE":"We apologize, this product is out of stock.","REMAIN_NOT_AVAILABLE":"Please adjust the quantity."};
app.urls = {"appResources":"/on/demandware.store/Sites-Godiva-Site/default/Resources-Load","addAddress":"/on/demandware.store/Sites-Godiva-Site/default/COShipping-AddNewAddress","qtycheck":"/on/demandware.store/Sites-Godiva-Site/default/Cart-CheckQtyForPersonalisedRibbonProduct","setGiftMsg":"/on/demandware.store/Sites-Godiva-Site/default/COMultipleShipment-SetGiftMessage","saveShipments":"/on/demandware.store/Sites-Godiva-Site/default/COMultipleShipment-SaveShipment","pageInclude":"/on/demandware.store/Sites-Godiva-Site/default/Page-Include","continueUrl":"http://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/Resources-Load/C1188871859","staticPath":"http://demandware.edgesuite.net/aakg_prd/on/demandware.static/Sites-Godiva-Site/-/default/v1417583068158/","addProduct":"/on/demandware.store/Sites-Godiva-Site/default/Cart-AddProduct","minicart":"/on/demandware.store/Sites-Godiva-Site/default/Cart-MiniAddProduct","cartShow":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/Cart-Show","giftRegAdd":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/Address-GetAddressDetails?addressID=","wishlistAddress":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/Wishlist-SetShippingAddress","deleteAddress":"/on/demandware.store/Sites-Godiva-Site/default/Address-Delete","getProductUrl":"/on/demandware.store/Sites-Godiva-Site/default/Product-Show","getBonusProducts":"/on/demandware.store/Sites-Godiva-Site/default/Product-GetBonusProducts","addBonusProduct":"/on/demandware.store/Sites-Godiva-Site/default/Cart-AddBonusProduct","getSetItem":"/on/demandware.store/Sites-Godiva-Site/default/Product-GetSetItem","productDetail":"/on/demandware.store/Sites-Godiva-Site/default/Product-Detail","getAvailability":"/on/demandware.store/Sites-Godiva-Site/default/Product-GetAvailability","removeImg":"http://demandware.edgesuite.net/aakg_prd/on/demandware.static/Sites-Godiva-Site/-/default/v1417583068158/images/interface/icon_remove.gif","searchsuggest":"/on/demandware.store/Sites-Godiva-Site/default/Search-GetSuggestions","productNav":"/on/demandware.store/Sites-Godiva-Site/default/Product-Productnav","summaryRefreshURL":"/on/demandware.store/Sites-Godiva-Site/default/COBilling-UpdateSummary","billingSelectCC":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/COBilling-SelectCreditCard","updateAddressDetails":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/COShipping-UpdateAddressDetails","updateAddressDetailsBilling":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/COBilling-UpdateAddressDetails","shippingMethodsJSON":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/COShipping-GetApplicableShippingMethodsJSON","shippingMethodsList":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/COShipping-UpdateShippingMethodList","shippingMethodsListForMultiShipment":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/COMultipleShipment-UpdateShippingMethodList","selectShippingMethodsList":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/COShipping-SelectShippingMethod","resetPaymentForms":"/on/demandware.store/Sites-Godiva-Site/default/COBilling-ResetPaymentForms","compareShow":"/on/demandware.store/Sites-Godiva-Site/default/Compare-Show","compareAdd":"/on/demandware.store/Sites-Godiva-Site/default/Compare-AddProduct","compareRemove":"/on/demandware.store/Sites-Godiva-Site/default/Compare-RemoveProduct","compareEmptyImage":"http://demandware.edgesuite.net/aakg_prd/on/demandware.static/Sites-Godiva-Site/-/default/v1417583068158/images/comparewidgetempty.png","giftCardCheckBalance":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/COBilling-GetGiftCertificateBalance","giftCardApply":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/RedeemGiftCertificate-Apply","powerReviewsFullJs":"http://demandware.edgesuite.net/aakg_prd/on/demandware.static/Sites-Godiva-Site/Sites-godiva-storefront-catalog-us/default/v1417583068158/pwr/engine/js/full.js","powerReviewsZip":"http://demandware.edgesuite.net/aakg_prd/on/demandware.static/Sites-Godiva-Site/Sites-godiva-storefront-catalog-us/default/v1417583068158","shippingSingle":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/COShipping-Start?singleship=true","shippingMultiple":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/COShippingMultiple-Start","summaryPage":"/on/demandware.store/Sites-Godiva-Site/default/COSummary-Submit","orderConfirmation":"/on/demandware.store/Sites-Godiva-Site/default/COMultipleShipment-ValidateForBilling","shippingMethod":"/on/demandware.store/Sites-Godiva-Site/default/COMultipleShipment-Start1","shipmentMethod":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-Start","multipleshipmentsjson":"/on/demandware.store/Sites-Godiva-Site/default/COMultipleShipment-PersistShipment","proceedtoShippingMethods":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-ProceedToShipment","resetAll":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-ResetAll","showShipments":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-ShowShipments","createInitialShipments":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-CreateInitialShipments","createShipments":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-CreateShipments","deleteProductMultiShipmentPage":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-DeleteProduct","deleteShipmentMultiShipmentPage":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-DeleteProduct","shipmentMethodAddProduct":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-AddProduct","splitProductMultiShipmentPage":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-SplitProduct","loginRedirectPage":"/sign-in","timeoutRedirectPage":"/on/demandware.store/Sites-Godiva-Site/default/Login-Logout","selectPwpProduct":"/on/demandware.store/Sites-Godiva-Site/default/Product-GetPWPProducts","sortAddresses":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/Address-SortAddresses","getStores":"http://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/Stores-GetStores","openboutiquefinder":"http://www.godiva.com/store-locator","getStorebyID":"http://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/Stores-GetStoreFromID","addCoupon":"/on/demandware.store/Sites-Godiva-Site/default/Cart-AddCoupon","removeCoupon":"/on/demandware.store/Sites-Godiva-Site/default/Cart-RemoveCoupon","updateOffers":"/on/demandware.store/Sites-Godiva-Site/default/Cart-UpdateOffers","piececount":"/on/demandware.store/Sites-Godiva-Site/default/Product-GetPieces","removeGiftCertificate":"https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/default/COBilling-RemoveGiftCertificate","getSelectedAddress":"/on/demandware.store/Sites-Godiva-Site/default/COBilling-GetSelectedAddress","placeOrderAddCoupon":"/on/demandware.store/Sites-Godiva-Site/default/COSummary-AddCoupon","placeOrderRemoveCoupon":"/on/demandware.store/Sites-Godiva-Site/default/COSummary-RemoveCoupon","placeOrderUpdateOffers":"/on/demandware.store/Sites-Godiva-Site/default/COSummary-UpdateOffers","updateShippingAddressForLocation":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-UpdateShippingAddressForLocation","createShipmentsForMultiShip":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-CreateShipmentsForMultiShip","removeProductLineItem":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-RemoveProductLineItem","editLocation":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-EditProductLocation","editAddresses":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-EditAddresses","updateQuantitiesForProduct":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-UpdateQuantitiesForProduct","addGuestAddressToSession":"/on/demandware.store/Sites-Godiva-Site/default/ShipmentMethods-AddGuestAddressToSession","deleteShipmentMultiShip":"/on/demandware.store/Sites-Godiva-Site/default/COMultipleShipment-DeleteShipment","updateShipmentOccasion":"/on/demandware.store/Sites-Godiva-Site/default/COMultipleShipment-UpdateShipmentOccasions"};
}(window.app = window.app || {}));