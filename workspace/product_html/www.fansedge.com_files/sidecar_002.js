// Create root sidecar object.
var sidecar = sidecar || {};

sidecar.core = {
	search_phrase: '',
	incoming_kw: '',
	http_referrer: '',
	cart_items: [],
	protocol: '',
	timezone_offset: 0,
	click_link: '',

	/**
	 * Fire sidecar.engage()
	 * @return {}
	 */
	afterLoad: function() {
		this.engage();
	},

	/**
	 * Initial sidecar.infuse and record email if available
	 * @return {}
	 */
	engage: function() {
		sidecar.log("sidecar.core.engage");

		// We used to pass product info in, but that is not necessary anymore.
		var data = {};
		if (!sidecar.app.empty(sidecar.config.infusion)) {
			sidecar.infuse.init(data);
		}

		// Determine page url.
		this.protocol = sidecar.app.url.setUrl().attr("protocol");
		sidecar.log(this.protocol);
		sidecar.core.page = sidecar.app.url.setUrl().attr("source");

		if (sidecar.logged_in == 1 && !sidecar.app.empty(sidecar.user_email)) {
			//sidecar.log("Should be logging in user.");
			sidecar.core.determineTimezoneOffset();
			sidecar.user.addEmail(sidecar.user_email, sidecar.core.timezone_offset);
		}
	},

	/**
	 * Sets timezone_offset property
	 * @return {}
	 */
	determineTimezoneOffset: function() {
		this.timezone_offset = (new Date('Thu, 01 Jan 1970').getTimezoneOffset() - 300) / 60;
	},

	/**
	 * Register an item click in the DB.
	 * @param  {string} item
	 * @param  {string} from
	 * @return {}
	 */
	itemClick: function(item, from) {
		sidecar.sjax({
			url:  sidecar.config.infuse_url, 
			data: {
				service: "track_click",
				click_from: from,
				product_id: item.product_id
			},
			success: "sidecar.core.itemClickResult"
		});
		this.click_link = item.link;
	},

	/**
	 * Update the browser location based on the response 
	 * from the itemClick call.
	 * 
	 * @param  {object} data
	 * @return {}
	 */
	itemClickResult: function(data) {
		if (data.success) {
			sidecar.log("Image click saved!");
		} else {
			sidecar.log("Image click NOT saved!");
		}
		//sidecar.log('Sending to: ' + sidecar.util.rectifyUrlProtocol(this.click_link));
		setTimeout(function() {
			document.location.href = sidecar.app.rectifyUrlProtocol(sidecar.core.click_link);
		}, 100);
	}
};

sidecar.user = {
	sessid: (sidecar.app.sessid !== undefined) ? sidecar.app.sessid : null,
	userkey: (sidecar.app.userkey !== undefined) ? sidecar.app.userkey : null,

	/**
	 * Send email data to backend and send response to sidecar.user.addEmailResult
	 * @param {string} email
	 * @param {string|number} timezone_offset
	 *
	 * @return {}
	 */
	addEmail: function(email, timezone_offset) {
		var new_reg = "0";
		if (!sidecar.app.empty(sidecar.new_registrant) && sidecar.new_registrant === 1) {
			new_reg = "1";
		}
		sidecar.sjax({
			data: {
				service: "addEmail",
				email: encodeURIComponent(email),
				timezone_offset: timezone_offset,
				new_registrant: new_reg
			},
			success: "sidecar.user.addEmailResult"
		});
	},

	/**
	 * Update user status and create signup cookie.
	 *
	 * Trigger sidecar.core.engage()
	 * 
	 * @param {object} data
	 *
	 * @return {}
	 */
	addEmailResult: function(data) {
		if (data.success) {
			this.user_logged_in = true;
			sidecar.log("Email updated");
		} else {
			sidecar.log("Email not updated");
		}
		if (data.signup_success) {
			this.createCookie("_sc_signup", '', -1);
		}
		sidecar.core.engage();
	},

	/**
	 * Retrieve cookie value by name
	 *
	 * Returns null if cookie is not found.
	 * 
	 * @param  {string} name
	 * @return {string|null}
	 */
	readCookie: function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i=0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
				return c.substring(nameEQ.length, c.length);
			}
		}
		return null;
	},

	/**
	 * Create a cookie
	 * @param  {string} name
	 * @param  {string} value
	 * @param  {number} days
	 * @return {}
	 */
	createCookie: function(name, value, days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + parseInt(days * 86400000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}
		if (sidecar.config.hosts[sidecar.boot.domain] !== undefined) {
			sidecar.config.cookie_domain = sidecar.config.hosts[sidecar.boot.domain];
		}
		if (sidecar.config.cookie_domain && sidecar.config.site_id != 85) {
			document.cookie = name + "=" + value + expires + ";domain=" + sidecar.config.cookie_domain + ";path=/";
		} else {
			document.cookie = name + "=" + value + expires + ";path=/";
		}
	},

	/**
	 * Test (kinda) if cookies are enabled in environment
	 *
	 * @return {string}
	 */
	testCookies: function() {
		this.createCookie('_sctest', '1', 0.0001);
		return this.readCookie('_sctest');
	}
};

/********************
 * Utilities...
 *********************/

/**
 * Builds data url and calls loadScript
 * @param  {object} r
 * @return {}
 */
sidecar.sjax = function(r) {
	var src = (r.url || sidecar.config.jxhrdata.url) + "?";
	$$$.each(r.data, function(i,n){
		src += i + "=" + n + "&";
	});
	src += (sidecar.app.userkey !== undefined) ? "user_public_key=" + sidecar.app.userkey + "&" : "";
	src += (sidecar.config.site_id !== undefined) ? "site_id=" + sidecar.config.site_id + "&" : "";
	src += "cb=" + r.success + "&";
	src += (sidecar.app.sessid !== undefined) ? "PHPSESSID=" + sidecar.app.sessid + "&" : "";
	src += "logged_in=" + (sidecar.logged_in||0);
	sidecar.log(src);
	sidecar.boot.loadScript(src);
};

/**
 * Send message to console if logging is enabled
 * @param  {string} txt
 * @return {null}
 */
sidecar.log = function(txt) {
	if (!sidecar.config.logging || typeof console === "undefined" || typeof console.log === "undefined") return false;
	console.log(txt);
};

/**
 * Do nothing
 * @param  {?} data
 * @return {boolean} false
 */
sidecar.noAction = function(data) {
	return;
};

// Let's git'r done.
if (sidecar.boot.single_file_mode === undefined || sidecar.boot.single_file_mode === false) {
	$$$(document).ready(function() {
		if (sidecar.config.required_includes !== undefined && sidecar.config.required_includes.length) {
			sidecar.boot.loadScript(sidecar.config.required_includes.shift());
		} else {
			// Check cookie.
			sidecar.core.engage();
		}
	});	
}