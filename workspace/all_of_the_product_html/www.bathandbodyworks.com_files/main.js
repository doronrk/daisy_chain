(function () {/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<9
	// For `typeof node.method` instead of `node.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.9.1",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support, all, a,
		input, select, fragment,
		opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
		checkOn: !!input.value,

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: document.compatMode === "CSS1Compat",

		// Will be defined later
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})();

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, ret,
		internalKey = jQuery.expando,
		getByName = typeof name === "string",

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		cache[ id ] = {};

		// Avoids exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		if ( !isNode ) {
			cache[ id ].toJSON = jQuery.noop;
		}
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( getByName ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var i, l, thisCache,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			for ( i = 0, l = name.length; i < l; i++ ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				// Try to fetch any internally stored data first
				return elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
			}

			this.each(function() {
				jQuery.data( this, key, value );
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		hooks.cur = fn;
		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, notxml, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && notxml && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && notxml && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			// In IE9+, Flash objects don't have .getAttribute (#12945)
			// Support: IE9+
			if ( typeof elem.getAttribute !== core_strundefined ) {
				ret =  elem.getAttribute( name );
			}

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( rboolean.test( name ) ) {
					// Set corresponding property to false for boolean attributes
					// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
					if ( !getSetAttribute && ruseDefault.test( name ) ) {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					} else {
						elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		var
			// Use .prop to determine if this attribute is understood as boolean
			prop = jQuery.prop( elem, name ),

			// Fetch it accordingly
			attr = typeof prop === "boolean" && elem.getAttribute( name ),
			detail = typeof prop === "boolean" ?

				getSetInput && getSetAttribute ?
					attr != null :
					// oldIE fabricates an empty string for missing boolean attributes
					// and conflates checked/selected into attroperties
					ruseDefault.test( name ) ?
						elem[ jQuery.camelCase( "default-" + name ) ] :
						!!attr :

				// fetch an attribute node for properties not recognized as boolean
				elem.getAttributeNode( name );

		return detail && detail.value !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// fix oldIE value attroperty
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return jQuery.nodeName( elem, "input" ) ?

				// Ignore the value *property* by using defaultValue
				elem.defaultValue :

				ret && ret.specified ? ret.value : undefined;
		},
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ( name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret == null ? undefined : ret;
			}
		});
	});

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		event.isTrigger = true;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur != this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			}
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== document.activeElement && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === document.activeElement && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var i,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	hasDuplicate,
	outermostContext,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsXML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	sortOrder,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	support = {},
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Array methods
	arr = [],
	pop = arr.pop,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},


	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rsibling = /[\x20\t\r\n\f]*[+~]/,

	rnative = /^[^{]+\{\s*\[native code/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,
	rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	funescape = function( _, escaped ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		return high !== high ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Use a stripped-down slice if we can't use a native one
try {
	slice.call( preferredDoc.documentElement.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		while ( (elem = this[i++]) ) {
			results.push( elem );
		}
		return results;
	};
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
	return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var cache,
		keys = [];

	return (cache = function( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	});
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return fn( div );
	} catch (e) {
		return false;
	} finally {
		// release memory in IE
		div = null;
	}
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !documentIsXML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getByClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && !rbuggyQSA.test(selector) ) {
			old = true;
			nid = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results, slice.call( newContext.querySelectorAll(
						newSelector
					), 0 ) );
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsXML = isXML( doc );

	// Check if getElementsByTagName("*") returns only elements
	support.tagNameNoComments = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if attributes should be retrieved by attribute nodes
	support.attributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	});

	// Check if getElementsByClassName can be trusted
	support.getByClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	});

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	support.getByName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = doc.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			doc.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			doc.getElementsByName( expando + 0 ).length;
		support.getIdNotName = !doc.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

	// IE6/7 return modified attributes
	Expr.attrHandle = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}) ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		};

	// ID find and filter
	if ( support.getIdNotName ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );

				return m ?
					m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
						[m] :
						undefined :
					[];
			}
		};
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.tagNameNoComments ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Name
	Expr.find["NAME"] = support.getByName && function( tag, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};

	// Class
	Expr.find["CLASS"] = support.getByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && !documentIsXML ) {
			return context.getElementsByClassName( className );
		}
	};

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21),
	// no need to also add to buggyMatches since matches checks buggyQSA
	// A support test would require too much code (would include document ready)
	rbuggyQSA = [ ":focus" ];

	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE8 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<input type='hidden' i=''/>";
			if ( div.querySelectorAll("[i^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.webkitMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = new RegExp( rbuggyMatches.join("|") );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		var compare;

		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b )) ) {
			if ( compare & 1 || a.parentNode && a.parentNode.nodeType === 11 ) {
				if ( a === doc || contains( preferredDoc, a ) ) {
					return -1;
				}
				if ( b === doc || contains( preferredDoc, b ) ) {
					return 1;
				}
				return 0;
			}
			return compare & 4 ? -1 : 1;
		}

		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	// Always assume the presence of duplicates if sort doesn't
	// pass them to our comparison function (as in Google Chrome).
	hasDuplicate = false;
	[0, 0].sort( sortOrder );
	support.detectDuplicates = hasDuplicate;

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	// rbuggyQSA always contains :focus, so no need for an existence check
	if ( support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr) ) {
		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	var val;

	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( !documentIsXML ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( documentIsXML || support.attributes ) {
		return elem.getAttribute( name );
	}
	return ( (val = elem.getAttributeNode( name )) || elem.getAttribute( name ) ) && elem[ name ] === true ?
		name :
		val && val.specified ? val.value : null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && ( ~b.sourceIndex || MAX_NEGATIVE ) - ( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[4] ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}

			nodeName = nodeName.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifider
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsXML ?
						elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
						elem.lang) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector( tokens.slice( 0, i - 1 ) ).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !documentIsXML &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( runescape, funescape ), context )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		documentIsXML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Initialize with the default document
setDocument();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, ret, self,
			len = this.length;

		if ( typeof selector !== "string" ) {
			self = this;
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		ret = [];
		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, this[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = ( this.selector ? this.selector + " " : "" ) + selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true) );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length > 0 ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		var isFunc = jQuery.isFunction( value );

		// Make sure that the elements are removed from the DOM before they are inserted
		// this can help fix replacing a parent with child elements
		if ( !isFunc && typeof value !== "string" ) {
			value = jQuery( value ).not( this ).detach();
		}

		return this.domManip( [ value ], true, function( elem ) {
			var next = this.nextSibling,
				parent = this.parentNode;

			if ( parent ) {
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		});
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, table ? self.html() : undefined );
				}
				self.domManip( args, table, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						node,
						i
					);
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery.ajax({
									url: node.src,
									type: "GET",
									dataType: "script",
									async: false,
									global: false,
									"throws": true
								});
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	var attr = elem.getAttributeNode("type");
	elem.type = ( attr && attr.specified ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== core_strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var len, styles,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		var bool = typeof state === "boolean";

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.hover = function( fnOver, fnOut ) {
	return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
};
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 ) {
					isSuccess = true;
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					isSuccess = true;
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	}
});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {
	var conv2, current, conv, tmp,
		converters = {},
		i = 0,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ];

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var value, name, index, easing, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/*jshint validthis:true */
	var prop, index, length,
		value, dataShow, toggle,
		tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				doAnimation.finish = function() {
					anim.stop( true );
				};
				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.cur && hooks.cur.finish ) {
				hooks.cur.finish.call( this );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.documentElement;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.documentElement;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
// window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );
define('jquery.nc',["jquery"], function (jq) {
//    return jq.noConflict(true);
	return jq.noConflict(true);
});
/* global define */
/* global console */
define('app/p2p',["jquery", "underscore"], function(jQuery, _) {

	var p2p;
	//jQuery = require("jquery-1.9.1").noConflict(true);

	p2p = {
		$: jQuery, // jQuery instance (noConflict)

		_: _, // underscorejs instance

		modules: {},

		listeners: {},

		finishedLoading: false,

		muteLog: ((typeof muteLogs != "undefined") ? muteLogs : false),

		logHistory: [],

		cons: {
			// This could be made it's own "class" to handle the constants management
			_reserved: ["add", "_reserved"],
			add: function(name, value) {
				if (_(this._reserved).contains(name)) {
					p2p.log("'" + name + "' is a reserved word.");
					return false;
				}

				return (this[name] = value);
			}
		},

		init: function() {
			// This could be separated to it's own function and
			// we could have more initialization logic here
			var modulesCount = 0;
			if (_(this.modules).size() > 0) {
				_(this.modules).each(function(module) {
					if (typeof module.initialize == "function" && module.started === false) {
						var overrideSettingsForModule = {};
						if (!_.isUndefined(window.pageModules)) {
							var pageModule = _.findWhere(window.pageModules, { "id": module.name });

							if (_.isUndefined(pageModule)) {
								this.log("No settings found for " + module.name + ". Is the id correct?");
							} else {
								overrideSettingsForModule = pageModule.settings;
							}
						}

						module.initialize(overrideSettingsForModule);
						modulesCount += 1;
					}
				}, this);
				this.log(modulesCount + " modules loaded");
			} else {
				this.log("No modules to load!");
			}

			// Finish starting up the modules

			// Cache
			_(this.modules).each(function(module) {
				if (typeof module.cache === "function") {
					module.cache();
				}
			});

			// Bind
			_(this.modules).each(function(module) {
				if (typeof module.bind === "function") {
					module.bind();
				}
			});

			// Render
			_(this.modules).each(function(module) {
				if (typeof module.render === "function") {
					module.render();
				}
			});

			return this;
		},

		add: function(name, spec, extend) {
			spec = _.extend(_.clone(extend), spec);
			spec.name = name;
			_.bindAll(spec);
			this.modules[name] = spec;

			return this.modules[name];
		},

		log: function(message) {
			if (this.muteLog) {
				this.logHistory.push(message);
			} else {
				if (typeof console != "undefined") {
					console.log(message);
				}
			}
		},

		printLog: function() {
			if (typeof console != "undefined") {
				_(this.logHistory).each(function(message) {
					console.log(message);
				});
			}
		},

		logEvent: function(eventName) {
			if (!this.muteLog && typeof console != "undefined") {
				console.log("%cEvent: " + eventName, "font-size:14px;font-weight:bold;");
			}
		},

		subscribe: function(event, callback, scope) {
			if (typeof callback != "function") {
				return false;
			}

			this.listeners[event] = this.listeners[event] || [];
			this.listeners[event].push(function(event, data) {
				callback.apply(scope, arguments);
			});
		},

		publish: function(event, data) {
			this.logEvent(event);
			if (!this.listeners[event]) {
				return false;
			}

			_(this.listeners[event]).each(function(callback, index) {
				callback(event, data || {});
			});
		},

		startTimer: function(name) {
			if (typeof console != "undefined") {
				if (!this.muteLog && typeof console.time == "function") {
					console.time(name);
				}
			}
		},

		endTimer: function(name) {
			if (typeof console != "undefined") {
				if (!this.muteLog && typeof console.timeEnd == "function") {
					console.timeEnd(name);
				}
			}
		}
	};

	return p2p;
});
/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */


define('domReady',[],function () {
    

    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});
/* global define */
/* global ess */
define('modules/addtobag',["app/p2p", "underscore", "jquery"], function (p2p, _, $) {

	p2p.cons.add("ADD_TO_CART", "ADD_TO_CART");
	p2p.cons.add("GRID_DRAWED", "GRID_DRAWED");

	var previousQuantities = previousQuantities || {};

	// Deprecated - GRID_DRAWED shouldn't be triggered anymore
	var restorePreviousQuantity = function () {
		// _(previousQuantities).each(function (value, key) {
		// 	$("input#qty_" + key).val(value);
		// });
	};

	p2p.subscribe(p2p.cons.GRID_DRAWED, restorePreviousQuantity);

	$.fn.addToBag = function () {

		return this.each(function () {

			var $plusButton = $(this).find(".add"),
				$minusButton = $(this).find(".subtract"),
				$quantityInput = $(this).find(".quantity"),
				$submitButton = $(this).find(".atb-button"),
				productId = $quantityInput.attr("id").replace("qty_", ""),
				quantity = (previousQuantities[productId] || parseInt($quantityInput.val(), 10)) || 1,
				MAX_QTY = 25,
				MIN_QTY = 1,
				exceedsMax = false,
				addToBagDelay = false;

			var increaseQuantity = function (event) {
				event.preventDefault();
				quantity = quantity + 1;
				updateQuantityContainer();
			};

			var decreaseQuantity = function (event) {
				event.preventDefault();
				quantity = quantity - 1;
				updateQuantityContainer();
			};

			var updateQuantityContainer = function () {
				var tooltip;
				if (quantity < MIN_QTY) {
					quantity = MIN_QTY;
				}
				// TODO - This 25 limit should be an application setting
				if (quantity > MAX_QTY) {
					quantity = MAX_QTY;
					tooltip = $('.toolTip', $plusButton);
					tooltip.show();
					exceedsMax = true;
					_.delay(function () {
						tooltip.hide();
						tooltip.addClass('hasShown');
						exceedsMax = false;
					}, 3000);
				}

				$quantityInput.val(quantity);
				previousQuantities[productId] = quantity;
			};

			var handleFocus = function () {
				$(this).select();
			};

			var handleMouseUp = function () {
				return false;
			};

			var handleQuantityInputBlur = function () {
				quantity = parseInt($(this).val()) || MIN_QTY;
				updateQuantityContainer();
			};

			var handleKeypress = function (e) {
				if (e.which == 13) {
					e.preventDefault();
				}
			};

			var handleSubmitButton = function (event) {
				var target = event.target;
				var productId, oForm, form, expressShop = false, pageType = '';

				event.preventDefault();

				// If we exceed the max, let's wait for the message to disappear and then we'll add the product
				if (exceedsMax) {
					clearTimeout(addToBagDelay);
					addToBagDelay = setTimeout(function(){
						handleSubmitButton(event);
					}, 250);
				} else {
					clearTimeout(addToBagDelay);
					addToBagDelay = false;
				}

				// If there's already a timeout for add to bag don't do anything
				if (addToBagDelay !== false) {
					return false;
				}

				var $pageType = $('#pageType');
				if ($pageType.length === 1) {
					pageType = $pageType.val();
				}

				if ($(target).parents(".reveal-modal").length > 0) {
					expressShop = true;
				}

				productId = $(target).parents(".add-to-bag").data("product");

				if ($(target).parents("form").length > 0) {
					oForm = $(target).parents("form");
				} else {
					oForm = $("form[name$=" + productId + "]");
				}

				if (!oForm) {
					p2p.log("No product form found!");
					return false;
				} else {
					form = oForm.clone(); // Cloning so we can change it without affecting the original values
					form.find("input[name=wlName]").val(""); // Making sure the wishlist is always empty or it won't add the product
					form = form.get(0);
				}

				p2p.publish(p2p.cons.ADD_TO_CART, { formObject: form, expressShop: expressShop, pageType: pageType });
				// ess.ajaxAddToCart(form);
			};

			// ACo unbing in case the button already has the event assigned.
			// was getting assigned on every call on stacked cat.
			// Vle - Changed the unbind to an off with reference to the function so we don't loose
			// all other events
			$plusButton.off("click", increaseQuantity).on("click", increaseQuantity);
			$minusButton.off("click", decreaseQuantity).on("click", decreaseQuantity);
			$quantityInput.off("blur", handleQuantityInputBlur).on("blur", handleQuantityInputBlur);
			$quantityInput.off("focus", handleFocus).on("focus", handleFocus); // Both are needed to make the select work in chrome
			$quantityInput.off("mouseup", handleMouseUp).on("mouseup", handleMouseUp); // Both are needed to make the select work in chrome
			$quantityInput.off("keypress", handleKeypress).on("keypress", handleKeypress); // Both are needed to make the select work in chrome
			$submitButton.off("click", handleSubmitButton).on("click", handleSubmitButton);

			// We can use this to trigger the add to bag submission manually
			$(this).bind("addtobag:add", handleSubmitButton);
		});
	};

});

define('modules/baseModule',["app/p2p", "underscore"], function (p2p, _) {

	var baseModule;

	baseModule = {
		started: false,
		body: null,
		container: null,
		platform: p2p,
		name: null,
		events: ["click"],

		/**
		 * Initialize the module, attach the jQuery object to this.body,
		 * delegate events on achors to it and call the remaining initialization
		 * functions in order
		 */
		initialize: function (overrideSettings) {
			if (this.container != "null") {
				this.body = this.platform.$(this.container);

				// We can delegate more events, maybe a property in the module?
				if (_(this.events).isArray()) {
					_(this.events).each(function (element) {
						this.body.on(element, this.eventsHandler);
					}, this);
				}
			}

			if (typeof this.settings != "undefined") _.extend(this.settings, overrideSettings);
			if (typeof this.init == "function") this.init();
//			if (typeof this.cache == "function") this.cache();
//			if (typeof this.bind == "function") this.bind();
//			if (typeof this.render == "function") this.render();

			// For some reason the modules were being initialized twice
			// this is a workaround for it
			this.started = true;
		},

		/**
		 * Init module, happens after setting the container, but before the cache and bind actions
		 * defining new constants should happen here so other modules can use them in their bind function
		 * for example
		 */
		init: function () {
		},

		/**
		 * Used to cache jquery selectors
		 * eg:
		 *    cache: function(){
		 *      this.$someButton = this.body.find(".some-button-class");
		 *    }
		 */
		cache: function () {
		},

		/**
		 * Bind events to elements that aren't anchors <a>
		 * eg:
		 *    bind: function(){
		 *      this.$someButton.click(this.handleSomeButtonClick);
		 *      this.$otherElement.focus(this.handleOtherElementFocus);
		 *    }
		 */
		bind: function () {
		},

		/**
		 * Called after cache, dom manipulation should only start after this point
		 */
		render: function () {
		},

		/**
		 * Handle events, used when as the delegate function to the module events
		 */
		eventsHandler: function (event, a, b, c) {
		},

		/**
		 * Log a message, use this instead of console.log, then we can easily turn it off
		 */
		log: function (message) {
			if (typeof message === "string") {
				message = this.name + ": " + message;
			} else {
				this.platform.log(this.name);
			}
			this.platform.log(message);
		},

		/**
		 * Subscribe to an event
		 *
		 * @param String event Name of the event to subscribe
		 * @param Function callback Function to call when event is triggered
		 * @param Object scope The scope for the callback execution
		 */
		subscribe: function (event, callback, scope) {
			this.platform.subscribe.apply(this.platform, arguments);
		},

		/**
		 * Publish an event
		 *
		 * @param String event The event to trigger
		 * @param Mixed data Extra data to be passed
		 */
		publish: function (event, data) {
			this.platform.publish.apply(this.platform, arguments);
		}
	};

	return baseModule;
});
/* global define */
define('modules/back-to-top',["app/p2p", "modules/baseModule", "jquery"], function (p2p, baseModule, $) {

	var backToTop,
		element = $('<a id="backToTopButton" href="#up" title="UP"><span class="icon to-top"/></a>');

	backToTop = {
		init: function () {
			$("body").append(element);
			this.platform.cons.add("PRODUCT_COUNT_GRID_ADJUSTED", "product-count-grid-adjusted");
		},
		cache: function () {
			this.$body = $("body");
			this.$htmlBody = $("html, body");
			this.$btt = this.$body.find("#backToTopButton");
		},
		bind: function () {
			$(window).scroll(this.handleScroll);
			this.$btt.on("mouseup", this.handleClick);
			this.$btt.on("click", false);
			this.subscribe(this.platform.cons.PRODUCT_COUNT_GRID_ADJUSTED, this.render);
		},
		render: function () {
			this.handleScroll();
		},
		handleClick: function (event) {
			event.preventDefault();
			this.$htmlBody.animate({ scrollTop: 0}, 500);
		},
		handleScroll: function () {
			if ($(window).scrollTop() > 250) {
				this.$btt.addClass("visible");
			} else {
				this.$btt.removeClass("visible");
			}

			if ($("#footer").length > 0) {
				this.$btt.css("bottom", Math.max(0, $(window).scrollTop() + $(window).height() - $("#footer").offset().top) + "px");
			}
		}
	};

	return p2p.add("backToTop", backToTop, baseModule);
});
define('modules/bloomreach',[
	"app/p2p",
	"modules/baseModule",
	'jquery'
	],
	function (p2p, baseModule, $) {

		var bloomreach;

		bloomreach = {

			resizeTimeout: null,
			bloomReachProducts: null,

			init: function () {
				//p2p.cons.add("BROWSER_RESIZED", "browser-resized");

				if($('body.stackedCategory').length > 0){
					if($('#br-related-products-widget').length == 0){
						var search = $('#br-search-widget');
						if(search.length > 0){
							search.addClass('noProducts');
						}
					}
				}
			},

			render: function() {
				// Trigger CM events for Related Searches and Related Products
				this.trigerRelatedProductsEvents();
			},

			cache: function () {
			},

			bind: function () {
				var body = $('body');
				if(!body.hasClass('product') && !body.hasClass('family') && !body.hasClass('category')){
					return;
				}
				this.subscribe(p2p.cons.READY, handleBloomReach);
				this.subscribe(p2p.cons.BROWSER_RESIZED, this.browserResized);
			},

			/**
			* Browser resize event
			* @param event
			* @param data
			*/
			browserResized: function(/*event, data*/){
				var that = this;

				// Throttled browser resize handling
				if (this.resizeTimeout) {
					clearTimeout(this.resizeTimeout);
				}
				this.resizeTimeout = setTimeout(function() {
					adjustDetailsHeightBloomReach($('.br-sf-widget.column', this.bloomReachProducts));
				}, 500);
			},

			trigerRelatedProductsEvents: function() {
				var relatedSearchesContainer = $("#br-related-searches-widget");
				var relatedProductsContainer = $("#br-related-products-widget");

				if (relatedSearchesContainer.find(".br-related-query").length > 0) {
					cmCreatePageElementTag("Related Searches", "BloomReach");
				}

				if (relatedProductsContainer.find(".br-sf-widget").length > 0) {
					cmCreatePageElementTag("Related Products", "BloomReach");
				}
			}
		};

	return p2p.add("bloomreach", bloomreach, baseModule);

});


function handleBloomReach() {

	var body = p2p.$('body');
	if(!body.hasClass('product') && !body.hasClass('family') && !body.hasClass('category')){
		return;
	}

	var header = p2p.$('.br-found-heading');
	var bloomResults = header.siblings('.br-sf-widget');
	var bloomResultsProdDetails = header.siblings('[id^=br]');
	bloomResultsProdDetails.addClass('bloomResultsProdDetails');
	p2p.$('.br-sf-widget-merchant-popup-close a', bloomResultsProdDetails).text('');

	if (bloomResults.length > 0) {
		bloomResults.removeAttr('style');

		var newDivTable = p2p.$('<div id="bloomReachProductsTable" class="gridview"></div>');
		var newDiv = p2p.$('<div id="bloomReachProducts" class="grid-row"></div>');
		var newDiv2 = p2p.$('<div id="bloomReachProducts2ndRow" class="grid-row"></div>');
		newDivTable.append(newDiv);
		newDivTable.append(newDiv2);
		bloomResults.addClass('column');
		newDiv.append(bloomResults);
		var numProducts = bloomResults.length;
		if (numProducts < 5 && !body.hasClass('product')) {
			var toFill = 5 - numProducts;
			for (var i = 0; i < toFill; i++) {
				var fillProduct = '<div class="br-sf-widget column emptyProduct"></div>';
				newDiv.append(fillProduct);
			}
		}

		header.parent().append(newDivTable);
		moreProducts4cols();
		p2p.$('.br-sf-widget-merchant-popup-cont').addClass('clearfix');
		registerClickEvents(bloomResults);
		setRowHeight();

		this.bloomReachProducts = p2p.$('#bloomReachProducts');
	}
};

window.handleBloomReach = handleBloomReach;

function moreProducts4cols() {
	var productsRow = p2p.$('#bloomReachProducts');
	var products = productsRow.children();
	var auxRow = p2p.$('#bloomReachProducts2ndRow');
	var first;
	auxRow.children().removeClass('hideThis');
	if (products.length > 4) {
		var last = products.last();
		auxRow.prepend(last);
	}
	else if (products.length === 3) {
		first = auxRow.children().first();
		productsRow.append(first);
	}
	else if (products.length === 2) {
		first = auxRow.children().first();
		var next = first.next();
		productsRow.append(first);
		productsRow.append(next);
	}
};

window.moreProducts4cols = moreProducts4cols;


function setRowHeight() {

	var products = p2p.$('#bloomReachProducts .br-sf-widget.column');
	var body = p2p.$('body');

	if(!body.hasClass('family') && !body.hasClass('category')){
		adjustDetailsHeightBloomReach(products);

		return products;
	}

	var tallestProduct;
	var hi = 0;

	products.each(function () {
		var h = p2p.$(this).find(".br-sf-widget-merchant-img img").height();
		if(h > hi){
			hi = h;
			tallestProduct = p2p.$(this);
		}
	});

	var	pctgWidth, // 252 is the max-width for a column
		ratio, x, marginTop;

	var $thumbnail;
	var photoSizes = {};

	// If there's a tallestProduct set it's spacing towards the upper row
	// (if there isn't this row only has CMS)
	if (tallestProduct && tallestProduct.jquery && tallestProduct.find(".br-sf-widget-merchant-img").length > 0) {

		photoSizes.width = getProductWidth(tallestProduct);
		photoSizes.height = getProductHeight(tallestProduct);

		ratio = photoSizes.width / photoSizes.height;
		x = (252 - photoSizes.width) / 2;
		marginTop = ( ratio > 0.5 ) ? (x * ratio) : (x - ratio);
		marginTop = marginTop / 252;

		var ie8 = (p2p.$('body.ie8Version').length > 0);

		for (var i = 0, l = products.length; i < l; i++) {
			var product = p2p.$(products[i]);

			$thumbnail = product.find("div.br-sf-widget-merchant-img");

			var photoSizes2 = {};

			photoSizes2.width = getProductWidth(product);
			photoSizes2.height = getProductHeight(product);
			pctgWidth = photoSizes2.width / 252;

			$thumbnail.css("width", pctgWidth * 100 + "%");
			var imgWidth = 100;
			if(ie8){
				imgWidth = 80; // For some reason it was wider on IE8...
			}

			p2p.$("img", $thumbnail).css("width", imgWidth + "%");
		}

		pctgWidth = photoSizes.width / 252;
		$thumbnail = tallestProduct.find("div.br-sf-widget-merchant-img");
		if(marginTop > 0.14){
			marginTop = 0.14;
		}

		$thumbnail.css("width", pctgWidth * 100 + "%");
		//p2p.$("img", $thumbnail).css("width", "100%");
		$thumbnail.css("margin-top", Math.abs(marginTop * 100) + "%");
	}

	adjustDetailsHeightBloomReach(products);

	return products;
};

window.setRowHeight = setRowHeight;


function registerClickEvents(bloomResults) {
	p2p.$('.br-sf-widget-merchant-qv a', bloomResults).click(function () {
		p2p.$('#bloomReachProductsTable').addClass('hideThis');
		p2p.$(this).parents('.bloomResultsProdDetails').show();
	});

	p2p.$('.br-sf-widget-merchant-popup-close').click(function () {
		p2p.$(this).parents('.bloomResultsProdDetails').hide();
		p2p.$('#bloomReachProductsTable').removeClass('hideThis');
	});
};

window.registerClickEvents = registerClickEvents;


function getProductHeight(product) {
	if(typeof product != 'undefined'){

		var img = product.find(".br-sf-widget-merchant-img img");
		img.css('height', 'auto');
		var imgHeight =  img.height();
		img.css('height', '');
		return imgHeight;
	}
	else {
		var img = p2p.$(this).find(".br-sf-widget-merchant-img img");
		img.css('height', 'auto');
		var imgHeight =  img.height();
		img.css('height', '');
		return imgHeight;
	}
}

window.getProductHeight = getProductHeight;

function getProductWidth(product) {

	if(typeof product != 'undefined'){
		var img = product.find(".br-sf-widget-merchant-img img");
		img.css('width', 'auto');
		var imgWidth =  img.width();
		img.css('width', '');
		return imgWidth;
	}
	else {
		var img = p2p.$(this).find(".br-sf-widget-merchant-img img");
		img.css('width', 'auto');
		var imgWidth =  img.width();
		img.css('width', '');
		return imgWidth;
	}
}

window.getProductWidth = getProductWidth;


function adjustDetailsHeightBloomReach(products){
	var maxInformationHeight = 0;
	var maxDescriptionHeight = 0;
	var maxTitleHeight = 0;
	var height;
	var informationContainers;
	var descriptionContainers;
	var titleContainers;

	p2p.$.each(products, function(index, product) {
		var newDivInformation = p2p.$('<div class="bloomreachInformation"></div>');
		product = p2p.$(product);
		product.find(".br-sf-widget-merchant-cont").append(newDivInformation);

		// Reset all manually sized items so they can be re-measured
		product.find(".br-sf-widget-merchant-title, .br-sf-widget-merchant-desc, .br-sf-widget-merchant-qv").height("auto").appendTo(newDivInformation);
	});

	// Find all of the information containers
	informationContainers = products.find(".bloomreachInformation");

/*
	// Find the biggest information container
	p2p.$.each(informationContainers, function(index, informationContainer) {
		height = informationContainer.offsetHeight;
		if (height > maxInformationHeight) {
			maxInformationHeight = height;
		}
	});
*/

	// Find all of the description containers
	descriptionContainers = informationContainers.find(".br-sf-widget-merchant-desc");

	// Find the biggest description container
	p2p.$.each(descriptionContainers, function(index, descriptionContainer) {
		height = p2p.$(descriptionContainer).height();
		if (height > maxDescriptionHeight) {
			maxDescriptionHeight = height;
		}
	});

	// Find all of the description containers
	titleContainers = informationContainers.find(".br-sf-widget-merchant-title");

	// Find the biggest description container
	p2p.$.each(titleContainers, function(index, titleContainer) {
		height = p2p.$(titleContainer).height();
		if (height > maxTitleHeight) {
			maxTitleHeight = height;
		}
	});

/*
	// Set the height of all of the containers to the maximum in the row
	p2p.$.each(informationContainers, function(index, informationContainer) {
		informationContainer.style.height = maxInformationHeight + "px";
	});

*/
	p2p.$.each(descriptionContainers, function(index, descriptionContainer) {
		descriptionContainer.style.height = maxDescriptionHeight + "px";
	});

	/*p2p.$.each(titleContainers, function(index, titleContainer) {
		titleContainer.style.height = maxTitleHeight + "px";
	});*/

	p2p.$("#br-related-products-widget").css('height', p2p.$("#br-related-products-widget").removeAttr('style').height());
};

window.adjustDetailsHeightBloomReach = adjustDetailsHeightBloomReach;
/* *******************************************
// Copyright 2010-2013, Anthony Hand
//
// BETA NOTICE
// Previous versions of the JavaScript code for MobileESP were 'regular' 
// JavaScript. The strength of it was that it was really easy to code and use.
// Unfortunately, regular JavaScript means that all variables and functions
// are in the global namespace. There can be collisions with other code libraries
// which may have similar variable or function names. Collisions cause bugs as each
// library changes a variable's definition or functionality unexpectedly.
// As a result, we thought it wise to switch to an "object oriented" style of code.
// This 'literal notation' technique keeps all MobileESP variables and functions fully self-contained.
// It avoids potential for collisions with other JavaScript libraries.
// This technique allows the developer continued access to any desired function or property.
//
// Please send feedback to project founder Anthony Hand: anthony.hand@gmail.com
//
//
// File version 2013.07.13 (July 13, 2013)
//      Updates:
//      - Added support for Tizen: variable and DetectTizen().
//      - Added support for Meego: variable and DetectMeego().
//      - Added support for Windows Phone 8: variable and DetectWindowsPhone8().
//      - Added a generic Windows Phone method: DetectWindowsPhone().
//      - Added support for BlackBerry 10 OS: variable and DetectBlackBerry10Phone().
//      - Added support for PlayStation Vita handheld: variable and DetectGamingHandheld().
//      - Updated DetectTierIphone(). Added Tizen; updated the Windows Phone, BB10, and PS Vita support.
//      - Updated DetectWindowsMobile(). Uses generic DetectWindowsPhone() method rather than WP7.
//      - Updated DetectSmartphone(). Uses the IsTierIphone variable.
//      - Updated DetectSonyMylo() with more efficient code.
//      - Removed DetectGarminNuvifone() from DetectTierIphone(). How many are left in market in 2013? It is detected as a RichCSS Tier device.
//      - Removed the deviceXoom variable. It was unused.
//      - Added detection support for the OpenWeb transcoding engine to DetectMobileQuick().
//
// File version 2012.07.22  (July 22, 2012)
//      - Switched to an Object-Oriented programming model using the literal notation technique.  
//      - NOTE: The literal notation technique allows only 1 instance of this object per web page.  
//      - Named the JavaScript object "MobileEsp" rather than the old "mDetect."
//      - Applied many small tweaks and a few refactorings. The most notable ones are listed here...
//      - Added a variable for Obigo, an embedded browser. Added a lookup for Obigo to DetectMobileQuick().
//      - Added global variables for quick access to these very useful Boolean values:
//              - isWebkit, isMobilePhone, isIphone, isAndroid, isAndroidPhone, isTierTablet, isTierIphone, isTierRichCss, isTierGenericMobile
//      - Updated & simplified DetectSonyMylo(). Updated the variable mylocom2's value to handle both versions. 
//      - Removed the variable qtembedded, which was only used in Mylo and unnecessary.  
//      - Simplified OperaMobile().  
//      - Reorganized DetectMobileQuick().
//      - Moved the following from DetectMobileQuick() to DetectMobileLong():
//              - DetectDangerHiptop(), DetectMaemoTablet(), DetectGarminNuvifone(), devicePda  
//      - Added DetectBada(). Added it to DetectSmartphone & iPhone Tier, too.
//      - Updated DetectSymbian() to support Opera Mobile 10.
//      - Removed variable for OpenWeb. Removed its detection from DetectMobileQuick().
//              It's not clear whether Sprint is still using the OpenWeb transcoding service from OpenWave.
//
//
//
// LICENSE INFORMATION
// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at 
//        http://www.apache.org/licenses/LICENSE-2.0 
// Unless required by applicable law or agreed to in writing, 
// software distributed under the License is distributed on an 
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied. See the License for the specific 
// language governing permissions and limitations under the License. 
//
//
// ABOUT THIS PROJECT
//   Project Owner: Anthony Hand
//   Email: anthony.hand@gmail.com
//   Web Site: http://www.mobileesp.com
//   Source Files: http://code.google.com/p/mobileesp/
//   
//   Versions of this code are available for:
//      PHP, JavaScript, Java, ASP.NET (C#), Ruby and others
//
//
// WARNING: 
//   These JavaScript-based device detection features may ONLY work 
//   for the newest generation of smartphones, such as the iPhone, 
//   Android and Palm WebOS devices.
//   These device detection features may NOT work for older smartphones 
//   which had poor support for JavaScript, including 
//   older BlackBerry, PalmOS, and Windows Mobile devices. 
//   Additionally, because JavaScript support is extremely poor among 
//   'feature phones', these features may not work at all on such devices.
//   For better results, consider using a server-based version of this code, 
//   such as Java, APS.NET, PHP, or Ruby.
//
// *******************************************
*/


var MobileEsp = {

        //GLOBALLY USEFUL VARIABLES
        //Note: These values are set automatically during the Init function.
        //Stores whether we're currently initializing the most popular functions.
        initCompleted : false,
        isWebkit : false, //Stores the result of DetectWebkit()
        isMobilePhone : false, //Stores the result of DetectMobileQuick()
        isIphone : false, //Stores the result of DetectIphone()
        isAndroid : false, //Stores the result of DetectAndroid()
        isAndroidPhone : false, //Stores the result of DetectAndroidPhone()
        isTierTablet : false, //Stores the result of DetectTierTablet()
        isTierIphone : false, //Stores the result of DetectTierIphone()
        isTierRichCss : false, //Stores the result of DetectTierRichCss()
        isTierGenericMobile : false, //Stores the result of DetectTierOtherPhones()
        
        //INTERNALLY USED DETECTION STRING VARIABLES
        engineWebKit : 'webkit',

        deviceIphone : 'iphone',
        deviceIpod : 'ipod',
        deviceIpad : 'ipad',
        deviceMacPpc : 'macintosh', //Used for disambiguation
        
        deviceAndroid : 'android',
        deviceGoogleTV : 'googletv',
        deviceHtcFlyer : 'htc_flyer', //HTC Flyer
        
        deviceWinPhone7 : 'windows phone os 7', 
        deviceWinPhone8 : 'windows phone 8', 
        deviceWinMob : 'windows ce',
        deviceWindows : 'windows',
        deviceIeMob : 'iemobile',
        devicePpc : 'ppc', //Stands for PocketPC
        enginePie : 'wm5 pie',  //An old Windows Mobile

        deviceBB : 'blackberry',
        deviceBB10 : 'bb10', //For the new BB 10 OS
        vndRIM : 'vnd.rim', //Detectable when BB devices emulate IE or Firefox
        deviceBBStorm : 'blackberry95', //Storm 1 and 2
        deviceBBBold : 'blackberry97', //Bold 97x0 (non-touch)
        deviceBBBoldTouch : 'blackberry 99', //Bold 99x0 (touchscreen)
        deviceBBTour : 'blackberry96', //Tour
        deviceBBCurve : 'blackberry89', //Curve 2
        deviceBBCurveTouch : 'blackberry 938', //Curve Touch 9380
        deviceBBTorch : 'blackberry 98', //Torch
        deviceBBPlaybook : 'playbook', //PlayBook tablet

        deviceSymbian : 'symbian',
        deviceSymbos : 'symbos', //Opera 10 on Symbian
        deviceS60 : 'series60',
        deviceS70 : 'series70',
        deviceS80 : 'series80',
        deviceS90 : 'series90',

        devicePalm : 'palm',
        deviceWebOS : 'webos', //For Palm's line of WebOS devices
        deviceWebOShp : 'hpwos', //For HP's line of WebOS devices
        engineBlazer : 'blazer', //Old Palm browser
        engineXiino : 'xiino', //Another old Palm

        deviceNuvifone : 'nuvifone', //Garmin Nuvifone
        deviceBada : 'bada', //Samsung's Bada OS
        deviceTizen : 'tizen', //Tizen OS
        deviceMeego : 'meego', //Meego OS

        deviceKindle : 'kindle', //Amazon eInk Kindle
        engineSilk : 'silk-accelerated', //Amazon's accelerated Silk browser for Kindle Fire

        //Initialize variables for mobile-specific content.
        vndwap : 'vnd.wap',
        wml : 'wml',
        
        //Initialize variables for random devices and mobile browsers.
        //Some of these may not support JavaScript
        deviceTablet : 'tablet',
        deviceBrew : 'brew',
        deviceDanger : 'danger',
        deviceHiptop : 'hiptop',
        devicePlaystation : 'playstation',
        devicePlaystationVita : 'vita',
        deviceNintendoDs : 'nitro',
        deviceNintendo : 'nintendo',
        deviceWii : 'wii',
        deviceXbox : 'xbox',
        deviceArchos : 'archos',
        
        engineOpera : 'opera', //Popular browser
        engineNetfront : 'netfront', //Common embedded OS browser
        engineUpBrowser : 'up.browser', //common on some phones
        engineOpenWeb : 'openweb', //Transcoding by OpenWave server
        deviceMidp : 'midp', //a mobile Java technology
        uplink : 'up.link',
        engineTelecaQ : 'teleca q', //a modern feature phone browser
        engineObigo : 'obigo', //W 10 is a modern feature phone browser
        
        devicePda : 'pda',
        mini : 'mini',  //Some mobile browsers put 'mini' in their names
        mobile : 'mobile', //Some mobile browsers put 'mobile' in their user agent strings
        mobi : 'mobi', //Some mobile browsers put 'mobi' in their user agent strings
        
        //Use Maemo, Tablet, and Linux to test for Nokia's Internet Tablets.
        maemo : 'maemo',
        linux : 'linux',
        mylocom2 : 'sony/com', // for Sony Mylo 1 and 2
        
        //In some UserAgents, the only clue is the manufacturer
        manuSonyEricsson : 'sonyericsson',
        manuericsson : 'ericsson',
        manuSamsung1 : 'sec-sgh',
        manuSony : 'sony',
        manuHtc : 'htc',
        
        //In some UserAgents, the only clue is the operator
        svcDocomo : 'docomo',
        svcKddi : 'kddi',
        svcVodafone : 'vodafone',
        
        //Disambiguation strings.
        disUpdate : 'update', //pda vs. update
        
        //Holds the User Agent string value.
        uagent : '',
   
        //Initializes key MobileEsp variables
        InitDeviceScan : function() {
                this.initCompleted = false;
                
                if (navigator && navigator.userAgent)
                        this.uagent = navigator.userAgent.toLowerCase();
                
                //Save these properties to speed processing
                this.isWebkit = this.DetectWebkit();
                this.isIphone = this.DetectIphone();
                this.isAndroid = this.DetectAndroid();
                this.isAndroidPhone = this.DetectAndroidPhone();
                
                //Generally, these tiers are the most useful for web development
                this.isMobilePhone = this.DetectMobileQuick();
                this.isTierIphone = this.DetectTierIphone();
                this.isTierTablet = this.DetectTierTablet();
                
                //Optional: Comment these out if you NEVER use them
                this.isTierRichCss = this.DetectTierRichCss();
                this.isTierGenericMobile = this.DetectTierOtherPhones();
                
                this.initCompleted = true;
        },


        //APPLE IOS

        //**************************
        // Detects if the current device is an iPhone.
        DetectIphone : function() {
                if (this.initCompleted || this.isIphone)
                        return this.isIphone;

                if (this.uagent.search(this.deviceIphone) > -1)
                        {
                                //The iPad and iPod Touch say they're an iPhone! So let's disambiguate.
                                if (this.DetectIpad() || this.DetectIpod())
                                        return false;
                                //Yay! It's an iPhone!
                                else 
                                        return true;
                        }
                else
                        return false;
        },

        //**************************
        // Detects if the current device is an iPod Touch.
        DetectIpod : function() {
                        if (this.uagent.search(this.deviceIpod) > -1)
                                return true;
                        else
                                return false;
        },

        //**************************
        // Detects if the current device is an iPhone or iPod Touch.
        DetectIphoneOrIpod : function() {
                //We repeat the searches here because some iPods 
                //  may report themselves as an iPhone, which is ok.
                if (this.DetectIphone() || this.DetectIpod())
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current device is an iPad tablet.
        DetectIpad : function() {
                if (this.uagent.search(this.deviceIpad) > -1  && this.DetectWebkit())
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects *any* iOS device: iPhone, iPod Touch, iPad.
        DetectIos : function() {
                if (this.DetectIphoneOrIpod() || this.DetectIpad())
                        return true;
                else
                        return false;
        },


        //ANDROID

        //**************************
        // Detects *any* Android OS-based device: phone, tablet, and multi-media player.
        // Also detects Google TV.
        DetectAndroid : function() {
                if (this.initCompleted || this.isAndroid)
                        return this.isAndroid;
                
                if ((this.uagent.search(this.deviceAndroid) > -1) || this.DetectGoogleTV())
                        return true;
                //Special check for the HTC Flyer 7" tablet. It should report here.
                if (this.uagent.search(this.deviceHtcFlyer) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current device is a (small-ish) Android OS-based device
        // used for calling and/or multi-media (like a Samsung Galaxy Player).
        // Google says these devices will have 'Android' AND 'mobile' in user agent.
        // Ignores tablets (Honeycomb and later).
        DetectAndroidPhone : function() {
                if (this.initCompleted || this.isAndroidPhone)
                        return this.isAndroidPhone;
                
                if (this.DetectAndroid() && (this.uagent.search(this.mobile) > -1))
                        return true;
                //Special check for Android phones with Opera Mobile. They should report here.
                if (this.DetectOperaAndroidPhone())
                        return true;
                //Special check for the HTC Flyer 7" tablet. It should report here.
                if (this.uagent.search(this.deviceHtcFlyer) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current device is a (self-reported) Android tablet.
        // Google says these devices will have 'Android' and NOT 'mobile' in their user agent.
        DetectAndroidTablet : function() {
                //First, let's make sure we're on an Android device.
                if (!this.DetectAndroid())
                        return false;
                
                //Special check for Opera Android Phones. They should NOT report here.
                if (this.DetectOperaMobile())
                        return false;
                //Special check for the HTC Flyer 7" tablet. It should NOT report here.
                if (this.uagent.search(this.deviceHtcFlyer) > -1)
                        return false;
                        
                //Otherwise, if it's Android and does NOT have 'mobile' in it, Google says it's a tablet.
                if (this.uagent.search(this.mobile) > -1)
                        return false;
                else
                        return true;
        },

        //**************************
        // Detects if the current device is an Android OS-based device and
        //   the browser is based on WebKit.
        DetectAndroidWebKit : function() {
                if (this.DetectAndroid() && this.DetectWebkit())
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current device is a GoogleTV.
        DetectGoogleTV : function() {
                if (this.uagent.search(this.deviceGoogleTV) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is based on WebKit.
        DetectWebkit : function() {
                if (this.initCompleted || this.isWebkit)
                        return this.isWebkit;
                
                if (this.uagent.search(this.engineWebKit) > -1)
                        return true;
                else
                        return false;
        },


        //WINDOWS MOBILE AND PHONE

        // Detects if the current browser is EITHER a 
        // Windows Phone 7.x OR 8 device.
        DetectWindowsPhone : function() {
                if (this.DetectWindowsPhone7() ||
                    this.DetectWindowsPhone8())
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects a Windows Phone 7.x device (in mobile browsing mode).
        DetectWindowsPhone7 : function() {
                if (this.uagent.search(this.deviceWinPhone7) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects a Windows Phone 8 device (in mobile browsing mode).
        DetectWindowsPhone8 : function() {
                if (this.uagent.search(this.deviceWinPhone8) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is a Windows Mobile device.
        // Excludes Windows Phone 7 and later devices. 
        // Focuses on Windows Mobile 6.xx and earlier.
        DetectWindowsMobile : function() {
                if (this.DetectWindowsPhone())
                        return false;

                //Most devices use 'Windows CE', but some report 'iemobile' 
                //  and some older ones report as 'PIE' for Pocket IE. 
                if (this.uagent.search(this.deviceWinMob) > -1 ||
                        this.uagent.search(this.deviceIeMob) > -1 ||
                        this.uagent.search(this.enginePie) > -1)
                        return true;
                //Test for Windows Mobile PPC but not old Macintosh PowerPC.
                if ((this.uagent.search(this.devicePpc) > -1) && 
                        !(this.uagent.search(this.deviceMacPpc) > -1))
                        return true;
                //Test for Windwos Mobile-based HTC devices.
                if (this.uagent.search(this.manuHtc) > -1 &&
                        this.uagent.search(this.deviceWindows) > -1)
                        return true;
                else
                        return false;
        },


        //BLACKBERRY

        //**************************
        // Detects if the current browser is a BlackBerry of some sort.
        // Includes BB10 OS, but excludes the PlayBook.
        DetectBlackBerry : function() {
                if ((this.uagent.search(this.deviceBB) > -1) ||
                        (this.uagent.search(this.vndRIM) > -1))
                        return true;
                if (this.DetectBlackBerry10Phone())
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is a BlackBerry 10 OS phone.
        // Excludes tablets.
        DetectBlackBerry10Phone : function() {
                if ((this.uagent.search(this.deviceBB10) > -1) &&
                        (this.uagent.search(this.mobile) > -1))
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is on a BlackBerry tablet device.
        //    Example: PlayBook
        DetectBlackBerryTablet : function() {
                if (this.uagent.search(this.deviceBBPlaybook) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is a BlackBerry device AND uses a
        //    WebKit-based browser. These are signatures for the new BlackBerry OS 6.
        //    Examples: Torch. Includes the Playbook.
        DetectBlackBerryWebKit : function() {
                if (this.DetectBlackBerry() &&
                        this.uagent.search(this.engineWebKit) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is a BlackBerry Touch
        //    device, such as the Storm, Torch, and Bold Touch. Excludes the Playbook.
        DetectBlackBerryTouch : function() {
                if (this.DetectBlackBerry() &&
                        ((this.uagent.search(this.deviceBBStorm) > -1) ||
                        (this.uagent.search(this.deviceBBTorch) > -1) ||
                        (this.uagent.search(this.deviceBBBoldTouch) > -1) ||
                        (this.uagent.search(this.deviceBBCurveTouch) > -1) ))
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is a BlackBerry OS 5 device AND
        //    has a more capable recent browser. Excludes the Playbook.
        //    Examples, Storm, Bold, Tour, Curve2
        //    Excludes the new BlackBerry OS 6 and 7 browser!!
        DetectBlackBerryHigh : function() {
                //Disambiguate for BlackBerry OS 6 or 7 (WebKit) browser
                if (this.DetectBlackBerryWebKit())
                        return false;
                if ((this.DetectBlackBerry()) &&
                        (this.DetectBlackBerryTouch() ||
                        this.uagent.search(this.deviceBBBold) > -1 || 
                        this.uagent.search(this.deviceBBTour) > -1 || 
                        this.uagent.search(this.deviceBBCurve) > -1))
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is a BlackBerry device AND
        //    has an older, less capable browser. 
        //    Examples: Pearl, 8800, Curve1.
        DetectBlackBerryLow : function() {
                if (this.DetectBlackBerry())
                {
                        //Assume that if it's not in the High tier or has WebKit, then it's Low.
                        if (this.DetectBlackBerryHigh() || this.DetectBlackBerryWebKit())
                                return false;
                        else
                                return true;
                }
                else
                        return false;
        },


        //SYMBIAN

        //**************************
        // Detects if the current browser is the Nokia S60 Open Source Browser.
        DetectS60OssBrowser : function() {
                if (this.DetectWebkit())
                {
                        if ((this.uagent.search(this.deviceS60) > -1 || 
                                this.uagent.search(this.deviceSymbian) > -1))
                                return true;
                        else
                                return false;
                }
                else
                        return false;
        }, 

        //**************************
        // Detects if the current device is any Symbian OS-based device,
        //   including older S60, Series 70, Series 80, Series 90, and UIQ, 
        //   or other browsers running on these devices.
        DetectSymbianOS : function() {
                if (this.uagent.search(this.deviceSymbian) > -1 ||
                        this.uagent.search(this.deviceS60) > -1 ||
                        ((this.uagent.search(this.deviceSymbos) > -1) &&
                                (this.DetectOperaMobile)) || //Opera 10
                        this.uagent.search(this.deviceS70) > -1 ||
                        this.uagent.search(this.deviceS80) > -1 ||
                        this.uagent.search(this.deviceS90) > -1)
                        return true;
                else
                        return false;
        },


        //WEBOS AND PALM

        //**************************
        // Detects if the current browser is on a PalmOS device.
        DetectPalmOS : function() {
                //Make sure it's not WebOS first
                if (this.DetectPalmWebOS())
                        return false;

                //Most devices nowadays report as 'Palm', 
                //  but some older ones reported as Blazer or Xiino.
                if (this.uagent.search(this.devicePalm) > -1 ||
                        this.uagent.search(this.engineBlazer) > -1 ||
                        this.uagent.search(this.engineXiino) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is on a Palm device
        //   running the new WebOS.
        DetectPalmWebOS : function()
        {
                if (this.uagent.search(this.deviceWebOS) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is on an HP tablet running WebOS.
        DetectWebOSTablet : function() {
                if (this.uagent.search(this.deviceWebOShp) > -1 &&
                        this.uagent.search(this.deviceTablet) > -1)
                        return true;
                else
                        return false;
        },


        //OPERA

        //**************************
        // Detects if the current browser is Opera Mobile or Mini.
        // Note: Older embedded Opera on mobile devices didn't follow these naming conventions.
        //   Like Archos media players, they will probably show up in DetectMobileQuick or -Long instead. 
        DetectOperaMobile : function() {
                if ((this.uagent.search(this.engineOpera) > -1) &&
                        ((this.uagent.search(this.mini) > -1 ||
                        this.uagent.search(this.mobi) > -1)))
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is Opera Mobile 
        // running on an Android phone.
        DetectOperaAndroidPhone : function () {
                if ((this.uagent.search(this.engineOpera) > -1) &&
                        (this.uagent.search(this.deviceAndroid) > -1) &&
                        (this.uagent.search(this.mobi) > -1))
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is Opera Mobile 
        // running on an Android tablet.
        DetectOperaAndroidTablet : function() {
                if ((this.uagent.search(this.engineOpera) > -1) &&
                        (this.uagent.search(this.deviceAndroid) > -1) &&
                        (this.uagent.search(this.deviceTablet) > -1))
                        return true;
                else
                        return false;
        },


        //MISCELLANEOUS DEVICES

        //**************************
        // Detects if the current device is an Amazon Kindle (eInk devices only).
        // Note: For the Kindle Fire, use the normal Android methods.
        DetectKindle : function() {
                if (this.uagent.search(this.deviceKindle) > -1 &&
                        !this.DetectAndroid())
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current Amazon device has turned on the Silk accelerated browsing feature.
        // Note: Typically used by the the Kindle Fire.
        DetectAmazonSilk : function() {
                if (this.uagent.search(this.engineSilk) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is a
        //   Garmin Nuvifone.
        DetectGarminNuvifone : function() {
                if (this.uagent.search(this.deviceNuvifone) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects a device running the Bada smartphone OS from Samsung.
        DetectBada : function() {
                if (this.uagent.search(this.deviceBada) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects a device running the Tizen smartphone OS.
        DetectTizen : function() {
                if (this.uagent.search(this.deviceTizen) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects a device running the Meego OS.
        DetectMeego : function() {
                if (this.uagent.search(this.deviceMeego) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects the Danger Hiptop device.
        DetectDangerHiptop : function() {
                if (this.uagent.search(this.deviceDanger) > -1 ||
                        this.uagent.search(this.deviceHiptop) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current browser is a Sony Mylo device.
        DetectSonyMylo : function() {
                if ((this.uagent.search(this.manuSony) > -1) &&
                    ((this.uagent.search(this.qtembedded) > -1) ||
                     (this.uagent.search(this.mylocom2) > -1)))
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current device is on one of 
        // the Maemo-based Nokia Internet Tablets.
        DetectMaemoTablet : function() {
                if (this.uagent.search(this.maemo) > -1)
                        return true;
                //For Nokia N810, must be Linux + Tablet, or else it could be something else.
                if ((this.uagent.search(this.linux) > -1) 
                        && (this.uagent.search(this.deviceTablet) > -1)
                        && !this.DetectWebOSTablet()
                        && !this.DetectAndroid())
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current device is an Archos media player/Internet tablet.
        DetectArchos : function() {
                if (this.uagent.search(this.deviceArchos) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current device is an Internet-capable game console.
        // Includes many handheld consoles.
        DetectGameConsole : function() {
                if (this.DetectSonyPlaystation() || 
                        this.DetectNintendo() ||
                        this.DetectXbox())
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current device is a Sony Playstation.
        DetectSonyPlaystation : function() {
                if (this.uagent.search(this.devicePlaystation) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current device is a handheld gaming device with
        // a touchscreen and modern iPhone-class browser. Includes the Playstation Vita.
        DetectGamingHandheld : function() {
                if ((this.uagent.search(this.devicePlaystation) > -1) &&
                   (this.uagent.search(this.devicePlaystationVita) > -1))
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current device is a Nintendo game device.
        DetectNintendo : function() {
                if (this.uagent.search(this.deviceNintendo) > -1   || 
                        this.uagent.search(this.deviceWii) > -1 ||
                        this.uagent.search(this.deviceNintendoDs) > -1)
                        return true;
                else
                        return false;
        },

        //**************************
        // Detects if the current device is a Microsoft Xbox.
        DetectXbox : function() {
                if (this.uagent.search(this.deviceXbox) > -1)
                        return true;
                else
                        return false;
        },
        
        
        //**************************
        // Detects whether the device is a Brew-powered device.
        //   Note: Limited to older Brew-powered feature phones.
        //   Ignores newer Brew versions like MP. Refer to DetectMobileQuick().
        DetectBrewDevice : function() {
                if (this.uagent.search(this.deviceBrew) > -1)
                        return true;
                else
                        return false;
        },


        // DEVICE CLASSES

        //**************************
        // Check to see whether the device is *any* 'smartphone'.
        //   Note: It's better to use DetectTierIphone() for modern touchscreen devices. 
        DetectSmartphone : function() {
                //Exclude duplicates from TierIphone
                if (this.DetectTierIphone() ||
                        this.DetectS60OssBrowser() ||
                        this.DetectSymbianOS() ||
                        this.DetectWindowsMobile() ||
                        this.DetectBlackBerry() ||
                        this.DetectPalmOS())
                        return true;
                
                //Otherwise, return false.
                return false;
        },

        //**************************
        // Detects if the current device is a mobile device.
        //  This method catches most of the popular modern devices.
        //  Excludes Apple iPads and other modern tablets.
        DetectMobileQuick : function() {
                if (this.initCompleted || this.isMobilePhone)
                        return this.isMobilePhone;

                //Let's exclude tablets.
                if (this.DetectTierTablet())
                        return false;

                //Most mobile browsing is done on smartphones
                if (this.DetectSmartphone())
                        return true;

                //Catch all for many mobile devices
                if (this.uagent.search(this.mobile) > -1)
                        return true;

                if (this.DetectKindle() ||
                        this.DetectAmazonSilk())
                        return true;

                if (this.uagent.search(this.deviceMidp) > -1 ||
                        this.DetectBrewDevice())
                        return true;

                if (this.DetectOperaMobile() ||
                        this.DetectArchos())
                        return true;

                if ((this.uagent.search(this.engineObigo) > -1) ||
                        (this.uagent.search(this.engineNetfront) > -1) ||
                        (this.uagent.search(this.engineUpBrowser) > -1) ||
                        (this.uagent.search(this.engineOpenWeb) > -1))
                        return true;

                return false;
        },

        //**************************
        // Detects in a more comprehensive way if the current device is a mobile device.
        DetectMobileLong : function() {
                if (this.DetectMobileQuick())
                        return true;
                if (this.DetectGameConsole())
                        return true;

                if (this.DetectDangerHiptop() ||
                        this.DetectMaemoTablet() ||
                        this.DetectSonyMylo() ||
                        this.DetectGarminNuvifone())
                        return true;

                if ((this.uagent.search(this.devicePda) > -1) &&
                        !(this.uagent.search(this.disUpdate) > -1)) 
                        return true;
                
                //Detect for certain very old devices with stupid useragent strings.
                if (this.uagent.search(this.manuSamsung1) > -1 ||
                        this.uagent.search(this.manuSonyEricsson) > -1 || 
                        this.uagent.search(this.manuericsson) > -1)
                        return true;
                
                if ((this.uagent.search(this.svcDocomo) > -1) ||
                        (this.uagent.search(this.svcKddi) > -1) ||
                        (this.uagent.search(this.svcVodafone) > -1))
                        return true;
                
                return false;
        },

        //*****************************
        // For Mobile Web Site Design
        //*****************************
        
        //**************************
        // The quick way to detect for a tier of devices.
        //   This method detects for the new generation of
        //   HTML 5 capable, larger screen tablets.
        //   Includes iPad, Android (e.g., Xoom), BB Playbook, WebOS, etc.
        DetectTierTablet : function() {
                if (this.initCompleted || this.isTierTablet)
                        return this.isTierTablet;
                
                if (this.DetectIpad() ||
                        this.DetectAndroidTablet() ||
                        this.DetectBlackBerryTablet() ||
                        this.DetectWebOSTablet())
                        return true;
                else
                        return false;
        },

        //**************************
        // The quick way to detect for a tier of devices.
        //   This method detects for devices which can 
        //   display iPhone-optimized web content.
        //   Includes iPhone, iPod Touch, Android, Windows Phone 7 and 8, BB10, WebOS, Playstation Vita, etc.
        DetectTierIphone : function() {
                if (this.initCompleted || this.isTierIphone)
                        return this.isTierIphone;

                if (this.DetectIphoneOrIpod() ||
                        this.DetectAndroidPhone() ||
                        this.DetectWindowsPhone() ||
                        this.DetectBlackBerry10Phone() ||
                        this.DetectPalmWebOS() ||
                        this.DetectBada() ||
                        this.DetectTizen() ||
                        this.DetectGamingHandheld())
                        return true;

               //Note: BB10 phone is in the previous paragraph
                if (this.DetectBlackBerryWebKit() && this.DetectBlackBerryTouch())
                        return true;
                
                else
                        return false;
        },

        //**************************
        // The quick way to detect for a tier of devices.
        //   This method detects for devices which are likely to be 
        //   capable of viewing CSS content optimized for the iPhone, 
        //   but may not necessarily support JavaScript.
        //   Excludes all iPhone Tier devices.
        DetectTierRichCss : function() {
                if (this.initCompleted || this.isTierRichCss)
                        return this.isTierRichCss;

                //Exclude iPhone and Tablet Tiers and e-Ink Kindle devices
                if (this.DetectTierIphone() ||
                        this.DetectKindle() ||
                        this.DetectTierTablet())
                        return false;
                
                //Exclude if not mobile
                if (!this.DetectMobileQuick())
                        return false;
                                
                //If it's a mobile webkit browser on any other device, it's probably OK.
                if (this.DetectWebkit())
                        return true;
                
                //The following devices are also explicitly ok.
                if (this.DetectS60OssBrowser() ||
                        this.DetectBlackBerryHigh() ||
                        this.DetectWindowsMobile() ||
                        (this.uagent.search(this.engineTelecaQ) > -1))
                        return true;
                
                else
                        return false;
        },

        //**************************
        // The quick way to detect for a tier of devices.
        //   This method detects for all other types of phones,
        //   but excludes the iPhone and RichCSS Tier devices.
        // NOTE: This method probably won't work due to poor
        //  support for JavaScript among other devices. 
        DetectTierOtherPhones : function() {
                if (this.initCompleted || this.isTierGenericMobile)
                        return this.isTierGenericMobile;
                
                //Exclude iPhone, Rich CSS and Tablet Tiers
                if (this.DetectTierIphone() ||
                        this.DetectTierRichCss() ||
                        this.DetectTierTablet())
                        return false;
                
                //Otherwise, if it's mobile, it's OK
                if (this.DetectMobileLong())
                        return true;

                else
                        return false;
        }

};

//Initialize the MobileEsp object
MobileEsp.InitDeviceScan();

define("mdetect", function(){});

/*!
 * jQuery Double Tap Plugin. http://sanraul.com/tag/plugin/
 *
 * Copyright (c) 2010 Raul Sanchez (http://www.appcropolis.com)
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Customized to not fire events if utils.TouchMoving it true
 */

define('app/jquery.doubletap',["jquery", "underscore", "app/p2p"], function($, _, p2p){
  // Determine if we on iPhone or iPad
  var isiOS = false;
  var agent = navigator.userAgent.toLowerCase();
  if(agent.indexOf('iphone') <= 0 || agent.indexOf('ipad') <= 0){
       isiOS = true;
  }

  $.fn.doubletap = function(onDoubleTapCallback, onTapCallback, delay){
    var eventName, action, hadMovement = false, start;
    delay = delay == null? 500 : delay;
    eventName = isiOS == true? 'touchend' : 'click';

    $(this).bind(eventName, function(event){
      event.preventDefault();
      window.utils.touchMoving = hadMovement;
      // var hadMovement = wasThereMovement(start, event.originalEvent);
      var now = new Date().getTime();
      // p2p.log("touchend:" + now);
      var lastTouch = $(this).data('lastTouch') || now + 1 /** the first time this will make delta a negative number */;
      var delta = now - lastTouch;
      clearTimeout(action);
      if(delta<500 && delta>0){
        if (onDoubleTapCallback != null && typeof onDoubleTapCallback == 'function') {
            if (!window.utils.touchMoving) {
                onDoubleTapCallback(event);
            }
        }
      }else{
        $(this).data('lastTouch', now);
        if (!hadMovement) {
          action = setTimeout(function(evt){
            if(onTapCallback != null && typeof onTapCallback == 'function'){
                if (!window.utils.touchMoving) {
                    onTapCallback(evt);
                }
            }
            clearTimeout(action);   // clear the timeout
          }, delay, [event]);
        }
      }
      $(this).data('lastTouch', now);

      utils.touchMoving = false;
    });

    $(this).bind("touchmove", function(ee){
      hadMovement = (start - $(window).scrollTop() > 50 || $(window).scrollTop() - start > 50);
    });

    $(this).bind("touchstart", function(ee){
      hadMovement = false;
      start = $(window).scrollTop();
    });

    // scrolled more than 50px?
    function wasThereMovement(start, end) {
      if (end.pageX == 0 && end.pageY == 0) {
        return false;
      } else {
        return (Math.abs(start.pageY - end.pageY) > 50 || Math.abs(start.pageX - end.pageX) > 50);
      }
    }
  };
});
/* global define */
define('modules/utils',["jquery", "mdetect", "underscore", "app/p2p", "app/jquery.doubletap"], function ($, mdetect, _, p2p) {

	// Cached results to avoid running the same detections multiple times
	var isIos = null;
	var isIe8 = null;
	var isIe9 = null;
	var isIe10 = null;
	var isMacVersion = null;
	var isTouchDevice = null;
	var isPhone = null;
	var isTablet = null;
	var touchEndTimer = null;

	var utils = {
		// ToDo: This doesn't seem to be firing
		// init: function () {
		// },

		// Is the touch device currently scrolling (avoid clicks if so)
		touchMoving: false,

		/**
		 * Which type of click event should we watch: 'touchend' or 'click'
		 */
		clickEvent: null,

		isTouchDevice: function() {
			if (isTouchDevice === null) {
				// look for &touch=true or &touch=false in the url to override device detection
				var touchOverride = utils.getQueryParameters()["touch"];
				if (touchOverride) {
					isTouchDevice = (touchOverride == "true");
				} else {
					//return navigator.userAgent.match(/iPad/i) != null;
					isTouchDevice = this.isTablet() || this.isPhone();
				}
			}
			return isTouchDevice;
		},

		isTablet: function() {
			if (isTablet === null) {
				if (MobileEsp != null) {
					isTablet = MobileEsp.DetectTierTablet();
				} else {
					isTablet = false;
				}
			}
			return isTablet;
		},

		isPhone: function() {
			if (isPhone === null) {
				if (MobileEsp != null) {
					isPhone = MobileEsp.DetectTierIphone() || MobileEsp.DetectTierOtherPhones();
				} else {
					isPhone = false;
				}
			}
			return isPhone;
		},

		isIe8: function() {
			if (isIe8 === null) {
				isIe8 = navigator.userAgent.match(/MSIE 8.0/i) !== null;
			}
			return isIe8;
		},

		isIe9: function() {
			if (isIe9 === null) {
				isIe9 = navigator.userAgent.match(/MSIE 9.0/i) !== null;
			}
			return isIe9;
		},

		isIe10: function() {
			if (isIe10 === null) {
				isIe10 = navigator.userAgent.match(/MSIE 10.0/i) !== null;
			}
			return isIe10;
		},

		isMacVersion: function() {
			if (isMacVersion === null) {
				isMacVersion = navigator.userAgent.match(/Macintosh/i) !== null;
			}
			return isMacVersion;
		},

		isIos: function() {
			if (isIos === null) {
				isIos = navigator.userAgent.match(/iphone/i) !== null || navigator.userAgent.match(/ipad/i) !== null;
			}
			return isIos;
		},

		findClassStartingWith: function(element, search) {
			return $.grep(this.getElementClasses(element), function(c) {
				return c.match('^' + search);
			});
		},

		getDataOrClass: function(element, name) {
			if (this.isIe8()) {
				return this.findClassStartingWith(element, name + '-')[0].replace(name + '-', '');
			}
			return element.data(name);
		},

		// ACo
		// We check to see if sidebar is present
		checkLeftNavPresent: function() {
			var sidebar = $("#leftNavBar");
			return (sidebar.length === 1);
		},


		// ACo
		// Gets all the element's classes, splitting them by empty space
		getElementClasses: function(element) {
			var classes = element.attr('class');
			if (classes != null) {
				return classes.split(/\s+/);
			}

			return '';
		},

		/**
		 * Used to obtain the height from the height-XXX class of the product .photo element
		 */
		getPhotoHeight: function(classList) {
			var result = null;

			$.each(classList, function(index, item) {
				if (item.substr(0, 7) === 'height-') {
					result = item.substr(7);
					return false; // Abort each
				}
				return true; // Keep looking
			});

			return result;
		},

		/**
		 * Used to obtain the width from the width-XXX class of the product .photo element
		 */
		getPhotoWidth: function(classList) {
			var result = null;

			$.each(classList, function(index, item) {
				if (item.substr(0, 6) === 'width-') {
					result = item.substr(6);
					return false; // Abort each
				}
				return true; // Keep looking
			});

			return result;
		},


		/**
		 * URL utils
		 */
		getQueryParametersString: function(queryString) {

			// var queryParameters = {};
			// var re = /([^&=]+)=([^&]*)/g;
			// var m;

			if (queryString == null) {
				queryString = location.search.substring(1);
			}

			return queryString;
		},

		getQueryParametersUndecoded: function(queryString) {

			var queryParameters = {},
			    re = /([^&=]+)=([^&]*)/g,
			    m;

			if (queryString == null) {
				queryString = location.search.substring(1);
			}
			// Creates a map with the query string parameters
			while ((m = re.exec(queryString))) {
				queryParameters[m[1]] = m[2];
			}

			return queryParameters;
		},

		getQueryParameters: function(queryString) {

			var queryParameters = {},
			    re = /([^&=]+)=([^&]*)/g,
			    m;

			if (queryString == null) {
				queryString = location.search.substring(1);
			}
			// Creates a map with the query string parameters
			while ((m = re.exec(queryString))) {
				queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
			}

			return queryParameters;
		},

		/*
		 * Generates the URL URL.
		 * jQuery.param() -> create a serialized representation of an array or
		 *     object, suitable for use in a URL query string or Ajax request.
		 */
		getUrlFromParameters: function(queryParameters) {
			return $.param(queryParameters);
		},

		getUrlNoParameters: function() {
			return location.href.split("?")[0];
		},

		getBaseUrl: function() {
			var pathArray = window.location.href.split('/');
			var protocol = pathArray[0];
			var host = pathArray[2];
			var url = protocol + '//' + host;

			return url;
		},

		overwriteParameters: function(queryParameters, overwriteParams) {
			$.each(overwriteParams, function(name, value) {
				queryParameters[name] = value;
			});
		},

		getDetailsHeight: function(detailsContainer) {
			p2p.startTimer("getDetailsHeight");
			var maxHeight = 0;
			detailsContainer.each(function() {

				var height = $(this).height();
				if (height > maxHeight) {
					maxHeight = height;
				}
			});
			p2p.endTimer("getDetailsHeight");
			return maxHeight;
		},

		adjustAtbHeight: function(row) {
			p2p.startTimer("adjustAtbHeight");
			var tallestDetails = _(row.find(".one.column .details")).max(utils.getATBHeight),
			    detailsContainerHeight = $(tallestDetails).height();
			var tallestAtb = _(row.find(".one.column .details .price-atb")).max(utils.getATBHeight),
			    atbHeight = $(tallestAtb).outerHeight();
			row.find(".price-atb").css("height", parseInt(atbHeight) + "px");
			row.find(".one.column .details")
				.css("height", parseInt(detailsContainerHeight) + "px")
				.addClass("measured");
			p2p.endTimer("adjustAtbHeight");
		},

		adjustAtbHeightV2: function(row, detailsContainerHeight) {
			p2p.startTimer("adjustAtbHeightV2");
			var tallestAtb = _(row.find(".one.column .details .price-atb")).max(utils.getATBHeight),
			    atbHeight = $(tallestAtb).outerHeight();
			row.find(".price-atb").css("height", parseInt(atbHeight) + "px");

			// Solving problem with 0 height details  for hidden products
			if (detailsContainerHeight === 0) {
				detailsContainerHeight = parseInt(row.find(".one.column .details").css("height"));
			}

			row.find(".one.column .details")
				.css("height", parseInt(detailsContainerHeight) + "px")
				.addClass("measured");
			p2p.endTimer("adjustAtbHeightV2");
		},

		getATBHeight: function(element) {
			return $(element).outerHeight();
		},

		pageType: function() {
			var bodyClasses = $('body').attr('class');
			if (bodyClasses.indexOf('productDetailPage') > -1 || bodyClasses.indexOf('product') > -1) {
				return "Product";
			}
			if (typeof isStoryCol !== "undefined" && isStoryCol) {
				return "Story";
			}
			if (bodyClasses.indexOf('stackedCategory') > -1) {
				return "Stack";
			}
			if (bodyClasses.indexOf('family') > -1) {
				return "Family";
			}

			return "";
		},

		adjustDetailsHeightForRow: function(row, container) {
			p2p.startTimer("adjustDetailsHeightForRow");
			var rowWasHidden = row.hasClass('hideThis');
			var columns = $('.one.column', row);
			if (rowWasHidden) {
				row.removeClass('hideThis');
			}

			var hiddenList = [];

			columns.each(function() {
				var wasHidden = $(this).hasClass('hideThis');
				if (wasHidden) {
					$(this).removeClass('hideThis');
					hiddenList.push($(this));
				}
			});

			var details = $('.details', columns);
			var detailsContainerHeight = utils.getDetailsHeight(details);

			utils.adjustAtbHeight(row);

			if (container.hasClass("gridview")) {
				details.css("height", parseInt(detailsContainerHeight) + "px")
					.addClass("measured"); // this makes the container and children positions look better
			}

			$.each(hiddenList, function() {
				$(this).addClass('hideThis');
			});

			if (rowWasHidden) {
				row.addClass('hideThis');
			}
			p2p.endTimer("adjustDetailsHeightForRow");
		},

		adjustDetailsHeightForRowV2: function(row, container, detailHeight) {
			p2p.startTimer("adjustDetailsHeightForRowV2");
			var rowWasHidden = row.hasClass('hideThis');
			var columns = $('.one.column', row);
			if (rowWasHidden) {
				row.removeClass('hideThis');
			}

			var hiddenList = [];

			columns.each(function() {
				var wasHidden = $(this).hasClass('hideThis');
				if (wasHidden) {
					$(this).removeClass('hideThis');
					hiddenList.push($(this));
				}
			});

			utils.adjustAtbHeightV2(row, detailHeight);

			$.each(hiddenList, function() {
				$(this).addClass('hideThis');
			});

			if (rowWasHidden) {
				row.addClass('hideThis');
			}
			p2p.endTimer("adjustDetailsHeightForRowV2");
		},

		// Limit the number of times an element can be hovered
		initFilterLimits: function() {
			$("[data-hoverlimit]").mouseleave(function() {
				var element = $(this);
				var hoverCount = element.data("hovercount") | 0;
				var hoverLimit = element.data("hoverlimit") | 1;
				hoverCount += 1;
				element.data("hovercount", hoverCount);
				if (hoverCount == hoverLimit) {
					element.addClass("hoverDisable");
				}
			});
		},

		isUserLoggedIn: function() {
			return ($("#loggedin").length > 0);
		},

		/**
		 * Setup lazy loading of images for all img matching the given selector.
		 * This is done in one place so that we can customize the lazy loading and perhaps make it configurable.
		 * @param selector
		 */
		lazyLoadImages: function(selector) {
			$(selector)
				.addClass("lazyloading")
				.lazyload({
					threshold: 400,
					failure_limit: 1000,
					skip_invisible: true,  // Setup lazy load to handle images even if they aren't currently visible
					trickleDelay: 3000, // Milliseconds before trickle loading starts
					trickleInterval: 2000,  // Milliseconds between trickle load checks
					error: function() {
						// Process errors loading the image - look for an alternate image
						var image = $(this);
						image.unbind("error"); // Avoid recursive errors
						console.log("error loading image:" + image.data("original"));
						var alternateSrc = image.data("alternatesrc");
						if (alternateSrc) {
							console.log(" attempting alternate image:" + alternateSrc);
							image.attr("src", alternateSrc);
							image.removeClass("lazyloading");
						}
					},
					load: function() {
						var image = $(this);
						image.removeClass("lazyloading");
					}
				});
		},

		/**
		 * Re-evaluate all of the lazy load elements. Previously hidden ones may be visible now.
		 */
		lazyLoadUpdate: function() {
			$(window).trigger("lazyloadupdate");
		},

		pdpAddToBagOverride: function(form) {
			p2p.publish(p2p.cons.ADD_TO_CART, { formObject: form, expressShop: false, pageType: "product" });
		}
	};

	// Init
	utils.clickEvent = utils.isIos() ? 'touchend' : 'click';
	utils.initFilterLimits();
	$(function () {
		// Keep track of when touch device is dragging
		if (utils.isTouchDevice()) {
			$("body").bind("touchmove", function (e) {
				clearTimeout(touchEndTimer);
				utils.touchMoving = true;
				//$("body").addClass("TouchMoving");
			});

			$("body").bind("touchend", function (e) {
				clearTimeout(touchEndTimer);
				touchEndTimer = setTimeout(function() {
					utils.touchMoving = false;
					//$("body").removeClass("TouchMoving");
				}, 1200);
			});
		}

		// Overrides for the Product Detail page
		if (utils.pageType() === "Product") {
			// Use new minicart
			// !! 2014.07.09 - DEPRECATED IN P2P SUMMER
			$(".util #add-to-cart")
				.parents("form").attr("onsubmit", "").end()
				.off("click").off("mouseup").off("keyup")
				.on("click", function(event){
					window.ess.ajaxAddToCart = utils.pdpAddToBagOverride;
				});

			// Use new add to bag
			require(["modules/addtobag"], function(){
				$("#config").find(".add-to-bag").addToBag();
			});

			// Make quicklook work in the ipad
			$(document.body).undelegate(".express-shop-elem .button-link", "mousedown");
			$(document.body).undelegate("ol.prodloop .hproduct", "mouseenter");
			jQuery(document.body).undelegate(".express-shop-elem .button-link", "mousedown");
			jQuery(document.body).undelegate("ol.prodloop .hproduct", "mouseenter");

			require(["modules/productrollover"], function(){
				$(".prodloop .thumbnail .url").productRollover();
			});

			// if (utils.isTouchDevice()) {
			// 	$(".prodloop .thumbnail .url").doubletap(function(){ // doubletap
			// 		return true;
			// 	}, function(e){ // singletap
			// 		var hprod = $(e[0].target).closest(".hproduct");
			// 		var prodloop = $(e[0].target).closest('ol.prodloop');

			// 		setTimeout( function() {
			// 			window.ess.buildExpressShop(hprod, prodloop);
			// 		}, 30 );

			// 		e[0].stopPropagation();
			// 		return false;
			// 	});
			// }
		}
	});

	// Making it global to avoid changing loadmore.js
	window.getQueryParameters = utils.getQueryParameters;
	window.getQueryParametersUndecoded = utils.getQueryParametersUndecoded;
	window.getUrlFromParameters = utils.getUrlFromParameters;
	window.overwriteParameters = utils.overwriteParameters;
	window.utils = utils;

	return utils;
});

define('modules/browserDetector',["jquery", "app/p2p", "modules/utils"], function ($, p2p, utils) {

	init = function () {

		var body = $('body');

		/*
		if (!body.hasClass('p2p')) {
			body.addClass('p2p');
		}
		*/

		if (utils.isTouchDevice()) {
			body.removeClass('no-touch').addClass('touch');
			//$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
		} else {
			body.addClass('no-touch');
			if (utils.isIe8()) {
				body.removeClass('standardVersion').addClass('ie8Version');
			}
			else if (utils.isIe9()) {
				body.removeClass('standardVersion').addClass('ie9Version');
			}
			else if (utils.isIe10()) {
				body.removeClass('standardVersion').addClass('ie10Version');
			}
			else if (utils.isMacVersion()) {
				body.removeClass('standardVersion').addClass('macVersion');
			}
			else {
				// Body already has this class
				// body.addClass('standardVersion');
			}
		}
	};

	return init();
});

define('modules/browser-resize',["jquery", "app/p2p", "underscore"], function ($, p2p, _) {

	var $window = $(window),
		$body = $("body"),
		sizes = [1184, 897, 448],
		minWidth = 1024,
		namedSizes = ["wide", "normal", "small"],
		gricColCounts = [5, 4, 3],
		gridColCount,
		timeout,
		normalizeBrowserSize,
		handleResize,
		data = { width: 0 },
		oldData,
		bodyData = {};

	p2p.cons.add("BROWSER_RESIZED", "browser-resized");
	p2p.cons.add("BROWSER_RESIZED_HEIGHT", "browser-resized-height");

	normalizeBrowserSize = function () {
		p2p.log("browser-resize: normalizeBrowserSize");

		var newWidth = Math.max($window.width(), minWidth),
			index = 0,
			length = sizes.length,
			hasLeftNav = ($body.find("#leftNavBar").length > 0),
			bodyData;

		p2p.log("Window width: " + newWidth);

		// IE8 doesn't support min-width in CSS, so must do thru code.
		// Other browsers use layout.less style: body.p2p-page { min-width: 1024px; }
		if (navigator.userAgent.match(/MSIE 8.0/i) !== null) {
			$body.width(newWidth);
		}

		_(sizes).each(function (size, idx) {
			if (newWidth < size) {
				index++;
			}
		});

		if (index >= length) {
			index = length - 1;
		}

		// How many columns are we showing
		gridColCount = gricColCounts[index];
		if (hasLeftNav) {
			gridColCount -= 1;
		}

		bodyData = {
			size: namedSizes[index],
			width: newWidth,
			hasLeftNav: hasLeftNav,
			gridColCount: gridColCount,
			resize: handleResize
		};

		// Clear old classes
		var i;
		for (i = 0; i < length; i++) {
			if (i != index) {
				$body.removeClass("size-" + namedSizes[i] + " width-" + sizes[i]);
			}
		}

		// Add a class to tell us the number of columns
		for (i = 2; i <= 5; i++) {
			if (i != gridColCount) {
				$body.removeClass("gridcols-" + i);
			}
		}
		$body.addClass("gridcols-" + gridColCount);

		// Add the new
		$body.addClass("size-" + bodyData.size + " width-" + sizes[index]);
		// Also add data-attributes to make it easily accessible
		$body.data("size", bodyData.size)
			.data("width", bodyData.width);

		return bodyData;
	};

	handleResize = function () {
		p2p.log("browser-resize: handleResize");

		oldData = _.clone(data);
		data = normalizeBrowserSize();

		if (typeof setCurrentSnapPoint == "function") {
			setCurrentSnapPoint();
		}

		// We only trigger the new size if there was a change in width
		if (oldData.width !== data.width) {
			p2p.publish(p2p.cons.BROWSER_RESIZED, data);
		} else {
			p2p.publish(p2p.cons.BROWSER_RESIZED_HEIGHT, data);
		}
	};

	$window.on("resize", function () {
		p2p.log("browser-resize: event-resize");
		// let's delay the triggering of the browser-resize event
		clearTimeout(timeout);
		timeout = setTimeout(handleResize, 80);
	});

	// bodyData = normalizeBrowserSize();
	bodyData.resize = handleResize;

	return bodyData;
});

/*jshint evil: true*/ // We need to have this as true, we need to use eval here
define('modules/cartService',["jquery", "app/p2p", "modules/baseModule"], function ($, p2p, BaseModule) {

	var cartService;

	cartService = {
		settings: {
			addedToCartControl: "miniCart"
		},

		initialCartContents : {},

		init: function () {
			this.platform.cons.add("ADD_TO_CART", "ADD_TO_CART");
			this.platform.cons.add("ADD_TO_CART_STARTED", "ADD_TO_CART_STARTED");
			this.platform.cons.add("ADD_TO_CART_REDIRECTING", "ADD_TO_CART_REDIRECTING");
			this.platform.cons.add("ADD_TO_CART_SUCCESS", "ADD_TO_CART_SUCCESS");
			this.platform.cons.add("GET_CART_CONTENTS_SUCCESS", "GET_CART_CONTENTS_SUCCESS");
			this.platform.cons.add("LOADED", "window-loaded");

			// ACo We are using the global variable set in p2p-globalParameters.jspf
			// This was done because we couldn't get the value to pass in before the
			// variable definition
			if (typeof addedToCartControl != "undefined" && addedToCartControl !== "") {
				this.settings.addedToCartControl = addedToCartControl;
			}

			this.log("Using " + this.settings.addedToCartControl);

			
			// ACo We no longer need to create it ourserlves
			/*
			$('#CartUpdateQuantity .quantity a').click(function() {
				cartService.removeFromCart($(this));
			});
			*/
			

			//Update cart events
			this.initialCartContents = this.startCartContents();
			var cartService = this;
			$('#CartUpdateQuantity').submit(function() {
				var contents = cartService.startCartContents();

				$.each(contents, function(key, value){
					var oldVal = cartService.initialCartContents[key];
					if(oldVal != value){
						if(oldVal > value){
							cartService.sendPixelEvent($('input[name="' + key + '"]'), "remove");
						}
						else{
							cartService.sendPixelEvent($('input[name="' + key + '"]'), "add");
						}
					}
				});
			});

		},

		cache: function () {
		},

		bind: function () {
			this.subscribe(this.platform.cons.ADD_TO_CART, this.addToCart);
			this.subscribe(this.platform.cons.LOADED, this.requestCurrentQuantity);
		},

		render: function () {
			//ep : cart page - fired when + or - for cross sell products
			$("#cart-contents .add-to-bag, #bbw.checkout .add-to-bag").addToBag();
			//ep : disable binding on the click event by addtobag.js
			$("#cart-contents .atb-button, #bbw.checkout .atb-button").off("click");
		},

		startCartContents: function() {

			var contents = {};

			$.each($('#CartUpdateQuantity .quantity input'), function(){
				contents[$(this).attr('name')] = $(this).val();
			});

			return contents;
		},

		sendPixelEvent: function(element, type){
			
			var prod = {};
			var row = element.parents('tr');

			var dd = row.find('.product-details dd');
			if(dd.length > 0){
				prod.productId = dd.last().text();
			}
			var removeLink = row.find('.quantity a');
			var hrefSplit = removeLink.attr('href').split("'");
			if(hrefSplit != null && hrefSplit.length > 2){
				prod.skuId = hrefSplit[1];
			}
			else {
				prod.skuId = prod.productId;
			}

			var title = row.find('.product-details h4 a');
			if(title.length > 0){
				prod.title = title.text().trim();
			}

			var discountPrice = row.find('.discountedPrice');
			if(discountPrice.length > 0){
				prod.price = discountPrice.text().trim();
			}
			else {
				prod.price = '';
			}

			if(typeof BrTrk != 'undefined'){
				BrTrk.getTracker().logEvent(
					'Cart', 
					type, 
					{
						'prod_id':prod.productId, 
						'sku':prod.skuId, 
						'prod_color':prod.color, 
						'prod_name':prod.title
					}, 
					{
						'price':prod.basePrice, 
						'sale_price':prod.price
					}
				);
			}
		},

		// ACo no longer needed
		/*
		removeFromCart: function (removeLink) {

			sendPixelEvent(removeLink, "remove");
			return;

			// Old code

			var prod = {};
			var row = removeLink.parents('tr');

			var dd = row.find('.product-details dd');
			if(dd.length > 0){
				prod.productId = dd.last().text();
			}
			var hrefSplit = removeLink.attr('href').split("'");
			if(hrefSplit != null && hrefSplit.length == 3){
				prod.skuId = hrefSplit[1];
			}
			else {
				prod.skuId = prod.productId;
			}

			var title = row.find('.product-details h4 a');
			if(title.length > 0){
				prod.title = title.text().trim();
			}

			var discountPrice = row.find('.discountedPrice');
			if(discountPrice.length > 0){
				prod.price = discountPrice.text().trim();
			}
			else {
				prod.price = '';
			}

			if(typeof BrTrk != 'undefined'){
				BrTrk.getTracker().logEvent(
					'Cart', 
					'remove', 
					{
						'prod_id':prod.productId, 
						'sku':prod.skuId, 
						'prod_color':prod.color, 
						'prod_name':prod.title
					}, 
					{
						'price':prod.basePrice, 
						'sale_price':prod.price
					}
				);
			}
		},

		*/

		addToCart: function (event, data) {
			// Let the cart control know that an item is being added (not addded yet)
			this.publish(this.platform.cons.ADD_TO_CART_STARTED,
				{
					addedToCartControl: this.settings.addedToCartControl
				});

			// Parse the form to prepare the ajax request
			var formObject = data.formObject,
				expressShop = data.expressShop,
				pageType = data.pageType;

			
			var shoppingCartLoct = $(formObject).find('[name=shoppingCartLoct]').val();

			if (data.expressShop) {
				var prod_id = $(formObject).find('[name=prod_id]').val();
				var source = $('#pageType').val();
				cmCreateConversionEventTag('Express Shop', '2', 'Shopping Bag', '30', prod_id + '-_-' + source);


			 if(shoppingCartLoct != 'undefined'){
			   shoppingCartLoct = 'SHOPPING BAG:Add Express'
			 }
			}

			
			 if(shoppingCartLoct != 'undefined'){
			   cmCreatePageviewTag(shoppingCartLoct,null,"SHOPPING BAG",null,null,null);
			 }

			var url = $(formObject).attr("action");
			url = url.replace("index", "ajax");
			$(formObject).find("input[name='async']").attr("value", "true");
			var cart = null;

			//---- need to clean up parametric data
			var prodCmAdditionalAttrib = $(formObject).find('[name=prodCmAdditionalAttrib]');
			if (prodCmAdditionalAttrib.length == 1 && typeof(prodCmAdditionalAttrib.val()) != 'undefined') {
				var prodId = $(formObject).find('[name=prod_id]').val();
				var splits_prodCmAdditionalAttrib = prodCmAdditionalAttrib.val().split("_");
				for (var splitId in splits_prodCmAdditionalAttrib) {
					var split = splits_prodCmAdditionalAttrib[splitId];
					var allowWrite = true;

					if (typeof(bvGlobal) == 'undefined' || bvGlobal == null) {
						bvGlobal = {};
					}

					if (typeof(bvGlobal[prodId]) == 'undefined' || bvGlobal[prodId] == null) {
						bvGlobal[prodId] = {
							gsibvReviewCount: 'null',
							gsibvAvgRating: 'null',
							gsibvBuyAgainPercent: 'null'
						};
					}

					if (allowWrite) {
						if (splitId == 2 && bvGlobal[prodId].gsibvReviewCount != null) {
							prodCmAdditionalAttrib.val(prodCmAdditionalAttrib.val().replace(split, "-" + bvGlobal[prodId].gsibvReviewCount + "-"));
						} else if (splitId == 3 && bvGlobal[prodId].gsibvAvgRating != null) {
							prodCmAdditionalAttrib.val(prodCmAdditionalAttrib.val().replace(split, "-" + bvGlobal[prodId].gsibvAvgRating + "-"));
						} else if (splitId == 4 && bvGlobal[prodId].gsibvBuyAgainPercent != null) {
							prodCmAdditionalAttrib.val(prodCmAdditionalAttrib.val().replace(split, "-" + bvGlobal[prodId].gsibvBuyAgainPercent + "-"));
						}
					}
				}
			}
			//----
			var formData = $(formObject).serializeArray();

			$.ajax({
				type: 'POST',
				url: '/debugger.jsp',
				data: formData
			});

			var cartService = this;
			$.ajax({
				type: 'POST',
				url: url,
				data: formData,
				error: function (request, stat, err) {
					jQuery.debug(request.statusText);
					jQuery.debug(request.responseText);
					jQuery.debug(stat);
					jQuery.debug(err);
				},
				success: function (data) {
					cartService.addToCartComplete(data, { formObject: formObject, expressShop: expressShop, pageType: pageType });
				}
			});
		},

		addToCartComplete: function (data, extraData) {
			var cart = {};
			cart = eval("(" + data + ")");  // TODO - Find a way to get valid JSON and avoid this!
			if (cart.rdir) {
				if (typeof(cart.rdir_msg) != 'undefined') {
					this.publish(this.platform.cons.ADD_TO_CART_REDIRECTING,
						{
							addedToCartControl: this.settings.addedToCartControl,
							message: cart.rdir_msg
						});
				}
				window.location.href = cart.rdir;
			} else {
				this.publish(this.platform.cons.ADD_TO_CART_SUCCESS,
					{
						addedToCartControl: this.settings.addedToCartControl,
						cart: cart,
						formObject: extraData.formObject,
						expressShop: extraData.expressShop,
						pageType: extraData.pageType
					});
			}
		},

		requestCurrentQuantity: function () {
			$.ajax({
				url: "/cartHandler/p2p-allItems.jsp",
				cache: false
			}).done(this.updateQuantity)
				.fail(this.handleGetCartContentsError);
		},

		updateQuantity: function (data) {
			data = eval("(" + data + ")");
			$("#cart-count").text(data.itemCount);
		},

		requestCartContents: function () {
			$.ajax({
				url: "/cartHandler/p2p-allItems.jsp",
				cache: false
			}).done(this.getCartContentsComplete)
				.fail(this.handleGetCartContentsError);
		},

		handleGetCartContentsError: function (xhr, textStatus) {
			this.log("Request failed: " + textStatus);
		},

		getCartContentsComplete: function (data) {
			var publishData = {
				cartContents: eval("(" + data + ")") // TODO - Find a way to get valid JSON and avoid this!
			};
			this.publish(this.platform.cons.GET_CART_CONTENTS_SUCCESS, publishData);
		}

	};

	return p2p.add("cartService", cartService, BaseModule);
});
/* global define */
define('modules/cms-blocks',["app/p2p", "modules/baseModule", "jquery"], function (p2p, baseModule, $) {

	var cmsBlocks;

	cmsBlocks = {

		init: function () {
			this.platform.cons.add("CMS_BLOCKS_GRID", "cms-blocks-grid");
		},

		cache: function () {
			this.$cmsBlocksContainer = $("#bbw_cms_family_grid");
			if ($('body.stackedCategory').length > 0) {
				this.$cmsBlocksContainer = $("#bbw_cms_story_collection");
			}
		},

		render: function () {
			this._getCmsBlocks();
		},

		_getCmsBlocks: function () {
			var cmsBlocks = [],
				self = this;

			if (this.$cmsBlocksContainer && this.$cmsBlocksContainer.children().length > 0) {
				this.$cmsBlocksContainer.find("> div").each(function () {
					var data = $(this).attr("id");
					cmsBlocks.push({
						content: $(this),
						row: self.getValue(data, "row"),
						col: self.getValue(data, "col"),
						span: self.getValue(data, "span"),
						category: self.getValue(data, "categoryId-")
					});
				});

				this.publish(this.platform.cons.CMS_BLOCKS_GRID, cmsBlocks);
			} else {
				this.publish(this.platform.cons.CMS_BLOCKS_GRID, []);
			}
		},

		getValue: function (data, fieldName) {
			var fields = [];
			if (!data) {
				return 0;
			}

			if (fieldName !== "categoryId-") {
				fields = data.split("-");
			} else {
				fields.push(data);
			}

			for (var i = 0, ii = fields.length; i < ii; i++) {
				if (fields[i].indexOf(fieldName) >= 0) {
					var value = fields[i].slice(fieldName.length - fields[i].length);
					return parseInt(value, 10);
				}
			}
			return 0;
		}
	};

	return p2p.add("cmsBlocks", cmsBlocks, baseModule);
});
define('modules/coreMetricsP2P',["app/p2p", "modules/baseModule", "jquery"], function (p2p, BaseModule, $) {
	var coreMetrics;

	coreMetrics = {
		settings: {
			enabled: true
		},

		init: function () {
			this.platform.cons.add("Create_Pageview_Tag", "Create_Pageview_Tag");
			this.platform.cons.add("Create_Element_Tag", "Create_Element_Tag");
			this.platform.cons.add("Create_PageElement_Tag", "Create_PageElement_Tag");
			this.platform.cons.add("Create_ConversionEvent_Tag", "Create_ConversionEvent_Tag");
		},

		cache: function () {
		},

		bind: function () {
			this.subscribe(this.platform.cons.Create_Pageview_Tag, this.Create_Pageview_Tag);
			this.subscribe(this.platform.cons.Create_Element_Tag, this.Create_Element_Tag);
			this.subscribe(this.platform.cons.Create_PageElement_Tag, this.Create_PageElement_Tag);
			this.subscribe(this.platform.cons.Create_ConversionEvent_Tag, this.Create_ConversionEvent_Tag);
		},

		Create_Pageview_Tag: function (event, data) {
			var searchResultData = data.searchData || {};
			var cmtag = new window.CMTagGenerator(null, null, data.categoryId, data.categoryName, null, null, null, searchResultData, data.optData);
			var fn = cmtag[data.method];
			fn.apply(cmtag);
		},

		Create_Element_Tag: function (event, data) {
			cmCreateElementTag(data.elementID, data.elementCategory, data.attributes);
		},

		Create_PageElement_Tag: function (event, data) {
			cmCreatePageElementTag(data.elementID || "", data.elementCategory || "", data.pageID || "", data.pageCategoryID || "", data.elementLocation || "", data.attributes || "");
		},

		Create_ConversionEvent_Tag: function (event, data) {
			cmCreateConversionEventTag(data.eventID || "", data.actionType || "", data.categoryID || "", data.points || "", data.attributes || "");
		}
	};

	return p2p.add("coreMetrics", coreMetrics, BaseModule);
});
/* global define */
/* global ess */
define('modules/dropdown',["jquery", "modules/utils"], function ($, utils) {

	$.fn.dropdown = function (options) {

		var settings = $.extend({}, $.fn.dropdown.defaults, options);

		return this.each(function () {

			var toggleDropdown = function (event) {
				event.preventDefault();
				if (!toggleButton.hasClass(settings.activeClass)) {
					showDropdown();
				} else {
					hideDropdown();
				}
			};

			var mouseOver = function (event) {
				if (timerMouseOut) {
					clearTimeout(timerMouseOut);
					timerMouseOut = false;
				}
			};

			var mouseOut = function (event) {
				if (toggleButton.hasClass(settings.activeClass)) {
					timerMouseOut = setTimeout(hideDropdown, settings.hoverTimeout);
				}
			};

			var showDropdown = function () {
				toggleButton.addClass(settings.activeClass);
				dataList.slideDown(settings.slideDuration)
					.css("z-index", 99);
			};

			var hideDropdown = function () {
				dataList.slideUp(settings.slideDuration);
				toggleButton.removeClass(settings.activeClass);
			};

			var elementClicked = function (event) {
				event.preventDefault();
				console.log("elementClicked", event);
				var text = $(event.currentTarget).text();
				var val = utils.getDataOrClass($(event.currentTarget).parent(), 'value');
				$this.find(".dropdown-value").val(val);
				$this.find('.current-selection').text(text);
				hideDropdown();
			};

			var toggleButton = $(settings.toggleButtonClass, this),
				dataList = $(settings.dataListClass, this),
				timerMouseOut,
				$this = $(this);

			toggleButton.on(settings.onEvent, toggleDropdown);
			//var hiddenField = utils.getDataOrClass($(this), 'hiddenfield');
			dataList.delegate(settings.dataListItem, "click", elementClicked);
			$(this).hover(mouseOver, mouseOut);
		});
	};

	$.fn.dropdown.defaults = {
		toggleButtonClass: ".dropdown-button",  // The element that toggles the dropdown
		dataListClass: ".dropdown-list",    // List of values
		slideDuration: 150,           // Animation duration
		hoverTimeout: 300,            // Time to wait before closing the dropdown
		activeClass: "active",          // Class to apply into $container when the dropdown is expanded
		onEvent: "click",           // The event to respond to
		dataListItem: "a"           // Items in the data list
	};

});

define('tpl/dynamic_cart_all',['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"product\">\n			<input id=\"cartItemMap";
  if (stack1 = helpers.uniqueLineId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.uniqueLineId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ".quantity\" name=\"cartItemMap[";
  if (stack1 = helpers.uniqueLineId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.uniqueLineId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "].quantity\" type=\"hidden\" value=\"";
  if (stack1 = helpers.qty) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.qty); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n			<div class=\"image\">\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.colorThumbnail), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"item-detail\">\n				<div class=\"top\">\n					<div class=\"fragrance\">";
  if (stack1 = helpers.fragrance) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.fragrance); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n					<div class=\"name\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n					";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.size), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					<div class=\"qty\">Qty: ";
  if (stack1 = helpers.qty) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.qty); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n					<div class=\"price\">\n						<span class=\"";
  if (stack1 = helpers.oldPriceClass) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.oldPriceClass); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.basePrice) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.basePrice); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n						";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.newPrice), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n					<div class=\"promo\">";
  if (stack1 = helpers.promo) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.promo); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n				</div>\n			</div>\n		</div>\n		";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<img src=\"";
  if (stack1 = helpers.colorThumbnail) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.colorThumbnail); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n				";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"size\">";
  if (stack1 = helpers.size) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.size); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"";
  if (stack1 = helpers.newPriceClass) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.newPriceClass); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.newPrice) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.newPrice); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div id=\"dynamicCartPromtionSummary\">\n	<span>You&rsquo;ll be getting ";
  if (stack1 = helpers.totalFreeProduct) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.totalFreeProduct); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " Free item(s) in your order!</span>  <!--TODO: proper summary or hide -->\n</div>\n";
  return buffer;
  }

  buffer += "<div id=\"dynamicCartHeading\">\n	<h5>";
  if (stack1 = helpers.itemCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.itemCount); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " Items In Your Bag</h5>\n	<a href=\"/cart/index.jsp\" class=\"dcCoreMetric\" data-cm=\"View & Edit Bag\">View &amp; Edit Bag</a>\n</div>\n<form name=\"formDynamicCart\" id=\"formDynamicCart\" action=\"/cart/updatecartquantity.jsp\" method=\"post\">\n	<input name=\"ecscheckout\" id=\"ecscheckoutField\" type=\"hidden\" value=\"\">\n	<input name=\"checkout\" id=\"checkoutField\" type=\"hidden\" value=\"\">\n	<div id=\"dynamicCartBody\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.products), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n</form>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.totalFreeProduct), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  })

});
define('tpl/dynamic_single_atb',['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"product\">\n		<div class=\"image\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.colorThumbnail), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n		<div class=\"item-detail\">\n			<div class=\"top\">\n				<div class=\"fragrance\">";
  if (stack1 = helpers.color) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.color); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n				<div class=\"name\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.size), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<div class=\"qty\">Qty: ";
  if (stack1 = helpers.qty) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.qty); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n				<div class=\"price\">\n					<span>";
  if (stack1 = helpers.calculatedPrice) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.calculatedPrice); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n				</div>\n				<div class=\"promo\">";
  if (stack1 = helpers.promo) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.promo); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n			</div>\n		</div>\n	</div>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<img src=\"";
  if (stack1 = helpers.colorThumbnail) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.colorThumbnail); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n			";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"size\">";
  if (stack1 = helpers.size) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.size); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  }

  buffer += "<div id=\"dynamicCartHeading\">\n	<h5>Added To Your Bag!</h5>\n	<a href=\"/cart/index.jsp\">View &amp; Edit Bag</a>\n</div>\n<div id=\"dynamicCartBody\">\n\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.products), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</div>\n";
  return buffer;
  })

});
/* global define */
/* global bvGlobal */
/* global cmCreateShopAction5Tag */
/* global cmDisplayShop5s */
define('modules/dynamicCart',[
	"app/p2p",
	"modules/baseModule",
	"jquery",
	"underscore",
	"tpl/dynamic_cart_all",
	"tpl/dynamic_single_atb"
], function (p2p, BaseModule, $, _, tplDynamicCartAll, tplSingleAtb) {

	var dynamicCart,
		hideTimeout,
		addingToCart = false;

	dynamicCart = {
		settings: {
			afterAddTimeToHide: 5000
		},

		init: function () {
			this.platform.cons.add("ADD_TO_CART_STARTED", "ADD_TO_CART_STARTED");
			this.platform.cons.add("ADD_TO_CART_REDIRECTING", "ADD_TO_CART_REDIRECTING");
			this.platform.cons.add("ADD_TO_CART_SUCCESS", "ADD_TO_CART_SUCCESS");
			this.platform.cons.add("GET_CART_CONTENTS_SUCCESS", "GET_CART_CONTENTS_SUCCESS");
			this.platform.cons.add("BROWSER_RESIZED_HEIGHT", "browser-resized-height");
		},

		cache: function () {
			this.cartElement = $("#dynamicCart");
			this.paypalButton = $("#dynamicCartPaypal");
		},

		bind: function () {
			var self = this;

			// Disabled PayPal button submitting the form as BBW requested the button to go to the cart.
			// this.paypalButton.on("click", this.paypalCheckout);

			this.subscribe(this.platform.cons.ADD_TO_CART_STARTED, this.addToCartStarted);
			this.subscribe(this.platform.cons.ADD_TO_CART_REDIRECTING, this.addToCartRedirecting);
			this.subscribe(this.platform.cons.ADD_TO_CART_SUCCESS, this.addedToCart);
			this.subscribe(this.platform.cons.GET_CART_CONTENTS_SUCCESS, this.cartContentsAvailable);
			this.subscribe(this.platform.cons.BROWSER_RESIZED_HEIGHT, this.adjustCartHeight);

			$("body").on("click", "a.util-cart-link", function (e) {
				if (p2p.modules.cartService.settings.addedToCartControl === "dynamicCart") {
					e.preventDefault();
					dynamicCart.clickHeaderCart(e);
				}
			});

			$("#dynamicCart").on("click", ".dcCoreMetric", function (e) {
				self.coreMetrics({"eventID": "Trigger", "actionType": 2, "categoryID": "Dynamic Cart", "points": 10, "attributes": "-_--_-" + $(e.currentTarget).attr("data-cm")});
			});

			$("body").on("click", function () {
				if (self.cartElement.is(":visible") && !self.cartElement.is(":animated") && addingToCart === false) {
					self.hideDynamicCart();
				}
			});

			$("#dynamicCart").on("click", function (event) {
				event.stopPropagation();
			});
			$("#dynamicCart").on("mousemove", function () {
				clearTimeout(hideTimeout);
			});
		},

		render: function () {
			this.adjustCartHeight();
		},

		adjustCartHeight: function (secondpass) {
			var windowHeight = $(window).height();

			this.cartElement.removeClass("show-one show-two");

			if (windowHeight <= 580) { // minimum size to display 2 products
				this.cartElement.addClass("show-one");
			} else {
				if (windowHeight <= 710) { // minimum size to display 3 products
					this.cartElement.addClass("show-two");
				}
			}
		},

		paypalCheckout: function (event) {
			event.preventDefault();

			var form = $("#formDynamicCart");

			// Coremetrics
			cmCreateConversionEventTag("PayPal Express", "1", "CHECKOUT");

			// Mark that we're doing a paypal checkout
			form.find("#ecscheckoutField").val("Y");

			// Submit the form
			form.submit();
		},

		addToCartStarted: function (event, data) {
			// An ajax call is about to be made to add an item to the cart
			// Display the dyynamiccart pop-up while this happens
			if (data.addedToCartControl == "dynamicCart") {
				clearTimeout(hideTimeout);
				addingToCart = true;
				this.showCartLoading();
			}
		},

		addToCartRedirecting: function (event, data) {
			// After adding to cart, a redirect has been initiated
			// Display a message
			if (data.addedToCartControl == "miniCart") {
				$('#dynamicCartLoading')
					.html("<div class='mini-cart-add-error'>" + data.cart.rdir_msg + '</div>');
			}
		},

		addedToCart: function (event, data) {
			if (data.addedToCartControl == "dynamicCart") {
				this.cartElement.find("#dynamicCartFooter p").not(".subtotal").hide();
				this.paypalButton.hide();
				this.showDynamicCartLatest(data);
			}
		},

		cartContentsAvailable: function (event, data) {
			var cartContents = data.cartContents;
			this.hideCartLoading();
			this.showDynamicCartAll(cartContents);
		},

		clickHeaderCart: function () {
			var cartElement = $("#dynamicCart");
			if (cartElement.is(":visible")) {
				this.hideDynamicCart();
			} else {
				this.showCartLoading();
				p2p.modules.cartService.requestCartContents();
				this.coreMetrics({"eventID": "Trigger", "actionType": 1, "categoryID": "Dynamic Cart", "points": 10});
			}
		},

		hideDynamicCart: function () {
			var cartElement = $("#dynamicCart");
			cartElement.slideUp();
			$("a.util-cart-link").removeClass("active");
		},

		showDynamicCart: function () {
			var cartElement = $("#dynamicCart");
			var paypalButton = $("#dynamicCartPaypal");
			if (!cartElement.is(":visible")) {
				cartElement.find("#dynamicCartFooter p").not(".subtotal").show();
				paypalButton.show();
				cartElement.slideDown();
			}
			$("a.util-cart-link").addClass("active");
		},

		showCartLoading: function () {
			var cartElement = $("#dynamicCart");
			cartElement.addClass("loading");
			this.showDynamicCart();
		},

		hideCartLoading: function () {
			var cartElement = $("#dynamicCart");
			cartElement.removeClass("loading");
		},

		showDynamicCartAll: function (cartContents) {
			// var tplDynamicCartAll = handlebars.compile($("#dynamicCartAllTemplate").html());
			// Check the new and old price

			// Update cart-count
			$("#cart-count").text(cartContents.itemCount);

			_(cartContents.products).each(function (product) {
				product.newPrice = false;

				var sku = product.skus[product.skuId];

				if (product.availableColors && product.availableColors[sku.colorId] && product.availableColors[sku.colorId].mainImageURL) {
					product.colorThumbnail = product.availableColors[sku.colorId].mainImageURL;
				} else {
					product.colorThumbnail = product.mainImageURL;
				}

				if (product.rawDiscountedPrice === 0) {
					product.newPrice = "FREE";
					product.newPriceClass = "free";
					product.oldPriceClass = "old";
				} else {
					if (Number(product.rawPrice) < Number(product.rawBasePrice)) {
						product.newPrice = product.price;
						product.newPriceClass = "new";
						product.oldPriceClass = "old";
					}
				}
			});

			var html = tplDynamicCartAll(cartContents);
			$("#dynamicCartContent").html(html);
			$("#dynamicCartFooter .subtotalValue").html(cartContents.itemTotValue.replace(/\s/g, ''));
			this.hideCartLoading();
			this.showDynamicCart();

			this.cartElement.find("#dynamicCartBody")
				.off("mousewheel DOMMouseScroll", this.scrollCartBody)
				.on("mousewheel DOMMouseScroll", this.scrollCartBody);
		},

		showDynamicCartLatest: function (data) {
			var cart = data.cart,
				formObject = data.formObject,
				products = [];

			// Update cart-count
			$("#cart-count").text(data.cart.itemCount);

			for (var prodId in cart.productsAdded) {
				var prod = cart.productsAdded[prodId],
					sku = prod.skus[prod.skuId];

				if (prod.availableColors && prod.availableColors[sku.colorId] && prod.availableColors[sku.colorId].mainImageURL) {
					prod.colorThumbnail = prod.availableColors[sku.colorId].mainImageURL;
				} else {
					prod.colorThumbnail = prod.mainImageURL;
				}

				if (sku.price) {
					prod.calculatedPrice = sku.price;
				} else {
					prod.calculatedPrice = prod.price;
				}

				prod.color = sku.color;
				prod.size = sku.size;

				products.push(prod);

				var prodCmAdditionalAttrib = $(formObject).find('[name=prodCmAdditionalAttrib]');
				if (prodCmAdditionalAttrib.length != 1) {
					prodCmAdditionalAttrib = $(formObject).find('[name=prodCmAdditionalAttrib' + prod.productId + ']');
				}

				if (typeof(prodCmAdditionalAttrib.val()) != 'undefined') {
					var splits_prodCmAdditionalAttrib = prodCmAdditionalAttrib.val().split("_");
					for (var splitId in splits_prodCmAdditionalAttrib) {
						var split = splits_prodCmAdditionalAttrib[splitId];
						if (typeof(bvGlobal) != 'undefined' && bvGlobal != null && typeof(bvGlobal[sku.prod_id]) != 'undefined' && bvGlobal[sku.prod_id] != null) {
							if (splitId == 2 && bvGlobal[sku.prod_id].gsibvReviewCount != null) {
								splits_prodCmAdditionalAttrib[splitId] = "-" + bvGlobal[sku.prod_id].gsibvReviewCount + "-";
							} else if (splitId == 3 && bvGlobal[sku.prod_id].gsibvAvgRating != null) {
								splits_prodCmAdditionalAttrib[splitId] = "-" + bvGlobal[sku.prod_id].gsibvAvgRating + "-";
							} else if (splitId == 4 && bvGlobal[sku.prod_id].gsibvBuyAgainPercent != null) {
								splits_prodCmAdditionalAttrib[splitId] = "-" + bvGlobal[sku.prod_id].gsibvBuyAgainPercent + "-";
							}
						}

						if (splitId == 8) {
							splits_prodCmAdditionalAttrib[splitId] = "-" + prod.size + "-";
						}
						if (splitId == 7) {
							splits_prodCmAdditionalAttrib[splitId] = "-" + prod.color + "-";
						}
						if (splitId == 10) {
							splits_prodCmAdditionalAttrib[splitId] = "-" + prod.qty + "-";
						}
					}

					prodCmAdditionalAttrib.val(splits_prodCmAdditionalAttrib.join('_'));
				}

				var categoryid = $(formObject).find('[name=categoryid]');
				var prefix = (data.expressShop === true) ? "EXPRESS:" : "";

				var throwProductViewTag;
				if (prodCmAdditionalAttrib != 'undefined') {
					var prodCmAdditionalAttribfinal = prodCmAdditionalAttrib.val();
					cmCreateShopAction5Tag(prod.productId, prod.title, prod.qty, prod.price, prefix + categoryid.val(), prodCmAdditionalAttribfinal);
					throwProductViewTag = (data.expressShop === false) && (data.pageType === "family" || data.pageType === "category" || data.pageType === "search");
					if (throwProductViewTag) {
						cmCreateProductviewTag(prod.productId, prod.title, prefix + categoryid.val(), null, null, null, null, 'N', 'Y', null, null, prodCmAdditionalAttribfinal);
					}
				} else {
					cmCreateShopAction5Tag(prod.productId, prod.title, prod.qty, prod.price, prefix + categoryid.val());
					throwProductViewTag = (data.expressShop === false) && (data.pageType === "family" || data.pageType === "category" || data.pageType === "search");
					if (throwProductViewTag) {
						cmCreateProductviewTag(prod.productId, prod.title, prefix + categoryid.val(), null, null, null, null, 'N', 'Y', null, null, null);
					}
				}

				cmDisplayShop5s();
			}

			cart.products = products;
			// var dynamicCartLatestTemplate = handlebars.compile($("#dynamicCartLatestTemplate").html());
			var html = tplSingleAtb(cart);
			$("#dynamicCartContent").html(html);
			$("#dynamicCartFooter .subtotalValue").html(cart.itemTotValue.replace(/\s/g, ''));

			this.hideCartLoading();
			this.showDynamicCart();

			addingToCart = false;

			// Hide the cart after 3 seconds
			hideTimeout = setTimeout(this.hideDynamicCart, this.settings.afterAddTimeToHide);

		},

		scrollCartBody: function (event) {
			var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
			this.cartElement.find("#dynamicCartBody").get(0).scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
			event.preventDefault();
		},

		coreMetrics: function (data) {
			p2p.publish(p2p.cons.Create_ConversionEvent_Tag, data);
		}
	};

	return p2p.add("dynamicCart", dynamicCart, BaseModule);
});
define('modules/stackedCategory',["app/p2p", "jquery", "modules/baseModule", "underscore"], function(p2p, $, baseModule, _){
	

	var stackedCategory;

	stackedCategory = {

		stacks: {},
		STACK_MAX_PRODUCTS: 50,
		STACK_PRODUCTS_PAGE: 28,
		pageType: "",
		useViewAll: false,

		initializeStackedCategories: function(container){
			p2p.log("initializeStackedCategories");
			this.container = container;

			if ((typeof isStackCat != 'undefined') && isStackCat) {
				this.pageType = "stack";
			} else if ((typeof isStoryCol != 'undefined') && isStoryCol) {
				this.pageType = "story";
			}

			// Check if we'll be using view all or expand/minimize
			this.container.find(".stackedCatRow").each(this.checkUseViewAll);

			// Show Expand/Minimize or View All in the buttons
			// this.changeExpandButtons();
			
			// Initialize all stacks
			_(this.container.find(".stackedCatRow")).each(this.initStack);

		},

		checkUseViewAll: function(idx, element) {
			if (parseInt($(element).find(".stackedCatRowProductCount").text(), 10) > this.STACK_MAX_PRODUCTS) {
				this.useViewAll = true;
			}
		},

		initStack: function(stackedCat) {
			stackedCat = $(stackedCat);
			var category = parseInt(stackedCat.attr("id").toLowerCase().replace('stackedcatrow-', ''), 10);
			var that = this, stack = {}, ajaxButtons;

			stack.el = stackedCat;
			stack.category = category;
			stack.recount = false; // Recount products, true when we remove the last row for being incomplete
			stack.totalProductCount = parseInt(stack.el.find(".stackedCatRowProductCount").text(), 10);
			stack.productCount = stack.el.find(".product").length;
			stack.rowCount = stack.el.find(".grid-row").length;
			stack.lastRowIndex = stack.rowCount - 1;
			stack.hasLoadedAll = function() {
				return (this.productCount === this.totalProductCount);
			};

			// Usefull elements
			stack.loadMore = stack.el.find(".load-more");
			stack.loadMore.data("category", category);
			stack.expandButton = stack.el.find(".stackedCatRowHeader .stackedExpand");
			stack.expandButton.data("category", category);
			stack.minimizeButton = stack.el.find(".stackedCatDrawerMinimize");
			stack.minimizeButton.data("category", category);

			// Adjust the row, remove it or add cells to make it look good
			//this.adjustRow(stack.el.find(".grid-row").last(), stack);

			// Ajax object for this stack requests
			ajaxButtons = [stack.el.find(".stackedExpand"), stack.el.find(".load-more")];
			if (!this.useViewAll) {
				stack.ajax = new AjaxLoadMore();			
				stack.ajax.init(ajaxButtons, {
					totalProducts: stack.totalProductCount,
					skipFirst: stack.productCount,
					productsPerPage: this.STACK_PRODUCTS_PAGE,
					productCounterStart: 4,
					page: 0,
					loopType: 'medLarge',
					beforeClick: this._beforeClick,
					handleSuccess: function(data){
						that.handleLoadMoreSuccess(data, stack);
					},
					handleError: function(data){
						that.handleLoadMoreError(data, stack);
					},
					overwriteParameters: { 
						'pageType': this.pageType, 
						'categoryId': stack.category, 
						'showAddToBag': showAddToBag
					},
					setWaitCursor: true
				});
			}
			
			this.stacks[category] = stack;

			var stackedCatDrawerMinimize = $('.stackedCatDrawerMinimize', stack.el);
			var thisVar = this;
			stackedCatDrawerMinimize.click(function (ev) {
				ev.preventDefault();
				thisVar.animateDrawerUp(stack);
			}).hover(function () {
				$(this).parent().find('.stackedCatDrawerLine').toggleClass('hover');
			});;
		},

		adjustRow: function(lastRow, stack) {
			p2p.log("adjustRow");
			if (lastRow.find("> div").length < 4) {

				// if we have more than 4 products, we need to adjust (or not) the last column
				if (stack.totalProductCount > stack.productCount) {
					// If we have more products to be loaded, just remove the last lastRow
					this.log("Removing " + lastRow.find(".product").length + " product(s)");

					lastRow.remove();

					// update product and row count
					stack.productCount = stack.el.find(".product").length;
					stack.rowCount = stack.el.find(".grid-row").length;
					stack.lastRowIndex = stack.rowCount - 1;
				} else {
					// If we actually don't have any more products, append the missing cells to make it look pretty
					var toAppend = [];
					for (var i = lastRow.find("> div").length; i < 4; i++) {
						toAppend.push('<div class="one column paddingcell"></div>');
					}
					lastRow.append(toAppend.join(""));
				}

			}

			// we have less than or 4 products, the expand button won't do anything
			if (stack.totalProductCount <= 4) {
				stack.expandButton.addClass("greyedOut");
			}
		},

		changeExpandButtons: function(){
			if (this.useViewAll) {
				this.container.find(".stackedCatRowHeader .stackedExpand").addClass("use-view-all");
			} else {
				this.container.find(".stackedCatRowHeader .stackedExpand").addClass("use-expand");
			}
		},

		animateDrawerUp: function(stack){
			this.toggleMinimizeButton(stack.el, false);
			stack.expandButton.removeClass("open active");
			var firstHeight = stack.el.data('firstHeight');
			var fixedHeight = $('#fixedHeaderBlock').height();
			stack.el.animate({ height: firstHeight + 'px' }, {
				duration: 500,
				complete: function () {
					stack.el.find(".grid-row:gt(0)").addClass("hideThis");
					$(this).css('height', '');
					stack.loadMore.hide();
				},
				progress: function (anim, progress) {
					// While we collapse the stacked cat, we also animate the window scroll
					var currentScrollTop = $("body").scrollTop();
					var diff = currentScrollTop - (stack.el.position().top + fixedHeight - 60);
					var newScrollTop = currentScrollTop - (diff * progress);

					if (newScrollTop < currentScrollTop) {
						$("body").scrollTop(newScrollTop);
					}
				}
			});
		},

		_beforeClick: function (event) {
			// change from expand <-> minimize if not using view all
			// if we loaded products before, don't load when clicking expand, just when using load more
			// if at end of product list, don't load more, else do it
			var currentTarget = $(event.currentTarget);
			var stack = this.stacks[currentTarget.data("category")];

			if (currentTarget.hasClass("stackedExpand") && this.useViewAll === true) {
				return true;
			}

			event.preventDefault();

			// if the button is greyedOut, then we don't do anything
			if (stack.expandButton.hasClass("greyedOut")) {
				return false;
			}

			// which status is the stack in? (active = open)
			if (stack.expandButton.hasClass("active") && currentTarget.hasClass("stackedExpand")) {
				this.animateDrawerUp(stack);
				return false;
			} else {
				if(!stack.el.hasClass('wasOpened')){
					stack.el.data('firstHeight', stack.el.height());
				}
				stack.expandButton.addClass("open active");
				stack.el.find(".grid-row:gt(0)").removeClass("hideThis");
				//stack.el.attr('style', 'height: 100%');
				//stack.el.slideDown();
				//stack.el.find(".grid-row:gt(0)").fadeIn();
				this.toggleMinimizeButton(stack.el, true);
				stack.ajax.config.loadMoreClicked = 1;
				if (stack.totalProductCount > stack.productCount){
				 	if(!currentTarget.hasClass("stackedExpand")) {
						return true;
					}
					if(stack.el.hasClass('wasOpened')){
						var gridRow = $('.grid-row', stack.el).first();
					var rowProduct = $('.column', gridRow).first();
					var fixedHeight = $('#fixedHeaderBlock').height();
					var position = rowProduct.offset().top - fixedHeight + 150;
					$('html, body').animate({ scrollTop: position}, 500);		
						stack.loadMore.show();
						return false;
					}
					else {
						return true;
					}
				}
				else {
					var gridRow = $('.grid-row', stack.el).first();
					var rowProduct = $('.column', gridRow).first();
					var fixedHeight = $('#fixedHeaderBlock').height();
					var position = rowProduct.offset().top - fixedHeight + 150;
					$('html, body').animate({ scrollTop: position}, 500);		
					return false;
				}

			}
		},

		toggleMinimizeButton: function(stackedCatRow, show) {
			var stackedCatDrawerMinimize = $('.stackedCatDrawerMinimize', stackedCatRow);
			if (show) {
				stackedCatDrawerMinimize.removeClass('hideThis');
			}
			else {
				if (!stackedCatDrawerMinimize.hasClass('hideThis')) {
					stackedCatDrawerMinimize.addClass('hideThis');
				}
			}
		},

		handleLoadMoreSuccess: function(data, stack) {
			this.log("ajax success");

			var startAt = stack.lastRowIndex;
			var newRows;

			stack.el.find(".gridview").append(data);

			newRows = stack.el.find(".grid-row:gt(" + stack.lastRowIndex + ")");

			stack.productCount = stack.el.find(".product").length;
			stack.lastRowIndex = stack.el.find(".grid-row").length - 1;

			stack.loadMore.find(".loadMoreItems").text(stack.productCount);
			stack.loadMore.find(".loadMoreTotal").text(stack.totalProductCount);

			if (stack.totalProductCount > stack.productCount) {
				stack.loadMore.show();
			} else {
				stack.loadMore.hide();
			}

			this.initializePlugins(newRows);
			this.adjustGridRowHeights(startAt, stack);

			stack.ajax.config.productCounterStart = stack.el.find(".grid-row > div").length;

			var wasOpened = stack.el.hasClass('wasOpened');
			stack.el.addClass("wasOpened");

			$('html,body').css('cursor', 'default');

			// var currentTarget = $(event.currentTarget);
			var gridRow = $('.grid-row', stack.el).first();
			var rowProduct = $('.column', gridRow).first();

			// In case it was the load more button, we get the first loaded product
			if(wasOpened){
				var counter = this.STACK_PRODUCTS_PAGE + 5;
				rowProduct = $('.counter' + counter);
			}
			var fixedHeight = $('#fixedHeaderBlock').height();
			var position = rowProduct.offset().top - fixedHeight + 150;
			$('html, body').animate({ scrollTop: position}, 500);
		},

		handleLoadMoreError: function(/*data, stack*/) {
			this.log("Ajax error");
		},

		/**
		 * Initialize plugins and required javascript to provide full page functionality
		 * @param {object} container The jQuery object that will have the products that need 
		 *													 their functionality initialized, when loading new rows, 
		 *													 this will only be the new ones
		 */
		initializePlugins: function(container) {
			container.find(".product .photo").lazyload();
			container.find("img.lazy").lazyload({
				skip_invisible : false
			});
			container.find(".product .add-to-bag").addToBag();
			container.find(".product .thumbnail").productRollover();
		},

		/**
		 * Adjust the heights of all of the grid rows
		 */
		adjustGridRowHeights: function(startAt, stack) {
			startAt = startAt || 0;
			var that = this;

			stack.el.find(".grid-row:gt(" + startAt + ")").each(function(){
				that.adjustDetailsHeight($(this));
			});
		},

		/**
		 * Adjust the height of all details in a row so they're all the same
		 * @param row
		 */
		adjustDetailsHeight: function(row){
			var maxInformationHeight = 0;
			var maxPriceHeight = 0;
			var height;
			var informationContainers;
			var priceContainers;

			p2p.startTimer("adjustDetailsHeight");

			// Reset all manually sized items so they can be re-measured
			row.find(".information,.price-atb").height("auto");

			// Find all of the information containers
			informationContainers = row[0].querySelectorAll(".information");

			// Find the biggest information container
			$.each(informationContainers, function(index, informationContainer) {
				height = informationContainer.offsetHeight;
				if (height > maxInformationHeight) {
					maxInformationHeight = height;
				}
			});

			// Find all of the price containers
			priceContainers = row[0].querySelectorAll(".price-atb");

			// Find the biggest price container
			$.each(priceContainers, function(index, priceContainer) {
				height = priceContainer.offsetHeight;
				if (height > maxPriceHeight) {
					maxPriceHeight = height;
				}
			});

			// Set the height of all of the containers to the maximum in the row
			$.each(informationContainers, function(index, informationContainer) {
				informationContainer.style.height = maxInformationHeight + "px";
			});
			$.each(priceContainers, function(index, priceContainer) {
				priceContainer.style.height = maxPriceHeight + "px";
			});

			p2p.endTimer("adjustDetailsHeight");
		}
	};

	return p2p.add("stackedCategory", stackedCategory, baseModule);

});

define('tpl/productrollover',['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"fragrance\">";
  if (stack1 = helpers.fragrance) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.fragrance); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"overview\">";
  if (stack1 = helpers.shortOverview) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.shortOverview); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	";
  return buffer;
  }

  buffer += "<div class=\"arrow\"></div>\n<div class=\"content\">\n	\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.fragrance), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.name), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.shortOverview), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</div>\n";
  return buffer;
  })

});
define('tpl/quicklook',['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"quicklook\">\n	<a href=\"#quicklook\" class=\"button-inverted\">Quick look</a>\n</div>\n";
  })

});
define('tpl/quicklookdetail',['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<div class=\"promotion\">\n				<span class=\"promo\">";
  if (stack1 = helpers.promo) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.promo); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n				<a href=\"#\">Details\n					<div class=\"promotion-detail\">\n						<div class=\"arrow\"></div>\n						";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.longtitle), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.longdescription), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n				</a>\n			</div>\n			";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<div class=\"short promo\">";
  if (stack1 = helpers.longtitle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.longtitle); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n						";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<div class=\"long\">";
  if (stack1 = helpers.longdescription) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.longdescription); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n						";
  return buffer;
  }

  buffer += "<div id=\"product-quicklook-detail\" class=\"reveal-modal\">\n<div style=\"display:none;\" id=\"atbForm\"></div>\n\n	<div class=\"content\">\n		<div class=\"image\">\n			<a href=\"";
  if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.link); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><img src=\"";
  if (stack1 = helpers.image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.image); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" /></a>\n		</div>\n\n		<div class=\"productdetails\">\n			<div class=\"fragrance\">";
  if (stack1 = helpers.fragrance) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.fragrance); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	\n			<div class=\"name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n\n			<div class=\"size\">";
  if (stack1 = helpers.size) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.size); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n\n			<div class=\"overview\">";
  if (stack1 = helpers.overview) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.overview); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	\n			<div class=\"price\">";
  if (stack1 = helpers.price) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.price); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.promo), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n			<div class=\"atb\"></div>\n\n			<div class=\"shipinfo\"></div>\n		</div>\n\n		<div class=\"view-more-details\">";
  if (stack1 = helpers.moredetailslink) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.moredetailslink); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	</div>\n\n	<a class=\"close-reveal-modal\"><span class=\"close-icon\"></span></a>\n</div>";
  return buffer;
  })

});
/*	
 *	jQuery dotdotdot 1.5.9
 *	
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

define('jquery.dotdotdot',["jquery"], function( $ )
{
	if ( $.fn.dotdotdot )
	{
		return;
	}

	$.fn.dotdotdot = function( o )
	{
		if ( this.length == 0 )
		{
			if ( !o || o.debug !== false )
			{
				debug( true, 'No element found for "' + this.selector + '".' );				
			}
			return this;
		}
		if ( this.length > 1 )
		{
			return this.each(
				function()
				{
					$(this).dotdotdot( o );
				}
			);
		}


		var $dot = this;

		if ( $dot.data( 'dotdotdot' ) )
		{
			$dot.trigger( 'destroy.dot' );
		}

		$dot.data( 'dotdotdot-style', $dot.attr( 'style' ) );
		$dot.css( 'word-wrap', 'break-word' );

		$dot.bind_events = function()
		{
			$dot.bind(
				'update.dot',
				function( e, c )
				{
					e.preventDefault();
					e.stopPropagation();

					opts.maxHeight = ( typeof opts.height == 'number' ) 
						? opts.height 
						: getTrueInnerHeight( $dot );

					opts.maxHeight += opts.tolerance;

					if ( typeof c != 'undefined' )
					{
						if ( typeof c == 'string' || c instanceof HTMLElement )
						{
					 		c = $('<div />').append( c ).contents();
						}
						if ( c instanceof $ )
						{
							orgContent = c;
						}
					}

					$inr = $dot.wrapInner( '<div class="dotdotdot" />' ).children();
					$inr.empty()
						.append( orgContent.clone( true ) )
						.css({
							'height'	: 'auto',
							'width'		: 'auto',
							'border'	: 'none',
							'padding'	: 0,
							'margin'	: 0
						});

					var after = false,
						trunc = false;

					if ( conf.afterElement )
					{
						after = conf.afterElement.clone( true );
						conf.afterElement.remove();
					}
					if ( test( $inr, opts ) )
					{
						if ( opts.wrap == 'children' )
						{
							trunc = children( $inr, opts, after );
						}
						else
						{
							trunc = ellipsis( $inr, $dot, $inr, opts, after );
						}
					}
					$inr.replaceWith( $inr.contents() );
					$inr = null;
					
					if ( $.isFunction( opts.callback ) )
					{
						opts.callback.call( $dot[ 0 ], trunc, orgContent );
					}

					conf.isTruncated = trunc;
					return trunc;
				}

			).bind(
				'isTruncated.dot',
				function( e, fn )
				{
					e.preventDefault();
					e.stopPropagation();

					if ( typeof fn == 'function' )
					{
						fn.call( $dot[ 0 ], conf.isTruncated );
					}
					return conf.isTruncated;
				}

			).bind(
				'originalContent.dot',
				function( e, fn )
				{
					e.preventDefault();
					e.stopPropagation();

					if ( typeof fn == 'function' )
					{
						fn.call( $dot[ 0 ], orgContent );
					}
					return orgContent;
				}

			).bind(
				'destroy.dot',
				function( e )
				{
					e.preventDefault();
					e.stopPropagation();

					$dot.unwatch()
						.unbind_events()
						.empty()
						.append( orgContent )
						.attr( 'style', $dot.data( 'dotdotdot-style' ) )
						.data( 'dotdotdot', false );
				}
			);
			return $dot;
		};	//	/bind_events

		$dot.unbind_events = function()
		{
			$dot.unbind('.dot');
			return $dot;
		};	//	/unbind_events

		$dot.watch = function()
		{
			$dot.unwatch();
			if ( opts.watch == 'window' )
			{
				var $window = $(window),
					_wWidth = $window.width(),
					_wHeight = $window.height(); 

				$window.bind(
					'resize.dot' + conf.dotId,
					function()
					{
						if ( _wWidth != $window.width() || _wHeight != $window.height() || !opts.windowResizeFix )
						{
							_wWidth = $window.width();
							_wHeight = $window.height();
	
							if ( watchInt )
							{
								clearInterval( watchInt );
							}
							watchInt = setTimeout(
								function()
								{
									$dot.trigger( 'update.dot' );
								}, 250
							);
						}
					}
				);
			}
			else
			{
				watchOrg = getSizes( $dot );
				watchInt = setInterval(
					function()
					{
						var watchNew = getSizes( $dot );
						if ( watchOrg.width  != watchNew.width ||
							 watchOrg.height != watchNew.height )
						{
							$dot.trigger( 'update.dot' );
							watchOrg = getSizes( $dot );
						}
					}, 250
				);
			}
			return $dot;
		};
		$dot.unwatch = function()
		{
			$(window).unbind( 'resize.dot' + conf.dotId );
			if ( watchInt )
			{
				clearInterval( watchInt );
			}
			return $dot;
		};

		var	orgContent	= $dot.contents(),
			opts 		= $.extend( true, {}, $.fn.dotdotdot.defaults, o ),
			conf		= {},
			watchOrg	= {},
			watchInt	= null,
			$inr		= null;

		conf.afterElement	= getElement( opts.after, $dot );
		conf.isTruncated	= false;
		conf.dotId			= dotId++;


		$dot.data( 'dotdotdot', true )
			.bind_events()
			.trigger( 'update.dot' );

		if ( opts.watch )
		{
			$dot.watch();
		}

		return $dot;
	};


	//	public
	$.fn.dotdotdot.defaults = {
		'ellipsis'	: '... ',
		'wrap'		: 'word',
		'lastCharacter': {
			'remove'		: [ ' ', ',', ';', '.', '!', '?' ],
			'noEllipsis'	: []
		},
		'tolerance'	: 0,
		'callback'	: null,
		'after'		: null,
		'height'	: null,
		'watch'		: false,
		'windowResizeFix': true,
		'debug'		: false
	};
	

	//	private
	var dotId = 1;

	function children( $elem, o, after )
	{
		var $elements 	= $elem.children(),
			isTruncated	= false;

		$elem.empty();

		for ( var a = 0, l = $elements.length; a < l; a++ )
		{
			var $e = $elements.eq( a );
			$elem.append( $e );
			if ( after )
			{
				$elem.append( after );
			}
			if ( test( $elem, o ) )
			{
				$e.remove();
				isTruncated = true;
				break;
			}
			else
			{
				if ( after )
				{
					after.remove();
				}
			}
		}
		return isTruncated;
	}
	function ellipsis( $elem, $d, $i, o, after )
	{
		var $elements 	= $elem.contents(),
			isTruncated	= false;

		$elem.empty();

		var notx = 'table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, select, optgroup, option, textarea, script, style';
		for ( var a = 0, l = $elements.length; a < l; a++ )
		{

			if ( isTruncated )
			{
				break;
			}

			var e	= $elements[ a ],
				$e	= $(e);

			if ( typeof e == 'undefined' )
			{
				continue;
			}

			$elem.append( $e );
			if ( after )
			{
				$elem[ ( $elem.is( notx ) ) ? 'after' : 'append' ]( after );
			}
			if ( e.nodeType == 3 )
			{
				if ( test( $i, o ) )
				{
					isTruncated = ellipsisElement( $e, $d, $i, o, after );
				}
			}
			else
			{
				isTruncated = ellipsis( $e, $d, $i, o, after );
			}

			if ( !isTruncated )
			{
				if ( after )
				{
					after.remove();
				}
			}
		}
		return isTruncated;
	}
	function ellipsisElement( $e, $d, $i, o, after )
	{
		var isTruncated	= false,
			e = $e[ 0 ];

		if ( typeof e == 'undefined' )
		{
			return false;
		}

		var seporator	= ( o.wrap == 'letter' ) ? '' : ' ',
			textArr		= getTextContent( e ).split( seporator ),
			position 	= -1,
			midPos		= -1,
			startPos	= 0,
			endPos		= textArr.length - 1;

		while ( startPos <= endPos )
		{
			var m = Math.floor( ( startPos + endPos ) / 2 );
			if ( m == midPos ) 
			{
				break;
			}
			midPos = m;

			setTextContent( e, textArr.slice( 0, midPos + 1 ).join( seporator ) + o.ellipsis );

			if ( !test( $i, o ) )
			{
				position = midPos;
				startPos = midPos; 
			}
			else
			{
				endPos = midPos;
			}				
		}	
	
		if ( position != -1 && !( textArr.length == 1 && textArr[ 0 ].length == 0 ) )
		{
			var txt = addEllipsis( textArr.slice( 0, position + 1 ).join( seporator ), o );
			isTruncated = true;
			setTextContent( e, txt );
		}
		else
		{
			var $w = $e.parent();
			$e.remove();

			var afterLength = ( after ) ? after.length : 0 ;

			if ( $w.contents().size() > afterLength )
			{
				var $n = $w.contents().eq( -1 - afterLength );
				isTruncated = ellipsisElement( $n, $d, $i, o, after );
			}
			else
			{
				var $p = $w.prev()
				var e = $p.contents().eq( -1 )[ 0 ];

				if ( typeof e != 'undefined' )
				{
					var txt = addEllipsis( getTextContent( e ), o );
					setTextContent( e, txt );
					if ( after )
					{
						$p.append( after );
					}
					$w.remove();
					isTruncated = true;
				}

			}
		}

		return isTruncated;
	}
	function test( $i, o )
	{
		return $i.innerHeight() > o.maxHeight;
	}
	function addEllipsis( txt, o )
	{
		while( $.inArray( txt.slice( -1 ), o.lastCharacter.remove ) > -1 )
		{
			txt = txt.slice( 0, -1 );
		}
		if ( $.inArray( txt.slice( -1 ), o.lastCharacter.noEllipsis ) < 0 )
		{
			txt += o.ellipsis;
		}
		return txt;
	}
	function getSizes( $d )
	{
		return {
			'width'	: $d.innerWidth(),
			'height': $d.innerHeight()
		};
	}
	function setTextContent( e, content )
	{
		if ( e.innerText )
		{
			e.innerText = content;
		}
		else if ( e.nodeValue )
		{
			e.nodeValue = content;
		}
		else if (e.textContent)
		{
			e.textContent = content;
		}

	}
	function getTextContent( e )
	{
		if ( e.innerText )
		{
			return e.innerText;
		}
		else if ( e.nodeValue )
		{
			return e.nodeValue;
		}
		else if ( e.textContent )
		{
			return e.textContent;
		}
		else
		{
			return "";
		}
	}
	function getElement( e, $i )
	{
		if ( typeof e == 'undefined' )
		{
			return false;
		}
		if ( !e )
		{
			return false;
		}
		if ( typeof e == 'string' )
		{
			e = $(e, $i);
			return ( e.length )
				? e 
				: false;
		}
		if ( typeof e == 'object' )
		{
			return ( typeof e.jquery == 'undefined' )
				? false
				: e;
		}
		return false;
	}
	function getTrueInnerHeight( $el )
	{
		var h = $el.innerHeight(),
			a = [ 'paddingTop', 'paddingBottom' ];

		for ( var z = 0, l = a.length; z < l; z++ ) {
			var m = parseInt( $el.css( a[ z ] ), 10 );
			if ( isNaN( m ) )
			{
				m = 0;
			}
			h -= m;
		}
		return h;
	}
	function debug( d, m )
	{
		if ( !d )
		{
			return false;
		}
		if ( typeof m == 'string' )
		{
			m = 'dotdotdot: ' + m;
		}
		else
		{
			m = [ 'dotdotdot:', m ];
		}

		if ( typeof window.console != 'undefined' )
		{
			if ( typeof window.console.log != 'undefined' )
			{
				window.console.log( m );
			}
		}
		return false;
	}
	

	//	override jQuery.html
	var _orgHtml = $.fn.html;
    $.fn.html = function( str ) {
		if ( typeof str != 'undefined' )
		{
			if ( this.data( 'dotdotdot' ) )
			{
				if ( typeof str != 'function' )
				{
					return this.trigger( 'update', [ str ] );
				}
			}
			return _orgHtml.call( this, str );
		}
		return _orgHtml.call( this );
    };


	//	override jQuery.text
	var _orgText = $.fn.text;
    $.fn.text = function( str ) {
		if ( typeof str != 'undefined' )
		{
			if ( this.data( 'dotdotdot' ) )
			{
				var temp = $( '<div />' );
				temp.text( str );
				str = temp.html();
				temp.remove();
				return this.trigger( 'update', [ str ] );
			}
			return _orgText.call( this, str );
		}
        return _orgText.call( this );
    };


});

/* global define */
/* global cmCreateProductviewTag */
/* global cmCreateConversionEventTag */
define('modules/quicklook',[
	"app/p2p",
	"modules/baseModule",
	"jquery",
	"modules/utils",
	"tpl/quicklookdetail",
	"jquery.dotdotdot"
], function (p2p, BaseModule, $, utils, tplDetailQuicklook) {

	var quicklook;

	quicklook = {

		init: function () {
			this.platform.cons.add("SHOW_QUICKLOOK", "show-quicklook");
		},

		bind: function () {
			this.subscribe(this.platform.cons.SHOW_QUICKLOOK, this.showQuicklook);
		},

		showQuicklook: function (event, data) {
			var productDetail = data.productDetail,
				$product = data.product,
				$modalContent = $(tplDetailQuicklook(productDetail)),
				$modalContainer = this.getDialog(),
				$atb, productDetailsMarginTop;

			// Coremetrics
			var prod_id = $product.find("#prod_id").val();
			var categoryName = utils.pageType();
			cmCreateConversionEventTag("Express Shop", "1", "Shopping Bag", "20", prod_id + "-_-" + categoryName);
			cmCreateProductviewTag("'" + prod_id + "'", "'" + productDetail.name + "'", "EXPRESS:" + $product.find("#categoryid").val(), "", "", "", "", "Y", "N", null, null, "'" + $product.find("#prodCmAdditionalAttrib").val() + "'");

			// Add the content to the dialog and show it
			$modalContainer.html($modalContent.html());
			$modalContainer.reveal({ animation: "fade" });

			// Center the dialog in the middle of the screen
			this.centerDialog($modalContainer);

			// Adjustments needed inside the modal
			productDetailsMarginTop = Math.floor(($modalContainer.find(".content").height() - $modalContainer.find(".productdetails").height()) / 2.75);
			$modalContainer.find(".productdetails").css("margin-top", productDetailsMarginTop + "px");

			// Prevent scrolling when in dialog or the overlay it's placed over the rest of the page
			$modalContainer
				.off("mousewheel DOMMouseScroll", this.preventScrolling)
				.on("mousewheel DOMMouseScroll", this.preventScrolling);

			$(".reveal-modal-bg")
				.off("mousewheel DOMMouseScroll", this.preventScrolling)
				.on("mousewheel DOMMouseScroll", this.preventScrolling);

			// If the product is not out of stock
			// lone the markup of the original add to bag into the dialog
			if ($product.parents(".one.column").hasClass("out-of-stock") === false || data.includeForm === true) {
				$atb = $product.find(".add-to-bag").clone();
				$atb.find('.quantity').val(1); // ACo requested to cleanup after closing rollover. resetting to 1
				$modalContainer.find(".atb").append($atb).end();
			}

			// Load some additional information
			$modalContainer
				.find(".shipinfo").load("/include/p2p-productDetailsShip.jsp").end()
				.find(".overview").dotdotdot().end()
				.find(".promotion > a").on("click", false).end()
				.find(".atb-button")
				.off("click", this.clickAtb).on("click", this.clickAtb).end()
				.find(".add-to-bag").addToBag().end()
				.find(".promotion-detail").css("margin-top", function(){ 
					var margin = -($(this).outerHeight() + 28);
					return margin;
				})
				.end();

			if (typeof data.includeForm !== "undefined") {
				$modalContainer.find("#atbForm").append(data.product.find("form").clone());
			}
		},

		preventScrolling: function (event) {
			event.preventDefault();
			var $modalContainer = this.getDialog();

			if (utils.isTouchDevice()) {
				$(document).on("touchmove", false);
				$modalContainer.on("reveal:close", function () {
					$(document).on("touchmove", true);
				});
			}
		},

		clickAtb: function (e) {
			var modalAction = "reveal:close",
				$modalContainer = this.getDialog();
			if (this.platform.modules.cartService && this.platform.modules.cartService.settings.addedToCartControl) {
				modalAction = (this.platform.modules.cartService.settings.addedToCartControl == "dynamicCart") ? "reveal:close" : "reveal:update";
			}

			// Update the original quantity input
			$("#qty_" + $(e.currentTarget).parents(".add-to-bag").attr("data-product")).val($(e.currentTarget).siblings(".quantity").val());

			if ($(e.currentTarget).siblings(".add").find(".toolTip").is(":visible") === true) {
				if (utils.isIe8() === true) {
					return false;
				} else {
					setTimeout(function(){
						$modalContainer.trigger(modalAction);
					}, 3000);
				}
			} else {
				$modalContainer.trigger(modalAction);				
			}

			return false;
		},

		getDialog: function () {
			if ($("body #product-quicklook-detail").length < 1) {
				$("body").append('<div id="product-quicklook-detail" class="reveal-modal"><div class="content"></div><a class="close-reveal-modal"><span class="close-icon"></span></a></div>');
			}

			return $("body #product-quicklook-detail");
		},

		centerDialog: function (dialog) {
			var win = $(window),
				centerY = win.scrollTop() + win.height() / 2,
				centerX = win.scrollLeft() + win.width() / 2;

			dialog.css({
				'margin-left': 0,
				top: centerY - (dialog.outerHeight() / 2),
				left: centerX - (dialog.outerWidth() / 2)
			});
		}

	};

	return p2p.add("quicklook", quicklook, BaseModule);
});

/*
 * jQuery Reveal Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


define('app/jquery.reveal',["jquery"],function($) {

/*---------------------------
 Defaults for Reveal
----------------------------*/
	 
/*---------------------------
 Listener for data-reveal-id attributes
----------------------------*/

	// $('a[data-reveal-id]').live('click', function(e) {
	// 	e.preventDefault();
	// 	var modalLocation = $(this).attr('data-reveal-id');
	// 	$('#'+modalLocation).reveal($(this).data());
	// });

/*---------------------------
 Extend and Execute
----------------------------*/

    $.fn.reveal = function(options) {
        
        
        var defaults = {  
	    	animation: 'fade', //fade, fadeAndPop, none
		    animationspeed: 300, //how fast animtions are
		    closeonbackgroundclick: true, //if you click background will modal close?
		    dismissmodalclass: 'close-reveal-modal' //the class of a button or element that will close an open modal
    	}; 
    	
        //Extend dem' options
        var options = $.extend({}, defaults, options); 
	
        return this.each(function() {
        
/*---------------------------
 Global Variables
----------------------------*/
        	var modal = $(this),
        		topMeasure  = parseInt(modal.css('top')),
				topOffset = modal.height() + topMeasure,
          		locked = false,
				modalBG = $('.reveal-modal-bg');

/*---------------------------
 Create Modal BG
----------------------------*/
			if(modalBG.length == 0) {
				modalBG = $('<div class="reveal-modal-bg" />').insertAfter(modal);
			}		    
     
/*---------------------------
 Open & Close Animations
----------------------------*/
			//Entrance Animations
			modal.bind('reveal:open', function () {
			  modalBG.unbind('click.modalEvent');
				$('.' + options.dismissmodalclass).unbind('mouseup.modalEvent');
				if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modal.css({'top': $(document).scrollTop()-topOffset, 'opacity' : 0, 'visibility' : 'visible'});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"top": $(document).scrollTop()+topMeasure + 'px',
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					}
					if(options.animation == "fade") {
						modal.css({'opacity' : 0, 'visibility' : 'visible', 'top': $(document).scrollTop()+topMeasure});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					} 
					if(options.animation == "none") {
						modal.css({'visibility' : 'visible', 'top':$(document).scrollTop()+topMeasure});
						modalBG.css({"display":"block"});	
						unlockModal()				
					}
				}
				modal.unbind('reveal:open');
			}); 	

			//Closing Animation
			modal.bind('reveal:close', function () {
			  if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"top":  $(document).scrollTop()-topOffset + 'px',
							"opacity" : 0
						}, options.animationspeed/2, function() {
							modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden'});
							unlockModal();
						});					
					}  	
					if(options.animation == "fade") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"opacity" : 0
						}, options.animationspeed, function() {
							modal.css({'opacity' : 0, 'visibility' : 'hidden', 'top' : topMeasure});
							unlockModal();
						});					
					}  	
					if(options.animation == "none") {
						modal.css({'visibility' : 'hidden', 'top' : topMeasure});
						modalBG.css({'display' : 'none'});	
					}		
				}
				modal.unbind('reveal:close');
			});

			//Closing Animation
			modal.bind('reveal:update', function () {
			  // if(!locked) {
					// lockModal();
					if(options.animation == "fadeAndPop") {
						// modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"top":  $(document).scrollTop()-topOffset + 'px',
							"opacity" : 0
						}, options.animationspeed/2, function() {
							modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden'});
							// unlockModal();
						});					
					}  	
					if(options.animation == "fade") {
						// modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"opacity" : 0
						}, options.animationspeed, function() {
							modal.css({'opacity' : 0, 'visibility' : 'hidden', 'top' : topMeasure});
							// unlockModal();
						});					
					}  	
					if(options.animation == "none") {
						modal.css({'visibility' : 'hidden', 'top' : topMeasure});
						// modalBG.css({'display' : 'none'});	
					}		
				// }
				fromUpdate = true;
				modal.unbind('reveal:update');
			});     
   	
/*---------------------------
 Open and add Closing Listeners
----------------------------*/
        	//Open Modal Immediately
    	modal.trigger('reveal:open')
			
			//Close Modal Listeners
			var closeButton = $('.' + options.dismissmodalclass).bind('mouseup.modalEvent', function () {
			  modal.trigger('reveal:close')
			});
			
			if(options.closeonbackgroundclick) {
				modalBG.css({"cursor":"pointer"})
				modalBG.bind('click.modalEvent', function () {
				  modal.trigger('reveal:close')
				});
			}
			$('body').keyup(function(e) {
        		if(e.which===27){ modal.trigger('reveal:close'); } // 27 is the keycode for the Escape key
			});
			
			
/*---------------------------
 Animations Locks
----------------------------*/
			function unlockModal() { 
				locked = false;
			}
			function lockModal() {
				locked = true;
			}	
			
        });//each call
    }//orbit plugin call
});
        

/* global define */
/* global console */
define('modules/productrollover',[
	"app/p2p",
	"jquery",
	"underscore",
	"modules/utils",
	"tpl/productrollover",
	"tpl/quicklook",
	"modules/quicklook",
	"app/jquery.reveal",
	"jquery.dotdotdot",
	"app/jquery.doubletap"
], function (p2p, $, _, utils, tplProduct, tplQuickLook) {

	p2p.cons.add("SHOW_QUICKLOOK", "show-quicklook");

	$.fn.productRollover = function () {

		var settings = {
				fadeInDelay: 200,
				fadeOutDelay: 200,
				fadeInSpeed: 300,
				fadeOutSpeed: 100,
				delayAnimation: 4000
			},
			mouseCoords = { pageX: 0, pageY: 0 };

		var updateMouseCoords = function updateMouseCoords(event) {
			mouseCoords = event;
		};

		var getProductInfoFromDOM = function getProductInfoFromDOM(product) {
			return {
				id: product.find(".hproduct").attr("id") || product.attr("id"),
				link: product.find("a.url").attr("href"),
				image: product.find(".photo").attr("src"),
				size: product.find(".size").html(),
				fragrance: product.find(".fragrance").html(),
				name: product.find(".name").html(),
				overview: product.find(".overview .long-description").html(),
				shortOverview: product.find(".short-description").html(),
				price: product.find(".cprice").html(),
				promo: product.find(".promo").html(),
				moredetailslink: product.find(".view-more-details").html(),
				longtitle: product.find(".promo-description .longtitle").html(),
				longdescription: product.find(".promo-description .longdescription").html()
			};
		};

		$("#content").on("mousemove", updateMouseCoords);

		if ($("#rollovers-container").length > 0) {
			$("#rollovers-container").remove();
		}
		$("body").append("<div id='rollovers-container' />");

		return this.each(function () {

			var $product = $(this).closest(".product");

			if($('body.product').length > 0){
				$product = $(this).closest(".hproduct");

				$.ajax({
					url: "/product/p2p-express.jsp",
					data: { "productId": $product.attr("id").replace(/prod-/g, '') },
					success: function(data) {
						$product = $("<div>").append(data);
						productDetail = getProductInfoFromDOM($product);
					}
				});
			}

			var	$thumbnail = $product.find(".thumbnail"),
				$rollover,
				$quicklook,
				$window = $(window),
				timerQuicklook, timerRollover, timerOutQuicklook, timerOutRollover,
				productDetail = getProductInfoFromDOM($product),
				displayRollover = false, displayQuicklook = false, queuedDisplaying = false;

			if ($product.find(".thumbnail img").hasClass("lazyLoading")) {
				productDetail.lazyloaded = true;
			}

			var processRolloverTemplate = function processRolloverTemplate(tpl, context) {
				if (showingAddToBag()) {
					context = _.clone(context);
					delete context.fragrance;
					delete context.name;
				}

				return $("<div class='productrollover' />").append($(tpl(context)));
			};

			var mouseMoveThumbnail = function mouseMoveThumbnail() {
				clearTimeout(timerOutQuicklook);
				clearTimeout(timerOutRollover);

				if ($("#rollovers-container").find("." + productDetail.id).length < 1) {
					$("#rollovers-container").append($rollover);
				} else {
					$rollover = $("#rollovers-container").find("." + productDetail.id);
				}

				// If it's a touch device we don't show these
				if (utils.isTouchDevice()) {
					return false;
				}

				if (displayQuicklook === true && !$quicklook.is(":visible") && queuedDisplaying === false) {
					timerQuicklook = setTimeout(function () {
						fadeInQuicklook();
						timerRollover = setTimeout(fadeInRollover, settings.fadeInDelay);
					}, settings.fadeInDelay);
					queuedDisplaying = true;
				}
				if (displayRollover === true && !$rollover.is(":visible") && queuedDisplaying === false) {
					timerRollover = setTimeout(fadeInRollover, settings.fadeInDelay);
					queuedDisplaying = true;
				}

				moveRollover($rollover);
			};

			var mouseEnterThumbnail = function mouseEnterThumbnail() {
				clearTimeout(timerOutQuicklook);
				clearTimeout(timerOutRollover);

				// If it's a touch device we don't show these
				if (utils.isTouchDevice()) {
					return false;
				}

				if (typeof productDetail.shortOverview != 'undefined' && productDetail.shortOverview.trim() === "") {
					// if ($rollover.find(".long-description").length && $rollover.find(".long-description").text() !== "") {
					// 	$rollover.find(".overview").addClass("show-long-description");
					// 	displayRollover = true;
					// }
					displayRollover = false;
				} else {
					displayRollover = true;
				}

				if (isGridView() && !showingAddToBag()) {
					displayQuicklook = true;
				}
				else if ($('body.productDetailPage').length > 0) {
					displayQuicklook = true;
				}
				else if ($('body.product').length > 0) {
					displayQuicklook = true;
				}
			};

			var mouseLeaveThumbnail = function mouseLeaveThumbnail() {
				clearTimeout(timerQuicklook);
				clearTimeout(timerRollover);

				queuedDisplaying = displayRollover = displayQuicklook = false;

				if (showingAddToBag()) {
					timerOutRollover = setTimeout(fadeOutRollover, settings.fadeOutDelay);
				} else {
					timerOutQuicklook = setTimeout(function () {
						fadeOutRollover();
						timerOutRollover = setTimeout(fadeOutQuicklook, settings.fadeOutDelay);
					}, settings.fadeOutDelay);
				}
			};

			var fadeInQuicklook = function fadeInQuicklook() {

				if (!isGridView() && $('body.product').length === 0) {
					return false;
				}

				$quicklook.fadeIn(settings.fadeInSpeed);
				queuedDisplaying = false;
			};

			var fadeOutQuicklook = function fadeOutQuicklook() {
				$quicklook.stop().fadeOut(settings.fadeOutSpeed / 4);
			};

			var fadeInRollover = function fadeInRollover(rollover) {

				if (!isGridView()) {
					return false;
				}

				$rollover = rollover || $rollover;
				$rollover.fadeIn(settings.fadeInSpeed, function () {
					$(this).find(".overview").dotdotdot({ watch: false });
				});
				queuedDisplaying = false;
			};

			var fadeInRolloverTouch = function fadeInRolloverTouch(rollover) {

				if (!isGridView()) {
					return false;
				}

				$rollover = rollover || $rollover;
				$rollover.fadeIn(settings.fadeInSpeed,function () {
					$(this).find(".overview").dotdotdot({ watch: false });
				}).delay(settings.delayAnimation).fadeOut(settings.fadeOutSpeed);
				queuedDisplaying = false;
			};

			var fadeOutRollover = function fadeOutRollover(fromQuicklook, rollover) {
				fromQuicklook = fromQuicklook || false;
				$rollover = rollover || $rollover;
				$rollover.stop().fadeOut(settings.fadeOutSpeed, function () {
					if (fromQuicklook === true) {
						displayRollover = true;
					}
				});
			};

			var moveRollover = function moveRollover(rollover) {
				var cords = getNewRolloverPosition(rollover);

				if (isMouseOutOfContainer($thumbnail) === true) {
					mouseLeaveThumbnail();
					return false;
				}

				if (isMouseOverQuickLook($quicklook) === true) {
					fadeOutRollover(true);
					return false;
				}

				rollover.animate({
					left: cords.left + "px",
					top: cords.top + "px"
				}, {
					queue: false,
					duration: 5,
					easing: "linear"
				});
			};

			var getNewRolloverPosition = function getNewRolloverPosition(rollover) {
				var rolloverX,
					rolloverY,
					windowSize = {
						width: $window.width(),
						height: $window.height()
					};

				if (!mouseCoords) {
					return false;
				}

				rolloverY = (mouseCoords.pageY - (rollover.height() / 2));
				rolloverX = (mouseCoords.pageX + 30);
				if ((rolloverX + rollover.width()) > windowSize.width - 35) {
					rolloverX = (mouseCoords.pageX - rollover.width() - 30);
					rollover.addClass("left");
				} else {
					rollover.removeClass("left");
				}

				return {
					left: rolloverX,
					top: rolloverY
				};
			};

			var isGridView = function () {
				return $(".content-dsi").hasClass("gridview") || $('.stackedCategoryGrid').length > 0;
			};

			var isMouseOutOfContainer = function isMouseOutOfContainer(container) {
				if (!$rollover.is(":visible")) {
					return false;
				}

				var imgOffset = container.offset();

				return mouseCoords.pageX < (imgOffset.left) ||
					mouseCoords.pageX > (imgOffset.left + container.outerWidth()) ||
					mouseCoords.pageY < (imgOffset.top) ||
					mouseCoords.pageY > (imgOffset.top + container.outerHeight());
			};

			var isMouseOverQuickLook = function isMouseOverQuickLook(quicklook) {
				var quickLookOffset = quicklook.offset();

				if (!quicklook.is(":visible")) {
					return false;
				}

				return mouseCoords.pageX > (quickLookOffset.left) &&
					mouseCoords.pageX < (quickLookOffset.left + quicklook.outerWidth()) &&
					mouseCoords.pageY > (quickLookOffset.top) &&
					mouseCoords.pageY < (quickLookOffset.top + quicklook.outerHeight());
			};

			var showingAddToBag = function showingAddToBag() {
				return $product.parents(".one.column").hasClass("show-add-to-bag") && $('body.product').length === 0;
			};

			var openQuicklook = function openQuicklook(e) {
				e.preventDefault();
				var data = {
					product: $product,
					productDetail: productDetail
				};

				if ($('body.product').length > 0) {
					data.includeForm = true;
				}

				if (productDetail.lazyloaded === true) {
					data.productDetail.image = $product.find(".photo").attr("src");
				}

				p2p.publish(p2p.cons.SHOW_QUICKLOOK, data);
			};

			var verticalCenterInContainer = function verticalCenterInContainer(element, container) {
				var centerY = container.height() / 2;
				element.css('top', centerY - (element.outerHeight() / 2));
			};

			// Append the quicklook button the the product when initializing
			$quicklook = $(tplQuickLook());
			$quicklook.appendTo($thumbnail);
			$quicklook.on("click", openQuicklook);

			// Append the rollover to the product when initializing
			$rollover = processRolloverTemplate(tplProduct, productDetail);
			$rollover.addClass(productDetail.id);
			// $("#rollovers-container").append($rollover);

			// Trim the text and add ellipsis
			// setTimeout(function(){
			//   $rollover.find(".overview").dotdotdot({ watch: true });
			// }, 10);

			var showProductDetailPage = function () {
				if (!utils.touchMoving) {
					var link = $thumbnail.find("> a");
					var url = link.attr("href");
					if (!url) {
						// href attribute removed for coremetrics click
						url = link.data("originalhref");
					}
					window.location.href = url;
				} else {
					//console.log("prevent show product detail page because of touch moving");
				}
			};

			// If this is a touch device we disable the click on the image (to show the quicklook or the rollover)
			var singleTap = function singleTap(event) {
				if (showingAddToBag()) {
					showProductDetailPage();
				} else {
					openQuicklook(event[0]);
				}
			};

			var doubleTap = function doubleTap() {
				showProductDetailPage();
			};

			var overrideForTouch = function overrideForTouch() {
				if (typeof utils === "undefined") {
					utils = require("modules/utils");
				} else {
					if (utils.isTouchDevice()) {
						$thumbnail.find("> a").on("click", function (e) {
							e.preventDefault();
							showProductDetailPage();
						});						
					}
				}
			}
			

			// Event (un)binding
			$thumbnail
				.off("mouseenter", mouseEnterThumbnail)
				.off("mouseleave", mouseLeaveThumbnail)
				.off("mousemove", mouseMoveThumbnail)
				.on("mouseenter", mouseEnterThumbnail)
				.on("mouseleave", mouseLeaveThumbnail)
				.on("mousemove", mouseMoveThumbnail);

			$thumbnail.doubletap(doubleTap, singleTap);

		});
	};

});

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.1b (Customized by DSI)
 * Customizations:
 *   * Added error callback
 *   * Changed placeholder image to be a 1px transparent png
 *   * Expose a lazyloadupdate event to re-evaluate everything when visibility changes
 *   * Once an image starts loading, don't start loading it multiple times
 *   * Updates are throttled to a maximum of 2 per second
 *
 */

define('jquery.lazyload',["jquery", "modules/utils"], function(jQuery, utils){

(function($, window, document, undefined) {
	var $window = $(window);

	$.fn.lazyload = function(options) {
		var elements = this;
		var updateNeeded = false;
		var updateTimer = null;
		var trickleDelayTimer = null;
		var trickleIntervalTimer = null;
		var $container;
		var settings = {
			threshold       : 0,
			failure_limit   : 0,
			event           : "scroll",
			effect          : "show",
			container       : window,
			data_attribute  : "original",
			skip_invisible  : true,
			appear          : null,
			load            : null,
			error           : null,
			placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=",
			trickleDelay    : 3000, // Milliseconds before trickle loading starts
			trickleInterval : 2000  // Milliseconds between trickle load checks
		};

		/**
		 * Throttled update
		 */
		function update()
		{
			// Throttle to 2 updates / second
			if (updateTimer) {
				updateNeeded = true;
			} else {
				updateNow();
				updateTimer = setTimeout(function() {
					updateTimer = null;
					if (updateNeeded) {
						updateNow();
					}
				}, 500);
			}
		}

		/**
		 * Throttle controlled update - don't call directly
		 */
		function updateNow() {
			var counter = 0;
			updateNeeded = false;
			elements.each(function() {
				var $this = $(this);
				if (settings.skip_invisible && !$this.is(":visible")) {
					return;
				}
				if ($.abovethetop(this, settings) ||
					$.leftofbegin(this, settings)) {
					/* Nothing. */
				} else if (!$.belowthefold(this, settings) &&
					!$.rightoffold(this, settings)) {
					$this.trigger("appear");
					/* if we found an image we'll load, reset the counter */
					counter = 0;
				} else {
					if (++counter > settings.failure_limit) {
						return false;
					}
				}
			});
		}

		if(options) {
			/* Maintain BC for a couple of versions. */
			if (undefined !== options.failurelimit) {
				options.failure_limit = options.failurelimit;
				delete options.failurelimit;
			}
			if (undefined !== options.effectspeed) {
				options.effect_speed = options.effectspeed;
				delete options.effectspeed;
			}

			$.extend(settings, options);
		}

		/* Cache container as jQuery as object. */
		$container = (settings.container === undefined ||
			settings.container === window) ? $window : $(settings.container);

		/* Fire one scroll event per scroll. Not one scroll event per image. */
		if (0 === settings.event.indexOf("scroll")) {
			$container.bind(settings.event, function() {
				return update();
			});
		}

		/* Expose an update event */
		$container.bind("lazyloadupdate", function() {
			return update();
		});

		this.each(function() {
			var self = this;
			var $self = $(self);

			self.loaded = false;
			self.loading = false;

			/* If no src attribute given use data:uri. */
			if ($self.attr("src") === undefined || $self.attr("src") === false) {
				if ($self.is("img")) {
					$self.attr("src", settings.placeholder);
				}
			}

			/* When appear is triggered load original image. */
			$self.on("appear", function() {
				if (!self.loaded && !self.loading) {
					self.loading = true;
					if (settings.appear) {
						var elements_left = elements.length;
						settings.appear.call(self, elements_left, settings);
					}
					var original = $self.attr("data-" + settings.data_attribute);
					// console.log("appear " + original);
					$self.attr("data-" + settings.data_attribute, "");
					if (original) {
						$("<img />")
							.bind("load", function() {

								$self.hide();
								if ($self.is("img")) {
									$self.attr("src", original);
								} else {
									$self.css("background-image", "url('" + original + "')");
								}
								$self[settings.effect](settings.effect_speed);

								self.loaded = true;

								if (settings.load) {
									var elements_left = elements.length;
									settings.load.call(self, elements_left, settings);
								}
							})
							.bind("error", function() {
								if (settings.error) {
									var elements_left = elements.length;
									settings.error.call(self, elements_left, settings);
								}

								self.loaded = true;

								if (settings.load) {
									var elements_left = elements.length;
									settings.load.call(self, elements_left, settings);
								}
							})
							.attr("src", original);
					}
				}

				/* Remove image from array so it is not looped next time. */
				var temp = $.grep(elements, function (element) {
					return !element.loaded && !element.loading;
				});
				elements = $(temp);
			});

			/* When wanted event is triggered load original image */
			/* by triggering appear.                              */
			if (0 !== settings.event.indexOf("scroll")) {
				$self.bind(settings.event, function() {
					if (!self.loaded) {
						$self.trigger("appear");
					}
				});
			}
		});

		/* Check if something appears when window is resized. */
		$window.bind("resize", function() {
			update();
		});

		/* With IOS5 force loading images when navigating with back button. */
		/* Non optimal workaround. */
		if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
			// Catch back button reloading of page
			$window.bind("pageshow", function(event) {
				if (event.originalEvent && event.originalEvent.persisted) {
					elements.each(function() {
						$(this).trigger("appear");
					});
				}
			});
		}

		// Watch touch scroll on iPad since we don't get scroll events during dragging and inertial scroll.
		// This will alert us that it's about to start. We can trigger all visible images to load now.
		if (utils.isTouchDevice()) {
			document.addEventListener("touchmove", function () {
				elements.each(function () {
					var $this = $(this);
					if (settings.skip_invisible && !$this.is(":visible")) {
						return;
					}
					$(this).trigger("appear");
				});
			}, false);
		}

		/* Force initial check if images should appear. */
		$(document).ready(function() {
			update();
		});

		// Trickle Load
		if (settings.trickleDelay || settings.trickleInterval) {
			trickleDelayTimer = setTimeout(function () {
				trickleDelayTimer = null;
				trickleIntervalTimer = setInterval(function () {
					var elementToLoad = null;
					elements.each(function () {
						var element = $(this);
						if (elementToLoad == null && !element.loaded && !element.loading) {
							elementToLoad = element;
						}
					});
					if (elementToLoad != null) {
						// console.log("trickle load " + elementToLoad.data("original"));
						elementToLoad.trigger("appear");
					} else {
						// Nothing more to load
						// console.log("trickle load complete");
						clearInterval(trickleIntervalTimer);
						trickleIntervalTimer = null;
					}
				}, settings.trickleInterval || 2000);
			}, settings.trickleDelay || 3000);
		}

		return this;
	};

	/* Convenience methods in jQuery namespace.           */
	/* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

	$.belowthefold = function(element, settings) {
		var fold;

		if (settings.container === undefined || settings.container === window) {
			fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
		} else {
			fold = $(settings.container).offset().top + $(settings.container).height();
		}

		return fold <= $(element).offset().top - settings.threshold;
	};

	$.rightoffold = function(element, settings) {
		var fold;

		if (settings.container === undefined || settings.container === window) {
			fold = $window.width() + $window.scrollLeft();
		} else {
			fold = $(settings.container).offset().left + $(settings.container).width();
		}

		return fold <= $(element).offset().left - settings.threshold;
	};

	$.abovethetop = function(element, settings) {
		var fold;

		if (settings.container === undefined || settings.container === window) {
			fold = $window.scrollTop();
		} else {
			fold = $(settings.container).offset().top;
		}

		return fold >= $(element).offset().top + settings.threshold  + $(element).height();
	};

	$.leftofbegin = function(element, settings) {
		var fold;

		if (settings.container === undefined || settings.container === window) {
			fold = $window.scrollLeft();
		} else {
			fold = $(settings.container).offset().left;
		}

		return fold >= $(element).offset().left + settings.threshold + $(element).width();
	};

	$.inviewport = function(element, settings) {
		return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
			!$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	};

	/* Custom selectors for your convenience.   */
	/* Use as $("img:below-the-fold").something() or */
	/* $("img").filter(":below-the-fold").something() which is faster */

	$.extend($.expr[":"], {
		"below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
		"above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
		"right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
		"left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
		"in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
		/* Maintain BC for couple of versions. */
		"above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
		"right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
		"left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
	});

})(jQuery, window, document);

});

define('modules/grid',[
	"app/p2p",
	"modules/baseModule",
	"modules/stackedCategory",
	"jquery",
	"underscore",
	"modules/utils",
	"modules/productrollover",
	"jquery.lazyload"
], function (p2p, baseModule, stackedCategory, $, _, utils) {

	var grid;

	grid = {

		resizeTimeout: null,
		newRowStartIndex: 0,
		pageType: "family",
		productCount: 0,
		totalProductCount: 0,
		hasMoreProducts: false,
		cmsBlocks: [],

		init: function(){
			this.platform.cons.add("VIEW_TOGGLE", "view-toggle");
			this.platform.cons.add("BROWSER_RESIZED", "browser-resized");
			this.platform.cons.add("CMS_BLOCKS_GRID", "cms-blocks-grid");
			this.platform.cons.add("LOAD_MORE_COMPLETE", "load_more_complete");
			this.platform.cons.add("LOAD_MORE_PRODUCT_COUNT", "load_more_product_count");
			this.platform.cons.add("PRODUCT_COUNT_GRID_ADJUSTED", "product-count-grid-adjusted");

			if(typeof P2P_INCLUDE_CMS == 'undefined'){
				P2P_INCLUDE_CMS = false;
			}
		},

		bind: function(){
			this.subscribe(this.platform.cons.VIEW_TOGGLE, this.handleViewToggle);
			this.subscribe(this.platform.cons.BROWSER_RESIZED, this.browserResized);
			this.subscribe(this.platform.cons.CMS_BLOCKS_GRID, this.handleCmsBlocks);
			this.subscribe(this.platform.cons.LOAD_MORE_COMPLETE, this.handleAjaxComplete);
			this.subscribe(this.platform.cons.LOAD_MORE_PRODUCT_COUNT, this.updateLoadMoreProductCount);
		},

		cache: function(){
			this.productListContainer = $(".content-dsi");

			if (this.productListContainer.length === 0) {
				this.productListContainer = $("#stackedCategories");
				this.pageType = "category"; // it's family be default
				stackedCategory.initializeStackedCategories(this.productListContainer);
			}
		},

		render: function(){
			setTimeout(this.delayRendering, 100);
			this.productListContainer.delegate(".product .information, .product .price-atb", "click", this.gotoProductDetails);
		},

		delayRendering: function(){
			// Update the product count first, so we know if we have more pages to load
			this.updateProductCount();
			this.adjustLastRow();

			this.initializePlugins(this.productListContainer);
			//this.adjustGridRowHeights(); // vleite - removed, it's also run on browser-resize, and we trigger that event on page load

			this.productListContainer.find(".alternate-views").delegate("a", "click", this.handleAlternateViewClick);
		},

		/**
		 * If in the last row we have less than 4 products or cms blocks (combined) and we're not at the end of 
		 * the products list (meaning we have more products to load), we remove those
		 * products to make the grid look good. We also adjust some counters so those products are included
		 * in the next load more issued and we still start with a full row
		 */
		adjustLastRow: function(){
			if (this.pageType === "family") {
				// DEPRECATED
				// var lastProductRow = this.productListContainer.find(".grid-row").last();
				// if (lastProductRow.find("> div").length < 4) {
				// 	if (this.hasMoreProducts) {
				// 		// If we have more products to be loaded, just remove the last row
				// 		this.log("Removing " + lastProductRow.find(".product").length + " products");
				// 		lastProductRow.remove();

				// 		// If we do changes, update product count again..
				// 		this.updateProductCount();
				// 	} else {
				// 		// If we actually don't have any more products, append the missing cells to make it look pretty
				// 		var toAppend = [];
				// 		for (var i = lastProductRow.find("> div").length; i < 4; i++) {
				// 			toAppend.push('<div class="one column paddingcell"></div>');
				// 		}
				// 		lastProductRow.append(toAppend.join(""));
				// 	}
				// }

				// ..and render it
				this.renderProductCount();
				// also tell it to load more
				this.publish(this.platform.cons.PRODUCT_COUNT_GRID_ADJUSTED, { hasMoreProducts: this.hasMoreProducts });
			}
		},

		/**
		 * Initialize plugins and required javascript to provide full page functionality
		 * @param {object} container The jQuery object that will have the products that need 
		 * their functionality initialized, when loading new rows, 
		 * this will only be the new ones
		 */
		initializePlugins: function(container) {
			utils.lazyLoadImages(container.find(".product .photo.lazy"));
			utils.lazyLoadImages(container.find("img.lazy"));
			container.find(".product .add-to-bag").addToBag();
			container.find(".product .thumbnail").productRollover();
		},

		/**
		 * Adjust the heights of all of the grid rows
		 */
		adjustGridRowHeights: function(startAt) {
			startAt = startAt || 0;
			var that = this;
			var newRowSelector = (startAt > 0) ? ".grid-row:gt(" + parseInt(this.newRowStartIndex, 10) + ")" : ".grid-row";

			if (!this.productListContainer.hasClass("listview")) {
				this.productListContainer.find(newRowSelector).each(function(){
					that.adjustDetailsHeight($(this));
				});
			}
		},

		/**
		 * Adjust the height of all details in a row so they're all the same
		 * @param row
		 */
		adjustDetailsHeight: function(row){
			var maxInformationHeight = 0;
			var maxPriceHeight = 0;
			var height;
			var informationContainers;
			var priceContainers;

			//p2p.startTimer("adjustDetailsHeight");

			// Reset all manually sized items so they can be re-measured
			row.find(".information,.price-atb").height("auto");

			// Find all of the information containers
			informationContainers = row[0].querySelectorAll(".information");

			// Find the biggest information container
			$.each(informationContainers, function(index, informationContainer) {
				height = informationContainer.offsetHeight;
				if (height > maxInformationHeight) {
					maxInformationHeight = height;
				}
			});

			// Find all of the price containers
			priceContainers = row[0].querySelectorAll(".price-atb");

			// Find the biggest price container
			$.each(priceContainers, function(index, priceContainer) {
				height = priceContainer.offsetHeight;
				if (height > maxPriceHeight) {
					maxPriceHeight = height;
				}
			});

			// Set the height of all of the containers to the maximum in the row
			$.each(informationContainers, function(index, informationContainer) {
				informationContainer.style.height = maxInformationHeight + "px";
			});
			$.each(priceContainers, function(index, priceContainer) {
				priceContainer.style.height = maxPriceHeight + "px";
			});

			//p2p.endTimer("adjustDetailsHeight");
		},

		/**
		 * Handle CMS Blocks
		 * @param event
		 * @param data
		 */
		handleCmsBlocks: function(event, data) {
			var that = this;
			var includeCms = P2P_INCLUDE_CMS || false; // This is global and might change at every ajax request
			this.cmsBlocks = data;
			if (includeCms) {
				_(data).each(function(block){
					var gridRow;
					if (that.pageType === "category") {
						gridRow = that.productListContainer.find("#stackedCatRow-" + block.category + " .grid-row");
						block.content.addClass("one column"); // = $("<div class='' />").append(block.content);
					} else {
						gridRow = that.productListContainer.find(".grid-row").eq(block.row - 1);
					}
					// replace the 1st paddingcell, leave the others to properly display the table
					gridRow.find(".paddingcell").eq(0).replaceWith(block.content);
				});
			}
		},

		/**
		 * View Toggle
		 * @param event
		 * @param viewType
		 */
		handleViewToggle: function(event, viewType) {
			var that = this;

			this.productListContainer
				.removeClass(viewType.old)
				.addClass(viewType.current);

			if (viewType.current === "gridview"){
				// set all the .details to the same height per row
				that.adjustGridRowHeights();
			}

		},

		/**
		 * Browser resize event
		 * @param event
		 * @param data
		 */
		browserResized: function(/*event, data*/){
			var that = this;

			// Throttled browser resize handling
			if (this.resizeTimeout) {
				clearTimeout(this.resizeTimeout);
			}
			this.resizeTimeout = setTimeout(function() {
				that.adjustGridRowHeights();
			}, 500);
		},

		/**
		 * Update the total product count and check if we still have more products
		 * @param event
		 * @param data
		 */
		updateLoadMoreProductCount: function(event, data){
			this.updateProductCount(parseInt(data.productCount, 10));
			this.adjustLastRow();
			this.renderProductCount();
		},

		/**
		 * updateProductCount
		 * Updates the count of products (not on the dom)
		 * @param {int} totalProductCount The total product count. Optional. If passed, will also
		 *															  update the total product count, used when filtering moslty
		 */
		updateProductCount: function(totalProductCount){
			var productCountDisplay = $(".product-count");
			var productRows = this.productListContainer.find(".grid-row");

			this.productCount = productRows.find(".product").length;
			if (totalProductCount) {
				this.totalProductCount = totalProductCount;
			} else {
				this.totalProductCount = (typeof TOTAL_PRODUCTS !== "undefined") ? TOTAL_PRODUCTS : parseInt(productCountDisplay.text(), 10);
			}
			
			if (this.totalProductCount > this.productCount) {
				this.hasMoreProducts = true;
			} else {
				this.hasMoreProducts = false;
			}

			// We also need to tell load more what item to start now
			DSI.Modules.ajaxLoadMore.config.productCounterStart = productRows.find("> div").length;

			// Include some items that may have been skipped due to cms
			// if (productRows.find(".paddingcell").length > 0 && productRows.find(".product").length < productRows.find("> div").length) {
			// 	DSI.Modules.ajaxLoadMore.config.skipFirst = productRows.find(".product").length - productRows.find("> div").length;
			// }
			if (productRows.find(".cmspadding").length > 0) {
				DSI.Modules.ajaxLoadMore.config.skipFirst = -productRows.find(".cmspadding").length;
			}

			// Update the product rows count
			this.newRowStartIndex = productRows.length - 1;
		},

		/** 
		 * Updates the DOM with the new product count
		 */
		renderProductCount: function() {
			var productCountDisplay = $(".product-count");
			var loadMoreText = $(".loadMoreText");

			this.log("Products in page: " + this.productCount);
			this.log("Total products: " + this.totalProductCount);

			loadMoreText.find(".loadMoreItems").text(this.productCount);
			loadMoreText.find(".loadMoreTotal").text(this.totalProductCount);
			productCountDisplay.text(this.totalProductCount + " ITEMS");
		},

		/**
		 * _appendNewRows
		 * When loading more products, this will append the new rows to the DOM
		 * (Own function because we might want to animate some things)
		 * @param {string} data The html to be appended
		 */
		_appendNewRows: function(data) {
			this.productListContainer.append(data);
		},

		/**
		 * _replaceRows
		 * When filtering/sorting, replaces the current displayed rows with the new result
		 * (Own function because we might want to animate some things)
		 * @param {string} data The html that replaces the current one
		 */
		_replaceRows: function(data) {
			// if (utils.isIe9()) {
			// 	var that = this;
			// 	var tmpHtml = $("<div/>").html(data);
			// 	var gridRows = tmpHtml.find(".grid-row");
				
			// 	this.productListContainer.empty();
			// 	gridRows.each(function(){
			// 		that.productListContainer.append(this);
			// 	});

			// 	$('#coreMetricsAjax').replaceWith(tmpHtml.find('#coreMetricsAjax'));
			// } else {
				this.productListContainer.html(data);
			// }
		},

		/**
		 * handleAjaxComplete
		 * Handles the response given by ajax calls, either filtering/sorting or loading more products
		 * @param {string} event The event that was triggered
		 * @param {object} data The data passed with the event, contains the response from the ajax call
		 */
		handleAjaxComplete: function(event, data){
			var newRows;

			if (event === this.platform.cons.LOAD_MORE_COMPLETE) {
				var response = data.response;

				// If it's IE9, we need to prevent a bug that makes it display more columns than really exist
				// this happens due to whitespace between the markup on those columns
				if (utils.isIe9()) {
					var expr = new RegExp('>[ \t\r\n\v\f]*<', 'g');
					response = response.replace(expr, '><');
				}

				if (data.actionType === "loadMore") {
					this._appendNewRows(response);
				}
				if (data.actionType === "filter") {
					this.newRowStartIndex = 0;
					this._replaceRows(response);
				}
				
				if (this.newRowStartIndex > 0) {
					newRows = this.productListContainer.find(".grid-row:gt(" + parseInt(this.newRowStartIndex, 10) + ")");
				} else {
					newRows = this.productListContainer.find(".grid-row");
				}

				this.initializePlugins(newRows);
				this.adjustGridRowHeights(this.newRowStartIndex);
				// Show CMS blocks if required
				this.handleCmsBlocks("ajaxComplete", this.cmsBlocks);

				// ACo
				// Added so the appended products' alternate images get the event assigned too and prevents 
				// them from opening on a new page
				this.productListContainer.find(".alternate-views").delegate("a", "click", this.handleAlternateViewClick);
			}
		},

		handleAlternateViewClick: function (e) {
			var $target = $(e.currentTarget),
			$product = $target.parents(".product"),
			imageUrl = $target.attr("href"),
			$tmpImage = $("<img />").addClass("tmpimg");

			e.preventDefault();

			if (!$target.hasClass("selected")) {
				if ($product.find(".thumbnail .tmpimg").length > 0) {
					$product.find(".thumbnail .tmpimg").remove();
				}

				$tmpImage.attr("src", imageUrl);
				$product.find(".photo").css("display","");
				$product.find(".thumbnail")
					.addClass("show-alternative")
					.find("a")
					.append($tmpImage);

				$target
					.siblings("a")
					.removeClass("selected")
					.end()
					.addClass("selected");
			}
		},

		/**
		 * handlelistviewVerticalAlign
		 * @Deprecated PPTWO-199
		 */
		handlelistviewVerticalAlign:function () {
			p2p.startTimer("listviewVerticalAlign");

			// Vertical align the information and add to bag in the listview
			if (this.productListContainer.hasClass("listview")) {
				// Reset all manually sized items so they can be re-measured
				this.productListContainer.find(".information,.price-atb").height("auto");
				this.productListContainer.find(".information").each(function () {
					var $t = $(this),
						$atb = $t.siblings(".price-atb"),
						$av = $t.siblings(".alternate-views"),
						$parent = $t.parents(".details"),
						mt = ($parent.innerHeight() - $t.height() - $av.innerHeight()) * 0.25,
						mb = ($parent.innerHeight() - $t.height() - $av.innerHeight()) * 0.75;

					$t.css({ marginTop: mt + "px", marginBottom: mb + "px" });
					$atb.css({ marginTop: mt + "px", marginBottom: mb + "px" });
				});
			}
			p2p.endTimer("listviewVerticalAlign");
		},

		/**
		 * Simulate a click on the link to the product detail page
		 */
		gotoProductDetails: function(event){
			var currentTarget = $(event.currentTarget);
			var target = $(event.target);
			var url;
			if (target.parents(".add-to-bag").length === 0) {
				if (currentTarget.parents(".hproduct").length > 0 && currentTarget.parents(".hproduct").find(".thumbnail > a").length > 0) {
					url = currentTarget.parents(".hproduct").find(".thumbnail > a").attr("href");
					currentTarget.parents(".hproduct").find(".thumbnail > a").click();
				}
			}
		}
	};

	return p2p.add("grid", grid, baseModule);
});
define('modules/filterSelectionBarClearALL',["app/p2p", "modules/baseModule", 'jquery'], function (p2p, baseModule, $) {
	var filterSelectionBarClearAll;

	filterSelectionBarClearAll = {
		init: function () {
			this.platform.cons.add("FILTERSELECTION_CLEARALL", "filterselection_clearall");
			this.platform.cons.add("FILTERSELECTION_ClEAR", "filterselection_clear");
		},

		cache: function () {
			this.$selectionBar = $('#selectionBar');
			this.$selectionFilters = $('#selectedFilters');
			this.$clearAllFilters = $('#clearAllFilters');
			this.$selectionFilterClears = $("#selectedFilters").on("click", ".selectionFilterRemove", this.handleClearClick);
			this.$selectionFilterClears = $("#selectedFilters").on("mousedown", ".selectionFilterRemove", function () {
				$(this).addClass('active');
			});
		},
		bind: function () {
			this.$clearAllFilters.click(this.handleClearAllClick);
			this.$clearAllFilters.mousedown(function () {
				$(this).addClass('active');
			});
			this.$clearAllFilters.mouseup(function () {
				$(this).removeClass('active');
			});
		},
		render: function () {
		},
		handleClearAllClick: function () {

			this.publish(this.platform.cons.FILTERSELECTION_CLEARALL, {});
			this.$selectionFilters.children().remove();
			this.$clearAllFilters.hide();
			this.$selectionBar.hide();
		},
		handleClearClick: function (e) {
			var $this = $(e.currentTarget);

			var obj = {};
			var parent = $this.parents('.selectionFilter');
			obj.Id = parent.prop('id');
			obj.FilterType = parent.data('filtertype');

			this.publish(this.platform.cons.FILTERSELECTION_CLEAR, obj);
			this.$selectionFilters.children().remove("#" + obj.Id);

			//show clear all when more than 2 items to clear
			if (this.$selectionFilters.children().length > 1) {
				this.$clearAllFilters.show();
			} else {
				this.$clearAllFilters.hide();
			}

			//hide selection bar area when it has no selected filters
			if (this.$selectionFilters.children().length === 0) {
				this.$selectionBar.hide();
			}
		}
	};

	return p2p.add("filterSelectionBarClearAll", filterSelectionBarClearAll, baseModule);
});
define('modules/filters',["modules/filterSelectionBarClearALL", "app/p2p", "modules/baseModule", 'jquery', 'modules/utils', "underscore"],
	function (filterSelectionBarClearAll, p2p, baseModule, $, utils, _) {
		var filterSelection, $selectionBar, $dropDownFilterButtons, $filterDropDownLists, $productView, $containerfilters, $selectDropDown, cancelSortDropClock = false;

		filterSelection = {
			init: function () {
				this.platform.cons.add("FILTERSELECTION_ADD", "filterselection_add");
				this.platform.cons.add("FILTERSELECTION_REMOVE", "filterselection_remove");
				this.platform.cons.add("FILTERSELECTION_SORT_CHANGE", "filterselection_sort_change");
				this.platform.cons.add("BROWSER_RESIZED", "browser-resized");
				this.platform.cons.add("FILTER_SHOWN", "FILTER_SHOWN");
				this.platform.cons.add("DISABLE_FILTERS", "disable_filters");
			},

			cache: function () {
				this.$filtercontent = $('.filtercontent');
				this.$filtercontentClickable = this.$filtercontent.not('notClickable, .notClickable');
				this.$productView = $('#product-view');
				this.$filterDropDownLists = $('.dropdown-list');
				this.$containerfilters = $('.container-filters');
				this.$dropDownFilterButtons = $('.btn.dropdown-button', this.$productView);
				this.$selectionBar = $('#selectionBar');
				this.$selectDropDown = $('#selectDropDown');
				this.$selectDropDownText = $('.current-selection', this.$selectDropDown);
				this.$sortDropdownSelectList = $('#sortDropdownSelectList');
				this.$SelectDropDownItems = $('.dropdown-open-btn', this.$sortDropdownSelectList);
			},

			bind: function () {
				this.$SelectDropDownItems.click(this.handleSelectDropDown);
				this.$filtercontentClickable.click(this.handleFilterClick);
			},

			render: function () {
				this.subscribe(this.platform.cons.FILTERSELECTION_CLEARALL, this.handleFILTERSELECTION_CLEARALL);
				this.subscribe(this.platform.cons.FILTERSELECTION_CLEAR, this.handleFILTERSELECTION_CLEAR);
				this.subscribe(this.platform.cons.BROWSER_RESIZED, this.handleResize);
				this.subscribe(this.platform.cons.FILTER_SHOWN, this.handleFilterShown);
				this.subscribe(this.platform.cons.DISABLE_FILTERS, this.handleFilterDisable);
			},

			handleResize: function (event, resizeInfo) {
				var knownGridColCount = this.$productView.data("gridcolcount");
				var newGridColCount = resizeInfo.gridColCount;
				if (knownGridColCount != newGridColCount) {
					this.gridColsChanged(newGridColCount);
				}
			},

			gridColsChanged: function (gridColCount) {
				// The number of grid columns being displayed has changed
				// Remember the current column count
				this.$productView.data("gridcolcount", gridColCount);
				if (gridColCount == 5) {
					// In 5 column mode, the first column is a label
					gridColCount = 4;
				}
				this.processFragranceNameColumns("A", "C", gridColCount);
				this.processFragranceNameColumns("D", "F", gridColCount);
				this.processFragranceNameColumns("G", "L", gridColCount);
				this.processFragranceNameColumns("M", "O", gridColCount);
				this.processFragranceNameColumns("P", "S", gridColCount);
				this.processFragranceNameColumns("T", "Z", gridColCount);
				this.fragranceTabsSameHeight();

				$('.FragranceTabContent a').not('notClickable').click(this.handleFrangranceAZ);
			},

			fragranceTabsSameHeight: function () {
				// Make all pages the same height
				//$(".FragranceTabContent").css("height", "auto");
				// Need to temporarily change styles so that we can measure the invisible panels
				$(".FragranceTabContent").css({
					display: "block",
					position: "absolute",
					left: "-3000px",
					width: "800px"
				});
				var maxHeight = 0;
				$(".FragranceTabContent").each(function () {
					var height = $(this).outerHeight();
					if (height > maxHeight) {
						maxHeight = height;
					}
				});
				$(".FragranceTabContent").css({
						display: "none",
						position: "static",
						left: "0px",
						width: "100%",
						"min-height": maxHeight + "px"
					});
				$($("#FragranceLettersTabs a.active").attr("href")).show();
			},

			processFragranceNameColumns: function (letterStart, letterEnd, gridColCount) {
				if (typeof filterFragrances == "undefined") {
					return;
				}

				var container = $("#Fragrance" + letterStart + letterEnd);

				// Get the fragrances in each letter
				var fragranceLetters = [];
				var lineCount = 0;
				var i, l;
				for (i = letterStart.charCodeAt(0); i <= letterEnd.charCodeAt(0); i++) {
					l = String.fromCharCode(i);
					fragranceLetters[l] = _.where(filterFragrances, { letter: l });
					lineCount += 1; // One for the letter header
					lineCount += 1; // One for the space before the next header
					lineCount += fragranceLetters[l].length;
				}
				lineCount -= 1; // The last header doesn't need a space after it.
				var minRows = Math.ceil(lineCount / gridColCount);

				var rows = 0;
				var cols = [];
				var col = [];
				var letterFragranceCount;
				for (i = letterStart.charCodeAt(0); i <= letterEnd.charCodeAt(0); i++) {
					l = String.fromCharCode(i);
					letterFragranceCount = fragranceLetters[l].length;
					if (letterFragranceCount === 0) {
						// No fragrances starting with this letter
						continue;
					}

					// Add a blank before the next letter (except for the first letter at the top of a column)
					if (rows > 0) {
						rows += 1;
					}

					// Start the letter on a new column?
					if ((rows > (minRows - 2)) && (cols.length + 1 < gridColCount)) {
						cols.push(col);
						col = [];
						rows = 0;
					}

					// Add a letter heading
					col.push($("<h5>").text(l));  // <span class="letterSection">
					rows += 1;

					var fragranceCount = 0;
					_.each(fragranceLetters[l], function (f) {
						fragranceCount += 1;
						if ((rows >= minRows) && (cols.length + 1 < gridColCount)) {
							// Don't push the last fragrance to a new row - squeeze it in
							if (fragranceCount < fragranceLetters[l].length) {
								cols.push(col);
								col = [];
								rows = 0;
							}
						}

						// Add a fragrance
						var link = $("<a>").text(f.name).attr("href", f.href).attr("data-href", f.href).prop("id", f.id);
						col.push(link); // class= FragranceTabContentLink
						rows += 1;
					});
				}
				cols.push(col);

				// Output
				container.html("");
				_.each(cols, function (col) {
					var ul = $("<ul>");
					_.each(col, function (row) {
						var li = $("<li>");
						li.append(row);
						ul.append(li);
					});
					container.append(ul);
				});
			},

			handleFilterClick: function (e) {
				e.preventDefault();

				var $this = $(e.currentTarget),
					newFilterSelected = false;

				if ($this.hasClass("notClickable")) {
					return;
				}

				var currentlySelect = $this.hasClass('selectedFilter');
				var $filterContainer = $this.parent();
				var $existingSelectedFilter = $('.selectedFilter', $filterContainer);

				if ($existingSelectedFilter.length > 0) {
					var $elmt = $('.filterElement', $existingSelectedFilter);
					if (!currentlySelect) {
						newFilterSelected = true;
					}
					this.handleFILTERSELECTION_CLEAR(null, { "Id": $elmt.prop('id'), "FilterType": "filter", "newFilterSelected": newFilterSelected });
				}

				if (currentlySelect) {
					return;
				}

				$this.addClass('selectedFilter');

				var obj = {};
				obj.Text = $('span',$this).text();
				obj.Filter = getFilters($('.filterElement', $this));
				obj.Id = $('.filterElement', $this).prop("id");
				obj.FilterType = "filter";
				this.publish(this.platform.cons.FILTERSELECTION_ADD, obj);

				//hide the filter menu

				this.$filterDropDownLists.css('opacity', 0);
				this.$filterDropDownLists.slideUp();
				this.$dropDownFilterButtons.removeClass('active');
				$('span.caret', this.$dropDownFilterButtons).removeClass('active');

			},

			handleFilterShown: function (e, dropDown) {
				if (dropDown.hasClass("FragranceTemplate")) {
					this.fragranceTabsSameHeight();
				}
			},

			handleFrangranceAZ: function (e) {
				e.preventDefault();
				var $this = $(e.currentTarget);

				if ($this.hasClass("notClickable")) {
					return;
				}

				var currentlySelect = $this.hasClass('selectedFilter');
				var $filterContainer = $this.parents('.filtercontainer');
				var $existingSelectedFilter = $('.selectedFilter', $filterContainer);

				if ($existingSelectedFilter.length > 0) {
					this.handleFILTERSELECTION_CLEAR(null, { "Id": $existingSelectedFilter.prop('id'), "FilterType": "filterAZ" });
				}

				if (currentlySelect) {
					return;
				}

				$this.addClass('selectedFilter');

				var obj = {};
				obj.Text = $this.text();
				obj.Filter = getFilters($this);
				// obj.Filter = $this.attr("href").split("&")[2];
				obj.Id = $this.prop("id");
				obj.FilterType = "filterAZ";
				this.publish(this.platform.cons.FILTERSELECTION_ADD, obj);

				//hide the filter menu
				this.$filterDropDownLists.fadeOut('slow');
				this.$dropDownFilterButtons.removeClass('active');
				$('span.caret', this.$dropDownFilterButtons).removeClass('active');
			},

			handleFILTERSELECTION_CLEARALL: function (event, clear) {
				this.$filtercontent.removeClass('selectedFilter');
				$('.FragranceTabContent a').removeClass('selectedFilter');
				this.publish(this.platform.cons.FILTERSELECTION_REMOVE, []);
			},

			handleFILTERSELECTION_CLEAR: function (event, clear) {
				var obj = {};
				obj.newFilterSelected = clear.newFilterSelected || false;
				if (clear.FilterType == "filterAZ") {
					var $filterAZ = $('#' + clear.Id);
					$filterAZ.removeClass('selectedFilter');
					obj.Text = $filterAZ.text();
					obj.Filter = getFilters($filterAZ);
					// obj.Filter = $filterAZ.attr("href").split("&")[2];
					obj.Id = $filterAZ.prop("id");
				} else {
					//var $filterContent = $('#' + clear.Id).parent();
					var $filterContent = $('img[id="' + clear.Id + '"]').length === 1 ? $('img[id="' + clear.Id + '"]').closest('.selectedFilter') : $('div[id="' + clear.Id + '"]').closest('.selectedFilter');

					//this.$filtercontent.children().filter('#' + clear.Id).parent().removeClass('selectedFilter');
					//cannot have multiple same id ie #red
					$filterContent.removeClass('selectedFilter');

					obj.Text = $('span', $filterContent).text();
					obj.Filter = getFilters($('.filterElement', $filterContent));
					//obj.Filter = $('.filterElement', $filterContent).attr("data-href").split("&")[2];
					obj.Id = $('.filterElement', $filterContent).prop("id");
				}
				this.publish(this.platform.cons.FILTERSELECTION_REMOVE, obj);
			},

			handleSelectDropDown: function (e) {
				var $this = $(e.currentTarget);
				var obj = {};
				obj.Text = $this.text();
				obj.Filter = $this.attr("href");
				obj.Id = $this.prop("id");
				obj.FilterType = "sort";
				this.publish(this.platform.cons.FILTERSELECTION_SORT_CHANGE, obj);

				this.$selectDropDownText.text(obj.Text);

				this.$filterDropDownLists.hide();
				this.$dropDownFilterButtons.removeClass('active');
				$('span.caret', $dropDownFilterButtons).removeClass('active');

				e.preventDefault();
			},
			handleFilterDisable: function (event, filterData) {
				var clickableItems = [];
				for (var property in filterData) {
					if (_.isArray(filterData[property])) {
						clickableItems.push(filterData[property]);
					}
				}

				clickableItems = _.flatten(clickableItems);

				//find item that are not available
				var disableItems = _.reject(this.$productView.find("img"), function (value) {
					return _.contains(clickableItems, value.id);
				});

				_.each(disableItems, function (value, index) {
					var $this = $(value);

					$this.css("opacity", 0.2).parent().addClass("notClickable");
				});

				//find item that are not available for AZ tab
				var disableItemsAZ = _.reject($(".FragranceTabContent").find("a"), function (value) {
					return _.contains(clickableItems, value.id);
				});

				_.each(disableItemsAZ, function (value, index) {
					var $this = $(value);

					$this.css("opacity", 0.2).addClass("notClickable");
				});

				//find item that are not available for colour tab
				var disableItemsColour = _.reject($(".Color"), function (value) {
					return _.contains(clickableItems, value.id);
				});

				_.each(disableItemsColour, function (value, index) {
					var $this = $(value);

					$this.parents(".filtercontent").addClass("notClickable").removeClass("colorAvailable_true").addClass("colorAvailable_false");
				});

				_.each(clickableItems, function (value, index) {
					$('a[id="' + value + '"]').removeClass("notClickable").css("opacity", 1);
					$('div[id="' + value + '"]').parents(".filtercontent").removeClass("notClickable").removeClass("colorAvailable_false").addClass("colorAvailable_true");
					$('img[id="' + value + '"]').css("opacity", 1).parent().removeClass("notClickable");
				});

			}
		};

		function getFilters(element) {
			var parameters = utils.getQueryParameters(element.attr("data-href"));
			var result;
			if (parameters.f != null) {
				result = "f=" + parameters.f.replace("&", "%26").replace('%26#038;', '%26');

				if (parameters.fr != null) {
					result += "&fr=" + parameters.fr.replace('&#038;', '&amp;');
				}
			}
			else if (parameters.fr != null) {
				result = "fr=" + parameters.fr.replace('&#038;', '&amp;');
			}

			return result;
		}

		function cacheSelectors() {
			$productView = $('#product-view');
			$containerfilters = $('.container-filters');
			$dropDownFilterButtons = $('.btn.dropdown-button', $productView);
			$filterDropDownLists = $('.dropdown-list');
			$selectDropDown = $('#selectDropDown');
			$selectionBar = $('#selectionBar');
		}

		function init() {
			cacheSelectors();

			//This is to close the sort dropdown values anywhere outside the dropdown.
			$(document).mouseup(function (e) {
				var $container = $("#sortDropdownSelectList");

				if (!$container.is(e.target) && $container.has(e.target).length === 0 && $container.css("display") !== "none") {
					$container.hide().prev().removeClass("active");
					cancelSortDropClock = true;
				}
			});

			//This is to where around IE Active issue. Instead add the class active instead.
			$dropDownFilterButtons.mousedown(function () {
				$(this).addClass('active');
			});
			$dropDownFilterButtons.mouseup(
				function () {
					$(this).removeClass('active');
				});

			// Filter selected or de-selected
			$dropDownFilterButtons.click(function (e) {
				e.preventDefault();

				var $this = $(this);
				var filterContainerId = $(this).attr('href');
				var $dropDown = $(filterContainerId);
				var isVisible = $dropDown.css("display") !== "none";

				$filterDropDownLists.each(function () {
					var otherDropDown = $(this);
					if (otherDropDown != $dropDown) {
						otherDropDown.css('opacity', 0);
						otherDropDown.slideUp();
					}
				});

				$dropDownFilterButtons.removeClass('active');

				if (!isVisible) {
					$this.addClass('active');
					$dropDown.css('opacity', 0);
					$dropDown.slideDown();
					$dropDown.animate({ opacity: 1 });
					p2p.publish(p2p.cons.FILTER_SHOWN, $dropDown);
					utils.lazyLoadImages($dropDown.find("img.filterElement"));
				}

				cancelSortDropClock = false;
			});

			$selectDropDown.click(function (e) {
				var $this = $(this);
				var $dropDown = $this.next('.dropdown-list');

				$dropDownFilterButtons.removeClass('active');
				$('span.caret', $dropDownFilterButtons).removeClass('active');
				if (!cancelSortDropClock) {
					$this.addClass('active');
					$('span.caret', $this).addClass('active');
					$dropDown.show();
					$dropDown.css('opacity', 1);
					utils.lazyLoadImages($dropDown.find("img.filterElement"));
				}

				cancelSortDropClock = false;
			});

			$(".ColorFilterTemplate").on("mouseenter", ".filtercontent.colorAvailable_true", function () {
				$('.filtercontent.colorAvailable_true').css('opacity', 0.8);
				$(this).css('opacity', 1);
			});

			$(".ColorFilterTemplate").on("mouseleave", ".filtercontent.colorAvailable_true", function () {
				$('.filtercontent.colorAvailable_true').css('opacity', 1);
			});


			$(".FilterTemplate2,.FilterTemplate3").on("mouseenter", ".filtercontent:not(.notClickable)", function () {
				$('.FilterTemplate2 .filtercontent:not(.notClickable) ,.FilterTemplate3 .filtercontent:not(.notClickable)').css('opacity', 0.5);
				$(this).css('opacity', 1);
			});

			$(".FilterTemplate2 ,.FilterTemplate3").on("mouseleave", ".filtercontent:not(.notClickable)", function () {
				$('.FilterTemplate2 .filtercontent:not(.notClickable) ,.FilterTemplate3 .filtercontent:not(.notClickable)').css('opacity', 1);
			});

			$('ul.tabs').each(function () {
				// For each set of tabs, we want to keep track of
				// which tab is active and it's associated content
				var $active, $content, $links = $(this).find('a');

				// If the location.hash matches one of the links, use that as the active tab.
				// If no match is found, use the first link as the initial active tab.
				$active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
				$active.addClass('active');
				$content = $($active.attr('href'));

				// Hide the remaining content
				$links.not($active).each(function () {
					$($(this).attr('href')).hide();
				});

				// Bind the click event handler
				$(this).on('mouseenter', 'a', function (e) {
					// Make the old tab inactive.
					$active.removeClass('active');
					$content.hide();

					// Update the variables with the new link and content
					$active = $(this);
					$content = $($(this).attr('href'));

					// Make the tab active.
					$active.addClass('active');
					$content.show();
					// Prevent the anchor's default click action
					e.preventDefault();
				});
			});
		}

		$(document).ready(function () {
			if ($(".content-dsi").length < 1) {
				return;
			}
			init();
		});

		return p2p.add("filterSelection", filterSelection, baseModule);
	});



define('modules/filterSelectionBar',["modules/utils", "modules/filters", "app/p2p", "modules/baseModule", 'jquery', "underscore"], function (utils, filters, p2p, baseModule, $, _) {
	var filterSelectionBar;

	filterSelectionBar = {
		init: function () {
			this.filters = {};
			this.filters.f = [];
			this.filters.s = "";
			this.platform.cons.add("LOAD_MORE", "load_more");
		},

		cache: function () {
			this.$selectionBar = $('#selectionBar');
			this.$selectionFilters = $('#selectedFilters');
			this.$selectedFilterTemplate = $('#filterTemplate');
			this.$clearAllFilters = $('#clearAllFilters');
			this.$productView = $('#product-view');
		},
		bind: function () {
			this.$clearAllFilters.click(this.handleClearAllClick);
		},
		render: function () {
			this.subscribe(this.platform.cons.FILTERSELECTION_ADD, this.handleFILTERSELECTION_ADD);
			this.subscribe(this.platform.cons.FILTERSELECTION_REMOVE, this.handleFILTERSELECTION_REMOVE);
			this.subscribe(this.platform.cons.FILTERSELECTION_SORT_CHANGE, this.handleSORT_CHANGE);
		},
		handleFILTERSELECTION_ADD: function (event, filter) {
			var $selectedfilter = this.$selectedFilterTemplate.clone();

			$selectedfilter.prop("id", filter.Id);
			$selectedfilter.data("filtertype", filter.FilterType);
			$('.selectionFilterText', $selectedfilter).text(filter.Text);

			this.$selectionFilters.append($selectedfilter);
			this.$selectionBar.show();

			//show clear all when more than 2 items to clear
			if (this.$selectionFilters.children().length > 1) {
				this.$clearAllFilters.show();
			} else {
				this.$clearAllFilters.hide();
			}

			if (typeof this.filters.f === 'undefined') {
				this.filters.f = [];
			}
			this.filters.f.push(filter.Filter);

			this.loadNewFilters();

			this.publish(this.platform.cons.CHANGE_LOAD_MORE, this.filters);
		},
		handleFILTERSELECTION_REMOVE: function (event, filter) {
			if (_.isArray(filter)) {
				this.filters.f = [];

				if (filter.newFilterSelected !== true) {
					this.loadNewFilters();
					this.publish(this.platform.cons.CHANGE_LOAD_MORE, this.filters);
				}
				return;
			}

			this.$selectionFilters.children('#' + filter.Id).remove();

			//hide the clear all when only 1 item to show
			if (this.$selectionFilters.children().length === 1) {
				this.$clearAllFilters.hide();
			}

			//hide selection bar area when it has no selected filters
			if (this.$selectionFilters.children().length === 0) {
				this.$selectionBar.hide();
			}

			this.filters.f = _.without(this.filters.f, filter.Filter);

			if (filter.newFilterSelected !== true) {
				this.loadNewFilters();
				this.publish(this.platform.cons.CHANGE_LOAD_MORE, this.filters);
			}
		},
		handleSORT_CHANGE: function (event, sort) {
			this.filters.s = sort.Filter;

			this.publish(this.platform.cons.CHANGE_LOAD_MORE, this.filters);
		},
		loadNewFilters: function () {
			var parameters = utils.getQueryParametersString();
			if (parameters.length > 0)
				parameters = "?" + parameters;
			$.ajax({
				url: this.applyFilters("/include/p2p-parametric_nav_ajax.jsp" + parameters, this.filters.f),
				cache: false
			}).done(this.loadNewFiltersComplete)
				.fail(this.handleoadNewFiltersError);
		},
		handleoadNewFiltersError: function (xhr, textStatus) {
			this.log("Request failed: " + textStatus);
		},

		loadNewFiltersComplete: function (data) {
			var filterData = JSON.parse(data);
			
			/*  Not hiding the filters anymore
			if ($.isEmptyObject(filterData)) {
				this.$productView.hide();
			}*/

			this.publish(this.platform.cons.DISABLE_FILTERS, filterData);
		},
		applyFilters: function (url, filters) {
			if (typeof filters === "undefined") {
				return url;
			}

			$.each(filters, function (index, value) {
				if (url.indexOf("?") === -1) {
					url = url + "?";
				}
				url = url + "&" + value;
			});

			return url;
		}
	};

	return p2p.add("filterSelectionBar", filterSelectionBar, baseModule);
});

define('modules/utilitynavigation',["jquery", "app/p2p", "modules/baseModule", "modules/utils"], function ($, p2p, BaseModule, utils) {

	var utilityNavigation = {

		settings: {
			slideSpeed: "normal"
		},

		container: "#utilitynavigation",

		init: function () {
			this.platform.cons.add("CLOSE_NAV_DRAWER", "close-nav-drawer");
		},

		cache: function () {
			this.accountLink = this.body.find(".util-account-link");
			this.slideContent = this.body.find(".slide-content");
			this.header = $("#header");
			// this.fixedNav1 = $("#fixedNav1");
			this.categoryContainer = $(".categoryContainer");
			this.fixedHeaderBlock = $('#fixedHeaderBlock');
			this.loginLink = $('.welcome-message a');
			this.loginForm = $("#returningCustomerP2P");
		},

		bind: function () {
			this.accountLink.on("click", this.toggleAccountLink);
			this.loginLink.on("click", this.toggleAccountLink);
			this.loginForm.on("keypress", this.handleKeypress);
		},

		toggleAccountLink: function (ee) {
			if (utils.isUserLoggedIn()) {
				return true;
			} else {
				ee.preventDefault();
				if (!this.accountLink.is(":animated")) {
					if (this.accountLink.hasClass("active")) {
						this.collapseAccountLink();
					} else {
						this.expandAccountLink();
					}
				}
			}
		},

		expandAccountLink: function () {

			var utilitynavigationHeight = 109; // love these..

			this.fixedHeaderBlock.removeAttr('style');
			this.previousFixedBlockHeight = this.fixedHeaderBlock.height();

			// In the 3 columns snap point, we have to push the content further down
			// because the header has 31 pixels more for the 2nd row of menus
			if ($('body.size-small').length > 0) {
				utilitynavigationHeight = 143; // ..random numbers
			}

			var previousHeight = this.previousFixedBlockHeight;
			var fixedBlock = this.fixedHeaderBlock;
			this.slideContent.stop()
				.addClass("active")
				.slideDown(this.settings.slideSpeed, function () {
					animating = false;
				});

			var newFixedBlockHeight = previousHeight + utilitynavigationHeight - 35;
			fixedBlock.animate({'height': newFixedBlockHeight });

			this.header.animate({'margin-top': utilitynavigationHeight });
			// this.fixedNav1.animate({'margin-top': newFixedBlockHeight });
			this.accountLink.addClass("active");

			$('body').toggleClass('utilitynavigationActive');

			this.platform.publish(this.platform.cons.CLOSE_NAV_DRAWER);
		},

		collapseAccountLink: function (menuHover) {

			if (!$('body').hasClass('utilitynavigationActive')) {
				return;
			}
			$('body').toggleClass('utilitynavigationActive');

			if (!menuHover) {
				this.fixedHeaderBlock.animate({'height': this.previousFixedBlockHeight}, function () {
					$(this).removeAttr('style');
				});
			}
			var header = this.header;
			// var fixedNav1 = this.fixedNav1;
			this.header.animate({'margin-top': '35px' }, function () {
				header.removeAttr('style');
			});

			// this.fixedNav1.animate({'margin-top': '150px' }, function () {
			// 	fixedNav1.removeAttr('style');
			// });

			this.slideContent.stop()
				.slideUp(this.settings.slideSpeed, function () {
					animating = false;
					$(this).removeClass("active");
				});
			this.accountLink.removeClass("active");
		},

		handleKeypress: function (e) {
			var key = e.which;
			if (key === 13) { // Enter key
				valLoginP2P();
				e.currentTarget.submit();
			}
		}

	};

	return p2p.add("utilityNavigation", utilityNavigation, BaseModule);
});
define('tpl/storelocatordialog',['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"store-locator-footer-dialog\" class=\"reveal-modal store-locator-dialog\">\n	<div class=\"content\">\n		<div class=\"text\">Please enter a zip code and continue.</div>\n		<div class=\"button-container\"><a class=\"button-inverted\">OK</a></div>\n	</div>\n</div>";
  })

});
/*! http://mths.be/placeholder v2.0.7 by @mathias */
/* global define */
define('jquery.placeholder',["jquery"], function($) {

    var isInputSupported = 'placeholder' in document.createElement('input'),
        isTextareaSupported = 'placeholder' in document.createElement('textarea'),
        prototype = $.fn,
        valHooks = $.valHooks,
        hooks,
        placeholder;

    if (isInputSupported && isTextareaSupported) {

      placeholder = prototype.placeholder = function() {
        return this;
      };

      placeholder.input = placeholder.textarea = true;

    } else {

      placeholder = prototype.placeholder = function() {
        var $this = this;
        $this
          .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
          .not('.placeholder')
          .bind({
            'focus.placeholder': clearPlaceholder,
            'blur.placeholder': setPlaceholder
          })
          .data('placeholder-enabled', true)
          .trigger('blur.placeholder');
        return $this;
      };

      placeholder.input = isInputSupported;
      placeholder.textarea = isTextareaSupported;

      hooks = {
        'get': function(element) {
          var $element = $(element);
          return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
        },
        'set': function(element, value) {
          var $element = $(element);
          if (!$element.data('placeholder-enabled')) {
            return element.value = value;
          }
          if (value == '') {
            element.value = value;
            // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
            if (element != document.activeElement) {
              // We can't use `triggerHandler` here because of dummy text/password inputs :(
              setPlaceholder.call(element);
            }
          } else if ($element.hasClass('placeholder')) {
            clearPlaceholder.call(element, true, value) || (element.value = value);
          } else {
            element.value = value;
          }
          // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
          return $element;
        }
      };

      isInputSupported || (valHooks.input = hooks);
      isTextareaSupported || (valHooks.textarea = hooks);

      $(function() {
        // Look for forms
        $(document).delegate('form', 'submit.placeholder', function() {
          // Clear the placeholder values so they don't get submitted
          var $inputs = $('.placeholder', this).each(clearPlaceholder);
          setTimeout(function() {
            $inputs.each(setPlaceholder);
          }, 10);
        });
      });

      // Clear placeholder values upon page reload
      $(window).bind('beforeunload.placeholder', function() {
        $('.placeholder').each(function() {
          this.value = '';
        });
      });

    }

    function args(elem) {
      // Return an object of element attributes
      var newAttrs = {},
          rinlinejQuery = /^jQuery\d+$/;
      $.each(elem.attributes, function(i, attr) {
        if (attr.specified && !rinlinejQuery.test(attr.name)) {
          newAttrs[attr.name] = attr.value;
        }
      });
      return newAttrs;
    }

    function clearPlaceholder(event, value) {
      var input = this,
          $input = $(input);
      if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
        if ($input.data('placeholder-password')) {
          $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
          // If `clearPlaceholder` was called from `$.valHooks.input.set`
          if (event === true) {
            return $input[0].value = value;
          }
          $input.focus();
        } else {
          input.value = '';
          $input.removeClass('placeholder');
          input == document.activeElement && input.select();
        }
      }
    }

    function setPlaceholder() {
      var $replacement,
          input = this,
          $input = $(input),
          $origInput = $input,
          id = this.id;
      if (input.value == '') {
        if (input.type == 'password') {
          if (!$input.data('placeholder-textinput')) {
            try {
              $replacement = $input.clone().attr({ 'type': 'text' });
            } catch(e) {
              $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
            }
            $replacement
              .removeAttr('name')
              .data({
                'placeholder-password': true,
                'placeholder-id': id
              })
              .bind('focus.placeholder', clearPlaceholder);
            $input
              .data({
                'placeholder-textinput': $replacement,
                'placeholder-id': id
              })
              .before($replacement);
          }
          $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
          // Note: `$input[0] != input` now!
        }
        $input.addClass('placeholder');
        $input[0].value = $input.attr('placeholder');
      } else {
        $input.removeClass('placeholder');
      }
    }

});
define('modules/header',[
	"jquery",
	"app/p2p",
	"modules/baseModule",
	"modules/utils",
	"modules/utilitynavigation",
	"underscore",
	"tpl/storelocatordialog",
	"modules/quicklook",
	"jquery.placeholder",
	"app/jquery.doubletap",
	"app/jquery.reveal"
], function ($, p2p, baseModule, utils, utilitynavigation, _, tplStoreLocatorDialog) {

	var header;

	header = {

		$menuContainer: null,
		$subMenuContainer: null,
		$fixedNav: null,
		$nav: null,
		mouseOutTimer: null,

		init: function() {
			this.platform.cons.add("BROWSER_RESIZED", "browser-resized");
		},

		bind: function() {
			this.subscribe(this.platform.cons.BROWSER_RESIZED, this.onBrowserResize);
		},

		cache: function() {
			this.$menuContainer = $("#nav1Titles");
			this.$subMenuContainer = $("#nav1SubMenus");
			this.$fixedNav = $("#fixedNav1");
			this.$nav = $("#nav1");
		},

		render: function() {
			this.log("header:render");
			var wlName,
				url = utils.getUrlNoParameters();

			// Since this is one of the few modules loaded in the cart
			// let's initialize add to bag here
			if ($("body").hasClass("cart") || $("body").hasClass("myAccount")) {
				$(".add-to-bag").addToBag();
			}

			// Initialize placeholder plugin to all inputs/textareas
			$("input, textarea").placeholder();

			// Since we don't have a specific footer file, we
			// initialize it's behaviour here
			this.initializeFooterBehaviours();

			// Our menu links don't have the href set, it's
			// set as data-href, we have javascript, let's fix that
			// was done intentionally to avoid clicks while page loading
			this.enableMenuLinks();

			// If we are in the checkout page, we don't want the menus to work
			// so we return here and all the other functions don't run
			wlName = utils.getQueryParameters()["wlName"];
			if (url.indexOf("/cart/") !== -1 && (typeof wlName == 'undefined' || wlName != 'default')) {
				return false;
			}

			// this.moveBrands();
			this.setupMenu();
		},

		initializeFooterBehaviours: function () {
			// Footer hovers
			if (utils.isTouchDevice()) {
				$('.footerEmailInfo').click(function () {
					var tooltip = $('.toolTip', $(this));
					if (tooltip.is(':visible')) {
						tooltip.hide();
						$(this).removeClass('hover');
					} else {
						tooltip.show();
						$(this).toggleClass('hover');
					}
				});
			} else {
				$('.toolTip').hover(
					function() {},
					function() {
						$(this).removeClass('hover');
						$('.footerEmailInfo').removeClass('hover');
					}
				);

				$('.footerEmailInfo').hover(
					function() {
						var tooltip = $('.toolTip', $(this));
						if (!tooltip.hasClass('hover')) {
							tooltip.addClass('hover');
						}
						if (!$(this).hasClass('hover')) {
							$(this).toggleClass('hover');
						}
					},
					function() {
						var tooltip = $('.toolTip', $(this));
						tooltip.removeClass('hover');
						$('.footerEmailInfo').removeClass('hover');
					}
				);
			}

			// Footer submit buttons
			$(".footerEmailSignupSubmit").off("click", this.submitForm).on("click", this.submitForm);
			$(".footerStoreLocatorSubmit").off("click", this.submitForm).on("click", this.submitForm);

			this._setupValidationForEmailSignup();
			this._setupValidationForStoreLocator();
		},

		/**
		 * Validation for the email signup form
		 */
		_setupValidationForEmailSignup: function() {
			var txtEmailSignup = "Enter Email";
			var txtEmailSignupConfirm = "Confirm Email";

			// we actually have more than 1 form in the footer, so we use .each()
			$(".footerEmailSignupSubmit").each(function(){
				var $form = $(this).parents("form");
				var inpEmail = $form.find(".footerEmailSignupInput");
				var inpEmailConfirm = $form.find(".footerEmailSignupInputConfirm");

				if (inpEmail.val() === "") {
					inpEmail.val(txtEmailSignup);
				}
				if (inpEmailConfirm.val() === "") {
					inpEmailConfirm.val(txtEmailSignupConfirm);
				}

				// Email field behaviour
				inpEmail.on("focus", function() {
					var $t = $(this);
					if ($t.val() === txtEmailSignup) {
						$t.val("");
					}
				});

				inpEmail.on("blur", function() {
					var $t = $(this);
					if ($t.val() == "") {
						$t.val(txtEmailSignup);
					}
				});

				// Confirm email field behaviour
				inpEmailConfirm.on("focus", function(){
					var $t = $(this);
					$t.removeAttr('style');
					if ($t.val() === txtEmailSignupConfirm || $t.val() === "Oops! Not valid" || $t.val() === "You're on the list!") {
						$t.val("");
					}
				});

				inpEmailConfirm.on("blur", function() {
					var $t = $(this);
					if ($t.val() === "") {
						$t.val(txtEmailSignupConfirm);
					}
				});

				// Submit validation
				$form.submit(function(event) {
					var e = inpEmail.val();
					var a = inpEmailConfirm.val();
					if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,9})+$/.test(e)) {
						var c = "bbw_nocontest";
						var d = "Y";
						var b = "emailAddress=" + e + "&emailPref=" + d + "&contest=" + c;
						if (e == a) {
							$.ajax({type: "POST",url: "/emailHandler/index.jsp",data: b,success: function() {
								inpEmailConfirm.val("You're on the list!").css("color", "#005699");
								inpEmail.val('');
							}});
						} else {
							inpEmailConfirm.val("Confirm Email").css("color", "red");
						}
					} else {
						inpEmailConfirm.val("Oops! Not valid").css("color", "red");
					}
					event.preventDefault();
				});
			});
		},

		/**
		 * Validation for the store locator form
		 */
		_setupValidationForStoreLocator: function() {
			var txtEnterZip = "Enter Zip";
			var $quicklook = $(tplStoreLocatorDialog());
			$quicklook.appendTo($("body"));
			$quicklook.find(".button-inverted").on("click", function() {
				$quicklook.trigger('reveal:close');
			});

			$(".footerStoreLocatorSubmit").each(function(){
				var $form = $(this).parents("form");
				var $field = $form.find(".footerStoreLocatorZip");
				if ($field.val() === "") {
					$field.val(txtEnterZip);
				}
				$field.on("focus", function(){
					if ($(this).val() === txtEnterZip) {
						$(this).val("");
					}
				});
				$field.on("blur", function(){
					if ($(this).val() === "") {
						$(this).val(txtEnterZip);
					} else {
						cmCreateConversionEventTag("FOOTER", "1", "STORE LOCATOR", "30", "-_--_-" + ($field.val()));
					}
				});
				$form.submit(function() {
					if (/^\d{5}(-\d{4})?$/.test($field.val())) {
						return true
					} else {

						$quicklook.reveal();

						var win = $(window),
							centerY = win.scrollTop() + win.height() / 2,
							centerX = win.scrollLeft() + win.width() / 2;

						$quicklook.css({
							'margin-left': 0,
							top: centerY - ($quicklook.outerHeight() / 2),
							left: centerX - ($quicklook.outerWidth() / 2)
						});

						return false
					}
				})
			});
		},

		submitForm: function(ee) {
			this.log("header:submitForm");
			$(ee.currentTarget).parents("form").submit();
		},

		// ACo - To allow header fixed/normal setting, on PDP we scroll to top when toggled
		onBrowserResize: function() {
			var width = $(window).width();
			var body = $('body');

			if(typeof showFixedHeader == 'undefined'){
				showFixedHeader = false;
			}

			if (!showFixedHeader || showFixedHeaderAtWidth < 1) {
				return;
			}

			if (width < showFixedHeaderAtWidth) {
				if (!body.hasClass('normalHeader')) {
					body.addClass('normalHeader');
					body.removeClass('fixedHeader');
					if (body.hasClass('productDetailPage')) {
						body.animate({ scrollTop: 0}, 0);
						$('#fixedHeaderBlock').removeClass('hideThis');
					}
				}
			} else {
				if (!body.hasClass('fixedHeader')) {
					body.removeClass('normalHeader');
					body.addClass('fixedHeader');
					body.animate({ scrollTop: 0}, 0);
					$('#fixedHeaderBlock').removeClass('hideThis');
				}
			}
		},

		enableMenuLinks: function() {
			$(".nav1-link").each(function () {
				$(this).attr("href", $(this).data("href"));
			});
		},

		moveBrands: function() {

		},

		setupMenu: function() {
			if (!utils.isTouchDevice()) {
				this.setupDesktopMenu();
			} else {
				this.setupTabletMenu();
			}

			// ACo Menu was showing after scroll, this removes it
			var header = this;
			var nav = this.$nav;
			// $(window).scroll(function () {
			// 	nav.hide();
			// 	var activeMenu = header.$menuContainer.find(".active");
			// 	if (activeMenu.length) {
			// 		header.closeMenu(activeMenu);
			// 	}
			// });
		},

		setupDesktopMenu: function () {
			this.log("Setup Desktop Menu");
			this.$menuContainer.find(".nav1ItemHover").hover(this._delayMouseIn, this.onMouseOut);
			this.$subMenuContainer.find(".nav1-subnav").hover(this.subMenuMouseIn, this.subMenuMouseOut);
		},

		setupTabletMenu: function () {
			// Tablets have close button on subnav
			this.log("Setup Tablet Menu");
			var hdr = this;
			this.$subMenuContainer.find(".closeButton").on("click tap", function (e) {
				e.preventDefault();
				hdr.$menuContainer.find(".active").removeClass("active").removeClass("hover");
				hdr.$subMenuContainer.find(".active").removeClass("active").removeAttr("style");
			});

			// double tap goes to top cat page, if we were using events on <a> this should be free, as we have
			// them in several places, this is the only way i found to fix this without breaking other stuff
			this.$menuContainer.find(".nav1ItemHover").doubletap(function(event){
				window.location.href = $(event.currentTarget).find(".nav1-link").attr("href");
			}, function (event) {
				event[0].preventDefault();
				var menu = $(event[0].currentTarget);
				hdr.log("Menu Item Toggle: " + menu.attr("id"));
				if (menu.hasClass("active")) {
					hdr.closeMenu(menu);
				} else {
					hdr.openMenu(menu);
				}
			});

			// this.$menuContainer.find(".tabletToggleButton").on("click tap", function (e) {
			// 	e.preventDefault();
			// 	var menu = $(this).closest(".nav1ItemHover");
			// 	hdr.log("Menu Item Toggle: " + menu.attr("id"));
			// 	if (menu.hasClass("active")) {
			// 		hdr.closeMenu(menu);
			// 	} else {
			// 		hdr.openMenu(menu);
			// 	}
			// });

			// Page is being drag-scrolled, close any open menu
			// $("body").bind("touchmove", function (e) {
			// 	var activeMenu = hdr.$menuContainer.find(".active");
			// 	if (activeMenu.length) {
			// 		setTimeout(function () {
			// 			activeMenu = hdr.$menuContainer.find(".active");
			// 			if (activeMenu.length) {
			// 				hdr.closeMenu(activeMenu);
			// 			}
			// 		}, 400);
			// 	}
			// });
		},

		isHovering: false,
		_delayMouseIn: function(ee) {
			var that = this;
			if (this.isHovering) {
				this.onMouseIn(ee);
				return;
			} else {
				this.isHovering = setTimeout(function(){
					that._delayMouseIn(ee);
				}, 300);
			}
		},

		onMouseIn: function(ee) {
			this.log("header:onMouseIn");
			var menu = $(ee.currentTarget);
			this.openMenu(menu);
		},

		onMouseOut: function(ee) {
			this.log("header:onMouseOut");
			var menu = $(ee.currentTarget);
			this.closeMenu(menu);
		},

		openMenu: function (menu) {
			var menuOffset = 20,
				submenu = this.$subMenuContainer.find("." + menu.data("submenu")),
				leftPos = menu.position().left, // - $(window).scrollLeft(),
				//topPos = menu.offset().top - $(window).scrollTop(),
				caretLeft = menu.width() / 2 + menuOffset;

			// First hide any other menus
			this.$menuContainer.find(".active").removeClass("active");
			this.$subMenuContainer.find(".active").removeClass("active").removeAttr("style");

			menu.addClass("active");
			menu.addClass("hover");
			submenu.addClass("active")
				//.css("left", leftPos - menuOffset)
								//.css("margin-top", topPos + 30);

				.css("left", leftPos - menuOffset);

			this.$fixedNav.removeClass("hideThis");
			this.$nav.show();

			// Now that the submenu is visible, we need to adjust
			// it's position so it doesn't go outside on the right
			if (leftPos + submenu.width() > $(window).width()) {
				var oldLeftPos = leftPos - menuOffset;
				leftPos -= ((leftPos + submenu.outerWidth()) - $(window).width()) + 10;
				submenu.css("left", leftPos);
				caretLeft += (oldLeftPos - leftPos);
			}

			// Center the top caret under the menu item
			submenu.find(".nav_caret").css("left", caretLeft);
		},

		closeMenu: function (menu) {
			if (menu != null && menu.length) {
				var submenu = this.$subMenuContainer.find("." + menu.data("submenu"));

				clearTimeout(this.isHovering);
				this.isHovering = false;

				menu.removeClass("hover");
				_.delay(this.shouldMenuHide, 200, menu, submenu);
			}
		},

		subMenuMouseIn: function(ee) {
			this.log("header:subMenuMouseIn");
			$(ee.currentTarget).addClass("hover");
		},

		subMenuMouseOut: function(ee) {
			this.log("header:subMenuMouseOut");
			var submenu = $(ee.currentTarget);
			var menu = this.$menuContainer.find("#" + submenu.data("menu"));

			submenu.removeClass("hover");
			_.delay(this.shouldMenuHide, 200, menu, submenu);
		},

		shouldMenuHide: function(menu, submenu) {
			if (submenu.hasClass("hover") || menu.hasClass("hover")) {
				return false;
			}

			menu.removeClass("active");
			submenu.removeAttr("style");
			submenu.removeClass("active");

			// If all our menus are hidden
			if (this.$subMenuContainer.find(".active").length < 1) {
				this.$fixedNav.addClass("hideThis");
				this.$nav.hide();
			}
		}

	};

	return p2p.add("header", header, baseModule);

});

// Header search form - setting the search type
function setSrchType(val) {
	var searchFrom = document.getElementById("rdirFrom");
	searchFrom.value = val;
}

// Needed in PDP, avoiding js error
function resizeProdloop() {
/*var itemsPerRow = 4;
var maxHeight = 0;
var colProducts = $('#mainContent ol.prodloop dl.hproduct')
colProducts.each(function(i) {
var curHeight = $(this).height();
if(curHeight > maxHeight)
maxHeight = curHeight;
if(!((i + 1) % itemsPerRow) || i == colProducts.length - 1) {
for(j = i - (i % itemsPerRow); j <= i; ++j) {
$(colProducts[j]).height(maxHeight);
}
maxHeight = 0;
}
}); */
	return false;
}
//$(resizeProdloop);

/* global define */
/* global loopType */
/* global TOTAL_PRODUCTS */
define('modules/loadmoreEvents',["modules/filters", "app/p2p", "modules/baseModule", 'jquery', 'modules/utils'], function (filters, p2p, baseModule, $, utils) {
	var loadmoreEvents;

	loadmoreEvents = {
		init: function () {
			this.platform.cons.add("LOAD_MORE_COMPLETE", "load_more_complete");
			this.platform.cons.add("LOAD_MORE", "load_more");
			this.platform.cons.add("LOAD_MORE_PRODUCT_COUNT", "load_more_product_count");
			this.platform.cons.add("CHANGE_LOAD_MORE", "change_load_more");
			this.platform.cons.add("INIT_PRODUCT_COUNT", "init_product_count");
			this.platform.cons.add("PRODUCT_COUNT_GRID_ADJUSTED", "product-count-grid-adjusted");
		},

		cache: function () {
			this.$loadMore = $('#familyLoadMore');
		},

		bind: function () {
			this.subscribe(this.platform.cons.LOAD_MORE, this.handleLOAD_MORE);
			this.subscribe(this.platform.cons.VIEW_TOGGLE, this.handleVIEW_TOGGLE);
			this.subscribe(this.platform.cons.CHANGE_LOAD_MORE, this.handleCHANGE_LOAD_MORE);
			this.subscribe(this.platform.cons.INIT_PRODUCT_COUNT, this.handleINIT_PRODUCT_COUNT);
			this.subscribe(this.platform.cons.PRODUCT_COUNT_GRID_ADJUSTED, this.handleAdjustedGridProductCount);
			this.$loadMore.click(this.handleLoadMoreClick);
		},

		render: function () {
			var productsPerPage = (typeof PRODUCTS_PER_PAGE != "undefined")? PRODUCTS_PER_PAGE : 48;

			if (utils.isIe8() || utils.isIe9()) {
				productsPerPage = 24;
			}
			this.totalProducts = (typeof TOTAL_PRODUCTS != "undefined") ? TOTAL_PRODUCTS : 1000;
			this.pageNumber = 0;
			this.productsPerPage = productsPerPage;
			this.skipFirst = 0;
			this.initLoadMore();
			this.actionType = "";
			this.prodloopType = prodloopType;
		},

		initLoadMore: function () {
			if (typeof DSI != "undefined") {
				if (typeof prodloopType === "undefined") {
					prodloopType = '';
				}
				var pageType = 'family';
				if ($("body.search").length > 0) {
					pageType = 'search';
				}

				var trigger = null;
				if (utils.getQueryParameters().view && utils.getQueryParameters().view === "all") {
					var trigger = "scroll";
				}

				DSI.Modules.ajaxLoadMore.init(trigger, {
					totalProducts: parseInt(this.totalProducts),
					productsPerPage: parseInt(this.productsPerPage),
					page: parseInt(this.pageNumber),
					skipFirst: this.skipFirst,
					ajaxFile: '../family/p2p-ajax-retrieve.jsp?pageType=' + pageType,
					loopType: prodloopType,
					handleSuccess: this.handleAjaxSuccess,
					overwriteParameters: {'showAddToBag': showAddToBag}
				});
			}
		},

		handleLOAD_MORE: function () {
			this.actionType = "loadMore";
			DSI.Modules.ajaxLoadMore.config.setWaitCursor = true;
			DSI.Modules.ajaxLoadMore.makeRequest();
		},

		handleCHANGE_LOAD_MORE: function (event, data) {
			this.actionType = "filter";
			if (typeof data.f !== "undefined") {
				DSI.Modules.ajaxLoadMore.filters = data.f;
			}

			DSI.Modules.ajaxLoadMore.sort = data.s;
			DSI.Modules.ajaxLoadMore.config.page = 0;
			DSI.Modules.ajaxLoadMore.config.productCounterStart = 0;
			DSI.Modules.ajaxLoadMore.config.setWaitCursor = true;
			DSI.Modules.ajaxLoadMore.makeRequest();
		},

		handleAjaxSuccess: function (response) {
			var obj = {};
			obj.actionType = this.actionType;
			obj.response = response;
			this.publish(this.platform.cons.LOAD_MORE_COMPLETE, obj);
			this.handlePRODUCT_COUNT(response);

			$('html,body').css('cursor', 'auto');
		},

		handlePRODUCT_COUNT: function (response) {
			var $tmpDiv = $("<div></div>");
			var obj = {};

			$tmpDiv.html(response);

			var $totalProductCount = $('#totalProductCount', $tmpDiv);
			this.totalProducts = $totalProductCount.val();
			obj.productCount = this.totalProducts;
			// obj.newProductsLength = $tmpDiv.find(".product").length;

			if (this.totalProducts >= DSI.Modules.ajaxLoadMore.config.productsPerPage * (DSI.Modules.ajaxLoadMore.config.page) - 1 + DSI.Modules.ajaxLoadMore.config.skipFirst) {
				this.$loadMore.show();
				obj.MoreProducts = true;
			} else {
				this.$loadMore.hide();
				obj.MoreProducts = false;
			}

			this.publish(this.platform.cons.LOAD_MORE_PRODUCT_COUNT, obj);
		},

		handleAdjustedGridProductCount: function(event, data){
			if (data.hasMoreProducts) {
				this.$loadMore.show();
			} else {
				this.$loadMore.hide();
			}
		},

		handleINIT_PRODUCT_COUNT: function (count) {
			var obj = {};
			obj.productCount = count;
			if (obj.productCount >= DSI.Modules.ajaxLoadMore.config.productsPerPage * (DSI.Modules.ajaxLoadMore.config.page) - 1 + DSI.Modules.ajaxLoadMore.config.skipFirst) {
				this.$loadMore.show();
				obj.MoreProducts = true;
			} else {
				this.$loadMore.hide();
				obj.MoreProducts = false;
			}

			this.publish(this.platform.cons.LOAD_MORE_PRODUCT_COUNT, obj);
		},

		handleLoadMoreClick: function (e) {
			// When the load more button is click without any filters applied we need the next page of products.
			// Setting the page number to 1 will give us this result.
			if (DSI.Modules.ajaxLoadMore.config.page === 0) {
				DSI.Modules.ajaxLoadMore.config.page = 1;
			}
			this.actionType = "loadMore";
			DSI.Modules.ajaxLoadMore.config.setWaitCursor = true;
			//var productsPerPage = 75;

			if (utils.isIe8() || utils.isIe9()) {
				productsPerPage = 24;
			}
			DSI.Modules.ajaxLoadMore.config.productsPerPage = this.productsPerPage;
			DSI.Modules.ajaxLoadMore.config.loadMoreClicked = ++DSI.Modules.ajaxLoadMore.config.loadMoreClicked;
			DSI.Modules.ajaxLoadMore.makeRequest();
			e.preventDefault();
		},

		handleVIEW_TOGGLE: function (event, data) {
			DSI.Modules.ajaxLoadMore.config.viewType = data.current.replace("view", "");
		}
	};

	return p2p.add("loadmoreEvents", loadmoreEvents, baseModule);
});

define('tpl/minicart_single_atb',['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<img src=\"";
  if (stack1 = helpers.colorThumbnail) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.colorThumbnail); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" border=\"0\" />\n		";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"size\">";
  if (stack1 = helpers.size) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.size); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<dd class=\"price newPrice\"><span class=\"oldPrice\">";
  if (stack1 = helpers.oldPrice) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.oldPrice); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </span>";
  if (stack1 = helpers.calculatedPrice) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.calculatedPrice); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n		";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<dd class=\"price\">";
  if (stack1 = helpers.calculatedPrice) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.calculatedPrice); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n		";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<dd class=\"promo\">";
  if (stack1 = helpers.promo) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.promo); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n		<dd class=\"redeem\">\n			<a href=\"javascript:void();\">\n				How to Redeem\n				<div class=\"promotion-detail\">\n					<div class=\"arrow\"></div>\n					<div class=\"long\">";
  if (stack1 = helpers.promoDescription) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.promoDescription); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n				</div>\n			</a>\n		</dd>\n		";
  return buffer;
  }

  buffer += "<li class=\"product\">\n	<div class=\"image\">\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.colorThumbnail), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<dl>\n		<dt class=\"fragrance\">";
  if (stack1 = helpers.color) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.color); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dt>\n		<dd class=\"name\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n		<dd class=\"size_qty\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.size), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<span class=\"qty\">Qty: ";
  if (stack1 = helpers.qty) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.qty); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n		</dd>\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.oldPrice), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.promo), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</dl>\n	<div class=\"clearfloat\"></div>\n</li>";
  return buffer;
  })

});
define('tpl/minicart_footer',['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function";


  buffer += "<div class=\"minicart-footer\">\n	<div class=\"summary\">\n		<div class=\"items_in_bag\">Items in your bag: ";
  if (stack1 = helpers.itemCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.itemCount); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n		<div class=\"subtotal\">Subtotal ";
  if (stack1 = helpers.itemTotValue) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.itemTotValue); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	</div>\n	<div class=\"controls\">\n		<a href=\"#continue-shopping\" class=\"button lighter continue-shopping\">\n			Continue shopping\n		</a>\n		<a href=\"../cart/index.jsp\" class=\"button-inverted-bg view-bag\">\n			View bag &amp; Check out\n		</a>\n	</div>\n</div>";
  return buffer;
  })

});
/* global define */
/* global cmCreatePageElementTag */
/* global cmDisplayShop5s */
/* global cmCreateShopAction5Tag */
/* global ess */
/* global bvGlobal */
define('modules/miniCart',[
	"app/p2p",
	"jquery",
	"modules/baseModule",
	"tpl/minicart_single_atb",
	"tpl/minicart_footer",
	"app/jquery.reveal"
], function (p2p, $, BaseModule, tplSingleProduct, tplFooter) {

	var miniCart;

	miniCart = {
		settings: {
		},

		// container: "#miniCart",

		init: function () {
			this.platform.cons.add("ADD_TO_CART_STARTED", "ADD_TO_CART_STARTED");
			this.platform.cons.add("ADD_TO_CART_REDIRECTING", "ADD_TO_CART_REDIRECTING");
			this.platform.cons.add("ADD_TO_CART_SUCCESS", "ADD_TO_CART_SUCCESS");
		},

		cache: function () {
		},

		bind: function () {
			this.subscribe(this.platform.cons.ADD_TO_CART_STARTED, this.addToCartStarted);
			this.subscribe(this.platform.cons.ADD_TO_CART_REDIRECTING, this.addToCartRedirecting);
			this.subscribe(this.platform.cons.ADD_TO_CART_SUCCESS, this.addedToCart);
		},

		addToCartStarted: function (event, data) {
			// An ajax call is about to be made to add an item to the cart
			// Display the mini-cart pop-up while this happens
			if (data.addedToCartControl == "miniCart") {
				// var miniCart = $('#bbw #mini-cart');
				var miniCartDialog = this.getMinicartDialog();

				// Append the loading image to the modal
				miniCartDialog
					.find(".content")
					.html("<div class=\"load\" id=\"mini-cart-loader\"><p>Loading</p><img src=\"../images/ajax.gif\" /></div>")
					.end()
					.find(".minicart-footer")
					.remove()
					.end()
					.reveal({ animation: "fade" });

				this.centerMiniCart(miniCartDialog);
			}
		},

		addToCartRedirecting: function (event, data) {
			// After adding to cart, a redirect has been initiated
			// Display a message
			if (data.addedToCartControl == "miniCart") {
				var miniCartDialog = this.getMinicartDialog();
				miniCartDialog
					.find(".content")
					.html("<div class='mini-cart-add-error'>" + data.cart.rdir_msg + '</div>');
			}
		},

		addedToCart: function (event, data) {
			if (data.addedToCartControl == "miniCart") {
				var cart = data.cart,
					formObject = data.formObject,
					miniCartDialog = this.getMinicartDialog();

				miniCartDialog.find(".content")
					.html("<h2 class=\"header\">Added to your bag!</h2>");

				var itemCount = cart.itemCount;
				var cartQty = "" + itemCount;
				$('#cart-count').html(cartQty);
				var oldUl = miniCartDialog.find("ul");
				var ul = $("<ul />");
				var first = true;
				var prodCount = 0;

				for (var prodId in cart.productsAdded) {
					prodCount++;
				}

				for (prodId in cart.productsAdded) {
					var prod = cart.productsAdded[prodId];
					var sku = prod.skus[prod.skuId];

					if (prod.availableColors && prod.availableColors[sku.colorId] && prod.availableColors[sku.colorId].mainImageURL) {
						prod.colorThumbnail = prod.availableColors[sku.colorId].mainImageURL;
					} else {
						prod.colorThumbnail = prod.mainImageURL;
					}

					if (sku.price) {
						prod.calculatedPrice = sku.price;
					} else {
						prod.calculatedPrice = prod.price;
						// We only set it if it has a promotion
						if(prod.price != prod.basePrice){
							prod.oldPrice = prod.basePrice;
						}
					}

					prod.color = sku.color;
					prod.size = sku.size;

					var isOnlyOneItem = ( prodCount == 1 ); // is there only one item with a dot afterwards?
					var li;

					if (isOnlyOneItem) {
						ul.append(tplSingleProduct(prod));
					} else {
						li = $('#prod-summary-multi-template').jqote(prod, '$');
						if (first) {
							li.addClass('multi-first');
							first = false;
						}
						ul.append(li);
					}

					var prodCmAdditionalAttrib = $(formObject).find('[name=prodCmAdditionalAttrib]');
					if (prodCmAdditionalAttrib.length != 1) {
						prodCmAdditionalAttrib = $(formObject).find('[name=prodCmAdditionalAttrib' + prod.productId + ']');
					}

					if (typeof(prodCmAdditionalAttrib.val()) != 'undefined') {
						var splits_prodCmAdditionalAttrib = prodCmAdditionalAttrib.val().split("_");
						for (var splitId in splits_prodCmAdditionalAttrib) {
							// var split = splits_prodCmAdditionalAttrib[splitId];
							if (typeof(bvGlobal) != 'undefined' && bvGlobal != null && typeof(bvGlobal[sku.prod_id]) != 'undefined' && bvGlobal[sku.prod_id] != null) {
								if (splitId == 2 && bvGlobal[sku.prod_id].gsibvReviewCount != null) {
									splits_prodCmAdditionalAttrib[splitId] = "-" + bvGlobal[sku.prod_id].gsibvReviewCount + "-";
								} else if (splitId == 3 && bvGlobal[sku.prod_id].gsibvAvgRating != null) {
									splits_prodCmAdditionalAttrib[splitId] = "-" + bvGlobal[sku.prod_id].gsibvAvgRating + "-";
								} else if (splitId == 4 && bvGlobal[sku.prod_id].gsibvBuyAgainPercent != null) {
									splits_prodCmAdditionalAttrib[splitId] = "-" + bvGlobal[sku.prod_id].gsibvBuyAgainPercent + "-";
								}
							}

							if (splitId == 8) {
								splits_prodCmAdditionalAttrib[splitId] = "-" + prod.size + "-";
							}
							if (splitId == 7) {
								splits_prodCmAdditionalAttrib[splitId] = "-" + prod.color + "-";
							}
							if (splitId == 10) {
								splits_prodCmAdditionalAttrib[splitId] = "-" + prod.qty + "-";
							}
						}

						prodCmAdditionalAttrib.val(splits_prodCmAdditionalAttrib.join('_'));
					}

					var categoryid = $(formObject).find('[name=categoryid]');
					var prefix = (data.expressShop === true) ? "EXPRESS:" : "";
					var throwProductViewTag;

					if (prodCmAdditionalAttrib != 'undefined') {
						var prodCmAdditionalAttribfinal = prodCmAdditionalAttrib.val();
						cmCreateShopAction5Tag(prod.productId, prod.title, prod.qty, prod.price, prefix + categoryid.val(), prodCmAdditionalAttribfinal);
						//ACo added validation if expressshop, in this case dont want to throw the productview tag
						throwProductViewTag = (data.expressShop === false) && (data.pageType === "family" || data.pageType === "category" || data.pageType === "search");
						if (throwProductViewTag) {
							cmCreateProductviewTag(prod.productId, prod.title, prefix + categoryid.val(), null, null, null, null, 'N', 'Y', null, null, prodCmAdditionalAttribfinal);
						}
					} else {
						cmCreateShopAction5Tag(prod.productId, prod.title, prod.qty, prod.price, prefix + categoryid.val());
						//ACo added validation if expressshop, in this case dont want to throw the productview tag
						throwProductViewTag = (data.expressShop === false) && (data.pageType === "family" || data.pageType === "category" || data.pageType === "search");
						if (throwProductViewTag) {
							cmCreateProductviewTag(prod.productId, prod.title, prefix + categoryid.val(), null, null, null, null, 'N', 'Y', null, null, null);
						}
					}

					cmDisplayShop5s();
				}

				var footerContent = tplFooter({
					itemTotValue: cart.itemTotValue.replace(/\s/g, ''),
					itemCount: cart.itemCount
				});

				if (miniCartDialog.find(".minicart-footer").length > 0) {
					miniCartDialog.find(".minicart-footer").replaceWith(footerContent);
				} else {
					miniCartDialog.find(".content").after(footerContent);
				}

				if (oldUl && oldUl.length > 0) {
					oldUl.replaceWith(ul);
				} else {
					ul.appendTo(miniCartDialog.find('.content'));
				}

				ul.find(".redeem a").on("click focus hover", function () {
					// Add this line for next component toggle. // Anuj Rastogi
					// $(this).next().toggle();
					$(this).parent().find(".promotion-detail").toggle();
					cmCreatePageElementTag(ul.find(".deal").text(), "How to Redeem");
				});
				ul.find(".redeem a").on("blur", function () {
					$(this).parent().find(".promotion-detail").hide();
					cmCreatePageElementTag(ul.find(".deal").text(), "How to Redeem");
				});

				miniCartDialog.find(".continue-shopping").on("click", function (evt) {
					evt.preventDefault();
					miniCartDialog.trigger("reveal:close", { animation: "fade" });
				});

				// If it's the cart page we want to refresh the page
				miniCartDialog.on("reveal:close", function(){
					if ($("body").hasClass("cart")) {
						document.location.reload(true); // force reload from server (we need to see new product in cart)
					}
				})

				$("#bbw #mini-cart a#mc-viewbag").click(function (evt) {
					evt.stopPropagation();
				});

				// Some additional processing
				var productDetailsMarginTop = (miniCartDialog.find(".image").height() - miniCartDialog.find("dl").height()) / 2;
				miniCartDialog.find("dl").css({ marginTop: productDetailsMarginTop + "px" });

				// Time to center the minicart
				this.centerMiniCart(miniCartDialog);

				// Prevent scrolling
				$(".reveal-modal-bg")
					.off("mousewheel DOMMouseScroll", this.preventScrolling)
					.on("mousewheel DOMMouseScroll", this.preventScrolling);

				miniCartDialog
					.off("mousewheel DOMMouseScroll", this.preventScrolling)
					.on("mousewheel DOMMouseScroll", this.preventScrolling);

				if(typeof BrTrk != 'undefined'){
					BrTrk.getTracker().logEvent(
	                   'Cart',
	                   'add',
	                   {
	                       'prod_id':prod.productId,
	                       'sku':prod.skuId,
	                       'prod_color':prod.color,
	                       'prod_name':prod.title
	                   },
	                   {
	        			   'price':prod.basePrice,
	                       'sale_price':prod.price
	                   }
	               );
				}
			}
		},

		preventScrolling: function (event) {
			event.preventDefault();
		},

		getMinicartDialog: function () {
			if ($("body #p2p-minicart").length < 1) {
				$("body").append('<div id="p2p-minicart" class="reveal-modal"><div class="content"></div><a class="close-reveal-modal"><span class="close-icon"></span></a></div>');
			}

			return $("body #p2p-minicart");
		},

		centerMiniCart: function (miniCartDialog) {
			var win = $(window),
				centerY = win.scrollTop() + win.height() / 2,
				centerX = win.scrollLeft() + win.width() / 2;

			miniCartDialog.css('top', centerY - (miniCartDialog.height() / 2));
			miniCartDialog.css('left', centerX - (miniCartDialog.width() / 2));
		}
	};

	return p2p.add("miniCart", miniCart, BaseModule);
});
/* =============================================================
 * bootstrap-scrollspy.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */

define('bootstrap-scrollspy',["jquery"], function ($) {


     // jshint ;_;


   /* SCROLLSPY CLASS DEFINITION
    * ========================== */

    function ScrollSpy(element, options) {
      var process = $.proxy(this.process, this)
        , $element = $(element).is('body') ? $(window) : $(element)
        , href
      this.options = $.extend({}, $.fn.scrollspy.defaults, options)
      this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
      this.selector = (this.options.target
        || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        || '') + ' .nav a'
      this.$body = $('body')
      this.refresh()
      this.process()
    }

    ScrollSpy.prototype = {

        constructor: ScrollSpy

      , refresh: function () {
          var self = this
            , $targets

          this.offsets = $([])
          this.targets = $([])

          $targets = this.$body
            .find(this.selector)
            .map(function () {
              var $el = $(this)
                , href = $el.data('target') || $el.attr('href')
                , $href = /^#\w/.test(href) && $(href)
              return ( $href
                && $href.length
                && [[ $href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]] ) || null
            })
            .sort(function (a, b) { return a[0] - b[0] })
            .each(function () {
              self.offsets.push(this[0])
              self.targets.push(this[1])
            })
        }

      , process: function () {
          var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
            , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
            , maxScroll = scrollHeight - this.$scrollElement.height()
            , offsets = this.offsets
            , targets = this.targets
            , activeTarget = this.activeTarget
            , i

          if (scrollTop >= maxScroll) {
            return activeTarget != (i = targets.last()[0])
              && this.activate ( i )
          }

          for (i = offsets.length; i--;) {
            activeTarget != targets[i]
              && scrollTop >= offsets[i]
              && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
              && this.activate( targets[i] )
          }
        }

      , activate: function (target) {
          var active
            , selector

          this.activeTarget = target

          $(this.selector)
            .removeClass('active')

          selector = this.selector
            + '[data-target="' + target + '"],'
            + this.selector + '[href="' + target + '"]'

          active = $(selector)
            .addClass('active')

          if (active.parent('.dropdown-menu').length)  {
            active = active.addClass('active')
          }

          active.trigger('activate')
        }

    }


   /* SCROLLSPY PLUGIN DEFINITION
    * =========================== */

    var old = $.fn.scrollspy

    $.fn.scrollspy = function (option) {
      return this.each(function () {
        var $this = $(this)
          , data = $this.data('scrollspy')
          , options = typeof option == 'object' && option
        if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
        if (typeof option == 'string') data[option]()
      })
    }

    $.fn.scrollspy.Constructor = ScrollSpy

    $.fn.scrollspy.defaults = {
      offset: 10
    }


   /* SCROLLSPY NO CONFLICT
    * ===================== */

    $.fn.scrollspy.noConflict = function () {
      $.fn.scrollspy = old
      return this
    }


   /* SCROLLSPY DATA-API
    * ================== */

    $(window).on('load', function () {
      $('[data-spy="scroll"]').each(function () {
        var $spy = $(this)
        $spy.scrollspy($spy.data())
      })
    })

});  
/* ==========================================================
 * bootstrap-affix.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


define('bootstrap-affix',["jquery", "app/p2p"], function ($, p2p) {

   // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix){
     p2p.publish("AFFIX-EQUAL")
     return
    }
    var sufix = (affix ? '-' + affix : '')
    if(sufix === '-bottom')
      p2p.publish("AFFIX-BOTTOM")
    else if(sufix === '-top')
      p2p.publish("AFFIX-TOP")
    else 
      p2p.publish("AFFIX-NORMAL")

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + sufix)
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


});  
// TODO - properly handle this
// there's a dependency on the product details page for this function
// leaving it here for now
var remote, ess = ess || {};
ess.showCustomPopUp = ess.showCustomPopUp || function (thisUrl, thisName, theseParams) {
	remote = open(thisUrl, thisName, theseParams);
};

define('modules/productDetails',[
	"modules/browser-resize",
	"modules/coreMetricsP2P",
	"modules/utils",
	"bootstrap-scrollspy",
	"bootstrap-affix",
	"app/p2p",
	"modules/baseModule",
	'jquery',
	"modules/addtobag",
	"modules/dropdown",
	"modules/productrollover",
	"jquery.lazyload"
],
function (browserResize, coreMetrics, utils, scroller, affixer, p2p, baseModule, $) {
	var productDetails;

	productDetails = {

		init: function () {
			browserResize.resize();
			$(".add-to-bag").addToBag();
			$(".dropdownComponent").dropdown();
			this.getPromoDetails();
			this.checkMonetate();
			this.$affixBottomScroll = 0;
			this.hideFourthProductMoreProducts();
			this.showNewReviewLinkIfNone();
		},

		cache: function () {
			this.$productUltimateFragrance = $('#productUltimateFragrance');
			this.$productBlinds = $('.productBlinds');
			this.$productTabs = $('#productTabs');
			this.$productTabsLinks = $('a', this.$productTabs);
			this.$productBlindsRows = $('.productBlindsRow', this.$productBlinds);
			this.$alternateViews = $('#productAlternateViews a');
			this.$favorites = $('#productImagerySocialIconsHeart');
			this.$productRecommendedLeftArrow = $('#productRecommendedLeftArrow');
			this.$productRecommendedRightArrow = $('#productRecommendedRightArrow');
			this.$productRecommendedProducts = $('#productRecommendedProducts .column').not(".paddingcell");
			//this.$serviceDetailsLink = $('#serviceDetailsLink');
			//this.$stockDetailsLink = $('#stockDetailsLink');
			this.$productImagerySocialIconsFacebook = $('#productImagerySocialIconsFacebook');
			this.$productImagerySocialIconsTwitter = $('#productImagerySocialIconsTwitter');
			this.$showReviewsLink = $('#BVRRRatingSummaryLinkReadID a');
			this.$productDetailsColumn = $('#productDetailsColumn');
			this.$productDetailsLine = $('#productDetailsLine');
			this.$productTabsScroll = $('#productTabsScroll');
			this.$footer = $('#footer');
			this.$affixedController = $('#affixedController');
			this.$productRecommended = $('#productRecommended');
			this.$productMore =$('#productMoreProductsList');
			this.$productTabsBlankTop = $('#productTabsBlankTop');
			this.$productDetailsBlankTop = $('#productDetailsBlankTop');
			this.$promotionDetails = $('.promotionDetails');
			this.$touch = utils.isTouchDevice();
			this.$viewAll = $('#productViewAllButton .viewAllButton');
			this.$productDetailsColumnContent = $('#productDetailsColumnContent');
			this.productDetailsColumnContentHeight = this.$productDetailsColumnContent.outerHeight();
			this.productDetailsColumnContentOffset = this.$productDetailsColumnContent.offset().top;
			this.currentSnapPoint = 0;
			this.marginTop = 0;

			if($("body.productDetailPage").length > 0){
				// Forces scroll to top on page refresh, prevents several problems on page load with scroll in middle of page for PDP
				window.onbeforeunload = function () {
				    window.scrollTo(0);
				};
			}
		},

		bind: function () {
			this.$productBlindsRows.click(this.blindsClick);
			this.$productTabsLinks.click(this.productTabsClick);
			this.$alternateViews.click(this.alternateViewClick);
			this.$favorites.click(this.addFavorites);
			this.$productRecommendedLeftArrow.click(this.productRecommendedArrowClick);
			this.$productRecommendedRightArrow.click(this.productRecommendedArrowClick);
			//this.$serviceDetailsLink.click(this.coreMetricsDetailsClick);
			//this.$stockDetailsLink.click(this.coreMetricsDetailsClick);
			this.$productImagerySocialIconsFacebook.click(this.coreMetricsSocial);
			this.$productImagerySocialIconsTwitter.click(this.coreMetricsSocial);
			this.$showReviewsLink.click(this.showReviewsLink);
			this.$viewAll.click(this.viewAllClick);
			this.$promotionDetails.click(this.handlePromoDetailsClickTablet);

			this.platform.cons.add("BROWSER_RESIZED", "browser-resized");
			this.platform.cons.add("READY", "document-ready");
			this.subscribe(p2p.cons.BROWSER_RESIZED, this.browserResized);
		},

		showNewReviewLinkIfNone: function () {
			var bvFirst = $('#BVRRRatingSummaryLinkWriteFirstID');
			if (bvFirst.length > 0) {
				var href = $('a', bvFirst).attr('href');
				var ifEmpty = $('#productReviews .if-empty');
				ifEmpty.show();
				$('.action', ifEmpty).attr('href', href);
			}
		},

		hideFourthProductMoreProducts: function () {
			var products = $('#productMoreProductsList .column');
			if (products.length > 3) {
				products.slice(3).addClass('hideThis');
			}
			else if (products.length < 3) {
				$('#productViewAllButton').addClass('hideThis');
			}
		},

		browserResized: function (event, sizeData) {
			this.checkSnapPoint(sizeData.width);
		},

		checkSnapPoint: function (width) {
			var oldSnapPoint = this.currentSnapPoint;

			this.setCurrentSnapPoint(width);

			if (oldSnapPoint != this.currentSnapPoint) {
				var height;
				if (this.$productDetailsColumn.is(':visible')) {
					height = this.$productDetailsColumnContent.height();
				}
				else {
					height = this.$productRecommended.height();
				}
				this.$affixedController.height(height);
			}
		},

		setCurrentSnapPoint: function (width) {
			if (width >= 1300)
				this.currentSnapPoint = 1;
			else if (width < 1300 && width >= 1125)
				this.currentSnapPoint = 2;
			else 
				this.currentSnapPoint = 3;
		},

		render: function () {

			utils.lazyLoadImages($('img',this.$productRecommended));
			utils.lazyLoadImages($('img',this.$productMore));

			if (!this.$touch) {
				this.subscribe("AFFIX-TOP", this.handleAffixTop);
				this.subscribe("AFFIX-BOTTOM", this.handleAffixBottom);
				this.subscribe("AFFIX-NORMAL", this.handleAffixNormal);
				this.subscribe("AFFIX-EQUAL", this.handleAffixEqual);
			}

			this.setMonetateMargins();

			var off = {};
			off.offset = 70;
			if (typeof this.$monetateHeight != 'undefined') {
				off.offset += this.$monetateHeight;
			}

			$('body').scrollspy(off);

			var productEveryday = $('#productEveryday');
			if (productEveryday.children().length === 0)
				productEveryday.hide();

			this.checkSnapPoint($(window).width());

			off = {};
			off.offset = {};
			off.offset.bottom = $('#footer').outerHeight() + $('#footerSiteInfoRight').outerHeight();
			//off.offset.bottom = 300;
			if($('body.normalHeader').length > 0){
				off.offset.top = $('#fixedHeaderBlock').outerHeight();
			}
			else {
				off.offset.top = 32;
			}
			p2p.log('footer height:' + off.offset.bottom);
			if (typeof this.$monetateHeight != 'undefined') {
				off.offset.top += this.$monetateHeight;
			}
			this.$affixedController.affix(off);

			this.manageRecommended();

			$('.atb-button', this.$productUltimateFragrance).text('ADD ALL THREE');
			this.setFixedProductTabsHorizontalScroll();

			this.$promotionDetails.hover(function () {
				var tooltip = $('.toolTip', $(this));
				tooltip.css('top', '-' + ((tooltip.outerHeight() / 2) - 7) + 'px');
			});

			$('#moreProductsButton').hover(function () {
				var tooltip = $('.toolTip', $(this));
				var buttonHeight = $('.productTab', $(this)).outerHeight();
				tooltip.css('top', '-' + (((tooltip.outerHeight() - buttonHeight) / 2)) + 'px');
			});

			$(".product .thumbnail").productRollover();
		},

		//browserResized: function(){
		//	if($('body.size-small').length < 1){
		//		this.$productTabs.css('left', '');
		//		this.$productTabsBlankTop.css('left', '');
		//	}
		//},

		setFixedProductTabsHorizontalScroll: function () {
			var productTabs = this.$productTabs;
			var productTabsScroll = this.$productTabsScroll;
			var productTabsBlankTop = this.$productTabsBlankTop;
			$(window).scroll(function () {
				if ($('body.size-small').length < 1) {
					productTabs.css('left', '');
					productTabsBlankTop.css('left', '');
					return;
				}
				var scrollLeft = $(window).scrollLeft();
				if (scrollLeft > 0) {
					var currentMargin = productTabsScroll.position().left;
					productTabs.css('left', currentMargin - scrollLeft);
					productTabsBlankTop.css('left', currentMargin - scrollLeft);
				}
				else {
					productTabs.css('left', '');
					productTabsBlankTop.css('left', '');
				}
			});
		},

		setMonetateMargins: function () {
			if (typeof this.$monetateHeight != 'undefined') {
				this.$productTabs.css('margin-top', this.$productTabsMargin);
				this.$productTabsBlankTop.css('margin-top', this.$productTabsBlankTopMargin);
				// this.$productDetailsBlankTop.css('margin-top', this.$productDetailsBlankTopMargin);
				// this.$productDetailsLine.css('margin-top', this.$productDetailsLineMargin);
			}
			else {
				this.checkMonetate();
				if (typeof this.$monetateHeight != 'undefined') {
					this.$productTabs.css('margin-top', this.$productTabsMargin);
					this.$productTabsBlankTop.css('margin-top', this.$productTabsBlankTopMargin);
					// this.$productDetailsBlankTop.css('margin-top', this.$productDetailsBlankTopMargin);
					// this.$productDetailsLine.css('margin-top', this.$productDetailsLineMargin);
				}
			}
		},

		checkMonetate: function () {
			// If monetate is present, we need to remove some margin to the fixed elements
			var monetate = $('#content div[id^="monetate_"]');

			var height = 0;
			if (monetate.length < 1) {
				if ($('#cmsTop').length > 0) {
					monetate = $('#topContent');
					if (monetate.length > 0) {
						height = monetate.height() + parseInt(monetate.css('margin-top').replace('px', '')) + parseInt(monetate.css('margin-bottom').replace('px', ''));
						var cms = $('#bbw_product_cms');
						if (cms.length > 0)
							height += parseInt(cms.css('margin-top').replace('px', '')) + parseInt(cms.css('margin-bottom').replace('px', ''));

					}
				}
			}
			else {
				height = monetate.height();
			}
			if (monetate.length < 1) {
				return;
			}

			this.$monetateHeight = height;
			this.$productTabs = $('#productTabs'); // do not remove
			var wasFloating = this.$productTabs.hasClass('floating');
			this.$productTabs.removeClass('floating');
			var currentMargin = this.$productTabs.css('margin-top').replace('px', '');
			if (wasFloating) {
				this.$productTabs.addClass('floating');
			}

			this.$productTabsMargin = currentMargin - height + 'px';

			this.$productTabsBlankTop = $('#productTabsBlankTop'); // do not remove
			wasFloating = this.$productTabsBlankTop.hasClass('floating');
			this.$productTabsBlankTop.removeClass('floating');
			currentMargin = this.$productTabsBlankTop.css('margin-top').replace('px', '');
			if (wasFloating) {
				this.$productTabsBlankTop.addClass('floating');
			}

			this.$productTabsBlankTopMargin = currentMargin - height + 'px';

			this.$productDetailsBlankTop = $('#productDetailsBlankTop'); // do not remove
			wasFloating = this.$productDetailsBlankTop.hasClass('floating');
			this.$productDetailsBlankTop.removeClass('floating');
			currentMargin = this.$productDetailsBlankTop.css('margin-top').replace('px', '');
			if (wasFloating) {
				this.$productDetailsBlankTop.addClass('floating');
			}

			this.$productDetailsBlankTopMargin = currentMargin - height + 'px';

			this.$productDetailsLine = $('#productDetailsLine'); // do not remove
			wasFloating = this.$productDetailsLine.hasClass('floating');
			this.$productDetailsLine.removeClass('floating');
			currentMargin = this.$productDetailsLine.css('margin-top').replace('px', '');
			if (wasFloating) {
				this.$productDetailsLine.addClass('floating');
			}

			this.$productDetailsLineMargin = currentMargin - height + 'px';
		},

		manageRecommended: function (/*event*/) {
			var productCount = this.$productRecommendedProducts.length;

			if (productCount > 3) {
				var hiddenProducts = this.$productRecommendedProducts.slice(3, 6);
				hiddenProducts.toggleClass('hideThis');
			}
			else {
				this.$productRecommendedRightArrow.addClass('hideThis');
			}

			$('#productRecommendedProducts .column.paddingcell').addClass('hideThis');
		},

		handlePromoDetailsClickTablet: function () {
			if (this.$touch) {
				var tooltip = $('.toolTip', this.$promotionDetails);
				if (tooltip.is(':visible')) {
					tooltip.hide();
				}
				else {
					tooltip.css('top', '-' + ((tooltip.outerHeight() / 2) - 7) + 'px');
					tooltip.show();
				}
			}
		},

		getPromoDetails: function () {
			if ($('#promoId').length > 0) {
				$.ajax({
					url: utils.getBaseUrl() + "/promo/index.jsp?promoId=" + $('#promoId').val(),
					success: function (data) {
						var html = $.parseHTML(data);
						p2p.log(html);
						if ($(html).find('td.pagetext').length > 0) {
							var promoText = $(html).find('td.pagetext').text();
							$('.long', this.$promotionDetails).text(promoText);
						}
					}
				});
			}
		},

		handleAffixTop: function (/*event*/) {
			p2p.log('handleAffixTop');
			if($('body.normalHeader').length > 0){
				$("#fixedHeaderBlock").removeClass('hideThis');
			}
			if (!this.$productDetailsLine.hasClass('floating'))
				this.$productDetailsLine.addClass('floating');
			if (!this.$productTabs.hasClass('floating'))
				this.$productTabs.addClass('floating');
			if (!this.$productTabsBlankTop.hasClass('floating'))
				this.$productTabsBlankTop.addClass('floating');
			if (!this.$productDetailsBlankTop.hasClass('floating'))
				this.$productDetailsBlankTop.addClass('floating');
			
			this.$productDetailsColumnContent.removeAttr('style');
			this.$productDetailsColumnContent.css('position', 'absolute');
			this.$productDetailsColumnContent.css('margin-top', '');

			//if(!this.$productDetailsColumnContent.hasClass('detailsFixed')) {
			//	this.$productDetailsColumnContent.addClass('detailsFixed');
			//}
			this.$affixedController.removeClass('affixed');
			this.$productDetailsBlankTop.removeClass('affixed');
			this.$productDetailsLine.removeClass('affixed');
			this.$productTabs.removeClass('affixed');
			this.$productTabs.css('top', '');
			this.$productTabsBlankTop.css('top', '');
			this.$productDetailsBlankTop.css('margin-top', '');
			this.$productDetailsLine.css('margin-top', '');
			this.$productTabsBlankTop.removeClass('affixed');
			this.$productDetailsColumnContent.removeClass('detailsFixed');
			// this.checkDetailsHeight();
			this.setMonetateMargins();

			if (utils.isIe8()) {
				var affixedScroll = utils.findClassStartingWith(this.$affixedController, 'affixedScroll-');
				if (affixedScroll.length > 0) {
					this.$affixedController.removeClass(affixedScroll[0]);
				}
				this.$affixedController.addClass('affixedScroll-0');
			}
			else {
				this.$affixedController.data('scroll', 0);
			}
		},

		// This functions checks if the bottom of the details is at 35px from the bottom of the screen
		// If it's under, we scroll and fix it when it reaches it.
		checkDetailsHeight: function (force) {
			var scrollTop = $(window).scrollTop();
			//var detailsHeight = this.productDetailsColumnContentHeight - scrollTop;
			//var detailsHeight = this.$productDetailsColumnContent.outerHeight() + this.productDetailsColumnContentOffset - scrollTop;
			var maxScroll = $(window).height() - 73 - this.$productDetailsColumnContent.outerHeight();
			if (maxScroll < 0)
				maxScroll = this.productDetailsColumnContentOffset;
			// ACo had to use this parameter to force the rule to be applied when coming back from bottom
			if (typeof force == 'undefined') {
				force = false;
			}

			if (this.$productDetailsColumnContent.outerHeight() + 73 + $("#fixedHeaderBlock").outerHeight() < $(window).height())
				force = true;

			// If the bottom of product details is at least at 35px from bottom of the window, we fix it
			//if(force || detailsHeight < $(window).height() - 35){
			p2p.log('maxScroll:' + maxScroll);
			if (force || scrollTop > maxScroll) {

				if (!this.$affixedController.hasClass('affix-bottom') && !this.$productDetailsColumnContent.hasClass('detailsFixed')) {
					// if(scrollTop >= 35 && (detailsHeight > 0 || force)) {
					this.$productDetailsColumnContent.css('position', 'fixed');
					var margin = $(window).height() - this.$productDetailsColumnContent.outerHeight() - this.productDetailsColumnContentOffset + 73;
					if (margin > 35) {
						margin = 35;
					}
					if (typeof this.$monetateHeight != 'undefined') {
						margin -= this.$monetateHeight;
					}
					//this.$productDetailsLine.css('margin-top', margin - this.$productDetailsLine.height());
					//this.$productDetailsBlankTop.css('margin-top', margin - this.$productDetailsBlankTop.height());
					this.$productDetailsColumnContent.css('margin-top', margin);
					this.marginTop = margin;
					this.$productDetailsColumnContent.addClass('detailsFixed');
					this.$productDetailsColumnContent.removeClass('affixed');
				}
				// }
			}
			else {
				if (this.$productDetailsColumnContent.hasClass('detailsFixed')) {
					this.$productDetailsColumnContent.removeClass('detailsFixed');
					this.$productDetailsColumnContent.css({
						position: 'absolute',
						'margin-top': 0
					});
				}
			}
		},

		handleAffixEqual: function (/*event*/) {

			if (!this.$affixedController.hasClass('affix')) {
				return;
			}

			p2p.log('handleAffixEqual');

			var scrollTop = $(window).scrollTop();

			var scroll;
			if (utils.isIe8()) {
				var affixedScroll = utils.findClassStartingWith(this.$affixedController, 'affixedScroll-');
				scroll = parseInt(affixedScroll[0].replace('affixedScroll-', ''));
			}
			else {
				scroll = parseInt(this.$affixedController.data('scroll'));
			}

			if (scroll >= scrollTop) {

				this.$affixedController.removeAttr('style');
				this.$affixedController.removeClass('affixed');

				this.$productDetailsLine.removeAttr('style');
				this.$productDetailsLine.removeClass('affixed');

				this.$productTabs.removeAttr('style');
				this.$productTabs.removeClass('affixed');

				this.$productTabsBlankTop.removeClass('affixed');
				this.$productTabsBlankTop.removeAttr('style');

				this.$productDetailsBlankTop.removeClass('affixed');
				this.$productDetailsBlankTop.removeAttr('style');

				this.$productDetailsColumnContent.removeClass('affixed');
				this.$productDetailsColumnContent.removeAttr('style');

				this.$footer.removeAttr('style');

				var height;
				if (this.$productDetailsColumn.is(':visible')) {
					height = this.$productDetailsColumnContent.height();
				}
				else {
					height = this.$productRecommended.height();
				}
				this.$affixedController.height(height);
				this.$productDetailsColumnContent.css({
					'margin-top': this.marginTop,
					position: 'fixed'
				});
				this.checkDetailsHeight(true);
			}
			else {
				if (!this.$productDetailsColumnContent.hasClass('affixed'))
					this.checkDetailsHeight();
			}

			this.setMonetateMargins();
		},

		handleAffixNormal: function (/*event*/) {

			if($('body.normalHeader').length > 0){
				$("#fixedHeaderBlock").addClass('hideThis');
			}
			var scroll = $(window).scrollTop();
			if (this.$affixBottomScroll > 0 && scroll > this.$affixBottomScroll) {
				p2p.log('ignoring handleAffixNormal');
				return;
			}
			this.$affixBottomScroll = 0;
			p2p.log('handleAffixNormal');

			this.$productDetailsLine.removeClass('floating');
			this.$productTabs.removeClass('floating');
			this.$productTabsBlankTop.removeClass('floating');
			this.$productDetailsBlankTop.removeClass('floating');
			this.checkDetailsHeight();
			this.setMonetateMargins();
		},

		handleAffixBottom: function (/*event*/) {

			p2p.log('handleAffixBottom');
			var scroll = $(window).scrollTop();
			this.$affixBottomScroll = scroll;
			// var offset = this.$productDetailsColumn.offset().top - this.$productDetailsColumn.position().top;
			var productDetailsColumnContentOffset = this.$productDetailsColumnContent.offset().top - this.$productDetailsColumnContent.position().top;
			var affixedController = this.$affixedController;
			if (!affixedController.hasClass('affixed')) {
				this.$productDetailsLine.addClass('affixed');
				affixedController.addClass('affixed');
				this.$productTabs.addClass('affixed');
				this.$productTabsBlankTop.addClass('affixed');
				this.$productDetailsBlankTop.addClass('affixed');
				this.$productDetailsColumnContent.addClass('affixed');
				this.$productDetailsColumnContent.removeClass('detailsFixed');
				if (utils.isIe8()) {
					var affixedScroll = utils.findClassStartingWith(affixedController, 'affixedScroll-');
					if (affixedScroll.length > 0) {
						this.$affixedController.removeClass(affixedScroll[0]);
					}
					affixedController.addClass('affixedScroll-' + scroll);
				}
				else {
					affixedController.data('scroll', scroll);
				}
				productDetailsColumnContentOffset += 35;
				var maxScroll = $(document).height() - 73 - this.$productDetailsColumnContent.outerHeight() - this.productDetailsColumnContentOffset;
				p2p.log("maxScroll bottom: " + maxScroll);

				var oldMarginTop = parseInt(this.$productDetailsColumnContent.css('margin-top').replace('px', ''));
				var marginTop = this.$productDetailsColumnContent.outerHeight();
				if (oldMarginTop > 0) {
					marginTop -= oldMarginTop;
				}
				else {
					marginTop += oldMarginTop;
				}
				if (maxScroll > 0) {
					marginTop -= maxScroll;
				}
				else {
					marginTop += maxScroll;
				}
				if (typeof this.$monetateHeight != 'undefined') {
					marginTop -= this.$monetateHeight;
				}
				//marginTop = $(window).height() + this.$productDetailsColumnContent.outerHeight() + this.marginTop;

				//marginTop += $('#footer').height();
				this.$productDetailsLine.css('margin-top', marginTop - this.$productDetailsLine.height());
				this.$productDetailsBlankTop.css('margin-top', marginTop - this.$productDetailsBlankTop.height());
				//this.$productDetailsColumnContent.css('margin-top', marginTop);
				var bottom = 35;
				if (this.marginTop < 0) {
					bottom -= this.marginTop;
				}
				else {
					bottom += this.marginTop;
				}
				this.$productDetailsColumnContent.css('bottom', bottom + 'px');
				affixedController.css('margin-top', 0);
				this.$productTabs.css('top', scroll + 'px');
				this.$productTabsBlankTop.css('top', scroll + 'px');
				//if(this.$productDetailsColumn.is(':visible')) {
				//	var footerMargin = this.$productDetailsColumn.offset().top + this.$productDetailsColumn.height() - (document.body.offsetHeight - this.$footer.outerHeight() - 62) + 35;
				//	this.$footer.css('margin-top', footerMargin);
				//}

				this.setMonetateMargins();
			}
		},

		productRecommendedArrowClick: function (event) {

			if (!$(event.currentTarget).hasClass('clickEnabled')) {
				return;
			}

			this.$productRecommendedLeftArrow.toggleClass('clickEnabled');
			this.$productRecommendedLeftArrow.toggleClass('hideThis');
			this.$productRecommendedRightArrow.toggleClass('clickEnabled');
			this.$productRecommendedRightArrow.toggleClass('hideThis');
			var productCount = this.$productRecommendedProducts.length;
			if ($(event.currentTarget).attr('id') === 'productRecommendedLeftArrow') {
				this.$productRecommendedProducts.slice(0, 3).removeClass('hideThis');
				this.$productRecommendedProducts.slice(3, 5).each(function () {
					if (!$(this).hasClass('hideThis'))
						$(this).addClass('hideThis');
				});
			}
			else {
				this.$productRecommendedProducts.slice(0, productCount - 3).each(function () {
					if (!$(this).hasClass('hideThis'))
						$(this).addClass('hideThis');
				});
				this.$productRecommendedProducts.slice(productCount - 3, 5).removeClass('hideThis');
			}
			$(window).trigger('scroll');
		},

		showReviewsLink: function (event) {
			event.preventDefault();
			$('#productTabsReviewsLink').trigger('click');
		},

		productTabsClick: function (event) {

			event.preventDefault();
			var $this = $(event.currentTarget);

			if (!$this.hasClass('active')) {
				this.$productTabsLinks.removeClass('active');
				$this.toggleClass('active');
			}

			var anchor = $this.attr('href');
			var margin = 35;

			if (anchor === '#productReviews') {
				margin = 69;
			}

			var scrollTo = $(anchor).position().top - margin;
			//$(window).scrollTop(scrollTo);
			$("html, body").animate({ scrollTop: scrollTo });

			// Core Metrics
			var data = {};
			data.elementID = $this.text();
			data.elementCategory = "Product Page";
			this.publish(this.platform.cons.Create_PageElement_Tag, data);

			this.checkDetailsHeight();
		},

		alternateViewClick: function handleAlternateViewClick(e) {

			e.preventDefault();

			var $target = $(e.currentTarget),
				$product = $('#productImage'),
				imageUrl = $target.attr("href"),
				$tmpImage = $("<img />").addClass("tmpimg");

			if (!$target.hasClass("selected")) {
				if ($product.find(".tmpimg").length > 0) {
					$product.find(".tmpimg").remove();
				}

				$tmpImage.attr("src", imageUrl);

				$tmpImage.load(function () {
					$target
					.siblings("a")
					.removeClass("selected")
					.end()
					.addClass("selected");
				})
				$product
					.addClass("show-alternative")
					.prepend($tmpImage);

				
			}
		},

		addFavorites: function (/*event*/) {

			// Core Metrics
			var data = {};
			data.elementID = "Add to Favorites";
			data.elementCategory = "Product Page";
			this.publish(this.platform.cons.Create_PageElement_Tag, data);

			var pForm = $('.order-form');
			$(pForm).find('input[name=wlName]').val('default');
			$(pForm).find("input[name='async']").val(0);
			$(pForm)[0].setAttribute('onsubmit', '');
			$(pForm).submit();
		},

		viewAllClick: function () {
			var prodDynXSearch = $('#prodDynXSearch');
			var searchForm = $('#searchNav');
			var searchBox = $('#navSearchBox');
			searchBox.val(prodDynXSearch.val());
			setSrchType("prodDynXSearch");
			setTimeout(function () {
				$(searchForm).submit();
			}, 300);
		},

		blindsClick: function (event) {
			var $this = $(event.currentTarget);
			var wasActive = true;
			if (!$this.hasClass('active')) {
				this.$productBlindsRows.removeClass('active');
				$('.productBlindsText', this.$productBlindsRows).slideUp();
				wasActive = false;
			}

			// This allows us to choose both blinds (the one on the 3rd snappoint and the normal one)
			var type = utils.findClassStartingWith($this, 'productBlindsRowType');
			if (wasActive) {
				$('.' + type + ' .productBlindsText').slideUp();
			}
			else {
				$('.' + type + ' .productBlindsText').slideDown();
			}

			$('.' + type).toggleClass('active');

			// Core Metrics
			var data = {};
			data.elementID = $('.productBlindsTitle', $this).text();
			data.elementCategory = "Product Page";
			this.publish(this.platform.cons.Create_PageElement_Tag, data);
		},

		coreMetricsDetailsClick: function (/*event*/) {
			// Core Metrics
			var data = {};
			data.elementID = "Details for Promotion";
			data.elementCategory = "Product Page";
			this.publish(this.platform.cons.Create_PageElement_Tag, data);
		},

		coreMetricsSocial: function (event) {
			var $this = $(event.currentTarget);

			// Core Metrics
			var data = {};
			data.elementID = $this.prop("id").replace("productImagerySocialIcons", "");
			data.elementCategory = "Product Page";
			this.publish(this.platform.cons.Create_PageElement_Tag, data);
		}

	};

	/* Ess function was not working in UAT, trying to fix it by using our own */
function showCustomPopUpP2P(thisUrl, thisName, theseParams) {
	remote = open(thisUrl, thisName, theseParams);
};

window.showCustomPopUpP2P = showCustomPopUpP2P;

	return p2p.add("productDetails", productDetails, baseModule);
});

function startHandleBloomReach(){
	if (typeof p2p === "undefined") {
		setTimeout(function(){
			startHandleBloomReach();
		}, 500);
		return;
	} else {
		if(p2p.$('body.product').length > 0){
			handleBloomReach();
		}
	}
}

startHandleBloomReach();

define('tpl/promobug',['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function";


  buffer += "<div class=\"promo-bug\">\n	<div class=\"slideout\" style=\"opacity: 0; left: 0px;\"><span>";
  if (stack1 = helpers.longTitle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.longTitle); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span></div>\n	<div class=\"promo\" style=\"left: 0px;\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	<div class=\"tucked-state\" style=\"left: 109px;\"></div>\n</div>\n";
  return buffer;
  })

});
/* global define */
/* global pagePromotions */
define('modules/promoBug',["app/p2p", "modules/baseModule", "underscore", "jquery", "tpl/promobug"], function (p2p, baseModule, _, $, tplPromoBug) {

	var promoBug;

	promoBug = {
		pagePromotions: {},
		topPromotion: {},

		state: null,

		PROMO_STATE_CHANGED: 'promoStateChanged',
		PROMO_STATE_OPEN: 'promoStateOpen',
		PROMO_STATE_TUCKED: 'promoStateTucked',
		TUCK_STATE_CHANGED: 'tuckStateChanged',
		TUCK_STATE_1: 'promoStateTuck1',
		TUCK_STATE_2: 'promoStateTuck2',

		tuckState: this.TUCK_STATE_1,

		init: function () {

			if (typeof pagePromotions == "undefined") {
				this.log("No promotions found!");
				return false;
			}

			this.pagePromotions = pagePromotions || {};
			this.topPromotion = _(this.pagePromotions).max(this.getTopPromotion);

			this.platform.cons.add("BROWSER_RESIZED", "browser-resized");
		},
		bind: function () {

			if (typeof pagePromotions == "undefined") {
				this.log("No promotions found!");
				return false;
			}

			$(window).scroll(this.handleScroll);

			this.subscribe(this.platform.cons.BROWSER_RESIZED, this.browserResized);
		},
		render: function () {

			if (typeof pagePromotions == "undefined") {
				this.log("No promotions found!");
				return false;
			}

			var promoBugContent = tplPromoBug(this.topPromotion),
				promoHeight = 0;
			$("body").append(promoBugContent);

			this.$element = $("body .promo-bug");
			this.$openState = this.$element.find('.slideout');
			this.$tuck1State = this.$element.find('.promo');
			this.$tuck2State = this.$element.find('.tucked-state');

			promoHeight = Math.max(this.$tuck1State.height(), this.$openState.height());

			this.$openState.css("height", promoHeight + "px");
			this.$tuck2State.css("height", promoHeight + "px");
			this.$tuck1State.css("height", promoHeight + "px");

			this.$element.bind(this.TUCK_STATE_CHANGED, this.tuckStateChanged);
			this.$element.bind(this.PROMO_STATE_CHANGED, this.promoStateChanged);
			this.$element.hover(this.handleMouseOver, this.handleMouseOut);

			this.setPromoState(this.PROMO_STATE_TUCKED);
		},
		handleScroll: function (event) {
			var maxBottom = Math.max(170, ($(window).scrollTop() + $(window).height() - $("#footer").offset().top) + 170);
			this.$element.css("bottom", maxBottom + "px");
		},
		handleMouseOver: function (event) {
			this.setPromoState(this.PROMO_STATE_OPEN);
		},
		handleMouseOut: function (event) {
			this.setPromoState(this.PROMO_STATE_TUCKED);
		},
		getTopPromotion: function (promotion) {
			return promotion.count;
		},
		setPromoState: function (value) {
			this.state = value;
			this.$element.trigger(this.PROMO_STATE_CHANGED);
		},
		setTuckState: function (value) {
			this.tuckState = value;
			this.$element.trigger(this.TUCK_STATE_CHANGED);
		},
		browserResized: function (event, data) {
			if (data.width < 1100) {
				this.setTuckState(this.TUCK_STATE_2);
			} else {
				this.setTuckState(this.TUCK_STATE_1);
			}
		},
		tuckStateChanged: function (event) {
			if (this.state == this.PROMO_STATE_TUCKED) {
				this.setPromoState(this.PROMO_STATE_TUCKED);
			}
		},
		promoStateChanged: function (event) {
			if (this.state == this.PROMO_STATE_OPEN) {
				this.$tuck1State.css({
					'left': 0
				});
				this.$tuck2State.css({
					'left': 134
				});
				this.$openState.css({
					'opacity': 1,
					'left': -266
				});
			} else {
				if (this.tuckState == this.TUCK_STATE_2) {
					this.$tuck1State.css({
						'left': 134
					});
					this.$tuck2State.css({
						'left': 92
					});
				} else {
					this.$tuck1State.css({
						'left': 0
					});
					this.$tuck2State.css({
						'left': 134
					});
				}
				this.$openState.css({
					'opacity': 0,
					'left': 0
				});
			}
		}
	};

	return p2p.add("promoBug", promoBug, baseModule);
});
define('modules/sample-module',["app/p2p", "modules/baseModule"], function (p2p, BaseModule) {

	var sampleModule;

	sampleModule = {
		settings: {
			someValue: 1
		},
		container: "#utilitynavigation", // If a container is defined, this.body will be a jQuery object poiting to it
		init: function () {
			//this.subscribe("something", this.callbackFunction, this);
			//this.platform.cons.add("SOME_consANT", "some-value");
			this.platform.cons.add("BROWSER_RESIZED", "browser-resized");
		},
		cache: function () {
			this.$utilAccountLink = this.body.find(".util-account-link");
		},
		bind: function () {
			this.subscribe("random", this.callbackFunction);
			this.subscribe(this.platform.cons.BROWSER_RESIZED, this.browserResized);
			// in console, type, p2p.publish("random", "any value");
		},
		eventsHandler: function (event, a, b, c) {
			// event.preventDefault();
			// this.log(arguments);
		},
		callbackFunction: function (event, data) {
			this.log("event: " + event);
			this.log("data: " + data);
			this.log("someValue: " + this._settings.someValue);
			this.log(this.$utilAccountLink);
		},
		browserResized: function (event, data) {
			this.log("Got a browser resize event!");
			this.log(event);
			this.log(data);
		}
	};

	return p2p.add("sampleModule", sampleModule, BaseModule);
});
/* global define */
define('modules/view-toggle',["modules/coreMetricsP2P", "app/p2p", "modules/baseModule", "modules/utils", "jquery"], function (coreMetricsP2P, p2p, baseModule, utils, $) {

	var viewToggle,
		viewType = "gridview";

	viewToggle = {
		// container: ".viewSelectButtons",
		init: function () {
			this.platform.cons.add("VIEW_TOGGLE", "view-toggle");
		},
		cache: function () {
			this.$container = $(".viewSelectButtons");
			this.$listButton = this.$container.find(".viewSelectList");
			this.$gridButton = this.$container.find(".viewSelectGrid");
		},
		bind: function () {
			this.$listButton.on("click", this.eventsHandler);
			this.$gridButton.on("click", this.eventsHandler);
		},
		render: function () {
		},
		eventsHandler: function (event) {
			var target = $(event.target),
				oldView = viewType,
				data;

			if (target.hasClass("viewSelectList")) {
				viewType = "listview";
			} else if (target.hasClass("viewSelectGrid")) {
				viewType = "gridview";
			}

			if (oldView != viewType) {
				this.$container.find("> div").removeClass("selected");
				target.addClass("selected");

				data = {
					old: oldView,
					current: viewType
				};

				this.platform.publish(this.platform.cons.VIEW_TOGGLE, data);

				if ($('body.search').length > 0) {
					if (window.PageViewTag.optData.searchAttribValue.indexOf("grid") > -1) {
						window.PageViewTag.optData.searchAttribValue = window.PageViewTag.optData.searchAttribValue.replace("grid", "list");
					} else {
						window.PageViewTag.optData.searchAttribValue = window.PageViewTag.optData.searchAttribValue.replace("list", "grid");
					}
				}
				else if (window.PageViewTag.optData.familyAttribValue.indexOf("grid") > -1) {
					window.PageViewTag.optData.familyAttribValue = window.PageViewTag.optData.familyAttribValue.replace("grid", "list");
				} else {
					window.PageViewTag.optData.familyAttribValue = window.PageViewTag.optData.familyAttribValue.replace("list", "grid");
				}

				this.platform.publish(this.platform.cons.Create_Pageview_Tag, window.PageViewTag);

				// Cause lazy-loading to re-evaluate
				utils.lazyLoadUpdate();
			}
		}
	};

	return p2p.add("viewToggle", viewToggle, baseModule);
});
define('modules/bbwLegacy',["app/p2p", "modules/baseModule", "jquery", "modules/utils", "modules/productrollover", "app/jquery.doubletap"], function (p2p, baseModule, jQuery, utils) {

	var bbwLegacy;

	bbwLegacy = {
		init: function () {

			/*var thumbsRel = jQuery("body.product #related-products .thumbnail");
			if(thumbsRel.length > 0){
				/*thumbsRel.productRollover();
				var buttons = jQuery('.express-shop-elem a.button-link', thumbsRel);
				buttons.addClass('button-inverted');
				jQuery('span', buttons).val('QUICK LOOK');
			}
			var thumbsCross = jQuery("body.product #crossSells .thumbnail");
			if(thumbsCross.length > 0){
				/*thumbsCross.productRollover();
				var buttons = jQuery('.express-shop-elem a.button-link', thumbsCross);
				buttons.addClass('button-inverted');
				jQuery('span', buttons).val('QUICK LOOK');
			}

			var openButton = jQuery('body.product .product-in-stock .jSelect .openButton');
			openButton.each(function() {
				if(openButton.children().length == 0) {
					openButton.append('<div class="openButtonCaret"></div>');
				}
			});
			*/

			if(utils.isTouchDevice()) {
				
				jQuery('#crossSells .thumbnail').each(function () {
					// jQuery(this).find('.url img').click(function (ev) {
					// 	ev.preventDefault();
					// 	jQuery(this).parent().trigger('click');
					// 	return false;
					// });
					// jQuery(this).find('.url img').click(function (ev) {
					// 	ev.preventDefault();
					// 	jQuery(this).parents(".thumbnail").find('.button-link').trigger('mousedown');
					// 	return false;
					// });
				});
				
				jQuery('#related-products .thumbnail').each(function () {
					// jQuery(this).find('.url img').click(function (ev) {
					// 	ev.preventDefault();
					// 	jQuery(this).parent().trigger('click');
					// 	return false;
					// });
					// jQuery(this).find('.url img').click(function (ev) {
					// 	ev.preventDefault();
					// 	jQuery(this).parents(".thumbnail").find('.button-link')[0].click();
					// 	return false;
					// });
				});
			}
		},

		cache: function() {
		},

		bind: function() {
			this.platform.cons.add("READY", "document-ready");
			this.subscribe(p2p.cons.READY, this.setupDataParamsClick);
		},

		render: function(){
			if (jQuery("#bbw.category .add-to-favorites").length > 0) {
				this.initAddFragrance();
			}
		},

		singleTapLegacy: function(event) {
			var e = (event.target)? event : event[0];

			// if the user has tapped to launch the quickview, do nothing here - it's handled in productrollover.
			// Otherwise, continue as normal.
			var quickViewLink = p2p.$(e.target).closest('dd.thumbnail');
			if (quickViewLink.length <= 0) {
				var link = p2p.$(e.currentTarget);
				e.preventDefault();
				e.stopImmediatePropagation();
				bbwLegacy.dataParamsClick(link, e);
			}
		},

		doubleTapLegacy: function(event) {
			var e = (event.target)? event : event[0];

			var quickViewLink = p2p.$(e.target).closest('dd.thumbnail');
			if (quickViewLink.length > 0) {
				quickViewLink.stopImmediatePropagation();
			}
			var link = p2p.$(e.currentTarget);
			e.preventDefault();
			e.stopImmediatePropagation();
			bbwLegacy.dataParamsClick(link, e);
		},

		setupDataParamsClick: function () {
			var linksWithParams = p2p.$("a[data-params]");
			linksWithParams.each(function () {
				// Move href to a data attribute so it doesn't work without click event
				var link = p2p.$(this);
				var href = link.attr("href");
				if (href) {
					link.data("originalhref", href);
					if (utils.isTablet()) {
						link.removeAttr("href");
					}
				}
			});
			if (utils.isTablet()) {
				// If the user did a slightly longer tap, both the single tap and the click event below were occurring
				linksWithParams.doubletap(this.doubleTapLegacy, this.singleTapLegacy);
			} else {
				linksWithParams.unbind("click");
				linksWithParams.click(function (e) {
					var link = p2p.$(this);
					e.preventDefault();
					e.stopImmediatePropagation();
					bbwLegacy.dataParamsClick(link, e);
				});
			}
		},

		dataParamsClick: function(link, e) {

			// If we're scrolling, then ignore the click
			if (utils.touchMoving) {
				// console.log("prevent click because of touch moving");
				return;
			}

			var url = { q: [] };
			var href = link.data("originalhref");
			var parts = href.split(/\?|\#/);
			url.d = parts.shift();

			while (parts.length > 0) {
				var p = parts.shift();
				if (p.indexOf('=') > -1) {
					url.q = p.split('&');
				} else {
					url.h = p;
				}

				//append redir
				parts = link.data("params").split('|');
				while (parts.length > 0) {
					var p = parts.shift();
					if (p.indexOf('p+') > -1) {
						url.q.push(p.replace('p+', ''));
					} else if (p.indexOf('p-') > -1) {
						//url.q = $A(url.q).without(p.replace('p-',''));
					} else if (p.indexOf('h+') > -1) {
						url.h = p.replace('h+', '');
					} else if (p.indexOf('h-') > -1) {
						url.h = false;
					}
				}

				//change href
				var newLocation = url.d;
				if (url.q.length > 0) {
					newLocation += '?' + url.q.join('&');
				}

				if (url.h) {
					newLocation += '#' + url.h;
				}
			}

			window.location = newLocation;
		},


		// Add to favorites tooltip
		addToFavoritesTooltip: null,
		initAddFragrance: function() {
			var that = this;
			this.addToFavoritesTooltip = this.createTooltip(jQuery("#content #groups-AtoZ"));
			jQuery('#bbw #content').on('mouseover mouseout', function(e) {
				var target = e.originalTarget ? e.originalTarget : e.target;
				if(jQuery(target).hasClass('add-to-favorites')) {
					if(e.type == 'mouseover') {
						that.showTooltip(target);
					} else {
						that.hideTooltip(e.target);
					}
				}
			});
		},

		showTooltip: function(el) {
			var position = jQuery(el).position();
			var top = position.top - 39;
			var left = position.left - 45;
			this.addToFavoritesTooltip.css({
				top: top, 
				left: left, 
				display: 'block'
			});
 		},

		hideTooltip: function(e) {
			this.addToFavoritesTooltip.css({ display: 'none' });
		},

		createTooltip: function(el) {
			var tooltip = jQuery('<div id="categoriesTooltip"><p>Add to Favorites</p></div>');
			el.append(tooltip);
			return tooltip;
 		}
 		// Add to favorites tooltip end

	};

	return p2p.add("bbwLegacy", bbwLegacy, baseModule);
});


/**
 * add a fragrance to collection of favorites
 * @param categoryId fragrance to add to favorites
 */
function addFragrance(categoryId){
	var newUrl = '/category/addCategoryId.jsp?categoryId=' + categoryId;
	// timeout is used as workaround to make IE 6 work properly
	setTimeout(function(){
		window.location = newUrl;
	}, 0);
}
window.addFragrance = addFragrance;

// Header search form - setting the search type
function setSrchType(val) {
	var searchFrom = document.getElementById("rdirFrom");
	searchFrom.value = val;
}
window.setSrchType = setSrchType;

// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
/* global require */
define('app/boot',[],function() {
	var appVersion = appVersion || (new Date()).getTime();

	var requireJsConfig = {
		baseUrl: "/js/p2p/lib",
		paths: {
			"app": "..",
			"modules": "../modules",
			"tpl": "../templates",
			"jquery": [
				'//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
				'jquery'
			],
			"underscore": [
				"underscore",
				"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min"
			],
			"jquery-migrate": [
				'jquery-migrate-1.2.1'
			],
			"jquery.dotdotdot": [
				'jquery.dotdotdot-1.5.9'
			],
			"handlebars": [
				'handlebars-1.0.0',
				'//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min',
			],
			"mdetect": [
				'mdetect'
			],
			"jquery.lazyload": [
				'jquery.lazyload.min'
			]
		},
		map: {
			"*": {
				"jquery": "jquery.nc"
			},
			"jquery.nc": {
				"jquery": "jquery"
			}
		},
		shim: {
			"underscore": {
				"exports": "_"
			},
			"jquery-migrate": {
				deps: ['jquery']
			},
			'handlebars': {
				exports: 'Handlebars'
			},
			'bootstrap-scrollspy': {
				deps: ['jquery']
			},
			'bootstrap-affix': {
				deps: ['jquery']
			}
		},
		waitSeconds: 0 // Timeouts happening more often than they should..
	};

	// If muteLogs is false, we shouldn't be in production, so we will append the querystring to our js files
	// if (muteLogs === false) {
	//   requireJsConfig.urlArgs = "v=" + appVersion;
	// }

	require.config(requireJsConfig);

	require(["underscore"], function(underscore) {
		var _ = underscore.noConflict();
		var modulesList = [
			"jquery",
			"app/p2p",
			"domReady",
			"modules/browser-resize",
			"modules/browserDetector",
			"modules/bbwLegacy"
		];

		//window._ = _;

		//pageModules is defined in the index,jsp for each page. USed and outputed in the p2p-main.jsp
		var combinedModuleList = _.union(modulesList, _.map(window.pageModules, function(value) { return value.path; }));

		// Load the main app module to start the app
		require(combinedModuleList, function($, p2p, domReady, browserResize) {

			// If we have javascript then let our DOM know
			$(document.body).addClass("jsOn");
			$(document.body).removeClass("jsOff");

			if (typeof p2p !== 'undefined') {
				p2p.startTimer("appLoad");

				p2p.cons.add("READY", "document-ready");
				domReady(function() {
					p2p.logEvent("Dom ready");
					window.p2p = p2p.init();
					browserResize.resize();
					p2p.publish(p2p.cons.READY);
				});

				p2p.cons.add("LOADED", "window-loaded");
				p2p.$(window).load(function() {
					p2p.finishedLoading = true;
					p2p.publish(p2p.cons.LOADED);
					p2p.endTimer("appLoad");
				});
			}
		});
	});
});

require(["app/boot"]);
}());