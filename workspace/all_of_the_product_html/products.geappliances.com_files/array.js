/******************************************************************************

This is array.js, a collection of array accessor and iteration methods
that were added to JavaScript versions 1.6 to 1.8, and are already
implemented in some web browsers but not others.

The methods implemented here are: filter, forEach, every, map, some,
reduce, reduceRight, indexOf, and lastIndexOf.

They are described and documented in:

	https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Objects/Array
	http://tinyurl.com/ah9cry

Including this file in all browsers is safe; array methods already
implemented will not be redefined.

COPYRIGHT --- Functions in this file are taken from sample code on the
Mozilla Developer Center web site, which is available under the MIT
License, included below.

*******************************************************************************

The MIT License

Copyright (c) 2009 The Mozilla Foundation

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*******************************************************************************

NOTE --- If your code uses this idiom to iterate on the elements of an
array:

	for (var i in array) { // WRONG
		...
	}

and you include this file, your code will stop working.  However, the
above is not the correct method to iterate on the elements of an array
anyway.  The following is the correct method:

	for (var i = 0; i < array.length; i++) { // RIGHT
		...
	}

or:

	array.forEach(function (element) { // RIGHT
		...
	});

******************************************************************************/

/* https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter */
/* http://tinyurl.com/d7df2q */

if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun /*, thisp*/) {
		var len = this.length;
		if (typeof fun != "function") {
			throw new TypeError();
		}

		var res = new Array();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this) {
				var val = this[i]; // in case fun mutates this
				if (fun.call(thisp, val, i, this)) {
					res.push(val);
				}
			}
		}

		return res;
	};
}

/* https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/forEach */
/* http://tinyurl.com/bobp76 */

if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(fun /*, thisp*/) {
		var len = this.length;
		if (typeof fun != "function") {
			throw new TypeError();
		}

		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this) {
				fun.call(thisp, this[i], i, this);
			}
		}
	};
}

/* https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/every */
/* http://tinyurl.com/c3us9q */

if (!Array.prototype.every) {
	Array.prototype.every = function(fun /*, thisp*/) {
		var len = this.length;
		if (typeof fun != "function") {
			throw new TypeError();
		}

		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this &&
			    !fun.call(thisp, this[i], i, this)) {
				return false;
			}
		}

		return true;
	};
}

/* https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/map */
/* http://tinyurl.com/cbx9by */

if (!Array.prototype.map) {
	Array.prototype.map = function(fun /*, thisp*/) {
		var len = this.length;
		if (typeof fun != "function") {
			throw new TypeError();
		}

		var res = new Array(len);
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this) {
				res[i] = fun.call(thisp, this[i], i, this);
			}
		}

		return res;
	};
}

/* https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/some */
/* http://tinyurl.com/6he9l8 */

if (!Array.prototype.some) {
	Array.prototype.some = function(fun /*, thisp*/) {
		var len = this.length;
		if (typeof fun != "function") {
			throw new TypeError();
		}

		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this &&
			    fun.call(thisp, this[i], i, this)) {
				return true;
			}
		}

		return false;
	};
}

/* https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce */
/* http://tinyurl.com/bs32gg */

if (!Array.prototype.reduce) {
	Array.prototype.reduce = function(fun /*, initial*/) {
		var len = this.length;
		if (typeof fun != "function") {
			throw new TypeError();
		}

		// no value to return if no initial value and an empty array
		if (len === 0 && arguments.length == 1) {
			throw new TypeError();
		}

		var i = 0;
		if (arguments.length >= 2) {
			var rv = arguments[1];
		}
		else {
			do {
				if (i in this) {
					rv = this[i++];
					break;
				}

				// if array contains no values, no initial value to return
				if (++i >= len) {
					throw new TypeError();
				}
			}
			while (true);
		}

		for (; i < len; i++) {
			if (i in this) {
				rv = fun.call(null, rv, this[i], i, this);
			}
		}

		return rv;
	};
}

/* https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight */
/* http://tinyurl.com/b3b2sl */

if (!Array.prototype.reduceRight) {
	Array.prototype.reduceRight = function(fun /*, initial*/) {
		var len = this.length;
		if (typeof fun != "function") {
			throw new TypeError();
		}

		// no value to return if no initial value, empty array
		if (len === 0 && arguments.length == 1) {
			throw new TypeError();
		}

		var i = len - 1;
		if (arguments.length >= 2) {
			var rv = arguments[1];
		}
		else {
			do {
				if (i in this) {
					rv = this[i--];
					break;
				}

				// if array contains no values, no initial value to return
				if (--i < 0) {
					throw new TypeError();
				}
			}
			while (true);
		}

		for (; i >= 0; i--) {
			if (i in this) {
				rv = fun.call(null, rv, this[i], i, this);
			}
		}

		return rv;
	};
}

/* https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/indexOf */
/* http://tinyurl.com/awz9q5 */

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt /*, from*/) {
		var len = this.length;

		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) {
			from += len;
		}

		for (; from < len; from++) {
			if (from in this &&
			    this[from] === elt) {
				return from;
			}
		}
		return -1;
	};
}

/* https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/lastIndexOf */
/* http://tinyurl.com/b9hbxs */

if (!Array.prototype.lastIndexOf) {
	Array.prototype.lastIndexOf = function(elt /*, from*/) {
		var len = this.length;

		var from = Number(arguments[1]);
		if (isNaN(from)) {
			from = len - 1;
		}
		else {
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
			if (from < 0) {
				from += len;
			}
			else if (from >= len) {
				from = len - 1;
			}
		}

		for (; from > -1; from--) {
			if (from in this &&
			    this[from] === elt) {
				return from;
			}
		}
		return -1;
	};
}

