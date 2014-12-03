function bn_setCookie(c_name,c_value,c_domain,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	if (c_domain != null && c_domain != "") {
		if (c_domain != baynote_globals.cookieDomain)
			c_domain = location.hostname;
		document.cookie = c_name+"="+escape(c_value)+";domain="+c_domain+";path=/"+((expiredays==null)?"":";expires="+exdate.toGMTString());
	} else {
		document.cookie = c_name+"="+escape(c_value)+";path=/"+((expiredays==null)?"":";expires="+exdate.toGMTString());
	}
}

function bn_updateCartCookie(currentUrl) {
	if(BaynoteAPI.isNotEmpty(currentUrl)){
		var cookieString = BaynoteAPI.getCookieValue("bn_ch");		
		var newValue = new Array();
		newValue.push(currentUrl);
		if(BaynoteAPI.isNotEmpty(cookieString)){
			var cookieValue = cookieString.split(",");
			var head = cookieValue.shift();
			if (BaynoteAPI.isNotEmpty(head)){
				newValue.push(head);
			}
			head = cookieValue.shift();
			if (BaynoteAPI.isNotEmpty(head)){
				newValue.push(head);
			}
		}
		bn_setCookie('bn_ch',newValue,baynote_globals.cookieDomain,45);
	}
}

function bn_checkPolicy() {
	if (bnPolicy.get("inf","cd") != null) {
		var cdValue = bnPolicy.get("inf","cd");
		
	    bn_setCookie('bn_cd',cdValue,baynote_globals.cookieDomain,90);
	} 
	 bn_policyLoaded = true;
}

function bn_onClickHandler(clickedElement, exitInfo){
	if(clickedElement === undefined) return false;
	var exitResult = false;
	
	if(typeof(bnObserver) != 'undefined' && typeof(bnObserver.defaultExitConfirmation) != 'undefined') {
		exitResult = bnObserver.defaultExitConfirmation(clickedElement,exitInfo);
	}
	
	if(clickedElement) {
		//when click on add to cart button, if using baynote guide, add canonical url to cookie
		var guide = BaynoteAPI.getCookieValue("bn_guide");
		if (BaynoteAPI.isNotEmpty(guide) && guide == "true"){
			if (BaynoteAPI.isNotEmpty(clickedElement.tagName) && clickedElement.tagName == "A") {
				var className = clickedElement.className.toLowerCase();
				if (className.indexOf("pdp-bag-button") >= 0){
					var links = document.getElementsByTagName('link');
					var currentUrl;
					for (var i=0; i<links.length; i++) { 
						if (links[i].getAttribute("rel").toLowerCase() == "canonical") { 
							currentUrl = links[i].getAttribute("href");
							break;
						} 
					}
					
					if (BaynoteAPI.isNotEmpty(currentUrl)){
						bn_updateCartCookie(currentUrl);
					}
				}
			}
		}
	}
	return exitResult;
}

function myPreHandler(tag) { 

	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.OBSERVER_TAG)   {	
		BaynoteAPI.setCookie("bn_u", "", "/", "Thu, 01 Jan 1970 00:00:00 GMT", ".jcrew.com");
		BaynoteAPI.setCookie("bn_cd", "", "/", "Thu, 01 Jan 1970 00:00:00 GMT", ".jcrew.com");
		if (baynote_globals.cookieDomain != "jcrew.com" && baynote_globals.cookieDomain != "www.jcrew.com") {
			var userId = bnUser.getUserId(tag);
			var c_domain = location.hostname;
			bn_setCookie('bn_u', userId, c_domain, 10 * 365);
		}
		
		if (!BaynoteAPI.getPolicy("guide","ok")) {
			bn_setCookie('bn_guide','false',baynote_globals.cookieDomain,180);
		} else {
			bn_setCookie('bn_guide','true',baynote_globals.cookieDomain,180);
		}
		bn_checkPolicy();
		
		tag.exitConfirmation = bn_onClickHandler;
	} // code that runs before the observer fires
return true;      
} 

function myPostHandler(tag) {
/*
	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.GUIDE_TAG)   {	
		//do stuff after recs have loaded
		}
*/
	return true;
}

   // register the event handler
baynote_globals.onBeforeTagShow.push(myPreHandler);
baynote_globals.onTagShow.push(myPostHandler); 
bnResourceManager.registerResource(baynote_globals.ScriptResourceId); 