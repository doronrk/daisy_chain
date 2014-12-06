/**
 * CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF BLOOMREACH, INC.
 *
 * Copyright (C) 2013 BloomReach, Inc. All Rights Reserved.
 *
 * Use of this Source Code is subject to the terms of the applicable license
 * agreement from BloomReach, Inc.
 *
 * The copyright notice(s) in this Source Code does not indicate actual or
 * intended publication of this Source Code.
 */

/**
 * This is a step to reserve global variables in order to avoid possible namespace collisions for BloomMobile. This has to be used with brm-post-namespace-wrapper.js
 * This step is necessary since Zepto will define itself in the global variable Zepto (and $ if it's not already defined).
 * This code achieves with brm-post-namespace-wrapper.js is to clean up these global variables after we've pulled them into the BR namespace, thereby leaving behind no trails.
 *
 * Author: kazu@bloomreach.com
 */

var BR = BR || {};

;
(function(window, BR) {
  var namespacesToWrap = ['Zepto', '$'];
  var savedGlobalNamespace = BR.savedGlobalNamespace = BR.savedGlobalNamespace || {};
  for (var i = namespacesToWrap.length; i--;) {
    var namespace = namespacesToWrap[i];
    if (window[namespace]) { // 'namespace in window' does not work!!
      savedGlobalNamespace[namespace] = window[namespace];
    }
  }
})(window, BR);

/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 *
 * Modified for Zepto (http://zeptojs.com/) by kazu@bloomreach.com on 08/09/2013
 */
;// this semicolon  is important since the previous file (Zepto) does not end with a semicolon, which causes an error
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		if (window.jQuery) {
			factory(jQuery);
		}
		if (window.Zepto) {
			factory(Zepto);
		}
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			$.cookie(key, '', $.extend(options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));
/**
 * CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF BLOOMREACH, INC.
 *
 * Copyright (C) 2013 BloomReach, Inc. All Rights Reserved.
 *
 * Use of this Source Code is subject to the terms of the applicable license
 * agreement from BloomReach, Inc.
 *
 * The copyright notice(s) in this Source Code does not indicate actual or
 * intended publication of this Source Code.
 */

/**
 * This is a support library for BloomReach Mobile and Site Search to handle
 * feature detection and polyfills.
 *
 * Author: william@bloomreach.com
 */

;(function(BR) {

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
      for (var i = (start || 0), j = this.length; i < j; i++) {
        if (this[i] === obj) {
          return i;
        }
      }
      return -1;
    };
  }

  BR.support = BR.support || {};

  BR.support.xhrCors = (typeof XMLHttpRequest !== undefined && 'withCredentials' in new XMLHttpRequest());

}(BR));
/**
 * CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF BLOOMREACH, INC.
 *
 * Copyright (C) 2013 BloomReach, Inc. All Rights Reserved.
 *
 * Use of this Source Code is subject to the terms of the applicable license
 * agreement from BloomReach, Inc.
 *
 * The copyright notice(s) in this Source Code does not indicate actual or
 * intended publication of this Source Code.
 */

/**
 * This is a merchant specific config utility for BloomMobile.
 *
 * It requires jQuery to be loaded already.
 *
 * Author: jasvinder@bloomreach.com
 */
;(function(BR) {

  var $ = BR.$;
  BR.mobile = BR.mobile || {};
  BR.mobile.configs = BR.mobile.configs || {};

  BR.mobile.configs.experimentStatus = {
    T      : 'T',
    C      : 'C',
    ACTIVE : 'ACTIVE'
  };

  var merchantConfig = {
    enableRedirect : {
      4068 : 1,
      5117 : 1,
      5118 : 1,
      5115 : 1,
      5166 : 1,
      5184 : 1,
      5079 : 1,
      defaultValue : 0
    },
    rhsParentLevel : {
      /**
       * [MOBILE-1193] Tilly's (accountId=5139) needs to take the first level breadcurmb. However,
       * for debshops, the first level breadcurmb is often clearance, which is not what we want.
       * Eventually, the backend should let UI know what exactly needs to be shown.
       */
      5139 : 0,
      5117 : 0,
      4068 : 0,
      //defaultValue : 1
	  defaultValue : 0
    },
    rhsLeafLevel : {
      /**
       * Specify the leaf category node level here.
       * Kohls requires to show only one level, in that case we can set the rhsLeafLevel the same as
       * rhsParentLevel, the defaultValue is -1 meaning we should take the largest level
       */
      5117 : 0,
      //defaultValue : -1
	  defaultValue : 0
    },
    rhsDisabled : {
      /**
       * Specify if we want to hide RHS suggestions or not
       */
      5117: true,
      defaultValue: false,
    },
    experimentStatus : {
      'search20130416' : {
        /* Allow 100% Test traffic on debshops */
        5115 : BR.mobile.configs.experimentStatus.T,
        /* Tilly's is not running the A/B test */
        5139 : BR.mobile.configs.experimentStatus.T,
        defaultValue : BR.mobile.configs.experimentStatus.ACTIVE
      },
      defaultValue : BR.mobile.configs.experimentStatus.C
    },
    testUserRatio : {
      /**
       * Custom AB split
       * Specify the fraction test users
       */
      defaultValue : 0.5, // 50% Test
      5117: 1.0,
      5193: 1.0,
      5194: 1.0,
    },
    abTestVersion : {
      5117: "3.0",
      5193: "1.0",
      5194: "1.0",
      defaultValue : "0.0"
    }
  };

  BR.mobile.configs.merchantConfig = merchantConfig;

  BR.mobile.configs.getABTestVersion = function(accountId){
    if (accountId in merchantConfig.abTestVersion) {
      return merchantConfig.abTestVersion[accountId];
    }
    return merchantConfig.abTestVersion.defaultValue;
  };

  BR.mobile.configs.getRhsParentLevel = function(accountId) {
    if (accountId in merchantConfig.rhsParentLevel) {
      return merchantConfig.rhsParentLevel[accountId];
    }
    return merchantConfig.rhsParentLevel.defaultValue;
  };


  BR.mobile.configs.getRedirect = function(accountId) {
    if (accountId in merchantConfig.enableRedirect) {
      return merchantConfig.enableRedirect[accountId];
    }
    return merchantConfig.enableRedirect.defaultValue;
  };

  BR.mobile.configs.getRhsLeafLevel = function(accountId) {
    if (accountId in merchantConfig.rhsLeafLevel) {
      return merchantConfig.rhsLeafLevel[accountId];
    }
    return merchantConfig.rhsLeafLevel.defaultValue;
  };

  BR.mobile.configs.getRhsDisabled = function(accountId) {
    if (accountId in merchantConfig.rhsDisabled) {
      return merchantConfig.rhsDisabled[accountId];
    }
    return merchantConfig.rhsDisabled.defaultValue;
  };

  BR.mobile.configs.getExperimentStatus = function(experiment, accountId) {
    if (!merchantConfig.experimentStatus[experiment]) {
      return merchantConfig.experimentStatus.defaultValue;
    }
    else if(!merchantConfig.experimentStatus[experiment][accountId]) {
      return merchantConfig.experimentStatus[experiment].defaultValue;
    }
    else {
      return merchantConfig.experimentStatus[experiment][accountId];
    }
  };

  BR.mobile.configs.getTestUserRatio = function(accountId) {
    if (accountId in merchantConfig.testUserRatio) {
      return merchantConfig.testUserRatio[accountId];
    }
    return merchantConfig.testUserRatio.defaultValue;
  };
}(BR));
/**
 * CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF BLOOMREACH, INC.
 *
 * Copyright (C) 2013 BloomReach, Inc. All Rights Reserved.
 *
 * Use of this Source Code is subject to the terms of the applicable license
 * agreement from BloomReach, Inc.
 *
 * The copyright notice(s) in this Source Code does not indicate actual or
 * intended publication of this Source Code.
 */

/**
 * This is a common function library for BloomMobile.
 *
 * Requires jQuery && jQuery.cookie
 * Modified for Zepto (http://zeptojs.com/) by kazu@bloomreach.com on 08/09/2013
 *
 * Author: william@bloomreach.com
 */

// use either jQuery or Zepto, whichever defined as $, but not Prototype.js
// if we include Zepto and Prototype.js is used outside of br-mob.js, then Zepto
BR.$ = (typeof $ !== 'undefined' && [window.jQuery, window.Zepto].indexOf($) !== -1)? $ : window.jQuery || window.Zepto;

;(function(BR, document) {
BR.mobile = BR.mobile || {};
var $ = BR.$;

/* Server Configuration */
BR.mobile.apiUrl = {
  standalone: {
    core: 'data-search.json',
    suggest: 'data-autosuggest.json'
  },
  staging: {
    core: '//brm-staging-core-0.brsrvr.com/api/v1/core/',
    suggest: '//brm-staging-suggest-0.brsrvr.com/api/v1/suggest/'
  },
  prod: {
    core: '//brm-core-0.brsrvr.com/api/v1/core/',
    suggest: '//brm-suggest-0.brsrvr.com/api/v1/suggest/'
  }
};

/* Constants */

BR.mobile.keyCode = {
  BACKSPACE: 8,
  ENTER: 13,
  ESCAPE: 27,
  UP:38,
  DOWN:40
};

var cookieType = {
  _BR_UID_2: '_br_uid_2',
  AB_TESTS: '_br_me',
  AB_TESTS_VERSION: '_br_mev'
};
BR.mobile.cookieType = cookieType;

var TRENDING_KEYWORD = 'trending';
var JFY_KEYWORD = 'Just For You';
var searchType = {
      KEYWORD: 'keyword',
      CATEGORY: 'category',
      TRENDING: TRENDING_KEYWORD
    },
    requestType = {
      SEARCH: 'search',
      MLT: 'mlt',
      FAVORITES: 'favorites',
      JFY: 'jfy'
    };
BR.mobile.searchType = searchType;
BR.mobile.requestType = requestType;

var signatureType = BR.mobile.signatureType = {
  SEARCH:   'search',
  KEYWORD:  'keyword',
  TRENDING: 'trending',
  CATEGORY: 'search',
  WITHIN:   'within',
  MLT:      'mlt',
  JFY:      'jfy'
};

BR.mobile.apiFields = {
  pid: 'pid',
  title: 'title',
  brand: 'brand',
  url: 'url',
  thumb_image: 'thumb_image',
  price: 'price',
  sale_price: 'sale_price',
  promotions: 'promotions',
  flags: 'flags',
  colors: 'colors',
  color_groups: 'color_groups',
  sizes: 'sizes',
  price_range: 'price_range',
  price_label: 'price_label',
  sale_price_range: 'sale_price_range',
  sale_price_type: 'sale_price_type',
  reviews_rating: 'reviews_rating',
  reviews_count: 'reviews_count',
  // sku-level fields
  sku_thumb_images: 'sku_thumb_images',
  sku_swatch_images: 'sku_swatch_images',
  sku_color: 'sku_color',
  sku_color_group: 'sku_color_group',
  sku_size: 'sku_size'
};

/* Utility functions */

// Bitmasks
var encodingTypes = {
  URI: 0x1,
  SOLR: 0x2,
  HASH_PARAM: 0x4
};
function encode(plaintext, encodings) {
  var encoded = plaintext;

  // Bitwise AND
  if (encodings & encodingTypes.URI) {
    encoded = encodeURIComponent(encoded); //disabled for special characters. if entered enter-key in search box.
	//encoded = encoded;
  }
  if (encodings & encodingTypes.SOLR) {
    // ' needs to be encoded to %27 for Solr search
    encoded = encoded.replace("'", "%27");
  }
  if (encodings & encodingTypes.HASH_PARAM) {
    // . needs to be encoded to %2E since Price filters have . in their value ($59.99) and jQuery Mobile doesn't
    // kick off our custom transition when our fq parameter contains an un-encoded '.'
    encoded = encoded.replace('.', '%2E');
  }

  return encoded;
}

BR.mobile.getDataSource = function(environment, name) {
  var api = name === 'suggest' ? 'suggest' : 'core';
  if (api === 'suggest' && $.cookie('_brmSuggestUrl')) {
    return $.cookie('_brmSuggestUrl');
  }
  if (api === 'core' && $.cookie('_brmCoreUrl')) {
    return $.cookie('_brmCoreUrl');
  }
  return BR.mobile.apiUrl[environment][api];
};

BR.mobile.getDataType = function(environment) {
  return (environment === 'standalone' || BR.support.xhrCors) ? 'json' : 'jsonp';
};

BR.mobile.isBRSearchRedirect = function(accountId, controlSearchUrls, getQuery) {
  if (BR.mobile.getABSearchAssignment(accountId) === 'T' && location.hash.indexOf('brm-search') !== 1 && (typeof getQuery === 'undefined' || typeof getQuery() !== 'undefined')) {
    for(var i = 0; i < controlSearchUrls.length; i++) {
      if(location.href.indexOf(controlSearchUrls[i]) !== -1) {
        return true;
      }
    }
  }
  return false;
};

/* Loads BRM Search Page is User is in test group and landed on Control group Search Page
 *
 * accountId: Merchant's account Id
 * controlSearchUrls:
 * query: Control Search query
 * callback: callback method to load BRM Search
 */
BR.mobile.loadBRSearchIfTestGroup = function(accountId, controlSearchUrls, getQuery, callback) {
  if(BR.mobile.isBRSearchRedirect(accountId, controlSearchUrls, getQuery)) {
    var searchData = new BR.mobile.KeywordSearchSignature({ 'query': decodeURIComponent(getQuery()) }),
        hashParameters = searchData.toHashParameters(),
        searchUrl = '#brm-search?' + BR.mobile.createURLFromParams(hashParameters);
    callback(searchUrl);
  }
};

BR.mobile.createCommonApiParams = function(options, requestId) {
  var params = {
    account_id: options.accountId || '',
    auth_key: options.authKey || '',
    domain_key: options.domainKey || '',
    request_id: requestId,
    _br_uid_2: $.cookie(cookieType._BR_UID_2),
    url: location.href,
    ref_url: document.referrer
  };
  return params;
};

BR.mobile.createURLFromParams = function(params) {
 
  var l = [];
  for (var key in params) {
    var v = params[key];
    if (typeof v === 'object') {
      if (v.length > 0) {
        for (var i = 0; i < v.length; i++) {
          l.push(encodeURIComponent(key) + '=' + encode(v[i], encodingTypes.URI + encodingTypes.SOLR + encodingTypes.HASH_PARAM));		
        }
      }
    } else if (typeof v !== 'undefined') {
      l.push(encodeURIComponent(key) + '=' + encode(v, encodingTypes.URI + encodingTypes.SOLR + encodingTypes.HASH_PARAM));	  
    }
  }

  return l.join('&');
};

BR.mobile.getHashUrlParams = function(hashUrl) {
  var d = {};
  // Modified by Forever21 - Add price facet to request URL
  if(hashUrl.indexOf('&facet.range=sale_price:[0 TO 10]&facet.range=sale_price:[10 TO 20]&facet.range=sale_price:[30 TO *]') < 0)
            hashUrl = hashUrl + '&facet.range=sale_price:[0 TO 10]&facet.range=sale_price:[10 TO 20]&facet.range=sale_price:[30 TO *]'; 

  var unsplit_params = hashUrl.split('?')[1];
  if (unsplit_params) {
    var splitParams = unsplit_params.split('&'),
        i = splitParams.length;

    while (i--) {
      var kv = splitParams[i].split('=');
      var key = decodeURIComponent(kv[0]);
      var value = decodeURIComponent(kv[1]);
      /* If there are duplicated keys, return their values as a list */
      if (key in d) {
        if (typeof d[key] === 'string') {
          d[key] = [d[key]];
        }
        d[key].push(value);
      }
      else {
        d[key] = value;
      }
    }
  }
  return d;
};

BR.mobile.getSignatureFromHash = function(hashUrl) {
  return BR.mobile.createSearchSignature(BR.mobile.getHashUrlParams(hashUrl));
};

/**
 * Shuffles an array in place using the Fisher-Yates shuffle.
 * 
 * @param myArray       the array to shuffle, which will be modified
 * @returns myArray     the same array, which has been shuffled
 */
BR.mobile.shuffle = function(myArray) {
  var i = myArray.length, j, tempi, tempj;
  if (i == 0) {
    return myArray;
  }
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    tempi = myArray[i];
    tempj = myArray[j];
    myArray[i] = tempj;
    myArray[j] = tempi;
  }
  return myArray;
};

/**
 * Generates a random request ID so that pixel logs can be mapped to
 * corresponding API logs.
 * 
 * @returns rid     the randomly generated request ID
 */
BR.mobile.generateRid = function() {
  return Math.round(Math.random() * 10E12);
};

/**
 * Checks if input is missing any fields in requiredFields.
 * 
 * @param input                 the input object to validate
 * @param requiredFields        the fields for which input must have truthy values
 * @param allowZero             consider the number 0 as valid
 * @returns missingFields       array of requiredFields that input does not satisfy
 *                              empty array if input satisfies all requiredFields
 */
BR.mobile.getMissingFields = function(input, requiredFields, allowZero) {
  allowZero = allowZero || false;

  var missingFields = [];

  for (var i = 0, len = requiredFields.length; i < len; i++) {
    var requiredField = requiredFields[i];
    if (!input[requiredField] && (!allowZero || input[requiredField] != '0')) {  // type coercion intended: if allowZero, then 0 and '0' are valid, '' is not
      missingFields.push(requiredField);
    }
  }

  return missingFields;
};

/**
 * Validates that input contains all requiredFields.
 * 
 * @param input                 the input object to validate
 * @param requiredFields        the fields for which input must have truthy values
 * @param description           how we should refer to what we are validating
 * @param allowZero             consider the number 0 as valid
 * @returns                     true if all requiredFields are satisfied
 *                              false otherwise
 */
BR.mobile.validateFields = function(input, requiredFields, description, allowZero) {
  var missingFields = BR.mobile.getMissingFields(input, requiredFields, allowZero);

  if (missingFields.length > 0) {
    console.error("ERROR: Missing required " + description + ": " + missingFields.join(', '));
    return false;
  }

  return true;
};

/* SearchSignature classes */

function SearchSignature(parameters) {
  this.parameters = {};

  if (parameters) {
    this.setParameters(parameters);
  }
  this.signatureType = signatureType.SEARCH;
}

SearchSignature.prototype._setParametersFromObject = function(parameters) {
  if (this._validateParameters(parameters)) {
    this.parameters = parameters;
  }
};

SearchSignature.prototype._getFilterJoinValue = function(filterType) {
  if (filterType === 'category') {
    return 'AND';
  } else {
    return 'OR';
  }
};

/**
 * Create the filters data structure from the fq URL parameters.
 */
SearchSignature.prototype._getFilterFromHashParameters = function(fq_params) {
  var ret_val = {};

  if (typeof fq_params === 'string') {
    fq_params = [fq_params];
  }
  // Convert string key/value pairs into a JS object
  for (var i = 0; i < fq_params.length; i++) {
    var fq_param = fq_params[i].split(':');
    if (fq_param[1]) {
      var filter_type = fq_param[0];
      ret_val[filter_type] = [];
      var filter_vals = fq_param[1].split(this._getFilterJoinValue(filter_type));
      for (var j = 0; j < filter_vals.length; j++) {
        var filter_val = filter_vals[j].match(/^\s*"(.*)"\s*$/);
        if (filter_val) {
          ret_val[filter_type].push(filter_val[1]);
        }
      }
    }
  }
  return ret_val;
};

/**
 * Construct the array of values ['field:"a" AND "b"', 'field2:"a" OR "c"'] for the filter URL's fq parameters
 **/
SearchSignature.prototype._constructFilterURL = function(filters) {
  var urlFiltersConstruct = [];
  for(var filter_type in filters) {
    if(filter_type != 'category')
    {
        var filter_values = filters[filter_type];
        if (filter_values.length > 0) {
          urlFiltersConstruct.push([filter_type, ':"', filter_values.join('" ' + this._getFilterJoinValue(filter_type) + ' "'), '"'].join(''));
        }
    }
    else
    {
        var filter_values = filters[filter_type];
        if (filter_values.length > 0) {
            if (filter_values.length > 1)
            {
                urlFiltersConstruct.push([filter_type, ':"', filter_values[filter_values.length - 1], '"'].join(''));
            }
            else
            {
                urlFiltersConstruct.push([filter_type, ':"', filter_values.join('" ' + this._getFilterJoinValue(filter_type) + ' "'), '"'].join(''));
            }
        }
    }

  }
  return urlFiltersConstruct;
};

/** 
 * Add a filter (value, type) - eg, "prada", "BRAND"
 **/
SearchSignature.prototype.addFilter = function(filter_value, filter_type) {
  if (!this.parameters.filters) {
    this.parameters.filters = {};
  }
  if(!this.parameters.filters[filter_type]) {
    this.parameters.filters[filter_type] = [];
  }
  if(this.parameters.filters[filter_type].indexOf(filter_value)<0) {
    this.parameters.filters[filter_type].push(filter_value);
  }

  return this;
};

SearchSignature.prototype.removeFilter = function(filter_type, filter_value) {
  if (this.parameters.filters && this.parameters.filters[filter_type]) {
    if (filter_value) {
      var index = this.parameters.filters[filter_type].indexOf(filter_value);
      if(index>=0){
        this.parameters.filters[filter_type].splice(index, 1);
      }
      if (this.parameters.filters[filter_type].length === 0) {
        delete this.parameters.filters[filter_type];
      }
    } else {
      delete this.parameters.filters[filter_type];
    }
  }

  return this;
};

SearchSignature.prototype.hasFilters = function() {
  var filters = this.parameters.filters;

  if (filters) {
    for (var filterType in filters) {
      if (filters.hasOwnProperty(filterType)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * getName() is intended for things like breadcrumbs or the search box.
 * getLabel() is intended for the Autosuggest menu.
 * 
 * For most searches, the two will be the same.  The special case is Autosuggest RHS.  See SearchWithinSignature.
 */
SearchSignature.prototype.getLabel = function() {
  return this.getName();
};


function KeywordSearchSignature(parameters) {
  SearchSignature.call(this, parameters);
  this.signatureType = signatureType.KEYWORD;
}
KeywordSearchSignature.prototype = new SearchSignature();
KeywordSearchSignature.prototype.constructor = KeywordSearchSignature;

KeywordSearchSignature.prototype.setParameters = function(parameters) {
  this._setParametersFromObject(parameters);
};

KeywordSearchSignature.prototype._validateParameters = function(parameters) {
  if (!parameters.query) {
    console.log('WARNING: KeywordSearchSignature._validateParameters(): missing parameters.query for keyword search.  Proceeding with empty query.  parameters: ', parameters);
    parameters.query = '';
  }

  return true;
};

KeywordSearchSignature.prototype.toHashParameters = function() {
  var searchTerm = this.parameters.query,
      hashParameters = {
        request_type: requestType.SEARCH,
        search_type: searchType.KEYWORD,
        q: searchTerm,
        l: searchTerm,
        sort: this.parameters.sort
      };


  if (this.parameters.filters) {
    hashParameters.fq = this._constructFilterURL(this.parameters.filters);
  }
  return hashParameters;
};

KeywordSearchSignature.prototype.fromHashParameters = function(hashParameters) {
  this.parameters = {
    query: hashParameters.q,
    sort: hashParameters.sort
  };
  if (hashParameters.fq) {
    this.parameters.filters = this._getFilterFromHashParameters(hashParameters.fq);
  }

  return this;
};

KeywordSearchSignature.prototype.getName = function() {
  return this.parameters.query || '';
};


function TrendingSearchSignature(parameters) {
  SearchSignature.call(this, parameters);
  this.signatureType = signatureType.TRENDING;
}
TrendingSearchSignature.prototype = new SearchSignature();
TrendingSearchSignature.prototype.constructor = TrendingSearchSignature;

TrendingSearchSignature.prototype.setParameters = function(parameters) {
  this._setParametersFromObject(parameters);
};

TrendingSearchSignature.prototype._validateParameters = function(parameters) {
  if (parameters.query) {
    console.log('WARNING: TrendingSearchSignature._validateParameters(): does not take parameters.query.  Proceeding with empty query.  parameters: ', parameters);
    parameters.query = '';
  }

  return true;
};

TrendingSearchSignature.prototype.toHashParameters = function() {
  var hashParameters = {
        request_type: requestType.SEARCH,
        search_type: searchType.TRENDING,
        q: '',
        l: TRENDING_KEYWORD,
        sort: this.parameters.sort
      };

  if (this.parameters.filters) {
    hashParameters.fq = this._constructFilterURL(this.parameters.filters);
  }
  return hashParameters;
};

TrendingSearchSignature.prototype.fromHashParameters = function(hashParameters) {
  this.parameters = {
    query: hashParameters.q,
    sort: hashParameters.sort
  };
  if (hashParameters.fq) {
    this.parameters.filters = this._getFilterFromHashParameters(hashParameters.fq);
  }

  return this;
};

TrendingSearchSignature.prototype.getName = function() {
  return searchType.TRENDING;
};


function CategorySearchSignature(parameters) {
  SearchSignature.call(this, parameters);
  this.signatureType = signatureType.CATEGORY;
}
CategorySearchSignature.prototype = new SearchSignature();
CategorySearchSignature.prototype.constructor = CategorySearchSignature;

CategorySearchSignature.prototype.setParameters = function(parameters) {
  this._setParametersFromObject(parameters);
};

CategorySearchSignature.prototype._validateParameters = function(parameters) {
  if (!parameters.id && !parameters.name) {
    console.log('ERROR: CategorySearchSignature._validateParameters() failed: missing parameters.id and parameters.name for category search.  parameters: ', parameters);
    return false;
  } else if (!parameters.id) {
    console.log('WARNING: CategorySearchSignature._validateParameters(): missing parameters.id for category search.  Copying from parameters.name.  parameters: ', parameters);
    parameters.id = parameters.name;
  } else if (!parameters.name) {
    console.log('WARNING: CategorySearchSignature._validateParameters(): missing parameters.name for category search.  Copying from parameters.id.  parameters: ', parameters);
    parameters.name = parameters.id;
  }

  return true;
};

CategorySearchSignature.prototype.toHashParameters = function() {
  var hashParameters = {
    request_type: requestType.SEARCH,
    search_type: searchType.CATEGORY,
    q: this.parameters.id,
    l: this.parameters.name,
    sort: this.parameters.sort
  };

  if (this.parameters.filters) {
    hashParameters.fq = this._constructFilterURL(this.parameters.filters);
  }
  return hashParameters;
};

CategorySearchSignature.prototype.fromHashParameters = function(hashParameters) {
  this.parameters = {
    id: hashParameters.q,
    name: hashParameters.l,
    sort: hashParameters.sort
  };
  if (hashParameters.fq) {
    this.parameters.filters = this._getFilterFromHashParameters(hashParameters.fq);
  }

  return this;
};

CategorySearchSignature.prototype.getName = function() {
  return this.parameters.name;
};


function SearchWithinSignature(parameters) {
  SearchSignature.call(this, parameters);
  this.signatureType = signatureType.WITHIN;
}
SearchWithinSignature.prototype = new SearchSignature();
SearchWithinSignature.prototype.constructor = SearchWithinSignature;

SearchWithinSignature.prototype.setParameters = function(parameters) {
  this._setParametersFromObject(parameters);

  this.parameters.filters = {'category': parameters.ids};
};

SearchWithinSignature.prototype._validateParameters = function(parameters) {
  if (!parameters.query) {
    console.log('WARNING: SearchWithinSignature._validateParameters(): missing parameters.query for search within category.  Proceeding with empty query.  parameters: ', parameters);
    parameters.query = '';
  }
  if ((!parameters.ids || parameters.ids.length == 0) && (!parameters.names || parameters.names.length == 0)) {
    console.log('ERROR: SearchWithinSignature._validateParameters() failed: missing parameters.ids and parameters.names for search within category.  parameters: ', parameters);
    return false;
  } else if (!parameters.ids || parameters.ids.length == 0) {
    console.log('WARNING: SearchWithinSignature._validateParameters(): missing parameters.ids for search within category.  Copying from parameters.names.  parameters: ', parameters);
    parameters.ids = parameters.names;
  } else if (!parameters.names || parameters.names.length == 0) {
    console.log('WARNING: SearchWithinSignature._validateParameters(): missing parameters.names for search within category.  Copying from parameters.ids.  parameters: ', parameters);
    parameters.names = parameters.ids;
  }

  return true;
};

SearchWithinSignature.prototype.toHashParameters = function() {
  var searchTerm = this.parameters.query,
      hashParameters = {
        request_type: requestType.SEARCH,
        search_type: searchType.KEYWORD,
        q: searchTerm,
        l: searchTerm,
        sort: this.parameters.sort
      };

  if (this.parameters.filters) {
    hashParameters.fq = this._constructFilterURL(this.parameters.filters);
  }
  return hashParameters;
};

/**
 * For breadcrumbs and search box, we want to show the query.
 */
SearchWithinSignature.prototype.getName = function() {
  return this.parameters.query || '';
};

/**
 * For the Autosuggest RHS menu, we want to show the facets.
 */
SearchWithinSignature.prototype.getLabel = function() {
  return this.parameters.names.join(' \u00BB ');
};


function MltSignature(parameters) {
  SearchSignature.call(this, parameters);
  this.optionalFields = ['pid', 'title', 'brand'];
  this.signatureType = signatureType.MLT;
}
MltSignature.prototype = new SearchSignature();
MltSignature.prototype.constructor = MltSignature;

MltSignature.prototype.setParameters = function(parameters) {
  this._setParametersFromObject(parameters);
};

MltSignature.prototype._validateParameters = function(parameters) {
  if (!parameters.pid && !parameters.title) {
    console.log('ERROR: MltSignature._validateParameters() failed: missing parameters.pid and parameters.title for More Like This search.  parameters: ', parameters);
    return false;
  }

  return true;
};

MltSignature.prototype.toHashParameters = function() {
  var hashParameters = {
    request_type: requestType.MLT,
    sort: this.parameters.sort
  };

  var i = this.optionalFields.length;
  while (i--) {
    var field = this.optionalFields[i];
    if (this.parameters[field]) {
      hashParameters[field] = this.parameters[field];
    }
  }

  if (this.parameters.filters) {
    hashParameters.fq = this._constructFilterURL(this.parameters.filters);
  }
  return hashParameters;
};

MltSignature.prototype.fromHashParameters = function(hashParameters) {
  this.parameters = {sort: hashParameters.sort};

  var i = this.optionalFields.length;
  while (i--) {
    var field = this.optionalFields[i];
    if (hashParameters[field]) {
      this.parameters[field] = hashParameters[field];
    }
  }

  if (hashParameters.fq) {
    this.parameters.filters = this._getFilterFromHashParameters(hashParameters.fq);
  }

  return this;
};

MltSignature.prototype.getName = function() {
  return this.parameters.title || this.parameters.pid;
};


function JfySignature(parameters) {
  SearchSignature.call(this, parameters);
  this.signatureType = signatureType.JFY;
}
JfySignature.prototype = new SearchSignature();
JfySignature.prototype.constructor = JfySignature;

JfySignature.prototype.setParameters = function(parameters) {
  this._setParametersFromObject(parameters);
};

JfySignature.prototype._validateParameters = function(parameters) {
  if (parameters.query) {
    console.log('WARNING: JfySignature._validateParameters(): does not take parameters.query.  Proceeding with empty query.  parameters: ', parameters);
    parameters.query = '';
  }

  return true;
};

JfySignature.prototype.toHashParameters = function() {
  var hashParameters = {
    request_type: requestType.JFY,
    sort: this.parameters.sort
  };

  if (this.parameters.filters) {
    hashParameters.fq = this._constructFilterURL(this.parameters.filters);
  }
  return hashParameters;
};

JfySignature.prototype.fromHashParameters = function(hashParameters) {
  this.parameters = {sort: hashParameters.sort};
  if (hashParameters.fq) {
    this.parameters.filters = this._getFilterFromHashParameters(hashParameters.fq);
  }

  return this;
};

JfySignature.prototype.getName = function() {
  return JFY_KEYWORD;
};

BR.mobile.KeywordSearchSignature = KeywordSearchSignature;
BR.mobile.TrendingSearchSignature = TrendingSearchSignature;
BR.mobile.CategorySearchSignature = CategorySearchSignature;
BR.mobile.SearchWithinSignature = SearchWithinSignature;
BR.mobile.MltSignature = MltSignature;
BR.mobile.JfySignature = JfySignature;

BR.mobile.createSearchSignature = function(hashParameters) {
  if (hashParameters.request_type === requestType.MLT) {
    return new MltSignature().fromHashParameters(hashParameters);
  } else if (hashParameters.request_type === requestType.JFY) {
    return new JfySignature().fromHashParameters(hashParameters);
  } else if (hashParameters.search_type === searchType.CATEGORY) {
    return new CategorySearchSignature().fromHashParameters(hashParameters);
  } else if (hashParameters.search_type === searchType.TRENDING) {
    return new TrendingSearchSignature().fromHashParameters(hashParameters);
  } else if (hashParameters.search_type === searchType.KEYWORD) {
    return new KeywordSearchSignature().fromHashParameters(hashParameters);
  }
};

BR.mobile.getTrendingUrl = function() {
  return '#brm-search?' + BR.mobile.createURLFromParams((new BR.mobile.TrendingSearchSignature()).toHashParameters());
};

BR.mobile.getJfyUrl = function(optional_content_type) {
  // getJfy function now takes an optional content type argument
  // without the argument, it is backward compatible to show the previous JFY
  // with the new argument, it returns whatever content type are specified in the returned JSON
  thisHashParameters = (new BR.mobile.JfySignature()).toHashParameters();
  if (optional_content_type) {
    thisHashParameters = $.extend(thisHashParameters, {'content_type': optional_content_type});
  }
  return '#brm-search?' + BR.mobile.createURLFromParams(thisHashParameters);
};

BR.mobile.trackSubmit = function(action, searchData) {
  try {
    if (window.BrTrk) {
      var tracker = BrTrk.getTracker(0.2, window.br_data || {});
      tracker.logEvent('suggest', action, searchData, {}, true);
    }
  } catch(err) {
    console.error(err);
  }
};

/* A/B Tests */

var SEARCH_EXPERIMENT = 'search20130416';
var EXPERIMENT_VERSION = "version";

var getABSearchAssignment = function (accountId) {

  var searchAssignment = BR.mobile.configs.getExperimentStatus(SEARCH_EXPERIMENT, accountId);
  var abTestVersion = BR.mobile.configs.getABTestVersion(accountId);

  if (searchAssignment !== BR.mobile.configs.experimentStatus.ACTIVE) {
    $.cookie(cookieType.AB_TESTS, SEARCH_EXPERIMENT + '=' + searchAssignment, {expires: 365 * 100, path: '/'});
    return searchAssignment;
  }

  currentABExperimentVersion = BR.mobile.configs.merchantConfig.abTestVersion.defaultValue;
  var abTestVersionCookieValue = $.cookie(cookieType.AB_TESTS_VERSION);

  if (abTestVersionCookieValue){
    var currentABTestValue = abTestVersionCookieValue.split("=");
    var key = currentABTestValue[0];
    if (key === EXPERIMENT_VERSION){
      currentABExperimentVersion = currentABTestValue[1];
    }
  }

  searchAssignment = '';
  var cookieValue = $.cookie(cookieType.AB_TESTS);

  if ((cookieValue)) {
    var experimentAssignments = cookieValue.split(':');
    for (var i = experimentAssignments.length; i-- && searchAssignment === '';) {
      if (experimentAssignments[i]) {
        var experimentAssignment = experimentAssignments[i].split('=');
        if (experimentAssignment[0] === SEARCH_EXPERIMENT) {
          searchAssignment = experimentAssignment[1];
        }
      }
    }
  }

  if ((searchAssignment != 'C' && searchAssignment != 'T') || (currentABExperimentVersion !== abTestVersion)){
    searchAssignment = Math.random() < BR.mobile.configs.getTestUserRatio(accountId) ? 'T' : 'C';
    $.cookie(cookieType.AB_TESTS, SEARCH_EXPERIMENT + '=' + searchAssignment, {expires: 365 * 100, path: '/'});
    $.cookie(cookieType.AB_TESTS_VERSION, EXPERIMENT_VERSION + '=' + abTestVersion, {expires: 365 * 100, path: '/'});
  }

  return searchAssignment;
};
BR.mobile.getABSearchAssignment = getABSearchAssignment;

}(BR, document));
/**
 * CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF BLOOMREACH, INC.
 *
 * Copyright (C) 2013 BloomReach, Inc. All Rights Reserved.
 *
 * Use of this Source Code is subject to the terms of the applicable license
 * agreement from BloomReach, Inc.
 *
 * The copyright notice(s) in this Source Code does not indicate actual or
 * intended publication of this Source Code.
 */

/**
 * This is the Autosuggest plug-in for BloomMobile.  It requires jQuery to be
 * loaded already.
 * Modified for Zepto (http://zeptojs.com/) by kazu@bloomreach.com on 08/09/2013
 *
 * Author: william@bloomreach.com
 */

;(function(jQuery, BR) {
var $ = BR.$;

var pluginName = 'brm_suggest',
    version = '0.5',
    defaults = {
      delay: 50,
      maxSuggestResults: 10,
      minLength: 1,
      render: true
      //resultContainer: '.brm-autosuggest-menu'
    },
    menuPosition = {
      left: 'left',
      right: 'right'
    };

function Autosuggest(element, options) {
  this.element = element;
  this.options = $.extend({}, defaults, options);
  this.init();
}

Autosuggest.prototype.init = function() {
  var self = this,
      doc = this.element[0].ownerDocument,
      suppressKeyPress;

  this.element.bind('keydown.' + pluginName, function(event) {
    suppressKeyPress = false;
    switch (event.keyCode) {
    case BR.mobile.keyCode.ENTER:
      self.close();
      self.element.blur();
      suppressKeyPress = true;
      event.preventDefault();
      self.handleSearchSubmit(event);
      break;
    case BR.mobile.keyCode.ESCAPE:
      self.close();
      suppressKeyPress = true;
      event.preventDefault();
      break;
    case BR.mobile.keyCode.BACKSPACE:
      if (self.element.val().length == 0) {
        self.close();
        suppressKeyPress = true;
        event.preventDefault();
        break;
      }
    default:
      /* keypress is triggered before the input value is changed */
      clearTimeout(self.searching);
      self.searching = setTimeout(function() {
        self._showClearButton();
        self.active = true;
        /* only search if the value has changed */
        if (self.term != self.element.val()) {
          self.search(null, event);
        }
      }, self.options.delay);
      break;
    }
  })
  .bind('keypress.' + pluginName, function(event) {
    if (suppressKeyPress) {
      suppressKeyPress = false;
      event.preventDefault();
    }
  })
  .focus(function(event) {
    if ($.isFunction(self.options.onFocusCallback)) {
      self.options.onFocusCallback(event);
    } else {
      self._scrollup(event);
    }
    self._showClearButton();
  });

  if (this.options.searchButton) {
    $(this.options.searchButton).unbind('click');
    $(this.options.searchButton).bind('click.' + pluginName, $.proxy(this.handleSearchSubmit, this));
  }
  if (this.options.clearButton) {
    this.$clearButton = $(self.options.clearButton);
    $(this.options.clearButton).bind('click.' + pluginName, $.proxy(this.handleClearButton, this));
  }

  this.suggestCache = {};

  if (this.options.render) {
    this._renderContainer(doc);
  }
};

//Autosuggest.prototype._scrollup = function(event) {
//  // Zepto 1.0, animate scrollTop does not work; https://github.com/madrobby/zepto/issues/392
//  // if we really need it, possible solution: https://github.com/suprMax/ZeptoScroll/blob/master/static/zepto.scroll.j://github.com/suprMax/ZeptoScroll/blob/master/static/zepto.scroll.js
//  var toPos = this.element.offset().top;
//  if ($ === jQuery) {
//    $("html, body").animate({ scrollTop: toPos }, 300);
//  } else {
//    setTimeout(function() {window.scrollTo(0, toPos);}, 200);
//  }
//};

Autosuggest.prototype.search = function(value, event) {
  value = (value != null) ? value : this.element.val();

  /* always save the actual value, not the one passed as an argument */
  this.term = this.element.val();

  if (value.length < this.options.minLength) {
    return this.close(event);
  }

  clearTimeout(this.closing);

  return this._search(value);
};

Autosuggest.prototype._search = function(term) {
  var self = this,
      suggestions = [];

  if (this.suggestCache.hasOwnProperty(term)) { // "term in this.suggestCache" wrongly becomes true for firefox when term = 'watch' since firefox has Object.prototype.watch()
    suggestions = this.suggestCache[term];
    this._response(suggestions);
  } else {
    var rid = BR.mobile.generateRid();
    var dataSource = BR.mobile.getDataSource(this.options.environment, 'suggest');
    $.ajax({
      url: dataSource,
      data: $.extend(BR.mobile.createCommonApiParams(this.options, rid),
              { 'q': term, 'request_type': 'suggest' }
            ),
      dataType: BR.mobile.getDataType(this.options.environment),
      success: function(resp) {
        var suggestions = self._extractSuggestions(resp, rid);
        suggestions.rid = rid;
        self._response(suggestions);

        if (!(self.suggestCache.hasOwnProperty(term))) {
          self.suggestCache[term] = suggestions;
        }
      }
    });
  }
};

Autosuggest.prototype._extractSuggestions = function(resp, rid) {
  var result = {
    suggestions: [],
    narrowedWithin: []
  };
  var serverSuggestions = [];
  var aq = '';
  if (resp.spellcheck.suggestions.length > 1) {
    result.serverQuery = resp.spellcheck.suggestions[0];
    serverSuggestions = resp.spellcheck.suggestions[1]['suggestion'];
    aq = resp.spellcheck.suggestions[0];
  }

  /* De-duplicate queries on the left */
  var seenValues = {};

  /* extract content from suggestions */
  for (var i = 0; i < serverSuggestions.length && result.suggestions.length < this.options.maxSuggestResults; ++i) {
    serverSuggestions[i] = serverSuggestions[i].replace(/&apos;/g,"'");
    var items = serverSuggestions[i].split(':::');
    var displayQuery = '';
    var scoringQuery = '';

    displayQuery = items.shift().replace('dq=', '');
    if (items.length > 0 && items[0].indexOf('sq=') == 0) {
      scoringQuery = items.shift().replace('sq=', '');
    }

    /* remove spaces */
    displayQuery = $.trim(displayQuery);
    scoringQuery = $.trim(scoringQuery);

    if (!seenValues[displayQuery]) {
      seenValues[displayQuery] = true;

      var suggestion = {};
      var suggest_data = {
        'src': 'suggest',
        'aq': aq,
        'dq': displayQuery,
        'apos': i,
        'rid': rid
      };
      //$.extend(suggest_data, resp.pixel_data);

      if (scoringQuery) {
        suggestion = new BR.mobile.CategorySearchSignature({
          'name': displayQuery,
          'id': scoringQuery,
          'suggest_data': suggest_data
        });
      } else {
        suggestion = new BR.mobile.KeywordSearchSignature({
          'query': displayQuery,
          'suggest_data': suggest_data
        });
      }

      result.suggestions.push(suggestion);

      /* extract categories for just the first result */
      if (result.suggestions.length == 1 && items.length > 0 && items[0].indexOf('facets=') == 0) {
        result.narrowedWithin = this._extractCategoriesFromFacets(items.shift().replace('facets=', '').split(':'), displayQuery, resp, rid);
      }
    }
  }

  return result;
};

Autosuggest.prototype._extractCategoriesFromFacets = function(facets, query, resp, rid) {
  var leaf_categs = [];
  var catids = {};
  var breadcrumbLevel = BR.mobile.configs.getRhsParentLevel(this.options.accountId);
  var fixedLeafLevel = BR.mobile.configs.getRhsLeafLevel(this.options.accountId);
  var seenFilterNames = {};
  for (var i = 0; i < facets.length && leaf_categs.length < this.options.maxSuggestResults; i++) {
    var cat = facets[i];
    var l = cat.split('/');
    /* If empty string at the beginning then remove it. */
    /* Since each facet begins with a '/', it will occur often if not always */
    if (l[0] == '') {
      l.shift();
    }

    var ids = [];
    var names = [];

    for(var j = 0; j < l.length; j++) {
      comma_index = l[j].indexOf(',');
      ids[j] = l[j].substr(0,comma_index);
      names[j] = l[j].substr(comma_index+1);
    }

    /* take the first part and the last part. */
    var leafLevel = fixedLeafLevel === -1 ? ids.length - 1 : fixedLeafLevel;
    category_id = ids[leafLevel];
    if (!catids[category_id]) {
      catids[category_id] = true;
      var filterNames = [],
          filterIds = [];
      if (names.length > breadcrumbLevel + 1) {
        filterNames.push(names[breadcrumbLevel]);
        filterIds.push(ids[breadcrumbLevel]);
      }
      if (filterIds[0] !== category_id) {
        filterNames.push(names[leafLevel]);
        filterIds.push(category_id);
      }

      var aq = '';
      if (resp.spellcheck.suggestions.length > 0) {
        aq = resp.spellcheck.suggestions[0];
      }

      var suggest_data = {
        src: 'suggest',
        aq: aq,
        sr: category_id,
        rpos: i,
        dr: filterNames.join(' \u00BB '),
        rid: rid
      };
      //$.extend(suggest_data, resp.pixel_data);
  
      var val = filterNames.join('');
      if (!(val in seenFilterNames)){
        seenFilterNames[val] = true; 
        leaf_categs.push(new BR.mobile.SearchWithinSignature({
          'query': query,
          'names': filterNames,
          'ids': filterIds,
          'suggest_data': suggest_data
        }));
      }
    }
  }

  return leaf_categs;
};

Autosuggest.prototype._response = function(content) {
  if ($.isFunction(this.options.responseCallback)) {
    this.options.responseCallback(content);
  }
  if (this.active && content && content.suggestions && content.suggestions.length) {
    this._suggest(content);
  } else {
    this.close();
  }
};

Autosuggest.prototype._suggest = function(items) {
  var isRhsDisabled = BR.mobile.configs.getRhsDisabled(this.options.accountId);

  if (this.options.render) {
    var leftMenu = this.leftMenu.html('');
    this._renderMenu(leftMenu, items.suggestions, items.rid);

    if (!isRhsDisabled) {
      var rightMenu = this.rightMenu.html('');
      this._renderMenu(rightMenu, items.narrowedWithin, items.rid);
      leftMenu.children().first().append($('<div class="brm-autosuggest-nub"></div>'));
      //rightMenu.children().first().children().first().prepend('in ');
    }

    this.resultContainer.show();
  }
};

Autosuggest.prototype._renderContainer = function(doc) {
  var container = $(this.options.resultContainer, doc).first();
  if (!container.length) {
    container = $('<div></div>')
        .addClass(defaults.resultContainer.substring(1))
        .appendTo(doc.body);
  }
  this.resultContainer = container.hide();
  this.leftMenu = $("<ul class='suggestion_keyword'></ul>")
      .appendTo(container);

  var isRhsDisabled = BR.mobile.configs.getRhsDisabled(this.options.accountId);

  if (!isRhsDisabled) {
    this.rightMenu = $('<ul></ul>')
        .addClass('category-suggest')
        .appendTo(container);
  }
};

Autosuggest.prototype._renderMenu = function(ul, items, rid) {
  var self = this;
  $.each(items, function(index, item) {
    if(ul.hasClass('category-suggest'))
    {
        self._renderItem_right(ul, item, rid, index);
    }
    else
    {
        self._renderItem(ul, item, rid, index);
    }
  });
};

Autosuggest.prototype._renderItem = function(ul, item, rid, idx) {
    var typedText = item.parameters.suggest_data.aq;
    var suggestLabel = item.getLabel().replace(typedText, '<span class="keywords">' + typedText + '</span>');

  var linkElement = $('<a>')
          .attr('href', '/Search/SearchResult.aspx#brm-search?' + BR.mobile.createURLFromParams(item.toHashParameters()))
          .bind('click', $.proxy(function(event) {
                                this.handleClickSuggestion(item);
                                event.preventDefault();
                            }, this)).append(suggestLabel).append('</a>');;
  linkElement.data(pluginName + '.item', item)
             .data(pluginName + '.rid', rid)
             .data(pluginName + '.idx', idx);
  return $('<li></li>')
         .append(linkElement)
         .appendTo(ul);
};

Autosuggest.prototype._renderItem_right = function(ul, item, rid, idx) {
  var linkElement = $('<a>')
          .attr('href', '/Search/SearchResult.aspx#brm-search?' + BR.mobile.createURLFromParams(item.toHashParameters()))
          .bind('click', $.proxy(function(event) {
                                this.handleClickSuggestion(item);
                                event.preventDefault();
                            }, this)).append(item.parameters.query + ' in ' + '<span class="department">' + item.getLabel() + '</span>').append('</a>');
  linkElement.data(pluginName + '.item', item)
             .data(pluginName + '.rid', rid)
             .data(pluginName + '.idx', idx);
  return $('<li></li>')
         .append(linkElement)
         .appendTo(ul);
};

Autosuggest.prototype._showClearButton = function() {
  setTimeout($.proxy(function() {
    if (this.$clearButton) {
      if (this.element.val().length === 0) {
        this.$clearButton.hide();
      } else {
        this.$clearButton.show();
      }
    }
  }, this), 100); // delaying this since there might be original events to fire first
};

Autosuggest.prototype.close = function(event) {
  clearTimeout(this.closing);
  if (this.options.render) {
    this.resultContainer.hide();
  }

  this.active = false;
};

Autosuggest.prototype.handleClickSuggestion = function(searchData, url) {
  BR.mobile.trackSubmit('click', $.extend({},  searchData.toHashParameters(), searchData.parameters.suggest_data));

  this.close();

  if ($.isFunction(this.options.searchCallback)) {
    $.extend(searchData, {'abSearch': BR.mobile.getABSearchAssignment(this.options.accountId)});

    if (!url) {
      url = '/Search/SearchResult.aspx#brm-search?' + BR.mobile.createURLFromParams(searchData.toHashParameters());
    }
    this.options.searchCallback(url, searchData); // event.target.href is a full url, which we do not want. We only need a hash part
  }
  return false;
};

Autosuggest.prototype.handleSearchSubmit = function(event) {
  var searchData = new BR.mobile.KeywordSearchSignature({ 'query': this.element.val() }),
      hashParameters = searchData.toHashParameters();
  BR.mobile.trackSubmit('submit', hashParameters);

  this.close();

  if ($.isFunction(this.options.searchCallback)) {
    $.extend(searchData, {'abSearch': BR.mobile.getABSearchAssignment(this.options.accountId)});
    this.options.searchCallback('/Search/SearchResult.aspx#brm-search?' + BR.mobile.createURLFromParams(hashParameters), searchData);
  }
  event.preventDefault();
  return false;
};

Autosuggest.prototype.handleClearButton = function(event) {
  $(event.target).hide();
  this.element.val('').focus();
  this.close();
  event.preventDefault();
  return false;
};

$.fn[pluginName] = function(options, functionArguments) {
  if (arguments.length > 2) {
    options = arguments[0];
    functionArguments = [].splice.call(arguments, 1);
  }
  if (this.length) {
    var element = this.first();
    if (typeof options === 'object' || typeof options === 'undefined') {
      if (!element.data('plugin_' + pluginName)) {
        element.data('plugin_' + pluginName, new Autosuggest(element, options));
      }
    } else if (typeof options === 'string') {
      if (!$.isArray(functionArguments)) {
        functionArguments = [functionArguments];
      }
      var myPlugin = element.data('plugin_' + pluginName);
      if (myPlugin) {
        switch (options) {
        case 'executeSearch':
          myPlugin.handleClickSuggestion.apply(myPlugin, functionArguments);
          break;
        }
      } else {
        var functionName = [pluginName, '(\'', options, '\')'].join('');
        console.error([
                        'ERROR: Cannot call function ', functionName, ' without initializing ', pluginName, ' first.  ',
                        functionName, ' called on: '
                      ].join(''), element);
      }
    }
  }

  return this;
};

}(window.jQuery, BR));
/**
 * CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF BLOOMREACH, INC.
 *
 * Copyright (C) 2013 BloomReach, Inc. All Rights Reserved.
 *
 * Use of this Source Code is subject to the terms of the applicable license
 * agreement from BloomReach, Inc.
 *
 * The copyright notice(s) in this Source Code does not indicate actual or
 * intended publication of this Source Code.
 */

/**
 * This is the Search plug-in for BloomMobile.  It requires jQuery to be loaded
 * already.
 * Modified for Zepto (http://zeptojs.com/) by kazu@bloomreach.com on 08/09/2013
 *
 * Author: william@bloomreach.com
 */

;(function(jQuery, BR) {
var $ = BR.$;

var pluginName = 'brm_search',
    version = '0.3',
    defaults = {
      numResults: 10
    },
    defaultSort = 'relevance';

function Search(element, options) {
  if (!(this instanceof Search)) { // enforcing new
    return new Search(element, options);
  }
  this.element = element;
  this.options = $.extend({}, defaults, options);
  this.init();
}

/**
 * Declare known properties.
 */
Search.prototype.init = function() {
  this.currentSearchSignature = null;
  this.nextStartIndex = 0;
};

/*
 * Hash parameters from a search signature contain data for the search API as
 * well as data for the presentation layer.  Here we extract only the
 * parameters for the search API and provide some defaults.
 */
Search.prototype._buildSearchParameters = function(hashParameters) {
  var searchParameters = $.extend({
    request_type: BR.mobile.requestType.SEARCH,
    rows: this.options.numResults,
    start: 0,
    fl: this.options.fieldNames.join(',')
  }, hashParameters);
  return searchParameters;
};

/*
 * Public search() function performs a search based on the hash parameters provided in the argument or, if not
 * provided, based on the parameters in the URL hash.
 */
Search.prototype.search = function(hashParameters) {
  this._search(hashParameters || BR.mobile.getHashUrlParams(location.hash), this.options.renderFunction);
};

Search.prototype.getNextPage = function(callback) {
  if (!this.currentSearchSignature) {
    console.log('ERROR: brm_search.getNextPage(): Cannot get the next page without performing a search first.  currentSearchSignature: ', this.currentSearchSignature);
    return;
  }

  var hashParameters = this.currentSearchSignature.toHashParameters();
  hashParameters.start = this.nextStartIndex;
  this._search(hashParameters, callback);
};

Search.prototype.setOptions = function(options) {
  this.options = $.extend({}, this.options, options);
};

/*
 * Private _search() function performs a search based on the given search
 * parameters.
 */
Search.prototype._search = function(hashParameters, callback) {
  var dataSource = BR.mobile.getDataSource(this.options.environment, 'core');
  var searchParameters = this._buildSearchParameters(hashParameters);
  this.currentSearchSignature = BR.mobile.createSearchSignature(searchParameters);
  var rid = BR.mobile.generateRid();

  var self = this;
  var signatureType = this.currentSearchSignature.signatureType;
  var isJfy      = signatureType === BR.mobile.signatureType.JFY;
  var isTrending = signatureType === BR.mobile.signatureType.TRENDING;
  var isMlt      = signatureType === BR.mobile.signatureType.MLT;
  $.ajax({
    url: dataSource,
    data: $.extend(BR.mobile.createCommonApiParams(self.options, rid), searchParameters),
    traditional: true,
    dataType: BR.mobile.getDataType(this.options.environment),
    success: function(resp) {
      var response = resp.response;
//      var redirectedUrl = "redirected url";
//      if (BR.mobile.configs.getRedirect(self.options.accountId) == 1) {
//        if (resp.keywordRedirect && resp.keywordRedirect[redirectedUrl]) {
//          redirectedUrl = "http://" + resp.keywordRedirect[redirectedUrl];
//          window.location.href = redirectedUrl;
//          return;
//        }
//      }

    var redirectedUrl = "redirected url";
    if (resp.keywordRedirect && resp.keywordRedirect[redirectedUrl]) {
        if(resp.keywordRedirect[redirectedUrl].indexOf('/') === 0){ // Relative URL
            redirectedUrl = resp.keywordRedirect[redirectedUrl];
        } else { // Absolute URL
            redirectedUrl = "http://" + resp.keywordRedirect[redirectedUrl];
        }
        window.location.href = redirectedUrl;
        return;
    }


      if (!response) {
        if ($.isFunction(self.options.errorCallback)) {
          self.options.errorCallback('Error: ' + resp.message); // E.g. JFY returns errors with 200
        }
        return;
      }
      if (!response.start) {
        response.start = 0;
      }
      if (!response.docs) {
        response.docs = [];
      }
      if (!response.numFound) {
        response.numFound =  response.start + response.docs.length;
      }
	  
      var results = {
        availableFilters: (!isMlt && !isTrending && !isJfy) ? self._extractFilters(resp) : [],
        currentFilters: self._generateCurrentFilters(self.currentSearchSignature.parameters.filters, resp.category_map),
        availableSorts: self._generateSortFields(resp.sort_fields),
        currentSort: self.currentSearchSignature.parameters.sort || defaultSort,
        products: self._addRid(self._addMltUrlsToProducts(response.docs), rid),
		did_you_mean: resp.did_you_mean,  // add "Did you mean"
        breadcrumbs: [{name: self.currentSearchSignature.getName()}],  // TODO: revise to include full breadcrumbs once API returns them
        brTrkData: $.extend({ // get rid of undefined by using $.extend
          rid: rid
        }, {
          search_type: searchParameters.search_type,
          request_type: searchParameters.request_type,
          pid: searchParameters.pid
        }),
        resultType: searchParameters.request_type, // TODO: Currently resultType is the same as requestType, but change them
        loadMore: response.start + response.docs.length < response.numFound,
        numResults: response.numFound,
        startIndex: response.start
      };

      if (resp.match && resp.match.docs && resp.match.docs.length) {
        results.mltProduct = resp.match.docs[0];
      }

      self.nextStartIndex = searchParameters.start + searchParameters.rows;

      if (isJfy) {
        results.title = response.title;
        results.items = results.products;
        results.dynamicCats = resp.dynamic_cats_response;
        results.isDynamicCats = !!(resp.dynamic_cats_response && resp.dynamic_cats_response.docs && resp.dynamic_cats_response.docs.length);
        results.recommendations = resp.recommendation_response;
        results.isRecommendations = !!(resp.recommendation_response && resp.recommendation_response.docs && resp.recommendation_response.docs.length);
      }
      if ($.isFunction(callback)) {
        callback(results);
      }
    },
    error: function(xhr, errorType, error) {
      if ($.isFunction(self.options.errorCallback)) {
        self.options.errorCallback(errorType + ' ' + error);
      }
    }
  });
};

Search.prototype._extractFilters = function(resp) {
  var rawData = resp.facet_counts.facet_fields || {},
      filters = [],
      categoryBlacklist = this.options.categoryBlacklist || [];

  if (rawData.category && rawData.category.length) {
    var categoryDimension = {
      name: 'category',
      options: []
    };

    for (var i = 0; i < rawData.category.length; i++) {
      var currentCategory = rawData.category[i],
          skipCategory = false;

      for (var j = 0; j < categoryBlacklist.length && !skipCategory; j++) {
        if (currentCategory.crumb.indexOf(categoryBlacklist[j]) > -1) {
          skipCategory = true;
        }
      }

      if (!skipCategory) {
        categoryDimension.options.push({
          value: currentCategory.cat_id,
          label: currentCategory.cat_name,
          url: '#brm-search?' + BR.mobile.createURLFromParams($.extend(true, {}, this.currentSearchSignature).addFilter(currentCategory.cat_id, 'category').toHashParameters()),
          level: currentCategory.crumb.replace(/^\/|\/$/g,'').split('/').length, // the top level category is level 1
          count: currentCategory.count,
            parent: currentCategory.parent
        });
      }
    }

    filters.push(categoryDimension);
  }

  for (var key in rawData) {
    if (key !== 'category' && rawData[key].length) {
      var dimension = {
        name: key,
        options: []
      };

      for (var i = 0; i < rawData[key].length; i++) {
        var currentOption = rawData[key][i];
        dimension.options.push({
          value: currentOption.name,
          label: currentOption.name,
          url: '#brm-search?' + BR.mobile.createURLFromParams($.extend(true, {}, this.currentSearchSignature).addFilter(currentOption.name, key).toHashParameters()),
          count: currentOption.count
        });
      }

      filters.push(dimension);
    }
  }

  rawData = resp.facet_counts.facet_queries || {};
  var dimensions = {};
  for (var key in rawData) {
    var count = rawData[key];
    if (rawData.hasOwnProperty(key) && count) {
      var dimensionKey = key.replace(/.*\}(\w+):.*/, '$1');
      var label = key.replace(/\{![^=]+=(\w+)\}.*/, '$1'); // XXXX currently, label is not available in API, it is always the same as dimensionKey
      var value = key.replace(/.*:(\[.+\]).*/, '$1');
      var dimension;
      if (dimensions.hasOwnProperty(dimensionKey)) {
        dimension = dimensions[dimensionKey];
      } else {
        dimensions[dimensionKey] = dimension = {
          name: dimensionKey,
          options: []
        };
      }
      dimension.options.push({
        value: value,
        label: label,
        url: '#brm-search?' + BR.mobile.createURLFromParams($.extend(true, {}, this.currentSearchSignature).addFilter(value, dimensionKey).toHashParameters()),
        count: count
      });
    }
  }
  for (key in dimensions) {
    if (dimensions.hasOwnProperty(key)) {
      filters.push(dimensions[key]);
    }
  }

  return filters;
};

Search.prototype._generateCurrentFilters = function(filters, categoryMap) {
  var currentFiltersDisplay = {};

  if (filters) {
    for (var key in filters) {
      if (filters.hasOwnProperty(key)) { // hasOwnProperty seems working on ie8
        var filter = filters[key];
        var dimensions = {};
        for (var i = filter.length; i--;) {
          var chosen = filter[i];
          dimensions[chosen] = {
            label: (key === 'category' && categoryMap[chosen]) || chosen,
            cat_id: (key === "category" && chosen) || '', // 
            removalUrl: '#brm-search?' + BR.mobile.createURLFromParams($.extend(true, {}, this.currentSearchSignature).removeFilter(key, chosen).toHashParameters())
          };
        }
        var lastFilter = filter[filter.length - 1];
        currentFiltersDisplay[key] = {
          value: (key === 'category' && categoryMap[lastFilter]) || lastFilter,
          removalUrl: '#brm-search?' + BR.mobile.createURLFromParams($.extend(true, {}, this.currentSearchSignature).removeFilter(key).toHashParameters()),
          dimensions: dimensions
        };
      }
    }
  }

  return currentFiltersDisplay;
};

Search.prototype._generateSortFields = function(sortFields) {
  if (sortFields) {
    var sortSignature = $.extend(true, {}, this.currentSearchSignature);
    for (var i = sortFields.length; i--;) {
      var sortValue = sortFields[i];
      sortSignature.parameters.sort = sortValue;
      sortFields[i] = {
        'url': '#brm-search?' + BR.mobile.createURLFromParams(sortSignature.toHashParameters()),
        'value': sortValue
      };
    }
    delete sortSignature.parameters.sort;
    sortFields.push({
      'url': '#brm-search?' + BR.mobile.createURLFromParams(sortSignature.toHashParameters()),
      'value': defaultSort
    });
    return sortFields;
  }
  return [];
};

Search.prototype._addMltUrlsToProducts = function(products) {
  var i = products.length;
  while (i--) {
    products[i].mltUrl = '#brm-search?' + BR.mobile.createURLFromParams((new BR.mobile.MltSignature({
      pid: products[i].pid,
      title: products[i].title,
      brand: products[i].brand // brand is an optional parameter, so it's okay if it's set to undefined
    })).toHashParameters());
  }

  return products;
};

Search.prototype._addRid = function(products, rid) {
  for (var i = products.length; i--;) {
    products[i].rid = rid;
  }

  return products;
};


$.fn[pluginName] = function(options, functionArguments) {
  if (this.length) {
    var element = this.first();
    if (typeof options === 'object' || typeof options === 'undefined') {
      if (!element.data('plugin_' + pluginName)) {
        element.data('plugin_' + pluginName, new Search(element, options));
      }
    } else if (typeof options === 'string') {
      if (!$.isArray(functionArguments)) {
        functionArguments = [functionArguments];
      }
      var myPlugin = element.data('plugin_' + pluginName);
      if (myPlugin) {
        switch (options) {
        case 'search':
          myPlugin.search.apply(myPlugin, functionArguments);
          break;
        case 'getNextPage':
          myPlugin.getNextPage.apply(myPlugin, functionArguments);
          break;
        case 'setOptions':
          myPlugin.setOptions.apply(myPlugin, functionArguments);
          break;
        case 'getOptions':
          return myPlugin.options;
          break;
        }
      } else {
        var functionName = [pluginName, '(\'', options, '\')'].join('');
        console.error([
                        'ERROR: Cannot call function ', functionName, ' without initializing ', pluginName, ' first.  ',
                        functionName, ' called on: '
                      ].join(''), element);
      }
    }
  }

  return this;
};

}(window.jQuery, BR));
/**
 * CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF BLOOMREACH, INC.
 *
 * Copyright (C) 2013 BloomReach, Inc. All Rights Reserved.
 *
 * Use of this Source Code is subject to the terms of the applicable license
 * agreement from BloomReach, Inc.
 *
 * The copyright notice(s) in this Source Code does not indicate actual or
 * intended publication of this Source Code.
 */

/**
 * This is the More Like This product page widget for BloomMobile.  It requires
 * the Search plug-in to already be loaded.
 * Modified for Zepto (http://zeptojs.com/) by kazu@bloomreach.com on 08/09/2013
 *
 * Author: william@bloomreach.com
 */

;(function(jQuery, BR) {
var $ = BR.$;

var pluginName = 'brm_mlt',
    version = '0.1',
    defaults = {
      numResults: 2
    };

function MoreLikeThisWidget(element, options) {
  if (!(this instanceof MoreLikeThisWidget)) { // enforcing new
    return new MoreLikeThisWidget(element, options);
  }
  this.element = element;
  this.options = $.extend({}, defaults, options);
  this.init();
}

MoreLikeThisWidget.prototype.init = function() {

  //make a shallow copy so that subsequent changes don't affect the real searchConfig
  this.options.searchConfig = $.extend({}, this.options.searchConfig);

  this.options.searchConfig.numResults = this.options.numResults;
  this.options.searchConfig.renderFunction = $.proxy(this._searchCallback, this);

  this.element.brm_search(this.options.searchConfig);

  if (this.options.product) {
    this.getMlt(this.options.product);
  }
};

MoreLikeThisWidget.prototype.getMlt = function(product) {
  var hashParameters = (new BR.mobile.MltSignature({
    pid: product.pid,
    title: product.title,
    brand: product.brand
  })).toHashParameters();

  this.element.brm_search('search', [hashParameters]);
};

MoreLikeThisWidget.prototype._searchCallback = function(results) {
  // should not be necessary as long as API server respects numResults (rows) parameter
  // however, static JSON file for standalone demo does not, so we always limit the number of products to what we
  // originally requested
  results.products.length = Math.min(results.products.length, this.options.numResults);

  if (results.mltProduct) {
    results.viewMore = '#brm-search?' + BR.mobile.createURLFromParams((new BR.mobile.MltSignature({
      pid: results.mltProduct.pid || '',
      title: results.mltProduct.title || '',
      brand: results.mltProduct.brand || ''
    })).toHashParameters());;
  }

  if ($.isFunction(this.options.responseCallback)) {
    this.options.responseCallback(results);
  }
  if ($.isFunction(this.options.renderFunction)) {
    this.options.renderFunction(results);
  }
};


$.fn[pluginName] = function(options, functionArguments) {
  if (this.length) {
    var element = this.first();
    if (typeof options === 'object' || typeof options === 'undefined') {
      if (!element.data('plugin_' + pluginName)) {
        element.data('plugin_' + pluginName, new MoreLikeThisWidget(element, options));
      }
    } else if (typeof options === 'string') {
      if (!$.isArray(functionArguments)) {
        functionArguments = [functionArguments];
      }
      var myPlugin = element.data('plugin_' + pluginName);
      if (myPlugin) {
        switch (options) {
        case 'getMlt':
          myPlugin.getMlt.apply(myPlugin, functionArguments);
          break;
        }
      } else {
        var functionName = [pluginName, '(\'', options, '\')'].join('');
        console.error([
                        'ERROR: Cannot call function ', functionName, ' without initializing ', pluginName, ' first.  ',
                        functionName, ' called on: '
                      ].join(''), element);
      }
    }
  }

  return this;
};

}(window.jQuery, BR));
/**
 * CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF BLOOMREACH, INC.
 *
 * Copyright (C) 2013 BloomReach, Inc. All Rights Reserved.
 *
 * Use of this Source Code is subject to the terms of the applicable license
 * agreement from BloomReach, Inc.
 *
 * The copyright notice(s) in this Source Code does not indicate actual or
 * intended publication of this Source Code.
 */

/**
 * This is the Favorites module for BloomMobile.
 *
 * Author: william@bloomreach.com
 */

;(function(BR) {
var $ = BR.$;

BR.pers = BR.pers || {};

var defaults = {
      numResults: 10
    },
    REQUIRED_OPTIONS = ['accountId', 'domainKey', 'environment'],
    REQUIRED_ITEM_FIELDS = ['pid', 'title', 'thumb_image', 'url', 'price'],
    PP_COOKIE = '_br_copp';

BR.pers.getCurrentFavoriteList = function(options, callback) {
  if (!BR.mobile.validateFields(options, REQUIRED_OPTIONS, 'options')) {
    return false;
  }

  var favoritesList = new FavoritesList(options);
  favoritesList.getList(callback);
};

// TODO: also define BR.pers.getAllFavoriteLists(options, callback) and BR.pers.getFavoriteList(options, callback, listId)
// for merchants with multiple lists

BR.pers.addFavorite = function(options, callback, item, listId) {
  if (!BR.mobile.validateFields(options, REQUIRED_OPTIONS, 'options')) {
    return false;
  }

  // TODO: initialize with listId if provided
  var favoritesList = new FavoritesList(options);
  favoritesList.addItem(item, callback);
};

function FavoritesList(options) {
  this.options = $.extend({}, defaults, options);
  this.listId = '';   // TODO: initialize with listId if provided
  this.items = [];
}

/**
 * If user already has a list, the server returns it.
 * Otherwise, the server creates a default list and returns it.
 * Initialize this FavoritesList with the returned data.
 */
FavoritesList.prototype.getList = function(callback) {
  // TODO: replace "current" with listId if provided
  var dataSource = BR.mobile.getDataSource(this.options.environment, 'core') + 'favs/current/read',
      rid = BR.mobile.generateRid(),
      favoritesParameters = this._buildFavoritesParameters();

  var self = this;
  $.ajax({
    url: dataSource,
    data: $.extend(BR.mobile.createCommonApiParams(self.options, rid), favoritesParameters),
    traditional: true,
    dataType: 'json',
    success: function(response) {
      self._response = response;
      self._updateFromServer(response.response);

      if ($.isFunction(callback)) {
        callback(self, true);
      }
    },
    error: function(xhr, errorType, error) {
      if ($.isFunction(callback)) {
        callback(self, false, errorType + ' ' + error);
      }
    }
  });
};

FavoritesList.prototype._buildFavoritesParameters = function() {
  var parameters = {
    request_type: BR.mobile.requestType.FAVORITES,
    copp: $.cookie(PP_COOKIE) || ''
  };

  // TODO: extend with optional listId

  return parameters;
};

FavoritesList.prototype._updateFromServer = function(response) {
  this.listId = response.favid;
  this.items = response.items;
  if (response.copp) {
    $.cookie(PP_COOKIE, response.copp, {expires: 365 * 100, path: '/'});
  }
};

/**
 * If user already has a list, add the product to it.
 * Otherwise, the server creates a default list and adds the product to it.
 * Initialize this FavoritesList with the returned data.
 */
FavoritesList.prototype.addItem = function(item, callback) {
  if (!BR.mobile.validateFields(item, REQUIRED_ITEM_FIELDS, 'item data', true)) {
    return false;
  }

  var dataSource = BR.mobile.getDataSource(this.options.environment, 'core') + 'favs/current/add',
      rid = BR.mobile.generateRid(),
      favoritesParameters = this._buildFavoritesParameters();

  var self = this;
  $.ajax({
    url: dataSource,
    type: 'POST',
    data: $.extend(BR.mobile.createCommonApiParams(self.options, rid), favoritesParameters, {'item': JSON.stringify(item)}),
    traditional: true,
    dataType: 'json',
    success: function(response) {
      self._response = response;
      self._updateFromServer(response.response);

      if ($.isFunction(callback)) {
        callback(self, response.status === 'success', response.message);
      }
    },
    error: function(xhr, errorType, error) {
      if ($.isFunction(callback)) {
        callback(self, false, errorType + ' ' + error);
      }
    }
  });
};

FavoritesList.prototype.containsItem = function(pid) {
  for (var i = this.items.length; i--;) {
    // pid may be a string or a number.
    // The flexibility afforded by type coercion is useful here.
    if (this.items[i].pid == pid) {
      return true;
    }
  }

  return false;
};

FavoritesList.prototype.removeItem = function(pid, callback) {
  if (!this.containsItem(pid)) {
    return false;
  }

  var dataSource = BR.mobile.getDataSource(this.options.environment, 'core') + 'favs/current/remove',
      rid = BR.mobile.generateRid(),
      favoritesParameters = this._buildFavoritesParameters();

  var self = this;
  $.ajax({
    url: dataSource,
    type: 'POST',
    data: $.extend(BR.mobile.createCommonApiParams(self.options, rid), favoritesParameters, {'pid': pid}),
    traditional: true,
    dataType: 'json',
    success: function(response) {
      self._response = response;
      self._updateFromServer(response.response);

      if ($.isFunction(callback)) {
        callback(self, response.status === 'success', response.message);
      }
    },
    error: function(xhr, errorType, error) {
      if ($.isFunction(callback)) {
        callback(self, false, errorType + ' ' + error);
      }
    }
  });
};

}(BR));
/**
 * CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF BLOOMREACH, INC.
 *
 * Copyright (C) 2013 BloomReach, Inc. All Rights Reserved.
 *
 * Use of this Source Code is subject to the terms of the applicable license
 * agreement from BloomReach, Inc.
 *
 * The copyright notice(s) in this Source Code does not indicate actual or
 * intended publication of this Source Code.
 */

/**
 * This is the Just For You module for BloomMobile.
 *
 * Author: william@bloomreach.com
 */

;(function(BR) {
var $ = BR.$;

BR.pers = BR.pers || {};

var defaults = {
      numResults: 10
    },
    REQUIRED_OPTIONS = ['accountId', 'domainKey', 'environment'];

BR.pers.getJustForYou = function(options, callback) {
  if (!BR.mobile.validateFields(options, REQUIRED_OPTIONS, 'options')) {
    return false;
  }

  var dataSource = BR.mobile.getDataSource(options.environment, 'core'),
      rid = BR.mobile.generateRid(),
      jfyParameters = buildJfyParameters();

  $.ajax({ // TODO merge this ajax call to Search.prototype._search
    url: dataSource,
    data: $.extend(BR.mobile.createCommonApiParams(options, rid), jfyParameters),
    traditional: true,
    dataType: BR.mobile.getDataType(options.environment),
    success: function(response) {
      if ($.isFunction(callback)) {
        if (response.response && response.response.docs && response.response.docs.length) {
          var results = {
            title: response.response.title,
            products: response.response.docs,
            brTrkData: {'rid': rid},
            resultType: jfyParameters.request_type
          };
  
          callback(results, true);
        } else {
          callback({}, false, 'Error: unable to retrieve Just for You');
        }
      }
    },
    error: function(xhr, errorType, error) {
      if ($.isFunction(callback)) {
        callback({}, false, errorType + ' ' + error);
      }
    }
  });
};

function buildJfyParameters() {
  var parameters = {
    request_type: BR.mobile.requestType.JFY,
  };

  return parameters;
}

}(BR));
/**
 * CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF BLOOMREACH, INC.
 *
 * Copyright (C) 2013 BloomReach, Inc. All Rights Reserved.
 *
 * Use of this Source Code is subject to the terms of the applicable license
 * agreement from BloomReach, Inc.
 *
 * The copyright notice(s) in this Source Code does not indicate actual or
 * intended publication of this Source Code.
 */

/**
 * This is a step to bring back the reserved global variables for BloomMobile. This has to be used with brm-pre-namespace-wrapper.js
 *
 * Author: kazu@bloomreach.com
 */

;
(function(window, BR) {
  var savedGlobalNamespace = BR.savedGlobalNamespace || {};
  for (var namespace in savedGlobalNamespace) {
    if (savedGlobalNamespace.hasOwnProperty(namespace)) {
      window[namespace] = savedGlobalNamespace[namespace];
    }
  }
  // The following is for clearing up the unused reference
  // This can be done alternatively by:
  // delete BR.savedGlobalNamespace;
  // However, assigning undifined is a bit faster than deleting it.
  BR.savedGlobalNamespace = undefined;
})(window, BR);

