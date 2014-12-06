var s_tc_TM_OMNI=new TagContainer('TM_OMNI');

function TagContainer(n){var t=this,w=t.w=window;t.d=w.document;t._c='s_t';if(!w.s_c_il){w.s_c_il=[];w.s_c_in=0}t._il=w.s_c_il;t._in=w.s_c_in;t._il[t._in]=t;w.s_c_in++;t.tcn=t.l=0;t.stc=function(n){
var t=this,l=t.w.s_c_il,i,x;t.tcn=n;if(l)for(i=0;i<l.length;i++){x=l[i];if(x&&x._c=='s_l'&&x.tagContainerName==n)t.l=x}};t.stc(n);t.xd=function(s){var t=this,x=0;if(
t.d.implementation&&t.d.implementation.createDocument)x=(new DOMParser).parseFromString(s,'text/xml');else if(t.w.ActiveXObject){x=new ActiveXObject('Microsoft.XMLDOM');x.async='false';x.loadXML(s)}
return x};t.xe=function(x,t){var a,b=[],i,j;for(i=0;i<2;i++){if(i>0)t=t.toLowerCase();a=x.getElementsByTagName(t);if(a)for(j=0;j<a.length;j++)b[b.length]=a[j]}return b};t.xt=function(x){var t=this,b=
"",l,i;l=x.childNodes;if(l)for(i=0;i<l.length;i++)b+=t.xt(l[i]);if(x.data)b+=x.data;return b};t.cp=function(x){var t=this,tn=Math.floor((new Date).getTime()/1000),ts=x.s,te=x.e,tp=1,l=t.d.location,h=
l.hostname,hm=x.h,hp=1,p=l.pathname,pm=x.p,pp=1,q=l.search,qm=x.q,qp=1,qi,qv,c=t.d.cookie,cm=x.c,cp=1,ci,cv,i;if(ts)tp=(tn>=ts&&(!te||tn<=te));if(hm){hp=0;if(h){i=0;while(!hp&&i<hm.length){if(
h.indexOf(hm[i])>=0)hp=1;i++}}}if(pm){pp=0;if(p){i=0;while(!pp&&i<pm.length){if(p.indexOf(pm[i])>=0)pp=1;i++}}}if(qm){qp=0;if(q){if(q.substring(0,1)=='?')q=q.substring(1);q='&'+q+'&';i=0;while(
!qp&&i<qm.length){qi=q.indexOf('&'+qm[i].k+'=');if(!qm[i].v&&qi<0)qi=q.indexOf('&'+qm[i].k+'&');if(qi>=0)if(qm[i].v){qv=q.substring(qi+qm[i].k.length+2);qi=qv.indexOf('&');if(qi>=0){qv=unescape(
qv.substring(0,qi));if(qv==qm[i].v)qp=1}}else qp=1;i++}}}if(cm){cp=0;if(c){c=';'+c+';';c=c.split('; ').join(';');i=0;while(!cp&&i<cm.length){ci=c.indexOf(';'+cm[i].k+'=');if(!cm[i].v&&ci<0)ci=
c.indexOf(';'+cm[i].k+';');if(ci>=0)if(cm[i].v){cv=c.substring(ci+cm[i].k.length+2);ci=cv.indexOf(';');if(ci>=0){cv=unescape(cv.substring(0,ci));if(cv==cm[i].v)cp=1}}else cp=1;i++}}}return(
tp&&hp&&pp&&qp&&cp)};t.cl=[];t.cn=t.cpn=0;t.crt=0;t.bl=[];t.crl=function(cn,cpn){var t=this;if(cn==t.cn&&cpn==t.cpn)t.cr()};t.cr=function(){var t=this,d=t.d,b,c,p,n=1,o,u,x,y,l,i;if(t.cl.length>0){if(
!d.body){if(!t.crt)t.crt=setTimeout(function(){t.crt=0;t.cr()},13)}else{b=d.body;while(n&&t.cn<t.cl.length){c=t.cl[t.cn];if(t.cdwb){u=t.cdwb;t.cdwb=0;u='<div>'+u.replace(/&/g,'&amp;').replace(
/<img /gi,'<IMG ').replace(/<\/img>/gi,'</IMG>').replace(/<script /gi,'<SCRIPT ').replace(/<script>/gi,'<SCRIPT>').replace(/<\/script>/gi,'</SCRIPT>').replace(/<iframe /gi,'<IFRAME ').replace(
/<\/iframe>/gi,'</IFRAME>')+'</div>';x=t.xd(u);l=t.xe(x,'IMG');for(i=0;i<l.length;i++){u=l[i].getAttribute('src');if(u)c.p.splice(t.cpn,0,{t:'i',u:u})}l=t.xe(x,'SCRIPT');for(i=0;i<l.length;i++){u=l[i]
.getAttribute('src');if(u)c.p.splice(t.cpn,0,{t:'s',u:u});else{u=t.xt(l[i]);if(u)c.p.splice(t.cpn,0,{t:'c',c:u})}}l=t.xe(x,'IFRAME');for(i=0;i<l.length;i++){u=l[i].getAttribute('src');if(u)c.p.splice(
t.cpn,0,{t:'f',u:u})}}if((t.cpn>0||!c.x||t.cp(c.x))&&c.p&&t.cpn<c.p.length){p=c.p[t.cpn];if(p.t=='b'&&p.u){u=p.u;o=new Image;t.bl[t.bl.length]=o;o.onload=function(){var i;for(i=0;i<t.bl.length;i++)if(
t.bl[i]&&t.bl[i].src==u){t.bl.splice(i,1);return}};o.src=u}if((p.t=='s'&&p.u)||(p.t=='c'&&p.c)){n=0;t.cpn++;u=p.u;o=d.createElement('script');o.type='text/javascript';o.setAttribute('async','async')
x='s_c_il['+t._in+']';y=x+'.crl('+t.cn+','+t.cpn+')';if(p.t=='s'){o.n=new Function(y);o.t=0;o.i=setInterval(function(){if(o.readyState=='loaded')o.t++;if(o.readyState=='complete'||o.t>2){o.c();o.n()}}
,50);o.c=function(){if(o.i){clearInterval(o.i);o.i=0}};o.onreadystatechange=function(){if(o.readyState=='complete'){o.c();o.n()}};o.onload=function(){o.c();o.n()};o.src=u}else o.text=x+'.cdw='+x+
'.d.write;'+x+'.cdwb="";'+x+'.d.write=function(m){'+x+'.cdwb+=m};'+"\n"+p.c+"\n"+x+'.d.write='+x+'.cdw;'+y;x=b;l=d.getElementsByTagName('HEAD');if(l&&l[0])x=l[0];if(x.firstChild)x.insertBefore(o,
x.firstChild);else x.appendChild(o)}if(p.t=='f'&&p.u){u=p.u;o=d.createElement('IFRAME');o.setAttribute('style','display:none');o.setAttribute('width','0');o.setAttribute('height','0');o.setAttribute(
'src',u);b.appendChild(o)}if(n)t.cpn++}else{t.cn++;t.cpn=0}}if(n&&t.l){for(x in t.l.wl)if(!Object.prototype[x]){u=t.w[x];x=t.l.wl[x];if(u&&x)for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!=
'function'||(''+x[i]).indexOf('s_c_il')<0)u[i]=x[i]}}for(i=0;i<t.l.wq.length;i++){c=t.l.wq[i];u=c.f;if(u)if(c.o)x=t.w[c.o];else x=t.w;if(x[u]&&typeof(x[u])=='function'&&(''+x[u]).indexOf('s_c_il')<0){
if(c.a)x[u].apply(x,c.a);else x[u].apply(x)}}}}}};}

window.onerror = function(msg) {
	$("body").attr("JSError", msg);
};
if ( typeof pmc != "undefined") {
	throw new Error("pmc object already exists. That suggests that this file has been included more than once.");
}
window.pmc = {};
pmc.userAgent = navigator.userAgent;
pmc.linkTrackEvents = '';
pmc.linkTrackVars = '';
pmc.memberProductType = "";
pmc.isSearchFormSubmitted = false;
pmc.businessDeliveryWarehouses = [{"name" : "Lynnwood, WA", "id" : "BD_115"}, {"name" : "Las Vegas, NV", "id" : "BD_563"}, {"name" : "Hawthorne, CA", "id" : "BD_564"}, {"name" : "Commerce, CA", "id" : "BD_569"}, {"name" : "San Diego, CA", "id" : "BD_578"}, {"name" : "Morrow, GA", "id" : "BD_579"}, {"name" : "Fife, WA", "id" : "BD_767"}, {"name" : "Hayward, CA", "id" : "BD_823"}, {"name" : "Phoenix, AZ", "id" : "BD_827"}];

pmc.realTypeOf = function(valueToTest) {
	if ( typeof (valueToTest) == "object") {
		if (valueToTest === null) {
			return "null";
		}
		if (valueToTest.constructor == (new Array).constructor) {
			return "array";
		}
		if (valueToTest.constructor == (new Date).constructor) {
			return "date";
		}
		if (valueToTest.constructor == (new RegExp).constructor) {
			return "regex";
		}
		return "object";
	}
	return typeof (valueToTest);
};

pmc.hasValue = function(valueToTest) {
	if (valueToTest === null) {
		return false;
	}
	if ( typeof (valueToTest) === 'undefined') {
		return false;
	}
	if ( typeof valueToTest === 'string' || pmc.realTypeOf(valueToTest) === 'array') {
		if (valueToTest.length <= 0) {
			return false;
		}
	}
	return true;
};

pmc.setDebugMode = function() {
	pmc.debug = false;
	if (window.location.search.indexOf("debug") > -1) {
		pmc.debug = true;
	}
};

pmc.debugStatus = function(msg) {
	if (pmc.debug === true) {
		if (msg) {
			console.log ("pmc.debugStatus: " + msg);
		}
	}
};

// Issue #15602
pmc.roundValue = function(value, n) {
	return Math.round(Math.pow(10, n) * value) / Math.pow(10, n);
};
// cookie stuff
pmc.setCookie = function(key, value, minutes) {
	var expires = "";
	var date = new Date();

	if (pmc.hasValue(minutes)) {
		date.setTime(date.getTime() + (minutes * 60000));
		//milliseconds per minute
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = key + "=" + value + expires + "; path=/";
};

pmc.readCookie = function(key) {
	var keyPlusEqual = key + "=";
	var cookieArray = document.cookie.split(';');
	var cookieArrayLength = cookieArray.length;
	var i = 0, c = "";

	for (; i < cookieArrayLength; i++) {
		c = cookieArray[i];
		c = $.trim(c);
		// if JQuery exists.
		if (c.indexOf(keyPlusEqual) == 0) {
			return c.substring(keyPlusEqual.length, c.length);
		}
	}
	return null;
};

pmc.removeCookie = function(name) {
	createCookie(name, "", -1);
};

pmc.setAccount = function(lHost, lPath) {
	pmc.account = "cwcostcotest";
	try {
		var currentEnvironment = pmc.readCookie("s_tagEnv");
		var isProduction = !( lHost.indexOf('vqa2') >= 0 || currentEnvironment === "dev" || currentEnvironment === "stage" );
		var isPharmacy = false;
		
		try {
			isPharmacy = ( $('#header img').first().attr('src').indexOf('costco-rx') >= 0 );
		} catch(error) { // not pharmacy
		}

		if (lHost.indexOf('w2sis-eco227') >= 0) {
			var logoImage = $('#TopNav1_imgCostcoLogo');
			var logoImageSource = "";
			var currentSuite = pmc.account;
			var warehouseID = getParam("whse");
	
			if (warehouseID.length > 0) {
				var x = new RegExp(warehouseID, "i");
				var warehouses = jQuery.grep(pmc.businessDeliveryWarehouses, function(obj) {
					return obj.id.match(x);
				});
				if (warehouses.length > 0) {
					currentSuite = "cwcbusinessdeltest";
				}
			} else {
				if (logoImage != null) {
					logoImageSource = logoImage.attr('src');
					if (logoImageSource != null && logoImageSource.indexOf('Top_Costco_BdLogo.gif') > 0) {
						currentSuite = "cwcbusinessdeltest";
					}
				}
	
				if ($('meta').filter(function() {
					return (this.content + "").match(/Business Delivery/i);
				}).length > 0) {
					currentSuite = "cwcbusinessdeltest";
				}
			}
			pmc.account = currentSuite;
		}
		if (lHost.indexOf('www2') >= 0) {
			var logoImage = $('#TopNav1_imgCostcoLogo');
			var logoImageSource = "";
			var currentSuite = pmc.account;
			var warehouseID = getParam("whse");
	
			if (warehouseID.length > 0) {
				var x = new RegExp(warehouseID, "i");
				var warehouses = jQuery.grep(pmc.businessDeliveryWarehouses, function(obj) {
					return obj.id.match(x);
				});
				if (warehouses.length > 0) {
					currentSuite = "cwcbusinessdelprod";
				}
			} else {
				if (logoImage != null) {
					logoImageSource = logoImage.attr('src');
					if (logoImageSource != null && logoImageSource.indexOf('Top_Costco_BdLogo.gif') > 0) {
						currentSuite = "cwcbusinessdelprod";
					}
				}
	
				if ($('meta').filter(function() {
					return (this.content + "").match(/Business Delivery/i);
				}).length > 0) {
					currentSuite = "cwcbusinessdelprod";
				}
			}
	
			pmc.account = currentSuite;
		} else if ( isPharmacy ) {
			pmc.account = isProduction ? "cwcpharmacyprod" : "cwcpharmacytest";
		} else {
			if (isProduction && location.host.indexOf(".com") > 0) {
				//pmc.trackingServer = "metrics.costco.com";
				//pmc.trackingServerSecure = "smetrics.costco.com";
				pmc.account = "cwcostcocomprod";
			} else if (location.host.indexOf(".ca") > 0) {
				pmc.trackingServer = "metrics.costco.ca";
				pmc.trackingServerSecure = "smetrics.costco.ca";
				pmc.account = isProduction ?  "cwcostcocaprod" : "cwcostcocatest";
			} else {
				pmc.account = "cwcostcotest";
			}
		}
	} catch(error){
		this.debugStatus("setAccount: " + error);
	}

	function getParam(sname) {
		var params = location.search.substr(location.search.indexOf("?") + 1);
		var sval = "";
		params = params.split("&");
		// split param and value into individual pieces
		for (var i = 0; i < params.length; i++) {
			temp = params[i].split("=");
			if ([temp[0]] == sname) {
				sval = temp[1];
			}
		}
		return sval;
	}
};

//pmc.trackingServer = "costco1.d2.sc.omtrdc.net";
pmc.trackingServer = "metrics.costco.com";
pmc.trackingServerSecure = "smetrics.costco.com";
pmc.setAccount(location.host, location.pathname);

pmc.newNameValuePair = function(key, val) {
	var new_nameValuePair = function(key, val) {
		this.name = key;
		this.value = val;
		this._toString = function() {
			if (this.name === "" || this.value === "") {
				return "";
			} else {
				return this.name + "=" + this.value.substring(0,30).replace("|", "_").replace(";", "_").replace(",", "_");
			}
		};
	};

	return new new_nameValuePair(key, val);
};
pmc.nameValuePairArray = [];
/**
 toString() is a built in function in JavaScript.
 Rather than try to overload it, which might cause confusion,
 we are writing our own implementation with a unique name.

 The function does call a similar _toString() function in the nameValuePair object.

 @method nameValuePairArrayToString
 @param arr : an array of nameValuePair objects
 @param separator : the string representation of the character to separate each instance.
 Common options are the pipe "|", comma ",", semi-colon ";", new line "\n", and tab "\t".
 @return string
 **/
pmc.nameValuePairArrayToString = function(arr, separator) {
	var completeString, current, len, i = 0;

	completeString = "";
	current = {};
	if (arr) {
		len = arr.length;
	}

	for (; i < len; i++) {
		current = arr[i];
		completeString += current._toString();

		if (i < len - 1) {// no need for the separator on the last one.
			completeString += separator;
		}
	}
	return completeString;
};

/**
 @method arrayToString
 @param arr : an array
 @param separator : the string representation of the character to separate each instance.
 Common options are the pipe "|", comma ",", semi-colon ";", new line "\n", and tab "\t".
 @return string
 **/
pmc.arrayToString = function(arr, separator) {
	var completeString = "", len = arr.length, i = 0;

	for (; i < len; i++) {
		completeString += arr[i];

		if (i < len - 1) {// no need for the separator on the last one.
			completeString += separator;
		}
	}
	return completeString;
};

/*
 * Product object code section. The result will be a string that matches the products string
 * as defined by Adobe SiteCatalyst.
 *
 */
pmc.product = function() {
	this.category = "";
	// NEVER USE THIS. Always leave this as empty space. Use merchandising eVars instead
	this.prodSku = "";
	this.totalQuantity = "";
	this.totalPrice = "";
	this.eventIncrementer = [];
	// for events
	this.merchandisingEvar = [];
	// for eVars
};
pmc.productArray = [];
//[pmc.product];

pmc.getProductString = function(pArray) {
	var completeString = "", currentProd = {}, paLen = pArray.length, i = 0;
	try {	
		for (; i < paLen; i++) {
			currentProd = pArray[i];
			currentProd.category = "";
			// Always empty.
			completeString += currentProd.category + ";";
			completeString += currentProd.itemNumber + ";";
			if (pmc.linkTrackEvents.indexOf(',purchase') >= 0) {
				try {
					quantity = currentProd.quantity * 1;
					if(pmc.lang == "en") {
						price = currentProd.price.replace(',', '').replace('$', '') * 1;
					}
					if(pmc.lang == "fr") {
						price = currentProd.price.replace(' ', '').replace(' ','').replace(',', '.').replace('$', '') * 1;
					}
					
					if (!isNaN(quantity) && !isNaN(price)) {
						// Issue #15602
						price = pmc.roundValue((price * quantity), 2);
					} else {
						if (isNaN(quantity)) {
							quantity = '';
						}
						if (isNaN(price)) {
							price = '';
						}
					}
					completeString += quantity + ";";
					completeString += price + ";";
				} catch(errorMessage) {
					completeString += ";;";
				}
			} else {
				completeString += ";;";
			}
			completeString += ";";
	
			//pmc.nameValuePairArrayToString(currentProd.eventIncrementer, "|") + ";";
			completeString += pmc.nameValuePairArrayToString(currentProd.merchandisingEvar, "|"); // no separator. See the next line.
	
			if (i < paLen - 1) {// no need for the separator on the last one.
				completeString += ",";
			}
		}
	} catch(error){
		this.debugStatus("getProductString: " + error);
	}
	return completeString;
};

pmc.addMetaTag = function(metaName, metaValue) {
	try {
		var metaElementArray = [];
		var metaElement = {}, metaElementArrayLength = 0;
		i = 0;
	
		if (!pmc.hasValue(pmc.headElement)) {// we can cache this.
			pmc.headElement = document.getElementsByTagName('head')[0];
			// only one element
		}
		if (pmc.hasValue(metaValue)) {
			metaElementArray = pmc.headElement.getElementsByTagName('meta');
			metaElementArrayLength = metaElementArray.length;
	
			// check to ensure it doesn't already exist
			for (; i < metaElementArrayLength; i++) {
				if (metaElementArray[i].name === metaName) {
					return;
				}
			}
			metaElement = document.createElement('meta');
			metaElement.name = metaName;
			metaElement.content = metaValue;
			pmc.headElement.appendChild(metaElement);
		}
	} catch(error){
		this.debugStatus("getProductString: " + error);
	}
};

// Issue #25701
pmc.GetPSTDateString = function() {
	var newDateString = "";
	try {
		//var testDate = new Date();
		var currentDate = new Date();
		//currentDate = new Date(testDate.getTime() + 1200*60000); // Australia East Coast
		var currentOffset = currentDate.getTimezoneOffset();
		//currentOffset = -600; // Australia East Coast
	
		var jan = new Date(2013, 0, 1);
		var jul = new Date(2013, 6, 1);
	
		var pstOffset = 420;
		
		if (currentOffset === jan.getTimezoneOffset()) {
			pstOffset = 480;
		}
		var totalOffset = currentOffset - pstOffset;
	
		var newDate = new Date(currentDate.getTime() + totalOffset*60000);
		// Add one to the month to adjust for the zero based month array.
		newDateString = newDate.getFullYear() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getDate();
	} catch(error){
		this.debugStatus("GetPSTDateString: " + error);
	}
	return newDateString;
};

// Issue #14907
pmc.roundStar = function(floatNum) {
	var roundedNumber = "No Rating";
	try {
		if (pmc.hasValue(floatNum)) {
			if (floatNum.length > 0) {
				floatNum = floatNum.replace(" Stars", "");
			}
			if (!isNaN(floatNum)) {
				roundedNumber = Math.round(floatNum * 10) / 10;
				roundedNumber = roundedNumber + " Stars";
			}
		}
	} catch(error){
		this.debugStatus("roundStar: " + error);
	}
	return roundedNumber;
};

pmc.urlDecode = function(searchKeyWords) {
	return decodeURIComponent((searchKeyWords + '').replace(/\+/g, ' '));
};

pmc.setCampaignCookie = function(key, value) {
	if (pmc.readCookie(key) !== value) {
		pmc.setCookie(key, value, 30);
		return true;
	}
	return false;
};
// CustomCoreJavascript.js end
// Custom Code : Page Scrape RELOCATED begin 
pmc.getProductIDFromDetailsPage = function() {
	try {
		var productID = "";
		if (!pmc.hasValue(productID)) {
			productID = $("input[name=addedItem]").val();
		}
		if (pmc.hasValue(window.partNumber)) {
			productID = window.partNumber;
		}
		if (!pmc.hasValue(productID)) {
			// taxonomy match for a product details page.
			var headLinkCanonical = $("head link[rel=canonical]");
	
			if (headLinkCanonical.length > 0) {
				var hrefString = headLinkCanonical[0].href;
				if (hrefString.length > 0 && hrefString.indexOf("product.") >= 0) {
					productID = hrefString.split("product.")[1].split(".")[0];
				}
			}
		}
		
		productID = $.trim(productID);
		
		if (!pmc.hasValue(productID)) {
			var hrefString = window.location.pathname;
			if (hrefString.length > 0 && hrefString.indexOf("product.") >= 0) {
				productID = hrefString.split("product.")[1].split(".")[0];
			}
		}
	
		if(productID) {
			return productID;			
		} else {
			return "Unknown";
		}
	} catch(error){
		this.debugStatus("getProductIDFromDetailsPage: " + error);
	}
};

pmc.getProductNameFromDetailsPage = function() {
	try {
		if (this.isTablet === true) {
			return $.trim($("div#divProductTitle").text());
		} else if (this.isMobile === true) {
			return $.trim($("div.pTitle").text());
		} else {
			return $.trim($("div.product-info h1").text());
		}
	} catch(error){
		this.debugStatus("getProductNameFromDetailsPage: " + error);
	}
};

pmc.getProductDetailTypeFromDetailsPage = function() {
	try {
		// product detail type
		var productDetailType = "Single SKU";
	
	
		if ($(".product-option").length > 0 || $("select.productOptions").length > 0 || $("select").filter(function() {
			return this.name.match("Option");
		}).length > 0) {
			productDetailType = "Variants"
		}
	
	
		if ($("input.bundle-product-qty").length > 0) {
			productDetailType = "Bundle"
		}
		return productDetailType;
	} catch(error){
		this.debugStatus("getProductDetailTypeFromDetailsPage: " + error);
	}
};


pmc.getProductRatingFromDetailsPage = function() {
	// product rating
	var starRating = "";
	var starRatingWrapper = {};
	try {
		if (this.isTablet === true) {
			starRatingWrapper = $("div.ratingOverall");
		} else if (this.isMobile === true) {
			starRatingWrapper = $("div.pRating img.BVImgOrSprite");
		} else {
			starRatingWrapper = $(".product-info img.BVImgOrSprite");
		}
	
		if (starRatingWrapper && starRatingWrapper.length > 0){
			var starRatingStringArray = starRatingWrapper.html().split("Overall Rating: ");
			if (starRatingStringArray.length <=1) {
				starRatingStringArray = starRatingWrapper.attr("title").split(" out of ");
				if (starRatingStringArray.length > 0){
					starRating = starRatingStringArray[0];
				}
			} else {
				if (starRatingStringArray.length > 1){
					starRating = starRatingStringArray[1];
				}				
			}

			if (this.hasValue(starRating)) {
				if (starRating === "") {
					return "No Rating";
				} else {
					if (!isNaN(starRating)) {
						starRating = Math.round(starRating * 10) / 10;
						return (starRating + " Stars");
					}
				}
			}
		}
	} catch(error){
		this.debugStatus("getProductRatingFromDetailsPage: " + error);
	}

	return "No Rating";
};


pmc.cartShip = function() {

	try {
		this.order = this.newOrder();
		// loop through all items
		var items = $("tr.item");
		for (var i = 0; i < items.length; i++) {	
			var orderItem = this.newOrderItem();
	
			orderItem.description = (jQuery(items[i]).find("td a")[1].title);

			var hrefString = $(items[i]).find("td a")[1].href;
			if (hrefString.length > 0 && hrefString.indexOf("product.") > 0) {
				orderItem.itemNumber = (hrefString.split("product.")[1].split(".")[0]);
			}

			orderItem.itemProductId = "";
			$(itemrow).find("td div.omniture div").each(function() { var prodId = this.getAttribute("sc.prodid"); if(prodId){ orderItem.itemProductId = prodId; }});
	
			orderItem.quantity = jQuery.trim((jQuery(items[i]).find("td").filter(function() {
				return this.id.match(/WC_MSOrderItemDetailsSummaryf_td_4/);
			})[0].innerHTML));
			orderItem.price = jQuery.trim((jQuery(items[i]).find("td").filter(function() {
				return this.id.match(/WC_MSOrderItemDetailsSummaryf_td_5/);
			})[0].innerHTML));
			orderItem.itemTotal = jQuery.trim((jQuery(items[i]).find("td").filter(function() {
				return this.id.match(/WC_MSOrderItemDetailsSummaryf_td_6/);
			})[0].innerHTML));	
	
			if (jQuery.grep(this.excludedItems, function(obj) {
				return obj.itemNumber.match(orderItem.itemNumber);
			}).length === 0) {
	
				this.order.orderItems.push(orderItem);
			} else {
				this.order.excludedItems.push(orderItem);
			}
	
		}
	
	
		var addresses = $("select.addressId");
		var addressIDs = new Array();
	
	
		for (var i = 0; i < addresses.length; i++) {
			addressIDs.push(addresses[i].value);
		}
	
	
		// unique addresses selected for shipping:
		this.numberOfAddressesSelected = $.grep(addressIDs, function(v, k) {
			return $.inArray(v, addressIDs) === k;
		}).length;
	

		this._cartShip();
	} catch(error) {
		this.debugStatus("this._cartShip(); undefined.");
	}


};


pmc.cartShipClick = function(myevent) {

	try {
		this.order = this.newOrder();
	

		// loop through all items
		var items = $("tr.item");
		for (var i = 0; i < items.length; i++) {
	
	
			var orderItem = this.newOrderItem();
	
	
			orderItem.description = (jQuery(items[i]).find("td a")[1].title);
			
			var hrefString = $(items[i]).find("td a")[1].href;
			if (hrefString.length > 0 && hrefString.indexOf("product.") > 0) {
				orderItem.itemNumber = (hrefString.split("product.")[1].split(".")[0]);
			}
			
			orderItem.itemProductId = "";
			$(itemrow).find("td div.omniture div").each(function() { var prodId = this.getAttribute("sc.prodid"); if(prodId){ orderItem.itemProductId = prodId; }});
	
			orderItem.quantity = jQuery.trim((jQuery(items[i]).find("td").filter(function() {
				return this.id.match(/WC_MSOrderItemDetailsSummaryf_td_4/);
			})[0].innerHTML));
			orderItem.price = jQuery.trim((jQuery(items[i]).find("td").filter(function() {
				return this.id.match(/WC_MSOrderItemDetailsSummaryf_td_5/);
			})[0].innerHTML));
			orderItem.itemTotal = jQuery.trim((jQuery(items[i]).find("td").filter(function() {
				return this.id.match(/WC_MSOrderItemDetailsSummaryf_td_6/);
			})[0].innerHTML));
	
	
			if (jQuery.grep(this.excludedItems, function(obj) {
				return obj.itemNumber.match(orderItem.itemNumber);
			}).length === 0) {
				this.order.orderItems.push(orderItem);
			} else {
				this.order.excludedItems.push(orderItem);
			}
	
	
		}
	
	
		var addresses = $("select.addressId");
		var addressIDs = new Array();
	
	
		for (var i = 0; i < addresses.length; i++) {
			addressIDs.push(addresses[i].value);
		}
	
	
		// unique addresses selected for shipping:
		this.numberOfAddressesSelected = $.grep(addressIDs, function(v, k) {
			return $.inArray(v, addressIDs) === k;
		}).length;

		this._cartShipClick(myevent);
	} catch(error) {
		this.debugStatus("this._cartShipClick(); undefined.");
	}
};

pmc.cartPay = function() {
	try {
		this._cartPay();
	} catch (error) {
		this.debugStatus("this._cartPay(); undefined.");
	}
};
// pmc.hpLap = function(){
// 	try{
// 		pmc.pageName = "HP laptop builder";
// 		pmc.pageType = "HP laptop builder | choose your computer";
// 	}catch (error) {
// 		this.debugStatus("HP lap error");
// 	}

// }

// pmc.hpDesk = function(){
// 	try{
// 		pmc.pageName = "HP desktop builder";
// 		pmc.pageType = "HP desktop builder | choose your computer";
// 	}catch (error) {
// 		this.debugStatus("HP desk error");
// 	}
// }

// pmc.hpSummary = function(){
// 	try{
// 		if($("div#ctosummarypricebox").find(":contains(Laptop)").length > 0 || $("div#ctosummarypricebox").find(":contains(laptop)").length > 0){
// 			pmc.pageName = "HP laptop builder";
// 			pmc.pageType = "HP laptop builder | summary";
// 		}
// 		else if($("ul#breadcrumbs li:contains(desktop)").length > 0 || $("ul#breadcrumbs li:contains(Desktop)").length > 0){
// 			pmc.pageName = "HP desktop builder";
// 			pmc.pageType = "HP desktop builder | summary";
// 		}
// 	}catch (error) {
// 		this.debugStatus("HP Summary error");
// 	}

// }

// pmc.hpConfigure = function(){
// 	try{
// 		if($("ul#breadcrumbs li:contains(Desktop)").length > 0 || $("ul#breadcrumbs li:contains(desktop)").length > 0){
// 			pmc.pageName = "HP desktop builder";
// 			pmc.pageType = "HP desktop builder | configure";
// 		}
// 		else if($("ul#breadcrumbs li:contains(laptop)").length > 0 || $("ul#breadcrumbs li:contains(Laptop)").length > 0){
// 			pmc.pageName = "HP laptop builder";
// 			pmc.pageType = "HP laptop builder | configure";
// 		}
// 	}
// 	catch (error){
// 		this.debugStatus("hp config undefined");
// 	}
// }

pmc.cartDeliveryOptions = function() {
	try {
		this._cartDeliveryOptions();
	} catch (error) {
		this.debugStatus("this._cartDeliveryOptions(); undefined.");
	}
};


pmc.cartReview = function() {
	try {
		// review page
		this.order = this.newOrder();	
	
		// loop through all purchased items
		var items = $("tr.ordertable");
		if (items.length === 0){
			items = $("#cartItemTable tr");
		}
		if (items.length === 0){
			items = $("div.row");
		}
		for (var i = 0; i < items.length; i++) {
	
			var itemrow = items[i];
			var orderItem = this.newOrderItem();	
	
			orderItem.description = jQuery.trim((jQuery(itemrow).find("td.reviewItemDescription span.title-medium").text()));
			if(!pmc.hasValue(orderItem.description)) {
				orderItem.description = jQuery.trim((jQuery(itemrow).find("div.item span.title-medium").text()));
			}
			orderItem.itemNumber = $.trim(jQuery(items[i]).find(".itemPartNumberInCart").text());
	
			orderItem.itemProductId = "";
			$(itemrow).find("div.omniture div").each(function() { var prodId = this.getAttribute("sc.prodid"); if(prodId){ orderItem.itemProductId = prodId; }});
/*			
			orderItem.shippingOptions = "";
			var shippingWrapper = $(itemrow).find("td.reviewShippingOption");
			if (shippingWrapper && shippingWrapper.length > 0) {
				var shippingWrapperHTML = shippingWrapper.html();
				if (shippingWrapperHTML && shippingWrapperHTML.length > 0 && shippingWrapperHTML.indexOf("<br") >= 0) {
					orderItem.shippingOptions = $.trim(shippingWrapperHTML.split("<br")[0]);
				}			
			}
	
			orderItem.quantity = $.trim(($(itemrow).find("td.reviewItemQuantity input").text()));

			var itemPriceWrapper = $(itemrow).find("td.reviewItemPrice");
			if (itemPriceWrapper.length <= 0){
				itemPriceWrapper = $(itemrow).find("td.cartItemPrice");
			}
			item.price = $.trim(itemPriceWrapper.text());
			var itemTotalWrapper = $(itemrow).find("td.reviewItemTotal");
			if (itemTotalWrapper.length <= 0){
				itemTotalWrapper = $(itemrow).find("td.cartItemTotal");
			}
			item.itemTotal = $.trim(itemTotalWrapper.text());	
*/
			if ($.grep(this.excludedItems, function(obj) {
				return obj.itemNumber.match(orderItem.itemNumber);
			}).length === 0) {
				this.order.orderItems.push(orderItem);
			} else {
				this.order.excludedItems.push(orderItem);
			}
		}
	
		this._cartReview();
	} catch (error) {
		this.debugStatus("this._cartReview(); undefined.");
	}
};


pmc.purchase = function() {

	try {
		this.debugStatus("in pmc.purchase:");
		this.order = this.newOrder();
	
		// confirmation page
		// order & member information
		/*
		if (this.isMobile) {
			this.order.number = $.trim($("div#cartTitle").siblings("div").children("div").filter(function() {
			return this.innerHTML.match("Order Number:");
			})[0].innerHTML).split(": ")[1];
	
	
			this.order.placedDate = ""; 	
	
			// placeholder since we can't get the membership number on the confirmation screen for mobile.
			if ($("div#summaryControl_Tablerow div").filter(function() {
				return jQuery.trim(this.innerHTML).match(/Non-Member Surcharge:/);
			}).length > 0) {
				;
			} else {
				this.order.membershipNumber = "Member Purchase - Mobile";
			};
		} else {
			*/
			var confirmationText = $(".title-largenumber").text();
			var orderNum = "NA";
			if (confirmationText) {
				orderNum = confirmationText.split(":")[1];
				if (orderNum) {
					this.order.number = $.trim(orderNum);
				}
			}
			
			var confirmationTable = $(".confirmation-table");
			if (confirmationTable) {
				confirmationTableArray = confirmationTable.find("td>span.bold");
				if (confirmationTableArray.length > 0) {
					this.order.placedDate = ""; //$.trim(confirmationTableArray[1].innerText);
					if (confirmationTableArray.length > 2) {
						this.order.membershipNumber = $.trim(confirmationTableArray[2].innerText);
					}
				}
			}
		//}
		this.debugStatus("in pmc.purchase:" + this.order.number + " | " + this.order.placedDate);
		// loop through all purchased items
		var items = $("tr.ordertable");
		if (this.isMobile === true) {
			var items = $("div.cartItem");
		}
		if (items.length === 0){
			items = $("#cartItemTable tr");
		}
		if (items.length === 0){
			items = $("div.row");
		}
		var itemsLength = items.length;
		for (var i = 0; i < itemsLength; i++) {
			var orderItem = this.newOrderItem();
			var orderItemInfoArray = $(items[i]).find("td");
			var orderItemInfoArrayLength = orderItemInfoArray.length;
	
			if (this.isMobile === true) {
				this.debugStatus("is mobile2");
				this.debugStatus($(items[i]).find(".itemDsc a").length);
				var descriptionWrapper = $(items[i]).find(".itemDsc a");
				if (pmc.hasValue(descriptionWrapper)) {
					this.debugStatus(descriptionWrapper.length + "= descriptionWrapper Length");
					orderItem.description = descriptionWrapper.text();
				}
				// orderItem.description = (jQuery(items[i]).find("div.cartItemDesc span")[0].innerHTML);
this.debugStatus(orderItem.description);
				orderItem.itemNumber = $(items[i]).find(".itemPartNumberPurchased").text();
				if(!orderItem.itemNumber || orderItem.itemNumber.length <= 0){
					var itemNum = $(items[i]).find(".itemDsc p").text();
					var itemNumStringArray = [];
					if (itemNum && itemNum.length > 0){
						itemNumStringArray = itemNum.split("#")
						if (itemNumStringArray.length > 1) {
							orderItem.itemNumber = $.trim(itemNumStringArray[1]);
						}
					}
				}
this.debugStatus(orderItem.itemNumber + "=itemNumber");
				//orderItem.itemNumber = $.trim(jQuery(items[i]).find("div.cartItemDesc").text().split("Item #")[1].match(/[0-9][0-9][0-9][0-9][0-9][0-9]/)[0]);
				//orderItem.shippingOptions = jQuery.trim((jQuery(items[i]).find("div.cartItemShip")[0].innerHTML.split(": ")[1]));
				orderItem.quantity = (jQuery(items[i]).find(".itemQty div.itemQuantityPurchased").text());
this.debugStatus(orderItem.quantity + "=qty")

				orderItem.itemProductId = "";
				$.trim($(items[i]).find("div.omniture div").each(function() { var prodId = this.getAttribute("sc.prodid"); if(prodId){ orderItem.itemProductId = prodId; }}));
this.debugStatus(orderItem.itemProductId + "=prodId");
				orderItem.price = $(items[i]).find(".itemPricePurchased").text();
this.debugStatus(orderItem.price + "=price");
				orderItem.itemTotal = $(items[i]).find(".itemTotal span.price").text();
this.debugStatus(orderItem.itemTotal + "=total");
			} else {
				for (var j = 0; j < orderItemInfoArrayLength;j++) {
					switch(j) {
					case 1:	
						orderItem.description = $(orderItemInfoArray[j]).find("a").text();
						if(!orderItem.description || orderItem.description.length <= 0){
							orderItem.description = $(orderItemInfoArray[j]).find("span:first-child").text();
						}
						orderItem.itemNumber = $(orderItemInfoArray[j]).find(".itemPartNumberInCart").text();
						if(!orderItem.itemNumber || orderItem.itemNumber.length <= 0){
							var itemNum = $(orderItemInfoArray[j]).find("p").text();
							var itemNumStringArray = [];
							if (itemNum && itemNum.length > 0){
								itemNumStringArray = itemNum.split("#")
								if (itemNumStringArray.length > 1) {
									orderItem.itemNumber = $.trim(itemNumStringArray[1]);
								}
							}
						}
						orderItem.itemProductId = "";
						$.trim($(orderItemInfoArray[j]).find("div.omniture div").each(function() { var prodId = this.getAttribute("sc.prodid"); if(prodId){ orderItem.itemProductId = prodId; }}));

						break;
					case 3:
						orderItem.shippingOptions = $.trim(orderItemInfoArray[j].innerText);
						break;
					case 4:
						orderItem.quantity = $.trim($(orderItemInfoArray[j]).find("span").not("[style]").text());
						break;
					case 5:
						var itemPrice = $(orderItemInfoArray[j]).find("span.price3").not("[style]");
						if (pmc.hasValue(itemPrice)) {
							var itemPriceDiv = itemPrice.find(".itemPricePurchased");
							if (pmc.hasValue(itemPriceDiv)) {
								orderItem.price = $.trim(itemPriceDiv.html().replace(" ",""));
							} else {
								orderItem.price = $.trim(itemPrice.html().replace(" ",""));
							}
						}		
						break;
					case 6:
						var itemPriceTot = $(orderItemInfoArray[j]).find("span.price").not("[style]");
						if (pmc.hasValue(itemPriceTot)) {
							var itemPriceDivTot = itemPrice.find(".itemPricePurchased");
							if (pmc.hasValue(itemPriceDivTot)) {
								orderItem.itemTotal = $.trim(itemPriceDivTot.html().replace(" ",""));
							} else {
								orderItem.itemTotal = $.trim(itemPriceTot.html().replace(" ",""));
							}
						}
						break;
					case 7:
						break;
	
					}
				}
			}
	
			if (jQuery.grep(this.excludedItems, function(obj) {
				return obj.itemNumber.match(orderItem.itemNumber);
				// === orderItem.itemNumber;
				//(jQuery(items[i]).find("td.item-description div.itemPartNumberPurchased")[0].innerHTML);
			}).length === 0) {
				this.order.orderItems.push(orderItem);
			} else {
				this.order.excludedItems.push(orderItem);
			}
		}
		this.debugStatus("in pmc.purchase:" + this.order.orderItems + " | " + this.order.excludedItems);
	
		this.debugStatus("in pmc.purchase:" + this.order.orderItems + " | " + this.order.excludedItems);
		//totals
		var price_table = $("table.order-total-summary tr td");
		if (pmc.isMobile === true) {
			price_table = $("div#summaryControl_Tablerow div");
		}
		for (var i = 0; i < price_table.length - 1; i++) {
			if (jQuery.trim(price_table[i].innerHTML.split("<")[0]) === "Subtotal:") {
				pmc.order.subtotal = jQuery.trim((price_table[i+1].innerHTML.split("<")[0]));
			}
			if (jQuery.trim(price_table[i].innerHTML.split("<")[0]) === "Less Promo Code:") {
				pmc.order.lessPromoCode = jQuery.trim((price_table[i+1].innerHTML.split("<")[0]));
			}
			if (jQuery.trim(price_table[i].innerHTML.split("<")[0]) === "Shipping & Handling:") {
				pmc.order.shippingAndHandling = jQuery.trim((price_table[i+1].innerHTML.split("<")[0]));
			}
			if (jQuery.trim(price_table[i].innerHTML.split("<")[0]) === "Tax:") {
				pmc.order.tax = jQuery.trim((price_table[i+1].innerHTML.split("<")[0]));
			}
			if (jQuery.trim(price_table[i].innerHTML.split("<")[0]) === "Order Total:") {
				pmc.order.total = jQuery.trim((price_table[i+1].innerHTML.split("<")[0]));
				break;
			}
			i++;
		}

		this.debugStatus("in pmc.purchase: calling this._purchase();");
		this._purchase();


	} catch (error) {
		this.debugStatus("this._purchase(); undefined.");
	}


};
// event30
// event31
// event32
// event33
// event34
pmc.visitFromEmail = function() {
	try {
		if (window.location.href.toUpperCase().indexOf("EMID=") > -1) {
			this.codeEmail = (window.location.href.toUpperCase().split("EMID=")[1].split("&")[0]);
			if (this.codeEmail && this.codeEmail.length > 0) {
				this._visitFromEmail();
			}
		}
	

	} catch(error) {
		this.debugStatus("visitFromEmail: " +error);
	}
};
pmc.visitFromExternal = function() {
	try {
		var searchString = window.location.search.toUpperCase();
		if (searchString.indexOf("EXTID=") > -1) {
			this.codeExternal = (searchString.split("EXTID=")[1].split("&")[0]);
			this._visitFromExternal();
		}
	} catch (error) {
		this.debugStatus("visitFromExternal: " + error);
	}
};
pmc.visitFromInternal = function() {
	if (window.location.href.toUpperCase().indexOf("COSTID=") > -1) {
		this.codeInternal = (window.location.href.toUpperCase().split("COSTID=")[1].split("&")[0]);
		try {
			this._visitFromInternal();
		} catch (error) {
			this.debugStatus("this._visitFromInternal(); undefined.");
		}
	}
};
pmc.visitFromSocial = function() {
	if (window.location.href.toUpperCase().indexOf("SOCID=") > -1) {
		this.codeSocial = (window.location.href.toUpperCase().split("SOCID=")[1].split("&")[0]);
		try {
			this._visitFromSocial();
		} catch (error) {
			this.debugStatus("this._visitFromSocial(); undefined.");
		}
	}
};
pmc.visitFromQR = function() {
	if (window.location.href.toUpperCase().indexOf("QRID=") > -1) {
		this.codeQR = (window.location.href.toUpperCase().split("QRID=")[1].split("&")[0]);
		try {
			this._visitFromQR();
		} catch (error) {
			this.debugStatus("this._visitFromQR(); undefined.");
		}
	}
};

// event9
pmc.countSearchResults = function() {
	try {
		this._countSearchResults();
	} catch (error) {
		this.debugStatus("this._countSearchResults(); undefined.");
	}
};

pmc.pageViewBreadcrumbs = function() {
	var tempString = "",
		breadcrumbs = {},
		tempObject = {};
		
	// breadcrumb text scraping
	this.breadcrumbs = new Array();


	if (this.isPC === true) {
		breadcrumbs = $("ul#breadcrumbs li");
	}


	if (this.isTablet === true) {
		breadcrumbs = $("div#divBreadCrumbs a");
		if (breadcrumbs.length <= 0) {
			breadcrumbs = $("title");		
		}
	}


	if (this.isMobile === true) {
		breadcrumbs = $("div#crumbsTop a.crumbLink span.crumbText");
		if (breadcrumbs.length <= 0) {
			breadcrumbs = $("#contentTitle h2");		
		} else {
			var contentTitle = $("#contentTitle h2");
			if(contentTitle != null && contentTitle.length > 0) { 
				breadcrumbs.push(contentTitle);
			}
		}
	}
	
	for (var i = 0; i < breadcrumbs.length; i++) {
		tempObject = $(breadcrumbs[i]).text();
		tempString = "";
		if (tempObject) {
			tempString = $.trim(tempObject);
		}
		if (tempString.length > 0) {
			this.breadcrumbs.push(tempString);
		}
	}	
};


pmc.getBreadcrumbsString = function() {
	var returnString = "";
	if (this.breadcrumbs) {
		returnString = returnString + "breadcrumb | " + this.breadcrumbs[0];
		for (var i = 1; i < this.breadcrumbs.length; i++) {
			returnString = returnString + ":" + this.breadcrumbs[i];
		}
	}
	// breadcrumb path - ex: breadcrumb|home:electronics:speakers
	return returnString;
};


pmc.getCategoryBreadcrumbsString = function() {
	var returnString = "";


	if (this.breadcrumbs) {
		var crumbs = new Array();
		jQuery.each(pmc.breadcrumbs, function(key, value) {
			crumbs.push(value);
		});
		returnString = crumbs.splice(1).join(":");
	}


	return returnString;
};


pmc.getBreadcrumbsLinkString = function(link) {
	if (this.breadcrumbs) {
		var index = pmc.breadcrumbs.indexOf($.trim($(link).text()));


		if (index === 0) {
			return "breadcrumb | " + pmc.breadcrumbs[index];
		} else if (index > 0) {
			var crumbs = new Array();
			jQuery.each(pmc.breadcrumbs, function(key, value) {
				crumbs.push(value);
			});
			return "breadcrumb | " + crumbs.splice(1, index).join(":");
		} else {
			return "Unknown";
		}
	} else {
		return "Unknown";
	}
};


pmc.pageViewSearchPage = function() {
	var queryString = window.location.search;
	var noResults = "";
	if (queryString) {
		if (queryString.indexOf("keyword") >= 0) {
			this.searchKeyword = queryString.split("keyword=")[1].split("&")[0];

			// event11
			if (this.isTablet === true) {
				noResults = $("div#divResultCount").filter(function() {
					return jQuery.trim(this.innerHTML).match(/sorry/);
				});
			} else if (this.isMobile === true) {
				noResults = $("span.itemCountText").filter(function() {
					return jQuery.trim(this.innerHTML).match(/sorry/);
				});
			} else {
				noResults = $("p").filter(function() {
					return jQuery.trim(this.innerHTML).match(/sorry/);
				});
			}
			
			if (noResults.length === 0) {
				if (this.isTablet === true) {
					noResults = $("div#divResultCount").filter(function() {
						if (pmc.lang === "en") {
							return jQuery.trim(this.innerHTML).match(/No results/);
						} else {
							return jQuery.trim(this.innerHTML).match(/Aucun/);
						}						
					});
				} else if (this.isMobile === true) {
					noResults = $("span.itemCountText").filter(function() {
						if (pmc.lang === "en") {
							return jQuery.trim(this.innerHTML).match(/No results/);
						} else {
							return jQuery.trim(this.innerHTML).match(/Aucun/);
						}
					});
				} else {
					noResults = $("p").filter(function() {
						if (pmc.lang === "en") {
							return jQuery.trim(this.innerHTML).match(/No results/);
						} else {
							return jQuery.trim(this.innerHTML).match(/Aucun/);
						}
					});
				}				
				
			}


			if (noResults.length > 0) {
				this.countSearchResults();
			}
		}
	}
};
pmc.pageViewWarehouseLocatorPage = function() {
	$("button#executeSearch.submit").bind("click", function(event) {
		this.warehouseLocatorFormSubmitLocation = "Warehouse Locator Page"
	});


	$("button#executeUpdate.submit").bind("click", function(event) {
		this.warehouseLocatorFormSubmitLocation = "Warehouse Locator Page"
	});
};


pmc.pageViewWarehouseLocatorDetailsView = function() {
	this.storeViewDetails();
};

pmc.pageViewProductDetailsPage = function() {
	
	var pageType = "Product Detail";
	
    if (($("h1").text().indexOf("Product Not Found") >= 0) || ($(".stockMsg").text().indexOf("Out of Stock") >= 0)) {
		alert("product not found");
	}
	
	this.pageName = pageType + " | " + this.getProductIDFromDetailsPage();
	this.pageType = pageType;
	
	this.productID = this.getProductIDFromDetailsPage();
	this.productName = this.getProductNameFromDetailsPage();
	this.productDetailType = this.getProductDetailTypeFromDetailsPage();
	// members-only attr and prodID attr
	// Issue #22100 - SE
	this.memberProductType = $("div.omniture > div.scMemberProductType").attr("sc.memberproducttype");
	this.prodId = $("div.omniture > div.scProdId").attr("sc.prodid");


	// PDF and Video Links
	var pdfLink = $("div.product-info a.pdf-link");
	var videoLink = $("div.product-info a.video-link"); // njh:review what is this used for?


	if (pdfLink.length > 0) {
		this.pdfLink = pdfLink[0].href;
	}


	if (videoLink.length > 0) {
		this.videoLink = videoLink[0].href;
	}

	$("div#BVCustomerRatings img.BVImgOrSprite").live('load', function() {(pmc.starRating = pmc.getProductRatingFromDetailsPage());
	});


	if (this.isTablet === true) {
		this.starRating = this.getProductRatingFromDetailsPage();
	}


	try {
		this._pageViewProductDetailsPage();
	} catch (error) {
		this.debugStatus("this._pageViewProductDetailsPage(); undefined.");
	}
};


pmc.pageViewCategoryPage = function() {


	// taxonomy match for a category page.
	this.pageName = "Category | " + jQuery("<div/>").html(window.location.pathname.split("/")[1].split(".html")[0]).text();
	this.pageType = "Category";


	try {
		this._pageViewCategoryPage();
	} catch (error) {
		this.debugStatus("this._pageViewCategoryPage(); undefined.");
	}
};


pmc.newOrderItem = function() {
	function pmc_orderItem() {
		this.description = "";
		this.itemNumber = "";
		this.shippingOptions = "";
		this.quantity = "";
		this.itemProductId = "";
		this.price = "";
		this.itemTotal = "";
	}


	return new pmc_orderItem();
};


pmc.newOrder = function() {
	function pmc_order() {
		this.number = "";
		this.placedDate = "";
		this.membershipNumber = "";
		this.orderItems = new Array();
		this.excludedItems = new Array();
		this.subtotal = "";
		this.lessPromoCode = "";
		this.shippingAndHandling = "";
		this.tax = "";
		this.total = "";
	}


	return new pmc_order;
};


pmc.refineBrowse = function(myevent, category, selection) {
	if (myevent.href.indexOf("refine=") > -1) {
		this.refine = jQuery.trim(myevent.href.split("refine=")[1].split("&")[0]);
	}
	if (myevent.href.indexOf("keyword=") > -1) {
		this.searchKeyword = jQuery.trim(myevent.href.split("keyword=")[1].split("&")[0]);
	}
	this.browseRefinementCategory = $.trim($("<div/>").html(category).text());


	if (selection !== null) {
		this.browseRefinementSelection = selection;
	} else {
		this.browseRefinementSelection = $.trim($("<div/>").html(myevent.innerHTML.split(" (")[0]).text());
	}

	try {
		this._refineBrowse(myevent);
	} catch (error) {
		this.debugStatus("this._refineBrowse(); undefined.");
	}
};
// event10
pmc.search = function(myevent, keyword) {
	this.debugStatus("this.search(); BEGIN");
	if (keyword === undefined || keyword === null) {
		this.debugStatus("this.search(); END - no keyword");
		return;
	} else if ($.trim(keyword) === "") {
		this.debugStatus("this.search(); END - no keyword");
		return;
	} else {
		this.searchKeyword = keyword;
		this.debugStatus("this.search(); END");
		if (this.debug === true) {
			this.debugStatus("this.searchKeyword: " + this.searchKeyword);
		}
		try {
			this._search(myevent);
		} catch (error) {
			this.debugStatus("this._search(); undefined.");
		}
	}
};
// event12
pmc.refineSearch = function(myevent, keyword, refine, category) {


	this.searchKeyword = keyword;
	//this.searchRefinementSelection = refine;
	this.searchRefinementSelection = $.trim($("<div/>").html(myevent.innerHTML.split(" (")[0]).text());
	this.searchRefinementCategory = category;


	this.debugStatus("this.refineSearch(); END");
	if (this.debug === true) {
		this.debugStatus("searchKeyword " + this.searchKeyword);
		this.debugStatus("searchRefinementSelection " + this.searchRefinementSelection);
		this.debugStatus("searchRefinementCategory " + this.searchRefinementCategory);
	}


	try {
		this._refineSearch(myevent);
	} catch (error) {
		this.debugStatus("this._refineSearch(); undefined.");
	}
};
// event13
// search result clickthough
pmc.clickSearchResult = function(myevent) {


	if (this.isMobile === true) {
		this.clickSearchResultRank = parseInt($(myevent).closest("div.PandaCell")[0].id.match(/[0-9]+/)[0]) + 1;
	} else {
		var tiles = $(".product-tile div.product-tile-image-container a");
		for (var i = 0; i < tiles.length; i++) {
			if (tiles[i] === myevent) {
				this.clickSearchResultRank = (i + 1);
				// relative position in search results grid.
			}
		}
	}


	try {
		this._clickSearchResult(myevent);
	} catch (error) {
		this.debugStatus("this._clickSearchResult(); undefined.");
	}
};
//event 14: interface interactions
pmc.interfaceClick = function(myevent, msg) {
	this.interfaceClickElement = msg;


	try {
		this._interfaceClick(myevent);
	} catch (error) {
		this.debugStatus("this._interfaceClick(); undefined.");
	}


};
// page taxonomy - exceptions
pmc.knownExceptions = [{
	"pathname" : "/MembershipAddFormView",
	"title" : "MembershipAddFormView"
}, {
	"pathname" : "/GiftMessageView",
	"title" : "GiftMessageView"
}, {
	"pathname" : "/NonAjaxAddressBookForm",
	"title" : "NonAjaxAddressBookForm"
}, {
	"pathname" : "/GenericError",
	"title" : "GenericError"
}, {
	"pathname" : "/Service/FeaturePage.aspx?ProductNo=11605477",
	"title" : "Sign Up For Offers - Mobile"
}, {
	"pathname" : "/CTOConfigureCmd",
	"title" : "CTOConfigureCmd"
}, {
	"pathname" : "/OrderByItemsDisplayView",
	"title" : "OrderByItemsDisplayView"
}, {
	"pathname" : "/CashCardFormView",
	"title" : "CashCardFormView"
}, {
	"pathname" : "/CashCardFormView",
	"title" : "CashCardFormView"
}, {
	"pathname" : "/UserRegistrationForm",
	"title" : "UserRegistrationForm"
}, {
	"pathname" : "/author-signings.html",
	"title" : "Author Signings"
}, {
	"pathname" : "/charitable-giving.html",
	"title" : "Charitable Contributions"
}, {
	"pathname" : "/concierge.html",
	"title" : "Free Technical Support "
}, {
	"pathname" : "/confidential-ethics-hotline-for-suppliers.html",
	"title" : "Ethics Hotline for Suppliers"
}, {
	"pathname" : "/costco-connection-online-edition.html",
	"title" : "Costco Connection Online Edition"
}, {
	"pathname" : "/costco-connection-online-edition.html",
	"title" : "Resources"
}, {
	"pathname" : "/customer-service.html",
	"title" : "Customer Service"
}, {
	"pathname" : "/disclosure-regarding-human-trafficking-and-anti-slavery.html",
	"title" : "Supply Chain Disclosure"
}, {
	"pathname" : "/employee-website.html",
	"title" : "Employee Site"
}, {
	"pathname" : "/export-sales.html",
	"title" : "Export Sales"
}, {
	"pathname" : "/faq.html",
	"title" : "FAQs"
}, {
	"pathname" : "/fraud-prevention.html",
	"title" : "Preventing Fraud "
}, {
	"pathname" : "/gasoline.html",
	"title" : "Gasoline"
}, {
	"pathname" : "/hearing-aid-center.html",
	"title" : "Hearing Aid Center"
}, {
	"pathname" : "/hours-and-holiday-closures.html",
	"title" : "Hours & Holiday Closures"
}, {
	"pathname" : "/jobs.html",
	"title" : "Jobs"
}, {
	"pathname" : "/join-costco.html",
	"title" : "Join Now"
}, {
	"pathname" : "/LogonForm",
	"title" : "My Account"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/LogonForm",
	"title" : "Sign in or Register"
}, {
	"pathname" : "/LogonForm",
	"title" : "Sign in or Register"
}, {
	"pathname" : "/membership-information.html",
	"title" : "Company Information "
}, {
	"pathname" : "/membership-renewal.html",
	"title" : "Renew Membership"
}, {
	"pathname" : "/new-locations.html",
	"title" : "Locations Coming Soon"
}, {
	"pathname" : "/NonAjaxAccountWishListDisplayView",
	"title" : "My Wish Lists"
}, {
	"pathname" : "/optical.html",
	"title" : "Optical"
}, {
	"pathname" : "/OrderStatusCmd",
	"title" : "Order Status"
}, {
	"pathname" : "/privacy-policy.html",
	"title" : "Your Privacy Rights"
}, {
	"pathname" : "/product-information.html",
	"title" : "Product Info"
}, {
	"pathname" : "/rebates.html",
	"title" : "Rebates"
}, {
	"pathname" : "/recalls.html",
	"title" : "Recalls"
}, {
	"pathname" : "/returns-replacements-refunds.html",
	"title" : "Returns"
}, {
	"pathname" : "/services.html",
	"title" : "Costco Services "
}, {
	"pathname" : "/shipping.html",
	"title" : "Shipping"
}, {
	"pathname" : "/SiteMap",
	"title" : "Site Map"
}, {
	"pathname" : "/special-events.html",
	"title" : "Special Events"
}, {
	"pathname" : "/supplier-diversity.html",
	"title" : "Supplier Diversity "
}, {
	"pathname" : "/terms-and-conditions-of-use.html",
	"title" : "Terms and Conditions"
}, {
	"pathname" : "/vendor-inquiries.html",
	"title" : "Vendors & Suppliers"
}, {
	"pathname" : "/volume-bulk-sales.html",
	"title" : "Volume Sales"
}, {
	"pathname" : "/ResetPasswordSuccessView",
	"title" : "Reset Password Success View"
}, {
	"pathname" : "/RegisterAddressCmd",
	"title" : "Register Address Cmd"
}, {
	"pathname" : "/UserRegistrationAdd",
	"title" : "User Registration Add"
}, {
	"pathname" : "/ResetPassword",
	"title" : "Reset Password"
}, {
	"pathname" : "/AddressBookDisplayView",
	"title" : "Address Book Display View"
}, {
	"pathname" : "/UserRegistrationAdd",
	"title" : "User Registration Add "
}, {
	"pathname" : "/CostcoCashCardProcess",
	"title" : "Costco Cash Card Process"
}, {
	"pathname" : "/PaymentMethodUpdateFormView",
	"title" : "Payment Method Update Form View"
}, {
	"pathname" : "/AddressUpdate",
	"title" : "Address Update"
}, {
	"pathname" : "/CostcoBillingPayment",
	"title" : "Costco Billing Payment"
}, {
	"pathname" : "/CostcoOrderProcess",
	"title" : "Costco Order Process"
}, {
	"pathname" : "/Logon",
	"title" : "Logon"
}, {
	"pathname" : "/ManageCheckoutCmd",
	"title" : "Manage Checkout Cmd"
}, {
	"pathname" : "/OrderStatusCmd",
	"title" : "Order Status Cmd"
}, {
	"pathname" : "/PromotionCodeManage",
	"title" : "Promotion Code Manage"
}, {
	"pathname" : "/RegisterAddressCmd",
	"title" : "Register Address Cmd"
}, {
	"pathname" : "/ResetPassword",
	"title" : "Reset Password"
}, {
	"pathname" : "/ResetPasswordSuccessView",
	"title" : "Reset Password Success View"
}, {
	"pathname" : "/PaymentMethodDisplayView",
	"title" : "PaymentMethodDisplayView"
}, {
	"pathname" : "/AddressBookForm",
	"title" : "AddressBookForm"
}, {
	"pathname" : "/AddressAdd",
	"title" : "AddressAdd"
}, {
	"pathname" : "/CommunicationPreferenceView",
	"title" : "CommunicationPreferenceView"
}, {
	"pathname" : "/OrderStatusDetailsView",
	"title" : "OrderStatusDetailsView"
}, {
	"pathname" : "/ViewCategories",
	"title" : "View Categories - Mobile"
}, {
	"pathname" : "/warehouse-instant-savings-nt.html",
	"title" : "Warehouse Instant Savings"
}, {
	"pathname" : "/warehouse-instant-savings-wc.html",
	"title" : "Warehouse Instant Savings"
}];


pmc.knownPages = [{
	"pathname" : "/TopCategories1",
	"title" : "Home"
}, {
	"pathname" : "/",
	"title" : "Home"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/TopCategoriesDisplay",
	"title" : "Home"
}, {
	"pathname" : "/CatalogSearch",
	"title" : "Search"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/CatalogSearch",
	"title" : "Search"
}, {
	"pathname" : "/WarehouseLocatorView",
	"title" : "WarehouseLocator"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/WarehouseLocatorView",
	"title" : "WarehouseLocator"
}, {
	"pathname" : "/WarehouseLocatorBrowseView",
	"title" : "WarehouseLocatorBrowseView"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/WarehouseLocatorBrowseView",
	"title" : "WarehouseLocatorBrowseView"
}, {
	"pathname" : "/WarehouseLocatorDetailsView",
	"title" : "WarehouseLocatorDetailsView"
}, {
	"pathname" : "/WarehouseLocatorDirectionsView",
	"title" : "WarehouseLocatorDirectionsView"
}, {
	"pathname" : "/OrderItemDisplayViewShiptoAssoc",
	"title" : "ShoppingCart"
}, {
	"pathname" : "/CheckoutCartView",
	"title" : "ShoppingCart"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/CheckoutCartView",
	"title" : "ShoppingCart"
},{
	"pathname" : "/webapp/wcs/stores/servlet/OrderItemDisplayViewShiptoAssoc",
	"title" : "ShoppingCart"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/CheckoutShippingView",
	"title" : "Checkout Flow - Ship"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/MultipleShipmentOrderSummaryView", // deprecated
	"title" : "Checkout Flow - Ship"
},{
	"pathname" : "/webapp/wcs/stores/servlet/BillingPaymentDisplayView", // deprecated
	"title" : "Checkout Flow - Pay"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/CheckoutPaymentView",
	"title" : "Checkout Flow - Pay"
},{
	"pathname" : "/webapp/wcs/stores/servlet/CostcoOrderProcess",
	"title" : "Checkout Flow - Pay"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/CheckoutDeliveryView",
	"title" : "Checkout Flow - Delivery Options"
},{
	"pathname" : "/CheckoutDeliveryView",
	"title" : "Checkout Flow - Delivery Options"
},{
	"pathname" : "/webapp/wcs/stores/servlet/OrderConfirmationView", // deprecated
	"title" : "Checkout Flow - Confirmation"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/CheckoutConfirmationView", // deprecated
	"title" : "Checkout Flow - Confirmation"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/CheckoutReviewView",
	"title" : "Checkout Flow - Review"
},{
	"pathname" : "/webapp/wcs/stores/servlet/CostcoOrderReview", // deprecated
	"title" : "Checkout Flow - Review"
}, {
	"pathname" : "/webapp/wcs/stores/servlet/CompareProductsDisplay",
	"title" : "Compare Products"
}, {
	"pathname" : "/InkTonerRibbons.html",
	"title" : "Ink & Toner Search"
}, {
	"pathname" : "/officeproducts-inktonercartridges.html",
	"title" : "Ink & Toner Search"
}, {
    "pathname" : "/ReLogonFormView",
    "title" : "Session Timed Out"
}, {
	"pathname" : "/Computers-CustomizeDesktop.html",
	"title" : "HPdeskchoose"
}, {
	"pathname" : "/CTOConfigureCmd",
	"title" : "HPconfigure"
}, {
	"pathname" : "/CTOUpdateCmd",
	"title" : "HPsummary"
}, {
	"pathname" : "/Computers-CustomizeLaptop.html",
	"title" : "HPlapchoose"
}];


pmc.excludedItems = [{
	"department" : "95 - Membership",
	"itemNumber" : "35670"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "35676"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "67"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "35674"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "31"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "751249"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "694409"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478218"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478217"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478216"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478214"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478222"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478213"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478215"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "35673"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478212"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478207"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478211"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "694399"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "35671"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "999902"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "35669"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "238080"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "751269"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "751259"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "36694"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283738"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283737"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283735"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283733"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283734"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "694389"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "694379"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283728"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "699719"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "294858"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "365044"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "699729"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "794256"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "27630"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "533573"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "906788"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "35670"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "35674"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "31"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "67"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "35676"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "35671"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478209"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283728"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "294858"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283729"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283733"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283734"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283735"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283738"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283736"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "283739"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "35673"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "155"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478207"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478211"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478212"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478222"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478213"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478214"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478216"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478217"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478218"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478219"
}, {
	"department" : "95 - Membership",
	"itemNumber" : "35669"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "478215"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "750985"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "750990"
}, {
	"department" : "80 - MISCELLANEOUS",
	"itemNumber" : "845361"
}];


pmc.searchReferrers = [{
	"name" : "Google",
	"domain" : "google.com",
	"parameters" : {
		"keyword" : "q"
	}
}, {
	"name" : "Bing",
	"domain" : "bing.com",
	"parameters" : {
		"keyword" : "q"
	}
}, {
	"name" : "Yahoo",
	"domain" : "yahoo.com",
	"parameters" : {
		"keyword" : "p"
	}
}, {
	"name" : "Ask.com",
	"domain" : "ask.com",
	"parameters" : {
		"keyword" : "q"
	}
}, {
	"name" : "AOL",
	"domain" : "aol.com",
	"parameters" : {
		"keyword" : "q"
	}
}, {
	"name" : "MyWebSearch",
	"domain" : "mywebsearch.com",
	"parameters" : {
		"keyword" : "searchfor"
	}
}, {
	"name" : "Blekko",
	"domain" : "blekko.com",
	"parameters" : {
		"keyword" : "q"
	}
}, {
	"name" : "Lycos",
	"domain" : "lycos.com",
	"parameters" : {
		"keyword" : "q"
	}
}, {
	"name" : "Dogpile",
	"domain" : "dogpile.com",
	"parameters" : {
		"keyword" : "q"
	}
}, {
	"name" : "Webcrawler",
	"domain" : "webcrawler.com",
	"parameters" : {
		"keyword" : "q"
	}
}, {
	"name" : "Info.com",
	"domain" : "info.com",
	"parameters" : {
		"keyword" : "q"
	}
}, {
	"name" : "Infospace",
	"domain" : "infospace.com",
	"parameters" : {
		"keyword" : "q"
	}
}, {
	"name" : "Search.com",
	"domain" : "search.com",
	"parameters" : {
		"keyword" : "q"
	}
}, {
	"name" : "Excite",
	"domain" : "excite.com",
	"parameters" : {
		"keyword" : "q"
	}
}];


pmc.setSearchEngineReferrer = function() {


	this.searchEngineReferrer = jQuery.grep(this.searchReferrers, function(obj) {
		return (document.referrer.indexOf(obj.domain) > -1)
	});


};


// Issue 22258
// Adding vqa1 to the PC sitePlatform. SE.
pmc.setSitePlatform = function() {
	// site platform
	this.hostname = window.location.hostname;
	this.isPC = false;
	this.isTablet = false;
	this.isMobile = true;
	this.sitePlatform = "Unknown";
	
	if (navigator.userAgent.match(/iOSApp/i)) {
		this.sitePlatform = "iOSApp";
	} else if (navigator.userAgent.match(/AndroidApp/i)) {
		this.sitePlatform = "AndroidApp";
	} else if (this.hostname) {
		if ( pmc.hostname.indexOf("www") >= 0 || pmc.hostname === "shop.costco.com") {
			this.sitePlatform = "PC";
			this.isPC = true;
			this.isMobile = false;
		} else if (pmc.hostname === "t.costco.com" || pmc.hostname === "t.costco.ca") {
			this.sitePlatform = "Tablet";
			this.isTablet = true;
			this.isMobile = false;
		} else if (pmc.hostname === "m.costco.com" || pmc.hostname === "m.costco.ca") {
			this.sitePlatform = "Mobile";
			this.isMobile = true;
		}
	}
};


pmc.setAuthenticationStatus = function() {

	var loggedOn = "";
	var loggedOff = "";
	this.authenticationStatus = "Unauthenticated";


	if (this.isPC === true) {
		if ($("li#signInOutContainer a#logon").length > 0) {
			loggedOn = $("li#signInOutContainer a#logon")[0].style.cssText;
		}
		if ($("li#signInOutContainer a#logoff").length > 0) {
			loggedOff = $("li#signInOutContainer a#logoff")[0].style.cssText;
		}


		if (loggedOn === "" && loggedOff === "display: none;") {
			this.authenticationStatus = "Unauthenticated";
		} else if (loggedOn === "display: none;" && loggedOff === "") {
			this.authenticationStatus = "Authenticated";
		}
	}
	if (this.isTablet === true) {
		if ($("div.navRow a").filter(function() {
			return this.innerHTML === "Sign Out";
		}).length > 0) {
			this.authenticationStatus = "Authenticated"
		}
	}
	if (this.isMobile === true) {
		this.authenticationStatus = "Mobile - Unknown"
	}
	/*
	 if(this.isMobile === true || this.sitePlatform === "AndroidApp" || this.sitePlatform === "iOSApp" ) {
	 $.each($("div.navRow a").toArray(), function() { if (this.href.indexOf("/Logoff?") > -1) {pmc.authenticationStatus = "Authenticated"};});
	 }
	 */
};


pmc.setLanguage = function() {
	this.lang = "en";
	var htmlLangAttribute = "";
	try {
		var langId = -1, langInput = $("input[name=settings]");
		if (pmc.hasValue(langInput) && langInput.length > 0 && langInput.val().indexOf("fr-CA") >= 0) {
			this.lang = "fr";
		} else {
			htmlLangAttribute = $("html").attr("lang");
			if (pmc.hasValue(htmlLangAttribute) && htmlLangAttribute.indexOf("fr") >= 0) {
				pmc.lang = "fr";
			} else {
				langInput = $("input#langId");
		
				if (langInput && langInput[0]) {
					langId = langInput[0].value;
					if (langId === "-25") {
						this.lang = "fr";
					}
				} else {
					var langSelectElement = $(".drop_down_language_select option:selected");
					if (pmc.hasValue(langSelectElement) && langSelectElement.length > 0) {
						;
					} else {
						langSelectElement = $("#selLanguage option:selected");					
					}
					
					langId = langSelectElement.val();
					if (langId === "-25") {
						this.lang = "fr";
					}
					lang = $("html")[0].lang;
				}
				
			}
		}

	} catch (error) {
		this.debugStatus("pmc.setLanguage " + error);
	}
};


pmc.setCurrentBuildNumber = function() {
	this.buildNumber = $("meta[name='currentBuildNumber']").attr('content');
};

// event40
//pmc.storeFindSearch()	event40	Warehouse Locator Searches	On initiation of warehouse locator search
pmc.storeFindSearch = function(myevent, location) {
	this.storeLocatorFormSubmitLocation = location;
	if (location.indexOf("Header") > -1) {
		this.storeOptionsSelected = new Array();
		$('.warehouse-options-list :checked').next('label').each(function(index) {
			pmc.storeOptionsSelected.push(jQuery.trim(this.innerHTML));
		});
		var inputs = jQuery(myevent).find("input");
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].name === "location") {
				this.storeLocatorLocation = (inputs[i].value);
			}
		}
		if (this.storeLocatorLocation === undefined || this.storeLocatorLocation === "") {
			this.storeLocatorLocation = "(No Search Term Entered)"
		}
	}
	if (location.indexOf("Warehouse Locator Page") > -1) {
		this.storeOptionsSelected = new Array();
		$('div#left_nav :checked').next('label').each(function(index) {
			pmc.storeOptionsSelected.push(jQuery.trim(this.innerHTML));
		});


		this.storeLocatorLocation = $("div#left_nav input#txtLocation")[0].value;


		if (this.storeLocatorLocation === undefined || this.storeLocatorLocation === "") {
			this.storeLocatorLocation = "(No Search Term Entered)"
		}
	}
	if (location.indexOf("Mobile") > -1) {
		this.storeOptionsSelected = new Array();
		$('ul#locator_search_filters :checked').siblings('label').each(function(index) {
			pmc.storeOptionsSelected.push(jQuery.trim(this.innerHTML));
		});


		this.storeLocatorLocation = $("input#TxtLocation")[0].value;


		if (this.storeLocatorLocation === undefined || this.storeLocatorLocation === "") {
			this.storeLocatorLocation = "(No Search Term Entered)"
		}
	}


	this.debugStatus("END storeFindSearch()");
	this.debugStatus(this.storeLocatorFormSubmitLocation);
	this.debugStatus(this.storeLocatorLocation);
	this.debugStatus(this.storeOptionsSelected);


	try {
		this._storeFindSearch(myevent);
	} catch (error) {
		this.debugStatus("this._storeFindSearch(); undefined.");
	}


};
// event41
//pmc.storeBrowseInit()	event41	Warehouse Browse Initiations	On initation of warehouse browse - 'go' button
pmc.storeBrowseInit = function(myevent) {
	try {
		this._storeBrowseInit(myevent);
	} catch (error) {
		this.debugStatus("this._storeBrowseInit(); undefined.");
	}
};
// event42
//pmc.storeViewDetails()	event42	Warehouse Details View	On load of warehouse details page
pmc.storeViewDetails = function() {
	if (window.location.href.indexOf("warehouseNumber=") > -1) {
		this.storeNumber = jQuery.trim(window.location.href.split("warehouseNumber=")[1].split("&")[0]);
		this.debugStatus("END storeViewDetails()");
		this.debugStatus(this.storeNumber);
		/* Issue #16013
		 try {
		 this._storeViewDetails();
		 } catch (error) {
		 this.debugStatus("this._storeViewDetails(); undefined.");
		 }
		 */
	}
};
// event43
//pmc.storeViewDirections()	event43	Warehouse Directions View	On click to get directions
pmc.storeViewDirections = function(myevent) {
	if (window.location.href.indexOf("warehouseNumber=") > -1) {
		this.storeNumber = jQuery.trim(window.location.href.split("warehouseNumber=")[1].split("&")[0]);
		this.debugStatus("END storeViewDirections()");
		this.debugStatus(this.storeNumber);
		try {
			this._storeViewDirections(myevent);
		} catch (error) {
			this.debugStatus("this._storeViewDirections(); undefined.");
		}
	}
};
// event47 - diamond finder
pmc.diamondFinderClick = function(myevent) {


	this.diamondFinderClickToggles = eval("(" + (decodeURIComponent(document.location.href.split("#")[1])).replace(/"/g, '\'') + ")");
	this.diamondFinderClickToggles.changedFromDefaults = false;


	if (this.diamondFinderClickToggles.shapes.length === 1 && this.diamondFinderClickToggles.shapes[0] === "ROUND") {
		;
	} else {
		this.diamondFinderClickToggles.changedFromDefaults = true;
	}


	if (this.diamondFinderClickToggles.options.price[0] === 0 && this.diamondFinderClickToggles.price[1] === 7) {
		;
	} else {
		this.diamondFinderClickToggles.changedFromDefaults = true;
	}


	if (this.diamondFinderClickToggles.options.clarity[0] === 0 && this.diamondFinderClickToggles.clarity[1] === 5) {
		;
	} else {
		this.diamondFinderClickToggles.changedFromDefaults = true;
	}


	if (this.diamondFinderClickToggles.options.color[0] === 0 && this.diamondFinderClickToggles.color[1] === 5) {
		;
	} else {
		this.diamondFinderClickToggles.changedFromDefaults = true;
	}


	if (this.diamondFinderClickToggles.options.carats[0] === 0 && this.diamondFinderClickToggles.carats[1] === 14) {
		;
	} else {
		this.diamondFinderClickToggles.changedFromDefaults = true;
	}


	pmc.debugStatus("END diamondFinderClick()");
	try {
		pmc._diamondFinderClick(myevent);
	} catch (error) {
		this.debugStatus("this._diamondFinderClick(); undefined.");
	}


};


pmc.pageView = function() {

	// debug mode
	this.setDebugMode();
	this.debugStatus("BEGIN pageView()");


	// site platform
	this.setSitePlatform();
	this.pmcPSTDate = this.GetPSTDateString();


	// on m.costco.com, return if there is a 'p' URL param.
	if (this.isMobile === true && (window.location.search.indexOf("&p=").length > 0 || window.location.search.indexOf("?p=").length > 0)) {
		return;
	}

	// authentication status
	this.setAuthenticationStatus();


	// language
	this.setLanguage();


	// current build number
	this.setCurrentBuildNumber();


	// referral and tracking code detection
	this.visitFromEmail();
	this.visitFromExternal();
	this.visitFromInternal();
	this.visitFromSocial();
	this.visitFromQR();

	// capture breadcrumbs (if present)
	this.pageViewBreadcrumbs();


	// search engine referrer search term
	this.setSearchEngineReferrer();

	// njh: #1242
	this.setVideo();
	
	// Issue #16403:
	if ($("div#errorPage h1").text() === "Generic Error") {
		this.pageType = "GenericError";
		this.pageName = "GenericError";
	} else if (($("h1").text().indexOf("Product Not Found") >= 0)) {
		// Issue 22700. 8/21/2013. SE
		this.pageType = "product not found";
		
		var hrefString = window.location.href;
		var productId = "";
		if (hrefString.length > 0 && hrefString.indexOf("product.") > 0) {
			productId = (hrefString.split("product.")[1].split(".")[0]);
		}
		
		this.pageName = this.pageType + " | " + productId;
	} else {


		// start determining page name and type based on taxonomy.
		this.knownPage = new Array();
		this.knownExceptionPage = new Array();


		var pathTest = window.location.pathname.split("*").join("%").split("/");


		if (this.knownPages !== null && pathTest.length > 1) {
			var x = new RegExp(pathTest[pathTest.length - 1], "i");
			this.knownPage = jQuery.grep(this.knownPages, function(obj) {
				return obj.pathname.match(x);
			});
		}
		if (this.knownExceptions !== null && pathTest.length > 1) {
			var x = new RegExp(pathTest[pathTest.length - 1], "i");
			// page taxonomy - am I an exceptional page?
			this.knownExceptionPage = jQuery.grep(this.knownExceptions, function(obj) {
				return obj.pathname.match(x);
			});
		}
		if (this.knownPage.length > 0) {
			this.debugStatus("knownPage[0]: " + this.knownPage[0].pathname);
			this.pageName = jQuery("<div/>").html(this.knownPage[0].title).text();
			this.pageType = jQuery("<div/>").html(this.knownPage[0].title).text();


			// SearchResults page
			if (this.knownPage[0].title === "Search") {
				this.pageViewSearchPage();
			}


			// event27
			if (this.knownPage[0].title === "Checkout Flow - Ship") {
				// purchase flow: ship
				this.cartShip();
			}


			// event28
			if (this.knownPage[0].title === "Checkout Flow - Pay") {
				// purchase flow: ship
				this.cartPay();
			}
			// if (this.knownPage[0].title === "HPlapchoose"){
			// 	this.hpLap();
			// }
			// if(this.knownPage[0].title === "HPdeskchoose"){
			// 	this.hpDesk();
			// }
			// if(this.knownPage[0].title === "HPsummary"){
			// 	this.hpSummary();
			// }
			// if(this.knownPage[0].title === "HPconfigure"){
			// 	this.hpConfigure();
			// }
			
			// event37
			if (this.knownPage[0].title === "Checkout Flow - Delivery Options") {
				// purchase flow: ship
				this.cartDeliveryOptions();
			}


			if (this.knownPage[0].title === "Checkout Flow - Review") {
				// purchase flow: review
				this.cartReview();
			}


			if (this.knownPage[0].title === "Checkout Flow - Confirmation") {
				// purchase flow: confirmation
				this.debugStatus("knownPage[0]: " + this.knownPage[0].title + " | calling this.purchase(); from pageView();");
				this.purchase();
			}


			// WarehouseLocator page
			if (this.knownPage[0].title === "WarehouseLocator") {
				this.pageViewWarehouseLocatorPage();
			}


			// WarehouseLocatorDetailsView page
			if (this.knownPage[0].title === "WarehouseLocatorDetailsView") {
				this.pageViewWarehouseLocatorDetailsView();
				//$($("button#getDirections")[0]).attr("onclick", "pmc.storeViewDirections();" + $($("button#getDirections")[0]).attr("onclick"));
				$($("button#getDirections")[0]).on( 'mousedown', function() { pmc.storeViewDirections(); return false; } );
			}


			// compare products page load
			if (this.knownPage[0].title === "Compare Products") {
				// Issue #14906
				if (document.referrer.indexOf("/CompareProductsDisplay") > -1 || document.referrer === "") {
					;
				} else {
					this.compareProductClick(window.location);
				}
			}


		} else {
			if (this.knownExceptionPage.length > 0) {
				// page taxonomy - exception page page
				this.pageName = jQuery("<div/>").html(this.knownExceptionPage[0].title).text();
				this.pageType = jQuery("<div/>").html(this.knownExceptionPage[0].title).text();

				// Issue 15601: updating communication preferences submit click
				if (this.pageName === "CommunicationPreferenceView") {
					if ($("form#CommunicationForm button.submit").length > 0) {
						if ($($("form#CommunicationForm button.submit")[0]).attr("onclick") !== null && $($("form#CommunicationForm button.submit")[0]).attr("onclick") !== undefined) {
							$("form#CommunicationForm button.submit").attr("onclick", "pmc.interfaceClick($('form#CommunicationForm button.submit')[0], 'update communication preferences');" + $($("form#CommunicationForm button.submit")[0]).attr("onclick"));
						} else {
							$("form#CommunicationForm button.submit").attr("onclick", "pmc.interfaceClick($('form#CommunicationForm button.submit')[0], 'update communication preferences');");
						}
					}
				}


			} else if (this.isPC === true && ($("body.product-page").length > 0 || this.pageType === "product not found")) {
				// page taxonomy - products details page
				this.debugStatus("entering pageViewProductDetailsPage();")
				this.pageViewProductDetailsPage();
			} else if (this.isTablet === true && (($("div#divProductTitle").length) === 1 || (window.location.pathname.match(".product.")))) {
				// page taxonomy - products details page
				this.debugStatus("entering pageViewProductDetailsPage();")
				this.pageViewProductDetailsPage();
			} else if ((window.location.pathname.match(".product.")) !== null && this.isMobile === true) {
				// page taxonomy - products details page
				this.debugStatus("entering pageViewProductDetailsPage();")
				this.pageViewProductDetailsPage();
			} else if ($("body.show-compare").length > 0) {
				if ($("div.title h2").filter(function() {
					return this.innerHTML.match(/Shop by category/);
				}).length > 0) {
					// page taxonomy - category page
					this.pageViewCategoryPage();
				} else {
					// page taxonomy - this is a landing page.
					this.pageType = "Landing";
				}
			} else if (this.isTablet === true) {
				if ($("div#divCategoryTitle").length > 0) {
					// page taxonomy - category page
					this.pageViewCategoryPage();
				} else {
					// page taxonomy - this is a landing page.
					this.pageType = "Landing";
				}
			} else if (this.isMobile) {
				if ($("a#hLogoLink")[0].onclick.toString().match("'Category Page'") !== null) {
					// page taxonomy - category page
					this.pageViewCategoryPage();
				} else if ($("div.stockMsg").text() === "Out of Stock") {
					this.pageType = "product not found";
								
					var hrefString = window.location.href;
					var productId = "";
					if (hrefString.length > 0 && hrefString.indexOf("product.") > 0) {
						productId = (hrefString.split("product.")[1].split(".")[0]);
					}
					
					this.pageName = this.pageType + " | " + productId;
				} else {
					if ($("a#hLogoLink")[0].onclick.toString().match("Landing Page") !== null) {
						// page taxonomy - this is a landing page.
						this.pageType = "Landing";
					} else {
						if (this.breadcrumbs === undefined) {
							this.pageName = "Mobile - Unknown | " + pathTest[pathTest.length - 1].split(".html")[0];
							this.pageType = "Unknown";
						}
					}
				}
			} else {
				// page taxonomy - this is a unknown page.
				var path = window.location.pathname.split("/");
				this.pageType = "Unknown";
				this.pageName = path[path.length - 1];
			}
			if (this.pageType === "Landing") {				
				var locationName = window.location.pathname.split(".html");
				if (locationName.length > 0) {
					locationName = locationName[0];
				}
				locationName = locationName.replace("/", "");
				this.pageName = "Landing | " + locationName;
			}
		} 
	}


	this.debugStatus("END pageView()");
	try {
		this._pageView();
	} catch (error) {
		this.debugStatus("this._pageView(); undefined.");
	}
};


pmc.socialShare = function(myevent) {
	// social share
	this.socialShareType = jQuery.trim(myevent.href.split("site=")[1].split("&")[0]);


	this.debugStatus("END socialShare()");
	try {
		this._socialShare(myevent);
	} catch (error) {
		this.debugStatus("this._socialShare(); undefined.");
	}
};


pmc.productDetailsClick = function(myevent) {
	// product detail tab views
	// evar15
	this.productID = this.getProductIDFromDetailsPage();
	// evar16
	this.productName = this.getProductNameFromDetailsPage();
	// evar18
	this.productDetailType = this.getProductDetailTypeFromDetailsPage();
	// evar19
	this.starRating = this.getProductRatingFromDetailsPage();
	this.debugStatus("END productDetailsClick()");
	try {
		this._productDetailsClick(myevent);
	} catch (error) {
		this.debugStatus("this._productDetailsClick(); undefined.");
	}
};


pmc.productSpecsClick = function(myevent) {
	// product specification tab views
	// evar15
	this.productID = this.getProductIDFromDetailsPage();
	// evar16
	this.productName = this.getProductNameFromDetailsPage();
	// evar18
	this.productDetailType = this.getProductDetailTypeFromDetailsPage();
	// evar19
	this.starRating = this.getProductRatingFromDetailsPage();


	try {
		this._productSpecsClick(myevent);
	} catch (error) {
		this.debugStatus("this._productSpecsClick(); undefined.");
	}
};


pmc.productTermsClick = function(myevent) {
	// product shipping & terms tab views
	// evar15
	this.productID = this.getProductIDFromDetailsPage();
	// evar16
	this.productName = this.getProductNameFromDetailsPage();
	// evar18
	this.productDetailType = this.getProductDetailTypeFromDetailsPage();
	// evar19
	this.starRating = this.getProductRatingFromDetailsPage();


	try {
		this._productTermsClick(myevent);
	} catch (error) {
		this.debugStatus("this._productTermsClick(); undefined.");
	}
};


pmc.productReturnsClick = function(myevent) {
	// product return policy tab views
	// evar15
	this.productID = this.getProductIDFromDetailsPage();
	// evar16
	this.productName = this.getProductNameFromDetailsPage();
	// evar18
	this.productDetailType = this.getProductDetailTypeFromDetailsPage();
	// evar19
	this.starRating = this.getProductRatingFromDetailsPage();


	try {
		this._productReturnsClick(myevent);
	} catch (error) {
		this.debugStatus("this._productReturnsClick(); undefined.");
	}
};


pmc.productReviewsClick = function(myevent) {
	// product reviews tab views
	// evar15
	this.productID = this.getProductIDFromDetailsPage();
	// evar16
	this.productName = this.getProductNameFromDetailsPage();
	// evar18
	this.productDetailType = this.getProductDetailTypeFromDetailsPage();
	// evar19
	this.starRating = this.getProductRatingFromDetailsPage();


	try {
		this._productReviewsClick(myevent);
	} catch (error) {
		this.debugStatus("this._productReviewsClick(); undefined.");
	}
};


pmc.wishlistAddLocation = function(myevent) {
	// wishlist add
	// evar23

	try {
		this._wishlistAddLocation(myevent);
	} catch (error) {
		this.debugStatus("this._wishlistAddLocation(); undefined.");
	}
};


pmc.emailSignUp = function(myevent, type) {
	this.emailSignUpPageLocation = type;


	try {
		this._emailSignUp(myevent);
	} catch (error) {
		this.debugStatus("this._emailSignUp(); undefined.");
	}
};


pmc.cartAdd = function(myevent) {

	var items = new Array();
	var productId = this.getProductIDFromDetailsPage();
	if($('select[id*="product"').val() == "unselected"){
		return false;
	}

	if (this.pageType === "Product Detail") {
		try {
			// members-only
			// Issue #22100 - SE
			// don't trigger a cart add event for sign in and membership button clicks
			var buttonText = $(myevent).text();
			if(!pmc.hasValue(buttonText)) {
			 buttonText = $(myevent).val();
			}
			/*
			if (!pmc.hasValue(buttonText)) {
				buttonText = $(".addCartButton").text();

				if (!pmc.hasValue(buttonText)) {
					return;
				}
			}
			*/
			buttonText = $.trim(buttonText).toLowerCase();
			if (buttonText === "" || buttonText.indexOf("sign in") >= 0 || buttonText.indexOf("membership") >= 0) {
				return;
			}
			
			// Issue #14910
			this.starRating = this.getProductRatingFromDetailsPage();
	
			var sku = null;
			if (pmc.hasValue(singleProduct)) {
				sku = singleProduct.partNumber;
			}
			if (!pmc.hasValue(sku) && pmc.hasValue(singleProduct) && singleProduct.length > 0) {
				sku = singleProduct[0].partNumber;
			}
			
			if (!sku) {
				sku = $("span[itemprop='sku']").text();
			}
			if (!pmc.hasValue(sku)) {
				sku = $("input[name=addedItem]").val();
			}
			if (sku) {
				// excluded from totals:
				if (jQuery.grep(this.excludedItems, function(obj) {
					return obj.itemNumber === itemNumber;
				}).length === 0) {
					var price = $.trim($(".your-price span.currency").text());
					var description = $.trim($("h1[itemprop='name']").text());
					if (!pmc.hasValue(description)) {
						description = $.trim($(".pTitle h2").text());
					}
					var quantity = $("input#minQtyText").val();
					
					var item = pmc.newOrderItem();
					item.description = description;
					item.itemNumber = sku;
					item.itemProductId = productId;
					item.quantity = quantity;
					item.price = price;
					items.push(item);
				}
			} else {
			// for muliple select product detail pages.
				var descriptions = jQuery($("input").filter(function() {
					return (this.name + "").match("productName");
				}));
				if (!pmc.hasValue(description)) {
				   description = $.trim($(".pTitle h2").text());
				}		
				var itemNumbers = jQuery($("input").filter(function() {
					return (this.name + "").match("addedItem");
				}));		
		
				if (this.isTablet === true) {
					var quantities = $("input#qty");
				} else {
					var quantities = jQuery($("input").filter(function() {
						return (this.name + "").match("quantity");
					}));
				}
				
				if (this.isTablet === true) {
					var prices = jQuery($("input").filter(function() {
						return (this.name + "").match("price");
					}));
				} else {
					var prices = jQuery($("input").filter(function() {
						// RAA: changed the .match from "price-" to "price"  7/22/2013
						return (this.name + "").match("price");
					}));
				}		
		
				if (itemNumbers !== null) {
					for (var i = 0; i < itemNumbers.length; i++) {
						// excluded from totals:
						if (jQuery.grep(this.excludedItems, function(obj) {
							return obj.itemNumber === itemNumbers[i].value;
						}).length === 0) {
							this.debugStatus(i);
							var item = pmc.newOrderItem();
							if (descriptions[i] !== undefined) {
								item.description = descriptions[i].value;
							}
							if (this.isMobile === true) {
								item.description = $("title").text();
							    if(!pmc.hasValue(item.description)) {
							    	item.description = $.trim($(".pTitle h2").text());
							    }
							}
							item.itemNumber = itemNumbers[i].value;
							item.itemProductId = productId;
							this.debugStatus(quantities[i]);
							item.quantity = quantities[i].value;
							if (prices[i] !== undefined) {
								item.price = prices[i].value;
							}
							item.itemTotal = "";
							items.push(item);
						}
					}
				}
			}
		} catch (error) {
			this.debugStatus("error in cartAdd() product detail page");
		}
	} else {
		// add to cart from a category or search results page
		try {
			var formObject = $(myevent).parent();
			var footerElement = formObject.parent();
			var currencyWrapper = footerElement.parent();
			var productWrapper = $(myevent).closest(".product-tile");
			
			if (this.isTablet) {
				var price = "";
				var descriptionWrapperArray = formObject.closest(".gridProducts").find(".productInfoWrapper div a");
				var description = "";
				for (var i = 0;i < descriptiopurchasenWrapperArray.length;i++) {
					var anchorText = descriptionWrapperArray[i].innerText;
					if (anchorText.length > 0) {						
						description = $.trim(anchorText);
					}
				}
			} else {
				var price = productWrapper.find(".currency span:first-child").text();
				if (!price || price.indexOf("$") < 0) {
					price = productWrapper.find(".currency span").text();
				}
				if (price){
					price = $.trim(price);
				}
				var description = $.trim($(myevent).closest(".product-tile").find("span.short-desc").html());
			}
			var itemNumber = formObject.find("input[name=itemNumber]").val();

			if(!pmc.hasValue(productId)){
				productId = formObject.find("input[name=partNumber]").val();				
			}

			var quantity = formObject.find("input[name=quantity]").val();
			this.memberProductType = productWrapper.find(".omniture").children("div.scMemberProductType").attr("sc.memberproducttype");
			if (!this.memberProductType) {
				this.memberProductType = "na";
			}

			// excluded from totals:
			if (jQuery.grep(this.excludedItems, function(obj) {
				return obj.itemNumber === itemNumber;
			}).length === 0) {
				var item = pmc.newOrderItem();
				item.description = description;
				item.itemNumber = itemNumber;
				item.itemProductId = productId
				item.quantity = quantity;
				item.price = price;
				items.push(item);
			}
		} catch (error) {
			this.debugStatus("error in cartAdd() category or search results page");
		}
	}
	if (this.debug) {
		this.debugStatus(items);
	}
	this.debugStatus("END cartAdd()");
	if (items.length > 0) {
		try {
			this._cartAdd(myevent, items);
		} catch (error) {
			this.debugStatus("this._cartAdd(); undefined.");
		}
	}
};


pmc.cartRemove = function(myevent, eventType) {
	var items = new Array;

	if (eventType === "row") {
		if (this.isMobile === true) {
			var itemrow = jQuery($(myevent)[0]).parent().parent().parent().parent()[0];
			var item = pmc.newOrderItem();

			item.description = $(itemrow).children("ul").children("li.pTitle").text();
			item.itemNumber = $(itemrow).children("ul").children("li.pDesc").children("div").text().split("#")[1];
			item.quantity = ""; //$(itemrow).children("ul").children("li.pQty").children("div").children("input")[0].value; // SE 5/13
			item.price = ""; //$(itemrow).children("ul").children("li.pPrice").text().split(": ")[1]; // SE 5/13
			item.itemTotal = ""; //$(itemrow).children("ul").children("li.pTotal").text().split(": ")[1]; // SE 5/13

			if (jQuery.grep(this.excludedItems, function(obj) {
				return obj.itemNumber === item.itemNumber;
			}).length === 0) {
				items.push(item);
			}
		} else if (this.isTablet === true) {
			var itemrow = jQuery($(myevent)[0]).parent().parent()[0];
			var item = pmc.newOrderItem();

			item.description = jQuery.trim(jQuery(itemrow).find("td.productTitle a")[0].innerHTML);
			
			var hrefString = $(itemrow).find("td.productTitle a")[0].href;
			if (hrefString.length > 0 && hrefString.indexOf("product.") > 0) {
				item.itemNumber = (hrefString.split("product.")[1].split(".")[0]);
			}
			/*
			var quantitySelector = $(itemrow).find("input").filter(function() {
				if (this.id) { if(this.id.match(/quantity/) || this.id.match(/qty/)) { return true; } else { return false;}} else {return false;}
			});
			if (quantitySelector) {
				item.quantity = quantitySelector.value;
			}
			item.price = jQuery.trim((jQuery(itemrow).find("td")[4].innerHTML))
			item.itemTotal = jQuery.trim((jQuery(itemrow).find("td")[5].innerHTML))
			*/  // SE 5/13

			if (jQuery.grep(this.excludedItems, function(obj) {
				return obj.itemNumber === item.itemNumber;
			}).length === 0) {
				items.push(item);
			}
		} else {
			var itemrow = jQuery($(myevent)[0]).parent().parent()[0];
			var item = pmc.newOrderItem();

			var selectedObj = $(itemrow).find("td a");
			if (selectedObj.length > 1) {
				item.description = selectedObj[1].title;
				var hrefString = selectedObj[1].href;
				if (hrefString.length > 0 && hrefString.indexOf("product.") > 0) {
					item.itemNumber = (hrefString.split("product.")[1].split(".")[0]);
				}
			}
			
			item.itemProductId = "";
			$(itemrow).find("td div.omniture div").each(function() { var prodId = this.getAttribute("sc.prodid"); if(prodId){ item.itemProductId = prodId; }});
		/*
			var quantitySelector = $(itemrow).find("input").filter(function() {
				if (this.id) { if(this.id.match(/quantity/) || this.id.match(/qty/)) { return true; } else { return false;}} else {return false;}
			});
			if (quantitySelector) {
				item.quantity = quantitySelector.value;
			}
			
			item.price = jQuery.trim((jQuery(itemrow).find("td.cartItemPrice > span.price2")[0].innerHTML));
			if (!item.price) {
				// deprecated
				item.price = jQuery.trim((jQuery(itemrow).find("td.toprow > span.price2")[0].innerHTML));
			}
			item.itemTotal = jQuery.trim((jQuery(itemrow).find("td.cartItemTotal > span.price")[0].innerHTML));
			if (!item.itemTotal){
				// deprecated
				item.itemTotal = jQuery.trim((jQuery(itemrow).find("td.toprow > span.price")[0].innerHTML));	
			}
		*/  // SE 5/13
			if (jQuery.grep(this.excludedItems, function(obj) {
				return obj.itemNumber === item.itemNumber;
			}).length === 0) {
				items.push(item);
			}
		}
	}

	if (eventType === "update") {
		if (this.isTablet === true) {
			var quantities = $("input").filter(function() {
				if (this.id) { if(this.id.match(/quantity/) || this.id.match(/qty/)) { return true; } else { return false;}} else {return false;}
			})
			for (var i = 0; i < quantities.length; i++) {
				if (quantities[i].value === "0") {
					var itemrow = jQuery($(myevent)[0]).parent().parent()[0];
					var item = pmc.newOrderItem();

					var selectedObj = $(itemrow).find("td.productTitle a");
					if (selectedObj.length > 1) {
						item.description = selectedObj[1].innerHTML;
						var hrefString = selectedObj[1].href;
						if (hrefString.length > 0 && hrefString.indexOf("product.") > 0) {
							item.itemNumber = (hrefString.split("product.")[1].split(".")[0]);
						}
						
					}

					item.itemProductId = "";
					$(itemrow).find("td div.omniture div").each(function() { var prodId = this.getAttribute("sc.prodid"); if(prodId){ item.itemProductId = prodId; }});
			/*
					var quantitySelector = $(itemrow).find("input").filter(function() {
						if (this.id) { if(this.id.match(/quantity/) || this.id.match(/qty/)) { return true; } else { return false;}} else {return false;}
					});
					if (quantitySelector) {
						item.quantity = quantitySelector.value;
					}
					item.price = jQuery.trim((jQuery(itemrow).find("td.cartItemPrice").html()))
					item.itemTotal = jQuery.trim((jQuery(itemrow).find("td.cartItemTotal").html()))
			*/  // SE 5/13

					if (jQuery.grep(this.excludedItems, function(obj) {
						return obj.itemNumber === item.itemNumber;
					}).length === 0) {
						items.push(item);
					}
				}
			}
		} else {
			var quantities = $("input").filter(function() {
				if (this.id) { if(this.id.match(/quantity/) || this.id.match(/qty/)) { return true; } else { return false;}} else {return false;}
			})
			for (var i = 0; i < quantities.length; i++) {
				if (quantities[i].value === "0") {
					var itemrow = jQuery($(quantities)[i]).parent().parent()[0];
					var item = pmc.newOrderItem();

					var selectedObj = $(itemrow).find("td a");
					if (selectedObj.length > 1) {
						item.description = selectedObj[1].title;
						var hrefString = selectedObj[1].href;
						if (hrefString.length > 0 && hrefString.indexOf("product.") > 0) {
							item.itemNumber = (hrefString.split("product.")[1].split(".")[0]);
						}
					}
				/*
					item.quantity = quantities[i].value;
					item.price = jQuery.trim((jQuery(itemrow).find("td.cartItemPrice").html()))
					item.itemTotal = jQuery.trim((jQuery(itemrow).find("td.cartItemTotal").html()))
				*/  // SE 5/13

					if (jQuery.grep(this.excludedItems, function(obj) {
						return obj.itemNumber === item.itemNumber;
					}).length === 0) {
						items.push(item);
					}
				}
			}
		}
	}

	if (this.debug) {
		this.debugStatus(items);
	}
	this.debugStatus("END cartRemove()");
	if (items.length > 0) {
		try {
			this._cartRemove(myevent, items);
		} catch (error) {
			this.debugStatus("this._cartRemove(); undefined.");
		}
	}
};


pmc.cartCheckout = function(myevent) {
	var items = new Array;
	var itemrow = $("tr.ordertable");
	if (itemrow.length <= 0) {
		itemrow = $("#tblProducts tr");
	}
	if (itemrow.length <= 0) {
		itemrow = $("div.cartProduct");
	}
	for (var i = 0; i < itemrow.length; i++) {

		var item = pmc.newOrderItem();

		item.description = "";
		var currentRow = itemrow[i];
		var itemTitleWrapper = $(currentRow).find("td.cartItemDescription a");
		if (itemTitleWrapper.length <= 0) {
			itemTitleWrapper = $(currentRow).find("td.productTitle a");
		}
		if (itemTitleWrapper.length <= 0) {
			itemTitleWrapper = $(currentRow).find("li.pTitle a.pLink");
		}
		if (itemTitleWrapper.length <= 0){
			continue;
		} else if (itemTitleWrapper.length === 1){
			item.description = itemTitleWrapper.text();
		} else if (itemTitleWrapper.length > 1 && itemTitleWrapper[1].title){
			item.description = itemTitleWrapper[1].title;
		} else {
			item.description = "";
		}
		
		if (itemTitleWrapper && pmc.hasValue(itemTitleWrapper.attr("href"))) {
			var hrefString = itemTitleWrapper.attr("href");
			if (hrefString.length > 0 && hrefString.indexOf("product.") >= 0) {
				item.itemNumber = hrefString.split("product.")[1].split(".")[0];
			}			
		}
		item.itemProductId = "mobile";
		$(currentRow).find("td div.omniture div").each(function() { var prodId = this.getAttribute("sc.prodid"); if(prodId){ item.itemProductId = prodId; }});
console.log(item.itemNumber);
/*
		var quantitySelector = $(currentRow).find("input").filter(function() {
			if (this.id) { if(this.id.match(/quantity/) || this.id.match(/qty/)) { return true; } else { return false;}} else {return false;}
		});
		if (quantitySelector) {
			item.quantity = quantitySelector.value;
		}
		item.price = jQuery.trim((jQuery(currentRow).find("td.cartItemPrice > span.price2")[0].innerHTML));
		item.itemTotal = jQuery.trim((jQuery(currentRow).find("td.cartItemTotal > span.price")[0].innerHTML));
*/
		if (jQuery.grep(this.excludedItems, function(obj) {
			return obj.itemNumber === item.itemNumber;
		}).length === 0) {
			items.push(item);
		}
	}
	
	if (this.debug) {
		this.debugStatus(items);
	}
	this.debugStatus("END cartCheckout()");


	try {
		this._cartCheckout(myevent, items);
	} catch (error) {
		this.debugStatus("this._cartCheckout(); undefined.");
	}
};


pmc.recommendationClick = function(myevent) {
	// RichRelevance
	if (myevent.href.indexOf("RRSTRAT=") > -1) {
		//evar36
		this.recommendationStrategy = jQuery.trim(myevent.href.split("RRSTRAT=")[1].split("&")[0]);
	}
	if (myevent.href.indexOf("RRPLACE=") > -1) {
		//evar37
		this.recommendationPlacement = jQuery.trim(myevent.href.split("RRPLACE=")[1].split("&")[0]);
	}
	if (myevent.href.indexOf("RRPROD=") > -1) {
		//evar38
		this.recommendationTargetProduct = jQuery.trim(myevent.href.split("RRPROD=")[1].split("&")[0]);
	}


	try {
		this._recommendationClick(myevent);
	} catch (error) {
		this.debugStatus("this._recommendationClick(); undefined.");
	}
};
// onclick method for RichRelevance to call when a link is clicked:
pmc.richRelevanceClick = function(myevent, recommendationStrategy, recommendationPlacement, recommendationTargetProduct) {
	// RichRelevance
	//evar36
	this.recommendationStrategy = recommendationStrategy;
	//evar37
	this.recommendationPlacement = recommendationPlacement;
	//evar38
	this.recommendationTargetProduct = recommendationTargetProduct;


	try {
		this._recommendationClick(myevent);
	} catch (error) {
		this.debugStatus("this._recommendationClick(); undefined.");
	}
};


pmc.inkFinderClick = function(myevent, keyword) {
	if (keyword === null) {
		this.inkFinderSearchTerm = jQuery.trim(myevent.href.split("keyword=")[1].split("&")[0]);
	} else {
		this.inkFinderSearchTerm = keyword;
	}
	if (this.debug) {
		this.debugStatus(this.inkFinderSearchTerm);
	}
	this.debugStatus("END inkFinderClick()");
	try {
		this._inkFinderClick(myevent);
	} catch (error) {
		this.debugStatus("this._inkFinderClick(); undefined.");
	}
};


pmc.inSitePromoClick = function(myevent) {
	//this.promotionLinkName = "";
	this.promotionName = "";
	this.clickedLinkText = ""; // members-only // Issue #22100 - SE

	// Issue #18952, 18864 - track espot clicks in flyout menu.
	if ($(myevent).text().indexOf("/ClickInfo") > 0) {
		//this.debugStatus($(myevent).closest("a"));
		myevent = $(myevent).closest("a")[0];
		//this.debugStatus(myevent.parent().children("a")[0]);
	}
	
	// members-only
	// Issue #22100 - SE
	this.memberProductType = jQuery($(myevent)).closest("div.product-tile").children(".omniture").children("div.scMemberProductType").attr("sc.memberproducttype");
	if (!this.memberProductType) {
		this.memberProductType = "na";
	}
	this.prodId = jQuery($(myevent)).closest("div.product-tile").children(".omniture").children("div.scProdId").attr("sc.prodid");
	this.clickedLinkText = $(myevent).text();
	
	try {
		if (myevent.nodeName === "FORM") {
			if (myevent.action.indexOf("ProductDisplay") > -1) {
				this.promotionName = (jQuery($(myevent)).closest("div.genericESpot")[0].id.split("WC_ContentAreaESpot_div_1_")[1]) + " | product | " + (jQuery($(myevent)).find("input").filter(function() {
				return this.name.match(/partNumber/);
				})[0].value);
			}
		} else {
			if (isExternal(myevent.href)) {
				this.promotionName = (jQuery($(myevent)).closest("div.genericESpot")[0].id.split("WC_ContentAreaESpot_div_1_")[1]) + " | ext | " + myevent.href;
			} else {
				if (myevent.href.indexOf("/CatalogSearch") > 0 || $(myevent).text().indexOf("/CatalogSearch") > 0 ) {
					this.promotionName = (jQuery($(myevent)).closest("div.genericESpot")[0].id.split("WC_ContentAreaESpot_div_1_")[1]) + " | search | " + jQuery.trim(myevent.href.split("keyword=")[1].split("&")[0]);
				} else if (myevent.href.indexOf(".product.") > 0 || $(myevent).text().indexOf(".product.") > 0 ) {
					this.promotionName = (jQuery($(myevent)).closest("div.genericESpot")[0].id.split("WC_ContentAreaESpot_div_1_")[1]) + " | product | " + jQuery.trim(myevent.href.split(".product.")[1].split(".html")[0]);
				} else {
					var pageLocation = myevent.href.split("?")[0].split("/");
					if ((jQuery($(myevent)).closest("div.genericESpot")[0].id.split("WC_ContentAreaESpot_div_1_")[1]) === "Footer") {
						// this is a footer link click, not an espot:
						this.navClick(myevent, "footer | " + jQuery.trim(pageLocation[pageLocation.length - 1].split(".")[0]));
						return true;
					}
					this.promotionName = (jQuery($(myevent)).closest("div.genericESpot")[0].id.split("WC_ContentAreaESpot_div_1_")[1]) + " | " + jQuery.trim(pageLocation[pageLocation.length - 1].split(".")[0]);
				}
			}
		}
	} catch (error) {
		if (this.promotionName === null || this.promotionName === "") {
			this.promotionName = (jQuery($(myevent)).closest("div.genericESpot")[0].id.split("WC_ContentAreaESpot_div_1_")[1]) + " | unknown | " + $(myevent).text();
		}
	}


	if (this.promotionName === null || this.promotionName === "") {
		this.promotionName = (jQuery($(myevent)).closest("div.genericESpot")[0].id.split("WC_ContentAreaESpot_div_1_")[1]) + " | unknown | " + $(myevent).text();
	}
	
	// members-only
	// Issue #22100 - SE
	if (this.prodId && this.prodId !== "") {
		if (this.promotionName.indexOf(this.prodId) < 0) {
			this.promotionName += " | " + this.prodId;
		}
		if (this.clickedLinkText && this.clickedLinkText === "") {
			this.promotionName += ":" + this.clickedLinkText;
		}
	}

	try {
		this._inSitePromoClick(myevent);
	} catch (error) {
		this.debugStatus("this._inSitePromoClick(); undefined.");
	}


	function isExternal(url) {
		var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
		//if ( typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol)
		//	return true;
		if ( typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + {"http:":80,"https:":443}[location.protocol] + ")?$"), "") !== location.host)
			return true;
		return false;
	}

};

pmc.navClick = function(myevent, elementName) {
	this.debugStatus("BEGIN navClick() " + elementName);
	this.navigationElement = $("<div/>").html(elementName).text();
	this.debugStatus("END navClick() " + elementName);
	try {
		this._navClick(myevent);
	} catch (error) {
		this.debugStatus("this._navClick(); undefined.");
	}
};

// njh:1242
pmc.setVideo = function() {
	// njh:review, this doesn't seem to work
	// if ( ! pmc.hasValue( $('.video-link') ) )
	//	return;
	
	if ( $('.video-link').length == 0 )
		return;
		
	pmc.videoExists = true;
	$('.video-link').on( "click", function(event) {
        pmc.videoLinkClick(event);
    });
};

// njh:1242
pmc.videoLinkClick = function(myevent) {
	try {
		this._videoLinkClick(myevent);
	} catch (error) {
		this.debugStatus("this._videoLinkClick(); undefined.");
	}
};

pmc.compareProductClick = function(myevent) {
	this.debugStatus("BEGIN compareProductClick() " + jQuery.trim(myevent.href.split("partNumbers=")[1].split("&")[0]));

	try {
		this._compareProductClick(myevent, jQuery.trim(myevent.href.split("partNumbers=")[1].split("&")[0]).split(","));
	} catch (error) {
		this.debugStatus("this._compareProductClick(); undefined.");
	}
};


pmc.documentReady = function() {

	if ( prx.isPharmacy() ) 
		return;

	try {

		pmc.setCustomPageViewAttributes = true;
	
		if (pmc.account === "cwcbusinessdelprod" || pmc.account === "cwcpharmacyprod" || pmc.account === "cwcpharmacytest" || pmc.account === "cwcbusinessdeltest") {
			pmc.setCustomPageViewAttributes = false;
			pmc.pageView();
		} else {
			pmc.pageView();
	
	
			// event5
			// espot link click
			$("div.genericESpot a").bind("mousedown", function(event) {
				// Issue #14919
				if ($($(this)).closest("div.genericESpot")[0].id.split("WC_ContentAreaESpot_div_1_")[1] === "Footer") {
					;
				} else {
					pmc.inSitePromoClick(this);
				}
			});
	
	
			// event5
			// espot product display form submit
			$("div.genericESpot form").filter(function() {
				return (this.action + "").match(/ProductDisplay/);
			}).bind("submit", function(event) {
				if (pmc.isSearchFormSubmitted === false) {
					pmc.isSearchFormSubmitted = true;
					pmc.inSitePromoClick(this);
					pmc.espotForm = this;
					window.setTimeout(function() {
						pmc.espotForm.submit();
					}, 50);
					return false;
				}
				return true;
			});

			// event10
			// search-ahead click
			pmc.searchType = "";
			$("#results").on("mousedown", "li.ui-menu-item", function(event){
				pmc.searchType = "look ahead";
			});
		
			// event10
			// category refine (browse, no search keyword applies here) using left nav
			$("div#left_nav a").filter(function(index) {
				var text = ($(this).text());
				if (this.href.match("javascript") || text.match("Select a different")) {
					;
				} else {
					return this;
				}
			}).bind("click", function(event) {
				if (pmc.pageType === "Category") {

					//var titles = $("div#left_nav div.title h2");
					var category = $.trim(jQuery(this).parents("ul").prev("div.title").children("h2").text());
					// 'shop by category' in the context of category refinement is treated as a navClick, not a browse refinement.
					if (category.indexOf("by category") > -1) {
						//pmc.navClick(this, jQuery.trim(titles[count].innerHTML) + " | " + jQuery.trim(this.innerHTML));
						pmc.navClick(this, category + " | " + $.trim($(this).text()).split("(")[0]);
					} else {
						//pmc.refineBrowse(this, $.trim(jQuery.trim(titles[count].innerHTML)).text());
						pmc.refineBrowse(this, category, null);
					}
				}
			});
	
	
			// event10
			// category refine
			// Issue #14955
			$("div.category-tile a").bind("click", function(event) {
                if (pmc.pageType === "Category") {
                    pmc.refineBrowse(this, "Shop by category", $(this).find("h3").text());
                }
            });
	
	
			// event10
			// category refine - tablet
			$("li.shopByRefinement a").filter(function(index) {
				var text = ($(this).text());
				if (text.match("Select a different")) {
					;
				} else {
					return this;
				}
			}).bind("click", function(event) {
				if (pmc.pageType === "Category" && pmc.isTablet === true) {
					pmc.refineBrowse(this, jQuery.trim($(this).parent().parent().parent().siblings("div.Menu").children("div.title").text()), null);
					//pmc.refineBrowse(this, jQuery.trim($(this).parent().parent().parent().siblings("div.Menu").children("div.title").text()), $(this).text().split(" (")[0]);
					// ^ possible bug fix here?
				}
			});
	
	
			// event10
			// category refine - tablet
			// Issue #14955
			$("div#divProducts a").bind("click", function(event) {
				if (pmc.pageType === "Category" && pmc.isTablet === true) {
					pmc.refineBrowse(this, "Shop by category", $($($(this)).parents("div.brand").children("div.productTitle")[0]).text());
				}
			});
	
	
			// event10
			// category refine using nav - mobile
			$("div#refineBy li.linkItem a").filter(function(index) {
				var text = ($(this).text());
				if (text.match("Select a different")) {
					;
				} else {
					return this;
				}
			}).bind("click", function(event) {
				if (pmc.pageType === "Category" && (pmc.isMobile === true)) {
					pmc.refineBrowse(this, $.trim($(this).closest("li.dropItem").find("a")[0].innerHTML), null);
				}
			});
	
			// event10
			// search submission
			$("form#CatalogSearchForm").bind("submit", function(event) {
				pmc.debugStatus("search submission trigger");
				//$("button#search_submit").bind("mousedown", function(event) {
				if (pmc.isSearchFormSubmitted === false) {
					pmc.isSearchFormSubmitted = true;
					pmc.search(this, $("input#SimpleSearchForm_SearchTerm.search-input")[0].value);
					window.setTimeout(function() {
				pmc.debugStatus("search submission submit");
						$("form#CatalogSearchForm").submit();
					}, 50);
					return false;
				}
				return true;
			});
			
			// empty search results search form
			$("form#NoResultsSearchForm").bind("submit", function(event) {
				if (pmc.isSearchFormSubmitted === false) {
					pmc.isSearchFormSubmitted = true;
					pmc.search(this, $("input#SimpleSearchForm_SearchTerm2.search-input2")[0].value);
					window.setTimeout(function() {
						$("form#NoResultsSearchForm").submit();
					}, 50);
					return false;
				}
				return true;
			});
	
	
			// event10
			// search submission - tablet
			$("div#divMagGlass.searchNavElement").bind("click", function(event) {
				if (pmc.isTablet === true) {
					pmc.search(this, jQuery("#inpSearch").val());
				}
			});
	
	
			// event10
			// search submission - tablet
			jQuery('#inpSearch').bind("keydown", function(event) {
				if (event.keyCode === 13 && pmc.isTablet) {
					pmc.search($("div#divMagGlass.searchNavElement")[0], jQuery("#inpSearch").val());
				}
			})
			// event10
			// search submission - mobile
			$("button.searchGo").bind("click", function(event) {
				if (pmc.isMobile === true) {
					pmc.search(this, $("input.searchInput").val());
				}
			});
	
	
			// event12
			// search refine using left nav
			$("ul.left-navigation-list a").filter(function(index) {
				var text = ($(this).text());
				if (this.href.match("javascript") || text.match("Select a different")) {
					;
				} else {
					return this;
				}
			}).bind("click", function(event) {
	
	
				if (pmc.pageType === "Search") {
					//var titles = $("div#left_nav div.title h2");
					var category = $.trim(jQuery(this).parents("ul").prev("div.title").children("h2").text());
					pmc.refineSearch(this, jQuery.trim(this.href.split("keyword=")[1].split("&")[0]), jQuery.trim(this.href.split("refine=")[1].split("&")[0]), category);
	
	
				}
			});
	
	
			// event12
			// search refine using left nav - tablet
			$("ul#ulRefinements a").filter(function(index) {
				var text = ($(this).text());
				if (text.match("Select a different")) {
					;
				} else {
					return this;
				}
			}).bind("click", function(event) {
				if (pmc.pageType === "Search" && pmc.isTablet === true) {
					pmc.refineSearch(this, jQuery.trim(this.href.split("keyword=")[1].split("&")[0]), jQuery.trim(this.href.split("refine=")[1].split("&")[0]), jQuery.trim($(this).parent().parent().parent().siblings("div.Menu").children("div.title").text()));
				}
			});
	
	
			// event12
			// search refine using nav - mobile
			$("div#refineBy li.linkItem a").bind("click", function(event) {
				if (pmc.pageType === "Search" && (pmc.isMobile === true)) {
					pmc.refineSearch(this, jQuery.trim(this.href.split("keyword=")[1].split("&")[0]), jQuery.trim(this.href.split("refine=")[1].split("&")[0]), $.trim($(this).closest("li.dropItem").find("a")[0].innerHTML));
				}
			});
	
	
			// event13
			// search results item click
			$(".product-tile div.product-tile-image-container a").bind("click", function(event) {
				if (pmc.pageType === "Search") {
					// members-only attr
					// Issue #22100 - SE
					this.memberProductType = $(this).parents("div.product-tile-image-container").siblings("div.omniture").children("div.scMemberProductType").attr("sc.memberproducttype");
					pmc.clickSearchResult(this);
				}
			});
	
	
			// event13
			// search results item click - tablet
			$("div.gridProducts a").bind("click", function(event) {
				if (pmc.pageType === "Search" && pmc.isTablet === true) {
					// members-only attr
					// Issue #22100 - SE
					this.memberProductType = $(this).parents("div.product-tile-image-container").siblings("div.omniture").children("div.scMemberProductType").attr("sc.memberproducttype");
					pmc.clickSearchResult(this);
				}
			});
	
	
			// event13
			// search results item click - mobile
			$("div#productGrid a").bind("click", function(event) {
				if (pmc.pageType === "Search" && pmc.isMobile === true) {
					// members-only attr
					// Issue #22100 - SE
					this.memberProductType = $(this).parents("div.product-tile-image-container").siblings("div.omniture").children("div.scMemberProductType").attr("sc.memberproducttype");
					pmc.clickSearchResult(this);
				}
			});
	
	
			/*
			Navigation elemements:
			[location]|[description]
			Locations include:
			- header
			- topnav
			- footer
			- left rail (includes "shop by category" clicks, NOT refinements)
			- flyout
			- breadcrumbs (capture entire breadcrumb path - ex: breadcrumb|home:electronics:speakers)
			- logo
			- intext (description = page title:link text)
			*/
			// event14
			// top navigation click events
			$("ul#lob-navigation a").bind("click", function(event) {
				pmc.navClick(this, "header | " + this.innerHTML);
			});
	
	
			// event14
			// secondary top navigation click events
			$("ul#header_links1.axs.navigation a").bind("click", function(event) {
				pmc.navClick(this, "header | " + this.innerHTML);
			});
	
	
			// event14
			// top navigation click events - tablet
			$("div.headerLinks a").filter(function(index) {
				return $(this).text() !== "";
			}).bind("click", function(event) {
				if (pmc.isTablet === true) {
					pmc.navClick(this, "header | " + $(this).text());
				}
			});
	
	
			// event14
			// tertiary top navigation click events
			$("ul#header_links a").bind("click", function(event) {
				pmc.navClick(this, "topnav | " + this.innerHTML);
			});
	
	
			// event14
			// footer navigation click events
			setTimeout(function() {
				$("li.footer-column a").bind("click", function(event) {
					pmc.navClick(this, "footer | " + this.innerHTML.replace(/(\r\n|\n|\r)/gm,""));
					//pmc.navClick(this, "footer | " + this.innerHTML);
				});
			}, 1000);
	
	
			// event14
			// footer navigation click events - tablet
			$("div.footerLinks a:not(a.linkTitle)").bind("click", function(event) {
				if (pmc.isTablet === true) {
					if ($(this).parent("span.closeButton").length === 0) {
						pmc.navClick(this, "footer | " + $(this).text());
					}
				}
			});
	
	
			// event14
			// breadcrumb click events
			$("ul#breadcrumbs > li a").bind("click", function(event) {
				pmc.navClick(this, pmc.getBreadcrumbsLinkString(this));
			});
	
	
			// event14
			// breadcrumb click events - tablet
			$("div#divBreadCrumbs a").bind("click", function(event) {
				if (pmc.isTablet === true) {
					pmc.navClick(this, pmc.getBreadcrumbsLinkString(this));
				}
			});
	
	
			$("div#crumbsTop a.crumbLink").bind("click", function(event) {
				if (pmc.isMobile === true) {
					pmc.navClick(this, pmc.getBreadcrumbsLinkString(this));
				}
			});
	
	
			// event14
			// main logo click event
			$("a#WC_CachedHeaderDisplay_Link_2.header-logo").bind("click", function(event) {
				pmc.navClick(this, ("logo | " + jQuery(this).find("img")[0].alt));
			});
	
	
			// event14
			// main logo click event - tablet
			$("a#lnkLogo").bind("click", function(event) {
				if (pmc.isTablet === true) {
					pmc.navClick(this, ("logo | " + "t.costco.com"));
				}
			});
	
	
			// event14
			// main logo click event - mobile
			$("a#hLogoLink").bind("click", function(event) {
				pmc.navClick(this, ("logo | " + "m.costco.com"));
			});
	
	
			// event14
			// sidebar click events - 'left rail' & 'flyout'
			$("#category-navigation").bind("click", function(e) {
				// Issue #18952, 18864 - track espot clicks in flyout menu.
				if ($(e.target).closest("a").attr("id")) {
					var anchorContentESpotAttr = $(e.target).closest("a").attr("id").match(/wc_contentareaespot/i);
					if (anchorContentESpotAttr && anchorContentESpotAttr.length > 0) {
						pmc.inSitePromoClick($(e.target).closest("a"));
					} else {
						if (e.target.href !== undefined) {
							if ($(e.target).parents("div").parents("div")[0].id === "") {
								pmc.debugStatus("flyout | " + e.target.innerHTML);
								pmc.navClick(e.target, "flyout | " + e.target.innerHTML);
							} else {
								pmc.debugStatus("left rail | " + e.target.innerHTML);
								pmc.navClick(e.target, "left rail | " + e.target.innerHTML);
							}
						}
					}
				} else {
					if (e.target.href !== undefined) {
						if ($(e.target).parents("div").parents("div")[0].id === "") {
							pmc.debugStatus("flyout | " + e.target.innerHTML);
							pmc.navClick(e.target, "flyout | " + e.target.innerHTML);
						} else {
							pmc.debugStatus("left rail | " + e.target.innerHTML);
							pmc.navClick(e.target, "left rail | " + e.target.innerHTML);
						}
					}
				}
			});
	
	
			// event14
			// sidebar click events - 'flyout' - tablet
			$("div.categoryPopOut a").bind("click", function(e) {
				if (pmc.isTablet === true) {
					if ($(this).parent("span.closeButton").length === 0) {
						pmc.debugStatus("flyout | " + e.target.innerHTML);
						pmc.navClick(e.target, "flyout | " + e.target.innerHTML);
					}
				}
			});
	
	
			// event14
			// misc nav clicks - mobile
			$("div.hMenuItemLink a").bind("click", function(event) {
				if (pmc.isMobile === true) {
					pmc.debugStatus("mobile header | " + this.innerHTML);
					pmc.navClick(this, "mobile header | " + this.innerHTML);
				}
			});
			$("div.fPanelItem a").bind("click", function(e) {
				if (pmc.isMobile === true) {
					pmc.debugStatus("mobile footer | " + this.innerHTML);
					pmc.navClick(this, "mobile footer | " + this.innerHTML);
				}
			});
			$("div.bbMenu li.linkItem a").bind("click", function(e) {
				var elementHTML = $.trim(this.innerHTML);
				var navClickName = elementHTML;
				if (elementHTML.indexOf("(") > 0) {
					navClickName = elementHTML.split("(")[0];
				}
				if (pmc.isMobile === true) {
					pmc.debugStatus("mobile nav | " + this.innerHTML);
	
					var parentDropItem = $(this).closest("li.dropItem");
					var parentDropItemAnchor = null;
					
					if (parentDropItem && parentDropItem.length > 0) {
						parentDropItemAnchor = parentDropItem.find("a");
						if (parentDropItemAnchor && parentDropItemAnchor.length > 0) {
							var qualifyingAnchor = $.trim(parentDropItemAnchor.html());
							if(elementHTML != qualifyingAnchor) {
								navClickName = "mobile nav | " + qualifyingAnchor + "-" + qualifyingAnchor;
							}
						}
					}
				}
				pmc.navClick(this, "mobile nav | " + navClickName);
			});
	
	
			// event17 - social share
			setTimeout(function() {
				$("div.product-info a.BVRRSocialBookmarkingSharingLink").bind("click", function(event) {
					pmc.debugStatus("social share click.")
					pmc.socialShare(this);
				});
			}, 1000);
	
	
			// Mobile site:
			// event17 - social share
			$("div.productInfoWrap a.BVRRSocialBookmarkingSharingLink").bind("click", function(event) {
				if (pmc.isMobile === true) {
					pmc.debugStatus("social share click.")
					pmc.socialShare(this);
				}
			});
	
	
			// Tablet site:
			// event17 - social share
			$("div.Facebook a").bind("mousedown", function(event) {
				if (pmc.isTablet === true) {
					pmc.debugStatus("social share click.")
					pmc.socialShare(this);
				}
			});
	
	
			// Tablet site:
			// event17 - social share
			$("div.Twitter a").bind("mousedown", function(event) {
				if (pmc.isTablet === true) {
					pmc.debugStatus("social share click.")
					pmc.socialShare(this);
				}
			});
	
	
			// Tablet site:
			// event17 - social share
			$("div.Pinterest a").bind("mousedown", function(event) {
				if (pmc.isTablet === true) {
					pmc.debugStatus("social share click.")
					pmc.socialShare(this);
				}
			});
	
	
			// Tablet site:
			// event17 - social share
			$("div.GoogleBookmark a").bind("mousedown", function(event) {
				if (pmc.isTablet === true) {
					pmc.debugStatus("social share click.")
					pmc.socialShare(this);
				}
			});
	
	
			// product detail tab views
			// event18
			// event19
			// event20
			// event21
			// event22
			$("a").filter(function() {
				return this.href.match(/#product-tab.+/);
			}).bind("click", function(event) {
				var tabName = jQuery.trim($("<div/>").html(this.innerHTML).text());
				if (tabName.indexOf("Product Details") > -1) {
					pmc.productDetailsClick(this);
					// event18
				}
				if (tabName.indexOf("Specifications") > -1) {
					pmc.productSpecsClick(this);
					// event19
				}
				if (tabName.indexOf("Shipping & Terms") > -1) {
					pmc.productTermsClick(this);
					// event20
				}
				if (tabName.indexOf("Returns/Warranty") > -1) {
					pmc.productReturnsClick(this);
					// event21
				}
				if (tabName.indexOf("Reviews") > -1) {
					pmc.productReviewsClick(this);
					// event22
				}
			});
	
	
			// product detail tab views - Tablet site
			// event18
			// event19
			// event20
			// event21
			// event22
			$("div#divTitleTiles").children().filter(function() {
				return this.onclick.toString().match(/Click - Product Details/);
			}).bind("mousedown", function(event) {
				if (pmc.isTablet === true) {
					pmc.productDetailsClick(this);
				}
			});
	
	
			$("div#divProductDetails > div#divSubMenuTitles td.specs").bind("mousedown", function(event) {
				if (pmc.isTablet === true) {
					pmc.productSpecsClick(this);
				}
			});
	
	
			$("div#divProductDetails > div#divSubMenuTitles td").filter(function() {
				return $.trim(this.innerHTML).match(/Shipping/);
			}).bind("mousedown", function(event) {
				if (pmc.isTablet === true) {
					pmc.productTermsClick(this);
				}
			});
	
	
			$("div#divProductDetails > div#divSubMenuTitles td").filter(function() {
				return $.trim(this.innerHTML).match(/Return/);
			}).bind("mousedown", function(event) {
				if (pmc.isTablet === true) {
					pmc.productReturnsClick(this);
				}
			});
	
	
			$("div#divTitleTiles").children().filter(function() {
				return this.onclick.toString().match(/Click - Reviews/);
			}).bind("mousedown", function(event) {
				if (pmc.isTablet === true) {
					pmc.productReviewsClick(this);
				}
			});
	
	
			// product detail tab views - Mobile site
			// event18
			// event19
			// event20
			// event21
			// event22
			$("li#itemDetails a").filter(function() {
				return $(this).text().match("Details");
			}).bind("click", function(event) {
				pmc.productDetailsClick(this);
			});
	
	
			$("li#itemDetails a").filter(function() {
				return $(this).text().match("Specifications");
			}).bind("click", function(event) {
				pmc.productSpecsClick(this);
			});
	
	
			$("li#itemTerms a").filter(function() {
				return $(this).text().match("Shipping & Terms");
			}).bind("click", function(event) {
				pmc.productTermsClick(this);
			});
	
	
			$("li#itemReviews a").filter(function() {
				return $(this).text().match("Reviews");
			}).bind("click", function(event) {
				pmc.productReviewsClick(this);
			});
	
	
			// event23 - add to wish list from product details page
			// TODO: check this use-case, possible bug:
			$($("ul.link-list a").filter(function() {
			return this.title.match(/Add to Wish List/);
			})[0]).bind("click", function(event) {
				pmc.wishlistAddLocation(this);
			});
	
	
			// event23 - add to wish list from compare products page
			$("a.wishlist-link").bind("click", function(event) {
				var link = this;
				// Issue #16213
				try {
					pmc.productName = $("input").filter(function() {
						return this.value.match(link.href.split("partNumber=")[1].split("&")[0]);
					}).closest("td.product").children("div.product-tile").children("div.product-tile-image-container").children("a").children("span.short-desc").text();
				} catch(error) {
					this.debugStatus("could not find product name on wishlist add.");
					pmc.productName = "Unknown";
				}
	
	
				pmc.wishlistAddLocation(link);
			});
	
	
			// Tablet site:
			// event23 - add to wish list from product details page
			$("div#divAddToWishList a").bind("mousedown", function(event) {
				if (pmc.isTablet === true) {
					pmc.wishlistAddLocation(this);
				}
			});
	
	
			// Tablet site:
			// event23 - add to wish list from product details page
			$("div.pAddToList a").bind("click", function(event) {
				if (pmc.isMobile === true) {
					pmc.wishlistAddLocation(this);
				}
			});
			
			// desktop
			// event24 - add to cart
			$("#addToCartBtn").bind("click", function(event) {
				if (pmc.isTablet === false) {
					pmc.cartAdd(this);
				}
			});
			
			$("button.addtocart").bind("mousedown", function(event) {
				if (pmc.isTablet === false) {
					pmc.cartAdd(this);
				}
			});

/*			
			// event24 - add to cart
			jQuery($("form").filter(function() {
				return (this.action + "").match(/ManageShoppingCartCmd/);
			})).bind("submit", function(event) {
				try {
					if (!pmc.knownPage) {
						pmc.knownPage = new Array();
					}
					
					var pathTest = window.location.pathname.split("*").join("%").split("/");
					if (pmc.knownPages !== null && pathTest.length > 1) {
						var x = new RegExp(pathTest[pathTest.length - 1], "i");
						pmc.knownPage = jQuery.grep(pmc.knownPages, function(obj) {
							return obj.pathname.match(x);
						});
						
						if (!pmc.hasValue(pmc.knownPage)) {
							if (pmc.pageType === "Product Detail") {
								pmc.cartAdd($("")[0]);
							} else {
								pmc.cartAdd(this);
							}							
						} else if (!pmc.knownPage || !(pmc.knownPage[0].title === "ShoppingCart" || pmc.knownPage[0].title === "Checkout Flow - Ship" || pmc.knownPage[0].title === "Checkout Flow - Pay" || pmc.knownPage[0].title === "Checkout Flow - Delivery Options" || pmc.knownPage[0].title === "Checkout Flow - Review" || pmc.knownPage[0].title === "Checkout Flow - Confirmation")) {
							pmc.cartAdd(this);
						}
					}
				}catch (error) {
					pmc.debugStatus("cartAdd error " + error);
				}
			});
*/	
	
			// Tablet site:
			// event24 - add to cart
			$("button.addCartButton").bind("click", function(event) {
				if (pmc.isTablet === true) {
					pmc.cartAdd(this);
				}
			});
	
	
			// Tablet site:
			// event24 - add to cart, search results page
			$("input.cartButton").bind("click", function(event) {
				if (pmc.isTablet === true) {
					pmc.cartAdd(this);
				}
			});
	
	
			// Mobile site:
			// event24 - add to cart
			$("input#addToCart").bind("click", function(event) {
				if (pmc.isMobile === true) {
					pmc.cartAdd(this);
				}
			});
			// event24 - add to cart
			$("#floatingAddToCart").bind("click", function(event) {
				if (pmc.isMobile === true && $("input#addToCart").length > 0) {
					pmc.cartAdd($("input#addToCart")[0]);
				}
			});			
			
	
	
			// event25 - remove from cart
			// No change, SE 10/3/2013
			$("a.delete-icon").bind("click", function(event) {
				pmc.cartRemove(this, "row");
			});
	
	
			// Tablet:
			// event25 - remove from cart
			$("div.removeProduct").bind("click", function(event) {
				pmc.cartRemove(this, "row");
			});
	
	
			// event25 - remove from cart
			$("a[id^='orderItemQuantityUpdateAnchor']").bind("click", function(event) {
				pmc.cartRemove(this,"update");
			});
			$("button#shopCartUpdateSubmitButton").bind("click", function(event) {
				pmc.cartRemove(this, "update");
			});
	
	
			// event25 - remove from cart
			$("button#shopCartUpdateSubmitButtonBot").bind("click", function(event) {
				pmc.cartRemove(this, "update");
			});
	
	
			// Tablet:
			// event25 - remove from cart
			$("button").filter(function() {
				return this.innerHTML.match(/Update Quantities/);
			}).bind("mousedown", function(event) {
				if (pmc.isTablet === true) {
					pmc.cartRemove(this, "update");
				}
			});
	
	
			// event26 - checkout
			$("#shopCartCheckoutSubmitButton").bind("click", function(event) {
				pmc.cartCheckout(this);
			});
	
	
			// event26 - checkout
			// deprecated
			$("button#shopCartCheckoutSubmitButtonBot").bind("click", function(event) {
				pmc.cartCheckout(this);
			});
	
	
			// event26 - checkout
			// mobile
			$("input#basketControl_ContinueButtonTop, input#basketControl_ContinueButtonBtm").bind("click", function(event) {
				pmc.cartCheckout(this);
			});

			$('#cart-button-panel > .button').on('click', function(event) {
				pmc.interfaceClick(this, "cart - continue shopping" );
			});	

			$('#ShopCartForm .submit').on('click', function(event) {
				pmc.interfaceClick(this, "cart - continue shopping" );
			});

			// Tablet:
			// event26 - checkout
			if (pmc.isTablet === true) {
				setTimeout(function() {
					$("button.darkBlueButton").filter(function() {
						return this.innerHTML.match(/Checkout/);
					}).bind("click", function(event) {	
							pmc.cartCheckout(this);
					});
				}, 500);
			}
	
	
			// event27		
			$("#addressFormInlineButton").bind("mousedown", function() {
				pmc.cartShipClick(this);
			});
			//deprecated
			$("button#shipSubmitButton1").bind("mousedown", function() {
				pmc.cartShipClick(this);
			});
	
			// event27
			$("#shipToThisAddressSubmitButton").bind("mousedown", function() {
				pmc.cartShipClick(this);
			});
			// deprecated
			$("button#shipSubmitButton2").bind("mousedown", function() {
				pmc.cartShipClick(this);
			});
	
	
			// event36
			// rich relevance click
			$("div.rich-relevance a").bind("click", function(event) {
				pmc.recommendationClick(this);
			});
	
	
			// event40 - Warehouse Locator Search
			$("form").filter(function() {
				return (this.action + "").match(/WarehouseLocatorView/);
			}).bind("submit", function(event) {
				if (pmc.isSearchFormSubmitted === false) {
					pmc.isSearchFormSubmitted = true;
					pmc.debugStatus("warehouse search event");
					pmc.storeFindSearch(this, "Header");
					window.setTimeout(function() {
						$("form").filter(function() {
							return (this.action + "").match(/WarehouseLocatorView/);
						}).submit();
					}, 50);
					return false;
				}
				return true;
			});
	
	
			// event40 - Warehouse Locator Search
			$("button#executeSearch").bind("click", function(event) {
				if (pmc.pageName.indexOf("WarehouseLocator") > -1) {
					pmc.debugStatus("warehouse search event");
					pmc.storeFindSearch(this, "Warehouse Locator Page");
				}
			});
	
	
			// event40 - Warehouse Locator Search
			$("button#executeUpdate").bind("click", function(event) {
				if (pmc.pageName.indexOf("WarehouseLocator") > -1) {
					pmc.debugStatus("warehouse search event");
					pmc.storeFindSearch(this, "Warehouse Locator Page");
				}
			});
	
	
			// event40 - Warehouse Locator Search - Tablet site
			$("button").filter(function() {
				return ($(this).text() + "").match(/Find/);
			}).bind("click", function(event) {
				if (pmc.pageName.indexOf("WarehouseLocator") > -1 && pmc.isTablet === true) {
					pmc.storeFindSearch(this, "Warehouse Locator Page");
				}
			});
	
	
			// event40 - Warehouse Locator Search - Tablet site
			$("button").filter(function() {
				return ($(this).text() + "").match(/Update/);
			}).bind("click", function(event) {
				if (pmc.pageName.indexOf("WarehouseLocator") > -1 && pmc.isTablet === true) {
					pmc.storeFindSearch(this, "Warehouse Locator Page");
				}
			});
	
	
			$("button#btnGo").bind("click", function(event) {
				if (pmc.pageName.indexOf("WarehouseLocator") > -1 && pmc.isMobile === true) {
					pmc.storeFindSearch(this, "Mobile");
				}
			});
	
	
			// event41	- Warehouse Browse Initiations
			$("button#executeSearchForWarehouses").bind("click", function(event) {
				if (pmc.pageName.indexOf("WarehouseLocatorBrowseView") > -1) {
					pmc.debugStatus("warehouse browse event");
					pmc.storeBrowseInit(this);
				}
			});

            $("input#txtLocation").bind("keypress", function(event){
                if (pmc.pageName.indexOf("WarehouseLocator") > -1 && event.which == 13) {
                    pmc.debugStatus("warehouse search event");
                    pmc.storeFindSearch(this, "Warehouse Locator Page");
                }
            });
	
			// event44
			// email signup form event
			$("form#header_emailSignup").bind("submit", function(event) {
				if (pmc.isPC === true) {
					pmc.emailSignUp(this, "Header");
				}
				if (pmc.isMobile === true && $("input#header_emailSignUpEmail").val() !== "") {
	
	
					if (pmc.isEmailSignUpFormSubmitted === false) {
						pmc.isEmailSignUpFormSubmitted = true;
						pmc.emailSignUp(this, "Mobile");
						pmc.emailSignUpForm = this;
						window.setTimeout(function() {
							pmc.emailSignUpForm.submit();
						}, 50);
						return false;
					}
					return true;
				}
	
	
			});
	
	
			// event44
			// email signup form event
			$("form#EmailSignupForm").bind("submit", function(event) {
				pmc.emailSignUp(this, "Homepage banner");
			});
	
	
			// event44
			// email signup form event
			$("form#footer_emailSignup").bind("submit", function(event) {
				pmc.emailSignUp(this, "Footer");
			});
	
	
			// event44
			// email signup form event - Tablet
			$("button.signUpButton").bind("click", function(event) {
				if (pmc.isTablet === true && $("button.signUpButton").val() !== "") {
					pmc.emailSignUp(this, "Footer");
				}
			});
	
	
			// event45
			// cash card balance check - on submission of balance query
			// in https iframe...
	
	
			// event47
			// dimond finder
			// event47 - diamond finder slider
			/*
			setTimeout(function() {
			$("a.ui-slider-handle").bind("mouseup", function() {
			pmc.diamondFinderClick(this);
			});
	
	
			// event47 - diamond finder checkboxes
			$("div.diamond-shapes input").bind("mousedown", function() {
			pmc.diamondFinderClick(this);
			});
			}, 2000);
			*/
			// event47 - diamond finder search result clickthrough
			$("table#diamond-table tr").filter(function() {
				return this.innerHTML.match(/details/);
			}).bind("mousedown", function() {
				pmc.diamondFinderClick(this);
			});
	
	
			// event48
			// ink & toner search

			$("form#InkSearchForm button.submit").bind("click", function(event) {
				pmc.inkFinderClick(this, $("form#InkSearchForm input.PLACEHOLDER-INPUT").val());
			});
			// event48
			// ink & toner search
	
			window.setTimeout(function() {
				if (pmc.pageName === "UserRegistrationForm") {
	
	
					pmc.isProfileUpdateFormSubmitted = false;
	
	
					$("form#ProfileUpdateForm").submit(function() {
						if (pmc.isProfileUpdateFormSubmitted === false) {
							pmc.isProfileUpdateFormSubmitted = true;
							pmc.interfaceClick(this, "update personal information");
							pmc.ProfileUpdateForm = this;
							window.setTimeout(function() {
								pmc.ProfileUpdateForm.submit();
							}, 50);
							return false;
						}
						return true;
					});
				}
			}, 100);
			// event not firing, TODO: fix
			$("form#OrderStatusTableDisplayForm").bind("submit", function(event) {
				pmc.isOrderStatusTableDisplayFormSubmitted = false;
				if (pmc.isOrderStatusTableDisplayFormSubmitted === false) {
					pmc.isOrderStatusTableDisplayFormSubmitted = true;
					pmc.interfaceClick(this, "order status history find");
					pmc.OrderStatusTableDisplayForm = this;
					window.setTimeout(function() {
						pmc.OrderStatusTableDisplayForm.submit();
					}, 50);
					return false;
				}
				return true;
			});
			
			
			//$('a.product-details-tabs[title*="Free Concierge"]').bind('click', function(event) {
			//	pmc._conciergeTabClick(event);
			//});
	
			// deprecated
			$("form#OrderStatusTableDisplayForm button.print-link").bind("click", function(event) {
				pmc.interfaceClick(this, "order status history print");
			});
	
			$("button.print-link.submit").bind("click", function(event) {
				pmc.interfaceClick(this, "order status history print");
			});		
	
	
			$("form#paymentMethodDisplay a.edit-link").bind("click", function(event) {
				pmc.interfaceClick(this, "edit payment method");
			});
	
	
			$("form#paymentMethodDisplay a.delete-link").bind("click", function(event) {
				pmc.interfaceClick(this, "delete payment method");
			});
	
	
			$("form#WishListDisplayForm a.submit").bind("mousedown", function(event) {
				pmc.interfaceClick(this, "create wishlist");
			});
	
	
			$("form#WishListDisplayForm ul.inline-links a.email-link").bind("click", function(event) {
				pmc.interfaceClick(this, "email wishlist");
			});
	
	
			$("form#WishListDisplayForm ul.inline-links a.delete-link").bind("click", function(event) {
				pmc.interfaceClick(this, "delete wishlist");
			});
	
	
			$("form#AddressBookForm").bind("click", function(event) {
				if (event.target !== undefined) {
					if ($(event.target).text().match("Add an address") !== null) {
						pmc.interfaceClick(this, "add address");
					}
				}
			});
	
	
			$("form#AddressBookForm a.edit-link").bind("click", function(event) {
				pmc.interfaceClick(this, "edit address");
			});
	
	
			$("form#AddressBookForm a.delete-link").bind("click", function(event) {
				pmc.interfaceClick(this, "delete address");
			});
			/*
			 $("form#CommunicationForm").bind("submit", function(event) {
			 //if ($(this).text().match("Update") !== null) {
			 pmc.isCommunicationFormSubmitted = false;
			 if (pmc.isCommunicationFormSubmitted === false) {
			 pmc.isCommunicationFormSubmitted = true;
			 pmc.interfaceClick(this, "update communication preferences");
			 pmc.CommunicationForm = window.setTimeout(function() {
			 pmc.CommunicationForm.submit();
			 }, 100);
			 return false;
			 }
			 return true;
			 //	}
			 });
			 */
	
	
			$("button.obiValidate").bind("click", function(event) {
				pmc.interfaceClick(this, "validate items by item number");
			});
			$(".selectaddress p a[onclick]").bind("click", function(event) {
				pmc.interfaceClick(this, "ship to multiple addresses");
			});
			$(".newaddress p a[onclick]").bind("click", function(event) {
				pmc.interfaceClick(this, "ship to multiple addresses");
			});
			$("#multitab").closest("a").bind("click", function(event) {
				pmc.interfaceClick(this, "ship to multiple addresses");
			});
			// deprecated
			$("button#multipleShipButton").bind("click", function(event) {
				pmc.interfaceClick(this, "ship to multiple addresses");
			});
	
			$("#shippingList li div a.bodycopy-newcheckout-regular").bind("click", function(event) {
				pmc.interfaceClick(this, "edit this address");
			});
			$("#addressselect p span a[onclick]").bind("click", function(event) {
				pmc.interfaceClick(this, "new address");
			});
			// deprecated
			$('button#giftMsgUrl.button').bind("click", function(event) {
				pmc.interfaceClick(this, "add a gift message");
			});
	
			// deprecated
			$('button#giftMsgUrl1.button').bind("click", function(event) {
				pmc.interfaceClick(this, "add a gift message");
			});
	
			$("#singletab").closest("a").bind("click", function(event) {
				pmc.interfaceClick(this, "ship to single address");
			});
			$("div.h2-line form select").bind("change", function(event) {
				/*
				 -sort by best match
				 - sort by price (high to low)
				 - sort by price (low to high)
				 - sort by brand (a to z)
				 - sort by brand (z to a)
				 - sort by ratings (high to low)
				 */
				if (pmc.pageType === "Search" || pmc.pageType === "Category") {
					pmc.interfaceClick(this, "Sort by: " + this[this.selectedIndex].text);
				}
			});
	
	
			// Issue #16056
			$("div#divSort select").bind("change", function(event) {
				/*
				 - sort by best match
				 - sort by price (high to low)
				 - sort by price (low to high)
				 - sort by brand (a to z)
				 - sort by brand (z to a)
				 - sort by ratings (high to low)
				 */
				if (pmc.isTablet === true) {
					if (pmc.pageType === "Search" || pmc.pageType === "Category") {
						pmc.interfaceClick(this, "Sort by: " + this[this.selectedIndex].text);
					}
				}
			});
	
	
			$("div.h2-line a").bind("click", function(event) {
                /*
                //    show 24 items per page
                 //    show 48 items per page
                 //    show all items
                 */
                if (pmc.pageType === "Search" || pmc.pageType === "Category") {
                    pmc.interfaceClick(this, $(this).parents("ul").prev().text() + " " + $(this).text());
                }
            });

			$("form#CashCardForm button").on("click", function(event) {
				var btntxt = $(event.target).text();
				if ( btntxt !== undefined) {
					if (btntxt === "Apply Costco Cash Card")
						pmc.interfaceClick(this, "apply cash card");
					if (btntxt === "Show Balance")
						pmc.interfaceClick(this, "show cash card balance");
				}
			});

			$("form#PromotionCodeForm").bind("click", function(event) {
				if ($(event.target).text() !== undefined) {
					if ($(event.target).text() === "Apply Code") {
						pmc.interfaceClick(this, "apply promo code");
					}
				}
			});
			
			$(".shipModeId").on("click", function(event) {
				var shipModeId = $(this).val();
				if (shipModeId !== undefined) {
					pmc.interfaceClick(this, "delivery - " + $(event.target).parent().text().trim() );
				}
			});
			
			$('.dod-gift-msg-panel a' ).on('click', function(event) {
				pmc.interfaceClick(this, "delivery - add gift message" );
			});	
	
			window.setTimeout(function() {
				// not firing, TODO; fix.
				$("div.address a").bind("click", function(event) {
					pmc.interfaceClick(this, $(this).text());
				});
			}, 1000);
		}
	} catch(error){
		pmc.debugStatus("DOM Ready: " + error);
	}

};
// Custom Code : Page Scrape RELOCATED end


// ProductCodeSiteCatalyst.js begin
var s_account=pmc.account;
var sc_omni=s_gi(s_account);
sc_omni.debugTracking=false;
sc_omni.charSet = "UTF-8";

/* Link and ClickMap tracking */
sc_omni.trackDownloadLinks=true;
sc_omni.trackExternalLinks=true;
sc_omni.trackInlineStats=true;
sc_omni.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
sc_omni.linkInternalFilters="javascript:,.";
sc_omni.linkLeaveQueryString=false;
sc_omni.linkTrackVars="None";
sc_omni.linkTrackEvents="None";


sc_omni.usePlugins=true;
function sc_omni_doPlugins(s) {
	/* Add usage of plugins here */
}
sc_omni.doPlugins=sc_omni_doPlugins;

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
sc_omni.visitorNamespace = "costco";
sc_omni.trackingServer = pmc.trackingServer;
if (pmc.trackingServerSecure.length > 0) {
            sc_omni.trackingServerSecure = pmc.trackingServerSecure;
}
// ProductCodeSiteCatalyst.js end


sc_omni.loadModule("Integrate")
sc_omni.Integrate.onLoad=function(s,m){
// ProductCodeFire.js begin
// scode population

pmc._pageView = function() {
	// Page View has to occur as the final call. The reason is that some variables are being set prior to the page view event.
	try {
		if (pmc.setCustomPageViewAttributes == true) {
			s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar26,eVar75,eVar73,events';
	
			s.events = 'event1';
			if (pmc.linkTrackEvents && pmc.linkTrackEvents.length > 0) {
				s.events += pmc.linkTrackEvents;
			}
			if (pmc.linkTrackVars && pmc.linkTrackVars.length > 0) {
				s.linkTrackVars += pmc.linkTrackVars;
			}
			s.eVar1 = pmc.pageName;
			s.eVar2 = pmc.pageType;
			s.eVar3 = pmc.sitePlatform;
			s.eVar4 = pmc.lang;
			s.eVar73 = pmc.pmcPSTDate;
			s.eVar75 = pmc.buildNumber;
	
			if (pmc.authenticationStatus && pmc.authenticationStatus.length > 0) {
				s.eVar26 = pmc.authenticationStatus;
				s.linkTrackVars += ',eVar26';
			}
	
			if (pmc.memberStatus && pmc.memberStatus.length > 0) {
				s.eVar25 = pmc.memberStatus;
				s.linkTrackVars += ',eVar25';
			}
			if (pmc.productString && pmc.productString.length > 0) {
				s.products = pmc.productString;
			}
	
			if (pmc.codeEmail && pmc.codeEmail.length > 0) {
					s.eVar30 = pmc.codeEmail;
					s.linkTrackVars += 'eVar30,eVar28,eVar29';
					pmc.linkTrackEvents += ',event30';
					s.events += ',event30';
					pmc.channelAttributionLastTouch = 'Email';
					pmc.channelAttributionLinear = 'Email';
			}
			if (pmc.codeExternal && pmc.codeExternal.length > 0) {
					s.eVar31 = pmc.codeExternal;
					s.linkTrackVars += 'eVar31,eVar28,eVar29';
					pmc.linkTrackEvents += ',event31';
					s.events += ',event31';
					pmc.channelAttributionLastTouch = 'External link';
					pmc.channelAttributionLinear = 'External link';
			}
			if (pmc.codeInternal && pmc.codeInternal.length > 0) {
					s.eVar32 = pmc.codeInternal;
					s.linkTrackVars += 'eVar32,eVar28,eVar29';
					pmc.linkTrackEvents += ',event32';
					s.events += ',event32';
					pmc.channelAttributionLastTouch = 'Costco link';
					pmc.channelAttributionLinear = 'Costco link';
			}
			if (pmc.codeSocial && pmc.codeSocial.length > 0) {
					s.eVar33 = pmc.codeSocial;
					s.linkTrackVars += 'eVar33,eVar28,eVar29';
					pmc.linkTrackEvents += ',event33';
					s.events += ',event33';
					pmc.channelAttributionLastTouch = 'Social link';
					pmc.channelAttributionLinear = 'Social link';
			}
			if (pmc.codeQR && pmc.codeQR.length > 0) {
					s.eVar34 = pmc.codeQR;
					s.linkTrackVars += 'eVar34,eVar28,eVar29';
					pmc.linkTrackEvents += ',event34';
					s.events += ',event34';
					pmc.channelAttributionLastTouch = 'QR Code';
					pmc.channelAttributionLinear = 'QR Code';
			}
			if (pmc.searchEngineReferrer && pmc.searchEngineReferrer.length > 0) {
				pmc.channelAttributionLastTouch = 'Search engine';
				pmc.channelAttributionLinear = 'Search engine';
			}
			if (pmc.channelAttributionLastTouch && pmc.channelAttributionLastTouch.length > 0) {
				s.eVar28 = pmc.channelAttributionLastTouch;
				s.linkTrackVars += 'eVar28';
			}
			if (pmc.channelAttributionLinear && pmc.channelAttributionLinear.length > 0) {
				s.eVar29 = pmc.channelAttributionLinear;
				s.linkTrackVars += 'eVar29';
			}
			if (pmc.storeNumber && pmc.storeNumber.length > 0) {
				// Issue #16013
				if (pmc.knownPage != null) {
					if (pmc.knownPage.length > 0) {
						if (pmc.knownPage[0].title == "WarehouseLocatorDetailsView") {
							s.events += ",event42";
						}
					}
				}
				s.eVar42 = pmc.storeNumber;
				s.linkTrackVars += 'eVar42';
			}
			// njh:1242
			if ( pmc.videoExists ) {
				s.linkTrackVars += 'eVar54';
			    s.eVar54 = 'yes';
			};


		}
	
		s.t();
	} catch(error){
		this.debugStatus("_pageView: " + error);
	}
};

/*
 *
 * PageView helper functions
 * These will be called prior to calling the pageView function
 *
 */

pmc._pageViewCategoryPage = function() {
	if (pmc.breadcrumbs && pmc.breadcrumbs.length > 0) {
		s.eVar7 = pmc.getCategoryBreadcrumbsString();
		pmc.linkTrackVars += ',eVar7';
	}
};
/*
 *
 * Query String results from external sources
 *
 */
pmc._visitFromEmail = function() {//remove
};

pmc._visitFromExternal = function() {//remove
};

pmc._visitFromInternal = function() {//remove
};

pmc._visitFromSocial = function() { // remove
};

pmc._visitFromQR = function() {//remove
};



/*
 *
 * Rich Relevance
 *
 */
pmc._recommendationClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar36,eVar37,eVar38,eVar73,events';
		s.events = s.linkTrackEvents = 'event36';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar36 = pmc.recommendationStrategy;
		s.eVar37 = pmc.recommendationPlacement;
		s.eVar38 = pmc.recommendationTargetProduct;
		s.tl(myevent, 'o', 'rich relevance click');
	} catch(error){
		this.debugStatus("_recommendationClick: " + error);
	}
};
/*
*
* Checkout process pages
*
*/
// cartView - OrderItemDisplayViewShiptoAssoc. Not fired on page view, so the following line will be fired as an event.

pmc._cartRemove = function(myevent, orderItemArray) {
	try {
		var completeString = "", currentProd = {}, iaLen = 0, i = 0;
	
		if (pmc.hasValue(orderItemArray)) {
			s.linkTrackVars = 'eVar3,eVar4,products,eVar73,events';
			s.eVar3 = pmc.sitePlatform;
			s.eVar4 = pmc.lang;
			s.eVar73 = pmc.pmcPSTDate;
	
			s.events = s.linkTrackEvents = 'event25';
			
			var i = 0, len = orderItemArray.length;	
			for (; i < len; i++) {
				var currentProd = orderItemArray[i];
				currentProd.merchandisingEvar = [];
				currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar52", currentProd.itemProductId));
				currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar53", currentProd.description));
			}
			s.products = pmc.getProductString(orderItemArray);
			s.tl(myevent, 'o', 'cart removal');
		}
	} catch(error){
		this.debugStatus("_cartRemove: " + error);
	}
};

pmc._purchase = function() {
	try {
		if (pmc.order) {
	
			// Issue #14911
			if (pmc.order.membershipNumber && pmc.order.membershipNumber.length > 0) {
				s.eVar25 = 'member';
			} else {
				s.eVar25 = 'non-member';
			}
	
			var orderItemArray = pmc.order.orderItems;
			if (orderItemArray.length > 0) {
	
				pmc.linkTrackVars += ',products,purchaseID,eVar25';
				pmc.linkTrackEvents += ',purchase';
						
				var i = 0, len = orderItemArray.length;	
				for (; i < len; i++) {
					var currentProd = orderItemArray[i];
					currentProd.merchandisingEvar = [];
					currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar52", currentProd.itemProductId));
					currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar53", currentProd.description));
				}
				pmc.productString = pmc.getProductString(orderItemArray);
				s.purchaseID = pmc.order.number;
			}
			if (pmc.order.excludedItems.length > 0) {
				pmc.linkTrackVars += ',eVar25';
				// Issue #14911
				pmc._excludedItems(null, pmc.order.excludedItems);
			}
		}
	} catch(error){
		this.debugStatus("_purchase: " + error);
	}
};


pmc._cartCheckout = function(myevent, orderItemArray) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,products,eVar73,events';
		s.events = s.linkTrackEvents = 'event26';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;		
		var i = 0, len = orderItemArray.length;	
		for (; i < len; i++) {
			var currentProd = orderItemArray[i];
			currentProd.merchandisingEvar = [];
			currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar52", currentProd.itemProductId));
			currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar53", currentProd.description));
		}
		s.products = pmc.getProductString(orderItemArray);
		s.tl(myevent, 'o', 'cart checkout');
	} catch(error){
		this.debugStatus("_cartCheckout: " + error);
	}
};
pmc._cartShip = function() {
	pmc.linkTrackVars += ',products,eVar27';
	pmc.linkTrackEvents += ',event27';
	if (pmc.order) {
		var orderItemArray = pmc.order.orderItems;
		var i = 0, len = orderItemArray.length;	
		for (; i < len; i++) {
			var currentProd = orderItemArray[i];
			currentProd.merchandisingEvar = [];
			currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar52", currentProd.itemProductId));
			currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar53", currentProd.description));
		}
		pmc.productString = pmc.getProductString(orderItemArray);
	}
};

pmc._cartDeliveryOptions = function() {
	pmc.linkTrackVars += ',products';
	pmc.linkTrackEvents += ',event37';
	if (pmc.order) {
		var orderItemArray = pmc.order.orderItems;
		var i = 0, len = orderItemArray.length;	
		for (; i < len; i++) {
			var currentProd = orderItemArray[i];
			currentProd.merchandisingEvar = [];
			currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar52", currentProd.itemProductId));
			currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar53", currentProd.description));
		}
		pmc.productString = pmc.getProductString(orderItemArray);
	}
};

pmc._cartShipClick = function(myevent) {
	try {
		if (pmc.numberOfAddressesSelected && pmc.numberOfAddressesSelected > 0) {
			s.eVar3 = pmc.sitePlatform;
			s.eVar4 = pmc.lang;
			s.eVar73 = pmc.pmcPSTDate;
			s.linkTrackVars = 'eVar3,eVar4,eVar27,eVar73';
			s.linkTrackEvents = 'None';
			s.eVar27 = pmc.numberOfAddressesSelected;
			s.linkTrackVars = 'eVar27';
			s.tl(myevent, 'o', 'shipping address count');
		}
	} catch(error){
		this.debugStatus("_cartShipClick: " + error);
	}
};
pmc._cartPay = function() {
	pmc.linkTrackEvents += ',event28';
};
pmc._cartReview = function() {
	pmc.linkTrackVars += ',products';
	pmc.linkTrackEvents += ',event29';
	if (pmc.order) {
		var orderItemArray = pmc.order.orderItems;
		var i = 0, len = orderItemArray.length;	
		for (; i < len; i++) {
			var currentProd = orderItemArray[i];
			currentProd.merchandisingEvar = [];
			currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar52", currentProd.itemProductId));
			currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar53", currentProd.description));
		}
		pmc.productString = pmc.getProductString(orderItemArray);
	}
};

pmc._cartAdd = function(myevent, orderItemArray) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar24,eVar19,products,eVar73,events';
		// merchandising eVar
		s.events = s.linkTrackEvents = 'event24';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		//s.eVar19 = pmc.roundStar(pmc.starRating);
		// Issue #14910
		s.eVar19 = pmc.starRating;
		// add the merchandising eVar
		var i = 0, len = orderItemArray.length;
	
		for (; i < len; i++) {
			// TO DO - check currentProd.itemNumber (SKU). If it does not exist, then don't add eVar52, eVar53.
			var currentProd = orderItemArray[i];
			currentProd.merchandisingEvar = [];
			currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar24", pmc.pageType));
			currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar52", currentProd.itemProductId));
			currentProd.merchandisingEvar.push(pmc.newNameValuePair("eVar53", currentProd.description));
		}
	
		s.products = pmc.getProductString(orderItemArray);
		s.tl(myevent, 'o', 'cart add');
	} catch(error){
		this.debugStatus("_cartAdd: " + error);
	}
};

pmc._inSitePromoClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar5,eVar73,events';
		s.events = s.linkTrackEvents = 'event5';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar5 = pmc.promotionName;
		s.tl(myevent, 'o', 'eSpot click');
	} catch(error){
		this.debugStatus("_inSitePromoClick: " + error);
	}
};

pmc._navClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar6,eVar73,events';
		s.events = s.linkTrackEvents = 'event6';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar6 = pmc.navigationElement;
		s.tl(myevent, 'o', 'navigation click');
	} catch(error){
		this.debugStatus("_navClick: " + error);
	}
};

// njh:1242
pmc._videoLinkClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar55,events';
		s.events = s.linkTrackEvents = 'event55';
		s.eVar55 = 'yes';
		s.tl(myevent, 'o', 'liveclicker video clicked');
	} catch(error){
		this.debugStatus("_videoLinkClick: " + error);
	}
};

// pmc._conciergeTabClick = function(myevent) {
// 	try {
// 		pcl.clearSObj();
// 		pcl.addEvent( 59, {
// 			eVar15: pmc.productID, // product id
// 			eVar16: pmc.productName, // product name
// 			eVar18: pmc.productDetailType, // product detail type
// 			eVar19: pmc.getProductRatingFromDetailsPage() // star rating
// 		});
// 		s.tl(myevent, 'o', 'concierge tab clicked');
// 	} catch(error){
// 		this.debugStatus("_conciergeTabClick: " + error);
// 	}
// };

pmc._countSearchResults = function() {
	pmc.searchKeyword = pmc.urlDecode(pmc.searchKeyword);
	pmc.linkTrackVars += ',eVar10,events';
	pmc.linkTrackEvents += ',event11';
	s.eVar10 = pmc.searchKeyword;
};

pmc._refineBrowse = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar8,eVar9,eVar73,events';
		s.events = s.linkTrackEvents = 'event8';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar8 = pmc.browseRefinementSelection;
		s.eVar9 = pmc.browseRefinementCategory;
		s.tl(myevent, 'o', 'browse refinement');
		//TODO - populate an eVar with the refinement codes, if applicable.
	} catch(error){
		this.debugStatus("_refineBrowse: " + error);
	}
};

pmc._search = function(myevent) {
	try {
		pmc.searchKeyword = pmc.searchKeyword.toLowerCase();
		s.linkTrackVars = 'eVar3,eVar4,eVar10,eVar11,eVar73,events';
		s.events = s.linkTrackEvents = 'event10';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar10 = pmc.searchKeyword;
		s.eVar11 = (pmc.searchType != "") ? pmc.searchType : "typed";
		s.tl(myevent, 'o', 'search button click');
	} catch(error){
		this.debugStatus("_search: " + error);
	}
};

pmc._refineSearch = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar12,eVar13,eVar73,events';
		s.events = s.linkTrackEvents = 'event12';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar12 = pmc.searchRefinementSelection;
		s.eVar13 = pmc.searchRefinementCategory;
		s.tl(myevent, 'o', 'search refinement');
	} catch(error){
		this.debugStatus("_refineSearch " + error);
	}
};

pmc._clickSearchResult = function(myevent) {
	try {
		pmc.searchKeyword = pmc.urlDecode(pmc.searchKeyword);
		s.linkTrackVars = 'eVar3,eVar4,eVar10,eVar73,events';
		s.events = s.linkTrackEvents = 'event13';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar10 = pmc.searchKeyword;
		s.tl(myevent, 'o', 'search result click');
	} catch(error){
		this.debugStatus("_clickSearchResult: " + error);
	}
};

pmc._interfaceClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar14,eVar73,events';
		s.events = s.linkTrackEvents = 'event14';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar14 = pmc.interfaceClickElement;
		s.tl(myevent, 'o', 'interface click');
	} catch(error){
		this.debugStatus("_interfaceClick: " + error);
	}
};

pmc._socialShare = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar50,eVar73,events';
		s.events = s.linkTrackEvents = 'event50';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar50 = pmc.socialShareType;
		s.tl(myevent, 'o', 'social share');
	} catch(error){
		this.debugStatus("_socialShare: " + error);
	}
};

pmc.setIdandNameMerchEvars = function() {
	if (pmc.productID && pmc.productID > 0) {
		if (s.linkTrackVars.indexOf("products") < 0){
			s.linkTrackVars += ',products';
		}
		var prodName = "";
		if (pmc.productName && pmc.productName.length > 0) {
			var prodName = "|eVar53=" + pmc.productName.substring(0,30).replace("|", "_").replace(";", "_").replace(",", "_");			
		}
		s.products = ";;;;;eVar52=" + pmc.productID + prodName;
	}
};

pmc._pageViewProductDetailsPage = function() {
	pmc.linkTrackVars += ',eVar15,eVar16,eVar18,eVar19,eVar20,events';
	pmc.linkTrackEvents += ',event17';
	if (pmc.sitePlatform === 'PC') {
		var hashString = window.location.hash;
		if (hashString && hashString.indexOf("review") > 0)
		{
			pmc.linkTrackEvents += ',event22';
		} else {
			pmc.linkTrackEvents += ',event18';
		}		
	}
	s.eVar15 = pmc.productID;
	s.eVar16 = pmc.productName;
	pmc.setIdandNameMerchEvars();
	s.eVar18 = pmc.productDetailType;
	s.eVar19 = pmc.starRating;
	if (pmc.memberProductType != undefined) {
		s.eVar20 = pmc.memberProductType;
	}
};

pmc._productDetailsClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar15,eVar16,eVar18,eVar19,eVar20,eVar73,events';
		s.events = s.linkTrackEvents = 'event18';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar15 = pmc.productID;
		pmc.setIdandNameMerchEvars();
		s.eVar16 = pmc.productName;
		s.eVar18 = pmc.productDetailType;
		s.eVar19 = pmc.starRating;
		if (pmc.memberProductType != undefined) {
			s.eVar20 = pmc.memberProductType;
		}
		s.tl(myevent, 'o', 'product details tab');
	} catch(error){
		this.debugStatus("_productDetailsClick: " + error);
	}
};

pmc._productSpecsClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar15,eVar16,eVar18,eVar19,eVar20,eVar73,events';
		s.events = s.linkTrackEvents = 'event19';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar15 = pmc.productID;
		s.eVar16 = pmc.productName;
		pmc.setIdandNameMerchEvars();
		s.eVar18 = pmc.productDetailType;
		s.eVar19 = pmc.starRating;
		if (pmc.memberProductType != undefined) {
			s.eVar20 = pmc.memberProductType;
		}
		s.tl(myevent, 'o', 'product specifications tab');
	} catch(error){
		this.debugStatus("_productSpecsClick: " + error);
	}
};

pmc._productTermsClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar15,eVar16,eVar18,eVar19,eVar20,eVar73,events';
		s.events = s.linkTrackEvents = 'event20';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar15 = pmc.productID;
		s.eVar16 = pmc.productName;
		pmc.setIdandNameMerchEvars();
		s.eVar18 = pmc.productDetailType;
		s.eVar19 = pmc.starRating;
		if (pmc.memberProductType != undefined) {
			s.eVar20 = pmc.memberProductType;
		}
		s.tl(myevent, 'o', 'product terms tab');
	} catch(error){
		this.debugStatus("_productTermsClick: " + error);
	}
};

pmc._productReturnsClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar15,eVar16,eVar18,eVar19,eVar20,eVar73,events';
		s.events = s.linkTrackEvents = 'event21';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar15 = pmc.productID;
		s.eVar16 = pmc.productName;
		pmc.setIdandNameMerchEvars();
		s.eVar18 = pmc.productDetailType;
		s.eVar19 = pmc.starRating;
		if (pmc.memberProductType != undefined) {
			s.eVar20 = pmc.memberProductType;
		}
		s.tl(myevent, 'o', 'product returns tab');
	} catch(error){
		this.debugStatus("_productReturnsClick: " + error);
	}
};

pmc._productReviewsClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar15,eVar16,eVar18,eVar19,eVar20,eVar73,events';
		s.events = s.linkTrackEvents = 'event22';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar15 = pmc.productID;
		s.eVar16 = pmc.productName;
		pmc.setIdandNameMerchEvars();
		s.eVar18 = pmc.productDetailType;
		s.eVar19 = pmc.starRating;
		if (pmc.memberProductType != undefined) {
			s.eVar20 = pmc.memberProductType;
		}
		s.tl(myevent, 'o', 'product review tab');
	} catch(error){
		this.debugStatus("_productReviewsClick: " + error);
	}
};

pmc._wishlistAddLocation = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar23,eVar15,eVar16,eVar20,eVar23,eVar73,events';
		s.events = s.linkTrackEvents = 'event23';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar23 = pmc.pageType;
		s.eVar15 = pmc.productID;
		s.eVar16 = pmc.productName;
		pmc.setIdandNameMerchEvars();
		if (pmc.memberProductType != undefined) {
			s.eVar20 = pmc.memberProductType;
		}
		s.tl(myevent, 'o', 'wishlist add');
	} catch(error){
		this.debugStatus("_wishlistAddLocation: " + error);
	}
};

pmc._storeFindSearch = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar40,eVar41,list1,eVar73,events';
		s.events = s.linkTrackEvents = 'event40';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar40 = pmc.storeLocatorLocation;
		s.eVar41 = pmc.storeLocatorFormSubmitLocation;
	
		s.list1 = pmc.arrayToString(pmc.storeOptionsSelected, "|");
		s.tl(myevent, 'o', 'warehouse find');
	} catch(error){
		this.debugStatus("_storeFindSearch: " + error);
	}
};

pmc._storeBrowseInit = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar73,events';
		s.events = s.linkTrackEvents = 'event41';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.tl(myevent, 'o', 'warehouse browse');
	} catch(error){
		this.debugStatus("_storeBrowseInit: " + error);
	}
};

pmc._storeViewDetails = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar42,eVar73,events';
		s.events = s.linkTrackEvents = 'event42';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar42 = pmc.storeNumber;
		s.tl(myevent, 'o', 'warehouse details');
	} catch(error){
		this.debugStatus("_storeViewDetails: " + error);
	}
};

pmc._storeViewDirections = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar42,eVar73,events';
		s.events = s.linkTrackEvents = 'event43';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar42 = pmc.storeNumber;
		s.tl(myevent, 'o', 'warehouse directions');
	} catch(error){
		this.debugStatus("_storeViewDirections: " + error);
	}
};

pmc._emailSignUp = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar44,eVar73,events';
		s.events = s.linkTrackEvents = 'event44';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar44 = pmc.emailSignUpPageLocation;
		s.tl(true, 'o', 'email sign up');
	} catch(error){
		this.debugStatus("_inSitePromoClick: " + error);
	}
};

pmc._checkCardBalance = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar45,eVar73,events';
		s.events = s.linkTrackEvents = 'event45';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar45 = pmc.cardCheckPageLocation;
		s.tl(myevent, 'o', 'check card balance');
	} catch(error){
		this.debugStatus("_inSitePromoClick: " + error);
	}
};

pmc._excludedItems = function(myevent, excludedItemArray) {
	try {
		var len = excludedItemArray.length;
		var qty = 1;
	
		// Issue #14911
		s.linkTrackVars = 'eVar3,eVar4,eVar25,eVar46,eVar73,events';
		s.linkTrackEvents = 'event46';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		for (var i = 0; i < len; i++) {
			s.events = s.linkTrackEvents;
			try {
				qty = excludedItemArray[i].quantity;
				if (qty) {
					qty = qty * 1;
				}
				if (qty > 1) {
					s.events = s.events + '=' + qty;
				}
			} catch (errMsg) {
				pmc.debugStatus("Checkout flow - Confirmation | Excluded Items | Quantity is not a number");
			}
			
			// Kanbanize issue 635
            s.eVar46 = excludedItemArray[i].itemNumber;
            if (s.eVar46 != null && s.eVar46.length > 0) {
                    s.tl(true, 'o', 'excluded items');
            }
		}
		s.linkTrackVars = '';
		s.events = s.linkTrackEvents = '';
		s.eVar46 = '';
		// reset these variables for the page view calls that follow.
	} catch(error){
		this.debugStatus("_excludedItems: " + error);
	}
};

pmc._diamondFinderClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar47,eVar73,events';
		s.events = s.linkTrackEvents = 'event47';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar47 = pmc.diamondFinderClickToggles.changedFromDefaults;
		s.tl(myevent, 'o', 'diamond finder');
	} catch(error){
		this.debugStatus("_diamondFinderClick: " + error);
	}
};

pmc._inkFinderClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar48,eVar73,events';
		s.events = s.linkTrackEvents = 'event48';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar48 = pmc.inkFinderSearchTerm;
		s.tl(myevent, 'o', 'ink finder');
	} catch(error){
		this.debugStatus("_inkFinderClick: " + error);
	}
};

pmc._partnerClick = function(myevent) {
	try {
		s.linkTrackVars = 'eVar3,eVar4,eVar49,eVar73,events';
		s.events = s.linkTrackEvents = 'event49';
		s.eVar3 = pmc.sitePlatform;
		s.eVar4 = pmc.lang;
		s.eVar73 = pmc.pmcPSTDate;
		s.eVar49 = pmc.partnerReferral;
		s.tl(myevent, 'o', 'partner click');
	} catch(error){
		this.debugStatus("_partnerClick: " + error);
	}
};

// When comparing multiple items. I expect an array and then I will fire off the beacon multiple times.
pmc._compareProductClick = function(myevent, productIdArray) {
	try {
		window.setTimeout(function(){
			var len = productIdArray.length;
			s.linkTrackVars = 'eVar3,eVar4,eVar15,eVar73,events';
			s.events = s.linkTrackEvents = 'event16';
			s.eVar3 = pmc.sitePlatform;
			s.eVar4 = pmc.lang;
			s.eVar73 = pmc.pmcPSTDate;
			for (var i = 0; i < len; i++) {
				s.eVar15 = productIdArray[i];
				pmc.productID = productIdArray[i];
				pmc.setIdandNameMerchEvars();
				s.tl(myevent, 'o', 'compare products');
				for (var j=0;j<2000;j++){j++;}
			}
			// Now fire one more event just to see how many times the compare is used total.
			window.setTimeout(function(){
				s.linkTrackVars = 'eVar3,eVar4,eVar73,events';
				s.events = s.linkTrackEvents = 'event15';
				s.tl(myevent, 'o', 'compare products');
			},10);
		},10);
	} catch(error){
		this.debugStatus("_compareProductClick: " + error);
	}
};

sc_omni.trackingServer = pmc.trackingServer;
if (pmc.trackingServerSecure.length > 0) {
	s.trackingServerSecure = pmc.trackingServerSecure;
}

// ProductCodeFire.js end


// ProductCodePharmacy.js begin
// 2014.10.30-16:07

window.prx = {

ver: "2014.10.30-21:00",

isPharmacy: function () {
	
	var ispharm = false;
	try {
		ispharm = ( $('#header img').first().attr('src').indexOf('costco-rx') >= 0 );
	} catch(e) { }
	if ( !ispharm )
		return false;
		
	pdbDebugMode( undefined, prx.debugSymbols ); // debug init
	pcl.setEventObject( prx ); // a reference to this object for dispatching
	
	try {
		prx.onPageLoad();
	} catch (e) { PDB(e, "^DEBUGGER"); }
	
	return true;
},
onPageLoad: function() {

	prx.isProduction = false;
	prx.currentEnvironment = "";
	prx.currentEnvironment = pcl.getCookie("s_tagEnv");
	prx.isProduction = !( pcl.inURL('vqa2') || prx.currentEnvironment === "dev" || prx.currentEnvironment === "stage" );
	prx.account = prx.isProduction ? "cwcpharmacyprod" : "cwcpharmacytest";

	PDB( "!! PHARMACY PAGE LOAD: environment: " + prx.account + ( prx.isProduction ? " production" : " test" ) + prx.currentEnvironment );
	
	// GROUP 1: events that fire on all pages
	prx.event1();
	
	// group 2 -- mutually exclusive page load
	pcl.processEventArray(true, [
		{ eventID:30, inURL: "EMID=" },
		{ eventID:31, inURL: "EXTID=" },
		{ eventID:32, inURL: "COSTID=" },
		{ eventID:33, inURL: "SOCID=" }
	]);

	// group 1 -- map script name to site section
	pcl.processEventArray(true, [
		{ inScriptName: "home|PharmacyRedirectingToPatientProfileCmd", siteSection:"home delivery" },
		{ inScriptName: "WarehouseLocator", siteSection:"warehouse locations" },
		{ inScriptName: "warehouse|PharmacyCheckWHPrescriptionStatusDetailsCmd", siteSection:"warehouse" },
		{ inScriptName: "drug-|PharmacyDrugAlphabeticalSearchCmd", siteSection:"drug directory" },
		{ inScriptName: "customer-service|pharmacy-customer-service.html|contact-us|how-to-use-costco-pharmacy.html", siteSection:"customer service" },
		{ inScriptName: "member-prescription-program", siteSection:"customer service" },
		{ isScript: "AccountRegister|ResetPasswordSuccessView|LogonForm|UserRegistrationAdd|Logon|ChangePassword|UserRegistrationForm", siteSection:"account" },
		{ isScript: "pet-medications.html|adult-immunization-program.html|costco-employees-mail-order.html|prescription-auto-refill-program.html", siteSection:"misc" },
		{ isScript: "prescription-status|PharmacyAddPrescriptionDrugCmd|PharmacyManagePatientProfileCmd|patient-profile", siteSection:"home delivery" },
		{ isScript: "CheckoutDeliveryView", siteSection:"home delivery" },
		{ isScript: "CheckoutCartView", siteSection:"home delivery" },
		{ isScript: "CheckoutShippingView", siteSection:"home delivery" },
		{ isScript: "CheckoutReviewView", siteSection:"home delivery" },
		{ isScript: "medicare-plan-finder.html", siteSection:"misc" },
		{ inUrl: "aisle7", siteSection:"misc" }
		]);

	// group 3 -- handle events by script name
	pcl.processEventsByLookup( prx.scriptName, {
		"home-delivery": { pageName:"home" },
		"PharmacyRedirectingToPatientProfileCmd": { pageName:"home" },
		"LogonForm": { pageName:"log in" },
		"warehouse-pickup": { pageName:"home" },
		"about-home-delivery.html": { eventID:7 },
		"how-to-use-costco-pharmacy.html": { eventID:7 },
		"costco.html": { eventID:7, siteSection:"home delivery"  },
		"home-delivery-frequently-asked-questions.html": { eventID:7 },
		"warehouse-pickup-frequently-asked-questions.html": { eventID:7 },
		"member-prescription-program-frequently-asked-questions.html": { eventID:7 },
		"drug-directory-search-results": { eventID:10 },
		"drug-results-details-price": { eventID:14 },
		"prescription-information": { eventID:16, siteSection:"home delivery" },
		"PharmacyNewPrescriptionOrderVerificationView": { eventID:17, siteSection:"home delivery" },
		"PharmacyNewPrescriptionConfirmationView": { eventID:18, siteSection:"home delivery" },
		"PharmacyCheckRefillPrescriptionDetailsCmd": { /*eventID:19,*/ siteSection: "warehouse" },
		"CheckoutConfirmationView": { /*eventID:21, */ siteSection: "warehouse" }, 
		"transfer-home-delivery": { eventID:23, siteSection: "home delivery" },
		"PharmacyTransferPrescriptionOrderVerificationView": { eventID:24, siteSection: "warehouse" },
		"PharmacyTransferPrescriptionConfirmationView": { eventID:25, siteSection: "warehouse" },
		"PharmacyRefillPrescriptionOrderVerificationView": { eventID:26, siteSection: "home delivery" }, 
		"PharmacyRefillPrescriptionOrderConfirmationView": { eventID:28, siteSection: "home delivery" }, 
		"PharmacyContactUsSendMsgCmd": { eventID:38, siteSection: "customer service"  },
		"WarehouseLocatorView": { eventID:40 },
		"WarehouseLocatorDetailsView": { eventID:42 },	
		"WarehouseLocatorDirectionsView": { eventID:43 },
		"pharmacy-customer-service.html": { eventID:42 }
		});

	// group 4 -- bind UI event handlers
	pcl.processEventArray(false, [
		{ isScript: "AccountRegister|LogonForm|home-delivery", handler: prx.event2and3_bind },
		{ handler: prx.event2and3_loginDetect },
		{ isScript: 'home-delivery|warehouse-pickup', handler: prx.event5_bind },
		{ handler: prx.event6_bind },
		{ handler: prx.event10_bind }
		// { handler: prx.Evt38_ContactUsSubmission_Bind }
		]);

	prx.event1_finish();
	pcl.submitToAnalytics();
	PDB( "!! END PAGE LOAD" );
	
	return true;
},

event1: function() { // --- PAGE VIEW ---

	prx.pageTitle = $(document).find("title").text().trim().toLowerCase();
	prx.drugName = "";
	prx.currentURL = window.location.href;
	prx.scriptName = pcl.scriptNameFromURL();
	prx.siteSection = "";
	prx.pageName = prx.pageTitle;
	prx.pageDetail = "";

	try {
		prx.drugName = prx.pageDetail = pcl.filterOddChars(drugName); // costco defines variable drug name as a global variable
	} catch(e) { }
},
event1_finish: function() { // --- PAGE VIEW --- we do this last in case events changed evar values

	var pageName = prx.siteSection;
	if ( pcl.strNotBlank( prx.pageName ) )
		pageName += " | " + prx.pageName.toLowerCase();
	if ( pcl.strNotBlank( prx.pageDetail ) )
		pageName += " : " + prx.pageDetail.toLowerCase();

	pcl.addEvent(1, {
		eVar1: pageName,
		eVar2: prx.siteSection,
		eVar3: "PC", // platform
		eVar4: "en", // language
		// REVIEW what is the difference between signed in state & membership auth status?
		eVar16: pcl.selExists( "#header-pharmacy-user-box:visible" ) ? 'authenticated' : 'guest',
		eVar25: pcl.selExists( "#header-pharmacy-user-box:visible" ) ? 'authenticated' : 'guest',
		eVar55: window.location, // url
		eVar56: pcl.$Required('meta[name="currentBuildNumber"]').attr("content")
	});
},
event2and3_bind: function() { // --- LOGIN/REGISTRATION ---
	var selector = '#PharmacyLogonForm button, #RegisterForm button, #HDLogonForm button';
	pcl.$Required(selector).on('click', prx.event2and3_loginClick );
},
event2and3_loginClick: function() { 
	// remember which button they clicked so we know if they signed up or logged in
	// when they show up logged in on a subsequent page
	pcl.setCookie( 'pmcauthaction', $(this).attr('title').trim() );
	return true;
},
event2and3_loginDetect: function() { // --- ON SUCCESSFUL AUTHENTICATION ---
	var signedInMethod = pcl.getCookie( 'pmcauthaction' ); 
	if ( signedInMethod.length === 0 )
		return;
	if ( ! pcl.selExists( "#header-pharmacy-user-box:visible" ) ) {
		// keep checking for logged in user box to appear
		setTimeout( prx.event2and3_loginDetect, 1000 );
		return;
	}
	// they weren't signed in before & now they are
	if ( signedInMethod == "Register" )
		pcl.addEvent(3); // registration
	else if ( signedInMethod == "Sign in" )
		pcl.addEvent(2); // authenticated
	pcl.submitToAnalytics();
	pcl.removeCookie( 'pmcauthaction' );
},
event5_bind: function() { // --- E-SPOT LINK CLICK ---
	$('.featureAllItems a').bind('click', prx.event5_espotClick );
},
event5_espotClick: function(event) { // On click of promo element (e-spot link) eVar5
	var evar = pcl.meaningfulName(this);
	pcl.addEvent(5, {
		eVar5: evar
	});
	pcl.submitToAnalytics(event, 'espot click');
},
event6_bind: function() { // --- NAVIGATION CLICK ---
	$('.header-logo').on('click', function(event) { prx.event6_click( event, "logo" ); });
	$('#div_leftnav_pharmacy').on('click', "a", function(event) { prx.event6_click( event, "left nav" ); });
	$('#header_links1').on('click', "a", function(event) { prx.event6_click( event, "top nav" ); });
	$('#lob-navigation').on('click', "a", function(event) { prx.event6_click( event, "top nav" ); });
	$('#breadcrumbs').on('click', "a", function(event) { prx.event6_click( event, "breadcrumb" ); });
	$('#footer a').on('click', function(event) { prx.event6_click( event, 'footer' ); });
},
event6_click: function( event, navArea ) {
	var oNavElement;
	var navName = navArea;
	switch( navArea ) {
	case "logo":
		navName += "top nav | logo";
		break;
	case 'left nav':
		var secName = "";
		$ul = $(event.target).parent();
		sections = $ul.siblings('.sub_section');
		for ( var i = 0 ; i < sections.length ; i++ )
			if ( secName.length === 0 && $ul.index() > $(sections[i]).index() )
				secName = pcl.meaningfulNameLC( sections[i] );
		navName = navArea + ' | ' + secName + " : " + pcl.meaningfulNameLC( event.target );
		break;
	case 'footer':
		oNavElement = $(event.target).parent().siblings('.column-header');
		navName = navArea + ' | ' + pcl.meaningfulNameLC( oNavElement );
		navName += ' : ' + pcl.meaningfulNameLC( event.target );
		break;
	case 'top nav':
		if ( $(event.target).closest('.dropdown-list').length === 1 ) {
			oNavElement = pcl.$Required(event.target).parent().parent().siblings('.dropdown-link');
			navName += ' | ' + pcl.meaningfulNameLC( oNavElement );
			navName += ' : ' + pcl.meaningfulNameLC( event.target );	
		} else {
			navName += ' | ' + pcl.meaningfulNameLC( event.target );
		}
		break;
	default:
		navName += " | " + pcl.meaningfulName( event.target );
	}
	pcl.addEvent( 6, {eVar6: navName} );
	pcl.submitToAnalytics(event, navArea + ' click' );
	return true;
},
event7: function( eProps ) { // --- HELP INITIATION ---
	pcl.addEvent(7, { eVar7: prx.pageTitle } );
	prx.event8_bind();
},
event8_bind: function() { // --- HELP TOPIC CLICK ---
	pcl.$Required('.rx-toc a').on('click', prx.event8_helpClick );
},
event8_helpClick: function(event) {
	pcl.addEvent(8, {
		eVar8: pcl.meaningfulName(this)
	});
	pcl.submitToAnalytics(event, 'help topic click');
	return true;
},
event10: function( eProps ) { // --- DRUG SEARCHES ---
	pcl.addEvent(10, {
		eVar10: pcl.selHTML( '#search-more-link a' )
	});
	prx.event11_DrugSearchResults_Timer();
	prx.event12_bind();
},
event10_bind: function() { // --- ON INITIATION OF DRUG SEARCH EVAR10 ---
	pcl.$Required('#search_submit').bind('mousedown', prx.event10_MouseDown );
	// search-ahead click
	prx.searchType = "";
	$("#results").on("mousedown", "li.ui-menu-item", function(event){
		prx.searchType = "look ahead";
	});
},
event10_MouseDown: function(event) { // --- ON INITIATION OF DRUG SEARCH EVAR10 ---
	pcl.addEvent(10, {
		eVar10: pcl.selVal( '#SimpleSearchForm_SearchTerm' ),
		eVar11: prx.searchType !== "" ? prx.searchType : "typed"
	});
	pcl.submitToAnalytics(event, 'drug search click');
	return true;
},
event11_DrugSearchResults_Timer: function() { // --- ZERO SEARCH RESULT ---
	// neither div is hidden until the JSON call is complete
	if ( pcl.selExists( '#drugNoResults:hidden' ) ) {
		PDB( "detected search results" );
		// search results found - we could report the successful keyword here if we wanted
		// pcl.addEvent(14); 
		// prx.Evar14_DrugName();
		return;
	}
	if ( pcl.selExists( '#drugResults:hidden' ) ) { // no search results
		pcl.addEvent(11, {
			eVar10: pcl.selHTML( '#drug_search_keyword' )
		}); 
		pcl.submitToAnalytics();
		return;
	}
	setTimeout( prx.event11_DrugSearchResults_Timer, 1000 );
},
event12_bind: function() { // --- MORE ON .COM CLICK ---
	pcl.$Required('#search-more-link a').on('click', prx.event12_MoreOnCCCom_Click );
},
event12_MoreOnCCCom_Click: function(event) {
	pcl.addEvent(12, {
		eVar10: pcl.meaningfulName(this)
	});
	pcl.submitToAnalytics(event, 'more on costco.com click');
	return true;
},
event14: function( eProps ) { // --- DRUG DETAIL VIEW ---
	pcl.addEvent(14, {
		eVar14: prx.drugName
	});
},
/*
event19: function( eProps ) { // --- WH Refill
	pcl.addEvent(19);
	// can't validate on live
	// $('.complete_prescription_button').on('click', prx.event20_click );
},
event20_click: function( event ) { // --- WH Refill
	pcl.addEvent(20);
	pcl.submitToAnalytics(event, 'warehouse refill submit click');
	return true;
},
event26: function( eProps ) { // --- HD Refill
	pcl.addEvent(26);	
	// can't validate on live
	// $('.complete_prescription_button').on('click', prx.event27_click );
},
event27_click: function( event ) { // --- HD Refill
	pcl.addEvent(27);
	pcl.submitToAnalytics(event, 'HD refill submit click');
	return true;
},
*/
event30: function( eProps ) { // --- EMAIL CLICKTHROUGH ---
	pcl.addEvent(30, {
		eVar30: pcl.qsVal( "EMID" ),
		eVar28: 'Email',
		eVar29: 'Email'
	});
},
event31: function( eProps ) { // --- EXTERNAL REFERRAL CLICKTHROUGH ---
	pcl.addEvent(31, { 
		eVar31: pcl.qsVal( "EXTID" ),
		eVar28: 'External link',
		eVar29: 'External link'
	});
},
event32: function( eProps ) {  //  --- COSTCO REFERRAL CLICKTHROUGH ---
	pcl.addEvent(32, {
		eVar32: pcl.qsVal( "COSTID" ),
		eVar28: 'Costco link',
		eVar29: 'Costco link'
	});
},
event33: function( eProps ) { // --- SOCIAL REFERRAL CLICKTHROUGH ---
	pcl.addEvent(33, {
		eVar33: pcl.qsVal( "SOCID" ),
		eVar28: 'Social link',
		eVar29: 'Social link'
	});
},
event40: function( eProps ) { // --- WAREHOUSE LOCATOR SEARCHES ---
	prx.event40_WarehouseSearch_Bind(); 
	var searchTerm = pcl.selVal( '#txtLocation');
	var source = "searchpage";
	if ( pcl.inURL( 'fromWLocSubmit=true' ) ) {
		source="navbar";
		searchTerm = pcl.qsVal("location");
	} else if ( searchTerm === "" ) {
		// if this is empty we're waiting for it to be populated by a script
		prx.event42_WarehouseSearch_Timer();
		return;
	}
	pcl.addEvent(40, { 
		eVar40: searchTerm,  // wh locator search term
		eVar41: source
	});
},
event40_WarehouseSearch_Bind: function() { // --- On click of the "try your search on Costco.com" link eVar10 ---
	pcl.$Required('#executeSearch').on('mousedown', prx.event42_WarehouseSearch_Click );
},
event42: function( eProps ) { // --- WAREHOUSE DETAILS VIEW ---
	pcl.addEvent(42, {
		eVar42: pcl.qsVal( "warehouseNumber" )
	});
},
event42_WarehouseSearch_Click: function(event) {
	pcl.addEvent(40, {
		event: event,
		eVar40: pcl.selVal('#txtLocation'),
		eVar41: "searchpage"
	});
	pcl.submitToAnalytics(event, 'warehouse search click');
	return false;
},
event42_WarehouseSearch_Timer: function() {
	var searchTerm = pcl.selVal('#txtLocation');
	if ( searchTerm === "" ) {
		setTimeout( prx.event42_WarehouseSearch_Timer, 1000 );
		return;
	}
	pcl.addEvent(40, {
		eVar40: searchTerm,
		eVar41: "searchpage"
	});
	pcl.submitToAnalytics();
},
event43: function( eProps ) { // --- WAREHOUSE DIRECTIONS VIEW ---
	pcl.addEvent(43, {
		eVar42: pcl.qsVal( "warehouseNumber" )
	}); 
},
debugSymbols: {
	event1: "Page View",
	event2: "Login",
	event3: "Registration",
	event5: "E-spot link Click",
	event6: "Navigation Click",
	event7: "Help Initiation",
	event8: "Help Topic Click",
	event10: "Drug Searches",
	event11: "Zero Search Result",
	event12: "More on .com Click",
	event14: "Drug Detail View",
	event16: "New Rx: Prescription Info",
	event17: "New Rx: Confirm Order",
	event18: "New RX: Thank You",
	event19: "WH Refill: Form Start",
	event20: "WH Refill: Form Submit",
	event21: "WH Refill: Confirmation",
	event23: "Transfer: Prescription Info",
	event24: "Transfer: Confirm Order",
	event25: "Transfer: Thank You",
	event26: "HD Refill: Form Start",
	event27: "HD Refill: Form Submit",
	event28: "HD Refill: Confirmation",
	event29: "Self-Checkout Start",
	event30: "Email Clickthrough",
	event31: "External Referral Clickthrough",
	event32: "Costco Referral Clickthrough",
	event33: "Social Referral Clickthrough",
	event38: "Contact Us Submission",
	event40: "Warehouse Locator Searches",
	event42: "Warehouse Details View",
	event43: "Warehouse Directions View",
	eVar1: "Page Name",
	eVar2: "Site Section",
	eVar3: "Site Platform",
	eVar4: "Language",
	eVar5: "eSpot Link Name",
	eVar6: "Navigation Element",
	eVar7: "Help Menu",
	eVar8: "Help Topic",
	eVar10: "Drug Search Term",
	eVar14: "Drug Name",
	eVar16: "Signed-in state",
	eVar17: "Profile complete",
	eVar25: "Membership Authentication Status",
	eVar27: "Refill checkout method",
	eVar28: "Channel attribution (last touch)",
	eVar29: "Channel attribution (linear)",
	eVar30: "Email tracking code",
	eVar31: "External referral code",
	eVar32: "Costco referral code",
	eVar33: "Social referral code",
	eVar40: "Warehouse locator search term",
	eVar41: "Warehouse locator source",
	eVar42: "Warehouse number",
	eVar54: "Date",
	eVar55: "URL",
	eVar56: "Build Number"
}

}; // prx

// ---------------------------------------------
// PCL -- COMMON LIBRARY
window.pcl = {

// pcl.setEventObject
setEventObject: function( oEvt ) { 
	pcl.oEvt = oEvt;
	pcl.currentURL = window.location.href;
	pcl.scriptName = pcl.scriptNameFromURL();
},
// pcl.processEventArray
processEventArray: function( haltGroupDefault, ePropsArray ) { 
	for (var i = 0; i < ePropsArray.length; ++i) {
		if ( pcl.processEvent( haltGroupDefault, ePropsArray[i] ) === true )
			break;
	}
},
// pcl.processEventsByLookup -- executes the one event that matches
processEventsByLookup: function( lookupValue, ePropsGroup ) { 
	var parts = lookupValue.split('|'); // allow "|" delimited lists
	for (var p = 0; p < parts.length; p++) {
		var ePropsObj = ePropsGroup[parts[p]];
		if ( ! pcl.isObj( ePropsObj ) )
			return false;
		return pcl.processEvent( false, ePropsObj );
	}
	return false;
},
// pcl.processEvent
processEvent: function( haltGroupDefault, eProps ) { 
	var eventID = 0;
	for (var key in eProps) {
		if (!eProps.hasOwnProperty(key) || !(pcl.isStr(eProps[key]) || pcl.isNum(eProps[key]) ))
			continue;
		var val = eProps[key];
		switch( key ) {
		case "inURL":
			if ( ! pcl.inURL( val ) )
				return;
			break;
		case "selExists":
			if ( ! pcl.selExists( val ) )
				return;		
			break;
		case "isScript":
			if ( ! pcl.isScriptName( val ) )
				return;
			break;
		case "inScriptName":
			if ( ! pcl.inScriptName( val ) )
				return;
			break;
		case "siteSection":
			pcl.oEvt.siteSection = val;
			break;
		case "pageName":
			pcl.oEvt.pageName = val;
			break;
		case "pageDetail":
			pcl.oEvt.pageDetail = val;
			break;			
		case "eventID":
			eventID = val;
			break;
		}
	}
	PDB( "@@breakOnEventDisp-" + eventID, "^DEBUGGER" );
	var handler = eProps.handler; // if there is a handler property, call that
	if ( ! pcl.isFunc(handler) ) {
		// otherwise, see if there is a "oEvt.event" + eventID function to call
		if ( eventID > 0 ) {
			handler = pcl.oEvt["event" + eventID ];
			if ( ! pcl.isFunc(handler) )
				handler = pcl.simpleEvent; // otherwise, simpleEvent just adds the event ID
		}
	}
	// passed in default for whether we stop when an event condition is met
	eProps.haltGroup = haltGroupDefault;
	
	// try { 
		// call the handler with its property block
		if ( pcl.isFunc( handler ) ) {
			handler( eProps );
		}
	// }
	// catch ( e ) {
		// log error -- this allows us to continue even when an event fails
	// }
	
	return eProps.haltGroup; // the handler can change this to stop processing this block
},
// pcl.addEvent
addEvent: function ( num, eVars, eProps ) { // ( event number, [evar list object] )
	PDB( "@addEvent", "! event" + num + " -- " + pdbo.symbol("event" + num) );
	PDB( "@@breakOnEventAdd-" + num, "^DEBUGGER" );
	if ( s.events == 'None' || pcl.isUndef(s.events) ) {
		s.events = 'event' + num;
		s.linkTrackEvents = 'event' + num;
	} else {
		s.events += ',event' + num;
		s.linkTrackEvents += ',event' + num;
	}
	pcl.processEProps( eProps );
	pcl.addEvars( eVars );
},
// pcl.processEProps
processEProps: function( eProps ) { // add attributes from eProp block, only pageName for now
	var eventID = 0;
	if ( ! (pcl.isObj( eProps ) && pcl.isStr( eProps.pageName ) ) )
		return;
	pcl.oEvt.pageName = val;
	pcl.oEvt.siteSection = val.substring( 0, val.indexOf( "|" ) - 1 );
},
// pcl.addEvars
addEvars: function ( evars ) { 
	if ( pcl.isObj( evars ) )
		for(var key in evars)
			pcl.addEvar( key, evars[key] );
},
// pcl.addEvar
addEvar: function (id, sValue) {
	if ( pcl.isNum(id) )
		id = "eVar" + id;
	PDB( "@@addEvar", id + "='" + sValue + "' -- " + pdbo.symbol(id)  );
	PDB( "@@breakOnEvarAdd-" + id, "^DEBUGGER" );
	s[id] = sValue;
	if ( s.linkTrackVars === 'None' )
		s.linkTrackVars = id;
	else
		s.linkTrackVars += "," + id;
},
// pcl.addProduct
addProduct: function( prodProps, evars ) {
	var prodString = pcl.strOrBlank( prodProps.category ); // REVIEW
	prodString += ";" + pcl.strOrBlank( prodProps.product );
	prodString += ";" + pcl.strOrBlank( prodProps.quantity );
	prodString += ";" + pcl.strOrBlank( prodProps.totalPrice );
	prodString += ";" + pcl.strOrBlank( prodProps.incrementor );
	prodString += ";" + pcl.strOrBlank( prodProps.merchandising );
	// REVIEW -- how about a debug function to look for unused properties to find typos?
	// REVIEW -- process evar block
	
	if ( !pcl.isStr( s.products ) )
		s.products = "";
	else if ( s.products !== "" )
		prodString = ";" + prodString;
	s.products += prodString;
},
// pcl.submitToAnalytics
submitToAnalytics: function() {
	pcl.addEvar( "eVar54", pcl.GetPSTDateString() );
	if ( s.linkTrackVars === "None" )
		s.linkTrackVars = 'events';
	else
		s.linkTrackVars += ',events';
	var msg = "";
	PDB("@sobj", s);
	if ( arguments.length === 0 ) {
		msg = s.t();
		PDB( '! Event Submitted' );
	} else if ( arguments.length === 2 ) {
		msg = s.tl( arguments[0], 'o', arguments[1] );
		PDB( '! Event Link Submitted -- ' + arguments[1] );
	}
	pcl.clearSObj();
},
// pcl.clearSObj
clearSObj: function() { 
	s.linkTrackEvents = "None";
	s.linkTrackVars = "None";
	s.events = "None";
	for ( var i = 0 ; i < 60 ; i++ )
		s["eVar"+i] = undefined;
},
// pcl.simpleEvent
simpleEvent: function( eProps ) {
	pcl.addEvent( eProps.eventID );
},
// ---------------------------------------------

// pcl.selExists -- does this selector exists?
selExists: function() { 
	for (var i = 0; i < arguments.length; i++) {
		if ( $( arguments[i] ).length > 0 )
			return true;
	}
	return false;
},
// pcl.$Required -- this is a selector that the code assumes exists
$Required: function( sel ) { 
	var r = $(sel);
	if ( $(r).length === 0 ) {
		PDB( '!! ERROR: required selector ' + sel + ' not found' );
	}
	return $(r);
},
// pcl.selHTML -- inner HTML of a selector
selHTML: function() {
	for (var i = 0; i < arguments.length; i++) {
		var o = $( arguments[i] );
		if ( o.length > 0 )
			return pcl.filterOddChars( $(o).html() );
	}
	return "";
},
// pcl.selVal -- return the value of a selector
selVal: function() {
	for (var i = 0; i < arguments.length; i++) {
		var o = $( arguments[i] );
		if ( o.length > 0 )
			return $(o).val();
	}
	return "";
},
// pcl.inURL -- // is argument in the current URL
inURL: function() { 
	for (var i = 0; i < arguments.length; i++) {
		var parts = arguments[i].split('|'); // allow each argument to contain "|" delimited lists
		for (var p = 0; p < parts.length; p++) {
			if ( pcl.currentURL.indexOf(parts[p]) >= 0 )
				return true;
		}
	}
	return false;
},
// pcl.isScriptName --  is argument the current script name
isScriptName: function() { 
	for (var i = 0; i < arguments.length; i++) {
		var parts = arguments[i].split('|'); // allow each argument to contain "|" delimited lists
		for (var p = 0; p < parts.length; p++) {
			if ( pcl.scriptName === parts[p] )
				return true;
		}
	}
	return false;
},
// pcl.inScriptName --  is argument within current script name
inScriptName: function() { 
	for (var i = 0; i < arguments.length; i++) {
		var parts = arguments[i].split('|'); // allow each argument to contain "|" delimited lists
		for (var p = 0; p < parts.length; p++) {
			if ( pcl.scriptName.indexOf(parts[p]) > -1 )
				return true;
		}
	}
	return false;
},
// pcl.qsVal -- value of a query string param
qsVal: function( name ) { 
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
},
// pcl.formValue 
formValue: function(name) {
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
},
// pcl.realTypeOf
realTypeOf: function(valueToTest) {
	if ( typeof (valueToTest) == "object") {
		if (valueToTest === null) {
			return "null";
		}
		if (valueToTest.constructor == (new Array()).constructor) {
			return "array";
		}
		if (valueToTest.constructor == (new Date()).constructor) {
			return "date";
		}
		if (valueToTest.constructor == (new RegExp()).constructor) {
			return "regex";
		}
		return "object";
	}
	return typeof (valueToTest);
},
// pcl.hasValue
hasValue: function(valueToTest) {
	if (valueToTest === null)
		return false;
	if ( pcl.isUndef (valueToTest) )
		return false;
	if ( pcl.isStr(valueToTest) || pcl.realTypeOf(valueToTest) === 'array') {
		if (valueToTest.length <= 0)
			return false;
	}
	return true;
},
// pcl.roundValue
roundValue: function(value, n) {
	return Math.round(Math.pow(10, n) * value) / Math.pow(10, n);
},
// pcl.setCookie 
setCookie: function(key, value, minutes) {
	var expires = "";
	var date = new Date();

	if (pcl.hasValue(minutes)) {
		date.setTime(date.getTime() + (minutes * 60000));
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = key + "=" + value + expires + "; path=/";
	PDB( "@@cookies", value.length > 0, "setting cookie: " + key + "=" + value );
},
// pcl.getCookie
getCookie: function(key) {
	var keyPlusEqual = key + "=";
	var cookieArray = document.cookie.split(';');
	var cookieArrayLength = cookieArray.length;
	var i = 0, c = "";

	for (; i < cookieArrayLength; i++) {
		c = cookieArray[i];
		c = $.trim(c);
		// if JQuery exists.
		if (c.indexOf(keyPlusEqual) === 0) {
			return c.substring(keyPlusEqual.length, c.length);
		}
	}
	return "";
},
// pcl.removeCookie
removeCookie: function(name) {
	pcl.setCookie(name, "", -1);
	PDB( "@@cookies", "removing cookie: " + name );
},
// pcl.meaningfulNameLC
meaningfulNameLC: function( obj ) {
	return pcl.meaningfulName(obj).toLowerCase();
},
// pcl.meaningfulName
meaningfulName: function( obj ) {
	var t = $(obj).text();
	
	if ( pcl.strNotBlank(t) > 0 )
		return pcl.filterOddChars(t).toLowerCase();
	var img = $(obj).children('img').first();
	if ( $(img).length === 1 ) {
		t = $(img).attr("alt");
		if ( t.length > 0 )
			return t.toLowerCase();
		t = $(img).attr("src");
		if ( t.length > 0 )
			return pcl.filterOddChars(t).toLowerCase();
	}
	t = $(obj).html();
	if ( pcl.strNotBlank(t) )
		return t.toLowerCase();
	return "none";
},
// pcl.filterOddChars
filterOddChars: function( t ) {
	// REVIEW for some reason this only removes all of the quotes with two replaces
	t = t.trim().replace('"','').replace('"','').replace('\r\n','').replace('  ', ' ').replace('  ', ' ');
	t = t.replace('®','');
	return t;
},
// pcl.dateToday
GetPSTDateString: function() {
	var newDateString = "";
	try {
		//var testDate = new Date();
		var currentDate = new Date();
		//currentDate = new Date(testDate.getTime() + 1200*60000); // Australia East Coast
		var currentOffset = currentDate.getTimezoneOffset();
		//currentOffset = -600; // Australia East Coast
	
		var jan = new Date(2013, 0, 1);
		var jul = new Date(2013, 6, 1);
	
		var pstOffset = 420;
		
		if (currentOffset === jan.getTimezoneOffset()) {
			pstOffset = 480;
		}
		var totalOffset = currentOffset - pstOffset;
	
		var newDate = new Date(currentDate.getTime() + totalOffset*60000);
		// Add one to the month to adjust for the zero based month array.
		newDateString = newDate.getFullYear() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getDate();
	} catch(error){
		this.debugStatus("GetPSTDateString: " + error);
	}
	return newDateString;
},

// pcl.scriptNameFromURL
scriptNameFromURL: function() {
	var t = window.location.pathname;
	return t.substring( t.lastIndexOf( '/' )+1 );
},
// pcl.foreachDelimArgs( arrayOfDelimitedStrings, functionToCall, [startingIndex, ]  )
foreachDelimArgs: function() { // allows for pipe seperated lists in array, calls function for each
	var iarg = 0;
	if ( iarg == arguments.length ) 
		return;
	var passedInArgs = arguments[iarg++]; // first argument is the passed in arguments array
	var iPassedInArgs = 0;

	// call this function for each parsed argument
	var func = arguments[iarg];
	if ( ! pcl.isFunc(func) )
		return; // no function, nothing to do
	
	// if first argument is a number, it's the starting argument index
	if ( pcl.isNum(arguments[iarg]) ) {
		iPassedInArgs = arguments[iarg];
		iarg++;
	}

	for ( ; iPassedInArgs < passedInArgs.length ; iPassedInArgs++ ) {
		var delimList = passedInArgs[iPassedInArgs].split("|");
		for ( var iDelimList = 0 ; iDelimList < delimList.length ; iDelimList++ ) {
			if ( func( delimList[iDelimList] ) )
				return true;
		}
	}
	return false;
},
miniStringify: function( o ) { // only minifies bools
	if ( ! pcl.isObj(o) || o.length === 0 )
		return "{ }";
	var t = "";
	for (var key in o) {
		if (o.hasOwnProperty(key)) {
			var v = o[key];
			if ( pcl.isBool(v) )
				t += (t.length > 0 ? "," : "") + '"' + key + '":' + v;
		}
	}
	return "{" + t + "}";
},
strOrBlank: function( o ) {
	// if the argument is a string or int, return it, otherwise an empty string
	if ( ! (pcl.isStr(o) || pcl.isNum(o) ) )
		return "";
	return o;
},
strBlank: function( s ) { // non-string and "" will BOTH return true, number returns false
	if ( pcl.isNum(s) )
		return false; // a number will always equal a non-blank string
	if ( ! pcl.isStr(s) ) 
		return true;
	return s.length === 0;
},
strNotBlank: function( s ) { // non string and "" will BOTH return false, number returns true
	if ( pcl.isNum(s) )
		return true; // a number will always equal a non-blank string
	if ( ! pcl.isStr(s) )
		return false;
	return s.length !== 0;
},

isUndef: function( o ) { return typeof(o) === "undefined"; },
isBool: function( o ) { return typeof(o) === "boolean"; },
isNum: function( o ) { return typeof(o) === "number"; },
isStr: function( o ) { return typeof(o) === "string"; },
isFunc: function( o ) { return typeof(o) === "function"; },
isObj: function( o ) { return typeof(o) === "object"; }

}; // pcl

// ---------------------------------------------
//  PDB - DEBUG OBJECT

window.PDB = function() { };

window.pdbDebugMode = function() { 
	if ( pcl.isObj( pdbo ) ) // on production there is no pdbo object
		pdbo.pdbDebugMode( arguments[0], arguments[1] );
};

// Debug Object
// never call pdbo functions directly.
// everything you need can be accessed through the pdb function.
// this way for production we just remove the pdbo object.

window.pdbo = {

pdbDebugMode: function( settings, symbols ) {
	var dbflags = settings;
	if ( ! pcl.isUndef( dbflags ) ) { // set debug flags to argument
		if ( pcl.isObj( dbflags ) ) dbflags = pcl.miniStringify( dbflags ); // it's an object, stringfy it
		if ( dbflags === "off" ) return pcl.removeCookie( 'prxDebugFlags' ); // remove cookie, next page load won't have debug
		if ( dbflags === "on" ) dbflags = '{ "all":true, "sobj":true }'; // shorthand for useful default setting
		pcl.setCookie( 'prxDebugFlags', dbflags );
	} else { dbflags = pcl.getCookie("prxDebugFlags"); }
	if ( dbflags.length === 0 )
		return;
	try {
		pdbo.flags = $.parseJSON( dbflags ); // simple object notation
		window.PDB = pdbo.pdb; // this turns debugging on by setting the function
	} catch (e) { console.log( "WARNING: Invalid Syntax in Debug Flags Cookie: " + dbflags, e ); }
	if ( pcl.isObj( symbols ) ) pdbo.dbSymbols = symbols;
},
pdb: function() {
	var p = { arg: "", returnValue: true, fAssertBool: false, fDebugger: false };
	for ( var iarg = 0 ; iarg < arguments.length ; iarg++ ) {
		p.arg = arguments[iarg];
		var f = pdbo["o_" + typeof( p.arg )];
		if ( pcl.isFunc( f ) )
			if ( f(p) === false )
				return;
	}
	if ( p.fDebugger === true ) debugger; // AN ASSERTION FAILED OR FUNCTION RETURN FALSE, CHECK CALL STACK
	return;
},
o_boolean: function(p) {
	if ( p.arg === true ) return; 
	if ( ! p.fAssertBool ) return false; // a non-assert boolean means don't output the rest of the args
	p.fDebugger = true; // display rest of args & then invoke debugger
},
o_function: function(p) {
	if ( p.arg(p) === false ) // function returns false for a debug assertion
		p.fDebugger = true;
},
o_number:  function(p) {
	pdbo.o( p.arg );
},
o_object:  function(p) {
	var o = p.arg;
	if ( ! pdbo.flag( 'dumpObjectProps' ) ) {
		pdbo.o ( '! Object Members' );
		console.log( o );
		pdbo.o ( '! End Of Object' );
		return;
	}
	if ( !pcl.isUndef( o.linkTrackEvents ) ) return pdbo.o_sobj( o ); // hack to detect s object
	if ( !pcl.isUndef( o.stack ) || !pcl.isUndef( o.description ) ) return pdbo.o_ex( o ); // hack to detect exception object
		
	pdbo.o ( '! Object Members' );
	for (var key in o)
		if (o.hasOwnProperty(key))
			pdbo.o( key + ":" + o[key] );
	pdbo.o ( '! End Of Object' );
},
o_ex: function(e) {
	pdbo.o("!! EXCEPTION EXCEPTION EXCEPTION EXCEPTION EXCEPTION", "description: " + e.description,
		"message: " + e.message, "name: " + e.name,	"number: " + e.number, "stack: " + e.stack);
},
o_sobj: function(s) {
	if ( !pdbo.flag("sobj") )
		return;
	pdbo.o ( '! Analytics s Object', 'linkTrackVars: ' + s.linkTrackVars, 'linkTrackEvents: ' + s.linkTrackEvents, 'events: ' + s.events );
	for ( var i = 0 ; i < 60 ; i++ ) {
		var evar = s["eVar" + i];
		if ( pcl.isUndef( evar ) ) continue;
		pdbo.o( ' eVar' + i + '="' + evar + '"' + " (" + pdbo.symbol('eVar' + i) + ')' );
	}
},
o_string:  function(p) {
	var argTrimmed = p.arg.substring( 1 );
	if ( p.arg.substring(0,2) === '@@' ) // @@ means flag must be defined explicitly as true
		return pdbo.flagTest( p.arg.substring(2) ) === 1;
	if ( p.arg[0] == '@' ) // specifies a flag that must be on to display these args
		return pdbo.flag( argTrimmed );
	if ( p.arg.toUpperCase() === "^ASSERT" ) {
		p.fAssertBool = true;
		return;
	}
	if ( p.arg.toUpperCase() === "^DEBUGGER" ) {
		p.fAssertBool = true; 
		return;
	}
	pdbo.o ( p.arg );
},
o: function() {
	for ( var i = 0 ; i < arguments.length ; i++ )
		console.log ( "rx:" + pdbo.em(arguments[i]) );
},
em: function(s) {
	if ( s.length > 80 ) s = s.substring( 0, 80 ) + "...";
	if ( s[0] === '!' ) {
		if ( s[1] === '!' )
			return "## " + s.substr(2).toUpperCase().trim() + " ############################################################".substring(0, 70 - s.length);
		return " # " + s.substr(2).trim().toUpperCase();
	}
	return "   " + s;
},
flag: function(nm) {
	return ( pdbo.flagTest("all", false) && pdbo.flagTest(nm, true) ) ? true : pdbo.flagTest(nm, false);
},
flagTest: function(nm, valIfUndef) { // 1 = flag defined as true, 0 = value of arg valIfUndef, -1 = defined as false
	return pcl.isBool( pdbo.flags[nm] ) ? pdbo.flags[nm] : valIfUndef;
},
flagSet: function(nm, v) {
	pdbo.flags[nm] = v; // flag value
	pcl.setCookie( 'prxDebugFlags', pcl.miniStringify( pdbo.flags ) );
},
symbol: function (n) {
	if ( ! pcl.isObj( pdbo.dbSymbols ) ) return "";
	var v = pdbo.dbSymbols[n];
	return pcl.isUndef(v) ? "" : v;
}

}; // pdb

// ProductCodePharmacy.js end








}

sc_omni.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!m.s.wd[o])m.s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disab"
+"le=0;p.get=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){"
+"p=m[m.l[i]];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._f"
+"u=function(p,u){var m=this,s=m.s,v,x,y,z,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()"
+"*10000000000000):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;x=0;while(x>=0){x=u.indexOf('[',x);if(x>=0){y=u.indexOf(']',x);if(y>x){z=u.substring(x+1,y);if(z.length>2&&z.substring(0,2"
+")=='s.'){v=s[z.substring(2)];if(!v)v=''}else{v=''+p[z];if(!(v==p[z]||parseFloat(v)==p[z]))z=0}if(z) {u=u.substring(0,x)+s.rep(escape(v),'+','%2B')+u.substring(y+1);x=y-(z.length-v.length+1)} else {"
+"x=y}}}}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule('Integrate:'+v,m._fu(p,u),0,1,p._n)}};m"
+".delay=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<m.l.length;i++){p=m[m.l[i]];if(p&&!p.di"
+"sable&&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d[x];p._d--}};m.beacon=function(u){var p="
+"this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;im=s.wd[imn]=new Image;im.src=m._fu(p,u)"
+"}};m.script=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
sc_omni.m_i("Integrate");


sc_omni.setTagContainer("TM_OMNI")
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.25.3';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackin"
+"gServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase()"
+";else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.t"
+"cn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[u"
+"n]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;retur"
+"n ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if("
+"!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nr"
+"s){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'"
+"].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return '"
+"'}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=="
+"'s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x"
+";i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h."
+"substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length"
+">1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.lengt"
+"h;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.subst"
+"ring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nf"
+"l[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!n"
+"fl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk."
+"substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+"
+"ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',"
+"fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring("
+"0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+"
+"s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!="
+"'linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substrin"
+"g(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&"
+"&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1"
+"';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k"
+"=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascri"
+"ptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='h"
+"omepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k"
+"=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')"
+"q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eV"
+"ar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'"
+"';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLow"
+"erCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h"
+"=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','lt"
+"ef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s."
+"bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)retur"
+"n;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);"
+"s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.tar"
+"get){t=e.target.target;if(e.target.dispatchEvent&&(!t||t==\\'_self\\'||t==\\'_top\\'||(s.wd.name&&t==s.wd.name))){e.stopPropagation();e.stopImmediatePropagation();e.preventDefault();n=s.d.createEve"
+"nt(\"MouseEvents\");n.initMouseEvent(\"click\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget);n.s_f"
+"e=1;s.bct=e.target;s.bce=n;}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o."
+"protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<"
+"0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if"
+"((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c="
+"o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else "
+"if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}"
+"return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf('"
+",')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s."
+"sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0}"
+";s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype"
+"||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape("
+"x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+"
+"o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.a"
+"pv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent){s.bbc=1;s.useForcedLinkTracking=1;s.b"
+".addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+"
+"s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&"
+"m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s"
+".uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.to"
+"LowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;"
+"if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Ar"
+"ray;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','"
+"_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r"
+"._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;i"
+"f(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\""
+"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.le"
+"ngth;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf("
+"'function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModu"
+"le(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g="
+"\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o="
+"s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o."
+"l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascr"
+"ipt\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2"
+")}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=th"
+"is,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function("
+"vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo"
+"=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0')"
+";s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.gfid=function(){v"
+"ar s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.fl"
+"oor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.applyADMS=function(){var s=this,vb=new Object;if(s"
+".wd.ADMS&&!s.visitorID&&!s.admsc){if(!s.adms)s.adms=ADMS.getDefault();if(!s.admsq){s.visitorID=s.adms.getVisitorID(new Function('v','var s=s_c_il['+s._in+'],l=s.admsq,i;if(v==-1)v=0;if(v)s.visitorI"
+"D=v;s.admsq=0;if(l){s.admsc=1;for(i=0;i<l.length;i++)s.t(l[i]);s.admsc=0;}'));if(!s.visitorID)s.admsq=new Array}if(s.admsq){s.vob(vb);vb['!visitorID']=0;s.admsq.push(vb);return 1}else{if(s.visitorI"
+"D==-1)s.visitorID=0}}return 0};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/108"
+"00000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.g"
+"tfs(),ta=-1,q='',qs='',code='',vb=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc',"
+"'true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;"
+"if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.pa"
+"rse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.w"
+"d.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElemen"
+"t.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Functi"
+"on('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';'"
+";if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugin"
+"s=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}s.fid=s.gfid();if(s.applyADMS())return '';if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;"
+"if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oid"
+"t,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';i"
+"f((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.li"
+"nkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.o"
+"t(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-objec"
+"t-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\""
+").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")o"
+"cx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s"
+")}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else t"
+"rk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retri"
+"eveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);s.abort=0;s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s"
+".pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLig"
+"ht=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l."
+"length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n"
+",x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i"
+"++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=windo"
+"w;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s."
+"n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft In"
+"ternet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if("
+"s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCha"
+"rCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,fid,vmk,visitorMigrationKey,visitorMigrationServer,v"
+"isitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,r"
+"etrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,"
+"lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;"
+"n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,reso"
+"lution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',tracki"
+"ngServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountM"
+"atch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTr"
+"ackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function"
+"(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()


s_tc_TM_OMNI.cl=[{p:[{t:'c',c:'$(document).ready( function() { pmc.documentReady() });'}]},
{p:[{t:'c',c:'if (pmc.account === "cwcostcocaprod" || pmc.account === "cwcostcocomprod") {\n	pmc.addMetaTag("google-site-verification", "vp4CFUQ5DEk2Dzm5tseA4cOWuTb4mQJjMPVZ7QtiqdQ");\n}'}]}];
s_tc_TM_OMNI.cr();