gaGetCookie=function(name){
	var cookies=document.cookie.split("; ");
	var cmatch=[];
	var idx=0;
	var i=0;
	var namelen=name.length;
	var clen=cookies.length;
	for (i=0;i<clen;i++){
		var c=cookies[i];
		if ((c.substring(0,namelen+1))==(name+"=")){
			cmatch[idx++]=c;
		}
	}
	var cmatchCount=cmatch.length;
	if (cmatchCount>0){
		idx=0;
		if ((cmatchCount>1)&&(name==this.fpc)){
			var dLatest=new Date(0);
			for (i=0;i<cmatchCount;i++){
				var lv=parseInt(this.dcsGetCrumb(cmatch[i],"lv"));
				var dLst=new Date(lv);
				if (dLst>dLatest){
					dLatest.setTime(dLst.getTime());
					idx=i;
				}
			}
		}
		return unescape(cmatch[idx].substring(namelen+1));
	}
	else{
		return "";
	}
}
gaGetCookieCrumb=function(cval,crumb,sep){
	var aCookie=cval.split(sep||":");
	for (var i=0;i<aCookie.length;i++){
		var aCrumb=aCookie[i].split("=");
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return "";
}
gaCollectWTCookie=function(){
	if(typeof(pageTracker) !== "undefined"){
		var wtCookie = gaGetCookie("WT_FPC");
		if(wtCookie !== "") {
			pageTracker._setCustomVar(5,"WT_FPC",gaGetCookieCrumb(wtCookie,"id")+"."+gaGetCookieCrumb(wtCookie,"ss"),1);
		}
	}
}
gaSetSessionCookie = function(name, value) {
    var currentDate = new Date();
	var expirationDate = new Date(currentDate.getTime()+1800000);
    var newCookie = name+"="+value+"; expires="+expirationDate.toGMTString()+"; path=/;";
    document.cookie = newCookie;
}
gaClimbDOM=function(evt,tag){
	var e=evt.target||evt.srcElement;
	while (e.tagName&&(e.tagName!=tag)){
		e=e.parentElement||e.parentNode;
	}
	return e;
}
gaBindFunction=function(event,func){
	if ((typeof(func)=="function")&&document.body){
		if (document.body.addEventListener){
			document.body.addEventListener(event, func.gabind(this), true);
		}
		else if(document.body.attachEvent){
			document.body.attachEvent("on"+event, func.gabind(this));
		}
	}
}
gaBindEventTrackingFunctions=function(){
	var e=(navigator.appVersion.indexOf("MSIE")!=-1)?"click":"mousedown";
	gaBindFunction(e,this.gaTrackEvents);
}
gaTrackAddToBag=function(){
	if(typeof(pageTracker) !== "undefined"){
		var searchTerm = gaGetCookie("onsitesearch");
		if(searchTerm !== "")
		{
			pageTracker._trackEvent("Search","Conversion",searchTerm);
		}
		var headerElements = document.getElementsByTagName("h1"),
		    productName;
		for( var i = 0; i < headerElements.length; i++ ){
			if(headerElements[i].className === "prodName"){
				productName = headerElements[i].innerHTML.replace(/amp;/, "");
			}
		}
		pageTracker._trackEvent("Store","Add to Bag",productName);
	}
}
gaTrackSearch=function(){
	if(typeof(pageTracker) !== "undefined"){		
		var headerElements = document.getElementsById("h1");
		var site = querystring("site");
		var term = querystring("Ntt");
		var i = h1.indexOf(" found ") + 7;
		var results = h1.substring(i, (h1.indexOf(site, i) - 1));
		if(term != " ")
		{
			pageTracker._trackEvent(site,"Search",term, results);
		}
	}
}
gaGetProductName=function() {
	var headerElements = document.getElementsByTagName("h1"),
		numHeaderElements = headerElements.length;
	for( var i = 0; i < numHeaderElements; i++ ){
		if(headerElements[i].className === "prodName"){
			return headerElements[i].innerHTML.replace(/amp;/, "");
		}
	}
}
gaTrackEvents=function(evt){
	if( typeof pageTracker !== "undefined" ) {
		evt=evt||(window.event||"");
		if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
			var e=gaClimbDOM(evt,"A");
			var i=gaClimbDOM(evt,"INPUT");
			var div = gaClimbDOM(evt,"DIV");
			var img = gaClimbDOM(evt,"IMG");
			var url = document.location.toString();
			
			// Add to Bag Clicks
			if (e.className === "addToBagButton"){
				gaTrackAddToBag();
			}
			// View Larger Clicks
			if (e.id === "viewLargerLink"){
				pageTracker._trackEvent("E-Commerce", "View Larger Click", gaGetProductName());
			}
			// Share This Product clicks
			if (div.className === "BVRRSocialBookmarkingLinks") {
				pageTracker._trackEvent("E-Commerce", "Share This Product - "+img.alt||"Unknown", gaGetProductName()); 
			}
			// Fun for Girls Links
			if (url.indexOf("/fun/") !== -1 && typeof e.href !== "undefined"){
				pageTracker._trackEvent("Fun for Girls", document.location+"", e.href);
			}
			// Movie Downloads
			if(e.className === "txtPaper"){
				pageTracker._trackEvent("Movies", "Download", e.href);
			}
			// Weekly Poll (Responses)
			if (i.className === "polloptions"){
				pageTracker._trackEvent("Fun for Girls", "Poll Answer");
			}
			// E-Cards Sent
			if (i.value === "Send E-Card" && url.indexOf("/ecards/createcard.php") != -1){
				var cardId = document.getElementById("cardID").value;
				var theme = document.getElementById("theme").value;
				pageTracker._trackEvent("Fun for Girls", "E-Card: "+theme, cardId);
			}
			// Marketing Image Click from Retail
			if (url.indexOf("/stores/") > -1 && div.className === "contentImage"){
				pageTracker._trackEvent("Retail","Marketing Image Click",img.alt||null);
			}
			// E-Commerce Marketing Widget
			var divParent = div.parentElement || div.parentNode;
			if (divParent.tagName === "DIV" && divParent.id === "widgetContainer"){
				pageTracker._trackPageview("/agshop/marketingWidget");
			}
			// Magazine Subscriptions
			if (e.innerHTML === "Subscribe today"){
				pageTracker._trackPageview("/fun/agmg/magazineSubscription");
			} else if (div.id === "subscribe") { // Magazine sample clicks
				pageTracker._trackPageview("/fun/agmg/magazineSample");
			}
			// Single Issue Magazine Order
			if (div.id === "bottomPromo"){
				pageTracker._trackPageview("/fun/agmg/singleIssue");
			}
			// Dining Reservations
			if (e.className === "actionLine" && url.indexOf("/stores/") != -1){
				pageTracker._trackPageview("/stores/diningReservationOnline");
			}
      // Onsite Search
      if ( e.innerHTML && e.innerHTML === "Search" ){
        var searchElem = document.getElementById("prodSearch:searchstr"),
            searchPhrase = (searchElem !== null && searchElem.value) ? searchElem.value : "Unknown",
            URLMatch = document.URL.match(/\/\/([^\?]*)/),
            sourceURL = (URLMatch !== null) ? URLMatch[1] : document.URL;
          pageTracker._trackEvent("Onsite Search",searchPhrase,sourceURL);
      }
			gaPauseBrowser(200);
		}
	}
}
gaPauseBrowser = function (milliseconds) {
	var oldDate = new Date(),
		currentDate;
	do { currentDate = new Date(); }
	while( (currentDate - oldDate) < milliseconds);
}
Function.prototype.gabind = function(obj){
	var method=this;
	var temp=function(){
		return method.apply(obj,arguments);
	};
	return temp;
}

gaBindEventTrackingFunctions();

// Search Results Page Tracking
gaTrackSearchResults = function() {
	if(window.location.pathname.match(/agshop\/html\/search/)){
		var headerElements = document.getElementsByTagName("h1"),
			numResults,
			elementFound = false,
			searchFound,
			searchTerm;
		for( var i = 0; i < headerElements.length && !elementFound; i++ ){
			if(headerElements[i].innerHTML.match(/Your search for/)){
				var theHeader = headerElements[i].innerHTML.replace(/[\r\f\n\t ]/g,"");
				numResults = theHeader.substring(theHeader.indexOf("found")+5,theHeader.indexOf("products"));
				searchTerm = theHeader.substring(theHeader.indexOf("for\"")+4,theHeader.indexOf("\"found"));
				if(numResults === "0"){
					searchFound = "Not Found";
				} else {
					searchFound = "Found";
				}
				if(typeof(pageTracker) !== "undefined"){
					pageTracker._trackEvent("Search",searchFound,searchTerm);
					gaSetSessionCookie("onsitesearch",searchTerm);
				}
				
				elementFound = true;
			}
		}
	}
}