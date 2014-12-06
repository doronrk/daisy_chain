/*
 * function for search box failover check
function bnCustomSearchPolicyCheck() {
    // option 1: return based on policy variable on search (e.g. for A/B)
	// return typeof bnPolicy != 'undefined' && typeof bnPolicy.get('search') != 'undefined' && bnPolicy.get('search').ok;
	// option 2: return true always (e.g. no A/B) 		
	return true;
}
function bnCustomSearchPolicyCheck() {
} 
*/

/* 
 * function for simple A/B us vs them recommendation test.
 * 
 function baynote_policyLoaded()
{

   if(BaynoteAPI.getPolicy("guide","ok")){
      if(document.getElementById("bn_baynote_recs")) 
		(document.getElementById("bn_baynote_recs")).style.display = "block";
	  if(document.getElementById("bn_non_baynote_recs"))
		(document.getElementById("bn_non_baynote_recs")).style.display = "none";
   } else {
	if(document.getElementById("bn_non_baynote_recs"))
		(document.getElementById("bn_non_baynote_recs")).style.display = "block";
      if(document.getElementById("bn_baynote_recs")) 
		(document.getElementById("bn_baynote_recs")).style.display = "none";
		}	 
	
}
 * */

/*
 * 
 * 
//Custom method to find meta content by meta name
function bn_getMeta(meta_name) {
	var metas = document.getElementsByTagName("meta");
	if (!metas) return;
	for (var i = 0; i < metas.length; i++) {
		if (!metas[i]) return;
		if (metas[i].name.toLowerCase() == meta_name.toLowerCase()) {
			return metas[i].content;
		}
	}
}
 * 
 */

function bn_getCanonical() {
	var links = document.getElementsByTagName("link");
	for (i = 0; i < links.length; i++) {
		if (links[i].rel == "canonical")
			return links[i].href;
	}
	return location.href;
}

function bn_setCookie(c_name,c_value,c_domain,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	if (c_domain != null && c_domain != "") {
		if (c_domain != "madewell.com")
			c_domain = location.hostname;
		document.cookie = c_name+"="+escape(c_value)+";domain="+c_domain+";path=/"+((expiredays==null)?"":";expires="+exdate.toGMTString());
	} else {
		document.cookie = c_name+"="+escape(c_value)+";path=/"+((expiredays==null)?"":";expires="+exdate.toGMTString());
	}
}

function bn_checkPolicy() {
	if (bnPolicy.get("inf","cd") != null) {
		var cdValue = bnPolicy.get("inf","cd");
		
	    bn_setCookie('bn_cd',cdValue,baynote_globals.cookieDomain,90);
	} 
	 bn_policyLoaded = true;
}

//search recursively until found a parent node is an anchor
function findParentAnchor(node){
	if (node){
		if (BaynoteAPI.isNotEmpty(node.tagName) && node.tagName == "A"){
			return node;
		}
		else {
			if (node.parentNode){
				return findParentAnchor(node.parentNode);
			}
			else {
				return "";
			}
		}
	}
	else {
		return "";
	}
}

//capture product id on guide click
function bn_onClickHandler(clicked, exitInfo) {
	if(clicked === undefined) return false;        // Check if clicked is not being called explicitly
	
	var clickGuideReq = "";
	
	if(typeof(bnObserver) != 'undefined' && typeof(bnObserver.defaultExitConfirmation) != 'undefined') {
		exitResult = bnObserver.defaultExitConfirmation(clicked,exitInfo);
		if (!exitResult) return false;
	}
	
	// Look for the first anchor tag

   var node = findParentAnchor(clicked);
   
   // Check to see if this is a baynote guide
   if (BaynoteAPI.isNotEmpty(node.tagName) && node.tagName == "A") {
	   clickGuideReq = node.getAttribute("baynote_req");
   }
   
   if (BaynoteAPI.isNotEmpty(clickGuideReq)) {
	   var targetUrl = node.getAttribute("href");
	   var myRegex = /.*\/PRDOVR~(.+)\/(.+)\.jsp/ig;
	   var match = myRegex.exec(targetUrl);
	   var pid = "";
	   if (BaynoteAPI.isNotEmpty(match)){
		   pid = match[1];
	   }
	   if (BaynoteAPI.isNotEmpty(pid)){
		   if (typeof exitInfo != 'undefined' && exitInfo != null) {
			   exitInfo.attrs = exitInfo.attrs || {};     // Append and not replace the existing  exitInfo.attrs
		   }
		   exitInfo.attrs.prodId = pid;
	   }
   }

   return true;
}

function myPreHandler(tag) { 

	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.OBSERVER_TAG)   {	
/*		
		// Media Duration
		if (typeof(bnMediaDuration) != "undefined" && BaynoteAPI.isNotEmpty(bnMediaDuration)) 
			tag.attrs.expectedDuration = bnMediaDuration;
*/
		var cookieExpires = new Date();
		cookieExpires.setDate(cookieExpires.getDate() + 180);
		if (!BaynoteAPI.getPolicy("guide","ok")) {
			BaynoteAPI.setCookie('bn_guide','false','/',baynote_globals.cookieDomain,cookieExpires);
		} else {
			BaynoteAPI.setCookie('bn_guide','true','/',baynote_globals.cookieDomain,cookieExpires);
		}
		if (typeof bn_checkPolicy != 'undefined')
			bn_checkPolicy(); 
		tag.url = bn_getCanonical();
		tag.exitConfirmation = bn_onClickHandler;
		
	} // code that runs before the observer fires
/*
	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.GUIDE_TAG)   {	
		
		var query = BaynoteAPI.getURLParam("q");
		if (query != "") 
		tag.query = query;	
		
		var bn_locHref = BaynoteAPI.getFullURL();

		if(bn_locHref.match(/(https?)(:\/\/.*)(site.*)/) )  {
           	tag.url = bn_locHref.replace(/(https?)(:\/\/.*)(site.*)/, "$1://www.$3");
        } 
		
		if(bn_locHref.match(/(https?)(:\/\/)([0-9.]+)(.*)/))  {
	       tag.url = bn_locHref.replace(/(https?)(:\/\/)([0-9.]+)(.*)/, "$1://www.site.com$4");
		}
		//shopping cart recs
		if(bn_location_href.search("^https?://www\.mysite\.com\/shoppingcart.aspx.*", "i") >= 0){
			
			if(typeof(bn_urlList) != "undefined" && BaynoteAPI.isNotEmpty(bn_urlList)){
				tag.listUrls = bn_urlList;
				
			}
			
		}
	
		//do stuff before recs have loaded
	}
*/	
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