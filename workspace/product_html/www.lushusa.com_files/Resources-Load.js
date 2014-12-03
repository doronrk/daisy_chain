


(function(app){
app.isMobileUserAgent = false;
app.zoomViewerEnabled = true;
app.constants = {"AVAIL_STATUS_IN_STOCK":"IN_STOCK","AVAIL_STATUS_PREORDER":"PREORDER","AVAIL_STATUS_BACKORDER":"BACKORDER","AVAIL_STATUS_NOT_AVAILABLE":"NOT_AVAILABLE","PI_METHOD_GIFT_CERTIFICATE":"GIFT_CERTIFICATE"};
app.resources = {"SHIP_QualifiesFor":"This shipment qualifies for","CC_LOAD_ERROR":"Couldn't load credit card!","REG_ADDR_ERROR":"Couldn't Load Address","SAMPLE_PRODUCT":"Sample Product","SAMPLE_PRODUCTS":"Sample Products","BONUS_PRODUCT":"Bonus Product","BONUS_PRODUCTS":"Bonus Product(s)","SELECT_BONUS_PRODUCTS":"Select {0} Bonus Product(s)","SELECT_BONUS_PRODUCT":"Select","BONUS_PRODUCT_MAX":"The maximum number of bonus products have been selected.  Please remove one in order to add additional bonus products.","SIMPLE_SEARCH":"Search","SUBSCRIBE_EMAIL_DEFAULT":"Email Address","CURRENCY_SYMBOL":"$","MISSINGVAL":"Please Enter {0}","SERVER_ERROR":"Server connection failed!","MISSING_LIB":"jQuery is undefined.","BAD_RESPONSE":"Bad response, Parser error","INVALID_PHONE":"Please specify a valid phone number.","INVALID_ZIP":"Please enter a valid value.","INVALID_EMAIL":"The email address is invalid.","REMOVE":"Remove","QTY":"qty","EMPTY_IMG_ALT":"Remove","COMPARE_BUTTON_LABEL":"Compare","COMPARE_CONFIRMATION":"This will remove the first product added to compare.  Is that OK?","COMPARE_REMOVE_FAIL":"Unable to remove item from list","COMPARE_ADD_FAIL":"Unable to add item to list","ADD_TO_CART_FAIL":"Unable to add item '{0}' to cart ","REGISTRY_SEARCH_ADVANCED_CLOSE":"Close Advanced Search","GIFT_CERT_INVALID":"Invalid Gift Card Code","GIFT_CERT_BALANCE":"Your current gift card balance is ","GIFT_CERT_AMOUNT_INVALID":"Gift Certificate can only be purchased with a minimum of $5 and maximum of $5000","GIFT_CERT_MISSING":"Please enter a gift card code.","COUPON_CODE_MISSING":"Please Enter a Coupon Code","COOKIES_DISABLED":"Your browser currently is not set to accept Cookies. Please turn it on or check if you have another program set to block cookies.","BML_AGREE_TO_TERMS":"You need to agree to the terms and conditions by activating this checkbox.","CHAR_LIMIT_MSG":"You have {0} characters left out of {1}","CONFIRM_DELETE":"Do you want to remove this {0}?","TITLE_GIFTREGISTRY":"gift registry","TITLE_ADDRESS":"address","TITLE_CREDITCARD":"credit card","SERVER_CONNECTION_ERROR":"Server connection failed!","IN_STOCK_DATE":"The expected in-stock date is {0}.","DISPLAY_VIEW":"DISPLAY VIEW","SAMPLE_ADD":"Sample Selected","IN_STOCK":"In Stock","QTY_IN_STOCK":"{0} Item(s) In Stock","PREORDER":"Pre-Order","QTY_PREORDER":"{0} item(s) are available for pre-order.","REMAIN_PREORDER":"The remaining items are available for pre-order.","BACKORDER":"Back Order","QTY_BACKORDER":"Back Order {0} item(s)","REMAIN_BACKORDER":"The remaining items are available on back order.","NOT_AVAILABLE":"This item is currently not available.","REMAIN_NOT_AVAILABLE":"The remaining items are currently not available. Please adjust the quantity."};
app.urls = {"appResources":"/on/demandware.store/Sites-Lush-Site/en_US/Resources-Load","pageInclude":"/on/demandware.store/Sites-Lush-Site/en_US/Page-Include","continueUrl":"http://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/Resources-Load/C1558766737","staticPath":"http://demandware.edgesuite.net/aahl_prd/on/demandware.static/Sites-Lush-Site/-/en_US/v1417579391685/","addGiftCert":"/on/demandware.store/Sites-Lush-Site/en_US/GiftCert-Purchase","minicartGC":"/on/demandware.store/Sites-Lush-Site/en_US/GiftCert-ShowMiniCart","addProduct":"/on/demandware.store/Sites-Lush-Site/en_US/Cart-AddProduct","minicart":"/on/demandware.store/Sites-Lush-Site/en_US/Cart-MiniAddProduct","cartShow":"/on/demandware.store/Sites-Lush-Site/en_US/Cart-Show","giftRegAdd":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/Address-GetAddressDetails?addressID=","paymentsList":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/PaymentInstruments-List","addressesList":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/Address-List","wishlistAddress":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/Wishlist-SetShippingAddress","deleteAddress":"/on/demandware.store/Sites-Lush-Site/en_US/Address-Delete","getProductUrl":"/on/demandware.store/Sites-Lush-Site/en_US/Product-Show","getProductReviews":"/on/demandware.store/Sites-Lush-Site/en_US/Product-GetReviews","getBonusProducts":"/on/demandware.store/Sites-Lush-Site/en_US/Product-GetBonusProducts","addBonusProduct":"/on/demandware.store/Sites-Lush-Site/en_US/Cart-AddBonusProduct","getSetItem":"/on/demandware.store/Sites-Lush-Site/en_US/Product-GetSetItem","productDetail":"/on/demandware.store/Sites-Lush-Site/en_US/Product-Detail","getAvailability":"/on/demandware.store/Sites-Lush-Site/en_US/Product-GetAvailability","removeImg":"http://demandware.edgesuite.net/aahl_prd/on/demandware.static/Sites-Lush-Site/-/en_US/v1417579391685/images/interface/icon_remove.gif","searchsuggest":"/on/demandware.store/Sites-Lush-Site/en_US/Search-GetSuggestions","searchsuggest2":"/on/demandware.store/Sites-Lush-Site/en_US/Search-GetSuggestions2","productNav":"/on/demandware.store/Sites-Lush-Site/en_US/Product-Productnav","summaryRefreshURL":"/on/demandware.store/Sites-Lush-Site/en_US/COBilling-UpdateSummary","billingSelectCC":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/COBilling-SelectCreditCard","billingAddressRefresh":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/COBilling-UpdateBillingAddress","billingUseShipRefresh":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/COBilling-UseShipping","billingStart":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/COBilling-Start","shippingUpdate":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/COShipping-Update","updateAddressDetails":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/COShipping-UpdateAddressDetails","updateAddressDetailsBilling":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/COBilling-UpdateAddressDetails","shippingMethodsJSON":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/COShipping-GetApplicableShippingMethodsJSON","shippingMethodsList":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/COShipping-UpdateShippingMethodList","selectShippingMethodsList":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/COShipping-SelectShippingMethod","resetPaymentForms":"/on/demandware.store/Sites-Lush-Site/en_US/COBilling-ResetPaymentForms","compareShow":"/on/demandware.store/Sites-Lush-Site/en_US/Compare-Show","compareAdd":"/on/demandware.store/Sites-Lush-Site/en_US/Compare-AddProduct","compareRemove":"/on/demandware.store/Sites-Lush-Site/en_US/Compare-RemoveProduct","compareEmptyImage":"http://demandware.edgesuite.net/aahl_prd/on/demandware.static/Sites-Lush-Site/-/en_US/v1417579391685/images/comparewidgetempty.png","giftCardCheckBalance":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/COBilling-GetGiftCertificateBalance","addCoupon":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/Cart-AddCoupon","powerReviewsFullJs":"http://demandware.edgesuite.net/aahl_prd/on/demandware.static/Sites-Lush-Site/Sites-lushcosmetics-export/en_US/v1417579391685/pwr/engine/js/full.js","powerReviewsZip":"http://demandware.edgesuite.net/aahl_prd/on/demandware.static/Sites-Lush-Site/Sites-lushcosmetics-export/en_US/v1417579391685","loginbox":"/on/demandware.store/Sites-Lush-Site/en_US/Account-LoginBox","wishlistSlug":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/Wishlist-Add?source=productdetail","giftRegistrySlug":"https://www.lushusa.com/on/demandware.store/Sites-Lush-Site/en_US/GiftRegistry-AddProduct?source=productdetail","bonusSessionOff":"/on/demandware.store/Sites-Lush-Site/en_US/Product-SetBonusVar?set=false"};
}(window.app = window.app || {}));