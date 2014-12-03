/*!
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
//"use strict";
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
 *  options: an optional list of space-separated options that will change how
 *      the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *  once:     will ensure the callback list can only be fired once (like a Deferred)
 *
 *  memory:     will keep track of previous values and will call any callback added
 *          after the list has been fired right away with the latest "memorized"
 *          values (like a Deferred)
 *
 *  unique:     will ensure a callback can only be added once (no duplicate in the list)
 *
 *  stopOnFalse:  interrupt callings when a callback returns false
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
 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *  deleting the oldest entry
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
window.jQuery = window.$ = jQuery;

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
/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

// Accommodate running jQuery or Zepto in noConflict() mode by
// using an anonymous function to redefine the $ shorthand name.
// See http://docs.jquery.com/Using_jQuery_with_Other_Libraries
// and http://zeptojs.com/
var libFuncName = null;

if (typeof jQuery === "undefined" &&
    typeof Zepto === "undefined" &&
    typeof $ === "function") {
  libFuncName = $;
} else if (typeof jQuery === "function") {
  libFuncName = jQuery;
} else if (typeof Zepto === "function") {
  libFuncName = Zepto;
} else {
  throw new TypeError();
}

(function ($, window, document, undefined) {
  'use strict';

  // add dusty browser stuff
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
      "use strict";
   
      if (this == null) {
        throw new TypeError();
      }

      var t = Object(this),
          len = t.length >>> 0;
      if (typeof fun != "function") {
          return;
      }

      var res = [],
          thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i]; // in case fun mutates this
          if (fun && fun.call(thisp, val, i, t)) {
            res.push(val);
          }
        }
      }

      return res;
    }
  }

  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }
   
      var aArgs = Array.prototype.slice.call(arguments, 1), 
          fToBind = this, 
          fNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
               ? this
               : oThis,
             aArgs.concat(Array.prototype.slice.call(arguments)));
          };
   
      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
   
      return fBound;
    };
  }

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      "use strict";
      if (this == null) {
        throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = 0;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
          return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    }
  }

  // fake stop() for zepto.
  $.fn.stop = $.fn.stop || function() {
    return this;
  };

  window.Foundation = {
    name : 'Foundation',

    version : '4.1.5',

    // global Foundation cache object
    cache : {},

    init : function (scope, libraries, method, options, response, /* internal */ nc) {
      var library_arr,
          args = [scope, method, options, response],
          responses = [],
          nc = nc || false;

      // disable library error catching,
      // used for development only
      if (nc) this.nc = nc;

      // check RTL
      this.rtl = /rtl/i.test($('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      if (libraries && typeof libraries === 'string') {
        if (/off/i.test(libraries)) return this.off();

        library_arr = libraries.split(' ');

        if (library_arr.length > 0) {
          for (var i = library_arr.length - 1; i >= 0; i--) {
            responses.push(this.init_lib(library_arr[i], args));
          }
        }
      } else {
        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, args));
        }
      }

      // if first argument is callback, add to args
      if (typeof libraries === 'function') {
        args.unshift(libraries);
      }

      return this.response_obj(responses, args);
    },

    response_obj : function (response_arr, args) {
      for (var i = 0, len = args.length; i < len; i++) {
        if (typeof args[i] === 'function') {
          return args[i]({
            errors: response_arr.filter(function (s) {
              if (typeof s === 'string') return s;
            })
          });
        }
      }

      return response_arr;
    },

    init_lib : function (lib, args) {
      return this.trap(function () {
        if (this.libs.hasOwnProperty(lib)) {
          this.patch(this.libs[lib]);
          return this.libs[lib].init.apply(this.libs[lib], args);
        }
      }.bind(this), lib);
    },

    trap : function (fun, lib) {
      if (!this.nc) {
        try {
          return fun();
        } catch (e) {
          return this.error({name: lib, message: 'could not be initialized', more: e.name + ' ' + e.message});
        }
      }

      return fun();
    },

    patch : function (lib) {
      this.fix_outer(lib);
      lib.scope = this.scope;
      lib.rtl = this.rtl;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' ');

      for (var i = methods_arr.length - 1; i >= 0; i--) {
        if (this.lib_methods.hasOwnProperty(methods_arr[i])) {
          this.libs[scope.name][methods_arr[i]] = this.lib_methods[methods_arr[i]];
        }
      }
    },

    random_str : function (length) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

      if (!length) {
          length = Math.floor(Math.random() * chars.length);
      }

      var str = '';
      for (var i = 0; i < length; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
    },

    libs : {},

    // methods that can be inherited in libraries
    lib_methods : {
      set_data : function (node, data) {
        // this.name references the name of the library calling this method
        var id = [this.name,+new Date(),Foundation.random_str(5)].join('-');

        Foundation.cache[id] = data;
        node.attr('data-' + this.name + '-id', id);
        return data;
      },

      get_data : function (node) {
        return Foundation.cache[node.attr('data-' + this.name + '-id')];
      },

      remove_data : function (node) {
        if (node) {
          delete Foundation.cache[node.attr('data-' + this.name + '-id')];
          node.attr('data-' + this.name + '-id', '');
        } else {
          $('[data-' + this.name + '-id]').each(function () {
            delete Foundation.cache[$(this).attr('data-' + this.name + '-id')];
            $(this).attr('data-' + this.name + '-id', '');
          });
        }
      },

      throttle : function(fun, delay) {
        var timer = null;
        return function () {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            fun.apply(context, args);
          }, delay);
        };
      },

      // parses data-options attribute on nodes and turns
      // them into an object
      data_options : function (el) {
        var opts = {}, ii, p,
            opts_arr = (el.attr('data-options') || ':').split(';'),
            opts_len = opts_arr.length;

        function isNumber (o) {
          return ! isNaN (o-0) && o !== null && o !== "" && o !== false && o !== true;
        }

        function trim(str) {
          if (typeof str === 'string') return $.trim(str);
          return str;
        }

        // parse options
        for (ii = opts_len - 1; ii >= 0; ii--) {
          p = opts_arr[ii].split(':');

          if (/true/i.test(p[1])) p[1] = true;
          if (/false/i.test(p[1])) p[1] = false;
          if (isNumber(p[1])) p[1] = parseInt(p[1], 10);

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      delay : function (fun, delay) {
        return setTimeout(fun, delay);
      },

      // animated scrolling
      scrollTo : function (el, to, duration) {
        if (duration < 0) return;
        var difference = to - $(window).scrollTop();
        var perTick = difference / duration * 10;

        this.scrollToTimerCache = setTimeout(function() {
          if (!isNaN(parseInt(perTick, 10))) {
            window.scrollTo(0, $(window).scrollTop() + perTick);
            this.scrollTo(el, to, duration - 10);
          }
        }.bind(this), 10);
      },

      // not supported in core Zepto
      scrollLeft : function (el) {
        if (!el.length) return;
        return ('scrollLeft' in el[0]) ? el[0].scrollLeft : el[0].pageXOffset;
      },

      // test for empty object or array
      empty : function (obj) {
        if (obj.length && obj.length > 0)    return false;
        if (obj.length && obj.length === 0)  return true;

        for (var key in obj) {
          if (hasOwnProperty.call(obj, key))    return false;
        }

        return true;
      }
    },

    fix_outer : function (lib) {
      lib.outerHeight = function (el, bool) {
        if (typeof Zepto === 'function') {
          return el.height();
        }

        if (typeof bool !== 'undefined') {
          return el.outerHeight(bool);
        }

        return el.outerHeight();
      };

      lib.outerWidth = function (el) {
        if (typeof Zepto === 'function') {
          return el.width();
        }

        if (typeof bool !== 'undefined') {
          return el.outerWidth(bool);
        }

        return el.outerWidth();
      };
    },

    error : function (error) {
      return error.name + ' ' + error.message + '; ' + error.more;
    },

    // remove all foundation events.
    off: function () {
      $(this.scope).off('.fndtn');
      $(window).off('.fndtn');
      return true;
    },

    zj : function () {
      try {
        return Zepto;
      } catch (e) {
        return jQuery;
      }
    }()
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(libFuncName, this, this.document));
/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.alerts = {
    name : 'alerts',

    version : '4.0.0',

    settings : {
      speed: 300, // fade out speed
      callback: function (){}
    },

    init : function (scope, method, options) {
      this.scope = scope || this.scope;

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        if (!this.settings.init) this.events();

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(this.scope).on('click.fndtn.alerts', '[data-alert] a.close', function (e) {
        e.preventDefault();
        $(this).closest("[data-alert]").fadeOut(self.speed, function () {
          $(this).remove();
          self.settings.callback();
        });
      });

      this.settings.init = true;
    },

    off : function () {
      $(this.scope).off('.fndtn.alerts');
    }
  };
}(Foundation.zj, this, this.document));
/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.clearing = {
    name : 'clearing',

    version : '4.1.3',

    settings : {
      templates : {
        viewing : '<a href="#" class="clearing-close">&times;</a>' +
          '<div class="visible-img" style="display: none"><img src="//:0">' +
          '<p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a>' +
          '<a href="#" class="clearing-main-next"><span></span></a></div>'
      },

      // comma delimited list of selectors that, on click, will close clearing,
      // add 'div.clearing-blackout, div.visible-img' to close on background click
      close_selectors : '.clearing-close',

      // event initializers and locks
      init : false,
      locked : false
    },

    init : function (scope, method, options) {
      var self = this;
      Foundation.inherit(this, 'set_data get_data remove_data throttle data_options');

      if (typeof method === 'object') {
        options = $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        $(this.scope).find('ul[data-clearing]').each(function () {
          var $el = $(this),
              options = options || {},
              lis = $el.find('li'),
              settings = self.get_data($el);

          if (!settings && lis.length > 0) {
            options.$parent = $el.parent();

            self.set_data($el, $.extend({}, self.settings, options, self.data_options($el)));

            self.assemble($el.find('li'));

            if (!self.settings.init) {
              self.events().swipe_events();
            }
          }
        });

        return this.settings.init;
      } else {
        // fire method
        return this[method].call(this, options);
      }
    },

    // event binding and initial setup

    events : function () {
      var self = this;

      $(this.scope)
        .on('click.fndtn.clearing', 'ul[data-clearing] li',
          function (e, current, target) {
            var current = current || $(this),
                target = target || current,
                next = current.next('li'),
                settings = self.get_data(current.parent()),
                image = $(e.target);

            e.preventDefault();
            if (!settings) self.init();

            // if clearing is open and the current image is
            // clicked, go to the next image in sequence
            if (target.hasClass('visible') 
              && current[0] === target[0] 
              && next.length > 0 && self.is_open(current)) {
              target = next;
              image = target.find('img');
            }

            // set current and target to the clicked li if not otherwise defined.
            self.open(image, current, target);
            self.update_paddles(target);
          })

        .on('click.fndtn.clearing', '.clearing-main-next',
          function (e) { this.nav(e, 'next') }.bind(this))
        .on('click.fndtn.clearing', '.clearing-main-prev',
          function (e) { this.nav(e, 'prev') }.bind(this))
        .on('click.fndtn.clearing', this.settings.close_selectors,
          function (e) { Foundation.libs.clearing.close(e, this) })
        .on('keydown.fndtn.clearing',
          function (e) { this.keydown(e) }.bind(this));

      $(window).on('resize.fndtn.clearing',
        function () { this.resize() }.bind(this));

      this.settings.init = true;
      return this;
    },

    swipe_events : function () {
      var self = this;

      $(this.scope)
        .on('touchstart.fndtn.clearing', '.visible-img', function(e) {
          if (!e.touches) { e = e.originalEvent; }
          var data = {
                start_page_x: e.touches[0].pageX,
                start_page_y: e.touches[0].pageY,
                start_time: (new Date()).getTime(),
                delta_x: 0,
                is_scrolling: undefined
              };

          $(this).data('swipe-transition', data);
          e.stopPropagation();
        })
        .on('touchmove.fndtn.clearing', '.visible-img', function(e) {
          if (!e.touches) { e = e.originalEvent; }
          // Ignore pinch/zoom events
          if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

          var data = $(this).data('swipe-transition');

          if (typeof data === 'undefined') {
            data = {};
          }

          data.delta_x = e.touches[0].pageX - data.start_page_x;

          if ( typeof data.is_scrolling === 'undefined') {
            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
          }

          if (!data.is_scrolling && !data.active) {
            e.preventDefault();
            var direction = (data.delta_x < 0) ? 'next' : 'prev';
            data.active = true;
            self.nav(e, direction);
          }
        })
        .on('touchend.fndtn.clearing', '.visible-img', function(e) {
          $(this).data('swipe-transition', {});
          e.stopPropagation();
        });
    },

    assemble : function ($li) {
      var $el = $li.parent();
      $el.after('<div id="foundationClearingHolder"></div>');

      var holder = $('#foundationClearingHolder'),
          settings = this.get_data($el),
          grid = $el.detach(),
          data = {
            grid: '<div class="carousel">' + this.outerHTML(grid[0]) + '</div>',
            viewing: settings.templates.viewing
          },
          wrapper = '<div class="clearing-assembled"><div>' + data.viewing +
            data.grid + '</div></div>';

      return holder.after(wrapper).remove();
    },

    // event callbacks

    open : function ($image, current, target) {
      var root = target.closest('.clearing-assembled'),
          container = root.find('div').first(),
          visible_image = container.find('.visible-img'),
          image = visible_image.find('img').not($image);

      if (!this.locked()) {
        // set the image to the selected thumbnail
        image
          .attr('src', this.load($image))
          .css('visibility', 'hidden');

        this.loaded(image, function () {
          image.css('visibility', 'visible');
          // toggle the gallery
          root.addClass('clearing-blackout');
          container.addClass('clearing-container');
          visible_image.show();
          this.fix_height(target)
            .caption(visible_image.find('.clearing-caption'), $image)
            .center(image)
            .shift(current, target, function () {
              target.siblings().removeClass('visible');
              target.addClass('visible');
            });
        }.bind(this));
      }
    },

    close : function (e, el) {
      e.preventDefault();

      var root = (function (target) {
            if (/blackout/.test(target.selector)) {
              return target;
            } else {
              return target.closest('.clearing-blackout');
            }
          }($(el))), container, visible_image;

      if (el === e.target && root) {
        container = root.find('div').first();
        visible_image = container.find('.visible-img');
        this.settings.prev_index = 0;
        root.find('ul[data-clearing]')
          .attr('style', '').closest('.clearing-blackout')
          .removeClass('clearing-blackout');
        container.removeClass('clearing-container');
        visible_image.hide();
      }

      return false;
    },

    is_open : function (current) {
      return current.parent().attr('style').length > 0;
    },

    keydown : function (e) {
      var clearing = $('.clearing-blackout').find('ul[data-clearing]');

      if (e.which === 39) this.go(clearing, 'next');
      if (e.which === 37) this.go(clearing, 'prev');
      if (e.which === 27) $('a.clearing-close').trigger('click');
    },

    nav : function (e, direction) {
      var clearing = $('.clearing-blackout').find('ul[data-clearing]');

      e.preventDefault();
      this.go(clearing, direction);
    },

    resize : function () {
      var image = $('.clearing-blackout .visible-img').find('img');

      if (image.length) {
        this.center(image);
      }
    },

    // visual adjustments
    fix_height : function (target) {
      var lis = target.parent().children(),
          self = this;

      lis.each(function () {
          var li = $(this),
              image = li.find('img');

          if (li.height() > self.outerHeight(image)) {
            li.addClass('fix-height');
          }
        })
        .closest('ul')
        .width(lis.length * 100 + '%');

      return this;
    },

    update_paddles : function (target) {
      var visible_image = target
        .closest('.carousel')
        .siblings('.visible-img');

      if (target.next().length > 0) {
        visible_image
          .find('.clearing-main-next')
          .removeClass('disabled');
      } else {
        visible_image
          .find('.clearing-main-next')
          .addClass('disabled');
      }

      if (target.prev().length > 0) {
        visible_image
          .find('.clearing-main-prev')
          .removeClass('disabled');
      } else {
        visible_image
          .find('.clearing-main-prev')
          .addClass('disabled');
      }
    },

    center : function (target) {
      if (!this.rtl) {
        target.css({
          marginLeft : -(this.outerWidth(target) / 2),
          marginTop : -(this.outerHeight(target) / 2)
        });
      } else {
        target.css({
          marginRight : -(this.outerWidth(target) / 2),
          marginTop : -(this.outerHeight(target) / 2)
        });
      }
      return this;
    },

    // image loading and preloading

    load : function ($image) {
      if ($image[0].nodeName === "A") {
        var href = $image.attr('href');
      } else {
        var href = $image.parent().attr('href');
      }

      this.preload($image);

      if (href) return href;
      return $image.attr('src');
    },

    preload : function ($image) {
      this
        .img($image.closest('li').next())
        .img($image.closest('li').prev());
    },

    loaded : function (image, callback) {
      // based on jquery.imageready.js
      // @weblinc, @jsantell, (c) 2012

      function loaded () {
        callback();
      }

      function bindLoad () {
        this.one('load', loaded);

        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
          var src = this.attr( 'src' ),
              param = src.match( /\?/ ) ? '&' : '?';

          param += 'random=' + (new Date()).getTime();
          this.attr('src', src + param);
        }
      }

      if (!image.attr('src')) {
        loaded();
        return;
      }

      if (image[0].complete || image[0].readyState === 4) {
        loaded();
      } else {
        bindLoad.call(image);
      }
    },

    img : function (img) {
      if (img.length) {
        var new_img = new Image(),
            new_a = img.find('a');

        if (new_a.length) {
          new_img.src = new_a.attr('href');
        } else {
          new_img.src = img.find('img').attr('src');
        }
      }
      return this;
    },

    // image caption

    caption : function (container, $image) {
      var caption = $image.data('caption');

      if (caption) {
        container
          .text(caption)
          .show();
      } else {
        container
          .text('')
          .hide();
      }
      return this;
    },

    // directional methods

    go : function ($ul, direction) {
      var current = $ul.find('.visible'),
          target = current[direction]();

      if (target.length) {
        target
          .find('img')
          .trigger('click', [current, target]);
      }
    },

    shift : function (current, target, callback) {
      var clearing = target.parent(),
          old_index = this.settings.prev_index || target.index(),
          direction = this.direction(clearing, current, target),
          left = parseInt(clearing.css('left'), 10),
          width = this.outerWidth(target),
          skip_shift;

      // we use jQuery animate instead of CSS transitions because we
      // need a callback to unlock the next animation
      if (target.index() !== old_index && !/skip/.test(direction)){
        if (/left/.test(direction)) {
          this.lock();
          clearing.animate({left : left + width}, 300, this.unlock());
        } else if (/right/.test(direction)) {
          this.lock();
          clearing.animate({left : left - width}, 300, this.unlock());
        }
      } else if (/skip/.test(direction)) {
        // the target image is not adjacent to the current image, so
        // do we scroll right or not
        skip_shift = target.index() - this.settings.up_count;
        this.lock();

        if (skip_shift > 0) {
          clearing.animate({left : -(skip_shift * width)}, 300, this.unlock());
        } else {
          clearing.animate({left : 0}, 300, this.unlock());
        }
      }

      callback();
    },

    direction : function ($el, current, target) {
      var lis = $el.find('li'),
          li_width = this.outerWidth(lis) + (this.outerWidth(lis) / 4),
          up_count = Math.floor(this.outerWidth($('.clearing-container')) / li_width) - 1,
          target_index = lis.index(target),
          response;

      this.settings.up_count = up_count;

      if (this.adjacent(this.settings.prev_index, target_index)) {
        if ((target_index > up_count)
          && target_index > this.settings.prev_index) {
          response = 'right';
        } else if ((target_index > up_count - 1)
          && target_index <= this.settings.prev_index) {
          response = 'left';
        } else {
          response = false;
        }
      } else {
        response = 'skip';
      }

      this.settings.prev_index = target_index;

      return response;
    },

    adjacent : function (current_index, target_index) {
      for (var i = target_index + 1; i >= target_index - 1; i--) {
        if (i === current_index) return true;
      }
      return false;
    },

    // lock management

    lock : function () {
      this.settings.locked = true;
    },

    unlock : function () {
      this.settings.locked = false;
    },

    locked : function () {
      return this.settings.locked;
    },

    // plugin management/browser quirks

    outerHTML : function (el) {
      // support FireFox < 11
      return el.outerHTML || new XMLSerializer().serializeToString(el);
    },

    off : function () {
      $(this.scope).off('.fndtn.clearing');
      $(window).off('.fndtn.clearing');
      this.remove_data(); // empty settings cache
      this.settings.init = false;
    },

    reflow : function () {
      this.init();
    }
  };

}(Foundation.zj, this, this.document));
/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 * Modified to work with Zepto.js by ZURB
 */
(function ($, document, undefined) {

  var pluses = /\+/g;

  function raw(s) {
    return s;
  }

  function decoded(s) {
    return decodeURIComponent(s.replace(pluses, ' '));
  }

  var config = $.cookie = function (key, value, options) {

    // write
    if (value !== undefined) {
      options = $.extend({}, config.defaults, options);

      if (value === null) {
        options.expires = -1;
      }

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }

      value = config.json ? JSON.stringify(value) : String(value);

      return (document.cookie = [
        encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // read
    var decode = config.raw ? raw : decoded;
    var cookies = document.cookie.split('; ');
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      if (decode(parts.shift()) === key) {
        var cookie = decode(parts.join('='));
        return config.json ? JSON.parse(cookie) : cookie;
      }
    }

    return null;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) !== null) {
      $.cookie(key, null, options);
      return true;
    }
    return false;
  };

})(Foundation.zj, document);
/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.dropdown = {
    name : 'dropdown',

    version : '4.1.3',

    settings : {
      activeClass: 'open',
      opened: function(){},
      closed: function(){}
    },

    init : function (scope, method, options) {
      this.scope = scope || this.scope;
      Foundation.inherit(this, 'throttle scrollLeft');

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {

        if (!this.settings.init) {
          this.events();
        }

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(this.scope)
        .on('click.fndtn.dropdown', '[data-dropdown]', function (e) {
            e.preventDefault();
            self.toggle($(this));
        })
        .on('opened.fndtn.dropdown', '[data-dropdown-content]', this.settings.opened)
        .on('closed.fndtn.dropdown', '[data-dropdown-content]', this.settings.closed);

      $('body').on('click.fndtn.dropdown', function (e) {
        var parent = $(e.target).closest('[data-dropdown-content]');

        if ($(e.target).data('dropdown')) {
          return;
        }
        if (parent.length > 0 && ($(e.target).is('[data-dropdown-content]') || $.contains(parent.first()[0], e.target))) {
          e.stopPropagation();
          return;
        }

        self.close.call(self, $('[data-dropdown-content]'));
      });

      $(window).on('resize.fndtn.dropdown', self.throttle(function () {
        self.resize.call(self);
      }, 50)).trigger('resize');

      this.settings.init = true;
    },

    close: function (dropdown) {
      var self = this;
      dropdown.each(function () {
        if ($(this).hasClass(self.settings.activeClass)) {
          $(this)
            .css(Foundation.rtl ? 'right':'left', '-99999px')
            .removeClass(self.settings.activeClass);
          $(this).trigger('closed');
        }
      });
    },

    open: function (dropdown, target) {
        this
          .css(dropdown
            .addClass(this.settings.activeClass), target);
        dropdown.trigger('opened');
    },

    toggle : function (target) {
      var dropdown = $('#' + target.data('dropdown'));

      this.close.call(this, $('[data-dropdown-content]').not(dropdown));

      if (dropdown.hasClass(this.settings.activeClass)) {
        this.close.call(this, dropdown);
      } else {
        this.open.call(this, dropdown, target);
      }
    },

    resize : function () {
      var dropdown = $('[data-dropdown-content].open'),
          target = $("[data-dropdown='" + dropdown.attr('id') + "']");

      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },

    css : function (dropdown, target) {
      // temporary workaround until 4.2
      if (/body/i.test(dropdown.offsetParent()[0].nodeName)) {
        var position = target.offset();
        position.top -= dropdown.offsetParent().offset().top;
        position.left -= dropdown.offsetParent().offset().left;
      } else {
        var position = target.position();
      }

      if (this.small()) {
        dropdown.css({
          position : 'absolute',
          width: '95%',
          left: '2.5%',
          'max-width': 'none',
          top: position.top + this.outerHeight(target)
        });
      } else {
        if (!Foundation.rtl && $(window).width() > this.outerWidth(dropdown) + target.offset().left) {
          var left = position.left;
        } else {
          if (!dropdown.hasClass('right')) {
            dropdown.addClass('right');
          }
          var left = position.left - (this.outerWidth(dropdown) - this.outerWidth(target));
        }

        dropdown.attr('style', '').css({
          position : 'absolute',
          top: position.top + this.outerHeight(target),
          left: left
        });
      }

      return dropdown;
    },

    small : function () {
      return $(window).width() < 768 || $('html').hasClass('lt-ie9');
    },

    off: function () {
      $(this.scope).off('.fndtn.dropdown');
      $('html, body').off('.fndtn.dropdown');
      $(window).off('.fndtn.dropdown');
      $('[data-dropdown-content]').off('.fndtn.dropdown');
      this.settings.init = false;
    }
  };
}(Foundation.zj, this, this.document));
(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.forms = {
    name: 'forms',

    version: '4.1.6',

    cache: {},

    settings: {
      disable_class: 'no-custom',
      last_combo : null
    },

    init: function (scope, method, options) {

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        if (!this.settings.init) {
          this.events();
        }

        this.assemble();

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    assemble: function () {
      $('form.custom input[type="radio"]', $(this.scope)).not('[data-customforms="disabled"]')
        .each(this.append_custom_markup);
      $('form.custom input[type="checkbox"]', $(this.scope)).not('[data-customforms="disabled"]')
        .each(this.append_custom_markup);
      $('form.custom select', $(this.scope))
        .not('[data-customforms="disabled"]')
        .not('[multiple=multiple]')
        .each(this.append_custom_select);
    },

    events: function () {
      var self = this;

      $(this.scope)
        .on('click.fndtn.forms', 'form.custom span.custom.checkbox', function (e) {
          e.preventDefault();
          e.stopPropagation();
          self.toggle_checkbox($(this));
        })
        .on('click.fndtn.forms', 'form.custom span.custom.radio', function (e) {
          e.preventDefault();
          e.stopPropagation();
          self.toggle_radio($(this));
        })
        .on('change.fndtn.forms', 'form.custom select:not([data-customforms="disabled"])', function (e, force_refresh) {
          self.refresh_custom_select($(this), force_refresh);
        })
        .on('click.fndtn.forms', 'form.custom label', function (e) {
          if ($(e.target).is('label')) {
            var $associatedElement = $('#' + self.escape($(this).attr('for')) + ':not([data-customforms="disabled"])'),
              $customCheckbox,
              $customRadio;

            if ($associatedElement.length !== 0) {
              if ($associatedElement.attr('type') === 'checkbox') {
                e.preventDefault();
                $customCheckbox = $(this).find('span.custom.checkbox');
                //the checkbox might be outside after the label or inside of another element
                if ($customCheckbox.length == 0) {
                  $customCheckbox = $associatedElement.add(this).siblings('span.custom.checkbox').first();
                }
                self.toggle_checkbox($customCheckbox);
              } else if ($associatedElement.attr('type') === 'radio') {
                e.preventDefault();
                $customRadio = $(this).find('span.custom.radio');
                //the radio might be outside after the label or inside of another element
                if ($customRadio.length == 0) {
                  $customRadio = $associatedElement.add(this).siblings('span.custom.radio').first();
                }
                self.toggle_radio($customRadio);
              }
            }
          }
        })
        .on('click.fndtn.forms', 'form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector', function (e) {
          var $this = $(this),
              $dropdown = $this.closest('div.custom.dropdown'),
              $select = getFirstPrevSibling($dropdown, 'select');

          // make sure other dropdowns close
          if (!$dropdown.hasClass('open')) $(self.scope).trigger('click');

          e.preventDefault();
          if (false === $select.is(':disabled')) {
            $dropdown.toggleClass('open');

            if ($dropdown.hasClass('open')) {
              $(self.scope).on('click.fndtn.forms.customdropdown', function () {
                $dropdown.removeClass('open');
                $(self.scope).off('.fndtn.forms.customdropdown');
              });
            } else {
              $(self.scope).on('.fndtn.forms.customdropdown');
            }
            return false;
          }
        })
        .on('click.fndtn.forms touchend.fndtn.forms', 'form.custom div.custom.dropdown li', function (e) {
          var $this = $(this),
              $customDropdown = $this.closest('div.custom.dropdown'),
              $select = getFirstPrevSibling($customDropdown, 'select'),
              selectedIndex = 0;

          e.preventDefault();
          e.stopPropagation();

          if (!$(this).hasClass('disabled')) {
            $('div.dropdown').not($customDropdown).removeClass('open');

            var $oldThis = $this.closest('ul')
              .find('li.selected');
            $oldThis.removeClass('selected');

            $this.addClass('selected');

            $customDropdown.removeClass('open')
              .find('a.current')
              .text($this.text());

            $this.closest('ul').find('li').each(function (index) {
              if ($this[0] == this) {
                selectedIndex = index;
              }
            });
            $select[0].selectedIndex = selectedIndex;

            //store the old value in data
            $select.data('prevalue', $oldThis.html());
            $select.trigger('change');
          }
      });

      $(window).on('keydown', function (e) {
        var focus = document.activeElement,
            self = Foundation.libs.forms,
            dropdown = $('.custom.dropdown.open');

        if (dropdown.length > 0) {
          e.preventDefault();

          if (e.which === 13) {
            dropdown.find('li.selected').trigger('click');
          }
          
          if (e.which === 27) {
            dropdown.removeClass('open');
          }

          if (e.which >= 65 && e.which <= 90) {
            var next = self.go_to(dropdown, e.which),
                current = dropdown.find('li.selected');

            if (next) {
              current.removeClass('selected');
              self.scrollTo(next.addClass('selected'), 300);
            }
          }

          if (e.which === 38) {
            var current = dropdown.find('li.selected'),
                prev = current.prev(':not(.disabled)');

            if (prev.length > 0) {
              prev.parent()[0].scrollTop = prev.parent().scrollTop() - self.outerHeight(prev);
              current.removeClass('selected');
              prev.addClass('selected');
            }
          } else if (e.which === 40) {
            var current = dropdown.find('li.selected'),
                next = current.next(':not(.disabled)');

            if (next.length > 0) {
              next.parent()[0].scrollTop = next.parent().scrollTop() + self.outerHeight(next);
              current.removeClass('selected');
              next.addClass('selected');
            }
          }
        }
      });

      this.settings.init = true;
    },

    go_to: function (dropdown, chars) {
      var lis = dropdown.find('li'),
          count = lis.length;

      if (count > 0) {
        for (var i = 0; i < count; i++) {
          var first_letter = lis.eq(i).text().charAt(0).toLowerCase();
          if (first_letter === String.fromCharCode(chars).toLowerCase()) return lis.eq(i);
        }
      }
    },

    scrollTo: function (el, duration) {
      if (duration < 0) return;
      var parent = el.parent();
      var li_height = this.outerHeight(el);
      var difference = (li_height * (el.index())) - parent.scrollTop();
      var perTick = difference / duration * 10;

      this.scrollToTimerCache = setTimeout(function () {
        if (!isNaN(parseInt(perTick, 10))) {
          parent[0].scrollTop = parent.scrollTop() + perTick;
          this.scrollTo(el, duration - 10);
        }
      }.bind(this), 10);
    },

    append_custom_markup: function (idx, sel) {
      var $this = $(sel),
          type = $this.attr('type'),
          $span = $this.next('span.custom.' + type);

      if (!$this.parent().hasClass('switch')) {
        $this.addClass('hidden-field');
      }

      if ($span.length === 0) {
        $span = $('<span class="custom ' + type + '"></span>').insertAfter($this);
      }

      $span.toggleClass('checked', $this.is(':checked'));
      $span.toggleClass('disabled', $this.is(':disabled'));
    },

    append_custom_select: function (idx, sel) {
        var self = Foundation.libs.forms,
            $this = $(sel),
            $customSelect = $this.next('div.custom.dropdown'),
            $customList = $customSelect.find('ul'),
            $selectCurrent = $customSelect.find(".current"),
            $selector = $customSelect.find(".selector"),
            $options = $this.find('option'),
            $selectedOption = $options.filter(':selected'),
            copyClasses = $this.attr('class') ? $this.attr('class').split(' ') : [],
            maxWidth = 0,
            liHtml = '',
            $listItems,
            $currentSelect = false;

        if ($this.hasClass(self.settings.disable_class)) return;

        if ($customSelect.length === 0) {
          var customSelectSize = $this.hasClass('small') ? 'small' : $this.hasClass('medium') ? 'medium' : $this.hasClass('large') ? 'large' : $this.hasClass('expand') ? 'expand' : '';

          $customSelect = $('<div class="' + ['custom', 'dropdown', customSelectSize].concat(copyClasses).filter(function (item, idx, arr) {
            if (item == '') return false;
            return arr.indexOf(item) == idx;
          }).join(' ') + '"><a href="#" class="selector"></a><ul /></div>');

          $selector = $customSelect.find(".selector");
          $customList = $customSelect.find("ul");

          liHtml = $options.map(function () {
            return "<li>" + $(this).html() + "</li>";
          }).get().join('');

          $customList.append(liHtml);

          $currentSelect = $customSelect
            .prepend('<a href="#" class="current">' + $selectedOption.html() + '</a>')
            .find(".current");

          $this.after($customSelect)
            .addClass('hidden-field');
        } else {
          liHtml = $options.map(function () {
              return "<li>" + $(this).html() + "</li>";
            })
            .get().join('');

          $customList.html('')
            .append(liHtml);

        } // endif $customSelect.length === 0

        self.assign_id($this, $customSelect);
        $customSelect.toggleClass('disabled', $this.is(':disabled'));
        $listItems = $customList.find('li');

        // cache list length
        self.cache[$customSelect.data('id')] = $listItems.length;

        $options.each(function (index) {
          if (this.selected) {
            $listItems.eq(index).addClass('selected');

            if ($currentSelect) {
              $currentSelect.html($(this).html());
            }
          }
          if ($(this).is(':disabled')) {
            $listItems.eq(index).addClass('disabled');
          }
        });

        //
        // If we're not specifying a predetermined form size.
        //
        if (!$customSelect.is('.small, .medium, .large, .expand')) {

          // ------------------------------------------------------------------------------------
          // This is a work-around for when elements are contained within hidden parents.
          // For example, when custom-form elements are inside of a hidden reveal modal.
          //
          // We need to display the current custom list element as well as hidden parent elements
          // in order to properly calculate the list item element's width property.
          // -------------------------------------------------------------------------------------

          $customSelect.addClass('open');
          //
          // Quickly, display all parent elements.
          // This should help us calcualate the width of the list item's within the drop down.
          //
          var self = Foundation.libs.forms;
          self.hidden_fix.adjust($customList);

          maxWidth = (self.outerWidth($listItems) > maxWidth) ? self.outerWidth($listItems) : maxWidth;

          Foundation.libs.forms.hidden_fix.reset();

          $customSelect.removeClass('open');

        } // endif

    },

    assign_id: function ($select, $customSelect) {
      var id = [+new Date(), Foundation.random_str(5)].join('-');
      $select.attr('data-id', id);
      $customSelect.attr('data-id', id);
    },

    refresh_custom_select: function ($select, force_refresh) {
      var self = this;
      var maxWidth = 0,
          $customSelect = $select.next(),
          $options = $select.find('option'),
          $listItems = $customSelect.find('li');

      if ($listItems.length != this.cache[$customSelect.data('id')] || force_refresh) {
        $customSelect.find('ul').html('');

        $options.each(function () {
          var $li = $('<li>' + $(this).html() + '</li>');
          $customSelect.find('ul').append($li);
        });

        // re-populate
        $options.each(function (index) {
          if (this.selected) {
            $customSelect.find('li').eq(index).addClass('selected');
            $customSelect.find('.current').html($(this).html());
          }
          if ($(this).is(':disabled')) {
            $customSelect.find('li').eq(index).addClass('disabled');
          }
        });

        // fix width
        $customSelect.removeAttr('style')
          .find('ul').removeAttr('style');
        $customSelect.find('li').each(function () {
          $customSelect.addClass('open');
          if (self.outerWidth($(this)) > maxWidth) {
            maxWidth = self.outerWidth($(this));
          }
          $customSelect.removeClass('open');
        });

        $listItems = $customSelect.find('li');
        // cache list length
        this.cache[$customSelect.data('id')] = $listItems.length;
      }
    },

    toggle_checkbox: function ($element) {
      var $input = $element.prev(),
          input = $input[0];

      if (false === $input.is(':disabled')) {
        input.checked = ((input.checked) ? false : true);
        $element.toggleClass('checked');

        $input.trigger('change');
      }
    },

    toggle_radio: function ($element) {
        var $input = $element.prev(),
            $form = $input.closest('form.custom'),
            input = $input[0];

        if (false === $input.is(':disabled')) {
          $form.find('input[type="radio"][name="' + this.escape($input.attr('name')) + '"]')
            .next().not($element).removeClass('checked');

          if (!$element.hasClass('checked')) {
            $element.toggleClass('checked');
          }

          input.checked = $element.hasClass('checked');

          $input.trigger('change');
        }
    },

    escape: function (text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },

    hidden_fix: {
        /**
         * Sets all hidden parent elements and self to visibile.
         *
         * @method adjust
         * @param {jQuery Object} $child
         */

        // We'll use this to temporarily store style properties.
        tmp: [],

        // We'll use this to set hidden parent elements.
        hidden: null,

        adjust: function ($child) {
          // Internal reference.
          var _self = this;

          // Set all hidden parent elements, including this element.
          _self.hidden = $child.parents().andSelf().filter(":hidden");

          // Loop through all hidden elements.
          _self.hidden.each(function () {

            // Cache the element.
            var $elem = $(this);

            // Store the style attribute.
            // Undefined if element doesn't have a style attribute.
            _self.tmp.push($elem.attr('style'));

            // Set the element's display property to block,
            // but ensure it's visibility is hidden.
            $elem.css({
                'visibility': 'hidden',
                'display': 'block'
            });
          });

        }, // end adjust

        /**
         * Resets the elements previous state.
         *
         * @method reset
         */
        reset: function () {
          // Internal reference.
          var _self = this;
          // Loop through our hidden element collection.
          _self.hidden.each(function (i) {
            // Cache this element.
            var $elem = $(this),
                _tmp = _self.tmp[i]; // Get the stored 'style' value for this element.

            // If the stored value is undefined.
            if (_tmp === undefined)
            // Remove the style attribute.
            $elem.removeAttr('style');
            else
            // Otherwise, reset the element style attribute.
            $elem.attr('style', _tmp);
          });
          // Reset the tmp array.
          _self.tmp = [];
          // Reset the hidden elements variable.
          _self.hidden = null;

        } // end reset
    },

    off: function () {
      $(this.scope).off('.fndtn.forms');
    }
  };

  var getFirstPrevSibling = function($el, selector) {
    var $el = $el.prev();
    while ($el.length) {
      if ($el.is(selector)) return $el;
      $el = $el.prev();
    }
    return $();
  };
}(Foundation.zj, this, this.document));
/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.interchange = {
    name : 'interchange',

    version : '4.2.4',

    cache : {},

    images_loaded : false,

    settings : {
      load_attr : 'interchange',

      named_queries : {
        'default' : 'only screen and (min-width: 1px)',
        small : 'only screen and (min-width: 1px)',
        medium : 'only screen and (min-width: 48em)',
        large : 'only screen and (min-width: 75em)',
        landscape : 'only screen and (orientation: landscape)',
        portrait : 'only screen and (orientation: portrait)',
        retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
          'only screen and (min--moz-device-pixel-ratio: 2),' +
          'only screen and (-o-min-device-pixel-ratio: 2/1),' +
          'only screen and (min-device-pixel-ratio: 2),' +
          'only screen and (min-resolution: 192dpi),' +
          'only screen and (min-resolution: 2dppx)'
      },

      directives : {
        replace: function (el, path) {
          if (/IMG/.test(el[0].nodeName)) {
            var orig_path = el[0].src;

            if (new RegExp(path, 'i').test(orig_path)) return;

            el[0].src = path;

            return el.trigger('replace', [el[0].src, orig_path]);
          }
        }
      }
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      this.events();
      this.images();

      if (typeof method !== 'string') {
        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(window).on('resize.fndtn.interchange', self.throttle(function () {
        self.resize.call(self);
      }, 50));
    },

    resize : function () {
      var cache = this.cache;

      if(!this.images_loaded) {
        setTimeout($.proxy(this.resize, this), 50);
        return;
      }

      for (var uuid in cache) {
        if (cache.hasOwnProperty(uuid)) {
          var passed = this.results(uuid, cache[uuid]);

          if (passed) {
            this.settings.directives[passed
              .scenario[1]](passed.el, passed.scenario[0]);
          }
        }
      }

    },

    results : function (uuid, scenarios) {
      var count = scenarios.length;

      if (count > 0) {
        var el = $('[data-uuid="' + uuid + '"]');

        for (var i = count - 1; i >= 0; i--) {
          var mq, rule = scenarios[i][2];
          if (this.settings.named_queries.hasOwnProperty(rule)) {
            mq = matchMedia(this.settings.named_queries[rule]);
          } else {
            mq = matchMedia(rule);
          }
          if (mq.matches) {
            return {el: el, scenario: scenarios[i]};
          }
        }
      }

      return false;
    },

    images : function (force_update) {
      if (typeof this.cached_images === 'undefined' || force_update) {
        return this.update_images();
      }

      return this.cached_images;
    },

    update_images : function () {
      var images = document.getElementsByTagName('img'),
          count = images.length,
          loaded_count = 0,
          data_attr = 'data-' + this.settings.load_attr;

      this.cached_images = [];
      this.images_loaded = false;

      for (var i = count - 1; i >= 0; i--) {
        this.loaded($(images[i]), function (image) {
          loaded_count++;
          if (image) {
            var str = image.getAttribute(data_attr) || '';

            if (str.length > 0) {
              this.cached_images.push(image);
            }
          }

          if(loaded_count === count) {
            this.images_loaded = true;
            this.enhance();
          }
        }.bind(this));
      }

      return 'deferred';
    },

    // based on jquery.imageready.js
    // @weblinc, @jsantell, (c) 2012

    loaded : function (image, callback) {
      function loaded () {
        callback(image[0]);
      }

      function bindLoad () {
        this.one('load', loaded);

        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
          var src = this.attr( 'src' ),
              param = src.match( /\?/ ) ? '&' : '?';

          param += 'random=' + (new Date()).getTime();
          this.attr('src', src + param);
        }
      }

      if (!image.attr('src')) {
        loaded();
        return;
      }

      if (image[0].complete || image[0].readyState === 4) {
        loaded();
      } else {
        bindLoad.call(image);
      }
    },

    enhance : function () {
      var count = this.images().length;

      for (var i = count - 1; i >= 0; i--) {
        this._object($(this.images()[i]));
      }

      return $(window).trigger('resize');
    },

    parse_params : function (path, directive, mq) {
      return [this.trim(path), this.convert_directive(directive), this.trim(mq)];
    },

    convert_directive : function (directive) {
      var trimmed = this.trim(directive);

      if (trimmed.length > 0) {
        return trimmed;
      }

      return 'replace';
    },

    _object : function(el) {
      var raw_arr = this.parse_data_attr(el),
          scenarios = [], count = raw_arr.length;

      if (count > 0) {
        for (var i = count - 1; i >= 0; i--) {
          var split = raw_arr[i].split(/\((.*?)(\))$/);

          if (split.length > 1) {
            var cached_split = split[0].split(','),
                params = this.parse_params(cached_split[0],
                  cached_split[1], split[1]);

            scenarios.push(params);
          }
        }
      }

      return this.store(el, scenarios);
    },

    uuid : function (separator) {
      var delim = separator || "-";

      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }

      return (S4() + S4() + delim + S4() + delim + S4()
        + delim + S4() + delim + S4() + S4() + S4());
    },

    store : function (el, scenarios) {
      var uuid = this.uuid(),
          current_uuid = el.data('uuid');

      if (current_uuid) return this.cache[current_uuid];

      el.attr('data-uuid', uuid);

      return this.cache[uuid] = scenarios;
    },

    trim : function(str) {
      if (typeof str === 'string') {
        return $.trim(str);
      }

      return str;
    },

    parse_data_attr : function (el) {
      var raw = el.data(this.settings.load_attr).split(/\[(.*?)\]/),
          count = raw.length, output = [];

      for (var i = count - 1; i >= 0; i--) {
        if (raw[i].replace(/[\W\d]+/, '').length > 4) {
          output.push(raw[i]);
        }
      }

      return output;
    },

    reflow : function () {
      this.images(true);
    }

  };

}(Foundation.zj, this, this.document));
/*jslint unparam: true, browser: true, indent: 2 */

(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.joyride = {
    name: 'joyride',

    version : '4.1.2',

    defaults : {
      expose               : false,      // turn on or off the expose feature
      modal                : false,      // Whether to cover page with modal during the tour
      tipLocation          : 'bottom',  // 'top' or 'bottom' in relation to parent
      nubPosition          : 'auto',    // override on a per tooltip bases
      scrollSpeed          : 300,       // Page scrolling speed in milliseconds, 0 = no scroll animation
      timer                : 0,         // 0 = no timer , all other numbers = timer in milliseconds
      startTimerOnClick    : true,      // true or false - true requires clicking the first button start the timer
      startOffset          : 0,         // the index of the tooltip you want to start on (index of the li)
      nextButton           : true,      // true or false to control whether a next button is used
      tipAnimation         : 'fade',    // 'pop' or 'fade' in each tip
      pauseAfter           : [],        // array of indexes where to pause the tour after
      exposed              : [],        // array of expose elements
      tipAnimationFadeSpeed: 300,       // when tipAnimation = 'fade' this is speed in milliseconds for the transition
      cookieMonster        : false,     // true or false to control whether cookies are used
      cookieName           : 'joyride', // Name the cookie you'll use
      cookieDomain         : false,     // Will this cookie be attached to a domain, ie. '.notableapp.com'
      cookieExpires        : 365,       // set when you would like the cookie to expire.
      tipContainer         : 'body',    // Where will the tip be attached
      postRideCallback     : function (){},    // A method to call once the tour closes (canceled or complete)
      postStepCallback     : function (){},    // A method to call after each step
      preStepCallback      : function (){},    // A method to call before each step
      preRideCallback      : function (){},    // A method to call before the tour starts (passed index, tip, and cloned exposed element)
      postExposeCallback   : function (){},    // A method to call after an element has been exposed
      template : { // HTML segments for tip layout
        link    : '<a href="#close" class="joyride-close-tip">&times;</a>',
        timer   : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
        tip     : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
        wrapper : '<div class="joyride-content-wrapper"></div>',
        button  : '<a href="#" class="small button joyride-next-tip"></a>',
        modal   : '<div class="joyride-modal-bg"></div>',
        expose  : '<div class="joyride-expose-wrapper"></div>',
        exposeCover: '<div class="joyride-expose-cover"></div>'
      }
    },

    settings : {},

    init : function (scope, method, options) {
      this.scope = scope || this.scope;
      Foundation.inherit(this, 'throttle data_options scrollTo scrollLeft delay');

      if (typeof method === 'object') {
        $.extend(true, this.settings, this.defaults, method);
      } else {
        $.extend(true, this.settings, this.defaults, options);
      }

      if (typeof method != 'string') {
        if (!this.settings.init) this.events();

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(this.scope)
        .on('click.joyride', '.joyride-next-tip, .joyride-modal-bg', function (e) {
          e.preventDefault();

          if (this.settings.$li.next().length < 1) {
            this.end();
          } else if (this.settings.timer > 0) {
            clearTimeout(this.settings.automate);
            this.hide();
            this.show();
            this.startTimer();
          } else {
            this.hide();
            this.show();
          }

        }.bind(this))

        .on('click.joyride', '.joyride-close-tip', function (e) {
          e.preventDefault();
          this.end();
        }.bind(this));

      $(window).on('resize.fndtn.joyride', self.throttle(function () {
        if ($('[data-joyride]').length > 0 && self.settings.$next_tip) {
          if (self.settings.exposed.length > 0) {
            var $els = $(self.settings.exposed);

            $els.each(function () {
              var $this = $(this);
              self.un_expose($this);
              self.expose($this);
            });
          }

          if (self.is_phone()) {
            self.pos_phone();
          } else {
            self.pos_default(false, true);
          }
        }
      }, 100));

      this.settings.init = true;
    },

    start : function () {
      var self = this,
          $this = $(this.scope).find('[data-joyride]'),
          integer_settings = ['timer', 'scrollSpeed', 'startOffset', 'tipAnimationFadeSpeed', 'cookieExpires'],
          int_settings_count = integer_settings.length;

      if (!this.settings.init) this.init();

      // non configureable settings
      this.settings.$content_el = $this;
      this.settings.$body = $(this.settings.tipContainer);
      this.settings.body_offset = $(this.settings.tipContainer).position();
      this.settings.$tip_content = this.settings.$content_el.find('> li');
      this.settings.paused = false;
      this.settings.attempts = 0;

      this.settings.tipLocationPatterns = {
        top: ['bottom'],
        bottom: [], // bottom should not need to be repositioned
        left: ['right', 'top', 'bottom'],
        right: ['left', 'top', 'bottom']
      };

      // can we create cookies?
      if (typeof $.cookie !== 'function') {
        this.settings.cookieMonster = false;
      }

      // generate the tips and insert into dom.
      if (!this.settings.cookieMonster || this.settings.cookieMonster && $.cookie(this.settings.cookieName) === null) {
        this.settings.$tip_content.each(function (index) {
          var $this = $(this);
          $.extend(true, self.settings, self.data_options($this));
          // Make sure that settings parsed from data_options are integers where necessary
          for (var i = int_settings_count - 1; i >= 0; i--) {
            self.settings[integer_settings[i]] = parseInt(self.settings[integer_settings[i]], 10);
          }
          self.create({$li : $this, index : index});
        });

        // show first tip
        if (!this.settings.startTimerOnClick && this.settings.timer > 0) {
          this.show('init');
          this.startTimer();
        } else {
          this.show('init');
        }

      }
    },

    resume : function () {
      this.set_li();
      this.show();
    },

    tip_template : function (opts) {
      var $blank, content;

      opts.tip_class = opts.tip_class || '';

      $blank = $(this.settings.template.tip).addClass(opts.tip_class);
      content = $.trim($(opts.li).html()) +
        this.button_text(opts.button_text) +
        this.settings.template.link +
        this.timer_instance(opts.index);

      $blank.append($(this.settings.template.wrapper));
      $blank.first().attr('data-index', opts.index);
      $('.joyride-content-wrapper', $blank).append(content);

      return $blank[0];
    },

    timer_instance : function (index) {
      var txt;

      if ((index === 0 && this.settings.startTimerOnClick && this.settings.timer > 0) || this.settings.timer === 0) {
        txt = '';
      } else {
        txt = this.outerHTML($(this.settings.template.timer)[0]);
      }
      return txt;
    },

    button_text : function (txt) {
      if (this.settings.nextButton) {
        txt = $.trim(txt) || 'Next';
        txt = this.outerHTML($(this.settings.template.button).append(txt)[0]);
      } else {
        txt = '';
      }
      return txt;
    },

    create : function (opts) {
      var buttonText = opts.$li.attr('data-button') || opts.$li.attr('data-text'),
        tipClass = opts.$li.attr('class'),
        $tip_content = $(this.tip_template({
          tip_class : tipClass,
          index : opts.index,
          button_text : buttonText,
          li : opts.$li
        }));

      $(this.settings.tipContainer).append($tip_content);
    },

    show : function (init) {
      var $timer = null;

      // are we paused?
      if (this.settings.$li === undefined
        || ($.inArray(this.settings.$li.index(), this.settings.pauseAfter) === -1)) {

        // don't go to the next li if the tour was paused
        if (this.settings.paused) {
          this.settings.paused = false;
        } else {
          this.set_li(init);
        }

        this.settings.attempts = 0;

        if (this.settings.$li.length && this.settings.$target.length > 0) {
          if (init) { //run when we first start
            this.settings.preRideCallback(this.settings.$li.index(), this.settings.$next_tip);
            if (this.settings.modal) {
              this.show_modal();
            }
          }

          this.settings.preStepCallback(this.settings.$li.index(), this.settings.$next_tip);

          if (this.settings.modal && this.settings.expose) {
            this.expose();
          }

          this.settings.tipSettings = $.extend(this.settings, this.data_options(this.settings.$li));

          this.settings.timer = parseInt(this.settings.timer, 10);

          this.settings.tipSettings.tipLocationPattern = this.settings.tipLocationPatterns[this.settings.tipSettings.tipLocation];

          // scroll if not modal
          if (!/body/i.test(this.settings.$target.selector)) {
            this.scroll_to();
          }

          if (this.is_phone()) {
            this.pos_phone(true);
          } else {
            this.pos_default(true);
          }

          $timer = this.settings.$next_tip.find('.joyride-timer-indicator');

          if (/pop/i.test(this.settings.tipAnimation)) {

            $timer.width(0);

            if (this.settings.timer > 0) {

              this.settings.$next_tip.show();

              this.delay(function () {
                $timer.animate({
                  width: $timer.parent().width()
                }, this.settings.timer, 'linear');
              }.bind(this), this.settings.tipAnimationFadeSpeed);

            } else {
              this.settings.$next_tip.show();

            }


          } else if (/fade/i.test(this.settings.tipAnimation)) {

            $timer.width(0);

            if (this.settings.timer > 0) {

              this.settings.$next_tip
                .fadeIn(this.settings.tipAnimationFadeSpeed)
                .show();

              this.delay(function () {
                $timer.animate({
                  width: $timer.parent().width()
                }, this.settings.timer, 'linear');
              }.bind(this), this.settings.tipAnimationFadeSpeed);

            } else {
              this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed);

            }
          }

          this.settings.$current_tip = this.settings.$next_tip;

        // skip non-existant targets
        } else if (this.settings.$li && this.settings.$target.length < 1) {

          this.show();

        } else {

          this.end();

        }
      } else {

        this.settings.paused = true;

      }

    },

    is_phone : function () {
      if (Modernizr) {
        return Modernizr.mq('only screen and (max-width: 767px)') || $('.lt-ie9').length > 0;
      }

      return (this.settings.$window.width() < 767);
    },

    hide : function () {
      if (this.settings.modal && this.settings.expose) {
        this.un_expose();
      }

      if (!this.settings.modal) {
        $('.joyride-modal-bg').hide();
      }
      this.settings.$current_tip.hide();
      this.settings.postStepCallback(this.settings.$li.index(),
        this.settings.$current_tip);
    },

    set_li : function (init) {
      if (init) {
        this.settings.$li = this.settings.$tip_content.eq(this.settings.startOffset);
        this.set_next_tip();
        this.settings.$current_tip = this.settings.$next_tip;
      } else {
        this.settings.$li = this.settings.$li.next();
        this.set_next_tip();
      }

      this.set_target();
    },

    set_next_tip : function () {
      this.settings.$next_tip = $(".joyride-tip-guide[data-index='" + this.settings.$li.index() + "']");
      this.settings.$next_tip.data('closed', '');
    },

    set_target : function () {
      var cl = this.settings.$li.attr('data-class'),
          id = this.settings.$li.attr('data-id'),
          $sel = function () {
            if (id) {
              return $(document.getElementById(id));
            } else if (cl) {
              return $('.' + cl).first();
            } else {
              return $('body');
            }
          };

      this.settings.$target = $sel();
    },

    scroll_to : function () {
      var window_half, tipOffset;

      window_half = $(window).height() / 2;
      tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.outerHeight(this.settings.$next_tip));
      if (tipOffset > 0) {
        this.scrollTo($('html, body'), tipOffset, this.settings.scrollSpeed);
      }
    },

    paused : function () {
      return ($.inArray((this.settings.$li.index() + 1), this.settings.pauseAfter) === -1);
    },

    restart : function () {
      this.hide();
      this.settings.$li = undefined;
      this.show('init');
    },

    pos_default : function (init, resizing) {
      var half_fold = Math.ceil($(window).height() / 2),
          tip_position = this.settings.$next_tip.offset(),
          $nub = this.settings.$next_tip.find('.joyride-nub'),
          nub_width = Math.ceil(this.outerWidth($nub) / 2),
          nub_height = Math.ceil(this.outerHeight($nub) / 2),
          toggle = init || false;

      // tip must not be "display: none" to calculate position
      if (toggle) {
        this.settings.$next_tip.css('visibility', 'hidden');
        this.settings.$next_tip.show();
      }

      if (typeof resizing === 'undefined') {
        resizing = false;
      }

      if (!/body/i.test(this.settings.$target.selector)) {

          if (this.bottom()) {
            var leftOffset = this.settings.$target.offset().left;
            if (Foundation.rtl) {
              leftOffset = this.settings.$target.offset().width - this.settings.$next_tip.width() + leftOffset;
            }
            this.settings.$next_tip.css({
              top: (this.settings.$target.offset().top + nub_height + this.outerHeight(this.settings.$target)),
              left: leftOffset});

            this.nub_position($nub, this.settings.tipSettings.nubPosition, 'top');

          } else if (this.top()) {
            var leftOffset = this.settings.$target.offset().left;
            if (Foundation.rtl) {
              leftOffset = this.settings.$target.offset().width - this.settings.$next_tip.width() + leftOffset;
            }
            this.settings.$next_tip.css({
              top: (this.settings.$target.offset().top - this.outerHeight(this.settings.$next_tip) - nub_height),
              left: leftOffset});

            this.nub_position($nub, this.settings.tipSettings.nubPosition, 'bottom');

          } else if (this.right()) {

            this.settings.$next_tip.css({
              top: this.settings.$target.offset().top,
              left: (this.outerWidth(this.settings.$target) + this.settings.$target.offset().left + nub_width)});

            this.nub_position($nub, this.settings.tipSettings.nubPosition, 'left');

          } else if (this.left()) {

            this.settings.$next_tip.css({
              top: this.settings.$target.offset().top,
              left: (this.settings.$target.offset().left - this.outerWidth(this.settings.$next_tip) - nub_width)});

            this.nub_position($nub, this.settings.tipSettings.nubPosition, 'right');

          }

          if (!this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tipSettings.tipLocationPattern.length) {

            $nub.removeClass('bottom')
              .removeClass('top')
              .removeClass('right')
              .removeClass('left');

            this.settings.tipSettings.tipLocation = this.settings.tipSettings.tipLocationPattern[this.settings.attempts];

            this.settings.attempts++;

            this.pos_default();

          }

      } else if (this.settings.$li.length) {

        this.pos_modal($nub);

      }

      if (toggle) {
        this.settings.$next_tip.hide();
        this.settings.$next_tip.css('visibility', 'visible');
      }

    },

    pos_phone : function (init) {
      var tip_height = this.outerHeight(this.settings.$next_tip),
          tip_offset = this.settings.$next_tip.offset(),
          target_height = this.outerHeight(this.settings.$target),
          $nub = $('.joyride-nub', this.settings.$next_tip),
          nub_height = Math.ceil(this.outerHeight($nub) / 2),
          toggle = init || false;

      $nub.removeClass('bottom')
        .removeClass('top')
        .removeClass('right')
        .removeClass('left');

      if (toggle) {
        this.settings.$next_tip.css('visibility', 'hidden');
        this.settings.$next_tip.show();
      }

      if (!/body/i.test(this.settings.$target.selector)) {

        if (this.top()) {

            this.settings.$next_tip.offset({top: this.settings.$target.offset().top - tip_height - nub_height});
            $nub.addClass('bottom');

        } else {

          this.settings.$next_tip.offset({top: this.settings.$target.offset().top + target_height + nub_height});
          $nub.addClass('top');

        }

      } else if (this.settings.$li.length) {
        this.pos_modal($nub);
      }

      if (toggle) {
        this.settings.$next_tip.hide();
        this.settings.$next_tip.css('visibility', 'visible');
      }
    },

    pos_modal : function ($nub) {
      this.center();
      $nub.hide();

      this.show_modal();
    },

    show_modal : function () {
      if (!this.settings.$next_tip.data('closed')) {
        var joyridemodalbg =  $('.joyride-modal-bg');
        if (joyridemodalbg.length < 1) {
          $('body').append(this.settings.template.modal).show();
        }

        if (/pop/i.test(this.settings.tipAnimation)) {
            joyridemodalbg.show();
        } else {
            joyridemodalbg.fadeIn(this.settings.tipAnimationFadeSpeed);
        }
      }
    },

    expose : function () {
      var expose,
          exposeCover,
          el,
          origCSS,
          randId = 'expose-'+Math.floor(Math.random()*10000);

      if (arguments.length > 0 && arguments[0] instanceof $) {
        el = arguments[0];
      } else if(this.settings.$target && !/body/i.test(this.settings.$target.selector)){
        el = this.settings.$target;
      }  else {
        return false;
      }

      if(el.length < 1){
        if(window.console){
          console.error('element not valid', el);
        }
        return false;
      }

      expose = $(this.settings.template.expose);
      this.settings.$body.append(expose);
      expose.css({
        top: el.offset().top,
        left: el.offset().left,
        width: this.outerWidth(el, true),
        height: this.outerHeight(el, true)
      });

      exposeCover = $(this.settings.template.exposeCover);

      origCSS = {
        zIndex: el.css('z-index'),
        position: el.css('position')
      };

      el.css('z-index',parseInt(expose.css('z-index'))+1);

      if (origCSS.position == 'static') {
        el.css('position','relative');
      }

      el.data('expose-css',origCSS);

      exposeCover.css({
        top: el.offset().top,
        left: el.offset().left,
        width: this.outerWidth(el, true),
        height: this.outerHeight(el, true)
      });

      this.settings.$body.append(exposeCover);
      expose.addClass(randId);
      exposeCover.addClass(randId);
      el.data('expose', randId);
      this.settings.postExposeCallback(this.settings.$li.index(), this.settings.$next_tip, el);
      this.add_exposed(el);
    },

    un_expose : function () {
      var exposeId,
          el,
          expose ,
          origCSS,
          clearAll = false;

      if (arguments.length > 0 && arguments[0] instanceof $) {
        el = arguments[0];
      } else if(this.settings.$target && !/body/i.test(this.settings.$target.selector)){
        el = this.settings.$target;
      }  else {
        return false;
      }

      if(el.length < 1){
        if (window.console) {
          console.error('element not valid', el);
        }
        return false;
      }

      exposeId = el.data('expose');
      expose = $('.' + exposeId);

      if (arguments.length > 1) {
        clearAll = arguments[1];
      }

      if (clearAll === true) {
        $('.joyride-expose-wrapper,.joyride-expose-cover').remove();
      } else {
        expose.remove();
      }

      origCSS = el.data('expose-css');

      if (origCSS.zIndex == 'auto') {
        el.css('z-index', '');
      } else {
        el.css('z-index', origCSS.zIndex);
      }

      if (origCSS.position != el.css('position')) {
        if(origCSS.position == 'static') {// this is default, no need to set it.
          el.css('position', '');
        } else {
          el.css('position', origCSS.position);
        }
      }

      el.removeData('expose');
      el.removeData('expose-z-index');
      this.remove_exposed(el);
    },

    add_exposed: function(el){
      this.settings.exposed = this.settings.exposed || [];
      if (el instanceof $ || typeof el === 'object') {
        this.settings.exposed.push(el[0]);
      } else if (typeof el == 'string') {
        this.settings.exposed.push(el);
      }
    },

    remove_exposed: function(el){
      var search, count;
      if (el instanceof $) {
        search = el[0]
      } else if (typeof el == 'string'){
        search = el;
      }

      this.settings.exposed = this.settings.exposed || [];
      count = this.settings.exposed.length;

      for (var i=0; i < count; i++) {
        if (this.settings.exposed[i] == search) {
          this.settings.exposed.splice(i, 1);
          return;
        }
      }
    },

    center : function () {
      var $w = $(window);

      this.settings.$next_tip.css({
        top : ((($w.height() - this.outerHeight(this.settings.$next_tip)) / 2) + $w.scrollTop()),
        left : ((($w.width() - this.outerWidth(this.settings.$next_tip)) / 2) + this.scrollLeft($w))
      });

      return true;
    },

    bottom : function () {
      return /bottom/i.test(this.settings.tipSettings.tipLocation);
    },

    top : function () {
      return /top/i.test(this.settings.tipSettings.tipLocation);
    },

    right : function () {
      return /right/i.test(this.settings.tipSettings.tipLocation);
    },

    left : function () {
      return /left/i.test(this.settings.tipSettings.tipLocation);
    },

    corners : function (el) {
      var w = $(window),
          window_half = w.height() / 2,
          //using this to calculate since scroll may not have finished yet.
          tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight()),
          right = w.width() + this.scrollLeft(w),
          offsetBottom =  w.height() + tipOffset,
          bottom = w.height() + w.scrollTop(),
          top = w.scrollTop();

      if (tipOffset < top) {
        if (tipOffset < 0) {
          top = 0;
        } else {
          top = tipOffset;
        }
      }

      if (offsetBottom > bottom) {
        bottom = offsetBottom;
      }

      return [
        el.offset().top < top,
        right < el.offset().left + el.outerWidth(),
        bottom < el.offset().top + el.outerHeight(),
        this.scrollLeft(w) > el.offset().left
      ];
    },

    visible : function (hidden_corners) {
      var i = hidden_corners.length;

      while (i--) {
        if (hidden_corners[i]) return false;
      }

      return true;
    },

    nub_position : function (nub, pos, def) {
      if (pos === 'auto') {
        nub.addClass(def);
      } else {
        nub.addClass(pos);
      }
    },

    startTimer : function () {
      if (this.settings.$li.length) {
        this.settings.automate = setTimeout(function () {
          this.hide();
          this.show();
          this.startTimer();
        }.bind(this), this.settings.timer);
      } else {
        clearTimeout(this.settings.automate);
      }
    },

    end : function () {
      if (this.settings.cookieMonster) {
        $.cookie(this.settings.cookieName, 'ridden', { expires: this.settings.cookieExpires, domain: this.settings.cookieDomain });
      }

      if (this.settings.timer > 0) {
        clearTimeout(this.settings.automate);
      }

      if (this.settings.modal && this.settings.expose) {
        this.un_expose();
      }

      this.settings.$next_tip.data('closed', true);

      $('.joyride-modal-bg').hide();
      this.settings.$current_tip.hide();
      this.settings.postStepCallback(this.settings.$li.index(), this.settings.$current_tip);
      this.settings.postRideCallback(this.settings.$li.index(), this.settings.$current_tip);
      $('.joyride-tip-guide').remove();
    },

    outerHTML : function (el) {
      // support FireFox < 11
      return el.outerHTML || new XMLSerializer().serializeToString(el);
    },

    off : function () {
      $(this.scope).off('.joyride');
      $(window).off('.joyride');
      $('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg').off('.joyride');
      $('.joyride-tip-guide, .joyride-modal-bg').remove();
      clearTimeout(this.settings.automate);
      this.settings = {};
    }
  };
}(Foundation.zj, this, this.document));
/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.magellan = {
    name : 'magellan',

    version : '4.0.0',

    settings : {
      activeClass: 'active'
    },

    init : function (scope, method, options) {
      this.scope = scope || this.scope;
      Foundation.inherit(this, 'data_options');

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        if (!this.settings.init) {
          this.fixed_magellan = $("[data-magellan-expedition]");
          this.set_threshold();
          this.last_destination = $('[data-magellan-destination]').last();
          this.events();
        }

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;
      $(this.scope).on('arrival.fndtn.magellan', '[data-magellan-arrival]', function (e) {
        var $destination = $(this),
            $expedition = $destination.closest('[data-magellan-expedition]'),
            activeClass = $expedition.attr('data-magellan-active-class') 
              || self.settings.activeClass;

          $destination
            .closest('[data-magellan-expedition]')
            .find('[data-magellan-arrival]')
            .not($destination)
            .removeClass(activeClass);
          $destination.addClass(activeClass);
      });

      this.fixed_magellan
        .on('update-position.fndtn.magellan', function(){
          var $el = $(this);
          // $el.data("magellan-fixed-position","");
          //$el.data("magellan-top-offset", "");
        })
        .trigger('update-position');

      $(window)
        .on('resize.fndtn.magellan', function() {
          this.fixed_magellan.trigger('update-position');
        }.bind(this))

        .on('scroll.fndtn.magellan', function() {
          var windowScrollTop = $(window).scrollTop();
          self.fixed_magellan.each(function() {
            var $expedition = $(this);
            if (typeof $expedition.data('magellan-top-offset') === 'undefined') {
              $expedition.data('magellan-top-offset', $expedition.offset().top);
            }
            if (typeof $expedition.data('magellan-fixed-position') === 'undefined') {
              $expedition.data('magellan-fixed-position', false)
            }
            var fixed_position = (windowScrollTop) > $expedition.data("magellan-top-offset");
            var attr = $expedition.attr('data-magellan-top-offset');

            if ($expedition.data("magellan-fixed-position") != fixed_position) {
              $expedition.data("magellan-fixed-position", fixed_position);
              if (fixed_position) {
                $expedition.css({position:"fixed", top:"0"});
              } else {
                $expedition.css({position:"", top:""});
              }
              if (fixed_position && typeof attr != 'undefined' && attr != false) {
                $expedition.css({position:"fixed", top:attr + "px"});
              }
            }
          });
        });


      if (this.last_destination.length > 0) {
        $(window).on('scroll.fndtn.magellan', function (e) {
          var windowScrollTop = $(window).scrollTop(),
              scrolltopPlusHeight = windowScrollTop + $(window).height(),
              lastDestinationTop = Math.ceil(self.last_destination.offset().top);

          $('[data-magellan-destination]').each(function () {
            var $destination = $(this),
                destination_name = $destination.attr('data-magellan-destination'),
                topOffset = $destination.offset().top - windowScrollTop;

            if (topOffset <= self.settings.threshold) {
              $("[data-magellan-arrival='" + destination_name + "']").trigger('arrival');
            }
            // In large screens we may hit the bottom of the page and dont reach the top of the last magellan-destination, so lets force it
            if (scrolltopPlusHeight >= $(self.scope).height() && lastDestinationTop > windowScrollTop && lastDestinationTop < scrolltopPlusHeight) {
              $('[data-magellan-arrival]').last().trigger('arrival');
            }
          });
        });
      }

      this.settings.init = true;
    },

    set_threshold : function () {
      if (!this.settings.threshold) {
        this.settings.threshold = (this.fixed_magellan.length > 0) ? 
          this.outerHeight(this.fixed_magellan, true) : 0;
      }
    },

    off : function () {
      $(this.scope).off('.fndtn.magellan');
    }
  };
}(Foundation.zj, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  var noop = function() {};

  var Orbit = function(el, settings) {
    // Don't reinitialize plugin
    if (el.hasClass(settings.slides_container_class)) {
      return this;
    }

    var self = this,
        container,
        slides_container = el,
        number_container,
        bullets_container,
        timer_container,
        idx = 0,
        animate,
        timer,
        locked = false,
        adjust_height_after = false;

    slides_container.children().first().addClass(settings.active_slide_class);

    self.update_slide_number = function(index) {
      if (settings.slide_number) {
        number_container.find('span:first').text(parseInt(index)+1);
        number_container.find('span:last').text(slides_container.children().length);
      }
      if (settings.bullets) {
        bullets_container.children().removeClass(settings.bullets_active_class);
        $(bullets_container.children().get(index)).addClass(settings.bullets_active_class);
      }
    };

    self.update_active_link = function(index) {
      var link = $('a[data-orbit-link="'+slides_container.children().eq(index).attr('data-orbit-slide')+'"]');
      link.parents('ul').find('[data-orbit-link]').removeClass(settings.bullets_active_class);
      link.addClass(settings.bullets_active_class);
    };

    self.build_markup = function() {
      slides_container.wrap('<div class="'+settings.container_class+'"></div>');
      container = slides_container.parent();
      slides_container.addClass(settings.slides_container_class);

      if (settings.navigation_arrows) {
        container.append($('<a href="#"><span></span></a>').addClass(settings.prev_class));
        container.append($('<a href="#"><span></span></a>').addClass(settings.next_class));
      }

      if (settings.timer) {
        timer_container = $('<div>').addClass(settings.timer_container_class);
        timer_container.append('<span>');
        timer_container.append($('<div>').addClass(settings.timer_progress_class));
        timer_container.addClass(settings.timer_paused_class);
        container.append(timer_container);
      }

      if (settings.slide_number) {
        number_container = $('<div>').addClass(settings.slide_number_class);
        number_container.append('<span></span> ' + settings.slide_number_text + ' <span></span>');
        container.append(number_container);
      }

      if (settings.bullets) {
        bullets_container = $('<ol>').addClass(settings.bullets_container_class);
        container.append(bullets_container);
        slides_container.children().each(function(idx, el) {
          var bullet = $('<li>').attr('data-orbit-slide', idx);
          bullets_container.append(bullet);
        });
      }

      if (settings.stack_on_small) {
        container.addClass(settings.stack_on_small_class);
      }

      self.update_slide_number(0);
      self.update_active_link(0);
    };

    self._goto = function(next_idx, start_timer) {
      // if (locked) {return false;}
      if (next_idx === idx) {return false;}
      if (typeof timer === 'object') {timer.restart();}
      var slides = slides_container.children();

      var dir = 'next';
      locked = true;
      if (next_idx < idx) {dir = 'prev';}
      if (next_idx >= slides.length) {next_idx = 0;}
      else if (next_idx < 0) {next_idx = slides.length - 1;}

      var current = $(slides.get(idx));
      var next = $(slides.get(next_idx));

      current.css('zIndex', 2);
      current.removeClass(settings.active_slide_class);
      next.css('zIndex', 4).addClass(settings.active_slide_class);

      slides_container.trigger('orbit:before-slide-change');
      settings.before_slide_change();
      self.update_active_link(next_idx);

      var callback = function() {
        var unlock = function() {
          idx = next_idx;
          locked = false;
          if (start_timer === true) {timer = self.create_timer(); timer.start();}
          self.update_slide_number(idx);
          slides_container.trigger('orbit:after-slide-change',[{slide_number: idx, total_slides: slides.length}]);
          settings.after_slide_change(idx, slides.length);
        };
        if (slides_container.height() != next.height() && settings.variable_height) {
          slides_container.animate({'height': next.height()}, 250, 'linear', unlock);
        } else {
          unlock();
        }
      };

      if (slides.length === 1) {callback(); return false;}

      var start_animation = function() {
        if (dir === 'next') {animate.next(current, next, callback);}
        if (dir === 'prev') {animate.prev(current, next, callback);}
      };

      if (next.height() > slides_container.height() && settings.variable_height) {
        slides_container.animate({'height': next.height()}, 250, 'linear', start_animation);
      } else {
        start_animation();
      }
    };

    self.next = function(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._goto(idx + 1);
    };

    self.prev = function(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._goto(idx - 1);
    };

    self.link_custom = function(e) {
      e.preventDefault();
      var link = $(this).attr('data-orbit-link');
      if ((typeof link === 'string') && (link = $.trim(link)) != "") {
        var slide = container.find('[data-orbit-slide='+link+']');
        if (slide.index() != -1) {self._goto(slide.index());}
      }
    };

    self.link_bullet = function(e) {
      var index = $(this).attr('data-orbit-slide');
      if ((typeof index === 'string') && (index = $.trim(index)) != "") {
        self._goto(parseInt(index));
      }
    }

    self.timer_callback = function() {
      self._goto(idx + 1, true);
    }

    self.compute_dimensions = function() {
      var current = $(slides_container.children().get(idx));
      var h = current.height();
      if (!settings.variable_height) {
        slides_container.children().each(function(){
          if ($(this).height() > h) { h = $(this).height(); }
        });
      }
      slides_container.height(h);
    };

    self.create_timer = function() {
      var t = new Timer(
        container.find('.'+settings.timer_container_class),
        settings,
        self.timer_callback
      );
      return t;
    };

    self.stop_timer = function() {
      if (typeof timer === 'object') timer.stop();
    };

    self.toggle_timer = function() {
      var t = container.find('.'+settings.timer_container_class);
      if (t.hasClass(settings.timer_paused_class)) {
        if (typeof timer === 'undefined') {timer = self.create_timer();}
        timer.start();
      }
      else {
        if (typeof timer === 'object') {timer.stop();}
      }
    };

    self.init = function() {
      self.build_markup();
      if (settings.timer) {timer = self.create_timer(); timer.start();}
      	animate = new FadeAnimation(settings, slides_container);
      if (settings.animation === 'slide')
        animate = new SlideAnimation(settings, slides_container);
      if (settings.animation === 'push')
          animate = new PushAnimation(settings, slides_container);
      container.on('click', '.'+settings.next_class, self.next);
      container.on('click', '.'+settings.prev_class, self.prev);
      container.on('click', '[data-orbit-slide]', self.link_bullet);
      container.on('click', self.toggle_timer);
      if (settings.swipe) {
        container.on('touchstart.fndtn.orbit', function(e) {
          if (!e.touches) {e = e.originalEvent;}
          var data = {
            start_page_x: e.touches[0].pageX,
            start_page_y: e.touches[0].pageY,
            start_time: (new Date()).getTime(),
            delta_x: 0,
            is_scrolling: undefined
          };
          container.data('swipe-transition', data);
          e.stopPropagation();
        })
        .on('touchmove.fndtn.orbit', function(e) {
          if (!e.touches) { e = e.originalEvent; }
          // Ignore pinch/zoom events
          if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

          var data = container.data('swipe-transition');
          if (typeof data === 'undefined') {data = {};}

          data.delta_x = e.touches[0].pageX - data.start_page_x;

          if ( typeof data.is_scrolling === 'undefined') {
            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
          }

          if (!data.is_scrolling && !data.active) {
            e.preventDefault();
            var direction = (data.delta_x < 0) ? (idx+1) : (idx-1);
            data.active = true;
            self._goto(direction);
          }
        })
        .on('touchend.fndtn.orbit', function(e) {
          container.data('swipe-transition', {});
          e.stopPropagation();
        })
      }
      container.on('mouseenter.fndtn.orbit', function(e) {
        if (settings.timer && settings.pause_on_hover) {
          self.stop_timer();
        }
      })
      .on('mouseleave.fndtn.orbit', function(e) {
        if (settings.timer && settings.resume_on_mouseout) {
          timer.start();
        }
      });

      $(document).on('click', '[data-orbit-link]', self.link_custom);
      $(window).on('resize', self.compute_dimensions);
      $(window).on('load', self.compute_dimensions);
      $(window).on('load', function(){
        container.prev('.preloader').css('display', 'none');
      });
      slides_container.trigger('orbit:ready');
    };

    self.init();
  };

  var Timer = function(el, settings, callback) {
    var self = this,
        duration = settings.timer_speed,
        progress = el.find('.'+settings.timer_progress_class),
        start,
        timeout,
        left = -1;

    this.update_progress = function(w) {
      var new_progress = progress.clone();
      new_progress.attr('style', '');
      new_progress.css('width', w+'%');
      progress.replaceWith(new_progress);
      progress = new_progress;
    };

    this.restart = function() {
      clearTimeout(timeout);
      el.addClass(settings.timer_paused_class);
      left = -1;
      self.update_progress(0);
    };

    this.start = function() {
      if (!el.hasClass(settings.timer_paused_class)) {return true;}
      left = (left === -1) ? duration : left;
      el.removeClass(settings.timer_paused_class);
      start = new Date().getTime();
      progress.animate({'width': '100%'}, left, 'linear');
      timeout = setTimeout(function() {
        self.restart();
        callback();
      }, left);
      el.trigger('orbit:timer-started')
    };

    this.stop = function() {
      if (el.hasClass(settings.timer_paused_class)) {return true;}
      clearTimeout(timeout);
      el.addClass(settings.timer_paused_class);
      var end = new Date().getTime();
      left = left - (end - start);
      var w = 100 - ((left / duration) * 100);
      self.update_progress(w);
      el.trigger('orbit:timer-stopped');
    };
  };

  var SlideAnimation = function(settings, container) {
    var duration = settings.animation_speed;
    var is_rtl = ($('html[dir=rtl]').length === 1);
    var margin = is_rtl ? 'marginRight' : 'marginLeft';
    var animMargin = {};
    animMargin[margin] = '0%';

    this.next = function(current, next, callback) {
      next.animate(animMargin, duration, 'linear', function() {
        current.css(margin, '100%');
        callback();
      });
    };

    this.prev = function(current, prev, callback) {
      prev.css(margin, '-100%');
      prev.animate(animMargin, duration, 'linear', function() {
        current.css(margin, '100%');
        callback();
      });
    };
  };

  var FadeAnimation = function(settings, container) {
    var duration = settings.animation_speed;
    var is_rtl = ($('html[dir=rtl]').length === 1);
    var margin = is_rtl ? 'marginRight' : 'marginLeft';

    this.next = function(current, next, callback) {
      next.css({'margin':'0%', 'opacity':'0.01'});
      next.animate({'opacity':'1'}, duration, 'linear', function() {
        current.css('margin', '100%');
        callback();
      });
    };

    this.prev = function(current, prev, callback) {
      prev.css({'margin':'0%', 'opacity':'0.01'});
      prev.animate({'opacity':'1'}, duration, 'linear', function() {
        current.css('margin', '100%');
        callback();
      });
    };
  };

	// created an animation that "pushes" the previous slide out instead of overlapping like "slide"
	var PushAnimation = function(settings, container) {
		var duration = settings.animation_speed;
		var is_rtl = ($('html[dir=rtl]').length === 1);
		var margin = is_rtl ? 'marginRight' : 'marginLeft';
		var animMargin = {};
		var animMarginNext = {};
		var animMarginPrev = {};
		animMarginPrev[margin] = '100%';
		animMargin[margin] = '0%';
		animMarginNext[margin] = '-100%';

		this.next = function(current, next, callback) {
			current.animate(animMarginNext, duration, 'linear');
			next.animate(animMargin, duration, 'linear', function() {
				current.css(margin, '100%');
				callback();
			});
		};

		this.prev = function(current, prev, callback) {
			current.animate(animMarginPrev, duration, 'linear');
			prev.css(margin, '-100%');
			prev.animate(animMargin, duration, 'linear', function() {
				current.css(margin, '100%');
				callback();
			});
		};
	};

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.orbit = {
    name: 'orbit',

    version: '4.3.2',

    settings: {
      animation: 'push',
      timer_speed: 3500,
      pause_on_hover: true,
      resume_on_mouseout: true,
      animation_speed: 500,
      stack_on_small: false,
      navigation_arrows: true,
      slide_number: false,
      slide_number_text: 'of',
      container_class: 'orbit-container',
      stack_on_small_class: 'orbit-stack-on-small',
      next_class: 'orbit-next',
      prev_class: 'orbit-prev',
      timer_container_class: 'orbit-timer',
      timer_paused_class: 'paused',
      timer_progress_class: 'orbit-progress',
      slides_container_class: 'orbit-slides-container',
      bullets_container_class: 'orbit-bullets',
      bullets_active_class: 'active',
      slide_number_class: 'orbit-slide-number',
      caption_class: 'orbit-caption',
      active_slide_class: 'active',
      orbit_transition_class: 'orbit-transitioning',
      bullets: false,
      timer: true,
      variable_height: false,
      swipe: true,
      before_slide_change: noop,
      after_slide_change: noop
    },

    init: function (scope, method, options) {
      var self = this;
      Foundation.inherit(self, 'data_options');

      if (typeof method === 'object') {
        $.extend(true, self.settings, method);
      }

      if ($(scope).is('[data-orbit]')) {
        var $el = $(scope);
        var opts = self.data_options($el);
        new Orbit($el, $.extend({},self.settings, opts));
      }

      $('[data-orbit]', scope).each(function(idx, el) {
        var $el = $(el);
        var opts = self.data_options($el);
        new Orbit($el, $.extend({},self.settings, opts));
      });
    }
  };


}(Foundation.zj, this, this.document));
/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
'use strict';

Foundation.libs.reveal = {
	name: 'reveal',

	version : '4.2.2',

	locked : false,

	settings : {
	animation: 'fadeAndPop',
	animationSpeed: 250,
	closeOnBackgroundClick: true,
	closeOnEsc: true,
	dismissModalClass: 'close-reveal-modal',
	bgClass: 'reveal-modal-bg',
	open: function(){},
	opened: function(){
		// issue where original modal target div is copied inside modal when contents are loaded via ajax
		$('.reveal-modal .reveal-modal').remove();
		// dynamically add close 'x'
		$('.reveal-modal').append('<a class="close-reveal-modal">&#215;</a>');
		$('.reveal-modal.ajax-loader .close-reveal-modal').remove();

	},
	close: function(){},
	closed: function(){},
	bg : $('.reveal-modal-bg'),
	css : {
		open : {
		'opacity': 0,
		'visibility': 'visible',
		'display' : 'block'
		},
		close : {
		'opacity': 1,
		'visibility': 'hidden',
		'display': 'none'
		}
	}
	},

	init : function (scope, method, options) {
	Foundation.inherit(this, 'data_options delay');

	if (typeof method === 'object') {
		$.extend(true, this.settings, method);
	} else if (typeof options !== 'undefined') {
		$.extend(true, this.settings, options);
	}

	if (typeof method !== 'string') {
		this.events();

		return this.settings.init;
	} else {
		return this[method].call(this, options);
	}
	},

	events : function () {
	var self = this;

	$(this.scope)
		.off('.fndtn.reveal')
		.on('click.fndtn.reveal', '[data-reveal-id]', function (e) {
		e.preventDefault();

		if (!self.locked) {
			var element = $(this),
				ajax = element.data('reveal-ajax');

			self.locked = true;

			if (typeof ajax === 'undefined') {
			self.open.call(self, element);
			} else {
			var url = ajax === true ? element.attr('href') : ajax;

			self.open.call(self, element, {url: url});
			}
		}
		})
		.on('click.fndtn.reveal', this.close_targets(), function (e) {
		e.preventDefault();
		if (!self.locked) {
			var settings = $.extend({}, self.settings, self.data_options($('.reveal-modal.open')));
			if ($(e.target)[0] === $('.' + settings.bgClass)[0] && !settings.closeOnBackgroundClick) {
			return;
			}

			self.locked = true;
			self.close.call(self, $(this).closest('.reveal-modal'));
		}
		})
		.on('open.fndtn.reveal', '.reveal-modal', this.settings.open)
		.on('opened.fndtn.reveal', '.reveal-modal', this.settings.opened)
		.on('opened.fndtn.reveal', '.reveal-modal', this.open_video)
		.on('close.fndtn.reveal', '.reveal-modal', this.settings.close)
		.on('closed.fndtn.reveal', '.reveal-modal', this.settings.closed)
		.on('closed.fndtn.reveal', '.reveal-modal', this.close_video);

	$( 'body' ).bind( 'keyup.reveal', function ( event ) {
		var open_modal = $('.reveal-modal.open'),
			settings = $.extend({}, self.settings, self.data_options(open_modal));
		if ( event.which === 27  && settings.closeOnEsc) { // 27 is the keycode for the Escape key
		open_modal.foundation('reveal', 'close');
		}
	});

	return true;
	},

	open : function (target, ajax_settings) {
	if (target) {
		if (typeof target.selector !== 'undefined') {
		var modal = $('#' + target.data('reveal-id'));
		} else {
		var modal = $(this.scope);

		ajax_settings = target;
		}
	} else {
		var modal = $(this.scope);
	}

	if (!modal.hasClass('open')) {
		var open_modal = $('.reveal-modal.open');

		if (typeof modal.data('css-top') === 'undefined') {
		modal.data('css-top', parseInt(modal.css('top'), 10))
			.data('offset', this.cache_offset(modal));
		}

		modal.trigger('open');

		if (open_modal.length < 1) {
		this.toggle_bg(modal);
		}

		if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
		this.hide(open_modal, this.settings.css.close);
		this.show(modal, this.settings.css.open);
		} else {
		var self = this,
			old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;

		$.extend(ajax_settings, {
			success: function (data, textStatus, jqXHR) {
			if ( $.isFunction(old_success) ) {
				old_success(data, textStatus, jqXHR);
			}

			modal.html(data);
			$(modal).foundation('section', 'reflow');

			self.hide(open_modal, self.settings.css.close);
			self.show(modal, self.settings.css.open);
			}
		});

		$.ajax(ajax_settings);
		}
	}
	},

	close : function (modal) {

	var modal = modal && modal.length ? modal : $(this.scope),
		open_modals = $('.reveal-modal.open');

	if (open_modals.length > 0) {
		this.locked = true;
		modal.trigger('close');
		this.toggle_bg(modal);
		this.hide(open_modals, this.settings.css.close);
	}
	},

	close_targets : function () {
	var base = '.' + this.settings.dismissModalClass;

	if (this.settings.closeOnBackgroundClick) {
		return base + ', .' + this.settings.bgClass;
	}

	return base;
	},

	toggle_bg : function (modal) {
	if ($('.reveal-modal-bg').length === 0) {
		this.settings.bg = $('<div />', {'class': this.settings.bgClass})
		.appendTo('body');
	}

	if (this.settings.bg.filter(':visible').length > 0) {
		this.hide(this.settings.bg);
	} else {
		this.show(this.settings.bg);
	}
	},

	show : function (el, css) {
	// is modal
	if (css) {
		if (/pop/i.test(this.settings.animation)) {
		css.top = $(window).scrollTop() - el.data('offset') + 'px';
		var end_css = {
			top: $(window).scrollTop() + el.data('css-top') + 'px',
			opacity: 1
		};

		return this.delay(function () {
			return el
			.css(css)
			.animate(end_css, this.settings.animationSpeed, 'linear', function () {
				this.locked = false;
				el.trigger('opened');
			}.bind(this))
			.addClass('open');
		}.bind(this), this.settings.animationSpeed / 2);
		}

		if (/fade/i.test(this.settings.animation)) {
		var end_css = {opacity: 1};

		return this.delay(function () {
			return el
			.css(css)
			.animate(end_css, this.settings.animationSpeed, 'linear', function () {
				this.locked = false;
				el.trigger('opened');
			}.bind(this))
			.addClass('open');
		}.bind(this), this.settings.animationSpeed / 2);
		}

		return el.css(css).show().css({opacity: 1}).addClass('open').trigger('opened');
	}

	// should we animate the background?
	if (/fade/i.test(this.settings.animation)) {
		return el.fadeIn(this.settings.animationSpeed / 2);
	}

	return el.show();
	},

	hide : function (el, css) {
	// is modal
	if (css) {
		if (/pop/i.test(this.settings.animation)) {
		var end_css = {
			top: - $(window).scrollTop() - el.data('offset') + 'px',
			opacity: 0
		};

		return this.delay(function () {
			return el
			.animate(end_css, this.settings.animationSpeed, 'linear', function () {
				this.locked = false;
				el.css(css).trigger('closed');
			}.bind(this))
			.removeClass('open');
		}.bind(this), this.settings.animationSpeed / 2);
		}

		if (/fade/i.test(this.settings.animation)) {
		var end_css = {opacity: 0};

		return this.delay(function () {
			return el
			.animate(end_css, this.settings.animationSpeed, 'linear', function () {
				this.locked = false;
				el.css(css).trigger('closed');
			}.bind(this))
			.removeClass('open');
		}.bind(this), this.settings.animationSpeed / 2);
		}

		return el.hide().css(css).removeClass('open').trigger('closed');
	}

	// should we animate the background?
	if (/fade/i.test(this.settings.animation)) {
		return el.fadeOut(this.settings.animationSpeed / 2);
	}

	return el.hide();
	},

	close_video : function (e) {
	var video = $(this).find('.flex-video'),
		iframe = video.find('iframe');

	if (iframe.length > 0) {
		iframe.attr('data-src', iframe[0].src);
		iframe.attr('src', 'about:blank');
		video.hide();
	}
	},

	open_video : function (e) {
	var video = $(this).find('.flex-video'),
		iframe = video.find('iframe');

	if (iframe.length > 0) {
		var data_src = iframe.attr('data-src');
		if (typeof data_src === 'string') {
		iframe[0].src = iframe.attr('data-src');
		} else {
		var src = iframe[0].src;
		iframe[0].src = undefined;
		iframe[0].src = src;
		}
		video.show();
	}
	},

	cache_offset : function (modal) {
	var offset = modal.show().height() + parseInt(modal.css('top'), 10);

	modal.hide();

	return offset;
	},

	off : function () {
	$(this.scope).off('.fndtn.reveal');
	},

	reflow : function () {}
};
}(Foundation.zj, this, this.document));
/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.section = {
    name: 'section',

    version : '4.1.3',

    settings : {
      deep_linking: false,
      one_up: true,
      section_selector : '[data-section]',
      region_selector : 'section, .section, [data-section-region]',
      title_selector : '.title, [data-section-title]',
      active_region_selector : 'section.active, .section.active, .active[data-section-region]',
      content_selector : '.content, [data-section-content]',
      nav_selector : '[data-section="vertical-nav"], [data-section="horizontal-nav"]',
      callback: function (){}
    },

    init : function (scope, method, options) {
      var self = this;
      Foundation.inherit(this, 'throttle data_options position_right offset_right');

      if (typeof method === 'object') {
        $.extend(true, self.settings, method);
      }

      if (typeof method != 'string') {
        this.set_active_from_hash();
        this.events();

        return true;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(this.scope)
        .on('click.fndtn.section', '[data-section] .title, [data-section] [data-section-title]', function (e) {
          var $this = $(this),
              section = $this.closest(self.settings.section_selector);

          self.toggle_active.call(this, e, self);
          self.reflow();
        });

      $(window)
        .on('resize.fndtn.section', self.throttle(function () {
          self.resize.call(this);
        }, 30))
        .on('hashchange', function () {
          if (!self.settings.toggled){
            self.set_active_from_hash();
            $(this).trigger('resize');
          }
        }).trigger('resize');

      $(document)
        .on('click.fndtn.section', function (e) {
          if ($(e.target).closest(self.settings.title_selector).length < 1) {
            $(self.settings.nav_selector)
              .children(self.settings.region_selector)
              .removeClass('active')
              .attr('style', '');
          }
        });

    },

    toggle_active : function (e, self) {
      var $this = $(this),
          self = Foundation.libs.section,
          region = $this.closest(self.settings.region_selector),
          content = $this.siblings(self.settings.content_selector),
          parent = region.parent(),
          settings = $.extend({}, self.settings, self.data_options(parent)),
          prev_active_section = parent
            .children(self.settings.active_region_selector);

      self.settings.toggled = true;

      if (!settings.deep_linking && content.length > 0) {
        e.preventDefault();
      }

      if (region.hasClass('active')) {
        // this is causing the style flash.
        if (self.small(parent)
          || self.is_vertical_nav(parent)
          || self.is_horizontal_nav(parent)
          || self.is_accordion(parent)) {
            if (prev_active_section[0] !== region[0]
              || (prev_active_section[0] === region[0] && !settings.one_up)) {
              region
                .removeClass('active')
                .attr('style', '');
            }
        }
      } else {
        var prev_active_section = parent
              .children(self.settings.active_region_selector),
            title_height = self.outerHeight(region
              .children(self.settings.title_selector));

        if (self.small(parent) || settings.one_up) {

          if (self.small(parent)) {
            prev_active_section.attr('style', '');
          } else {
            prev_active_section.attr('style',
              'visibility: hidden; padding-top: '+title_height+'px;');
          }
        }

        if (self.small(parent)) {
          region.attr('style', '');
        } else {
          region.css('padding-top', title_height);
        }

        region.addClass('active');

        if (prev_active_section.length > 0) {
          prev_active_section
            .removeClass('active')
            .attr('style', '');
        }

        // Toggle the content display attribute. This is done to
        // ensure accurate outerWidth measurements that account for
        // the scrollbar.
        if (self.is_vertical_tabs(parent)) {
          content.css('display', 'block');

          if (prev_active_section !== null) {
            prev_active_section
              .children(self.settings.content_selector)
              .css('display', 'none');
          }
        }
      }

      setTimeout(function () {
        self.settings.toggled = false;
      }, 300);

      settings.callback();
    },

    resize : function () {
      var self = Foundation.libs.section,
          sections = $(self.settings.section_selector);

      sections.each(function() {
        var $this = $(this),
            active_section = $this
              .children(self.settings.active_region_selector),
            settings = $.extend({}, self.settings, self.data_options($this));

        if (active_section.length > 1) {
          active_section
            .not(':first')
            .removeClass('active')
            .attr('style', '');
        } else if (active_section.length < 1
          && !self.is_vertical_nav($this)
          && !self.is_horizontal_nav($this)
          && !self.is_accordion($this)) {

          var first = $this.children(self.settings.region_selector).first();

          if (settings.one_up || !self.small($this)) {
            first.addClass('active');
          }

          if (self.small($this)) {
            first.attr('style', '');
          } else {
            first.css('padding-top', self.outerHeight(first
              .children(self.settings.title_selector)));
          }
        }

        if (self.small($this)) {
          active_section.attr('style', '');
        } else {
          active_section.css('padding-top', self.outerHeight(active_section
            .children(self.settings.title_selector)));
        }

        self.position_titles($this);

        if ( (self.is_horizontal_nav($this) && !self.small($this))
          || self.is_vertical_tabs($this)) {
          self.position_content($this);
        } else {
          self.position_content($this, false);
        }
      });
    },

    is_vertical_nav : function (el) {
      return /vertical-nav/i.test(el.data('section'));
    },

    is_horizontal_nav : function (el) {
      return /horizontal-nav/i.test(el.data('section'));
    },

    is_accordion : function (el) {
      return /accordion/i.test(el.data('section'));
    },

    is_horizontal_tabs : function (el) {
      return /^tabs$/i.test(el.data('section'));
    },

    is_vertical_tabs : function (el) {
      return /vertical-tabs/i.test(el.data('section'));
    },

    set_active_from_hash : function () {
      var hash = window.location.hash.substring(1),
          sections = $('[data-section]'),
          self = this;

      sections.each(function () {
        var section = $(this),
            settings = $.extend({}, self.settings, self.data_options(section));

        if (hash.length > 0 && settings.deep_linking) {
          var regions = section
            .children(self.settings.region_selector)
            .attr('style', '')
            .removeClass('active');
          regions
            .map(function () {
              return $(this).children('.content[data-slug="' + hash + '"], [data-section-content][data-slug="' + hash + '"]');
            })
            .parent()
            .addClass('active');
        }
      });
    },

    position_titles : function (section, off) {
      var self = this,
          titles = section
            .children(this.settings.region_selector)
            .map(function () {
              return $(this).children(self.settings.title_selector);
            }),
          previous_width = 0,
          previous_height = 0,
          self = this;

      if (typeof off === 'boolean') {
        titles.attr('style', '');

      } else {
        titles.each(function () {
          if (self.is_vertical_tabs(section)) {
            $(this).css('top', previous_height);
            previous_height += self.outerHeight($(this));
          } else {
            if (!self.rtl) {
              $(this).css('left', previous_width);
            } else {
              $(this).css('right', previous_width);
            }
            previous_width += self.outerWidth($(this));
          }
        });
      }
    },

    position_content : function (section, off) {
      var self = this,
          regions = section.children(self.settings.region_selector),
          titles = regions
            .map(function () {
              return $(this).children(self.settings.title_selector);
            }),
          content = regions
            .map(function () {
              return $(this).children(self.settings.content_selector);
            });

      if (typeof off === 'boolean') {
        content.attr('style', '');
        section.attr('style', '');
      } else {
        if (self.is_vertical_tabs(section)
            && !self.small(section)) {
          var content_min_height = 0,
              content_min_width = Number.MAX_VALUE,
              title_width = null;

          regions.each(function () {
            var region = $(this),
                title = region.children(self.settings.title_selector),
                content = region.children(self.settings.content_selector),
                content_width = 0;

            title_width = self.outerWidth(title);
            content_width = self.outerWidth(section) - title_width;
            if (content_width < content_min_width) {
              content_min_width = content_width;
            }

            // Increment the minimum height of the content region
            // to align with the height of the titles.
            content_min_height += self.outerHeight(title);

            // Set all of the inactive tabs to 'display: none'
            // The CSS sets all of the tabs as 'display: block'
            // in order to account for scrollbars when measuring the width
            // of the content regions.
            if (!$(this).hasClass('active')) {
              content.css('display', 'none');
            }
          });

          regions.each(function () {
            var content = $(this).children(self.settings.content_selector);
            content.css('minHeight', content_min_height);

            // Remove 2 pixels to account for the right-shift in the CSS
            content.css('maxWidth', content_min_width - 2);
          });

          // Adjust the outer section container width to match
          // the width of the title and content
          section.css('maxWidth', title_width + content_min_width);
        } else {
          regions.each(function () {
            var region = $(this),
                title = region.children(self.settings.title_selector),
                content = region.children(self.settings.content_selector);
            if (!self.rtl) {
              content
                .css({left: title.position().left - 1,
                  top: self.outerHeight(title) - 2});
            } else {
              content
                .css({right: self.position_right(title) + 1,
                  top: self.outerHeight(title) - 2});
            }
          });

          // temporary work around for Zepto outerheight calculation issues.
          if (typeof Zepto === 'function') {
            section.height(this.outerHeight(titles.first()));
          } else {
            section.height(this.outerHeight(titles.first()) - 2);
          }
        }
      }
    },

    position_right : function (el) {
      var self = this,
          section = el.closest(this.settings.section_selector),
          regions = section.children(this.settings.region_selector),
          section_width = el.closest(this.settings.section_selector).width(),
          offset = regions
            .map(function () {
              return $(this).children(self.settings.title_selector);
            }).length;
      return (section_width - el.position().left - el.width() * (el.index() + 1) - offset);
    },

    reflow : function (scope) {
      var scope = scope || document;
      $(this.settings.section_selector, scope).trigger('resize');
    },

    small : function (el) {
      var settings = $.extend({}, this.settings, this.data_options(el));
      if (this.is_horizontal_tabs(el)) {
        return false;
      }
      if (el && this.is_accordion(el)) {
        return true;
      }
      if ($('html').hasClass('lt-ie9')) {
        return true;
      }
      if ($('html').hasClass('ie8compat')) {
        return true;
      }
      return $(this.scope).width() < 768;
    },

    off : function () {
      $(this.scope).off('.fndtn.section');
      $(window).off('.fndtn.section');
      $(document).off('.fndtn.section')
    }
  };
}(Foundation.zj, this, this.document));
/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

if($("html").hasClass("no-touch")) {
  
	  Foundation.libs.tooltips = {
	    name: 'tooltips',
	
	    version : '4.1.3',
	
	    settings : {
	      selector : '.has-tip',
	      additionalInheritableClasses : [],
	      tooltipClass : '.tooltip',
	      appendTo: 'body',
	      tipTemplate : function (selector, content) {
	        return '<span data-selector="' + selector + '" class="' 
	          + Foundation.libs.tooltips.settings.tooltipClass.substring(1) 
	          + '">' + content + '<span class="nub"></span></span>';
	      }
	    },
	
	    cache : {},
	
	    init : function (scope, method, options) {
	      var self = this;
	      this.scope = scope || this.scope;
	
	      if (typeof method === 'object') {
	        $.extend(true, this.settings, method);
	      }
	
	      if (typeof method != 'string') {
	        if (Modernizr.touch) {
	          $(this.scope)
	            .on('click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip', 
	              '[data-tooltip]', function (e) {
	              e.preventDefault();
	              $(self.settings.tooltipClass).hide();
	              self.showOrCreateTip($(this));
	            })
	            .on('click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip', 
	              this.settings.tooltipClass, function (e) {
	              e.preventDefault();
	              $(this).fadeOut(150);
	            });
	        } else {
	          $(this.scope)
	            .on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip', 
	              '[data-tooltip]', function (e) {
	              var $this = $(this);
	
	              if (e.type === 'mouseover' || e.type === 'mouseenter') {
	                self.showOrCreateTip($this);
	              } else if (e.type === 'mouseout' || e.type === 'mouseleave') {
	                self.hide($this);
	              }
	            });
	        }
	
	        // $(this.scope).data('fndtn-tooltips', true);
	      } else {
	        return this[method].call(this, options);
	      }
	
	    },
	
	    showOrCreateTip : function ($target) {
	      var $tip = this.getTip($target);
	
	      if ($tip && $tip.length > 0) {
	        return this.show($target);
	      }
	
	      return this.create($target);
	    },
	
	    getTip : function ($target) {
	      var selector = this.selector($target),
	          tip = null;
	
	      if (selector) {
	        tip = $('span[data-selector=' + selector + ']' + this.settings.tooltipClass);
	      }
	
	      return (typeof tip === 'object') ? tip : false;
	    },
	
	    selector : function ($target) {
	      var id = $target.attr('id'),
	          dataSelector = $target.attr('data-tooltip') || $target.attr('data-selector');
	
	      if ((id && id.length < 1 || !id) && typeof dataSelector != 'string') {
	        dataSelector = 'tooltip' + Math.random().toString(36).substring(7);
	        $target.attr('data-selector', dataSelector);
	      }
	
	      return (id && id.length > 0) ? id : dataSelector;
	    },
	
	    create : function ($target) {
	      var $tip = $(this.settings.tipTemplate(this.selector($target), $('<div></div>').html($target.attr('title')).html())),
	          classes = this.inheritable_classes($target);
	
	      $tip.addClass(classes).appendTo(this.settings.appendTo);
	      if (Modernizr.touch) {
	        $tip.append('<span class="tap-to-close">tap to close </span>');
	      }
	      $target.removeAttr('title').attr('title','');
	      this.show($target);
	    },
	
	    reposition : function (target, tip, classes) {
	      var width, nub, nubHeight, nubWidth, column, objPos;
	
	      tip.css('visibility', 'hidden').show();
	
	      width = target.data('width');
	      nub = tip.children('.nub');
	      nubHeight = this.outerHeight(nub);
	      nubWidth = this.outerHeight(nub);
	
	      objPos = function (obj, top, right, bottom, left, width) {
	        return obj.css({
	          'top' : (top) ? top : 'auto',
	          'bottom' : (bottom) ? bottom : 'auto',
	          'left' : (left) ? left : 'auto',
	          'right' : (right) ? right : 'auto',
	          'width' : (width) ? width : 'auto'
	        }).end();
	      };
	
	      objPos(tip, (target.offset().top + this.outerHeight(target) + 10), 'auto', 'auto', target.offset().left, width);
	
	      if ($(window).width() < 767) {
	        objPos(tip, (target.offset().top + this.outerHeight(target) + 10), 'auto', 'auto', 12.5, $(this.scope).width());
	        tip.addClass('tip-override');
	        objPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
	      } else {
	        var left = target.offset().left;
	        if (Foundation.rtl) {
	          left = target.offset().left + target.offset().width - this.outerWidth(tip);
	        }
	        objPos(tip, (target.offset().top + this.outerHeight(target) + 10), 'auto', 'auto', left, width);
	        tip.removeClass('tip-override');
	        if (classes && classes.indexOf('tip-top') > -1) {
	          objPos(tip, (target.offset().top - this.outerHeight(tip)), 'auto', 'auto', left, width)
	            .removeClass('tip-override');
	        } else if (classes && classes.indexOf('tip-left') > -1) {
	          objPos(tip, (target.offset().top + (this.outerHeight(target) / 2) - nubHeight*2.5), 'auto', 'auto', (target.offset().left - this.outerWidth(tip) - nubHeight), width)
	            .removeClass('tip-override');
	        } else if (classes && classes.indexOf('tip-right') > -1) {
	          objPos(tip, (target.offset().top + (this.outerHeight(target) / 2) - nubHeight*2.5), 'auto', 'auto', (target.offset().left + this.outerWidth(target) + nubHeight), width)
	            .removeClass('tip-override');
	        }
	      }
	
	      tip.css('visibility', 'visible').hide();
	    },
	
	    inheritable_classes : function (target) {
	      var inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'noradius'].concat(this.settings.additionalInheritableClasses),
	          classes = target.attr('class'),
	          filtered = classes ? $.map(classes.split(' '), function (el, i) {
	            if ($.inArray(el, inheritables) !== -1) {
	              return el;
	            }
	          }).join(' ') : '';
	
	      return $.trim(filtered);
	    },
	
	    show : function ($target) {
	      var $tip = this.getTip($target);
	
	      this.reposition($target, $tip, $target.attr('class'));
	      $tip.fadeIn(150);
	    },
	
	    hide : function ($target) {
	      var $tip = this.getTip($target);
	
	      $tip.fadeOut(150);
	    },
	
	    // deprecate reload
	    reload : function () {
	      var $self = $(this);
	
	      return ($self.data('fndtn-tooltips')) ? $self.foundationTooltips('destroy').foundationTooltips('init') : $self.foundationTooltips('init');
	    },
	
	    off : function () {
	      $(this.scope).off('.fndtn.tooltip');
	      $(this.settings.tooltipClass).each(function (i) {
	        $('[data-tooltip]').get(i).attr('title', $(this).text());
	      }).remove();
	    }
	  };
}
	  
}(Foundation.zj, this, this.document));
/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.topbar = {
    name : 'topbar',

    version : '4.1.2',

    settings : {
      index : 0,
      stickyClass : 'sticky',
      custom_back_text: true,
      back_text: 'Back',
      init : false
    },

    init : function (section, method, options) {
      var self = this;

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {

        $('.top-bar').each(function () {
          self.settings.$w = $(window);
          self.settings.$topbar = $(this);
          self.settings.$section = self.settings.$topbar.find('section');
          self.settings.$titlebar = self.settings.$topbar.children('ul').first();


          self.settings.$topbar.data('index', 0);

          var breakpoint = $("<div class='top-bar-js-breakpoint'/>").insertAfter(self.settings.$topbar);
          self.settings.breakPoint = breakpoint.width();
          breakpoint.remove();

          self.assemble();

          if (self.settings.$topbar.parent().hasClass('fixed')) {
            $('body').css('padding-top', self.outerHeight(self.settings.$topbar));
          }
        });

        if (!self.settings.init) {
          this.events();
        }

        return this.settings.init;
      } else {
        // fire method
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;
      var offst = this.outerHeight($('.top-bar'));
      $(this.scope)
        .on('click.fndtn.topbar', '.top-bar .toggle-topbar', function (e) {
          var topbar = $(this).closest('.top-bar'),
              section = topbar.find('section, .section'),
              titlebar = topbar.children('ul').first();

          if (!topbar.data('height')) self.largestUL();

          e.preventDefault();

          if (self.breakpoint()) {
            topbar
              .toggleClass('expanded')
              .css('min-height', '');
          }

          if (!topbar.hasClass('expanded')) {
            if (!self.rtl) {
              section.css({left: '0%'});
              section.find('>.name').css({left: '100%'});
            } else {
              section.css({right: '0%'});
              section.find('>.name').css({right: '100%'});
            }
            section.find('li.moved').removeClass('moved');
            topbar.data('index', 0);

            if (topbar.hasClass('fixed')) {
              topbar.parent().addClass('fixed');
              topbar.removeClass('fixed');
              $('body').css('padding-top',offst);
            }
          } else if (topbar.parent().hasClass('fixed')) {
            topbar.parent().removeClass('fixed');
            topbar.addClass('fixed');
            $('body').css('padding-top','0');
            window.scrollTo(0,0);
          }
        })

        .on('click.fndtn.topbar', '.top-bar .has-dropdown>a', function (e) {
          var topbar = $(this).closest('.top-bar'),
              section = topbar.find('section, .section'),
              titlebar = topbar.children('ul').first(),
              dropdownHeight = $(this).next('.dropdown').outerHeight();

          if (Modernizr.touch || self.breakpoint()) {
            e.preventDefault();
          }

          if (self.breakpoint()) {
            var $this = $(this),
                $selectedLi = $this.closest('li');

            topbar.data('index', topbar.data('index') + 1);
            $selectedLi.addClass('moved');
            if (!self.rtl) {
              section.css({left: -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({left: 100 * topbar.data('index') + '%'});
            } else {
              section.css({right: -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({right: 100 * topbar.data('index') + '%'});
            }

            $('.top-bar').css('min-height', dropdownHeight);

            $this.siblings('ul')
              .height(topbar.data('height') + self.outerHeight(titlebar, true));
            topbar
              .css('min-height', topbar.data('height') + self.outerHeight(titlebar, true) * 2)
          }
        });

      $(window).on('resize.fndtn.topbar', function () {
        if (!self.breakpoint()) {
          $('.top-bar')
            .css('min-height', '')
            .removeClass('expanded');
        }
      }.bind(this));

      // Go up a level on Click
      $(this.scope).on('click.fndtn', '.top-bar .has-dropdown .back', function (e) {
        e.preventDefault();

        var $this = $(this),
            topbar = $this.closest('.top-bar'),
            section = topbar.find('section, .section'),
            $movedLi = $this.closest('li.moved'),
            $previousLevelUl = $movedLi.parent();

        topbar.data('index', topbar.data('index') - 1);
        if (!self.rtl) {
          section.css({left: -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({left: 100 * topbar.data('index') + '%'});
        } else {
          section.css({right: -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({right: 100 * topbar.data('index') + '%'});
        }

        if (topbar.data('index') === 0) {
          topbar.css('min-height', 0);
        }

        setTimeout(function () {
          $movedLi.removeClass('moved');
        }, 300);
      });
    },

    breakpoint : function () {
      return $(window).width() <= this.settings.breakPoint || $('html').hasClass('lt-ie9');
    },

    assemble : function () {
      var self = this;
      // Pull element out of the DOM for manipulation
      this.settings.$section.detach();

      this.settings.$section.find('.has-dropdown>a').each(function () {
        var $link = $(this),
            $dropdown = $link.siblings('.dropdown'),
            $titleLi = $('<li class="title back js-generated"><h5><a href="#"></a></h5></li>');

        // Copy link to subnav
        if (self.settings.custom_back_text == true) {
          $titleLi.find('h5>a').html('&laquo; ' + self.settings.back_text);
        } else {
          $titleLi.find('h5>a').html('&laquo; ' + $link.html());
        }
        $dropdown.prepend($titleLi);
      });

      // Put element back in the DOM
      this.settings.$section.appendTo(this.settings.$topbar);

      // check for sticky
      this.sticky();
    },

    largestUL : function () {
      var uls = this.settings.$topbar.find('section ul ul'),
          largest = uls.first(),
          total = 0,
          self = this;

      uls.each(function () {
        if ($(this).children('li').length > largest.children('li').length) {
          largest = $(this);
        }
      });

      largest.children('li').each(function () { total += self.outerHeight($(this), true); });

      this.settings.$topbar.data('height', total);
    },

    sticky : function () {
      var klass = '.' + this.settings.stickyClass;
      if ($(klass).length > 0) {
        var distance = $(klass).length ? $(klass).offset().top: 0,
            $window = $(window);
            var offst = this.outerHeight($('.top-bar'));

          $window.scroll(function() {
            if ($window.scrollTop() >= (distance)) {
              $(klass).addClass("fixed");
              $('body').css('padding-top',offst);
            }

            else if ($window.scrollTop() < distance) {
              $(klass).removeClass("fixed");
              $('body').css('padding-top','0');
            }
        });
      }
    },

    off : function () {
      $(this.scope).off('.fndtn.topbar');
      $(window).off('.fndtn.topbar');
    }
  };
}(Foundation.zj, this, this.document));
;(function (window, document, $) {
  // Set the negative margin on the top menu for slide-menu pages
  var $selector1 = $('#topMenu'),
    events = 'click.fndtn';
  if ($selector1.length > 0) $selector1.css("margin-top", $selector1.height() * -1);

  // Watch for clicks to show the sidebar
  var $selector2 = $('#sidebarButton');
  if ($selector2.length > 0) {
    $('#sidebarButton').on(events, function (e) {
      e.preventDefault();
      if ($('body').hasClass('active')) {
      	$("#viewport").attr("content","width=device-width");
		$('body').toggleClass('active');
		}
	  else {
        $("#viewport").attr("content","initial-scale=1.0");
		$('body').toggleClass('active');
	  }
      
    });
  }

  // Watch for clicks to show the menu for slide-menu pages
  var $selector3 = $('#menuButton');
  if ($selector3.length > 0)  {
    $('#menuButton').on(events, function (e) {
      e.preventDefault();
      $('body').toggleClass('active-menu');
    });
  }

  // // Adjust sidebars and sizes when resized
  // $(window).resize(function() {
  //   // if (!navigator.userAgent.match(/Android/i)) $('body').removeClass('active');
  //   var $selector4 = $('#topMenu');
  //   if ($selector4.length > 0) $selector4.css("margin-top", $selector4.height() * -1);
  // });

  // Switch panels for the paneled nav on mobile
  var $selector5 = $('#switchPanels');
  if ($selector5.length > 0)  {
    $('#switchPanels dd').on(events, function (e) {
      e.preventDefault();
      var switchToPanel = $(this).children('a').attr('href'),
          switchToIndex = $(switchToPanel).index();
      $(this).toggleClass('active').siblings().removeClass('active');
      $(switchToPanel).parent().css("left", (switchToIndex * (-100) + '%'));
    });
  }

  $('#nav li a').on(events, function (e) {
    e.preventDefault();
    var href = $(this).attr('href'),
      $target = $(href);
    $('html, body').animate({scrollTop : $target.offset().top}, 300);
  });
}(this, document, jQuery));
/* =========================================================
* facetmenu.js
* Created by KnowledgePath Solutions.
* ========================================================= */

(function ($, MAIN_CONSTANTS) {

	"use strict";

	var FacetMenu = function (element, options) {
		this.init ('facetmenu', element, options);
	},
	ajaxError = '<p>' + MAIN_CONSTANTS.ajaxError + '</p>',
	selectedOnOpen = [],
	selectedOnClose = [],
	disableToggle = false,
	nextFilter;

	function clearMenus() {
		$('.filter').removeClass('open');
	}

	function getSelectedFacetArray($container) {

	    var selectedFacets = $container.find('input:checked'),
	        selectedValues = [];

	    for(var x=0; x < selectedFacets.length; x++) {
			selectedValues.push(selectedFacets[x].value);
	    }
	    return selectedValues;
	}

	FacetMenu.prototype = {
		constructor : FacetMenu,
		init: function init (type, element, options) {
			console.debug('init ' + type + ' with options:');
			console.debug(Array.prototype.slice.call(arguments));

			var that = this;
			this.options = $.extend({}, $.fn[type].defaults, options);
			this.$element = $(element);
			this.loaded = false;
			this.loading = {};
			this.url = this.$element.find('a.filter-title').attr('href');
			this.$filterContainer = this.$element.find('.filter-available');

			//event listener
			this.$element.on('click', function(e){
				var $target = $(e.target),
					$input,
					$openFilter,
					disableToggleOnce = false;

				if ($target.hasClass('filter-trigger')) {

					$openFilter = $('.filter.open');

					if ($openFilter.length > 0) {

						// store clicked element for _close
						nextFilter = $(this).attr('class').match(/by-\S*/).toString();

						// close the open filter
						$openFilter.facetmenu('hide');
					}

					/* if the same facet menu is clicked, then it has already been closed
					 * so don't toggle or it will open again.
					 */
					if ($openFilter.hasClass($target.parent().attr('class'))) {
						 disableToggleOnce = true;
					}

					if (!disableToggleOnce && !disableToggle) {
						that.toggle();
						e.preventDefault();
					}

				}
				e.stopPropagation();
			});
		},
		toggle: function () {
			return this[this.$element.hasClass('open') ? 'hide' : 'show']();
		},
		show: function show(){

			if (this.loaded) {
				this._open();
			} else {
				this._load(this.url);
			}

		},
		hide : function hide() {
			this._close();
		},
		_showLoader : function _showLoader() {

		},
		_hideLoader : function _hideLoader() {

		},
		_load : function _load(url) {
			var that = this,
				ajaxOptions = {
					url: url,
					dataType: 'html',
					cache: false,
					beforeSend: function () {
						that._showLoader();
					},
					success: function (pageData) {
						that._ajaxComplete(pageData);
						that.loaded = true;
					},
					error: function () {
						that._ajaxComplete(ajaxError);
					}};
			$.ajax(ajaxOptions);
		},
		_resize : function _resize () {

		},
		_ajaxComplete : function _ajaxComplete (content) {
			this._resize(content);
			this._hideLoader();
			this._insertContent(content);
			this._addListeners();
			this._open();
		},
		_insertContent : function _insertContent (content) {
			this.$filterContainer.empty().html(content);
		},
		_open : function _open () {
			var self = this;
			this.$element.addClass('open');

			// find selected facets
			selectedOnOpen = getSelectedFacetArray(this.$element);

			// close if there is a click somewhere on the page
			$('html').one('click.facetmenu.data-api', function() {
				self._close();
			});
		},
		_close : function _close () {
			this.$element.removeClass('open');

			// find selected facets
			selectedOnClose = getSelectedFacetArray(this.$element);

			// compare facets selected on open/close
			var different = true;
			if (selectedOnOpen.length == selectedOnClose.length) {
				for (var i=0;i<selectedOnOpen.length;i++) {
					if (selectedOnOpen[i] == selectedOnClose[i]) {
						different = false;
					}
					else {
						different = true;
						break;
					}
				}
				if (selectedOnOpen.length == 0 ) {
					different = false;
				}
			}

			// if facets have changed
			if (different) {

				// don't let any other facets open
				disableToggle = true;

				// store clicked element in sessionStorage
				if (typeof(Storage)!=="undefined") {
					sessionStorage.nextFilter=nextFilter;
				}
				else {
					console.log('no local storage');
				}

				// submit form
				$('#faceted-search-submit', this.$element).trigger('click');
			}
		},
		_addListeners : function _addListeners () {
			if ($('html').hasClass('ie8')) {

					// images hijack label clicks in ie8. Make the click trigger the input
					this.$filterContainer.find('label img').on('click', function(e) {
						$('#' + $(this).parent().attr("for")).click().change();
					});

					this.$filterContainer.find('input[name=selectedFacets]').on('change', function(e){
						var $this = $(this);
						$this.siblings('label').toggleClass('selected', $this.is(':checked'));
					});
				}
		}
	};
	$.fn.facetmenu = function (option) {
		
		console.log("Facet Menu Called");
		
		$('html').on('click.facetmenu.data-api', clearMenus);

		return this.each(function () {
			var $this = $(this),
				data = $this.data('facetmenu'),
				options = typeof option === 'object' && option;
			if (!data) {
				$this.data('facetmenu', (data = new FacetMenu(this, options)));
			} else {
				$.extend(data.options, options);
			}
			if (typeof option === 'string') {
				data[option]();
			}
		});
	};

	$.fn.facetmenu.defaults = {

	};

	$.fn.facetmenu.Constructor = FacetMenu;

}(window.jQuery, window.MAIN_CONSTANTS));
/* =========================================================
 * primaryNav.js
 * Created by KnowledgePath Solutions.
 * ========================================================= */

(function ($, Modernizr) {

	"use strict";

	var Primarynav = function (element, options) {
		this.init ('primarynav', element, options);
	};

	Primarynav.prototype = {
		constructor : Primarynav,
		init: function init (type, element, options) {
			var self = this;
			this.options = $.extend({}, $.fn[type].defaults, options);
			this.$element = $(element);


			if (!self.options.is_hover || Modernizr.touch) {
				this.$element
						.off('primarynav')
						.on('click.rue.primarynav', '.button.primary', function(e){
							//The Modernizr.touch test only indicates if the browser supports touch events,
							//which does not necessarily reflect a touchscreen device.
								var $dropdown = $(e.target).siblings('.sub-nav2');
								if ($dropdown.hasClass('active')) {
									/* for touch devices, if already opened then follow link. */
									return;
								} else {
									self.toggle(e.target, $dropdown);
									e.preventDefault();
									e.stopPropagation();
									return false;
								}
						});
				$('body').off('primarynav').on('click.rue.primarynav, touchstart.rue.primarynav', function (e) {
						//Will close any open item if the click does not originate from this menu
						if ($(e.target).closest(element).length > 0) {
							return;
						}
						self.close.call(self, $('.sub-nav2'));
				});
			} else {
				this.$element
						.off('primarynav')
						.on('mouseenter.rue.primarynav', '.button.primary', function (e) {
							var dropdown,
									target;
							clearTimeout(self.timeout);
								target = e.target;
								dropdown = $(target).siblings('.sub-nav2');
								self.timeout = setTimeout(function () {
									/* small delay before opening the menu means that if you briefly mouse-over another trigger on your
									 way to the menu contents, you won't close this menu and open a neighboring menu */
									self.close.call(self, $('.sub-nav2'));
									self.open.call(self, dropdown, target);
								},250);

						})
						.on('mouseleave.rue.primarynav', function (e) {
							clearTimeout(self.timeout);
								self.timeout = setTimeout(function () {
									self.close.call(self, $('.sub-nav2'));
								}.bind(this), 150);
						})
						.on('mouseenter.rue.primarynav', '.sub-nav2', function (e) {
							clearTimeout(self.timeout);
						});
			}

			//event listener

		},
		toggle: function (el, $dropdownEl) {
			//return this[this.$element.hasClass('open') ? 'hide' : 'show'](1);
			var $dropdown = $dropdownEl || $(el).siblings('.sub-nav2');
			this.close.call(this, $('.sub-nav2').not($dropdown));
			// hasClass('active') is false
			if ($dropdown.hasClass('active')) {
				this.close.call(this, $dropdown);
			} else {
				// in touch screen, touch primary nav gets you here
				this.open.call(this, $dropdown, el);
			}
		},
		close : function ($dropdown){
			$dropdown.hide().removeClass("active");
		},
		open : function ($dropdown, el){
			var $link = $(el),
					$parentLink = $dropdown.parent(".category"),
					parentLinkOrder =  $parentLink.index(),
					$topNavContainer = $('.top-nav2'),
					menuLeft = $parentLink.offset().left,
					navLeft = $topNavContainer.offset().left,
					navWidth = $topNavContainer.width(),
					leftPos, rightPos,
					forceLeft = false,
					subNavWidth = $dropdown.outerWidth();

			//clear out css values
			$dropdown.css("left","").css("right","");

			/* edge detection */
			if (navLeft + navWidth - menuLeft < subNavWidth) {
				forceLeft = true;
			}

			var linkText = $link.text();
			var textLength = linkText.length;
			var textLeft = $link.offset().left;
			var textOffset = Math.round(textLength/2);

			// the offset of the the link within the Primary Nav
			var linkOffset = textLeft - $(".primary-nav").offset().left;
			var totalLinkOffset = linkOffset + textOffset;

			if (subNavWidth > 275) {
				leftPos = totalLinkOffset - 179;
			} else {
				leftPos = totalLinkOffset - 86;
			}
			textOffset = textOffset + 25;
			if (parentLinkOrder <= 2 && !forceLeft) {
				leftPos = 0;
				$dropdown.css("left", leftPos + "px");
				$dropdown.find(".arrow-up").css("left", leftPos + textOffset + "px");
			} else {
				rightPos = 0;
				$dropdown.css("right", rightPos + "px");
				$dropdown.find(".arrow-up").css("right", rightPos + textOffset + "px");
			}
			$dropdown.show().addClass("active");
		}
	};
	$.fn.primarynav = function (option) {
		return this.each(function () {
			var $this = $(this),
					data = $this.data('primarynav'),
					options = typeof option === 'object' && option;
			if (!data) {
				$this.data('primarynav', (data = new Primarynav(this, options)));
			} else {
				$.extend(data.options, options);
			}
			if (typeof option === 'string') {
				data[option]();
			}
		});
	};

	$.fn.primarynav.defaults = {
		is_hover : true
	};

	$.fn.primarynav.Constructor = Primarynav;

}(window.jQuery, window.Modernizr));
/* =========================================================
* product.js
* Created by KnowledgePath Solutions. 
* ==========================================================
* Functionality for the product display page including:
* - attribute selection display and interaction
* - image swapping on color selection (stubbed)
* - alt views image selection (stubbed)
* @requires collapse
* @requires validate
* ========================================================= */

(function ($, MAIN_CONSTANTS) {
	"use strict";
	
	var MAIN = {};

	/* Private functions */
	/**
	 * array sort function for product variants
	 * @private
	 * @return {number} returns -1, 0, or 1 
	 */
	function variantSort(a, b) {
			var aPrice = (a[4]) ? currencyToFloat(a[4]) : 0, //price
				bPrice = (b[4]) ? currencyToFloat(b[4]) : 0,
				aPriority = parseInt(a[3]), // priority
				bPriority =  parseInt(b[3]),
				aName = a[1], // displayName (fall back)
				bName = b[1];
				if (aPrice == bPrice || (isNaN(aPrice) || isNaN(bPrice))) {
					if (aPriority == bPriority || (isNaN(aPriority) || isNaN(bPriority))) {
						if (aName < bName) {
							return -1;
						}
						if (aName > bName) {
							return 1;
						}
					} else {
						if (aPriority < bPriority) {
							return -1;
						}
						if (aPriority > bPriority) {
							return 1;
						}
					}
				} else {
					if (aPrice < bPrice) {
						return -1;
					}
					if (aPrice > bPrice) {
						return 1;
					}
				}
			return 0; // no sorting
	}
	
	function currencyToFloat(curr) {
		curr = curr.replace(",",".");// maybe we won't use decimals at some point
		return parseFloat(curr.replace(/[^0-9\.]+/g,""));
	}

	/**
	 * The productData handles the sku data for a product
	 * @constructor
	 * @private
	 */
	MAIN.ProductData = function (data) {
		this.data = data || {};
		this.allOptions = {};
		this.hasMixedPrices = this.data.priceType == 'mixed';
		this.init();
	};
	MAIN.ProductData.prototype = {
		init : function () {
			this.cleanSkuData();
			this.generateOptions();
		},
		cleanSkuData: function () {
			var variantSize = 0,
				cleanSkus = [],
				x,
				y,
				productSkus = this.data.skus,
				skuLength = productSkus.length,
				variantTypes = this.data.variantTypes,
				variantTypeLength = variantTypes.length;
			// loop though the skus and check that they have the proper amount of variants and that the 
			// variants defined on the product exist on the skus.
			for (x = 0; x < skuLength; x++) {
				variantSize = getObjectSize(productSkus[x].variants);
				if (variantSize != variantTypeLength) {
					continue;
				}
				for (y = 0; y < variantTypeLength; y++) {
					if (typeof productSkus[x].variants[variantTypes[y].id] == 'undefined') {
						break;
					}
				}
				cleanSkus.push(productSkus[x]);
			}
			this.data.skus = cleanSkus;
			if (this.data.skus.length == 1) {
				this.data.defaultSku = this.data.skus[0].catalogRefId;
			}
		},
		hasSkus : function () {
			return this.data.skus.length > 0;
		},
		hasDefaultSku : function () {
			return this.data.defaultSku != '';
		},
		getDefaultSku : function () {
			return this.data.defaultSku;
		},
		getSku: function (skuId) {
			var skus = this.data.skus,
				skuLength = skus.length,
				i;
			for (i = 0; i < skuLength; i++) {
				if (skus[i].catalogRefId == skuId) {
					return skus[i];
				}
			}
		},
		getVariantTypes: function () {
			return this.data.variantTypes;
		},
		getVariantTypeName: function (variantId) {
			var x = 0,
				variantTypes = this.data.variantTypes,
				max = variantTypes.length,
				variantName = '';
			for (x; x < max; x++) {
				if (variantTypes[x].id == variantId) {
					variantName = variantTypes[x].displayName;
					break;
				}
			}
			return variantName;
		},
		getAllOptions : function () {
			return this.allOptions;
		},
		getSizeChartUrl : function () {
			return this.data.sizeChartUrl;
		},
		generateOptions: function () {
		/* allOptions is an array of all the available variants by variant type. 
			It is used during the initialization of the display of the pickers. 
			Using an array because object iteration is unreliable between browsers */
			var skus = this.data.skus,
				variantTypes = this.data.variantTypes,
				variantTypeLength = variantTypes.length,
				isMixedPricing = this.data.priceType == 'mixed',
				variantType = '',
				variant = {},
				options = [],
				variantTypeId,
				optionKey = '',
				sortedSkus = [],
				sortedSkuLength = 0,
				skusLength = skus.length,
				optionList = [],
				i,
				x;
				
			// for each type
			for (i = 0; i < variantTypeLength; i++) {
				variantType = (variantTypes[i].displayName).toLowerCase()
				variantTypeId = variantTypes[i].id;
				optionList = [];
				for (x = 0; x < skusLength; x++) {
					 variant = skus[x].variants[variantTypeId];				 
					 if (variantType == 'color' && isMixedPricing) {
					 	optionList.push([variant.id, variant.displayName, variant.swatch, variant.priority, skus[x].price]);
					 } else {
						 optionList.push([variant.id, variant.displayName, variant.swatch, variant.priority]);
					 }
				}			
				optionList = dedup(optionList);					
				optionList.sort(variantSort);	
				options.push(optionList);
			}
		
			this.allOptions = options;
		},
		getFilteredOptions: function (selectedOptions) {
			var variantTypes = this.data.variantTypes,
				variantTypeLength = variantTypes.length,
				tmpArray = [],
				allSkus = this.data.skus,
				filteredSkuArray,
				options = {},
				variantTypeId,
				optionKey = '',
				i, j, k,
				selectedVariantType;
			/*
			 * For each Variant Type selection, filter down the matching skus for
			 * the other selectors' selected elements. From the filtered sku set,
			 * get back all available options for this option type
			 */
			for (i = 0; i < variantTypeLength; i++) {
				variantTypeId = variantTypes[i].id;
				filteredSkuArray = allSkus;
				for (selectedVariantType in selectedOptions) {
					if (selectedVariantType != variantTypeId) {
						// look at each sku and see if this variant value is present
						for (j = 0; j < filteredSkuArray.length; j++) {
							if (filteredSkuArray[j].variants[selectedVariantType] !== undefined) {
								if (filteredSkuArray[j].variants[selectedVariantType].id == selectedOptions[selectedVariantType]) {
									tmpArray.push(filteredSkuArray[j]);
								}
							}
						}
						filteredSkuArray = tmpArray;
						tmpArray = [];
					}
				}

				for (k = 0; k < filteredSkuArray.length; k++) {
					if (filteredSkuArray[k].variants[variantTypeId] !== undefined) {
						optionKey = filteredSkuArray[k].variants[variantTypeId].id;
						if (options[variantTypeId] === undefined) {
							options[variantTypeId] = variantTypes[i];
							options[variantTypeId].variants = {};
							options[variantTypeId].variants[optionKey] = filteredSkuArray[k].variants[variantTypeId];
						} else if (options[variantTypeId].variants[optionKey] === undefined) {
							options[variantTypeId].variants[optionKey] = filteredSkuArray[k].variants[variantTypeId];
						}
					}
				}
			}
			return options;
		},
		getSkuVariants: function (skuId) {
			var skus = this.data.skus,
				variants = {},
				i,
				j;
			for (i = 0; i < skus.length; i++) {
				if (skus[i].catalogRefId == skuId) {
					for (j in skus[i].variants) {
						if (variants[j] === undefined) {
							variants[j] = skus[i].variants[j].id;
						}
					}
					break;
				}
			}
			return variants;
		},
		getFilteredSkus: function (selectedOptions) {
			var tempArray = [],
				filteredSkus = this.data.skus,
				variantType,
				i;
			for (variantType in selectedOptions) {
				for (i = 0; i < filteredSkus.length; i++) {
					if (filteredSkus[i].variants[variantType] !== undefined && filteredSkus[i].variants[variantType].id == selectedOptions[variantType]) {
						tempArray.push(filteredSkus[i]);
					}
				}
				filteredSkus = tempArray;
				tempArray = [];
			}
			return filteredSkus;
		},
		setDefaults : function (skuList) {
			var i, j;
			for (i = 0; i < skuList.length; i++) {
				for (j = 0; j < this.data.skus.length; j++) {
					if (skuList[i] == this.data.skus[j].catalogRefId) {
						this.data.defaultSku = skuList[i];
						break;
					}
				}
			}
		}
	};
	
	MAIN.ImageController = function ($container) {
		this.$container = $container;
		this.mainImage = this.$container.find('.main-image');
		this.$zoomWrap = this.$container.find('.zoom-wrapper');
		this.thumbnailImages = this.$container.find('.thumbnail-image');
		this.thumbnailLinks = this.$container.find('.thumbnail-link');
		this.init();
	};
    
	MAIN.ImageController.prototype = {
		init : function () {
			var self = this;
			this.$zoomWrap.zoom();
			this.thumbnailLinks.on('click', function(e) {
				var $this = $(this),
					imgSrc = $this.find('img').attr('data-baseurl');
				self.$zoomWrap.zoom('setImage', imgSrc);
				self.thumbnailLinks.removeClass('is-active');
				$this.addClass('is-active');
				e.preventDefault();
			});
		},
		updateImages : function (imageSrcArray, imageBaseArray) {	
			var imagePath = imageBaseArray[0];
			if (this.thumbnailImages.length > 0) {
				this.thumbnailImages.each(function(i){
					$(this).attr('src', imageSrcArray[i]).attr('data-baseurl', imageBaseArray[i]);
				});
				this.thumbnailLinks.removeClass('is-active').filter(':first').addClass('is-active');
				
			} 
			if (this.$zoomWrap.length > 0) {
				// using zoom viewer
				this.$zoomWrap.zoom('setImage', imagePath);
			} else {
				// not using zoom viewer
				this.mainImage.attr('src', imageSrcArray[0]);
			}
		}
	};

MAIN.ProductController = function (data) {
	this.productId = data.prodId;
	this.catalogRefId = '';
	this.productData = new MAIN.ProductData(data);
	this.$container = $('#product-' + this.productId);
	this.$skuPicker = this.$container.find('.product-sku-controls');
	this.$quantitySelect = this.$container.find('#quantity');
	this.$formCatalogRefId = this.$container.find('.product-skuId');
	this.$quickBuyButton = this.$container.find('.express-buy');
	this.$bagButton = this.$container.find('.add-button');
	this.$imageContainer = this.$container.find('.product-image');
	this.options = {buttonClass : 'option-link ', selectedClass : 'is-active', disabledClass : 'is-unavailable'};
	this.selectedQuantity = 1;
	this.$selectors = {};
	this.productImageController = new MAIN.ImageController(this.$imageContainer);
	this.init();
};
MAIN.ProductController.prototype = {
	init : function () {
		var self = this,
			hasSkus = false,
			hasDefaultSku = false,
			defaultSelectedOptions = {},
			allOptions = {},
			availableOptions = {},
			hasPriceLayout,
			priceGroup,
			priceGroupPrice,
			variantTypes = [],
			variantTypeDisplayName = '',
			variantTypeName = '',
			variantTypeId,
			variantOptions = [],
			variantId,
			variantName,
			variantSwatch,
			variantPrice,
			selectorGroup = '',
			x, max,
			state,
			disabled,
			displayStyle,
			colorize,
			buttonClass = this.options.buttonClass,
			selectedClass = this.options.selectedClass,
			disabledClass = this.options.disabledClass;
		
		this.productData.cleanSkuData();
		hasSkus = this.productData.hasSkus();
		hasDefaultSku = this.productData.hasDefaultSku();

		var sizeChartUrl = this.productData.getSizeChartUrl();
		var hasSizeChartUrl = false;
		
		if(sizeChartUrl) {
			hasSizeChartUrl = true;
		}
		
		if (hasSkus) {
			allOptions = this.productData.getAllOptions();
			variantTypes = this.productData.getVariantTypes();
			availableOptions = this.productData.getFilteredOptions(defaultSelectedOptions);
			selectorGroup = '';
			
			for (var x=0; x < variantTypes.length; x++){			
				variantTypeDisplayName = variantTypes[x].displayName;
				variantTypeName = variantTypeDisplayName.toLowerCase();
				variantTypeId = variantTypes[x].id;
				variantOptions = allOptions[x];
				hasPriceLayout = variantTypeName == 'color' && this.productData.hasMixedPrices;
				priceGroupPrice = null;
				
				if(variantTypeDisplayName.toLowerCase() == 'size' && hasSizeChartUrl) {
					//variant type wrapper - add the size chart link if the variant is type size
					selectorGroup += '<div class="field product-options clearfix modal-trigger" data-typeid="' + variantTypeId + '\"><h3>' + variantTypeDisplayName + '&nbsp;<a href=\"/store' + sizeChartUrl + '&view=modal\" class="modal-trigger size-chart-link" id="size-chart-link">view size chart<\/a><\/h3>';			
				} else {
					//variant type wrapper
					selectorGroup += '<div class="field product-options clearfix" data-typeid="' + variantTypeId + '\"><h3>' + variantTypeDisplayName + '<\/h3>';						
				}
				
				if (!hasPriceLayout) {
					// normal list start
					selectorGroup += '<ul class="options-list clearfix">';
				}

				for (var y = 0; y < variantOptions.length; y++) {
					variantId = variantOptions[y][0];
					variantName = variantOptions[y][1];
					variantSwatch = ( variantOptions[y][2] != '') ? '<img src="' +  variantOptions[y][2] +'"/>' : '';
					variantPrice = (variantOptions[y][4]);
					state = (defaultSelectedOptions[variantTypeId] !== undefined && defaultSelectedOptions[variantTypeId] == variantId) ? selectedClass : '';
					disabled = (availableOptions[variantTypeId] === undefined || availableOptions[variantTypeId].variants[variantId] === undefined) ? disabledClass : '';
					displayStyle = (variantSwatch != '') ?  'option-swatch' : 'option-tile';
					colorize = (variantSwatch != '') ? 'true' : 'false';
					
					//price group wrapper and list start
					if(hasPriceLayout && priceGroupPrice != variantPrice) {
						if (priceGroupPrice) {
							selectorGroup += '</ul></div></div>'
						}
						selectorGroup += '<div class="price-options-group">';
						selectorGroup += '<div class="price-option">';
						selectorGroup += '<span class="price-option-header">' + variantPrice + '</span>';
						selectorGroup += '<ul class=\"options-list clearfix\">';
						priceGroupPrice = variantPrice;
					}
					
					//variant list item
					selectorGroup += '<li class="option ' + displayStyle + '"><a class="' + buttonClass + ' ' + state + ' ' + disabled + '" data-id="' + variantId + '" data-typeid="' + variantTypeId + '" data-colorize="'+ colorize  +'">';
					selectorGroup += variantSwatch + '<span class="option-name">' + variantName + '</span>';
					selectorGroup += '</a></li>';
				
				}			
				
				if (hasPriceLayout) {
					//end price group list and wrapper
					selectorGroup += '</ul></div></div>';
				} else {
					//normal list end
					selectorGroup += '<\/ul>';
				}
				//close the variant type wrapper
				selectorGroup += '<\/div>';
			}

			/* if there are attributes, add them to the line item */
			if (selectorGroup != '') {
				this.$skuPicker.append('<div class="product-selectors group">' + selectorGroup + '<\/div>');
			}
			this.$selectors = $('div.product-options', this.$skuPicker);
			this.$quantitySelect.change(function(e) {
					self.selectedQuantity = parseInt($(this).val());
			});
			/* Quickbuy Listener */
			this.$quickBuyButton.click(function(e) {
				var $this,
					modalTarget,
					$modalTarget,
					url;
				if (self.catalogRefId == ''){
					self.showSelectionErrors();
				} else {
					$this = $(this);
					modalTarget = $this.attr('data-target') || $.fn.modal.defaults.id;
					$modalTarget = document.getElementById(modalTarget) ? $('#' + modalTarget) : createModal(modalTarget);
					url = $this.attr('href') + self.createQuickBuyParams(self.productId, self.catalogRefId, self.selectedQuantity);
					$modalTarget.modal({'url': url});
				}
				e.preventDefault();
			});
			
			/* Add to Bag Listener */
			this.$bagButton.click(function(e) {
				if (self.catalogRefId == ''){
					e.preventDefault();
					e.stopPropagation();
					self.showSelectionErrors();
				}
			});
			
			if (hasDefaultSku) {
				this.selectSku(this.productData.getDefaultSku());
			}
			
		} else {
			/* TODO No skus. Sold out message. */
		}

		//Actions
		this.$skuPicker.on('click', 'a.'+self.options.buttonClass, function (e) {
			var $target = $(e.currentTarget);
			self.changeAttribute($target);
		});
		
	},
	changeAttribute : function ($target) {
		var self = this,
			optionType = '',
			optionId = '',
			triggerOptionType = $target.attr('data-typeid'),
			triggerOptionId = $target.attr('data-id'),
			selectedOptions = {},
			selectedClass = this.options.selectedClass,
			filteredSkuArray,
			autoSelect = true,
			i;

		// Deselect other attributes in this group	
		this.toggleSelectedVariant($target, triggerOptionType);

		// Generate SelectedOptions
		if ($target.hasClass(this.options.disabledClass)) {
			/* if we are selecting an item that has a disabled state, 
				then we need to de-select the attribute(s) that make it disabled.
				First, get the available skus with this selected attribute. */
			selectedOptions[triggerOptionType] = triggerOptionId;
			filteredSkuArray = this.productData.getFilteredSkus(selectedOptions);
			/* Loop through the other selectors and see if the selected attribute is available in the filtered skus. 
				If it is, keep the attribute selected and re-filter the skus with that attribute selected */
			this.$selectors.each(function () {
				optionType = $(this).attr('data-typeid');
				optionId = $(this).find('.' + selectedClass).attr('data-id');
				if (optionType != triggerOptionType) {
					for (i = 0; i < filteredSkuArray.length; i++) {
						if (filteredSkuArray[i].variants[optionType].id == optionId) {
							selectedOptions[optionType] = optionId;
							filteredSkuArray = self.productData.getFilteredSkus(selectedOptions);
							break;
						}
					}
				}
			});
		} else {
			this.$selectors.each(function () {
				var $this = $(this);
				optionType = $this.attr('data-typeid');
				optionId =  $this.find('.' + selectedClass).attr('data-id') || '';
				if (optionId != "") {
					selectedOptions[optionType] = optionId;
				}
			});
		}
		if ($target.attr('data-colorize') == 'true') {
			this.updateImages($target.attr('data-id'));
		}
		
		if (triggerOptionId == '') {
			this.updateSelectors({'selectedOptions': selectedOptions, 'triggerOptionType': triggerOptionType});
		} else {
			this.updateSelectors({'selectedOptions': selectedOptions, 'triggerOptionType': triggerOptionType, 'autoSelect': autoSelect, 'updateQty': true});
		}
	},
	updateSelectors : function (options) {
		var self = this,
			selectedOptions = options.selectedOptions,
			updateQty = (options.updateQty != undefined) ? options.updateQty : false,
			autoSelect = (options.autoSelect != undefined) ? options.autoSelect : false,
			triggerOptionType = (options.triggerOptionType != undefined) ? options.triggerOptionType : false,
			availableOptions = this.productData.getFilteredOptions(selectedOptions),
			optionId = '',
			skuSelected = true,
			isDisabled = false,
			buttonClass = this.options.buttonClass,
			disabledClass = this.options.disabledClass,
			selectedClass = this.options.selectedClass;

		this.$selectors.each(function (i) {
			var $selector = $(this),
				optionType = $selector.attr('data-typeid'),
				selectedValue = $selector.find('.' + selectedClass).attr('data-id'),
				enabledItems = 0,
				option;
			$selector.find('.' + buttonClass).each(function () {
				optionId = $(this).attr('data-id');
				isDisabled = (availableOptions[optionType] === undefined || availableOptions[optionType].variants[optionId] === undefined) ? true : false;
				if (isDisabled) {
					$(this).addClass(disabledClass).removeClass(selectedClass);
				} else {
					$(this).removeClass(disabledClass);
				}
				if (!isDisabled) {
					enabledItems++;
				}
			});
			// auto-select the single item (only if there wasn't already a selection), then re-update in case it narrows other selectors.
			if (enabledItems == 1 && selectedOptions[optionType] == undefined && autoSelect == true) {
				for (option in availableOptions[optionType].variants) {
					selectedOptions[optionType] = availableOptions[optionType].variants[option].id;
				}
				self.updateSelectors({'selectedOptions': selectedOptions, 'updateQty': updateQty});
				return;
			}
			//resets or selects item in this VariantGroup
			if (selectedOptions[optionType] === undefined) {
				self.selectVariant(optionType);
				skuSelected = false;
			} else {
				selectedValue = selectedOptions[optionType];
				self.selectVariant(optionType, selectedValue);
			}
		});
		if (skuSelected !== false) {
			this.catalogRefId = self.productData.getFilteredSkus(selectedOptions)[0].catalogRefId;
		} else {
			this.catalogRefId = '';
		}
		this.$formCatalogRefId.val(this.catalogRefId);
	},
	updateImages : function (colorId) {
		var colorData = this.productData.data.availableColors[colorId];
		//check to see if we have data for this colorId
		if (typeof colorData != 'undefined') {
			this.productImageController.updateImages(colorData.thumbnailUrls, colorData.sourcePaths);
		}
	},
	toggleSelectedVariant : function ($target, variantTypeId) {
		var selectedClass = this.options.selectedClass,
			buttonClass = this.options.buttonClass;
		this.$skuPicker.find('a[data-typeid=' + variantTypeId + ']').removeClass(selectedClass);
		$target.toggleClass(selectedClass);
	},
	selectVariant : function (variantTypeId, variantId) {
		var selectedClass = this.options.selectedClass;
		if (variantId) {
			this.$skuPicker
				.find('a[data-typeid=' + variantTypeId + ']').removeClass(selectedClass).end()
				.find('a[data-id=' + variantId + ']').addClass(selectedClass);
		} else {
			this.$skuPicker.find('a[data-typeid=' + variantTypeId + ']').removeClass(selectedClass);
		}
	},
	selectSku : function (skuId) {
		var variants = this.productData.getSkuVariants(skuId);
		this.updateSelectors({'selectedOptions': variants, 'autoSelect': true, 'updateQty': true});
	},
	showSelectionErrors : function () {
		var that = this,
			selectedClass = this.options.selectedClass;
		this.$selectors.each(function (i) {
			var $selector = $(this),
				variantId,
				variantName,
				errorObj = {message : ''},
				content;
			if ($selector.find('.' + selectedClass).length == 0) {
				variantId = $selector.attr('data-typeid');
				variantName = that.productData.getVariantTypeName(variantId);
				if (variantName != '') {
					errorObj.message = 'please select a ' + variantName;
				} else {
					errorObj.message = 'missing selection';
				}
				$selector.find('h3').attr('data-error-message', errorObj.message).alert('show').end()
					.one('click', function(){
						$selector.find('h3').attr('data-error-message', errorObj.message).alert('hide');
					});
				
			}
		});
	}, createQuickBuyParams : function(productId, skuId, quantity) {
		return '?productId=' + productId + '&skuId=' + skuId + '&quantity=' + quantity;
	}
};

window.MAIN = window.MAIN || {};

//$.extend(window.MAIN, MAIN);

})($, MAIN_CONSTANTS);
/* =========================================================
* profile.js
* Created by KnowledgePath Solutions.
* ==========================================================
* Simple utility to request profile update asynchronously
* and update cart and status display. Also grabs targeter
* content for the footer.
* ========================================================= */

(function ($) {
	"use strict";
	var MAIN = {};

	MAIN.profileController = {

		/*
		 * updateProfileStatus
		 * params:
		 *   profileData.cartMenu - html for cart menu (includes count)
		 *   profileData.accountMenu - html for account menu
		 *
		 * */
		updateProfileStatus : function (profileData) {
			if ( profileData != undefined) {
				if (typeof profileData.cartMenu != 'undefined') {
					this.updateCartQuantity(profileData.cartMenu);
				}
				if (typeof profileData.accountMenu != 'undefined') {
					this.showUserStatus(profileData.accountMenu);
				}
				if (typeof profileData.account != 'undefined') {
					this.setLoginStatus(profileData.account);
				}
				if (typeof profileData.subscribeContent != 'undefined') {
					this.showSubscribeStatus(profileData.subscribeContent);
				}
			}
		},
		updateCartQuantity : function (data) {
			$.cookie('cartItemCount', data[0].quantity, {path: '/', expires: 365});
			$(".util-cartcounter .cart-counter").text(data[0].quantity);
		},
		setLoginStatus : function (data) {
			MAIN = MAIN || {};
			MAIN.loginStatus = {
				anonymous : data[0].anonymous,
				statusValue : data[0].statusValue,
				hardLoggedIn : data[0].hardLoggedIn,
				persistentAnonymous : data[0].persistentAnonymous,
				softLoggedInAnonymous : data[0].softLoggedInAnonymous,
				softLoggedInRegistered : data[0].softLoggedInRegistered
			};


			var userType;
			if (MAIN.loginStatus.statusValue == 4) {
				userType = 'fully-authenticated';
			}
			else if (MAIN.loginStatus.statusValue == 3) {
				userType = 'partially-authenticated';
			}
			else {
				userType = 'guest';
			}
			$('html').addClass(userType);

		},
		showUserStatus : function (data) {
			$('.user-func-account').html(data);
		},
		showSubscribeStatus : function (data) {
			$('#footer-slot').html(data);
		},
		getProfileStatus : function (full) {
			var that = this,
				profileUrl = MAIN_CONSTANTS.contextRoot + '/sitewide/data/status.jsp';
			if (full) {
				profileUrl += '?full=true';
			}
			$.ajax({
				url: profileUrl,
				dataType: 'json',
				cache: false,
				success: function (data) {
					that.updateProfileStatus(data);
				},
				error: function () {
					//TODO: default messaging if ajax fails (my account link and cart link)
					that.updateProfileStatus({});
				}
			});
		}
	};

	window.MAIN = window.MAIN || {};

	$.extend(window.MAIN, MAIN);

})(window.jQuery);
/* =========================================================
* proxy.js
* Created by KnowledgePath Solutions. 
* ==========================================================
* Used for Proxy Modals
* ========================================================= */

(function ($) {
	"use strict";
	var MAIN = {};
	
	MAIN.modalProxy = {
		fire : function(options){
			if (window['postMessage']) {
					// postMessage Proxy 
				loadIframe(options);
			} else {
				window.location = options.url;
			}
			
		}
	}
	
	function isExternal(url) {
		// not currently being used.
		var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
		if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) {
			return true;
		}
		if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) {
			return true;
		}
		return false;
	}

	/* iFrame Proxy */
	function loadIframe(options) {
		var url = options.url,
			that = options.target,
			$iframe;
		
		if (url.indexOf('?') > 0) {
			url = url + '&proxy=true';
		} else {
			url = url + '?proxy=true';
		}

		if (document.getElementById('proxy')) {
			$iframe = $('#proxy');
			$iframe.attr('src', url);
		} else {
			$iframe = $('<iframe id="proxy" name="proxy" class="" style="visibility:hidden; float:left;" width="0" height="0" frameborder="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>')
				.appendTo('body');
			setTimeout(function(){ $iframe.attr('src', url); }, 100 );
		}
	
	}	


	
	window.MAIN = window.MAIN || {};

	$.extend(window.MAIN, MAIN);

})(window.jQuery);	
/* =========================================================
* utilities.js - DO NOT DELETE!
* Created by KnowledgePath Solutions.
* Global utility functions
* ========================================================= */
function getUrlParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

Array.prototype.getUnique = function(){
	var u = {}, a = [];
	for(var i = 0, l = this.length; i < l; ++i){
	if(u.hasOwnProperty(this[i])) {
		continue;
	}
	a.push(this[i]);
	u[this[i]] = 1;
	}
	return a;
}

Array.prototype.except = function(a) {
    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
};

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function (str){
    return this.slice(-str.length) == str;
  };
}

// Make all dropdown have flippy arrows
$(document).foundation('dropdown', {
	opened: function(){
		$($(this).parent()).find('.dropdown').addClass('opened');
	},
	closed: function(){
		$($(this).parent()).find('.dropdown').removeClass('opened');
	}
});
/* =========================================================
* utils.js
* Created by KnowledgePath Solutions. 
* ==========================================================
* Misc utils we'd like accessible globally.
* ========================================================= */


/* Degrade console gracefully */
console = window.console || {};
window.logHistory = []; 
console.log = console.log || function (){
	logHistory.push(arguments);
};
console.debug = console.debug || console.log;

function getObjectSize(pObj) {
	var size = 0, key;
	if (typeof (pObj) === 'object') {
		for (key in pObj) {
			if (pObj.hasOwnProperty(key)) {
				size++;
			}
		}
	} else if (typeof (pObj) === 'array') {
		size = pObj.length;
	}
	return size;
}

function dedup(array) {
	var newArray = [],
		seen = {};
	
	for ( var i = 0; i < array.length; i++ ) {
		if ( seen[ array[i] ] ){
			continue;
		}
		newArray.push( array[i] );
		seen[ array[i] ] = 1;
	}
	return newArray;
};



(function ($) { 
		/* "Duck Punching" JQuery unique to work on non-dom arrays */
    var _old = $.unique;
    $.unique = function(arr) {
        // do the default behavior only if we got an array of elements
        if (!!arr[0].nodeType){
            return _old.apply(this,arguments);
        } else {
            // reduce the array to contain no dupes via grep/inArray
            return $.grep(arr, function(v,k) {
                return $.inArray(v,arr) === k;
            });
        }
    };
    
    window.createModal = function createModal(id) {
			var modalTemplate = '<div class="modal" id="{{id}}"><div id="overlay" class="modal-backdrop fade" data-dismiss="modal" /><div class="modal-window fade resize"><div class="modal-content fade in" id="modal-content"></div><div id="modal-close" class="icon icon-close" data-dismiss="modal">close</div></div>';
			return $($.mustache(modalTemplate, {'id': id})).appendTo('body');
		};
		
		window.toggleAnchorText = function toggleAnchorText(id, text1, text2) {
			var anchor = $(id);
				
			var currentValue = anchor.text();
			
			if(currentValue == text1) {
				anchor.text(text2);
			} else if(currentValue == text2) {
				anchor.text(text1);
			}
		};

})($);





/* =============================================================
 * collapse.js
 * Based on bootstrap-collapse.js
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * Modified for rue21 by KnowledgePath Solutions.
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
 * ============================================================ */

(function ($) {

	"use strict";

	var Collapse = function (element, options) {
		this.$element = $(element)
		this.options = $.extend({}, $.fn.collapse.defaults, options)

		if (this.options.parent) {
		this.$parent = $(this.options.parent)
		}

		this.options.toggle && this.toggle()
	}

	Collapse.prototype = {

		constructor: Collapse

	, dimension: function () {
		var hasWidth = this.$element.hasClass('width')
		return hasWidth ? 'width' : 'height'
		}

	, show: function () {
		var dimension
			, scroll
			, actives
			, hasData

		if (this.transitioning || this.$element.hasClass('in')) return

		dimension = this.dimension()
		scroll = $.camelCase(['scroll', dimension].join('-'))
		actives = this.$parent && this.$parent.find('> .accordion-group > .in')

		if (actives && actives.length) {
			hasData = actives.data('collapse')
			if (hasData && hasData.transitioning) return
			actives.collapse('hide')
			hasData || actives.data('collapse', null)
		}

		this.$element[dimension](0)
		this.transition('addClass', $.Event('show'), 'shown')
		$.support.transition && this.$element[dimension](this.$element[0][scroll])
		}

	, hide: function () {
		var dimension
		if (this.transitioning || !this.$element.hasClass('in')) return
		dimension = this.dimension()
		this.reset(this.$element[dimension]())
		this.transition('removeClass', $.Event('hide'), 'hidden')
		this.$element[dimension](0)
		}

	, reset: function (size) {
		var dimension = this.dimension()

		this.$element
			.removeClass('collapse')
			[dimension](size || 'auto')
			[0].offsetWidth

		this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

		return this
		}

	, transition: function (method, startEvent, completeEvent) {
		var that = this
			, complete = function () {
				if (startEvent.type == 'show') that.reset()
				that.transitioning = 0
				that.$element.trigger(completeEvent)
			}

		this.$element.trigger(startEvent)

		if (startEvent.isDefaultPrevented()) return

		this.transitioning = 1

		this.$element[method]('in')

		$.support.transition && this.$element.hasClass('collapse') ?
			this.$element.one($.support.transition.end, complete) :
			complete()
		}

	, toggle: function () {
		this[this.$element.hasClass('in') ? 'hide' : 'show']()
		}

	}


	/* COLLAPSE PLUGIN DEFINITION
	 * ========================== */

	var old = $.fn.collapse

	$.fn.collapse = function (option) {
		return this.each(function () {
		var $this = $(this)
			, data = $this.data('collapse')
			, options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
		if (!data) $this.data('collapse', (data = new Collapse(this, options)))
		if (typeof option == 'string') data[option]()
		})
	}

	$.fn.collapse.defaults = {
		toggle: true
	}

	$.fn.collapse.Constructor = Collapse


	/* COLLAPSE NO CONFLICT
	 * ==================== */

	$.fn.collapse.noConflict = function () {
		$.fn.collapse = old
		return this
	}


	/* COLLAPSE DATA-API
	 * ================= */

	$(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
		var $this = $(this), href
		, target = $this.attr('data-target')
			|| e.preventDefault()
			|| (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
		, option = $(target).data('collapse') ? 'toggle' : $this.data()
		$this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
		$(target).collapse(option)
	})

})(window.jQuery);
/*!
 * jQuery Form Plugin
 * version: 3.02 (07-MAR-2012)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *    http://www.opensource.org/licenses/mit-license.php
 *    http://www.gnu.org/licenses/gpl.html
 */
/*global ActiveXObject alert */
;(function($) {
"use strict";

/*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are mutually exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').bind('submit', function(e) {
            e.preventDefault(); // <-- important
            $(this).ajaxSubmit({
                target: '#output'
            });
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });
    
    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
    form does not have to exist when you invoke ajaxForm:

    $('#myForm').ajaxForm({
        delegation: true,
        target: '#output'
    });
    
    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

/**
 * Feature detection
 */
var feature = {};
feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
feature.formdata = window.FormData !== undefined;

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    /*jshint scripturl:true */

    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }
    
    var method, action, url, $form = this;

    if (typeof options == 'function') {
        options = { success: options };
    }

    method = this.attr('method');
    action = this.attr('action');
    url = (typeof action === 'string') ? $.trim(action) : '';
    url = url || window.location.href || '';
    if (url) {
        // clean url (don't include hash vaue)
        url = (url.match(/^([^#]+)/)||[])[1];
    }

    options = $.extend(true, {
        url:  url,
        success: $.ajaxSettings.success,
        type: method || 'GET',
        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
    }, options);

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }

    var traditional = options.traditional;
    if ( traditional === undefined ) {
        traditional = $.ajaxSettings.traditional;
    }
    
    var qx, a = this.formToArray(options.semantic);
    if (options.data) {
        options.extraData = options.data;
        qx = $.param(options.data, traditional);
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

    var q = $.param(a, traditional);
    if (qx) {
        q = ( q ? (q + '&' + qx) : qx );
    }    
    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else {
        options.data = q; // data is the query string for 'post'
    }

    var callbacks = [];
    if (options.resetForm) {
        callbacks.push(function() { $form.resetForm(); });
    }
    if (options.clearForm) {
        callbacks.push(function() { $form.clearForm(options.includeHidden); });
    }

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            var fn = options.replaceTarget ? 'replaceWith' : 'html';
            $(options.target)[fn](data).each(oldSuccess, arguments);
        });
    }
    else if (options.success) {
        callbacks.push(options.success);
    }

    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
        var context = options.context || options;    // jQuery 1.4+ supports scope context 
        for (var i=0, max=callbacks.length; i < max; i++) {
            callbacks[i].apply(context, [data, status, xhr || $form, $form]);
        }
    };

    // are there files to upload?
    var fileInputs = $('input:file:enabled[value]', this); // [value] (issue #113)
    var hasFileInputs = fileInputs.length > 0;
    var mp = 'multipart/form-data';
    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

    var fileAPI = feature.fileapi && feature.formdata;
    log("fileAPI :" + fileAPI);
    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

    // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected
    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
        // hack to fix Safari hang (thanks to Tim Molendijk for this)
        // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
        if (options.closeKeepAlive) {
            $.get(options.closeKeepAlive, function() {
                fileUploadIframe(a);
            });
        }
          else {
            fileUploadIframe(a);
          }
    }
    else if ((hasFileInputs || multipart) && fileAPI) {
        fileUploadXhr(a);
    }
    else {
        $.ajax(options);
    }

     // fire 'notify' event
     this.trigger('form-submit-notify', [this, options]);
     return this;

     // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
    function fileUploadXhr(a) {
        var formdata = new FormData();

        for (var i=0; i < a.length; i++) {
            formdata.append(a[i].name, a[i].value);
        }

        if (options.extraData) {
            for (var k in options.extraData)
                if (options.extraData.hasOwnProperty(k))
                    formdata.append(k, options.extraData[k]);
        }

        options.data = null;

        var s = $.extend(true, {}, $.ajaxSettings, options, {
            contentType: false,
            processData: false,
            cache: false,
            type: 'POST'
        });

		if (options.uploadProgress) {
			// workaround because jqXHR does not expose upload property
			s.xhr = function() {
				var xhr = jQuery.ajaxSettings.xhr();
				if (xhr.upload) {
					xhr.upload.onprogress = function(event) {
						var percent = 0;
						if (event.lengthComputable)
							percent = parseInt((event.position / event.total) * 100, 10);
						options.uploadProgress(event, event.position, event.total, percent);
					}
				}
				return xhr;
			}
		}

      	s.data = null;
      	var beforeSend = s.beforeSend;
      	s.beforeSend = function(xhr, o) {
          	o.data = formdata;
            if(beforeSend)
                beforeSend.call(o, xhr, options);
      	};
      	$.ajax(s);
   	 }

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUploadIframe(a) {
        var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
        var useProp = !!$.fn.prop;

        if (a) {
            if ( useProp ) {
                // ensure that every serialized input is still enabled
                for (i=0; i < a.length; i++) {
                    el = $(form[a[i].name]);
                    el.prop('disabled', false);
                }
            } else {
                for (i=0; i < a.length; i++) {
                    el = $(form[a[i].name]);
                    el.removeAttr('disabled');
                }
            }
        }

        if ($(':input[name=submit],:input[id=submit]', form).length) {
            // if there is an input with a name or id of 'submit' then we won't be
            // able to invoke the submit fn on the form (at least not x-browser)
            alert('Error: Form elements must not have name or id of "submit".');
            return;
        }
        
        s = $.extend(true, {}, $.ajaxSettings, options);
        s.context = s.context || s;
        id = 'jqFormIO' + (new Date().getTime());
        if (s.iframeTarget) {
            $io = $(s.iframeTarget);
            n = $io.attr('name');
            if (!n)
                 $io.attr('name', id);
            else
                id = n;
        }
        else {
            $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
        }
        io = $io[0];


        xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function(status) {
                var e = (status === 'timeout' ? 'timeout' : 'aborted');
                log('aborting upload... ' + e);
                this.aborted = 1;
                $io.attr('src', s.iframeSrc); // abort op in progress
                xhr.error = e;
                if (s.error)
                    s.error.call(s.context, xhr, e, status);
                if (g)
                    $.event.trigger("ajaxError", [xhr, s, e]);
                if (s.complete)
                    s.complete.call(s.context, xhr, e);
            }
        };

        g = s.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && 0 === $.active++) {
            $.event.trigger("ajaxStart");
        }
        if (g) {
            $.event.trigger("ajaxSend", [xhr, s]);
        }

        if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
            if (s.global) {
                $.active--;
            }
            return;
        }
        if (xhr.aborted) {
            return;
        }

        // add submitting element to data if we know it
        sub = form.clk;
        if (sub) {
            n = sub.name;
            if (n && !sub.disabled) {
                s.extraData = s.extraData || {};
                s.extraData[n] = sub.value;
                if (sub.type == "image") {
                    s.extraData[n+'.x'] = form.clk_x;
                    s.extraData[n+'.y'] = form.clk_y;
                }
            }
        }
        
        var CLIENT_TIMEOUT_ABORT = 1;
        var SERVER_ABORT = 2;

        function getDoc(frame) {
            var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
            return doc;
        }
        
        // Rails CSRF hack (thanks to Yvan Barthelemy)
        var csrf_token = $('meta[name=csrf-token]').attr('content');
        var csrf_param = $('meta[name=csrf-param]').attr('content');
        if (csrf_param && csrf_token) {
            s.extraData = s.extraData || {};
            s.extraData[csrf_param] = csrf_token;
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        function doSubmit() {
            // make sure form attrs are set
            var t = $form.attr('target'), a = $form.attr('action');

            // update form attrs in IE friendly way
            form.setAttribute('target',id);
            if (!method) {
                form.setAttribute('method', 'POST');
            }
            if (a != s.url) {
                form.setAttribute('action', s.url);
            }

            // ie borks in some cases when setting encoding
            if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (s.timeout) {
                timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
            }
            
            // look for server aborts
            function checkState() {
                try {
                    var state = getDoc(io).readyState;
                    log('state = ' + state);
                    if (state && state.toLowerCase() == 'uninitialized')
                        setTimeout(checkState,50);
                }
                catch(e) {
                    log('Server abort: ' , e, ' (', e.name, ')');
                    cb(SERVER_ABORT);
                    if (timeoutHandle)
                        clearTimeout(timeoutHandle);
                    timeoutHandle = undefined;
                }
            }

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (s.extraData) {
                    for (var n in s.extraData) {
                        if (s.extraData.hasOwnProperty(n)) {
                            extraInputs.push(
                                $('<input type="hidden" name="'+n+'">').attr('value',s.extraData[n])
                                    .appendTo(form)[0]);
                        }
                    }
                }

                if (!s.iframeTarget) {
                    // add iframe to doc and submit the form
                    $io.appendTo('body');
                    if (io.attachEvent)
                        io.attachEvent('onload', cb);
                    else
                        io.addEventListener('load', cb, false);
                }
                setTimeout(checkState,15);
                form.submit();
            }
            finally {
                // reset attrs and remove "extra" input elements
                form.setAttribute('action',a);
                if(t) {
                    form.setAttribute('target', t);
                } else {
                    $form.removeAttr('target');
                }
                $(extraInputs).remove();
            }
        }

        if (s.forceSync) {
            doSubmit();
        }
        else {
            setTimeout(doSubmit, 10); // this lets dom updates render
        }

        var data, doc, domCheckCount = 50, callbackProcessed;

        function cb(e) {
            if (xhr.aborted || callbackProcessed) {
                return;
            }
            try {
                doc = getDoc(io);
            }
            catch(ex) {
                log('cannot access response document: ', ex);
                e = SERVER_ABORT;
            }
            if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                xhr.abort('timeout');
                return;
            }
            else if (e == SERVER_ABORT && xhr) {
                xhr.abort('server abort');
                return;
            }

            if (!doc || doc.location.href == s.iframeSrc) {
                // response not received yet
                if (!timedOut)
                    return;
            }
            if (io.detachEvent)
                io.detachEvent('onload', cb);
            else    
                io.removeEventListener('load', cb, false);

            var status = 'success', errMsg;
            try {
                if (timedOut) {
                    throw 'timeout';
                }

                var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                log('isXml='+isXml);
                if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                    if (--domCheckCount) {
                        // in some browsers (Opera) the iframe DOM is not always traversable when
                        // the onload callback fires, so we loop a bit to accommodate
                        log('requeing onLoad callback, DOM not available');
                        setTimeout(cb, 250);
                        return;
                    }
                    // let this fall through because server response could be an empty document
                    //log('Could not access iframe DOM after mutiple tries.');
                    //throw 'DOMException: not available';
                }

                //log('response detected');
                var docRoot = doc.body ? doc.body : doc.documentElement;
                xhr.responseText = docRoot ? docRoot.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                if (isXml)
                    s.dataType = 'xml';
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': s.dataType};
                    return headers[header];
                };
                // support for XHR 'status' & 'statusText' emulation :
                if (docRoot) {
                    xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
                    xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                }

                var dt = (s.dataType || '').toLowerCase();
                var scr = /(json|script|text)/.test(dt);
                if (scr || s.textarea) {
                    // see if user embedded response in textarea
                    var ta = doc.getElementsByTagName('textarea')[0];
                    if (ta) {
                        xhr.responseText = ta.value;
                        // support for XHR 'status' & 'statusText' emulation :
                        xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
                        xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                    }
                    else if (scr) {
                        // account for browsers injecting pre around json response
                        var pre = doc.getElementsByTagName('pre')[0];
                        var b = doc.getElementsByTagName('body')[0];
                        if (pre) {
                            xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                        }
                        else if (b) {
                            xhr.responseText = b.textContent ? b.textContent : b.innerText;
                        }
                    }
                }
                else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                    xhr.responseXML = toXml(xhr.responseText);
                }

                try {
                    data = httpData(xhr, dt, s);
                }
                catch (e) {
                    status = 'parsererror';
                    xhr.error = errMsg = (e || status);
                }
            }
            catch (e) {
                log('error caught: ',e);
                status = 'error';
                xhr.error = errMsg = (e || status);
            }

            if (xhr.aborted) {
                log('upload aborted');
                status = null;
            }

            if (xhr.status) { // we've set xhr.status
                status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (status === 'success') {
                if (s.success)
                    s.success.call(s.context, data, 'success', xhr);
                if (g)
                    $.event.trigger("ajaxSuccess", [xhr, s]);
            }
            else if (status) {
                if (errMsg === undefined)
                    errMsg = xhr.statusText;
                if (s.error)
                    s.error.call(s.context, xhr, status, errMsg);
                if (g)
                    $.event.trigger("ajaxError", [xhr, s, errMsg]);
            }

            if (g)
                $.event.trigger("ajaxComplete", [xhr, s]);

            if (g && ! --$.active) {
                $.event.trigger("ajaxStop");
            }

            if (s.complete)
                s.complete.call(s.context, xhr, status);

            callbackProcessed = true;
            if (s.timeout)
                clearTimeout(timeoutHandle);

            // clean up
            setTimeout(function() {
                if (!s.iframeTarget)
                    $io.remove();
                xhr.responseXML = null;
            }, 100);
        }

        var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else {
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            }
            return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
        };
        var parseJSON = $.parseJSON || function(s) {
            /*jslint evil:true */
            return window['eval']('(' + s + ')');
        };

        var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

            var ct = xhr.getResponseHeader('content-type') || '',
                xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                data = xml ? xhr.responseXML : xhr.responseText;

            if (xml && data.documentElement.nodeName === 'parsererror') {
                if ($.error)
                    $.error('parsererror');
            }
            if (s && s.dataFilter) {
                data = s.dataFilter(data, type);
            }
            if (typeof data === 'string') {
                if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                    data = parseJSON(data);
                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                    $.globalEval(data);
                }
            }
            return data;
        };
    }
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on);
    
    // in jQuery 1.3+ we can fix mistakes with the ready state
    if (!options.delegation && this.length === 0) {
        var o = { s: this.selector, c: this.context };
        if (!$.isReady && o.s) {
            log('DOM not ready, queuing ajaxForm');
            $(function() {
                $(o.s,o.c).ajaxForm(options);
            });
            return this;
        }
        // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
        log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
        return this;
    }

    if ( options.delegation ) {
        $(document)
            .off('submit.form-plugin', this.selector, doAjaxSubmit)
            .off('click.form-plugin', this.selector, captureSubmittingElement)
            .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
            .on('click.form-plugin', this.selector, options, captureSubmittingElement);
        return this;
    }

    return this.ajaxFormUnbind()
        .bind('submit.form-plugin', options, doAjaxSubmit)
        .bind('click.form-plugin', options, captureSubmittingElement);
};

// private event handlers    
function doAjaxSubmit(e) {
    /*jshint validthis:true */
    var options = e.data;
    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
        e.preventDefault();
        $(this).ajaxSubmit(options);
    }
}
    
function captureSubmittingElement(e) {
    /*jshint validthis:true */
    var target = e.target;
    var $el = $(target);
    if (!($el.is(":submit,input:image"))) {
        // is this a child element of the submit el?  (ex: a span within a button)
        var t = $el.closest(':submit');
        if (t.length === 0) {
            return;
        }
        target = t[0];
    }
    var form = this;
    form.clk = target;
    if (target.type == 'image') {
        if (e.offsetX !== undefined) {
            form.clk_x = e.offsetX;
            form.clk_y = e.offsetY;
        } else if (typeof $.fn.offset == 'function') {
            var offset = $el.offset();
            form.clk_x = e.pageX - offset.left;
            form.clk_y = e.pageY - offset.top;
        } else {
            form.clk_x = e.pageX - target.offsetLeft;
            form.clk_y = e.pageY - target.offsetTop;
        }
    }
    // clear form vars
    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
}


// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length === 0) {
        return a;
    }

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) {
        return a;
    }

    var i,j,n,v,el,max,jmax;
    for(i=0, max=els.length; i < max; i++) {
        el = els[i];
        n = el.name;
        if (!n) {
            continue;
        }

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el) {
                a.push({name: n, value: $(el).val(), type: el.type });
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(j=0, jmax=v.length; j < jmax; j++) {
                a.push({name: n, value: v[j]});
            }
        }
        else if (feature.fileapi && el.type == 'file' && !el.disabled) {
            var files = el.files;
            for (j=0; j < files.length; j++) {
                a.push({name: n, value: files[j], type: el.type});
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            a.push({name: n, value: v, type: el.type});
        }
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0];
        n = input.name;
        if (n && !input.disabled && input.type == 'image') {
            a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) {
            return;
        }
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++) {
                a.push({name: n, value: v[i]});
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            a.push({name: this.name, value: v});
        }
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *    array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
            continue;
        }
        if (v.constructor == Array)
            $.merge(val, v);
        else
            val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (successful === undefined) {
        successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1)) {
            return null;
    }

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) {
            return null;
        }
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                var v = op.value;
                if (!v) { // extra pain for IE...
                    v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                }
                if (one) {
                    return v;
                }
                a.push(v);
            }
        }
        return a;
    }
    return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function(includeHidden) {
    return this.each(function() {
        $('input,select,textarea', this).clearFields(includeHidden);
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea' || (includeHidden && /hidden/.test(t)) ) {
            this.value = '';
        }
        else if (t == 'checkbox' || t == 'radio') {
            this.checked = false;
        }
        else if (tag == 'select') {
            this.selectedIndex = -1;
        }
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
            this.reset();
        }
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b === undefined) {
        b = true;
    }
    return this.each(function() {
        this.disabled = !b;
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select === undefined) {
        select = true;
    }
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio') {
            this.checked = select;
        }
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// expose debug var
$.fn.ajaxSubmit.debug = false;

// helper fn for console logging
function log() {
    if (!$.fn.ajaxSubmit.debug) 
        return;
    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
    if (window.console && window.console.log) {
        window.console.log(msg);
    }
    else if (window.opera && window.opera.postError) {
        window.opera.postError(msg);
    }
}

})(jQuery);
/*jshint undef: true */
/*global jQuery: true */

/*
   --------------------------------
   Infinite Scroll
   --------------------------------
   + https://github.com/paulirish/infinite-scroll
   + version 2.0b2.120519
   + Copyright 2011/12 Paul Irish & Luke Shumard
   + Licensed under the MIT license

   + Documentation: http://infinite-scroll.com/
*/

(function (window, $, undefined) {
	"use strict";

    $.infinitescroll = function infscr(options, callback, element) {
        this.element = $(element);

        // Flag the object in the event of a failed creation
        if (!this._create(options, callback)) {
            this.failed = true;
        }
    };

    $.infinitescroll.defaults = {
        loading: {
            finished: undefined,
            finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
			img: "data:image/gif;base64,R0lGODlh3AATAPQeAPDy+MnQ6LW/4N3h8MzT6rjC4sTM5r/I5NHX7N7j8c7U6tvg8OLl8uXo9Ojr9b3G5MfP6Ovu9tPZ7PT1+vX2+tbb7vf4+8/W69jd7rC73vn5/O/x+K243ai02////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgD/ACwAAAAA3AATAAAF/6AnjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEj0BAScpHLJbDqf0Kh0Sq1ar9isdioItAKGw+MAKYMFhbF63CW438f0mg1R2O8EuXj/aOPtaHx7fn96goR4hmuId4qDdX95c4+RBIGCB4yAjpmQhZN0YGYGXitdZBIVGAsLoq4BBKQDswm1CQRkcG6ytrYKubq8vbfAcMK9v7q7EMO1ycrHvsW6zcTKsczNz8HZw9vG3cjTsMIYqQkCLBwHCgsMDQ4RDAYIqfYSFxDxEfz88/X38Onr16+Bp4ADCco7eC8hQYMAEe57yNCew4IVBU7EGNDiRn8Z831cGLHhSIgdFf9chIeBg7oA7gjaWUWTVQAGE3LqBDCTlc9WOHfm7PkTqNCh54rePDqB6M+lR536hCpUqs2gVZM+xbrTqtGoWqdy1emValeXKzggYBBB5y1acFNZmEvXAoN2cGfJrTv3bl69Ffj2xZt3L1+/fw3XRVw4sGDGcR0fJhxZsF3KtBTThZxZ8mLMgC3fRatCbYMNFCzwLEqLgE4NsDWs/tvqdezZf13Hvk2A9Szdu2X3pg18N+68xXn7rh1c+PLksI/Dhe6cuO3ow3NfV92bdArTqC2Ebd3A8vjf5QWfH6Bg7Nz17c2fj69+fnq+8N2Lty+fuP78/eV2X13neIcCeBRwxorbZrA1ANoCDGrgoG8RTshahQ9iSKEEzUmYIYfNWViUhheCGJyIP5E4oom7WWjgCeBFAJNv1DVV01MAdJhhjdkplWNzO/5oXI846njjVEIqR2OS2B1pE5PVscajkxhMycqLJghQSwT40PgfAl4GqNSXYdZXJn5gSkmmmmJu1aZYb14V51do+pTOCmA40AqVCIhG5IJ9PvYnhIFOxmdqhpaI6GeHCtpooisuutmg+Eg62KOMKuqoTaXgicQWoIYq6qiklmoqFV0UoeqqrLbq6quwxirrrLTWauutJ4QAACH5BAUKABwALAcABADOAAsAAAX/IPd0D2dyRCoUp/k8gpHOKtseR9yiSmGbuBykler9XLAhkbDavXTL5k2oqFqNOxzUZPU5YYZd1XsD72rZpBjbeh52mSNnMSC8lwblKZGwi+0QfIJ8CncnCoCDgoVnBHmKfByGJimPkIwtiAeBkH6ZHJaKmCeVnKKTHIihg5KNq4uoqmEtcRUtEREMBggtEr4QDrjCuRC8h7/BwxENeicSF8DKy82pyNLMOxzWygzFmdvD2L3P0dze4+Xh1Arkyepi7dfFvvTtLQkZBC0T/FX3CRgCMOBHsJ+EHYQY7OinAGECgQsB+Lu3AOK+CewcWjwxQeJBihtNGHSoQOE+iQ3//4XkwBBhRZMcUS6YSXOAwIL8PGqEaSJCiYt9SNoCmnJPAgUVLChdaoFBURN8MAzl2PQphwQLfDFd6lTowglHve6rKpbjhK7/pG5VinZP1qkiz1rl4+tr2LRwWU64cFEihwEtZgbgR1UiHaMVvxpOSwBA37kzGz9e8G+B5MIEKLutOGEsAH2ATQwYfTmuX8aETWdGPZmiZcccNSzeTCA1Sw0bdiitC7LBWgu8jQr8HRzqgpK6gX88QbrB14z/kF+ELpwB8eVQj/JkqdylAudji/+ts3039vEEfK8Vz2dlvxZKG0CmbkKDBvllRd6fCzDvBLKBDSCeffhRJEFebFk1k/Mv9jVIoIJZSeBggwUaNeB+Qk34IE0cXlihcfRxkOAJFFhwGmKlmWDiakZhUJtnLBpnWWcnKaAZcxI0piFGGLBm1mc90kajSCveeBVWKeYEoU2wqeaQi0PetoE+rr14EpVC7oAbAUHqhYExbn2XHHsVqbcVew9tx8+XJKk5AZsqqdlddGpqAKdbAYBn1pcczmSTdWvdmZ17c1b3FZ99vnTdCRFM8OEcAhLwm1NdXnWcBBSMRWmfkWZqVlsmLIiAp/o1gGV2vpS4lalGYsUOqXrddcKCmK61aZ8SjEpUpVFVoCpTj4r661Km7kBHjrDyc1RAIQAAIfkEBQoAGwAsBwAEAM4ACwAABf/gtmUCd4goQQgFKj6PYKi0yrrbc8i4ohQt12EHcal+MNSQiCP8gigdz7iCioaCIvUmZLp8QBzW0EN2vSlCuDtFKaq4RyHzQLEKZNdiQDhRDVooCwkbfm59EAmKi4SGIm+AjIsKjhsqB4mSjT2IOIOUnICeCaB/mZKFNTSRmqVpmJqklSqskq6PfYYCDwYHDC4REQwGCBLGxxIQDsHMwhAIX8bKzcENgSLGF9PU1j3Sy9zX2NrgzQziChLk1BHWxcjf7N046tvN82715czn9Pryz6Ilc4ACj4EBOCZM8KEnAYYADBRKnACAYUMFv1wotIhCEcaJCisqwJFgAUSQGyX/kCSVUUTIdKMwJlyo0oXHlhskwrTJciZHEXsgaqS4s6PJiCAr1uzYU8kBBSgnWFqpoMJMUjGtDmUwkmfVmVypakWhEKvXsS4nhLW5wNjVroJIoc05wSzTr0PtiigpYe4EC2vj4iWrFu5euWIMRBhacaVJhYQBEFjA9jHjyQ0xEABwGceGAZYjY0YBOrRLCxUp29QM+bRkx5s7ZyYgVbTqwwti2ybJ+vLtDYpycyZbYOlptxdx0kV+V7lC5iJAyyRrwYKxAdiz82ng0/jnAdMJFz0cPi104Ec1Vj9/M6F173vKL/feXv156dw11tlqeMMnv4V5Ap53GmjQQH97nFfg+IFiucfgRX5Z8KAgbUlQ4IULIlghhhdOSB6AgX0IVn8eReghen3NRIBsRgnH4l4LuEidZBjwRpt6NM5WGwoW0KSjCwX6yJSMab2GwwAPDXfaBCtWpluRTQqC5JM5oUZAjUNS+VeOLWpJEQ7VYQANW0INJSZVDFSnZphjSikfmzE5N4EEbQI1QJmnWXCmHulRp2edwDXF43txukenJwvI9xyg9Q26Z3MzGUcBYFEChZh6DVTq34AU8Iflh51Sd+CnKFYQ6mmZkhqfBKfSxZWqA9DZanWjxmhrWwi0qtCrt/43K6WqVjjpmhIqgEGvculaGKklKstAACEAACH5BAUKABwALAcABADOAAsAAAX/ICdyQmaMYyAUqPgIBiHPxNpy79kqRXH8wAPsRmDdXpAWgWdEIYm2llCHqjVHU+jjJkwqBTecwItShMXkEfNWSh8e1NGAcLgpDGlRgk7EJ/6Ae3VKfoF/fDuFhohVeDeCfXkcCQqDVQcQhn+VNDOYmpSWaoqBlUSfmowjEA+iEAEGDRGztAwGCDcXEA60tXEiCrq8vREMEBLIyRLCxMWSHMzExnbRvQ2Sy7vN0zvVtNfU2tLY3rPgLdnDvca4VQS/Cpk3ABwSLQkYAQwT/P309vcI7OvXr94jBQMJ/nskkGA/BQBRLNDncAIAiDcG6LsxAWOLiQzmeURBKWSLCQbv/1F0eDGinJUKR47YY1IEgQASKk7Yc7ACRwZm7mHweRJoz59BJUogisKCUaFMR0x4SlJBVBFTk8pZivTR0K73rN5wqlXEAq5Fy3IYgHbEzQ0nLy4QSoCjXLoom96VOJEeCosK5n4kkFfqXjl94wa+l1gvAcGICbewAOAxY8l/Ky/QhAGz4cUkGxu2HNozhwMGBnCUqUdBg9UuW9eUynqSwLHIBujePef1ZGQZXcM+OFuEBeBhi3OYgLyqcuaxbT9vLkf4SeqyWxSQpKGB2gQpm1KdWbu72rPRzR9Ne2Nu9Kzr/1Jqj0yD/fvqP4aXOt5sW/5qsXXVcv1Nsp8IBUAmgswGF3llGgeU1YVXXKTN1FlhWFXW3gIE+DVChApysACHHo7Q4A35lLichh+ROBmLKAzgYmYEYDAhCgxKGOOMn4WR4kkDaoBBOxJtdNKQxFmg5JIWIBnQc07GaORfUY4AEkdV6jHlCEISSZ5yTXpp1pbGZbkWmcuZmQCaE6iJ0FhjMaDjTMsgZaNEHFRAQVp3bqXnZED1qYcECOz5V6BhSWCoVJQIKuKQi2KFKEkEFAqoAo7uYSmO3jk61wUUMKmknJ4SGimBmAa0qVQBhAAAIfkEBQoAGwAsBwAEAM4ACwAABf/gJm5FmRlEqhJC+bywgK5pO4rHI0D3pii22+Mg6/0Ej96weCMAk7cDkXf7lZTTnrMl7eaYoy10JN0ZFdco0XAuvKI6qkgVFJXYNwjkIBcNBgR8TQoGfRsJCRuCYYQQiI+ICosiCoGOkIiKfSl8mJkHZ4U9kZMbKaI3pKGXmJKrngmug4WwkhA0lrCBWgYFCCMQFwoQDRHGxwwGCBLMzRLEx8iGzMMO0cYNeCMKzBDW19lnF9DXDIY/48Xg093f0Q3s1dcR8OLe8+Y91OTv5wrj7o7B+7VNQqABIoRVCMBggsOHE36kSoCBIcSH3EbFangxogJYFi8CkJhqQciLJEf/LDDJEeJIBT0GsOwYUYJGBS0fjpQAMidGmyVP6sx4Y6VQhzs9VUwkwqaCCh0tmKoFtSMDmBOf9phg4SrVrROuasRQAaxXpVUhdsU6IsECZlvX3kwLUWzRt0BHOLTbNlbZG3vZinArge5Dvn7wbqtQkSYAAgtKmnSsYKVKo2AfW048uaPmG386i4Q8EQMBAIAnfB7xBxBqvapJ9zX9WgRS2YMpnvYMGdPK3aMjt/3dUcNI4blpj7iwkMFWDXDvSmgAlijrt9RTR78+PS6z1uAJZIe93Q8g5zcsWCi/4Y+C8bah5zUv3vv89uft30QP23punGCx5954oBBwnwYaNCDY/wYrsYeggnM9B2Fpf8GG2CEUVWhbWAtGouEGDy7Y4IEJVrbSiXghqGKIo7z1IVcXIkKWWR361QOLWWnIhwERpLaaCCee5iMBGJQmJGyPFTnbkfHVZGRtIGrg5HALEJAZbu39BuUEUmq1JJQIPtZilY5hGeSWsSk52G9XqsmgljdIcABytq13HyIM6RcUA+r1qZ4EBF3WHWB29tBgAzRhEGhig8KmqKFv8SeCeo+mgsF7YFXa1qWSbkDpom/mqR1PmHCqJ3fwNRVXjC7S6CZhFVCQ2lWvZiirhQq42SACt25IK2hv8TprriUV1usGgeka7LFcNmCldMLi6qZMgFLgpw16Cipb7bC1knXsBiEAACH5BAUKABsALAcABADOAAsAAAX/4FZsJPkUmUGsLCEUTywXglFuSg7fW1xAvNWLF6sFFcPb42C8EZCj24EJdCp2yoegWsolS0Uu6fmamg8n8YYcLU2bXSiRaXMGvqV6/KAeJAh8VgZqCX+BexCFioWAYgqNi4qAR4ORhRuHY408jAeUhAmYYiuVlpiflqGZa5CWkzc5fKmbbhIpsAoQDRG8vQwQCBLCwxK6vb5qwhfGxxENahvCEA7NzskSy7vNzzzK09W/PNHF1NvX2dXcN8K55cfh69Luveol3vO8zwi4Yhj+AQwmCBw4IYclDAAJDlQggVOChAoLKkgFkSCAHDwWLKhIEOONARsDKryogFPIiAUb/95gJNIiw4wnI778GFPhzBKFOAq8qLJEhQpiNArjMcHCmlTCUDIouTKBhApELSxFWiGiVKY4E2CAekPgUphDu0742nRrVLJZnyrFSqKQ2ohoSYAMW6IoDpNJ4bLdILTnAj8KUF7UeENjAKuDyxIgOuGiOI0EBBMgLNew5AUrDTMGsFixwBIaNCQuAXJB57qNJ2OWm2Aj4skwCQCIyNkhhtMkdsIuodE0AN4LJDRgfLPtn5YDLdBlraAByuUbBgxQwICxMOnYpVOPej074OFdlfc0TqC62OIbcppHjV4o+LrieWhfT8JC/I/T6W8oCl29vQ0XjLdBaA3s1RcPBO7lFvpX8BVoG4O5jTXRQRDuJ6FDTzEWF1/BCZhgbyAKE9qICYLloQYOFtahVRsWYlZ4KQJHlwHS/IYaZ6sZd9tmu5HQm2xi1UaTbzxYwJk/wBF5g5EEYOBZeEfGZmNdFyFZmZIR4jikbLThlh5kUUVJGmRT7sekkziRWUIACABk3T4qCsedgO4xhgGcY7q5pHJ4klBBTQRJ0CeHcoYHHUh6wgfdn9uJdSdMiebGJ0zUPTcoS286FCkrZxnYoYYKWLkBowhQoBeaOlZAgVhLidrXqg2GiqpQpZ4apwSwRtjqrB3muoF9BboaXKmshlqWqsWiGt2wphJkQbAU5hoCACH5BAUKABsALAcABADOAAsAAAX/oGFw2WZuT5oZROsSQnGaKjRvilI893MItlNOJ5v5gDcFrHhKIWcEYu/xFEqNv6B1N62aclysF7fsZYe5aOx2yL5aAUGSaT1oTYMBwQ5VGCAJgYIJCnx1gIOBhXdwiIl7d0p2iYGQUAQBjoOFSQR/lIQHnZ+Ue6OagqYzSqSJi5eTpTxGcjcSChANEbu8DBAIEsHBChe5vL13G7fFuscRDcnKuM3H0La3EA7Oz8kKEsXazr7Cw9/Gztar5uHHvte47MjktznZ2w0G1+D3BgirAqJmJMAQgMGEgwgn5Ei0gKDBhBMALGRYEOJBb5QcWlQo4cbAihZz3GgIMqFEBSM1/4ZEOWPAgpIIJXYU+PIhRG8ja1qU6VHlzZknJNQ6UanCjQkWCIGSUGEjAwVLjc44+DTqUQtPPS5gejUrTa5TJ3g9sWCr1BNUWZI161StiQUDmLYdGfesibQ3XMq1OPYthrwuA2yU2LBs2cBHIypYQPPlYAKFD5cVvNPtW8eVGbdcQADATsiNO4cFAPkvHpedPzc8kUcPgNGgZ5RNDZG05reoE9s2vSEP79MEGiQGy1qP8LA4ZcdtsJE48ONoLTBtTV0B9LsTnPceoIDBDQvS7W7vfjVY3q3eZ4A339J4eaAmKqU/sV58HvJh2RcnIBsDUw0ABqhBA5aV5V9XUFGiHfVeAiWwoFgJJrIXRH1tEMiDFV4oHoAEGlaWhgIGSGBO2nFomYY3mKjVglidaNYJGJDkWW2xxTfbjCbVaOGNqoX2GloR8ZeTaECS9pthRGJH2g0b3Agbk6hNANtteHD2GJUucfajCQBy5OOTQ25ZgUPvaVVQmbKh9510/qQpwXx3SQdfk8tZJOd5b6JJFplT3ZnmmX3qd5l1eg5q00HrtUkUn0AKaiGjClSAgKLYZcgWXwocGRcCFGCKwSB6ceqphwmYRUFYT/1WKlOdUpipmxW0mlCqHjYkAaeoZlqrqZ4qd+upQKaapn/AmgAegZ8KUtYtFAQQAgAh+QQFCgAbACwHAAQAzgALAAAF/+C2PUcmiCiZGUTrEkKBis8jQEquKwU5HyXIbEPgyX7BYa5wTNmEMwWsSXsqFbEh8DYs9mrgGjdK6GkPY5GOeU6ryz7UFopSQEzygOGhJBjoIgMDBAcBM0V/CYqLCQqFOwobiYyKjn2TlI6GKC2YjJZknouaZAcQlJUHl6eooJwKooobqoewrJSEmyKdt59NhRKFMxLEEA4RyMkMEAjDEhfGycqAG8TQx9IRDRDE3d3R2ctD1RLg0ttKEnbY5wZD3+zJ6M7X2RHi9Oby7u/r9g38UFjTh2xZJBEBMDAboogAgwkQI07IMUORwocSJwCgWDFBAIwZOaJIsOBjRogKJP8wTODw5ESVHVtm3AhzpEeQElOuNDlTZ0ycEUWKWFASqEahGwYUPbnxoAgEdlYSqDBkgoUNClAlIHbSAoOsqCRQnQHxq1axVb06FWFxLIqyaze0Tft1JVqyE+pWXMD1pF6bYl3+HTqAWNW8cRUFzmih0ZAAB2oGKukSAAGGRHWJgLiR6AylBLpuHKKUMlMCngMpDSAa9QIUggZVVvDaJobLeC3XZpvgNgCmtPcuwP3WgmXSq4do0DC6o2/guzcseECtUoO0hmcsGKDgOt7ssBd07wqesAIGZC1YIBa7PQHvb1+SFo+++HrJSQfB33xfav3i5eX3Hnb4CTJgegEq8tH/YQEOcIJzbm2G2EoYRLgBXFpVmFYDcREV4HIcnmUhiGBRouEMJGJGzHIspqgdXxK0yCKHRNXoIX4uorCdTyjkyNtdPWrA4Up82EbAbzMRxxZRR54WXVLDIRmRcag5d2R6ugl3ZXzNhTecchpMhIGVAKAYpgJjjsSklBEd99maZoo535ZvdamjBEpusJyctg3h4X8XqodBMx0tiNeg/oGJaKGABpogS40KSqiaEgBqlQWLUtqoVQnytekEjzo0hHqhRorppOZt2p923M2AAV+oBtpAnnPNoB6HaU6mAAIU+IXmi3j2mtFXuUoHKwXpzVrsjcgGOauKEjQrwq157hitGq2NoWmjh7z6Wmxb0m5w66+2VRAuXN/yFUAIACH5BAUKABsALAcABADOAAsAAAX/4CZuRiaM45MZqBgIRbs9AqTcuFLE7VHLOh7KB5ERdjJaEaU4ClO/lgKWjKKcMiJQ8KgumcieVdQMD8cbBeuAkkC6LYLhOxoQ2PF5Ys9PKPBMen17f0CCg4VSh32JV4t8jSNqEIOEgJKPlkYBlJWRInKdiJdkmQlvKAsLBxdABA4RsbIMBggtEhcQsLKxDBC2TAS6vLENdJLDxMZAubu8vjIbzcQRtMzJz79S08oQEt/guNiyy7fcvMbh4OezdAvGrakLAQwyABsELQkY9BP+//ckyPDD4J9BfAMh1GsBoImMeQUN+lMgUJ9CiRMa5msxoB9Gh/o8GmxYMZXIgxtR/yQ46S/gQAURR0pDwYDfywoyLPip5AdnCwsMFPBU4BPFhKBDi444quCmDKZOfwZ9KEGpCKgcN1jdALSpPqIYsabS+nSqvqplvYqQYAeDPgwKwjaMtiDl0oaqUAyo+3TuWwUAMPpVCfee0cEjVBGQq2ABx7oTWmQk4FglZMGN9fGVDMCuiH2AOVOu/PmyxM630gwM0CCn6q8LjVJ8GXvpa5Uwn95OTC/nNxkda1/dLSK475IjCD6dHbK1ZOa4hXP9DXs5chJ00UpVm5xo2qRpoxptwF2E4/IbJpB/SDz9+q9b1aNfQH08+p4a8uvX8B53fLP+ycAfemjsRUBgp1H20K+BghHgVgt1GXZXZpZ5lt4ECjxYR4ScUWiShEtZqBiIInRGWnERNnjiBglw+JyGnxUmGowsyiiZg189lNtPGACjV2+S9UjbU0JWF6SPvEk3QZEqsZYTk3UAaRSUnznJI5LmESCdBVSyaOWUWLK4I5gDUYVeV1T9l+FZClCAUVA09uSmRHBCKAECFEhW51ht6rnmWBXkaR+NjuHpJ40D3DmnQXt2F+ihZxlqVKOfQRACACH5BAUKABwALAcABADOAAsAAAX/ICdyUCkUo/g8mUG8MCGkKgspeC6j6XEIEBpBUeCNfECaglBcOVfJFK7YQwZHQ6JRZBUqTrSuVEuD3nI45pYjFuWKvjjSkCoRaBUMWxkwBGgJCXspQ36Bh4EEB0oKhoiBgyNLjo8Ki4QElIiWfJqHnISNEI+Ql5J9o6SgkqKkgqYihamPkW6oNBgSfiMMDQkGCBLCwxIQDhHIyQwQCGMKxsnKVyPCF9DREQ3MxMPX0cu4wt7J2uHWx9jlKd3o39MiuefYEcvNkuLt5O8c1ePI2tyELXGQwoGDAQf+iEC2xByDCRAjTlAgIUWCBRgCPJQ4AQBFXAs0coT40WLIjRxL/47AcHLkxIomRXL0CHPERZkpa4q4iVKiyp0tR/7kwHMkTUBBJR5dOCEBAVcKKtCAyOHpowXCpk7goABqBZdcvWploACpBKkpIJI1q5OD2rIWE0R1uTZu1LFwbWL9OlKuWb4c6+o9i3dEgw0RCGDUG9KlRw56gDY2qmCByZBaASi+TACA0TucAaTteCcy0ZuOK3N2vJlx58+LRQyY3Xm0ZsgjZg+oPQLi7dUcNXi0LOJw1pgNtB7XG6CBy+U75SYfPTSQAgZTNUDnQHt67wnbZyvwLgKiMN3oCZB3C76tdewpLFgIP2C88rbi4Y+QT3+8S5USMICZXWj1pkEDeUU3lOYGB3alSoEiMIjgX4WlgNF2EibIwQIXauWXSRg2SAOHIU5IIIMoZkhhWiJaiFVbKo6AQEgQXrTAazO1JhkBrBG3Y2Y6EsUhaGn95hprSN0oWpFE7rhkeaQBchGOEWnwEmc0uKWZj0LeuNV3W4Y2lZHFlQCSRjTIl8uZ+kG5HU/3sRlnTG2ytyadytnD3HrmuRcSn+0h1dycexIK1KCjYaCnjCCVqOFFJTZ5GkUUjESWaUIKU2lgCmAKKQIUjHapXRKE+t2og1VgankNYnohqKJ2CmKplso6GKz7WYCgqxeuyoF8u9IQAgA7",
            msg: null,
            msgText: "<em>Loading the next set of posts...</em>",
            selector: null,
            speed: 'fast',
            start: undefined
        },
        state: {
            isDuringAjax: false,
            isInvalidPage: false,
            isDestroyed: false,
            isDone: false, // For when it goes all the way through the archive.
            isPaused: false,
            isBeyondMaxPage: false,
            currPage: 1
        },
        debug: false,
		behavior: undefined,
        binder: $(window), // used to cache the selector
        nextSelector: "div.navigation a:first",
        navSelector: "div.navigation",
        contentSelector: null, // rename to pageFragment
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: false,
        pathParse: undefined,
        dataType: 'html',
        appendCallback: true,
        bufferPx: 40,
        errorCallback: function () { },
        infid: 0, //Instance ID
        pixelsFromNavToBottom: undefined,
        path: undefined, // Either parts of a URL as an array (e.g. ["/page/", "/"] or a function that takes in the page number and returns a URL
		prefill: false, // When the document is smaller than the window, load data until the document is larger or links are exhausted
        maxPage: undefined // to manually control maximum page (when maxPage is undefined, maximum page limitation is not work)
	};

    $.infinitescroll.prototype = {

        /*	
            ----------------------------
            Private methods
            ----------------------------
            */

        // Bind or unbind from scroll
        _binding: function infscr_binding(binding) {

            var instance = this,
            opts = instance.options;

            opts.v = '2.0b2.120520';

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_binding_'+opts.behavior] !== undefined) {
                this['_binding_'+opts.behavior].call(this);
                return;
            }

            if (binding !== 'bind' && binding !== 'unbind') {
                this._debug('Binding value  ' + binding + ' not valid');
                return false;
            }

            if (binding === 'unbind') {
                (this.options.binder).unbind('smartscroll.infscr.' + instance.options.infid);
            } else {
                (this.options.binder)[binding]('smartscroll.infscr.' + instance.options.infid, function () {
                    instance.scroll();
                });
            }

            this._debug('Binding', binding);
        },

        // Fundamental aspects of the plugin are initialized
        _create: function infscr_create(options, callback) {

            // Add custom options to defaults
            var opts = $.extend(true, {}, $.infinitescroll.defaults, options);
			this.options = opts;
			var $window = $(window);
			var instance = this;

			// Validate selectors
            if (!instance._validate(options)) {
				return false;
			}

            // Validate page fragment path
            var path = $(opts.nextSelector).attr('href');
            if (!path) {
                this._debug('Navigation selector not found');
                return false;
            }

            // Set the path to be a relative URL from root.
            opts.path = opts.path || this._determinepath(path);

            // contentSelector is 'page fragment' option for .load() / .ajax() calls
            opts.contentSelector = opts.contentSelector || this.element;

            // loading.selector - if we want to place the load message in a specific selector, defaulted to the contentSelector
            opts.loading.selector = opts.loading.selector || opts.contentSelector;

            // Define loading.msg
            opts.loading.msg = opts.loading.msg || $('<div id="infscr-loading"><img alt="Loading..." src="' + opts.loading.img + '" /><div>' + opts.loading.msgText + '</div></div>');

            // Preload loading.img
            (new Image()).src = opts.loading.img;

            // distance from nav links to bottom
            // computed as: height of the document + top offset of container - top offset of nav link
            if(opts.pixelsFromNavToBottom === undefined) {
				opts.pixelsFromNavToBottom = $(document).height() - $(opts.navSelector).offset().top;
				this._debug("pixelsFromNavToBottom: " + opts.pixelsFromNavToBottom);
			}

			var self = this;

            // determine loading.start actions
            opts.loading.start = opts.loading.start || function() {
	            if (opts.loading.startCallback) {
		            opts.loading.startCallback();
	            }
	            
                $(opts.navSelector).hide();
                opts.loading.msg
                .appendTo(opts.loading.selector)
                .show(opts.loading.speed, $.proxy(function() {
					this.beginAjax(opts);
				}, self));
            };

            // determine loading.finished actions
            opts.loading.finished = opts.loading.finished || function() {
                if (!opts.state.isBeyondMaxPage)
                    opts.loading.msg.fadeOut(opts.loading.speed);
                
	            if (opts.loading.finishCallback) {
		            opts.loading.finishCallback();
	            }
            };

			// callback loading
            opts.callback = function(instance, data, url) {
                if (!!opts.behavior && instance['_callback_'+opts.behavior] !== undefined) {
                    instance['_callback_'+opts.behavior].call($(opts.contentSelector)[0], data, url);
                }

                if (callback) {
                    callback.call($(opts.contentSelector)[0], data, opts, url);
                }

				if (opts.prefill) {
					$window.bind("resize.infinite-scroll", instance._prefill);
				}
            };

			if (options.debug) {
				// Tell IE9 to use its built-in console
				if (Function.prototype.bind && (typeof console === 'object' || typeof console === 'function') && typeof console.log === "object") {
					["log","info","warn","error","assert","dir","clear","profile","profileEnd"]
						.forEach(function (method) {
							console[method] = this.call(console[method], console);
						}, Function.prototype.bind);
				}
			}

            this._setup();

			// Setups the prefill method for use
			if (opts.prefill) {
				this._prefill();
			}

            // Return true to indicate successful creation
            return true;
        },

		_prefill: function infscr_prefill() {
			var instance = this;
			var $window = $(window);

			function needsPrefill() {
				return (instance.options.contentSelector.height() <= $window.height());
			}

			this._prefill = function() {
				if (needsPrefill()) {
					instance.scroll();
				}

				$window.bind("resize.infinite-scroll", function() {
					if (needsPrefill()) {
						$window.unbind("resize.infinite-scroll");
						instance.scroll();
					}
				});
			};

			// Call self after setting up the new function
			this._prefill();
		},

        // Console log wrapper
        _debug: function infscr_debug() {
			if (true !== this.options.debug) {
				return;
			}

			if (typeof console !== 'undefined' && typeof console.log === 'function') {
				// Modern browsers
				// Single argument, which is a string
				if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
					console.log( (Array.prototype.slice.call(arguments)).toString() );
				} else {
					console.log( Array.prototype.slice.call(arguments) );
				}
			} else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
				// IE8
				Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
			}
        },

        // find the number to increment in the path.
        _determinepath: function infscr_determinepath(path) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_determinepath_'+opts.behavior] !== undefined) {
                return this['_determinepath_'+opts.behavior].call(this,path);
            }

            if (!!opts.pathParse) {

                this._debug('pathParse manual');
                return opts.pathParse(path, this.options.state.currPage+1);

            } else if (path.match(/^(.*?)\b2\b(.*?$)/)) {
                path = path.match(/^(.*?)\b2\b(.*?$)/).slice(1);

                // if there is any 2 in the url at all.    
            } else if (path.match(/^(.*?)2(.*?$)/)) {

                // page= is used in django:
                // http://www.infinite-scroll.com/changelog/comment-page-1/#comment-127
                if (path.match(/^(.*?page=)2(\/.*|$)/)) {
                    path = path.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                    return path;
                }

                path = path.match(/^(.*?)2(.*?$)/).slice(1);

            } else {

                // page= is used in drupal too but second page is page=1 not page=2:
                // thx Jerod Fritz, vladikoff
                if (path.match(/^(.*?page=)1(\/.*|$)/)) {
                    path = path.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                    return path;
                } else {
                    this._debug('Sorry, we couldn\'t parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.');
                    // Get rid of isInvalidPage to allow permalink to state
                    opts.state.isInvalidPage = true;  //prevent it from running on this page.
                }
            }
            this._debug('determinePath', path);
            return path;

        },

        // Custom error
        _error: function infscr_error(xhr) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_error_'+opts.behavior] !== undefined) {
                this['_error_'+opts.behavior].call(this,xhr);
                return;
            }

            if (xhr !== 'destroy' && xhr !== 'end') {
                xhr = 'unknown';
            }

            this._debug('Error', xhr);

            if (xhr === 'end' || opts.state.isBeyondMaxPage) {
                this._showdonemsg();
            }

            opts.state.isDone = true;
            opts.state.currPage = 1; // if you need to go back to this instance
            opts.state.isPaused = false;
            opts.state.isBeyondMaxPage = false;
            this._binding('unbind');

        },

        // Load Callback
        _loadcallback: function infscr_loadcallback(box, data, url) {
            var opts = this.options,
            callback = this.options.callback, // GLOBAL OBJECT FOR CALLBACK
            result = (opts.state.isDone) ? 'done' : (!opts.appendCallback) ? 'no-append' : 'append',
            frag;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_loadcallback_'+opts.behavior] !== undefined) {
                this['_loadcallback_'+opts.behavior].call(this,box,data);
                return;
            }

			switch (result) {
				case 'done':
					this._showdonemsg();
					return false;

				case 'no-append':
					if (opts.dataType === 'html') {
						data = '<div>' + data + '</div>';
						data = $(data).find(opts.itemSelector);
					}
					break;

				case 'append':
					var children = box.children();
					// if it didn't return anything
					if (children.length === 0) {
						return this._error('end');
					}

					// use a documentFragment because it works when content is going into a table or UL
					frag = document.createDocumentFragment();
					while (box[0].firstChild) {
						frag.appendChild(box[0].firstChild);
					}

					this._debug('contentSelector', $(opts.contentSelector)[0]);
					$(opts.contentSelector)[0].appendChild(frag);
					// previously, we would pass in the new DOM element as context for the callback
					// however we're now using a documentfragment, which doesn't have parents or children,
					// so the context is the contentContainer guy, and we pass in an array
					// of the elements collected as the first argument.

					data = children.get();
					break;
			}

            // loadingEnd function
            opts.loading.finished.call($(opts.contentSelector)[0],opts);

            // smooth scroll to ease in the new content
            if (opts.animate) {
                var scrollTo = $(window).scrollTop() + $(opts.loading.msg).height() + opts.extraScrollPx + 'px';
                $('html,body').animate({ scrollTop: scrollTo }, 800, function () { opts.state.isDuringAjax = false; });
            }

            if (!opts.animate) {
				// once the call is done, we can allow it again.
				opts.state.isDuringAjax = false;
			}

            callback(this, data, url);

			if (opts.prefill) {
				this._prefill();
			}
		},

        _nearbottom: function infscr_nearbottom() {

            var opts = this.options,
            pixelsFromWindowBottomToBottom = 0 + $(document).height() - (opts.binder.scrollTop()) - $(window).height();

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_nearbottom_'+opts.behavior] !== undefined) {
                return this['_nearbottom_'+opts.behavior].call(this);
            }

            this._debug('math:', pixelsFromWindowBottomToBottom, opts.pixelsFromNavToBottom);

            // if distance remaining in the scroll (including buffer) is less than the orignal nav to bottom....
            return (pixelsFromWindowBottomToBottom - opts.bufferPx < opts.pixelsFromNavToBottom);

        },

        // Pause / temporarily disable plugin from firing
        _pausing: function infscr_pausing(pause) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_pausing_'+opts.behavior] !== undefined) {
                this['_pausing_'+opts.behavior].call(this,pause);
                return;
            }

            // If pause is not 'pause' or 'resume', toggle it's value
            if (pause !== 'pause' && pause !== 'resume' && pause !== null) {
                this._debug('Invalid argument. Toggling pause value instead');
            }

            pause = (pause && (pause === 'pause' || pause === 'resume')) ? pause : 'toggle';

            switch (pause) {
                case 'pause':
                    opts.state.isPaused = true;
                break;

                case 'resume':
                    opts.state.isPaused = false;
                break;

                case 'toggle':
                    opts.state.isPaused = !opts.state.isPaused;
                break;
            }

            this._debug('Paused', opts.state.isPaused);
            return false;

        },

        // Behavior is determined
        // If the behavior option is undefined, it will set to default and bind to scroll
        _setup: function infscr_setup() {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_setup_'+opts.behavior] !== undefined) {
                this['_setup_'+opts.behavior].call(this);
                return;
            }

            this._binding('bind');

            return false;

        },

        // Show done message
        _showdonemsg: function infscr_showdonemsg() {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_showdonemsg_'+opts.behavior] !== undefined) {
                this['_showdonemsg_'+opts.behavior].call(this);
                return;
            }

            opts.loading.msg
            .find('img')
            .hide()
            .parent()
            .find('div').html(opts.loading.finishedMsg).animate({ opacity: 1 }, 2000, function () {
                $(this).parent().fadeOut(opts.loading.speed);
            });

            // user provided callback when done    
            opts.errorCallback.call($(opts.contentSelector)[0],'done');
        },

        // grab each selector option and see if any fail
        _validate: function infscr_validate(opts) {
            for (var key in opts) {
                if (key.indexOf && key.indexOf('Selector') > -1 && $(opts[key]).length === 0) {
                    this._debug('Your ' + key + ' found no elements.');
                    return false;
                }
            }

            return true;
        },

        /*	
            ----------------------------
            Public methods
            ----------------------------
            */

        // Bind to scroll
        bind: function infscr_bind() {
            this._binding('bind');
        },

        // Destroy current instance of plugin
        destroy: function infscr_destroy() {
            this.options.state.isDestroyed = true;
			this.options.loading.finished();
            return this._error('destroy');
        },

        // Set pause value to false
        pause: function infscr_pause() {
            this._pausing('pause');
        },

        // Set pause value to false
        resume: function infscr_resume() {
            this._pausing('resume');
        },

		beginAjax: function infscr_ajax(opts) {
			var instance = this,
				path = opts.path,
				box, desturl, method, condition;

			// increment the URL bit. e.g. /page/3/
			opts.state.currPage++;

            // Manually control maximum page 
            if ( opts.maxPage != undefined && opts.state.currPage > opts.maxPage ){
                opts.state.isBeyondMaxPage = true;
                this.destroy();
                return;
            }

			// if we're dealing with a table we can't use DIVs
			box = $(opts.contentSelector).is('table, tbody') ? $('<tbody/>') : $('<div/>');

			desturl = (typeof path === 'function') ? path(opts.state.currPage) : path.join(opts.state.currPage);
			instance._debug('heading into ajax', desturl);

			method = (opts.dataType === 'html' || opts.dataType === 'json' ) ? opts.dataType : 'html+callback';
			if (opts.appendCallback && opts.dataType === 'html') {
				method += '+callback';
			}

			switch (method) {
				case 'html+callback':
					instance._debug('Using HTML via .load() method');
					box.load(desturl + ' ' + opts.itemSelector, undefined, function infscr_ajax_callback(responseText) {
						instance._loadcallback(box, responseText, desturl);
					});

					break;

				case 'html':
					instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
					$.ajax({
						// params
						url: desturl,
						dataType: opts.dataType,
						complete: function infscr_ajax_callback(jqXHR, textStatus) {
							condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
							if (condition) {
								instance._loadcallback(box, jqXHR.responseText, desturl);
							} else {
								instance._error('end');
							}
						}
					});

					break;
				case 'json':
					instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
					$.ajax({
						dataType: 'json',
						type: 'GET',
						url: desturl,
						success: function (data, textStatus, jqXHR) {
							condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
							if (opts.appendCallback) {
								// if appendCallback is true, you must defined template in options.
								// note that data passed into _loadcallback is already an html (after processed in opts.template(data)).
								if (opts.template !== undefined) {
									var theData = opts.template(data);
									box.append(theData);
									if (condition) {
										instance._loadcallback(box, theData);
									} else {
										instance._error('end');
									}
								} else {
									instance._debug("template must be defined.");
									instance._error('end');
								}
							} else {
								// if appendCallback is false, we will pass in the JSON object. you should handle it yourself in your callback.
								if (condition) {
									instance._loadcallback(box, data, desturl);
								} else {
									instance._error('end');
								}
							}
						},
						error: function() {
							instance._debug("JSON ajax request failed.");
							instance._error('end');
						}
					});

					break;
			}
		},

        // Retrieve next set of content items
        retrieve: function infscr_retrieve(pageNum) {
			pageNum = pageNum || null;

			var instance = this,
            opts = instance.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['retrieve_'+opts.behavior] !== undefined) {
                this['retrieve_'+opts.behavior].call(this,pageNum);
                return;
            }

            // for manual triggers, if destroyed, get out of here
            if (opts.state.isDestroyed) {
                this._debug('Instance is destroyed');
                return false;
            }

            // we dont want to fire the ajax multiple times
            opts.state.isDuringAjax = true;

            opts.loading.start.call($(opts.contentSelector)[0],opts);
        },

        // Check to see next page is needed
        scroll: function infscr_scroll() {

            var opts = this.options,
            state = opts.state;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['scroll_'+opts.behavior] !== undefined) {
                this['scroll_'+opts.behavior].call(this);
                return;
            }

            if (state.isDuringAjax || state.isInvalidPage || state.isDone || state.isDestroyed || state.isPaused) {
				return;
			}

            if (!this._nearbottom()) {
				return;
			}

            this.retrieve();

        },

        // Toggle pause value
        toggle: function infscr_toggle() {
            this._pausing();
        },

        // Unbind from scroll
        unbind: function infscr_unbind() {
            this._binding('unbind');
        },

        // update options
        update: function infscr_options(key) {
            if ($.isPlainObject(key)) {
                this.options = $.extend(true,this.options,key);
            }
        }
    };


    /*	
        ----------------------------
        Infinite Scroll function
        ----------------------------

        Borrowed logic from the following...

        jQuery UI
        - https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js

        jCarousel
        - https://github.com/jsor/jcarousel/blob/master/lib/jquery.jcarousel.js

        Masonry
        - https://github.com/desandro/masonry/blob/master/jquery.masonry.js		

*/

    $.fn.infinitescroll = function infscr_init(options, callback) {


        var thisCall = typeof options;

        switch (thisCall) {

            // method 
            case 'string':
                var args = Array.prototype.slice.call(arguments, 1);

				this.each(function () {
					var instance = $.data(this, 'infinitescroll');

					if (!instance) {
						// not setup yet
						// return $.error('Method ' + options + ' cannot be called until Infinite Scroll is setup');
						return false;
					}

					if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
						// return $.error('No such method ' + options + ' for Infinite Scroll');
						return false;
					}

					// no errors!
					instance[options].apply(instance, args);
				});

            break;

            // creation 
            case 'object':

                this.each(function () {

                var instance = $.data(this, 'infinitescroll');

                if (instance) {

                    // update options of current instance
                    instance.update(options);

                } else {

                    // initialize new instance
                    instance = new $.infinitescroll(options, callback, this);

                    // don't attach if instantiation failed
                    if (!instance.failed) {
                        $.data(this, 'infinitescroll', instance);
                    }

                }

            });

            break;

        }

        return this;
    };



    /* 
     * smartscroll: debounced scroll event for jQuery *
     * https://github.com/lukeshumard/smartscroll
     * Based on smartresize by @louis_remi: https://github.com/lrbabe/jquery.smartresize.js *
     * Copyright 2011 Louis-Remi & Luke Shumard * Licensed under the MIT license. *
     */

    var event = $.event,
    scrollTimeout;

    event.special.smartscroll = {
        setup: function () {
            $(this).bind("scroll", event.special.smartscroll.handler);
        },
        teardown: function () {
            $(this).unbind("scroll", event.special.smartscroll.handler);
        },
        handler: function (event, execAsap) {
            // Save the context
            var context = this,
            args = arguments;

            // set correct event type
            event.type = "smartscroll";

            if (scrollTimeout) { clearTimeout(scrollTimeout); }
            scrollTimeout = setTimeout(function () {
                $(context).trigger('smartscroll', args);
            }, execAsap === "execAsap" ? 0 : 100);
        }
    };

    $.fn.smartscroll = function (fn) {
        return fn ? this.bind("smartscroll", fn) : this.trigger("smartscroll", ["execAsap"]);
    };


})(window, $);
(function($){ 
     $.fn.extend({  
         limit: function(limit,element) {
			
			var interval, f;
			var self = $(this);
					
			$(this).focus(function(){
				interval = window.setInterval(substring,100);
			});
			
			$(this).blur(function(){
				clearInterval(interval);
				substring();
			});
			
			substringFunction = "function substring(){ var val = $(self).val();var length = val.length;if(length > limit){$(self).val($(self).val().substring(0,limit));}";
			if(typeof element != 'undefined')
				substringFunction += "if($(element).html() != limit-length){$(element).html((limit-length<=0)?'0':limit-length);}"
				
			substringFunction += "}";
			
			eval(substringFunction);
			
			
			
			substring();
			
        } 
    }); 
})(jQuery);
/*!
* mustache.js - Logic-less {{mustache}} templates with JavaScript
* http://github.com/janl/mustache.js
*/

(function($) {
	
var Mustache = (typeof module !== "undefined" && module.exports) || {};

(function (exports) {

  exports.name = "mustache.js";
  exports.version = "0.5.0-dev";
  exports.tags = ["{{", "}}"];
  exports.parse = parse;
  exports.compile = compile;
  exports.render = render;
  exports.clearCache = clearCache;

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  var _toString = Object.prototype.toString;
  var _isArray = Array.isArray;
  var _forEach = Array.prototype.forEach;
  var _trim = String.prototype.trim;

  var isArray;
  if (_isArray) {
    isArray = _isArray;
  } else {
    isArray = function (obj) {
      return _toString.call(obj) === "[object Array]";
    };
  }

  var forEach;
  if (_forEach) {
    forEach = function (obj, callback, scope) {
      return _forEach.call(obj, callback, scope);
    };
  } else {
    forEach = function (obj, callback, scope) {
      for (var i = 0, len = obj.length; i < len; ++i) {
        callback.call(scope, obj[i], i, obj);
      }
    };
  }

  var spaceRe = /^\s*$/;

  function isWhitespace(string) {
    return spaceRe.test(string);
  }

  var trim;
  if (_trim) {
    trim = function (string) {
      return string == null ? "" : _trim.call(string);
    };
  } else {
    var trimLeft, trimRight;

    if (isWhitespace("\xA0")) {
      trimLeft = /^\s+/;
      trimRight = /\s+$/;
    } else {
      // IE doesn't match non-breaking spaces with \s, thanks jQuery.
      trimLeft = /^[\s\xA0]+/;
      trimRight = /[\s\xA0]+$/;
    }

    trim = function (string) {
      return string == null ? "" :
        String(string).replace(trimLeft, "").replace(trimRight, "");
    };
  }

  var escapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;'
  };

  function escapeHTML(string) {
    return String(string).replace(/&(?!\w+;)|[<>"']/g, function (s) {
      return escapeMap[s] || s;
    });
  }

  /**
* Adds the `template`, `line`, and `file` properties to the given error
* object and alters the message to provide more useful debugging information.
*/
  function debug(e, template, line, file) {
    file = file || "<template>";

    var lines = template.split("\n"),
        start = Math.max(line - 3, 0),
        end = Math.min(lines.length, line + 3),
        context = lines.slice(start, end);

    var c;
    for (var i = 0, len = context.length; i < len; ++i) {
      c = i + start + 1;
      context[i] = (c === line ? " >> " : " ") + context[i];
    }

    e.template = template;
    e.line = line;
    e.file = file;
    e.message = [file + ":" + line, context.join("\n"), "", e.message].join("\n");

    return e;
  }

  /**
* Looks up the value of the given `name` in the given context `stack`.
*/
  function lookup(name, stack, defaultValue) {
    if (name === ".") {
      return stack[stack.length - 1];
    }

    var names = name.split(".");
    var lastIndex = names.length - 1;
    var target = names[lastIndex];

    var value, context, i = stack.length, j, localStack;
    while (i) {
      localStack = stack.slice(0);
      context = stack[--i];

      j = 0;
      while (j < lastIndex) {
        context = context[names[j++]];

        if (context == null) {
          break;
        }

        localStack.push(context);
      }

      if (context && typeof context === "object" && target in context) {
        value = context[target];
        break;
      }
    }

    // If the value is a function, call it in the current context.
    if (typeof value === "function") {
      value = value.call(localStack[localStack.length - 1]);
    }

    if (value == null) {
      return defaultValue;
    }

    return value;
  }

  function renderSection(name, stack, callback, inverted) {
    var buffer = "";
    var value = lookup(name, stack);

    if (inverted) {
      // From the spec: inverted sections may render text once based on the
      // inverse value of the key. That is, they will be rendered if the key
      // doesn't exist, is false, or is an empty list.
      if (value == null || value === false || (isArray(value) && value.length === 0)) {
        buffer += callback();
      }
    } else if (isArray(value)) {
      forEach(value, function (value) {
        stack.push(value);
        buffer += callback();
        stack.pop();
      });
    } else if (typeof value === "object") {
      stack.push(value);
      buffer += callback();
      stack.pop();
    } else if (typeof value === "function") {
      var scope = stack[stack.length - 1];
      var scopedRender = function (template) {
        return render(template, scope);
      };
      buffer += value.call(scope, callback(), scopedRender) || "";
    } else if (value) {
      buffer += callback();
    }

    return buffer;
  }

  /**
* Parses the given `template` and returns the source of a function that,
* with the proper arguments, will render the template. Recognized options
* include the following:
*
* - file The name of the file the template comes from (displayed in
* error messages)
* - tags An array of open and close tags the `template` uses. Defaults
* to the value of Mustache.tags
* - debug Set `true` to log the body of the generated function to the
* console
* - space Set `true` to preserve whitespace from lines that otherwise
* contain only a {{tag}}. Defaults to `false`
*/
  function parse(template, options) {
    options = options || {};

    var tags = options.tags || exports.tags,
        openTag = tags[0],
        closeTag = tags[tags.length - 1];

    var code = [
      'var buffer = "";', // output buffer
      "\nvar line = 1;", // keep track of source line number
      "\ntry {",
      '\nbuffer += "'
    ];

    var spaces = [], // indices of whitespace in code on the current line
        hasTag = false, // is there a {{tag}} on the current line?
        nonSpace = false; // is there a non-space char on the current line?

    // Strips all space characters from the code array for the current line
    // if there was a {{tag}} on it and otherwise only spaces.
    var stripSpace = function () {
      if (hasTag && !nonSpace && !options.space) {
        while (spaces.length) {
          code.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    };

    var sectionStack = [], updateLine, nextOpenTag, nextCloseTag;

    var setTags = function (source) {
      tags = trim(source).split(/\s+/);
      nextOpenTag = tags[0];
      nextCloseTag = tags[tags.length - 1];
    };

    var includePartial = function (source) {
      code.push(
        '";',
        updateLine,
        '\nvar partial = partials["' + trim(source) + '"];',
        '\nif (partial) {',
        '\n buffer += render(partial,stack[stack.length - 1],partials);',
        '\n}',
        '\nbuffer += "'
      );
    };

    var openSection = function (source, inverted) {
      var name = trim(source);

      if (name === "") {
        throw debug(new Error("Section name may not be empty"), template, line, options.file);
      }

      sectionStack.push({name: name, inverted: inverted});

      code.push(
        '";',
        updateLine,
        '\nvar name = "' + name + '";',
        '\nvar callback = (function () {',
        '\n return function () {',
        '\n var buffer = "";',
        '\nbuffer += "'
      );
    };

    var openInvertedSection = function (source) {
      openSection(source, true);
    };

    var closeSection = function (source) {
      var name = trim(source);
      var openName = sectionStack.length != 0 && sectionStack[sectionStack.length - 1].name;

      if (!openName || name != openName) {
        throw debug(new Error('Section named "' + name + '" was never opened'), template, line, options.file);
      }

      var section = sectionStack.pop();

      code.push(
        '";',
        '\n return buffer;',
        '\n };',
        '\n})();'
      );

      if (section.inverted) {
        code.push("\nbuffer += renderSection(name,stack,callback,true);");
      } else {
        code.push("\nbuffer += renderSection(name,stack,callback);");
      }

      code.push('\nbuffer += "');
    };

    var sendPlain = function (source) {
      code.push(
        '";',
        updateLine,
        '\nbuffer += lookup("' + trim(source) + '",stack,"");',
        '\nbuffer += "'
      );
    };

    var sendEscaped = function (source) {
      code.push(
        '";',
        updateLine,
        '\nbuffer += escapeHTML(lookup("' + trim(source) + '",stack,""));',
        '\nbuffer += "'
      );
    };

    var line = 1, c, callback;
    for (var i = 0, len = template.length; i < len; ++i) {
      if (template.slice(i, i + openTag.length) === openTag) {
        i += openTag.length;
        c = template.substr(i, 1);
        updateLine = '\nline = ' + line + ';';
        nextOpenTag = openTag;
        nextCloseTag = closeTag;
        hasTag = true;

        switch (c) {
        case "!": // comment
          i++;
          callback = null;
          break;
        case "=": // change open/close tags, e.g. {{=<% %>=}}
          i++;
          closeTag = "=" + closeTag;
          callback = setTags;
          break;
        case ">": // include partial
          i++;
          callback = includePartial;
          break;
        case "#": // start section
          i++;
          callback = openSection;
          break;
        case "^": // start inverted section
          i++;
          callback = openInvertedSection;
          break;
        case "/": // end section
          i++;
          callback = closeSection;
          break;
        case "{": // plain variable
          closeTag = "}" + closeTag;
          // fall through
        case "&": // plain variable
          i++;
          nonSpace = true;
          callback = sendPlain;
          break;
        default: // escaped variable
          nonSpace = true;
          callback = sendEscaped;
        }

        var end = template.indexOf(closeTag, i);

        if (end === -1) {
          throw debug(new Error('Tag "' + openTag + '" was not closed properly'), template, line, options.file);
        }

        var source = template.substring(i, end);

        if (callback) {
          callback(source);
        }

        // Maintain line count for \n in source.
        var n = 0;
        while (~(n = source.indexOf("\n", n))) {
          line++;
          n++;
        }

        i = end + closeTag.length - 1;
        openTag = nextOpenTag;
        closeTag = nextCloseTag;
      } else {
        c = template.substr(i, 1);

        switch (c) {
        case '"':
        case "\\":
          nonSpace = true;
          code.push("\\" + c);
          break;
        case "\r":
          // Ignore carriage returns.
          break;
        case "\n":
          spaces.push(code.length);
          code.push("\\n");
          stripSpace(); // Check for whitespace on the current line.
          line++;
          break;
        default:
          if (isWhitespace(c)) {
            spaces.push(code.length);
          } else {
            nonSpace = true;
          }

          code.push(c);
        }
      }
    }

    if (sectionStack.length != 0) {
      throw debug(new Error('Section "' + sectionStack[sectionStack.length - 1].name + '" was not closed properly'), template, line, options.file);
    }

    // Clean up any whitespace from a closing {{tag}} that was at the end
    // of the template without a trailing \n.
    stripSpace();

    code.push(
      '";',
      "\nreturn buffer;",
      "\n} catch (e) { throw {error: e, line: line}; }"
    );

    // Ignore `buffer += "";` statements.
    var body = code.join("").replace(/buffer \+= "";\n/g, "");

    if (options.debug) {
      if (typeof console != "undefined" && console.log) {
        console.log(body);
      } else if (typeof print === "function") {
        print(body);
      }
    }

    return body;
  }

  /**
* Used by `compile` to generate a reusable function for the given `template`.
*/
  function _compile(template, options) {
    var args = "view,partials,stack,lookup,escapeHTML,renderSection,render";
    var body = parse(template, options);
    var fn = new Function(args, body);

    // This anonymous function wraps the generated function so we can do
    // argument coercion, setup some variables, and handle any errors
    // encountered while executing it.
    return function (view, partials) {
      partials = partials || {};

      var stack = [view]; // context stack

      try {
        return fn(view, partials, stack, lookup, escapeHTML, renderSection, render);
      } catch (e) {
        throw debug(e.error, template, e.line, options.file);
      }
    };
  }

  // Cache of pre-compiled templates.
  var _cache = {};

  /**
* Clear the cache of compiled templates.
*/
  function clearCache() {
    _cache = {};
  }

  /**
* Compiles the given `template` into a reusable function using the given
* `options`. In addition to the options accepted by Mustache.parse,
* recognized options include the following:
*
* - cache Set `false` to bypass any pre-compiled version of the given
* template. Otherwise, a given `template` string will be cached
* the first time it is parsed
*/
  function compile(template, options) {
    options = options || {};

    // Use a pre-compiled version from the cache if we have one.
    if (options.cache !== false) {
      if (!_cache[template]) {
        _cache[template] = _compile(template, options);
      }

      return _cache[template];
    }

    return _compile(template, options);
  }

  /**
* High-level function that renders the given `template` using the given
* `view` and `partials`. If you need to use any of the template options (see
* `compile` above), you must compile in a separate step, and then call that
* compiled function.
*/
  function render(template, view, partials) {
    return compile(template)(view, partials);
  }

})(Mustache);


$.mustache = function (template, view, partials) {
    return Mustache.render(template, view, partials);
  };

  $.fn.mustache = function (view, partials) {
    return $(this).map(function (i, elm) {
      var template = $(elm).html().trim();
      var output = $.mustache(template, view, partials);
      return $(output).get();
    });
  };

})(jQuery);


/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

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
						// We can't use 'triggerHandler' here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// 'set' can not return 'undefined'; see http://jsapi.info/jquery/1.7.1/val#L2363
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
				// If 'clearPlaceholder' was called from '$.valHooks.input.set'
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

}(this, document, jQuery));
/*
* rwdImageMaps jQuery plugin v1.5
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2013 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*/
;(function($) {
	$.fn.rwdImageMaps = function() {
		var $img = this;
		
		var rwdImageMap = function() {
			$img.each(function() {
				if (typeof($(this).attr('usemap')) == 'undefined')
					return;
				
				var that = this,
					$that = $(that);
				
				// Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
				$('<img />').load(function() {
					var attrW = 'width',
						attrH = 'height',
						w = $that.attr(attrW),
						h = $that.attr(attrH);
					
					if (!w || !h) {
						var temp = new Image();
						temp.src = $that.attr('src');
						if (!w)
							w = temp.width;
						if (!h)
							h = temp.height;
					}
					
					var wPercent = $that.width()/100,
						hPercent = $that.height()/100,
						map = $that.attr('usemap').replace('#', ''),
						c = 'coords';
					
					$('map[name="' + map + '"]').find('area').each(function() {
						var $this = $(this);
						if (!$this.data(c))
							$this.data(c, $this.attr(c));
						
						var coords = $this.data(c).split(','),
							coordsPercent = new Array(coords.length);
						
						for (var i = 0; i < coordsPercent.length; ++i) {
							if (i % 2 === 0)
								coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
							else
								coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
						}
						$this.attr(c, coordsPercent.toString());
					});
				}).attr('src', $that.attr('src'));
			});
		};
		$(window).resize(rwdImageMap).trigger('resize');
		
		return this;
	};
})(jQuery);
/* ===========================================================
* jquery.tooltip.js
* Based on bootstrap-tooltip.js
* http://twitter.github.com/bootstrap/javascript.html#tooltips
* Inspired by the original jQuery.tipsy by Jason Frame
* Modified for rue21 by KnowledgePath Solutions.
* ===========================================================
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


(function ($) {

	"use strict";

	var Tooltip = function (element, options) {
		this.init('tooltip', element, options);
	};

	Tooltip.prototype = {

		constructor: Tooltip,
		init: function (type, element, options) {

			this.$element = $(element);
			this.options = this.getOptions(options, type);
			this.$tip = $(this.options.template);
			this.enabled = true;
			this.fixTitle();
			this.listen();

		},
		getOptions: function (options, type) {
			options = $.extend({}, $.fn[type].defaults, options, this.$element.data());
			if (options.delay && typeof options.delay === 'number') {
				options.delay = {
					show: options.delay,
					hide: options.delay
				};
			}
			return options;
		},
		enter: function (e) {
			var that = this;
			if (!this.options.delay || !this.options.delay.show) {
				this.show();
			} else {
				that.hoverState = 'in';
				setTimeout(function () {
					if (that.hoverState === 'in') {
						that.show();
					}
				}, that.options.delay.show);
			}
		},
		leave: function (e) {
			var that = this;
			if (!that.options.delay || !that.options.delay.hide) {
				that.hide();
			} else {
				that.hoverState = 'out';
				setTimeout(function () {
					if (that.hoverState === 'out') {
						that.hide();
					}
				}, that.options.delay.hide);
			}
		},
		show: function () {
			var pos,
				title = this.getTitle(),
				that = this;

			if (title && this.enabled) {
				this.setContent(title);

				if (this.options.animation) {
					this.$tip.addClass('fade');
				}

				this.$tip
					.remove()
					.css({ top: 0, left: 0, display: 'block' })
					.appendTo(this.options.inside ? this.$element.offsetParent() : document.body);

				pos = this.getPosition(this.options.inside);
				this.$tip
					.css(pos)
					.addClass(this.options.placement)
					.addClass('in');
			}
		},
		setContent: function (title) {
			this.$tip.find('.tooltip-body').html(title).removeClass('fade in top bottom left right');
		},
		hide: function () {
			var that = this;
			this.$tip.remove().removeClass('in');
		},
		fixTitle: function () {
			var title = this.$element.attr('title');
			if (title || typeof (this.$element.attr('data-original-title')) !== 'string') {
				this.$element.attr('data-original-title', title || '').removeAttr('title');
			}
		},
		rePosition: function () {
			var pos = this.getPosition(this.options.inside);
			this.$tip.css(pos);
		},
		getPosition: function (inside) {
			var pos = $.extend({}, (inside ? this.$element.position() : this.$element.offset()), {
				width: this.$element[0].offsetWidth,
				height: this.$element[0].offsetHeight
			}),
			tp = {},
			actualWidth = this.$tip[0].offsetWidth,
			actualHeight = this.$tip[0].offsetHeight;

			switch (this.options.placement) {
			case 'bottom':
				tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2};
				break;
			case 'top':
				tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2};
				break;
			case 'left':
				tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth};
				break;
			case 'right':
				tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width};
				break;
			}
			return tp;
		},
		getTitle: function () {
			var title;
			title = this.$element.attr('data-original-title') || this.options.title;
			title = title.toString().replace(/(^\s*|\s*$)/, "");
			return title;
		},
		enable: function () {
			this.enabled = true;
		},
		disable: function () {
			this.enabled = false;
		},
		toggleEnabled: function () {
			this.enabled = !this.enabled;
		},
		toggle: function () {
			var that = this,
				action = this.$tip.hasClass('in') ? 'hide' : 'show';
			this[action]();
			if (action == 'show') {
				setTimeout(function () {
					// after this tool tip is open. add an event listener to close it if you click anywhere on the page (including the tooltip)
					$('html').one('click', function(e) {
						that.hide();
					});
				}, 1);
			}
		},
		listen: function () {

			var eventIn,
				eventOut;

			if (this.options.trigger == 'click') {
				this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
			} else if (this.options.trigger != 'manual') {
				eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus';
				eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur';
				this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
				this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
			}
		}
	};

	$.fn.tooltip = function (option) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('tooltip'),
				options = typeof option === 'object' && option;
			if (!data) {
				$this.data('tooltip', (data = new Tooltip(this, options)));
			}
			if (typeof option === 'string') {
				data[option]();
			}
		});
	};

	$.fn.tooltip.Constructor = Tooltip;

	$.fn.tooltip.defaults = {
		animation: true,
		delay: 0,
		selector: false,
		placement: 'top',
		trigger: 'manual',
		title: '',
		template: '<div class="tooltip"><div class="tooltip-body"></div></div>'
	};



	var Alert = function (element, options) {
		this.init('alert', element, options);
	};

	/* NOTE: EXTENDS TOOLTIP
		========================================== */

	Alert.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

		constructor: Alert,
		setContent: function () {
			var $tip = this.$tip,
				content = this.getTitle();
			$tip.find('.tooltip-alert-message')[$.type(content) === 'object' ? 'append' : 'html'](content);
			$tip.removeClass('fade top bottom left right in');
		},
		getTitle: function () {
			var content;
			content = this.$element.attr('data-error-message') || this.options.title;
			content = content.toString().replace(/(^\s*|\s*$)/, "");
			return content;
		},
		listen: function() {
			var that = this;
			$(window).resize(function() {
				that.rePosition();
			});
		}
	});

	$.fn.alert = function (option) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('alert'),
				options = typeof option === 'object' && option;
			if (!data) {
				$this.data('alert', (data = new Alert(this, options)));
			}
			if (typeof option === 'string') {
				data[option]();
			}
		});
	};

	$.fn.alert.Constructor = Alert;

	$.fn.alert.defaults = $.extend({}, $.fn.tooltip.defaults, {
		placement: 'right',
		title: '',
		inside: true,
		template: '<small class="error"><div class="tooltip-alert"><div class="tooltip-alert-message"></div></div></small>'
	});

	var Popover = function (element, options) {
		this.init('popover', element, options);
	};

	/* NOTE: POPOVER EXTENDS TOOLTIP
		========================================== */

	Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

		constructor: Popover,
		setContent: function () {
			var $tip = this.$tip,
				title = this.getTitle(),
				content = this.getContent();

			$tip.find('.popover-title')[$.type(title) === 'object' ? 'append' : 'html'](title);
			$tip.find('.popover-content > *')[$.type(content) === 'object' ? 'append' : 'html'](content);
			$tip.removeClass('fade top bottom left right in');
		},
		hasContent: function () {
			return this.getTitle() || this.getContent();
		},
		getContent: function () {
			var content;
			content = this.$element.attr('data-content') || this.options.content;
			content = content.toString().replace(/(^\s*|\s*$)/, "");
			return content;
		}

	});

	$.fn.popover = function (option) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('popover'),
				options = typeof option === 'object' && option;
			if (!data) {
				$this.data('popover', (data = new Popover(this, options)));
			}
			if (typeof option === 'string') {
				data[option]();
			}
		});
	};

	$.fn.popover.Constructor = Popover;

	$.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
		placement: 'right',
		content: '',
		template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
	});

}(window.jQuery));
(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(e){var o="left",n="right",d="up",v="down",c="in",w="out",l="none",r="auto",k="swipe",s="pinch",x="tap",i="doubletap",b="longtap",A="horizontal",t="vertical",h="all",q=10,f="start",j="move",g="end",p="cancel",a="ontouchstart" in window,y="TouchSwipe";var m={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(D){var C=e(this),B=C.data(y);if(B&&typeof D==="string"){if(B[D]){return B[D].apply(this,Array.prototype.slice.call(arguments,1))}else{e.error("Method "+D+" does not exist on jQuery.swipe")}}else{if(!B&&(typeof D==="object"||!D)){return u.apply(this,arguments)}}return C};e.fn.swipe.defaults=m;e.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:j,PHASE_END:g,PHASE_CANCEL:p};e.fn.swipe.directions={LEFT:o,RIGHT:n,UP:d,DOWN:v,IN:c,OUT:w};e.fn.swipe.pageScroll={NONE:l,HORIZONTAL:A,VERTICAL:t,AUTO:r};e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function u(B){if(B&&(B.allowPageScroll===undefined&&(B.swipe!==undefined||B.swipeStatus!==undefined))){B.allowPageScroll=l}if(B.click!==undefined&&B.tap===undefined){B.tap=B.click}if(!B){B={}}B=e.extend({},e.fn.swipe.defaults,B);return this.each(function(){var D=e(this);var C=D.data(y);if(!C){C=new z(this,B);D.data(y,C)}})}function z(a0,aq){var av=(a||!aq.fallbackToMouseEvents),G=av?"touchstart":"mousedown",au=av?"touchmove":"mousemove",R=av?"touchend":"mouseup",P=av?null:"mouseleave",az="touchcancel";var ac=0,aL=null,Y=0,aX=0,aV=0,D=1,am=0,aF=0,J=null;var aN=e(a0);var W="start";var T=0;var aM=null;var Q=0,aY=0,a1=0,aa=0,K=0;var aS=null;try{aN.bind(G,aJ);aN.bind(az,a5)}catch(ag){e.error("events not supported "+G+","+az+" on jQuery.swipe")}this.enable=function(){aN.bind(G,aJ);aN.bind(az,a5);return aN};this.disable=function(){aG();return aN};this.destroy=function(){aG();aN.data(y,null);return aN};this.option=function(a8,a7){if(aq[a8]!==undefined){if(a7===undefined){return aq[a8]}else{aq[a8]=a7}}else{e.error("Option "+a8+" does not exist on jQuery.swipe.options")}return null};function aJ(a9){if(ax()){return}if(e(a9.target).closest(aq.excludedElements,aN).length>0){return}var ba=a9.originalEvent?a9.originalEvent:a9;var a8,a7=a?ba.touches[0]:ba;W=f;if(a){T=ba.touches.length}else{a9.preventDefault()}ac=0;aL=null;aF=null;Y=0;aX=0;aV=0;D=1;am=0;aM=af();J=X();O();if(!a||(T===aq.fingers||aq.fingers===h)||aT()){ae(0,a7);Q=ao();if(T==2){ae(1,ba.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}if(aq.swipeStatus||aq.pinchStatus){a8=L(ba,W)}}else{a8=false}if(a8===false){W=p;L(ba,W);return a8}else{ak(true)}return null}function aZ(ba){var bd=ba.originalEvent?ba.originalEvent:ba;if(W===g||W===p||ai()){return}var a9,a8=a?bd.touches[0]:bd;var bb=aD(a8);aY=ao();if(a){T=bd.touches.length}W=j;if(T==2){if(aX==0){ae(1,bd.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}else{aD(bd.touches[1]);aV=ap(aM[0].end,aM[1].end);aF=an(aM[0].end,aM[1].end)}D=a3(aX,aV);am=Math.abs(aX-aV)}if((T===aq.fingers||aq.fingers===h)||!a||aT()){aL=aH(bb.start,bb.end);ah(ba,aL);ac=aO(bb.start,bb.end);Y=aI();aE(aL,ac);if(aq.swipeStatus||aq.pinchStatus){a9=L(bd,W)}if(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave){var a7=true;if(aq.triggerOnTouchLeave){var bc=aU(this);a7=B(bb.end,bc)}if(!aq.triggerOnTouchEnd&&a7){W=ay(j)}else{if(aq.triggerOnTouchLeave&&!a7){W=ay(g)}}if(W==p||W==g){L(bd,W)}}}else{W=p;L(bd,W)}if(a9===false){W=p;L(bd,W)}}function I(a7){var a8=a7.originalEvent;if(a){if(a8.touches.length>0){C();return true}}if(ai()){T=aa}a7.preventDefault();aY=ao();Y=aI();if(a6()){W=p;L(a8,W)}else{if(aq.triggerOnTouchEnd||(aq.triggerOnTouchEnd==false&&W===j)){W=g;L(a8,W)}else{if(!aq.triggerOnTouchEnd&&a2()){W=g;aB(a8,W,x)}else{if(W===j){W=p;L(a8,W)}}}}ak(false);return null}function a5(){T=0;aY=0;Q=0;aX=0;aV=0;D=1;O();ak(false)}function H(a7){var a8=a7.originalEvent;if(aq.triggerOnTouchLeave){W=ay(g);L(a8,W)}}function aG(){aN.unbind(G,aJ);aN.unbind(az,a5);aN.unbind(au,aZ);aN.unbind(R,I);if(P){aN.unbind(P,H)}ak(false)}function ay(bb){var ba=bb;var a9=aw();var a8=aj();var a7=a6();if(!a9||a7){ba=p}else{if(a8&&bb==j&&(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave)){ba=g}else{if(!a8&&bb==g&&aq.triggerOnTouchLeave){ba=p}}}return ba}function L(a9,a7){var a8=undefined;if(F()||S()){a8=aB(a9,a7,k)}else{if((M()||aT())&&a8!==false){a8=aB(a9,a7,s)}}if(aC()&&a8!==false){a8=aB(a9,a7,i)}else{if(al()&&a8!==false){a8=aB(a9,a7,b)}else{if(ad()&&a8!==false){a8=aB(a9,a7,x)}}}if(a7===p){a5(a9)}if(a7===g){if(a){if(a9.touches.length==0){a5(a9)}}else{a5(a9)}}return a8}function aB(ba,a7,a9){var a8=undefined;if(a9==k){aN.trigger("swipeStatus",[a7,aL||null,ac||0,Y||0,T]);if(aq.swipeStatus){a8=aq.swipeStatus.call(aN,ba,a7,aL||null,ac||0,Y||0,T);if(a8===false){return false}}if(a7==g&&aR()){aN.trigger("swipe",[aL,ac,Y,T]);if(aq.swipe){a8=aq.swipe.call(aN,ba,aL,ac,Y,T);if(a8===false){return false}}switch(aL){case o:aN.trigger("swipeLeft",[aL,ac,Y,T]);if(aq.swipeLeft){a8=aq.swipeLeft.call(aN,ba,aL,ac,Y,T)}break;case n:aN.trigger("swipeRight",[aL,ac,Y,T]);if(aq.swipeRight){a8=aq.swipeRight.call(aN,ba,aL,ac,Y,T)}break;case d:aN.trigger("swipeUp",[aL,ac,Y,T]);if(aq.swipeUp){a8=aq.swipeUp.call(aN,ba,aL,ac,Y,T)}break;case v:aN.trigger("swipeDown",[aL,ac,Y,T]);if(aq.swipeDown){a8=aq.swipeDown.call(aN,ba,aL,ac,Y,T)}break}}}if(a9==s){aN.trigger("pinchStatus",[a7,aF||null,am||0,Y||0,T,D]);if(aq.pinchStatus){a8=aq.pinchStatus.call(aN,ba,a7,aF||null,am||0,Y||0,T,D);if(a8===false){return false}}if(a7==g&&a4()){switch(aF){case c:aN.trigger("pinchIn",[aF||null,am||0,Y||0,T,D]);if(aq.pinchIn){a8=aq.pinchIn.call(aN,ba,aF||null,am||0,Y||0,T,D)}break;case w:aN.trigger("pinchOut",[aF||null,am||0,Y||0,T,D]);if(aq.pinchOut){a8=aq.pinchOut.call(aN,ba,aF||null,am||0,Y||0,T,D)}break}}}if(a9==x){if(a7===p||a7===g){clearTimeout(aS);if(V()&&!E()){K=ao();aS=setTimeout(e.proxy(function(){K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}},this),aq.doubleTapThreshold)}else{K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}}}}else{if(a9==i){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("doubletap",[ba.target]);if(aq.doubleTap){a8=aq.doubleTap.call(aN,ba,ba.target)}}}else{if(a9==b){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("longtap",[ba.target]);if(aq.longTap){a8=aq.longTap.call(aN,ba,ba.target)}}}}}return a8}function aj(){var a7=true;if(aq.threshold!==null){a7=ac>=aq.threshold}return a7}function a6(){var a7=false;if(aq.cancelThreshold!==null&&aL!==null){a7=(aP(aL)-ac)>=aq.cancelThreshold}return a7}function ab(){if(aq.pinchThreshold!==null){return am>=aq.pinchThreshold}return true}function aw(){var a7;if(aq.maxTimeThreshold){if(Y>=aq.maxTimeThreshold){a7=false}else{a7=true}}else{a7=true}return a7}function ah(a7,a8){if(aq.allowPageScroll===l||aT()){a7.preventDefault()}else{var a9=aq.allowPageScroll===r;switch(a8){case o:if((aq.swipeLeft&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case n:if((aq.swipeRight&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case d:if((aq.swipeUp&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break;case v:if((aq.swipeDown&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break}}}function a4(){var a8=aK();var a7=U();var a9=ab();return a8&&a7&&a9}function aT(){return !!(aq.pinchStatus||aq.pinchIn||aq.pinchOut)}function M(){return !!(a4()&&aT())}function aR(){var ba=aw();var bc=aj();var a9=aK();var a7=U();var a8=a6();var bb=!a8&&a7&&a9&&bc&&ba;return bb}function S(){return !!(aq.swipe||aq.swipeStatus||aq.swipeLeft||aq.swipeRight||aq.swipeUp||aq.swipeDown)}function F(){return !!(aR()&&S())}function aK(){return((T===aq.fingers||aq.fingers===h)||!a)}function U(){return aM[0].end.x!==0}function a2(){return !!(aq.tap)}function V(){return !!(aq.doubleTap)}function aQ(){return !!(aq.longTap)}function N(){if(K==null){return false}var a7=ao();return(V()&&((a7-K)<=aq.doubleTapThreshold))}function E(){return N()}function at(){return((T===1||!a)&&(isNaN(ac)||ac===0))}function aW(){return((Y>aq.longTapThreshold)&&(ac<q))}function ad(){return !!(at()&&a2())}function aC(){return !!(N()&&V())}function al(){return !!(aW()&&aQ())}function C(){a1=ao();aa=event.touches.length+1}function O(){a1=0;aa=0}function ai(){var a7=false;if(a1){var a8=ao()-a1;if(a8<=aq.fingerReleaseThreshold){a7=true}}return a7}function ax(){return !!(aN.data(y+"_intouch")===true)}function ak(a7){if(a7===true){aN.bind(au,aZ);aN.bind(R,I);if(P){aN.bind(P,H)}}else{aN.unbind(au,aZ,false);aN.unbind(R,I,false);if(P){aN.unbind(P,H,false)}}aN.data(y+"_intouch",a7===true)}function ae(a8,a7){var a9=a7.identifier!==undefined?a7.identifier:0;aM[a8].identifier=a9;aM[a8].start.x=aM[a8].end.x=a7.pageX||a7.clientX;aM[a8].start.y=aM[a8].end.y=a7.pageY||a7.clientY;return aM[a8]}function aD(a7){var a9=a7.identifier!==undefined?a7.identifier:0;var a8=Z(a9);a8.end.x=a7.pageX||a7.clientX;a8.end.y=a7.pageY||a7.clientY;return a8}function Z(a8){for(var a7=0;a7<aM.length;a7++){if(aM[a7].identifier==a8){return aM[a7]}}}function af(){var a7=[];for(var a8=0;a8<=5;a8++){a7.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return a7}function aE(a7,a8){a8=Math.max(a8,aP(a7));J[a7].distance=a8}function aP(a7){if(J[a7]){return J[a7].distance}return undefined}function X(){var a7={};a7[o]=ar(o);a7[n]=ar(n);a7[d]=ar(d);a7[v]=ar(v);return a7}function ar(a7){return{direction:a7,distance:0}}function aI(){return aY-Q}function ap(ba,a9){var a8=Math.abs(ba.x-a9.x);var a7=Math.abs(ba.y-a9.y);return Math.round(Math.sqrt(a8*a8+a7*a7))}function a3(a7,a8){var a9=(a8/a7)*1;return a9.toFixed(2)}function an(){if(D<1){return w}else{return c}}function aO(a8,a7){return Math.round(Math.sqrt(Math.pow(a7.x-a8.x,2)+Math.pow(a7.y-a8.y,2)))}function aA(ba,a8){var a7=ba.x-a8.x;var bc=a8.y-ba.y;var a9=Math.atan2(bc,a7);var bb=Math.round(a9*180/Math.PI);if(bb<0){bb=360-Math.abs(bb)}return bb}function aH(a8,a7){var a9=aA(a8,a7);if((a9<=45)&&(a9>=0)){return o}else{if((a9<=360)&&(a9>=315)){return o}else{if((a9>=135)&&(a9<=225)){return n}else{if((a9>45)&&(a9<135)){return v}else{return d}}}}}function ao(){var a7=new Date();return a7.getTime()}function aU(a7){a7=e(a7);var a9=a7.offset();var a8={left:a9.left,right:a9.left+a7.outerWidth(),top:a9.top,bottom:a9.top+a7.outerHeight()};return a8}function B(a7,a8){return(a7.x>a8.left&&a7.x<a8.right&&a7.y>a8.top&&a7.y<a8.bottom)}}}));
(function ($,messages){

	"use strict";

	function testPattern (value, pattern) {
		var regExp = new RegExp(pattern, "");
		return regExp.test(value);
	}

	/**--------------------------
	//* Validate Date Field script- By JavaScriptKit.com
	//* For this script and 100s more, visit http://www.javascriptkit.com
	//* This notice must stay intact for usage
	---------------------------**/
	function checkdate(input){
		var validformat=/^\d{2}\/\d{2}\/\d{4}$/; //Basic check for format validity
		var returnval=false;
		if (!validformat.test(input))
			returnval=false;
		else{ //Detailed check for valid date ranges
			var monthfield=input.split("/")[0];
			var dayfield=input.split("/")[1];
			var yearfield=input.split("/")[2];
			var dayobj = new Date(yearfield, monthfield-1, dayfield);
			if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield))
				returnval = false;
			else{
				returnval =true;
			}
		}
		return returnval;
	}

	var Validate = function ( element, options ) {
			this.init (element, options);
		},
		rules = {
			email : {
				check: function (value, field) {
					if (value) {
						return testPattern (value,"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,})+$");
					}
					return true;
				},
				msg : function () {
					return messages.email;
				}
			},
			uspostal : {
				check: function (value, field) {
					if (value) {
						/*return testPattern (value, "^\\d{5}(-\\d{4})?$");*/
						return testPattern (value, "^\\d{5}$");
					}
					return true;
				},
				msg : function () {
					return messages.uspostal;
				}
			},
			usphone : {
				check: function(value, field) {
					if (value) {
						//return testPattern (value, "(?:(?:(\s*\(?([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\)?\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})");
						return testPattern (value, "[1-9][0-9]{9}");
					}
					return true;
				},
				msg : function () {
					return messages.usphone;
				}
			},
			numeric : {
				check: function(value, field) {
					if (value) {
						return testPattern (value, "^[0-9]+$");
					}
					return true;
				},
				msg : function (field) {
					var fieldName = field.attr('data-fieldname');
					if (fieldName != undefined && fieldName != '') {
						return fieldName + ' ' + messages.numeric.named;
					}
					return messages.numeric.unnamed;
				}
			},
			creditcard : {
				// accepts all numeric or masked card
				check: function(value, field) {
					var number,
						i, len,
						total = 0,
						doubled,
						digit;
					if (value) {
						number = value.replace(/ /g,'');
						if (isNaN(number)) {
							// ignore masked credit card number
							return testPattern (value, "^[X]+\\d{4}$");
						} else {
							// mod10 check on cc number
							len = number.length - 1;
							for (i = len; i >= 0; i--) {
								if ((len - i) % 2  == 0) {
									total += parseInt(number[i]);
								} else {
									doubled = 2 * number[i];
									while (doubled != 0) {
										digit = doubled % 10;
										doubled = parseInt(doubled / 10);
										total += digit;
									}
								}
							}
							if (total % 10 == 0) {
								return true;
							} else {
								return false;
							}
						}
					}
					return true;
				},
				msg : function () {
					return messages.creditcard;
				}
			},
			required : {
				check: function(value, field) {
					if ($.trim(value) != "") {
						return true;
					} else {
						return false;
					}
				},
				msg : function (field) {
					var fieldName = field.attr('data-fieldname');
					if (fieldName != undefined && fieldName != '') {
						return fieldName + ' ' + messages.required.named;
					}
					return messages.required.unnamed;
				}
			},
			minlength : {
				check : function (value, field) {
					var minlength = field.attr('min-length');
					if ($.trim(value).length >= minlength) {
						return true;
					} else {
						return false;
					}
				},
				msg : function (field) {
					var fieldName = field.attr('data-fieldname');
					if (fieldName != undefined && fieldName != '') {
						return fieldName + ' ' + messages.minlength.named;
					}
					return messages.minlength.unnamed;
				}
			},
			maxlength : {
				check : function (value, field) {
					var maxlength = field.attr('max-length');
					if ($.trim(value).length <= maxlength) {
						return true;
					} else {
						return false;
					}
				},
				msg : function (field) {
					var fieldName = field.attr('data-fieldname');
					if (fieldName != undefined && fieldName != '') {
						return fieldName + ' ' + messages.maxlength.named;
					}
					return messages.maxlength.unnamed;
				}
			},
			matchPassword : {
				check : function (value, field) {
					var matchField = field.attr('data-matchfield'),
						matchValue = '';
					if (matchField) {
						matchValue = this.$element.find(matchField).val();
					}
					if ($.trim(value) == $.trim(matchValue)) {
						return true;
					} else {
						return false;
					}
				},
				msg : function () {
					return messages.matchPassword;
				}
			},
			matchEmail : {
				check : function (value, field) {
					var matchField = field.attr('data-matchfield'),
						matchValue = '';
					if (matchField) {
						matchValue = this.$element.find(matchField).val();
					}
					if ($.trim(value) == $.trim(matchValue)) {
						return true;
					} else {
						return false;
					}
				},
				msg : function () {
					return messages.matchEmail;
				}
			},
			qty : {
				check: function(value, field) {
					if (value) {
						return testPattern (value, "^[1-9][0-9]{0,2}$");
					}
					return true;
				},
				msg : function () {
					return messages.qty;
				}
			},
			password : {
				check: function(value, field) {
					if (value) {
						return testPattern (value, "^.*(?=.{8,})(?=.*[0-9])(?=.*[A-Z]).*$");
					}
					return true;
				},
				msg : function () {
					return messages.password;
				}
			},
			validDateOfBirth : {
				check: function(value, field) {
					return checkdate(value);
				},
				msg : function () {
					return messages.dateOfBirthDate;
				}
			},
			validDateOfBirthAge : {
				check: function(value, field) {
					var birthday = +new Date(value);
					var age = (Date.now() - birthday) / 31557600000;
					if(age < 13 || age > 120){
						return false;
					}
					return true;
				},
				msg : function () {
					return messages.dateOfBirthAge;
				}
			},
			giftMessage : {
				check: function(value, field) {
					return value.length <= 240;
				},
				msg: function() {
					return messages.invalidGiftMessage;
				}
			}
		};

	Validate.prototype = {
		constructor: Validate,
		init: function init(element, options) {
			console.debug('init validate with options:');
			console.debug(Array.prototype.slice.call(arguments));
			var that = this;

			this.options = $.extend({}, $.fn.validate.defaults, options);
			this.$element = $(element);
			this.isValid = false;
			this.fields = this.$element.find('[data-validation]');

			this.$element.on('focusin', '[data-error-message]', function(e){
				that.hideFormAlerts();
				$(this).alert('show').one('keydown focusout',function(){
					$(this).alert('hide');
				});
			});
		},
		validateForm : function () {
			var x = 0, max = this.fields.length, $field,
				formErrors = {},
				fieldErrors = {}, fieldName;

			this.isValid = true;

			for (x, max; x < max; x++) {
				$field = $(this.fields[x]);
				fieldErrors = this.validateField($field);
				if ($.isEmptyObject(fieldErrors) == false) {
					fieldName = $field.attr('name');
					formErrors[fieldName] = fieldErrors;
				}
			}

			this.showFormErrors(formErrors);
		},
		validateField : function ($field){
			var value = $field.val(),
				types = $field.attr('data-validation').split(' '),
				fieldErrors = {},
				errors = [],
				rule;

			if ($field.prop('disabled') || $field.hasClass('disabled') || !$field.is(':visible')) {
				return;
			}

			// First run tests from validation
			for (var x = 0, max = types.length; x < max; x++) {
				rule = rules[types[x]];
				if (rule  && !rule.check.call(this, value, $field)) {
					errors.push(rule.msg($field));
					break;
				}
			}

			if (errors.length > 0) {
				this.isValid = false;
				fieldErrors.field = $field;
				fieldErrors.errors = errors;
			}

			return fieldErrors;
		},
		showFieldError : function (errorObj) {
			var errorMessageHtml = '',
				errors = errorObj.errors,
				fields = errorObj.fields,
				$alertTarget = errorObj.target;

			for (var e = 0, max = errors.length; e < max; e++) {
				errorMessageHtml += errors[e];
				//errorMessageHtml += '<p>' + errors[e] + '</p>';
			}

			for (var f = 0, max = fields.length; f < max; f++) {
				fields[f].addClass("error");
			}

			$alertTarget.attr('data-error-message', errorMessageHtml).alert('show');
			$('label[for=' + $alertTarget.attr('id') + ']').addClass('error');
			$alertTarget.siblings('small').addClass('error');

		},
		clearFieldError : function ($field) {
			var parent = $field.attr('data-parent');

			$field.removeClass("error");

			if (parent != undefined) {
				this.$element.find(parent).alert('hide').attr('data-error-message','');
			} else {
				$field.alert('hide').attr('data-error-message','').removeClass("error");
			}
		},
		clearFormErrors : function () {
			var that = this;

			this.$element.find('.error').each(function(){
				var $field = $(this);
				that.clearFieldError($field);
			});

			MAIN.errors = [];
		},
		showFormErrors : function (formErrors) {
			var errors = {},
				fieldError,
				$field,
				fieldName,
				$target,
				parent,
				fieldErrors,
				error,
				hasErrors = false;

			this.clearFormErrors();

			for (fieldError in formErrors) {
				if (formErrors.hasOwnProperty(fieldError)) {

					fieldName = fieldError;
					hasErrors = true;

					if ($.isArray(formErrors[fieldError])) {
						$field = this.$element.find("[name='" + fieldError + "']");
						fieldErrors = formErrors[fieldError];
					} else {
						$field = formErrors[fieldError].field;
						fieldErrors = formErrors[fieldError].errors;
					}

					parent = $field.attr('data-parent');

					if (parent != undefined) {
						fieldName = parent;
						$target = this.$element.find(parent);
					} else {
						$target = $field;
					}

					if (errors[fieldName] == undefined) {
						errors[fieldName] = {};
						errors[fieldName].target = {};
						errors[fieldName].fields = [];
						errors[fieldName].errors = [];
					}

					errors[fieldName].target = $target;
					errors[fieldName].fields.push($field);
					errors[fieldName].errors = dedup(errors[fieldName].errors.concat(fieldErrors));
				}
			}

			for (error in errors) {
				this.showFieldError(errors[error]);
			}
			if (hasErrors) {
				this.scrollToError();
			}

		},
		scrollToError : function () {
				var viewHeight = 0,
					bodyOffset = 0,
					errorOffset;
				if (typeof ( window.innerWidth ) == 'number' ) {
					viewHeight = window.innerHeight;
				} else if ( document.documentElement && document.documentElement.clientHeight ) {
					viewHeight = document.documentElement.clientHeight;
				}
				if( typeof( window.pageYOffset ) == 'number' ) {
					bodyOffset = window.pageYOffset;
				} else if ( document.body && document.body.scrollTop ) {
					bodyOffset = document.body.scrollTop;
				}
				errorOffset = $(this.$element.find('.error').get(0)).offset();
				if (errorOffset && errorOffset.top){
					if (bodyOffset > errorOffset.top || errorOffset.top > viewHeight + bodyOffset) {
						window.scrollTo(0, errorOffset.top);
					}
				}

		},
		hideFormAlerts : function () {
			var that = this;
			this.$element.find('.error').each(function(){
				var $field = $(this),
					parent = $field.attr('data-parent');

				if (parent != undefined) {
					that.$element.find(parent).alert('hide');
				} else {
					$field.alert('hide');
				}
			});
		},
		showFormAlerts : function () {
			var that = this;
			this.$element.find('.error').each(function(){
				var $field = $(this),
					parent = $field.attr('data-parent');

				if (parent != undefined) {
					that.$element.find(parent).alert('show');
				} else {
					$field.alert('show');
				}
			});
		}
	};


	/*  PLUGIN DEFINITION
	 * ============================== */

	$.fn.validate = function ( option ) {
		var args = Array.prototype.slice.call( arguments, 1 );
		return this.each(function () {
			var $this = $(this),
				data = $this.data('validate'),
				options = typeof option == 'object' && option;
			if (!data) {
				$this.data('validate', (data = new Validate(this, options)));
			}
			if (typeof option == 'string') {
				data[option].apply(data, args);
			}
		});
	};

	$.fn.validate.defaults = {

	};

	$.fn.validate.Constructor = Validate;


}(window.jQuery,window.MAIN_CONSTANTS.errorMessages));

/**
 * http://www.JSON.org/json2.js
 **/
if (! ("JSON" in window && window.JSON)){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());

/**
 * Copyright (c) 2010 Maxim Vasiliev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author Maxim Vasiliev
 * Date: 09.09.2010
 * Time: 19:02:33
 */


var form2js = (function()
{
	"use strict";

	/**
	 * Returns form values represented as Javascript object
	 * "name" attribute defines structure of resulting object
	 *
	 * @param rootNode {Element|String} root form element (or it's id) or array of root elements
	 * @param delimiter {String} structure parts delimiter defaults to '.'
	 * @param skipEmpty {Boolean} should skip empty text values, defaults to true
	 * @param nodeCallback {Function} custom function to get node value
	 * @param useIdIfEmptyName {Boolean} if true value of id attribute of field will be used if name of field is empty
	 */
	function form2js(rootNode, delimiter, skipEmpty, nodeCallback, useIdIfEmptyName)
	{
		if (typeof skipEmpty == 'undefined' || skipEmpty == null) skipEmpty = true;
		if (typeof delimiter == 'undefined' || delimiter == null) delimiter = '.';
		if (arguments.length < 5) useIdIfEmptyName = false;

		rootNode = typeof rootNode == 'string' ? document.getElementById(rootNode) : rootNode;

		var formValues = [],
			currNode,
			i = 0;

		/* If rootNode is array - combine values */
		if (rootNode.constructor == Array || (typeof NodeList != "undefined" && rootNode.constructor == NodeList))
		{
			while(currNode = rootNode[i++])
			{
				formValues = formValues.concat(getFormValues(currNode, nodeCallback, useIdIfEmptyName));
			}
		}
		else
		{
			formValues = getFormValues(rootNode, nodeCallback, useIdIfEmptyName);
		}

		return processNameValues(formValues, skipEmpty, delimiter);
	}

	/**
	 * Processes collection of { name: 'name', value: 'value' } objects.
	 * @param nameValues
	 * @param skipEmpty if true skips elements with value == '' or value == null
	 * @param delimiter
	 */
	function processNameValues(nameValues, skipEmpty, delimiter)
	{
		var result = {},
			arrays = {},
			i, j, k, l,
			value,
			nameParts,
			currResult,
			arrNameFull,
			arrName,
			arrIdx,
			namePart,
			name,
			_nameParts;

		for (i = 0; i < nameValues.length; i++)
		{
			value = nameValues[i].value;

			if (skipEmpty && (value === '' || value === null)) continue;

			name = nameValues[i].name;
			_nameParts = name.split(delimiter);
			nameParts = [];
			currResult = result;
			arrNameFull = '';

			for(j = 0; j < _nameParts.length; j++)
			{
				namePart = _nameParts[j].split('][');
				if (namePart.length > 1)
				{
					for(k = 0; k < namePart.length; k++)
					{
						if (k == 0)
						{
							namePart[k] = namePart[k] + ']';
						}
						else if (k == namePart.length - 1)
						{
							namePart[k] = '[' + namePart[k];
						}
						else
						{
							namePart[k] = '[' + namePart[k] + ']';
						}

						arrIdx = namePart[k].match(/([a-z_]+)?\[([a-z_][a-z0-9_]+?)\]/i);
						if (arrIdx)
						{
							for(l = 1; l < arrIdx.length; l++)
							{
								if (arrIdx[l]) nameParts.push(arrIdx[l]);
							}
						}
						else{
							nameParts.push(namePart[k]);
						}
					}
				}
				else
					nameParts = nameParts.concat(namePart);
			}

			for (j = 0; j < nameParts.length; j++)
			{
				namePart = nameParts[j];

				if (namePart.indexOf('[]') > -1 && j == nameParts.length - 1)
				{
					arrName = namePart.substr(0, namePart.indexOf('['));
					arrNameFull += arrName;

					if (!currResult[arrName]) currResult[arrName] = [];
					currResult[arrName].push(value);
				}
				else if (namePart.indexOf('[') > -1)
				{
					arrName = namePart.substr(0, namePart.indexOf('['));
					arrIdx = namePart.replace(/(^([a-z_]+)?\[)|(\]$)/gi, '');

					/* Unique array name */
					arrNameFull += '_' + arrName + '_' + arrIdx;

					/*
					 * Because arrIdx in field name can be not zero-based and step can be
					 * other than 1, we can't use them in target array directly.
					 * Instead we're making a hash where key is arrIdx and value is a reference to
					 * added array element
					 */

					if (!arrays[arrNameFull]) arrays[arrNameFull] = {};
					if (arrName != '' && !currResult[arrName]) currResult[arrName] = [];

					if (j == nameParts.length - 1)
					{
						if (arrName == '')
						{
							currResult.push(value);
							arrays[arrNameFull][arrIdx] = currResult[currResult.length - 1];
						}
						else
						{
							currResult[arrName].push(value);
							arrays[arrNameFull][arrIdx] = currResult[arrName][currResult[arrName].length - 1];
						}
					}
					else
					{
						if (!arrays[arrNameFull][arrIdx])
						{
							if ((/^[a-z_]+\[?/i).test(nameParts[j+1])) currResult[arrName].push({});
							else currResult[arrName].push([]);

							arrays[arrNameFull][arrIdx] = currResult[arrName][currResult[arrName].length - 1];
						}
					}

					currResult = arrays[arrNameFull][arrIdx];
				}
				else
				{
					arrNameFull += namePart;

					if (j < nameParts.length - 1) /* Not the last part of name - means object */
					{
						if (!currResult[namePart]) currResult[namePart] = {};
						currResult = currResult[namePart];
					}
					else
					{
						currResult[namePart] = value;
					}
				}
			}
		}

		return result;
	}

    function getFormValues(rootNode, nodeCallback, useIdIfEmptyName)
    {
        var result = extractNodeValues(rootNode, nodeCallback, useIdIfEmptyName);
        return result.length > 0 ? result : getSubFormValues(rootNode, nodeCallback, useIdIfEmptyName);
    }

    function getSubFormValues(rootNode, nodeCallback, useIdIfEmptyName)
	{
		var result = [],
			currentNode = rootNode.firstChild;

		while (currentNode)
		{
			result = result.concat(extractNodeValues(currentNode, nodeCallback, useIdIfEmptyName));
			currentNode = currentNode.nextSibling;
		}

		return result;
	}

    function extractNodeValues(node, nodeCallback, useIdIfEmptyName) {
        var callbackResult, fieldValue, result, fieldName = getFieldName(node, useIdIfEmptyName);

        callbackResult = nodeCallback && nodeCallback(node);

        if (callbackResult && callbackResult.name) {
            result = [callbackResult];
        }
        else if (fieldName != '' && node.nodeName.match(/INPUT|TEXTAREA/i)) {
            fieldValue = getFieldValue(node);
			result = [ { name: fieldName, value: fieldValue} ];
        }
        else if (fieldName != '' && node.nodeName.match(/SELECT/i)) {
	        fieldValue = getFieldValue(node);
	        result = [ { name: fieldName.replace(/\[\]$/, ''), value: fieldValue } ];
        }
        else {
            result = getSubFormValues(node, nodeCallback, useIdIfEmptyName);
        }

        return result;
    }

	function getFieldName(node, useIdIfEmptyName)
	{
		if (node.name && node.name != '') return node.name;
		else if (useIdIfEmptyName && node.id && node.id != '') return node.id;
		else return '';
	}


	function getFieldValue(fieldNode)
	{
		if (fieldNode.disabled) return null;

		switch (fieldNode.nodeName) {
			case 'INPUT':
			case 'TEXTAREA':
				switch (fieldNode.type.toLowerCase()) {
					case 'radio':
					case 'checkbox':
                        if (fieldNode.checked && fieldNode.value === "true") return true;
                        if (!fieldNode.checked && fieldNode.value === "true") return false;
						if (fieldNode.checked) return fieldNode.value;
						break;

					case 'button':
					case 'reset':
					case 'submit':
					case 'image':
						return '';
						break;

					default:
						return fieldNode.value;
						break;
				}
				break;

			case 'SELECT':
				return getSelectedOptionValue(fieldNode);
				break;

			default:
				break;
		}

		return null;
	}

	function getSelectedOptionValue(selectNode)
	{
		var multiple = selectNode.multiple,
			result = [],
			options,
			i, l;

		if (!multiple) return selectNode.value;

		for (options = selectNode.getElementsByTagName("option"), i = 0, l = options.length; i < l; i++)
		{
			if (options[i].selected) result.push(options[i].value);
		}

		return result;
	}

	return form2js;

})();

/**
 * Copyright (c) 2010 Maxim Vasiliev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author Maxim Vasiliev
 * Date: 19.09.11
 * Time: 23:40
 */

var js2form = (function()
{
	"use strict";

	var _subArrayRegexp = /^\[\d+?\]/,
			_subObjectRegexp = /^[a-zA-Z_][a-zA-Z_0-9]+/,
			_arrayItemRegexp = /\[[0-9]+?\]$/,
			_lastIndexedArrayRegexp = /(.*)(\[)([0-9]*)(\])$/,
			_arrayOfArraysRegexp = /\[([0-9]+)\]\[([0-9]+)\]/g,
			_inputOrTextareaRegexp = /INPUT|TEXTAREA/i;

	/**
	 *
	 * @param rootNode
	 * @param data
	 * @param delimiter
	 * @param nodeCallback
	 * @param useIdIfEmptyName
	 */
	function js2form(rootNode, data, delimiter, nodeCallback, useIdIfEmptyName)
	{
		if (arguments.length < 3) delimiter = '.';
		if (arguments.length < 4) nodeCallback = null;
		if (arguments.length < 5) useIdIfEmptyName = false;

		var fieldValues,
				formFieldsByName;

		fieldValues = object2array(data);
		formFieldsByName = getFields(rootNode, useIdIfEmptyName, delimiter, {}, false);

		for (var i = 0; i < fieldValues.length; i++)
		{
			var fieldName = fieldValues[i].name,
					fieldValue = fieldValues[i].value;

			if (typeof formFieldsByName[fieldName] != 'undefined')
			{
				setValue(formFieldsByName[fieldName], fieldValue);
			}
			else if (typeof formFieldsByName[fieldName.replace(_arrayItemRegexp, '[]')] != 'undefined')
			{
				setValue(formFieldsByName[fieldName.replace(_arrayItemRegexp, '[]')], fieldValue);
			}
		}
	}

	function setValue(field, value)
	{
		var children, i, l;

		if (field instanceof Array)
		{
			for(i = 0; i < field.length; i++)
			{
				if (field[i].value == value || value === true) field[i].checked = true;
			}
		}
		else if (_inputOrTextareaRegexp.test(field.nodeName))
		{
			field.value = value;
		}
		else if (/SELECT/i.test(field.nodeName))
		{
			children = field.getElementsByTagName('option');
			for (i = 0,l = children.length; i < l; i++)
			{
				if (children[i].value == value)
				{
					children[i].selected = true;
					if (field.multiple) break;
				}
				else if (!field.multiple)
				{
					children[i].selected = false;
				}
			}
		}
	}

	function getFields(rootNode, useIdIfEmptyName, delimiter, arrayIndexes, shouldClean)
	{
		if (arguments.length < 4) arrayIndexes = {};

		var result = {},
			currNode = rootNode.firstChild,
			name, nameNormalized,
			subFieldName,
			i, j, l,
			options;

		while (currNode)
		{
			name = '';

			if (currNode.name && currNode.name != '')
			{
				name = currNode.name;
			}
			else if (useIdIfEmptyName && currNode.id && currNode.id != '')
			{
				name = currNode.id;
			}

			if (name == '')
			{
				var subFields = getFields(currNode, useIdIfEmptyName, delimiter, arrayIndexes, shouldClean);
				for (subFieldName in subFields)
				{
					if (typeof result[subFieldName] == 'undefined')
					{
						result[subFieldName] = subFields[subFieldName];
					}
					else
					{
						for (i = 0; i < subFields[subFieldName].length; i++)
						{
							result[subFieldName].push(subFields[subFieldName][i]);
						}
					}
				}
			}
			else
			{
				if (/SELECT/i.test(currNode.nodeName))
				{
					for(j = 0, options = currNode.getElementsByTagName('option'), l = options.length; j < l; j++)
					{
						if (shouldClean)
						{
							options[j].selected = false;
						}

						nameNormalized = normalizeName(name, delimiter, arrayIndexes);
						result[nameNormalized] = currNode;
					}
				}
				else if (/INPUT/i.test(currNode.nodeName) && /CHECKBOX|RADIO/i.test(currNode.type))
				{
					if(shouldClean)
					{
						currNode.checked = false;
					}

					nameNormalized = normalizeName(name, delimiter, arrayIndexes);
					nameNormalized = nameNormalized.replace(_arrayItemRegexp, '[]');
					if (!result[nameNormalized]) result[nameNormalized] = [];
					result[nameNormalized].push(currNode);
				}
				else
				{
					if (shouldClean)
					{
						currNode.value = '';
					}

					nameNormalized = normalizeName(name, delimiter, arrayIndexes);
					result[nameNormalized] = currNode;
				}
			}

			currNode = currNode.nextSibling;
		}

		return result;
	}

	/**
	 * Normalizes names of arrays, puts correct indexes (consecutive and ordered by element appearance in HTML)
	 * @param name
	 * @param delimiter
	 * @param arrayIndexes
	 */
	function normalizeName(name, delimiter, arrayIndexes)
	{
		var nameChunksNormalized = [],
				nameChunks = name.split(delimiter),
				currChunk,
				nameMatches,
				nameNormalized,
				currIndex,
				newIndex,
				i;

		name = name.replace(_arrayOfArraysRegexp, '[$1].[$2]');
		for (i = 0; i < nameChunks.length; i++)
		{
			currChunk = nameChunks[i];
			nameChunksNormalized.push(currChunk);
			nameMatches = currChunk.match(_lastIndexedArrayRegexp);
			if (nameMatches != null)
			{
				nameNormalized = nameChunksNormalized.join(delimiter);
				currIndex = nameNormalized.replace(_lastIndexedArrayRegexp, '$3');
				nameNormalized = nameNormalized.replace(_lastIndexedArrayRegexp, '$1');

				if (typeof (arrayIndexes[nameNormalized]) == 'undefined')
				{
					arrayIndexes[nameNormalized] = {
						lastIndex: -1,
						indexes: {}
					};
				}

				if (currIndex == '' || typeof arrayIndexes[nameNormalized].indexes[currIndex] == 'undefined')
				{
					arrayIndexes[nameNormalized].lastIndex++;
					arrayIndexes[nameNormalized].indexes[currIndex] = arrayIndexes[nameNormalized].lastIndex;
				}

				newIndex = arrayIndexes[nameNormalized].indexes[currIndex];
				nameChunksNormalized[nameChunksNormalized.length - 1] = currChunk.replace(_lastIndexedArrayRegexp, '$1$2' + newIndex + '$4');
			}
		}

		nameNormalized = nameChunksNormalized.join(delimiter);
		nameNormalized = nameNormalized.replace('].[', '][');
		return nameNormalized;
	}

	function object2array(obj, lvl)
	{
		var result = [], i, name;

		if (arguments.length == 1) lvl = 0;

        if (obj == null)
        {
            result = [{ name: "", value: null }];
        }
        else if (typeof obj == 'string' || typeof obj == 'number' || typeof obj == 'date' || typeof obj == 'boolean')
        {
            result = [
                { name: "", value : obj }
            ];
        }
        else if (obj instanceof Array)
        {
            for (i = 0; i < obj.length; i++)
            {
                name = "[" + i + "]";
                result = result.concat(getSubValues(obj[i], name, lvl + 1));
            }
        }
        else
        {
            for (i in obj)
            {
                name = i;
                result = result.concat(getSubValues(obj[i], name, lvl + 1));
            }
        }

		return result;
    }

	function getSubValues(subObj, name, lvl)
	{
		var itemName;
		var result = [], tempResult = object2array(subObj, lvl + 1), i, tempItem;

		for (i = 0; i < tempResult.length; i++)
		{
			itemName = name;
			if (_subArrayRegexp.test(tempResult[i].name))
			{
				itemName += tempResult[i].name;
			}
			else if (_subObjectRegexp.test(tempResult[i].name))
			{
				itemName += '.' + tempResult[i].name;
			}

			tempItem = { name: itemName, value: tempResult[i].value };
			result.push(tempItem);
		}

		return result;
	}

	return js2form;

})();
/* ==========================================================
 * maskedinput.js
 * Based on jquery.maskedinput.js
 * http://digitalbush.com/projects/masked-input-plugin
 * Modified for rue21 by KnowledgePath Solutions.
 * ==========================================================
 * Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
 *
 * Licensed under the MIT license
 * http://digitalbush.com/projects/masked-input-plugin/#license
 * ========================================================== */

(function($) {
	function getPasteEvent() {
	var el = document.createElement('input'),
		name = 'onpaste';
	el.setAttribute(name, '');
	return (typeof el[name] === 'function')?'paste':'input';
}

var pasteEventName = getPasteEvent() + ".mask",
	ua = navigator.userAgent,
	iPhone = /iphone/i.test(ua),
	android=/android/i.test(ua),
	caretTimeoutId;

$.mask = {
	//Predefined character definitions
	definitions: {
		'9': "[0-9]",
		'a': "[A-Za-z]",
		'*': "[A-Za-z0-9]"
	},
	dataName: "rawMaskFn",
	placeholder: '_'
};

$.fn.extend({
	//Helper Function for Caret positioning
	caret: function(begin, end) {
		var range;

		if (this.length === 0 || this.is(":hidden")) {
			return;
		}

		if (typeof begin == 'number') {
			end = (typeof end === 'number') ? end : begin;
			return this.each(function() {
				if (this.setSelectionRange) {
					this.setSelectionRange(begin, end);
				} else if (this.createTextRange) {
					range = this.createTextRange();
					range.collapse(true);
					range.moveEnd('character', end);
					range.moveStart('character', begin);
					range.select();
				}
			});
		} else {
			if (this[0].setSelectionRange) {
				begin = this[0].selectionStart;
				end = this[0].selectionEnd;
			} else if (document.selection && document.selection.createRange) {
				range = document.selection.createRange();
				begin = 0 - range.duplicate().moveStart('character', -100000);
				end = begin + range.text.length;
			}
			return { begin: begin, end: end };
		}
	},
	unmask: function() {
		return this.trigger("unmask");
	},
	mask: function(mask, settings) {
		var input,
			defs,
			tests,
			partialPosition,
			firstNonMaskPos,
			len;

		if (!mask && this.length > 0) {
			input = $(this[0]);
			return input.data($.mask.dataName)();
		}
		settings = $.extend({
			placeholder: $.mask.placeholder, // Load default placeholder
			completed: null
		}, settings);


		defs = $.mask.definitions;
		tests = [];
		partialPosition = len = mask.length;
		firstNonMaskPos = null;

		$.each(mask.split(""), function(i, c) {
			if (c == '?') {
				len--;
				partialPosition = i;
			} else if (defs[c]) {
				tests.push(new RegExp(defs[c]));
				if (firstNonMaskPos === null) {
					firstNonMaskPos = tests.length - 1;
				}
			} else {
				tests.push(null);
			}
		});

		return this.trigger("unmask").each(function() {
			var input = $(this),
				buffer = $.map(
				mask.split(""),
				function(c, i) {
					if (c != '?') {
						return defs[c] ? settings.placeholder : c;
					}
				}),
				focusText = input.val();

			function seekNext(pos) {
				while (++pos < len && !tests[pos]);
				return pos;
			}

			function seekPrev(pos) {
				while (--pos >= 0 && !tests[pos]);
				return pos;
			}

			function shiftL(begin,end) {
				var i,
					j;

				if (begin<0) {
					return;
				}

				for (i = begin, j = seekNext(end); i < len; i++) {
					if (tests[i]) {
						if (j < len && tests[i].test(buffer[j])) {
							buffer[i] = buffer[j];
							buffer[j] = settings.placeholder;
						} else {
							break;
						}

						j = seekNext(j);
					}
				}
				writeBuffer();
				input.caret(Math.max(firstNonMaskPos, begin));
			}

			function shiftR(pos) {
				var i,
					c,
					j,
					t;

				for (i = pos, c = settings.placeholder; i < len; i++) {
					if (tests[i]) {
						j = seekNext(i);
						t = buffer[i];
						buffer[i] = c;
						if (j < len && tests[j].test(t)) {
							c = t;
						} else {
							break;
						}
					}
				}
			}

			function keydownEvent(e) {
				var k = e.which,
					pos,
					begin,
					end;

				//backspace, delete, and escape get special treatment
				if (k === 8 || k === 46 || (iPhone && k === 127)) {
					pos = input.caret();
					begin = pos.begin;
					end = pos.end;

					if (end - begin === 0) {
						begin=k!==46?seekPrev(begin):(end=seekNext(begin-1));
						end=k===46?seekNext(end):end;
					}
					clearBuffer(begin, end);
					shiftL(begin, end - 1);

					e.preventDefault();
				} else if (k == 27) {//escape
					input.val(focusText);
					input.caret(0, checkVal());
					e.preventDefault();
				}
			}

			function keypressEvent(e) {
				var k = e.which,
					pos = input.caret(),
					p,
					c,
					next;

				if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {//Ignore
					return;
				} else if (k) {
					if (pos.end - pos.begin !== 0){
						clearBuffer(pos.begin, pos.end);
						shiftL(pos.begin, pos.end-1);
					}

					p = seekNext(pos.begin - 1);
					if (p < len) {
						c = String.fromCharCode(k);
						if (tests[p].test(c)) {
							shiftR(p);

							buffer[p] = c;
							writeBuffer();
							next = seekNext(p);

							if(android){
								setTimeout($.proxy($.fn.caret,input,next),0);
							}else{
								input.caret(next);
							}

							if (settings.completed && next >= len) {
								settings.completed.call(input);
							}
						}
					}
					e.preventDefault();
				}
			}

			function clearBuffer(start, end) {
				var i;
				for (i = start; i < end && i < len; i++) {
					if (tests[i]) {
						buffer[i] = settings.placeholder;
					}
				}
			}

			function writeBuffer() { input.val(buffer.join('')); }

			function checkVal(allow) {
				//try to place characters where they belong
				var test = input.val(),
					lastMatch = -1,
					i,
					c;

				for (i = 0, pos = 0; i < len; i++) {
					if (tests[i]) {
						buffer[i] = settings.placeholder;
						while (pos++ < test.length) {
							c = test.charAt(pos - 1);
							if (tests[i].test(c)) {
								buffer[i] = c;
								lastMatch = i;
								break;
							}
						}
						if (pos > test.length) {
							break;
						}
					} else if (buffer[i] === test.charAt(pos) && i !== partialPosition) {
						pos++;
						lastMatch = i;
					}
				}
				if (allow) {
					writeBuffer();
				} else if (lastMatch + 1 < partialPosition) {
					input.val("");
					clearBuffer(0, len);
				} else {
					writeBuffer();
					input.val(input.val().substring(0, lastMatch + 1));
				}
				return (partialPosition ? i : firstNonMaskPos);
			}

			input.data($.mask.dataName,function(){
				return $.map(buffer, function(c, i) {
					return tests[i]&&c!=settings.placeholder ? c : null;
				}).join('');
			});

			if (!input.attr("readonly"))
				input
				.one("unmask", function() {
					input
						.unbind(".mask")
						.removeData($.mask.dataName);
				})
				.bind("focus.mask", function() {
					clearTimeout(caretTimeoutId);
					var pos,
						moveCaret;

					focusText = input.val();
					pos = checkVal();

					caretTimeoutId = setTimeout(function(){
						writeBuffer();
						if (pos == mask.length) {
							input.caret(0, pos);
						} else {
							input.caret(pos);
						}
					}, 10);
				})
				.bind("blur.mask", function() {
					checkVal();
					if (input.val() != focusText)
						input.change();
				})
				.bind("keydown.mask", keydownEvent)
				.bind("keypress.mask", keypressEvent)
				.bind(pasteEventName, function() {
					setTimeout(function() {
						var pos=checkVal(true);
						input.caret(pos);
						if (settings.completed && pos == input.val().length)
							settings.completed.call(input);
					}, 0);
				});
			checkVal(); //Perform initial check for existing values
		});
	}
});


})(jQuery);
/**
 The MIT License

 Copyright (c) 2010 Daniel Park (http://metaweb.com, http://postmessage.freebaseapps.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 **/
 
var NO_JQUERY = {};
(function(window, $, undefined) {

     if (!("console" in window)) {
         var c = window.console = {};
         c.log = c.warn = c.error = c.debug = function(){};
     }

     if ($ === NO_JQUERY) {
         // jQuery is optional
         $ = {
             fn: {},
             extend: function() {
                 var a = arguments[0];
                 for (var i=1,len=arguments.length; i<len; i++) {
                     var b = arguments[i];
                     for (var prop in b) {
                         a[prop] = b[prop];
                     }
                 }
                 return a;
             }
         };
     }

     $.fn.pm = function() {
         console.log("usage: \nto send:    $.pm(options)\nto receive: $.pm.bind(type, fn, [origin])");
         return this;
     };

     // send postmessage
     $.pm = window.pm = function(options) {
         pm.send(options);
     };

     // bind postmessage handler
     $.pm.bind = window.pm.bind = function(type, fn, origin, hash, async_reply) {
         pm.bind(type, fn, origin, hash, async_reply === true);
     };

     // unbind postmessage handler
     $.pm.unbind = window.pm.unbind = function(type, fn) {
         pm.unbind(type, fn);
     };

     // default postmessage origin on bind
     $.pm.origin = window.pm.origin = null;

     // default postmessage polling if using location hash to pass postmessages
     $.pm.poll = window.pm.poll = 200;

     var pm = {

         send: function(options) {
             var o = $.extend({}, pm.defaults, options),
             target = o.target;
             if (!o.target) {
                 console.warn("postmessage target window required");
                 return;
             }
             if (!o.type) {
                 console.warn("postmessage type required");
                 return;
             }
             var msg = {data:o.data, type:o.type};
             if (o.success) {
                 msg.callback = pm._callback(o.success);
             }
             if (o.error) {
                 msg.errback = pm._callback(o.error);
             }
             if (("postMessage" in target) && !o.hash) {
                 pm._bind();
                 target.postMessage(JSON.stringify(msg), o.origin || '*');
             }
             else {
                 pm.hash._bind();
                 pm.hash.send(o, msg);
             }
         },

         bind: function(type, fn, origin, hash, async_reply) {
           pm._replyBind ( type, fn, origin, hash, async_reply );
         },
       
         _replyBind: function(type, fn, origin, hash, isCallback) {
           if (("postMessage" in window) && !hash) {
               pm._bind();
           }
           else {
               pm.hash._bind();
           }
           var l = pm.data("listeners.postmessage");
           if (!l) {
               l = {};
               pm.data("listeners.postmessage", l);
           }
           var fns = l[type];
           if (!fns) {
               fns = [];
               l[type] = fns;
           }
           fns.push({fn:fn, callback: isCallback, origin:origin || $.pm.origin});
         },

         unbind: function(type, fn) {
             var l = pm.data("listeners.postmessage");
             if (l) {
                 if (type) {
                     if (fn) {
                         // remove specific listener
                         var fns = l[type];
                         if (fns) {
                             var m = [];
                             for (var i=0,len=fns.length; i<len; i++) {
                                 var o = fns[i];
                                 if (o.fn !== fn) {
                                     m.push(o);
                                 }
                             }
                             l[type] = m;
                         }
                     }
                     else {
                         // remove all listeners by type
                         delete l[type];
                     }
                 }
                 else {
                     // unbind all listeners of all type
                     for (var i in l) {
                       delete l[i];
                     }
                 }
             }
         },

         data: function(k, v) {
             if (v === undefined) {
                 return pm._data[k];
             }
             pm._data[k] = v;
             return v;
         },

         _data: {},

         _CHARS: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),

         _random: function() {
             var r = [];
             for (var i=0; i<32; i++) {
                 r[i] = pm._CHARS[0 | Math.random() * 32];
             };
             return r.join("");
         },

         _callback: function(fn) {
             var cbs = pm.data("callbacks.postmessage");
             if (!cbs) {
                 cbs = {};
                 pm.data("callbacks.postmessage", cbs);
             }
             var r = pm._random();
             cbs[r] = fn;
             return r;
         },

         _bind: function() {
             // are we already listening to message events on this w?
             if (!pm.data("listening.postmessage")) {
                 if (window.addEventListener) {
                     window.addEventListener("message", pm._dispatch, false);
                 }
                 else if (window.attachEvent) {
                     window.attachEvent("onmessage", pm._dispatch);
                 }
                 pm.data("listening.postmessage", 1);
             }
         },

         _dispatch: function(e) {
             //console.log("$.pm.dispatch", e, this);
             try {
                 var msg = JSON.parse(e.data);
             }
             catch (ex) {
                 console.warn("postmessage data invalid json: ", ex);
                 return;
             }
             if (!msg.type) {
                 console.warn("postmessage message type required");
                 return;
             }
             var cbs = pm.data("callbacks.postmessage") || {},
             cb = cbs[msg.type];
             if (cb) {
                 cb(msg.data);
             }
             else {
                 var l = pm.data("listeners.postmessage") || {};
                 var fns = l[msg.type] || [];
                 for (var i=0,len=fns.length; i<len; i++) {
                     var o = fns[i];
                     if (o.origin && o.origin !== '*' && e.origin !== o.origin) {
                         console.warn("postmessage message origin mismatch", e.origin, o.origin);
                         if (msg.errback) {
                             // notify post message errback
                             var error = {
                                 message: "postmessage origin mismatch",
                                 origin: [e.origin, o.origin]
                             };
                             pm.send({target:e.source, data:error, type:msg.errback});
                         }
                         continue;
                     }

                     function sendReply ( data ) {
                       if (msg.callback) {
                           pm.send({target:e.source, data:data, type:msg.callback});
                       }
                     }
                     
                     try {
                         if ( o.callback ) {
                           o.fn(msg.data, sendReply, e);
                         } else {
                           sendReply ( o.fn(msg.data, e) );
                         }
                     }
                     catch (ex) {
                         if (msg.errback) {
                             // notify post message errback
                             pm.send({target:e.source, data:ex, type:msg.errback});
                         } else {
                             throw ex;
                         }
                     }
                 };
             }
         }
     };

     // location hash polling
     pm.hash = {

         send: function(options, msg) {
             //console.log("hash.send", target_window, options, msg);
             var target_window = options.target,
             target_url = options.url;
             if (!target_url) {
                 console.warn("postmessage target window url is required");
                 return;
             }
             target_url = pm.hash._url(target_url);
             var source_window,
             source_url = pm.hash._url(window.location.href);
             if (window == target_window.parent) {
                 source_window = "parent";
             }
             else {
                 try {
                     for (var i=0,len=parent.frames.length; i<len; i++) {
                         var f = parent.frames[i];
                         if (f == window) {
                             source_window = i;
                             break;
                         }
                     };
                 }
                 catch(ex) {
                     // Opera: security error trying to access parent.frames x-origin
                     // juse use window.name
                     source_window = window.name;
                 }
             }
             if (source_window == null) {
                 console.warn("postmessage windows must be direct parent/child windows and the child must be available through the parent window.frames list");
                 return;
             }
             var hashmessage = {
                 "x-requested-with": "postmessage",
                 source: {
                     name: source_window,
                     url: source_url
                 },
                 postmessage: msg
             };
             var hash_id = "#x-postmessage-id=" + pm._random();
             target_window.location = target_url + hash_id + encodeURIComponent(JSON.stringify(hashmessage));
         },

         _regex: /^\#x\-postmessage\-id\=(\w{32})/,

         _regex_len: "#x-postmessage-id=".length + 32,

         _bind: function() {
             // are we already listening to message events on this w?
             if (!pm.data("polling.postmessage")) {
                 setInterval(function() {
                                 var hash = "" + window.location.hash,
                                 m = pm.hash._regex.exec(hash);
                                 if (m) {
                                     var id = m[1];
                                     if (pm.hash._last !== id) {
                                         pm.hash._last = id;
                                         pm.hash._dispatch(hash.substring(pm.hash._regex_len));
                                     }
                                 }
                             }, $.pm.poll || 200);
                 pm.data("polling.postmessage", 1);
             }
         },

         _dispatch: function(hash) {
             if (!hash) {
                 return;
             }
             try {
                 hash = JSON.parse(decodeURIComponent(hash));
                 if (!(hash['x-requested-with'] === 'postmessage' &&
                       hash.source && hash.source.name != null && hash.source.url && hash.postmessage)) {
                     // ignore since hash could've come from somewhere else
                     return;
                 }
             }
             catch (ex) {
                 // ignore since hash could've come from somewhere else
                 return;
             }
             var msg = hash.postmessage,
             cbs = pm.data("callbacks.postmessage") || {},
             cb = cbs[msg.type];
             if (cb) {
                 cb(msg.data);
             }
             else {
                 var source_window;
                 if (hash.source.name === "parent") {
                     source_window = window.parent;
                 }
                 else {
                     source_window = window.frames[hash.source.name];
                 }
                 var l = pm.data("listeners.postmessage") || {};
                 var fns = l[msg.type] || [];
                 for (var i=0,len=fns.length; i<len; i++) {
                     var o = fns[i];
                     if (o.origin) {
                         var origin = /https?\:\/\/[^\/]*/.exec(hash.source.url)[0];
                         if (o.origin !== '*' && origin !== o.origin) {
                             console.warn("postmessage message origin mismatch", origin, o.origin);
                             if (msg.errback) {
                                 // notify post message errback
                                 var error = {
                                     message: "postmessage origin mismatch",
                                     origin: [origin, o.origin]
                                 };
                                 pm.send({target:source_window, data:error, type:msg.errback, hash:true, url:hash.source.url});
                             }
                             continue;
                         }
                     }

                     function sendReply ( data ) {
                       if (msg.callback) {
                         pm.send({target:source_window, data:data, type:msg.callback, hash:true, url:hash.source.url});
                       }
                     }
                     
                     try {
                         if ( o.callback ) {
                           o.fn(msg.data, sendReply);
                         } else {
                           sendReply ( o.fn(msg.data) );
                         }
                     }
                     catch (ex) {
                         if (msg.errback) {
                             // notify post message errback
                             pm.send({target:source_window, data:ex, type:msg.errback, hash:true, url:hash.source.url});
                         } else {
                             throw ex;
                         }
                     }
                 };
             }
         },

         _url: function(url) {
             // url minus hash part
             return (""+url).replace(/#.*$/, "");
         }

     };

     $.extend(pm, {
                  defaults: {
                      target: null,  /* target window (required) */
                      url: null,     /* target window url (required if no window.postMessage or hash == true) */
                      type: null,    /* message type (required) */
                      data: null,    /* message data (required) */
                      success: null, /* success callback (optional) */
                      error: null,   /* error callback (optional) */
                      origin: "*",   /* postmessage origin (optional) */
                      hash: false    /* use location hash for message passing (optional) */
                  }
              });

 })(this, typeof jQuery === "undefined" ? NO_JQUERY : jQuery);
/* ===================================================
 * collapse.js
 * Based on bootstrap-transition.js
 * http://twitter.github.com/bootstrap/javascript.html#transition
 * Modified for rue21 by KnowledgePath Solutions.
 * ===================================================
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

(function ($) {

"use strict"; // jshint ;_;


/* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

$(function () {

	$.support.transition = (function () {

	var transitionEnd = (function () {

		var el = document.createElement('bootstrap')
		, transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd'
			,  'MozTransition'    : 'transitionend'
			,  'OTransition'      : 'oTransitionEnd otransitionend'
			,  'transition'       : 'transitionend'
			}
		, name

		for (name in transEndEventNames){
		if (el.style[name] !== undefined) {
			return transEndEventNames[name]
		}
		}

	}())

	return transitionEnd && {
		end: transitionEnd
	}

	})()

})

})(window.jQuery);
/*!
 * The MAIN Controller
 */
(function ($, MAIN_CONSTANTS, MAIN) {
	//"use strict";

	/* don't cache any ajax calls */
	$.ajaxSetup({cache: false});

	/* reset session timeout timer on ajax call */
	$(document).ajaxStart(function(){
		MAIN.startSessionTimeout();
	});

	/* Private Vars */
	var errorMessageTemplate = '<div class="alert-box"><div class="alert-message"><span class="icon icon-alert"></span><div class="alert-heading">' + MAIN_CONSTANTS.errorheader + '</div>{{#errorMessages}}<p>{{.}}</p>{{/errorMessages}}</div></div>',
		cartConfirmTemplate = '<div class="modal-content"><h2></h2><div class="atc-info-group"><img class="product-cart-image small-12 medium-4 columns" /><h3></h3><div id="table" class="small-12 medium-8 columns"><div class="row"><div class="small-12 medium-8 columns"><div class="row"><span class="cell cartlabel small-6 medium-8 columns">COLOR:</span><span class="cell small-6 medium-4 columns cart-color"></span></div><div class="row"><span class="cell cartlabel small-6 medium-8 columns">SIZE:</span><span class="cell small-6 medium-4 columns cart-size"></span></div><div class="row"><span class="cell cartlabel small-6 medium-8 columns">QUANTITY:</span><span class="cell small-6 medium-4 columns cart-quantity"></span></div></div><div id="atc-price" class="small-12 medium-4 columns"><div class="product-price"></div></div></div></div></div><div class="atc-button-group"><button class="button continue medium">CONTINUE SHOPPING</button><button class="button viewcart medium">VIEW BAG</button></div></div>',

		loadingTemplate = '<div class="modal-content"><img style="margin: 0 47%;" src="/store/resources/images/bg/ajax-loader-32x32.gif" width="32" height="32" /><div style="text-align: center;">just a moment...</div></div>',
		loadingOverlay = '<div id="ajax-loader" class="reveal-modal ajax-loader"><img style="margin: 0 47%;" src="/store/resources/images/bg/ajax-loader-32x32.gif" width="32" height="32" /><div style="text-align: center;">just a moment...</div></div>',
		addToCartErrorTemplate = '<div class="modal-content"><div style="text-align: center;" class="addTocartErrorMsg">Error!!</div></div>';

	var bagFeedbackTemplate = '<section class="bag-content"><h2></h2><h3></h3><div class="atc-info-group"><img class="product-cart-image small-3 medium-3 columns" />';
		bagFeedbackTemplate += '<div id="table" class="small-8 medium-8 columns small-offset-1 medium-offset-1">';
		bagFeedbackTemplate += '<div class="row"><span class="cell cartlabel small-5 medium-5 columns">COLOR:&nbsp;</span><span class="cell small-7 medium-7 columns cart-color"></span></div>';
		bagFeedbackTemplate += '<div class="row"><span class="cell cartlabel small-5 medium-5 columns">SIZE: </span><span class="cell small-7 medium-7 columns cart-size"></span></div>';
		bagFeedbackTemplate += '<div class="row"><span class="cell cartlabel small-5 medium-5 columns">QTY: </span><span class="cell small-7 medium-7 columns cart-quantity"></span></div>';
		bagFeedbackTemplate +='</div></div>';
		bagFeedbackTemplate +='<div class="atc-button-group"><button class="button viewcart small">CHECKOUT</button></div>';
		bagFeedbackTemplate +='<div class="closeness-qualifier"></section>';

	var sizeSelectorMobileErrorTemplate = '<div  class="modal-content"><a class="button right close">Close</a></div><br clear="right"><h2></h2><div class="sku-size-selector"></div></div>';
	var sizeSelectorMobileErrorTemplate = '<div  class="modal-content"><h2></h2><div class="sku-size-selector"></div></div>';
	var sizeSelectorMobileErrorTemplate = '<div  class="modal-content"><div style="position:relative; top:0;left:0;"><a class="button right close">Close</a></div><h2></h2><div class="sku-size-selector"></div></div>';
// TEMP FOR TESTING ONLY


	/* Private Functions */
	function cleanupSession(url) {
		var root, queryString;
		if (url.indexOf(";jsessionid=") == -1) {
			return url;
		} else {
			root = url.split(';')[0];
			if (url.indexOf('?') == -1) {
				return root;
			} else {
				queryString = url.split('?')[1];
				return root + "?" + queryString;
			}
		}
	}

	function getAnchorLink() {
		/* FYI - there are issues with siteRoot on the sparkred app servers...use contextRoot if you need /store */
		var link = MAIN_CONSTANTS.siteRoot,
			x,
			crumbLinks,
			crumbLink;
		if (document.referrer.indexOf(window.location.host) != -1) {
			crumbLinks = $('.bread-crumbs').find('a');
			for (x = 0; x < crumbLinks.length; x++) {
				crumbLink = crumbLinks[x].href.split('#')[0];
				link = crumbLinks[x].href;
				/* crumbs reflect heirarchy not history. so check if one of the links is a better match to previous page. */
				if (document.referrer.indexOf(crumbLink) != -1) {
					break;
				}
			}
		}
		return link;
	}

	/* Clean out the sessionid */
	/* FYI - there are issues with siteRoot on the sparkred app servers...use contextRoot if you need /store */
	MAIN_CONSTANTS.siteRoot = cleanupSession(MAIN_CONSTANTS.siteRoot);
	MAIN_CONSTANTS.secureSiteRoot = cleanupSession(MAIN_CONSTANTS.secureSiteRoot);
	MAIN_CONSTANTS.sessionTimeoutUrl = cleanupSession(MAIN_CONSTANTS.sessionTimeoutUrl);

	/*
	 * Initilization code
	 * Based on Garber-Irish method of DOM-ready execution
	 * @see viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution/
	 *
	 * MAIN is an object that contains dom ready actions for pages.
	 * The format is {namespace}.{controller}.{action}
	 * Three functions are executed on dom ready:
	 * 1) common.init()  - not called for modals.
	 * 2) {controller}.init() or modal.init()
	 * 3) {controller}.{action}()
	 */


	var MAINInit = {
		sessionTimeoutHandle : null, /* returned from setTimeout, can be used to cancel execution */
		init : function (pController, pAction, pOptions) {
			$(document).foundation();

			/* moved primary nav logic into plugin */
			$('nav.primary-nav').primarynav();

			// Spawn a new thread to asynchronously check for the terms and conditions acceptance
			/*setTimeout(function() {
				var termsAcceptance = $.cookie('termsAcceptance');

				if (typeof termsAcceptance === 'undefined' || termsAcceptance !== 'true') {

					// Get the Terms and Conditions from the BCC
					$.ajax({
						url: '/store/sitewide/targeters/terms-and-conditions.jsp',
						dataType: 'html',
						success: function(response) {

							// If T&Cs are defined, display them in acceptance modal
							if (response.trim() !== '') {

								// Add the T&Cs to the modal
								$('#terms-and-conditions-modal .message').html(response)

								// Hook up the accept and decline buttons
								$('#terms-and-conditions-modal .accept').click(function() {
									$.cookie('termsAcceptance', 'true', { expires: 60 });
									$('#terms-and-conditions-modal').foundation('reveal', 'close');
								});
								$('#terms-and-conditions-modal .decline').click(function() {
									$.cookie('termsAcceptance', 'false', { expires: 60 });
									window.location = 'http://www.rue21.com';
								});

								// Show the modal
								$('#terms-and-conditions-modal').foundation('reveal', 'open', {closeOnBackgroundClick: false});
							}
						}
					});
				}
			}, 0);
			*/

			/* jeff is breaking stuff...way to go jeff. commenting out for now *//*
			// Put the user type on the <HTML> tag to enable the right header links
			var userType;
			if ($.cookie('isFullyAuthenticated') === 'true') {
				userType = 'fully-authenticated';
			}
			else if ($.cookie('securityStatus') !== null && $.cookie('securityStatus') !== '' && parseInt($.cookie('securityStatus')) > 0) {
				userType = 'partially-authenticated';
			}
			else {
				userType = 'guest';
			}
			$('html').addClass(userType);

			// Initialize mini-cart item count
			var itemCount = $.cookie('cartItemCount');
			if (itemCount === null || itemCount === '') {

				// If the cookie is not present but the user is partially authenticated, make an AJAX request to get the most up-to-date quantity
				if ($.cookie('isFullyAuthenticated') === 'true') {
					MAIN.profileController.getProfileStatus(); //updates Cart Quantity
				}
				else {
					$.cookie('cartItemCount', '0', {path: '/'});
					$('.cart-counter').html('0');
				}
			}
			else {
				$('.cart-counter').html(itemCount);
			}*/
			/*
			// gotta make the header work
			var userType;
			if (MAIN.loginStatus.statusValue == 4) {
				userType = 'fully-authenticated';
			}
			else if (MAIN.loginStatus.statusValue == 3) {
				userType = 'partially-authenticated';
			}
			else {
				userType = 'guest';
			}
			$('html').addClass(userType);
			MAIN.profileController.getProfileStatus();
			*/
			MAIN.profileController.getProfileStatus();

			// Call the page-specific controller methods
			var body = document.body,
				mController = (pController === undefined) ? body.getAttribute('data-controller') : pController,
				mAction = (pAction === undefined) ? body.getAttribute('data-action') : pAction,
				mOptions = (pOptions === undefined) ? {} : pOptions;
			if (pController !== 'modal') {
				this.fire('common', 'init', mOptions);
			}
			this.fire(mController, 'init', mOptions);
			this.fire(mController, mAction, mOptions);
			this.startSessionTimeout();

			// Enable search button only when there is text to search on
			$('.search-textbox-container input[name=Ntt]').bind('change keyup', function() {
				if (/\S/.test($(this).val())) {
					$('.search-btn-container input[type=submit]').removeClass('disabled');
				}
				else {
					$('.search-btn-container input[type=submit]').addClass('disabled');
				}
			});
			$('form#searchForm').submit(function() {
				var nttVal = $($(this).find('input[name=Ntt]')).val()
				$($(this).find('input[name=search]')).val(nttVal);
				return /\S/.test($('.search-textbox-container input[name=Ntt]').val())
			});

			// Initialize the dropdowns in the side bar menu
			$('.category-split-link').click(function() {
				$($(this).parent()).toggleClass('opened').addClass('clicked');
				$($($($(this).parent()).parent()).children('.category-list')).toggleClass('hidden');
				return false;
			});


			// Hook-up the deal details links
			$('a[data-deal-text]').click(function(e) {
				e.preventDefault();

				$('#global-small-modal .message').html($(this).data('deal-text'));
				$('#global-small-modal').foundation('reveal', 'open');
			});
		},
		fire : function (controller, action, options) {
			var action = (action === undefined) ? 'init' : action;
			if (controller !== '' && this[controller] && typeof this[controller][action] === 'function') {
				console.log('calling:' + controller + '.' + action);
				this[controller][action](options);
			}
		},
		startSessionTimeout : function () {
			if (this.sessionTimeoutHandle) {
				clearTimeout(this.sessionTimeoutHandle);
				MAIN.profileController.getProfileStatus();
			}
			this.sessionTimeoutHandle = setTimeout(this.redirectSessionTimeout, MAIN_CONSTANTS.sessionTimeoutMillis);
		},
		redirectSessionTimeout : function () {
			$.cookie('cartItemCount', 0, {path: '/'});
			$.cookie('isFullyAuthenticated',null);
			$.cookie('securityStatus',null);
			if (location.protocol == "https:") {
				window.location = MAIN_CONSTANTS.siteRoot;
			}
			else {
				MAIN.profileController.getProfileStatus();
			}
		},
		updateCartTotal: function (newTotal) {
			$('#cart-total').text(newTotal);
		},
		account : {
			init : function () {
				// mask input fields for my account and registration pages
				$(".phone-input").mask("(999) 999 - 9999", { placeholder:" " });
				$(".birthday-input").mask("99/99/9999", { placeholder:" " });

				// resize cc-modal
				if ( $("html").hasClass("large-screen") ){
					$("#cc-modal").addClass("medium");
				}
				else {
					$("#cc-modal").addClass("large");
				}
			},
			profile : function () {

				// mask phone number
				$("#cc-modal").on('opened', function(){
					$(".phone-input").mask("(999) 999 - 9999", { placeholder:" " });
				});

				// refresh page for new payment method to appear
				$("#cc-modal").on('closed', function(){
					$('iframe#proxy').remove();
					$("#cc-modal").empty();
				});

				//click handlers
				$(".actions a.editCard").off().click(function(e) {
					e.preventDefault();
					var modalTarget = $(this).attr('data-target'),
						$modalTarget = document.getElementById(modalTarget),
						url = MAIN_CONSTANTS.secureSiteRoot + $(this).attr('href'),
						option = {'url': url, 'target': $modalTarget.id};

					$("#" + modalTarget).foundation('reveal', 'open', {
						url: $(this).attr('href'),
						success: function(data) {
							MAIN.modalProxy.fire(option);
							MAIN.account.updatePaymentOptions();
						}
					});
				});
				$(".credit-card a.add-card").off().click(function(e) {
					e.preventDefault();
					var modalTarget = $(this).attr('data-target'),
						$modalTarget = document.getElementById(modalTarget),
						url = MAIN_CONSTANTS.secureSiteRoot + $(this).attr('href'),
						option = {'url': url, 'target': $modalTarget.id};

					$("#" + modalTarget).foundation('reveal', 'open', {
						url: $(this).attr('href'),
						success: function(data) {
							MAIN.modalProxy.fire(option);
							MAIN.account.addPaymentOptions();
						}
					});
				});

				/* forms */
				$('#update-shipping-info').submit(function(){
					var $phone = $('#phone'),
						number = $phone.val(),
						digits = number.replace(/[^\d]/g,'');
					$phone.val(digits);
				});

				$('body').on('click','#panel-select a', function(e) {
					e.preventDefault();
					$(this).siblings('.active').removeClass('active');
					$(this).addClass('active');
				});

				$('body').on('click','#account-home', function(e) {
					window.location.hash = '!account-home';
					$('#order-history-panel').collapse('hide');
					$('#account-settings-panel').collapse('hide');
					$('#account-home-panel').collapse('show');
				});
				$('body').on('click','#order-history', function(e) {
					window.location.hash = '!order-history';
					$('#account-home-panel').collapse('hide');
					$('#account-settings-panel').collapse('hide');
					$('#order-history-panel').collapse('show');
				});
				$('body').on('click','#account-settings', function(e) {
					window.location.hash = '!account-settings';
					$('#account-home-panel').collapse('hide');
					$('#order-history-panel').collapse('hide');
					$('#account-settings-panel').collapse('show');
				});

				/* we're showing all panels by default so users with js disabled can see them.
				 * hide all panels and show account home by default.
				 */
				$(document).one('ready', function(){
					// the success url for registration submit was changed to profile,
					// so we're going to check here if there is a submit hash and if so,
					// redirect to home page
					var hash = window.location.hash;
					if (hash == '#submit' && $('.form-errors small').length == 0) {
						$.cookie('accountCreated', 'true', {path: '/'});
						window.location.href = '/store/';

					}
					var hash = window.location.hash.replace(/!/, ''),
						$html = $('html');
					$('#account-home-panel').collapse('hide');
					$('#account-settings-panel').collapse('hide');
					$('#order-history-panel').collapse('hide');
					if (hash == '') {
						if ($html.hasClass('ie9') || $html.hasClass('lt-ie9')) {
							$('#ajax-loader').foundation('reveal', 'open');
							window.setTimeout(function(){
								$('#account-home').trigger('click');
								$('#ajax-loader').foundation('reveal', 'close');
							}, 1000);
						}
						else {
							$('#account-home-panel').one('hidden', function() {
								$('#account-home').trigger('click');
							});
						}
					}
					else {
						if ($html.hasClass('ie9') || $html.hasClass('lt-ie9')) {
							$('#ajax-loader').foundation('reveal', 'open');
							window.setTimeout(function(){
								$(hash).trigger('click');
								$('#ajax-loader').foundation('reveal', 'close');
							}, 1000);
						}
						else {
							$(hash + '-panel').one('hidden', function() {
								$(hash).trigger('click');
							});
						}
					}
				});

				$('.close-button').click(function(){
					$('#account-modal').foundation('reveal', 'close');
				});
			},
			registration : function () {
				$('#reg-form').submit(function(){
					var $phone = $('#phoneInput'),
						number = $phone.val(),
						digits = number.replace(/[^\d]/g,'');
					$phone.val(digits);
				});
			},
			updatePaymentOptions : function(){
				(function initPaymentOptionsForm(){
					if ($('#form-edit-payment').length === 0){
						setTimeout(function() { initPaymentOptionsForm(); }, 100);
					} else {
						var $updateErrors = $('#edit-card-errors');

						// listen for submits on the forms.
						$('#form-edit-payment').submit( function (e) {
							e.stopPropagation();
							e.preventDefault();
							var $this = $(this),
								$phone = $this.find('#phone'),
								number = $phone.val(),
								digits = number.replace(/[^\d]/g,'');
							$phone.val(digits);
							$updateErrors.empty();
							$this.validate('validateForm');
							if ($this.data('validate').isValid){
								MAIN.proxy._handleProxySubmit(e, "$('#form-edit-payment')");
							}
						});
						//listeners for form response
						pm.unbind("formSuccess");
						pm.bind("formSuccess", function (data) {
							var $data = $(data.response).filter(function(){ return $(this).is('div.container')}),
								$errors = $data.find('.form-errors');

							if ($data.attr('data-action') === "paymentMethods"){
								//ERROR OCCURED
								$updateErrors.html($errors);
								/*
								$("#cc-modal .container").fadeOut().remove();
								$("#cc-modal").html($data).fadeIn();
								MAIN.account.updatePaymentOptions();
								*/
							} else {
								//SUCCESSFUL UPDATE
								location.reload();
							}
						});
						pm.unbind("formError");
						pm.bind("formError", function (data) {
							console.log("paymentUpdate ERROR");
						});
					}
				})();
			},
			addPaymentOptions : function(){
				(function initPaymentOptionsForm(){
					if ($('#form-add-payment').length === 0){
						setTimeout(function() { initPaymentOptionsForm(); }, 100);
					} else {
						var $addErrors = $('#add-card-errors');

						// listen for submits on the forms.
						$('#form-add-payment').submit( function (e) {
							e.stopPropagation();
							e.preventDefault();
							var $this = $(this),
								$phone = $this.find('#phone'),
								number = $phone.val(),
								digits = number.replace(/[^\d]/g,'');
							$phone.val(digits);
							$addErrors.empty();
							$this.validate('validateForm');
							if ($this.data('validate').isValid){
								MAIN.proxy._handleProxySubmit(e, "$('#form-add-payment')");
							}
						});
						//listeners for form response
						pm.unbind("formSuccess");
						pm.bind("formSuccess", function (data) {
							var $data = $(data.response).filter(function(){ return $(this).is('div.container')}),
							$errors = $data.find('.form-errors');

							if ($data.attr('data-action') === "paymentMethods"){
								//ERROR OCCURED
								$addErrors.html($errors);
								/*
								$("#cc-modal .container").fadeOut().remove();
								$("#cc-modal").html($data).fadeIn();
								MAIN.account.updatePaymentOptions();
								*/
							} else {
								//SUCCESSFUL UPDATE
								location.reload();
							}
						});
						pm.unbind("formError");
						pm.bind("formError", function (data) {
							console.log("paymentUpdate ERROR");
						});
					}
				})();
			}
		},
		storeLocator : {
		/*	init : function () {

				// Initialize the map
				var map, infoWindow;
				$(window).load(function() {
					var mapOptions = {
						center: new google.maps.LatLng(38.6,-97),
						zoom: 4,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

					infoWindow = new google.maps.InfoWindow();
				});

				// Hookup the locator search form
				$('.locator-search-button').click(function() {
					$('#locator-form').submit();
					return false;
				});

				// If there's a previous query stored in the hash, use it to initialize the map
				$(window).on('hashchange load', function() {
					var hashSplit = window.location.hash.split('#');
					if (hashSplit.length >= 2) {
						var query = hashSplit[1];
						$('#locator-form input[name=locationQuery]').val(query);
						$('.locator-search-button').click();
					}
				});

				$('#locator-form').submit(function() {
					var query = $('#locator-form input[name=locationQuery]').val();

					// Store the query in the hash in case a shopper leaves the page and comes back
					window.location.hash = query;

					var storeList = $('#store-list');
					storeList.empty();
					storeList.append($('<div class="loading"></div>'));

					$.ajax({
						url: '/store/browse/json/storeLocatorResults.jsp?locationQuery=' + query,
						dataType: 'json',
						success: function(response) {
							var storeList = $('#store-list');
							storeList.empty();

							if (response.success && response.stores.length > 0) {

								if (response.baseLocation) {
									map.setCenter(new google.maps.LatLng(response.baseLocation.latitude, response.baseLocation.longitude));

									if (response.baseLocation.isApproximate) {
										map.setZoom(5);
									}
									else {
										map.setZoom(8);
									}
								}

								for (var i=0; i<response.stores.length; i++) {
									var store = response.stores[i];

									var storeInfoDiv = $('<div class="columns small-10"></div>')
										.append($('<h4 class="name">'+store.name+ (store.openSoon ? ' (Coming Soon)' : '') +'</h4>')
											.click(function() {
												showStore(this);
											}))
										.append(store.hours !== '' ? $('<div class="hours">Store hours: '+store.hours+'</div>') : '')
										.append($('<div class="address">'+store.address+' '+store.city+', '+store.state+' '+store.zip+'</div>'))
										.append($('<div class="phone">'+store.phone+'</div>'))
										.append($('<div class="links"></div>')
											.append($('<a href="https://maps.google.com/maps?q='+store.latitude+',+'+store.longitude+'" target="_blank">Google Maps</a> | <a href="https://maps.google.com/maps?f=d&hl=en&daddr='+store.latitude+',+'+store.longitude+'" target="_blank">Get Directions</a>'))
										);

									var storeInfo = $('<div></div>').append($('<div class="store"></div>').append(storeInfoDiv.html())).html();

									var storeDiv = $('<div class="row store"></div>')
										.data('latitude', store.latitude)
										.data('longitude', store.longitude)
										.append($('<div class="columns small-2 pin'+ (store.openSoon ? ' open-soon' : '') +'"></div>')
											.click(function() {
												showStore(this);
											}))
										.append(storeInfoDiv);

									var marker = new google.maps.Marker({
										position: new google.maps.LatLng(store.latitude, store.longitude),
										title: store.name,
										icon: '/store/resources/images/icons/store-location-'+ (store.openSoon ? 'coming' : 'open') +'.png',
										animation: google.maps.Animation.DROP,
										info: storeInfo,
										map: map
									});

									storeDiv.data('marker', marker)

									storeList.append(storeDiv);

									google.maps.event.addListener(marker, 'click', function() {
										infoWindow.setContent(this.info);
										infoWindow.open(map, this);
									});
								}

								resultCount = response.stores.length;
							}
							else {
								var error = response.error;
								if (error === null || error === '') {
									error = 'An error has occurred, please try again.';
								}
								storeList.append($('<div class="row error"><div class="small-12 columns"><h4 class="heading">ERROR</h4></div><div class="small-12 columns"><p>'+error+'</p></div></div>'));

								resultCount = 0;
							}

							// Fire the analytics event
							if (TAGMAN && TAGMAN.fireEvent) {
								TAGMAN.fireEvent('STORE_LOCATOR_PAGE', {
									search_locator_keyword: query,
									search_locator_noresults: resultCount,
									storeLocatorPage: true,
									page_type: 'store_locator'
								});
							};
						}
					});

					return false;
				});

				function showStore(element) {
					var storeDiv = $($(element).parents('.store'));
					//map.setCenter(new google.maps.LatLng(storeDiv.data('latitude'), storeDiv.data('longitude')));
					//map.setZoom(13);
					google.maps.event.trigger(storeDiv.data('marker'), 'click');
				}
			}*/

			init : function () {
				// Initialize the map
				var map, infoWindow, markerList = [];
				$(window).load(function() {
					var mapOptions = {
						center: new google.maps.LatLng(38.6,-97),
						zoom: 4,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
					infoWindow = new google.maps.InfoWindow();
				});

				// Hookup the locator search form
				$('.locator-search-button').click(function() {
					$('#locator-form').submit();
					return false;
				});

				// If there's a previous query stored in the hash, use it to initialize the map
				$(window).on('hashchange load', function() {
					var hashSplit = window.location.hash.split('#');

					if (hashSplit.length >= 2) {
						var query = hashSplit[1];
						$('#locator-form input[name=locationQuery]').val(query);
						$('.locator-search-button').click();
					}
				});

				$('#locator-form-zip').submit(function() {
					var query = $('#locator-form-zip input[name=locationZip]').val();
					var zip = $('#locator-form-zip input[name=locationZip]').val();
					var city = $('#locator-form input[name=locationCity]').val();
					var state = $('#locator-form select[name=locationState]').val();
					if(state) {
						query = state;
					}
					if(zip) {
						query = zip;
					}
					if(city && state){
						query = city + "," + state;
					}
					// Store the query in the hash in case a shopper leaves the page and comes back
					window.location.hash = query;
					var storeList = $('#store-list');
					storeList.empty();
					storeList.append($('<div class="loading"></div>'));
					$.ajax({
						url: '/store/browse/json/storeLocatorResults.jsp?locationQuery=' + query,
						dataType: 'json',
						success: function(response) {
							var storeList = $('#store-list');
							storeList.empty();
							// remove markers from map and delete
							clearMarkers(markerList);
							// reset the marker list
							markerList = [];
							if (response.success && response.stores.length > 0) {
								if (response.baseLocation) {
									map.setCenter(new google.maps.LatLng(response.baseLocation.latitude, response.baseLocation.longitude));
									if (response.baseLocation.isApproximate) {
										map.setZoom(5);
									} else {
										map.setZoom(8);
									}
								}
								for (var i=0; i<response.stores.length; i++) {
									var store = response.stores[i];
									var storeInfoDiv = $('<div class="columns small-10"></div>')
										.append($('<h4 class="name">'+store.name+ (store.openSoon ? ' (Coming Soon)' : '') +'</h4>')
										.click(function() {
											showStore(this);
										}))
										.append(store.hours !== '' ? $('<div class="hours">Store hours: '+store.hours+'</div>') : '')
										.append($('<div class="address">'+store.address+' '+store.city+', '+store.state+' '+store.zip+'</div>'))
										.append($('<div class="phone">'+store.phone+'</div>'))
										.append($('<div class="links"></div>')
										.append($('<a href="https://maps.google.com/maps?q='+store.latitude+',+'+store.longitude+'" target="_blank">Google Maps</a> | <a href="https://maps.google.com/maps?f=d&hl=en&daddr='+store.latitude+',+'+store.longitude+'" target="_blank">Get Directions</a>'))
									);
									var storeInfo = $('<div></div>').append($('<div class="store"></div>').append(storeInfoDiv.html())).html();
									var storeDiv = $('<div class="row store"></div>')
										.data('latitude', store.latitude)
										.data('longitude', store.longitude)
										.append($('<div class="columns small-2 pin'+ (store.openSoon ? ' open-soon' : '') +'"></div>')
										.click(function() {
											showStore(this);
										}))
										.append(storeInfoDiv);
									var marker = new google.maps.Marker({
										position: new google.maps.LatLng(store.latitude, store.longitude),
										title: store.name,
										icon: '/store/resources/images/icons/store-location-'+ (store.openSoon ? 'coming' : 'open') +'.png',
										animation: google.maps.Animation.DROP,
										info: storeInfo,
										map: map
									});
									storeDiv.data('marker', marker)
									storeList.append(storeDiv);
									markerList.push(marker);
									google.maps.event.addListener(marker, 'click', function() {
										infoWindow.setContent(this.info);
										infoWindow.open(map, this);
									});
								}
								resultCount = response.stores.length;
							} else {
								var error = response.error;
								if (error === null || error === '') {
									error = 'An error has occurred, please try again.';
								}
								storeList.append($('<div class="row error"><div class="small-12 columns"><h4 class="heading">ERROR</h4></div><div class="small-12 columns"><p>'+error+'</p></div></div>'));
								resultCount = 0;
							}
							// Fire the analytics event
							if (TAGMAN && TAGMAN.fireEvent) {
								TAGMAN.fireEvent('STORE_LOCATOR_PAGE', {
									search_locator_keyword: query,
									search_locator_noresults: resultCount,
									storeLocatorPage: true,
									page_type: 'store_locator'
								});
							};
						}
					});
					return false;
				});

				$('#locator-form').submit(function() {
					var query;
					var zip = $('#locator-form-zip input[name=locationZip]').val();
					var city = $('#locator-form input[name=locationCity]').val();
					var state = $('#locator-form select[name=locationState]').val();
					if(state) {
						query = state;
					}
					if(zip) {
						query = zip;
					}
					if(city && state){
						query = city + "," + state;
					}
					// Store the query in the hash in case a shopper leaves the page and comes back
					window.location.hash = query;
					var storeList = $('#store-list');
					storeList.empty();
					storeList.append($('<div class="loading"></div>'));
					$.ajax({
						url: '/store/browse/json/storeLocatorResults.jsp?locationQuery=' + query,
						dataType: 'json',
						success: function(response) {
							var storeList = $('#store-list');
							storeList.empty();
							// remove markers from map and delete
							clearMarkers(markerList);
							// reset the marker list
							markerList = [];
							if (response.success && response.stores.length > 0) {
								if (response.baseLocation) {
									map.setCenter(new google.maps.LatLng(response.baseLocation.latitude, response.baseLocation.longitude));
									if (response.baseLocation.isApproximate) {
										map.setZoom(5);
									} else {
										map.setZoom(8);
									}
								}
								for (var i=0; i<response.stores.length; i++) {
									var store = response.stores[i];
									var storeInfoDiv = $('<div class="columns small-10"></div>')
										.append($('<h4 class="name">'+store.name+ (store.openSoon ? ' (Coming Soon)' : '') +'</h4>')
										.click(function() {
											showStore(this);
										}))
										.append(store.hours !== '' ? $('<div class="hours">Store hours: '+store.hours+'</div>') : '')
										.append($('<div class="address">'+store.address+' '+store.city+', '+store.state+' '+store.zip+'</div>'))
										.append($('<div class="phone">'+store.phone+'</div>'))
										.append($('<div class="links"></div>')
										.append($('<a href="https://maps.google.com/maps?q='+store.latitude+',+'+store.longitude+'" target="_blank">Google Maps</a> | <a href="https://maps.google.com/maps?f=d&hl=en&daddr='+store.latitude+',+'+store.longitude+'" target="_blank">Get Directions</a>'))
									);
									var storeInfo = $('<div></div>').append($('<div class="store"></div>').append(storeInfoDiv.html())).html();
									var storeDiv = $('<div class="row store"></div>')
										.data('latitude', store.latitude)
										.data('longitude', store.longitude)
										.append($('<div class="columns small-2 pin'+ (store.openSoon ? ' open-soon' : '') +'"></div>')
										.click(function() {
											showStore(this);
										}))
										.append(storeInfoDiv);
									var marker = new google.maps.Marker({
										position: new google.maps.LatLng(store.latitude, store.longitude),
										title: store.name,
										icon: '/store/resources/images/icons/store-location-'+ (store.openSoon ? 'coming' : 'open') +'.png',
										animation: google.maps.Animation.DROP,
										info: storeInfo,
										map: map
									});
									storeDiv.data('marker', marker)
									storeList.append(storeDiv);
									markerList.push(marker);
									google.maps.event.addListener(marker, 'click', function() {
										infoWindow.setContent(this.info);
										infoWindow.open(map, this);
									});
								}
								resultCount = response.stores.length;
							} else {
								var error = response.error;
								if (error === null || error === '') {
									error = 'An error has occurred, please try again.';
								}
								storeList.append($('<div class="row error"><div class="small-12 columns"><h4 class="heading">ERROR</h4></div><div class="small-12 columns"><p>'+error+'</p></div></div>'));
								resultCount = 0;
							}
							// Fire the analytics event
							if (TAGMAN && TAGMAN.fireEvent) {
								TAGMAN.fireEvent('STORE_LOCATOR_PAGE', {
									search_locator_keyword: query,
									search_locator_noresults: resultCount,
									storeLocatorPage: true,
									page_type: 'store_locator'
								});
							};
						}
					});
					return false;
				});

				function showStore(element) {
					var storeDiv = $($(element).parents('.store'));
					//map.setCenter(new google.maps.LatLng(storeDiv.data('latitude'), storeDiv.data('longitude')));
					//map.setZoom(13);
					google.maps.event.trigger(storeDiv.data('marker'), 'click');
				}

				function clearMarkers (markers){
					for (var x = 0; x < markers.length; x++) {
						//remove marker from map
						markers[x].setMap(null);
						// delete the marker
						markers[x] = null;
					}
				}
			}
		},
		browse : {
			init : function () {
				var hasCrossSells = false;

				$('.cross-sells[data-source]').each(function() {
					hasCrossSells = true;

					var container = $(this);
					$.ajax({
						url: container.data('source'),
						dataType: 'html',
						success: function(response) {
							container.html(response);
							MAINInit.browse.initProductGrid();
						}
					});
				});

				if (!hasCrossSells) {
					MAINInit.browse.initProductGrid();
				}

				if ($('#browse-content').hasClass('nested-categories')) {
					MAINInit.browse.initNestedProductGrid();

				}



			},
			initNestedProductGrid : function () {

				var productsPerSlide=4;
				if ($('html').hasClass('small-screen'))
				{
					productsPerSlide=2;
				}

				var totalProducts = 0;
				$('.nested-category').each(function(){
					var products = $(this).find('.product-grid .category-product');
					var categoryProdCount = $(this).data('prodtotal');
					totalProducts += categoryProdCount;
					if (categoryProdCount <= productsPerSlide)
					{
						$(this).find('.nested-category-prev').hide();
						$(this).find('.nested-category-next').hide();

					}

					var productContainer = $(this).find('.nested-product-container');
					var carouselElement = $('<ul data-orbit class="product-carousel" >');
					var carouselHeight = $('.category-product:first').outerHeight();
					carouselElement.height(carouselHeight);
					var currentProductGridContainer = null;
					$(this).append(carouselElement);
					products.each(function(i){
						if (i % productsPerSlide == 0)
						{
							var listElement = $('<li class="product-carousel-item">');
							currentProductGridContainer = $('<ul class="small-block-grid-2 medium-block-grid-4 large-block-grid-4 product-grid" >');
							carouselElement.append(listElement);
							listElement.append(currentProductGridContainer);

						}
						$(this).detach().appendTo(currentProductGridContainer);
					});

					productContainer.remove();

//					$(this).find('.nested-category-prev').click(function () {
//						$(this).parent().find('.orbit-prev').click();
//						return false;
//					});

//					$(this).find('.nested-category-next').click(function () {
//						$(this).parent().find('.orbit-next').click();
//						return false;
//					});

				});

				//$('.product-grid').orbit();
				//$(document).foundation('orbit').init();
				$(document).foundation('orbit', { timer:false, animation:'push' });
				$(document).foundation('orbit', 'start');

				if (typeof (totalProducts) != 'undefined' && totalProducts != 'undefined')
				{
					$('.product-count').html(totalProducts + ' items');
				}

			},
			initProductGrid : function () {

				// Add click handlers to the grid view buttons
				$('.grid-view-links a').click(function() {
					var columns = $(this).text();
					setGridColumns(columns);
					return false;
				});

				// Watch for changes to the display of the grid view links so we can respond to changes from mobile to tablet to desktop
				$(window).bind("load resize", function() {

					setGridColumns(getInitialColumns());

					MAINInit.browse.initProductTiles();

					if ($('html').hasClass('small-screen')) {
						$('.side-nav > .category .split:not(.clicked)').each(function() {
							$(this).removeClass('opened');
							$($(this).parent()).find('> .category-list').addClass('hidden');
						});
					}
					else if (!$('html').hasClass('medium-screen')) {
						$('.side-nav > .category .split:not(.clicked)').each(function() {
							// disabled to allow for new fourth level behavior in left and bottom nav
							//$(this).addClass('opened');
							//$($(this).parent()).find('> .category-list').removeClass('hidden');
						});
					}
					$('.side-nav > .category > .side-nav .category.current .split:not(.clicked)').each(function() {
						$(this).addClass('opened');
						$($(this).parent()).find('> .category-list').removeClass('hidden');
					});
					$('.side-nav > .category > .side-nav .category > .side-nav .category.current').each(function() {
						$($(this).parent()).removeClass('hidden');
						$($(this).parents()).find('.thirdcategory > .split').addClass('opened');
					});


				});

				function setGridColumns(columns) {
					//console.log('Attempting to set grid to '+columns+' columns.');

					if (columns == null || columns > 5) {
						columns = 5;
					}



					if (!$('#browse-content').hasClass('nested-categories')) {

						if ($('#browse-content').hasClass('search-results')) {
							$.cookie('searchGridColumns', columns, {path: '/'});
						}
						else {
							$.cookie('categoryGridColumns', columns, {path: '/'});
						}

						// Narrow down the prefered view to anoption that is actually available, given the viewport
						var actualSelection = Math.max(getViewMinColumns(), Math.min(getViewMaxColumns(), columns));

						//console.log('Setting grid to '+columns+' columns.');

						// Set the copy container heights to default so they don't affect the max-height calculation later
						$('.product-copy').height('auto');

						// Change the class of the grid to affect the layout
						$('#product-grid')
								.removeClass()
								.addClass('small-block-grid-2')
								.addClass('medium-block-grid-'+actualSelection)
								.addClass('large-block-grid-'+actualSelection);

						// Change the active link
						$('.grid-view-links dd').removeClass('active');
						$($('.grid-view-links a:contains('+actualSelection+')').parent()).addClass('active');

					}

					// Resize the product images to be all the same height
					var firstImgHeight = $('.category-product-img img:first').height();
					//console.log("Height:"+firstImgHeight);
					$('.category-product-img img:not(:first):first-child').height(firstImgHeight);

					// Resize the height of the product-copy section to account for differences in text-length across the cells in a row
					var productCopySections = $('.product-copy');
					var maxRowHeight = 0;
					// find the greatest product copy height
					productCopySections.each(function(index) {
						if ($(this).height() > maxRowHeight) {
							maxRowHeight = $(this).height();
						}
					});

					// set all product copy sections to the maximum found height
					productCopySections.height(maxRowHeight);

				}

				function getViewMaxColumns() {
					return $('.grid-view-links a:visible:last').data('grid-view');
				}

				function getViewMinColumns() {
					return $('.grid-view-links a:visible:first').data('grid-view');
				}

				function getCurrentColumns() {
					var columns = $('.grid-view-links dd.active a').data('grid-view');
					if (columns === undefined || columns === null) {
						columns = 2;
					}
					return columns;
				}

				function getInitialColumns() {
					var columns;

					if ($('#browse-content').hasClass('search-results')) {
						columns = $.cookie('searchGridColumns');
					}
					else {
						columns = $.cookie('categoryGridColumns');
					}

					if (columns == null) {
						if ($('html').hasClass('large-screen')) {
							if ($('#product-grid').hasClass('large-block-grid-3')) {
								columns = 3;
							}
							else if ($('#product-grid').hasClass('large-block-grid-4')) {
								columns = 5;
							}
							else {
								columns = 5;
							}
						}
						else if ($('html').hasClass('medium-screen')) {
							if ($('#product-grid').hasClass('medium-block-grid-2')) {
								columns = 2;
							}
							else if ($('#product-grid').hasClass('medium-block-grid-3')) {
								columns = 3;
							}
							else {
								columns = 4;
							}
						}
						else {
							columns = 2;
						}
					}
					//console.log('Initial Columns: '+columns);
					return columns;
				}
			},
			initProductTiles : function () {

				// Make sure at least one swatch is selected for each product
				$('.product-tile:not(.initialized) .category-product-img .swatches').each(function() {
					if ($(this).find('.active').size() == 0) {
						$(this).find('a.button:first').addClass('active');
					}
				});

				// Add click handler to the product tile color swatches
				$('.product-tile:not(.initialized) .category-product-img .swatches a.button').click(function() {

					// Change the product face out
					var productImage = $($($($(this).parent()).parent()).parent()).find('.product-image');
					var imageSplit = $(productImage).attr('src').split('_');
					if (imageSplit.length > 2) {
						imageSplit[imageSplit.length-2] = $(this).data('color-code');
					}
					var newSrc = imageSplit.join('_');
					//var newSrc = $(productImage).data('src-template').replace('COLOR', $(this).data('color-code'));
					productImage.attr('src', newSrc);

					// Change the active indicator
					$($($(this).parent()).find('a.button')).removeClass('active');
					$(this).addClass('active');

					return false;
				});

				// Hide product tile color swatches if there are too many
				var MAX_COLOR_BUTTONS = 6;
				$('.product-tile:not(.initialized) .category-product-img .swatches').each(function() {
					var buttons = $($(this).find('a.button'));
					var showMoreButton = $('<a href="#" class="more-colors">More</a>');
					var productLink = $($(this).parent()).find('.product-link');
					showMoreButton.attr('href', productLink.attr('href'));

					if (buttons.size() > MAX_COLOR_BUTTONS) {
						buttons.each(function(index) {
							if (index >= MAX_COLOR_BUTTONS - 3) {
								$(this).addClass('hidden');
							}
						});
						showMoreButton.click(function() {
							if (!$('html').hasClass('small-screen')) {
								$($(this).parent()).find('a.button').removeClass('hidden');
								$(this).addClass('hidden');
								return false;
							}
						});
					}
					else {
						showMoreButton.addClass('hide-for-medium-up');
					}
					$($(this).find('.swatch-container')).append(showMoreButton);
				});

				// Intercept the product-link click to add in the swatch selection
				$('.product-tile:not(.initialized)').each(function() {
					var tile = $(this);
					var pdpUrl = tile.find(".product-link").attr("href");
					tile.find('.product-link').click(function() {
						var color = tile.find('.swatches a.active').data('color-code');
						// if no swatches and has a master product then
						// look for the data attribute describing
						// the color associated with this product.
						// In theory a product under a master
						// product could have multiple colors,
						// hence we leave it alone if there
						// are swatches
						if (tile.find('.swatches').length === 0
							&& tile.data('master-product') !== '')
						{
							color = $(this).data('color-code-for-master');
						}
						if (color != null) {
							var href = $(this).attr('href').split('?')[0];

							$(this).attr('href', href + '?color=' + color);
						}
					});
					tile.find('.quick-view-button').click(function() {
						var color = tile.find('.swatches a.active').data('color-code');
						var action = $(this).attr('href');


						// if no swatches and has a master product then
						// look for the data attribute describing
						// the color associated with this product
						if (tile.find('.swatches').length === 0
							&& tile.data('master-product') !== '')
						{
							color = $(this).data('color-code-for-master');
						}

						$('#quick-view-modal').foundation('reveal', 'open', {
							url: action,
							success: function(data) {
								console.log(pdpUrl);
								MAINInit.product.initQuickView(color, pdpUrl);
							}
						});

						return false;
					});

					// Resize the product image to match the heights of the otehr tiles
					var newImageHeight = $('.category-product-img img:first').height();
					$(tile.find('.category-product-img img:not(:first):first-child')).height(newImageHeight);
					var newLiHeight = $('.category-product:first').height();
					$(tile.find('.category-product:not(:first):first-child')).height(newLiHeight);

					// Mark the tile as initialized
					tile.addClass('initialized');
				});
			}
		},
		category : {
			init : function () {
				var BASE_N_VALUES;

				BASE_N_VALUES = getNValue($('#browse-content').data('base-action')).split('+');

				//Initialize the selectors
				initializeSelector('gender');
				initializeSelector('category');
				initializeSelector('color');
				initializeSelector('size');

				// Fix the gender selectors so they aren't treadted like multi-select
				$('#gender-selector a.button.active').each(function() {
					var removalNValues = getNValue($(this).attr('href')).split('+');
					var remainingNValues = removalNValues.except(BASE_N_VALUES);

					$('#gender-selector a.button:not(.active)').each(function() {
						var localNValues = getNValue($(this).attr('href')).split('+');
						var newNValues = localNValues.except(BASE_N_VALUES);
						var combinedNValues = $.merge(remainingNValues, newNValues);

						$(this).attr('href',getAction(combinedNValues));
					});
				});

				// Add click handlers to the subcategory dropdowns in the category filter
				$('.subcategory-selector-link').click(function() {
					$($(this).parent()).toggleClass('opened');
					$($($($(this).parent()).parent()).find('.subcategory-selector')).toggleClass('hidden');
					return false;
				});

				// Animate the scroll for "back to top" functionality
				$('a[href="#cart-section"]').click(function() {
					var destName = $(this).attr('href').substring(1);
					var destination = $('[name="'+destName+'"]');

					$('html, body').animate({
						scrollTop: $(destination).offset().top - 20
					});

					return false;
				});
				$('a[href="#main-section"]').click(function() {
					var destName = $(this).attr('href').substring(1);
					var destination = $('[name="'+destName+'"]');

					$('html, body').animate({
						scrollTop: $(destination).offset().top - 20
					});

					return false;
				});

				// Resize the selectors to the largest one for consistency
				var maxWidth = 0;
				var selectorLabels = $('.selector-label');
				selectorLabels.each(function() {
					maxWidth = ($(this).width() > maxWidth) ? $(this).width() : maxWidth;
				});
				selectorLabels.width(maxWidth);

				// Initialize infinite scrolling for tablet and mobile
				if (!$('ul.pagination:first').is(':visible')) {
					$('#product-grid').infinitescroll({
						navSelector	: 'ul.pagination:first',				// Selector for the paged navigation (it will be hidden)
						nextSelector: 'ul.pagination:first .arrow:last a',	// Selector for the NEXT link (to page 2)
						itemSelector: '#product-grid .category-product',	// Selector for all items you'll retrieve
						loading		: {
							msgText: 'Loading more products...',
							finishedMsg: '',
							img: null,
							selector: '#main-content',
							msg: $('<span class="loading"></span>'),

							/* This function was added to jquery.infinitescroll.js for rue. Upgrading jquery.infinite.scroll will break this. */
							startCallback: function() {
								if ($('[data-next-page-url]:last-child').data('next-page-url') == 'LAST_PAGE') {
									return false;
								}
								$('.more-products-button').addClass('loading');
							},

							/* This function was added to jquery.infinitescroll.js for rue. Upgrading jquery.infinite.scroll will break this. */
							finishCallback: function() {
								$('.more-products-button').removeClass('loading');
								MAINInit.browse.initProductTiles();

								if ($('[data-next-page-url]:last-child').data('next-page-url') == 'LAST_PAGE') {
									disableInfiniteScroll();
								}
							}
						},
						path: function(page) {
							return $('[data-next-page-url]:last-child').data('next-page-url');
						},
						pixelsFromNavToBottom: 300,
						errorCallback: function() {
							disableInfiniteScroll();
						},
						debug: true
					});

					// Just in-case infinite scrolling isn't working, add a fallback button
					$('.more-products-button').click(function() {
						var thisButton = $(this);
						thisButton.addClass('loading');

						$.ajax({
							url: $('[data-next-page-url]:last-child').data('next-page-url'),
							dataType: 'html',
							complete: function(response) {
								thisButton.removeClass('loading');
							},
							success: function(response) {
								var products = $(response).find('#product-grid .category-product');

								// Add the new products to the grid
								$('#product-grid').append(products);

								MAINInit.browse.initProductTiles();

								var nextLink = $($(response).find('ul.pagination:first .arrow:last a'));
								if ($(nextLink.parent()).hasClass('unavailable')) {
									disableInfiniteScroll();
								}
							},
							error: function() {
								disableInfiniteScroll();
							}
						});
						return false;
					});
				}

				// Run common code for the browse and product display pages
				MAINInit.browse.init();

				function disableInfiniteScroll() {
					$('.more-products-button').addClass('disabled').unbind('click').click(function() {return false;}).hide();
				}

				function initializeSelector(selectorName) {
					var selector = $('#' + selectorName + '-selector');

					if (selector.size() > 0) {

						// Populate the selectors' info sections
						var removalLinks = $('#' + selectorName + '-selector a.active[data-remove-action]');
						var selectedLinkCount = removalLinks.size()

						// If we remove the gender, selected categories need to go with it
						if (selectorName == 'gender') {
							$.merge(removalLinks, $('#category-selector a.active[data-remove-action]'));
						}

						if (selectedLinkCount > 0) {
							var infoHtml = selectedLinkCount + ' Selected | <a href="' + getConsolidatedRemovalLink(removalLinks) + '">Clear All '+selector.data('plural-label')+'</a>';
						}
						else {
							var infoHtml = 'None Selected';
						}
						$('#' + selectorName + '-selector-info').html(infoHtml);


						// Populate the selectors' active value displays
						var selectedOption = '';
						if (selectedLinkCount == 0) {
							selectedOption = 'All';
						}
						else if (selectedLinkCount == 1) {
							selectedOption = $(removalLinks[0]).data('name');
						}
						else {
							selectedOption = 'Multiple';
						}
						$('#' + selectorName + '-selector-current-value').html(selectedOption);


						// If the button has children, determine the active value from it's children
						($('#' + selectorName + '-selector a.button.split ~ ul')).each(function() {
							var enabledChildren = $($(this).find('a:not(.disabled):not([data-button-clone])'));

							if (enabledChildren.size() > 0) {
								var allActive = true;
								var oneActive = false;
								enabledChildren.each(function() {
									if (!$(this).hasClass('active')) {
										allActive = false;
									}
									else {
										oneActive = true;
									}
								});

								if (allActive) {
									$($($(this).parent()).find('a.button.split')).addClass('active');
									$($(this).find('a[data-button-clone]')).addClass('active');
								}
								else if (oneActive) {

									// If a child is selected but the parent is not, expand the parent
									$($($(this).parent()).find('a.button.split')).addClass('opened');
									$(this).removeClass('hidden');
								}
							}
						});

						// If there is an update button, assume multi-select. We need to add click handlers to both the option links and the update button itself
						var updateButton = $('#' + selectorName + '-selector-update');
						if (updateButton.size() > 0) {

							// Add click handlers to option links
							$('#' + selectorName + '-selector .options a').click(function() {

								// If the button is an "All" button, click the real button instead
								if ($(this).data('button-clone')) {
									$('#'+$(this).data('button-clone')).trigger('click');
								}
								else {
									$(this).toggleClass('active');

									// If the button has children, activate/deactivate them all
									if ($(this).hasClass('split')) {
										var activeChildButtons = $($(this).parent()).find('.subcategory-selector .button:not(.hidden)');

										if ($(this).hasClass('active')) {
											activeChildButtons.addClass('active');
										}
										else {
											activeChildButtons.removeClass('active');
										}
									}

									// If the button has an "All" button sibling, be sure to deselect it when deselecting this button
									if (!$(this).hasClass('active') && $(this).data('button-parent')) {

										// Deselect the parent
										$('#'+$(this).data('button-parent')).removeClass('active');

										// Deselect the All button
										$($($($(this).parent()).parent()).find('.button[data-button-clone]')).removeClass('active');
									}

									$('#' + selectorName + '-selector-update').removeClass('disabled');
								}
								return false;
							});

							// Add click handler to update button
							updateButton.click(function() {

								// Merge the set of N-values from all options marked as currrent
								var combinedNValues = [];

								// Add any new N-values by finding any active options with an addAction
								var newOptions = $('#' + selectorName + '-selector a.active[data-add-action]');
								newOptions.each(function() {

									var localNValues = $.makeArray($(getNValue($(this).data('add-action')).split('+')));
									var newNValues = localNValues.except(BASE_N_VALUES);
									combinedNValues = $.merge(combinedNValues, newNValues);
								});

								// Add any N-value from the current request
								combinedNValues = $.merge(combinedNValues, BASE_N_VALUES);

								// Remove any old N-values by finding any inactive options with a removeAction
								var oldOptions = $('#' + selectorName + '-selector a:not(.active)[data-remove-action]');
								oldOptions.each(function() {
									var localNValues = getNValue($(this).data('remove-action')).split('+');
									var removalNValues = BASE_N_VALUES.except(localNValues);
									combinedNValues = combinedNValues.except(removalNValues);
								});

								window.location.href = getAction(combinedNValues);

								return false;
							});
						}

						// If an entire size group is empty, hide it
						$('.' + selectorName + '-selector-group').each(function() {
							if ($(this).find('.button:not(.hidden)').size() <= 0) {
								$($(this).parent()).addClass('hidden');
							}
							else {

								// Ensure each option within a size group has a uniform button width
								var maxWidth = 0;
								var buttons = $(this).find('a.button');
								buttons.each(function() {
									maxWidth = ($(this).width() > maxWidth) ? $(this).width() : maxWidth;
								});
								buttons.width(maxWidth);
							}
						});

						// Hide the entire selector if there are no options
						if ($('#' + selectorName + '-selector .button:visible:not(.selector-update-button)').size() <= 0) {
							$($('#' + selectorName + '-selector').parent()).addClass('hidden');
						}

					}
				}

				function getConsolidatedRemovalLink(removalLinks) {
					var combinedNValues = BASE_N_VALUES;
					for (var i=0; i<removalLinks.length; i++) {
						var localNValues = getNValue($(removalLinks[i]).attr('href'));
						var removalNValues = BASE_N_VALUES.except(localNValues);
						var combinedNValues = combinedNValues.except(removalNValues);
					}
					return getAction(combinedNValues);
				}

				function getCombinedRemovalLink(link1, link2) {
					var nValue1 = getNValue(link1);
					var nValue2 = getNValue(link2);

					var combinedNParameter = '';
					var combinedNValues = getArrayIntersection(nValue1.split('+'), nValue2.split('+'));

					/* ie8 doesn't support forEach *//*
					combinedNValues.forEach(function(nValue, i) {
						combinedNParameter += (i != 0 ? '+' : '') + nValue;
					}); */
					combinedNValues.forEach(function(nValue, i) {
						combinedNParameter += (i != 0 ? '+' : '') + nValue;
					});

					return link1.replace(nValue1, combinedNParameter);
				}

				function getNValue(action) {
					var nValue = '';
					var linkSplit = action.split('?');

					var query = linkSplit[linkSplit.length - 1];
					var querySplit = query.split('&');

					/* ie8 doesn't support forEach *//*
					querySplit.forEach(function(parameter){
						if (parameter.indexOf('N=') == 0) {
							nValue = parameter.split('=')[1];
						}
					});*/
					querySplit.forEach(function(parameter){
						if (parameter.indexOf('N=') == 0) {
							nValue = parameter.split('=')[1];
						}
					});

					return nValue;
				}

				function getAction(nValueArray) {

					// Rebuild the N-value parameter
					var combinedNParameter = '';
					/* ie8 doesn't support forEach *//*
					nValueArray.getUnique().forEach(function(nValue, i) {
						if (nValue != '') {
							combinedNParameter += (i != 0 ? '+' : '') + nValue;
						}
					});*/
					nValueArray.getUnique().forEach(function(nValue, i) {
						if (nValue != '') {
							combinedNParameter += (i != 0 ? '+' : '') + nValue;
						}
					});

					// Replace the N parameter in the current URL
					var url = document.URL.split('#')[0];
					var replacementNParameter = getNValue(url);


					if (replacementNParameter != '') {
						if (combinedNParameter.length == 0)
						{
							var combinedAction = url.replace('N=' + replacementNParameter, '');
							if (combinedAction.indexOf('?') == combinedAction.length - 1)
							{
								combinedAction = combinedAction.substring(0,combinedAction.length - 1);

							}
						}
						else
						{
							var combinedAction = url.replace(replacementNParameter, combinedNParameter);
						}
					}
					else {
						var combinedAction = url + ((combinedNParameter.length > 0) ? (url.indexOf('?')>=0 ? '&' : '?') + 'N=' + combinedNParameter : '');
					}

					return combinedAction;
				}

				function getArrayIntersection(a1, a2) {
					return $.map(a1,function(a){return $.inArray(a, a2) < 0 ? null : a;});
				}

				/* Hack to Reflow category images on IOS */
				if ( $("html").hasClass("medium-screen") ){
					setTimeout(function(){ $(document).foundation('interchange', 'reflow'); }, 1000);
				}
			}
		},
		checkout : {
			init : function () {
				$('.close-button').click(function(){
					$('#paypal-modal').foundation('reveal', 'close');
					$('#paypal-modal').remove();
				});

				/* remove button for small screen was a different form, but we can't duplicate
				 * forms. i made the small screen button a dummy button that submits the
				 * medium/large screen form. */
				$('body').on('click', '#remove-dupe', function(e){
					e.preventDefault();
					$('a[rid=' + $(this).attr('targetRid') + ']').click();
				});

				// suppress mini cart on checkout
				$('.cart-counter').data('dropdown', undefined);
				$('.cart-counter').removeAttr('data-dropdown');
				$('.cart-counter').off('click').click(function(e) {
					e.preventDefault();
				});

				// Connect about shipping modal
				$('.about-shipping-options').click(function() {
					var thisLink = $(this);
					$('#global-large-modal').html($(
						'<h5>Delivery Options and Details</h5>'+
						'All orders are subject for review, including credit card authorization and verification.  As a result on occasion there may be a slight delay'+
						'in order processing, and your patience is greatly appreciated.</br>'+
						'</br>'+
						'<h5>U.S. Shipping </h5>'+
						'rue21 ships to 48 contiguous states, which excludes Alaska and Hawaii. We do not ship to APO addresses or internationally. </br>'+
						'</br>'+
						'<h5>Payment Options</h5>'+
						'rue21 accepts VISA, MasterCard, American Express, Discover, PayPal, ATM/Debit Cards with a VISA or MasterCard logo, rue21 Gift Cards, and rue21'+
						'Merchandise Credit Cards. Sorry, we do not accept international credit cards, personal checks, cashier’s checks, money orders, mall gift'+
						'certificates, COD, or cash for online purchases.</br>'+
						'</br>'+
						'For more information on rue21’s online ordering & shipping, please click <a href="/store/jump/static/14300005">here</a> to view our FAQs.</br>'
					));

					$('#global-large-modal').foundation('reveal', 'open');
					return false;
				});

				// data replacement
				function replaceData(selector, $data) {
					var $container = $(selector),
						$newData = $data.find(selector).html();
					$container.empty();
					$container.html($newData);
				}

				function refreshTotalsPromo($data) {
					replaceData('#promo-errors', $data);
					replaceData('.promo-codes-applied', $data);
					replaceData('.order-summary', $data);
					if (MAIN_CONSTANTS.checkoutPath.indexOf("express") >= 0) {
						var newCartSavings = $data[2];
						$("#cart-savings").empty();
						$("#cart-savings").html($(newCartSavings).html());
					} else {
						replaceData('#cart-savings', $data);
					}
					if ($('#payment-panel-summary').length == 0 || $('#payment-panel-summary').hasClass('in')) {
						var url = '/store' + MAIN_CONSTANTS.checkoutPath + '/includes/paymentPanelOutline.jsp';
						if ($('body').hasClass('paypal-checkout')) {
							url = '/store' +MAIN_CONSTANTS.checkoutPath + '/includes/paymentPaypalOutline.jsp';
						}
						$.get(url, function(ppdata) {
							$('#payment-panel-summary').html(ppdata);
						});
					}
					window.setTimeout(function(){
						$('#ajax-loader').foundation('reveal', 'close');
					}, 200);
				}

				// ajax request error handling
				function ajaxError(xhr, statusText, exception) {
					if (xhr.status == '404') {
						window.location.href = "/store/error_404.jsp";
					}
					else if (xhr.status == '500') {
						window.location.href = "/store/error_500.jsp";
					}
					else {
						window.location.href = "/store/error.jsp";
					}
					window.setTimeout(function(){
						$('#ajax-loader').foundation('reveal', 'close');
					}, 200);
				}

				function promoOpened(data) {
					$('#promo-code').val('');
					refreshTotalsPromo($(data));
				};

				var targetUID,
					removeItemOptions = {
						dataType : 'html',
						data: { removeSubmit: 'submit'},
						beforeSerialize : function($form) {
							$form.validate('validateForm');
							return $form.data('validate').isValid;
						},
						beforeSubmit : function(arr, $form, options) {
							$('#ajax-loader').foundation('reveal', 'open');
						},
						success: function(data) {
							// remove old errors
							$('#cart-errors .form-errors').empty();
							$('#update-error').remove();
							var $data = $(data).filter(function(){return $(this).is('div.container')}),
								$newCartItems = $data.find('#cart-items'),
								$errors = $data.find('.form-errors').html();
							if ($errors.trim().length > 0) {
								$('#cart-errors .form-errors').html($errors);
								$('body').animate({ scrollTop: $('.form-errors').offset().top - 20});
								$('#ajax-loader').foundation('reveal', 'close');
							}
							else {
								// update cart items
								if (typeof $newCartItems !== 'undefined') {
									MAIN.profileController.getProfileStatus();
									/* no items left */
									if ($data.find('.cart-empty-message').length > 0) {
										window.setTimeout(function(){
											window.location.href = '/store' + MAIN_CONSTANTS.checkoutPath + "/cart.jsp";
										}, 100);
									}
									/* get/replace item values from data */
									else {
										$('#cart-items').children('div').each(function(){
											var $this = $(this),
												ci = this.id;
											$this.find('.product-price').html($newCartItems.find('#' + ci + ' .product-price').html());
											$this.find('.quantity-input').val($newCartItems.find('#' + ci + ' .quantity-input').val());
											$this.find('.removeId').val($newCartItems.find('#' + ci + ' .removeId').val());
											$this.find('.removeItemFromCart').attr('rid', $newCartItems.find('#' + ci + ' .removeItemFromCart').attr('rid'));
											$this.find('.remove-id').val($newCartItems.find('#' + ci + ' .remove-id').val());
										});
										// update cart count and shipping method in checkout
										if ($('body').hasClass('single-page-checkout')) {
											$('#checkout-cart-count').html($data.find('#checkout-cart-count').html());
											$('#shipping-methods').html($data.find('#shipping-methods').html());
										}
										// get/replace order values from data
										refreshTotalsPromo($(data));
										// slide
										$('#ci-' + targetUID).slideUp( 400, function(){ $('#ci-' + targetUID).remove() });
										$('#ajax-loader').foundation('reveal', 'close');
									}
								}
								else {
									$('#ajax-loader').foundation('reveal', 'close');
								}
							}
						},
						error: function(xhr, statusText, exception) {
							$('#ajax-loader').foundation('reveal', 'close');
							console.log('Request Failed: ' + statusText + exception);
						}
					},
					updateQuantityOptions = {
						dataType : 'json',
						data: { updateSubmit: 'submit'},
						url: '/store' + MAIN_CONSTANTS.checkoutPath +'/json/checkoutJSON.jsp',
						beforeSerialize : function($form) {
							$form.validate('validateForm');
							return $form.data('validate').isValid;
						},
						beforeSubmit : function(arr, $form, options) {
							$('#ajax-loader').foundation('reveal', 'open');
						},
						success: function(json) {
							$('#cart-errors').empty();
							// show errors
							console.log(json);
							if (typeof json.formErrors !== 'undefined'){
								var errors = json.formErrors.errors;
								for (var i=0; i<errors.length; i++) {
									var form = errors[i].form,
										$field = $('#' + form + ' #' + errors[i].field),
										$form = $('#' + form);
									errorObj = {};
									errorObj.target = {};
									errorObj.fields = [];
									errorObj.errors = [];
									errorObj.target = $field;
									errorObj.fields.push($field);
									errorObj.errors = errors[i].error;
									// if the field or form is missing put the error at the top
									if ($field.length < 1 && $form.length > 0) {
										$("#cart-errors").append('<small class="error">' + errorObj.errors + '</small>');
									}
									else if ($field.length < 1 && $form.length < 1) {
										$("#cart-errors").append('<small class="error">' + errorObj.errors + '</small>');
									}
									else {
										$form.validate('showFieldError', errorObj);
									}
								}
								$('#ajax-loader').foundation('reveal', 'close');
							}
							// see if order total has been covered (open/close panels if needed)
							else {
								if (typeof json.OrderTotalCovered !== 'undefined') {
									var OrderTotalCovered = json.OrderTotalCovered;
									console.log(json);
									if ($('#payment-panel').hasClass('in') && OrderTotalCovered === "false") {
										$('#credit_card_data').show();
										$('#paypal_data').show();
										$('body').animate({ scrollTop: $('.payment-panel').offset().top - 20});
									}
									else if ($('#payment-panel').hasClass('in') && OrderTotalCovered === "true") {
										$('#credit_card_data').hide();
										$('#paypal_data').hide();
										$('body').animate({ scrollTop: $('.payment-panel').offset().top - 20});
									}
									else if ($('#review-panel').hasClass('in') && OrderTotalCovered === "false") {
										$('#credit_card_data').show();
										$('#paypal_data').show();
										$('#payment-panel-edit').hide();
										$('#payment-panel-summary').collapse('hide');
										$('#review-panel').collapse('hide');
										$('#payment-panel').collapse('show');
										$('body').animate({ scrollTop: $('.payment-panel').offset().top - 20});
									}
								}
								$.get(window.location.pathname, function(data){
									// remove old errors
									$('#cart-errors .form-errors').empty();
									$('#update-error').remove();
									var $data = $(data).filter(function(){return $(this).is('div.container')}),
										$newCartItems = $data.find('#cart-items'),
										$errors = $data.find('.form-errors').html();
									if ($errors.trim().length > 0) {
										$('#cart-errors .form-errors').html($errors);
										$('body').animate({ scrollTop: $('.form-errors').offset().top - 20});
										$('#ajax-loader').foundation('reveal', 'close');
									}
									else {
										// update cart items
										if (typeof $newCartItems !== 'undefined') {
											// get/replace item values from data
											$('#cart-items').children('div').each(function(){
												var $this = $(this),
													ci = this.id;
												$this.find('.product-price').html($newCartItems.find('#' + ci + ' .product-price').html());
												$this.find('.quantity-input').val($newCartItems.find('#' + ci + ' .quantity-input').val());
												$this.find('.removeId').val($newCartItems.find('#' + ci + ' .removeId').val());
												$this.find('.removeItemFromCart').attr('rid', $newCartItems.find('#' + ci + ' .removeItemFromCart').attr('rid'));
												$this.find('.remove-id').val($newCartItems.find('#' + ci + ' .remove-id').val());
											});
											// update cart count
											if ($('body').hasClass('single-page-checkout')) {
												$('#checkout-cart-count').html($data.find('#checkout-cart-count').html());
											}
											MAIN.profileController.getProfileStatus();
											// get/replace order values from data
											//$('.order-summary').html($data.find('.order-summary').html());
											//$('#cart-savings').html($data.find('#cart-savings').html());
											refreshTotalsPromo($(data));

											$('#ajax-loader').foundation('reveal', 'close');
										}
										else {
											$('#ajax-loader').foundation('reveal', 'close');
										}
									}
								});
							}
						},
						error: function(xhr, statusText, exception) {
							$('#ajax-loader').foundation('reveal', 'close');
							console.log('Request Failed: ' + statusText + exception);
						}
					},
					removeCouponOptions = {
						dataType : 'html',
						beforeSubmit : function(arr, $form, options) {
							$('#ajax-loader').foundation('reveal', 'open');
						},
						success: function(data) {
							$('#ajax-loader').on('opened', promoOpened(data));
						},
						error: function(xhr, statusText, exception) {
							ajaxError(xhr, statusText, exception);
						}
					},
					couponUpdateOptions= {
						dataType : 'html',
						beforeSerialize : function($form) {
							$form.validate('validateForm');
							return $form.data('validate').isValid;
						},
						beforeSubmit : function(arr, $form, options) {
							$('#ajax-loader').foundation('reveal', 'open');
						},
						success: function(data) {
							$('#ajax-loader').on('opened', promoOpened(data));
						},
						error: function(xhr, statusText, exception) {
							ajaxError(xhr, statusText, exception);
						}
					};

				// remove from cart logic
				$('.removeItemFromCart').click(function(e) {
					e.preventDefault();
					var $this = $(this),
						itemId = $this.attr('iid'),
						removeId = $this.siblings('.remove-id').val();
					targetUID = itemId;
					$('#removeItemIds').val(removeId);
					$('#cartRemoveForm').ajaxSubmit(removeItemOptions);
					return false;
				});

				// update quantity logic
				$('.updateItemFromCart').click(function(e) {
					e.preventDefault();
					var $this = $(this),
						itemId = $this.attr('iid'),
						qty = $this.siblings('.quantity-input').val();
					if (qty > 0) {
						var	productId = $this.siblings('.productId').val(),
							removeId =  $this.siblings('.removeId').val();
						targetUID = itemId;
						$('#updateItemId').val(itemId);
						$('#updateItemQty').val(qty);
						$('#updateProductId').val(productId);
						$('#removeItemId').val(removeId);
						$('#cartUpdateForm').ajaxSubmit(updateQuantityOptions);
						return false;
					}
					else {
						$('#ci-' + itemId + ' #update-error').remove();
						$('#ci-' + itemId + ' #quantity-form').after("<small id='update-error' class='error'>Please pick a quantity greater than 0</small>");
					}
				});

				// remove coupon
				$('body').on('click', '.removeCouponFromCart', function(e) {
					e.preventDefault();
					var itemIndex = $(this).attr('coupounRemIds'),
						coupounRemItemId = 'coupounRemItemId' + itemIndex;
					$('#removeCouponId').val(document.getElementById(coupounRemItemId).value);
					$('#couponRemoveForm').ajaxSubmit(removeCouponOptions);
				});

				// apply coupon
				$('#couponForm').ajaxForm(couponUpdateOptions);

			},
			cart : function () {
				// remove coupon
				$('.removeCouponFromCart').click(function(e) {
					e.preventDefault();
					var itemIndex = $(this).attr('coupounRemIds'),
						coupounRemItemId = 'coupounRemItemId' + itemIndex;
					$('#removeCouponId').val(document.getElementById(coupounRemItemId).value);
					//$('#couponRemoveForm').submit();
				});

				$('body').on('click', '#proceed-to-checkout', function(e){
					e.preventDefault();
					$('#cartForm #checkout').click();
				});

				/* paypal-modal messages */
				if ($('body').hasClass('paypal-failure')) {
					$('body').removeClass('paypal-failure');
					$('#paypal-modal #message').html('There was an issue authenticating your PayPal account. Please click the "PROCEED TO CHECKOUT" button to use a credit card or try again with PayPal.');
					$('#paypal-modal').foundation('reveal', 'open');
				}
				/* if paypal cancelled */
				else if ($('body').hasClass('paypal-cancelled')) {
					$('body').removeClass('paypal-cancelled');
					$('#paypal-modal #message').html('You have cancelled your PayPal authentication. Please click the "PROCEED TO CHECKOUT" button to use a credit card or try again with PayPal.');
					$('#paypal-modal').foundation('reveal', 'oen');
				}
			},
			miniCart : function() {

				// ajax request error handling
				function ajaxError(xhr, statusText, exception) {
					if (xhr.status == '404') {
						window.location.href = "/store/error_404.jsp";
					}
					else if (xhr.status == '500') {
						window.location.href = "/store/error_500.jsp";
					}
					else {
						window.location.href = "/store/error.jsp";
					}
					window.setTimeout(function(){
						$('#ajax-loader').foundation('reveal', 'close');
					}, 200);
				}

				var targetUID,
					removeItemOptions = {
						dataType : 'html',
						data: { removeSubmit: 'submit'},
						beforeSerialize : function($form) {
							$form.validate('validateForm');
							return $form.data('validate').isValid;
						},
						beforeSubmit : function(arr, $form, options) {
							$('#ajax-loader').foundation('reveal', 'open');
						},
						success: function(data) {
							var $data = $(data).filter(function(){return $(this).is('div.mini-cart')}),
								$newCartItems = $data.find('#cart-items'),
								$errors = $data.find('.form-errors').html();

							MAIN.profileController.getProfileStatus();

							/* cart is empty */
							if ($data.find('.cart-empty-message').length > 0) {
								$('.mini-cart').html($data);
								window.setTimeout(function(){
									$('#ajax-loader').foundation('reveal', 'close');
								}, 200);
							}
							else {
								/* errors */
								if ($errors.trim().length > 0) {
									$('.form-errors').html($errors);
									$('body').animate({ scrollTop: $('.form-errors').offset().top - 20});
									window.setTimeout(function(){
										$('#ajax-loader').foundation('reveal', 'close');
									}, 200);
								}
								/* items */
								else {
									// remove old errors
									$('.form-errors').empty();
									$('#update-error').remove();
									// update cart items
									if (typeof $newCartItems !== 'undefined') {
									/* visual */
										/* get/replace item values from data */
										$('#cart-items').children('div').each(function(){
											var $this = $(this),
												ci = this.id;
											$this.find('.product-price').html($newCartItems.find('#' + ci + ' .product-price').html());
											$this.find('.quantity-input').val($newCartItems.find('#' + ci + ' .quantity-input').val());
											$this.find('.removeId').val($newCartItems.find('#' + ci + ' .removeId').val());
											$this.find('.removeItemFromCart').attr('rid', $newCartItems.find('#' + ci + ' .removeItemFromCart').attr('rid'));
											$this.find('.remove-id').val($newCartItems.find('#' + ci + ' .remove-id').val());
										});
										/* get/replace order values from data */
										$('.cart-feature-summary').html($data.find('.cart-feature-summary').html());
										/* update cart count */
										$('.mini-cart-count').html($data.find('.mini-cart-count').html());
										/* slide */
										$('#ci-' + targetUID).slideUp( 400, function(){ $('#ci-' + targetUID).remove() });
										window.setTimeout(function(){
											$('#ajax-loader').foundation('reveal', 'close');
										}, 200);
									}
									else {
										window.setTimeout(function(){
											$('#ajax-loader').foundation('reveal', 'close');
										}, 200);
									}
								}
							}
						},
						error: function(xhr, statusText, exception) {
							ajaxError(xhr, statusText, exception);
						}
					},
					updateQuantityOptions = {
						dataType : 'html',
						data: { updateSubmit: 'submit'},
						beforeSerialize : function($form) {
							$form.validate('validateForm');
							return $form.data('validate').isValid;
						},
						beforeSubmit : function(arr, $form, options) {
							$('#ajax-loader').foundation('reveal', 'open');
						},
						success: function(data) {
							var $data = $(data).filter(function(){return $(this).is('div.mini-cart')}),
								$newCartItems = $data.find('#cart-items'),
								$errors = $data.find('.form-errors').html();
							if ($errors.trim().length > 0) {
								$('.form-errors').html($errors);
								$('body').animate({ scrollTop: $('.form-errors').offset().top - 20});
								$('#ajax-loader').foundation('reveal', 'close');
							}
							else {
								// remove old errors
								$('.form-errors').empty();
								$('#update-error').remove();
								// update cart items
								if (typeof $newCartItems !== 'undefined') {
									/* get/replace item values from data */
									$('#cart-items').children('div').each(function(){
										var $this = $(this),
											ci = this.id;
										$this.find('.product-price').html($newCartItems.find('#' + ci + ' .product-price').html());
										$this.find('.quantity-input').val($newCartItems.find('#' + ci + ' .quantity-input').val());
										$this.find('.removeId').val($newCartItems.find('#' + ci + ' .removeId').val());
										$this.find('.removeItemFromCart').attr('rid', $newCartItems.find('#' + ci + ' .removeItemFromCart').attr('rid'));
										$this.find('.remove-id').val($newCartItems.find('#' + ci + ' .remove-id').val());
									});
									/* update cart count */
									$('.mini-cart-count').html($data.find('.mini-cart-count').html());
									MAIN.profileController.getProfileStatus();
									/* get/replace order values from data */
									$('.cart-feature-summary').html($data.find('.cart-feature-summary').html());

									$('#ajax-loader').foundation('reveal', 'close');
								}
								else {
									$('#ajax-loader').foundation('reveal', 'close');
								}
							}
						},
						error: function(xhr, statusText, exception) {
							ajaxError(xhr, statusText, exception);
						}
					};

				// remove from cart logic
				$('.removeItemFromCart').click(function(e) {
					e.preventDefault();
					var $this = $(this),
						itemId = $this.attr('iid'),
						removeId = $this.siblings('.remove-id').val();
					targetUID = itemId;
					$('#removeItemIds').val(removeId);
					$('#cartRemoveForm').ajaxSubmit(removeItemOptions);
					return false;
				});

				// update quantity logic
				$('.updateItemFromCart').click(function(e) {
					e.preventDefault();
					var $this = $(this),
						itemId = $this.attr('iid'),
						qty = $this.siblings('.quantity-input').val();
					if (qty > 0) {
						var	productId = $this.siblings('.productId').val(),
							removeId =  $this.siblings('.removeId').val();
						targetUID = itemId;
						$('#updateItemId').val(itemId);
						$('#updateItemQty').val(qty);
						$('#updateProductId').val(productId);
						$('#removeItemId').val(removeId);
						$('#cartUpdateForm').ajaxSubmit(updateQuantityOptions);
						return false;
					}
					else {
						$('#ci-' + itemId + ' #update-error').remove();
						$('#ci-' + itemId + ' #quantity-form').after("<small id='update-error' class='error'>Please pick a quantity greater than 0</small>");
					}
				});

				$("#mini-cart a.close-dropdown, a.keep-shopping").off().click(function (e){
					e.preventDefault();
					MAIN.common.dropDown.close("#mini-cart");
				});
			},
			singlePageCheckout : function () {
				// gift card modal setup
				if ( $("html").hasClass("small-screen") ){
					$("#gc-modal").addClass("expand");
				} else { // medium and up
					var width = 500,
						docWidth = $(document).width(),
						newMargin = (docWidth - width) / 2;
					$("#gc-modal").css('width', width);
					$("#gc-modal").css('left', newMargin);
				}

				$('#gc-modal').load(MAIN_CONSTANTS.contextRoot + MAIN_CONSTANTS.checkoutPath + '/giftCardBalance.jsp');

				// Animate the scroll for "your cart" functionality on tablet checkout
				// this is firing on all links on checkout so i'm making it more specific
				//$('a[href^="#"]').click(function() {
				$('a[href="#cart-section"]').click(function() {
					var destName = $(this).attr('href').substring(1);
					var destination = $('[name="'+destName+'"]');

					$('html, body').animate({
						scrollTop: $(destination).offset().top - 20
					});

					return false;
				});
				$('#purchase').click(function() {
					/* checkout panel form submits */
					$('#shipping-panel-form').submit();
					$('#payment-panel-form').submit();
					$('#review-panel-form').ajaxForm(reveiwPanelFormOptions);
					$('#apply-gift-card-form').ajaxForm(giftCardOptions);
					$('#shipping-panel-form').ajaxForm(shippingPanelFormOptions);
					$('#payment-panel-form').ajaxForm(paymentPanelFormOptions);
					$('#review-panel-form').ajaxForm(reveiwPanelFormOptions);
					$('#apply-gift-card-form').ajaxForm(giftCardOptions);
				});

				// errors
				function clearErrors() {
					$('.form-errors').empty();
				}
				function showErrors(errors) {
					clearErrors();
					var errorObj = {};
					for (var i=0; i<errors.length; i++) {
						var form = errors[i].form,
							$field = $('#' + form + ' #' + errors[i].field),
							$form = $('#' + form);
						errorObj = {};
						errorObj.target = {};
						errorObj.fields = [];
						errorObj.errors = [];
						errorObj.target = $field;
						errorObj.fields.push($field);
						errorObj.errors = errors[i].error;
						/* if the field or form is missing put the error at the top */
						if ($field.length < 1 && $form.length > 0) {
							$form.siblings(".form-errors").append('<small class="error">' + errorObj.errors + '</small>');
						}
						else if ($field.length < 1 && $form.length < 1) {
							$(".form-errors").append('<small class="error">' + errorObj.errors + '</small>');
						}
						else {
							$form.validate('showFieldError', errorObj);
						}
					}
					if (!$('#gc-modal').hasClass('open')){
						$('body').animate({ scrollTop: $('small.error').offset().top - 20});
						window.setTimeout(function(){
							$('#ajax-loader').foundation('reveal', 'close');
						}, 200);
					}
				}

				// captcha evilness
				function showRecaptcha(element) {
					/* if this element doesn't contain the template, find
						it and place it in the element. The reason we are
						moving it around is because the tempate
						customization code depends on elements with ID's
						so we can only have it on the page at one spot at
						a time. The template will initially be loaded in
						the giftCardBalance.jsp which is loaded into the
						gc-modal
					*/

					if (!$(element).has('#rue_responsive_recaptcha_widget').length > 0)
					{
						var captchaTemplate = $('#rue_responsive_recaptcha_widget').parent().html();
						$('#rue_responsive_recaptcha_widget').parent().html('');
						$('#' + element).html(captchaTemplate);
					}
					Recaptcha.create("6LcPR-QSAAAAAJuMU4LGo2hBh7SDLGDY_bkVe5kj", element,
					{
						theme: "custom",
						custom_theme_widget: 'rue_responsive_recaptcha_widget',
						callback: Recaptcha.focus_response_field
					});
				}

				// data replacement
				function replaceData(selector, $data) {
					var $container = $(selector),
						$newData = $data.find(selector).html();
					$container.empty();
					$container.html($newData);
				}

				// ajax request error handling
				function ajaxError(xhr, statusText, exception) {
					if (xhr.status == '404') {
						window.location.href = "/store/error_404.jsp";
					}
					else if (xhr.status == '500') {
						window.location.href = "/store/error_500.jsp";
					}
					else {
						window.location.href = "/store/error.jsp";
					}
					$('#ajax-loader').foundation('reveal', 'close');
				}

				// multiple-use jquery selectors
				var jsonData = {},
					$shippingPanel = $('#shipping-panel'),
					$shippingSummary = $('#shipping-panel-summary'),
					$shippingEdit = $('#shipping-panel-edit'),
					$paymentPanel = $('#payment-panel'),
					$paymentSummary = $('#payment-panel-summary'),
					$paymentEdit = $('#payment-panel-edit'),
					$reviewPanel = $('#review-panel');

				/* document ready */
				$(document).ready(function(){

					/* mask the phone input */
					$(".phone-input").mask("(999) 999 - 9999", { placeholder:" " });
					/* hide/show correct form panels */

					$paymentPanel.collapse('hide');

					$reviewPanel.collapse('hide');

					/* if paypal success */
					if ($('body').hasClass('paypal-success')) {
						$('body').removeClass('paypal-success').addClass('paypal-checkout');
						var text = '{ "stepsComplete" : { "ShippingInfoComplete":"true" , "PaymentInfoComplete":"true" , "ReviewComplete":"false" } }';
						jsonData = JSON.parse(text);
						console.log('jsonData: ', jsonData);

						/* show shipping summary */
						$shippingPanel.collapse('hide');
						$shippingSummary.load(MAIN_CONSTANTS.contextRoot + MAIN_CONSTANTS.checkoutPath + '/includes/shippingPanelOutline.jsp', function() {
							$(this).collapse('show');
						});
						$shippingEdit.show();

						/* show payment summary */
						$paymentPanel.collapse('hide');
						$paymentSummary.load(MAIN_CONSTANTS.contextRoot + MAIN_CONSTANTS.checkoutPath + '/includes/paymentPaypalOutline.jsp', function() {
							$(this).on('shown', function(){
								$reviewPanel.collapse('show');
								$paymentEdit.attr('href',$('#paypal-link').attr('href'));
								$('#paypal-modal #message').html('Your PayPal account was authenticated successfully. Please review your order.');
								$('#paypal-modal').foundation('reveal', 'open');
							});
							$(this).collapse('show');
						});
						$paymentEdit.show();
					}
					/* if paypal failure */
					else if ($('body').hasClass('paypal-failure')) {
						$('body').removeClass('paypal-failure');
						var text = '{ "stepsComplete" : { "ShippingInfoComplete":"true" , "PaymentInfoComplete":"false" , "ReviewComplete":"false" } }';
						jsonData = JSON.parse(text);
						console.log('jsonData: ', jsonData);
						/* show shipping summary */
						$shippingPanel.collapse('hide');
						$shippingSummary.load(MAIN_CONSTANTS.contextRoot + MAIN_CONSTANTS.checkoutPath + '/includes/shippingPanelOutline.jsp', function() {
							$(this).on('shown', function(){
								//get "key" parameter from url
								var key = decodeURIComponent((new RegExp('[?|&]errCode=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null,
									message = '',
									shippingPanel = false;
								if (typeof key !== 'undefined' && key !== null && key !== '') {
									$.ajax({
										async: false,
										url: '/store/sitewide/data/getKeyValue.jsp?key=' + key,
										success: function(data) {
											if (data !== '' && data.substring(0,3) !== '???') {
												message = data;
												if (key > 10718 && key < 10737) {
													shippingPanel = true;
												}
											}
											else {
												message = 'There was an issue authenticating your PayPal account. Please use a credit card or try again with PayPal.';
											}
										}
									});
								}
								else {
									message = 'There was an issue authenticating your PayPal account. Please use a credit card or try again with PayPal.';
								}
								// remove url parameters
								if (history.replaceState) {
									history.replaceState({}, "", window.location.pathname + '?_requestid=' + decodeURIComponent((new RegExp('[?|&]_requestid=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null);
								}
								else {
									shippingPanel = false;
								}
								// show correct panel
								if (shippingPanel) {
									$shippingEdit.hide();
									$shippingSummary.collapse('hide');

									$paymentPanel.collapse('hide');
									$shippingPanel.collapse('show');
								}
								else {
									$shippingEdit.show();
									$paymentPanel.collapse('show');
								}
								// show error message
								$('#paypal-modal #message').html(message);
								$('#paypal-modal').foundation('reveal', 'open');
							});
							$(this).collapse('show');
						});
					}
					/* if paypal cancelled */
					else if ($('body').hasClass('paypal-cancelled')) {
						$('body').removeClass('paypal-cancelled');
						var text = '{ "stepsComplete" : { "ShippingInfoComplete":"true" , "PaymentInfoComplete":"false" , "ReviewComplete":"false" } }';
						jsonData = JSON.parse(text);
						console.log('jsonData: ', jsonData);
						/* show shipping summary */
						$shippingPanel.collapse('hide');
						$shippingSummary.load(MAIN_CONSTANTS.contextRoot + MAIN_CONSTANTS.checkoutPath + '/includes/shippingPanelOutline.jsp', function() {
							$(this).on('shown', function(){
								$shippingEdit.show();
								/* show payment panel and error message */
								$('#paypal-modal #message').html('You have cancelled your PayPal authentication. Please use a credit card or try again with PayPal.');
								$paymentPanel.collapse('show');
								$('#paypal-modal').foundation('reveal', 'open');
							});
							$(this).collapse('show');
						});
					}
					else {
						/* no paypal data */
					}
				});

				/* these are the ajax form options */
				var shippingPanelFormOptions = {
					dataType : 'json',
					beforeSerialize : function($form) {
						clearErrors();
						var $phone = $form.find('#phone'),
							number = $phone.val(),
							digits = number.replace(/[^\d]/g,'');
						$phone.val(digits);
						$form.validate('validateForm');
						return $form.data('validate').isValid;
					},
					beforeSubmit : function(arr, $form, options) {
						$('#shipping-panel-form input[type=submit]').addClass('loading');
					},
					success: function(data) {
						$('#shipping-panel-form input[type=submit]').removeClass('loading');
						jsonData = data;
						console.log('jsonData: ', jsonData);
						/* show errors */
						if (typeof jsonData.formErrors !== 'undefined') {
							showErrors(jsonData.formErrors.errors);
						}
						/* fill out the form if there's an address */
						else if (typeof jsonData.address !== 'undefined') {
							var $target = $shippingPanel,
								address = jsonData.formErrors.shipping;

							/* fill out the form */
							$target.find('#firstName').val(address.firstName);
							$target.find('#lastName').val(address.lastName);
							$target.find('#address1').val(address.address1);
							$target.find('#address2').val(address.address2);
							$target.find('#city').val(address.city);
							$target.find('#state').val(address.state);
							$target.find('#postalCode').val(address.postalCode);
							$target.find('#phone').val(address.phoneNumber);

							/* show the filled out form */
							$('#address-form-fields').on('shown', function(){
								$('body').animate({ scrollTop: $('.shipping-panel').offset().top - 20});
							});
							$('#address-form-fields').collapse('show');
						}
						/* check the step we should be on */
						else if (typeof jsonData.stepsComplete !== 'undefined') {
							if (jsonData.stepsComplete.ShippingInfoComplete == 'true') {
								/* hide/show correct form panels */
								$shippingPanel.collapse('hide');
								if (jsonData.stepsComplete.PaymentInfoComplete == 'true'){
									var url = '/store' + MAIN_CONSTANTS.checkoutPath + '/includes/paymentPanelOutline.jsp';
									if ($('body').hasClass('paypal-checkout')) {
										url = '/store' + MAIN_CONSTANTS.checkoutPath + '/includes/paymentPaypalOutline.jsp';
									}
									$.get(url, function(ppdata) {
										$('#payment-panel-summary').html(ppdata);
									});
									$reviewPanel.collapse('show');
								}
								else {
									/* Explicitly set the width of the CC Type dropdown to fix odd
									 * missing border issue in FF (RUE-625), but only if in guest
									 * checkout (RUE-1659)
									 */
									var $cctype = $('#creditCardType');
									if (!$('html').hasClass('fully-authenticated')) {
										$cctype.width($cctype.width());
									}
									showRecaptcha('recaptcha_div');
									$paymentPanel.collapse('show');
								}
								/* display summary panel */
								$shippingSummary.load(MAIN_CONSTANTS.contextRoot + MAIN_CONSTANTS.checkoutPath + '/includes/shippingPanelOutline.jsp', function() {
									$(this).on('shown', function(){
										$('body').animate({ scrollTop: $('.payment-panel').offset().top - 20});
									});
									$(this).collapse('show');
								});
								/* display edit link for shipping panel */
								$shippingEdit.show();
								/* update cart totals */
								$.get(MAIN_CONSTANTS.contextRoot + MAIN_CONSTANTS.checkoutPath + '/cartTotals.jsp', function(data) {
									var $data = $(data);
									$('.order-summary').html($data.find('.order-summary').html());
									$('#cart-savings').html($data.find('#cart-savings').html());
								});
							}
							else {
								/* shipping info false (not complete) */
								// TODO: there should probably be an error here
								$('body').animate({ scrollTop: $('.shipping-panel').offset().top - 20});
							}
						}
						else {
							/* jsonData is bad */
							// TODO: there should probably be an error here
							$('body').animate({ scrollTop: $('.shipping-panel').offset().top - 20});
						}
					},
					error: function(xhr, statusText, exception) {
						$('#shipping-panel-form input[type=submit]').removeClass('loading');
						ajaxError(xhr, statusText, exception);
					}
				},
				paymentPanelFormOptions = {
					dataType : 'json',
					beforeSerialize : function($form) {
						clearErrors();
						var $phone = $form.find('#phone'),
							number = $phone.val(),
							digits = number.replace(/[^\d]/g,'');
						$phone.val(digits);
						$form.validate('validateForm');
						return $form.data('validate').isValid;
					},
					beforeSubmit : function(arr, $form, options) {
						$('#payment-panel-form input[type=submit]').addClass('loading');
						console.log("SUBMITTING PAYMENT WITH ");
						console.log($form);
						console.log(arr);
						console.log(options);
					},
					success: function(data) {
						$('#payment-panel-form input[type=submit]').removeClass('loading');
						jsonData = data;
						console.log('jsonData: ', jsonData);
						/* show errors */
						if (typeof jsonData.formErrors !== 'undefined') {
							showErrors(jsonData.formErrors.errors);
						}
						else if (typeof jsonData.stepsComplete !== 'undefined') {
							console.log('jsonData.stepsComplete: ', jsonData.stepsComplete);
							if (jsonData.stepsComplete.PaymentInfoComplete == 'true') {
								/* hide/show correct form panels */
								$("#payment-types").hide();
								$paymentPanel.collapse('hide');
								$reviewPanel.collapse('show');

								/* display summary panel */
								$paymentSummary.load(MAIN_CONSTANTS.contextRoot + MAIN_CONSTANTS.checkoutPath + '/includes/paymentPanelOutline.jsp', function() {
									$(this).on('shown', function(){
										$('body').animate({ scrollTop: $('.review-panel').offset().top - 20});
									});
									$(this).collapse('show');
								});

								/* display edit link for shipping panel */
								$paymentEdit.show();
							}
							else {
								/* PaymentInfoComplete is false */
								// TODO: there should probably be an error here
								$('body').animate({ scrollTop: $('.payment-panel').offset().top - 20});
							}
						}
						else {
							/* jsonData has unhandled data */
							// TODO: there should probably be an error here
							$('body').animate({ scrollTop: $('.payment-panel').offset().top - 20});
						}
					},
					error: function(xhr, statusText, exception) {
						console.log("PAYMENT ERROR ");
						console.log(statusText);
						console.log(exception);
						$('#payment-panel-form input[type=submit]').removeClass('loading');
						ajaxError(xhr, statusText, exception);
					}
				},
				reveiwPanelFormOptions = {
					dataType : 'json',
					beforeSerialize : function() {
						clearErrors();
					},
					beforeSubmit : function(arr, $form, options) {
						$('#review-panel-form input[type=submit]').addClass('loading');
					},
					success: function(data) {
						$('#review-panel-form input[type=submit]').removeClass('loading');
						jsonData = data;
						console.log('jsonData: ', jsonData);
						/* show errors */
						if (typeof jsonData.formErrors !== 'undefined') {
							showErrors(jsonData.formErrors.errors);
						}
						else if (typeof jsonData.stepsComplete !== 'undefined') {
							if (data.stepsComplete.ReviewComplete == 'true') {
								var url = MAIN_CONSTANTS.contextRoot + MAIN_CONSTANTS.checkoutPath + '/confirmation.jsp';
								window.location = url;
							}
							else {
								/* stepsComplete is undefined */
								// TODO: there should probably be an error here
								$('body').animate({ scrollTop: $('.review-panel').offset().top - 20});
							}
						}
						else {
							/* jsonData has unhandled data */
							// TODO: there should probably be an error here
							$('body').animate({ scrollTop: $('.review-panel').offset().top - 20});
							$('#ajax-loader').foundation('reveal', 'close');
						}
					},
					error: function(xhr, statusText, exception) {
						$('#review-panel-form input[type=submit]').removeClass('loading');
						ajaxError(xhr, statusText, exception);
					}
				},
				giftCardOptions = {
					beforeSerialize : function($form) {
						clearErrors();
						$form.validate('validateForm');
						return $form.data('validate').isValid;
					},
					beforeSubmit : function(arr, $form, options) {
						$('#apply-gift-card-form input[type=submit]').addClass('loading');
					},
					success: function(data) {
						$('#apply-gift-card-form input[type=submit]').removeClass('loading');
						jsonData = data;
						/* show errors */
						if (typeof jsonData.formErrors !== 'undefined') {
							console.log('jsonData: ', jsonData);
							showErrors(jsonData.formErrors.errors);
							showRecaptcha('recaptcha_div');
							$('#giftCardNumber').val('');
							/* if there is a form error *//*
							$('#gc-error').remove();
							$('#payment-errors').append('<small id="gc-error" class="error">We\'re sorry, there was an error applying the gift card to your order.</small>');
							*/
						}
						else {
							/* this is an html response */
							var $data = $(data).filter(function(){return $(this).is('div.container')});
							replaceData('#gift-card-totals', $data);
							// if the gc covered the total, hide paypal/cc
							if( $('#ccRequired').val() === 'false'){
								$('#credit_card_data').hide();
								$('#paypal_data').hide();
							}
							$('#gc-error').remove();
							$('#giftCardNumber').val('');
							$('#recaptcha_response_field').val('');
							$('#gift-card-form').collapse('hide');
							$('#gift-card-apply').hide();
							$('#apply-another-card').show();
						}
					},
					error: function(xhr, statusText, exception) {
						$('#apply-gift-card-form input[type=submit]').removeClass('loading');
						ajaxError(xhr, statusText, exception);
					}
				},
				gcCheckBalanceOptions = {
					data: { checkGiftCardBalance: 'CHECK BALANCE'},
					beforeSerialize : function($form) {
						clearErrors();
						$form.validate('validateForm');
						return $form.data('validate').isValid;
					},
					success: function(data) {
						jsonData = data;
						console.log('jsonData: ', jsonData);
						/* show errors */
						if (typeof jsonData.formErrors !== 'undefined') {
							showErrors(jsonData.formErrors.errors);
							showRecaptcha('balance_recaptcha_div');
							$('#giftCardNumber').val('');
						}
						else {
							/* this is an html response. there were no form errors */
							//var $balance = $(data).filter(function(){return $(this).is('div#balance-form')});
							var $balance = $(data).filter('#gc-balance').html();
							$('#gc-balance').html($balance);
							$('#gc-balance').append('<div class="row><div class="small-12 columns"><a id="gc-modal-close" class="button close-button">OK, THANKS</a></div></div>');
							$('#gc-balance').show();
							$('#balance-form').hide();
						}
					},
					error: function(xhr, statusText, exception) {
						ajaxError(xhr, statusText, exception);
					}
				},
				removeGiftCardOptions = {
					dataType : 'html',
					data: { removeGiftCard: 'remove'},
					beforeSerialize : function() {
						clearErrors();
					},
					beforeSubmit : function(arr, $form, options) {
						$('#ajax-loader').foundation('reveal', 'open');
					},
					success: function(data) {
						var $data = $(data).filter(function(){return $(this).is('div.container')});
						replaceData('#gift-card-totals', $data);
						if( $('#ccRequired').val() === 'true'){
							$('#credit_card_data').show();
						}
						if ($('#applied-gift-cards').html().trim().length == 0) {
							$('#apply-another-card').hide();
							$('#gift-card-apply').show();
						}
						$('#ajax-loader').foundation('reveal', 'close');
					},
					error: function(xhr, statusText, exception) {
						ajaxError(xhr, statusText, exception);
					}
				};

				/* shipping panel listeners */
				$('body').on('change', 'input[type=checkbox]#profile-address-checkbox', function(e){
					if ($(this).is(':checked')) {
						$('#shipping-address-edit').on('hidden', function(){
							$('#shipping-address-edit').css('display', 'none');
							$('#saved-address-summary').collapse('show');
						});
						$('#shipping-address-edit').collapse('hide');
					}
					else {
						$('#shipping-address-edit select').val('');
						$('#shipping-address-edit input[type=text]').val('');
						$('#shipping-address-edit input[type=tel]').val('');
						$('#saved-address-summary').on('hidden', function(){
							$('#shipping-address-edit').css('display', 'block');
							$('#shipping-address-edit').collapse('show');
						});
						$('#saved-address-summary').collapse('hide');
					}
				});
				$('#gift-options-panel').on('shown', function() {
					$('#myTextarea').attr('tabindex','');
				});
				$('#gift-options-panel').on('hidden', function() {
					$('#myTextarea').attr('tabindex','-1');
				});
				/* end shipping panel listeners */

				/* payment panel listeners */
				$('body').on('change', 'input[type=checkbox]#saved-cc-checkbox', function(e){
					if ($(this).is(':checked')) {
						$('#cc-dropdown input').val('');
						$('#new-cc-form').on('hidden', function(){
							$('#same-address-checkbox').val('false');
							$('#new-cc-form').css('display', 'none');
							$('#cc-dropdown').css('display', 'block');
							$('#cc-dropdown').collapse('show');
							$('#top-paypal-button').show();
						});
						$('#new-cc-form').collapse('hide');
					}
					else {
						$('#new-cc-form').css('display', 'block');
						$('#new-cc-form select').val('');
						$('#new-cc-form input').val('');
						// added to fix firefox select box border (RUE-625, RUE-1659)
						$('#new-cc-form').on('shown', function(){
							var $cctype = $('#creditCardType');
							$cctype.width($cctype.width());
						});
						$('#cc-dropdown').on('hidden', function(){
							$('#cc-dropdown').css('display', 'none');
							$('#top-paypal-button').hide();
							$('#new-cc-form').collapse('show');
							if ($('#same-address-checkbox').is(':checked')) {
								$('#same-address-checkbox').val('true');
							}
							else {
								$('#same-address-checkbox').val('false');
							}
						});
						$('#cc-dropdown').collapse('hide');
					}
				});
				$('body').on('change', 'input[type=checkbox]#same-address-checkbox', function(e){
					if ($(this).is(':checked')) {
						$('#billingAddressSameAsShipping').val('true');
						$('#billing-address-edit').on('hidden', function(e){
							e.stopPropagation();
							$('#billing-address-edit').css('display', 'none');
						});
						$('#billing-address-edit').collapse('hide');
					}
					else {
						$('#billingAddressSameAsShipping').val('false');
						$('#billing-address-edit').css('display', 'block');
						$('#billing-address-edit select').val('');
						$('#billing-address-edit input').val('');
						$('#billing-address-edit').on('shown', function(e){
							e.stopPropagation();
						});
						$('#billing-address-edit').collapse('show');
					}
				});

				/* gift card */
				$('body').on('click', '#check-balance', function(e) {
					e.preventDefault();
					Recaptcha.destroy();
					showRecaptcha('balance_recaptcha_div');
					$('#gc-modal').foundation('reveal', 'open');
				});
				// this will handle closing of the modal in any way
				$('#gc-modal').bind('closed',
					function()
					{
						$('#gc-balance').hide();
						$('#balance-form').show();
						$('#balanceGiftCardNumber').val('');
						$('#recaptcha_response_field').val('');
						Recaptcha.destroy();
						showRecaptcha('recaptcha_div');
					}
				);
				$('body').on('click', '#gc-modal-close', function(e) {
					$('#gc-modal').foundation('reveal', 'close');
				});
				$('#gift-card-form').on('hidden', function(e) {
					showRecaptcha('recaptcha_div');
				});
				$('body').on('click', '#apply-another-card', function(e) {
					e.preventDefault();
					$('#gift-card-form').collapse('show');
				});
				$('body').on('click', '.remove-gift-card', function(e) {
					e.preventDefault();
					var itemIndex = $(this).attr('id'),
						formId = '#remove-' + itemIndex + '-form';
					$(formId).ajaxSubmit(removeGiftCardOptions);
				});
				/* end payment panel listeners */

				/* check gc balance logic */
				$('body').on('click', '#checkGiftCardBalance', function(e) {
					e.preventDefault();
					$('#balance-gift-card').ajaxSubmit(gcCheckBalanceOptions);
				});

				/* checkout panel form submits */
				$('#shipping-panel-form').ajaxForm(shippingPanelFormOptions);
				$('#payment-panel-form').ajaxForm(paymentPanelFormOptions);
				$('#review-panel-form').ajaxForm(reveiwPanelFormOptions);
				$('#apply-gift-card-form').ajaxForm(giftCardOptions);

				/* panel edit click listeners */
				$shippingEdit.click(function(e){
					$(this).hide();
					$shippingSummary.collapse('hide');
					$paymentPanel.collapse('hide');

					if (typeof jsonData.stepsComplete !== 'undefined') {
					if (jsonData.stepsComplete.PaymentInfoComplete == 'true') {
						$paymentSummary.collapse('show');
						$paymentEdit.show();
					}
					}
					else if ($('body').hasClass('paypal-success')) {
						$paymentSummary.collapse('show');
						$paymentEdit.show();
					}
					$reviewPanel.collapse('hide');
					$shippingPanel.collapse('show');
				});
				$paymentEdit.click(function(e){
					if (!$('body').hasClass('paypal-success')) {
						$shippingEdit.show();
						$(this).hide();
						$paymentSummary.collapse('hide');
						$shippingPanel.collapse('hide');
						$shippingSummary.collapse('show');
						$reviewPanel.collapse('hide');
						$paymentPanel.collapse('show');
					}
				});
				/* end panel edit click listeners */

				/* tagman for place order button */
				$('body').on('click', '#commitOrder', function(e) {
					if (TAGMAN && TAGMAN.fireEvent) {
						TAGMAN.fireEvent('CHECKOUT_SUMMARY_PAGE', {
							page_cart_total_items:TAGGING_VARIABLES.page_cart_total_items,
							page_cart_discounted_items:TAGGING_VARIABLES.page_cart_discounted_items,
							page_cart_fullprice_items:TAGGING_VARIABLES.page_cart_fullprice_items,
							page_cart_removed_items:TAGGING_VARIABLES.page_cart_removed_items
						});
					};

				});
			}
		},
		common : {
			init : function () {
				/* using the ajaxStart/Stop functions to load the ajax-loader was very buggy so
				 * we're just opening and closing the loader manually for each request. we still
				 * need to append the overlay to the page however */
				$('body').append(loadingOverlay);

				/* detect page size */
				function screenSizeDetect(){
					$("html").removeClass("small-screen medium-screen large-screen");
					if ( $("#smallTest").css("display") !== "none" ) {
							$("html").addClass("small-screen");
					} else if ( $("#mediumTest").css("display") !== "none" ) {
							$("html").addClass("medium-screen");
					} else if ( $("#largeTest").css("display") !== "none" ) {
							$("html").addClass("large-screen");
					}
				}
				screenSizeDetect();
				$(window).resize(function(){ screenSizeDetect(); });

				// Hijack Foundation DropDown Open/Close Function to Ajax Functionality
				Foundation.libs.dropdown.open = function (dropdown, target){
					this
					.css(dropdown
						.addClass(this.settings.activeClass), target);
					dropdown.trigger('opened');
					MAIN.common.dropDown.open(dropdown.selector);
				}

				Foundation.libs.dropdown.close = function (dropdown) {
					var self = this;
					dropdown.each(function () {
						if ($(this).hasClass(self.settings.activeClass)) {
							$(this)
							.css(Foundation.rtl ? 'right':'left', '-99999px')
							.removeClass(self.settings.activeClass);
							$(this).trigger('closed');
						}
						MAIN.common.dropDown.close(dropdown.selector);
					});
				}

				/* Hijack Foundation CSSjs function to add centering capability  */
				Foundation.libs.dropdown.css = function (dropdown, target) {
					// temporary workaround until 4.2
					if (/body/i.test(dropdown.offsetParent()[0].nodeName)) {
						var position = target.offset();
						position.top -= dropdown.offsetParent().offset().top;
						position.left -= dropdown.offsetParent().offset().left;
					} else {
						var position = target.position();
					}

					if (this.small()) {
						dropdown.css({
							position : 'absolute',
							width: '95%',
							left: '2.5%',
							'max-width': 'none',
							top: position.top + this.outerHeight(target)
						});
					} else {
						if (dropdown.hasClass("center")){
							var left = position.left - ((this.outerWidth(dropdown) - this.outerWidth(target))/2);
							if ($(window).width() < target.offset().left - left + this.outerWidth(dropdown)) {
								/* edge detect */
								left = left - (target.offset().left - left + this.outerWidth(dropdown) - $(window).width())
							}
						} else if (!Foundation.rtl && $(window).width() > this.outerWidth(dropdown) + target.offset().left) {
							var left = position.left;
						} else {
							if (!dropdown.hasClass('right')) {
								dropdown.addClass('right');
							}
							var left = position.left - (this.outerWidth(dropdown) - this.outerWidth(target));
						}

						dropdown.attr('style', '').css({
							position : 'absolute',
							top: position.top + this.outerHeight(target),
							left: left
						});
					}

					return dropdown;
				}

				var $html = $('html');
				if ($html.hasClass('ie8') || $html.hasClass('ie9')) {
					$('input, textarea').placeholder();
				}

				if ($html.hasClass('ie8')) {
					$('body').on('change', 'input[type=checkbox]', function(e){
						var $this = $(this);
						$this.siblings('label').toggleClass('selected', $this.is(':checked'));
					});
				}

				// form validation
				$('body').on('submit.validate.data-api', '[data-toggle=validate]', function (e) {
					if ($(this).attr("id") === "login-form") {
						//do nothing for ssl submits
						console.log("login click heard, exiting");
						return;
					} else {
						var $this = $(this);
						$this.validate('validateForm');
						return $this.data('validate').isValid;
					}
				});
				if (typeof MAIN.errors !== 'undefined') {
					MAIN.form._showInlineErrors(MAIN.errors);
				}

				// ajax logout
				$('body').on('click', '#logoutLink', function(e) {
					e.preventDefault();
					$.ajax({
						url: $(this).attr("href")
					}).done(function(msg) {
						MAIN.profileController.getProfileStatus(true);
					});
				});

				// Search visibility button for tablet and mobile, removed 2014-03-11
				/* $('.search-form-toggle').click(function() {
					$('.search-form-container').toggleClass('hide-for-medium-down');

					if (!$('.search-form-container').hasClass('hide-for-medium-down')) {
						$('input[name=Ntt]').focus();
					}

					return false;
				}); */

				// need to verify this in ie9 before implementing
				/* added this for partially logged in users *//*
				if ($('html').hasClass('ie9')) {
					$("html.partially-authenticated li.util-my-account a").off().click(function(e) {
						window.location = MAIN_CONSTANTS.secureSiteRoot + "/store/account/loginPage.jsp?" + $.cookie('JSESSIONID');
					});
				}
				*/

				$("li.util-sign-in a").off().click(function(e) {
					e.preventDefault();
					/* workaround for ie9 login modal issue */
					if ($html.hasClass('ie8') || $html.hasClass('ie9')) {
						window.location = MAIN_CONSTANTS.secureSiteRoot + "/store/account/loginPage.jsp";
					}
					else {
						var modalTarget = $(this).attr('data-target'),
							$modalTarget = document.getElementById(modalTarget),
							url = MAIN_CONSTANTS.secureSiteRoot + "/store/account/login.jsp",
							option = {'url': url, 'target': $modalTarget.id};

						$("#" + modalTarget).foundation('reveal', 'open', {
							url: $(this).attr('href'),
							success: function(data) {
								MAIN.modalProxy.fire(option);
								MAIN.common.login();
							}
						});
					}
				});
				/* RUE-1560 - if you're soft-logged-in and in checkout then click the my account
				 * link, the login modal comes up without initializing the proxy
				 */
				$("li.util-my-account.show-for-partially-authenticated a").off().click(function(e) {
					e.preventDefault();
					/* workaround for ie9 login modal issue */
					if ( $('html').hasClass('ie9')) {
						window.location = MAIN_CONSTANTS.secureSiteRoot + "/store/account/loginPage.jsp"
					}
					else {
						var modalTarget = $(this).attr('data-target'),
							$modalTarget = document.getElementById(modalTarget),
							url = MAIN_CONSTANTS.secureSiteRoot + "/store/account/login.jsp",
							option = {'url': url, 'target': $modalTarget.id};

						$("#" + modalTarget).foundation('reveal', 'open', {
							url: $(this).attr('href'),
							success: function(data) {
								MAIN.modalProxy.fire(option);
								MAIN.common.login();
							}
						});
					}
				});

				if ( $("html").hasClass("large-screen") ){
					$("#login-modal").addClass("large");
				}
				else {
					$("#login-modal").addClass("xlarge");
				}

				MAIN.common.cartForms();

				/* need to remove proxy iframe and empty modal when login modal closes or
				 * form will not submit via ajax when reopened
				 */
				$("#login-modal").on('closed', function(){
					$('iframe#proxy').remove();
					$("#login-modal").empty();
				});

				/* tagman for add to cart button */
				$('body').on('click', '#addItemToOrder', function(e) {
					var color = $('.product-sku-color a.selected').attr('id'),
						size = $('.product-sku-size li.selected').attr('id'),
						skus = MAINdata.productData[MAINdata.pid].skus,
						tagSku = '',
						tagColor = '';
					for (sku in skus) {
						var colorId = skus[sku].variants.colorVariantType.id,
							sizeId = skus[sku].variants.sizeVariantType.id;
						if (colorId == color && sizeId == size) {
							tagSku = skus[sku].catalogRefId;
							tagColor = skus[sku].variants.colorVariantType.group;
							break;
						}
					}
					if (TAGMAN && TAGMAN.fireEvent) {
						TAGMAN.fireEvent('PDP_ADD_TO_CART_BUTTON_TRACKING', {
							product_name:TAGGING_VARIABLES.product_name,
							product_sku:tagSku,
							product_sale:TAGGING_VARIABLES.product_sale,
							product_color:tagColor
						});
					};
				});

				/* forgot password form */
				$("#forgot-password-modal").on('opened', function(){
					var forgotPasswordOptions = {
							dataType : 'html',
							beforeSerialize : function($form) {
								$form.validate('validateForm');
								return $form.data('validate').isValid;
							},
							success: function(data) {
								var $data = $(data).filter(function(){ return $(this).is('div.container')}),
									$errors = $data.find('.form-errors');
								if ($('.form-errors small').length == 0) {
									window.location.href = '/store/account/passwordResetConfirmation.jsp';
								}
								else {
									$('.form-errors').html($errors.html());
								}
							},
							error: function(xhr, statusText, exception) {
								console.log('Request Failed: ' + statusText + exception);
							}
						};
					$('#passwordResetForm').ajaxForm(forgotPasswordOptions);
				});

				// global close button
				$('.close-button').click(function(){
					$('#' + $(this).parents('.reveal-modal.open').attr('id')).foundation('reveal', 'close');
				});
			},
			cartForms : function(mode){
				////debugger;
				// cart errors
				/*
				function clearErrors() {
					$('.form-errors').empty();
				}
				function showErrors(errors) {
					clearErrors();
					var errorObj = {};

					for (var i=0; i<errors.length; i++) {
						//var form = errors[i].form,
						//	$field = $('#' + form + ' #' + errors[i].field),
						//	$form = $('#' + form);
						errorObj = {};
						//errorObj.target = {};
						//errorObj.fields = [];
						errorObj.errors = [];
						//errorObj.target = $field;
						//errorObj.fields.push($field);
						errorObj.errors = errors[i].error;
						// if the field or form is missing put the error at the top
						//if ($field.length < 1 && $form.length > 0) {
						//	$form.siblings(".form-errors").append('<small class="error">' + errorObj.errors + '</small>');
						//}
						//else if ($field.length < 1 && $form.length < 1) {
							$(".form-errors").append('<small class="error">' + errorObj.errors + '</small>');
						//}
						//else {
						//	$form.validate('showFieldError', errorObj);
						//}
					}
				}
				*/
				/* show errors *//*
				if (typeof jsonData.formErrors !== 'undefined') {
					showErrors(jsonData.formErrors.errors);
				}*/

				var checkoutSuccessUrl = MAIN_CONSTANTS.contextRoot + MAIN_CONSTANTS.checkoutPath + '/json/checkoutSuccess.jsp',
					checkoutErrorUrl = MAIN_CONSTANTS.contextRoot + MAIN_CONSTANTS.checkoutPath + '/json/checkoutError.jsp',
					cartFormOptions = { // these are the ajax form options
						dataType : 'json',
						beforeSerialize : function ($form, options) {
							var updateUrlArray = [['#moveToPurchaseInfoSuccessURL', checkoutSuccessUrl + '?type=startCheckout'],
												['#moveToPurchaseInfoErrorURL', checkoutErrorUrl + '?type=startCheckout']];
							MAIN.form._updateFormUrls(updateUrlArray, $form);
						},
						success: function cartSuccess(responseText, statusText, xhr, $form) {
							////debugger;
							console.log('ajax success.', responseText);
							if (statusText == 'success') {
								if (responseText.success == 'true') {
									if (responseText.loadUrl) {
										var $html = $('html');
										if ($html.hasClass('ie9') || $html.hasClass('lt-ie9')) {
											window.location = MAIN_CONSTANTS.secureSiteRoot + '/store/account/loginPage.jsp?checkout=true';
										}
										else {
											var option = {'url': MAIN_CONSTANTS.secureSiteRoot + responseText.loadUrl, 'target': 'login-modal'};
											$('#login-modal').foundation('reveal', 'open', {
												url: responseText.loadUrl,
												success: function(data) {
													MAIN.modalProxy.fire(option);
													MAIN.common.login();
												}
											});
										}
									} else if (responseText.redirectUrl) {
										window.location = responseText.redirectUrl;
									}
								} else {
									$('html, body').animate({ scrollTop: 0 }, 0);
									var inHtml = '';
									for (var i=0; i<responseText.errorMessages.length; i++) {
										inHtml = inHtml+'<small class="error">' + responseText.errorMessages[i] + '</small>';
									}
									$('#cart-errors .form-errors').html(inHtml);
								}
							} else {
								console.log('statusText: ' + statusText);
							}
						},
						error: function cartError(xhr, statusText, exception) {
							console.log('Request Failed: ' + statusText + exception);
						}
					}
				if (mode === "minicart"){
					$('#miniCartForm').ajaxForm(cartFormOptions);
				} else {
					$('#cartForm').ajaxForm(cartFormOptions);
					$('#headerCartForm').ajaxForm(cartFormOptions);
				}
			},
			dropDown : {
				open : function(selector){
					if ( selector === "#mini-cart") {
						console.log("calling mini-cart");
						var urlPath = '/store' + MAIN_CONSTANTS.checkoutPath + "/views/miniCartVw.jsp";
						var successFunc = function(response){
							$(selector).html(response);
							return false;
						}
					}

					// I suppose if anyone wants to use dropDown for ajax calls,
					// they can add an if block like the one above. I'm wrapping
					// the ajax call below to not trigger if urlPath isn't set.
					// This is mainly to avoid random calls and/or errors
					// when foundation dropdown is used without the intention
					// to make an ajax call
					if (typeof urlPath != 'undefined')
					{
						$.ajax({
							url: urlPath,
							dataType: 'html',
							success: successFunc
						});
					}
				},
				close : function(selector){
					if ( selector === "#mini-cart"){
						$(selector).empty();
					}
				}
			},
			login : function(){
				(function initLoginForm(){
					if ($('#login-form').length === 0){
						setTimeout(function() { initLoginForm(); }, 100);
					} else {
						var $loginErrors = $('#login-form .form-errors');

						// listen for submits on the forms.
						$('#login-form').submit(function(e){
							// add rlp
							$(".submit-login").addClass("loading");
							e.stopPropagation();
							e.preventDefault();
							var $this = $(this);
							$loginErrors.empty();
							$this.validate('validateForm');
							if ($this.data('validate').isValid){
								MAIN.proxy._handleProxySubmit(e, "$('#login-form')");
								//$('#ajax-loader').foundation('reveal', 'open');
							} else {
								$(".submit-login").removeClass("loading");
							}

						});

						//listeners for form response
						pm.unbind("formSuccess");
						pm.bind("formSuccess", function (data) {
							//$('#ajax-loader').foundation('reveal', 'close');
							var $data = $(data.response).filter(function(){ return $(this).is('div.container')}),
								$errors = $data.find('.form-errors'),
								href = $("#successURL").val(),
								isInCheckout = href.search(MAIN_CONSTANTS.checkoutPath + '/singlePageCheckout.jsp');
							if ($data.attr('data-action') === "login"){
								/* there were issues with the form not submitting via ajax after
								 * one failed attempt, closing the window, reopening and resubmitting
								 * the form. The close modal 'x' was also disappearing. Inserting
								 * just the errors instead of the whole container should fix this.
								 */
								$(".submit-login").removeClass("loading");
								$loginErrors.html($errors);
								/*
								$("#login-modal .container").fadeOut().remove();
								$("#login-modal").html($data).fadeIn();
								MAIN.common.login();
								*/
							}
							else if (isInCheckout > 0) {
								// add rlp
								if (MAIN_CONSTANTS.checkoutPath.indexOf("express") >= 0) {
									window.location = MAIN_CONSTANTS.secureSiteRoot + "/store/checkout-express/singlePageCheckout.jsp";
								} else {
									$('#headerCartForm #checkout').trigger('click');
								}
							}
							else {
								window.location = MAIN_CONSTANTS.secureSiteRoot + "/store/account/profile.jsp";
							}
						});
						pm.unbind("formError");
						pm.bind("formError", function (data) {
							console.log("LOGIN ERROR");
							// add rlp
							$(".submit-login").removeClass("loading");
							//$("#login-modal").foundation('reveal', 'close');
						});
					}
				})();
			}
		},
		form : {
			_validate : function ($form) {
				var isValid = true;
				$form.validate('validateForm');
				isValid = $form.data('validate').isValid;
				return isValid;
			},
			_showErrors : function ($form, errorResponse, $modal) {
				var content;
				if (errorResponse.errorMessages.length > 0) {
					content = $.mustache(errorMessageTemplate, errorResponse);
					$form.find('.alert').remove().end()
					.prepend(content);
				}

				if (typeof errorResponse.fieldErrorMessages !== 'undefined') {
					$form.validate('showFormErrors', errorResponse.fieldErrorMessages);
				}
				if ($modal != undefined) {
					$modal.modal('show');
				}
			},
			_showInlineErrors : function (errorObj) {
				var $form = $('#' + errorObj.formId);
				if ($form.length > 0) {
					$form.validate('showFormErrors', errorObj.fieldsWithErrors);
				}
			},
			_submitFromToProxy : function (formId) {
				var pmData = {form: formId},
					form = document.getElementById(formId),
					formData =  form2js(form);
				pmData = $.extend(pmData, formData);
				pm({
					target: window.frames["proxy"],
					type: "postForm",
					data: pmData
				});
			},
			_toggleFormDisable : function toggleFormDisable ($container, isDisabled) {
				$container.find('input, select, textarea').prop('disabled', isDisabled);
			},
			_toggleValidation :  function toggleValidation ($container, isEnabled) {
				$container.find('[data-validation]')[isEnabled ? 'removeClass' : 'addClass']('disabled');
			},
			_updateFormUrls : function (updateUrlArray, context) {
				var x = 0,
					arrayLen = updateUrlArray.length;
				for (x; x < arrayLen; x++) {
					if (context) {
						$(updateUrlArray[x][0], context).val(updateUrlArray[x][1]);
					} else {
						$(updateUrlArray[x][0]).val(updateUrlArray[x][1]);
					}

				}
			}
		},
		home : {
			init : function () {
				$('.close-button').click(function(){
					$('#registration-modal').foundation('reveal', 'close');
				});
				$(document).one('ready', function(){

					var accountCreated = $.cookie('accountCreated');
					if (typeof accountCreated !== 'undefined' && accountCreated === 'true') {
						$.cookie('accountCreated', null, {path:'/'});
						$('#registration-modal').foundation('reveal', 'open');
					}
				});
				$(document).ready(function() {
				    $('img[usemap]').rwdImageMaps();
				});

				/* this is the solution we're using to ensure every browser updates the height of
				 * the homepage carousel.
				 */
				var originalH = $('#hp-carousel img').height(),
					counter = 1,
					refreshInterval = 200,
					refreshIntervalIE = 500,
					timeout = 10000,
					hasResized = false,
					$html = $('html');


				if ($html.hasClass('ie8') || $html.hasClass('ie9')){
					console.log('IE');
					var iteratorIE = setInterval(function(){
							var imgH = $('#hp-carousel img').height();
							console.log('IE: orig ('+originalH+'), new ('+imgH+')');
							if (imgH !== originalH) {
								$('#hp-carousel').height(imgH);
								originalH = $('#hp-carousel img').height();
							}
							else {counter++;}
						}, refreshIntervalIE);
					setTimeout(function(){
						console.log('IE carousel resize timed out at ' + timeout);
						clearInterval(iteratorIE);
					}, timeout);
				}
				else {
					console.log('something better than IE');
					var iterator = setInterval(function(){
							var imgH = $('#hp-carousel img').height();
							if (imgH !== originalH) {
								$('#hp-carousel').height(imgH);
								console.log('carousel resize time: ' + counter*refreshInterval/1000 + ' seconds');
								originalH = $('#hp-carousel img').height();
								hasResized = true;
								clearInterval(iterator);
							}
							else {counter++;}
						}, refreshInterval);
					setTimeout(function(){
						if (!hasResized){
							console.log('carousel resize timed out at ' + timeout);
							clearInterval(iterator);
						}
					}, timeout);
				}

				// instagram feed
				var numPicsDisplayed = 3,
					postPadding = .05,
					numPicsToMove = 3,
					postWidth = Math.floor($('#instagram-feed').width() / numPicsDisplayed),
					postPaddingCss = postPadding * postWidth,
					postPaddingTotal = postWidth * ( postPadding * 2 ),
					imgInfoWidth = (postWidth - postPaddingTotal);
				// get instagram info
				$.getJSON('/store/instagram/instagramInfo.jsp', function(data) {
					var pic = data.data.profile_picture,
						username = data.data.username;
					$('#profile-pic').html('<img src="'+pic+'">');
					$('#handle').html('@'+username);
				});
				// get instagram feed
				$.getJSON('/store/instagram/instagramFeed.jsp', function(data) {
					var posts = data.data,
						postList = '';
					for (var post=0; post<posts.length; post++) {
						var image = posts[post].images.thumbnail.url,
							likes = posts[post].likes.count,
							comments = posts[post].comments.count,
							link = posts[post].link,
							today = new Date(),
							taken = new Date(posts[post].created_time*1000),
							created = new Date(posts[post].created_time*1000).getTime(),
							current = new Date().getTime(),
							seconds = ( current - created ) / 1000,
							minutes = seconds / 60,
							hours = minutes / 60,
							days = hours / 24,
							weeks = days / 7,
							months = weeks / 4,
							years = months / 12,
							elapsed = '';
						if (years >= 1) {
							elapsed = parseInt(years) + 'y';
						}
						else if (weeks>4) {
							elapsed = parseInt(months) + 'mo';
						}
						else if (days>=7) {
							elapsed = parseInt(weeks) + 'w';
						}
						else if (days>=1) {
							elapsed = parseInt(days) + 'd';
						}
						else if (hours>=1) {
							elapsed = parseInt(hours) + 'h';
						}
						else if (minutes>=1) {
							elapsed = parseInt(minutes) + 'm';
						}
						else {
							elapsed = 'now';
						}
						postList += '<li class="post"><img class="pic" src="'+image+'" data-link="'+link+'"/><div class="insta-info"><div class="likes"><img src="/store/resources/images/sprite/insta-like.png"/>'+likes+'</div><div class="comments"><img src="/store/resources/images/sprite/insta-comment.png"/>'+comments+'</div><div class="elapsed">'+elapsed+'</div></div></li>'
					}
					$('#image-wrapper ul').html(postList);
					var numPosts = $('#instagram-feed li').length,
						wrapperWidth = numPosts * postWidth + postPaddingCss;
					$('#image-wrapper').width(wrapperWidth);
					$('.insta-info').css('overflow','hidden');
					$('.post .likes, .post .comments').css('overflow','visible');
					$('#instagram-feed .post').width(postWidth).css('padding', postPaddingCss).css('padding-bottom', '0');
					$('.insta-info, img.pic').width(imgInfoWidth);
					$('img.pic').css('margin-bottom',postPaddingCss);
				});
				// instagram listeners
				function instaMove(direction) {
					if (direction == 'right') {
						$('.no-touch #instagram-right').show();
						var oldPos = $('#image-wrapper').position().left,
							pos = oldPos + postWidth * numPicsToMove;
						if (pos > 0) {
							pos = 0;
							$('.no-touch #instagram-left').hide();
						}
						$('#image-wrapper').animate({left: pos});
					}
					else if (direction == 'left') {
						$('.no-touch #instagram-left').show();
						var oldPos = $('#image-wrapper').position().left,
							pos = oldPos - postWidth * numPicsToMove,
							postMargin = $('li.post').css('margin-left').replace(/[^\d]/g,''),
							maxOffset = -(($('#instagram-feed li').length - numPicsDisplayed) * postWidth);
						if (pos < maxOffset ) {
								pos = maxOffset;
								$('.no-touch #instagram-right').hide();
						}
						$('#image-wrapper').animate({left: pos});
					}
				}
				$('body').on('click', '#instagram-left', function(){
					instaMove('right');
				});
				$('body').on('click', '#instagram-right', function(){
					instaMove('left');
				});
				$(".touch #instagram-wrapper").swipe({
					swipe:function(event, direction, distance, duration, fingerCount) {
						instaMove(direction);
					},
					tap: function(target){
						window.location = ($(target)[0].target.dataset.link);
					}
				});
				$('body').on('click', '#instagram-feed .pic', function(){
					window.open($(this).data('link'));
				});
				// resize social-feature background to same size as homepage-feature
				if ( $('html').hasClass('medium-screen') || $('html').hasClass('large-screen') ) {
					var iteratorInstagram = setInterval(function(){
							var home = $('.homepage-feature').height(),
								handle = $('#instagram-handle').outerHeight(),
								wrapper = $('#instagram-wrapper').outerHeight();
							$('.social-feature').height(home);
							$('#instagram-footer').height(home-handle-wrapper);
						}, 200);
					setTimeout(function(){
						console.log('social-feature size: ', $('.social-feature').height());
						clearInterval(iteratorInstagram);
					}, 5000);
				}
				else {
					var iteratorInstagram = setInterval(function(){
							var $social = $('.social-feature'),
								width = $social.width(),
								height = $social.height();
							$social.css('background-size', width + 'px ' + height + 'px');
							console.log('background-size' + width + 'px ' + height + 'px');
						}, 200);
					setTimeout(function(){
						console.log('social-feature size: ', $('.social-feature').height());
						clearInterval(iteratorInstagram);
					}, 5000);
				}
			}
		},
		product : {
			init : function () {
				// Initialize sku picker
				MAINInit.product.skuPicker("addToCartForm");

				//Color and Size Preselects moved to SkuPicker code.

				MAINInit.product.sizeChartLink(false);

				// Run common code for the browse and product display pages
				MAINInit.browse.init();

				$("#addItemToOrder").swipe({
					swipe:function(event, direction, distance, duration, fingerCount) {
						//
					},
					tap: function(target){
						var size = sizeToolTip();
					}
				});

				//$('body').on('hover', '#addItemToOrder', function(e){
					$("#addItemToOrder").hover(function(e) {
						MAINInit.product.checkSizes(); // over

					},
					function() { // out
						if (MAINInit.product.isMobile()) {
							//$("#size-selector-mobile-error-modal").empty();
						} else {
							$("ul.product-sku-size").removeClass("error");
							$("#addItemToOrder").removeClass("error");
							$(".error-msg").fadeOut(400,
								function(){$(".error-msg").remove();}
							);
							//$(".error-arrow").fadeOut(400,
							//	function(){$(".error-arrow").remove();}
							//);
						}
					}
				);
			},
			// add rlp
			isMobile: function () {
				if( navigator.userAgent.match(/Android/i)
				|| navigator.userAgent.match(/webOS/i)
				|| navigator.userAgent.match(/iPhone/i)
				|| navigator.userAgent.match(/iPad/i)
				|| navigator.userAgent.match(/iPod/i)
				|| navigator.userAgent.match(/BlackBerry/i)
				|| navigator.userAgent.match(/Windows Phone/i)
			){
			   return true;
			 } else {
			   return false;
			  }
			},
			// add rlp
			sizeToolTip: function() {
				var sizeNeeded = true;
				var size = $("ul.product-sku-size li.selected").attr("id");
				var errorMsg = "";
				if (typeof size === "undefined" && sizeNeeded){
					position = $("#addItemToOrder").position();
					errorMsg = $('<div class="error-msg">Select size above, then click Add to Bag</div>');
					$('#addItemToOrder').before(errorMsg);
					 $( ".error-msg" ).fadeIn( 400,function() {
						setTimeout(function(){
							$(".error-msg").fadeOut(400,
								function(){$(".error-msg").remove();}
							)
						}, 7000);
					});
				}
				return size;
			},
			checkSizes: function(e) {
				var size = $("ul.product-sku-size li.selected").attr("id");
				var pos = "";
				var leftPos = 0;
				if (typeof size === "undefined" && sizeNeeded){
					if (MAINInit.product.isMobile()) {
						$("#size-selector-mobile-error-modal").empty();
						$("#size-selector-mobile-error-modal").append(sizeSelectorMobileErrorTemplate);
						$("#size-selector-mobile-error-modal").foundation("reveal", "open");
						$("#size-selector-mobile-error-modal h2").text("Select Size");
						$('#size-selector-mobile-error-modal .sku-size-selector').append($('.product-sku-size.button-group').clone()).html();
						$("#size-selector-mobile-error-modal .button").click(function(){
							var sizeId = $(this).attr("id");
							$('#size-selector-mobile-error-modal').foundation('reveal', 'close');
							$("#addToCartForm .sku-size-selector .product-sku-sizes[id='"+sizeId+"']").trigger( "click" );
						});
						//alert($( window ).width());
					} else {
						$("ul.product-sku-size").addClass("error");
						$("#addItemToOrder").addClass("error");
						pos = $('.product-sku-size.button-group').position();
						leftPos = parseInt(pos.left);
						var size = MAINInit.product.sizeToolTip();
						/*$('.product-sku-size').before('<div class="error-arrow"><img src="/store/resources/images/error/select-size-arrow.png"></div>');*/
					}
				}
			},
			initQuickView : function (color, pdpUrl) {
				//$(document).one('ready', function(){
				console.log('initQuickView(' + color + ', ' + pdpUrl + ')');
				console.log('initialization: ' + $('#quick-view-status').data('initialized'));
				if ($('#quick-view-status').size() > 0 && !$('#quick-view-status').data('initialized')) {
					console.log('Initializing quick view...');
					MAIN.product.skuPicker("QVaddToCartForm", color);
					MAIN.product.form("QVaddToCartForm");
					MAINInit.product.sizeChartLink(true);
					$('.quick-view #color_' + color).trigger('click');

					// Load the alternate images from the S7 image set
					var params = new s7sdk.ParameterManager();
					params.push('serverurl', 'http://s7d2.scene7.com/is/image');
					params.push('asset', 'rue21/' + $('.quick-view #product-image').data('src-template').replace('COLOR', $('.quick-view #product-image').data('selected-color')).replace('m', 'is'));
					params.push('cellspacing', '10,10');
					params.push('align', 'center,top');
					params.push('tmblayout', '0,1');
					params.push('iscommand','op_usm=1.5,1,6,0');
					var container = new s7sdk.Container('product-image-container-qv',params,'s7-container-qv');

					// Define alternateImagesQv as a global variable
					if (window.alternateImagesQv === undefined) {
						alternateImagesQv = new s7sdk.set.Swatches('s7-container-qv', params, 'alternate-images-qv');
						alternateImagesQv.addEventListener(s7sdk.event.AssetEvent.SWATCH_SELECTED_EVENT, function() {
							var swatch = $('.quick-view .s7swatches div.s7thumb[state=selected]');
							var bg = swatch.css('background-image');
							console.log('Background-image: ' + bg);
							if (bg !== undefined && bg !== null) {

								// Strip down the background-image to just its base URL
								bg = bg.replace(/^url\((\'|\")?([^\?]+)(\?)?(.*)(\'|\")?\)$/, '$2');
								bg = bg + '?$quickview$&DefaultImage=rue21/Img_Not_Avail';
								console.log('New image: ' + bg);
								$('.quick-view #product-image').attr('src', bg);
							}
						});
					}
					MAINInit.product.initQuickViewAlternateImages();

					// TODO: This is totally going to cause a race condition... figure out another way to get the right width
					setTimeout(function() {
						console.log('resizing to: '+$('#product-image-container-qv').width()+', 95');
						container.resize($('#product-image-container-qv').width(), 95);
						alternateImagesQv.resize($('#product-image-container-qv').width(), 95);
					}, 100);

					(function setProductDesc(){
						var $element = $('#quick-view-modal .product-description');
						if ($element.length == 0 || $element[0].scrollHeight == 0 ){
							setTimeout( function() { setProductDesc(); }, 100 );
						} else {
							if ( $element[0].scrollHeight >  $element.height() ) {
								$('<a href="' + pdpUrl + '" class="button tiny pdpLink">Read Full Product Description</a>').insertAfter($element);
								$element.children('.fade-text').show();
							}
						}
					})();
					// Set initialization status to true so we don't try and reinitialize the old quick view when a new one is launched
					$('#quick-view-status').data('initialized', true);
				}
				else {
					setTimeout(function() {
						MAINInit.product.initQuickView(color, pdpUrl);
					}, 100);
				}
				//});
			},
			initQuickViewAlternateImages : function() {
				console.log('initQuickViewAlternateImages()');
				if (typeof alternateImagesQv  == "undefined") {
					//MAINInit.product.initQuickView();
				}
				else {
					alternateImagesQv.setAsset('rue21/' + $('.quick-view #product-image').data('src-template').replace('COLOR', $('.quick-view #product-image').data('selected-color')).replace('m', 'is'));
					alternateImagesQv.selectSwatch(0,0);
				}
			},
			sizeChartLink : function(showQVOnClose) {
				// Hookup the sizing icon modal (normal data-reveal-ajax doesn't work when the source is an image)
				$('.size-chart-icon').click(function() {
					var mediaUrl = $(this).attr('href');

					if (mediaUrl.endsWith('.png') || mediaUrl.endsWith('.gif') || mediaUrl.endsWith('.jpg') || mediaUrl.endsWith('.jpeg') || mediaUrl.endsWith('.tiff') || mediaUrl.endsWith('.bmp')) {
						var content = $('<img src="'+mediaUrl+'" />');
						/*content.unbind("load");
						content.bind("load", function () {
							$('#sizing-chart-modal').css('max-width', this.width);
						});*/
						$('#sizing-chart-modal').html(content);
						if ($('#sizing-chart-modal').children('a.close-reveal-modal').length < 1) {
							$('#sizing-chart-modal').append('<a class="close-reveal-modal">&#215;</a>');
						}
						if (showQVOnClose)
						{
							$("#sizing-chart-modal").on('closed', function(){
								$('#quick-view-modal').foundation('reveal', 'open');
							});
						}

					}
					else {
						$.ajax({
							url: mediaUrl,
							dataType: 'html',
							success: function(response) {
								$('#sizing-chart-modal').html(response);
								if ($('#sizing-chart-modal').children('a.close-reveal-modal').length < 1) {
									$('#sizing-chart-modal').append('<a class="close-reveal-modal">&#215;</a>');
								}
								if (showQVOnClose)
								{
									$("#sizing-chart-modal").on('closed', function(){
										$('#quick-view-modal').foundation('reveal', 'open');
									});
								}
							}
						});
					}
				});


			},
			initAlternateImages : function() {
				if (typeof alternateImages  == "undefined") {
					MAINInit.product.initS7();
				}
				else {
					alternateImages.setAsset('rue21/' + $('.main-product #product-image').data('src-template').replace('COLOR', $('.main-product #product-image').data('selected-color')).replace('m', 'is'));
					alternateImages.selectSwatch(0,0);
				}
			},
			initS7 : function () {
				/* Scene7 Code */
				var container, params = new s7sdk.ParameterManager(), s7stage, s7larger, initId;

				function initViewer(){
					params.push("serverurl", "http://s7d2.scene7.com/is/image");
					params.push("asset", "rue21/" + $('#product-image').data('src-template').replace('COLOR', $('#product-image').data('selected-color')));
					params.push("s7container.stagesize", s7stage);
					params.push("singleclick", "zoomReset");
					params.push("doubleclick", "reset");

					if ( $('html').hasClass('small-screen') ){
						imageWidth = Math.min(290,$('#product-image').width());
						imageHeight = 290;
					}
					else {
						imageWidth = Math.min(400,$('#product-image').width());
						imageHeight = 400;
					}

					container = new s7sdk.Container("product-image",params,"s7container");
					container.resize(imageWidth, imageHeight);

					// Defining as a global variable
					mainImageS7 = new  s7sdk.ZoomView( "s7container", params, "zoomView");

					// Before adding the new images, explicitly set the height of the container to it's current height, then empty it
					if ($('#alternate-images').height() > 10) {
						$('#alternate-images').css('height', $('#alternate-images').height()).empty();
					}

					// Defining as a global variable
					alternateImages = new s7sdk.Swatches('alternate-images', params, 'swatches');

					alternateImages.resize(imageWidth, 100);

					alternateImages.addEventListener(s7sdk.event.AssetEvent.SWATCH_SELECTED_EVENT, function(event) {
						console.log('Loading: '+event.s7event.asset);
						mainImageS7.setItem(event.s7event.asset);
					});
					MAINInit.product.initAlternateImages();
				}

				// Explicitly set the dimensions of the flyout viewer for IE. If IE ever shows the zoom view as the correct
				// height (4x original) but the incorect width (1x original) then this function is not working properly or
				// the maximum number of attempts has been exceeded.
				function resizeFlyOutViewer(attempt) {
					var attempt = attempt == undefined ? 0 : attempt;
					console.log('resizeFlyOutViewer('+attempt+')');

					if (attempt < 100) {

						if ($('.s7flyoutzoomview .s7flyoutzoom').size() <= 0) {
							console.log('resizeFlyOutViewer: .s7flyoutzoomview .s7flyoutzoom is undefined');
							setTimeout(function() {
								resizeFlyOutViewer(++attempt)
							}, 100);
						}
						else {

							$('.s7flyoutzoomview .s7flyoutzoom').each(function() {
								var img = $(this).find('img');

								if (img == null) {
									console.log('resizeFlyOutViewer: .s7flyoutzoomview .s7flyoutzoom img is undefined');
									setTimeout(function() {
										resizeFlyOutViewer(++attempt)
									}, 100);
								}
								else {
									console.log('resizeFlyOutViewer: resizing to ('+img.height()+', '+img.width()+')');
									$(this).height(img.height()).width(img.width());
								}
							});
						}
					}
				}

				function initFlyOutViewer(){

					params.push('serverurl', 'http://s7d2.scene7.com/is/image');
					//params.push('asset', 'rue21/' + $('#product-image').data('src-template').replace('COLOR', $('#product-image').data('selected-color')));
					params.push('asset', 'rue21/' + $('#product-image').data('src-template').replace('COLOR', $('#product-image').data('selected-color')).replace('m', 'is'));
					console.log('rue21/' + $('#product-image').data('src-template').replace('COLOR', $('#product-image').data('selected-color')).replace('m', 'is'));
					params.push('zoomfactor', '4,4');
					params.push('tip', '0,0,0');
					params.push('s7container.stagesize', s7stage);
					params.push('tmblayout', '0,1');
					params.push('iscommand','op_usm=1.5,1,6,0');
					var container = new s7sdk.Container('product-image', params, 's7container');

					// Defining as a global variable
					mainImageS7 = new s7sdk.FlyoutZoomView('s7container', params, 'flyout');

					resizeFlyOutViewer();

					// Before adding the new images, explicitly set the height of the container to it's current height, then empty it
					if ($('#alternate-images').height() > 10) {
						$('#alternate-images').css('height', $('#alternate-images').height()).empty();
					}

					// Defining as a global variable
					alternateImages = new s7sdk.Swatches('alternate-images', params, 'swatches');
					alternateImages.resize($('#product-image').width(), $('#alternate-images').height());
					alternateImages.addEventListener(s7sdk.event.AssetEvent.SWATCH_SELECTED_EVENT, function(event) {
						console.log('Loading: '+event.s7event.asset);
						mainImageS7.setItem(event.s7event.asset);
					});
					MAINInit.product.initAlternateImages();

				}

				if ( $('html').hasClass('small-screen') ){
					var imageWidth = Math.min(290,$('#product-image').width());
					s7stage = imageWidth+',290';
					console.log('z: ' +  $('#zoomView').length );
					if ( $('#zoomView').length > 0 ){
						$('#zoomView').empty();
					}
					params.addEventListener(s7sdk.Event.SDK_READY,initViewer,false);
					params.init();
					initId = $('#zoomView');
					$('#product-image').css('overflow', 'hidden');

				} else if ( $('html').hasClass('medium-screen touch') ){
					var imageWidth = Math.min(400,$('#product-image').width());
					s7stage = imageWidth+',400';
					s7larger = 'zoom-view-med';
					params.addEventListener(s7sdk.Event.SDK_READY,initViewer,false);
					params.init();
					initId = $('#flyout');
				} else {
					var imageWidth = Math.min(400,$('#product-image').width());
					s7stage = imageWidth+',563';
					s7larger = 'zoom-view-large';
					params.addEventListener(s7sdk.Event.SDK_READY,initFlyOutViewer,false);
					params.init();
					$('#detail-box').addClass('small');
					initId = $('#flyout');
				}


				function checkS7(){
					if ( $(initId.selector).length === 0){
						setTimeout(function(){  checkS7();	}, 100);
					}
					else {
						if ( $('html').hasClass('small-screen') || $('html').hasClass('medium-screen touch') ) {
							// do nothing keep tips hidden
						} else {
							$('.view-larger-tips').show(300);
						}
						$('#alternate-images').show(300).css('display', 'inline-block');
						var altText = $('#product-image').data('alttext');
						$('#product-image').find('img').attr('alt',altText);
						$('#product-image').find('img').attr('itemprop','image');
					}
				}
				checkS7();

			},
			detail : function () {
				$('#view-larger-image').attr('src', 'http://s7d2.scene7.com/is/image/rue21/' + $('#product-image').data('src-template').replace('COLOR', $('#product-image').data('selected-color')) + '?$main$');
				MAINInit.product.form('addToCartForm');
			},
			skuPicker : function (formId, colorPreSelect){
				if (colorPreSelect === null || colorPreSelect === undefined) {
					colorPreSelect = getUrlParameter('color');
				}
				var sizePreSelect = getUrlParameter('size');

				// Search JSON and create pickers
				var colorPriceGroups = MAINdata.productData[MAINdata.pid].colorPriceGroups;

				// Sort the color groups by price, descending
				colorPriceGroups.sort(function(a, b) {
					return b.maxCurrentPrice - a.maxCurrentPrice;
				});

				for (var groupNum=0; groupNum < colorPriceGroups.length; groupNum++) {

					var colorPriceGroup = colorPriceGroups[groupNum];
					var availColors = colorPriceGroup.colors;

					// The first ul.product-sku-color is in the HTML; create another one for each additional group
					var groupContainer = $('#' + formId + ' ul.product-sku-color:last');
					if (groupNum > 0) {
						groupContainer = $('<ul class="product-sku-color button-group">').insertAfter(groupContainer);
					}

					// Add the price label if we have more than one group
					if (colorPriceGroups.length > 1) {
						$('<div class="group-pricing">$'+colorPriceGroup.maxCurrentPrice+'</div>').insertBefore(groupContainer);
					}

					// Create the color swatches from the sorted list
					for (var i=0; i<availColors.length; i++) {
						var color = availColors[availColors.length - 1 - i];

						// Build the color swatch
						var colorSwatch = $('<a href="#" class="button has-tip" data-tooltip></a>')
								.attr('id', color.id)
								.attr('title', color.displayName.toLowerCase())
								.attr('data-original-title', color.displayName.toLowerCase())
								.data('color-code', color.id.split('_')[1])
								.attr('data-color-group', color.group.toLowerCase());

						// Determine whether the swatch is a color code or an image reference
						if (color.swatch.startsWith('#')) {
							colorSwatch.css('background-color', color.swatch);
							colorSwatch.css('background-image', 'url("http://s7d2.scene7.com/is/image/rue21/' + MAINdata.pid.replace(/-/g,'_') + '_' + color.id.split('_')[1] + '_s?wid=30")');
						}
						else {
							colorSwatch.css('background-image', 'url("'+color.swatch+'")');
						}

						// Add the color swatch to the list
						var swatchListItem = $('<li class="product-sku-colors"></li>').append(colorSwatch);
						groupContainer.prepend(swatchListItem);
					}
				}


				// Find all the unique sizes in the product data
				$.each(MAINdata.productData[MAINdata.pid].skus, function(){
					if ($.inArray(this.variants.sizeVariantType.displayName, $.map(availSizes, function(size) { return size.displayName; })) === -1){
						availSizes.push(this.variants.sizeVariantType);
					}
				});
				// Sort the avaialable sizes by the order column, then alphabetically
				availSizes.sort(function(a, b) {
					a.order = a.order == '' ? 10000 : a.order;
					b.order = b.order == '' ? 10000 : b.order;
					var val = a.order - b.order;

					if (val == 0) {
						val = a.displayName.toLowerCase() == b.displayName.toLowerCase() ? 0 : (a.displayName.toLowerCase() > b.displayName.toLowerCase() ? 1 : -1);
					}
					return val;
				});

				// Create the size swatches from the sorted list
				for (var i=0; i<availSizes.length; i++) {
					var size = availSizes[i];
					$("#" + formId + " ul.product-sku-size").append("<li class='product-sku-sizes button tiny' id=" + size.id + ">" + size.displayName + "</li>");
				}

				// check if preselected or check if none or only child.
					//Shut Off if None or Preselect Only Childs
					switch ($('#' + formId + ' ul.product-sku-color li a').length){
						case 0 :
							$("#" + formId + " .product-sku-select .color-header").hide();
							$("#" + formId + " .product-sku-select .product-sku-color").hide();
							colorNeeded = false;
						break;
						case 1 :
							$("#" + formId + " ul.product-sku-color li a").addClass("selected");
							$("#" + formId + " .product-sku-select .color-header").hide();
							$("#" + formId + " .product-sku-select .product-sku-color").hide();
						break;
					}
					switch (availSizes.length){
						case 0 :
							$("#" + formId + " .product-sku-select .size-header").hide();
							$("#" + formId + " .product-sku-select .product-sku-size").hide();
							sizeNeeded = false;
						break;
						case 1 :
							if (availSizes[0].displayName === "."){
								$("#" + formId + " .product-sku-select .product-sku-size li").addClass('selected');
								$("#" + formId + " .product-sku-select .size-header").hide();
								$("#" + formId + " .product-sku-select .product-sku-size").hide();
								sizeNeeded = false;
							} else {
								$("#" + formId + " ul.product-sku-size li").addClass("selected");
							}
						break;
					}


				function resetOptions(){
					$("#" + formId + " ul.product-sku-size li, #" + formId + " ul.product-sku-color li a").removeClass("in-stock disabled");
				}

				function updateSkuPicker(colorid, sizeid){
					if (colorid === null && typeof $("#" + formId + " ul.product-sku-color li a.selected").attr("id") !== "undefined"){
						colorid = $("#" + formId + " ul.product-sku-color li a.selected").attr("id");
					}
					if (sizeid === null && typeof $("#" + formId + " ul.product-sku-size li.selected").attr("id") !== "undefined"){
						sizeid = $("#" + formId + " ul.product-sku-size li.selected").attr("id");
					}

					$.each(MAINdata.productData[MAINdata.pid].skus, function(){
						if (colorid !== null){
							if (this.variants.colorVariantType.id === colorid){
								$("#" + formId + " #" +  this.variants.sizeVariantType.id).addClass("in-stock").off().click(function(e){
									resetOptions();
									$("#" + formId + " ul.product-sku-size li").removeClass("selected");
									$(this).addClass("selected");
									updateSkuPicker(null, $(this).attr("id"));
									return false;
								});
							}
						}
						if (sizeid !== null){
							if (this.variants.sizeVariantType.id === sizeid){
								$("#" + formId + " #" +  this.variants.colorVariantType.id).addClass("in-stock").off().click(function(e){
									e.preventDefault();
									resetOptions();
									$("#" + formId + " ul.product-sku-color li a").removeClass("selected");
									$(this).addClass("selected");
									updateSkuPicker($(this).attr("id"), null);

									var productImage = $($($($($($($($($(this).parent()).parent()).parent()).parent()).parent()).parent()).parent()).parent()).find('#product-image');
									productImage.data('selected-color', $(this).attr('id').split('_')[1]);

									// PDP
									if (productImage.is('div')) {
										console.log("calling s7 init");
										MAINInit.product.initAlternateImages();
										if (typeof mainImageS7 !== 'undefined') {
											mainImageS7.setAsset('rue21/' + $('.main-product #product-image').data('src-template').replace('COLOR', $('.main-product #product-image').data('selected-color')).replace('m', 'is'));
										}
									}
									// Quick View
									else {
										MAINInit.product.initQuickViewAlternateImages();
										productImage.attr('src', "http://s7d2.scene7.com/is/image/rue21/" + productImage.data('src-template').replace('COLOR', productImage.data('selected-color')));
									}
									return false;
								});
							}
						}
					});

					console.log(colorid + " | " + sizeid);

					if (colorid !== null){
						$('small.color-error').remove();
						$.each($("#" + formId + " ul.product-sku-size li"), function(){

							if ($(this).hasClass('has-tip') && $(this).attr('title') === '') {
								$(this).addClass('had-tip');
							}
							$(this).removeClass("has-tip").removeAttr('title data-tooltip');

							if (!$(this).hasClass('in-stock')) {
								$(this).addClass("disabled")
										.off("click")
										.attr('data-tooltip', '')
										.addClass('has-tip');
								if (!$(this).hasClass('had-tip')) {
									$(this).attr('title', 'This size is not available in combination with the color selected');
								}
							}
						});
					}
					if (sizeid !== null){
						$('small.size-error').remove();
						$.each($("#" + formId + " ul.product-sku-color li a"), function(){
							var swatch = $(this);

							// Remove all the tooltips if neccessary
							if (swatch.hasClass('has-tip') && swatch.attr('title') === '') {
								swatch.addClass('had-tip');
							}
							swatch.removeClass("has-tip").removeAttr('title data-tooltip');
							if ((swatch.parent()).hasClass('has-tip') && (swatch.parent()).attr('title') === '') {
								(swatch.parent()).addClass('had-tip');
							}
							(swatch.parent()).removeClass('has-tip').removeAttr('title data-tooltip');

							// Add the right tooltip back
							if (swatch.hasClass('in-stock')) {
								swatch
									.attr('data-tooltip', '')
									.addClass('has-tip');
								if (!swatch.hasClass('had-tip')) {
									swatch.attr('title', swatch.data('original-title'));
								}
							}
							else {
								swatch.addClass("disabled")
										.off("click");
								$(swatch.parent())
									.attr('data-tooltip', '')
									.addClass('has-tip');
								if (!$(swatch.parent()).hasClass('had-tip')) {
									$(swatch.parent()).attr('title', 'This color is not available in combination with the size selected');
								}
							}
						});
					}
					else {
						$.each($("#" + formId + " ul.product-sku-color li a"), function(){
							var swatch = $(this);

							if (swatch.hasClass('in-stock')) {
								swatch
									.attr('data-tooltip', '')
									.addClass('has-tip');
								if (!swatch.hasClass('had-tip')) {
									swatch.attr('title', swatch.data('original-title'));
								}
							}
						});
					}

					function getSkuData(color, size){
						$.each(MAINdata.productData[MAINdata.pid].skus, function(){
						if (this.variants.sizeVariantType.id === size  && this.variants.colorVariantType.id === color ){
								$("#" + formId + " .input-selected-sku").val(this.catalogRefId);
								$("#" + formId + " .input-color-id").val(color);
								$("#" + formId + " .input-size-id").val(size);
								$("#" + formId + " .input-color-name").val(this.variants.colorVariantType.displayName);
								$("#" + formId + " .input-size-name").val(this.variants.sizeVariantType.displayName);
								$("#" + formId + " .input-price").val(this.price);
								$("span.product-price").text("$" + this.price);
							}
						});
					}

					if (colorid !== null && sizeid !== null){
						getSkuData(colorid, sizeid);
					}
				}

				$("#" + formId + " ul.product-sku-color li a").off().click(function(e){
					console.log("clicked?");
					e.preventDefault();
					resetOptions();
					$("#" + formId + " ul.product-sku-color li a").removeClass("selected");
					$(this).addClass("selected");
					updateSkuPicker($(this).attr("id"), null);
					var productImage = $($($($($($($($($(this).parent()).parent()).parent()).parent()).parent()).parent()).parent()).parent()).find('#product-image');
					//var productImage = $(this).parents().find("#product-image");

					productImage.data('selected-color', $(this).attr('id').split('_')[1]);

					// PDP
					if (productImage.is('div')) {
						console.log("calling s7 init???");
						//$("#view-larger-image").attr("src", "http://s7d2.scene7.com/is/image/rue21/" + $('#product-image').data('src-template').replace('COLOR', $('#product-image').data('selected-color')) + "?$main$");
						MAINInit.product.initAlternateImages();
						if (typeof mainImageS7 !== 'undefined') {
							mainImageS7.setAsset('rue21/' + $('.main-product #product-image').data('src-template').replace('COLOR', $('.main-product #product-image').data('selected-color')).replace('m', 'is'));
						}
					}
					// Quick View
					else {
						MAINInit.product.initQuickViewAlternateImages();
						productImage.attr('src', "http://s7d2.scene7.com/is/image/rue21/" + productImage.data('src-template').replace('COLOR', productImage.data('selected-color')));
					}
				});

				$("#" + formId + " ul.product-sku-size li").off().click(function(e){
					console.log("clicked? #2");
					resetOptions();
					$("#" + formId + " ul.product-sku-size li").removeClass("selected");
					$(this).addClass("selected");
					updateSkuPicker(null, $(this).attr("id"));
				});

				if (colorPreSelect !== "null") {
					$('#color_' + colorPreSelect).trigger('click');
				}
				else {
					if ($('.product-sku-colors:first a:last').size() > 0) {
						$('.product-sku-colors:first a:last').trigger('click')
					}
					else {

						// If there are no valid swatches to select from,
						MAINInit.product.initAlternateImages();
						if (typeof mainImageS7 !== 'undefined') {
							mainImageS7.setAsset('rue21/' + $('.main-product #product-image').data('src-template').replace('COLOR', $('.main-product #product-image').data('selected-color')).replace('m', 'is'));
						}
					}
				}

				if (sizePreSelect !== "null"){
					$('#size_' + sizePreSelect).trigger('click');
				}
			},
			successPokey: function(responseText, statusText, xhr, $form, $productForm, formId) {
				$productForm.find('input[type=submit]').removeClass('loading');
					var content,
						$successModal;
					if (statusText == 'success') {
						if (responseText.success == 'true') {
							content = responseText.content;

							$("#cart-confirm-modal .modal-content").remove();
							$("#cart-confirm-modal").append(cartConfirmTemplate);
							$("#cart-confirm-modal").foundation("reveal", "open");
							$("#cart-confirm-modal h2").text("ITEM ADDED TO BAG");
							$("#cart-confirm-modal h3").html(MAINdata.productData[MAINdata.pid].name);
							$("#cart-confirm-modal img").attr({'src':'http://s7d2.scene7.com/is/image/rue21/' + $('#product-image').data('src-template').replace('COLOR', $('#product-image').data('selected-color')), 'height':'315', 'width':'225'});
							$("#cart-confirm-modal .cart-color").text($("#" + formId + " .input-color-name").val());
							if ($("#cart-confirm-modal .cart-color").text() == 'NONE') {
								$($("#cart-confirm-modal .cart-color").parent()).hide();
							}
							$("#cart-confirm-modal .cart-size").text($("#" + formId + " .input-size-name").val());
							if ($("#cart-confirm-modal .cart-size").text() == '.') {
								$($("#cart-confirm-modal .cart-size").parent()).hide();
							}
							$("#cart-confirm-modal .cart-quantity").text($("#" + formId + " .input-quantity").val());

							//calculate price
							var qty = $("#" + formId + " .input-quantity").val();
							var skuId = $("#" + formId + " .input-selected-sku").val();
							var url = '/store/browse/fragments/addToCartSuccessPriceDisplay.jsp?sku='+skuId+'&qty='+qty
							$("#cart-confirm-modal .product-price").load(url);
							$("#cart-confirm-modal button.continue").off().click(function(){
								$('#cart-confirm-modal').foundation('reveal', 'close');
							});
							$("#cart-confirm-modal button.viewcart").off().click(function(){
								$('#cart-confirm-modal').foundation('reveal', 'close');
								$("#cart-confirm-modal .modal-content").remove();
								window.location.href = "/store/checkout/cart.jsp";
							});

							MAIN.profileController.getProfileStatus(); //updates Cart Quantity
						} else {
							// display quantity error
							$('#global-small-modal .message').html(responseText.fieldErrorMessages.quantity);
							$('#global-small-modal').foundation('reveal', 'open');
							$form.one('click', '.option-link', function(){
								$form.validate('clearFormErrors');
							});
						}
					} else {
						// bad response.
						console.log('statusText: ' + statusText);
						// close modal
						$('#cart-confirm-modal').foundation('reveal', 'close');
						$("#cart-confirm-modal .modal-content").remove();
					}
				},
			successExpress: function(responseText, statusText, xhr, $form, $productForm, formId) {
				//debugger;
				console.log("successExp 1");
				$productForm = $("#" + formId + ".product-form");
				$productForm.find('input[type=submit]').removeClass('loading');
				var content,
					$successModal;
				if (statusText == 'success') {
					if (responseText.success == 'true') {
						//console.log("SUCCESS responseText ");
						//console.log(responseText);
						content = responseText.content;
						$("#bag-feedback").append(bagFeedbackTemplate);
						$("#bag-feedback h2").text("Added...");
						$("#bag-feedback h3").html(MAINdata.productData[MAINdata.pid].name);
						$("#bag-feedback img").attr({'src':'http://s7d2.scene7.com/is/image/rue21/' + $('#product-image').data('src-template')
							.replace('COLOR', $('#product-image').data('selected-color'))});
						var la = $("#" + formId + " .input-color-name").val().split(" ").join("<br>");
						$("#bag-feedback .cart-color").html(la);
						//$("#bag-feedback .cart-color").text($("#" + formId + " .input-color-name").val());

						if ($("#bag-feedback .cart-color").text() == 'NONE') {
							$($("#bag-feedback .cart-color").parent()).hide();
						}
						if (responseText.closenessQualifier == "") {
							$("#bag-feedback .closeness-qualifier").remove();
						} else {
							$("#bag-feedback .closeness-qualifier").html(responseText.closenessQualifier);
						}
						$("#bag-feedback .cart-size").text($("#" + formId + " .input-size-name").val());
						if ($("#bag-feedback .cart-size").text() == '.') {
							$($("#bag-feedback .cart-size").parent()).hide();
						}
						$("#bag-feedback .cart-quantity").text($("#" + formId + " .input-quantity").val());
						if ($form.attr("id") == "QVaddToCartForm") {
							$('#quick-view-modal').foundation('reveal', 'close');
						}

						$('html, body').animate({scrollTop:0}, 'slow', function() {
							$("#bag-feedback").slideDown(100);
						});

						$(":not(#bag-feedback)").click(function(e) {
							var la = $(e.target).closest("#bag-feedback");
							if($(e.target).closest("#bag-feedback").children().length === 0) {
								$("#bag-feedback").empty();
								$("#bag-feedback").hide();
							}
						});
						$("#bag-feedback button.viewcart").off().click(function(e){
							$("#bag-feedback").empty();
							$("#bag-feedback").hide();
							e.preventDefault();
							$('#headerCartForm #checkout').click();
						});

						MAIN.profileController.getProfileStatus(); //updates Cart Quantity
					} else {
						console.log("ERROR responseText ");
						console.log(responseText);
						// display quantity error
						//$('#global-small-modal .message').html(responseText.fieldErrorMessages);
						$('#global-small-modal .message').html(responseText);
						$('#global-small-modal').foundation('reveal', 'open');
						$form.one('click', '.option-link', function(){
							$form.validate('clearFormErrors');
						});
					}
				} else {
					// bad response.
					console.log('BAD RESPONSE - statusText: ' + statusText);
				}
			},
			form : function(formId){
				// set up Modal Sizes
				if ( $("html").hasClass("small-screen") ){
					$("#quick-view-modal").addClass("expand");
				} else if ( $("html").hasClass("medium-screen") ){
					$("#quick-view-modal").addClass("large");
				} else { // large screen
					$("#quick-view-modal").addClass("medium");
				}

				if ( $("html").hasClass("small-screen") ){
					$("#cart-confirm-modal").addClass("expand");
				} else { // medium and up
					var width = 575,
						docWidth = $(document).width(),
						newMargin = (docWidth - width) / 2;
					$("#cart-confirm-modal").css('width', width);
					$("#cart-confirm-modal").css('left', newMargin);
				}

				var productControllers = {},
					product,
					$form = $("#" + formId),
					$productForm = $("#" + formId + ".product-form"),
					productFormOptions = {
						dataType : 'json',
						beforeSubmit : function beforeCartSubmit(arr, $form, options) {
							var colorNeeded = true,
								sizeNeeded = true,
								color = $("#" + formId + " ul.product-sku-color li a.selected").attr("id"),
								size = $("#" + formId + " ul.product-sku-size li.selected").attr("id");

							if (typeof color === "undefined" && colorNeeded){
								$("#" + formId + " .color-error").remove();
								$("#" + formId + " .color-header").after("<small class='error color-error'>Please select a color.</small>");
							}
							if (typeof size === "undefined" && sizeNeeded){
								/* chg rlp */
								if (formId == "QVaddToCartForm") {
									$("#" + formId + " .size-error").remove();
									$("#" + formId + " .size-header").after("<small class='error size-error'>Please select a size.</small>");
								}
								return false;
							}

							//check to make sure form is populated.
							/* setTimeout(function(){
								console.log("checking form...");
								if ( $("#" + formId + " .input-selected-sku").val() === "" && $("#" + formId + " .input-color-id").val() === "" ){
									console.log("null form!!!");
									console.log("checkthis: " + $("#" + formId + " .input-selected-sku").val() + " | " + $("#" + formId + " .input-color-id").val());
								} else {
									console.log("checkthis: " + $("#" + formId + " .input-selected-sku").val() + " | " + $("#" + formId + " .input-color-id").val());
									console.log("success!");
									$("#cart-confirm-modal").append(loadingTemplate);
									$("#cart-confirm-modal").foundation("reveal", "open");

									console.log("submit fired");
								return;
								}

							}, 50); */

							// All validation has passed - initialize the loading state
							$productForm.find('input[type=submit]').addClass('loading');

						},
						success: function cartSuccess(responseText, statusText, xhr, $form) {
							console.log("responseText ");
							console.log(responseText);
							if (responseText.express) {
								// Express version
								MAINInit.product.successExpress(responseText, statusText, xhr, $form, $productForm, formId);
							} else {
								// Original version
								MAINInit.product.successPokey(responseText, statusText, xhr, $form, $productForm, formId);
							}
						},
						/*
						successORIGINAL: function cartSuccess(responseText, statusText, xhr, $form) {
							$productForm.find('input[type=submit]').removeClass('loading');
							var content,
								$successModal;
							if (statusText == 'success') {
								if (responseText.success == 'true') {
									content = responseText.content;

									$("#cart-confirm-modal .modal-content").remove();
									$("#cart-confirm-modal").append(cartConfirmTemplate);
									$("#cart-confirm-modal").foundation("reveal", "open");
									$("#cart-confirm-modal h2").text("ITEM ADDED TO BAG");
									$("#cart-confirm-modal h3").html(MAINdata.productData[MAINdata.pid].name);
									$("#cart-confirm-modal img").attr({'src':'http://s7d2.scene7.com/is/image/rue21/' + $('#product-image').data('src-template').replace('COLOR', $('#product-image').data('selected-color')), 'height':'315', 'width':'225'});
									$("#cart-confirm-modal .cart-color").text($("#" + formId + " .input-color-name").val());
									if ($("#cart-confirm-modal .cart-color").text() == 'NONE') {
										$($("#cart-confirm-modal .cart-color").parent()).hide();
									}
									$("#cart-confirm-modal .cart-size").text($("#" + formId + " .input-size-name").val());
									if ($("#cart-confirm-modal .cart-size").text() == '.') {
										$($("#cart-confirm-modal .cart-size").parent()).hide();
									}
									$("#cart-confirm-modal .cart-quantity").text($("#" + formId + " .input-quantity").val());

									//calculate price
									var qty = $("#" + formId + " .input-quantity").val();
									var skuId = $("#" + formId + " .input-selected-sku").val();
									var url = '/store/browse/fragments/addToCartSuccessPriceDisplay.jsp?sku='+skuId+'&qty='+qty
									$("#cart-confirm-modal .product-price").load(url);
									$("#cart-confirm-modal button.continue").off().click(function(){
										$('#cart-confirm-modal').foundation('reveal', 'close');
									});
									$("#cart-confirm-modal button.viewcart").off().click(function(){
										$('#cart-confirm-modal').foundation('reveal', 'close');
										$("#cart-confirm-modal .modal-content").remove();
										window.location.href = "/store/checkout/cart.jsp";
									});

									MAIN.profileController.getProfileStatus(); //updates Cart Quantity
								} else {
									// display quantity error
									$('#global-small-modal .message').html(responseText.fieldErrorMessages.quantity);
									$('#global-small-modal').foundation('reveal', 'open');
									$form.one('click', '.option-link', function(){
										$form.validate('clearFormErrors');
									});
								}
							} else {
								// bad response.
								console.log('statusText: ' + statusText);
								// close modal
								$('#cart-confirm-modal').foundation('reveal', 'close');
								$("#cart-confirm-modal .modal-content").remove();
							}
						},*/
						error: function loginError() {
							$productForm.find('input[type=submit]').removeClass('loading');
							console.log('Request Failed');
							// ajax request failed.
						}
					};

				$productForm.ajaxForm(productFormOptions);

				if (typeof MAINdata !== 'undefined' && typeof MAINdata.productData !== 'undefined') {
					for (product in MAINdata.productData) {
						//productControllers[product] = new MAIN.ProductController(MAINdata.productData[product]);
					}
				}
			}
		},
		proxy : {
			init : function () {
				MAIN.proxy._sendContent();
			},
			paymentMethods : function(){
				var $paymentEditForm = $("#form-edit-payment"),
					$paymentAddForm = $("#form-add-payment"),
					paymentOptions = {
						dataType : 'html',
						success : function paymentOptionsSuccess(responseText, statusText, xhr, $form){
							var pmData = {form : $form.attr('id'), response : responseText};
							if (statusText == 'success') {
									pm({
										target: window.parent,
										type: 'formSuccess',
										data: pmData
									});
							} else {
								// bad response.
								console.log('statusText: ' + statusText);
							}
						},
						error: function(xhr, statusText, exception) {
							console.log('Request Failed: ' + statusText + exception);
						}
					};
				$paymentEditForm.ajaxForm(paymentOptions);
				$paymentAddForm.ajaxForm(paymentOptions);
				/*post Message listeners */
				pm.bind("postForm", function (data) {
					MAIN.proxy._handlePostForm(data);
				});
			},
			login : function() {
				var $loginForm = $('#login-form'),
					loginOptions = {
						dataType : 'html',
						success: function loginSuccess(responseText, statusText, xhr, $form) {
							var pmData = {form : $form.attr('id'), response : responseText};
							if (statusText == 'success') {
								pm({
									target: window.parent,
									type: 'formSuccess',
									data: pmData
								});
							} else {
								// bad response.
								console.log('statusText: ' + statusText);
							}

						},
						error: function loginError(xhr, statusText, exception) {
							console.log('Request Failed: ' + statusText + ' excepiton: ' + exception);
							// ajax request failed.
						}
					};
				$loginForm.ajaxForm(loginOptions);
				/*post Message listeners */
				pm.bind("postForm", function (data) {
					MAIN.proxy._handlePostForm(data);
				});
			},
			_handleProxySubmit : function handleProxySubmit(e, $modal) {
				var formData,
					pmData = {form: e.target.id},
					$form = $(e.target);

					formData =  form2js(e.target);
					pmData = $.extend(pmData, formData);
					pm({
						target: window.frames["proxy"],
						type: "postForm",
						data: pmData
					});
				e.stopPropagation();
				e.preventDefault();
			},
			_handlePostForm : function (data, submitId) {
				//console.log("handle post form called");
				var form = document.getElementById(data.form),
					$form,
					$submitBtn;
				if (form) {
					js2form(form, data);
					if (submitId) {
						$(submitId).click();
					} else {
						//HERE
						$form = $(form);
						$submitBtn = $form.find('input[type=submit]');
						if ($submitBtn.length > 0) {
							//HERE
							$submitBtn.click();
						} else {
							$form.submit();
						}
					}
				}
			},
			_sendContent : function () {
				var pmData = {content: document.getElementById('proxyContent').innerHTML};
				pm({
						target: window.parent,
						type:"setModalContent",
						data: pmData
					});
			//console.log("got to here");
			}
		},
		topic : {
			init : function () {},
			contactus : function () {
				$(".birthday-input").mask("99/99/9999", { placeholder:" " });
				Recaptcha.create("6LcPR-QSAAAAAJuMU4LGo2hBh7SDLGDY_bkVe5kj", "rue_responsive_recaptcha_widget",
					{
						theme: "custom",
						custom_theme_widget: 'rue_responsive_recaptcha_widget',
						callback: Recaptcha.focus_response_field
					});
			}
		},
		staticpage : {
			init : function () {
				$(document).ready(function() {
				   $('#faqs h3').each(function() {
						var tis = $(this), state = false, answer = tis.next('div').hide().css('height','auto').slideUp();
						tis.click(function() {
							state = !state;
							answer.slideToggle(state);
							tis.toggleClass('active',state);
						});
					});
				});
			}
		}

	};

	$.extend(MAIN, MAINInit);

	$(document).ready(function () {
		MAIN.init();
		//MAIN.test();
	});

})(window.jQuery, window.MAIN_CONSTANTS, window.MAIN);
