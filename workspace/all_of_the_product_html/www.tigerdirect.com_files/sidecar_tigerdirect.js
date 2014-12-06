/***********************
 * File: sidecar.min.js
 * Project: Tracking
 ***********************/

var sidecar = sidecar || {};
sidecar.preboot = {
	urlroot: "https://membrain.getsidecar.com",
	asset_url:"https://d3v27wwd40f0xu.cloudfront.net"
};

sidecar.boot = {
	date_str: "v=" + (new Date()).getTime(),
	date_qry: (sidecar.preboot.asset_url == "https://d3v27wwd40f0xu.cloudfront.net") ? "" : "?v=" + (new Date()).getTime(),
	date_amp: (sidecar.preboot.asset_url == "https://d3v27wwd40f0xu.cloudfront.net") ? "" : "&v=" + (new Date()).getTime(),
	loadScript: function(src){var script=document.createElement("script");script.setAttribute("src", src);script.setAttribute("type","text/javascript");var head=document.getElementsByTagName("head")[0]||document.documentElement;head.insertBefore(script,head.firstChild);},
	loadCSS: function(src){var css=document.createElement("link");css.setAttribute("rel","stylesheet");css.setAttribute("href",src);css.setAttribute("type","text/css");var head=document.getElementsByTagName("head")[0]||document.documentElement;head.insertBefore(css,head.firstChild);}
};

// App code.
sidecar.app = {
	userkey: null,
	sessid: null,
	domain: null,
	page: null,
	order: null,
	search_engine: null,
	search_phrase: null,
	pgid: null,
	cart_items: [],
	page_ready: false,

	// jQuery URL parser v.1.0 -- http://projects.allmarkedup.com/jquery_url_parser/
	url:function(){var segments={};var parsed={};var options={url:window.location,strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var parseUri=function(){str=decodeURI(options.url);var m=options.parser[options.strictMode?"strict":"loose"].exec(str);var uri={};var i=14;while(i--){uri[options.key[i]]=m[i]||"";}uri[options.q.name]={};uri[options.key[12]].replace(options.q.parser,function($0,$1,$2){if($1){uri[options.q.name][$1]=$2;}});return uri;};var key=function(key){if(!parsed.length){setUp();}if(key=="base"){if(parsed.port!==null&&parsed.port!==""){return parsed.protocol+"://"+parsed.host+":"+parsed.port+"/";}else{return parsed.protocol+"://"+parsed.host+"/";}}return(parsed[key]==="")?null:parsed[key];};var param=function(item){if(!parsed.length){setUp();}return(parsed.queryKey[item]===null)?null:parsed.queryKey[item];};var setUp=function(){parsed=parseUri();getSegments();};var getSegments=function(){var p=parsed.path;segments=[];segments=parsed.path.length==1?{}:(p.charAt(p.length-1)=="/"?p.substring(1,p.length-1):path=p.substring(1)).split("/");};return{setMode:function(mode){strictMode=mode=="strict"?true:false;return this;},setUrl:function(newUri){options.url=newUri===undefined?window.location:newUri;setUp();return this;},segment:function(pos){if(!parsed.length){setUp();}if(pos===undefined){return segments.length;}return(segments[pos]===""||segments[pos]===undefined)?null:segments[pos];},attr:key,param:param};}(),
	// Add an indexOf method because IE doesn't support it.
	indexOf:function(t,o){var tlen=t.length;var olen=o.length;if(typeof(t)==="string"){if(t===o){return 0;}else if(olen<=tlen){for(var i=0;i<tlen-olen;i++){var c='';for(var ii=0;ii<olen;ii++){c+=t[i+ii];}if(c===o){return i;}}}return -1;}else if(typeof(t)==="object"){for(var iii=0;iii<tlen;iii++){if(t[iii]===o)return iii;}return -1;}},
	readCookie: function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1, c.length);
			}
			if (this.indexOf(c, nameEQ) === 0) {
				return c.substring(nameEQ.length, c.length);
			}
		}
		return null;
	},
	
	createCookie: function(name,value,days) {
		var expires;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+parseInt(days*86400000));
			expires = "; expires=" + date.toGMTString();
		} else { 
			expires = "";
		}
		if (sidecar.config.cookie_domain && sidecar.config.site_id != 85) {
			document.cookie = name + "=" + value + expires + ";domain=" + sidecar.config.cookie_domain + ";path=/";
		} else {
			document.cookie = name + "=" + value + expires + ";path=/";
		}
	},
	
	detectIdentity: function() {
		this.userkey = this.readCookie("_sckey");
		this.sessid = this.readCookie("_scsess");
	},

	startTracking:function() {
		if (!sidecar.app.page_ready) {
			
			sidecar.app.page_ready = true;

			this.log("startTracking called");
			this.page = this.url.setUrl().attr("source");

			this.detectIdentity();
			this.detectReferrer();
			this.detectIncomingSearch();
			this.detectOnSiteSearch();
			this.detectIncomingMarketing();
			this.detectCartItems();
			this.detectUnsubscribes();
			this.detectTransactions();
			this.detectPageInfo();
			this.useCorrectProtocol();
			this.sendTracking();

			sidecar.boot.loadScript(sidecar.preboot.asset_url + "/js/sidecar.jquery.js" + sidecar.boot.date_qry);
		}
		
	},

	sendTracking: function() {
		this.log("sendTracking called");
		// Set page hit data.
		var data = {
			service: "view",
			page: escape(this.page)
		};

		// Add referrer when appropriate.
		this.log("Check this.http_referrer");
		if (!this.empty(this.http_referrer)) {
			data.http_referrer = escape(this.http_referrer);
		}
		// Add other properties to page hit data when appropriate.
		this.log("Check this.search_engine");
		if (!this.empty(this.search_engine)) {
			data.search_engine = escape(this.search_engine);
		}
		this.log("Check this.search_phrase");
		if (!this.empty(this.search_phrase)) {
			data.search_phrase = escape(this.search_phrase);
		}
		this.log("Check sidecar.product_info");
		if (!this.empty(sidecar.product_info) && !this.empty(sidecar.product_info.group_id)) {
			data.gid = sidecar.product_info.group_id;
		} else if (!this.empty(sidecar.product_info) && !this.empty(sidecar.product_info.product_id)) {
			data.pid = sidecar.product_info.product_id;
		}
		this.log("Check this.incoming_marketing");
		if (!this.empty(this.incoming_marketing)) {
			data.incoming_marketing = this.incoming_marketing;
		}
		this.log("Check this.incoming_shop_pid");
		if (!this.empty(this.incoming_shop_pid)) {
			data.incoming_shop_pid = this.incoming_shop_pid;
		}
		this.log("Check this.cart_items");
		if (!this.empty(this.cart_items)) {
			data.cart_items = this.cart_items;
		}
		this.log("Check this.unsubscribe_email_hash");
		if (!this.empty(this.unsubscribe_email_hash)) {
			data.unsubscribe_email_hash = this.unsubscribe_email_hash;
		}
		this.log("Check this.order");
		if (!this.empty(this.order)) {
			data.order = this.order;
		}
		this.log("Check this.pgid");
		if (!this.empty(this.pgid)) {
			data.pgid = this.pgid;
		}
		
		if (!this.reduceTraffic(data)) {
			this.log("Logging page hit.");
			this.sjax({
				data: data,
				success: "sidecar.app.handleTracking"
			});
		} else {
			this.log("Ignoring page hit.");
		}
	},

	handleTracking: function(data) {
		if (!this.empty(data.user_key)) {
			this.log("We DID get a user_key back.");
			if (this.userkey !== data.user_key) {
				this.log("The user_key DOES NOT match. We should update.");
				this.userkey = data.user_key;
				this.createCookie("_sckey", this.userkey, 2190);
			} else {
				this.log("The user_key does not match. We should update, but we aren't.");
			}
		} else {
			this.log("We did not get a user_key back.");
		}
		if (!this.empty(data.session_key)) {
			this.log("We DID get a session_key back.");
			if (this.sessid !== data.session_key) {
				this.log("The session_key DOES NOT match. We should update.");
				this.sessid = data.session_key;
				this.createCookie("_scsess", this.sessid);
			} else {
				this.log("The session_key does not match. We should update, but we aren't.");
			}
		} else {
			this.log("We did not get a session_key back.");
		}
		if (data.success === "true") {
			this.log("Tracking reported success.");
		} else {
			this.log("Tracking reported failure.");
		}
		if (!this.empty(data.messages)) {
			for (var i = 0; i < data.messages.length; i++) {
				this.log(data.messages[i]);
			}
		}
	},

	reduceTraffic: function(data) {
		if (this.empty(data)) {
			this.log("Data not set?");
			return true;
		}
		if (!this.empty(data.search_engine) ||
			!this.empty(data.search_phrase) || 
			!this.empty(data.gid) ||
			!this.empty(data.pid) ||
			!this.empty(data.cart_items) ||
			!this.empty(data.order) ||
			!this.empty(data.incoming_marketing)
		) {
			return false;
		}
		return true;
	},
	
	// Capture referrer if not same domain.
	detectReferrer:function() {
		var ref_host = this.url.setUrl(document.referrer).attr("host");
		var cur_host = this.url.setUrl().attr("host");
		if (ref_host && cur_host && ref_host != cur_host && this.indexOf(ref_host, sidecar.config.cookie_domain) == -1) {
			if (this.empty(sidecar.config.hosts)) {
				var cd = (this.indexOf(sidecar.config.cookie_domain, '.') === 0) ? 'www' + sidecar.config.cookie_domain : sidecar.config.cookie_domain;
				sidecar.config.hosts = new Array(cd);
			}
			// Get page referer if not on the same host as current page.
			this.http_referrer = (this.indexOf(sidecar.config.hosts, ref_host) == -1) ? document.referrer : "";
		} else {
			this.http_referrer = '';
		}
	},
	// Check if the referring URL contains a search phrase. (Uses URL parser plugin)
	detectIncomingSearch:function() {
		if (document.referrer === '') return false;
		var ref = document.referrer;
		var url = this.url.setUrl(ref);
		var engines=["www.google.com","search.yahoo.com","www.bing.com"];

		if (this.indexOf(engines, url.attr("host")) != -1) {
			if (url.param("q") !== undefined || url.param("p") !== undefined) {
				sidecar.app.search_engine = url.attr("host");
				if (url.param("q") !== undefined) {
					sidecar.app.search_phrase = url.param("q");
				}
				if (url.param("p") !== undefined) {
					sidecar.app.search_phrase = url.param("p");
				}
				this.log("Search Key-phrase: " + sidecar.app.search_phrase);
			}
		}
	},

	// Check if the current URL contains an on-site search phrase. (Uses URL parser plugin)
	detectOnSiteSearch: function() {
		// Set URL to current URL object.
		var url = this.url.setUrl();
		// Source is full URL. Hopefully better to use than document.location.
		var src = url.attr("source");
		// Does the URL contain the configured search result URL for site?
		if (src.indexOf(sidecar.config.search_url) != -1){
			// Does the query string contain a parameter matching configured param?
			if (url.param(sidecar.config.search_param) !== undefined){
				// Set search engine as on-site.
				sidecar.app.search_engine = "onsite";
				// Set search phrase. Sent with page hit if set.
				sidecar.app.search_phrase = url.param(sidecar.config.search_param);
			}
			this.log("On-Site Search Key-phrase: " + sidecar.app.search_phrase);
		}
	},

	// New way of handling this putting less responsibility on JS.
	detectIncomingMarketing: function() {
		var url=this.url.setUrl();
		if (url.param("scid") === undefined) {
			return false;
		}
		this.incoming_marketing = url.param("scid");
		if (url.param("scpid") === undefined) {
			return true;
		}
		this.incoming_shop_pid = url.param("scpid");
		return true;
	},

	detectCartItems: function() {
		if (this.empty(sidecar.cart_info) || this.empty(sidecar.cart_info.items)) {
			return false;
		}
		var ci = sidecar.cart_info.items;
		for (var i in ci) {
			this.cart_items.push({product_id: ci[i].product_id, quantity: ci[i].quantity});
		}
	},
	
	syncCartInfoResult: function(data) {
		if (data.success) {
			this.log("Cart sync successfully saved.");
		} else {
			this.log("There was a problem saving cart sync.");
		}
	},

	detectUnsubscribes: function() {
		var url = this.url.setUrl();
		if (url.param("unsubscribe") === undefined) {
			this.log("Unsubscribe undefined.");
			return false;
		}
		if (!url.param("unsubscribe").length) {
			this.log("Unsubscribe has no length.");
			return false;
		}
		this.unsubscribe_email_hash = url.param("unsubscribe");
		this.log("Unsubscribing" + this.unsubscribe_email_hash);
	},

	unsubscribeResult: function(data) {
		if (data.success) {
			if (sidecar.config.unsubscribe_no_modal !== undefined) {
				return true;
			}
			this.log("Opt-out successfully saved.");
			alert("You have successfully been removed from marketing emails.");
			//$$$.modal("<div><p><span style='height:auto'>You have successfully been removed from marketing emails.</span></p><p>&nbsp;</p></div>", {zIndex:10000});
		} else {
			this.log("There was a problem saving opt-out.");
		}
	},

	detectTransactions: function() {
		if (sidecar.transactions === undefined) {
			this.log("sidecar.transactions == undefined");
			return false;
		}
		
		if (sidecar.transactions.add === undefined || !sidecar.transactions.add) {
			/*
			if (!this.empty('JSON', true)) {
				sidecar.sjax({
					data: {
						service: "debug_transaction", 
						transaction: JSON.stringify(sidecar.transactions) 
					}, 
					success: "sidecar.trans.noAction" 
				});
			}
			*/
			this.log("sidecar.transactions.add == undefined || !sidecar.transactions.add");
			return false;
		}
		if (sidecar.transactions.data === undefined) {
			/*
			if (!this.empty('JSON', true)) {
				sidecar.sjax({
					data: {
						service: "debug_transaction", 
						transaction: JSON.stringify(sidecar.transactions)
					}, 
					success: "sidecar.trans.noAction"
				});
			}
			*/
			this.log("sidecar.transactions.data == undefined");
			return false;
		}
		if (sidecar.transactions.items === undefined) {
			/*
			if (!this.empty('JSON', true)) {
				sidecar.sjax({
					data: {
						service: "debug_transaction",
						transaction: JSON.stringify(sidecar.transactions)
					}, 
					success: "sidecar.trans.noAction"
				});
			}
			*/
			this.log("sidecar.transactions.items == undefined");
			return false;
		}

		// Add transaction to order object.
		var stt = sidecar.transactions.data;
		this.transactionAdd(stt.order_id, stt.site_name, stt.total, stt.tax, stt.shipping, stt.zipcode);
		// Iterator.
		var i;
		// Add items to order object.
		for (i = 0; i < sidecar.transactions.items.length; i++) {
			var item = sidecar.transactions.items[i];
			if (item.unit_price === undefined && item.price !== undefined) {
				item.unit_price = item.price;
			}
			this.transactionAddItem(item.product_id, item.unit_price, item.quantity);
		}

		// Add discounts to order object.
		if (sidecar.transactions.discounts !== undefined) {
			for (i = 0; i < sidecar.transactions.discounts.length; i++) {
				var disc = sidecar.transactions.discounts[i];
				this.transactionAddDiscount(disc.name, disc.amount);
			}
		}
	},

	transactionAdd: function(order_id, site_name, total, tax, shipping, zipcode) {
		this.order = {
			order_id: order_id,
			site_name: site_name,
			total: this.unformatMoney(total),
			tax: this.unformatMoney(tax),
			shipping: this.unformatMoney(shipping),
			zipcode: zipcode,
			trans_items: [],
			trans_discounts: []
		};
	},

	transactionAddItem: function(internal_id, unit_price, quantity) {
		this.order.trans_items.push({id: internal_id, price: this.unformatMoney(unit_price), quantity: quantity});
	},

	transactionAddDiscount: function(name, amount) {
		this.order.trans_discounts.push({name: name, amount: this.unformatMoney(amount)});
	},

	detectPageInfo: function() {
		if (typeof sidecar.page_info !== "undefined" && typeof sidecar.page_info.page_id !== "undefined") {
			this.pgid = sidecar.page_info.page_id;
		}
	},

	sjax: function(r) {
		var src = (r.url || sidecar.config.jxhrdata.url) + "?";
		if (!this.empty(this.userkey)) {
			r.data.user_key = this.userkey;
		}
		if (!this.empty(this.sessid)) {
			r.data.session_key = this.sessid;
		}
		if (!this.empty(sidecar.config.site_id)) {
			r.data.site_id = sidecar.config.site_id;
		}
		if (!this.empty(r.success)) {
			r.data.callback = r.success;
		}
		src += (!this.empty(r.data)) ? "data=" + JSON.stringify(r.data) : "";		
		this.log(src);
		sidecar.boot.loadScript(src);
	},

	log: function(txt) {
		if (!sidecar.config.logging || typeof console === "undefined" || console.log === undefined) {
			return false;
		}
		console.log(txt);
	},

	checkReady: function() {
		this.log("checkReady called");
		if (document.readyState === 'complete') {
			this.startTracking();
		} else {
			document.addEventListener("DOMContentLoaded", sidecar.app.isReady, false);
			window.addEventListener("load", sidecar.app.isReady, false);
		}
	},

	isReady: function() {
		//this.log("isReady called");

		document.removeEventListener("DOMContentLoaded", sidecar.app.isReady, false);
		window.removeEventListener("load", sidecar.app.isReady, false);
		sidecar.app.startTracking();
	},

	// Add and empty method catchall to test undefined, null, empty string, and zero-length objects.
	// Can pass test root vars without risk of error by string representation, and using second argument true.
	empty: function(o, root) {
		// Special check for properties of the window which would throw an exception
		// if evaluated like other things. Example window.JSON.
		if (root && typeof o === 'string') {
			return (!Object.prototype.hasOwnProperty.call(window, o));
		}
		// Numbers and boolean values can never be empty.
		if (typeof o === 'number' || typeof o === 'boolean') {
			return false;
		}
		// Undefined and null are always considered empty.
		if (typeof o === 'undefined' || o === null) {
			return true;
		}
		// Handle string type.
		if (typeof o === 'string') {
			return (o.length === 0);
		}
		// Handle array object type.
		if (typeof o === 'object' && o.length !== undefined) {
			return (o.length === 0);
		}
		// Handle object type.
		if (typeof o === 'object') {
			return (!Object.keys(o).length);
		} 
		return false;
	},

	unformatMoney: function(amount) {
		return parseFloat(amount.toString().replace('$','').replace(',',''));
	},

	useCorrectProtocol: function() {
		sidecar.config.jxhrdata.url = this.rectifyUrlProtocol(sidecar.config.jxhrdata.url);
		sidecar.config.base_url = this.rectifyUrlProtocol(sidecar.config.base_url);
		sidecar.config.image_url = this.rectifyUrlProtocol(sidecar.config.image_url);
		var sidecar_url = this.rectifyUrlProtocol(sidecar.config.sidecar_url);
	},

	rectifyUrlProtocol: function(u) {
		var page_proto = this.url.setUrl().attr("protocol");
		var url_proto = this.url.setUrl(u).attr("protocol");
		if (!this.empty(sidecar.config.rectify_url_find) && !this.empty(sidecar.config.rectify_url_repl)) {
			u = u.replace(sidecar.config.rectify_url_find, sidecar.config.rectify_url_repl);
		}
		if (page_proto == url_proto) {
			return u;
		}
		this.url.setUrl();
		return u.replace(url_proto, page_proto);
	}
};

/******************************
 * Type: Site configuration.
 * File: tigerdirect.js
 *****************************/
sidecar.config = {
    site_id: 126,
    site_name: "Tigerdirect",
    site_key: "e2c81a5c6ce5560815efa1dff6fe6312",
    logging: false,
    jxhrdata: { url: "http://membrain.getsidecar.com/trackstar/" },
    cookie_domain: '.tigerdirect.com',
    search_url: 'http://www.tigerdirect.com/applications/SearchTools/search.asp',
    search_param: 'keywords',
    cart: {},
    hosts: [],
    required_includes: [
        sidecar.preboot.asset_url + "/js/sidecar.core.js" + sidecar.boot.date_qry
    ]
};

// Begin
sidecar.app.checkReady();
