

var ANF = {
	// constructor to reference ANF global functions
	fn : function (){},
	account : {},
	accountsection : {},
	catalog : {},
	checkout : {},
	storelocator : {},
	casting : {},
	unsubscribe : {},
	customerservice : {},
	speedexchange : {},
	gclookup : {},
	global : {},
	contactus : {},
	home : {},
	help : {},
	content: {},
	marketing: {},
	analytics: {},
	email: {},
	modularHelp: {}
};

var ANF_helper = {};
var af = new ANF.fn();

ANF.params = {
	image : {
		"SWATCHIMG_SUFFIX" : "_sw.jpg",
		"PRODUCTIMG_SUFFIX" : "_350.png",
		"MODELIMG_SUFFIX" : "_340.png",
		"ZOOMIMG_SUFFIX" : "_900.jpg",
		"PRINTIMG_SUFFIX" :  "_350.jpg",
		"CATIMG_SUFFIX" :  "_226.png",
		"THUMBIMG_SUFFIX" :  "_100.png"
	},
	urls : {
	    "SCENE7URL" : "//anf.scene7.com/is/image/",
		"STATIC_DIR" : 	"hol",
		"VERSIONNUMBER" : "79180",
		"VERSIONPATH" : "hol/79180",
		"SELECT_SIZE" : "Select Size",
		"SUBSCRIBE" : "/webapp/wcs/stores/servlet/Subscribe?catalogId=10201&langId=-1&storeId=10251",
		"ajax" : {
			"getColorJSON" : "/webapp/wcs/stores/servlet/GetColorJSON",
			"getProductJSON" : "/webapp/wcs/stores/servlet/GetProductJSON",
			"orderItemUpdate" : "/webapp/wcs/stores/servlet/OrderItemUpdate",
			"eGCAddUrl" : "/webapp/wcs/stores/servlet/EGCAdd",
			"interestItemDelete" : "/webapp/wcs/stores/servlet/InterestItemDelete",
			"interestItemDisplay" : "/webapp/wcs/stores/servlet/InterestItemDisplay",
			"userAccountView" : "/webapp/wcs/stores/servlet/UserAccountView",
			"userBasicProfileJSONView" : "/webapp/wcs/stores/servlet/UserBasicProfileJSONView",
			"getProductHTML" : "/webapp/wcs/stores/servlet/GetProductHTML",
			"productQuickView" : "/webapp/wcs/stores/servlet/ProductQuickView",
			"marketingSpotView" : "/webapp/wcs/stores/servlet/MarketingSpotView",
			"eMarketingSpotJSONUrl" : "/webapp/wcs/stores/servlet/GetEMarketingSpotJSON",
			"getProductListJSON" : "/webapp/wcs/stores/servlet/GetProductListJSON",
			"AutoPromoResponseJSON" : "/webapp/wcs/stores/servlet/AutoPromoResponseJSON",
			"help" : "/webapp/wcs/stores/servlet/HelpAJAX",
			"bazaarvoiceApi": "//hollister.ugc.bazaarvoice.com/static/17450-en_us/bvapi.js"
		}
	},
	storeAttributes : {
		"hasModalImageABTest" : "false",
		"hasMarketingModal" : false,
		"certonaAppId" : "HollisterUS",
		"ukBannerCookieValue" : "0513",
		"euBannerCookieValue" : "off",
		"hasRecommendationsDesktop" : true,
		"lazyLoadWaypointTrigger" : "200%",
		"infinityScrollWaypointTrigger" : ".75",
		"hasSearchRecommendedItemsDesktop" : true,
		"accountCreationDefaultTickSubscribe" : true,
		"blitz": false,
		"country" : "US",
		"countryFromIP" : "US",
		"locale" : "en_US",
		"pasId" : "10352",
		"anfPasId" : "10302",
		"kidsPasId" : "18107",
		"holPasId" : "10352",
		"ghPasId" : "13557",
		"storeId" : 10251,
		"catalogId" : "10201",
		"userId" 	: "537895926",
		"langId" : "-1",
		"lang" : "en",
		"currencyCode" : "USD",
		"QUERY_STR" : "storeId=10251&catalogId=10201&langId=-1",
		"HasShippingAndHandlingBlurb" : "0",
		"hasMetric" : "0",
		"HasSubscribeSubmitBlurb" : "0",
		"hasActAsBrokerMsg" : false,
		"hasAgeVerification" : "0",
		"hasDisabledContextMenu" : false,
		"hasMailToLinks" : true,
		"hasSessionTimeout" : false,
		"hasTargetBlankLinks" : true,
		"hasGeolocation" : true,
		"isKioskStore" : false,
		"siteDomains" : ['abercrombie', 'abercrombiekids', 'gillyhicks', 'hollisterco'],
		"storeLocatorBrandCode" : "HOL",
		"hasAVS" : true,
		"hasStoreLocator" : true,
		"ajaxABUrl" : "/webapp/wcs/stores/servlet/ABSwitchView",
		"checkoutAjaxABUrl" : "/webapp/wcs/stores/servlet/ABSwitchView?abTest=checkoutABflag&storeId=10251&catalogId=10201&langId=-1",
		"hasNewSiteModal" : "0",
		"isUSSite" : true,
		"facebookLikeUrl" : "http%3A%2F%2Fwww.facebook.com%2Fhollister%3Fref%3Dts",
		"promoCodeCountryWhitelist": "US,CA,PR,VI,AS,FM,GU,MH,MP,PW".split(","),
		"isEUSite" : false,
		"isUKSite" : false,
		"hasClickToChat" : false,
		"hasFindInStore" : false,
		"hasFindInStoreSurvey" : false,
		"hasProductSlideShow" : true,
		"typeAheadCharDelay" : 3,
		"typeAheadDisplay" : 7,
		"minSearchTermLength" : 1,
		"enableSearchSizeColorFilters" : true,
		"searchPageMaxProducts" : 48,
		"categoryPageMaxProducts" : 144,
		"socialSignOn" : true,
		"hasSSOFacebook" : true,
		"enableSearchRelease2": true,
		"enableSolrNavigationRelease2": true,
		"enableSolrFilteredURL": "true",
		"dmxToolMode": "Preview",
		"hasProductVideos" : true,
		"lazyLoadWaypointTrigger" : "200%",
		"lazyLoadWaypointTriggerKeyLooks" : "200%",
		"lazyLoadImgFadeInSpeed" : 750,
		"timeToSendEGC" : "07:00:00",
		"searchFilterFacetListJSON" : "{ 'facets' : [   { 'facetName' : 'Body_Type', 'containerClass' : 'filter-narrow', 'optionClass' : 'two-col' } , { 'facetName' : 'Details', 'containerClass' : 'filter-narrow', 'optionClass' : 'two-col' } , { 'facetName' : 'Fabric', 'containerClass' : 'filter-narrow', 'optionClass' : 'two-col' } , { 'facetName' : 'Fit', 'containerClass' : 'filter-narrow', 'optionClass' : 'two-col' } , { 'facetName' : 'Fit_Type', 'containerClass' : 'filter-narrow', 'optionClass' : 'two-col' } , { 'facetName' : 'Pattern', 'containerClass' : 'filter-wide', 'optionClass' : 'two-col' } , { 'facetName' : 'Sleeve_Length', 'containerClass' : 'filter-narrow', 'optionClass' : 'two-col' } , { 'facetName' : 'SuperWash', 'containerClass' : 'filter-narrow', 'optionClass' : 'two-col' } , { 'facetName' : 'Theme', 'containerClass' : 'filter-wide', 'optionClass' : 'two-col' } , { 'facetName' : 'Wash', 'containerClass' : 'filter-narrow', 'optionClass' : 'two-col' } , { 'facetName' : 'categoryId', 'containerClass' : 'filter-narrow', 'optionClass' : 'one-col' } , { 'facetName' : 'colorFamily', 'containerClass' : 'filter-narrow', 'optionClass' : 'two-col' } , { 'facetName' : 'sizeFamily', 'containerClass' : 'filter-narrow', 'optionClass' : 'three-col' } ] }",
		"newKeyLooks" : "1",
		"hasScrollToTopDesktop" : true,
		"hasSiteIsClosedMessage" : false,
		"accessPoint" : {
			"global" : false,
			"paypal" : false,
			"dspid" : "DEMO_DSP",
			"limiter" : null
		},
		"hasMultiCreditCardPayment" : true,
		"hasCreditCardAutoDetect" : true,
		"hasAPM" : true,
		"hasKlarna" : false,
		"reImagineWave1" : true,
		"hasAddressAutocomplete" : true,
		"changeSortLabel" : true,
		"isMySaves" : false,
		"hasMySaves" : true,
		"useStickyHearts" : true,
		"useStickyHeartsLocal" : true,
		"stickyHeartsTimeDelay" : 5,
		"storeContext" : "h-us",
		"apiURLRoot" : "/api/ecomm/h-us",
		"imageScrub" : {
			"enabled" : true, 
			"override" : false  
		}
	},
	env : {
		"type" : "",
		"isMobile" : "false",
		"shoprunnerEnvID" : 2
	}
}
ANF.s7 = {
	imgPresets : {
		"suffix" : "hol$",
		"product" : "$productMain-",
		"model" : "$productMainOFP-",
		"modelBottoms" : "$productMainBottoms-",
		"thumbnail" : "$productThumbnail-",
		"modelThumbnail" : "$productThumbnailOFP-",
		"modelBottomThumbnail" : "$productThumbnailBottoms-",
		"thumbnailPersonalCare" : "$productThumbnailPersonalCare-",
		"productZoom" : "$productS7Zoom-",
		"modelZoom" : "$productS7ZoomOFP-",
		"modelBottomZoom" : "$productS7ZoomBottoms-",
		"personalCareZoom" : "$productS7ZoomPersonalCare-",
		"sneakPeekZoom" : "$productS7ZoomSneakPeek-"
	},
	presetsNewProductPage : {
		"suffix" : "?$hol",
		"product" : "ProductImage500$",
		"model" : "ProductImageMod500$",
		"modelBottoms" : "ProductImageModBottom500$",
		"thumbnail" : "ThumbnailJPEG$",
		"modelThumbnail" : "ThumbnailPDPMod$",
		"modelBottomThumbnail" : "ThumbnailPDPModBottom$",
		"thumbnailFragrance" : "thumbnail-fragrance-hol$",
		"productZoom": "ProductS7Zoom$",
		"personalCareZoom": "personalCareS7Zoom$",
		"modelZoom" : "ProductModS7Zoom$",
		"sneakPeekZoom" : "SneakPeekS7Zoom$",
		"modelBottomZoom" : "ProductModBottomS7Zoom$"
	},
	presets : {
		"product" : "Product$",
		"model" : "ProductMod$",
		"modelBottoms" : "ProductModBottom$"
	}
}

ANF.messaging = {
	account : {
		"WISHLISTSENT" : "Your wish list has been sent.",
		"ACCOUNTGREETING": "Hey, {0}",
		"WELCOMEBACK": "Welcome back!",
		checkout_recipt : {
			CHK_ACT_CREATEACCOUNT_GENERICERROR : "An error occurred when attempting to create your account.",
			CHK_ACT_CREATEACCOUNT_PROCESSING : "Processing",
			CHK_ACT_CREATEACCOUNT_CREATEDWITHERRORS : "??????"
		}
	},
	orderdetail: {
		"GLB_YOURCONFIRMATIONEMAILSENT": "Your confirmation email has been sent",
		"GLB_ESTDELIVERY": "Estimated Delivery Date for In-Stock Items:",
		"ACT_YOURERECEIPTHASBEENSENT": "Your e-receipt has been sent!",
		"ACT_CONFIRMATIONEMAILRESENDFAILURE":	"Your confirmation email was not able to be successfully sent",
		"NOPURCHASESFOUND": "No purchases found."
	},
	status : {
		"PROCESSING" : "Processing...",
		"EMAIL_BANNER_GET_DEMO" : "Thank you! Your email has been added to our list.  Please tell us more about yourself (optional)",
		"SEE_DETAILS": "See Details",
		"HIDE_DETAILS": "Hide",
		"WEARESORRY": "We&#39;re Sorry!",
		"PROMO_APPLIED": "The following promotion has been applied to your order",
		"CONTINUE": "Continue",
		"SAVE": "Save",
		"SAVED": "Saved",
		"SHOP": "SHOP"
	},
	payment : {
		"STEP_4" : "Proceed to Step 4",
		"PAYPAL" : "Proceed to Paypal"
	},
	required_errors: {

	},
	error : {
		required : {
			
			"firstnamefield" : "Please enter a first name.",
			"lastnamefield" : "Please enter a last name.",
			"titlefield" : "Please select a title.",
			"countryfield" : "",
			"addressfield" : "Please enter an address.",
			"address2field" : "Please enter an address.",
			"address3field" : "Please enter an address.",
			"cityfield" : "Please enter a city.",
			"zipcodefield" : "Please enter a postal code.",
			"giftbox" : "Please select at least one item to add to your gift box.",
			"cardbrandfield" : "Please select a credit card type.",
			"cardnumberfield" : "Please enter a credit card number.",
			"csvfield" : "Please enter a security code.",
			"csvfieldtwo" : "Please enter a security code.",
			"payphonefield" : "Please enter a phone number.",
			"payemailfield" : "Please enter an email address.",
			"loginemailfield" : "Please enter an email address.",
			"loginpasswordfield" : "Please enter a valid password.",
			"promocodefield" : "This is not a valid promo code, please try again.",
			"giftcardnumberfield" : "This is not a valid gift card number. Please check the number and try again.",
			"cardexpmonth" : "Please enter an expiration date.",
			"cardexpyear" : "Please enter an expiration date.",
			"gbs" : "Please select an item(s) to be gift wrapped. ",
			"termsandconditionscheck" : "Your order cannot be submitted until you tick the box to confirm that you have read and agree to the Terms & Conditions and Privacy Policy. ",
			"phoneprimary" : "Please enter a phone number.",
			"phonesecondary" : "Please enter a phone number.",
			"email" : "Please enter an email address.",
			"ordernumber": "Please enter the order number.",
			"phoneprimaryoptionsanf": "Please select an option.",
			"phoneprimaryoptionshol": "Please select an option.",
			"phoneprimaryoptionskids": "Please select an option.",
			"phoneprimaryoptionsgh": "Please select an option.",
			"phonesecondaryoptionsanf": "Please select an option.",
			"phonesecondaryoptionshol": "Please select an option.",
			"phonesecondaryoptionskids": "Please select an option.",
			"phonesecondaryoptionsgh": "Please select an option.",
			"emailoptionsanf": "Please select an option.",
			"emailoptionshol": "Please select an option.",
			"emailoptionskids": "Please select an option.",
			"emailoptionsgh": "Please select an option.",
			"orderamount": "Please enter an amount.",
			"savedpayment": "Please select an option.",

			
			"footer__emailsignup" : "Enter Valid Email Address",
			"productsizes__selectwaist" : "Select Waist",
			"productsizes__selectlength" : "Select Length",
			"productsizes__select" : "Select Size",
			"product__unavailable": "UNAVAILABLE",
			"product__unavailableMsg": "The product you&#39;ve chosen is sold out. Please select another size or color."
		},
		format : {
			"cardnumberfield" : "This is not a valid card number.",
			"cardexpyear" : 'The expiration date you have entered is invalid. Please check the date on your card and try again.',
			"csvfield" : "Your bank has indicated that the security code entered is invalid. Please double check the 3 or 4 digit number on the back of your card and try again.",
			"csvfieldtwo" : "Your bank has indicated that the security code entered is invalid. Please double check the 3 or 4 digit number on the back of your card and try again.",
			"payemailfield" : "Please use a valid email format.",
			"payphonefield" : "Please enter a valid phone number.",
			"phoneprimary": "Please enter a valid phone number.",
			"phonesecondary": "Please enter a valid phone number.",
			"phoneprimaryconfirm": "Please enter a valid phone number.",
			"phonesecondaryconfirm": "Please enter a valid phone number.",
			"zipcodefield" : "Please enter a valid post code.",
			"email" : "Please use a valid email format.",
			"emailconfirm" : "Please use a valid email format.",
			"ordernumber" : "Please enter a valid order number.",
			"loginpasswordfield" : "Please enter a valid password.",
			"loginpasswordfieldconfirm" : "Please enter a valid password.",

			
			"footer__emailsignup" : "Enter Valid Email Address"
		},
		match : {
			"phoneprimaryconfirm": "Phone and phone confirmation must match.",
			"phoneprimary": "Phone and phone confirmation must match.",
			"phonesecondaryconfirm": "Phone and phone confirmation must match.",
			"phonesecondary": "Phone and phone confirmation must match.",
			"emailconfirm": 'Please correct the highlighted fields.',
			"email": 'Please correct the highlighted fields.',
			"loginpasswordfield": 'The passwords must match in both password fields.',
			"loginpasswordfieldconfirm": 'The passwords must match in both password fields.'
		},
		"REQUIRED" : "This field is required.",
		"REQUIRED_ALL" : "Please make sure all required information is provided.",
		"REQUIRED_SIZE" : "Please select a size.",
		"REQUIRED_AMT" : "Please select an amount.",
		"REQUIRED_QTY" : "Please select a quantity.",
		"REQUIRED_GENERIC" : 'Please correct the highlighted fields.',
		"INVALID_CHAR" : 'All entries must be in Roman or single-byte characters. ',
		"INVALID_EMAIL" : "Your e-mail address contains invalid characters.",
		"INVALID_EMAIL_BANNER" : "Invalid e-mail address.",
		"INVALID_PHONE" : "Your telephone number contains invalid characters.",
		"INVALID_ZIP" : "Sorry, the postal code is not valid for your state/province.",
		"INVALID_CC" : "The credit card number is invalid.",
		"GENERIC_CARD_ISSUE" : 'Sorry we weren&#39;t able to process your cards please double check the information',
		"KLARNA_GENERIC_ERROR" : 'Klarna was unable to process this payment. Please use another form of payment and resubmit your order.',
		"KLARNA_USED_ONE_ADDRESS" : 'Please update your shipping address to only use address line one.',
		"KLARNA_ADDRESS_FORMAT_DE" : 'Street Name & House No.',
		"KLARNA_ADDRESS_FORMAT_NL" : 'Street Name & House No. House Ext.',
		"KLARNA_ADDRESS_FORMAT_AT" : 'Street Name & House No.',
		"ERR_CANT_USE_PAYMENT_TYPE_WITH_GIFT_CARDS" : 'Sorry you cannot use this payment type with gift cards.',
		"MISMATCH" : "The following fields do not match:",
		"MISMATCH_EMAIL" : "The input e-mail addresses do not match.",
		"UNAPPLIED_PROMOCODE" : "There is an un-applied code entered in the Promo Code field. Please either remove or apply the Promo Code before processing your order.",
		"MUST_ACCEPT_TERMS" : "You must accept the terms and conditions before proceeding.",
		"INVALID_SHIPPING_COUNTRY" : "We do not ship from this site to the country you have chosen. Please select from the list of available ship-to countries in the address form below. ",
		"WISH_LIST_EMPTY" : 'There are no items in your wish list',
		"ERRORRETRIEVINGPURCHASES": "Error retrieving purchases.",
		<!-- This is only a tempory message as part of ECOMM-10890 -->
		"PONOTAVAILABLE": "We can not ship to PO Boxes in your country",
		"SAVES_ERROR_HEADER_MESSAGE": "We&#39;re Sorry",
		"SAVES_LIMIT_EXCEEDED": "This item cannot be saved because you have reached your max limit of 50 saved items, but you can delete some of your saves to make room for new ones! &lt;a href=&#034;/webapp/wcs/stores/servlet/MySaves?catalogId=10201&amp;langId=-1&amp;storeId=10251&#034;&gt;Go to my saves&lt;/a&gt;",
		"tooManySavedInjectMsg" : "You have saved too many items.",
		"SAVES_GENERIC": "We’re experiencing some issues with our save feature, please try again a little later.",
		"CART_LIMIT_EXCEEDED": "Oops! You’re unable to add this item because your bag can only hold up to 30 items!",
		"CART_SKU_RESTRICT": "Unfortunately, you can only purchase up to 2 of this style per transaction.",
		"CART_SOLDOUT": "Unfortunately that item just sold out!",
		"CART_TOTAL_EXCEEDED": "Oops! You’re unable to add this item because your bag can only hold up to $10,000 of merchandise!",
		"CART_GENERIC": "We’re experiencing some issues updating your bag, please try again a little later."
	},
	speedex: {
		"ERROR_01" : "Your Order Number could not be found because it is either invalid or is greater than 60 days from the original order date. Please try again.",
		"ERROR_02" : "The Order Number you submitted is greater than 60 days from the original order date and is not valid.",
		"ERROR_03" : "The Order Number you submitted currently has not been processed or shipped and cannot use Speed Exchange.",
		"ERROR_04" : 'The Order Number you submitted has already used Speed Exchange and is no longer valid.',
		"ERROR_05" : "The Order Number you submitted is not eligible for Speed Exchange.",
		"ERROR_06" : "The Order Number you submitted contains only Gift Cards or E-Gift Cards and is not eligible for Speed Exchange.",
		"ERROR_07" : "The Order Number you submitted is not eligible for Speed Exchange."
	},
	shoppingBagEdit: {
		"UPDATE" : "Update",
		"ADD_TO_BAG" : "Add To Bag",
		"CANCEL" : "Cancel"
	},
	giftwrap: {
		"MESSAGE" : "Message",
		"CHOOSE_BOX" : "Choose Box",
		"NEW_BOX" : "New Box",
		"BOX" : "Box"
	},
	gclookup: {
		"ERROR_01" : "Either the 16 digit card number or the validation code entered are incorrect.",
		"ERROR_02" : "Balance Inquiry is unavailable at this time. Please try again later.",
		"ERROR_03" : "We are unable to process your gift card at this moment. Please try again in a few minutes. If the issue continues to occur, please use another form of payment."
	},
	catalog: {
		"itemNotAvailable" : "This item is no longer available",
		"GLB_SANDHANDOTHERCHARGES" : '<a class="shipping-link" href="/webapp/wcs/stores/servlet/Help?textKey=HELP_SHIPPINGANDHANDLING&catalogId=10201&langId=-1&pageName=shipping-handling&storeId=10251">Shipping & Handling</a>',
		"ITEMADDEDTOWISHLIST" : "This item has been added to your wish list",
		"QUICKSHOP" : "Quick View",
		"SHOPNOW" : "SHOP NOW",
		"SHOP" : "SHOP",
		"VIEWFULLPRODUCT" : "View Full Product Information",
		"EDIT_WISHLIST" : "Edit Wish List",
		"STOCK_URGENCY_MESSAGE" : "HURRY! ONLY <span></span> LEFT IN STOCK!",
		"BACKORDER_URGENCY_MESSAGE": "This item is currently backordered.",
		"GETTHISLOOK" : "Get this look",
		"QUICKSHOPSOLDOUT" : "Sold Out",
		"JUSTFORYOU" : "Just for You",
		"ALLDETAILS" : "All Product Details",
		"AVAILABLE_IN" : "Available In",
		"GLB_REVIEWING" : "Write Your Review!",
		"SHOWNIN": "Shown in {color}",
		"INSTAVIEWSTITLE" : "Ratings and Reviews"
	},
	storelocator: {
		"SL_ERROR01" : "We&#39;re sorry. There were no locations found.",
		"SL_ERROR02" : "We&#39;re sorry. Your search could not be completed at this time.",
		"SL_ERROR03" : "Please pick a valid location",
		"SL_STORES_NEAR_YOU" : "Closest Stores Found Near You",
		"SL_FOUND_WITHIN" : "Closest stores found within {0} miles of {1}",
		"SL_FOUND_WITHIN_KM" : "Closest stores found within {0} kilometers of {1}",
		"SL_FOUND_IN" : "Stores Found In {0}"
	},
	shippingAccessPoint : {
		"ERR_SLNOLOCATIONSFOUND" : "We&#39;re sorry. There were no locations found.",
		"ERR_SLSEARCHCANNOTBECOMPLETED" : "We&#39;re sorry. Your search could not be completed at this time.",
		"SELECT_ACCESSPT_ERROR" : "SELECT AN ACCESS POINT LOCATION",
		"DAY" : {
			"MON" : "Monday",
			"TUE" : "Tuesday",
			"WED" : "Wednesday",
			"THU" : "Thursday",
			"FRI" : "Friday",
			"SAT" : "Saturday",
			"SUN" : "Sunday"
		}
	},
	findinstores: {
		"ITEM_NOT_AVAIL" : "We&#39;re sorry, this item is not available in the location you&#39;ve provided.",
		"ITEM_NOT_AVAIL_ADD_TO_BAG" : "We&#39;re sorry, this item is not available in the location you&#39;ve provided. It can be purchased online; would you like to BUY NOW/Add to Bag?"
	},
	unsubscribe: {
		success : "The following address has been removed from our mailing list"
	},
	search: {
		"searchProducts" : "Search Products",
		"sizeChartHref" : "/webapp/wcs/stores/servlet/Help?textKey=HELP_SIZECHART&catalogId=10201&langId=-1&pageName=size-charts&storeId=10251",
		"sizeChartText" : "Size Charts"
	},
	social: {
		"weiboText" : "我刚刚在@Hollister 喜欢了一件单品，快来看看吧!"
	},
	saves: {
		"excludesTax" : 'Excludes sales tax and shipping and handling',
		"vatIncluded" : 'VAT Included'
	},
	googleShoppingNotice: {
		"title" : 'YOU ARE CURRENTLY VISITING OUR U.S. SITE',
		"text" : 'You are viewing our US based site because you clicked in from Google US. Feel free to check out this style, but the next time you click you&#39;ll be redirected to the site of the country you are currently located in. Our sites adjust for local currency and inventory, so we aren&#39;t able to offer our US site to overseas customers at this time. If you have any questions, please reach out to Customer Service. Sorry for any inconvenience, and thanks for shopping at Hollister Co!'
	}
}