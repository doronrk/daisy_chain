


(function(app){
//app.isMobileUserAgent = true;
app.isMobileUserAgent = false;
app.zoomViewerEnabled = false;
app.constants = {"AVAIL_STATUS_IN_STOCK":"IN_STOCK","AVAIL_STATUS_PREORDER":"PREORDER","AVAIL_STATUS_BACKORDER":"BACKORDER","AVAIL_STATUS_NOT_AVAILABLE":"NOT_AVAILABLE","PI_METHOD_GIFT_CERTIFICATE":"GIFT_CERTIFICATE"};
app.resources = {"SHIP_QualifiesFor":"This shipment qualifies for","CC_LOAD_ERROR":"Couldn't load credit card!","REG_ADDR_ERROR":"Couldn't Load Address","BONUS_PRODUCT":"Bonus Product","BONUS_PRODUCTS":"Bonus Product","SELECT_BONUS_PRODUCTS":"Select {0} Bonus Product(s)","SELECT_BONUS_PRODUCT":"Select","BONUS_PRODUCT_MAX":"The maximum number of bonus products have been selected.  Please remove one in order to add additional bonus products.","SIMPLE_SEARCH":"Search","SUBSCRIBE_EMAIL_DEFAULT":"Email Address","CURRENCY_SYMBOL":"$","MISSINGVAL":"Please Enter {0}","SERVER_ERROR":"Server connection failed!","MISSING_LIB":"jQuery is undefined.","BAD_RESPONSE":"Bad response, Parser error","INVALID_PHONE":"Please specify a valid phone number.","INVALID_EMAIL":"The email address is invalid.","REMOVE":"Remove","QTY":"Qty","EMPTY_IMG_ALT":"Remove","COMPARE_BUTTON_LABEL":"Compare Items","COMPARE_CONFIRMATION":"This will remove the first product added to compare.  Is that OK?","COMPARE_REMOVE_FAIL":"Unable to remove item from list","COMPARE_ADD_FAIL":"Unable to add item to list","ADD_TO_CART_FAIL":"Unable to add item '{0}' to cart ","REGISTRY_SEARCH_ADVANCED_CLOSE":"Close Advanced Search","GIFT_CERT_INVALID":"Invalid Gift Card Number","GIFT_CERT_BALANCE":"Your Gift Card balance is: ","GIFT_CERT_AMOUNT_INVALID":"Gift Certificate can only be purchased with a minimum of $5 and maximum of $5000","GIFT_CERT_MISSING":"Please enter a gift certificate code.","COUPON_CODE_MISSING":"Please Enter a Coupon Code","COOKIES_DISABLED":"Your browser currently is not set to accept Cookies. Please turn it on or check if you have another program set to block cookies.","BML_AGREE_TO_TERMS":"You must agree to the terms and conditions","CHAR_LIMIT_MSG":"You have {0} characters left out of {1}","CONFIRM_DELETE":"Do you want to remove this {0}?","TITLE_GIFTREGISTRY":"gift registry","TITLE_ADDRESS":"address","TITLE_CREDITCARD":"credit card","SERVER_CONNECTION_ERROR":"Server connection failed!","IN_STOCK_DATE":"The expected in-stock date is {0}.","IN_STOCK":"In Stock","QTY_IN_STOCK":"{0} Item(s) In Stock","PREORDER":"Pre-Order","QTY_PREORDER":"{0} item(s) are available for pre-order.","REMAIN_PREORDER":"The remaining items are available for pre-order.","BACKORDER":"Back Order","QTY_BACKORDER":"Back Order {0} item(s)","REMAIN_BACKORDER":"The remaining items are available on back order.","NOT_AVAILABLE":"This item is currently not available.","REMAIN_NOT_AVAILABLE":"The quantity selected is not available."};
app.urls = {"appResources":"/on/demandware.store/Sites-loveculture-Site/default/Resources-Load","pageInclude":"/on/demandware.store/Sites-loveculture-Site/default/Page-Include","continueUrl":"http://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/Resources-Load/C1727724126","staticPath":"http://demandware.edgesuite.net/aand_prd/on/demandware.static/Sites-loveculture-Site/-/default/v1417567601372/","addGiftCert":"/on/demandware.store/Sites-loveculture-Site/default/GiftCert-Purchase","minicartGC":"/on/demandware.store/Sites-loveculture-Site/default/GiftCert-ShowMiniCart","addProduct":"/on/demandware.store/Sites-loveculture-Site/default/Cart-AddProduct","minicart":"/on/demandware.store/Sites-loveculture-Site/default/Cart-MiniAddProduct","cartShow":"/Cart","giftRegAdd":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/Address-GetAddressDetails?addressID=","paymentsList":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/PaymentInstruments-List","addressesList":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/Address-List","wishlistAddress":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/Wishlist-SetShippingAddress","deleteAddress":"/on/demandware.store/Sites-loveculture-Site/default/Address-Delete","getProductUrl":"/on/demandware.store/Sites-loveculture-Site/default/Product-Show","getBonusProducts":"/on/demandware.store/Sites-loveculture-Site/default/Product-GetBonusProducts","addBonusProduct":"/on/demandware.store/Sites-loveculture-Site/default/Cart-AddBonusProduct","getSetItem":"/on/demandware.store/Sites-loveculture-Site/default/Product-GetSetItem","productDetail":"/on/demandware.store/Sites-loveculture-Site/default/Product-Detail","getAvailability":"/on/demandware.store/Sites-loveculture-Site/default/Product-GetAvailability","removeImg":"http://demandware.edgesuite.net/aand_prd/on/demandware.static/Sites-loveculture-Site/-/default/v1417567601372/images/interface/icon_remove.gif","searchsuggest":"/on/demandware.store/Sites-loveculture-Site/default/Search-GetSuggestions","productNav":"/on/demandware.store/Sites-loveculture-Site/default/Product-Productnav","summaryRefreshURL":"/on/demandware.store/Sites-loveculture-Site/default/COBilling-UpdateSummary","billingSelectCC":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/COBilling-SelectCreditCard","updateAddressDetails":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/COShipping-UpdateAddressDetails","updateAddressDetailsBilling":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/COBilling-UpdateAddressDetails","shippingMethodsJSON":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/COShipping-GetApplicableShippingMethodsJSON","shippingMethodsList":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/COShipping-UpdateShippingMethodList","selectShippingMethodsList":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/COShipping-SelectShippingMethod","resetPaymentForms":"/on/demandware.store/Sites-loveculture-Site/default/COBilling-ResetPaymentForms","compareShow":"/on/demandware.store/Sites-loveculture-Site/default/Compare-Show","compareAdd":"/on/demandware.store/Sites-loveculture-Site/default/Compare-AddProduct","compareRemove":"/on/demandware.store/Sites-loveculture-Site/default/Compare-RemoveProduct","compareEmptyImage":"http://demandware.edgesuite.net/aand_prd/on/demandware.static/Sites-loveculture-Site/-/default/v1417567601372/images/comparewidgetempty.png","giftCardCheckBalance":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/COBilling-GetGiftCertificateBalance","addCoupon":"https://www.loveculture.com/on/demandware.store/Sites-loveculture-Site/default/Cart-AddCoupon","emailSignup":"/on/demandware.store/Sites-loveculture-Site/default/Account-AddToEmailList"};
}(window.app = window.app || {}));