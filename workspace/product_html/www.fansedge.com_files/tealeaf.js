/*!
 * Sizzle CSS Selector Engine v@VERSION
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: @DATE
 */

if (typeof (window.Sizzle) == "undefined") {
    (function (window) {

        var i,
            support,
            cachedruns,
            Expr,
            getText,
            isXML,
            compile,
            outermostContext,
            sortInput,
            hasDuplicate,

            // Local document vars
            setDocument,
            document,
            docElem,
            documentIsHTML,
            rbuggyQSA,
            rbuggyMatches,
            matches,
            contains,

            // Instance-specific data
            expando = "sizzle" + -(new Date()),
            preferredDoc = window.document,
            dirruns = 0,
            done = 0,
            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),
            sortOrder = function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                }
                return 0;
            },

            // General-purpose constants
            strundefined = typeof undefined,
            MAX_NEGATIVE = 1 << 31,

            // Instance methods
            hasOwn = ({}).hasOwnProperty,
            arr = [],
            pop = arr.pop,
            push_native = arr.push,
            push = arr.push,
            slice = arr.slice,
            // Use a stripped-down indexOf if we can't use a native one
            indexOf = arr.indexOf || function (elem) {
                var i = 0,
                    len = this.length;
                for (; i < len; i++) {
                    if (this[i] === elem) {
                        return i;
                    }
                }
                return -1;
            },

            booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

            // Regular expressions

            // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
            whitespace = "[\\x20\\t\\r\\n\\f]",
            // http://www.w3.org/TR/css3-syntax/#characters
            characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

            // Loosely modeled on CSS identifier characters
            // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
            // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
            identifier = characterEncoding.replace("w", "w#"),

            // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
            attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
                "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

            // Prefer arguments quoted,
            //   then not containing pseudos/brackets,
            //   then attribute selectors/non-parenthetical expressions,
            //   then anything else
            // These preferences are here to reduce the number of selectors
            //   needing tokenize in the PSEUDO preFilter
            pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",

            // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

            rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g"),

            rpseudo = new RegExp(pseudos),
            ridentifier = new RegExp("^" + identifier + "$"),

            matchExpr = {
                "ID": new RegExp("^#(" + characterEncoding + ")"),
                "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                "ATTR": new RegExp("^" + attributes),
                "PSEUDO": new RegExp("^" + pseudos),
                "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                    "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                    "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                // For use in libraries implementing .is()
                // We use this for POS matching in `select`
                "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            },

            rinputs = /^(?:input|select|textarea|button)$/i,
            rheader = /^h\d$/i,

            rnative = /^[^{]+\{\s*\[native \w/,

            // Easily-parseable/retrievable ID or TAG or CLASS selectors
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

            rsibling = /[+~]/,
            rescape = /'|\\/g,

            // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
            runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
            funescape = function (_, escaped, escapedWhitespace) {
                var high = "0x" + escaped - 0x10000;
                // NaN means non-codepoint
                // Support: Firefox
                // Workaround erroneous numeric interpretation of +"0x"
                return high !== high || escapedWhitespace ?
                    escaped :
                    high < 0 ?
                        // BMP codepoint
                        String.fromCharCode(high + 0x10000) :
                        // Supplemental Plane codepoint (surrogate pair)
                        String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
            };

        // Optimize for push.apply( _, NodeList )
        try {
            push.apply(
                (arr = slice.call(preferredDoc.childNodes)),
                preferredDoc.childNodes
            );
            // Support: Android<4.0
            // Detect silently failing push.apply
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ?

                    // Leverage slice if possible
                    function (target, els) {
                        push_native.apply(target, slice.call(els));
                    } :

                    // Support: IE<9
                    // Otherwise append directly
                    function (target, els) {
                        var j = target.length,
                            i = 0;
                        // Can't trust NodeList.length
                        while ((target[j++] = els[i++])) { }
                        target.length = j - 1;
                    }
            };
        }

        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType,
                // QSA vars
                i, groups, old, nid, newContext, newSelector;

            if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                setDocument(context);
            }

            context = context || document;
            results = results || [];

            if (!selector || typeof selector !== "string") {
                return results;
            }

            if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                return [];
            }

            if (documentIsHTML && !seed) {

                // Shortcuts
                if ((match = rquickExpr.exec(selector))) {
                    // Speed-up: Sizzle("#ID")
                    if ((m = match[1])) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document (jQuery #6963)
                            if (elem && elem.parentNode) {
                                // Handle the case where IE, Opera, and Webkit return items
                                // by name instead of ID
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            } else {
                                return results;
                            }
                        } else {
                            // Context is not a document
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
                                contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results;
                            }
                        }

                        // Speed-up: Sizzle("TAG")
                    } else if (match[2]) {
                        push.apply(results, context.getElementsByTagName(selector));
                        return results;

                        // Speed-up: Sizzle(".CLASS")
                    } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                        push.apply(results, context.getElementsByClassName(m));
                        return results;
                    }
                }

                // QSA path
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    nid = old = expando;
                    newContext = context;
                    newSelector = nodeType === 9 && selector;

                    // qSA works strangely on Element-rooted queries
                    // We can work around this by specifying an extra ID on the root
                    // and working up from there (Thanks to Andrew Dupont for the technique)
                    // IE 8 doesn't work on object elements
                    if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                        groups = tokenize(selector);

                        if ((old = context.getAttribute("id"))) {
                            nid = old.replace(rescape, "\\$&");
                        } else {
                            context.setAttribute("id", nid);
                        }
                        nid = "[id='" + nid + "'] ";

                        i = groups.length;
                        while (i--) {
                            groups[i] = nid + toSelector(groups[i]);
                        }
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                        newSelector = groups.join(",");
                    }

                    if (newSelector) {
                        try {
                            push.apply(results,
                                newContext.querySelectorAll(newSelector)
                            );
                            return results;
                        } catch (qsaError) {
                        } finally {
                            if (!old) {
                                context.removeAttribute("id");
                            }
                        }
                    }
                }
            }

            // All others
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }

        /**
         * Create key-value caches of limited size
         * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
         *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
         *	deleting the oldest entry
         */
        function createCache() {
            var keys = [];

            function cache(key, value) {
                // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                if (keys.push(key + " ") > Expr.cacheLength) {
                    // Only keep the most recent entries
                    delete cache[keys.shift()];
                }
                return (cache[key + " "] = value);
            }
            return cache;
        }

        /**
         * Mark a function for special use by Sizzle
         * @param {Function} fn The function to mark
         */
        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }

        /**
         * Support testing using an element
         * @param {Function} fn Passed the created div and expects a boolean result
         */
        function assert(fn) {
            var div = document.createElement("div");

            try {
                return !!fn(div);
            } catch (e) {
                return false;
            } finally {
                // Remove from its parent by default
                if (div.parentNode) {
                    div.parentNode.removeChild(div);
                }
                // release memory in IE
                div = null;
            }
        }

        /**
         * Adds the same handler for all of the specified attrs
         * @param {String} attrs Pipe-separated list of attributes
         * @param {Function} handler The method that will be applied
         */
        function addHandle(attrs, handler) {
            var arr = attrs.split("|"),
                i = attrs.length;

            while (i--) {
                Expr.attrHandle[arr[i]] = handler;
            }
        }

        /**
         * Checks document order of two siblings
         * @param {Element} a
         * @param {Element} b
         * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
         */
        function siblingCheck(a, b) {
            var cur = b && a,
                diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                    (~b.sourceIndex || MAX_NEGATIVE) -
                    (~a.sourceIndex || MAX_NEGATIVE);

            // Use IE sourceIndex if available on both nodes
            if (diff) {
                return diff;
            }

            // Check if b follows a
            if (cur) {
                while ((cur = cur.nextSibling)) {
                    if (cur === b) {
                        return -1;
                    }
                }
            }

            return a ? 1 : -1;
        }

        /**
         * Returns a function to use in pseudos for input types
         * @param {String} type
         */
        function createInputPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }

        /**
         * Returns a function to use in pseudos for buttons
         * @param {String} type
         */
        function createButtonPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }

        /**
         * Returns a function to use in pseudos for positionals
         * @param {Function} fn
         */
        function createPositionalPseudo(fn) {
            return markFunction(function (argument) {
                argument = +argument;
                return markFunction(function (seed, matches) {
                    var j,
                        matchIndexes = fn([], seed.length, argument),
                        i = matchIndexes.length;

                    // Match elements found at the specified indexes
                    while (i--) {
                        if (seed[(j = matchIndexes[i])]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }

        /**
         * Checks a node for validity as a Sizzle context
         * @param {Element|Object=} context
         * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
         */
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== strundefined && context;
        }

        // Expose support vars for convenience
        support = Sizzle.support = {};

        /**
         * Detects XML nodes
         * @param {Element|Object} elem An element or a document
         * @returns {Boolean} True iff elem is a non-HTML XML node
         */
        isXML = Sizzle.isXML = function (elem) {
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
        setDocument = Sizzle.setDocument = function (node) {
            var hasCompare,
                doc = node ? node.ownerDocument || node : preferredDoc,
                parent = doc.defaultView;

            // If no document and documentElement is available, return
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document;
            }

            // Set our document
            document = doc;
            docElem = doc.documentElement;

            // Support tests
            documentIsHTML = !isXML(doc);

            // Support: IE>8
            // If iframe document is assigned to "document" variable and if iframe has been reloaded,
            // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
            // IE6-8 do not support the defaultView property so parent will be undefined
            if (parent && parent.attachEvent && parent !== parent.top) {
                parent.attachEvent("onbeforeunload", function () {
                    setDocument();
                });
            }

            /* Attributes
            ---------------------------------------------------------------------- */

            // Support: IE<8
            // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
            support.attributes = assert(function (div) {
                div.className = "i";
                return !div.getAttribute("className");
            });

            /* getElement(s)By*
            ---------------------------------------------------------------------- */

            // Check if getElementsByTagName("*") returns only elements
            support.getElementsByTagName = assert(function (div) {
                div.appendChild(doc.createComment(""));
                return !div.getElementsByTagName("*").length;
            });

            // Check if getElementsByClassName can be trusted
            support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function (div) {
                div.innerHTML = "<div class='a'></div><div class='a i'></div>";

                // Support: Safari<4
                // Catch class over-caching
                div.firstChild.className = "i";
                // Support: Opera<10
                // Catch gEBCN failure to find non-leading classes
                return div.getElementsByClassName("i").length === 2;
            });

            // Support: IE<10
            // Check if getElementById returns elements by name
            // The broken getElementById methods don't pick up programatically-set names,
            // so use a roundabout getElementsByName test
            support.getById = assert(function (div) {
                docElem.appendChild(div).id = expando;
                return !doc.getElementsByName || !doc.getElementsByName(expando).length;
            });

            // ID find and filter
            if (support.getById) {
                Expr.find["ID"] = function (id, context) {
                    if (typeof context.getElementById !== strundefined && documentIsHTML) {
                        var m = context.getElementById(id);
                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        return m && m.parentNode ? [m] : [];
                    }
                };
                Expr.filter["ID"] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
            } else {
                // Support: IE6/7
                // getElementById is not reliable as a find shortcut
                delete Expr.find["ID"];

                Expr.filter["ID"] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
            }

            // Tag
            Expr.find["TAG"] = support.getElementsByTagName ?
                function (tag, context) {
                    if (typeof context.getElementsByTagName !== strundefined) {
                        return context.getElementsByTagName(tag);
                    }
                } :
                function (tag, context) {
                    var elem,
                        tmp = [],
                        i = 0,
                        results = context.getElementsByTagName(tag);

                    // Filter out possible comments
                    if (tag === "*") {
                        while ((elem = results[i++])) {
                            if (elem.nodeType === 1) {
                                tmp.push(elem);
                            }
                        }

                        return tmp;
                    }
                    return results;
                };

            // Class
            Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
                if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
                    return context.getElementsByClassName(className);
                }
            };

            /* QSA/matchesSelector
            ---------------------------------------------------------------------- */

            // QSA and matchesSelector support

            // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
            rbuggyMatches = [];

            // qSa(:focus) reports false when true (Chrome 21)
            // We allow this because of a bug in IE8/9 that throws an error
            // whenever `document.activeElement` is accessed on an iframe
            // So, we allow :focus to pass through QSA all the time to avoid the IE error
            // See http://bugs.jquery.com/ticket/13378
            rbuggyQSA = [];

            if ((support.qsa = rnative.test(doc.querySelectorAll))) {
                // Build QSA regex
                // Regex strategy adopted from Diego Perini
                assert(function (div) {
                    // Select is set to empty string on purpose
                    // This is to test IE's treatment of not explicitly
                    // setting a boolean content attribute,
                    // since its presence should be enough
                    // http://bugs.jquery.com/ticket/12359
                    div.innerHTML = "<select><option selected=''></option></select>";

                    // Support: IE8
                    // Boolean attributes and "value" are not treated correctly
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                    }

                    // Webkit/Opera - :checked should return selected option elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    // IE8 throws error here and will not see later tests
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                });

                assert(function (div) {

                    // Support: Opera 10-12/IE8
                    // ^= $= *= and empty values
                    // Should not select anything
                    // Support: Windows 8 Native Apps
                    // The type attribute is restricted during .innerHTML assignment
                    var input = doc.createElement("input");
                    input.setAttribute("type", "hidden");
                    div.appendChild(input).setAttribute("t", "");

                    if (div.querySelectorAll("[t^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                    }

                    // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                    // IE8 throws error here and will not see later tests
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }

                    // Opera 10-11 does not throw on post-comma invalid pseudos
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }

            if ((support.matchesSelector = rnative.test((matches = docElem.webkitMatchesSelector ||
                docElem.mozMatchesSelector ||
                docElem.oMatchesSelector ||
                docElem.msMatchesSelector)))) {

                assert(function (div) {
                    // Check to see if it's possible to do matchesSelector
                    // on a disconnected node (IE 9)
                    support.disconnectedMatch = matches.call(div, "div");

                    // This should fail with an exception
                    // Gecko does not error, returns false instead
                    matches.call(div, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                });
            }

            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

            /* Contains
            ---------------------------------------------------------------------- */
            hasCompare = rnative.test(docElem.compareDocumentPosition);

            // Element contains another
            // Purposefully does not implement inclusive descendent
            // As in, an element does not contain itself
            contains = hasCompare || rnative.test(docElem.contains) ?
                function (a, b) {
                    var adown = a.nodeType === 9 ? a.documentElement : a,
                        bup = b && b.parentNode;
                    return a === bup || !!(bup && bup.nodeType === 1 && (
                        adown.contains ?
                            adown.contains(bup) :
                            a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                    ));
                } :
                function (a, b) {
                    if (b) {
                        while ((b = b.parentNode)) {
                            if (b === a) {
                                return true;
                            }
                        }
                    }
                    return false;
                };

            /* Sorting
            ---------------------------------------------------------------------- */

            // Document order sorting
            sortOrder = hasCompare ?
            function (a, b) {

                // Flag for duplicate removal
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }

                // Sort on method existence if only one input has compareDocumentPosition
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                if (compare) {
                    return compare;
                }

                // Calculate position if both inputs belong to the same document
                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                    a.compareDocumentPosition(b) :

                    // Otherwise we know they are disconnected
                    1;

                // Disconnected nodes
                if (compare & 1 ||
                    (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                    // Choose the first element that is related to our preferred document
                    if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                        return -1;
                    }
                    if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                        return 1;
                    }

                    // Maintain original order
                    return sortInput ?
                        (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
                        0;
                }

                return compare & 4 ? -1 : 1;
            } :
            function (a, b) {
                // Exit early if the nodes are identical
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }

                var cur,
                    i = 0,
                    aup = a.parentNode,
                    bup = b.parentNode,
                    ap = [a],
                    bp = [b];

                // Parentless nodes are either documents or disconnected
                if (!aup || !bup) {
                    return a === doc ? -1 :
                        b === doc ? 1 :
                        aup ? -1 :
                        bup ? 1 :
                        sortInput ?
                        (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
                        0;

                    // If the nodes are siblings, we can do a quick check
                } else if (aup === bup) {
                    return siblingCheck(a, b);
                }

                // Otherwise we need full lists of their ancestors for comparison
                cur = a;
                while ((cur = cur.parentNode)) {
                    ap.unshift(cur);
                }
                cur = b;
                while ((cur = cur.parentNode)) {
                    bp.unshift(cur);
                }

                // Walk down the tree looking for a discrepancy
                while (ap[i] === bp[i]) {
                    i++;
                }

                return i ?
                    // Do a sibling check if the nodes have a common ancestor
                    siblingCheck(ap[i], bp[i]) :

                    // Otherwise nodes in our document sort first
                    ap[i] === preferredDoc ? -1 :
                    bp[i] === preferredDoc ? 1 :
                    0;
            };

            return doc;
        };

        Sizzle.matches = function (expr, elements) {
            return Sizzle(expr, null, null, elements);
        };

        Sizzle.matchesSelector = function (elem, expr) {
            // Set document vars if needed
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }

            // Make sure that attribute selectors are quoted
            expr = expr.replace(rattributeQuotes, "='$1']");

            if (support.matchesSelector && documentIsHTML &&
                (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                (!rbuggyQSA || !rbuggyQSA.test(expr))) {

                try {
                    var ret = matches.call(elem, expr);

                    // IE 9's matchesSelector returns false on disconnected nodes
                    if (ret || support.disconnectedMatch ||
                        // As well, disconnected nodes are said to be in a document
                        // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11) {
                        return ret;
                    }
                } catch (e) { }
            }

            return Sizzle(expr, document, null, [elem]).length > 0;
        };

        Sizzle.contains = function (context, elem) {
            // Set document vars if needed
            if ((context.ownerDocument || context) !== document) {
                setDocument(context);
            }
            return contains(context, elem);
        };

        Sizzle.attr = function (elem, name) {
            // Set document vars if needed
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }

            var fn = Expr.attrHandle[name.toLowerCase()],
                // Don't get fooled by Object.prototype properties (jQuery #13807)
                val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                    fn(elem, name, !documentIsHTML) :
                    undefined;

            return val !== undefined ?
                val :
                support.attributes || !documentIsHTML ?
                    elem.getAttribute(name) :
                    (val = elem.getAttributeNode(name)) && val.specified ?
                        val.value :
                        null;
        };

        Sizzle.error = function (msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };

        /**
         * Document sorting and removing duplicates
         * @param {ArrayLike} results
         */
        Sizzle.uniqueSort = function (results) {
            var elem,
                duplicates = [],
                j = 0,
                i = 0;

            // Unless we *know* we can detect duplicates, assume their presence
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);

            if (hasDuplicate) {
                while ((elem = results[i++])) {
                    if (elem === results[i]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }

            // Clear input after sorting to release objects
            // See https://github.com/jquery/sizzle/pull/225
            sortInput = null;

            return results;
        };

        /**
         * Utility function for retrieving the text value of an array of DOM nodes
         * @param {Array|Element} elem
         */
        getText = Sizzle.getText = function (elem) {
            var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;

            if (!nodeType) {
                // If no nodeType, this is expected to be an array
                while ((node = elem[i++])) {
                    // Do not traverse comment nodes
                    ret += getText(node);
                }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                // Use textContent for elements
                // innerText usage removed for consistency of new lines (jQuery #11153)
                if (typeof elem.textContent === "string") {
                    return elem.textContent;
                } else {
                    // Traverse its children
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        ret += getText(elem);
                    }
                }
            } else if (nodeType === 3 || nodeType === 4) {
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

            attrHandle: {},

            find: {},

            relative: {
                ">": { dir: "parentNode", first: true },
                " ": { dir: "parentNode" },
                "+": { dir: "previousSibling", first: true },
                "~": { dir: "previousSibling" }
            },

            preFilter: {
                "ATTR": function (match) {
                    match[1] = match[1].replace(runescape, funescape);

                    // Move the given value to match[3] whether quoted or unquoted
                    match[3] = (match[4] || match[5] || "").replace(runescape, funescape);

                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }

                    return match.slice(0, 4);
                },

                "CHILD": function (match) {
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

                    if (match[1].slice(0, 3) === "nth") {
                        // nth-* requires argument
                        if (!match[3]) {
                            Sizzle.error(match[0]);
                        }

                        // numeric x and y parameters for Expr.filter.CHILD
                        // remember that false/true cast respectively to 0/1
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +((match[7] + match[8]) || match[3] === "odd");

                        // other types prohibit arguments
                    } else if (match[3]) {
                        Sizzle.error(match[0]);
                    }

                    return match;
                },

                "PSEUDO": function (match) {
                    var excess,
                        unquoted = !match[5] && match[2];

                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }

                    // Accept quoted arguments as-is
                    if (match[3] && match[4] !== undefined) {
                        match[2] = match[4];

                        // Strip excess characters from unquoted arguments
                    } else if (unquoted && rpseudo.test(unquoted) &&
                        // Get excess from tokenize (recursively)
                        (excess = tokenize(unquoted, true)) &&
                        // advance to the next closing parenthesis
                        (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                        // excess is a negative index
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }

                    // Return only captures needed by the pseudo filter method (type and argument)
                    return match.slice(0, 3);
                }
            },

            filter: {

                "TAG": function (nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === "*" ?
                        function () { return true; } :
                        function (elem) {
                            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                        };
                },

                "CLASS": function (className) {
                    var pattern = classCache[className + " "];

                    return pattern ||
                        (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                        classCache(className, function (elem) {
                            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                        });
                },

                "ATTR": function (name, operator, check) {
                    return function (elem) {
                        var result = Sizzle.attr(elem, name);

                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }

                        result += "";

                        return operator === "=" ? result === check :
                            operator === "!=" ? result !== check :
                            operator === "^=" ? check && result.indexOf(check) === 0 :
                            operator === "*=" ? check && result.indexOf(check) > -1 :
                            operator === "$=" ? check && result.slice(-check.length) === check :
                            operator === "~=" ? (" " + result + " ").indexOf(check) > -1 :
                            operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                            false;
                    };
                },

                "CHILD": function (type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth",
                        forward = type.slice(-4) !== "last",
                        ofType = what === "of-type";

                    return first === 1 && last === 0 ?

                        // Shortcut for :nth-*(n)
                        function (elem) {
                            return !!elem.parentNode;
                        } :

                        function (elem, context, xml) {
                            var cache, outerCache, node, diff, nodeIndex, start,
                                dir = simple !== forward ? "nextSibling" : "previousSibling",
                                parent = elem.parentNode,
                                name = ofType && elem.nodeName.toLowerCase(),
                                useCache = !xml && !ofType;

                            if (parent) {

                                // :(first|last|only)-(child|of-type)
                                if (simple) {
                                    while (dir) {
                                        node = elem;
                                        while ((node = node[dir])) {
                                            if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                                return false;
                                            }
                                        }
                                        // Reverse direction for :only-* (if we haven't yet done so)
                                        start = dir = type === "only" && !start && "nextSibling";
                                    }
                                    return true;
                                }

                                start = [forward ? parent.firstChild : parent.lastChild];

                                // non-xml :nth-child(...) stores cache data on `parent`
                                if (forward && useCache) {
                                    // Seek `elem` from a previously-cached index
                                    outerCache = parent[expando] || (parent[expando] = {});
                                    cache = outerCache[type] || [];
                                    nodeIndex = cache[0] === dirruns && cache[1];
                                    diff = cache[0] === dirruns && cache[2];
                                    node = nodeIndex && parent.childNodes[nodeIndex];

                                    while ((node = ++nodeIndex && node && node[dir] ||

                                        // Fallback to seeking `elem` from the start
                                        (diff = nodeIndex = 0) || start.pop())) {

                                        // When found, cache indexes on `parent` and break
                                        if (node.nodeType === 1 && ++diff && node === elem) {
                                            outerCache[type] = [dirruns, nodeIndex, diff];
                                            break;
                                        }
                                    }

                                    // Use previously-cached element index if available
                                } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                    diff = cache[1];

                                    // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                } else {
                                    // Use the same loop as above to seek `elem` from the start
                                    while ((node = ++nodeIndex && node && node[dir] ||
                                        (diff = nodeIndex = 0) || start.pop())) {

                                        if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                            // Cache the index of each encountered element
                                            if (useCache) {
                                                (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                                            }

                                            if (node === elem) {
                                                break;
                                            }
                                        }
                                    }
                                }

                                // Incorporate the offset, then check against cycle size
                                diff -= last;
                                return diff === first || (diff % first === 0 && diff / first >= 0);
                            }
                        };
                },

                "PSEUDO": function (pseudo, argument) {
                    // pseudo-class names are case-insensitive
                    // http://www.w3.org/TR/selectors/#pseudo-classes
                    // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                    // Remember that setFilters inherits from pseudos
                    var args,
                        fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                            Sizzle.error("unsupported pseudo: " + pseudo);

                    // The user may use createPseudo to indicate that
                    // arguments are needed to create the filter function
                    // just as Sizzle does
                    if (fn[expando]) {
                        return fn(argument);
                    }

                    // But maintain support for old signatures
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                            markFunction(function (seed, matches) {
                                var idx,
                                    matched = fn(seed, argument),
                                    i = matched.length;
                                while (i--) {
                                    idx = indexOf.call(seed, matched[i]);
                                    seed[idx] = !(matches[idx] = matched[i]);
                                }
                            }) :
                            function (elem) {
                                return fn(elem, 0, args);
                            };
                    }

                    return fn;
                }
            },

            pseudos: {
                // Potentially complex pseudos
                "not": markFunction(function (selector) {
                    // Trim the selector passed to compile
                    // to avoid treating leading and trailing
                    // spaces as combinators
                    var input = [],
                        results = [],
                        matcher = compile(selector.replace(rtrim, "$1"));

                    return matcher[expando] ?
                        markFunction(function (seed, matches, context, xml) {
                            var elem,
                                unmatched = matcher(seed, null, xml, []),
                                i = seed.length;

                            // Match elements unmatched by `matcher`
                            while (i--) {
                                if ((elem = unmatched[i])) {
                                    seed[i] = !(matches[i] = elem);
                                }
                            }
                        }) :
                        function (elem, context, xml) {
                            input[0] = elem;
                            matcher(input, null, xml, results);
                            return !results.pop();
                        };
                }),

                "has": markFunction(function (selector) {
                    return function (elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),

                "contains": markFunction(function (text) {
                    return function (elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),

                // "Whether an element is represented by a :lang() selector
                // is based solely on the element's language value
                // being equal to the identifier C,
                // or beginning with the identifier C immediately followed by "-".
                // The matching of C against the element's language value is performed case-insensitively.
                // The identifier C does not have to be a valid language name."
                // http://www.w3.org/TR/selectors/#lang-pseudo
                "lang": markFunction(function (lang) {
                    // lang value must be a valid identifier
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function (elem) {
                        var elemLang;
                        do {
                            if ((elemLang = documentIsHTML ?
                                elem.lang :
                                elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false;
                    };
                }),

                // Miscellaneous
                "target": function (elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },

                "root": function (elem) {
                    return elem === docElem;
                },

                "focus": function (elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },

                // Boolean properties
                "enabled": function (elem) {
                    return elem.disabled === false;
                },

                "disabled": function (elem) {
                    return elem.disabled === true;
                },

                "checked": function (elem) {
                    // In CSS3, :checked should return both checked and selected elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                },

                "selected": function (elem) {
                    // Accessing this property makes selected-by-default
                    // options in Safari work properly
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }

                    return elem.selected === true;
                },

                // Contents
                "empty": function (elem) {
                    // http://www.w3.org/TR/selectors/#empty-pseudo
                    // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                    //   but not by others (comment: 8; processing instruction: 7; etc.)
                    // nodeType < 6 works because attributes (2) do not appear as children
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeType < 6) {
                            return false;
                        }
                    }
                    return true;
                },

                "parent": function (elem) {
                    return !Expr.pseudos["empty"](elem);
                },

                // Element/input types
                "header": function (elem) {
                    return rheader.test(elem.nodeName);
                },

                "input": function (elem) {
                    return rinputs.test(elem.nodeName);
                },

                "button": function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },

                "text": function (elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" &&
                        elem.type === "text" &&

                        // Support: IE<8
                        // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                        ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                },

                // Position-in-collection
                "first": createPositionalPseudo(function () {
                    return [0];
                }),

                "last": createPositionalPseudo(function (matchIndexes, length) {
                    return [length - 1];
                }),

                "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument];
                }),

                "even": createPositionalPseudo(function (matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),

                "odd": createPositionalPseudo(function (matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),

                "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; --i >= 0;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),

                "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };

        Expr.pseudos["nth"] = Expr.pseudos["eq"];

        // Add button/input type pseudos
        for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
            Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in { submit: true, reset: true }) {
            Expr.pseudos[i] = createButtonPseudo(i);
        }

        // Easy API for creating new setFilters
        function setFilters() { }
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();

        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type,
                soFar, groups, preFilters,
                cached = tokenCache[selector + " "];

            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }

            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;

            while (soFar) {

                // Comma and first run
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        // Don't consume trailing commas as valid
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push((tokens = []));
                }

                matched = false;

                // Combinators
                if ((match = rcombinators.exec(soFar))) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        // Cast descendant combinators to space
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length);
                }

                // Filters
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                        (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length);
                    }
                }

                if (!matched) {
                    break;
                }
            }

            // Return the length of the invalid excess
            // if we're just parsing
            // Otherwise, throw an error or return tokens
            return parseOnly ?
                soFar.length :
                soFar ?
                    Sizzle.error(selector) :
                    // Cache the tokens
                    tokenCache(selector, groups).slice(0);
        }

        function toSelector(tokens) {
            var i = 0,
                len = tokens.length,
                selector = "";
            for (; i < len; i++) {
                selector += tokens[i].value;
            }
            return selector;
        }

        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
                checkNonElements = base && dir === "parentNode",
                doneName = done++;

            return combinator.first ?
                // Check against closest ancestor/preceding element
                function (elem, context, xml) {
                    while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            return matcher(elem, context, xml);
                        }
                    }
                } :

                // Check against all ancestor/preceding elements
                function (elem, context, xml) {
                    var data, cache, outerCache,
                        dirkey = dirruns + " " + doneName;

                    // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                    if (xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                if (matcher(elem, context, xml)) {
                                    return true;
                                }
                            }
                        }
                    } else {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                outerCache = elem[expando] || (elem[expando] = {});
                                if ((cache = outerCache[dir]) && cache[0] === dirkey) {
                                    if ((data = cache[1]) === true || data === cachedruns) {
                                        return data === true;
                                    }
                                } else {
                                    cache = outerCache[dir] = [dirkey];
                                    cache[1] = matcher(elem, context, xml) || cachedruns;
                                    if (cache[1] === true) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                };
        }

        function elementMatcher(matchers) {
            return matchers.length > 1 ?
                function (elem, context, xml) {
                    var i = matchers.length;
                    while (i--) {
                        if (!matchers[i](elem, context, xml)) {
                            return false;
                        }
                    }
                    return true;
                } :
                matchers[0];
        }

        function condense(unmatched, map, filter, context, xml) {
            var elem,
                newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;

            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }

            return newUnmatched;
        }

        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function (seed, results, context, xml) {
                var temp, i, elem,
                    preMap = [],
                    postMap = [],
                    preexisting = results.length,

                    // Get initial elements from seed or context
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

                    // Prefilter to get matcher input, preserving a map for seed-results synchronization
                    matcherIn = preFilter && (seed || !selector) ?
                        condense(elems, preMap, preFilter, context, xml) :
                        elems,

                    matcherOut = matcher ?
                        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                        postFinder || (seed ? preFilter : preexisting || postFilter) ?

                            // ...intermediate processing is necessary
                            [] :

                            // ...otherwise use results directly
                    results :
                        matcherIn;

                // Find primary matches
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }

                // Apply postFilter
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);

                    // Un-match failing elements by moving them back to matcherIn
                    i = temp.length;
                    while (i--) {
                        if ((elem = temp[i])) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                        }
                    }
                }

                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            // Get the final matcherOut by condensing this intermediate into postFinder contexts
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i])) {
                                    // Restore matcherIn since elem is not yet a final match
                                    temp.push((matcherIn[i] = elem));
                                }
                            }
                            postFinder(null, (matcherOut = []), temp, xml);
                        }

                        // Move matched elements from seed to results to keep them synchronized
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) &&
                                (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {

                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }

                    // Add elements to results, through postFinder if defined
                } else {
                    matcherOut = condense(
                        matcherOut === results ?
                            matcherOut.splice(preexisting, matcherOut.length) :
                            matcherOut
                    );
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }

        function matcherFromTokens(tokens) {
            var checkContext, matcher, j,
                len = tokens.length,
                leadingRelative = Expr.relative[tokens[0].type],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1 : 0,

                // The foundational matcher ensures that elements are reachable from top-level context(s)
                matchContext = addCombinator(function (elem) {
                    return elem === checkContext;
                }, implicitRelative, true),
                matchAnyContext = addCombinator(function (elem) {
                    return indexOf.call(checkContext, elem) > -1;
                }, implicitRelative, true),
                matchers = [function (elem, context, xml) {
                    return (!leadingRelative && (xml || context !== outermostContext)) || (
                        (checkContext = context).nodeType ?
                            matchContext(elem, context, xml) :
                            matchAnyContext(elem, context, xml));
                }];

            for (; i < len; i++) {
                if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

                    // Return special upon seeing a positional matcher
                    if (matcher[expando]) {
                        // Find the next relative operator (if any) for proper handling
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        return setMatcher(
                            i > 1 && elementMatcher(matchers),
                            i > 1 && toSelector(
                                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })
                            ).replace(rtrim, "$1"),
                            matcher,
                            i < j && matcherFromTokens(tokens.slice(i, j)),
                            j < len && matcherFromTokens((tokens = tokens.slice(j))),
                            j < len && toSelector(tokens)
                        );
                    }
                    matchers.push(matcher);
                }
            }

            return elementMatcher(matchers);
        }

        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            // A counter to specify which element is currently being matched
            var matcherCachedRuns = 0,
                bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function (seed, context, xml, results, outermost) {
                    var elem, j, matcher,
                        matchedCount = 0,
                        i = "0",
                        unmatched = seed && [],
                        setMatched = [],
                        contextBackup = outermostContext,
                        // We must always have either seed elements or outermost context
                        elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                        // Use integer dirruns iff this is the outermost matcher
                        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                        len = elems.length;

                    if (outermost) {
                        outermostContext = context !== document && context;
                        cachedruns = matcherCachedRuns;
                    }

                    // Add elements passing elementMatchers directly to results
                    // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                    // Support: IE<9, Safari
                    // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                    for (; i !== len && (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            while ((matcher = elementMatchers[j++])) {
                                if (matcher(elem, context, xml)) {
                                    results.push(elem);
                                    break;
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                                cachedruns = ++matcherCachedRuns;
                            }
                        }

                        // Track unmatched elements for set filters
                        if (bySet) {
                            // They will have gone through all possible matchers
                            if ((elem = !matcher && elem)) {
                                matchedCount--;
                            }

                            // Lengthen the array for every element, matched or not
                            if (seed) {
                                unmatched.push(elem);
                            }
                        }
                    }

                    // Apply set filters to unmatched elements
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while ((matcher = setMatchers[j++])) {
                            matcher(unmatched, setMatched, context, xml);
                        }

                        if (seed) {
                            // Reintegrate element matches to eliminate the need for sorting
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results);
                                    }
                                }
                            }

                            // Discard index placeholder values to get only actual matches
                            setMatched = condense(setMatched);
                        }

                        // Add matches to results
                        push.apply(results, setMatched);

                        // Seedless set matches succeeding multiple successful matchers stipulate sorting
                        if (outermost && !seed && setMatched.length > 0 &&
                            (matchedCount + setMatchers.length) > 1) {

                            Sizzle.uniqueSort(results);
                        }
                    }

                    // Override manipulation of globals by nested matchers
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }

                    return unmatched;
                };

            return bySet ?
                markFunction(superMatcher) :
                superMatcher;
        }

        compile = Sizzle.compile = function (selector, group /* Internal Use Only */) {
            var i,
                setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[selector + " "];

            if (!cached) {
                // Generate a function of recursive functions that can be used to check each element
                if (!group) {
                    group = tokenize(selector);
                }
                i = group.length;
                while (i--) {
                    cached = matcherFromTokens(group[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }

                // Cache the compiled function
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
            }
            return cached;
        };

        function multipleContexts(selector, contexts, results) {
            var i = 0,
                len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }

        function select(selector, context, results, seed) {
            var i, tokens, token, type, find,
                match = tokenize(selector);

            if (!seed) {
                // Try to minimize operations if there is only one group
                if (match.length === 1) {

                    // Take a shortcut and set the context if the root selector is an ID
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                            support.getById && context.nodeType === 9 && documentIsHTML &&
                            Expr.relative[tokens[1].type]) {

                        context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                        if (!context) {
                            return results;
                        }
                        selector = selector.slice(tokens.shift().value.length);
                    }

                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {
                            // Search, expanding context for leading sibling combinators
                            if ((seed = find(
                                token.matches[0].replace(runescape, funescape),
                                rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                            ))) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
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
            compile(selector, match)(
                seed,
                context,
                !documentIsHTML,
                results,
                rsibling.test(selector) && testContext(context.parentNode) || context
            );
            return results;
        }

        // One-time assignments

        // Sort stability
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

        // Support: Chrome<14
        // Always assume duplicates if they aren't passed to the comparison function
        support.detectDuplicates = !!hasDuplicate;

        // Initialize against the default document
        setDocument();

        // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
        // Detached nodes confoundingly follow *each other*
        support.sortDetached = assert(function (div1) {
            // Should return 1, but returns 4 (following)
            return div1.compareDocumentPosition(document.createElement("div")) & 1;
        });

        // Support: IE<8
        // Prevent attribute/property "interpolation"
        // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
        if (!assert(function (div) {
            div.innerHTML = "<a href='#'></a>";
            return div.firstChild.getAttribute("href") === "#";
        })) {
            addHandle("type|href|height|width", function (elem, name, isXML) {
                if (!isXML) {
                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                }
            });
        }

        // Support: IE<9
        // Use defaultValue in place of getAttribute("value")
        if (!support.attributes || !assert(function (div) {
            div.innerHTML = "<input/>";
            div.firstChild.setAttribute("value", "");
            return div.firstChild.getAttribute("value") === "";
        })) {
            addHandle("value", function (elem, name, isXML) {
                if (!isXML && elem.nodeName.toLowerCase() === "input") {
                    return elem.defaultValue;
                }
            });
        }

        // Support: IE<9
        // Use getAttributeNode to fetch booleans when getAttribute lies
        if (!assert(function (div) {
            return div.getAttribute("disabled") == null;
        })) {
            addHandle(booleans, function (elem, name, isXML) {
                var val;
                if (!isXML) {
                    return elem[name] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                        null;
                }
            });
        }

        // EXPOSE
        if (typeof define === "function" && define.amd) {
            define(function () { return Sizzle; });
            // Sizzle requires that there be a global window in Common-JS like environments
        } else if (typeof module !== "undefined" && module.exports) {
            module.exports = Sizzle;
        } else {
            window.Sizzle = Sizzle;
        }
        // EXPOSE

    })(window);
}



/*!
 * Licensed Materials - Property of IBM J2 SDK
 * © Copyright IBM Corp. 2013
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 * @version 3.0.1.1068
 * @flags w3c,NDEBUG
 */
var TLT = (function () { function n(z, t, u, A) { var B = null, y = TLT.getService("queue"), x = TLT.getModule("replay"), v = null, w = window.location, C = w.origin || null; if (!t || typeof t !== "string") { return } if (!u || typeof u !== "string") { u = "" } if (!C) { C = (w.protocol || "") + "//" + (w.host || "") } B = { type: 2, screenview: { type: z, name: t, url: w.pathname, host: C, referrer: u } }; if (z === "LOAD") { v = { type: "screenview_load" } } else { if (z === "UNLOAD") { v = { type: "screenview_unload" } } } if (v && x) { x.onevent(v) } if (z === "LOAD" || z === "UNLOAD") { y.post("", B, "DEFAULT") } } var q = (new Date()).getTime(), r = {}, a = {}, d = false, e = null, k = (function () { var u, w = []; function v(B) { var A = p.getService("browser"), x = p.getCoreConfig().framesBlacklist, z, y; u = u || []; B = B || null; if (typeof x !== "undefined" && x.length > 0) { for (y = 0; y < x.length; y += 1) { z = A.queryAll(x[y], B); if (z && z.length > 0) { u = u.concat(z) } } w = w.concat(A.queryAll("iframe", B)) } } function t(x) { if (p.utils.indexOf(w, x) < 0) { v(x.ownerDocument) } return p.utils.indexOf(u, x) > -1 } t.clearCache = function () { u = null }; return t }()), l = null, f = { config: ["getConfig", "updateConfig", "getCoreConfig", "updateCoreConfig", "getModuleConfig", "updateModuleConfig", "getServiceConfig", "updateServiceConfig"], queue: ["post", "setAutoFlush", "flushAll"], browserBase: ["processDOMEvent"] }, o = (function () { var t = {}; return { normalizeModuleEvents: function (x, v, A, u) { var z = false, w = false, y = p.getService("browser"); A = A || p._getLocalTop(); u = u || A.document; t[x] = { loadFired: false, pageHideFired: false }; p.utils.forEach(v, function (B) { switch (B.name) { case "load": z = true; v.push(p.utils.mixin(p.utils.mixin({}, B), { name: "pageshow" })); break; case "unload": w = true; v.push(p.utils.mixin(p.utils.mixin({}, B), { name: "pagehide" })); v.push(p.utils.mixin(p.utils.mixin({}, B), { name: "beforeunload" })); break; case "change": if (p.utils.isLegacyIE && p.getFlavor() === "w3c") { v.push(p.utils.mixin(p.utils.mixin({}, B), { name: "propertychange" })) } break } }); if (!z && !w) { delete t[x]; return } t[x].silentLoad = !z; t[x].silentUnload = !w; if (!z) { v.push({ name: "load", target: A }) } if (!w) { v.push({ name: "unload", target: A }) } }, canPublish: function (u, w) { var v; if (t.hasOwnProperty(u) === false) { return true } v = t[u]; switch (w.type) { case "load": v.pageHideFired = false; v.loadFired = true; return !v.silentLoad; case "pageshow": v.pageHideFired = false; w.type = "load"; return !v.loadFired && !v.silentLoad; case "pagehide": w.type = "unload"; v.loadFired = false; v.pageHideFired = true; return !v.silentUnload; case "unload": case "beforeunload": w.type = "unload"; v.loadFired = false; return !v.pageHideFired && !v.silentUnload } return true }, isUnload: function (u) { return typeof u === "object" ? (u.type === "unload" || u.type === "beforeunload" || u.type === "pagehide") : false } } }()), b = {}, g = function () { }, i = null, j = true, m = null, h = false, s = false, c = navigator.userAgent.indexOf("iPhone") > -1 || navigator.userAgent.indexOf("iPod") > -1 || navigator.userAgent.indexOf("iPad") > -1, p = { getStartTime: function () { return q }, init: function (u, v) { var t; i = v; if (!j) { throw "init must only be called once!" } j = false; t = function (w) { w = w || window.event || {}; if (document.addEventListener || w.type === "load" || document.readyState === "complete") { if (document.removeEventListener) { document.removeEventListener("DOMContentLoaded", t, false); window.removeEventListener("load", t, false) } else { document.detachEvent("onreadystatechange", t); window.detachEvent("onload", t) } g(u, v) } }; if (document.readyState === "complete") { setTimeout(t) } else { if (document.addEventListener) { document.addEventListener("DOMContentLoaded", t, false); window.addEventListener("load", t, false) } else { document.attachEvent("onreadystatechange", t); window.attachEvent("onload", t) } } }, isInitialized: function () { return d }, getState: function () { return e }, destroy: function (u) { var t = "", w = "", z = null, A = null, x = null, v = null, B = false; if (j) { return false } this.stopAll(); if (!u) { v = this.getService("browser"); for (t in b) { if (b.hasOwnProperty(t) && v !== null) { w = t.split("|")[0]; z = b[t].target; B = b[t].delegateTarget || undefined; v.unsubscribe(w, z, this._publishEvent, B) } } } for (A in a) { if (a.hasOwnProperty(A)) { x = a[A].instance; if (x && typeof x.destroy === "function") { x.destroy() } a[A].instance = null } } k.clearCache(); b = {}; d = false; j = true; e = "destroyed"; if (typeof i === "function") { try { i("destroyed") } catch (y) { } } }, _updateModules: function (w) { var v = this.getCoreConfig(), u = this.getService("browser"), y = null, t = null; if (v && u && v.modules) { try { for (t in v.modules) { if (v.modules.hasOwnProperty(t)) { y = v.modules[t]; if (r.hasOwnProperty(t)) { if (y.enabled === false) { this.stop(t) } else { this.start(t) } if (y.events && u !== null) { this._registerModuleEvents(t, y.events, w) } } else { if (u.loadScript) { u.loadScript(v.moduleBase + t + ".js") } } } } this._registerModuleEvents.clearCache() } catch (x) { p.destroy(); return false } } else { return false } return true }, rebind: function (t) { p._updateModules(t) }, getSessionData: function () { var x = null, u = null, v, w, t = p.getCoreConfig(); if (!t || !t.sessionDataEnabled) { return null } u = t.sessionData || {}; v = u.sessionQueryName; if (v) { w = p.utils.getQueryStringValue(v, u.sessionQueryDelim) } else { v = u.sessionCookieName || "TLTSID"; w = p.utils.getCookieValue(v) } if (v && w) { x = x || {}; x.tltSCN = v; x.tltSCV = w; x.tltSCVNeedsHashing = !!u.sessionValueNeedsHashing } return x }, logCustomEvent: function (w, u) { var v = null, t = this.getService("queue"); if (!w || typeof w !== "string") { w = "CUSTOM" } u = u || {}; v = { type: 5, customEvent: { name: w, data: u } }; t.post("", v, "DEFAULT") }, logExceptionEvent: function (x, v, u) { var w = null, t = this.getService("queue"); if (!x || typeof x !== "string") { return } v = v || ""; u = u || ""; w = { type: 6, exception: { description: x, url: v, line: u } }; t.post("", w, "DEFAULT") }, logScreenviewLoad: function (v, u, t) { n("LOAD", v, u, t) }, logScreenviewUnload: function (t) { n("UNLOAD", t) }, _hasSameOrigin: function (t) { try { return t.document.location.host === document.location.host && t.document.location.protocol === document.location.protocol } catch (u) { } return false }, _registerModuleEvents: (function () { var v, w = function (A, z, y) { if (A === "window") { return z } if (A === "document") { return y } return A }; function x(y, E, H) { var G = p.getService("browserBase"), B = p.getService("browser"), F = p.utils.getDocument(H), A = p._getLocalTop(), z = p.utils.isIFrameDescendant(H), D, C; H = H || F; o.normalizeModuleEvents(y, E, A, F); if (z) { D = G.ElementData.prototype.examineID(H).id; if (typeof D === "string") { D = D.slice(0, D.length - 1); for (C in b) { if (b.hasOwnProperty(C) && C.indexOf(D) !== -1) { delete b[C] } } } } p.utils.forEach(E, function (I) { var L = w(I.target, A, F) || F, K = w(I.delegateTarget, A, F), J = ""; if (I.recurseFrames !== true && z) { return } if (typeof L === "string") { if (I.delegateTarget && p.getFlavor() === "jQuery") { J = p._buildToken4delegateTarget(I.name, L, I.delegateTarget); if (!b.hasOwnProperty(J)) { b[J] = [y]; b[J].target = L; b[J].delegateTarget = K; B.subscribe(I.name, L, p._publishEvent, K, J) } else { b[J].push(y) } } else { p.utils.forEach(B.queryAll(L, H), function (M) { var N = v.get(M); if (!N) { N = G.ElementData.prototype.examineID(M); v.set(M, N) } J = I.name + "|" + N.id + N.type; if (p.utils.indexOf(b[J], y) !== -1) { return } b[J] = b[J] || []; b[J].push(y); b[J].target = M; B.subscribe(I.name, M, p._publishEvent) }) } } else { J = p._buildToken4bubbleTarget(I.name, L, typeof I.target === "undefined"); if (!b.hasOwnProperty(J)) { b[J] = [y]; B.subscribe(I.name, L, p._publishEvent) } else { if (p.utils.indexOf(b[J], y) === -1) { b[J].push(y) } } } if (J !== "") { if (typeof L !== "string") { b[J].target = L } } }) } function u(y) { var z = p.utils.getIFrameWindow(y); return z && p._hasSameOrigin(z) && z.document && z.document.readyState === "complete" } function t(z, F, G) { G = G || p._getLocalTop().document; v = v || new p.utils.WeakMap(); x(z, F, G); if (z !== "performance") { var D = null, y = null, A = p.getService("browser"), E = A.queryAll("iframe, frame", G), C, B; for (C = 0, B = E.length; C < B; C += 1) { D = E[C]; if (k(D)) { continue } if (u(D)) { y = p.utils.getIFrameWindow(D); p._registerModuleEvents(z, F, y.document) } (function (J, H, K) { var I = null, L = { moduleName: J, moduleEvents: H, hIFrame: K, _registerModuleEventsDelayed: function () { var M = null; if (!k(K)) { M = p.utils.getIFrameWindow(K); if (p._hasSameOrigin(M)) { p._registerModuleEvents(J, H, M.document) } } } }; p.utils.addEventListener(K, "load", function () { L._registerModuleEventsDelayed() }); if (p.utils.isLegacyIE) { I = p.utils.getIFrameWindow(K); if (I && I.document) { p.utils.addEventListener(I.document, "readystatechange", function () { L._registerModuleEventsDelayed() }) } } }(z, F, D)) } } } t.clearCache = function () { if (v) { v.clear(); v = null } }; return t }()), _buildToken4currentTarget: function (u) { var v = u.nativeEvent ? u.nativeEvent.currentTarget : null, t = v ? this.getService("browserBase").ElementData.prototype.examineID(v) : { id: u.target.id, type: u.target.idType }; return u.type + "|" + t.id + t.type }, _buildToken4delegateTarget: function (t, v, u) { return t + "|" + v + "|" + u }, _buildToken4bubbleTarget: function (u, B, A, F) { var y = p._getLocalTop(), t, v = p.getService("browser"), G = function (H) { var I = null; if (p._hasSameOrigin(t.parent)) { p.utils.forEach(v.queryAll("iframe, frame", t.parent.document), function (J) { var K = null; if (!k(J)) { K = p.utils.getIFrameWindow(J); if (p._hasSameOrigin(K) && K.document === H) { I = J } } }) } return I }, C = p.utils.getDocument(B), E = this.getService("browserBase"), D = null, x, w = u, z; if (C) { t = C.defaultView || C.parentWindow } if (B === window || B === window.window) { w += "|null-2|window" } else { if (A && t && p._hasSameOrigin(t.parent) && typeof C !== "undefined" && y.document !== C) { D = G(C); if (D) { x = E.ElementData.prototype.examineID(D); w += "|" + x.xPath + "-2" } } else { if (F && F !== document && p.getFlavor() === "jQuery") { w += "|null-2|" + p.utils.getTagName(B) + "|" + p.utils.getTagName(F) } else { w += "|null-2|document" } } } return w }, _reinitConfig: function () { p._updateModules() }, _handleTouchStart: function (v) { var u, t; if (c) { return false } if (m === null) { m = v; return true } for (u = 0; u < m.nativeEvent.touches.length; u += 1) { for (t = 0; t < v.nativeEvent.touches.length; t += 1) { if (m.nativeEvent.touches[u] === v.nativeEvent.touches[t]) { return true } } } p._prepNonIosTouchEnd(); m = v; return true }, _handleTouchMove: function (t) { if (c) { return } m = t }, _handleTouchScroll: function (t) { if (c) { return false } if (m !== null && t.type === "scroll") { m.target.position.x = t.target.position.x; m.target.position.y = t.target.position.y; h = true } return true }, _prepNonIosTouchEnd: function () { var t = false; if (m !== null) { m.type = "touchend"; m.nativeEvent.type = "touchend"; p._publishEvent(m); if (h) { m.type = "scroll"; m.nativeEvent.type = "scroll"; s = true; p._publishEvent(m) } t = true } m = null; h = false; s = false; return t }, _publishEvent: function (t) { var u = null, x = null, y = (t.delegateTarget && t.data) ? t.data : p._buildToken4currentTarget(t), z = null, A, B, C, w = null, D = false, E = false, v = p.getService("browser"), F = t.delegateTarget || null; if ((t.type === "load" || t.type === "pageshow") && !t.nativeEvent.customLoad) { return } if (c && (t.type === "touchstart" || t.type === "touchmove")) { return } if (m !== null && t.type !== "touchstart" && t.type !== "touchmove" && t.type !== "scroll" && t.type !== "touchend") { p._prepNonIosTouchEnd() } else { if (t.type === "touchstart") { p._handleTouchStart(t); return } if (t.type === "touchmove") { p._handleTouchMove(t); return } if (m !== null && t.type === "scroll" && !s) { p._handleTouchScroll(t); return } if (h) { y = "scroll|null-2|window" } } if (p.utils.isIE) { if (t.type === "click") { l = t.target.element } if (t.type === "beforeunload") { D = false; p.utils.forEach(p.getCoreConfig().ieExcludedLinks, function (H) { var I, G, J = v.queryAll(H); for (I = 0, G = J ? J.length : 0; I < G; I += 1) { if (typeof J[I] !== undefined && J[I] === l) { D = true; return } } }); if (D) { return } } } if (o.isUnload(t)) { e = "unloading" } if (t.type === "change" && p.utils.isLegacyIE && p.getFlavor() === "w3c" && (t.target.element.type === "checkbox" || t.target.element.type === "radio")) { return } if (t.type === "propertychange") { if (t.nativeEvent.propertyName === "checked" && (t.target.element.type === "checkbox" || (t.target.element.type === "radio" && t.target.element.checked))) { t.type = t.target.type = "change" } else { return } } if (!b.hasOwnProperty(y)) { if (t.hasOwnProperty("nativeEvent")) { C = t.nativeEvent.currentTarget || t.nativeEvent.target } y = p._buildToken4bubbleTarget(t.type, C, true, F) } if (b.hasOwnProperty(y)) { z = b[y]; for (A = 0, B = z.length; A < B; A += 1) { u = z[A]; x = p.getModule(u); w = p.utils.mixin({}, t); if (x && p.isStarted(u) && typeof x.onevent === "function") { E = o.canPublish(u, w); if (E) { x.onevent(w) } } } } if (w && w.type === "unload" && E) { TLT.destroy() } }, _getLocalTop: function () { return window.window }, addModule: function (t, u) { r[t] = { creator: u, instance: null, context: null, messages: [] }; if (this.isInitialized()) { this.start(t) } }, getModule: function (t) { if (r[t] && r[t].instance) { return r[t].instance } return null }, removeModule: function (t) { this.stop(t); delete r[t] }, isStarted: function (t) { return r.hasOwnProperty(t) && r[t].instance !== null }, start: function (u) { var v = r[u], t = null; if (v && v.instance === null) { v.context = new TLT.ModuleContext(u, this); t = v.instance = v.creator(v.context); if (typeof t.init === "function") { t.init() } } }, startAll: function () { var t = null; for (t in r) { if (r.hasOwnProperty(t)) { this.start(t) } } }, stop: function (u) { var v = r[u], t = null; if (v && v.instance !== null) { t = v.instance; if (typeof t.destroy === "function") { t.destroy() } v.instance = v.context = null } }, stopAll: function () { var t = null; for (t in r) { if (r.hasOwnProperty(t)) { this.stop(t) } } }, addService: function (u, t) { a[u] = { creator: t, instance: null } }, getService: function (t) { if (a.hasOwnProperty(t)) { if (!a[t].instance) { try { a[t].instance = a[t].creator(this); if (typeof a[t].instance.init === "function") { a[t].instance.init() } } catch (u) { return null } if (typeof a[t].instance.getServiceName !== "function") { a[t].instance.getServiceName = function () { return t } } } return a[t].instance } return null }, removeService: function (t) { delete a[t] }, broadcast: function (w) { var v = 0, t = 0, x = null, u = null; if (w && typeof w === "object") { for (x in r) { if (r.hasOwnProperty(x)) { u = r[x]; if (p.utils.indexOf(u.messages, w.type) > -1) { if (typeof u.instance.onmessage === "function") { u.instance.onmessage(w) } } } } } }, listen: function (t, v) { var u = null; if (this.isStarted(t)) { u = r[t]; if (p.utils.indexOf(u.messages, v) === -1) { u.messages.push(v) } } }, fail: function (v, u, t) { v = "UIC FAILED. " + v; try { p.destroy(!!t) } finally { p.utils.clog(v); throw new p.UICError(v, u) } }, UICError: (function () { function t(u, v) { this.message = u; this.code = v } t.prototype = new Error(); t.prototype.name = "UICError"; t.prototype.constructor = t; return t }()), getFlavor: function () { return "w3c" } }; g = function (v, A) { var z, x, t, u, w; if (d) { p.utils.clog("TLT.init() called more than once. Ignoring."); return } z = p.getService("config"); z.updateConfig(v); if (!p._updateModules()) { if (e !== "destroyed") { p.destroy() } return } if (z.subscribe) { z.subscribe("configupdated", p._reinitConfig) } d = true; e = "loaded"; x = { type: "load", target: window.window, srcElement: window.window, currentTarget: window.window, bubbles: true, cancelBubble: false, cancelable: true, timeStamp: +new Date(), customLoad: true }; u = p.getService("browserBase"); t = new u.WebEvent(x); p._publishEvent(t); if (typeof i === "function") { try { i("initialized") } catch (y) { } } }; (function () { var u = null, v, t; for (u in f) { if (f.hasOwnProperty(u)) { for (v = 0, t = f[u].length; v < t; v += 1) { (function (x, w) { p[w] = function () { var y = this.getService(x); if (y) { return y[w].apply(y, arguments) } } }(u, f[u][v])) } } } }()); return p }()); (function () { var c = (function () { var d = window.navigator.userAgent.toLowerCase(); return (d.indexOf("msie") !== -1) }()), b = (function () { var d = !!window.performance; return (c && (!d || document.documentMode < 9)) }()), a = { isIE: c, isLegacyIE: b, indexOf: function (g, f) { var e, d; if (g && g instanceof Array) { for (e = 0, d = g.length; e < d; e += 1) { if (g[e] === f) { return e } } } return -1 }, forEach: function (h, g, f) { var e, d; if (!h || !h.length || !g || !g.call) { return } for (e = 0, d = h.length; e < d; e += 1) { g.call(f, h[e], e, h) } }, some: function (h, g) { var e, d, f = false; for (e = 0, d = h.length; e < d; e += 1) { f = g(h[e], e, h); if (f) { return f } } return f }, convertToArray: function (f) { var g = 0, e = f.length, d = []; while (g < e) { d.push(f[g]); g += 1 } return d }, isUndefOrNull: function (d) { return typeof d === "undefined" || d === null }, mixin: function (h) { var g, f, e, d; for (e = 1, d = arguments.length; e < d; e += 1) { f = arguments[e]; for (g in f) { if (Object.prototype.hasOwnProperty.call(f, g)) { h[g] = f[g] } } } return h }, extend: function (d, e, f) { var g = ""; for (g in f) { if (Object.prototype.hasOwnProperty.call(f, g)) { if (d && Object.prototype.toString.call(f[g]) === "[object Object]") { if (typeof e[g] === "undefined") { e[g] = {} } a.extend(d, e[g], f[g]) } else { e[g] = f[g] } } } return e }, clone: function (e) { var f, d; if (null === e || "object" !== typeof e) { return e } if (e instanceof Object) { f = (Object.prototype.toString.call(e) === "[object Array]") ? [] : {}; for (d in e) { if (Object.prototype.hasOwnProperty.call(e, d)) { f[d] = a.clone(e[d]) } } return f } }, createObject: (function () { var d = null, e = null; if (typeof Object.create === "function") { d = Object.create } else { e = function () { }; d = function (f) { if (typeof f !== "object" && typeof f !== "function") { throw new TypeError("Object prototype need to be an object!") } e.prototype = f; return new e() } } return d }()), access: function (j, g) { var h = g || window, e, f, d; if (typeof j !== "string" || (typeof h !== "object" && h !== null)) { return } e = j.split("."); for (f = 0, d = e.length; f < d; f += 1) { if (f === 0 && e[f] === "window") { continue } if (!Object.prototype.hasOwnProperty.call(h, e[f])) { return } h = h[e[f]]; if (f < (d - 1) && !(h instanceof Object)) { return } } return h }, isNumeric: function (d) { return !isNaN(d + 1 - 1) }, isUpperCase: function (d) { return d === d.toUpperCase() && d !== d.toLowerCase() }, isLowerCase: function (d) { return d === d.toLowerCase() && d !== d.toUpperCase() }, getDocument: function (d) { if (d.nodeType !== 9) { return (!a.isUndefOrNull(d.ownerDocument)) ? (d.ownerDocument) : (d.document) } return d }, getWindow: function (e) { if (e.self !== e) { var d = a.getDocument(e); return (!a.isUndefOrNull(d.defaultView)) ? (d.defaultView) : (d.parentWindow) } return e }, getIFrameWindow: function (g) { var d = null; if (!g) { return d } try { d = g.contentWindow || (g.contentDocument ? g.contentDocument.parentWindow : null) } catch (f) { } return d }, getTagName: function (d) { if (d === document) { return "document" } if (d === window || d === window.window) { return "window" } if (typeof d === "string") { return d.toLowerCase() } if (typeof d === "object" && !a.isUndefOrNull(d) && typeof d.tagName === "string") { return d.tagName.toLowerCase() } return "" }, isIFrameDescendant: function (d) { return a.getWindow(d) != TLT._getLocalTop() }, getOrientationMode: function (d) { var e = "INVALID"; if (typeof d !== "number") { return e } switch (d) { case 0: case 180: case 360: e = "PORTRAIT"; break; case 90: case -90: case 270: e = "LANDSCAPE"; break; default: e = "UNKNOWN"; break } return e }, clog: (function (d) { return function () { } }(window)), trim: function (d) { if (!d || !d.toString) { return d } return d.toString().replace(/^\s+|\s+$/g, "") }, ltrim: function (d) { if (!d || !d.toString) { return d } return d.toString().replace(/^\s+/, "") }, rtrim: function (d) { if (!d || !d.toString) { return d } return d.toString().replace(/\s+$/, "") }, getCookieValue: function (l, n) { var h, j, g, m, f = null, d; try { n = n || document.cookie; if (!l || !l.toString) { return null } l += "="; d = l.length; m = n.split(";"); for (h = 0, j = m.length; h < j; h += 1) { g = m[h]; g = a.ltrim(g); if (g.indexOf(l) === 0) { f = g.substring(d, g.length); break } } } catch (k) { } return f }, getQueryStringValue: function (k, n, d) { var h, g, o, f = null, l; try { d = d || window.location.search; o = d.length; if (!k || !k.toString || !o) { return null } n = n || "&"; d = n + d.substring(1); k = n + k + "="; h = d.indexOf(k); if (h !== -1) { l = h + k.length; g = d.indexOf(n, l); if (g === -1) { g = o } f = decodeURIComponent(d.substring(l, g)) } } catch (m) { } return f }, addEventListener: (function () { if (window.addEventListener) { return function (e, d, f) { e.addEventListener(d, f, false) } } return function (e, d, f) { e.attachEvent("on" + d, f) } }()), WeakMap: (function () { function d(h, g) { var f, e; h = h || []; for (f = 0, e = h.length; f < e; f += 1) { if (h[f][0] === g) { return f } } return -1 } return function () { var e = []; this.set = function (g, h) { var f = d(e, g); e[f > -1 ? f : e.length] = [g, h] }; this.get = function (g) { var f = e[d(e, g)]; return (f ? f[1] : undefined) }; this.clear = function () { e = [] }; this.has = function (f) { return (d(e, f) >= 0) }; this.remove = function (g) { var f = d(e, g); if (f >= 0) { e.splice(f, 1) } }; this["delete"] = this.remove } }()) }; if (typeof TLT === "undefined" || !TLT) { window.TLT = {} } TLT.utils = a }()); (function () { TLT.EventTarget = function () { this._handlers = {} }; TLT.EventTarget.prototype = { constructor: TLT.EventTarget, publish: function (c, f) { var d = 0, a = 0, b = this._handlers[c], e = { type: c, data: f }; if (typeof b !== "undefined") { for (a = b.length; d < a; d += 1) { b[d](e) } } }, subscribe: function (a, b) { if (!this._handlers.hasOwnProperty(a)) { this._handlers[a] = [] } this._handlers[a].push(b) }, unsubscribe: function (c, e) { var d = 0, a = 0, b = this._handlers[c]; if (b) { for (a = b.length; d < a; d += 1) { if (b[d] === e) { b.splice(d, 1); return } } } } } }()); TLT.ModuleContext = (function () { var a = ["broadcast", "getConfig:getModuleConfig", "listen", "post", "getStartTime"]; return function (f, d) { var h = {}, g = 0, b = a.length, j = null, e = null, c = null; for (g = 0; g < b; g += 1) { j = a[g].split(":"); if (j.length > 1) { c = j[0]; e = j[1] } else { c = j[0]; e = j[0] } h[c] = (function (i) { return function () { var k = d.utils.convertToArray(arguments); k.unshift(f); return d[i].apply(d, k) } }(e)) } h.utils = d.utils; return h } }()); TLT.addService("config", function (a) { function d(f, e) { a.utils.extend(true, f, e); c.publish("configupdated", c.getConfig()) } var b = { core: {}, modules: {}, services: {} }, c = a.utils.extend(false, a.utils.createObject(new TLT.EventTarget()), { getConfig: function () { return b }, updateConfig: function (e) { d(b, e) }, getCoreConfig: function () { return b.core }, updateCoreConfig: function (e) { d(b.core, e) }, getServiceConfig: function (e) { return b.services[e] || null }, updateServiceConfig: function (f, e) { if (typeof b.services[f] === "undefined") { b.services[f] = {} } d(b.services[f], e) }, getModuleConfig: function (e) { return b.modules[e] || null }, updateModuleConfig: function (f, e) { if (typeof b.modules[f] === "undefined") { b.modules[f] = {} } d(b.modules[f], e) }, destroy: function () { b = { core: {}, modules: {}, services: {} } } }); return c }); TLT.addService("queue", function (o) { var w = null, e = o.getService("ajax"), j = o.getService("browser"), h = o.getService("serializer"), u = o.getService("config"), f = o.getService("message"), m = null, v = {}, b = true, l = false, i = (function () { var B = {}; function E(F) { return typeof B[F] !== "undefined" } function x(F, G) { if (!E(F)) { B[F] = { data: [], queueId: F, url: G.url, threshold: G.threshold, serializer: G.serializer, crossDomainEnabled: !!G.crossDomainEnabled, crossDomainIFrame: G.crossDomainIFrame } } return B[F] } function z(F) { if (E(F)) { delete B[F] } } function C(F) { if (E(F)) { return B[F] } return null } function A(G) { var F = C(G); if (F !== null) { F.data = [] } } function D(F) { var G = null; if (E(F)) { G = C(F).data; A(F) } return G } function y(I, J) { var G = null, F = null, K = window.tlBridge, H = window.iOSJSONShuttle; if ((typeof K !== "undefined") && (typeof K.addMessage === "function")) { F = h.serialize(J); K.addMessage(F) } else { if ((typeof H !== "undefined") && (typeof H === "function")) { F = h.serialize(J); H(F) } else { if (E(I)) { G = C(I); return G.data.push(J) } } } return 0 } return { SEND_HEADER_ONCE: -1, SEND_HEADER_ALWAYS: -2, exists: E, add: x, remove: z, get: C, clear: A, flush: D, push: y } }()); function a() { } function k() { return window.location.pathname } function r(x, F) { var A = i.flush(x), C = A !== null ? A.length : 0, B = i.get(x), y = { "Content-Type": "application/json", "X-Tealeaf": "device (UIC) Lib/3.0.1.1068", "X-TealeafType": "GUI", "X-TeaLeaf-Page-Url": k() }, G = B.serializer || "json", z, E = null; A = f.wrapMessages(A); if (C) { if (B.crossDomainEnabled) { E = o.utils.getIFrameWindow(B.crossDomainIFrame); if (!E) { return } z = { request: { url: B.url, async: !F, headers: y, data: h.serialize(A, G) } }; if (!o.utils.isIE && typeof window.postMessage === "function") { E.postMessage(z, B.crossDomainIFrame.src) } else { try { E.sendMessage(z) } catch (D) { return } } } else { e.sendRequest({ oncomplete: a, url: B.url, async: !F, headers: y, data: h.serialize(A, G) }) } } } function d(z) { var x = null, y = 0; for (y = 0; y < w.length; y += 1) { x = w[y]; r(x.qid, z) } return true } function g(x, z) { var y = i.push(x, f.createMessage(z)); if (y >= i.get(x).threshold && b && o.getState() !== "unloading") { r(x) } } function c(z) { var y = null, B = "", A = 0, x = 0; for (A = 0; A < w.length; A += 1) { y = w[A]; if (y && y.modules) { for (x = 0; x < y.modules.length; x += 1) { B = y.modules[x]; if (B === z) { return y.qid } } } } return m.qid } function s(z, x) { v[z] = window.setTimeout(function y() { r(z); v[z] = window.setTimeout(y, x) }, x) } function q() { var x = 0; for (x in v) { if (v.hasOwnProperty(x)) { window.clearTimeout(v[x]); delete v[x] } } v = {} } function p(x) { } function n(y) { w = y; var x = null, z, A = null; for (z in w) { if (w.hasOwnProperty(z)) { A = null; x = w[z]; if (x.qid === "DEFAULT") { m = x } if (x.crossDomainEnabled) { A = j.query(x.crossDomainFrameSelector); if (!A) { o.fail("Cross domain iframe not found") } } i.add(x.qid, { url: x.endpoint, threshold: x.maxEvents, serializer: x.serializer, timerInterval: x.timerInterval || 0, crossDomainEnabled: x.crossDomainEnabled || false, crossDomainIFrame: A }); if (typeof x.timerInterval !== "undefined" && x.timerInterval > 0) { s(x.qid, x.timerInterval) } } } u.subscribe("configupdated", p); l = true } function t() { if (b) { d(true) } u.unsubscribe("configupdated", p); q(); w = null; m = null; l = false } return { init: function () { if (!l) { n(u.getServiceConfig("queue") || {}) } else { } }, destroy: function () { t() }, _getQueue: function (x) { return i.get(x).data }, setAutoFlush: function (x) { if (x === 1) { b = true } else { b = false } }, flush: function (x) { if (!i.exists(x)) { throw new Error("Queue: " + x + " does not exist!") } r(x) }, flushAll: function (x) { return d(!!x) }, post: function (y, z, x) { x = x || c(y); if (!i.exists(x)) { throw new Error("Queue: " + x + " does not exist!") } g(x, z) } } }); TLT.addService("browserBase", function (r) { var v = { OPTGROUP: true, OPTION: true, NOBR: true }, d = {}, w = r.getService("config"), t, x, e, a, c, n = false; function h() { w = r.getService("config"); t = r.getService("serializer"); x = r.getService("config").getServiceConfig("browser") || {}; e = x.hasOwnProperty("blacklist") ? x.blacklist : []; a = x.hasOwnProperty("customid") ? x.customid : [] } function m() { h(); w.subscribe("configupdated", h); n = true } function u() { w.unsubscribe("configupdated", h); n = false } function q(D) { var B, A, C; if (!D || !D.id || typeof D.id !== "string") { return false } for (B = 0, A = e.length; B < A; B += 1) { if (typeof e[B] === "string") { if (D.id === e[B]) { return false } } else { if (typeof e[B] === "object") { C = new RegExp(e[B].regex, e[B].flags); if (C.test(D.id)) { return false } } } } return true } c = (function () { var B = { NOBR: true, P: true }; function C(F) { var I, G, H = false, L = null, D = null, M = null, K = [], J = true, E = r._getLocalTop(); while (J) { J = false; if (!r.utils.isUndefOrNull(F)) { if (!r.utils.isUndefOrNull(F.tagName)) { if (B.hasOwnProperty(F.tagName)) { F = F.parentNode } } for (H = q(F) ; F !== document && !H; H = q(F)) { M = F.parentNode; if (!M) { D = r.utils.getWindow(F); M = (D !== E) ? D.frameElement : document } L = M.firstChild; if (typeof L === "undefined") { return K } for (G = 0; L; L = L.nextSibling) { if (L.nodeType === 1 && L.tagName === F.tagName) { if (L === F) { K[K.length] = [F.tagName, G]; break } G += 1 } } F = M } if (H) { K[K.length] = [F.id]; if (r.utils.isIFrameDescendant(F)) { J = true; F = r.utils.getWindow(F).frameElement } } } } return K } return function A(F) { var D = C(F), G = [], E = D.length; if (E < 1) { return "null" } while (E) { E -= 1; if (D[E].length > 1) { G[G.length] = '["' + D[E][0] + '",' + D[E][1] + "]" } else { G[G.length] = "[" + t.serialize(D[E][0], "json") + "]" } } return ("[" + G.join(",") + "]") } }()); function o(A) { return A && typeof A.originalEvent !== "undefined" && typeof A.isDefaultPrevented !== "undefined" && !A.isSimulated } function k(A) { if (!A) { return null } if (A.type && A.type.indexOf("touch") === 0) { if (o(A)) { A = A.originalEvent } if (A.type === "touchstart") { A = A.touches[A.touches.length - 1] } else { if (A.type === "touchend") { A = A.changedTouches[0] } } } return A } function j(B) { var D = B || window.event, C = document.documentElement, A = document.body; if (o(D)) { D = D.originalEvent } if (typeof B === "undefined" || typeof D.target === "undefined") { D.target = D.srcElement || window.window; D.timeStamp = Number(new Date()); if (D.pageX === null || typeof D.pageX === "undefined") { D.pageX = D.clientX + ((C && C.scrollLeft) || (A && A.scrollLeft) || 0) - ((C && C.clientLeft) || (A && A.clientLeft) || 0); D.pageY = D.clientY + ((C && C.scrollTop) || (A && A.scrollTop) || 0) - ((C && C.clientTop) || (A && A.clientTop) || 0) } D.preventDefault = function () { this.returnValue = false }; D.stopPropagation = function () { this.cancelBubble = true } } return D } function p(B) { var A = null; if (!B) { return null } if (B.srcElement) { A = B.srcElement } else { A = B.target; if (!A) { A = B.explicitOriginalTarget } if (!A) { A = B.originalTarget } } if (!A && B.type.indexOf("touch") === 0) { A = k(B).target } while (A && v[A.tagName]) { A = A.parentNode } if (!A && B.srcElement === null) { A = window.window } return A } function g(B) { var E = 0, D = 0, C = document.documentElement, A = document.body; B = k(B); if (B !== null) { if (B.pageX && B.pageY && B.pageX > 0 && B.pageY > 0) { E = B.pageX; D = B.pageY } else { if (B.clientX && B.clientY) { E = B.clientX + ((C && C.scrollLeft) || (A && A.scrollLeft) || 0) - ((C && C.clientLeft) || (A && A.clientLeft) || 0); D = B.clientY + ((C && C.scrollTop) || (A && A.scrollTop) || 0) - ((C && C.clientTop) || (A && A.clientTop) || 0) } } } return { x: E, y: D } } d.xpath = function (H, J) { var F = t.parse(H), A, G = null, D, C, B, E, I; J = typeof J !== "undefined" ? J : document; A = J; if (!F) { return null } for (D = 0, E = F.length; D < E && A; D += 1) { G = F[D]; if (G.length === 1) { A = J.getElementById(G[0]) } else { for (C = 0, B = -1, I = A.childNodes.length; C < I; C += 1) { if (A.childNodes[C].nodeType === 1 && A.childNodes[C].tagName.toUpperCase() === G[0]) { B += 1; if (B === G[1]) { A = A.childNodes[C]; break } } } if (B === -1) { return null } } } return A === J || !A ? null : A }; function y(A, B) { this.x = A || 0; this.y = B || 0 } function s(B, A) { this.width = B || 0; this.height = A || 0 } function b(B, C) { var E, A, D; C = p(B); E = this.examineID(C); A = this.examineType(C, B); D = this.examinePosition(B, C); this.element = C; this.id = E.id; this.idType = E.type; this.type = A.type; this.subType = A.subType; this.state = this.examineState(C); this.position = new y(D.x, D.y); this.size = new s(D.width, D.height); this.xPath = E.xPath; this.name = E.name } b.HTML_ID = -1; b.XPATH_ID = -2; b.ATTRIBUTE_ID = -3; b.prototype.examineID = function (G) { var C, I, J, A, B, E = a.length, D; try { J = c(G) } catch (F) { } B = G.name; try { if (!r.utils.isIFrameDescendant(G)) { if (q(G)) { C = G.id; I = b.HTML_ID } else { if (a.length && G.attributes) { while (E) { E -= 1; D = G.attributes[a[E]]; if (typeof D !== "undefined") { C = a[E] + "=" + (D.value || D); I = b.ATTRIBUTE_ID } } } } } } catch (H) { } if (!C) { C = J; I = b.XPATH_ID } return { id: C, type: I, xPath: J, name: B } }; b.prototype.examineType = function (B, A) { var C = ""; if (A.type === "change") { if (B.tagName === "TEXTAREA" || (B.tagName === "INPUT" && B.type === "text")) { C = "textChange" } else { C = "valueChange" } } else { C = A.type } return { type: A.type, subType: C } }; b.prototype.examineState = function (G) { var A = { a: ["innerText", "href"], input: { range: ["maxValue:max", "value"], checkbox: ["value", "checked"], radio: ["value", "checked"], image: ["src"] }, select: ["value"], button: ["value", "innerText"], textarea: ["value"] }, B = typeof G.tagName !== "undefined" ? G.tagName.toLowerCase() : "", H = A[B] || null, C = null, J = null, D = 0, F = 0, E = null, I = ""; if (H !== null) { if (Object.prototype.toString.call(H) === "[object Object]") { H = H[G.type] || ["value"] } J = {}; for (I in H) { if (H.hasOwnProperty(I)) { if (H[I].indexOf(":") !== -1) { E = H[I].split(":"); J[E[0]] = G[E[1]] } else { if (H[I] === "innerText") { J[H[I]] = G.innerText || G.textContent } else { J[H[I]] = G[H[I]] } } } } } if (B === "select" && G.options && !isNaN(G.selectedIndex)) { J.index = G.selectedIndex; if (J.index >= 0 && J.index < G.options.length) { C = G.options[G.selectedIndex]; J.value = C.getAttribute("value") || C.getAttribute("label") || C.text || C.innerText; J.text = C.text || C.innerText } } return J }; function l() { var B = 1, C, E, A; if (document.body.getBoundingClientRect) { try { C = document.body.getBoundingClientRect() } catch (D) { r.utils.clog("getBoundingClientRect failed.", D); return B } E = C.right - C.left; A = document.body.offsetWidth; B = Math.round((E / A) * 100) / 100 } return B } function f(B) { var D, A, C; if (typeof B === "undefined" || B === null || !B.getBoundingClientRect) { return { x: 0, y: 0, width: 0, height: 0 } } try { D = B.getBoundingClientRect() } catch (E) { r.utils.clog("getBoundingClientRect failed.", E); return { x: 0, y: 0, width: 0, height: 0 } } A = { x: D.left, y: D.top, width: D.right - D.left, height: D.bottom - D.top }; if (r.utils.isIE) { A.x -= document.documentElement.clientLeft; A.y -= document.documentElement.clientTop; C = l(); if (C !== 1) { A.x = Math.round(A.x / C); A.y = Math.round(A.y / C); A.width = Math.round(A.width / C); A.height = Math.round(A.height / C) } } return A } b.prototype.examinePosition = function (B, C) { var D = g(B), A = f(C); A.x = D.x !== 0 && D.y !== 0 ? Math.round(Math.abs(D.x - A.x)) : A.width / 2; A.y = D.x !== 0 && D.y !== 0 ? Math.round(Math.abs(D.y - A.y)) : A.height / 2; return A }; function i(A) { var B; this.data = A.data || null; this.delegateTarget = A.delegateTarget || null; A = j(A); B = g(A); this.custom = false; this.nativeEvent = this.custom === true ? null : A; this.position = new y(B.x, B.y); this.target = new b(A, A.target); this.timestamp = (new Date()).getTime(); this.type = A.type; switch (this.type) { case "focusin": this.type = "focus"; break; case "focusout": this.type = "blur"; break; default: break } } function z(A) { r._publishEvent(new i(A)) } return { init: function () { if (!n) { m() } else { } }, destroy: function () { u() }, WebEvent: i, ElementData: b, processDOMEvent: z, queryDom: d } }); TLT.addService("browser", function (core) { var configService = core.getService("config"), browserBaseService = core.getService("browserBase"), ajaxService = core.getService("ajax"), addEventListener = null, removeEventListener = null, serviceConfig = configService.getServiceConfig("browser") || {}, useCapture = (serviceConfig.useCapture === true), isInitialized = false, errorCodes = { NO_QUERY_SELECTOR: "NOQUERYSELECTOR" }, wrapWebEvent = function (handler) { return function (event) { handler(new browserBaseService.WebEvent(event)) } }, loadScript = function (url) { var fjs = document.getElementsByTagName("script")[0], js = document.createElement("script"); js.src = url; fjs.parentNode.insertBefore(js, fjs) }, queryDom = { list2Array: function (nodeList) { var len = nodeList.length, result = [], i; if (typeof nodeList.length === "undefined") { return [nodeList] } for (i = 0; i < len; i += 1) { result[i] = nodeList[i] } return result }, find: function (query, scope, type) { type = type || "css"; return this.list2Array(this[type](query, scope)) }, css: function (query, scope) { var self = this, message = null, bodyEl = document.getElementsByTagName("body")[0], bConfig = configService.getServiceConfig("browser") || {}, sizzleURL = bConfig.sizzleURL || null, jQuery = bConfig.hasOwnProperty("jQueryObject") ? core.utils.access(bConfig.jQueryObject) : window.jQuery, sizzle = bConfig.hasOwnProperty("sizzleObject") ? core.utils.access(bConfig.sizzleObject) : window.Sizzle; if (typeof document.querySelectorAll === "undefined") { self.css = function (query, scope) { scope = scope || document; return self.Sizzle(query, scope) }; if (typeof self.Sizzle === "undefined") { if (sizzleURL) { message = { type: "GET", url: sizzleURL, async: false, oncomplete: function (result) { function define(definition) { self.Sizzle = definition() } define.amd = true; eval(result.responseText) } }; ajaxService.sendRequest(message) } else { try { if (bodyEl === sizzle("html > body", document)[0]) { self.Sizzle = sizzle } } catch (e) { try { if (bodyEl === jQuery(document).find("html > body").get()[0]) { self.Sizzle = function (query, scope) { return jQuery(scope).find(query).get() } } } catch (ex) { core.fail("Sizzle was not found", errorCodes.NO_QUERY_SELECTOR) } } } } } else { self.css = function (query, scope) { scope = scope || document; return scope.querySelectorAll(query) } } return self.css(query, scope) } }, handlerMappings = (function () { var data = new core.utils.WeakMap(); return { add: function (originalHandler) { var handlers = data.get(originalHandler) || [wrapWebEvent(originalHandler), 0]; handlers[1] += 1; data.set(originalHandler, handlers); return handlers[0] }, find: function (originalHandler) { var handlers = data.get(originalHandler); return handlers ? handlers[0] : null }, remove: function (originalHandler) { var handlers = data.get(originalHandler); if (handlers) { handlers[1] -= 1; if (handlers[1] <= 0) { data.remove(originalHandler) } } } } }()); function initBrowserServiceW3C() { queryDom.xpath = browserBaseService.queryDom.xpath; if (typeof document.addEventListener === "function") { addEventListener = function (target, eventName, handler) { target.addEventListener(eventName, handler, useCapture) }; removeEventListener = function (target, eventName, handler) { target.removeEventListener(eventName, handler, useCapture) } } else { if (typeof document.attachEvent !== "undefined") { addEventListener = function (target, eventName, handler) { target.attachEvent("on" + eventName, handler) }; removeEventListener = function (target, eventName, handler) { target.detachEvent("on" + eventName, handler) } } else { throw new Error("Unsupported browser") } } isInitialized = true } return { init: function () { if (!isInitialized) { initBrowserServiceW3C() } else { } }, destroy: function () { isInitialized = false }, getServiceName: function () { return "W3C" }, query: function (query, scope, type) { return queryDom.find(query, scope, type)[0] || null }, queryAll: function (query, scope, type) { return queryDom.find(query, scope, type) }, loadScript: function (url) { loadScript(url) }, subscribe: function (eventName, target, handler) { var wrappedHandler = handlerMappings.add(handler); addEventListener(target, eventName, wrappedHandler) }, unsubscribe: function (eventName, target, handler) { var wrappedHandler = handlerMappings.find(handler); if (wrappedHandler) { try { removeEventListener(target, eventName, wrappedHandler) } catch (e) { } handlerMappings.remove(handler) } } } }); TLT.addService("ajax", function (b) { var a, e = function (j) { var i = "", h = []; for (i in j) { if (j.hasOwnProperty(i)) { h.push([i, j[i]]) } } return h }, d = false; function c(k) { k = k.split("\n"); var m = {}, j = 0, h = k.length, l = null; for (j = 0; j < h; j += 1) { l = k[j].split(": "); m[l[0]] = l[1] } return m } function g(q) { var p = a(), j = [["X-Requested-With", "XMLHttpRequest"]], o = 0, k = typeof q.async !== "boolean" ? true : q.async, m = "", n = null, l, h; if (q.headers) { j = j.concat(e(q.headers)) } if (q.contentType) { j.push(["Content-Type", q.contentType]) } p.open(q.type.toUpperCase(), q.url, k); for (l = 0, h = j.length; l < h; l += 1) { m = j[l]; if (m[0] && m[1]) { p.setRequestHeader(m[0], m[1]) } } p.onreadystatechange = n = function () { if (p.readyState === 4) { p.onreadystatechange = n = function () { }; if (q.timeout) { window.clearTimeout(o) } q.oncomplete({ headers: c(p.getAllResponseHeaders()), responseText: (p.responseText || null), statusCode: p.status, success: (p.status === 200) }); p = null } }; p.send(q.data || null); n(); if (q.timeout) { o = window.setTimeout(function () { if (!p) { return } p.onreadystatechange = function () { }; if (p.readyState !== 4) { p.abort() } p = null }, q.timeout) } } function f() { if (typeof window.XMLHttpRequest !== "undefined") { a = function () { return new XMLHttpRequest() } } else { a = function () { return new ActiveXObject("Microsoft.XMLHTTP") } } d = true } return { init: function () { if (!d) { f() } }, destroy: function () { d = false }, sendRequest: function (h) { h.type = h.type || "POST"; g(h) } } }); TLT.addService("message", function (C) { var y = null, i = 0, f = 0, A = new Date(), e = new Date(), m = C.getService("browserBase"), B = C.getService("browser"), F = C.getService("config"), G = F.getServiceConfig("message") || {}, x = window.location.href, l = "TODO", n = "ID" + e.getHours() + "H" + e.getMinutes() + "M" + e.getSeconds() + "S" + e.getMilliseconds() + "R" + Math.random(), H = G.hasOwnProperty("privacy") ? G.privacy : [], h = {}, q = { lower: "x", upper: "X", numeric: "9", symbol: "@" }, g = navigator.userAgent.indexOf("iPhone") > -1 || navigator.userAgent.indexOf("iPod") > -1 || navigator.userAgent.indexOf("iPad") > -1, z = window.devicePixelRatio || 1, s = window.screen ? window.screen.width : 0, r = window.screen ? window.screen.height : 0, j = window.orientation || 0, d = g ? s : s <= 320 ? s : s / z, D = g ? r : s <= 320 ? r : r / z, c = (window.screen === null ? 0 : window.screen.height - window.screen.availHeight), p = window.innerWidth || document.documentElement.clientWidth, t = window.innerHeight || document.documentElement.clientHeight, w = false; function a(J) { var I = ""; this.type = J.type; this.offset = (new Date()).getTime() - A.getTime(); if ((J.type === 2) || (y === null)) { y = new Date() } this.screenviewOffset = (new Date()).getTime() - y.getTime(); this.count = (f += 1); this.fromWeb = true; for (I in J) { if (J.hasOwnProperty(I)) { this[I] = J[I] } } } h.PVC_MASK_EMPTY = function (I) { return "" }; h.PVC_MASK_BASIC = function (J) { var I = "XXXXX"; if (typeof J !== "string") { return "" } return (J.length ? I : "") }; h.PVC_MASK_TYPE = function (M) { var J, L = 0, I = 0, K = ""; if (typeof M !== "string") { return K } J = M.split(""); for (L = 0, I = J.length; L < I; L += 1) { if (C.utils.isNumeric(J[L])) { K += q.numeric } else { if (C.utils.isUpperCase(J[L])) { K += q.upper } else { if (C.utils.isLowerCase(J[L])) { K += q.lower } else { K += q.symbol } } } } return K }; h.PVC_MASK_EMPTY.maskType = 1; h.PVC_MASK_BASIC.maskType = 2; h.PVC_MASK_TYPE.maskType = 3; h.PVC_MASK_CUSTOM = { maskType: 4 }; function v(I, K) { var J = h.PVC_MASK_BASIC; if (I.maskType === h.PVC_MASK_EMPTY.maskType) { J = h.PVC_MASK_EMPTY } else { if (I.maskType === h.PVC_MASK_BASIC.maskType) { J = h.PVC_MASK_BASIC } else { if (I.maskType === h.PVC_MASK_TYPE.maskType) { J = h.PVC_MASK_TYPE } else { if (I.maskType === h.PVC_MASK_CUSTOM.maskType) { if (typeof I.maskFunction === "string") { J = C.utils.access(I.maskFunction) } else { J = I.maskFunction } if (typeof J !== "function") { J = h.PVC_MASK_BASIC } } } } } if (typeof K.target.prevState !== "undefined" && K.target.prevState.hasOwnProperty("value")) { K.target.prevState.value = J(K.target.prevState.value) } if (typeof K.target.currState !== "undefined" && K.target.currState.hasOwnProperty("value")) { K.target.currState.value = J(K.target.currState.value) } } function u(O, P) { var M, L, Q, I, K, R, N, J; for (M = 0, N = O.length; M < N; M += 1) { J = O[M]; if (typeof J === "string") { Q = B.queryAll(J); for (L = 0, I = Q ? Q.length : 0; L < I; L += 1) { if (Q[L]) { K = m.ElementData.prototype.examineID(Q[L]); if (K.type === P.idType && K.id === P.id) { return true } } } } else { if (J.id && J.idType && P.idType.toString() === J.idType.toString()) { switch (typeof J.id) { case "string": if (J.id === P.id) { return true } break; case "object": R = new RegExp(J.id.regex, J.id.flags); if (R.test(P.id)) { return true } break } } } } return false } function b(L) { var K, I, J; if (!L || !L.hasOwnProperty("target")) { return L } for (K = 0, I = H.length; K < I; K += 1) { J = H[K]; if (u(J.targets, L.target)) { v(J, L); break } } return L } function k() { F = C.getService("config"); G = F.getServiceConfig("message") || {}; H = G.hasOwnProperty("privacy") ? G.privacy : [] } function o() { if (F.subscribe) { F.subscribe("configupdated", k) } w = true } function E() { F.unsubscribe("configupdated", k); w = false } return { init: function () { if (!w) { o() } else { } }, destroy: function () { E() }, createMessage: function (I) { if (typeof I.type === "undefined") { throw new TypeError("Invalid queueEvent given!") } return b(new a(I)) }, wrapMessages: function (J) { var I = { messageVersion: "2.2.0.0", serialNumber: (i += 1), sessions: [{ id: n, startTime: e.getTime(), timezoneOffset: e.getTimezoneOffset(), messages: J, clientEnvironment: { webEnvironment: { libVersion: "3.0.1.1068", page: x, windowId: l, screen: { devicePixelRatio: z, deviceOriginalWidth: g ? s * z : s, deviceOriginalHeight: g ? r * z : r, deviceWidth: d, deviceHeight: D, deviceToolbarHeight: c, width: p, height: t, orientation: j } } } }] }, K = I.sessions[0].clientEnvironment.webEnvironment.screen; K.orientationMode = C.utils.getOrientationMode(K.orientation); return I } } }); TLT.addService("serializer", function (core) { function serializeToJSON(obj) { var str, key, len = 0; if (typeof obj !== "object" || obj === null) { switch (typeof obj) { case "function": case "undefined": return "null"; case "string": return '"' + obj.replace(/\"/g, '\\"') + '"'; default: return String(obj) } } else { if (Object.prototype.toString.call(obj) === "[object Array]") { str = "["; for (key = 0, len = obj.length; key < len; key += 1) { if (Object.prototype.hasOwnProperty.call(obj, key)) { str += serializeToJSON(obj[key]) + "," } } } else { str = "{"; for (key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { str = str.concat('"', key, '":', serializeToJSON(obj[key]), ","); len += 1 } } } } if (len > 0) { str = str.substring(0, str.length - 1) } str += String.fromCharCode(str.charCodeAt(0) + 2); return str } var configService = core.getService("config"), serialize = {}, parse = {}, defaultSerializers = { json: (function () { if (typeof window.JSON !== "undefined") { return { serialize: window.JSON.stringify, parse: window.JSON.parse } } return { serialize: serializeToJSON, parse: function (data) { return eval("(" + data + ")") } } }()) }, updateConfig = null, isInitialized = false; function addObjectIfExist(paths, rootObj, propertyName) { var i, len, obj; paths = paths || []; for (i = 0, len = paths.length; i < len; i += 1) { obj = paths[i]; if (typeof obj === "string") { obj = core.utils.access(obj) } if (typeof obj === "function") { rootObj[propertyName] = obj; break } } } function initSerializerService(config) { var format; for (format in config) { if (config.hasOwnProperty(format)) { addObjectIfExist(config[format].stringifiers, serialize, format); addObjectIfExist(config[format].parsers, parse, format) } } if (!(config.json && config.json.hasOwnProperty("defaultToBuiltin")) || config.json.defaultToBuiltin === true) { serialize.json = serialize.json || defaultSerializers.json.serialize; parse.json = parse.json || defaultSerializers.json.parse } if (typeof serialize.json !== "function" || typeof parse.json !== "function") { core.fail("JSON parser and/or serializer not provided in the UIC config. Can't continue.") } if (configService.subscribe) { configService.subscribe("configupdated", updateConfig) } isInitialized = true } function destroy() { serialize = {}; parse = {}; configService.unsubscribe("configupdated", updateConfig); isInitialized = false } updateConfig = function () { configService = core.getService("config"); initSerializerService(configService.getServiceConfig("serializer") || {}) }; return { init: function () { if (!isInitialized) { initSerializerService(configService.getServiceConfig("serializer") || {}) } else { } }, destroy: function () { destroy() }, parse: function (data, type) { type = type || "json"; return parse[type](data) }, serialize: function (data, type) { type = type || "json"; return serialize[type](data) } } }); if (TLT && typeof TLT.addModule === "function") {
    TLT.addModule("overstat", function (b) {
        var i = {}, f = null, a = 250, e = 100; function g(j) { b.post(j) } function d(m, l) { var k, j; if (!m || typeof m !== "object") { return null } j = l.split("."); for (k = 0; k < j.length; k += 1) { if ((typeof m === "undefined") || (m[j[k]] === null)) { return null } m = m[j[k]] } return m } function h() { var k = b.getConfig() || {}, j = k.hoverThreshold; j = typeof j !== "number" ? a : (j < e ? e : j); return j } function c(m, l) {
            var p = null, k = d(m, "target.id"), n = 0, o = null, j = null; if (!k) { return } if (f === null) { f = h() } if (m.type === "mouseover") { i[k] = i[k] || { clickOccurred: false }; i[k].timestamp = m.timestamp; return } p = i[k]; if (!p || !p.timestamp) { return } n = Math.abs(m.timestamp - p.timestamp);
            if (m.type === "mouseout") { delete p.timestamp; p.clickOccurred = false; if (n >= f) { o = { type: 4, event: { type: m.type, tlEvent: "hover" }, target: { id: d(m, "target.id"), idType: d(m, "target.idType"), currState: { hoverTime: n } } }; g(o) } return } if (m.type === "click" && n >= f && !p.clickOccurred) { p.clickOccurred = true; o = { type: 4, event: { type: m.type, tlEvent: "hoverToClick" }, target: { id: d(m, "target.id"), idType: d(m, "target.idType"), currState: { hoverTime: n } } }; g(o); return }
        } return {
            init: function () { }, destroy: function () { }, onevent: function (j) {
                if (typeof j !== "object" || !j.type) { return } switch (j.type) {
                    case "mouseover": c(j); break;
                    case "mouseout": c(j); break; case "click": c(j); break; default: break
                }
            }, onmessage: function (j) { }
        }
    })
} else { } if (TLT && typeof TLT.addModule === "function") { TLT.addModule("performance", function (f) { var h = { loadReceived: false, unloadReceived: false, perfEventSent: false }, g = 0; function b(j, i) { if (typeof j !== "string") { return false } if (!i || typeof i !== "object") { return false } return (i[j] === true) } function e(k, i) { var m = 0, j = {}, n = "", l = 0; if (!k || typeof k !== "object" || !k.navigationStart) { return {} } m = k.navigationStart; for (n in k) { if (Object.prototype.hasOwnProperty.call(k, n) || typeof k[n] === "number") { if (!b(n, i)) { l = k[n]; if (typeof l === "number" && l) { j[n] = l - m } else { j[n] = l } } } } return j } function d(l) { var m = 0, k, j, i = f.utils; if (l) { k = (l.responseEnd > 0 && l.responseEnd < l.domLoading) ? l.responseEnd : l.domLoading; j = l.loadEventStart; if (i.isNumeric(k) && i.isNumeric(j) && j > k) { m = j - k } } return m } function c(j) { var i = f.getStartTime(); if (j.timestamp > i && !g) { g = j.timestamp - i } } function a(m) { var k = f.getConfig() || {}, j = "UNKNOWN", n = { type: 7, performance: {} }, i, o, l; if (!m || h.perfEventSent) { return } o = m.performance || {}; l = o.timing; i = o.navigation; if (l) { n.performance.timing = e(l, k.filter); n.performance.timing.renderTime = d(l) } else { if (k.calculateRenderTime) { n.performance.timing = { renderTime: g, calculated: true } } else { return } } if (i) { switch (i.type) { case 0: j = "NAVIGATE"; break; case 1: j = "RELOAD"; break; case 2: j = "BACKFORWARD"; break; default: j = "UNKNOWN"; break } n.performance.navigation = { type: j, redirectCount: i.redirectCount } } f.post(n); h.perfEventSent = true } return { init: function () { }, destroy: function () { }, onevent: function (i) { if (typeof i !== "object" || !i.type) { return } switch (i.type) { case "load": h.loadReceived = true; c(i); break; case "unload": h.unloadReceived = true; if (!h.perfEventSent) { a(window) } break; default: break } }, onmessage: function (i) { } } }) } else { } TLT.addModule("replay", function (ag) { var A = { "input:radio": "radioButton", "input:checkbox": "checkBox", "input:text": "textBox", "input:password": "textBox", "input:file": "fileInput", "input:button": "button", "input:submit": "submitButton", "input:reset": "resetButton", "input:image": "image", "input:color": "color", "input:date": "date", "input:datetime": "datetime", "input:datetime-local": "datetime-local", "input:number": "number", "input:email": "email", "input:tel": "tel", "input:search": "search", "input:url": "url", "input:time": "time", "input:week": "week", "input:month": "month", "textarea:": "textBox", "select:": "selectList", "button:": "button", "a:": "link" }, K = window.orientation || 0, ad = { scale: 0, timestamp: 0 }, Y = {}, B = window.location.hash, F = null, e = [], Z = 0, ab = null, z = null, k = 0, T = "", x = "", O = (new Date()).getTime(), j = 0, Q = null, ae = null, P = null, W = 0, u = 0, ac = null, t = { inFocus: false }, L = null, y = navigator.userAgent.indexOf("iPhone") > -1 || navigator.userAgent.indexOf("iPod") > -1 || navigator.userAgent.indexOf("iPad") > -1, p = window.devicePixelRatio || 1, o = (window.screen === null ? 0 : window.screen.width), E = (window.screen === null ? 0 : window.screen.height), U = (window.screen === null ? 0 : window.screen.height - window.screen.availHeight), J = ag.getConfig(), R; function I(ak, aj) { var ai, ah; if (!ak || typeof ak !== "object") { return null } ah = aj.split("."); for (ai = 0; ai < ah.length; ai += 1) { if ((typeof ak === "undefined") || (ak[ah[ai]] === null)) { return null } ak = ak[ah[ai]] } return ak } function g(ai) { var ah = []; ai = ai.parentNode; while (ai) { ah.push(ai); ai = ai.parentNode } return ah } function v(ah) { return ag.utils.some(ah, function (ai) { if (ai.tagName === "A" || ai.tagName === "BUTTON") { return ai } return null }) } function m(ah) { var ai = ah.type; if (typeof ai === "string") { ai = ai.toLowerCase() } else { ai = "unknown" } if (ai === "blur") { ai = "focusout" } return ai } function X(ap) { var aj, ai = I(ap, "webEvent.target.element.tagName"), ak = ai.toLowerCase() === "input" ? I(ap, "webEvent.target.element.type") : "", ah = A[ai.toLowerCase() + ":" + ak] || ai, am = g(I(ap, "webEvent.target.element")), ao = null, al = I(ap, "webEvent.target.position.relXY"), an = I(ap, "webEvent.target.subtype"); aj = { type: 4, target: { id: ap.id || "", idType: I(ap, "webEvent.target.idType"), name: I(ap, "webEvent.target.name"), tlType: ah, type: ai, subType: ak, position: { width: I(ap, "webEvent.target.element.offsetWidth"), height: I(ap, "webEvent.target.element.offsetHeight") }, currState: ap.currState || null }, event: { tlEvent: m(I(ap, "webEvent")), type: I(ap, "webEvent.target.type") } }; if (al) { aj.target.position.relXY = al } if (typeof ap.dwell === "number" && ap.dwell > 0) { aj.target.dwell = ap.dwell } if (typeof ap.visitedCount === "number") { aj.target.visitedCount = ap.visitedCount } if (typeof ap.prevState !== "undefined") { aj.prevState = ap.prevState } if (typeof an !== "undefined") { aj.event.subType = an } aj.target.name = I(ap, "webEvent.target.name"); ao = v(am); aj.target.isParentLink = !!ao; if (ao) { if (ao.href) { aj.target.currState = aj.target.currState || {}; aj.target.currState.href = aj.target.currState.href || ao.href } if (ao.value) { aj.target.currState = aj.target.currState || {}; aj.target.currState.value = aj.target.currState.value || ao.value } if (ao.innerText || ao.textContent) { aj.target.currState = aj.target.currState || {}; aj.target.currState.innerText = aj.target.currState.innerText || ao.innerText || ao.textContent } } return aj } function C(ah) { ag.post(ah) } function H(al) { var aj = 0, ah, am = al.length, ao, an, ak, ap = { mouseout: true, mouseover: true }, ai = []; for (aj = 0; aj < am; aj += 1) { ao = al[aj]; if (!ao) { continue } if (ap[ao.event.type]) { ai.push(ao) } else { for (ah = aj + 1; ah < am && al[ah]; ah += 1) { if (!ap[al[ah].event.type]) { break } } if (ah < am) { an = al[ah]; if (an && ao.target.id === an.target.id && ao.event.type !== an.event.type) { if (ao.event.type === "click") { ak = ao; ao = an; an = ak } if (an.event.type === "click") { ao.target.position = an.target.position; aj += 1 } else { if (an.event.type === "blur") { ao.target.dwell = an.target.dwell; ao.target.visitedCount = an.target.visitedCount; ao.focusInOffset = an.focusInOffset; ao.target.position = an.target.position; aj += 1 } } al[ah] = null; al[aj] = ao } } ai.push(al[aj]) } } for (ao = ai.shift() ; ao; ao = ai.shift()) { ag.post(ao) } al.splice(0, al.length) } if (typeof window.onerror !== "function") { window.onerror = function (ak, aj, ah) { var ai = null; if (typeof ak !== "string") { return } ah = ah || -1; ai = { type: 6, exception: { description: ak, url: aj, line: ah } }; k += 1; ag.post(ai) } } function n(ai, ah) { t = ah; t.inFocus = true; if (typeof Y[ai] === "undefined") { Y[ai] = {} } Y[ai].focus = t.dwellStart = Number(new Date()); Y[ai].focusInOffset = P ? t.dwellStart - Number(P) : -1; Y[ai].prevState = I(ah, "target.state"); Y[ai].visitedCount = Y[ai].visitedCount + 1 || 1 } function V(ah, ai) { e.push(X({ webEvent: ah, id: ai, currState: I(ah, "target.state") })) } function q(aj) { var ah = false, ai = "|button|image|submit|reset|checkbox|radio|", ak = null; if (typeof aj !== "object" || !aj.type) { return ah } switch (aj.type) { case "INPUT": ak = "|" + (aj.subType || "") + "|"; if (ai.indexOf(ak.toLowerCase()) === -1) { ah = false } else { ah = true } break; case "TEXTAREA": ah = false; break; default: ah = true; break } return ah } function d(aj, ai) { var ah; if (typeof aj === "undefined" || aj === null || typeof ai === "undefined" || ai === null) { return } t.inFocus = false; if (typeof Y[aj] !== "undefined" && Y[aj].hasOwnProperty("focus")) { Y[aj].dwell = Number(new Date()) - Y[aj].focus } else { Y[aj] = {}; Y[aj].dwell = 0 } if (e.length === 0) { ai.type = ai.target.type = "blur"; V(ai, aj) } ah = e[e.length - 1]; if (ah) { ah.target.dwell = Y[aj].dwell; ah.focusInOffset = Y[aj].focusInOffset; ah.target.visitedCount = Y[aj].visitedCount; if (ah.event.type === "click" && !q(ah.target)) { ah.event.type = "blur"; ah.event.tlEvent = "focusout" } } H(e) } function l(aj, ai) { var ah = false; if (e.length > 0 && e[e.length - 1] && e[e.length - 1].target.id !== aj && ai.type !== "scroll" && ai.type !== "resize" && ai.type !== "mouseout" && ai.type !== "mouseover" && (e[e.length - 1].target.tlType !== "textBox" && e[e.length - 1].target.tlType !== "selectList")) { d(e[e.length - 1].target.id, e[e.length - 1]); ah = true } return ah } function c(ai, ah) { if (typeof Y[ai] !== "undefined" && !Y[ai].hasOwnProperty("focus")) { n(ai, ah) } V(ah, ai); if (typeof Y[ai] !== "undefined" && typeof Y[ai].prevState !== "undefined") { if (e[e.length - 1].target.tlType === "textBox" || e[e.length - 1].target.tlType === "selectList") { e[e.length - 1].target.prevState = Y[ai].prevState } } } function D(aj) { var ai = aj.target.position.x, an = aj.target.position.y, ak = aj.target.size.width, ah = aj.target.size.height, am = Math.abs(ai / ak).toFixed(1), al = Math.abs(an / ah).toFixed(1); am = am > 1 || am < 0 ? 0.5 : am; al = al > 1 || al < 0 ? 0.5 : al; return am + "," + al } function b(al, aj) { var ai, ah = true, ak = 0; if (aj.target.element.tagName === "SELECT" && L && L.target.id === al) { L = null; return } if (!t.inFocus) { n(al, aj) } ak = e.length; if (ak && I(e[ak - 1], "event.type") !== "change") { c(al, aj) } ai = D(aj); ak = e.length; if (aj.position.x === 0 && aj.position.y === 0 && ak && I(e[ak - 1], "target.tlType") === "radioButton") { ah = false } else { aj.target.position.relXY = ai } if (ak && I(e[ak - 1], "target.id") === al) { if (ah) { e[ak - 1].target.position.relXY = ai } } else { V(aj, al) } L = aj } function aa() { var ah = window.orientation || 0; return ah } function a(ai) { var ah = aa(), aj = { type: 4, event: { type: "orientationchange" }, target: { prevState: { orientation: K, orientationMode: ag.utils.getOrientationMode(K) }, currState: { orientation: ah, orientationMode: ag.utils.getOrientationMode(ah) } } }; C(aj); K = ah } function af(ai) { var ah = false; if (!ai) { return ah } ah = (ad.scale === ai.scale && Math.abs((new Date()).getTime() - ad.timestamp) < 500); return ah } function i(ah) { ad.scale = ah.scale; ad.rotation = ah.rotation; ad.timestamp = (new Date()).getTime() } function N(aj) { var ah, ai = "INVALID"; if (typeof aj === "undefined" || aj === null) { return ai } ah = Number(aj); if (isNaN(ah)) { ai = "INVALID" } else { if (ah < 1) { ai = "CLOSE" } else { if (ah > 1) { ai = "OPEN" } else { ai = "NONE" } } } return ai } function h(aj) { var ai = {}, ak = I(aj, "nativeEvent.rotation") || 0, al = I(aj, "nativeEvent.scale") || 1, ah = null, am = { type: 4, event: { type: "touchend" }, target: { id: I(aj, "target.id"), idType: I(aj, "target.idType") } }; if ((y && (!al || al === 1)) || (!y && aj.nativeEvent.touches.length <= 1)) { return } ah = { rotation: ak ? ak.toFixed(2) : 0, scale: al ? al.toFixed(2) : 1 }; ah.pinch = N(ah.scale); if (af(ah)) { return } if (ad && ad.timestamp) { ai.rotation = ad.rotation; ai.scale = ad.scale; ai.pinch = N(ai.scale) } if (I(ai, "scale")) { am.target.prevState = ai } am.target.currState = ah; C(am); i(ah) } function S(ai) { var ah = { type: 1, clientState: { pageWidth: document.width || (document.documentElement === null ? 0 : document.documentElement.offsetWidth), pageHeight: Math.max((typeof document.height === "undefined" ? 0 : document.height), (typeof document.documentElement === "undefined" ? 0 : document.documentElement.offsetHeight), (typeof document.documentElement === "undefined" ? 0 : document.documentElement.scrollHeight)), viewPortWidth: window.innerWidth || document.documentElement.clientWidth, viewPortHeight: window.innerHeight || document.documentElement.clientHeight, viewPortX: window.pageXOffset || (document.body === null ? 0 : document.body.scrollLeft), viewPortY: window.pageYOffset || (document.body === null ? 0 : document.body.scrollTop), deviceOrientation: window.orientation || 0, event: I(ai, "type") } }, aj = 1, ak = 1; if (Math.abs(ah.clientState.deviceOrientation) === 90) { if (y) { aj = E - U } else { aj = o <= 320 ? E - U : ((E / p) - U) } } else { if (y) { aj = o + U } else { aj = o <= 320 ? o - U : ((o / p) - U) } } ak = (ah.clientState.viewPortWidth === 0 ? 1 : aj / ah.clientState.viewPortWidth); ah.clientState.deviceScale = ak - 0.02; ah.clientState.deviceScale = ah.clientState.deviceScale.toFixed(3); ah.clientState.viewTime = ae === null ? 0 : (new Date()).getTime() - ae.getTime(); if (ai.type === "scroll" && Z <= 0) { W = z.clientState.viewPortX; u = z.clientState.viewPortY } if (ai.type === "scroll") { ah.clientState.viewPortXStart = W; ah.clientState.viewPortYStart = u } ab = ag.utils.clone(ah); return ah } function w() { if (ab !== null && ab.clientState.event !== "load") { if (ab.clientState.event === "scroll") { delete ab.clientState.viewPortXStart; delete ab.clientState.viewPortYStart } ab.clientState.event = "attention"; ab.clientState.viewTime = P === null ? 0 : (new Date()).getTime() - P.getTime(); C(ab); P = new Date(); return true } return false } function r(ah) { if ((ah.clientState.event === "scroll") && (ah.clientState.viewPortXStart === ah.clientState.viewPortX) && (ah.clientState.viewPortYStart === ah.clientState.viewPortY)) { return false } return true } function G(ai) { var ah = ac === null ? 0 : (new Date()).getTime() - ac.getTime(); if (ab !== null && (ai.type !== ab.clientState.event || ah >= 1000)) { if (r(ab)) { C(ab); if (ab.clientState.event !== "touchend") { z = ag.utils.clone(ab) } } ab = null; ae = null; Z = 0; return true } if (ab !== null && (Z === 1 && ah >= 1000) && (ab.clientState.event === "resize" || ab.clientState.event === "scroll" || ab.clientState.event === "orientationchange" || ai.type === "screenview_load")) { w() } return false } function f(ar, ak) { var ao = ["type", "target.id"], aj = null, al, an, am = true, ap = 10, ai = 0, aq = 0, ah = 0; if (!ar || !ak || typeof ar !== "object" || typeof ak !== "object") { am = false } for (al = 0, an = ao.length; am && al < an; al += 1) { aj = ao[al]; if (I(ar, aj) !== I(ak, aj)) { am = false; break } } if (am) { aq = I(ar, "timestamp"); ah = I(ak, "timestamp"); if (!(isNaN(aq) && isNaN(ah))) { ai = Math.abs(I(ar, "timestamp") - I(ak, "timestamp")); if (isNaN(ai) || ai > ap) { am = false } } } return am } function M() { var ah = window.location.hash; if (ah === B) { return } if (B) { TLT.logScreenviewUnload(B) } if (ah) { TLT.logScreenviewLoad(ah) } B = ah } function s(ah) { var ai = { type: 4, event: { type: ah.type }, target: { id: I(ah, "target.id"), idType: I(ah, "target.idType") } }; C(ai) } return { init: function () { }, destroy: function () { d(F) }, onevent: function (ah) { var aj = null, ai = null; if (typeof ah !== "object" || !ah.type) { return } if (f(ah, Q)) { Q = ah; return } Q = ah; aj = I(ah, "target.id"); if (Object.prototype.toString.call(Y[aj]) !== "[object Object]") { Y[aj] = {} } G(ah); l(aj, ah); ac = new Date(); switch (ah.type) { case "hashchange": M(); break; case "focus": ai = n(aj, ah); break; case "blur": ai = d(aj, ah); break; case "click": ai = b(aj, ah); break; case "change": ai = c(aj, ah); break; case "orientationchange": ai = a(ah); break; case "touchend": ai = h(ah); ai = S(ah); break; case "load": TLT.logScreenviewLoad("root"); ai = S(ah); P = new Date(); break; case "screenview_load": P = new Date(); break; case "screenview_unload": break; case "resize": case "scroll": if (ae === null && Z <= 0) { ae = new Date() } ai = S(ah); if (r(ai)) { ai = null } else { Z += 1 } break; case "unload": if (e !== null) { H(e) } ai = S(ah); w(); C(ai); TLT.logScreenviewUnload("root"); break; default: s(ah); break } F = aj; return ai }, onmessage: function () { } } });
/**
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corp. 2013
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

// Default configuration
(function () {
    "use strict";
    /**
     * Due to issue with lack of change event propagation on legacy IE (W3C version of UIC)
     * its mandatory to provide more specific configuration on IE6, IE7, IE8 and IE9 in legacy
     * compatibility mode. For other browsers changeTarget can remain undefined as it is
     * sufficient to listen to the change event at the document level.
     */
    var changeTarget;
    if (TLT.getFlavor() === "w3c" && TLT.utils.isLegacyIE) {
        changeTarget = "input, select, textarea, button";
    }

    window.TLT.init({
        core: {
            moduleBase: 'intermediate/modules/',
            // WARNING: For advanced users only. Modifying the modules section may lead to unexpected behavior and or performance issues.
            modules: {
                overstat: {
                    events: [
                        { name: "click", recurseFrames: true },
                        { name: "mouseover", recurseFrames: true },
                        { name: "mouseout", recurseFrames: true }
                    ]
                },
                performance: {
                    events: [
                        { name: "load", target: window },
                        { name: "unload", target: window }
                    ]
                },
                replay: {
                    events: [
                        { name: "change", target: changeTarget, recurseFrames: true },
                        { name: "mousedown", recurseFrames: true },
			{ name: "mouseup", recurseFrames: true },
			{ name: "hover", recurseFrames: true },//target: window },
                        { name: "click", recurseFrames: true },
                        { name: "hashchange", target: window },
                        { name: "focus", target: "input, select, textarea, button", recurseFrames: true },
                        { name: "blur", target: "input, select, textarea, button", recurseFrames: true },
                        { name: "load", target: window },
                        { name: "unload", target: window },
                        { name: "resize", target: window },
                        { name: "scroll", target: window },
                        { name: "orientationchange", target: window },
                        { name: "touchstart" },
                        { name: "touchmove" },
                        { name: "touchend" }
                    ]
                }
            },
            // Set the sessionDataEnabled flag to true only if it's OK to expose Tealeaf session data to 3rd party scripts.
            sessionDataEnabled: false,
            sessionData: {
                // Set this flag if the session value needs to be hashed to derive the Tealeaf session ID
                sessionValueNeedsHashing: true,

                // Specify sessionQueryName only if the session id is derived from a query parameter.
                sessionQueryName: "sessionID",
                sessionQueryDelim: ";",

                // sessionQueryName, if specified, takes precedence over sessionCookieName.
                sessionCookieName: "jsessionid"
            },
            // list of ignored frames pointed by css selector (top level only)
            framesBlacklist: [
                "#iframe1"
            ]
        },
        services: {
            queue: [
                {
                    "qid": "DEFAULT",
                    "endpoint": "/Assets/Scripts/global/TealeafTarget.aspx",
                    "maxEvents": 20,
                    "timerinterval": 30,
                    serializer: "json"
                }
            ],
            message: {
                "privacy": [

                            //Password Privacy CSS Selector
                            {
                                "targets": [
                                  "input[type=password]",
                   /*{ id : "CVV2", idType : -1 },
                    { id : "CreditCardData.CardNumber", idType : -1 } */
                                ],
                                "maskType": 3 // Mask using XXxx0099 
                            }
                ]
            },
            serializer: {
                json: {
                    defaultToBuiltin: true,
                    parsers: ["JSON.parse"],
                    stringifiers: ["JSON.stringify"]
                }
            },
            browser: {
                sizzleObject: "window.Sizzle",
                jQueryObject: "window.jQuery"
            }
        },
        modules: {
            overstat: {
                hoverThreshold: 1000
            },
            performance: {
                calculateRenderTime: true,
                filter: {
                    navigationStart: true,
                    unloadEventStart: true,
                    unloadEventEnd: true,
                    redirectStart: true,
                    redirectEnd: true,
                    fetchStart: true,
                    domainLookupStart: true,
                    domainLookupEnd: true,
                    connectStart: true,
                    connectEnd: true,
                    secureConnectionStart: true,
                    requestStart: true,
                    responseStart: true,
                    responseEnd: true,
                    domLoading: true,
                    domInteractive: true,
                    domContentLoadedEventStart: true,
                    domContentLoadedEventEnd: true,
                    domComplete: true,
                    loadEventStart: true,
                    loadEventEnd: true
                }
            }
        }
    });
}());
