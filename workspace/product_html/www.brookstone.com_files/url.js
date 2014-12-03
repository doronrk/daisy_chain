///////////////////////////////////////////////////////////////////////////////
// Url
//
// Creates a JavaScript object with a number of functions for manipulating
// URLs
///////////////////////////////////////////////////////////////////////////////
var Url = function(urlString) {
    if (!urlString) {
		urlString = window.location.href;
	}
	var instance = new Object();

	var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
	var result = parse_url.exec(urlString);

	///////////////////////////////////////////////////////////////////////////
	// private members
	///////////////////////////////////////////////////////////////////////////
	var dirty = false;
	var href = result[0];
	var scheme = result[1];
	var slash = result[2];
	var host = result[3];
	var port = result[4];
	var path = result[5];
	var query = result[6];
	var fragment = result[7];

	///////////////////////////////////////////////////////////////////////////
	// Get the full URL in string format.
	///////////////////////////////////////////////////////////////////////////
	instance.getHref = function() {
		if (dirty) {
			href = scheme ? scheme + ':' : '';
			href +=  slash ? slash : '';
			href += host;
			href += port ? ':' + port : '';
			href += path ? '/' + path : '';
			href += query ? '?' + query : '';
			href += fragment ? '#' + fragment : '';
			dirty = false;
		}
		return href;
	}

	///////////////////////////////////////////////////////////////////////////
	// Get the URL scheme/protocol (e.g. HTTP)
	///////////////////////////////////////////////////////////////////////////
	instance.getScheme = function() {
		return scheme;
	}

	///////////////////////////////////////////////////////////////////////////
	// Set the URL scheme/protocol (e.g. HTTP) to the specified value
	///////////////////////////////////////////////////////////////////////////
	instance.setScheme = function(s) {
		if (/[a-zA-Z]*/.test(s)) {
			scheme = s;
			dirty = true;
		} else {
			throw Error('Invalid URL Scheme');
		}
		return this;
	}

	///////////////////////////////////////////////////////////////////////////
	// Get the slashes following the URL protocol
	///////////////////////////////////////////////////////////////////////////
	instance.getSlash = function() {
		return slash;
	}

	///////////////////////////////////////////////////////////////////////////
	// Set the slashes following the URL protocol
	///////////////////////////////////////////////////////////////////////////
	instance.setSlash = function(s) {
		if (/\/{0,3}/.test(s)) {
			slash = s;
			dirty = true;
		} else {
			throw Error('Invalid URL Slash');
		}
		return this;
	}

	///////////////////////////////////////////////////////////////////////////
	// Get the URL host (e.g. www.brookstone.com)
	///////////////////////////////////////////////////////////////////////////
	instance.getHost = function() {
		return host;
	}

	///////////////////////////////////////////////////////////////////////////
	// Set the URL host (e.g. www.brookstone.com)
	///////////////////////////////////////////////////////////////////////////
	instance.setHost = function(s) {
		if (/[0-9.\-A-Za-z]+/.test(s)) {
			host = s;
			dirty = true;
		} else {
			throw Error('Invalid URL Host');
		}
		return this;
	}

	///////////////////////////////////////////////////////////////////////////
	// Get the URL port number
	///////////////////////////////////////////////////////////////////////////
	instance.getPort = function() {
		return port;
	}

	///////////////////////////////////////////////////////////////////////////
	// Set the URL port number.
	///////////////////////////////////////////////////////////////////////////
	instance.setPort = function(s) {
		if (/\d*/.test(s)) {
			port = s;
			dirty = true;
		} else {
			throw Error('Invalid URL Port');
		}
		return this;
	}

	///////////////////////////////////////////////////////////////////////////
	// Get the URL path (e.g. /webassets/images/myimage.jpg.
	///////////////////////////////////////////////////////////////////////////
	instance.getPath = function() {
		return decodeURIComponent(path);
	}

	///////////////////////////////////////////////////////////////////////////
	// Get the URL path (e.g. /webassets/images/myimage.jpg.
	///////////////////////////////////////////////////////////////////////////
	instance.setPath = function (s) {
		if (/[^?#]*/.test(s)) {
			path = encodeURIComponent(s);
			dirty = true;
		} else {
			throw Error('Invalid URL Path');
		}
		return this;
	}

	///////////////////////////////////////////////////////////////////////////
	// Get the URL query string (i.e. the full set of request parameters in
	// string format).
	///////////////////////////////////////////////////////////////////////////
	instance.getQueryString = function() {
		return decodeURIComponent(query);
	}

	///////////////////////////////////////////////////////////////////////////
	// Parses the URL fragment into a JSON object.
	///////////////////////////////////////////////////////////////////////////
	instance.getQueryParameters = function() {
		var result = {};
		var re = /([^&=]+)=([^&]*)/g;

		// Creates a map with the query string parameters
		while (m = re.exec(query)) {
			var name = decodeURIComponent(m[1]);
			var value = decodeURIComponent(m[2]) || '';
			if (!result[name]) {
				if (/\[\]$/.test(name)) {
					result[name] = [];
					result[name].push(value);
				} else {
					result[name] = value;
				}
			} else {
				if (isArray(result[name])) {
					result[name].push(value);
				} else {
					var temp = result[name];
					result[name] = [];
					result[name].push(temp);
					result[name].push(value);
				}
			}
		}
		return result;
	}
	
    ///////////////////////////////////////////////////////////////////////////
	// Get a single query parameter given its name
    ///////////////////////////////////////////////////////////////////////////
	instance.getQueryParameter = function(name) {
		return this.getQueryParameters()[name];
	}

	///////////////////////////////////////////////////////////////////////////
	// Sets the URL query (i.e. the request parameters). If no argument is
	// specified, the query will be removed from the URL. If a string is
	// provided as the argument, then the query will be replaced by the string
	// given. If an object is given as the argument, the object will be
	// converted into name/value pairs separated by a ampersand (&) character
	// and set as the query.
	///////////////////////////////////////////////////////////////////////////
	instance.setQuery = function(s) {
		if (typeof s === 'undefined' || typeof s === 'null') {
			query = '';
		} else if (typeof s === 'string') {
			if (/[^#]*/.test(s)) {
				query = encodeURIComponent(s);
			} else {
				throw Error('Invalid URL Query');
			}
		} else {
			query = $.param(s);
		}
		dirty = true;
		return this;
	}

	///////////////////////////////////////////////////////////////////////////
	// This function allows specific key/value pairs to be added or the value
	// for a key to updated in the URL query. If a string is used for the
	// key parameter then the value for that key will be set to whatever is
	// supplied as the values argument. If an array is specified for the keys
	// argument, then each of the key values will be modified. Note that if
	// the keys are given as an array, the values MUST also be given as an
	// identical length array. The positions in the respective arrays will
	// determine which value is associated with what key.
	///////////////////////////////////////////////////////////////////////////
	instance.setQueryParameters = function(keys, values) {
		var queryParams = this.getQueryParameters();
		if (typeof keys === 'string') {
			queryParams[keys] = values;
			this.setQuery(queryParams);
		} else if ($bks.isArray(keys)) {
			if (!$bks.isArray(values) || keys.length != values.length) {
				throw Error('When Using an Array of Query Parameter Keys, the Values Must Also be an Array of the Same Length');
			}
			for (var i = 0; i < keys.length; i++) {
				queryParams[keys[i]] = values[i];
			}
			this.setQuery(queryParams);
		}
		return this;
	}

	///////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////
	instance.clearQueryParameters = function(keys) {
		if (!keys) {
			this.setQuery('');
		} else {
			var queryParams = this.getQueryParameters();
			if (typeof keys === 'string') {
				if (queryParams[keys]) {
					delete queryParams[keys];
					this.setQuery(queryParams);
				}
			} else if ($bks.isArray(keys)) {
				for (var i = 0; i < keys.length; i++) {
					if (queryParams[keys][i]) {
						delete queryParams[keys][i];
					}
				}
				this.setQuery(queryParams);
			}
		}
		return this;
	}

	///////////////////////////////////////////////////////////////////////////
	// Return the resource portion of the URL - that is, the portion of the
	// URL prior to the hash (#) character.
	///////////////////////////////////////////////////////////////////////////
	instance.getResource = function() {
		return getHref().replace('#' + fragment, '');
	}

	///////////////////////////////////////////////////////////////////////////
	// Return the URL fragment - that is, the part of the URL after the hash
	// (#) character.
	///////////////////////////////////////////////////////////////////////////
	instance.getFragment = function() {
		return fragment;
	}

	///////////////////////////////////////////////////////////////////////////
	// Parses the URL fragment into a JSON object. Key/value pairs are
	// separated by colon (:) characters and the keys are separated by their
	// values by an equal (=) character
	///////////////////////////////////////////////////////////////////////////
	instance.getFragmentParameters = function() {
		var result = {};
		var re = /([^:=]+)=([^:]*)/g;

		// Creates a map with the fragment parameters
		while (m = re.exec(fragment)) {
			var name = decodeURIComponent(m[1]);
			var value = decodeURIComponent(m[2]) || '';
			if (!result[name]) {
				if (/\[\]$/.test(name)) {
					result[name] = [];
					result[name].push(value);
				} else {
					result[name] = value;
				}
			} else {
				if (isArray(result[name])) {
					result[name].push(value);
				} else {
					var temp = result[name];
					result[name] = [];
					result[name].push(temp);
					result[name].push(value);
				}
			}
		}
		return result;
	}

	///////////////////////////////////////////////////////////////////////////
	// Replaces the URL fragment. If no argument is specified, the fragment
	// will be removed from the URL. If a string is provided as the argument,
	// then the fragment will be replaced by the string given. If an object is
	// given as the argument, the object will be converted into name/value
	// pairs separated by a colon (:) character and set as the fragment.
	///////////////////////////////////////////////////////////////////////////
	instance.setFragment = function(s) {
		fragment = '';
		if (typeof s === 'string') {
			fragment = s;
		} else if (typeof s === 'object') {
			var hasAny = false;
			for (var name in s) {
				if (s.hasOwnProperty(name)) {
					if (hasAny) {
					    fragment += ':';
					}
					if ($bks.isArray(s[name])) {
						fragment += name + '=' + s[name].join(':' + name + '=');
					} else {
						fragment += name + '=' + s[name];
					}
					hasAny = true;
					dirty = true;
				}
			}
		}
		return this;
	}

	///////////////////////////////////////////////////////////////////////////
	// This function allows specific key/value pairs to be added or the value
	// for a key to updated in the URL Fragment. If a string is used for the
	// key parameter then the value for that key will be set to whatever is
	// supplied as the values argument. If an array is specified for the keys
	// argument, then each of the key values will be modified. Note that if
	// the keys are given as an array, the values MUST also be given as an
	// identical length array. The positions in the respective arrays will
	// determine which value is associated with what key.
	///////////////////////////////////////////////////////////////////////////
	instance.setFragmentParameters = function(keys, values) {
		var fragParams = this.getFragmentParameters();
		if (typeof keys === 'string') {
			fragParams[keys] = values;
			this.setFragment(fragParams);
		} else if ($bks.isArray(keys)) {
			if (!$bks.isArray(values) || keys.length != values.length) {
				throw Error('When using an array of fragment parameter keys, the values must also be an array of the same length');
			}
			for (var i = 0; i < keys.length; i++) {
				fragParams[keys[i]] = values[i];
			}
			this.setFragment(fragParams);
		}
		return this;
	}

	///////////////////////////////////////////////////////////////////////////
	// Eliminates key/value pairs in the URL fragment. If no argument is
	// given, then ALL key/value pairs are eliminated. This is Identical to
	// setting the URL fragment to an empty string. If a string is specified
	// for the argument, then the key/value pair with the given key (if it
	// exists) will be elimated from the URL fragment. If there is no key
	// matching the one specified, this function acts as a no-op. If an array
	// is given as the argument then all the keys in the array will be removed
	// if they exist in the URL fragment
	///////////////////////////////////////////////////////////////////////////
	instance.clearFragmentParameters = function(keys) {
		if (!keys) {
			this.setFragment('');
		} else {
			var fragParams = this.getFragmentParameters();
			if (typeof keys === 'string') {
				if (fragParams[keys]) {
					delete fragParams[keys];
					this.setFragment(fragParams);
				}
			} else if ($bks.isArray(keys)) {
				for (var i = 0; i < keys.length; i++) {
					if (fragParams[keys][i]) {
						delete fragParams[keys][i];
					}
				}
				this.setFragment(fragParams);
			}
		}
		return this;
	}

	///////////////////////////////////////////////////////////////////////////
	// Opens the URL specified by this URL object. An optional target
	// parameter may be specified: _blank (new window or tab) | _self (same
	// frame) | _parent (parent frame) | _top (full body of window) |
	// <framename> (the specified frame name).
	///////////////////////////////////////////////////////////////////////////
	instance.go = function(target) {
		if (target) {
			var w = window.open(this.getHref(), target);
        	w.focus();
		} else {
			window.location.href = this.getHref();
		}
		return false;
	}

	return instance;
};

///////////////////////////////////////////////////////////////////////////
//Reference to the current page URL
///////////////////////////////////////////////////////////////////////////
var $URL = new Url();