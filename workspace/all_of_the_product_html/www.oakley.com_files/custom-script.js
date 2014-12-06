// Baynote custom-script $Revision: 1.4 $

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

function bn_onClickHandler(clickedElement, exitInfo) {
	var pageUrl = BaynoteAPI.getFullURL();
	var exitResult = false;
	
	if (typeof(bnObserver) != 'undefined' && typeof(bnObserver.defaultExitConfirmation) != 'undefined') {
		exitResult = bnObserver.defaultExitConfirmation(clickedElement, exitInfo);
		if (!exitResult) {
			// if we get a false, short-circuit and return false
			return exitResult;
		}
	} else {
		// if default exit handler didn't exist, short-circuit and return false
		return exitResult;
	}	
	
	var clickProdId = "";
	// Pop up the tree until we find an actual "A" element (if any)
   	var target = clickedElement;
		while (target) {
    		if (target.tagName == "A") break;
    			target = target.parentNode;
		}
		if (!target) return false;
	var baynote_pid = target.getAttribute("baynote_pid");
	if (typeof(baynote_pid) != "undefined" && BaynoteAPI.isNotEmpty(baynote_pid)){
		clickProdId = baynote_pid;
	}

    
   	if (BaynoteAPI.isNotEmpty(clickProdId)){
		if (typeof exitInfo != 'undefined' && exitInfo != null) {
			exitInfo.attrs = exitInfo.attrs || {};     // Append and not replace the existing exitInfo.attrs
		}
		exitInfo.attrs.prodId = clickProdId;
		exitResult = true;
	}
    
	return true;
}

function myPreHandler(tag) { 
/*
	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.OBSERVER_TAG)   {	
		
		// Media Duration
		if (typeof(bnMediaDuration) != "undefined" && BaynoteAPI.isNotEmpty(bnMediaDuration)) 
			tag.attrs.expectedDuration = bnMediaDuration;
		
	} // code that runs before the observer fires
  
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
			if(typeof(bn_CartProducts) != "undefined" && BaynoteAPI.isNotEmpty(bn_CartProducts)){
				tag.listUrls = bn_CartProducts;	
			}
		}
		//do stuff before recs have loaded
	}
*/	
	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.OBSERVER_TAG)   {
        tag.exitConfirmation = bn_onClickHandler;  // Call custom exitConfirmation function within prehandler.
	}
	
    return true;      
} 

function myPostHandler(tag) {
/*
	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.GUIDE_TAG) {
		//do stuff after recs have loaded
	}
*/
	return true;
}

// register the event handler
baynote_globals.onBeforeTagShow.push(myPreHandler);
baynote_globals.onTagShow.push(myPostHandler); 
bnResourceManager.registerResource(baynote_globals.ScriptResourceId); 