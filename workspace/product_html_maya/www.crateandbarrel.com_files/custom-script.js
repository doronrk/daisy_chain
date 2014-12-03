// Baynote custom-script $Revision: 1.43 $

// object to hold data and functions used by custom script, so 
// we pollute the namespace less
var bnCustScr = {};

/**
 * This function should be called by Crate upon successful addToCart. Expects
 * to be passed a list of skus to be used as context for popup cart recs.
 * 
 * @param cartItems		array of skus
 * @return				none specified
 */
function bn_AddCartItems(cartItems) {
	bnCustScr.cartItems = cartItems;
}

/**
 * carry out all the tasks we need to do upon load
 * @return				none specified
 */
bnCustScr.init = function() {
	// only show on qa.crateandbarrel.com when bn_test=true
	if ( true ) {
		bnCustScr.shouldInject = true;
	} else {
		bnCustScr.shouldInject = false;
		return false;
	}

	/*
	// enable the ajax tag
	BaynoteAPI.execute('ajax');
	
	if ( !bnCustScr.isSpillPage() ) {
		bnCustScr.removeSpillInjection();
	}
	
	$('body').bind('PopupLoad', function(e) {
		bnCustScr.injectGrowlRec();
	});
	*/
}

bnCustScr.injectRec = function(injectionPoints, responseText) {
	injectionPoints[0].innerHTML = responseText;
}

bnCustScr.gotAjaxError = function() {
}

/**
 * carry out injection for the growl cart recs
 * @return				none specified
 */
bnCustScr.injectGrowlRec = function() {
	var cartCarousel = $('.jsCarousel');
	if ( cartCarousel.length <=0 ) {
		return false;
	}
	
	var gotAjaxResponse = function(responseText) {
		bnCustScr.injectRec(cartCarousel, responseText)
	};
	
	// populate basic rec params
	var recParams = {
			outputFormat:'HTML',
			guide:'Growl'
	}

	BaynoteAPI.getAjaxTag().send({
		bnURL: '/baynote/guiderest',
		onSuccess: gotAjaxResponse,
		onFailure: bnCustScr.gotAjaxError,
		params: recParams
	});
}

/**
 * @return category id for a spill page
 */
bnCustScr.getSpillCategory = function() {
	if (Crate.Spill.config.categoryId) {
		return Crate.Spill.config.categoryId;
	}
}

/**
 * @return whether this spill page wants to be displaying families
 */
bnCustScr.getSpillIsFamily = function() {
	if (Crate.Spill.config.isFamily) {
		return Crate.Spill.config.isFamily;
	}
}

bnCustScr.isSpillPage =  function() {
	return bnCustScr.getSpillCategory() > -1;
}

bnCustScr.getSpillAttrFilter = function() {
	var categoryFilter = 'category:' + this.getSpillCategory();
	var familyFilter;
	if ( this.getSpillIsFamily() ) {
		familyFilter = 'pagetype:family';
	} else {
		familyFilter = 'pagetype:sku';
	}
	return categoryFilter + ',' + familyFilter;
}

bnCustScr.removeSpillInjection = function() {
	var oldEids = bnPolicy.elementIds
	var newEids = [];
	for ( var i = 0 ; i < oldEids.length ; i++ ) {
		var eid = bnPolicy.elementIds[i];
		if ( eid != 'jsEndlessScroll' ) {
			newEids.push(eid);
		}
	}
	bnPolicy.elementIds = newEids;
}

bnCustScr.testVersion = '5';
/**
 * get the condition from the cookie
 * 
 * @return the cookie condition of it exists, or null if it doesn't
 */
bnCustScr.getCookieCondition = function() {
	var bnABCookie = BaynoteAPI.getCookieValue('bn_cratebnmode');
	var bnTestVersion = BaynoteAPI.getCookieValue('bn_testVersion');
	
	// if our testVersion fails to match, delete the cookie
	if (bnTestVersion != bnCustScr.testVersion) {
		BaynoteAPI.removeCookie('bn_cratebnmode');
	} else {
		// otherwise, return its value
		return bnABCookie;
	}
}

/**
 * Set the cookie condition
 * 
 * @param mode
 *            mode to set on the cookie
 */
bnCustScr.setCookieCondition = function(mode) {
	var d  = new Date();
	d.setDate(d.getDate() + 2);
	BaynoteAPI.setCookie('bn_cratebnmode',mode,'/',d.toUTCString());
	BaynoteAPI.setCookie('bn_testVersion',bnCustScr.testVersion,'/',d.toUTCString());
}

//cookie for viewed products
function bn_setViewCookie(){
	//only capture product url
	var myRegex = /\.com\/([^\/]+\/)+s([0-9]+)([?#].*|$)/ig;
	var match = myRegex.exec(document.URL);
	var pid = "";
	if (BaynoteAPI.isNotEmpty(match)){
		pid = match[2];
	}
	if (BaynoteAPI.isNotEmpty(pid)){
		var productUrl = "http://www.crateandbarrel.com/product.aspx?s=" + pid;
		var cookieString = BaynoteAPI.getCookieValue("bn_vp");		
		var newValue = new Array();
		newValue.push(productUrl);
		if (BaynoteAPI.isNotEmpty(cookieString)){
			var cookieValue = cookieString.split(",");
			//read 2 more urls from cookie when available
			for (var i=0; i<2; i++){
				var head = cookieValue.shift();
				if (BaynoteAPI.isNotEmpty(head)){
					//discard duplicated url
					if (head == productUrl){
						i--;
					}
					else {
						newValue.push(head);
					}
				}
				else {
					break;
				}
			}
		}
		var d  = new Date();
		d.setDate(d.getDate() + 180);
		BaynoteAPI.setCookie('bn_vp',newValue,'/',d.toUTCString());
	}
}

function myPreHandler(tag) {
	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.OBSERVER_TAG) {
		var jsCondition = 'I';
		var cookieCondition = 'I';
		/*  CE 2013-01-09 comment out all condition logic
		// pull the preexisting value of the condition cookie before we change it
		var bnABCookie = bnCustScr.getCookieCondition();
		if ( bnABCookie ) {
			cookieCondition = bnABCookie;
		}
		
		// by default, condition is 'I';
		tag.conditionName = 'I';
		// if we find a CrateBNMode, use that as condition
		if ( typeof CrateBNMode != 'undefined' && CrateBNMode ) {
			tag.conditionName = CrateBNMode;
			jsCondition = CrateBNMode;
			// If crate gave us a condition, save it into a cookie bn_cratebnmode
			bnCustScr.setCookieCondition(CrateBNMode);
		} else {
			// if we find a saved cratebnmode in a cookie, use that as condition
			if ( bnABCookie ) {
				tag.conditionName = cookieCondition;
			}
		}
		
		// append condition values to order id for charles's debugging purposes
		if ( window.bnOrderId ) {
			window.bnOrderId = window.bnOrderId + '_' + jsCondition + cookieCondition;
		}
		tag.attrs.jsCondition = jsCondition;
		tag.attrs.cookieCondition = cookieCondition;
		*/

		if ( bnCustScr.isSpillPage() ) {
			tag.docAttrs.obsSpillCategory = bnCustScr.getSpillCategory();
			tag.docAttrs.obsSpillIsFamily = bnCustScr.getSpillIsFamily();
		}
		
		bn_setViewCookie();
	}

	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.GUIDE_TAG) {
		/* CE 2013-01-09 comment out both lines below
		tag.ctxAttrList='*';
		return bnCustScr.shouldInject;
		*/
	}

	return true;
}
/* CE 2013-01-09 comment out all below

function myPostHandler(tag) {
	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.GUIDE_TAG) {
		Crate.QuickLook.init()
	}
	return true;
}

bnCustScr.init();

*/

// register the event handler
baynote_globals.onBeforeTagShow.push(myPreHandler);
//baynote_globals.onTagShow.push(myPostHandler);
bnResourceManager.registerResource(baynote_globals.ScriptResourceId);